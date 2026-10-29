import { Command, CommandRunner, Option } from "nest-commander";
import { generateKey } from "../../domain/keys/key-format.js";
import { generatedSecrets } from "../../infra/config/generated-secrets.js";
import { rotateConfiguredSecrets } from "../../infra/config/secret-rotation.js";
import { writeLine } from "../cli-output.js";

interface SecretsGenerateOptions {
  rotate?: boolean;
}

const initServerKeyName = "SOWA_INIT_SERVER_KEY";

function generateNewSecrets(): Record<string, string> {
  const variables: Record<string, string> = {};
  for (const secret of generatedSecrets) {
    Object.assign(variables, secret.generate("production"));
  }
  variables[initServerKeyName] = generateKey("serverKey");
  return variables;
}

@Command({
  name: "secrets:generate",
  description: "Print new production secrets as NAME=value lines",
})
export class SecretsGenerateCommand extends CommandRunner {
  @Option({
    flags: "--rotate",
    description:
      "Add a new key version to SOWA_ENCRYPTION_KEYS and SOWA_TOKEN_SIGNING_KEYS from the environment",
  })
  parseRotate(): boolean {
    return true;
  }

  async run(_passedParams: string[], options: SecretsGenerateOptions): Promise<void> {
    const variables = options.rotate ? rotateConfiguredSecrets() : generateNewSecrets();
    for (const [name, value] of Object.entries(variables)) {
      writeLine(`${name}=${value}`);
    }
  }
}
