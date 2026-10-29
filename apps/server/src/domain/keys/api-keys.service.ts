import { Inject, Injectable } from "@nestjs/common";
import { Transactional } from "@nestjs-cls/transactional";
import { timingSafeEqual } from "node:crypto";
import { DomainEventBus } from "../../telemetry/events/domain-event-bus.js";
import type { ApiKeyEvent } from "../../telemetry/events/domain-events.js";
import type { ActorKind } from "../audit/actor-kind.js";
import type { ApiKey, ApiKeyKind } from "./api-key.entity.js";
import { ApiKeysRepository } from "./api-keys.repository.js";
import { generateKey, parseKey, toLookupPrefix } from "./key-format.js";
import type { KeyType } from "./key-format.js";
import { hashKey } from "./key-hash.js";

export type KeyActorKind = Extract<ActorKind, "cli" | "system">;

interface IssueApiKeyBaseInput {
  projectId: string;
  actorKind: KeyActorKind;
}

export type IssueApiKeyInput =
  | (IssueApiKeyBaseInput & { kind: "server" })
  | (IssueApiKeyBaseInput & { kind: "bot"; botId: string });

export interface IssuedApiKey {
  apiKeyId: string;
  prefix: string;
  key: string;
}

export interface VerifiedApiKey {
  apiKeyId: string;
  projectId: string;
  botId: string | null;
}

export interface RevokeApiKeyInput {
  prefix: string;
  actorKind: KeyActorKind;
}

export interface ApiKeySummary {
  prefix: string;
  createdAt: Date;
  lastUsedAt: Date | null;
  revokedAt: Date | null;
}

export const keyTypeByKind: Record<ApiKeyKind, KeyType> = {
  server: "serverKey",
  bot: "botKey",
};

@Injectable()
export class ApiKeysService {
  constructor(
    @Inject(ApiKeysRepository) private readonly repository: ApiKeysRepository,
    @Inject(DomainEventBus) private readonly bus: DomainEventBus,
  ) {}

  @Transactional()
  async issue(input: IssueApiKeyInput): Promise<IssuedApiKey> {
    const keyType = keyTypeByKind[input.kind];
    const key = generateKey(keyType);
    const row = await this.repository.create({
      projectId: input.projectId,
      kind: input.kind,
      prefix: toLookupPrefix(key),
      keyHash: hashKey(key),
      botId: input.kind === "bot" ? input.botId : null,
    });
    await this.bus.publish("apiKey.issued", toEvent(row, input.actorKind));
    return { apiKeyId: row.id, prefix: row.prefix, key };
  }

  async verify(key: string, kind: ApiKeyKind): Promise<VerifiedApiKey | undefined> {
    const parsed = parseKey(key, keyTypeByKind[kind]);
    if (!parsed) {
      return undefined;
    }
    const row = await this.repository.findByPrefix(parsed.lookupPrefix);
    if (!row || row.kind !== kind || !hashMatches(key, row.keyHash) || row.revokedAt) {
      return undefined;
    }
    await this.repository.touchLastUsedAt(row.id);
    return { apiKeyId: row.id, projectId: row.projectId, botId: row.botId };
  }

  async list(projectId: string, kind: ApiKeyKind): Promise<ApiKeySummary[]> {
    const rows = await this.repository.findByProject(projectId, kind);
    return rows.map(toSummary);
  }

  @Transactional()
  async revoke(input: RevokeApiKeyInput): Promise<boolean> {
    const row = await this.repository.revokeByPrefix(input.prefix);
    if (!row) {
      return false;
    }
    await this.bus.publish("apiKey.revoked", toEvent(row, input.actorKind));
    return true;
  }
}

function hashMatches(key: string, storedHash: Buffer): boolean {
  const hash = hashKey(key);
  return hash.length === storedHash.length && timingSafeEqual(hash, storedHash);
}

function toSummary(row: ApiKey): ApiKeySummary {
  return {
    prefix: row.prefix,
    createdAt: row.createdAt,
    lastUsedAt: row.lastUsedAt,
    revokedAt: row.revokedAt,
  };
}

function toEvent(row: ApiKey, actorKind: KeyActorKind): ApiKeyEvent {
  return {
    apiKeyId: row.id,
    projectId: row.projectId,
    kind: row.kind,
    prefix: row.prefix,
    botId: row.botId,
    actorKind,
  };
}
