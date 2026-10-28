# Graph Report - hector-chat-epic-12  (2026-10-29)

## Corpus Check
- 254 files · ~53,177 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1800 nodes · 3669 edges · 118 communities (90 shown, 28 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 62 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4a4ed432`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- typeorm
- bot-sdk/tsconfig.json
- package.json
- request-id.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- server/package.json
- env.schema.ts
- compilerOptions
- ref_node_path
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
- server-errors.spec.ts
- domain-event-bus.spec.ts
- database-entities.ts
- scripts
- zone-servers.spec.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- key-format.ts
- MixedZoneController
- ConversationEvent
- Project
- tsconfig.build.json
- ValidationProbeController
- http-error.filter.spec.ts
- nest-cli.json
- zone-servers.ts
- audit-log.e2e-spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- ApiKey
- redis-connection.e2e-spec.ts
- main.ts
- migrate.module.ts
- api-keys-service-probe.ts
- encryption-keys.schema.spec.ts
- log-settings.e2e-spec.ts
- telemetry.interceptor.spec.ts
- log-redaction.spec.ts
- protocol/src/index.ts
- AuditLogEntry
- Controller
- metrics.controller.ts
- findFreePort
- config.module.ts
- InternalProbeController
- logger.module.ts
- api-keys.service.ts
- ref_vitest
- NeutralProbeController
- api-keys.e2e-spec.ts
- json-object-limits.spec.ts
- Zone
- SlowOperations
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- JsonObjectValidator
- OperationSteps
- packages-build.e2e-spec.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- participant.entity.spec.ts
- conversation.entity.ts
- @nestjs/cache-manager@^12.0.1
- health.e2e-spec.ts
- health.module.ts
- cache-manager@^7.2.9
- startZoneProbeApp
- workspace-check-types.e2e-spec.ts
- zone.guard.spec.ts
- global-setup.ts
- log-redaction.e2e-spec.ts
- @nestjs/microservices@^12.1.3
- operation-steps.ts
- @nestjs/common
- api-app.ts
- Message
- ServerErrorsProbeController
- encrypted-secret.spec.ts
- ApiKeysRepository
- cls-middleware.ts
- audit-log.listener.spec.ts
- CreateChatTables1793215389271
- slow-operations.spec.ts
- ErrorProbeController
- conversation.entity.spec.ts
- ZonedController
- telemetry.interceptor.ts
- DatabaseStepSubscriber
- BodyProbeController
- TelemetryProbeController
- DatabaseMigrationStep
- @nest-lab/throttler-storage-redis@^1.2.0
- status.controller.spec.ts
- health.controller.spec.ts
- @nestjs/bullmq@^12.0.0

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 88 edges
2. `Zone()` - 46 edges
3. `typeorm` - 43 edges
4. `Project` - 33 edges
5. `Conversation` - 26 edges
6. `findFreePort()` - 25 edges
7. `@nestjs/testing` - 23 edges
8. `startZoneProbeApp()` - 23 edges
9. `JsonObject` - 23 edges
10. `@nestjs/config` - 21 edges

## Surprising Connections (you probably didn't know these)
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts
- `AuditRecord` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-rule.ts → packages/protocol/src/json-types.ts
- `ConversationEvent` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation-event.entity.ts → packages/protocol/src/json-types.ts
- `Conversation` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation.entity.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (118 total, 28 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.11
Nodes (7): CreateProjects1793193549883, CreateAuditLog1793200000000, AddConversationIndexes1793215983154, CreateApiKeys1793300000000, CreateIdentityKeys1793300001000, AddProjectsPublicKey1793300002000, typeorm

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "request-id.spec.ts"
Cohesion: 0.08
Nodes (19): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+11 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.08
Nodes (23): author, bullmq@^6.3.15, file-type@^22.1.1, helmet@^8.3.0, @nestjs/throttler@^6.7.1, @nestjs/websockets@^12.1.3, pg@^8.23.1, reflect-metadata@^0.2.2 (+15 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (21): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange() (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.13
Nodes (10): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, databaseUrl(), IdentityRow (+2 more)

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
Nodes (34): dependencies, @aws-sdk/client-s3@^3.1151.0, jose@^6.2.12, nest-commander@^3.21.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1 (+26 more)

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

### Community 22 - "server-errors.spec.ts"
Cohesion: 0.15
Nodes (14): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, internalErrorMessage, ApiExceptionInput, entries() (+6 more)

### Community 23 - "domain-event-bus.spec.ts"
Cohesion: 0.15
Nodes (12): DomainEventBus, happened, TestListener, DomainEventHandler, DomainEventName, DomainEvents, OnDomainEvent(), DomainEvents (+4 more)

### Community 24 - "database-entities.ts"
Cohesion: 0.12
Nodes (15): database, loadDataSource(), databaseEntities, DatabaseMigration, databaseMigrations, createDataSourceOptions(), DatabaseConnection, DatabaseEntity (+7 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "zone-servers.spec.ts"
Cohesion: 0.14
Nodes (17): LogDestination, createRedactionProbeApp(), probeControllers, withOfflineDatabase(), offlineRedis, withOfflineRedis(), readyRedis, RedisStub (+9 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, runToExit() (+3 more)

### Community 28 - ".create"
Cohesion: 0.16
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.08
Nodes (28): Channel, ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation() (+20 more)

### Community 32 - "key-format.ts"
Cohesion: 0.22
Nodes (13): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+5 more)

### Community 33 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "Project"
Cohesion: 0.09
Nodes (12): channelColumns(), findColumn(), Project, columns(), expectedColumns, findColumn(), findRelation(), relations() (+4 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "http-error.filter.spec.ts"
Cohesion: 0.16
Nodes (12): errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter, requestIdOf(), responseZodErrorOf() (+4 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-servers.ts"
Cohesion: 0.22
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 41 - "audit-log.e2e-spec.ts"
Cohesion: 0.13
Nodes (5): ProjectsModule, ProjectsRepository, WorkerModule, testAuditRules, @nestjs-cls/transactional-adapter-typeorm

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "zod-serialization.spec.ts"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 45 - "ApiKey"
Cohesion: 0.13
Nodes (7): ApiKey, ApiKeyKind, apiKeyKinds, NewApiKey, ColumnRow, expectedColumns, @nestjs-cls/transactional

### Community 46 - "redis-connection.e2e-spec.ts"
Cohesion: 0.13
Nodes (16): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), fetchStatus(), repositoryRoot (+8 more)

### Community 47 - "main.ts"
Cohesion: 0.15
Nodes (14): ApiModule, CliModule, createContext(), mode, runApi(), runCli(), runMigrate(), runners (+6 more)

### Community 48 - "migrate.module.ts"
Cohesion: 0.22
Nodes (4): PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 49 - "api-keys-service-probe.ts"
Cohesion: 0.27
Nodes (10): eventFields, serverKey, ApiKeysRepositoryStub, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf(), runWithoutTransaction() (+2 more)

### Community 50 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+2 more)

### Community 52 - "telemetry.interceptor.spec.ts"
Cohesion: 0.15
Nodes (7): HttpLabel, HttpMetrics, HttpRequestRecord, labelNames, readMetricLines(), zoneUrl(), rxjs

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (11): allOutput(), CapturedLogs, fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields, RedactionProbeController (+3 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.16
Nodes (15): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, OperatorRole, operatorRoles (+7 more)

### Community 55 - "AuditLogEntry"
Cohesion: 0.13
Nodes (7): ActorKind, actorKinds, AuditLogEntry, AuditLogRepository, NewAuditLogEntry, ColumnRow, expectedColumns

### Community 56 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 57 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 58 - "findFreePort"
Cohesion: 0.11
Nodes (23): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus() (+15 more)

### Community 59 - "config.module.ts"
Cohesion: 0.26
Nodes (13): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+5 more)

### Community 60 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 61 - "logger.module.ts"
Cohesion: 0.24
Nodes (10): pino@^10.4.0, createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions(), redactPaths, sensitiveFields (+2 more)

### Community 62 - "api-keys.service.ts"
Cohesion: 0.21
Nodes (9): hashMatches(), IssueApiKeyBaseInput, IssueApiKeyInput, IssuedApiKey, KeyActorKind, keyTypeByKind, RevokeApiKeyInput, VerifiedApiKey (+1 more)

### Community 63 - "ref_vitest"
Cohesion: 0.17
Nodes (5): errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody

### Community 64 - "NeutralProbeController"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 66 - "json-object-limits.spec.ts"
Cohesion: 0.08
Nodes (16): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+8 more)

### Community 67 - "Zone"
Cohesion: 0.15
Nodes (11): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+3 more)

### Community 68 - "SlowOperations"
Cohesion: 0.18
Nodes (4): SlowOperationsModule, roundSteps(), SlowOperations, TelemetryInterceptor

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "IdentityKey"
Cohesion: 0.14
Nodes (7): IdentityKey, IdentityKeyAlgorithm, identityKeyAlgorithms, ColumnRow, expectedColumns, jwk, jose

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 73 - "OperationSteps"
Cohesion: 0.19
Nodes (3): OperationStep, OperationSteps, OperationStepsProbeController

### Community 74 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "conversation.entity.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 79 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (10): DependencyChecks, HealthController, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus, StatusService (+2 more)

### Community 82 - "startZoneProbeApp"
Cohesion: 0.10
Nodes (9): probeControllers, probeControllers, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, startApp(), startZoneProbeApp() (+1 more)

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "zone.guard.spec.ts"
Cohesion: 0.13
Nodes (16): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), zonePathPrefixes, ApiZone, apiZones, zoneMetadataKey (+8 more)

### Community 85 - "global-setup.ts"
Cohesion: 0.27
Nodes (9): testcontainers@^12.2.1, @testcontainers/postgresql@^12.2.1, runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl(), testcontainers (+1 more)

### Community 86 - "log-redaction.e2e-spec.ts"
Cohesion: 0.31
Nodes (8): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), RunningServer

### Community 88 - "operation-steps.ts"
Cohesion: 0.35
Nodes (4): beginOperation(), operationTimingKey, nestjs-cls, @nestjs/typeorm

### Community 89 - "@nestjs/common"
Cohesion: 0.11
Nodes (14): AuditModule, AppClsModule, AppConfigModule, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, HealthModule (+6 more)

### Community 90 - "api-app.ts"
Cohesion: 0.21
Nodes (10): configureApiApp(), setupApiDocs(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore() (+2 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 93 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 94 - "ApiKeysRepository"
Cohesion: 0.15
Nodes (5): ApiKeysRepository, ApiKeysService, toEvent(), toLookupPrefix(), ApiKeysServiceProbe

### Community 95 - "cls-middleware.ts"
Cohesion: 0.57
Nodes (4): useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp()

### Community 96 - "audit-log.listener.spec.ts"
Cohesion: 0.14
Nodes (12): AuditLogListener, eventValues, happened, personalValues, auditedEventNames(), AuditRecord, AuditRule, auditRules (+4 more)

### Community 98 - "slow-operations.spec.ts"
Cohesion: 0.24
Nodes (3): LogEntry, pause(), SlowProbeController

### Community 100 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 102 - "telemetry.interceptor.ts"
Cohesion: 0.48
Nodes (4): operationSteps, OperationTiming, StepTimes, FinishedOperation

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 727 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `request-id.spec.ts`, `server/package.json`, `encryption.service.spec.ts`, `dependencies`, `server-errors.spec.ts`, `domain-event-bus.spec.ts`, `database-entities.ts`, `zone-servers.spec.ts`, `http-error.filter.spec.ts`, `zone-servers.ts`, `audit-log.e2e-spec.ts`, `zod-serialization.spec.ts`, `ApiKey`, `redis-connection.e2e-spec.ts`, `main.ts`, `migrate.module.ts`, `telemetry.interceptor.spec.ts`, `log-redaction.spec.ts`, `AuditLogEntry`, `metrics.controller.ts`, `config.module.ts`, `logger.module.ts`, `api-keys.service.ts`, `api-keys.e2e-spec.ts`, `Zone`, `SlowOperations`, `health.module.ts`, `startZoneProbeApp`, `zone.guard.spec.ts`, `operation-steps.ts`, `api-app.ts`, `cls-middleware.ts`, `audit-log.listener.spec.ts`, `slow-operations.spec.ts`, `telemetry.interceptor.ts`, `status.controller.spec.ts`, `health.controller.spec.ts`?**
  _High betweenness centrality (0.245) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `ConversationEvent`, `Project`, `conversation.entity.spec.ts`, `server/package.json`, `IdentityKey`, `operation-steps.ts`, `ref_node_path`, `audit-log.e2e-spec.ts`, `participant.entity.spec.ts`, `dependencies`, `conversation.entity.ts`, `ApiKey`, `database-entities.ts`, `findFreePort`, `Message`, `chat-tables.e2e-spec.ts`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `zone-servers.spec.ts` to `audit-log.listener.spec.ts`, `api-keys.e2e-spec.ts`, `devDependencies`, `server/package.json`, `audit-log.e2e-spec.ts`, `encryption.service.spec.ts`, `redis-connection.e2e-spec.ts`, `api-keys-service-probe.ts`, `AuditLogEntry`, `domain-event-bus.spec.ts`, `operation-steps.ts`, `findFreePort`, `config.module.ts`, `cls-middleware.ts`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Should `request-id.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._