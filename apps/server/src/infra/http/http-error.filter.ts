import { Catch, Logger } from "@nestjs/common";
import type { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import type { Response } from "express";
import { ZodSerializationException } from "nestjs-zod";
import { ZodError } from "zod";
import { requestIdHeader } from "../request-id/request-id.js";
import { toErrorResponse } from "./error-response.js";

const responseMismatchMessage = "Response does not match schema";

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpErrorFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    if (host.getType() !== "http") {
      throw exception;
    }
    const response = host.switchToHttp().getResponse<Response>();
    const body = toErrorResponse(exception, requestIdOf(response));
    if (body.statusCode >= 500) {
      this.logServerError(exception);
    }
    response.status(body.statusCode).json(body);
  }

  private logServerError(exception: unknown): void {
    const responseError = responseZodErrorOf(exception);
    if (!responseError) {
      this.logger.error(exception);
      return;
    }
    this.logger.error(
      { err: exception, responseIssues: responseError.issues },
      responseMismatchMessage,
    );
  }
}

function responseZodErrorOf(exception: unknown): ZodError | undefined {
  if (!(exception instanceof ZodSerializationException)) {
    return undefined;
  }
  const zodError = exception.getZodError();
  return zodError instanceof ZodError ? zodError : undefined;
}

function requestIdOf(response: Response): string {
  const requestId = response.getHeader(requestIdHeader);
  return typeof requestId === "string" ? requestId : "";
}
