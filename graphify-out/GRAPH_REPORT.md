# Graph Report - EPIC-6-2  (2026-10-28)

## Corpus Check
- 154 files · ~26,820 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1171 nodes · 2134 edges · 80 communities (57 shown, 23 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2a65d780`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- global-setup.ts
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- server/package.json
- main.ts
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
- env.schema.ts
- scripts
- zone.guard.spec.ts
- logging.e2e-spec.ts
- log-redaction.e2e-spec.ts
- provided-context.d.ts
- request-id.e2e-spec.ts
- server-errors.spec.ts
- bullmq@^6.3.15
- JsonObjectValidator
- database-connection.e2e-spec.ts
- zone-servers.spec.ts
- tsconfig.build.json
- file-type@^22.1.1
- createProbeApp
- nest-cli.json
- cls-middleware.ts
- workspace-check-types.e2e-spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- request-id.spec.ts
- ValidationProbeController
- log-redaction.spec.ts
- migrate.module.ts
- json-object-limits.spec.ts
- ServerErrorsProbeController
- log-settings.e2e-spec.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- helmet
- http-error.filter.spec.ts
- jose@^6.2.12
- @nestjs/bullmq@^12.0.0
- api-docs.spec.ts
- @nestjs/cache-manager@^12.0.1
- nestjs-pino
- Zone
- @nestjs/websockets@^12.1.3
- sharp@^0.35.5
- @nestjs/common
- Zone
- ref_vitest
- zod-validation.spec.ts
- @sowa-chat/protocol@workspace:*
- json-object-schema.ts
- body-limit.spec.ts
- pg
- @nestjs/common
- .constructor
- protocol/src/index.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 53 edges
2. `Zone()` - 40 edges
3. `compilerOptions` - 20 edges
4. `startZoneProbeApp()` - 19 edges
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
- `Project` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/projects/project.entity.ts → packages/protocol/src/json-types.ts
- `ApiException` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `startApp()` --calls--> `startZoneProbeApp()`  [EXTRACTED]
  apps/server/src/infra/zones/zone.guard.spec.ts → apps/server/test/support/zone-probe.ts

## Import Cycles
- None detected.

## Communities (80 total, 23 thin omitted)

### Community 0 - "global-setup.ts"
Cohesion: 0.24
Nodes (9): testcontainers@^12.2.1, @testcontainers/postgresql@^12.2.1, runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl(), testcontainers (+1 more)

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
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.06
Nodes (29): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse, ProbeService (+21 more)

### Community 6 - "server/package.json"
Cohesion: 0.09
Nodes (21): author, @aws-sdk/client-s3@^3.1151.0, bullmq@^6.3.15, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/microservices@^12.1.3, reflect-metadata@^0.2.2, rxjs@^7.8.1, socket.io@^4.8.4 (+13 more)

### Community 7 - "main.ts"
Cohesion: 0.17
Nodes (19): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+11 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.10
Nodes (12): ioredis@^6.0.0, filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, IdentityRow (+4 more)

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
Nodes (30): dependencies, cache-manager@^7.2.9, nest-commander@^3.21.0, @nestjs/bullmq@^12.0.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1 (+22 more)

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
Cohesion: 0.13
Nodes (16): findZonePorts(), serverEnvironment(), unreachableDatabaseUrl(), serverEnvironment(), BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment() (+8 more)

### Community 23 - "api-docs.ts"
Cohesion: 0.20
Nodes (11): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, apiZones, ZoneGuard (+3 more)

### Community 24 - "env.schema.ts"
Cohesion: 0.08
Nodes (19): checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange(), logFormats (+11 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.23
Nodes (9): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, waitForHttpStatus() (+1 more)

### Community 28 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.18
Nodes (12): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+4 more)

### Community 31 - "server-errors.spec.ts"
Cohesion: 0.16
Nodes (13): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ApiExceptionInput, entries(), errorEntriesOf() (+5 more)

### Community 32 - "bullmq@^6.3.15"
Cohesion: 0.20
Nodes (4): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps

### Community 33 - "JsonObjectValidator"
Cohesion: 0.30
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 34 - "database-connection.e2e-spec.ts"
Cohesion: 0.40
Nodes (4): fetchStatus(), repositoryRoot, RunResult, waitForHttpStatus()

### Community 35 - "zone-servers.spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "createProbeApp"
Cohesion: 0.12
Nodes (14): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, LogDestination, probeControllers, withOfflineDatabase(), ProbeAppOptions (+6 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "cls-middleware.ts"
Cohesion: 0.46
Nodes (4): useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp()

### Community 41 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "zod-serialization.spec.ts"
Cohesion: 0.05
Nodes (22): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController, allOutput() (+14 more)

### Community 45 - "request-id.spec.ts"
Cohesion: 0.16
Nodes (11): databaseEntities, AppClsModule, AppConfigModule, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, ZonesModule (+3 more)

### Community 47 - "log-redaction.spec.ts"
Cohesion: 0.13
Nodes (16): configureApiApp(), ApiModule, CliModule, createContext(), mode, runApi(), runCli(), runMigrate() (+8 more)

### Community 48 - "migrate.module.ts"
Cohesion: 0.06
Nodes (27): @nestjs-cls/transactional-adapter-typeorm@^2.0.1, database, loadDataSource(), Project, ProjectsModule, ProjectsRepository, DatabaseMigration, databaseMigrations (+19 more)

### Community 49 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.19
Nodes (13): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+5 more)

### Community 54 - "http-error.filter.spec.ts"
Cohesion: 0.14
Nodes (14): ApiHttpModule, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter (+6 more)

### Community 56 - "@nestjs/bullmq@^12.0.0"
Cohesion: 0.24
Nodes (10): pino@^10.4.0, createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions(), redactPaths, sensitiveFields (+2 more)

### Community 57 - "api-docs.spec.ts"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 60 - "Zone"
Cohesion: 0.21
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 63 - "@nestjs/common"
Cohesion: 0.23
Nodes (4): ApiZone, startListening(), stopListening(), ZoneServers

### Community 64 - "Zone"
Cohesion: 0.15
Nodes (8): BareController, MethodOnlyController, ZonedController, Zone(), InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 65 - "ref_vitest"
Cohesion: 0.17
Nodes (5): errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody

### Community 66 - "zod-validation.spec.ts"
Cohesion: 0.19
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 84 - "@nestjs/common"
Cohesion: 0.18
Nodes (6): prom-client@^15.1.3, zoneMetadataKey, MetricsController, @nestjs/common, @nestjs/core, prom-client

### Community 115 - "protocol/src/index.ts"
Cohesion: 0.11
Nodes (16): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, defaultLimits, forbiddenKeys (+8 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 459 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `log-level-warn.spec.ts`, `server-modes.e2e-spec.ts`, `server/package.json`, `main.ts`, `dependencies`, `api-docs.ts`, `zone.guard.spec.ts`, `server-errors.spec.ts`, `bullmq@^6.3.15`, `createProbeApp`, `cls-middleware.ts`, `zod-serialization.spec.ts`, `request-id.spec.ts`, `log-redaction.spec.ts`, `migrate.module.ts`, `http-error.filter.spec.ts`, `@nestjs/bullmq@^12.0.0`, `api-docs.spec.ts`, `Zone`, `@nestjs/common`, `zod-validation.spec.ts`, `body-limit.spec.ts`?**
  _High betweenness centrality (0.199) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `zod-validation.spec.ts`, `json-object-schema.ts`, `createProbeApp`, `body-limit.spec.ts`, `zod-serialization.spec.ts`, `ValidationProbeController`, `ServerErrorsProbeController`, `@nestjs/common`, `http-error.filter.spec.ts`, `api-docs.spec.ts`, `zone.guard.spec.ts`, `Zone`, `server-errors.spec.ts`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `migrate.module.ts` to `database-connection.e2e-spec.ts`, `server/package.json`, `ref_node_path`, `dependencies`, `migrate-mode.e2e-spec.ts`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Should `server-modes.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05656565656565657 - nodes in this community are weakly interconnected._