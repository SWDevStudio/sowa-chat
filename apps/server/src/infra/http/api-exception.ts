import { HttpException } from "@nestjs/common";
import type { ErrorCode, ErrorResponse } from "@sowa-chat/protocol";

export const errorCodeStatuses = {
  validationFailed: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  payloadTooLarge: 413,
  rateLimited: 429,
  internalError: 500,
  contextInvalid: 400,
} satisfies Record<ErrorCode, number>;

type ErrorDetail = NonNullable<ErrorResponse["details"]>[number];

interface ApiExceptionInput {
  code: ErrorCode;
  message: string;
  details?: ErrorDetail[];
}

export class ApiException extends HttpException {
  readonly code: ErrorCode;
  readonly details: ErrorDetail[] | undefined;

  constructor({ code, message, details }: ApiExceptionInput) {
    super(message, errorCodeStatuses[code]);
    this.code = code;
    this.details = details;
  }
}
