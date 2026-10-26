---
title: Validate All Input with Zod DTOs and Pipes
impact: HIGH
impactDescription: First line of defense against attacks
tags: security, validation, dto, pipes, zod
---

## Validate All Input with Zod DTOs and Pipes

Always validate incoming data with Zod schemas turned into DTOs by nestjs-zod, and register `ZodValidationPipe` globally. Never trust user input. Validate all request bodies, query parameters, and route parameters before processing. Schemas live in `@sowa-chat/protocol` so the backend and the SDKs share the same contract.

**Incorrect (trust raw input without validation):**

```typescript
// Trust raw input without validation
@Controller('users')
export class UsersController {
  @Post()
  create(@Body() body: any) {
    // body could contain anything - SQL injection, XSS, etc.
    return this.usersService.create(body);
  }

  @Get()
  findAll(@Query() query: any) {
    // query.limit could be "'; DROP TABLE users; --"
    return this.usersService.findAll(query.limit);
  }
}

// DTO as a plain class: no runtime validation at all
export class CreateUserDto {
  name: string;    // No validation
  email: string;   // Could be "not-an-email"
  age: number;     // Could be "abc" or -999
}
```

**Correct (Zod schemas, nestjs-zod DTOs and a global ZodValidationPipe):**

```typescript
// app.module.ts: register the pipe globally
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  providers: [{ provide: APP_PIPE, useClass: ZodValidationPipe }],
})
export class AppModule {}

// packages/protocol: shared schemas
import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().pipe(z.email()),
  age: z.int().min(0).max(150),
  password: z
    .string()
    .min(8)
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
});

export const FindUsersQuerySchema = z.object({
  search: z.string().max(100).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

export const UserIdParamSchema = z.object({
  id: z.uuid(),
});

// apps/server: DTOs built from the shared schemas
import { createZodDto } from 'nestjs-zod';

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
export class FindUsersQueryDto extends createZodDto(FindUsersQuerySchema) {}
export class UserIdParamDto extends createZodDto(UserIdParamSchema) {}

@Controller('users')
export class UsersController {
  @Post()
  create(@Body() dto: CreateUserDto): Promise<User> {
    // dto is guaranteed to be valid
    return this.usersService.create(dto);
  }

  @Get()
  findAll(@Query() query: FindUsersQueryDto): Promise<User[]> {
    // query.limit is a number in range, defaults are applied
    return this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param() params: UserIdParamDto): Promise<User> {
    // params.id is a valid UUID
    return this.usersService.findById(params.id);
  }
}
```

Unknown keys are stripped by `z.object()` by default. Use `z.strictObject()` when extra keys must be rejected with `400`.

Reference: [nestjs-zod](https://github.com/BenLorantfy/nestjs-zod), [Zod](https://zod.dev)
