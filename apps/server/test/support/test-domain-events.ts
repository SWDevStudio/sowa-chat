export interface TestHappenedEvent {
  projectId: string;
  operatorId: string;
  conversationId: string;
  deletedMessages: number;
  operatorEmail: string;
  visitorIp: string;
}

export interface TestIgnoredEvent {
  projectId: string;
}

declare module "../../src/telemetry/events/domain-events.js" {
  interface DomainEvents {
    "test.happened": TestHappenedEvent;
    "test.ignored": TestIgnoredEvent;
  }
}
