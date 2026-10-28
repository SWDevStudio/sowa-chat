export interface ApiKeyEvent {
  apiKeyId: string;
  projectId: string;
  kind: "server" | "bot";
  prefix: string;
  botId: string | null;
  actorKind: "cli" | "system";
}

export interface IdentityKeyEvent {
  identityKeyId: string;
  projectId: string;
  kid: string;
  alg: "EdDSA" | "ES256";
  actorKind: "cli" | "system";
}

export interface ProjectCreatedEvent {
  projectId: string;
  name: string;
  actorKind: "cli" | "system";
}

export interface DomainEvents {
  "apiKey.issued": ApiKeyEvent;
  "apiKey.revoked": ApiKeyEvent;
  "identityKey.added": IdentityKeyEvent;
  "identityKey.revoked": IdentityKeyEvent;
  "project.created": ProjectCreatedEvent;
}

export type DomainEventName = keyof DomainEvents & string;

export type DomainEventHandler<Name extends DomainEventName> = (
  data: DomainEvents[Name],
) => void | Promise<void>;
