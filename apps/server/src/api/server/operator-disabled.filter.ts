import { Catch } from "@nestjs/common";
import type { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import type { Response } from "express";
import { OperatorDisabledError } from "../../domain/operators/operators.service.js";
import { ApiException } from "../../infra/http/api-exception.js";
import { toErrorResponse } from "../../infra/http/error-response.js";
import { requestIdOfResponse } from "../../infra/request-id/request-id.js";

@Catch(OperatorDisabledError)
export class OperatorDisabledFilter implements ExceptionFilter {
  catch(error: OperatorDisabledError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const exception = new ApiException({ code: "forbidden", message: error.message });
    const body = toErrorResponse(exception, requestIdOfResponse(response));
    response.status(body.statusCode).json(body);
  }
}
