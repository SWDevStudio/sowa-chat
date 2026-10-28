import { SetMetadata } from "@nestjs/common";

export const supervisorOnlyMetadataKey = "supervisorOnly";

export function SupervisorOnly() {
  return SetMetadata(supervisorOnlyMetadataKey, true);
}
