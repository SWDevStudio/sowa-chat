import { Body, Controller, Post } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { startZoneProbeApp } from "../../../test/support/zone-probe.js";
import type { ZoneProbeApp } from "../../../test/support/zone-probe.js";
import { Zone } from "../zones/zone.decorator.js";

class DocsProbeDto extends createZodDto(z.object({ name: z.string() })) {}

@Zone("public")
@Controller("visitor/docs-probe")
class PublicDocsProbeController {
  @Post()
  create(@Body() body: DocsProbeDto): { name: string } {
    return { name: body.name };
  }
}

@Zone("operator")
@Controller("operator/docs-probe")
class OperatorDocsProbeController {
  @Post()
  create(@Body() body: DocsProbeDto): { name: string } {
    return { name: body.name };
  }
}

@Zone("internal")
@Controller("server/docs-probe")
class InternalDocsProbeController {
  @Post()
  create(@Body() body: DocsProbeDto): { name: string } {
    return { name: body.name };
  }
}

const controllers = [
  PublicDocsProbeController,
  OperatorDocsProbeController,
  InternalDocsProbeController,
];

interface OpenApiSchema {
  $ref?: string;
  properties?: Record<string, unknown>;
}

interface OpenApiDocument {
  paths: Record<
    string,
    Record<string, { requestBody?: { content: Record<string, { schema: OpenApiSchema }> } }>
  >;
  components?: { schemas?: Record<string, OpenApiSchema> };
}

function resolveSchema(
  document: OpenApiDocument,
  schema: OpenApiSchema | undefined,
): OpenApiSchema {
  if (schema?.$ref === undefined) {
    return schema ?? {};
  }
  const name = schema.$ref.replace("#/components/schemas/", "");
  return document.components?.schemas?.[name] ?? {};
}

describe("OpenAPI по зонам", () => {
  let probe: ZoneProbeApp | undefined;

  afterEach(async () => {
    await probe?.app.close();
    probe = undefined;
    vi.unstubAllEnvs();
  });

  function url(port: number, path: string): string {
    return `http://127.0.0.1:${port}${path}`;
  }

  describe("development", () => {
    let app: INestApplication;
    let ports: ZoneProbeApp["ports"];

    beforeEach(async () => {
      probe = await startZoneProbeApp(controllers);
      app = probe.app;
      ports = probe.ports;
    });

    async function documentOf(zone: string): Promise<OpenApiDocument> {
      const response = await fetch(url(ports.management, `/docs/${zone}-json`));
      expect(response.status).toBe(200);
      return (await response.json()) as OpenApiDocument;
    }

    it("Swagger UI внутренней зоны отдаёт HTML на служебном порту", async () => {
      const response = await fetch(url(ports.management, "/docs/internal"));

      expect(app).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("text/html");
      expect(await response.text()).toContain("swagger");
    });

    it("JSON внутренней зоны содержит только пути internal", async () => {
      const paths = Object.keys((await documentOf("internal")).paths);

      expect(paths).toContain("/v1/server/docs-probe");
      expect(paths).not.toContain("/v1/visitor/docs-probe");
      expect(paths).not.toContain("/v1/operator/docs-probe");
    });

    it("JSON публичной зоны содержит пути visitor и не содержит других зон", async () => {
      const paths = Object.keys((await documentOf("public")).paths);

      expect(paths).toContain("/v1/visitor/docs-probe");
      expect(paths).toContain("/v1/visitor/session");
      expect(paths).not.toContain("/v1/operator/docs-probe");
      expect(paths).not.toContain("/v1/server/docs-probe");
    });

    it("JSON операторской зоны содержит только /v1/operator/docs-probe", async () => {
      const paths = Object.keys((await documentOf("operator")).paths);

      expect(paths).toEqual(["/v1/operator/docs-probe"]);
    });

    it("у POST внутренней зоны есть тело запроса со свойством name из zod-схемы", async () => {
      const document = await documentOf("internal");
      const operation = document.paths["/v1/server/docs-probe"]?.post;

      expect(operation?.requestBody).toBeDefined();
      const jsonContent = operation?.requestBody?.content["application/json"];
      const schema = resolveSchema(document, jsonContent?.schema);
      expect(Object.keys(schema.properties ?? {})).toContain("name");
      expect(JSON.stringify(document)).toContain('"name"');
    });

    it("документа служебной зоны нет", async () => {
      const response = await fetch(url(ports.management, "/docs/management-json"));

      expect(response.status).toBe(404);
    });

    it.each(["/docs/public", "/docs/public-json"])(
      "%s на публичном порту отвечает 404",
      async (path) => {
        const response = await fetch(url(ports.public, path));

        expect(response.status).toBe(404);
      },
    );

    it.each(["/docs/internal", "/docs/internal-json"])(
      "%s на внутреннем порту отвечает 404",
      async (path) => {
        const response = await fetch(url(ports.internal, path));

        expect(response.status).toBe(404);
      },
    );

    it("/docs/operator-json на операторском порту отвечает 404", async () => {
      const response = await fetch(url(ports.operator, "/docs/operator-json"));

      expect(response.status).toBe(404);
    });
  });

  describe("production", () => {
    beforeEach(async () => {
      probe = await startZoneProbeApp(controllers, { SOWA_ENV: "production" });
    });

    it.each(["/docs/public", "/docs/internal-json", "/docs/internal", "/docs/public-json"])(
      "%s на служебном порту отвечает 404",
      async (path) => {
        const response = await fetch(url(probe!.ports.management, path));

        expect(response.status).toBe(404);
      },
    );
  });
});
