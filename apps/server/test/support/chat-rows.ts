import type { DataSource, EntityTarget, FindOptionsWhere, ObjectLiteral } from "typeorm";
import { Channel } from "../../src/domain/channels/channel.entity.js";
import { Conversation } from "../../src/domain/conversations/conversation.entity.js";
import { Message } from "../../src/domain/conversations/message.entity.js";
import type { Project } from "../../src/domain/projects/project.entity.js";
import { Visitor } from "../../src/domain/visitors/visitor.entity.js";

export interface MessageFields extends Partial<Message> {
  conversationId: string;
  seq: number;
}

export function createVisitor(
  dataSource: DataSource,
  project: Project,
  fields: Partial<Visitor> = {},
): Promise<Visitor> {
  const repository = dataSource.getRepository(Visitor);
  return repository.save(repository.create({ projectId: project.id, ...fields }));
}

export function createChannel(dataSource: DataSource, project: Project): Promise<Channel> {
  const repository = dataSource.getRepository(Channel);
  return repository.save(repository.create({ projectId: project.id, kind: "widget" }));
}

export async function createConversation(
  dataSource: DataSource,
  project: Project,
): Promise<Conversation> {
  const visitor = await createVisitor(dataSource, project);
  const channel = await createChannel(dataSource, project);
  const repository = dataSource.getRepository(Conversation);
  return repository.save(
    repository.create({
      projectId: project.id,
      visitorId: visitor.id,
      channelId: channel.id,
      status: "bot",
    }),
  );
}

export function createMessage(dataSource: DataSource, fields: MessageFields): Promise<Message> {
  const repository = dataSource.getRepository(Message);
  return repository.save(
    repository.create({ senderKind: "visitor", type: "text", body: "hello", ...fields }),
  );
}

export function countRows<Entity extends ObjectLiteral>(
  dataSource: DataSource,
  entity: EntityTarget<Entity>,
  where: FindOptionsWhere<Entity>,
): Promise<number> {
  return dataSource.getRepository(entity).countBy(where);
}

export async function errorCodeOf(action: Promise<unknown>): Promise<string | undefined> {
  const error = await action.then(
    () => undefined,
    (caught: { driverError?: { code?: string } }) => caught,
  );
  return error?.driverError?.code;
}
