import { HttpException } from "@nestjs/common";
import { errorCodes } from "@sowa-chat/protocol";
import type { ErrorResponse } from "@sowa-chat/protocol";
import { ZodValidationException } from "nestjs-zod";
import { ZodError } from "zod";
import { ApiException } from "./api-exception.js";
import { errorCodeOfStatus } from "./error-code-of-status.js";

export const internalErrorMessage = "Internal server error";

const validationMessage = "Validation failed";

export function toErrorResponse(exception: unknown, requestId: string): ErrorResponse {
  if (exception instanceof ZodValidationException) {
    return validationErrorResponse(exception.getZodError(), requestId);
  }
  if (exception instanceof ApiException) {
    return apiErrorResponse(exception, requestId);
  }
  if (exception instanceof HttpException) {
    return httpErrorResponse(exception, requestId);
  }
  return internalErrorResponse(requestId);
}

function validationErrorResponse(zodError: unknown, requestId: string): ErrorResponse {
  const body: ErrorResponse = {
    statusCode: 400,
    message: validationMessage,
    code: errorCodes.validationFailed,
    requestId,
  };
  if (!(zodError instanceof ZodError)) {
    return body;
  }
  return {
    ...body,
    details: zodError.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    })),
  };
}

function apiErrorResponse(exception: ApiException, requestId: string): ErrorResponse {
  const statusCode = exception.getStatus();
  if (statusCode >= 500) {
    return internalErrorResponse(requestId, statusCode);
  }
  const body: ErrorResponse = {
    statusCode,
    message: exception.message,
    code: exception.code,
    requestId,
  };
  if (!exception.details) {
    return body;
  }
  return { ...body, details: exception.details };
}

function httpErrorResponse(exception: HttpException, requestId: string): ErrorResponse {
  const status = exception.getStatus();
  if (status >= 500) {
    return internalErrorResponse(requestId, status);
  }
  return {
    statusCode: status,
    message: exception.message,
    code: errorCodeOfStatus(status),
    requestId,
  };
}

function internalErrorResponse(requestId: string, statusCode = 500): ErrorResponse {
  return {
    statusCode,
    message: internalErrorMessage,
    code: errorCodes.internalError,
    requestId,
  };
}
