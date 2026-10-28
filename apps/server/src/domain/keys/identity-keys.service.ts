import { Inject, Injectable } from "@nestjs/common";
import { Transactional } from "@nestjs-cls/transactional";
import { DomainEventBus } from "../../telemetry/events/domain-event-bus.js";
import type { IdentityKeyEvent } from "../../telemetry/events/domain-events.js";
import type { KeyActorKind } from "./api-keys.service.js";
import type { IdentityKey, IdentityKeyAlgorithm } from "./identity-key.entity.js";
import { parseIdentityPublicKey } from "./identity-key-pem.js";
import { IdentityKeysRepository } from "./identity-keys.repository.js";

const kidPattern = /^[A-Za-z0-9._-]{1,128}$/;

export interface AddIdentityKeyInput {
  projectId: string;
  kid: string;
  pem: string;
  actorKind: KeyActorKind;
}

export interface AddedIdentityKey {
  identityKeyId: string;
  kid: string;
  alg: IdentityKeyAlgorithm;
}

export interface RevokeIdentityKeyInput {
  projectId: string;
  kid: string;
  actorKind: KeyActorKind;
}

export class IdentityKeyKidTakenError extends Error {
  constructor(kid: string) {
    super(`Identity key "${kid}" already exists in this project`);
  }
}

export class InvalidIdentityKeyIdError extends Error {
  constructor(kid: string) {
    super(`Invalid kid "${kid}": use 1-128 characters A-Z, a-z, 0-9, ".", "_", "-"`);
  }
}

@Injectable()
export class IdentityKeysService {
  constructor(
    @Inject(IdentityKeysRepository) private readonly repository: IdentityKeysRepository,
    @Inject(DomainEventBus) private readonly bus: DomainEventBus,
  ) {}

  @Transactional()
  async add(input: AddIdentityKeyInput): Promise<AddedIdentityKey> {
    if (!kidPattern.test(input.kid)) {
      throw new InvalidIdentityKeyIdError(input.kid);
    }
    const { alg, publicKey } = await parseIdentityPublicKey(input.pem);
    if (await this.repository.findByKid(input.projectId, input.kid)) {
      throw new IdentityKeyKidTakenError(input.kid);
    }
    const row = await this.repository.create({
      projectId: input.projectId,
      kid: input.kid,
      alg,
      publicKey,
    });
    await this.bus.publish("identityKey.added", toEvent(row, input.actorKind));
    return { identityKeyId: row.id, kid: row.kid, alg: row.alg };
  }

  async list(projectId: string): Promise<IdentityKey[]> {
    return this.repository.findByProject(projectId);
  }

  @Transactional()
  async revoke(input: RevokeIdentityKeyInput): Promise<boolean> {
    const row = await this.repository.revokeByKid(input.projectId, input.kid);
    if (!row) {
      return false;
    }
    await this.bus.publish("identityKey.revoked", toEvent(row, input.actorKind));
    return true;
  }
}

function toEvent(row: IdentityKey, actorKind: KeyActorKind): IdentityKeyEvent {
  return {
    identityKeyId: row.id,
    projectId: row.projectId,
    kid: row.kid,
    alg: row.alg,
    actorKind,
  };
}
