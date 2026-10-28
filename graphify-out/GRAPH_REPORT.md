# Graph Report - hector-chat-epic-19  (2026-10-29)

## Corpus Check
- 216 files · ~40,339 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1546 nodes · 3084 edges · 118 communities (81 shown, 37 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 54 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `08d13f04`
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
- json-object-schema.ts
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
- worker.module.ts
- audit-log.e2e-spec.ts
- scripts
- zone-probe.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- participant.entity.spec.ts
- zod-serialization.spec.ts
- zone.guard.spec.ts
- conversation-event.entity.spec.ts
- conversation.entity.spec.ts
- tsconfig.build.json
- ValidationProbeController
- http-error.filter.spec.ts
- nest-cli.json
- api.module.ts
- file-type@^22.1.1
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- api-app.ts
- visitor.entity.spec.ts
- main.ts
- nest-commander@^3.21.0
- database-connection.e2e-spec.ts
- redis-connection.e2e-spec.ts
- log-settings.e2e-spec.ts
- JsonObjectValidator
- log-redaction.spec.ts
- protocol/src/index.ts
- AuditLogEntry
- AuditScenarios
- metrics.controller.ts
- migrate-mode.e2e-spec.ts
- config.module.ts
- Controller
- typeorm
- @nestjs/throttler@^6.7.1
- zone.guard.spec.ts
- api-versioning.spec.ts
- json-object-limits.spec.ts
- InternalProbeController
- Zone
- TelemetryProbeController
- config-startup.e2e-spec.ts
- @nestjs/websockets@^12.1.3
- server-protocol.e2e-spec.ts
- domain-event-bus.spec.ts
- OperationSteps
- packages-build.e2e-spec.ts
- @nestjs/bullmq@^12.0.0
- Conversation
- zod-validation.spec.ts
- domain-event-bus.spec.ts
- health.e2e-spec.ts
- health.module.ts
- HttpMetrics
- telemetry.interceptor.spec.ts
- workspace-check-types.e2e-spec.ts
- reflect-metadata@^0.2.2
- sharp@^0.35.5
- log-redaction.e2e-spec.ts
- @nestjs/microservices@^12.1.3
- @socket.io/redis-adapter@^8.3.0
- slow-operations.ts
- api-app.ts
- Message
- ServerErrorsProbeController
- @vitest/coverage-v8@catalog:
- message.entity.spec.ts
- body-limit.spec.ts
- slow-operations.spec.ts
- redis-stub-probe.ts
- AuditLogListener
- ErrorProbeController
- errors.spec.ts
- Visitor
- Channel
- OperationStepsProbeController
- cache-manager@^7.2.9
- jose@^6.2.12
- @nestjs/platform-socket.io@^12.1.3
- @nestjs/swagger
- rxjs
- @sowa-chat/protocol@workspace:*
- @types/supertest@^7.0.0

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 82 edges
2. `Zone()` - 46 edges
3. `typeorm` - 34 edges
4. `Project` - 26 edges
5. `findFreePort()` - 25 edges
6. `startZoneProbeApp()` - 23 edges
7. `JsonObject` - 23 edges
8. `Conversation` - 22 edges
9. `@nestjs/testing` - 20 edges
10. `compilerOptions` - 20 edges

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

## Communities (118 total, 37 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.08
Nodes (24): database, loadDataSource(), databaseEntities, DatabaseMigration, databaseMigrations, createTypeOrmModule(), DatabaseModule, getTypeOrmModule() (+16 more)

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
Cohesion: 0.07
Nodes (29): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, supertest@^7.0.0 (+21 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.12
Nodes (15): author, @aws-sdk/client-s3@^3.1151.0, @nestjs/cache-manager@^12.0.1, socket.io@^4.8.4, description, source-map-support@^0.5.21, license, name (+7 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (20): checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange(), logFormats (+12 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.09
Nodes (14): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, DependencyStatusBody, StatusBody, packageJson (+6 more)

### Community 10 - "json-object-schema.ts"
Cohesion: 0.14
Nodes (8): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, jsonObjectSchema, Violation, JsonObjectLimits, JsonValue

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @aws-sdk/s3-request-presigner@^3.1151.0, bullmq@^6.3.15, helmet@^8.3.0, @nest-lab/throttler-storage-redis@^1.2.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs/common@^12.0.1 (+18 more)

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
Cohesion: 0.14
Nodes (19): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage (+11 more)

### Community 23 - "worker.module.ts"
Cohesion: 0.15
Nodes (11): eventValues, happened, personalValues, AuditModule, auditRules, auditedEvents, AppClsModule, AppConfigModule (+3 more)

### Community 24 - "audit-log.e2e-spec.ts"
Cohesion: 0.16
Nodes (6): @nestjs-cls/transactional-adapter-typeorm@^2.0.1, ProjectsModule, ProjectsRepository, WorkerModule, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "zone-probe.ts"
Cohesion: 0.21
Nodes (12): LogDestination, withOfflineDatabase(), offlineRedis, withOfflineRedis(), createProbeApp(), ProbeAppOptions, redirectLogsTo(), stubTestEnv() (+4 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+2 more)

### Community 31 - "participant.entity.spec.ts"
Cohesion: 0.27
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 32 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "conversation-event.entity.spec.ts"
Cohesion: 0.15
Nodes (8): ConversationEvent, ConversationEventActorKind, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "http-error.filter.spec.ts"
Cohesion: 0.13
Nodes (9): nestjs-zod@^5.5.0, ApiHttpModule, HttpErrorFilter, requestIdOf(), responseZodErrorOf(), knownKeys, ProbeBodyDto, requestIdHeader (+1 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "api.module.ts"
Cohesion: 0.23
Nodes (4): startListening(), stopListening(), ZoneServers, ZonesModule

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "api-app.ts"
Cohesion: 0.39
Nodes (5): ApiModule, useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp()

### Community 46 - "visitor.entity.spec.ts"
Cohesion: 0.18
Nodes (5): columns(), expectedColumns, findColumn(), findRelation(), relations()

### Community 47 - "main.ts"
Cohesion: 0.07
Nodes (29): pino@^10.4.0, configureApiApp(), CliModule, DatabaseMigrationStep, createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions() (+21 more)

### Community 49 - "database-connection.e2e-spec.ts"
Cohesion: 0.27
Nodes (8): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), findFreePort()

### Community 50 - "redis-connection.e2e-spec.ts"
Cohesion: 0.13
Nodes (14): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, fetchStatus() (+6 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "JsonObjectValidator"
Cohesion: 0.30
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.23
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 55 - "AuditLogEntry"
Cohesion: 0.13
Nodes (8): ActorKind, actorKinds, AuditLogEntry, AuditLogRepository, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns

### Community 56 - "AuditScenarios"
Cohesion: 0.29
Nodes (3): AuditScenarios, happenedIn(), ScenarioError

### Community 57 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 59 - "config.module.ts"
Cohesion: 0.28
Nodes (13): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+5 more)

### Community 60 - "Controller"
Cohesion: 0.21
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 61 - "typeorm"
Cohesion: 0.20
Nodes (9): channelColumns(), findColumn(), ConversationCloseReason, ConversationStatus, Project, ColumnRow, ProjectFixture, JsonObject (+1 more)

### Community 63 - "zone.guard.spec.ts"
Cohesion: 0.17
Nodes (15): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, ApiZone, apiZones (+7 more)

### Community 64 - "api-versioning.spec.ts"
Cohesion: 0.25
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 65 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 66 - "InternalProbeController"
Cohesion: 0.15
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, serverDirectory

### Community 67 - "Zone"
Cohesion: 0.18
Nodes (10): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+2 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "domain-event-bus.spec.ts"
Cohesion: 0.31
Nodes (5): TestListener, DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 73 - "OperationSteps"
Cohesion: 0.14
Nodes (9): DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationSteps, beginOperation(), operationTimingKey, nestjs-cls (+1 more)

### Community 74 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 76 - "Conversation"
Cohesion: 0.13
Nodes (3): Conversation, Participant, ParticipantKind

### Community 77 - "zod-validation.spec.ts"
Cohesion: 0.17
Nodes (5): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ZoneProbeApp

### Community 78 - "domain-event-bus.spec.ts"
Cohesion: 0.23
Nodes (9): auditedEventNames(), AuditRule, DomainEventBus, happened, DomainEventHandler, DomainEventName, DomainEvents, OnDomainEvent() (+1 more)

### Community 79 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (12): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+4 more)

### Community 82 - "telemetry.interceptor.spec.ts"
Cohesion: 0.15
Nodes (7): BareController, MethodOnlyController, ZonedController, zoneMetadataKey, readMetricLines(), zoneUrl(), @nestjs/core

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 86 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 89 - "slow-operations.ts"
Cohesion: 0.21
Nodes (5): StepTimes, FinishedOperation, SlowOperationsModule, roundSteps(), SlowOperations

### Community 90 - "api-app.ts"
Cohesion: 0.29
Nodes (7): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders()

### Community 91 - "Message"
Cohesion: 0.18
Nodes (3): Message, MessageSenderKind, MessageType

### Community 94 - "message.entity.spec.ts"
Cohesion: 0.27
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 96 - "slow-operations.spec.ts"
Cohesion: 0.24
Nodes (3): LogEntry, pause(), SlowProbeController

### Community 97 - "redis-stub-probe.ts"
Cohesion: 0.25
Nodes (6): HealthBody, HealthEntry, readyRedis, RedisStub, startRedisStubProbeApp(), @nestjs/platform-express

### Community 100 - "errors.spec.ts"
Cohesion: 0.29
Nodes (5): errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 611 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **37 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `health.module.ts` to `typeorm`, `request-id.spec.ts`, `server/package.json`, `ref_node_path`, `dependencies`, `server-errors.spec.ts`, `worker.module.ts`, `audit-log.e2e-spec.ts`, `zone-probe.ts`, `zod-serialization.spec.ts`, `zone.guard.spec.ts`, `http-error.filter.spec.ts`, `api.module.ts`, `api-app.ts`, `main.ts`, `redis-connection.e2e-spec.ts`, `log-redaction.spec.ts`, `AuditLogEntry`, `metrics.controller.ts`, `config.module.ts`, `Controller`, `zone.guard.spec.ts`, `api-versioning.spec.ts`, `InternalProbeController`, `Zone`, `OperationSteps`, `zod-validation.spec.ts`, `domain-event-bus.spec.ts`, `telemetry.interceptor.spec.ts`, `slow-operations.ts`, `api-app.ts`, `body-limit.spec.ts`, `slow-operations.spec.ts`, `redis-stub-probe.ts`?**
  _High betweenness centrality (0.226) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.07712765957446809 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `typeorm`, `conversation-event.entity.spec.ts`, `conversation.entity.spec.ts`, `server/package.json`, `OperationSteps`, `ref_node_path`, `Conversation`, `dependencies`, `visitor.entity.spec.ts`, `database-connection.e2e-spec.ts`, `AuditLogEntry`, `audit-log.e2e-spec.ts`, `migrate-mode.e2e-spec.ts`, `Message`, `message.entity.spec.ts`, `participant.entity.spec.ts`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `api-versioning.spec.ts`, `zod-serialization.spec.ts`, `zone.guard.spec.ts`, `ErrorProbeController`, `InternalProbeController`, `ValidationProbeController`, `http-error.filter.spec.ts`, `TelemetryProbeController`, `zod-serialization.spec.ts`, `zod-validation.spec.ts`, `ServerErrorsProbeController`, `health.module.ts`, `telemetry.interceptor.spec.ts`, `server-errors.spec.ts`, `metrics.controller.ts`, `Controller`, `body-limit.spec.ts`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Should `request-id.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._