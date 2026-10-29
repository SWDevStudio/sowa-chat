import { Command, CommandRunner } from "nest-commander";
import { generateKey } from "../../domain/keys/key-format.js";
import { writeLine } from "../cli-output.js";

@Command({ name: "key:generate", description: "Print a new serverKey without saving it" })
export class KeyGenerateCommand extends CommandRunner {
  async run(): Promise<void> {
    writeLine(generateKey("serverKey"));
  }
}
