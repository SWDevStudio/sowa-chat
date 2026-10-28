# Graph Report - hector-chat-epic-12  (2026-10-29)

## Corpus Check
- 290 files · ~63,996 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2036 nodes · 4329 edges · 129 communities (98 shown, 31 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 80 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `90579c52`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- AuditLogEntry
- devDependencies
- server-modes.e2e-spec.ts
- body-limit.spec.ts
- env.schema.ts
- compilerOptions
- ref_vitest
- encryption.service.spec.ts
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
- RequestContext
- operator-role.guard.spec.ts
- scripts
- zone-servers.spec.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- http-error.filter.ts
- key-format.ts
- audit-log.e2e-spec.ts
- redis.module.ts
- Project
- tsconfig.build.json
- ValidationProbeController
- errors.spec.ts
- nest-cli.json
- CreateChatTables1793215389271
- protocol/src/index.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- ApiKey
- HttpMetrics
- database.module.ts
- ConversationEvent
- api-keys-service-probe.ts
- operator-auth.guard.ts
- log-settings.e2e-spec.ts
- JsonObject
- request-id.spec.ts
- json-object-limits.spec.ts
- operators.service.spec.ts
- Project
- migrate-mode.e2e-spec.ts
- redis-connection.e2e-spec.ts
- config.module.ts
- status.controller.ts
- tokens.service.spec.ts
- api-keys.service.ts
- audit-log.e2e-spec.ts
- RequestContext
- api-keys.e2e-spec.ts
- operator-auth-guard.e2e-spec.ts
- Zone
- main.ts
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- telemetry.interceptor.spec.ts
- OperationSteps
- packages-build.e2e-spec.ts
- slow-operations.spec.ts
- participant.entity.spec.ts
- conversation.entity.ts
- metrics.controller.ts
- health.e2e-spec.ts
- health.module.ts
- http-error.filter.spec.ts
- OperationStepsProbeController
- workspace-check-types.e2e-spec.ts
- zone.decorator.ts
- Controller
- encryption-keys.schema.spec.ts
- zone.guard.spec.ts
- GuardProbeController
- @nestjs/common
- api-app.ts
- Message
- log-redaction.e2e-spec.ts
- token-signing-keys.schema.ts
- ApiKeysService
- global-setup.ts
- ServerErrorsProbeController
- TokensService
- domain-event-bus.spec.ts
- ContextConsumer
- encrypted-secret.spec.ts
- ZonedController
- server-key-guard.e2e-spec.ts
- @nest-lab/throttler-storage-redis@^1.2.0
- server/package.json
- ErrorProbeController
- operators.module.ts
- @nestjs/throttler@^6.7.1
- InternalProbeController
- server-errors.spec.ts
- OperatorAuthGuard
- NeutralProbeController
- ServerKeyGuard
- TestTokenSigningConfigModule
- error-response.ts
- TelemetryProbeController
- ref_zod
- telemetry.interceptor.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- cache-manager@^7.2.9
- nest-commander@^3.21.0
- @nestjs/swagger

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 110 edges
2. `Zone()` - 50 edges
3. `typeorm` - 47 edges
4. `Project` - 35 edges
5. `@nestjs/testing` - 28 edges
6. `findFreePort()` - 27 edges
7. `Conversation` - 26 edges
8. `OperationSteps` - 25 edges
9. `@nestjs/config` - 23 edges
10. `RequestContext` - 23 edges

## Surprising Connections (you probably didn't know these)
- `IssueOperatorTokenInput` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/domain/operators/operators.service.ts → packages/protocol/src/operator-role.ts
- `AuditRecord` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-rule.ts → packages/protocol/src/json-types.ts
- `ConversationEvent` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation-event.entity.ts → packages/protocol/src/json-types.ts
- `Conversation` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation.entity.ts → packages/protocol/src/json-types.ts
- `Message` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/message.entity.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (129 total, 31 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.08
Nodes (15): DatabaseMigration, databaseMigrations, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity, SecondEntity, CreateProjects1793193549883 (+7 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "AuditLogEntry"
Cohesion: 0.17
Nodes (8): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, ColumnRow, expectedColumns, ProjectFixture, JsonObject

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.06
Nodes (24): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+16 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_vitest"
Cohesion: 0.09
Nodes (12): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, databaseUrl(), IdentityRow (+4 more)

### Community 10 - "encryption.service.spec.ts"
Cohesion: 0.12
Nodes (15): encryptionConfig, CryptoModule, authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService (+7 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.06
Nodes (33): dependencies, file-type@^22.1.1, helmet@^8.3.0, ioredis@^6.0.0, jose@^6.2.12, @nestjs/bullmq@^12.0.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1 (+25 more)

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

### Community 22 - "RedactionProbeController"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 23 - "RequestContext"
Cohesion: 0.21
Nodes (5): OperatorProfile, RequestContextModule, RequestOperator, ConsumerModule, OperatorRole

### Community 24 - "operator-role.guard.spec.ts"
Cohesion: 0.18
Nodes (8): @nestjs/core@^12.0.1, createGuard(), createRequestContext(), ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey, @nestjs/core

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "zone-servers.spec.ts"
Cohesion: 0.10
Nodes (22): probeControllers, HealthBody, HealthEntry, DependencyStatusBody, StatusBody, LogDestination, probeControllers, LogEntry (+14 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.14
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+2 more)

### Community 31 - "http-error.filter.ts"
Cohesion: 0.36
Nodes (4): HttpErrorFilter, requestIdOf(), responseZodErrorOf(), nestjs-zod

### Community 32 - "key-format.ts"
Cohesion: 0.23
Nodes (13): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+5 more)

### Community 33 - "audit-log.e2e-spec.ts"
Cohesion: 0.18
Nodes (6): ApiKeyKind, NewApiKey, ProjectsModule, ProjectsRepository, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 34 - "redis.module.ts"
Cohesion: 0.22
Nodes (7): closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 35 - "Project"
Cohesion: 0.09
Nodes (27): ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation(), createMessage() (+19 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "ValidationProbeController"
Cohesion: 0.13
Nodes (5): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ValidationProbeController

### Community 38 - "errors.spec.ts"
Cohesion: 0.28
Nodes (6): errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 41 - "protocol/src/index.ts"
Cohesion: 0.20
Nodes (9): jsonObjectSchema, JsonObjectLimits, JsonValue, operatorRoles, OperatorTokenRequest, operatorTokenRequestSchema, OperatorTokenResponse, operatorTokenResponseSchema (+1 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "zod-serialization.spec.ts"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 45 - "ApiKey"
Cohesion: 0.12
Nodes (3): ApiKey, ApiKeysRepository, hashMatches()

### Community 47 - "database.module.ts"
Cohesion: 0.12
Nodes (14): ApiModule, useClsMiddleware(), createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, DatabaseStepSubscriber, resolveRequestId() (+6 more)

### Community 48 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 49 - "api-keys-service-probe.ts"
Cohesion: 0.22
Nodes (12): eventFields, serverKey, hashKey(), ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred (+4 more)

### Community 50 - "operator-auth.guard.ts"
Cohesion: 0.24
Nodes (7): operatorClaimsSchema, ApiException, ApiExceptionInput, ErrorDetail, bearerToken(), FakeRequestInput, ErrorCode

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "JsonObject"
Cohesion: 0.09
Nodes (13): apiKeyKinds, Operator, ColumnRow, expectedColumns, IndexRow, PlanRow, createProjectRequest(), ColumnRow (+5 more)

### Community 53 - "request-id.spec.ts"
Cohesion: 0.08
Nodes (19): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+11 more)

### Community 54 - "json-object-limits.spec.ts"
Cohesion: 0.10
Nodes (15): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+7 more)

### Community 55 - "operators.service.spec.ts"
Cohesion: 0.11
Nodes (9): OperatorsRepository, IssuedOperatorToken, IssueOperatorTokenInput, OperatorDisabledError, OperatorsService, operatorTokenTtlSeconds, input, Probe (+1 more)

### Community 56 - "Project"
Cohesion: 0.06
Nodes (17): Channel, channelColumns(), findColumn(), columns(), expectedColumns, findColumn(), findRelation(), relations() (+9 more)

### Community 57 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.11
Nodes (20): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), BrokenMigration1700000000000 (+12 more)

### Community 58 - "redis-connection.e2e-spec.ts"
Cohesion: 0.33
Nodes (6): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableRedisUrl(), waitForHttpStatus()

### Community 59 - "config.module.ts"
Cohesion: 0.26
Nodes (14): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+6 more)

### Community 60 - "status.controller.ts"
Cohesion: 0.24
Nodes (3): StatusController, ServerStatus, StatusService

### Community 61 - "tokens.service.spec.ts"
Cohesion: 0.12
Nodes (29): SignedToken, SignTokenInput, TokenAudience, tokenAudiences, VerifiedToken, encodePart(), flipSignatureBit(), ForgedTokenInput (+21 more)

### Community 62 - "api-keys.service.ts"
Cohesion: 0.25
Nodes (7): IssueApiKeyBaseInput, IssueApiKeyInput, IssuedApiKey, KeyActorKind, keyTypeByKind, RevokeApiKeyInput, VerifiedApiKey

### Community 63 - "audit-log.e2e-spec.ts"
Cohesion: 0.10
Nodes (19): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, auditedEventNames(), AuditRecord, AuditRule (+11 more)

### Community 64 - "RequestContext"
Cohesion: 0.18
Nodes (3): OperatorRoleGuard, GuardFixture, RequestContext

### Community 66 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.17
Nodes (12): OperatorController(), getProbe(), issueOperator(), withToken(), get(), getAs(), RolesProbeController, IssuedOperator (+4 more)

### Community 67 - "Zone"
Cohesion: 0.16
Nodes (11): ServerController(), controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController (+3 more)

### Community 68 - "main.ts"
Cohesion: 0.05
Nodes (32): nestjs-pino@^5.3.1, pino@^10.4.0, CliModule, DatabaseMigrationStep, createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions() (+24 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "IdentityKey"
Cohesion: 0.14
Nodes (6): IdentityKey, IdentityKeyAlgorithm, identityKeyAlgorithms, ColumnRow, expectedColumns, jwk

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "telemetry.interceptor.spec.ts"
Cohesion: 0.22
Nodes (6): HttpLabel, HttpRequestRecord, labelNames, readMetricLines(), zoneUrl(), rxjs

### Community 74 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.27
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "conversation.entity.ts"
Cohesion: 0.07
Nodes (18): database, loadDataSource(), databaseEntities, Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses (+10 more)

### Community 78 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 79 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 80 - "health.module.ts"
Cohesion: 0.11
Nodes (9): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), DependencyStatus, toDependencyStatus(), @nestjs/common (+1 more)

### Community 81 - "http-error.filter.spec.ts"
Cohesion: 0.18
Nodes (5): internalErrorMessage, knownKeys, ProbeBodyDto, echoRequestId(), requestIdHeader

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "zone.decorator.ts"
Cohesion: 0.15
Nodes (18): configureApiApp(), DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, ApiZone (+10 more)

### Community 85 - "Controller"
Cohesion: 0.16
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 86 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 87 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 89 - "@nestjs/common"
Cohesion: 0.11
Nodes (10): ServerAuthModule, AuditModule, KeysModule, AppClsModule, AppConfigModule, ApiHttpModule, ZonesModule, OperationStepsModule (+2 more)

### Community 90 - "api-app.ts"
Cohesion: 0.29
Nodes (7): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders()

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 93 - "token-signing-keys.schema.ts"
Cohesion: 0.67
Nodes (5): parseEntry(), parseKeys(), parsePrivateKey(), reject(), tokenSigningKeysSchema

### Community 95 - "global-setup.ts"
Cohesion: 0.24
Nodes (9): testcontainers@^12.2.1, @testcontainers/postgresql@^12.2.1, runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl(), testcontainers (+1 more)

### Community 97 - "TokensService"
Cohesion: 0.22
Nodes (4): TokenSigningKey, TokenConsumer, TokensService, createService()

### Community 98 - "domain-event-bus.spec.ts"
Cohesion: 0.29
Nodes (7): happened, TestListener, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 100 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 101 - "ZonedController"
Cohesion: 0.23
Nodes (4): BareController, MethodOnlyController, ZonedController, zoneMetadataKey

### Community 102 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.29
Nodes (6): changeBodyChar(), forgeWithValidChecksum(), getProbe(), replaceChar(), withKey(), zoneAgent()

### Community 104 - "server/package.json"
Cohesion: 0.08
Nodes (23): author, @aws-sdk/client-s3@^3.1151.0, bullmq@^6.3.15, @nestjs/cache-manager@^12.0.1, @nestjs/microservices@^12.1.3, @nestjs/platform-socket.io@^12.1.3, @nestjs/websockets@^12.1.3, @socket.io/redis-adapter@^8.3.0 (+15 more)

### Community 106 - "operators.module.ts"
Cohesion: 0.29
Nodes (3): OperatorAuthModule, OperatorsModule, TokensModule

### Community 108 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 110 - "server-errors.spec.ts"
Cohesion: 0.32
Nodes (6): ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, stringsInside()

### Community 112 - "NeutralProbeController"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 121 - "error-response.ts"
Cohesion: 0.33
Nodes (7): errorCodeStatuses, errorCodeByStatus, errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse()

### Community 124 - "ref_zod"
Cohesion: 0.18
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 129 - "telemetry.interceptor.ts"
Cohesion: 0.23
Nodes (6): operationSteps, OperationTiming, StepTimes, FinishedOperation, roundSteps(), SlowOperations

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 802 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `health.module.ts` to `telemetry.interceptor.ts`, `AuditLogEntry`, `body-limit.spec.ts`, `encryption.service.spec.ts`, `dependencies`, `RedactionProbeController`, `RequestContext`, `operator-role.guard.spec.ts`, `zone-servers.spec.ts`, `http-error.filter.ts`, `audit-log.e2e-spec.ts`, `redis.module.ts`, `ValidationProbeController`, `zod-serialization.spec.ts`, `database.module.ts`, `operator-auth.guard.ts`, `JsonObject`, `request-id.spec.ts`, `operators.service.spec.ts`, `config.module.ts`, `status.controller.ts`, `tokens.service.spec.ts`, `api-keys.service.ts`, `audit-log.e2e-spec.ts`, `operator-auth-guard.e2e-spec.ts`, `Zone`, `main.ts`, `telemetry.interceptor.spec.ts`, `metrics.controller.ts`, `http-error.filter.spec.ts`, `zone.decorator.ts`, `Controller`, `zone.guard.spec.ts`, `@nestjs/common`, `api-app.ts`, `domain-event-bus.spec.ts`, `ZonedController`, `server-key-guard.e2e-spec.ts`, `server/package.json`, `operators.module.ts`, `server-errors.spec.ts`, `error-response.ts`?**
  _High betweenness centrality (0.226) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08048780487804878 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `database-migrations.ts` to `audit-log.e2e-spec.ts`, `operator-auth-guard.e2e-spec.ts`, `AuditLogEntry`, `Project`, `IdentityKey`, `server/package.json`, `ref_vitest`, `participant.entity.spec.ts`, `conversation.entity.ts`, `dependencies`, `database.module.ts`, `ConversationEvent`, `JsonObject`, `Project`, `migrate-mode.e2e-spec.ts`, `Message`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `zone-servers.spec.ts` to `api-keys.e2e-spec.ts`, `domain-event-bus.spec.ts`, `AuditLogEntry`, `devDependencies`, `audit-log.e2e-spec.ts`, `server/package.json`, `encryption.service.spec.ts`, `database.module.ts`, `api-keys-service-probe.ts`, `RequestContext`, `JsonObject`, `zone.decorator.ts`, `operators.service.spec.ts`, `migrate-mode.e2e-spec.ts`, `redis-connection.e2e-spec.ts`, `config.module.ts`, `tokens.service.spec.ts`, `audit-log.e2e-spec.ts`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._