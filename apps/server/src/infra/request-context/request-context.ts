import { Inject, Injectable } from "@nestjs/common";
import type { OperatorRole } from "@sowa-chat/protocol";
import { ClsService } from "nestjs-cls";

const projectIdKey = "requestProjectId";
const operatorKey = "requestOperator";

export interface RequestOperator {
  operatorId: string;
  role: OperatorRole;
}

@Injectable()
export class RequestContext {
  constructor(@Inject(ClsService) private readonly cls: ClsService) {}

  setProjectId(projectId: string): void {
    this.cls.set(projectIdKey, projectId);
  }

  projectId(): string {
    return this.valueOrThrow<string>(projectIdKey, "Request project is not set");
  }

  setOperator(operator: RequestOperator): void {
    this.cls.set(operatorKey, operator);
  }

  operator(): RequestOperator {
    return this.valueOrThrow<RequestOperator>(operatorKey, "Request operator is not set");
  }

  private valueOrThrow<T>(key: string, missingMessage: string): T {
    const value: T | undefined = this.cls.get(key);
    if (value === undefined) {
      throw new Error(missingMessage);
    }
    return value;
  }
}
