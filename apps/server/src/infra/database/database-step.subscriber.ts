import { Inject, Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import type { AfterQueryEvent, DataSource, EntitySubscriberInterface } from "typeorm";
import { OperationSteps } from "../../telemetry/operation-steps/operation-steps.js";

@Injectable()
export class DatabaseStepSubscriber implements EntitySubscriberInterface {
  constructor(
    @InjectDataSource() dataSource: DataSource,
    @Inject(OperationSteps) private readonly operationSteps: OperationSteps,
  ) {
    dataSource.subscribers.push(this);
  }

  afterQuery(event: AfterQueryEvent): void {
    if (event.executionTime === undefined) {
      return;
    }
    this.operationSteps.record("db", event.executionTime);
  }
}
