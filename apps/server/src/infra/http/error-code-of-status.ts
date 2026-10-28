import { errorCodes } from "@sowa-chat/protocol";
import type { ErrorCode } from "@sowa-chat/protocol";
import { errorCodeStatuses } from "./api-exception.js";

function indexCodesByStatus(): Map<number, ErrorCode> {
  const codeByStatus = new Map<number, ErrorCode>();
  for (const code of Object.values(errorCodes)) {
    const status = errorCodeStatuses[code];
    if (!codeByStatus.has(status)) {
      codeByStatus.set(status, code);
    }
  }
  return codeByStatus;
}

const errorCodeByStatus = indexCodesByStatus();

export function errorCodeOfStatus(status: number): ErrorCode {
  const code = errorCodeByStatus.get(status);
  if (code) {
    return code;
  }
  return status >= 500 ? errorCodes.internalError : errorCodes.validationFailed;
}
