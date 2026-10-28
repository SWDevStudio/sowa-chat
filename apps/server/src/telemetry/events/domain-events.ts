export interface ApiKeyEvent {
  apiKeyId: string;
  projectId: string;
  kind: "server" | "bot";
  prefix: string;
  botId: string | null;
  actorKind: "cli" | "system";
}

export interface DomainEvents {
  "apiKey.issued": ApiKeyEvent;
  "apiKey.revoked": ApiKeyEvent;
}

export type DomainEventName = keyof DomainEvents & string;

export type DomainEventHandler<Name extends DomainEventName> = (
  data: DomainEvents[Name],
) => void | Promise<void>;
