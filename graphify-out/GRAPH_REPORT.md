# Graph Report - EPIC-15-5  (2026-10-28)

## Corpus Check
- 201 files · ~35,385 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1421 nodes · 2829 edges · 107 communities (71 shown, 36 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 51 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9c000026`
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
- config-startup.e2e-spec.ts
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
- redis-connection.e2e-spec.ts
- audit-log.listener.spec.ts
- scripts
- zone-servers.spec.ts
- logging.e2e-spec.ts
- log-redaction.e2e-spec.ts
- provided-context.d.ts
- request-id.e2e-spec.ts
- server-protocol.e2e-spec.ts
- json-object-schema.ts
- @nestjs/common
- findFreePort
- ServerErrorsProbeController
- tsconfig.build.json
- @nestjs/common
- DomainEventBus
- nest-cli.json
- .create
- body-limit.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- health.e2e-spec.ts
- ValidationProbeController
- main.ts
- ZonedController
- migrate-mode.e2e-spec.ts
- server-errors.spec.ts
- log-settings.e2e-spec.ts
- JsonObjectValidator
- log-redaction.spec.ts
- protocol/src/index.ts
- audit-log.e2e-spec.ts
- json-object-limits.spec.ts
- packages-build.e2e-spec.ts
- database.module.ts
- zone-servers.ts
- Controller
- MixedZoneController
- ZoneServers
- zone.guard.spec.ts
- InternalProbeController
- bullmq@^6.3.15
- NeutralProbeController
- Zone
- ErrorProbeController
- config-startup.e2e-spec.ts
- zone.ts
- server-protocol.e2e-spec.ts
- http-error.filter.ts
- operation-steps.spec.ts
- global-setup.ts
- @nestjs/bullmq@^12.0.0
- @nestjs/throttler@^6.7.1
- zod-serialization.spec.ts
- worker.module.ts
- api-docs.spec.ts
- health.module.ts
- packages-build.e2e-spec.ts
- file-type@^22.1.1
- workspace-check-types.e2e-spec.ts
- @nestjs/cache-manager@^12.0.1
- @nestjs/websockets@^12.1.3
- log-redaction.e2e-spec.ts
- @nestjs/microservices@^12.1.3
- status.controller.spec.ts
- TelemetryProbeController
- database-migrations.spec.ts
- @aws-sdk/client-s3@^3.1151.0
- @nest-lab/throttler-storage-redis@^1.2.0
- pg
- pino-http
- @socket.io/redis-adapter@^8.3.0
- @sowa-chat/protocol@workspace:*
- dependency-cruiser@^18.6.0
- @types/node@^24.0.0
- @vitest/coverage-v8@catalog:

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 79 edges
2. `Zone()` - 46 edges
3. `findFreePort()` - 25 edges
4. `startZoneProbeApp()` - 23 edges
5. `typeorm` - 22 edges
6. `@nestjs/testing` - 20 edges
7. `compilerOptions` - 20 edges
8. `@nestjs/config` - 18 edges
9. `AuditLogEntry` - 17 edges
10. `Project` - 17 edges

## Surprising Connections (you probably didn't know these)
- `Project` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/projects/project.entity.ts → packages/protocol/src/json-types.ts
- `ApiExceptionInput` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (107 total, 36 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.14
Nodes (13): typeorm@^1.1.2, database, loadDataSource(), DatabaseMigration, databaseMigrations, createDataSourceOptions(), DatabaseConnection, DatabaseEntity (+5 more)

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
Nodes (29): devDependencies, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21, supertest@^7.0.0 (+21 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.12
Nodes (15): author, helmet@^8.3.0, nest-commander@^3.21.0, reflect-metadata@^0.2.2, sharp@^0.35.5, description, license, name (+7 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (33): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, checkPrettyLogFormat(), Env (+25 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.16
Nodes (8): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, databaseUrl(), IdentityRow, VersionRow, testEnv

### Community 10 - "config-startup.e2e-spec.ts"
Cohesion: 0.12
Nodes (9): ApiZone, HttpLabel, HttpMetrics, HttpRequestRecord, labelNames, readMetricLines(), zoneUrl(), TelemetryInterceptor (+1 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, cache-manager@^7.2.9, file-type@^22.1.1, jose@^6.2.12, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1 (+18 more)

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
Cohesion: 0.21
Nodes (9): errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse(), validationErrorResponse(), knownKeys, ProbeBodyDto (+1 more)

### Community 23 - "redis-connection.e2e-spec.ts"
Cohesion: 0.15
Nodes (14): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), fetchStatus(), repositoryRoot (+6 more)

### Community 24 - "audit-log.listener.spec.ts"
Cohesion: 0.12
Nodes (7): Project, ProjectsModule, ProjectsRepository, WorkerModule, ColumnRow, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "zone-servers.spec.ts"
Cohesion: 0.13
Nodes (20): HealthBody, HealthEntry, LogDestination, findZonePorts(), probeControllers, withOfflineDatabase(), offlineRedis, withOfflineRedis() (+12 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.22
Nodes (10): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, waitForHttpStatus() (+2 more)

### Community 28 - "log-redaction.e2e-spec.ts"
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "server-protocol.e2e-spec.ts"
Cohesion: 0.17
Nodes (8): databaseEntities, AuditModule, AppClsModule, AppConfigModule, DatabaseModule, ApiHttpModule, RedisModule, TelemetryModule

### Community 32 - "json-object-schema.ts"
Cohesion: 0.12
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, jsonObjectSchema, Violation, JsonObjectLimits, JsonValue (+1 more)

### Community 33 - "@nestjs/common"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 34 - "findFreePort"
Cohesion: 0.13
Nodes (14): fetchStatus(), repositoryRoot, RunResult, waitForHttpStatus(), DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment() (+6 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "@nestjs/common"
Cohesion: 0.10
Nodes (11): probeControllers, noStore(), probeControllers, useSecurityHeaders(), calls, ProbeBodyDto, ProbeCall, ProbeQueryDto (+3 more)

### Community 38 - "DomainEventBus"
Cohesion: 0.18
Nodes (4): DomainEventBus, AuditScenarios, happenedIn(), ScenarioError

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - ".create"
Cohesion: 0.19
Nodes (9): AuditLogListener, eventValues, happened, personalValues, auditedEventNames(), AuditRule, auditRules, auditedEvents (+1 more)

### Community 41 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "health.e2e-spec.ts"
Cohesion: 0.31
Nodes (6): ApiModule, useClsMiddleware(), echoRequestId(), resolveRequestId(), beginOperation(), createE2eApp()

### Community 47 - "main.ts"
Cohesion: 0.07
Nodes (29): pino@^10.4.0, configureApiApp(), CliModule, DatabaseMigrationStep, createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions() (+21 more)

### Community 49 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.16
Nodes (14): serverEnvironment(), unreachableDatabaseUrl(), serverEnvironment(), BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot (+6 more)

### Community 50 - "server-errors.spec.ts"
Cohesion: 0.12
Nodes (18): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ApiExceptionInput, entries(), errorEntriesOf() (+10 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.23
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 55 - "audit-log.e2e-spec.ts"
Cohesion: 0.11
Nodes (13): ActorKind, actorKinds, AuditLogEntry, AuditLogRepository, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns (+5 more)

### Community 56 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 58 - "database.module.ts"
Cohesion: 0.22
Nodes (6): createTypeOrmModule(), getTypeOrmModule(), typeOrmModules, OperationStepsModule, nestjs-cls, @nestjs/typeorm

### Community 60 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 61 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 62 - "ZoneServers"
Cohesion: 0.17
Nodes (4): startListening(), stopListening(), ZoneServers, ZonesModule

### Community 63 - "zone.guard.spec.ts"
Cohesion: 0.18
Nodes (5): CapturedResponse, FakeRequest, guardedControllers, startApp(), unitPorts

### Community 64 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 66 - "NeutralProbeController"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 67 - "Zone"
Cohesion: 0.15
Nodes (11): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+3 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "zone.ts"
Cohesion: 0.21
Nodes (11): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, apiZones, ZoneGuard (+3 more)

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "http-error.filter.ts"
Cohesion: 0.31
Nodes (5): HttpErrorFilter, requestIdOf(), responseZodErrorOf(), @nestjs/core, nestjs-zod

### Community 73 - "operation-steps.spec.ts"
Cohesion: 0.14
Nodes (7): DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, StepTimes, OperationSteps, operationTimingKey

### Community 74 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 77 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 78 - "worker.module.ts"
Cohesion: 0.21
Nodes (11): happened, TestListener, DomainEventHandler, DomainEventName, DomainEvents, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js (+3 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 81 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 86 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 88 - "status.controller.spec.ts"
Cohesion: 0.33
Nodes (3): DependencyStatusBody, StatusBody, redisUrl()

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 547 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **36 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `request-id.spec.ts`, `server/package.json`, `env.schema.ts`, `config-startup.e2e-spec.ts`, `dependencies`, `http-error.filter.spec.ts`, `redis-connection.e2e-spec.ts`, `audit-log.listener.spec.ts`, `zone-servers.spec.ts`, `server-protocol.e2e-spec.ts`, `@nestjs/common`, `.create`, `body-limit.ts`, `health.e2e-spec.ts`, `main.ts`, `server-errors.spec.ts`, `log-redaction.spec.ts`, `audit-log.e2e-spec.ts`, `database.module.ts`, `ZoneServers`, `zone.guard.spec.ts`, `Zone`, `zone.ts`, `http-error.filter.ts`, `operation-steps.spec.ts`, `zod-serialization.spec.ts`, `worker.module.ts`, `health.module.ts`, `status.controller.spec.ts`?**
  _High betweenness centrality (0.244) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.13538461538461538 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `config-startup.e2e-spec.ts`, `http-error.filter.spec.ts`, `zone-servers.spec.ts`, `@nestjs/common`, `ServerErrorsProbeController`, `@nestjs/common`, `ResponseProbeController`, `ValidationProbeController`, `ZonedController`, `server-errors.spec.ts`, `zone-servers.ts`, `Controller`, `MixedZoneController`, `zone.guard.spec.ts`, `InternalProbeController`, `NeutralProbeController`, `ErrorProbeController`, `zod-serialization.spec.ts`, `health.module.ts`, `TelemetryProbeController`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `findFreePort`, `server/package.json`, `operation-steps.spec.ts`, `ref_node_path`, `migrate-mode.e2e-spec.ts`, `audit-log.e2e-spec.ts`, `audit-log.listener.spec.ts`, `database.module.ts`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `request-id.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._