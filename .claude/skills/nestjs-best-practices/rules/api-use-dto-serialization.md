---
title: Use DTOs and Serialization for API Responses
impact: MEDIUM
impactDescription: Response DTOs prevent accidental data exposure and ensure consistency
tags: api, dto, serialization, zod
---

## Use DTOs and Serialization for API Responses

Never return entity objects directly from controllers. Describe every response with a Zod schema, turn it into a DTO with `createZodDto`, and attach it with `@ZodResponse`. The global `ZodSerializerInterceptor` parses the returned value with the schema, so fields that are not in the schema never reach the client. This prevents accidental exposure of sensitive fields and provides a stable API contract.

**Incorrect (returning entities directly or manual spreading):**

```typescript
// Return entities directly
@Controller('users')
export class UsersController {
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
    // Returns: { id, email, passwordHash, ssn, internalNotes, ... }
    // Exposes sensitive data!
  }
}

// Manual object spreading (error-prone)
@Get(':id')
async findOne(@Param('id') id: string) {
  const user = await this.usersService.findById(id);
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    // Easy to forget to exclude sensitive fields
    // Hard to maintain across endpoints
  };
}
```

**Correct (Zod response schemas with @ZodResponse):**

```typescript
// app.module.ts: register the serializer globally
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ZodSerializerInterceptor } from 'nestjs-zod';

@Module({
  providers: [{ provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor }],
})
export class AppModule {}

// packages/protocol: response schemas list only the public fields
import { z } from 'zod';

export const UserResponseSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string(),
});

export const UserDetailResponseSchema = UserResponseSchema.extend({
  createdAt: z.date(),
  posts: z.array(PostResponseSchema),
});

// apps/server: DTOs built from the shared schemas
import { createZodDto, ZodResponse } from 'nestjs-zod';

export class UserResponseDto extends createZodDto(UserResponseSchema) {}
export class UserDetailResponseDto extends createZodDto(UserDetailResponseSchema) {}

// The entity stays a plain persistence model, no serialization decorators
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;
}

@Controller('users')
export class UsersController {
  @Get()
  @ZodResponse({ type: [UserResponseDto] })
  async findAll() {
    return this.usersService.findAll();
    // passwordHash and createdAt are stripped: they are not in the schema
  }

  @Get(':id')
  @ZodResponse({ type: UserDetailResponseDto })
  async findOne(@Param() params: UserIdParamDto) {
    return this.usersService.findByIdWithPosts(params.id);
  }
}
```

`@ZodResponse` sets the serialization schema, the OpenAPI response and the compile-time return type at once, so the three cannot drift apart. Different audiences (public, admin, owner) get different response schemas instead of serialization groups.

Reference: [nestjs-zod: Response Validation](https://github.com/BenLorantfy/nestjs-zod#response-validation)
