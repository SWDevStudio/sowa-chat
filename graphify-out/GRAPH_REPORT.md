# Graph Report - EPIC-6-4  (2026-10-28)

## Corpus Check
- 170 files · ~30,256 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1261 nodes · 2377 edges · 98 communities (68 shown, 30 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 37 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `49448c42`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- api.module.ts
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- server/package.json
- api-app.ts
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
- zone.ts
- env.schema.ts
- scripts
- zone.guard.spec.ts
- logging.e2e-spec.ts
- log-redaction.e2e-spec.ts
- provided-context.d.ts
- request-id.e2e-spec.ts
- server-errors.spec.ts
- Project
- protocol/src/index.ts
- findFreePort
- ResponseProbeController
- tsconfig.build.json
- TransactionScenarios
- zone-servers.spec.ts
- nest-cli.json
- cls-middleware.ts
- workspace-check-types.e2e-spec.ts
- server-sdk/tsconfig.json
- log-redaction.spec.ts
- typeorm
- ValidationProbeController
- main.ts
- transactions.e2e-spec.ts
- global-setup.ts
- ServerErrorsProbeController
- log-settings.e2e-spec.ts
- config.module.ts
- JsonObjectValidator
- http-error.filter.spec.ts
- health.e2e-spec.ts
- migrate.module.ts
- api-docs.spec.ts
- @nestjs/cache-manager@^12.0.1
- ZonedController
- Controller
- packages-build.e2e-spec.ts
- logger.module.ts
- ZoneServers
- InternalProbeController
- request-id.spec.ts
- NeutralProbeController
- zod-validation.spec.ts
- ErrorProbeController
- MixedZoneController
- server-protocol.e2e-spec.ts
- status.controller.spec.ts
- @nestjs/common
- BodyProbeController
- @nestjs/common
- jose@^6.2.12
- log-destination.spec.ts
- database-migrations.spec.ts
- ProbeController
- @aws-sdk/s3-request-presigner@^3.1151.0
- bullmq@^6.3.15
- file-type@^22.1.1
- helmet
- metrics.controller.ts
- nest-commander@^3.21.0
- @nestjs/event-emitter@^12.0.1
- @nestjs/microservices@^12.1.3
- @nestjs/platform-socket.io@^12.1.3
- @nestjs/throttler@^6.7.1
- @types/node@^24.0.0
- json-object-schema.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 64 edges
2. `Zone()` - 44 edges
3. `findFreePort()` - 25 edges
4. `startZoneProbeApp()` - 22 edges
5. `compilerOptions` - 20 edges
6. `typeorm` - 17 edges
7. `scripts` - 16 edges
8. `@nestjs/config` - 16 edges
9. `spawnServer()` - 15 edges
10. `Project` - 14 edges

## Surprising Connections (you probably didn't know these)
- `ApiExceptionInput` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `Project` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/projects/project.entity.ts → packages/protocol/src/json-types.ts
- `ApiException` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `createRedactionProbeApp()` --calls--> `createProbeApp()`  [EXTRACTED]
  apps/server/src/infra/logging/log-redaction.spec.ts → apps/server/test/support/unit-probe.ts

## Import Cycles
- None detected.

## Communities (98 total, 30 thin omitted)

### Community 0 - "api.module.ts"
Cohesion: 0.12
Nodes (14): nestjs-cls@^7.0.1, database, loadDataSource(), databaseEntities, AppClsModule, AppConfigModule, createTypeOrmModule(), DatabaseModule (+6 more)

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
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.10
Nodes (19): author, @aws-sdk/client-s3@^3.1151.0, reflect-metadata@^0.2.2, rxjs@^7.8.1, @socket.io/redis-adapter@^8.3.0, @sowa-chat/protocol@workspace:*, zod@catalog:, description (+11 more)

### Community 7 - "api-app.ts"
Cohesion: 0.29
Nodes (7): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders()

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.15
Nodes (9): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, IdentityRow, VersionRow, useTestRedis(), redisUrl() (+1 more)

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
Cohesion: 0.07
Nodes (28): dependencies, cache-manager@^7.2.9, ioredis@^6.0.0, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/bullmq@^12.0.0, @nestjs-cls/transactional@^4.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1 (+20 more)

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
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, withClient() (+2 more)

### Community 23 - "zone.ts"
Cohesion: 0.17
Nodes (14): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes (+6 more)

### Community 24 - "env.schema.ts"
Cohesion: 0.08
Nodes (19): checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange(), logFormats (+11 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "zone.guard.spec.ts"
Cohesion: 0.15
Nodes (7): zoneMetadataKey, CapturedResponse, FakeRequest, guardedControllers, startApp(), unitPorts, @nestjs/core

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.23
Nodes (9): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, waitForHttpStatus() (+1 more)

### Community 28 - "log-redaction.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), parseLogLine() (+2 more)

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "server-errors.spec.ts"
Cohesion: 0.16
Nodes (13): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, internalErrorMessage, ApiExceptionInput, entries() (+5 more)

### Community 32 - "Project"
Cohesion: 0.20
Nodes (5): Project, ColumnRow, createProject(), ProjectFixture, JsonObject

### Community 33 - "protocol/src/index.ts"
Cohesion: 0.12
Nodes (14): errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema(), EventEnvelope (+6 more)

### Community 34 - "findFreePort"
Cohesion: 0.14
Nodes (16): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), serverEnvironment() (+8 more)

### Community 35 - "ResponseProbeController"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "TransactionScenarios"
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 38 - "zone-servers.spec.ts"
Cohesion: 0.18
Nodes (16): probeControllers, withOfflineDatabase(), offlineRedis, withOfflineRedis(), readyRedis, RedisStub, startRedisStubProbeApp(), createProbeApp() (+8 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "cls-middleware.ts"
Cohesion: 0.60
Nodes (4): useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp()

### Community 41 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 45 - "typeorm"
Cohesion: 0.19
Nodes (11): typeorm@^1.1.2, DatabaseMigration, databaseMigrations, createDataSourceOptions(), DatabaseConnection, FirstEntity, SecondEntity, CreateProjects1793193549883 (+3 more)

### Community 47 - "main.ts"
Cohesion: 0.12
Nodes (17): configureApiApp(), ApiModule, CliModule, createContext(), mode, runApi(), runCli(), runMigrate() (+9 more)

### Community 48 - "transactions.e2e-spec.ts"
Cohesion: 0.18
Nodes (5): @nestjs-cls/transactional-adapter-typeorm@^2.0.1, ProjectsModule, ProjectsRepository, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 49 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "config.module.ts"
Cohesion: 0.31
Nodes (12): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+4 more)

### Community 54 - "http-error.filter.spec.ts"
Cohesion: 0.13
Nodes (14): nestjs-zod@^5.5.0, ApiHttpModule, errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter (+6 more)

### Community 55 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 56 - "migrate.module.ts"
Cohesion: 0.20
Nodes (4): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps

### Community 57 - "api-docs.spec.ts"
Cohesion: 0.19
Nodes (11): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+3 more)

### Community 60 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 61 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 62 - "logger.module.ts"
Cohesion: 0.24
Nodes (10): pino@^10.4.0, createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions(), redactPaths, sensitiveFields (+2 more)

### Community 63 - "ZoneServers"
Cohesion: 0.22
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 64 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 65 - "request-id.spec.ts"
Cohesion: 0.22
Nodes (9): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, ProbeService (+1 more)

### Community 66 - "NeutralProbeController"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 67 - "zod-validation.spec.ts"
Cohesion: 0.33
Nodes (4): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto

### Community 69 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 70 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 71 - "status.controller.spec.ts"
Cohesion: 0.33
Nodes (3): DependencyStatusBody, StatusBody, databaseUrl()

### Community 73 - "@nestjs/common"
Cohesion: 0.13
Nodes (3): probeControllers, probeControllers, ZoneProbeApp

### Community 75 - "@nestjs/common"
Cohesion: 0.07
Nodes (18): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+10 more)

### Community 84 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 115 - "json-object-schema.ts"
Cohesion: 0.08
Nodes (16): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+8 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 491 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `api.module.ts`, `log-level-warn.spec.ts`, `server/package.json`, `api-app.ts`, `dependencies`, `zone.ts`, `zone.guard.spec.ts`, `server-errors.spec.ts`, `ResponseProbeController`, `zone-servers.spec.ts`, `cls-middleware.ts`, `log-redaction.spec.ts`, `typeorm`, `main.ts`, `transactions.e2e-spec.ts`, `config.module.ts`, `http-error.filter.spec.ts`, `migrate.module.ts`, `api-docs.spec.ts`, `logger.module.ts`, `request-id.spec.ts`, `zod-validation.spec.ts`, `status.controller.spec.ts`, `@nestjs/common`, `log-destination.spec.ts`, `metrics.controller.ts`?**
  _High betweenness centrality (0.240) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `api.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12043010752688173 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `api-docs.spec.ts` to `InternalProbeController`, `NeutralProbeController`, `ResponseProbeController`, `ErrorProbeController`, `zod-validation.spec.ts`, `MixedZoneController`, `zone-servers.spec.ts`, `@nestjs/common`, `BodyProbeController`, `@nestjs/common`, `ValidationProbeController`, `ServerErrorsProbeController`, `metrics.controller.ts`, `http-error.filter.spec.ts`, `zone.guard.spec.ts`, `ZonedController`, `Controller`, `server-errors.spec.ts`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `findFreePort()` connect `findFreePort` to `zone-servers.spec.ts`, `@nestjs/common`, `log-settings.e2e-spec.ts`, `migrate-mode.e2e-spec.ts`, `health.e2e-spec.ts`, `logging.e2e-spec.ts`, `log-redaction.e2e-spec.ts`, `request-id.e2e-spec.ts`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._