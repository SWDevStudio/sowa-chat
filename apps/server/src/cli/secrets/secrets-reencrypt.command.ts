import { Inject } from "@nestjs/common";
import { Command, CommandRunner, Option } from "nest-commander";
import type { EncryptedField } from "../../infra/crypto/encrypted-field.js";
import { encryptedFields } from "../../infra/crypto/encrypted-field.js";
import type {
  FieldReencryption,
  FieldVersionCount,
  UndecryptableValue,
} from "../../infra/crypto/secrets-reencryption.service.js";
import { SecretsReencryptionService } from "../../infra/crypto/secrets-reencryption.service.js";
import { writeLine, writeTable } from "../cli-output.js";

interface SecretsReencryptOptions {
  dryRun?: boolean;
}

const dryRunHeader = ["field", "version", "count"];
const reencryptHeader = ["field", "reencrypted"];
const emptyRegistryMessage = "no encrypted fields registered";
const unknownVersion = "unknown";

function fieldName(field: EncryptedField): string {
  return `${field.table}.${field.column}`;
}

function toVersionRow(count: FieldVersionCount): string[] {
  const version = count.version === null ? unknownVersion : `v${count.version}`;
  return [fieldName(count), version, String(count.count)];
}

function toReencryptionRow(field: FieldReencryption): string[] {
  return [fieldName(field), String(field.reencrypted)];
}

function describeUndecryptable(value: UndecryptableValue): string {
  return `undecryptable: ${fieldName(value)} ${value.id}`;
}

@Command({
  name: "secrets:reencrypt",
  description: "Re-encrypt stored secrets with the current encryption key",
})
export class SecretsReencryptCommand extends CommandRunner {
  constructor(
    @Inject(SecretsReencryptionService)
    private readonly reencryption: SecretsReencryptionService,
    @Inject(encryptedFields) private readonly fields: EncryptedField[],
  ) {
    super();
  }

  @Option({
    flags: "--dry-run",
    description: "Show key versions of stored secrets without changing them",
  })
  parseDryRun(): boolean {
    return true;
  }

  async run(_passedParams: string[], options: SecretsReencryptOptions): Promise<void> {
    if (options.dryRun) {
      await this.dryRun();
      return;
    }
    await this.reencrypt();
  }

  private async dryRun(): Promise<void> {
    if (this.fields.length === 0) {
      writeLine(emptyRegistryMessage);
      return;
    }
    const counts = await this.reencryption.countVersions();
    writeTable(dryRunHeader, counts.map(toVersionRow));
  }

  private async reencrypt(): Promise<void> {
    const report = await this.reencryption.reencrypt({ actorKind: "cli" });
    if (report.fields.length === 0) {
      writeLine(emptyRegistryMessage);
      return;
    }
    writeTable(reencryptHeader, report.fields.map(toReencryptionRow));
    for (const value of report.undecryptable) {
      writeLine(describeUndecryptable(value));
    }
    if (report.undecryptable.length > 0) {
      throw new Error(`${report.undecryptable.length} values cannot be decrypted`);
    }
  }
}
