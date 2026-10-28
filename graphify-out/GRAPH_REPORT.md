# Graph Report - EPIC-6-3  (2026-10-28)

## Corpus Check
- 159 files · ~28,084 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1197 nodes · 2213 edges · 95 communities (64 shown, 31 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8306950a`
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
- api-docs.ts
- config.module.ts
- scripts
- zone.guard.spec.ts
- logging.e2e-spec.ts
- log-redaction.e2e-spec.ts
- provided-context.d.ts
- request-id.e2e-spec.ts
- api-exception.ts
- request-id.spec.ts
- config.module.ts
- database-connection.e2e-spec.ts
- zod-serialization.spec.ts
- tsconfig.build.json
- file-type@^22.1.1
- zone-servers.spec.ts
- nest-cli.json
- cls-middleware.ts
- workspace-check-types.e2e-spec.ts
- server-sdk/tsconfig.json
- log-redaction.spec.ts
- database.module.ts
- zod-validation.spec.ts
- main.ts
- transactions.e2e-spec.ts
- migrate.module.ts
- ServerErrorsProbeController
- log-settings.e2e-spec.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- helmet
- http-error.filter.spec.ts
- logger.module.ts
- server-errors.spec.ts
- Zone
- @nestjs/cache-manager@^12.0.1
- zone.decorator.ts
- security-headers.spec.ts
- packages-build.e2e-spec.ts
- errors.spec.ts
- zone-servers.ts
- InternalProbeController
- error-response.ts
- NeutralProbeController
- @sowa-chat/protocol@workspace:*
- ErrorProbeController
- MixedZoneController
- server-protocol.e2e-spec.ts
- @aws-sdk/client-s3@^3.1151.0
- @nestjs/common
- BodyProbeController
- redis.module.ts
- @nestjs/microservices@^12.1.3
- cache-manager@^7.2.9
- nest-commander@^3.21.0
- @nestjs/event-emitter@^12.0.1
- @nestjs/terminus@^12.1.0
- @nestjs/throttler@^6.7.1
- rxjs@^7.8.1
- pg
- metrics.controller.ts
- socket.io@^4.8.4
- @socket.io/redis-adapter@^8.3.0
- @types/pg@^8.23.1
- protocol/src/index.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 56 edges
2. `Zone()` - 40 edges
3. `findFreePort()` - 21 edges
4. `startZoneProbeApp()` - 20 edges
5. `compilerOptions` - 20 edges
6. `typeorm` - 17 edges
7. `scripts` - 16 edges
8. `@nestjs/config` - 16 edges
9. `Project` - 14 edges
10. `parseEnv()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `Project` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/projects/project.entity.ts → packages/protocol/src/json-types.ts
- `ApiExceptionInput` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `ApiException` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `createRedactionProbeApp()` --calls--> `createProbeApp()`  [EXTRACTED]
  apps/server/src/infra/logging/log-redaction.spec.ts → apps/server/test/support/unit-probe.ts

## Import Cycles
- None detected.

## Communities (95 total, 31 thin omitted)

### Community 0 - "api.module.ts"
Cohesion: 0.15
Nodes (13): nestjs-cls@^7.0.1, database, loadDataSource(), databaseEntities, AppClsModule, AppConfigModule, createTypeOrmModule(), DatabaseModule (+5 more)

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
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, source-map-support@^0.5.21, supertest@^7.0.0 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.12
Nodes (15): author, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/websockets@^12.1.3, pino-http@^11.0.0, description, socket.io-client@catalog:, socket.io-client, license (+7 more)

### Community 7 - "api-app.ts"
Cohesion: 0.23
Nodes (9): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders(), @nestjs/core (+1 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.13
Nodes (8): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, IdentityRow, VersionRow, useTestRedis(), testEnv

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
Nodes (26): dependencies, bullmq@^6.3.15, jose@^6.2.12, @nestjs/bullmq@^12.0.0, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1 (+18 more)

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
Cohesion: 0.23
Nodes (9): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, withClient() (+1 more)

### Community 23 - "api-docs.ts"
Cohesion: 0.23
Nodes (12): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, ApiZone, apiZones (+4 more)

### Community 24 - "config.module.ts"
Cohesion: 0.08
Nodes (19): checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange(), logFormats (+11 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "zone.guard.spec.ts"
Cohesion: 0.18
Nodes (5): CapturedResponse, FakeRequest, guardedControllers, startApp(), unitPorts

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.17
Nodes (12): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, waitForHttpStatus() (+4 more)

### Community 28 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+2 more)

### Community 31 - "api-exception.ts"
Cohesion: 0.29
Nodes (6): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ErrorCode

### Community 32 - "request-id.spec.ts"
Cohesion: 0.15
Nodes (10): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+2 more)

### Community 33 - "config.module.ts"
Cohesion: 0.26
Nodes (12): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+4 more)

### Community 34 - "database-connection.e2e-spec.ts"
Cohesion: 0.14
Nodes (16): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), serverEnvironment() (+8 more)

### Community 35 - "zod-serialization.spec.ts"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "zone-servers.spec.ts"
Cohesion: 0.21
Nodes (12): probeControllers, withOfflineDatabase(), offlineRedis, withOfflineRedis(), createProbeApp(), ProbeAppOptions, redirectLogsTo(), stubTestEnv() (+4 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "cls-middleware.ts"
Cohesion: 0.25
Nodes (6): useClsMiddleware(), LogDestination, echoRequestId(), resolveRequestId(), createE2eApp(), nestjs-pino

### Community 41 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 45 - "database.module.ts"
Cohesion: 0.11
Nodes (18): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createDataSourceOptions(), DatabaseConnection, FirstEntity, SecondEntity (+10 more)

### Community 47 - "main.ts"
Cohesion: 0.13
Nodes (16): configureApiApp(), ApiModule, CliModule, createContext(), mode, runApi(), runCli(), runMigrate() (+8 more)

### Community 48 - "transactions.e2e-spec.ts"
Cohesion: 0.09
Nodes (10): Project, ProjectsModule, ProjectsRepository, WorkerModule, ColumnRow, ScenarioError, SecondProjectsRepository, TransactionScenarios (+2 more)

### Community 49 - "migrate.module.ts"
Cohesion: 0.20
Nodes (4): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 54 - "http-error.filter.spec.ts"
Cohesion: 0.13
Nodes (9): nestjs-zod@^5.5.0, ApiHttpModule, HttpErrorFilter, requestIdOf(), responseZodErrorOf(), knownKeys, ProbeBodyDto, requestIdHeader (+1 more)

### Community 55 - "logger.module.ts"
Cohesion: 0.24
Nodes (10): pino@^10.4.0, createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions(), redactPaths, sensitiveFields (+2 more)

### Community 56 - "server-errors.spec.ts"
Cohesion: 0.28
Nodes (7): internalErrorMessage, ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, stringsInside()

### Community 57 - "Zone"
Cohesion: 0.19
Nodes (11): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+3 more)

### Community 60 - "security-headers.spec.ts"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 61 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 62 - "errors.spec.ts"
Cohesion: 0.28
Nodes (6): errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody

### Community 63 - "zone-servers.ts"
Cohesion: 0.31
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 64 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 65 - "error-response.ts"
Cohesion: 0.67
Nodes (5): errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse()

### Community 66 - "NeutralProbeController"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 69 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 70 - "server-protocol.e2e-spec.ts"
Cohesion: 0.31
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 73 - "@nestjs/common"
Cohesion: 0.11
Nodes (9): probeControllers, probeControllers, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, zoneMetadataKey, ZoneProbeApp (+1 more)

### Community 75 - "redis.module.ts"
Cohesion: 0.20
Nodes (8): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 84 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 115 - "protocol/src/index.ts"
Cohesion: 0.06
Nodes (28): ProjectFixture, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, defaultLimits (+20 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 466 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `api.module.ts`, `log-level-warn.spec.ts`, `server/package.json`, `api-app.ts`, `dependencies`, `api-docs.ts`, `zone.guard.spec.ts`, `api-exception.ts`, `request-id.spec.ts`, `config.module.ts`, `zod-serialization.spec.ts`, `zone-servers.spec.ts`, `cls-middleware.ts`, `log-redaction.spec.ts`, `database.module.ts`, `main.ts`, `transactions.e2e-spec.ts`, `migrate.module.ts`, `http-error.filter.spec.ts`, `logger.module.ts`, `server-errors.spec.ts`, `Zone`, `zone-servers.ts`, `error-response.ts`, `redis.module.ts`, `metrics.controller.ts`?**
  _High betweenness centrality (0.219) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `InternalProbeController`, `NeutralProbeController`, `zod-serialization.spec.ts`, `ErrorProbeController`, `MixedZoneController`, `zone-servers.spec.ts`, `@nestjs/common`, `BodyProbeController`, `zod-validation.spec.ts`, `ServerErrorsProbeController`, `metrics.controller.ts`, `http-error.filter.spec.ts`, `server-errors.spec.ts`, `zone.guard.spec.ts`, `zone.decorator.ts`, `security-headers.spec.ts`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `database.module.ts` to `api.module.ts`, `database-connection.e2e-spec.ts`, `server/package.json`, `ref_node_path`, `dependencies`, `transactions.e2e-spec.ts`, `protocol/src/index.ts`, `migrate-mode.e2e-spec.ts`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Should `server-modes.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13071895424836602 - nodes in this community are weakly interconnected._