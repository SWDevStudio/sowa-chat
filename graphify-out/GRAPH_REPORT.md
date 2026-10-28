# Graph Report - EPIC-15-4  (2026-10-29)

## Corpus Check
- 204 files · ~36,006 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1443 nodes · 2896 edges · 95 communities (62 shown, 33 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 53 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d30083ed`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database.module.ts
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
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
- json-object-limits.spec.ts
- audit-log.e2e-spec.ts
- scripts
- zod-validation.spec.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- cli.module.ts
- json-object-limits.spec.ts
- health.e2e-spec.ts
- ServerErrorsProbeController
- tsconfig.build.json
- zod-validation.spec.ts
- zone-servers.spec.ts
- nest-cli.json
- audit-log.listener.spec.ts
- cache-manager@^7.2.9
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- MixedZoneController
- main.ts
- zod-serialization.spec.ts
- migrate-mode.e2e-spec.ts
- server-errors.spec.ts
- log-settings.e2e-spec.ts
- JsonObjectValidator
- RedactionProbeController
- protocol/src/index.ts
- AuditLogEntry
- file-type@^22.1.1
- jose@^6.2.12
- nest-commander@^3.21.0
- body-limit.spec.ts
- Controller
- zone.guard.spec.ts
- @nestjs/platform-socket.io@^12.1.3
- zone.guard.spec.ts
- Zone
- reflect-metadata@^0.2.2
- rxjs
- api-docs.spec.ts
- ErrorProbeController
- @nestjs/common
- api-app.ts
- packages-build.e2e-spec.ts
- sharp@^0.35.5
- database.module.ts
- @types/supertest@^7.0.0
- cache-manager@^7.2.9
- TelemetryProbeController
- file-type@^22.1.1
- domain-event-bus.spec.ts
- health.module.ts
- bullmq@^6.3.15
- @nest-lab/throttler-storage-redis@^1.2.0
- @nestjs/microservices@^12.1.3
- @nestjs/throttler@^6.7.1
- @nestjs/websockets@^12.1.3
- pg
- @socket.io/redis-adapter@^8.3.0
- @sowa-chat/protocol@workspace:*
- @vitest/coverage-v8@catalog:

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 82 edges
2. `Zone()` - 46 edges
3. `findFreePort()` - 25 edges
4. `startZoneProbeApp()` - 23 edges
5. `typeorm` - 22 edges
6. `@nestjs/testing` - 20 edges
7. `compilerOptions` - 20 edges
8. `@nestjs/config` - 19 edges
9. `AuditLogEntry` - 17 edges
10. `Project` - 17 edges

## Surprising Connections (you probably didn't know these)
- `Project` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/projects/project.entity.ts → packages/protocol/src/json-types.ts
- `ApiExceptionInput` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `runApi()` --calls--> `configureApiApp()`  [EXTRACTED]
  apps/server/src/main.ts → apps/server/src/api-app.ts
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (95 total, 33 thin omitted)

### Community 0 - "database.module.ts"
Cohesion: 0.08
Nodes (24): database, loadDataSource(), databaseEntities, DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createTypeOrmModule() (+16 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
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

### Community 7 - "config.module.ts"
Cohesion: 0.06
Nodes (38): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, checkPrettyLogFormat(), Env (+30 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.09
Nodes (16): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), readServerVersion(), packageJson, builtFiles, CommandResult, entriesByPackage (+8 more)

### Community 10 - "telemetry.interceptor.spec.ts"
Cohesion: 0.22
Nodes (3): readMetricLines(), zoneUrl(), ZoneProbeApp

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

### Community 22 - "http-error.filter.spec.ts"
Cohesion: 0.16
Nodes (11): errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter, requestIdOf(), responseZodErrorOf() (+3 more)

### Community 23 - "json-object-limits.spec.ts"
Cohesion: 0.13
Nodes (14): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, fetchStatus() (+6 more)

### Community 24 - "audit-log.e2e-spec.ts"
Cohesion: 0.12
Nodes (8): @nestjs-cls/transactional-adapter-typeorm@^2.0.1, Project, ProjectsModule, ProjectsRepository, WorkerModule, ColumnRow, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "zod-validation.spec.ts"
Cohesion: 0.10
Nodes (23): DependencyStatusBody, StatusBody, probeControllers, startListening(), stopListening(), ZoneServers, ZonesModule, LogEntry (+15 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.22
Nodes (10): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, waitForHttpStatus() (+2 more)

### Community 28 - ".create"
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "cli.module.ts"
Cohesion: 0.20
Nodes (4): AuditModule, AppConfigModule, DatabaseModule, TelemetryModule

### Community 32 - "json-object-limits.spec.ts"
Cohesion: 0.09
Nodes (15): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+7 more)

### Community 34 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "zod-validation.spec.ts"
Cohesion: 0.18
Nodes (5): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ValidationProbeController

### Community 38 - "zone-servers.spec.ts"
Cohesion: 0.29
Nodes (3): AuditScenarios, happenedIn(), ScenarioError

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "audit-log.listener.spec.ts"
Cohesion: 0.16
Nodes (10): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, auditedEventNames(), AuditRule, auditRules (+2 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "MixedZoneController"
Cohesion: 0.33
Nodes (5): ApiModule, useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp()

### Community 47 - "main.ts"
Cohesion: 0.06
Nodes (31): nestjs-pino@^5.3.1, pino@^10.4.0, CliModule, DatabaseMigrationStep, createStdoutDestination(), LogDestination, baseOptions(), createLoggerModule() (+23 more)

### Community 49 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.11
Nodes (22): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), serverEnvironment() (+14 more)

### Community 50 - "server-errors.spec.ts"
Cohesion: 0.11
Nodes (19): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, internalErrorMessage, ApiExceptionInput, entries() (+11 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "JsonObjectValidator"
Cohesion: 0.30
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 53 - "RedactionProbeController"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.16
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 55 - "AuditLogEntry"
Cohesion: 0.15
Nodes (10): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns, createProject() (+2 more)

### Community 60 - "Controller"
Cohesion: 0.21
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 61 - "zone.guard.spec.ts"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 63 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (16): HealthBody, HealthEntry, ApiZone, apiZones, CapturedResponse, FakeRequest, guardedControllers, startApp() (+8 more)

### Community 64 - "Zone"
Cohesion: 0.09
Nodes (14): prom-client@^15.1.3, NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController, MethodOnlyController, Zone(), zoneMetadataKey (+6 more)

### Community 67 - "api-docs.spec.ts"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 69 - "@nestjs/common"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "api-app.ts"
Cohesion: 0.18
Nodes (14): configureApiApp(), DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, bodyLimit (+6 more)

### Community 71 - "packages-build.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 73 - "database.module.ts"
Cohesion: 0.06
Nodes (17): AppClsModule, typeOrmModules, DatabaseStepSubscriber, HttpMetrics, OperationStep, operationSteps, OperationTiming, OperationStepsModule (+9 more)

### Community 77 - "file-type@^22.1.1"
Cohesion: 0.15
Nodes (9): ApiHttpModule, entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, @nestjs/core (+1 more)

### Community 78 - "domain-event-bus.spec.ts"
Cohesion: 0.14
Nodes (13): DomainEventBus, happened, TestListener, DomainEventHandler, DomainEventName, DomainEvents, OnDomainEvent(), MetricsModule (+5 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, StatusController, DependencyStatus, ServerStatus, StatusService (+3 more)

### Community 83 - "@nest-lab/throttler-storage-redis@^1.2.0"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 86 - "@nestjs/throttler@^6.7.1"
Cohesion: 0.31
Nodes (8): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), RunningServer

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 552 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `health.module.ts` to `database.module.ts`, `log-level-warn.spec.ts`, `server/package.json`, `config.module.ts`, `telemetry.interceptor.spec.ts`, `dependencies`, `http-error.filter.spec.ts`, `json-object-limits.spec.ts`, `audit-log.e2e-spec.ts`, `zod-validation.spec.ts`, `cli.module.ts`, `zod-validation.spec.ts`, `audit-log.listener.spec.ts`, `MixedZoneController`, `main.ts`, `server-errors.spec.ts`, `RedactionProbeController`, `AuditLogEntry`, `body-limit.spec.ts`, `Controller`, `zone.guard.spec.ts`, `Zone`, `api-docs.spec.ts`, `api-app.ts`, `database.module.ts`, `file-type@^22.1.1`, `domain-event-bus.spec.ts`?**
  _High betweenness centrality (0.252) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08067375886524823 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `api-docs.spec.ts`, `ErrorProbeController`, `ServerErrorsProbeController`, `zod-validation.spec.ts`, `telemetry.interceptor.spec.ts`, `zod-serialization.spec.ts`, `file-type@^22.1.1`, `health.module.ts`, `zod-serialization.spec.ts`, `server-errors.spec.ts`, `http-error.filter.spec.ts`, `pg`, `zod-validation.spec.ts`, `body-limit.spec.ts`, `Controller`, `zone.guard.spec.ts`, `zone.guard.spec.ts`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `database.module.ts` to `server/package.json`, `database.module.ts`, `ref_node_path`, `dependencies`, `migrate-mode.e2e-spec.ts`, `AuditLogEntry`, `audit-log.e2e-spec.ts`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Should `log-level-warn.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._