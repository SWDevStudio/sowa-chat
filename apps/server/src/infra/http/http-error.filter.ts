import { Catch } from "@nestjs/common";
import type { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import type { Response } from "express";
import { requestIdHeader } from "../request-id/request-id.js";
import { toErrorResponse } from "./error-response.js";

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    if (host.getType() !== "http") {
      throw exception;
    }
    const response = host.switchToHttp().getResponse<Response>();
    const body = toErrorResponse(exception, requestIdOf(response));
    response.status(body.statusCode).json(body);
  }
}

function requestIdOf(response: Response): string {
  const requestId = response.getHeader(requestIdHeader);
  return typeof requestId === "string" ? requestId : "";
}
