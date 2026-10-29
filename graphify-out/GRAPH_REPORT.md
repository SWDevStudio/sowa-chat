# Graph Report - hector-chat-epic-14  (2026-10-29)

## Corpus Check
- 431 files · ~110,231 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 3007 nodes · 7409 edges · 159 communities (124 shown, 35 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 192 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `692eb452`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- typeorm
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- tokens.service.spec.ts
- env.schema.ts
- compilerOptions
- DomainEventBus
- RequestContext
- protocol/tsconfig.json
- sdk/package.json
- dependencies
- protocol/package.json
- catalog
- sdk/tsconfig.json
- tasks
- compilerOptions
- rules
- bot-sdk/package.json
- server-sdk/package.json
- RedactionProbeController
- body-limit.ts
- operator-block-sync.e2e-spec.ts
- scripts
- ProjectsService
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- JsonObject
- DomainEventBus
- zone.guard.spec.ts
- ConversationEvent
- migrate.module.ts
- tsconfig.build.json
- ValidationProbeController
- config.module.ts
- nest-cli.json
- api.module.ts
- database.module.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- test-database.ts
- protocol/src/index.ts
- logger.module.ts
- Visitor
- key-cli.ts
- ProjectsService
- log-settings.e2e-spec.ts
- replica-cache-sync.e2e-spec.ts
- operator-auth.guard.ts
- json-object-limits.spec.ts
- visitor-session.e2e-spec.ts
- ProjectCreateCommand
- operators.service.ts
- migrate-mode.e2e-spec.ts
- projects.service.ts
- test-secrets.ts
- audit-log.e2e-spec.ts
- visitor-session.controller.ts
- operator-role.guard.spec.ts
- projects-service.e2e-spec.ts
- VisitorSessionsRepository
- encryption.service.spec.ts
- chat-tables.e2e-spec.ts
- identity-key-commands.e2e-spec.ts
- config-startup.e2e-spec.ts
- identity-keys.service.ts
- server-protocol.e2e-spec.ts
- api-keys.e2e-spec.ts
- conversation.entity.spec.ts
- redis.module.ts
- request-id.spec.ts
- participant.entity.spec.ts
- conversation.entity.ts
- operators.module.ts
- server-errors.spec.ts
- health.module.ts
- OperatorsRepository
- OperationSteps
- workspace-check-types.e2e-spec.ts
- operator-auth-guard.e2e-spec.ts
- global-setup.ts
- CreateChatTables1793215389271
- domain-events.ts
- secrets-reencrypt-command.e2e-spec.ts
- secrets-reencrypt.command.ts
- zone.ts
- Message
- telemetry.interceptor.spec.ts
- SecretsReencryptionService
- api-keys.service.ts
- server-errors.spec.ts
- log-redaction.e2e-spec.ts
- body-limit.spec.ts
- cli-mode.e2e-spec.ts
- cache-invalidate.controller.spec.ts
- JsonObjectValidator
- unit-probe.ts
- telemetry.interceptor.spec.ts
- visitor-auth-guard.e2e-spec.ts
- OperatorDisableCommand
- Zone
- SlowProbeController
- writeLine
- operators.service.spec.ts
- ref_node_path
- server/package.json
- TokensService
- api-versioning.spec.ts
- ServerKeyGuard
- cache-invalidation-rules.ts
- request-context.ts
- secrets-reencryption.service.ts
- operator-token.controller.ts
- project-cli.ts
- encryption-keys.schema.spec.ts
- operator-commands.e2e-spec.ts
- replica-events-offline-redis.e2e-spec.ts
- zod-serialization.spec.ts
- identity-key-pem.ts
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- replica-events.e2e-spec.ts
- metrics.controller.ts
- main.ts
- database-connection.e2e-spec.ts
- test-domain-events.ts
- log-redaction.spec.ts
- operation-steps.ts
- IdentityKeyAddCommand
- encrypted-secret.spec.ts
- InternalProbeController
- cli-runner.ts
- packages-build.e2e-spec.ts
- .canActivate
- TestTokenSigningConfigModule
- LocalCacheInvalidation
- visitor-api.module.ts
- @nestjs/throttler@^6.7.1
- pino-http
- @nestjs/platform-socket.io@^12.1.3
- @nestjs/swagger
- zod@catalog:
- @nestjs/websockets@^12.1.3
- socket.io@^4.8.4
- pino-pretty@^13.2.0
- socket.io-client@catalog:
- @testcontainers/postgresql

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 161 edges
2. `typeorm` - 64 edges
3. `Zone()` - 54 edges
4. `@nestjs/testing` - 49 edges
5. `Project` - 49 edges
6. `useTestDatabase()` - 47 edges
7. `ProjectsService` - 44 edges
8. `DomainEventBus` - 40 edges
9. `createProject()` - 39 edges
10. `findFreePort()` - 33 edges

## Surprising Connections (you probably didn't know these)
- `ConversationEvent` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation-event.entity.ts → packages/protocol/src/json-types.ts
- `Conversation` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation.entity.ts → packages/protocol/src/json-types.ts
- `Message` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/message.entity.ts → packages/protocol/src/json-types.ts
- `OperatorProfile` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/domain/operators/operators.repository.ts → packages/protocol/src/operator-role.ts
- `IssueOperatorTokenInput` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/domain/operators/operators.service.ts → packages/protocol/src/operator-role.ts

## Import Cycles
- None detected.

## Communities (159 total, 35 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.06
Nodes (20): columns(), expectedColumns, findColumn(), findRelation(), normalizeSql(), relations(), runMigration(), DatabaseMigration (+12 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.18
Nodes (9): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+1 more)

### Community 4 - "devDependencies"
Cohesion: 0.07
Nodes (29): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, source-map-support@^0.5.21, supertest@^7.0.0, testcontainers@^12.2.1 (+21 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "tokens.service.spec.ts"
Cohesion: 0.11
Nodes (34): parseEntry(), parseKeys(), parsePrivateKey(), reject(), TokenSigningKey, tokenSigningKeysSchema, SignedToken, SignTokenInput (+26 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.06
Nodes (25): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+17 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "DomainEventBus"
Cohesion: 0.12
Nodes (10): replicaEventNames(), errorMessage(), ReplicaEventsPublisherModule, replicaPublishConnectTimeoutMs, replicaEventsClient, ReplicaEventsPublisher, replicaPublishTimeoutMs, apiKeyEvent (+2 more)

### Community 10 - "RequestContext"
Cohesion: 0.12
Nodes (5): VisitorController(), RequestContext, GuardProbeController, VisitorGuardProbeController, visitorProbePath

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (28): dependencies, cache-manager@^7.2.9, file-type@^22.1.1, helmet@^8.3.0, jose@^6.2.12, nest-commander@^3.21.0, @nestjs/bullmq@^12.0.0, @nestjs/cache-manager@^12.0.1 (+20 more)

### Community 14 - "protocol/package.json"
Cohesion: 0.10
Nodes (23): author, description, devDependencies, tsdown@catalog:, vitest@catalog:, zod@catalog:, exports, tsdown (+15 more)

### Community 15 - "catalog"
Cohesion: 0.11
Nodes (18): allowBuilds, cpu-features, msgpackr-extract, protobufjs, @scarf/scarf, ssh2, catalog, oxlint (+10 more)

### Community 16 - "sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 17 - "tasks"
Cohesion: 0.11
Nodes (18): dependsOn, inputs, outputs, dependsOn, cache, dependsOn, persistent, dependsOn (+10 more)

### Community 18 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, module, moduleResolution, skipLibCheck, strict, target

### Community 19 - "rules"
Cohesion: 0.12
Nodes (15): overrides, plugins, rules, complexity, import/no-cycle, max-depth, max-lines, max-lines-per-function (+7 more)

### Community 20 - "bot-sdk/package.json"
Cohesion: 0.12
Nodes (18): author, description, devDependencies, tsdown@catalog:, @types/node@catalog:, exports, tsdown, @types/node (+10 more)

### Community 21 - "server-sdk/package.json"
Cohesion: 0.12
Nodes (18): author, description, devDependencies, tsdown@catalog:, @types/node@catalog:, exports, tsdown, @types/node (+10 more)

### Community 23 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 24 - "operator-block-sync.e2e-spec.ts"
Cohesion: 0.14
Nodes (17): blockedOnAll(), expectStatusOnAll(), issueOperator(), publishAll(), subscriberCounts(), waitForBlockedOnAll(), waitForStatusOnAll(), blockProbePath (+9 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "ProjectsService"
Cohesion: 0.10
Nodes (14): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand (+6 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.14
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+2 more)

### Community 31 - "JsonObject"
Cohesion: 0.15
Nodes (10): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ReplicaEventMessage, ColumnRow, expectedColumns (+2 more)

### Community 32 - "DomainEventBus"
Cohesion: 0.12
Nodes (11): BusProbe, AppCacheModule, cacheTtlMs, apiKeyEvent, projectEvent, DomainEventBus, DomainEventName, DomainEvents (+3 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "migrate.module.ts"
Cohesion: 0.15
Nodes (6): AppClsModule, DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "ValidationProbeController"
Cohesion: 0.13
Nodes (5): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ValidationProbeController

### Community 38 - "config.module.ts"
Cohesion: 0.18
Nodes (16): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig (+8 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "api.module.ts"
Cohesion: 0.08
Nodes (27): configureApiApp(), ApiModule, DependencyStatusBody, StatusBody, noStore(), useSecurityHeaders(), findZonePorts(), probeControllers (+19 more)

### Community 41 - "database.module.ts"
Cohesion: 0.17
Nodes (12): database, loadDataSource(), databaseEntities, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, createDataSourceOptions() (+4 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "test-database.ts"
Cohesion: 0.08
Nodes (22): apiKeyKinds, identityKeyAlgorithms, issueServerKey(), ColumnRow, expectedColumns, IndexRow, PlanRow, ColumnRow (+14 more)

### Community 46 - "protocol/src/index.ts"
Cohesion: 0.07
Nodes (20): OperatorTokenRequestDto, OperatorTokenResponseDto, OperatorTokenClaims, operatorTokenClaimsSchema, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope (+12 more)

### Community 47 - "logger.module.ts"
Cohesion: 0.21
Nodes (14): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+6 more)

### Community 48 - "Visitor"
Cohesion: 0.09
Nodes (7): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor, VisitorSession

### Community 49 - "key-cli.ts"
Cohesion: 0.32
Nodes (15): toLookupPrefix(), auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix(), listKeys() (+7 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.19
Nodes (13): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+5 more)

### Community 52 - "replica-cache-sync.e2e-spec.ts"
Cohesion: 0.15
Nodes (13): badOrigins, helpEntries, prefixes, ReplicaProbeController, addOrigins(), OriginAction, OriginCommandOptions, OriginGroup (+5 more)

### Community 53 - "operator-auth.guard.ts"
Cohesion: 0.30
Nodes (4): VisitorTokenClaims, visitorTokenClaimsSchema, bearerToken(), FakeRequestInput

### Community 54 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 55 - "visitor-session.e2e-spec.ts"
Cohesion: 0.10
Nodes (33): api(), createProjectWithPublicKey(), findAllSessions(), findFamilySessions(), findSessionByRefreshToken(), postVisitorSession(), postVisitorSessionRefresh(), startVisitorSession() (+25 more)

### Community 57 - "operators.service.ts"
Cohesion: 0.10
Nodes (13): Operator, OperatorIdRow, OperatorProfile, ChangeOperatorBlockInput, IssuedOperatorToken, IssueOperatorTokenInput, OperatorActorKind, OperatorBlockChange (+5 more)

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.17
Nodes (12): pg@^8.23.1, BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult (+4 more)

### Community 59 - "projects.service.ts"
Cohesion: 0.07
Nodes (27): ApiKeysService, OriginList, originLists, Project, ProjectSnapshot, toProjectSnapshot(), NewProject, ORIGIN_COLUMNS (+19 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "audit-log.e2e-spec.ts"
Cohesion: 0.11
Nodes (10): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditModule, AuditRule, auditRules (+2 more)

### Community 62 - "visitor-session.controller.ts"
Cohesion: 0.12
Nodes (16): nestjs-zod@^5.5.0, toVisitorSessionResponse(), VisitorSessionController, VisitorSessionRefreshRequestDto, VisitorSessionRequestDto, VisitorSessionResponseDto, VisitorSessionTokens, refreshToken (+8 more)

### Community 63 - "operator-role.guard.spec.ts"
Cohesion: 0.14
Nodes (6): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController

### Community 64 - "projects-service.e2e-spec.ts"
Cohesion: 0.11
Nodes (23): IssueApiKeyInput, ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl(), CreateProjectInput (+15 more)

### Community 65 - "VisitorSessionsRepository"
Cohesion: 0.11
Nodes (4): VisitorSessionsRepository, InvalidRefreshTokenError, VisitorSessionsService, VisitorsRepository

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.12
Nodes (14): CryptoModule, authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService, SecretDecryptionError (+6 more)

### Community 67 - "chat-tables.e2e-spec.ts"
Cohesion: 0.07
Nodes (34): ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation(), createMessage() (+26 more)

### Community 68 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.17
Nodes (25): expectNoKeyRows(), expectNoRows(), addKey(), runCaptured(), runCliInProcess(), addEd25519Key(), addIdentityKey(), addP256Key() (+17 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "identity-keys.service.ts"
Cohesion: 0.07
Nodes (15): IdentityKeyRevokeCommand, KeyActorKind, IdentityKey, IdentityKeyAlgorithm, ParsedIdentityKey, IdentityKeysRepository, NewIdentityKey, AddedIdentityKey (+7 more)

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "api-keys.e2e-spec.ts"
Cohesion: 0.12
Nodes (5): KeysModule, ProjectsModule, NewVisitorSession, WorkerModule, @nestjs-cls/transactional-adapter-typeorm

### Community 73 - "conversation.entity.spec.ts"
Cohesion: 0.13
Nodes (9): Channel, channelColumns(), findColumn(), columns(), expectedColumns, findColumn(), findRelation(), relations() (+1 more)

### Community 74 - "redis.module.ts"
Cohesion: 0.13
Nodes (14): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, fetchStatus() (+6 more)

### Community 75 - "request-id.spec.ts"
Cohesion: 0.17
Nodes (9): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse, ProbeService (+1 more)

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "conversation.entity.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 78 - "operators.module.ts"
Cohesion: 0.17
Nodes (5): OperatorAuthModule, ServerAuthModule, OperatorsModule, TokensModule, OperationStepsModule

### Community 79 - "server-errors.spec.ts"
Cohesion: 0.08
Nodes (23): OperatorDisabledFilter, InvalidPublicKeyFilter, InvalidRefreshTokenFilter, OperatorDisabledError, InvalidPublicKeyError, ApiException, ApiExceptionInput, errorCodeStatuses (+15 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (13): @nestjs/terminus@^12.1.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+5 more)

### Community 82 - "OperationSteps"
Cohesion: 0.11
Nodes (4): DatabaseStepSubscriber, OperationStep, OperationSteps, OperationStepsProbeController

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.22
Nodes (10): expectStatusOnAll(), probeWithKey(), CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot (+2 more)

### Community 84 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.15
Nodes (7): OperatorController(), SupervisorOnly(), supervisorOnlyMetadataKey, DisabledProbeController, get(), getAs(), RolesProbeController

### Community 85 - "global-setup.ts"
Cohesion: 0.38
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 87 - "domain-events.ts"
Cohesion: 0.11
Nodes (14): auditedEventNames(), auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent (+6 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "secrets-reencrypt.command.ts"
Cohesion: 0.16
Nodes (11): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+3 more)

### Community 90 - "zone.ts"
Cohesion: 0.15
Nodes (17): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes (+9 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "telemetry.interceptor.spec.ts"
Cohesion: 0.11
Nodes (7): HttpMetrics, StepTimes, FinishedOperation, SlowOperationsModule, roundSteps(), SlowOperations, TelemetryInterceptor

### Community 94 - "api-keys.service.ts"
Cohesion: 0.05
Nodes (48): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey, CachedApiKey, hashMatches(), eventFields, IssueApiKeyBaseInput (+40 more)

### Community 95 - "server-errors.spec.ts"
Cohesion: 0.15
Nodes (12): ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, stringsInside(), errorCodes, errorDetailSchema (+4 more)

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "cache-invalidate.controller.spec.ts"
Cohesion: 0.08
Nodes (14): DisabledOperators, DisabledOperatorsModule, OperatorReplicaEventsController, createDisabledOperators(), malformedPayloads, CacheInvalidateController, CacheInvalidateEvent, cacheInvalidateEventSchema (+6 more)

### Community 100 - "JsonObjectValidator"
Cohesion: 0.17
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, JsonObjectValidator, Violation, JsonObjectLimits, encoder (+1 more)

### Community 101 - "unit-probe.ts"
Cohesion: 0.18
Nodes (10): LogDestination, createRedactionProbeApp(), createRequestIdProbeApp(), LogEntry, createProbeApp(), ProbeAppOptions, redirectLogsTo(), stubTestEnv() (+2 more)

### Community 102 - "telemetry.interceptor.spec.ts"
Cohesion: 0.16
Nodes (5): ApiHttpModule, readMetricLines(), TelemetryProbeController, zoneUrl(), @nestjs/core

### Community 103 - "visitor-auth-guard.e2e-spec.ts"
Cohesion: 0.11
Nodes (16): VisitorAuthModule, issueOperator(), getProbe(), issueOperator(), withToken(), BlockTarget, forgeUnsecuredToken(), IssuedOperator (+8 more)

### Community 104 - "OperatorDisableCommand"
Cohesion: 0.21
Nodes (3): describeDisable(), OperatorDisableCommand, OperatorEnableCommand

### Community 105 - "Zone"
Cohesion: 0.08
Nodes (20): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+12 more)

### Community 107 - "writeLine"
Cohesion: 0.05
Nodes (31): emptyCell, formatDate(), serverKeyOnceWarning, writeLine(), writeTable(), writeWarning(), IdentityKeyAddOptions, readPem() (+23 more)

### Community 108 - "operators.service.spec.ts"
Cohesion: 0.13
Nodes (9): OperatorNotFoundError, OperatorsService, blockInput, BlockProbe, createBlockProbe(), input, Probe, signedToken (+1 more)

### Community 109 - "ref_node_path"
Cohesion: 0.11
Nodes (11): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, databaseUrl(), IdentityRow (+3 more)

### Community 110 - "server/package.json"
Cohesion: 0.10
Nodes (19): author, bin, sowa-chat, @aws-sdk/client-s3@^3.1151.0, @aws-sdk/s3-request-presigner@^3.1151.0, bullmq@^6.3.15, @nest-lab/throttler-storage-redis@^1.2.0, @sowa-chat/protocol@workspace:* (+11 more)

### Community 111 - "TokensService"
Cohesion: 0.15
Nodes (3): TokenConsumer, TokensService, createService()

### Community 112 - "api-versioning.spec.ts"
Cohesion: 0.19
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 120 - "cache-invalidation-rules.ts"
Cohesion: 0.16
Nodes (16): apiKeyCacheKeys(), cacheInvalidatedEventNames(), cacheInvalidationRules, projectCacheKeys(), apiKeyEvent, projectEvent, cacheKeys, ReplicaEventRule (+8 more)

### Community 121 - "request-context.ts"
Cohesion: 0.16
Nodes (4): RequestContextModule, RequestVisitor, ConsumerModule, ContextConsumer

### Community 122 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldResult, ReencryptInput, reencryptionBatchSize, ReencryptionReport (+3 more)

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.36
Nodes (3): OperatorTokenController, ServerApiModule, ServerController()

### Community 124 - "project-cli.ts"
Cohesion: 0.28
Nodes (8): buildServer(), fullOriginArguments, listHeader, onceWarning, repositoryRoot, runMainCli(), serverDirectory, uuidPattern

### Community 125 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 126 - "operator-commands.e2e-spec.ts"
Cohesion: 0.21
Nodes (14): runCommand(), disabledAtOf(), setupOperator(), disabledAtOf(), helpEntries, setupOperator(), OperatorAction, operatorActions (+6 more)

### Community 127 - "replica-events-offline-redis.e2e-spec.ts"
Cohesion: 0.22
Nodes (10): CapturedRun, stubRefusedRedis(), CliRunResult, MainProject, captureLogLines(), ChannelRecorder, ClosingRedisServer, LogCapture (+2 more)

### Community 128 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 129 - "identity-key-pem.ts"
Cohesion: 0.27
Nodes (7): algorithmOf(), InvalidIdentityKeyError, isP256(), parseIdentityPublicKey(), readPublicKeyObject(), captureError(), expectInvalidKey()

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 133 - "replica-events.e2e-spec.ts"
Cohesion: 0.26
Nodes (11): expectCachedOnAll(), expectKept(), repositoryRoot, seed(), waitUntilDeleted(), Env, cacheInvalidateSubscribers(), cacheOf() (+3 more)

### Community 134 - "metrics.controller.ts"
Cohesion: 0.22
Nodes (3): prom-client@^15.1.3, MetricsController, prom-client

### Community 135 - "main.ts"
Cohesion: 0.14
Nodes (20): @nestjs/microservices@^12.1.3, parseDatabase(), parseUrl(), RedisConnectionOptions, redisTransportOptions(), stripIpv6Brackets(), connectReplicaEvents(), replicaEventsMicroservice (+12 more)

### Community 136 - "database-connection.e2e-spec.ts"
Cohesion: 0.20
Nodes (8): AppConfigModule, fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus()

### Community 137 - "test-domain-events.ts"
Cohesion: 0.25
Nodes (8): happened, TestListener, DomainEventHandler, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 138 - "log-redaction.spec.ts"
Cohesion: 0.22
Nodes (9): allOutput(), CapturedLogs, fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields, secretValueOf() (+1 more)

### Community 139 - "operation-steps.ts"
Cohesion: 0.19
Nodes (12): nestjs-cls@^7.0.1, @nestjs/typeorm@^12.0.2, useClsMiddleware(), echoRequestId(), resolveRequestId(), operationSteps, OperationTiming, beginOperation() (+4 more)

### Community 141 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 142 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 143 - "cli-runner.ts"
Cohesion: 0.28
Nodes (6): cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, runCli()

### Community 144 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1061 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `health.module.ts` to `zod-serialization.spec.ts`, `log-level-warn.spec.ts`, `replica-events.e2e-spec.ts`, `tokens.service.spec.ts`, `main.ts`, `metrics.controller.ts`, `DomainEventBus`, `log-redaction.spec.ts`, `operation-steps.ts`, `test-domain-events.ts`, `dependencies`, `RequestContext`, `cli-runner.ts`, `visitor-api.module.ts`, `body-limit.ts`, `operator-block-sync.e2e-spec.ts`, `ProjectsService`, `JsonObject`, `DomainEventBus`, `zone.guard.spec.ts`, `migrate.module.ts`, `ValidationProbeController`, `config.module.ts`, `api.module.ts`, `database.module.ts`, `test-database.ts`, `logger.module.ts`, `replica-cache-sync.e2e-spec.ts`, `operator-auth.guard.ts`, `operators.service.ts`, `projects.service.ts`, `audit-log.e2e-spec.ts`, `visitor-session.controller.ts`, `encryption.service.spec.ts`, `identity-keys.service.ts`, `api-keys.e2e-spec.ts`, `redis.module.ts`, `request-id.spec.ts`, `operators.module.ts`, `server-errors.spec.ts`, `operator-auth-guard.e2e-spec.ts`, `secrets-reencrypt.command.ts`, `zone.ts`, `telemetry.interceptor.spec.ts`, `api-keys.service.ts`, `server-errors.spec.ts`, `body-limit.spec.ts`, `cache-invalidate.controller.spec.ts`, `unit-probe.ts`, `telemetry.interceptor.spec.ts`, `visitor-auth-guard.e2e-spec.ts`, `Zone`, `writeLine`, `server/package.json`, `api-versioning.spec.ts`, `request-context.ts`, `secrets-reencryption.service.ts`, `operator-token.controller.ts`?**
  _High betweenness centrality (0.236) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.06127946127946128 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-connection.e2e-spec.ts`, `operation-steps.ts`, `dependencies`, `operator-block-sync.e2e-spec.ts`, `JsonObject`, `ConversationEvent`, `database.module.ts`, `test-database.ts`, `Visitor`, `key-cli.ts`, `replica-cache-sync.e2e-spec.ts`, `visitor-session.e2e-spec.ts`, `operators.service.ts`, `migrate-mode.e2e-spec.ts`, `projects.service.ts`, `test-secrets.ts`, `projects-service.e2e-spec.ts`, `chat-tables.e2e-spec.ts`, `identity-key-commands.e2e-spec.ts`, `identity-keys.service.ts`, `api-keys.e2e-spec.ts`, `conversation.entity.spec.ts`, `participant.entity.spec.ts`, `conversation.entity.ts`, `global-setup.ts`, `CreateChatTables1793215389271`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `api-keys.service.ts`, `visitor-auth-guard.e2e-spec.ts`, `ref_node_path`, `server/package.json`, `operator-commands.e2e-spec.ts`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `cache-invalidate.controller.spec.ts` to `devDependencies`, `tokens.service.spec.ts`, `database-connection.e2e-spec.ts`, `DomainEventBus`, `test-domain-events.ts`, `operation-steps.ts`, `JsonObject`, `DomainEventBus`, `config.module.ts`, `api.module.ts`, `test-database.ts`, `logger.module.ts`, `key-cli.ts`, `operators.service.ts`, `projects.service.ts`, `test-secrets.ts`, `audit-log.e2e-spec.ts`, `projects-service.e2e-spec.ts`, `encryption.service.spec.ts`, `identity-key-commands.e2e-spec.ts`, `api-keys.e2e-spec.ts`, `redis.module.ts`, `api-keys.service.ts`, `unit-probe.ts`, `operators.service.spec.ts`, `server/package.json`, `request-context.ts`, `operator-commands.e2e-spec.ts`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._