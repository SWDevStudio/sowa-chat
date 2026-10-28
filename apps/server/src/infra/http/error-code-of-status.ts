import { errorCodes } from "@sowa-chat/protocol";
import type { ErrorCode } from "@sowa-chat/protocol";

const errorCodeByStatus = new Map<number, ErrorCode>([
  [400, errorCodes.validationFailed],
  [401, errorCodes.unauthorized],
  [403, errorCodes.forbidden],
  [404, errorCodes.notFound],
  [409, errorCodes.conflict],
  [413, errorCodes.payloadTooLarge],
  [429, errorCodes.rateLimited],
]);

export function errorCodeOfStatus(status: number): ErrorCode {
  const code = errorCodeByStatus.get(status);
  if (code) {
    return code;
  }
  return status >= 500 ? errorCodes.internalError : errorCodes.validationFailed;
}
