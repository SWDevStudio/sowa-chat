import { NestFactory } from "@nestjs/core";
import type { ConfigType } from "@nestjs/config";
import { AppModule } from "./app.module.js";
import { portsConfig } from "./infra/config/ports.config.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const ports = app.get<ConfigType<typeof portsConfig>>(portsConfig.KEY);
  await app.listen(ports.public);
}
await bootstrap();
