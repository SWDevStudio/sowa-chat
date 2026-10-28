# Graph Report - EPIC-8-3  (2026-10-28)

## Corpus Check
- 165 files · ~29,058 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1242 nodes · 2364 edges · 104 communities (65 shown, 39 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 37 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6693e8c2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- typeorm
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- server/package.json
- server-modes.e2e-spec.ts
- server/package.json
- env.schema.ts
- compilerOptions
- postgres-container.e2e-spec.ts
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
- startZoneProbeApp
- audit-log-table.e2e-spec.ts
- scripts
- json-object-schema.ts
- logging.e2e-spec.ts
- log-redaction.e2e-spec.ts
- provided-context.d.ts
- request-id.e2e-spec.ts
- server-protocol.e2e-spec.ts
- .create
- database-connection.e2e-spec.ts
- migrate-mode.e2e-spec.ts
- ServerErrorsProbeController
- tsconfig.build.json
- @nestjs/common
- zone-servers.spec.ts
- nest-cli.json
- api-app.ts
- workspace-check-types.e2e-spec.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- log-redaction.spec.ts
- ValidationProbeController
- main.ts
- audit-log.e2e-spec.ts
- AuditLogEntry
- server-errors.spec.ts
- log-settings.e2e-spec.ts
- ref_vitest
- log-redaction.spec.ts
- protocol/src/index.ts
- AuditScenarios
- JsonObjectValidator
- packages-build.e2e-spec.ts
- createProbeApp
- AuditLogRepository
- Controller
- @nestjs/common
- MixedZoneController
- zone-servers.ts
- InternalProbeController
- process-env.spec.ts
- NeutralProbeController
- ErrorProbeController
- api-docs.spec.ts
- api-docs.ts
- request-id.spec.ts
- ZonedController
- cls-middleware.ts
- BodyProbeController
- ProbeController
- @aws-sdk/client-s3@^3.1151.0
- api.module.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- ioredis@^6.0.0
- @nestjs/platform-socket.io@^12.1.3
- cache-manager@^7.2.9
- rxjs@^7.8.1
- @nestjs/cache-manager@^12.0.1
- @nest-lab/throttler-storage-redis@^1.2.0
- @nestjs/bullmq@^12.0.0
- @nestjs/microservices@^12.1.3
- @nestjs/terminus@^12.1.0
- @nestjs/throttler@^6.7.1
- pg
- sharp@^0.35.5
- socket.io@^4.8.4
- @socket.io/redis-adapter@^8.3.0
- @nestjs/cli@^12.0.0
- vite@catalog:
- json-object-limits.spec.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 58 edges
2. `Zone()` - 38 edges
3. `compilerOptions` - 20 edges
4. `typeorm` - 19 edges
5. `startZoneProbeApp()` - 18 edges
6. `AuditLogEntry` - 17 edges
7. `Project` - 17 edges
8. `findFreePort()` - 17 edges
9. `scripts` - 16 edges
10. `@nestjs/config` - 15 edges

## Surprising Connections (you probably didn't know these)
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `Project` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/projects/project.entity.ts → packages/protocol/src/json-types.ts
- `ApiExceptionInput` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `runApi()` --calls--> `configureApiApp()`  [EXTRACTED]
  apps/server/src/main.ts → apps/server/src/api-app.ts
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (104 total, 39 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.12
Nodes (13): database, loadDataSource(), DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, DatabaseConnection, DatabaseEntity (+5 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.27
Nodes (10): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+2 more)

### Community 4 - "server/package.json"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21, supertest@^7.0.0 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.11
Nodes (17): author, bullmq@^6.3.15, helmet@^8.3.0, @nestjs/websockets@^12.1.3, prom-client@^15.1.3, @sowa-chat/protocol@workspace:*, description, license (+9 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (31): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, checkPrettyLogFormat(), Env (+23 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "postgres-container.e2e-spec.ts"
Cohesion: 0.20
Nodes (4): packageJson, IdentityRow, VersionRow, testEnv

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
Nodes (25): dependencies, file-type@^22.1.1, jose@^6.2.12, nest-commander@^3.21.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1 (+17 more)

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

### Community 23 - "startZoneProbeApp"
Cohesion: 0.13
Nodes (7): probeControllers, probeControllers, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ZoneProbeApp

### Community 24 - "audit-log-table.e2e-spec.ts"
Cohesion: 0.24
Nodes (8): actorKinds, createDataSourceOptions(), ColumnRow, expectedColumns, createProject(), ProjectFixture, truncateAllTables(), useTestDatabase()

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "json-object-schema.ts"
Cohesion: 0.17
Nodes (8): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, Violation, JsonObjectLimits, JsonValue, encoder

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.22
Nodes (10): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, waitForHttpStatus() (+2 more)

### Community 28 - "log-redaction.e2e-spec.ts"
Cohesion: 0.31
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+3 more)

### Community 31 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 32 - ".create"
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 33 - "database-connection.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), serverEnvironment() (+2 more)

### Community 34 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, withClient() (+2 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "@nestjs/common"
Cohesion: 0.29
Nodes (3): zoneMetadataKey, @nestjs/common, @nestjs/core

### Community 38 - "zone-servers.spec.ts"
Cohesion: 0.24
Nodes (8): probeControllers, withOfflineDatabase(), ProbeAppOptions, stubTestEnv(), testEnv, startZoneProbeApp(), @nestjs/testing, @nestjs/typeorm

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "api-app.ts"
Cohesion: 0.18
Nodes (11): @nestjs/platform-express@^12.0.1, configureApiApp(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore() (+3 more)

### Community 41 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "ResponseProbeController"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 45 - "log-redaction.spec.ts"
Cohesion: 0.22
Nodes (9): allOutput(), CapturedLogs, fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields, secretValueOf() (+1 more)

### Community 47 - "main.ts"
Cohesion: 0.08
Nodes (21): CliModule, DatabaseMigrationStep, runDatabaseMigrations(), PreparationRunner, PreparationStep, preparationSteps, createContext(), mode (+13 more)

### Community 48 - "audit-log.e2e-spec.ts"
Cohesion: 0.11
Nodes (8): @nestjs-cls/transactional-adapter-typeorm@^2.0.1, Project, ProjectsModule, ProjectsRepository, WorkerModule, ColumnRow, testAuditRules, @nestjs-cls/transactional-adapter-typeorm

### Community 49 - "AuditLogEntry"
Cohesion: 0.21
Nodes (5): ActorKind, AuditLogEntry, NewAuditLogEntry, AuditRecord, JsonObject

### Community 50 - "server-errors.spec.ts"
Cohesion: 0.12
Nodes (18): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ApiExceptionInput, entries(), errorEntriesOf() (+10 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.19
Nodes (13): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+5 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.23
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 55 - "AuditScenarios"
Cohesion: 0.29
Nodes (3): AuditScenarios, happenedIn(), ScenarioError

### Community 57 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 58 - "createProbeApp"
Cohesion: 0.25
Nodes (5): LogDestination, createRedactionProbeApp(), createRequestIdProbeApp(), createProbeApp(), redirectLogsTo()

### Community 60 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 61 - "@nestjs/common"
Cohesion: 0.18
Nodes (5): CapturedResponse, FakeRequest, guardedControllers, startApp(), unitPorts

### Community 62 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 63 - "zone-servers.ts"
Cohesion: 0.19
Nodes (8): ApiZone, apiZones, ports, startListening(), stopListening(), ZoneServers, ZonePorts, ZonesModule

### Community 64 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 65 - "process-env.spec.ts"
Cohesion: 0.67
Nodes (3): filesReadingProcessEnv(), sourceDirectory, sourceFiles()

### Community 66 - "NeutralProbeController"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 69 - "api-docs.spec.ts"
Cohesion: 0.19
Nodes (11): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+3 more)

### Community 70 - "api-docs.ts"
Cohesion: 0.39
Nodes (7): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, zoneOfPort()

### Community 71 - "request-id.spec.ts"
Cohesion: 0.24
Nodes (8): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, ProbeService, waitForRequestEntry()

### Community 73 - "cls-middleware.ts"
Cohesion: 0.26
Nodes (7): nestjs-pino@^5.3.1, ApiModule, useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp(), nestjs-pino

### Community 78 - "api.module.ts"
Cohesion: 0.06
Nodes (39): databaseEntities, AuditLogListener, eventValues, happened, personalValues, AuditModule, auditedEventNames(), AuditRule (+31 more)

### Community 115 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 483 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `log-level-warn.spec.ts`, `server/package.json`, `env.schema.ts`, `dependencies`, `http-error.filter.spec.ts`, `startZoneProbeApp`, `audit-log-table.e2e-spec.ts`, `zone-servers.spec.ts`, `api-app.ts`, `ResponseProbeController`, `log-redaction.spec.ts`, `main.ts`, `audit-log.e2e-spec.ts`, `AuditLogEntry`, `server-errors.spec.ts`, `createProbeApp`, `@nestjs/common`, `zone-servers.ts`, `api-docs.spec.ts`, `api-docs.ts`, `request-id.spec.ts`, `cls-middleware.ts`, `api.module.ts`?**
  _High betweenness centrality (0.204) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `api-docs.spec.ts` to `InternalProbeController`, `NeutralProbeController`, `ServerErrorsProbeController`, `ErrorProbeController`, `@nestjs/common`, `zone-servers.spec.ts`, `ZonedController`, `BodyProbeController`, `ResponseProbeController`, `ValidationProbeController`, `server-errors.spec.ts`, `http-error.filter.spec.ts`, `startZoneProbeApp`, `Controller`, `@nestjs/common`, `MixedZoneController`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-connection.e2e-spec.ts`, `migrate-mode.e2e-spec.ts`, `server/package.json`, `postgres-container.e2e-spec.ts`, `dependencies`, `audit-log.e2e-spec.ts`, `AuditLogEntry`, `audit-log-table.e2e-spec.ts`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Should `server/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._