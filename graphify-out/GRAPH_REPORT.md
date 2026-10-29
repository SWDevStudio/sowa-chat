# Graph Report - hector-chat-epic-12  (2026-10-29)

## Corpus Check
- 299 files · ~66,079 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2086 nodes · 4478 edges · 142 communities (99 shown, 43 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 84 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9078a36c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- JsonObject
- devDependencies
- server-modes.e2e-spec.ts
- TelemetryProbeController
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
- api.module.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- api-keys.e2e-spec.ts
- key-format.ts
- audit-rule.ts
- DisabledOperators
- Project
- tsconfig.build.json
- ValidationProbeController
- server-errors.spec.ts
- nest-cli.json
- CreateChatTables1793215389271
- protocol/src/index.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- ApiKey
- HttpMetrics
- OperationSteps
- database.module.ts
- api-keys-service-probe.ts
- operator-auth.guard.ts
- log-settings.e2e-spec.ts
- test-database.ts
- request-id.spec.ts
- ref_vitest
- operators.service.spec.ts
- security-headers.spec.ts
- database-connection.e2e-spec.ts
- migrate-mode.e2e-spec.ts
- config.module.ts
- conversation.entity.spec.ts
- tokens.service.spec.ts
- api-keys.service.ts
- audit-log.listener.spec.ts
- main.ts
- logger.module.ts
- operator-auth-guard.e2e-spec.ts
- forged-tokens.ts
- migrate.module.ts
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- typeorm
- zone-servers.ts
- packages-build.e2e-spec.ts
- operator-token.controller.ts
- participant.entity.spec.ts
- conversation.entity.ts
- metrics.controller.ts
- health.e2e-spec.ts
- health.module.ts
- http-error.filter.spec.ts
- redis.module.ts
- workspace-check-types.e2e-spec.ts
- zone.guard.spec.ts
- Zone
- encryption-keys.schema.spec.ts
- MixedZoneController
- request-id.spec.ts
- @nestjs/common
- cls-middleware.ts
- Message
- log-redaction.e2e-spec.ts
- token-signing-keys.schema.ts
- ApiKeysService
- global-setup.ts
- ServerErrorsProbeController
- TokensService
- domain-event-bus.spec.ts
- ConversationEvent
- body-limit.spec.ts
- transactions.e2e-spec.ts
- server-key-guard.e2e-spec.ts
- JsonObjectValidator
- server/package.json
- ErrorProbeController
- .publish
- CreateProjects1793193549883
- InternalProbeController
- Conversation
- AddProjectsPublicKey1793300002000
- bullmq@^6.3.15
- NeutralProbeController
- Message
- database-entities.ts
- Channel
- env.schema.logging.spec.ts
- CreateIdentityKeys1793300001000
- TestTokenSigningConfigModule
- TokenConsumer
- @nestjs/websockets@^12.1.3
- OperatorAuthModule
- @aws-sdk/client-s3@^3.1151.0
- redis-connection.e2e-spec.ts
- api-app.ts
- file-type@^22.1.1
- pino-http
- cache-manager@^7.2.9
- nest-commander@^3.21.0
- CreateApiKeys1793300000000
- CreateOperators1793300003000
- @nestjs/swagger
- @socket.io/redis-adapter@^8.3.0
- pino-pretty@^13.2.0

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 115 edges
2. `Zone()` - 50 edges
3. `typeorm` - 47 edges
4. `Project` - 35 edges
5. `@nestjs/testing` - 29 edges
6. `findFreePort()` - 27 edges
7. `Conversation` - 26 edges
8. `RequestContext` - 25 edges
9. `OperationSteps` - 25 edges
10. `@nestjs/config` - 23 edges

## Surprising Connections (you probably didn't know these)
- `OperatorProfile` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/domain/operators/operators.repository.ts → packages/protocol/src/operator-role.ts
- `RequestOperator` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/infra/request-context/request-context.ts → packages/protocol/src/operator-role.ts
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts
- `AuditRecord` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-rule.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (142 total, 43 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.17
Nodes (6): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, CreateAuditLog1793200000000, AddConversationIndexes1793215983154

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "JsonObject"
Cohesion: 0.13
Nodes (7): ActorKind, actorKinds, AuditLogEntry, AuditLogRepository, NewAuditLogEntry, ColumnRow, expectedColumns

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, socket.io-client@catalog:, source-map-support@^0.5.21, supertest@^7.0.0 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (20): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+12 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_vitest"
Cohesion: 0.11
Nodes (12): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), DependencyStatusBody, StatusBody, packageJson, databaseUrl(), IdentityRow (+4 more)

### Community 10 - "encryption.service.spec.ts"
Cohesion: 0.08
Nodes (21): CryptoModule, authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv (+13 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, @aws-sdk/s3-request-presigner@^3.1151.0, @nestjs/bullmq@^12.0.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1, @nestjs/core@^12.0.1 (+21 more)

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
Cohesion: 0.09
Nodes (5): RequestContextModule, RequestContext, RequestOperator, ConsumerModule, ContextConsumer

### Community 24 - "operator-role.guard.spec.ts"
Cohesion: 0.16
Nodes (8): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "api.module.ts"
Cohesion: 0.15
Nodes (19): ServerApiModule, HealthBody, HealthEntry, LogEntry, offlineDataSource, withOfflineDatabase(), offlineRedis, withOfflineRedis() (+11 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+2 more)

### Community 32 - "key-format.ts"
Cohesion: 0.21
Nodes (14): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+6 more)

### Community 33 - "audit-rule.ts"
Cohesion: 0.27
Nodes (10): auditedEventNames(), AuditRecord, AuditRule, auditRules, auditedEvents, botKeyEvent, serverKeyEvent, ApiKeyEvent (+2 more)

### Community 34 - "DisabledOperators"
Cohesion: 0.11
Nodes (6): DisabledOperators, Probe, OperatorsModule, OperatorProfile, OperatorsRepository, TokensModule

### Community 35 - "Project"
Cohesion: 0.09
Nodes (27): ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation(), createMessage() (+19 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "server-errors.spec.ts"
Cohesion: 0.10
Nodes (25): OperatorDisabledFilter, ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, errorCodeOfStatus(), httpErrorResponse() (+17 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 41 - "protocol/src/index.ts"
Cohesion: 0.09
Nodes (23): OperatorTokenClaims, operatorTokenClaimsSchema, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope (+15 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "zod-serialization.spec.ts"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 46 - "HttpMetrics"
Cohesion: 0.10
Nodes (13): HttpLabel, HttpMetrics, HttpRequestRecord, labelNames, StepTimes, FinishedOperation, roundSteps(), SlowOperations (+5 more)

### Community 47 - "OperationSteps"
Cohesion: 0.07
Nodes (14): AppClsModule, DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationStepsModule, OperationSteps, OperationStepsProbeController (+6 more)

### Community 48 - "database.module.ts"
Cohesion: 0.23
Nodes (9): createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity (+1 more)

### Community 49 - "api-keys-service-probe.ts"
Cohesion: 0.26
Nodes (11): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+3 more)

### Community 50 - "operator-auth.guard.ts"
Cohesion: 0.16
Nodes (4): OperatorAuthGuard, ServerKeyGuard, bearerToken(), FakeRequestInput

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "test-database.ts"
Cohesion: 0.10
Nodes (16): apiKeyKinds, ColumnRow, expectedColumns, IndexRow, PlanRow, createProjectWithKey(), internalAgent(), postToken() (+8 more)

### Community 53 - "request-id.spec.ts"
Cohesion: 0.18
Nodes (8): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe

### Community 54 - "ref_vitest"
Cohesion: 0.14
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 55 - "operators.service.spec.ts"
Cohesion: 0.11
Nodes (6): Operator, OperatorDisabledError, operatorTokenTtlSeconds, input, Probe, signedToken

### Community 56 - "security-headers.spec.ts"
Cohesion: 0.21
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 57 - "database-connection.e2e-spec.ts"
Cohesion: 0.19
Nodes (10): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), findFreePort() (+2 more)

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 59 - "config.module.ts"
Cohesion: 0.25
Nodes (15): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig (+7 more)

### Community 60 - "conversation.entity.spec.ts"
Cohesion: 0.15
Nodes (7): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget(), Visitor

### Community 61 - "tokens.service.spec.ts"
Cohesion: 0.24
Nodes (13): forgeToken(), publicKeyRawBytes(), spyOnLogs(), expectedOperatorClaims, [key1, key2], moveClockTo(), operatorInput, operatorPayload() (+5 more)

### Community 62 - "api-keys.service.ts"
Cohesion: 0.17
Nodes (11): ApiKeyKind, NewApiKey, hashMatches(), IssueApiKeyBaseInput, IssueApiKeyInput, IssuedApiKey, KeyActorKind, keyTypeByKind (+3 more)

### Community 64 - "main.ts"
Cohesion: 0.21
Nodes (12): createContext(), mode, runApi(), runCli(), runMigrate(), runners, runToCompletion(), runWorker() (+4 more)

### Community 65 - "logger.module.ts"
Cohesion: 0.22
Nodes (11): pino@^10.4.0, LogLevel, createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions(), redactPaths (+3 more)

### Community 66 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.10
Nodes (20): OperatorController(), IssuedOperatorToken, IssueOperatorTokenInput, OperatorsService, DisabledProbeController, issueOperator(), getProbe(), issueOperator() (+12 more)

### Community 67 - "forged-tokens.ts"
Cohesion: 0.22
Nodes (10): encodePart(), flipSignatureBit(), ForgedTokenInput, forgeUnsecuredToken(), parseTestSigningKeys(), publicKeyPemBytes(), replaceHeader(), replacePayload() (+2 more)

### Community 68 - "migrate.module.ts"
Cohesion: 0.17
Nodes (5): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "IdentityKey"
Cohesion: 0.13
Nodes (8): jose@^6.2.12, IdentityKey, IdentityKeyAlgorithm, identityKeyAlgorithms, ColumnRow, expectedColumns, jwk, jose

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "typeorm"
Cohesion: 0.13
Nodes (12): channelColumns(), findColumn(), Project, columns(), expectedColumns, findColumn(), findRelation(), relations() (+4 more)

### Community 73 - "zone-servers.ts"
Cohesion: 0.21
Nodes (4): startListening(), stopListening(), ZoneServers, ZonesModule

### Community 74 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 75 - "operator-token.controller.ts"
Cohesion: 0.17
Nodes (6): nestjs-zod@^5.5.0, OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, OperatorTokenResponse, nestjs-zod

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "conversation.entity.ts"
Cohesion: 0.16
Nodes (13): ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind, messageSenderKinds (+5 more)

### Community 79 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (13): @nestjs/terminus@^12.1.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+5 more)

### Community 81 - "http-error.filter.spec.ts"
Cohesion: 0.14
Nodes (7): ApiHttpModule, HttpErrorFilter, responseZodErrorOf(), knownKeys, ProbeBodyDto, requestIdHeader, requestIdOfResponse()

### Community 82 - "redis.module.ts"
Cohesion: 0.20
Nodes (8): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "zone.guard.spec.ts"
Cohesion: 0.13
Nodes (16): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), zonePathPrefixes, ApiZone, apiZones, CapturedResponse (+8 more)

### Community 85 - "Zone"
Cohesion: 0.08
Nodes (19): ServerController(), controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController (+11 more)

### Community 86 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 87 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 88 - "request-id.spec.ts"
Cohesion: 0.15
Nodes (10): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+2 more)

### Community 89 - "@nestjs/common"
Cohesion: 0.13
Nodes (11): CliModule, databaseEntities, eventValues, happened, personalValues, AuditModule, AppConfigModule, MetricsModule (+3 more)

### Community 90 - "cls-middleware.ts"
Cohesion: 0.21
Nodes (7): ApiModule, useClsMiddleware(), LogDestination, echoRequestId(), resolveRequestId(), createE2eApp(), nestjs-pino

### Community 91 - "Message"
Cohesion: 0.27
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 93 - "token-signing-keys.schema.ts"
Cohesion: 0.67
Nodes (5): parseEntry(), parseKeys(), parsePrivateKey(), reject(), tokenSigningKeysSchema

### Community 94 - "ApiKeysService"
Cohesion: 0.18
Nodes (3): ApiKeysRepository, ApiKeysService, toEvent()

### Community 95 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 97 - "TokensService"
Cohesion: 0.15
Nodes (8): TokenSigningKey, SignedToken, SignTokenInput, TokenAudience, tokenAudiences, TokensService, VerifiedToken, createService()

### Community 98 - "domain-event-bus.spec.ts"
Cohesion: 0.25
Nodes (8): happened, TestListener, DomainEventHandler, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 99 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 101 - "transactions.e2e-spec.ts"
Cohesion: 0.13
Nodes (8): @nestjs-cls/transactional-adapter-typeorm@^2.0.1, ProjectsModule, ProjectsRepository, WorkerModule, ScenarioError, testAuditRules, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 102 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.33
Nodes (6): changeBodyChar(), forgeWithValidChecksum(), getProbe(), replaceChar(), withKey(), zoneAgent()

### Community 103 - "JsonObjectValidator"
Cohesion: 0.30
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 104 - "server/package.json"
Cohesion: 0.10
Nodes (19): author, helmet@^8.3.0, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/cache-manager@^12.0.1, @nestjs/platform-socket.io@^12.1.3, @nestjs/throttler@^6.7.1, sharp@^0.35.5, description (+11 more)

### Community 108 - "InternalProbeController"
Cohesion: 0.17
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController

### Community 112 - "NeutralProbeController"
Cohesion: 0.15
Nodes (5): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController, ZoneProbeApp

### Community 122 - "env.schema.logging.spec.ts"
Cohesion: 0.33
Nodes (3): Env, logLevels, requiredEnv

### Community 129 - "redis-connection.e2e-spec.ts"
Cohesion: 0.29
Nodes (7): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableRedisUrl(), waitForHttpStatus(), Env

### Community 130 - "api-app.ts"
Cohesion: 0.25
Nodes (10): configureApiApp(), setupApiDocs(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore() (+2 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 820 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **43 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `health.module.ts` to `api-app.ts`, `JsonObject`, `ref_vitest`, `encryption.service.spec.ts`, `dependencies`, `RedactionProbeController`, `RequestContext`, `operator-role.guard.spec.ts`, `api.module.ts`, `api-keys.e2e-spec.ts`, `audit-rule.ts`, `DisabledOperators`, `server-errors.spec.ts`, `zod-serialization.spec.ts`, `HttpMetrics`, `OperationSteps`, `database.module.ts`, `operator-auth.guard.ts`, `test-database.ts`, `request-id.spec.ts`, `security-headers.spec.ts`, `config.module.ts`, `tokens.service.spec.ts`, `api-keys.service.ts`, `main.ts`, `logger.module.ts`, `operator-auth-guard.e2e-spec.ts`, `forged-tokens.ts`, `migrate.module.ts`, `zone-servers.ts`, `operator-token.controller.ts`, `metrics.controller.ts`, `http-error.filter.spec.ts`, `redis.module.ts`, `zone.guard.spec.ts`, `Zone`, `request-id.spec.ts`, `@nestjs/common`, `cls-middleware.ts`, `TokensService`, `domain-event-bus.spec.ts`, `body-limit.spec.ts`, `transactions.e2e-spec.ts`, `server-key-guard.e2e-spec.ts`, `server/package.json`, `InternalProbeController`, `NeutralProbeController`?**
  _High betweenness centrality (0.281) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `CreateApiKeys1793300000000`, `CreateOperators1793300003000`, `ref_vitest`, `dependencies`, `DisabledOperators`, `Project`, `CreateChatTables1793215389271`, `OperationSteps`, `database.module.ts`, `test-database.ts`, `database-connection.e2e-spec.ts`, `migrate-mode.e2e-spec.ts`, `conversation.entity.spec.ts`, `operator-auth-guard.e2e-spec.ts`, `IdentityKey`, `participant.entity.spec.ts`, `conversation.entity.ts`, `Message`, `ConversationEvent`, `transactions.e2e-spec.ts`, `server/package.json`, `CreateProjects1793193549883`, `AddProjectsPublicKey1793300002000`, `database-entities.ts`, `CreateIdentityKeys1793300001000`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Should `JsonObject` be split into smaller, more focused modules?**
  _Cohesion score 0.12554112554112554 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `ServerErrorsProbeController`, `operator-auth-guard.e2e-spec.ts`, `body-limit.spec.ts`, `ValidationProbeController`, `server-errors.spec.ts`, `TelemetryProbeController`, `ErrorProbeController`, `zod-serialization.spec.ts`, `InternalProbeController`, `metrics.controller.ts`, `HttpMetrics`, `NeutralProbeController`, `http-error.filter.spec.ts`, `health.module.ts`, `zone.guard.spec.ts`, `MixedZoneController`, `security-headers.spec.ts`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._