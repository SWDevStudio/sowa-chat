---
title: Use ConfigModule for Environment Configuration
impact: LOW-MEDIUM
impactDescription: Proper configuration prevents deployment failures
tags: devops, configuration, environment, validation, zod
---

## Use ConfigModule for Environment Configuration

Use `@nestjs/config` for environment-based configuration. Validate the environment with a Zod schema at startup to fail fast on misconfigurations. Only the config module reads environment variable names; the rest of the code receives typed, namespaced objects via `registerAs` and `ConfigType`.

**Incorrect (accessing process.env directly):**

```typescript
// Access process.env directly
@Injectable()
export class DatabaseService {
  constructor() {
    // No validation, can fail at runtime
    this.connection = new Pool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT), // NaN if missing
      password: process.env.DB_PASSWORD, // undefined if missing
    });
  }
}

// Scattered env access
@Injectable()
export class EmailService {
  sendEmail() {
    // Different services access env differently
    const apiKey = process.env.SENDGRID_API_KEY || 'default';
    // Typos go unnoticed: process.env.SENDGRID_API_KY
  }
}
```

**Correct (use @nestjs/config with Zod validation):**

```typescript
import { ConfigModule, ConfigType, registerAs } from '@nestjs/config';
import { z } from 'zod';

// config/env.schema.ts
export const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.url(),
  REDIS_URL: z.url(),
  SOWA_PORT: z.coerce.number().int().default(3000),
  SOWA_JWT_SECRET: z.string().min(32),
});

export type Env = z.infer<typeof EnvSchema>;

export function validateEnv(rawEnv: Record<string, unknown>): Env {
  return EnvSchema.parse(rawEnv);
}

// config/database.config.ts
export const databaseConfig = registerAs('database', () => ({
  url: process.env.DATABASE_URL,
}));

// config/app.config.ts
export const appConfig = registerAs('app', () => ({
  port: Number(process.env.SOWA_PORT ?? 3000),
  environment: process.env.NODE_ENV ?? 'development',
}));

// app.module.ts
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      validate: validateEnv,
    }),
    TypeOrmModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory: (database: ConfigType<typeof databaseConfig>) => ({
        type: 'postgres',
        url: database.url,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class AppModule {}

// Inject namespaced config directly
@Injectable()
export class HttpServerService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly app: ConfigType<typeof appConfig>,
  ) {}

  getPort(): number {
    return this.app.port;
  }
}
```

If the environment does not match `EnvSchema`, `ConfigModule.forRoot` throws during bootstrap and the service does not start.

Reference: [NestJS Configuration: custom validate function](https://docs.nestjs.com/techniques/configuration#custom-validate-function)
