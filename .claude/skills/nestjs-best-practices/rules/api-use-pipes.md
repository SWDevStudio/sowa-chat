---
title: Use Pipes for Input Transformation
impact: MEDIUM
impactDescription: Pipes ensure clean, validated data reaches your handlers
tags: api, pipes, validation, transformation, zod
---

## Use Pipes for Input Transformation

Route params, query strings and bodies are validated and transformed by Zod DTOs through the global `ZodValidationPipe`. Coercion (`"20"` → `20`), defaults, trimming and splitting live in the schema, not in the handler and not in per-parameter pipes like `ParseIntPipe` or `ParseUUIDPipe`. Write a custom pipe only for a transformation a schema cannot express, such as loading data the request refers to.

**Incorrect (manual parsing in handlers or per-parameter built-in pipes):**

```typescript
@Controller('users')
export class UsersController {
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    // Manual validation in every handler
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.usersService.findOne(id);
  }

  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<User[]> {
    // Manual parsing and defaults
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    return this.usersService.findAll(pageNum, limitNum);
  }

  @Get('by-status/:status')
  async findByStatus(
    // Validation rules split between pipes and schemas, no shared contract with the SDK
    @Param('status', new ParseEnumPipe(UserStatus)) status: UserStatus,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<User[]> {
    return this.usersService.findByStatus(status, limit);
  }
}
```

**Correct (Zod DTOs for params and query):**

```typescript
// packages/protocol: schemas shared with the SDKs
export const UserIdParamSchema = z.object({
  id: z.uuid(),
});

export const FindUsersQuerySchema = z.object({
  status: z.enum(['active', 'blocked']).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().toLowerCase().optional(),
  ids: z
    .string()
    .transform((value) => value.split(','))
    .pipe(z.array(z.uuid()))
    .optional(),
});

// apps/server
export class UserIdParamDto extends createZodDto(UserIdParamSchema) {}
export class FindUsersQueryDto extends createZodDto(FindUsersQuerySchema) {}

@Controller('users')
export class UsersController {
  @Get(':id')
  findOne(@Param() params: UserIdParamDto) {
    // params.id is a valid UUID
    return this.usersService.findOne(params.id);
  }

  @Get()
  findAll(@Query() query: FindUsersQueryDto) {
    // limit is a number between 1 and 100, defaults are applied, ids is an array
    return this.usersService.findAll(query);
  }
}

// A custom pipe for what a schema cannot do: load the entity the route refers to
@Injectable()
export class ConversationByIdPipe implements PipeTransform<string, Promise<Conversation>> {
  constructor(private readonly conversations: ConversationsService) {}

  async transform(conversationId: string): Promise<Conversation> {
    const conversation = await this.conversations.findById(conversationId);
    if (!conversation) {
      throw new NotFoundException();
    }
    return conversation;
  }
}
```

A value outside the schema, for example `limit=500`, gets `400` from the pipe before the handler runs.

Reference: [NestJS Pipes](https://docs.nestjs.com/pipes), [nestjs-zod](https://github.com/BenLorantfy/nestjs-zod)
