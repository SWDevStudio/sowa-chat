# Graph Report - hector-chat-epic-5  (2026-10-28)

## Corpus Check
- 147 files · ~26,148 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1150 nodes · 2085 edges · 91 communities (61 shown, 30 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ec64e65d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- typeorm
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- server/package.json
- config.module.ts
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
- migrate-mode.e2e-spec.ts
- security-headers.spec.ts
- env.schema.ts
- scripts
- cache-manager@^7.2.9
- logging.e2e-spec.ts
- log-redaction.e2e-spec.ts
- provided-context.d.ts
- request-id.e2e-spec.ts
- server-protocol.e2e-spec.ts
- bullmq@^6.3.15
- @aws-sdk/s3-request-presigner@^3.1151.0
- database-connection.e2e-spec.ts
- packages-build.e2e-spec.ts
- tsconfig.build.json
- file-type@^22.1.1
- zone-servers.spec.ts
- nest-cli.json
- api-app.ts
- workspace-check-types.e2e-spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- database.module.ts
- zod-validation.spec.ts
- main.ts
- TransactionScenarios
- @nestjs/microservices@^12.1.3
- ioredis@^6.0.0
- log-settings.e2e-spec.ts
- @nestjs/websockets@^12.1.3
- log-redaction.spec.ts
- server-errors.spec.ts
- Project
- typescript@catalog:
- Zone
- @sowa-chat/protocol@workspace:*
- transactions.e2e-spec.ts
- Controller
- zone.guard.spec.ts
- MixedZoneController
- zone-servers.ts
- InternalProbeController
- @nestjs/common
- NeutralProbeController
- api-docs.spec.ts
- ErrorProbeController
- run-database-migrations.ts
- api-docs.ts
- ZonedController
- test-support.e2e-spec.ts
- BodyProbeController
- @aws-sdk/client-s3@^3.1151.0
- jose@^6.2.12
- nestjs-cls
- @nestjs/event-emitter@^12.0.1
- @nestjs/platform-socket.io@^12.1.3
- pino-http
- reflect-metadata@^0.2.2
- socket.io@^4.8.4
- @socket.io/redis-adapter@^8.3.0
- protocol/src/index.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 50 edges
2. `Zone()` - 38 edges
3. `compilerOptions` - 20 edges
4. `startZoneProbeApp()` - 18 edges
5. `typeorm` - 17 edges
6. `findFreePort()` - 17 edges
7. `scripts` - 16 edges
8. `@nestjs/config` - 15 edges
9. `Project` - 14 edges
10. `parseEnv()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `ApiExceptionInput` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `runApi()` --calls--> `configureApiApp()`  [EXTRACTED]
  apps/server/src/main.ts → apps/server/src/api-app.ts
- `Project` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/projects/project.entity.ts → packages/protocol/src/json-types.ts
- `ApiException` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts

## Import Cycles
- None detected.

## Communities (91 total, 30 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.17
Nodes (10): database, loadDataSource(), DatabaseMigration, databaseMigrations, DatabaseConnection, DatabaseEntity, FirstEntity, SecondEntity (+2 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.18
Nodes (9): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+1 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.07
Nodes (23): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+15 more)

### Community 6 - "server/package.json"
Cohesion: 0.11
Nodes (17): author, helmet@^8.3.0, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/terminus@^12.1.0, prom-client@^15.1.3, sharp@^0.35.5, description, license (+9 more)

### Community 7 - "config.module.ts"
Cohesion: 0.09
Nodes (27): pino@^10.4.0, appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig (+19 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.12
Nodes (9): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, IdentityRow, VersionRow (+1 more)

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
Nodes (26): dependencies, nest-commander@^3.21.0, @nestjs/bullmq@^12.0.0, @nestjs/cache-manager@^12.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1, @nestjs/core@^12.0.1 (+18 more)

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

### Community 22 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 23 - "security-headers.spec.ts"
Cohesion: 0.18
Nodes (10): probeControllers, probeControllers, ApiZone, apiZones, zoneMetadataKey, ports, zoneOfPort(), ZonePorts (+2 more)

### Community 24 - "env.schema.ts"
Cohesion: 0.08
Nodes (19): checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange(), logFormats (+11 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.22
Nodes (10): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, waitForHttpStatus() (+2 more)

### Community 28 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 34 - "database-connection.e2e-spec.ts"
Cohesion: 0.19
Nodes (12): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), serverEnvironment() (+4 more)

### Community 35 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "zone-servers.spec.ts"
Cohesion: 0.16
Nodes (12): LogDestination, probeControllers, withOfflineDatabase(), createProbeApp(), ProbeAppOptions, redirectLogsTo(), stubTestEnv(), testEnv (+4 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "api-app.ts"
Cohesion: 0.16
Nodes (14): configureApiApp(), useClsMiddleware(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore() (+6 more)

### Community 41 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "zod-serialization.spec.ts"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 45 - "database.module.ts"
Cohesion: 0.20
Nodes (8): CliModule, databaseEntities, AppClsModule, AppConfigModule, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules

### Community 46 - "zod-validation.spec.ts"
Cohesion: 0.13
Nodes (5): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ValidationProbeController

### Community 47 - "main.ts"
Cohesion: 0.21
Nodes (12): createContext(), mode, runApi(), runCli(), runMigrate(), runners, runToCompletion(), runWorker() (+4 more)

### Community 48 - "TransactionScenarios"
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.19
Nodes (13): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+5 more)

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 54 - "server-errors.spec.ts"
Cohesion: 0.06
Nodes (34): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, ApiHttpModule, errorCodeByStatus, errorCodeOfStatus(), httpErrorResponse() (+26 more)

### Community 55 - "Project"
Cohesion: 0.22
Nodes (5): Project, ColumnRow, createProject(), ProjectFixture, JsonObject

### Community 57 - "Zone"
Cohesion: 0.26
Nodes (5): InternalDocsProbeController, OperatorDocsProbeController, PublicDocsProbeController, MethodOnlyController, Zone()

### Community 59 - "transactions.e2e-spec.ts"
Cohesion: 0.17
Nodes (6): @nestjs-cls/transactional-adapter-typeorm@^2.0.1, ProjectsModule, ProjectsRepository, WorkerModule, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 60 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 61 - "zone.guard.spec.ts"
Cohesion: 0.18
Nodes (5): CapturedResponse, FakeRequest, guardedControllers, startApp(), unitPorts

### Community 62 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 63 - "zone-servers.ts"
Cohesion: 0.24
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 64 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 65 - "@nestjs/common"
Cohesion: 0.39
Nodes (3): ApiModule, ZonesModule, @nestjs/common

### Community 66 - "NeutralProbeController"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 67 - "api-docs.spec.ts"
Cohesion: 0.29
Nodes (6): controllers, DocsProbeDto, documentOf(), OpenApiDocument, OpenApiSchema, url()

### Community 69 - "run-database-migrations.ts"
Cohesion: 0.48
Nodes (3): runDatabaseMigrations(), setup(), startPostgresContainer()

### Community 70 - "api-docs.ts"
Cohesion: 0.43
Nodes (6): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes

### Community 72 - "test-support.e2e-spec.ts"
Cohesion: 0.60
Nodes (3): createDataSourceOptions(), truncateAllTables(), useTestDatabase()

### Community 115 - "protocol/src/index.ts"
Cohesion: 0.06
Nodes (26): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, defaultLimits, isAccepted() (+18 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 451 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `log-level-warn.spec.ts`, `server-modes.e2e-spec.ts`, `server/package.json`, `config.module.ts`, `dependencies`, `security-headers.spec.ts`, `zone-servers.spec.ts`, `api-app.ts`, `zod-serialization.spec.ts`, `database.module.ts`, `zod-validation.spec.ts`, `main.ts`, `log-redaction.spec.ts`, `server-errors.spec.ts`, `transactions.e2e-spec.ts`, `zone.guard.spec.ts`, `zone-servers.ts`, `api-docs.spec.ts`, `api-docs.ts`, `test-support.e2e-spec.ts`, `body-limit.spec.ts`?**
  _High betweenness centrality (0.211) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `InternalProbeController`, `NeutralProbeController`, `api-docs.spec.ts`, `ErrorProbeController`, `zone-servers.spec.ts`, `ZonedController`, `body-limit.spec.ts`, `BodyProbeController`, `zod-serialization.spec.ts`, `zod-validation.spec.ts`, `server-errors.spec.ts`, `security-headers.spec.ts`, `Controller`, `zone.guard.spec.ts`, `MixedZoneController`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-connection.e2e-spec.ts`, `run-database-migrations.ts`, `server/package.json`, `test-support.e2e-spec.ts`, `ref_node_path`, `dependencies`, `migrate-mode.e2e-spec.ts`, `Project`, `transactions.e2e-spec.ts`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Should `server-modes.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06825396825396825 - nodes in this community are weakly interconnected._