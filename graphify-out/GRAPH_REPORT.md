# Graph Report - EPIC-5-6  (2026-10-28)

## Corpus Check
- 109 files · ~16,865 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 861 nodes · 1383 edges · 73 communities (42 shown, 31 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8f5f2b81`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- migrate-mode.e2e-spec.ts
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- server/package.json
- database-connection.e2e-spec.ts
- compilerOptions
- logging.e2e-spec.ts
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
- cache-manager@^7.2.9
- ProbeController
- env.schema.ts
- scripts
- request-id.e2e-spec.ts
- @nestjs/bullmq@^12.0.0
- config.module.ts
- provided-context.d.ts
- ref_node_path
- server-protocol.e2e-spec.ts
- bullmq@^6.3.15
- @aws-sdk/s3-request-presigner@^3.1151.0
- unit-probe.ts
- main.ts
- tsconfig.build.json
- file-type@^22.1.1
- log-redaction.e2e-spec.ts
- nest-cli.json
- @nestjs/cache-manager@^12.0.1
- packages-build.e2e-spec.ts
- server-sdk/tsconfig.json
- log-redaction.spec.ts
- workspace-check-types.e2e-spec.ts
- request-id.spec.ts
- typeorm
- cls-middleware.ts
- ioredis@^6.0.0
- log-settings.e2e-spec.ts
- @nestjs/platform-socket.io@^12.1.3
- RedactionProbeController
- jose@^6.2.12
- @nestjs/platform-express@^12.0.1
- @socket.io/redis-adapter@^8.3.0
- pg
- nest-commander@^3.21.0
- @nestjs-cls/transactional@^4.0.1
- @nestjs/terminus@^12.1.0
- @sowa-chat/protocol@workspace:*
- @nestjs-cls/transactional-adapter-typeorm@^2.0.1
- reflect-metadata@^0.2.2
- rxjs@^7.8.1
- sharp@^0.35.5
- protocol/src/index.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 21 edges
2. `compilerOptions` - 20 edges
3. `scripts` - 16 edges
4. `@nestjs/config` - 14 edges
5. `parseEnv()` - 14 edges
6. `typeorm` - 13 edges
7. `findFreePort()` - 13 edges
8. `createProbeApp()` - 13 edges
9. `JsonObjectValidator` - 13 edges
10. `rules` - 12 edges

## Surprising Connections (you probably didn't know these)
- `Project` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/projects/project.entity.ts → packages/protocol/src/json-types.ts
- `unreachableUrl()` --calls--> `findFreePort()`  [EXTRACTED]
  apps/server/test/migrate-mode.e2e-spec.ts → apps/server/test/support/e2e-server.ts
- `useClsMiddleware()` --indirect_call--> `resolveRequestId()`  [INFERRED]
  apps/server/src/infra/cls/cls-middleware.ts → apps/server/src/infra/request-id/request-id.ts
- `runApi()` --calls--> `useClsMiddleware()`  [EXTRACTED]
  apps/server/src/main.ts → apps/server/src/infra/cls/cls-middleware.ts
- `createTypeOrmModule()` --calls--> `createDataSourceOptions()`  [EXTRACTED]
  apps/server/src/infra/database/database.module.ts → apps/server/src/infra/database/database-options.ts

## Import Cycles
- None detected.

## Communities (73 total, 31 thin omitted)

### Community 0 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.24
Nodes (9): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+1 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (35): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+27 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.11
Nodes (17): author, helmet@^8.3.0, @nestjs/microservices@^12.1.3, @nestjs/websockets@^12.1.3, nestjs-zod@^5.5.0, prom-client@^15.1.3, description, license (+9 more)

### Community 7 - "database-connection.e2e-spec.ts"
Cohesion: 0.20
Nodes (10): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), serverEnvironment(), findFreePort() (+2 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "logging.e2e-spec.ts"
Cohesion: 0.22
Nodes (10): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, waitForHttpStatus() (+2 more)

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
Nodes (25): dependencies, @aws-sdk/client-s3@^3.1151.0, @nest-lab/throttler-storage-redis@^1.2.0, nestjs-cls@^7.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1, @nestjs/core@^12.0.1, @nestjs/event-emitter@^12.0.1 (+17 more)

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

### Community 24 - "env.schema.ts"
Cohesion: 0.08
Nodes (19): checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange(), logFormats (+11 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 28 - "config.module.ts"
Cohesion: 0.26
Nodes (12): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+4 more)

### Community 30 - "ref_node_path"
Cohesion: 0.12
Nodes (9): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, IdentityRow, VersionRow (+1 more)

### Community 31 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 34 - "unit-probe.ts"
Cohesion: 0.17
Nodes (12): nestjs-pino@^5.3.1, LogDestination, createRedactionProbeApp(), createRequestIdProbeApp(), withOfflineDatabase(), createProbeApp(), ProbeAppOptions, redirectLogsTo() (+4 more)

### Community 35 - "main.ts"
Cohesion: 0.06
Nodes (38): ApiModule, CliModule, databaseEntities, AppClsModule, AppConfigModule, DatabaseMigrationStep, createTypeOrmModule(), DatabaseModule (+30 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 41 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "log-redaction.spec.ts"
Cohesion: 0.22
Nodes (9): allOutput(), CapturedLogs, fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields, secretValueOf() (+1 more)

### Community 45 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 46 - "request-id.spec.ts"
Cohesion: 0.36
Nodes (7): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, waitForRequestEntry()

### Community 47 - "typeorm"
Cohesion: 0.09
Nodes (17): typeorm@^1.1.2, database, loadDataSource(), Project, DatabaseMigration, databaseMigrations, createDataSourceOptions(), DatabaseConnection (+9 more)

### Community 48 - "cls-middleware.ts"
Cohesion: 0.39
Nodes (4): useClsMiddleware(), echoRequestId(), requestIdHeader, resolveRequestId()

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.19
Nodes (13): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+5 more)

### Community 115 - "protocol/src/index.ts"
Cohesion: 0.05
Nodes (32): ErrorCode, errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema() (+24 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 371 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `typeorm` connect `typeorm` to `migrate-mode.e2e-spec.ts`, `ref_node_path`, `server/package.json`, `database-connection.e2e-spec.ts`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/common` connect `main.ts` to `unit-probe.ts`, `log-level-warn.spec.ts`, `server/package.json`, `log-redaction.spec.ts`, `dependencies`, `request-id.spec.ts`, `cls-middleware.ts`, `config.module.ts`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Why does `pino` connect `main.ts` to `unit-probe.ts`, `log-level-warn.spec.ts`, `server/package.json`, `dependencies`, `log-settings.e2e-spec.ts`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Should `server-modes.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13071895424836602 - nodes in this community are weakly interconnected._