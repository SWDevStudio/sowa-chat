import { AuditLogEntry } from "./domain/audit/audit-log-entry.entity.js";
import { Channel } from "./domain/channels/channel.entity.js";
import { Conversation } from "./domain/conversations/conversation.entity.js";
import { ConversationEvent } from "./domain/conversations/conversation-event.entity.js";
import { Message } from "./domain/conversations/message.entity.js";
import { Participant } from "./domain/conversations/participant.entity.js";
import { ApiKey } from "./domain/keys/api-key.entity.js";
import { IdentityKey } from "./domain/keys/identity-key.entity.js";
import { Project } from "./domain/projects/project.entity.js";
import { Visitor } from "./domain/visitors/visitor.entity.js";
import type { DatabaseEntity } from "./infra/database/database-options.js";

export const databaseEntities: DatabaseEntity[] = [
  Project,
  Visitor,
  Channel,
  Conversation,
  Participant,
  Message,
  ConversationEvent,
  AuditLogEntry,
  ApiKey,
  IdentityKey,
];
