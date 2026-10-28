# Graph Report - EPIC-9-3  (2026-10-28)

## Corpus Check
- 189 files · ~33,434 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1358 nodes · 2670 edges · 100 communities (66 shown, 34 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 47 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `32a710c4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database.module.ts
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
- json-object-schema.ts
- api.module.ts
- scripts
- config.module.ts
- logging.e2e-spec.ts
- log-redaction.e2e-spec.ts
- provided-context.d.ts
- request-id.e2e-spec.ts
- server-protocol.e2e-spec.ts
- .create
- metrics.controller.ts
- findFreePort
- ServerErrorsProbeController
- tsconfig.build.json
- startZoneProbeApp
- zone-servers.spec.ts
- nest-cli.json
- body-limit.ts
- workspace-check-types.e2e-spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- health.e2e-spec.ts
- ValidationProbeController
- main.ts
- audit-log.e2e-spec.ts
- AuditLogEntry
- server-errors.spec.ts
- log-settings.e2e-spec.ts
- MixedZoneController
- log-redaction.spec.ts
- protocol/src/index.ts
- ref_vitest
- json-object-limits.spec.ts
- packages-build.e2e-spec.ts
- findFreePort
- audit-rule.ts
- Controller
- zone.guard.spec.ts
- JsonObjectValidator
- ZoneServers
- InternalProbeController
- zone.decorator.spec.ts
- api-versioning.spec.ts
- api-docs.spec.ts
- ErrorProbeController
- zod-serialization.spec.ts
- zone.decorator.ts
- jose@^6.2.12
- status.controller.spec.ts
- createProbeApp
- BodyProbeController
- health.controller.spec.ts
- nest-commander@^3.21.0
- cache-manager@^7.2.9
- domain-event-bus.spec.ts
- file-type@^22.1.1
- health.module.ts
- @nestjs/bullmq@^12.0.0
- @nestjs/platform-socket.io@^12.1.3
- @nestjs/swagger
- @nestjs/throttler@^6.7.1
- @nestjs/websockets@^12.1.3
- rxjs@^7.8.1
- @nestjs/microservices@^12.1.3
- reflect-metadata@^0.2.2
- sharp@^0.35.5
- @socket.io/redis-adapter@^8.3.0
- @sowa-chat/protocol@workspace:*
- @types/supertest@^7.0.0
- @vitest/coverage-v8@catalog:

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 72 edges
2. `Zone()` - 44 edges
3. `findFreePort()` - 25 edges
4. `startZoneProbeApp()` - 22 edges
5. `compilerOptions` - 20 edges
6. `typeorm` - 19 edges
7. `@nestjs/testing` - 17 edges
8. `AuditLogEntry` - 17 edges
9. `Project` - 17 edges
10. `scripts` - 16 edges

## Surprising Connections (you probably didn't know these)
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts
- `AuditRecord` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-rule.ts → packages/protocol/src/json-types.ts
- `ApiExceptionInput` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (100 total, 34 thin omitted)

### Community 0 - "database.module.ts"
Cohesion: 0.08
Nodes (23): database, loadDataSource(), DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createTypeOrmModule(), getTypeOrmModule() (+15 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "request-id.spec.ts"
Cohesion: 0.09
Nodes (18): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse, ProbeService (+10 more)

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
Nodes (19): checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange(), logFormats (+11 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.14
Nodes (10): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, databaseUrl(), IdentityRow, VersionRow, useTestRedis() (+2 more)

### Community 10 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @aws-sdk/s3-request-presigner@^3.1151.0, bullmq@^6.3.15, helmet@^8.3.0, @nest-lab/throttler-storage-redis@^1.2.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1 (+18 more)

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
Cohesion: 0.15
Nodes (13): nestjs-zod@^5.5.0, errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter, requestIdOf() (+5 more)

### Community 23 - "json-object-schema.ts"
Cohesion: 0.17
Nodes (8): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, Violation, JsonObjectLimits, JsonValue, encoder

### Community 24 - "api.module.ts"
Cohesion: 0.13
Nodes (12): databaseEntities, AppClsModule, AppConfigModule, DatabaseModule, typeOrmModules, ApiHttpModule, RedisModule, ZonesModule (+4 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "config.module.ts"
Cohesion: 0.16
Nodes (19): ioredis@^6.0.0, appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig (+11 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.22
Nodes (10): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, waitForHttpStatus() (+2 more)

### Community 28 - "log-redaction.e2e-spec.ts"
Cohesion: 0.31
Nodes (8): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), RunningServer

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 32 - ".create"
Cohesion: 0.16
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 33 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 34 - "findFreePort"
Cohesion: 0.17
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, withClient() (+3 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "startZoneProbeApp"
Cohesion: 0.11
Nodes (8): probeControllers, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, startApp(), startZoneProbeApp(), ZoneProbeApp

### Community 38 - "zone-servers.spec.ts"
Cohesion: 0.20
Nodes (12): probeControllers, withOfflineDatabase(), offlineRedis, withOfflineRedis(), readyRedis, RedisStub, startRedisStubProbeApp(), ProbeAppOptions (+4 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "body-limit.ts"
Cohesion: 0.29
Nodes (7): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders()

### Community 41 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 47 - "main.ts"
Cohesion: 0.06
Nodes (30): pino@^10.4.0, configureApiApp(), ApiModule, CliModule, DatabaseMigrationStep, createStdoutDestination(), baseOptions(), createLoggerModule() (+22 more)

### Community 48 - "audit-log.e2e-spec.ts"
Cohesion: 0.10
Nodes (9): Project, ProjectsModule, ProjectsRepository, WorkerModule, ColumnRow, createProject(), ProjectFixture, JsonObject (+1 more)

### Community 49 - "AuditLogEntry"
Cohesion: 0.14
Nodes (7): ActorKind, actorKinds, AuditLogEntry, AuditLogRepository, NewAuditLogEntry, ColumnRow, expectedColumns

### Community 50 - "server-errors.spec.ts"
Cohesion: 0.11
Nodes (19): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, internalErrorMessage, ApiExceptionInput, entries() (+11 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (11): allOutput(), CapturedLogs, fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields, RedactionProbeController (+3 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.23
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 56 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 57 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 58 - "findFreePort"
Cohesion: 0.14
Nodes (16): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), serverEnvironment() (+8 more)

### Community 59 - "audit-rule.ts"
Cohesion: 0.13
Nodes (15): AuditLogListener, eventValues, happened, personalValues, AuditModule, auditedEventNames(), AuditRecord, AuditRule (+7 more)

### Community 60 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 61 - "zone.guard.spec.ts"
Cohesion: 0.17
Nodes (6): @nestjs/core@^12.0.1, CapturedResponse, FakeRequest, guardedControllers, unitPorts, @nestjs/core

### Community 63 - "ZoneServers"
Cohesion: 0.22
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 64 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 65 - "zone.decorator.spec.ts"
Cohesion: 0.27
Nodes (3): BareController, MethodOnlyController, ZonedController

### Community 66 - "api-versioning.spec.ts"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 67 - "api-docs.spec.ts"
Cohesion: 0.18
Nodes (10): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+2 more)

### Community 69 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 70 - "zone.decorator.ts"
Cohesion: 0.17
Nodes (14): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, probeControllers, ApiZone (+6 more)

### Community 73 - "createProbeApp"
Cohesion: 0.18
Nodes (10): useClsMiddleware(), LogDestination, createRedactionProbeApp(), echoRequestId(), resolveRequestId(), createRequestIdProbeApp(), createE2eApp(), createProbeApp() (+2 more)

### Community 78 - "domain-event-bus.spec.ts"
Cohesion: 0.16
Nodes (12): DomainEventBus, happened, TestListener, DomainEventHandler, DomainEventName, DomainEvents, OnDomainEvent(), DomainEvents (+4 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 526 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **34 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `api.module.ts` to `request-id.spec.ts`, `server/package.json`, `dependencies`, `http-error.filter.spec.ts`, `config.module.ts`, `metrics.controller.ts`, `startZoneProbeApp`, `zone-servers.spec.ts`, `body-limit.ts`, `main.ts`, `audit-log.e2e-spec.ts`, `AuditLogEntry`, `server-errors.spec.ts`, `log-redaction.spec.ts`, `audit-rule.ts`, `zone.guard.spec.ts`, `ZoneServers`, `zone.decorator.spec.ts`, `api-docs.spec.ts`, `zod-serialization.spec.ts`, `zone.decorator.ts`, `status.controller.spec.ts`, `createProbeApp`, `health.controller.spec.ts`, `domain-event-bus.spec.ts`, `health.module.ts`?**
  _High betweenness centrality (0.236) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08383838383838384 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `api-docs.spec.ts` to `http-error.filter.spec.ts`, `metrics.controller.ts`, `ServerErrorsProbeController`, `startZoneProbeApp`, `zone-servers.spec.ts`, `zod-serialization.spec.ts`, `ValidationProbeController`, `server-errors.spec.ts`, `MixedZoneController`, `Controller`, `zone.guard.spec.ts`, `InternalProbeController`, `zone.decorator.spec.ts`, `api-versioning.spec.ts`, `ErrorProbeController`, `zod-serialization.spec.ts`, `zone.decorator.ts`, `BodyProbeController`, `health.module.ts`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `ValidationProbeController` connect `ValidationProbeController` to `api-docs.spec.ts`, `startZoneProbeApp`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Should `request-id.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08708708708708708 - nodes in this community are weakly interconnected._