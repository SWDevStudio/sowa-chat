---
title: Use Structured Logging
impact: MEDIUM-HIGH
impactDescription: Structured logging enables effective debugging and monitoring
tags: devops, logging, structured-logs, pino
---

## Use Structured Logging

Log through `nestjs-pino`: JSON output, log levels, and a `requestId` on every line so one request can be traced across services. Do not write a custom JSON logger and do not use `console.log`. Redact secrets and tokens. Business actions (who took, transferred or deleted a conversation) go to `audit_log` in the database, not to logs.

**Incorrect (using console.log in production):**

```typescript
// Use console.log in production
@Injectable()
export class UsersService {
  async createUser(dto: CreateUserDto): Promise<User> {
    console.log('Creating user:', dto);
    // Not structured, no levels, lost in production logs

    try {
      const user = await this.repo.save(dto);
      console.log('User created:', user.id);
      return user;
    } catch (error) {
      console.log('Error:', error); // Using log for errors
      throw error;
    }
  }
}

// Log sensitive data
console.log('Login attempt:', { email, password }); // SECURITY RISK!

// Inconsistent log format
logger.log('User ' + userId + ' created at ' + new Date());
// Hard to parse, no structure
```

**Correct (nestjs-pino with request id and redaction):**

```typescript
// app.module.ts
import { randomUUID } from 'node:crypto';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        transport: process.env.NODE_ENV === 'production' ? undefined : { target: 'pino-pretty' },
        genReqId: (req, res) => {
          const requestId = req.headers['x-request-id'] ?? randomUUID();
          res.setHeader('x-request-id', requestId);
          return requestId;
        },
        redact: ['req.headers.authorization', 'req.headers.cookie', '*.token', '*.password'],
      },
    }),
  ],
})
export class AppModule {}

// main.ts: route Nest's own logs through pino
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  await app.listen(3000);
}

// Usage: data object first, message second
@Injectable()
export class UsersService {
  constructor(
    @InjectPinoLogger(UsersService.name)
    private readonly logger: PinoLogger,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.repo.save(dto);
    this.logger.info({ userId: user.id }, 'User created');
    return user;
  }
}
```

Every line written during a request carries the same `req.id`, so the logs of one request can be found by its `x-request-id`.

Reference: [nestjs-pino](https://github.com/iamolegga/nestjs-pino), [NestJS Logger](https://docs.nestjs.com/techniques/logger)
