import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  NotFoundException,
  Post,
  Body,
} from "@nestjs/common";
import type { ArgumentsHost, INestApplication } from "@nestjs/common";
import { errorResponseSchema } from "@sowa-chat/protocol";
import { createZodDto, ZodValidationException } from "nestjs-zod";
import { z } from "zod";
import { startZoneProbeApp } from "../../../test/support/zone-probe.js";
import { requestIdHeader } from "../request-id/request-id.js";
import { Zone } from "../zones/zone.decorator.js";
import { errorCodeOfStatus } from "./error-code-of-status.js";
import { internalErrorMessage, toErrorResponse } from "./error-response.js";
import { HttpErrorFilter } from "./http-error.filter.js";

class ProbeBodyDto extends createZodDto(z.object({ name: z.string().min(1) })) {}

@Zone("public")
@Controller("visitor/error-probe")
class ErrorProbeController {
  @Post()
  create(@Body() body: ProbeBodyDto): { name: string } {
    return { name: body.name };
  }

  @Get("not-found")
  notFound(): never {
    throw new NotFoundException("Conversation not found");
  }

  @Get("boom")
  boom(): never {
    throw new Error("boom");
  }
}

const probePath = "/v1/visitor/error-probe";
const knownKeys = ["code", "details", "message", "requestId", "statusCode"];

describe("errorCodeOfStatus", () => {
  it.each([
    [400, "validationFailed"],
    [401, "unauthorized"],
    [403, "forbidden"],
    [404, "notFound"],
    [409, "conflict"],
    [413, "payloadTooLarge"],
    [429, "rateLimited"],
  ])("статус %i даёт код %s", (status, code) => {
    expect(errorCodeOfStatus(status)).toBe(code);
  });

  it.each([500, 502, 503, 599])("статус %i вне таблицы даёт internalError", (status) => {
    expect(errorCodeOfStatus(status)).toBe("internalError");
  });

  it.each([402, 405, 410, 422, 499])(
    "статус %i ниже 500 вне таблицы даёт validationFailed",
    (status) => {
      expect(errorCodeOfStatus(status)).toBe("validationFailed");
    },
  );
});

describe("toErrorResponse", () => {
  const requestId = "11111111-1111-4111-8111-111111111111";

  it("ZodValidationException даёт 400 и details по каждой ошибке", () => {
    const result = z
      .object({ name: z.string().min(1), nested: z.object({ age: z.number() }) })
      .safeParse({ name: "", nested: { age: "x" } });
    if (result.success) {
      throw new Error("ожидалась ошибка проверки");
    }

    const body = toErrorResponse(new ZodValidationException(result.error), requestId);

    expect(body.statusCode).toBe(400);
    expect(body.code).toBe("validationFailed");
    expect(body.message).toBe("Validation failed");
    expect(body.requestId).toBe(requestId);
    expect(body.details).toHaveLength(2);
    expect(body.details).toEqual(
      expect.arrayContaining([
        { path: "name", message: expect.any(String) },
        { path: "nested.age", message: expect.any(String) },
      ]),
    );
  });

  it("HttpException ниже 500 сохраняет сообщение и статус, details нет", () => {
    const body = toErrorResponse(new ForbiddenException("Nope"), requestId);

    expect(body).toEqual({ statusCode: 403, message: "Nope", code: "forbidden", requestId });
    expect(Object.hasOwn(body, "details")).toBe(false);
  });

  it("HttpException 500 и выше прячет сообщение", () => {
    const body = toErrorResponse(new HttpException("secret db host", 503), requestId);

    expect(body).toEqual({
      statusCode: 503,
      message: internalErrorMessage,
      code: "internalError",
      requestId,
    });
  });

  it("обычная Error даёт 500 без текста ошибки", () => {
    const body = toErrorResponse(new Error("boom"), requestId);

    expect(body).toEqual({
      statusCode: 500,
      message: "Internal server error",
      code: "internalError",
      requestId,
    });
    expect(JSON.stringify(body)).not.toContain("boom");
  });

  it.each([undefined, null, "строка", 42, { message: "x" }])(
    "не-Error значение %j даёт 500",
    (exception) => {
      const body = toErrorResponse(exception, requestId);

      expect(body.statusCode).toBe(500);
      expect(body.code).toBe("internalError");
      expect(body.message).toBe(internalErrorMessage);
    },
  );

  it("в теле только ключи ErrorResponse", () => {
    const body = toErrorResponse(new BadRequestException("bad"), requestId);

    expect(Object.keys(body).sort()).toEqual(["code", "message", "requestId", "statusCode"]);
  });
});

describe("HttpErrorFilter", () => {
  function hostOfType(type: string): ArgumentsHost {
    return { getType: () => type } as unknown as ArgumentsHost;
  }

  it.each(["ws", "rpc"])("для контекста %s пробрасывает исключение", (type) => {
    const filter = new HttpErrorFilter();
    const exception = new Error("ws failure");

    expect(() => filter.catch(exception, hostOfType(type))).toThrow(exception);
  });

  function httpHost(headerValue: unknown) {
    const json = vi.fn();
    const status = vi.fn(() => ({ json }));
    const response = { getHeader: vi.fn(() => headerValue), status };
    const host = {
      getType: () => "http",
      switchToHttp: () => ({ getResponse: () => response }),
    } as unknown as ArgumentsHost;
    return { host, status, json, response };
  }

  it("отвечает status(statusCode).json(тело) с requestId из заголовка ответа", () => {
    const { host, status, json, response } = httpHost("abc-123");

    new HttpErrorFilter().catch(new NotFoundException("gone"), host);

    expect(response.getHeader).toHaveBeenCalledWith(requestIdHeader);
    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({
      statusCode: 404,
      message: "gone",
      code: "notFound",
      requestId: "abc-123",
    });
  });

  it.each([undefined, 123, ["a", "b"]])(
    "не строковый заголовок %j даёт пустой requestId",
    (headerValue) => {
      const { host, json } = httpHost(headerValue);

      new HttpErrorFilter().catch(new Error("x"), host);

      expect(json).toHaveBeenCalledWith(expect.objectContaining({ requestId: "" }));
    },
  );
});

describe("глобальный фильтр ошибок через HTTP", { timeout: 20_000 }, () => {
  let app: INestApplication | undefined;
  let baseUrl: string;

  beforeEach(async () => {
    const probe = await startZoneProbeApp([ErrorProbeController]);
    app = probe.app;
    baseUrl = `http://127.0.0.1:${probe.ports.public}`;
  });

  afterEach(async () => {
    await app?.close();
    app = undefined;
    vi.unstubAllEnvs();
  });

  function postRaw(body: string): Promise<Response> {
    return fetch(`${baseUrl}${probePath}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
    });
  }

  async function expectConsistentBody(response: Response): Promise<Record<string, unknown>> {
    const body = (await response.json()) as Record<string, unknown>;
    expect(body.statusCode).toBe(response.status);
    expect(body.requestId).toBe(response.headers.get("x-request-id"));
    expect(Object.keys(body).every((key) => knownKeys.includes(key))).toBe(true);
    expect(errorResponseSchema.parse(body)).toEqual(body);
    return body;
  }

  it("неверное тело даёт 400 validationFailed с details по полю name", async () => {
    const response = await postRaw(JSON.stringify({ name: "" }));

    expect(response.status).toBe(400);
    const body = await expectConsistentBody(response);
    expect(body.code).toBe("validationFailed");
    expect(body.message).toBe("Validation failed");
    expect(body.details).toEqual([{ path: "name", message: expect.any(String) }]);
  });

  it("поле неверного типа даёт details с path name", async () => {
    const response = await postRaw(JSON.stringify({ name: 1 }));

    const body = await expectConsistentBody(response);
    expect(body.details).toEqual([{ path: "name", message: expect.any(String) }]);
  });

  it("битый JSON даёт 400 validationFailed", async () => {
    const response = await postRaw('{"name":');

    expect(response.status).toBe(400);
    const body = await expectConsistentBody(response);
    expect(body.code).toBe("validationFailed");
  });

  it("верное тело проходит без ошибки", async () => {
    const response = await postRaw(JSON.stringify({ name: "sowa" }));

    expect(response.status).toBeLessThan(300);
  });

  it("NotFoundException сохраняет текст и даёт notFound", async () => {
    const response = await fetch(`${baseUrl}${probePath}/not-found`);

    expect(response.status).toBe(404);
    const body = await expectConsistentBody(response);
    expect(body.code).toBe("notFound");
    expect(body.message).toBe("Conversation not found");
    expect(Object.hasOwn(body, "details")).toBe(false);
  });

  it("неизвестный маршрут даёт 404 notFound", async () => {
    const response = await fetch(`${baseUrl}/v1/visitor/no-such-route`);

    expect(response.status).toBe(404);
    const body = await expectConsistentBody(response);
    expect(body.code).toBe("notFound");
  });

  it("маршрут чужой зоны даёт 404 notFound", async () => {
    const { app: otherApp, ports } = await startZoneProbeApp([ErrorProbeController]);
    try {
      const response = await fetch(`http://127.0.0.1:${ports.operator}${probePath}/not-found`);

      expect(response.status).toBe(404);
      const body = await expectConsistentBody(response);
      expect(body.code).toBe("notFound");
    } finally {
      await otherApp.close();
    }
  });

  it("обычная Error даёт 500 internalError без текста boom", async () => {
    const response = await fetch(`${baseUrl}${probePath}/boom`);

    expect(response.status).toBe(500);
    const text = await response.clone().text();
    const body = await expectConsistentBody(response);
    expect(body.code).toBe("internalError");
    expect(body.message).toBe("Internal server error");
    expect(text).not.toContain("boom");
    expect(text).not.toContain("stack");
  });

  it("свой X-Request-Id попадает в тело и заголовок ответа", async () => {
    const response = await fetch(`${baseUrl}${probePath}/not-found`, {
      headers: { "x-request-id": "abc-123" },
    });

    const body = (await response.json()) as Record<string, unknown>;
    expect(body.requestId).toBe("abc-123");
    expect(response.headers.get("x-request-id")).toBe("abc-123");
    expect(errorResponseSchema.safeParse(body).success).toBe(false);
  });

  it("requestId разный у разных запросов без своего заголовка", async () => {
    const first = (await (await fetch(`${baseUrl}${probePath}/boom`)).json()) as {
      requestId: string;
    };
    const second = (await (await fetch(`${baseUrl}${probePath}/boom`)).json()) as {
      requestId: string;
    };

    expect(first.requestId).not.toBe(second.requestId);
  });
});
