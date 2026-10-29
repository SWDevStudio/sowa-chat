import { Catch } from "@nestjs/common";
import type { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import type { Response } from "express";
import { InvalidRefreshTokenError } from "../../domain/visitors/visitor-sessions.service.js";
import { ApiException } from "../../infra/http/api-exception.js";
import { toErrorResponse } from "../../infra/http/error-response.js";
import { requestIdOfResponse } from "../../infra/request-id/request-id.js";

@Catch(InvalidRefreshTokenError)
export class InvalidRefreshTokenFilter implements ExceptionFilter {
  catch(error: InvalidRefreshTokenError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const exception = new ApiException({ code: "unauthorized", message: error.message });
    const body = toErrorResponse(exception, requestIdOfResponse(response));
    response.status(body.statusCode).json(body);
  }
}
