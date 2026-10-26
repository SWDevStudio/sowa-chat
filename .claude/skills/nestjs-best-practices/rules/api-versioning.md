---
title: Use API Versioning for Breaking Changes
impact: MEDIUM
impactDescription: Versioning allows you to evolve APIs without breaking existing clients
tags: api, versioning, breaking-changes, compatibility
---

## Use API Versioning for Breaking Changes

The project uses URI versioning only: every route starts with `/v1/...`. Do not introduce header or media type versioning. A breaking change goes into a new major version of the path (`/v2/...`) through NestJS built-in versioning, while the old version keeps working until the next major release.

**Incorrect (breaking changes without versioning):**

```typescript
// Breaking changes without versioning
@Controller('users')
export class UsersController {
  @Get(':id')
  async findOne(@Param() params: UserIdParamDto) {
    // Original response: { id, name, email }
    // Later changed to: { id, firstName, lastName, emailAddress }
    // Old clients break!
    return this.usersService.findOne(params.id);
  }
}

// Version hardcoded into the controller path
@Controller('v1/users')
export class UsersV1Controller {}

@Controller('v2/users')
export class UsersV2Controller {}
// Inconsistent, error-prone, hard to maintain
```

**Correct (NestJS URI versioning with a default version):**

```typescript
// main.ts: URI versioning, /v1 by default
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  await app.listen(3000);
}

// Most controllers do not mention the version at all: they are served under /v1
@Controller('operator/conversations')
export class OperatorConversationsController {
  @Get(':id/messages')
  @ZodResponse({ type: [MessageResponseDto] })
  findMessages(@Param() params: ConversationIdParamDto, @Query() query: MessagePageQueryDto) {
    return this.conversations.findMessages({ conversationId: params.id, page: query });
  }
}

// A breaking change gets its own handler under /v2, /v1 stays as it was
@Controller('operator/conversations')
export class OperatorConversationsV2Controller {
  @Get(':id/messages')
  @Version('2')
  @ZodResponse({ type: [MessageResponseV2Dto] })
  findMessages(@Param() params: ConversationIdParamDto, @Query() query: MessagePageQueryDto) {
    return this.conversations.findMessagesV2({ conversationId: params.id, page: query });
  }
}
```

Response schemas of each version live in `@sowa-chat/protocol`, so the SDKs know exactly which shape they get.

Reference: [NestJS Versioning](https://docs.nestjs.com/techniques/versioning)
