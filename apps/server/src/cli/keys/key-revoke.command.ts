import { Inject } from "@nestjs/common";
import { Command, CommandRunner, Option } from "nest-commander";
import { ApiKeysService } from "../../domain/keys/api-keys.service.js";
import { keyPrefixes } from "../../domain/keys/key-format.js";
import { writeLine } from "../cli-output.js";

interface KeyRevokeOptions {
  prefix: string;
}

const serverKeyPrefix = `${keyPrefixes.serverKey}_`;

@Command({ name: "key:revoke", description: "Revoke a serverKey by its prefix" })
export class KeyRevokeCommand extends CommandRunner {
  constructor(@Inject(ApiKeysService) private readonly apiKeys: ApiKeysService) {
    super();
  }

  @Option({ flags: "--prefix <prefix>", description: "Prefix of the serverKey", required: true })
  parsePrefix(value: string): string {
    return value;
  }

  async run(_passedParams: string[], options: KeyRevokeOptions): Promise<void> {
    const { prefix } = options;
    if (!prefix.startsWith(serverKeyPrefix)) {
      throw new Error(`Prefix must start with ${serverKeyPrefix}`);
    }
    const revoked = await this.apiKeys.revoke({ prefix, actorKind: "cli" });
    if (!revoked) {
      throw new Error(`No active server key with prefix "${prefix}"`);
    }
    writeLine(`revoked: ${prefix}`);
  }
}
