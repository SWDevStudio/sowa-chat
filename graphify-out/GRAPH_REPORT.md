# Graph Report - hector-chat-epic-19  (2026-10-29)

## Corpus Check
- 214 files · ~39,510 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1525 nodes · 3049 edges · 100 communities (70 shown, 30 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 54 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b0e7c9b1`
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
- config.module.ts
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
- zone-servers.spec.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- participant.entity.spec.ts
- zod-serialization.spec.ts
- MixedZoneController
- Conversation
- conversation.entity.spec.ts
- tsconfig.build.json
- ValidationProbeController
- ref_vitest
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
- @nestjs/common
- migrate-mode.e2e-spec.ts
- @aws-sdk/client-s3@^3.1151.0
- Controller
- @nest-lab/throttler-storage-redis@^1.2.0
- @nestjs/throttler@^6.7.1
- zone.guard.spec.ts
- api-versioning.spec.ts
- json-object-limits.spec.ts
- InternalProbeController
- Zone
- telemetry.interceptor.spec.ts
- config-startup.e2e-spec.ts
- @nestjs/websockets@^12.1.3
- server-protocol.e2e-spec.ts
- domain-event-bus.spec.ts
- OperationSteps
- packages-build.e2e-spec.ts
- @nestjs/bullmq@^12.0.0
- pg
- pino-http
- audit-log.listener.spec.ts
- health.e2e-spec.ts
- health.module.ts
- @nestjs/cache-manager@^12.0.1
- ZonedController
- workspace-check-types.e2e-spec.ts
- reflect-metadata@^0.2.2
- sharp@^0.35.5
- log-redaction.e2e-spec.ts
- @nestjs/microservices@^12.1.3
- @socket.io/redis-adapter@^8.3.0
- @nestjs/schematics@^12.0.0
- status.controller.spec.ts
- bullmq@^6.3.15
- vite@catalog:
- @vitest/coverage-v8@catalog:

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 82 edges
2. `Zone()` - 46 edges
3. `typeorm` - 32 edges
4. `Project` - 26 edges
5. `findFreePort()` - 25 edges
6. `startZoneProbeApp()` - 23 edges
7. `JsonObject` - 21 edges
8. `@nestjs/testing` - 20 edges
9. `compilerOptions` - 20 edges
10. `@nestjs/config` - 19 edges

## Surprising Connections (you probably didn't know these)
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts
- `AuditRecord` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-rule.ts → packages/protocol/src/json-types.ts
- `Project` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/projects/project.entity.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (100 total, 30 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.08
Nodes (26): database, loadDataSource(), databaseEntities, DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createTypeOrmModule() (+18 more)

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
Nodes (29): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21, supertest@^7.0.0 (+21 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.12
Nodes (15): author, jose@^6.2.12, @nestjs/platform-socket.io@^12.1.3, @nestjs/swagger@^12.0.2, @sowa-chat/protocol@workspace:*, description, license, name (+7 more)

### Community 7 - "config.module.ts"
Cohesion: 0.05
Nodes (40): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, checkPrettyLogFormat(), Env (+32 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.14
Nodes (9): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, IdentityRow, VersionRow, useTestRedis(), redisUrl() (+1 more)

### Community 10 - "json-object-schema.ts"
Cohesion: 0.12
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, jsonObjectSchema, Violation, JsonObjectLimits, JsonValue (+1 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, @aws-sdk/s3-request-presigner@^3.1151.0, cache-manager@^7.2.9, helmet@^8.3.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1 (+17 more)

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
Cohesion: 0.05
Nodes (35): nestjs-zod@^5.5.0, ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, errorCodeOfStatus(), httpErrorResponse() (+27 more)

### Community 23 - "worker.module.ts"
Cohesion: 0.19
Nodes (6): AuditModule, AppClsModule, AppConfigModule, MetricsModule, OperationStepsModule, TelemetryModule

### Community 24 - "audit-log.e2e-spec.ts"
Cohesion: 0.11
Nodes (9): Project, ProjectsModule, ProjectsRepository, WorkerModule, ColumnRow, createProject(), ProjectFixture, @nestjs-cls/transactional (+1 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "zone-servers.spec.ts"
Cohesion: 0.14
Nodes (19): findZonePorts(), probeControllers, LogEntry, findFreePort(), serverDirectory, withOfflineDatabase(), offlineRedis, withOfflineRedis() (+11 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (8): Participant, ParticipantKind, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 32 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 33 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 34 - "Conversation"
Cohesion: 0.09
Nodes (7): Conversation, ConversationCloseReason, ConversationStatus, ConversationEvent, ConversationEventActorKind, Visitor, JsonObject

### Community 35 - "conversation.entity.spec.ts"
Cohesion: 0.13
Nodes (9): Channel, channelColumns(), findColumn(), columns(), expectedColumns, findColumn(), findRelation(), relations() (+1 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "ref_vitest"
Cohesion: 0.36
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "api.module.ts"
Cohesion: 0.19
Nodes (4): startListening(), stopListening(), ZoneServers, ZonesModule

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "api-app.ts"
Cohesion: 0.21
Nodes (7): ApiModule, useClsMiddleware(), LogDestination, echoRequestId(), resolveRequestId(), createE2eApp(), nestjs-pino

### Community 46 - "visitor.entity.spec.ts"
Cohesion: 0.18
Nodes (5): columns(), expectedColumns, findColumn(), findRelation(), relations()

### Community 47 - "main.ts"
Cohesion: 0.05
Nodes (36): pino@^10.4.0, configureApiApp(), CliModule, DatabaseMigrationStep, bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException() (+28 more)

### Community 49 - "database-connection.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), RunningServer

### Community 50 - "redis-connection.e2e-spec.ts"
Cohesion: 0.29
Nodes (7): fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableRedisUrl(), waitForHttpStatus()

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.19
Nodes (13): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+5 more)

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.23
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 55 - "AuditLogEntry"
Cohesion: 0.16
Nodes (7): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns

### Community 56 - "AuditScenarios"
Cohesion: 0.18
Nodes (4): DomainEventBus, AuditScenarios, happenedIn(), ScenarioError

### Community 57 - "@nestjs/common"
Cohesion: 0.09
Nodes (12): prom-client@^15.1.3, BodyProbeController, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, MethodOnlyController, Zone() (+4 more)

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 60 - "Controller"
Cohesion: 0.21
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 63 - "zone.guard.spec.ts"
Cohesion: 0.10
Nodes (22): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes (+14 more)

### Community 64 - "api-versioning.spec.ts"
Cohesion: 0.15
Nodes (5): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController, ZoneProbeApp

### Community 65 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 66 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 67 - "Zone"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 68 - "telemetry.interceptor.spec.ts"
Cohesion: 0.16
Nodes (5): ApiHttpModule, readMetricLines(), TelemetryProbeController, zoneUrl(), @nestjs/core

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "domain-event-bus.spec.ts"
Cohesion: 0.29
Nodes (7): happened, TestListener, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 73 - "OperationSteps"
Cohesion: 0.08
Nodes (12): DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationSteps, OperationStepsProbeController, beginOperation(), operationTimingKey (+4 more)

### Community 74 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 78 - "audit-log.listener.spec.ts"
Cohesion: 0.14
Nodes (14): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, auditedEventNames(), AuditRule, auditRules (+6 more)

### Community 79 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 80 - "health.module.ts"
Cohesion: 0.06
Nodes (19): ioredis@^6.0.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+11 more)

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 86 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 90 - "status.controller.spec.ts"
Cohesion: 0.33
Nodes (3): DependencyStatusBody, StatusBody, databaseUrl()

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 598 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `typeorm`, `request-id.spec.ts`, `server/package.json`, `config.module.ts`, `dependencies`, `server-errors.spec.ts`, `worker.module.ts`, `audit-log.e2e-spec.ts`, `zone-servers.spec.ts`, `zod-serialization.spec.ts`, `api.module.ts`, `api-app.ts`, `main.ts`, `log-redaction.spec.ts`, `AuditLogEntry`, `Controller`, `zone.guard.spec.ts`, `api-versioning.spec.ts`, `Zone`, `telemetry.interceptor.spec.ts`, `domain-event-bus.spec.ts`, `OperationSteps`, `audit-log.listener.spec.ts`, `health.module.ts`, `status.controller.spec.ts`?**
  _High betweenness centrality (0.239) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.07541478129713423 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `Conversation`, `conversation.entity.spec.ts`, `server/package.json`, `ref_vitest`, `OperationSteps`, `ref_node_path`, `dependencies`, `visitor.entity.spec.ts`, `database-connection.e2e-spec.ts`, `AuditLogEntry`, `audit-log.e2e-spec.ts`, `migrate-mode.e2e-spec.ts`, `participant.entity.spec.ts`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `@nestjs/common` to `api-versioning.spec.ts`, `zod-serialization.spec.ts`, `MixedZoneController`, `Zone`, `InternalProbeController`, `ValidationProbeController`, `telemetry.interceptor.spec.ts`, `zod-serialization.spec.ts`, `health.module.ts`, `ZonedController`, `server-errors.spec.ts`, `zone-servers.spec.ts`, `Controller`, `zone.guard.spec.ts`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Should `request-id.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._