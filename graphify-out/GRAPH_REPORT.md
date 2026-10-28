# Graph Report - hector-chat-epic-12  (2026-10-29)

## Corpus Check
- 269 files · ~58,651 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1910 nodes · 3908 edges · 112 communities (88 shown, 24 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 62 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6717e95b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- logger.module.ts
- devDependencies
- server-modes.e2e-spec.ts
- telemetry.interceptor.spec.ts
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
- test-database.ts
- scripts
- zone-servers.spec.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- AuditLogRepository
- key-format.ts
- cls-middleware.ts
- request-id.spec.ts
- Project
- tsconfig.build.json
- ValidationProbeController
- server-errors.spec.ts
- nest-cli.json
- zone-servers.ts
- audit-log.e2e-spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- ApiKey
- telemetry.module.ts
- migrate.module.ts
- ConversationEvent
- api-keys-service-probe.ts
- log-redaction.spec.ts
- log-settings.e2e-spec.ts
- typeorm
- log-level-warn.spec.ts
- protocol/src/index.ts
- AuditLogEntry
- Visitor
- migrate-mode.e2e-spec.ts
- findFreePort
- config.module.ts
- InternalProbeController
- tokens.service.spec.ts
- api-keys.service.ts
- domain-event-bus.spec.ts
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
- cache-manager@^7.2.9
- body-limit.spec.ts
- workspace-check-types.e2e-spec.ts
- zone.decorator.ts
- Controller
- AuditScenarios
- zone.guard.spec.ts
- conversation.entity.spec.ts
- @nestjs/common
- ref_express
- Message
- log-redaction.e2e-spec.ts
- file-type@^22.1.1
- ApiKeysService
- @aws-sdk/s3-request-presigner@^3.1151.0
- audit-log.e2e-spec.ts
- nest-commander@^3.21.0
- @nestjs/websockets@^12.1.3
- @nestjs/microservices@^12.1.3
- ZonedController
- @nestjs/platform-socket.io@^12.1.3
- helmet
- @nestjs/bullmq@^12.0.0
- pg
- @nestjs/cache-manager@^12.0.1

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 95 edges
2. `Zone()` - 46 edges
3. `typeorm` - 45 edges
4. `Project` - 35 edges
5. `Conversation` - 26 edges
6. `@nestjs/testing` - 25 edges
7. `findFreePort()` - 25 edges
8. `@nestjs/config` - 23 edges
9. `startZoneProbeApp()` - 23 edges
10. `JsonObject` - 23 edges

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

## Communities (112 total, 24 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.05
Nodes (22): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity (+14 more)

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
Nodes (42): author, description, devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0 (+34 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "telemetry.interceptor.spec.ts"
Cohesion: 0.12
Nodes (5): ProbeController, readMetricLines(), TelemetryProbeController, zoneUrl(), ZoneProbeApp

### Community 7 - "env.schema.ts"
Cohesion: 0.05
Nodes (36): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+28 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_vitest"
Cohesion: 0.13
Nodes (10): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, databaseUrl(), IdentityRow, VersionRow, useTestRedis() (+2 more)

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
Cohesion: 0.05
Nodes (37): dependencies, @aws-sdk/client-s3@^3.1151.0, ioredis@^6.0.0, jose@^6.2.12, @nest-lab/throttler-storage-redis@^1.2.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1 (+29 more)

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

### Community 23 - "RequestContext"
Cohesion: 0.11
Nodes (6): RequestContextModule, RequestContext, RequestOperator, ConsumerModule, ContextConsumer, OperatorRole

### Community 24 - "test-database.ts"
Cohesion: 0.11
Nodes (8): Operator, IndexRow, PlanRow, ColumnRow, ConstraintRow, expectedColumns, truncateAllTables(), useTestDatabase()

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "zone-servers.spec.ts"
Cohesion: 0.13
Nodes (16): HealthBody, HealthEntry, DependencyStatusBody, StatusBody, probeControllers, withOfflineDatabase(), offlineRedis, withOfflineRedis() (+8 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, runToExit() (+3 more)

### Community 28 - ".create"
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "AuditLogRepository"
Cohesion: 0.19
Nodes (3): AuditLogListener, AuditLogRepository, AuditRule

### Community 32 - "key-format.ts"
Cohesion: 0.21
Nodes (14): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+6 more)

### Community 33 - "cls-middleware.ts"
Cohesion: 0.23
Nodes (6): useClsMiddleware(), LogDestination, echoRequestId(), resolveRequestId(), createE2eApp(), nestjs-pino

### Community 34 - "request-id.spec.ts"
Cohesion: 0.22
Nodes (9): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, ProbeService (+1 more)

### Community 35 - "Project"
Cohesion: 0.08
Nodes (28): Channel, ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation() (+20 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "ValidationProbeController"
Cohesion: 0.13
Nodes (5): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ValidationProbeController

### Community 38 - "server-errors.spec.ts"
Cohesion: 0.05
Nodes (35): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, ApiHttpModule, errorCodeByStatus, errorCodeOfStatus(), httpErrorResponse() (+27 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-servers.ts"
Cohesion: 0.22
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 41 - "audit-log.e2e-spec.ts"
Cohesion: 0.17
Nodes (5): ProjectsModule, ProjectsRepository, WorkerModule, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "ApiKey"
Cohesion: 0.12
Nodes (4): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey

### Community 46 - "telemetry.module.ts"
Cohesion: 0.12
Nodes (7): HttpMetrics, StepTimes, FinishedOperation, SlowOperationsModule, roundSteps(), SlowOperations, TelemetryInterceptor

### Community 47 - "migrate.module.ts"
Cohesion: 0.18
Nodes (4): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps

### Community 48 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 49 - "api-keys-service-probe.ts"
Cohesion: 0.26
Nodes (11): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+3 more)

### Community 50 - "log-redaction.spec.ts"
Cohesion: 0.19
Nodes (11): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+3 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.23
Nodes (11): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+3 more)

### Community 52 - "typeorm"
Cohesion: 0.13
Nodes (12): database, loadDataSource(), channelColumns(), findColumn(), apiKeyKinds, Project, ColumnRow, expectedColumns (+4 more)

### Community 53 - "log-level-warn.spec.ts"
Cohesion: 0.17
Nodes (10): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+2 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.06
Nodes (29): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, defaultLimits, isAccepted() (+21 more)

### Community 55 - "AuditLogEntry"
Cohesion: 0.14
Nodes (8): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns, createProject()

### Community 56 - "Visitor"
Cohesion: 0.15
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor

### Community 57 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, withClient() (+2 more)

### Community 58 - "findFreePort"
Cohesion: 0.12
Nodes (20): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus() (+12 more)

### Community 59 - "config.module.ts"
Cohesion: 0.25
Nodes (15): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig (+7 more)

### Community 60 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 61 - "tokens.service.spec.ts"
Cohesion: 0.07
Nodes (41): parseEntry(), parseKeys(), parsePrivateKey(), reject(), TokenSigningKey, tokenSigningKeysSchema, TokensModule, SignedToken (+33 more)

### Community 62 - "api-keys.service.ts"
Cohesion: 0.21
Nodes (9): hashMatches(), IssueApiKeyBaseInput, IssueApiKeyInput, IssuedApiKey, KeyActorKind, keyTypeByKind, RevokeApiKeyInput, VerifiedApiKey (+1 more)

### Community 63 - "domain-event-bus.spec.ts"
Cohesion: 0.16
Nodes (12): DomainEventBus, happened, TestListener, DomainEventHandler, DomainEventName, DomainEvents, OnDomainEvent(), DomainEvents (+4 more)

### Community 64 - "NeutralProbeController"
Cohesion: 0.25
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 66 - "JsonObjectValidator"
Cohesion: 0.28
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 67 - "Zone"
Cohesion: 0.15
Nodes (11): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+3 more)

### Community 68 - "main.ts"
Cohesion: 0.13
Nodes (16): configureApiApp(), ApiModule, CliModule, createContext(), mode, runApi(), runCli(), runMigrate() (+8 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "IdentityKey"
Cohesion: 0.14
Nodes (6): IdentityKey, IdentityKeyAlgorithm, identityKeyAlgorithms, ColumnRow, expectedColumns, jwk

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "zod-serialization.spec.ts"
Cohesion: 0.22
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, redirectLogsTo()

### Community 73 - "telemetry.interceptor.ts"
Cohesion: 0.11
Nodes (10): DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationSteps, OperationStepsProbeController, beginOperation(), operationTimingKey (+2 more)

### Community 74 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 75 - "slow-operations.spec.ts"
Cohesion: 0.24
Nodes (3): LogEntry, pause(), SlowProbeController

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "conversation.entity.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 78 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 79 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 80 - "health.module.ts"
Cohesion: 0.07
Nodes (19): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+11 more)

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "zone.decorator.ts"
Cohesion: 0.15
Nodes (17): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, ApiZone, apiZones (+9 more)

### Community 85 - "Controller"
Cohesion: 0.21
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 86 - "AuditScenarios"
Cohesion: 0.29
Nodes (3): AuditScenarios, happenedIn(), ScenarioError

### Community 87 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 88 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 89 - "@nestjs/common"
Cohesion: 0.14
Nodes (11): databaseEntities, AuditModule, AppClsModule, AppConfigModule, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules (+3 more)

### Community 90 - "ref_express"
Cohesion: 0.26
Nodes (8): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders(), @nestjs/platform-express

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 96 - "audit-log.e2e-spec.ts"
Cohesion: 0.19
Nodes (10): eventValues, happened, personalValues, auditedEventNames(), auditRules, auditedEvents, botKeyEvent, serverKeyEvent (+2 more)

### Community 104 - "helmet"
Cohesion: 0.14
Nodes (8): bullmq@^6.3.15, helmet@^8.3.0, reflect-metadata@^0.2.2, @socket.io/redis-adapter@^8.3.0, bullmq, helmet, reflect-metadata, @socket.io/redis-adapter

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 765 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `health.module.ts` to `logger.module.ts`, `devDependencies`, `telemetry.interceptor.spec.ts`, `encryption.service.spec.ts`, `dependencies`, `RequestContext`, `test-database.ts`, `zone-servers.spec.ts`, `cls-middleware.ts`, `request-id.spec.ts`, `ValidationProbeController`, `server-errors.spec.ts`, `audit-log.e2e-spec.ts`, `ApiKey`, `telemetry.module.ts`, `migrate.module.ts`, `log-redaction.spec.ts`, `log-level-warn.spec.ts`, `AuditLogEntry`, `config.module.ts`, `tokens.service.spec.ts`, `api-keys.service.ts`, `domain-event-bus.spec.ts`, `NeutralProbeController`, `api-keys.e2e-spec.ts`, `Zone`, `main.ts`, `zod-serialization.spec.ts`, `telemetry.interceptor.ts`, `slow-operations.spec.ts`, `metrics.controller.ts`, `body-limit.spec.ts`, `zone.decorator.ts`, `Controller`, `zone.guard.spec.ts`, `@nestjs/common`, `ref_express`, `audit-log.e2e-spec.ts`?**
  _High betweenness centrality (0.247) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05023796932839767 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `Project`, `devDependencies`, `findFreePort`, `IdentityKey`, `telemetry.interceptor.ts`, `ref_vitest`, `audit-log.e2e-spec.ts`, `participant.entity.spec.ts`, `conversation.entity.ts`, `dependencies`, `ConversationEvent`, `conversation.entity.spec.ts`, `test-database.ts`, `Visitor`, `Message`, `migrate-mode.e2e-spec.ts`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `zone-servers.spec.ts` to `audit-log.e2e-spec.ts`, `api-keys.e2e-spec.ts`, `cls-middleware.ts`, `devDependencies`, `telemetry.interceptor.ts`, `encryption.service.spec.ts`, `audit-log.e2e-spec.ts`, `api-keys-service-probe.ts`, `AuditLogEntry`, `RequestContext`, `findFreePort`, `config.module.ts`, `tokens.service.spec.ts`, `domain-event-bus.spec.ts`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06423034330011074 - nodes in this community are weakly interconnected._