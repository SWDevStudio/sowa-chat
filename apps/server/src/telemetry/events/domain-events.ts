export interface DomainEvents {}

export type DomainEventName = keyof DomainEvents & string;

export type DomainEventHandler<Name extends DomainEventName> = (
  data: DomainEvents[Name],
) => void | Promise<void>;
