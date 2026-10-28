import { Inject, Injectable, type OnApplicationBootstrap } from "@nestjs/common";
import { OperatorsRepository } from "./operators.repository.js";

@Injectable()
export class DisabledOperators implements OnApplicationBootstrap {
  private ids = new Set<string>();

  constructor(@Inject(OperatorsRepository) private readonly operators: OperatorsRepository) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.load();
  }

  async load(): Promise<void> {
    this.ids = new Set(await this.operators.findDisabledIds());
  }

  add(operatorId: string): void {
    this.ids.add(operatorId);
  }

  remove(operatorId: string): void {
    this.ids.delete(operatorId);
  }

  has(operatorId: string): boolean {
    return this.ids.has(operatorId);
  }
}
