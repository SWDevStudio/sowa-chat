# Graph Report - EPIC-15-3  (2026-10-28)

## Corpus Check
- 198 files · ~34,888 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1411 nodes · 2794 edges · 87 communities (61 shown, 26 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3332747c`
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
- ref_node_fs
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
- security-headers.spec.ts
- audit-log.e2e-spec.ts
- scripts
- json-object-schema.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- e2e-server.ts
- @nestjs/common
- .create
- metrics.controller.ts
- findFreePort
- ServerErrorsProbeController
- tsconfig.build.json
- api.module.ts
- nest-cli.json
- audit-log.listener.spec.ts
- api-app.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- cls-middleware.ts
- ValidationProbeController
- main.ts
- audit-log.e2e-spec.ts
- AuditLogEntry
- server-errors.spec.ts
- log-settings.e2e-spec.ts
- JsonObjectValidator
- log-redaction.spec.ts
- protocol/src/index.ts
- AuditLogEntry
- json-object-limits.spec.ts
- OperationStepsProbeController
- Controller
- BodyProbeController
- helmet
- MixedZoneController
- file-type@^22.1.1
- helmet
- InternalProbeController
- bullmq@^6.3.15
- api-app.ts
- api-docs.spec.ts
- ErrorProbeController
- zone.guard.spec.ts
- log-destination.spec.ts
- @nestjs/swagger
- zod-validation.spec.ts
- domain-event-bus.spec.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- health.module.ts
- cache-manager@^7.2.9
- @nestjs/cache-manager@^12.0.1
- @nest-lab/throttler-storage-redis@^1.2.0
- @nestjs/microservices@^12.1.3
- zod@catalog:

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 78 edges
2. `Zone()` - 46 edges
3. `findFreePort()` - 25 edges
4. `startZoneProbeApp()` - 23 edges
5. `compilerOptions` - 20 edges
6. `typeorm` - 19 edges
7. `@nestjs/config` - 18 edges
8. `@nestjs/testing` - 18 edges
9. `AuditLogEntry` - 17 edges
10. `Project` - 17 edges

## Surprising Connections (you probably didn't know these)
- `ApiExceptionInput` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `runApi()` --calls--> `configureApiApp()`  [EXTRACTED]
  apps/server/src/main.ts → apps/server/src/api-app.ts
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (87 total, 26 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.08
Nodes (22): database, loadDataSource(), DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createTypeOrmModule(), getTypeOrmModule() (+14 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "request-id.spec.ts"
Cohesion: 0.17
Nodes (10): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+2 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.10
Nodes (19): author, @aws-sdk/client-s3@^3.1151.0, cache-manager@^7.2.9, jose@^6.2.12, socket.io@^4.8.4, @sowa-chat/protocol@workspace:*, description, @types/supertest@^7.0.0 (+11 more)

### Community 7 - "config.module.ts"
Cohesion: 0.06
Nodes (41): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, checkPrettyLogFormat(), Env (+33 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_fs"
Cohesion: 0.05
Nodes (33): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, Env, isConfigVariable(), repositoryRoot, RunResult (+25 more)

### Community 10 - "telemetry.interceptor.spec.ts"
Cohesion: 0.10
Nodes (10): rxjs@^7.8.1, HttpLabel, HttpMetrics, HttpRequestRecord, labelNames, readMetricLines(), TelemetryProbeController, zoneUrl() (+2 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (30): dependencies, nest-commander@^3.21.0, @nest-lab/throttler-storage-redis@^1.2.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1 (+22 more)

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

### Community 23 - "security-headers.spec.ts"
Cohesion: 0.17
Nodes (9): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse, ProbeService (+1 more)

### Community 24 - "audit-log.e2e-spec.ts"
Cohesion: 0.13
Nodes (6): ProjectsModule, ProjectsRepository, WorkerModule, testAuditRules, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "json-object-schema.ts"
Cohesion: 0.12
Nodes (13): HealthBody, HealthEntry, DependencyStatusBody, StatusBody, findZonePorts(), probeControllers, withOfflineDatabase(), offlineRedis (+5 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.16
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "e2e-server.ts"
Cohesion: 0.09
Nodes (25): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), entriesForPath() (+17 more)

### Community 31 - "@nestjs/common"
Cohesion: 0.21
Nodes (8): databaseEntities, AuditModule, AppClsModule, AppConfigModule, DatabaseModule, ZonesModule, TelemetryModule, @nestjs/common

### Community 32 - ".create"
Cohesion: 0.12
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, jsonObjectSchema, Violation, JsonObjectLimits, JsonValue (+1 more)

### Community 33 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 34 - "findFreePort"
Cohesion: 0.10
Nodes (22): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), DependencyStatusBody, fetchStatus() (+14 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "api.module.ts"
Cohesion: 0.21
Nodes (9): LogDestination, createRedactionProbeApp(), createRequestIdProbeApp(), createProbeApp(), ProbeAppOptions, redirectLogsTo(), stubTestEnv(), testEnv (+1 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "audit-log.listener.spec.ts"
Cohesion: 0.16
Nodes (7): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, auditRules, auditedEvents

### Community 41 - "api-app.ts"
Cohesion: 0.25
Nodes (10): configureApiApp(), setupApiDocs(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore() (+2 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "ResponseProbeController"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 45 - "cls-middleware.ts"
Cohesion: 0.31
Nodes (6): ApiModule, useClsMiddleware(), echoRequestId(), resolveRequestId(), beginOperation(), createE2eApp()

### Community 46 - "ValidationProbeController"
Cohesion: 0.13
Nodes (5): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ValidationProbeController

### Community 47 - "main.ts"
Cohesion: 0.07
Nodes (21): CliModule, DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, startListening(), stopListening(), ZoneServers (+13 more)

### Community 48 - "audit-log.e2e-spec.ts"
Cohesion: 0.29
Nodes (4): BareController, MethodOnlyController, ZonedController, Zone()

### Community 49 - "AuditLogEntry"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 50 - "server-errors.spec.ts"
Cohesion: 0.16
Nodes (13): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ApiExceptionInput, entries(), errorEntriesOf() (+5 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.12
Nodes (13): errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema (+5 more)

### Community 55 - "AuditLogEntry"
Cohesion: 0.11
Nodes (14): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, Project, ColumnRow, expectedColumns (+6 more)

### Community 56 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 58 - "Controller"
Cohesion: 0.22
Nodes (9): allOutput(), CapturedLogs, fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields, secretValueOf() (+1 more)

### Community 60 - "helmet"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 61 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 64 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 66 - "api-app.ts"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 67 - "api-docs.spec.ts"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 70 - "zone.guard.spec.ts"
Cohesion: 0.08
Nodes (23): @nestjs/core@^12.0.1, probeControllers, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), zonePathPrefixes, probeControllers (+15 more)

### Community 73 - "log-destination.spec.ts"
Cohesion: 0.18
Nodes (8): OperationStep, operationSteps, OperationTiming, StepTimes, OperationStepsModule, OperationSteps, operationTimingKey, nestjs-cls

### Community 78 - "domain-event-bus.spec.ts"
Cohesion: 0.15
Nodes (14): auditedEventNames(), AuditRule, DomainEventBus, happened, TestListener, DomainEventHandler, DomainEventName, DomainEvents (+6 more)

### Community 80 - "health.module.ts"
Cohesion: 0.06
Nodes (19): ioredis@^6.0.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+11 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 543 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `typeorm`, `request-id.spec.ts`, `server/package.json`, `config.module.ts`, `telemetry.interceptor.spec.ts`, `dependencies`, `http-error.filter.spec.ts`, `security-headers.spec.ts`, `audit-log.e2e-spec.ts`, `json-object-schema.ts`, `metrics.controller.ts`, `body-limit.spec.ts`, `api.module.ts`, `audit-log.listener.spec.ts`, `api-app.ts`, `ResponseProbeController`, `cls-middleware.ts`, `ValidationProbeController`, `main.ts`, `audit-log.e2e-spec.ts`, `server-errors.spec.ts`, `AuditLogEntry`, `Controller`, `api-docs.spec.ts`, `zone.guard.spec.ts`, `log-destination.spec.ts`, `domain-event-bus.spec.ts`, `health.module.ts`?**
  _High betweenness centrality (0.239) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.08416389811738649 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `audit-log.e2e-spec.ts` to `InternalProbeController`, `metrics.controller.ts`, `api-app.ts`, `api-docs.spec.ts`, `ErrorProbeController`, `body-limit.spec.ts`, `zone.guard.spec.ts`, `ServerErrorsProbeController`, `telemetry.interceptor.spec.ts`, `ResponseProbeController`, `ValidationProbeController`, `health.module.ts`, `server-errors.spec.ts`, `http-error.filter.spec.ts`, `json-object-schema.ts`, `BodyProbeController`, `helmet`, `MixedZoneController`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `json-object-schema.ts` to `findFreePort`, `devDependencies`, `server/package.json`, `config.module.ts`, `audit-log.listener.spec.ts`, `log-destination.spec.ts`, `api.module.ts`, `cls-middleware.ts`, `domain-event-bus.spec.ts`, `AuditLogEntry`, `audit-log.e2e-spec.ts`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._