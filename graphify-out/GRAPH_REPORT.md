# Graph Report - EPIC-6-1  (2026-10-28)

## Corpus Check
- 151 files · ~26,526 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1158 nodes · 2105 edges · 94 communities (60 shown, 34 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `88df0026`
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
- api-app.ts
- compilerOptions
- ref_node_fs
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
- @nestjs/common
- env.schema.ts
- scripts
- MixedZoneController
- logging.e2e-spec.ts
- e2e-server.ts
- provided-context.d.ts
- request-id.e2e-spec.ts
- server-protocol.e2e-spec.ts
- migrate.module.ts
- request-id.spec.ts
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
- api.module.ts
- ValidationProbeController
- main.ts
- transactions.e2e-spec.ts
- .probe
- api-docs.spec.ts
- log-settings.e2e-spec.ts
- valkey-container.e2e-spec.ts
- RedactionProbeController
- server-errors.spec.ts
- @aws-sdk/client-s3@^3.1151.0
- logger.module.ts
- Zone
- bullmq@^6.3.15
- @nest-lab/throttler-storage-redis@^1.2.0
- security-headers.spec.ts
- zone.guard.spec.ts
- log-redaction.spec.ts
- zone-servers.ts
- InternalProbeController
- ref_node_child_process
- api-versioning.spec.ts
- @nestjs/platform-socket.io@^12.1.3
- ErrorProbeController
- pino-http
- ZonedController
- @socket.io/redis-adapter@^8.3.0
- zone-probe.ts
- BodyProbeController
- @nestjs/bullmq@^12.0.0
- @testcontainers/postgresql
- @types/supertest@^7.0.0
- @nestjs/event-emitter@^12.0.1
- @nestjs/terminus@^12.1.0
- @nestjs/throttler@^6.7.1
- reflect-metadata@^0.2.2
- socket.io@^4.8.4
- pg
- prom-client@^15.1.3
- zod@catalog:
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
- `Project` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/projects/project.entity.ts → packages/protocol/src/json-types.ts
- `ApiExceptionInput` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `runApi()` --calls--> `configureApiApp()`  [EXTRACTED]
  apps/server/src/main.ts → apps/server/src/api-app.ts
- `ApiException` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts

## Import Cycles
- None detected.

## Communities (94 total, 34 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.13
Nodes (16): DatabaseMigration, databaseMigrations, createDataSourceOptions(), DatabaseConnection, FirstEntity, SecondEntity, CreateProjects1793193549883, runDatabaseMigrations() (+8 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.29
Nodes (9): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+1 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.12
Nodes (15): author, cache-manager@^7.2.9, @nestjs/cache-manager@^12.0.1, rxjs@^7.8.1, @sowa-chat/protocol@workspace:*, description, license, name (+7 more)

### Community 7 - "api-app.ts"
Cohesion: 0.26
Nodes (12): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+4 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_fs"
Cohesion: 0.20
Nodes (6): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson

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
Nodes (26): dependencies, @aws-sdk/s3-request-presigner@^3.1151.0, helmet@^8.3.0, jose@^6.2.12, nest-commander@^3.21.0, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1 (+18 more)

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
Cohesion: 0.19
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 23 - "@nestjs/common"
Cohesion: 0.23
Nodes (12): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, probeControllers, ApiZone (+4 more)

### Community 24 - "env.schema.ts"
Cohesion: 0.08
Nodes (19): checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange(), logFormats (+11 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - "e2e-server.ts"
Cohesion: 0.31
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 32 - "migrate.module.ts"
Cohesion: 0.20
Nodes (4): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps

### Community 33 - "request-id.spec.ts"
Cohesion: 0.36
Nodes (7): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, waitForRequestEntry()

### Community 34 - "database-connection.e2e-spec.ts"
Cohesion: 0.21
Nodes (11): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), Env (+3 more)

### Community 35 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "zone-servers.spec.ts"
Cohesion: 0.19
Nodes (8): LogDestination, probeControllers, withOfflineDatabase(), ProbeAppOptions, stubTestEnv(), testEnv, startZoneProbeApp(), @nestjs/testing

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "api-app.ts"
Cohesion: 0.15
Nodes (15): configureApiApp(), useClsMiddleware(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore() (+7 more)

### Community 41 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "zod-serialization.spec.ts"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 45 - "api.module.ts"
Cohesion: 0.13
Nodes (15): nestjs-cls@^7.0.1, @nestjs/typeorm@^12.0.2, database, loadDataSource(), databaseEntities, AppClsModule, AppConfigModule, createTypeOrmModule() (+7 more)

### Community 47 - "main.ts"
Cohesion: 0.13
Nodes (15): ApiModule, CliModule, createContext(), mode, runApi(), runCli(), runMigrate(), runners (+7 more)

### Community 48 - "transactions.e2e-spec.ts"
Cohesion: 0.09
Nodes (10): Project, ProjectsModule, ProjectsRepository, WorkerModule, ColumnRow, ScenarioError, SecondProjectsRepository, TransactionScenarios (+2 more)

### Community 50 - "api-docs.spec.ts"
Cohesion: 0.29
Nodes (6): controllers, DocsProbeDto, documentOf(), OpenApiDocument, OpenApiSchema, url()

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.19
Nodes (13): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+5 more)

### Community 52 - "valkey-container.e2e-spec.ts"
Cohesion: 0.47
Nodes (3): ioredis@^6.0.0, useTestRedis(), ioredis

### Community 54 - "server-errors.spec.ts"
Cohesion: 0.06
Nodes (34): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, ApiHttpModule, errorCodeByStatus, errorCodeOfStatus(), httpErrorResponse() (+26 more)

### Community 56 - "logger.module.ts"
Cohesion: 0.24
Nodes (10): pino@^10.4.0, createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions(), redactPaths, sensitiveFields (+2 more)

### Community 57 - "Zone"
Cohesion: 0.26
Nodes (5): InternalDocsProbeController, OperatorDocsProbeController, PublicDocsProbeController, MethodOnlyController, Zone()

### Community 60 - "security-headers.spec.ts"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 61 - "zone.guard.spec.ts"
Cohesion: 0.18
Nodes (5): CapturedResponse, FakeRequest, guardedControllers, startApp(), unitPorts

### Community 62 - "log-redaction.spec.ts"
Cohesion: 0.16
Nodes (13): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+5 more)

### Community 63 - "zone-servers.ts"
Cohesion: 0.25
Nodes (4): startListening(), stopListening(), ZoneServers, @nestjs/common

### Community 64 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 65 - "ref_node_child_process"
Cohesion: 0.15
Nodes (3): IdentityRow, VersionRow, testEnv

### Community 66 - "api-versioning.spec.ts"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 73 - "zone-probe.ts"
Cohesion: 0.12
Nodes (8): probeControllers, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, zoneMetadataKey, ZoneProbeApp, @nestjs/core

### Community 115 - "protocol/src/index.ts"
Cohesion: 0.06
Nodes (28): ProjectFixture, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, defaultLimits (+20 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 453 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **34 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `zone-servers.ts` to `typeorm`, `log-level-warn.spec.ts`, `server/package.json`, `api-app.ts`, `dependencies`, `@nestjs/common`, `migrate.module.ts`, `request-id.spec.ts`, `zone-servers.spec.ts`, `api-app.ts`, `zod-serialization.spec.ts`, `api.module.ts`, `main.ts`, `transactions.e2e-spec.ts`, `api-docs.spec.ts`, `server-errors.spec.ts`, `logger.module.ts`, `zone.guard.spec.ts`, `log-redaction.spec.ts`, `zone-probe.ts`?**
  _High betweenness centrality (0.211) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.1310344827586207 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `InternalProbeController`, `api-versioning.spec.ts`, `ErrorProbeController`, `zone-servers.spec.ts`, `ZonedController`, `zone-probe.ts`, `BodyProbeController`, `zod-serialization.spec.ts`, `ValidationProbeController`, `api-docs.spec.ts`, `server-errors.spec.ts`, `@nestjs/common`, `MixedZoneController`, `security-headers.spec.ts`, `zone.guard.spec.ts`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `ref_node_child_process`, `database-connection.e2e-spec.ts`, `server/package.json`, `api.module.ts`, `dependencies`, `transactions.e2e-spec.ts`, `protocol/src/index.ts`, `migrate-mode.e2e-spec.ts`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._