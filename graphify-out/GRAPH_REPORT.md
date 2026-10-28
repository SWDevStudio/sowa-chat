# Graph Report - hector-chat-epic-12  (2026-10-29)

## Corpus Check
- 274 files · ~60,162 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1942 nodes · 3997 edges · 131 communities (90 shown, 41 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 64 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `eecff3b9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- logger.module.ts
- devDependencies
- server-modes.e2e-spec.ts
- security-headers.spec.ts
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
- Operator
- scripts
- zone-servers.spec.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- http-error.filter.spec.ts
- key-format.ts
- cls-middleware.ts
- request-id.spec.ts
- Project
- tsconfig.build.json
- ValidationProbeController
- server-errors.spec.ts
- nest-cli.json
- zone-servers.ts
- protocol/src/index.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- ApiKey
- telemetry.module.ts
- migrate.module.ts
- ConversationEvent
- api-keys-service-probe.ts
- log-redaction.spec.ts
- log-settings.e2e-spec.ts
- Project
- log-level-warn.spec.ts
- json-object-limits.spec.ts
- operators.service.spec.ts
- Visitor
- migrate-mode.e2e-spec.ts
- findFreePort
- config.module.ts
- InternalProbeController
- tokens.service.spec.ts
- api-keys.service.ts
- audit-log.listener.spec.ts
- NeutralProbeController
- api-keys.e2e-spec.ts
- JsonObjectValidator
- Zone
- main.ts
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- zod-serialization.spec.ts
- telemetry.interceptor.ts
- packages-build.e2e-spec.ts
- slow-operations.spec.ts
- participant.entity.spec.ts
- conversation.entity.ts
- metrics.controller.ts
- health.e2e-spec.ts
- health.module.ts
- redis.module.ts
- workspace-check-types.e2e-spec.ts
- zone.decorator.ts
- Controller
- encryption-keys.schema.spec.ts
- zone.guard.spec.ts
- conversation.entity.spec.ts
- @nestjs/common
- ref_express
- Message
- log-redaction.e2e-spec.ts
- tokens.service.ts
- ApiKeysService
- global-setup.ts
- ServerErrorsProbeController
- TokensService
- MixedZoneController
- CreateChatTables1793215389271
- ref_node_path
- ZonedController
- request-context.spec.ts
- @nestjs/platform-socket.io@^12.1.3
- server/package.json
- ErrorProbeController
- operators.module.ts
- env.schema.logging.spec.ts
- DatabaseMigrationStep
- status.controller.spec.ts
- BodyProbeController
- log-destination.spec.ts
- TelemetryProbeController
- ProbeController
- TestTokenSigningConfigModule
- bullmq@^6.3.15
- @nest-lab/throttler-storage-redis@^1.2.0
- sharp@^0.35.5
- @sowa-chat/protocol@workspace:*
- @nestjs/cache-manager@^12.0.1
- zod@catalog:

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 98 edges
2. `typeorm` - 46 edges
3. `Zone()` - 46 edges
4. `Project` - 35 edges
5. `@nestjs/testing` - 27 edges
6. `Conversation` - 26 edges
7. `findFreePort()` - 25 edges
8. `@nestjs/config` - 23 edges
9. `startZoneProbeApp()` - 23 edges
10. `JsonObject` - 23 edges

## Surprising Connections (you probably didn't know these)
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts
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

## Communities (131 total, 41 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.06
Nodes (17): DatabaseMigration, databaseMigrations, DatabaseConnection, DatabaseEntity, FirstEntity, SecondEntity, CreateProjects1793193549883, CreateAuditLog1793200000000 (+9 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "logger.module.ts"
Cohesion: 0.29
Nodes (8): createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions(), redactPaths, sensitiveFields, sensitiveHeaders

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "security-headers.spec.ts"
Cohesion: 0.12
Nodes (7): probeControllers, probeControllers, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ZoneProbeApp

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (21): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_vitest"
Cohesion: 0.12
Nodes (7): packageJson, databaseUrl(), IdentityRow, VersionRow, useTestRedis(), redisUrl(), testEnv

### Community 10 - "encryption.service.spec.ts"
Cohesion: 0.08
Nodes (22): encryptionConfig, CryptoModule, authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext (+14 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.06
Nodes (33): dependencies, @aws-sdk/client-s3@^3.1151.0, @aws-sdk/s3-request-presigner@^3.1151.0, cache-manager@^7.2.9, file-type@^22.1.1, helmet@^8.3.0, jose@^6.2.12, @nestjs/bullmq@^12.0.0 (+25 more)

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

### Community 24 - "Operator"
Cohesion: 0.18
Nodes (5): Operator, OperatorProfile, IssueOperatorTokenInput, RequestOperator, OperatorRole

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "zone-servers.spec.ts"
Cohesion: 0.18
Nodes (15): findZonePorts(), probeControllers, findFreePort(), serverDirectory, withOfflineDatabase(), offlineRedis, withOfflineRedis(), readyRedis (+7 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.14
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "http-error.filter.spec.ts"
Cohesion: 0.14
Nodes (14): ApiHttpModule, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter (+6 more)

### Community 32 - "key-format.ts"
Cohesion: 0.21
Nodes (14): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+6 more)

### Community 33 - "cls-middleware.ts"
Cohesion: 0.33
Nodes (5): ApiModule, useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp()

### Community 34 - "request-id.spec.ts"
Cohesion: 0.22
Nodes (9): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, ProbeService, waitForRequestEntry() (+1 more)

### Community 35 - "Project"
Cohesion: 0.07
Nodes (30): Channel, channelColumns(), findColumn(), ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows() (+22 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "server-errors.spec.ts"
Cohesion: 0.12
Nodes (18): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ApiExceptionInput, entries(), errorEntriesOf() (+10 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-servers.ts"
Cohesion: 0.32
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 41 - "protocol/src/index.ts"
Cohesion: 0.17
Nodes (14): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, operatorRoles, OperatorTokenRequest (+6 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "ApiKey"
Cohesion: 0.12
Nodes (4): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey

### Community 46 - "telemetry.module.ts"
Cohesion: 0.09
Nodes (15): HttpLabel, HttpMetrics, HttpRequestRecord, labelNames, StepTimes, FinishedOperation, SlowOperationsModule, roundSteps() (+7 more)

### Community 47 - "migrate.module.ts"
Cohesion: 0.22
Nodes (4): PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 48 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 49 - "api-keys-service-probe.ts"
Cohesion: 0.26
Nodes (11): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+3 more)

### Community 50 - "log-redaction.spec.ts"
Cohesion: 0.16
Nodes (13): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+5 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "Project"
Cohesion: 0.06
Nodes (20): AuditLogEntry, apiKeyKinds, Project, ProjectsModule, ProjectsRepository, createDataSourceOptions(), WorkerModule, ColumnRow (+12 more)

### Community 53 - "log-level-warn.spec.ts"
Cohesion: 0.29
Nodes (9): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+1 more)

### Community 54 - "json-object-limits.spec.ts"
Cohesion: 0.08
Nodes (16): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+8 more)

### Community 55 - "operators.service.spec.ts"
Cohesion: 0.12
Nodes (8): OperatorsRepository, IssuedOperatorToken, OperatorDisabledError, OperatorsService, operatorTokenTtlSeconds, input, Probe, signedToken

### Community 56 - "Visitor"
Cohesion: 0.15
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor

### Community 57 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 58 - "findFreePort"
Cohesion: 0.14
Nodes (14): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), fetchStatus(), repositoryRoot (+6 more)

### Community 59 - "config.module.ts"
Cohesion: 0.25
Nodes (14): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+6 more)

### Community 60 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 61 - "tokens.service.spec.ts"
Cohesion: 0.15
Nodes (24): encodePart(), flipSignatureBit(), ForgedTokenInput, forgeToken(), forgeUnsecuredToken(), parseTestSigningKeys(), publicKeyPemBytes(), publicKeyRawBytes() (+16 more)

### Community 62 - "api-keys.service.ts"
Cohesion: 0.22
Nodes (9): hashMatches(), IssueApiKeyBaseInput, IssueApiKeyInput, IssuedApiKey, KeyActorKind, keyTypeByKind, RevokeApiKeyInput, VerifiedApiKey (+1 more)

### Community 63 - "audit-log.listener.spec.ts"
Cohesion: 0.07
Nodes (31): ActorKind, actorKinds, AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, NewAuditLogEntry (+23 more)

### Community 64 - "NeutralProbeController"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 67 - "Zone"
Cohesion: 0.15
Nodes (11): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+3 more)

### Community 68 - "main.ts"
Cohesion: 0.18
Nodes (13): CliModule, createContext(), mode, runApi(), runCli(), runMigrate(), runners, runToCompletion() (+5 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "IdentityKey"
Cohesion: 0.14
Nodes (6): IdentityKey, IdentityKeyAlgorithm, identityKeyAlgorithms, ColumnRow, expectedColumns, jwk

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 73 - "telemetry.interceptor.ts"
Cohesion: 0.11
Nodes (10): DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationSteps, OperationStepsProbeController, beginOperation(), operationTimingKey (+2 more)

### Community 74 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "conversation.entity.ts"
Cohesion: 0.09
Nodes (16): database, loadDataSource(), Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind (+8 more)

### Community 78 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 79 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 81 - "redis.module.ts"
Cohesion: 0.20
Nodes (8): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "zone.decorator.ts"
Cohesion: 0.21
Nodes (12): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), zonePathPrefixes, ApiZone (+4 more)

### Community 85 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 86 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 87 - "zone.guard.spec.ts"
Cohesion: 0.15
Nodes (7): zoneMetadataKey, CapturedResponse, FakeRequest, guardedControllers, startApp(), unitPorts, @nestjs/core

### Community 88 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 89 - "@nestjs/common"
Cohesion: 0.15
Nodes (11): databaseEntities, AuditModule, AppClsModule, AppConfigModule, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules (+3 more)

### Community 90 - "ref_express"
Cohesion: 0.20
Nodes (11): configureApiApp(), setupApiDocs(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore() (+3 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 93 - "tokens.service.ts"
Cohesion: 0.23
Nodes (11): parseEntry(), parseKeys(), parsePrivateKey(), reject(), TokenSigningKey, tokenSigningKeysSchema, SignedToken, SignTokenInput (+3 more)

### Community 95 - "global-setup.ts"
Cohesion: 0.27
Nodes (9): testcontainers@^12.2.1, @testcontainers/postgresql@^12.2.1, runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl(), testcontainers (+1 more)

### Community 97 - "TokensService"
Cohesion: 0.20
Nodes (3): TokenConsumer, TokensService, createService()

### Community 98 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 100 - "ref_node_path"
Cohesion: 0.25
Nodes (5): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory

### Community 104 - "server/package.json"
Cohesion: 0.08
Nodes (23): author, nest-commander@^3.21.0, @nestjs/microservices@^12.1.3, @nestjs/throttler@^6.7.1, @nestjs/websockets@^12.1.3, pg@^8.23.1, pino-http@^11.0.0, reflect-metadata@^0.2.2 (+15 more)

### Community 107 - "env.schema.logging.spec.ts"
Cohesion: 0.33
Nodes (3): Env, logLevels, requiredEnv

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 778 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **41 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `telemetry.module.ts` to `logger.module.ts`, `security-headers.spec.ts`, `encryption.service.spec.ts`, `dependencies`, `Operator`, `zone-servers.spec.ts`, `http-error.filter.spec.ts`, `cls-middleware.ts`, `request-id.spec.ts`, `server-errors.spec.ts`, `zone-servers.ts`, `ApiKey`, `migrate.module.ts`, `log-redaction.spec.ts`, `Project`, `log-level-warn.spec.ts`, `operators.service.spec.ts`, `config.module.ts`, `tokens.service.spec.ts`, `api-keys.service.ts`, `audit-log.listener.spec.ts`, `api-keys.e2e-spec.ts`, `Zone`, `main.ts`, `zod-serialization.spec.ts`, `telemetry.interceptor.ts`, `metrics.controller.ts`, `health.module.ts`, `redis.module.ts`, `body-limit.spec.ts`, `zone.decorator.ts`, `zone.guard.spec.ts`, `@nestjs/common`, `ref_express`, `tokens.service.ts`, `request-context.spec.ts`, `server/package.json`, `operators.module.ts`, `status.controller.spec.ts`, `log-destination.spec.ts`?**
  _High betweenness centrality (0.262) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06471631205673758 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `database-migrations.ts` to `Project`, `findFreePort`, `IdentityKey`, `server/package.json`, `telemetry.interceptor.ts`, `ref_vitest`, `participant.entity.spec.ts`, `conversation.entity.ts`, `dependencies`, `ConversationEvent`, `Project`, `conversation.entity.spec.ts`, `Operator`, `Visitor`, `Message`, `migrate-mode.e2e-spec.ts`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `zone-servers.spec.ts` to `api-keys.e2e-spec.ts`, `cls-middleware.ts`, `devDependencies`, `request-context.spec.ts`, `server/package.json`, `telemetry.interceptor.ts`, `encryption.service.spec.ts`, `api-keys-service-probe.ts`, `Project`, `operators.service.spec.ts`, `findFreePort`, `config.module.ts`, `tokens.service.spec.ts`, `audit-log.listener.spec.ts`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._