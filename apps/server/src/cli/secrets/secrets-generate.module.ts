import { Module } from "@nestjs/common";
import { SecretsGenerateCommand } from "./secrets-generate.command.js";

@Module({ providers: [SecretsGenerateCommand] })
export class SecretsGenerateModule {}
