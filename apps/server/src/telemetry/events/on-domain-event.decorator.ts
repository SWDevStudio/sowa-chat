import { OnEvent } from "@nestjs/event-emitter";
import type { DomainEventHandler, DomainEventName } from "./domain-events.js";

export function OnDomainEvent<Name extends DomainEventName>(name: Name) {
  const onEvent = OnEvent(name, { suppressErrors: false });
  return (
    target: object,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<DomainEventHandler<Name>>,
  ): void => {
    onEvent(target, key, descriptor);
  };
}
