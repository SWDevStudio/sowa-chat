import { Inject, Injectable } from "@nestjs/common";
import { TransactionHost } from "@nestjs-cls/transactional";
import type { TransactionalAdapterTypeOrm } from "@nestjs-cls/transactional-adapter-typeorm";
import { DomainEventBus } from "../../telemetry/events/domain-event-bus.js";
import type { EncryptedField } from "./encrypted-field.js";
import { encryptedFields } from "./encrypted-field.js";
import { EncryptionService, SecretDecryptionError } from "./encryption.service.js";

export const reencryptionBatchSize = 500;

export interface ReencryptInput {
  actorKind: "cli";
}

export interface UndecryptableValue {
  table: string;
  column: string;
  id: string;
}

export interface FieldReencryption {
  table: string;
  column: string;
  reencrypted: number;
}

export interface ReencryptionReport {
  fields: FieldReencryption[];
  undecryptable: UndecryptableValue[];
}

export interface FieldVersionCount {
  table: string;
  column: string;
  version: number | null;
  count: number;
}

interface SecretRow {
  id: string;
  value: string;
}

interface BatchResult {
  lastId: string | undefined;
  reencrypted: number;
  undecryptable: UndecryptableValue[];
}

interface FieldResult {
  reencrypted: number;
  undecryptable: UndecryptableValue[];
}

interface VersionRow {
  version: number | null;
  count: number;
}

function toVersionCount(field: EncryptedField, row: VersionRow): FieldVersionCount {
  return { ...field, version: row.version, count: row.count };
}

@Injectable()
export class SecretsReencryptionService {
  constructor(
    @Inject(encryptedFields) private readonly fields: EncryptedField[],
    @Inject(EncryptionService) private readonly encryption: EncryptionService,
    @Inject(TransactionHost)
    private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>,
    @Inject(DomainEventBus) private readonly bus: DomainEventBus,
  ) {}

  async reencrypt(input: ReencryptInput): Promise<ReencryptionReport> {
    const currentVersion = this.encryption.currentVersion;
    if (currentVersion === undefined) {
      throw new Error("SOWA_ENCRYPTION_KEYS is not set");
    }

    const report: ReencryptionReport = { fields: [], undecryptable: [] };
    for (const field of this.fields) {
      const result = await this.reencryptField(field, currentVersion);
      report.fields.push({ ...field, reencrypted: result.reencrypted });
      report.undecryptable.push(...result.undecryptable);
    }
    await this.bus.publish("secrets.reencrypted", {
      reencrypted: report.fields.reduce((total, field) => total + field.reencrypted, 0),
      undecryptable: report.undecryptable.length,
      actorKind: input.actorKind,
    });
    return report;
  }

  async countVersions(): Promise<FieldVersionCount[]> {
    const counts: FieldVersionCount[] = [];
    for (const field of this.fields) {
      const rows = await this.selectVersionCounts(field);
      counts.push(...rows.map((row) => toVersionCount(field, row)));
    }
    return counts;
  }

  private async reencryptField(
    field: EncryptedField,
    currentVersion: number,
  ): Promise<FieldResult> {
    const result: FieldResult = { reencrypted: 0, undecryptable: [] };
    let cursor: string | undefined;
    do {
      const batch = await this.txHost.withTransaction(() =>
        this.reencryptBatch(field, currentVersion, cursor),
      );
      result.reencrypted += batch.reencrypted;
      result.undecryptable.push(...batch.undecryptable);
      cursor = batch.lastId;
    } while (cursor !== undefined);
    return result;
  }

  private async reencryptBatch(
    field: EncryptedField,
    currentVersion: number,
    cursor: string | undefined,
  ): Promise<BatchResult> {
    const rows = await this.selectBatch(field, currentVersion, cursor);
    const batch: BatchResult = {
      lastId: rows.at(-1)?.id,
      reencrypted: 0,
      undecryptable: [],
    };
    for (const row of rows) {
      const newValue = this.tryReencryptValue(row.value);
      if (newValue === undefined) {
        batch.undecryptable.push({ ...field, id: row.id });
      } else if (await this.updateValue(field, row, newValue)) {
        batch.reencrypted += 1;
      }
    }
    return batch;
  }

  private tryReencryptValue(value: string): string | undefined {
    try {
      return this.encryption.encrypt(this.encryption.decrypt(value));
    } catch (error) {
      if (error instanceof SecretDecryptionError) {
        return undefined;
      }
      throw error;
    }
  }

  private async selectBatch(
    field: EncryptedField,
    currentVersion: number,
    cursor: string | undefined,
  ): Promise<SecretRow[]> {
    const table = this.escape(field.table);
    const column = this.escape(field.column);
    const parameters: string[] = [`v${currentVersion}.%`];
    let cursorCondition = "";
    if (cursor !== undefined) {
      parameters.push(cursor);
      cursorCondition = ' AND "id" > $2';
    }
    return this.txHost.tx.query(
      `SELECT "id", ${column} AS "value" FROM ${table} ` +
        `WHERE ${column} IS NOT NULL AND ${column} NOT LIKE $1${cursorCondition} ` +
        `ORDER BY "id" LIMIT ${reencryptionBatchSize}`,
      parameters,
    );
  }

  private async updateValue(
    field: EncryptedField,
    row: SecretRow,
    newValue: string,
  ): Promise<boolean> {
    const table = this.escape(field.table);
    const column = this.escape(field.column);
    const [, affected]: [unknown, number] = await this.txHost.tx.query(
      `UPDATE ${table} SET ${column} = $1 WHERE "id" = $2 AND ${column} = $3`,
      [newValue, row.id, row.value],
    );
    return affected > 0;
  }

  private async selectVersionCounts(field: EncryptedField): Promise<VersionRow[]> {
    const table = this.escape(field.table);
    const column = this.escape(field.column);
    return this.txHost.tx.query(
      `SELECT substring(${column} from '^v([0-9]+)\\.')::int AS "version", count(*)::int AS "count" ` +
        `FROM ${table} WHERE ${column} IS NOT NULL GROUP BY 1 ORDER BY 1 NULLS LAST`,
    );
  }

  private escape(name: string): string {
    return this.txHost.tx.connection.driver.escape(name);
  }
}
