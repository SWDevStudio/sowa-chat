import { Controller, ForbiddenException, Get, ServiceUnavailableException } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import { errorCodes, errorResponseSchema } from "@sowa-chat/protocol";
import type { ErrorCode } from "@sowa-chat/protocol";
import { redirectLogsTo } from "../../../test/support/unit-probe.js";
import { startZoneProbeApp } from "../../../test/support/zone-probe.js";
import { Zone } from "../zones/zone.decorator.js";
import { ApiException, errorCodeStatuses } from "./api-exception.js";
import { internalErrorMessage, toErrorResponse } from "./error-response.js";

const crashText = "database exploded at /srv/app";
const poolText = "pool exhausted";
const errorLevel = 50;

type ApiExceptionInput = ConstructorParameters<typeof ApiException>[0];

async function throwAppApiException(input: ApiExceptionInput): Promise<never> {
  const { ApiException: AppApiException } = await import("./api-exception.js");
  throw new AppApiException(input);
}

@Zone("public")
@Controller("visitor/server-errors-probe")
class ServerErrorsProbeController {
  @Get("conflict")
  conflict(): Promise<never> {
    return throwAppApiException({ code: "conflict", message: "Conversation is already assigned" });
  }

  @Get("conflict-details")
  conflictDetails(): Promise<never> {
    return throwAppApiException({
      code: "conflict",
      message: "Conversation is already assigned",
      details: [{ path: "seq", message: "too big" }],
    });
  }

  @Get("forbidden")
  forbidden(): Promise<never> {
    return throwAppApiException({ code: "forbidden", message: "Not your conversation" });
  }

  @Get("api-internal")
  apiInternal(): Promise<never> {
    return throwAppApiException({ code: "internalError", message: "replica lag secret" });
  }

  @Get("nest-forbidden")
  nestForbidden(): never {
    throw new ForbiddenException("plain forbidden");
  }

  @Get("crash")
  crash(): never {
    throw new Error(crashText);
  }

  @Get("unavailable")
  unavailable(): never {
    throw new ServiceUnavailableException(poolText);
  }
}

const probePath = "/v1/visitor/server-errors-probe";

type LogEntry = Record<string, unknown> & { level?: unknown; requestId?: unknown };

function stringsInside(value: unknown): string[] {
  if (typeof value === "string") {
    return [value];
  }
  if (value === null || typeof value !== "object") {
    return [];
  }
  return Object.values(value).flatMap((nested) => stringsInside(nested));
}

function hasStackWith(entry: LogEntry, text: string): boolean {
  return stringsInside(entry).some((line) => line.includes(text) && /\n\s+at /.test(line));
}

describe("errorCodeStatuses", () => {
  it.each([
    ["validationFailed", 400],
    ["unauthorized", 401],
    ["forbidden", 403],
    ["notFound", 404],
    ["conflict", 409],
    ["payloadTooLarge", 413],
    ["rateLimited", 429],
    ["internalError", 500],
    ["contextInvalid", 400],
  ] as const)("код %s даёт статус %i", (code, status) => {
    expect(errorCodeStatuses[code]).toBe(status);
  });

  it("есть статус для каждого кода из protocol", () => {
    expect(Object.keys(errorCodeStatuses).sort()).toEqual(Object.values(errorCodes).sort());
  });
});

describe("ApiException", () => {
  it("conflict даёт статус 409, код и сообщение", () => {
    const exception = new ApiException({
      code: "conflict",
      message: "Conversation is already assigned",
    });

    expect(exception.getStatus()).toBe(409);
    expect(exception.code).toBe("conflict");
    expect(exception.message).toBe("Conversation is already assigned");
    expect(exception.details).toBeUndefined();
  });

  it("хранит details", () => {
    const details = [{ path: "seq", message: "too big" }];

    const exception = new ApiException({ code: "conflict", message: "x", details });

    expect(exception.details).toEqual(details);
  });

  it.each(Object.entries(errorCodeStatuses))("код %s даёт статус %i", (code, status) => {
    const exception = new ApiException({ code: code as ErrorCode, message: "x" });

    expect(exception.getStatus()).toBe(status);
  });
});

describe("toErrorResponse для ApiException", () => {
  const requestId = "11111111-1111-4111-8111-111111111111";

  it("берёт статус, код и сообщение из исключения, без details", () => {
    const body = toErrorResponse(
      new ApiException({ code: "conflict", message: "Conversation is already assigned" }),
      requestId,
    );

    expect(body).toEqual({
      statusCode: 409,
      message: "Conversation is already assigned",
      code: "conflict",
      requestId,
    });
    expect(Object.hasOwn(body, "details")).toBe(false);
  });

  it("переносит details", () => {
    const body = toErrorResponse(
      new ApiException({
        code: "conflict",
        message: "Conversation is already assigned",
        details: [{ path: "seq", message: "too big" }],
      }),
      requestId,
    );

    expect(body.details).toEqual([{ path: "seq", message: "too big" }]);
  });

  it("код со статусом не из таблицы errorCodeOfStatus сохраняет свой код", () => {
    const body = toErrorResponse(
      new ApiException({ code: "contextInvalid", message: "Context too large" }),
      requestId,
    );

    expect(body.statusCode).toBe(400);
    expect(body.code).toBe("contextInvalid");
  });

  it("internalError прячет сообщение", () => {
    const body = toErrorResponse(
      new ApiException({ code: "internalError", message: "replica lag secret" }),
      requestId,
    );

    expect(body).toEqual({
      statusCode: 500,
      message: internalErrorMessage,
      code: "internalError",
      requestId,
    });
  });
});

describe.each(["production", "development"])(
  "ошибки сервера через HTTP в режиме %s",
  { timeout: 20_000 },
  (mode) => {
    const lines: string[] = [];
    let app: INestApplication | undefined;
    let baseUrl: string;

    beforeAll(async () => {
      const probe = await startZoneProbeApp([ServerErrorsProbeController], { SOWA_ENV: mode });
      redirectLogsTo((line) => lines.push(line));
      app = probe.app;
      baseUrl = `http://127.0.0.1:${probe.ports.public}`;
    });

    afterAll(async () => {
      await app?.close();
      app = undefined;
      vi.unstubAllEnvs();
    });

    function entries(): LogEntry[] {
      return lines.map((line) => JSON.parse(line) as LogEntry);
    }

    function errorEntriesOf(requestId: unknown): LogEntry[] {
      return entries().filter(
        (entry) => entry.level === errorLevel && entry.requestId === requestId,
      );
    }

    async function call(name: string) {
      const response = await fetch(`${baseUrl}${probePath}/${name}`);
      const text = await response.text();
      const body = JSON.parse(text) as Record<string, unknown>;
      expect(body.requestId).toBe(response.headers.get("x-request-id"));
      expect(errorResponseSchema.parse(body)).toEqual(body);
      return { status: response.status, text, body };
    }

    it("ApiException conflict даёт 409 с кодом и сообщением, без details", async () => {
      const { status, body } = await call("conflict");

      expect(status).toBe(409);
      expect(body).toEqual({
        statusCode: 409,
        message: "Conversation is already assigned",
        code: "conflict",
        requestId: body.requestId,
      });
    });

    it("ApiException с details отдаёт те же details", async () => {
      const { status, body } = await call("conflict-details");

      expect(status).toBe(409);
      expect(body.code).toBe("conflict");
      expect(body.details).toEqual([{ path: "seq", message: "too big" }]);
    });

    it("ApiException forbidden даёт 403", async () => {
      const { status, body } = await call("forbidden");

      expect(status).toBe(403);
      expect(body.code).toBe("forbidden");
      expect(body.message).toBe("Not your conversation");
    });

    it("ApiException internalError даёт 500 без своего сообщения", async () => {
      const { status, text, body } = await call("api-internal");

      expect(status).toBe(500);
      expect(body.code).toBe("internalError");
      expect(body.message).toBe(internalErrorMessage);
      expect(text).not.toContain("replica lag secret");
    });

    it("обычная Error даёт ровно тело internalError без текста и пути", async () => {
      const { status, text, body } = await call("crash");

      expect(status).toBe(500);
      expect(body).toEqual({
        statusCode: 500,
        message: "Internal server error",
        code: "internalError",
        requestId: body.requestId,
      });
      expect(text).not.toContain("database exploded");
      expect(text).not.toContain("/srv/app");
      expect(text).not.toContain("stack");
    });

    it("в логе есть запись error с текстом и стеком исходной ошибки", async () => {
      const { body } = await call("crash");

      await vi.waitFor(() => {
        const found = errorEntriesOf(body.requestId).some((entry) =>
          hasStackWith(entry, crashText),
        );
        expect(found, lines.join("\n")).toBe(true);
      });
    });

    it("ServiceUnavailableException даёт 503 internalError без текста, текст в логе", async () => {
      const { status, text, body } = await call("unavailable");

      expect(status).toBe(503);
      expect(body.code).toBe("internalError");
      expect(body.message).toBe("Internal server error");
      expect(text).not.toContain(poolText);
      await vi.waitFor(() => {
        const found = errorEntriesOf(body.requestId).some((entry) =>
          stringsInside(entry).some((value) => value.includes(poolText)),
        );
        expect(found, lines.join("\n")).toBe(true);
      });
    });

    it.each(["conflict", "nest-forbidden"])(
      "ошибка ниже 500 (%s) не пишется в лог уровня error",
      async (name) => {
        const { body } = await call(name);
        await vi.waitFor(() => {
          const finished = entries().some(
            (entry) => entry.requestId === body.requestId && entry.res !== undefined,
          );
          expect(finished, lines.join("\n")).toBe(true);
        });

        expect(errorEntriesOf(body.requestId)).toEqual([]);
      },
    );
  },
);
