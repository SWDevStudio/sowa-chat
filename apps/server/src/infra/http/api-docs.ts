import { NotFoundException } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import type { OpenAPIObject } from "@nestjs/swagger";
import { cleanupOpenApiDoc } from "nestjs-zod";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import { zoneOfPort } from "../zones/zone-of-port.js";
import type { ApiZone, ZonePorts } from "../zones/zone.js";

type DocumentedZone = Exclude<ApiZone, "management">;

const zonePathPrefixes: Record<DocumentedZone, string[]> = {
  public: ["/v1/visitor"],
  operator: ["/v1/operator"],
  internal: ["/v1/server", "/v1/bot"],
};

export function setupApiDocs(app: INestApplication, ports: ZonePorts): void {
  const config = new DocumentBuilder().setTitle("sowa-chat API").setVersion("1").build();
  const document = cleanupOpenApiDoc(SwaggerModule.createDocument(app, config));

  app.use("/docs", onlyOnManagementPort(ports));
  for (const zone of Object.keys(zonePathPrefixes) as DocumentedZone[]) {
    SwaggerModule.setup(`docs/${zone}`, app, documentForZone(document, zonePathPrefixes[zone]));
  }
}

function documentForZone(document: OpenAPIObject, prefixes: string[]): OpenAPIObject {
  const paths = Object.fromEntries(
    Object.entries(document.paths).filter(([path]) => isUnderAnyPrefix(path, prefixes)),
  );
  return { ...document, paths };
}

function isUnderAnyPrefix(path: string, prefixes: string[]): boolean {
  return prefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

function onlyOnManagementPort(ports: ZonePorts): RequestHandler {
  return (request: Request, _response: Response, next: NextFunction): void => {
    if (zoneOfPort(ports, request.socket.localPort) === "management") {
      next();
      return;
    }
    next(new NotFoundException(`Cannot ${request.method} ${request.originalUrl}`));
  };
}
