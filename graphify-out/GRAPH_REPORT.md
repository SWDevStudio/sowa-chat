# Graph Report - hector-chat-epic-19  (2026-10-29)

## Corpus Check
- 210 files · ~38,241 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1490 nodes · 2989 edges · 95 communities (70 shown, 25 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 53 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bc1cd27b`
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
- telemetry.interceptor.spec.ts
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
- http-error.filter.spec.ts
- worker.module.ts
- audit-log.e2e-spec.ts
- scripts
- zone-servers.spec.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- Project
- json-object-schema.ts
- zone.guard.spec.ts
- redis-connection.e2e-spec.ts
- ServerErrorsProbeController
- tsconfig.build.json
- ValidationProbeController
- @nestjs/common
- nest-cli.json
- api.module.ts
- file-type@^22.1.1
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- api-app.ts
- visitor.entity.spec.ts
- main.ts
- nest-commander@^3.21.0
- findFreePort
- server-errors.spec.ts
- log-settings.e2e-spec.ts
- JsonObjectValidator
- log-redaction.spec.ts
- protocol/src/index.ts
- AuditLogEntry
- pino-http
- metrics.controller.ts
- migrate-mode.e2e-spec.ts
- body-limit.spec.ts
- Controller
- @nestjs/platform-socket.io@^12.1.3
- zone.ts
- zod-validation.spec.ts
- json-object-limits.spec.ts
- Zone
- Zone
- ErrorProbeController
- config-startup.e2e-spec.ts
- api-app.ts
- server-protocol.e2e-spec.ts
- domain-event-bus.spec.ts
- OperationSteps
- packages-build.e2e-spec.ts
- @nestjs/bullmq@^12.0.0
- NeutralProbeController
- @aws-sdk/s3-request-presigner@^3.1151.0
- audit-log.listener.spec.ts
- helmet
- health.module.ts
- @nestjs/cache-manager@^12.0.1
- workspace-check-types.e2e-spec.ts
- request-id.spec.ts
- log-redaction.e2e-spec.ts
- @nestjs/microservices@^12.1.3
- TelemetryProbeController
- status.controller.spec.ts
- bullmq@^6.3.15
- @nestjs/schematics@^12.0.0

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 82 edges
2. `Zone()` - 46 edges
3. `typeorm` - 28 edges
4. `Project` - 26 edges
5. `findFreePort()` - 25 edges
6. `startZoneProbeApp()` - 23 edges
7. `@nestjs/testing` - 20 edges
8. `compilerOptions` - 20 edges
9. `@nestjs/config` - 19 edges
10. `JsonObject` - 19 edges

## Surprising Connections (you probably didn't know these)
- `Conversation` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation.entity.ts → packages/protocol/src/json-types.ts
- `Project` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/projects/project.entity.ts → packages/protocol/src/json-types.ts
- `Visitor` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/visitors/visitor.entity.ts → packages/protocol/src/json-types.ts
- `ApiExceptionInput` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (95 total, 25 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.08
Nodes (24): typeorm@^1.1.2, database, loadDataSource(), databaseEntities, DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory (+16 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "request-id.spec.ts"
Cohesion: 0.18
Nodes (9): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+1 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21, supertest@^7.0.0 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.10
Nodes (19): author, @aws-sdk/client-s3@^3.1151.0, @nestjs/swagger@^12.0.2, @nestjs/websockets@^12.1.3, sharp@^0.35.5, socket.io@^4.8.4, @sowa-chat/protocol@workspace:*, description (+11 more)

### Community 7 - "config.module.ts"
Cohesion: 0.07
Nodes (34): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, checkPrettyLogFormat(), Env (+26 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.16
Nodes (8): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, databaseUrl(), IdentityRow, VersionRow, testEnv

### Community 10 - "telemetry.interceptor.spec.ts"
Cohesion: 0.12
Nodes (8): HttpMetrics, roundSteps(), SlowOperations, readMetricLines(), zoneUrl(), TelemetryInterceptor, @nestjs/core, rxjs

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (30): dependencies, cache-manager@^7.2.9, jose@^6.2.12, @nest-lab/throttler-storage-redis@^1.2.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1 (+22 more)

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

### Community 22 - "http-error.filter.spec.ts"
Cohesion: 0.14
Nodes (14): ApiHttpModule, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter (+6 more)

### Community 23 - "worker.module.ts"
Cohesion: 0.23
Nodes (5): AuditModule, AppClsModule, AppConfigModule, DatabaseModule, TelemetryModule

### Community 24 - "audit-log.e2e-spec.ts"
Cohesion: 0.16
Nodes (5): ProjectsModule, ProjectsRepository, WorkerModule, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "zone-servers.spec.ts"
Cohesion: 0.20
Nodes (12): probeControllers, withOfflineDatabase(), offlineRedis, withOfflineRedis(), readyRedis, RedisStub, ProbeAppOptions, stubTestEnv() (+4 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.23
Nodes (9): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, waitForHttpStatus() (+1 more)

### Community 28 - ".create"
Cohesion: 0.16
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "Project"
Cohesion: 0.07
Nodes (15): Channel, channelColumns(), findColumn(), Conversation, ConversationCloseReason, ConversationStatus, columns(), expectedColumns (+7 more)

### Community 32 - "json-object-schema.ts"
Cohesion: 0.12
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, jsonObjectSchema, Violation, JsonObjectLimits, JsonValue (+1 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "redis-connection.e2e-spec.ts"
Cohesion: 0.22
Nodes (10): ioredis@^6.0.0, fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableRedisUrl(), waitForHttpStatus(), useTestRedis() (+2 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "@nestjs/common"
Cohesion: 0.27
Nodes (4): ApiModule, LogDestination, @nestjs/common, nestjs-pino

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "api.module.ts"
Cohesion: 0.19
Nodes (4): startListening(), stopListening(), ZoneServers, ZonesModule

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "zod-serialization.spec.ts"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 45 - "api-app.ts"
Cohesion: 0.60
Nodes (3): useClsMiddleware(), echoRequestId(), resolveRequestId()

### Community 46 - "visitor.entity.spec.ts"
Cohesion: 0.32
Nodes (5): columns(), expectedColumns, findColumn(), findRelation(), relations()

### Community 47 - "main.ts"
Cohesion: 0.07
Nodes (29): pino@^10.4.0, CliModule, LogLevel, DatabaseMigrationStep, createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions() (+21 more)

### Community 49 - "findFreePort"
Cohesion: 0.12
Nodes (16): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), DependencyStatusBody (+8 more)

### Community 50 - "server-errors.spec.ts"
Cohesion: 0.16
Nodes (13): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ApiExceptionInput, entries(), errorEntriesOf() (+5 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.12
Nodes (13): errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema (+5 more)

### Community 55 - "AuditLogEntry"
Cohesion: 0.15
Nodes (10): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns, createProject() (+2 more)

### Community 57 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 60 - "Controller"
Cohesion: 0.21
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 63 - "zone.ts"
Cohesion: 0.15
Nodes (17): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes (+9 more)

### Community 64 - "zod-validation.spec.ts"
Cohesion: 0.11
Nodes (7): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ProbeController, ProbeService, ZoneProbeApp

### Community 65 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 66 - "Zone"
Cohesion: 0.14
Nodes (9): BareController, MethodOnlyController, ZonedController, Zone(), zoneMetadataKey, InternalProbeController, ManagementProbeController, OperatorProbeController (+1 more)

### Community 67 - "Zone"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "api-app.ts"
Cohesion: 0.29
Nodes (8): configureApiApp(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders()

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "domain-event-bus.spec.ts"
Cohesion: 0.14
Nodes (12): DomainEventBus, happened, TestListener, DomainEventHandler, DomainEventName, OnDomainEvent(), SlowOperationsModule, DomainEvents (+4 more)

### Community 73 - "OperationSteps"
Cohesion: 0.07
Nodes (16): createTypeOrmModule(), getTypeOrmModule(), typeOrmModules, DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationStepsModule (+8 more)

### Community 74 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 76 - "NeutralProbeController"
Cohesion: 0.25
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 78 - "audit-log.listener.spec.ts"
Cohesion: 0.16
Nodes (11): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, auditedEventNames(), AuditRule, auditRules (+3 more)

### Community 80 - "health.module.ts"
Cohesion: 0.06
Nodes (17): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+9 more)

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "request-id.spec.ts"
Cohesion: 0.21
Nodes (11): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, waitForRequestEntry() (+3 more)

### Community 86 - "log-redaction.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), parseLogLine() (+2 more)

### Community 90 - "status.controller.spec.ts"
Cohesion: 0.33
Nodes (3): DependencyStatusBody, StatusBody, startRedisStubProbeApp()

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 579 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `typeorm`, `request-id.spec.ts`, `server/package.json`, `config.module.ts`, `telemetry.interceptor.spec.ts`, `dependencies`, `http-error.filter.spec.ts`, `worker.module.ts`, `audit-log.e2e-spec.ts`, `zone-servers.spec.ts`, `zone.guard.spec.ts`, `api.module.ts`, `zod-serialization.spec.ts`, `api-app.ts`, `main.ts`, `server-errors.spec.ts`, `log-redaction.spec.ts`, `AuditLogEntry`, `metrics.controller.ts`, `body-limit.spec.ts`, `Controller`, `zone.ts`, `zod-validation.spec.ts`, `Zone`, `Zone`, `api-app.ts`, `domain-event-bus.spec.ts`, `OperationSteps`, `NeutralProbeController`, `audit-log.listener.spec.ts`, `health.module.ts`, `request-id.spec.ts`, `status.controller.spec.ts`?**
  _High betweenness centrality (0.250) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.08233117483811286 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `zod-validation.spec.ts`, `zone.guard.spec.ts`, `TelemetryProbeController`, `Zone`, `ErrorProbeController`, `ServerErrorsProbeController`, `ValidationProbeController`, `telemetry.interceptor.spec.ts`, `zod-serialization.spec.ts`, `NeutralProbeController`, `health.module.ts`, `server-errors.spec.ts`, `http-error.filter.spec.ts`, `metrics.controller.ts`, `zone-servers.spec.ts`, `body-limit.spec.ts`, `Controller`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `server/package.json`, `OperationSteps`, `ref_node_path`, `visitor.entity.spec.ts`, `findFreePort`, `AuditLogEntry`, `audit-log.e2e-spec.ts`, `migrate-mode.e2e-spec.ts`, `Project`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._