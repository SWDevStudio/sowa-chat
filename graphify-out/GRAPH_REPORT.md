# Graph Report - EPIC-5-8  (2026-10-28)

## Corpus Check
- 113 files · ~17,461 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 871 nodes · 1422 edges · 63 communities (32 shown, 31 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `19a12097`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- typeorm
- bot-sdk/tsconfig.json
- package.json
- unit-probe.ts
- devDependencies
- server-modes.e2e-spec.ts
- server/package.json
- log-level-warn.spec.ts
- compilerOptions
- nestjs-cls
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
- @nestjs/event-emitter@^12.0.1
- @nestjs/bullmq@^12.0.0
- log-redaction.spec.ts
- provided-context.d.ts
- request-id.spec.ts
- bullmq@^6.3.15
- @aws-sdk/s3-request-presigner@^3.1151.0
- @nestjs/throttler@^6.7.1
- @nestjs/common
- tsconfig.build.json
- file-type@^22.1.1
- pino-http
- nest-cli.json
- @nestjs/cache-manager@^12.0.1
- server-sdk/tsconfig.json
- socket.io@^4.8.4
- zod@catalog:
- main.ts
- ioredis@^6.0.0
- database-connection.e2e-spec.ts
- RedactionProbeController
- jose@^6.2.12
- @nestjs/platform-express@^12.0.1
- @socket.io/redis-adapter@^8.3.0
- nest-commander@^3.21.0
- @nestjs-cls/transactional@^4.0.1
- @nestjs/terminus@^12.1.0
- sharp@^0.35.5
- protocol/src/index.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 23 edges
2. `compilerOptions` - 20 edges
3. `scripts` - 16 edges
4. `typeorm` - 16 edges
5. `@nestjs/config` - 14 edges
6. `parseEnv()` - 14 edges
7. `findFreePort()` - 13 edges
8. `createProbeApp()` - 13 edges
9. `JsonObjectValidator` - 13 edges
10. `rules` - 12 edges

## Surprising Connections (you probably didn't know these)
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `Project` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/projects/project.entity.ts → packages/protocol/src/json-types.ts
- `useClsMiddleware()` --indirect_call--> `resolveRequestId()`  [INFERRED]
  apps/server/src/infra/cls/cls-middleware.ts → apps/server/src/infra/request-id/request-id.ts
- `runApi()` --calls--> `useClsMiddleware()`  [EXTRACTED]
  apps/server/src/main.ts → apps/server/src/infra/cls/cls-middleware.ts
- `createTypeOrmModule()` --calls--> `createDataSourceOptions()`  [EXTRACTED]
  apps/server/src/infra/database/database.module.ts → apps/server/src/infra/database/database-options.ts

## Import Cycles
- None detected.

## Communities (63 total, 31 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.08
Nodes (22): typeorm@^1.1.2, Project, DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createDataSourceOptions(), DatabaseConnection (+14 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "unit-probe.ts"
Cohesion: 0.18
Nodes (12): LogDestination, createRedactionProbeApp(), createRequestIdProbeApp(), withOfflineDatabase(), createProbeApp(), ProbeAppOptions, redirectLogsTo(), stubTestEnv() (+4 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (35): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+27 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.09
Nodes (20): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+12 more)

### Community 6 - "server/package.json"
Cohesion: 0.11
Nodes (17): author, @aws-sdk/client-s3@^3.1151.0, @nestjs/platform-socket.io@^12.1.3, @nestjs/swagger@^12.0.2, @nestjs/websockets@^12.1.3, reflect-metadata@^0.2.2, description, license (+9 more)

### Community 7 - "log-level-warn.spec.ts"
Cohesion: 0.22
Nodes (10): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+2 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 10 - "config-startup.e2e-spec.ts"
Cohesion: 0.05
Nodes (30): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, Env, isConfigVariable(), repositoryRoot, RunResult (+22 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, helmet@^8.3.0, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1, @nestjs/core@^12.0.1, @nestjs/microservices@^12.1.3 (+18 more)

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

### Community 28 - "log-redaction.spec.ts"
Cohesion: 0.22
Nodes (9): allOutput(), CapturedLogs, fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields, secretValueOf() (+1 more)

### Community 30 - "request-id.spec.ts"
Cohesion: 0.36
Nodes (7): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, waitForRequestEntry()

### Community 35 - "@nestjs/common"
Cohesion: 0.36
Nodes (6): useClsMiddleware(), echoRequestId(), requestIdHeader, resolveRequestId(), createE2eApp(), @nestjs/common

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 47 - "main.ts"
Cohesion: 0.05
Nodes (49): ApiModule, CliModule, database, loadDataSource(), databaseEntities, AppClsModule, appConfig, AppConfigModule (+41 more)

### Community 51 - "database-connection.e2e-spec.ts"
Cohesion: 0.05
Nodes (60): fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), isRequestEntry() (+52 more)

### Community 115 - "protocol/src/index.ts"
Cohesion: 0.05
Nodes (31): ErrorCode, errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema() (+23 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 372 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `typeorm`, `unit-probe.ts`, `server/package.json`, `log-level-warn.spec.ts`, `dependencies`, `main.ts`, `log-redaction.spec.ts`, `request-id.spec.ts`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.08181818181818182 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `config-startup.e2e-spec.ts`, `database-connection.e2e-spec.ts`, `server/package.json`, `main.ts`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `pino` connect `log-level-warn.spec.ts` to `unit-probe.ts`, `server/package.json`, `dependencies`, `main.ts`, `database-connection.e2e-spec.ts`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._