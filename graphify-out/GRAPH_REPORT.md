# Graph Report - EPIC-5-1  (2026-10-28)

## Corpus Check
- 83 files · ~13,385 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 9, .example 1)

## Summary
- 756 nodes · 1138 edges · 62 communities (33 shown, 29 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `931d7069`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cache-manager@^7.2.9
- bot-sdk/tsconfig.json
- package.json
- log-redaction.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- server/package.json
- helmet@^8.3.0
- compilerOptions
- @aws-sdk/s3-request-presigner@^3.1151.0
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
- config.module.ts
- @nestjs-cls/transactional@^4.0.1
- env.schema.ts
- scripts
- packages-build.e2e-spec.ts
- ref_node_path
- workspace-check-types.e2e-spec.ts
- file-type@^22.1.1
- server-protocol.e2e-spec.ts
- @nestjs-cls/transactional-adapter-typeorm@^2.0.1
- @nestjs/bullmq@^12.0.0
- ioredis@^6.0.0
- nestjs-zod@^5.5.0
- main.ts
- tsconfig.build.json
- @nestjs/event-emitter@^12.0.1
- @nestjs/swagger@^12.0.2
- nest-cli.json
- @nestjs/cache-manager@^12.0.1
- @nestjs/terminus@^12.1.0
- server-sdk/tsconfig.json
- JsonObjectValidator
- pg@^8.23.1
- pino-http
- @nestjs/typeorm@^12.0.2
- @sowa-chat/protocol@workspace:*
- typeorm@^1.1.2
- rxjs@^7.8.1
- logging.e2e-spec.ts
- RedactionProbeController
- @socket.io/redis-adapter@^8.3.0
- zod@catalog:
- protocol/src/index.ts

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 20 edges
2. `@nestjs/common` - 17 edges
3. `parseEnv()` - 14 edges
4. `scripts` - 13 edges
5. `JsonObjectValidator` - 13 edges
6. `rules` - 12 edges
7. `@nestjs/config` - 12 edges
8. `createProbeApp()` - 11 edges
9. `scripts` - 11 edges
10. `catalog` - 11 edges

## Surprising Connections (you probably didn't know these)
- `useClsMiddleware()` --indirect_call--> `resolveRequestId()`  [INFERRED]
  apps/server/src/infra/cls/cls-middleware.ts → apps/server/src/infra/request-id/request-id.ts
- `createRedactionProbeApp()` --calls--> `createProbeApp()`  [EXTRACTED]
  apps/server/src/infra/logging/log-redaction.spec.ts → apps/server/test/support/unit-probe.ts
- `createRequestIdProbeApp()` --calls--> `createProbeApp()`  [EXTRACTED]
  apps/server/src/infra/request-id/request-id.spec.ts → apps/server/test/support/unit-probe.ts
- `runToExit()` --calls--> `spawnServer()`  [EXTRACTED]
  apps/server/test/log-settings.e2e-spec.ts → apps/server/test/support/e2e-server.ts
- `serverEnvironment()` --calls--> `findFreePort()`  [EXTRACTED]
  apps/server/test/logging.e2e-spec.ts → apps/server/test/support/e2e-server.ts

## Import Cycles
- None detected.

## Communities (62 total, 29 thin omitted)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-redaction.spec.ts"
Cohesion: 0.05
Nodes (37): LogDestination, allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService() (+29 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (34): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+26 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.11
Nodes (17): author, jose@^6.2.12, nest-commander@^3.21.0, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/core@^12.0.1, socket.io@^4.8.4, description, license (+9 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

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
Nodes (26): dependencies, @aws-sdk/client-s3@^3.1151.0, bullmq@^6.3.15, nestjs-cls@^7.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1, @nestjs/microservices@^12.1.3, nestjs-pino@^5.3.1 (+18 more)

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

### Community 22 - "config.module.ts"
Cohesion: 0.31
Nodes (12): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+4 more)

### Community 24 - "env.schema.ts"
Cohesion: 0.08
Nodes (19): checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange(), logFormats (+11 more)

### Community 25 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, check-types, start:api, start:api:dev, start:prod, start:worker, start:worker:dev (+5 more)

### Community 26 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 27 - "ref_node_path"
Cohesion: 0.28
Nodes (4): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), testEnv

### Community 28 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 30 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 35 - "main.ts"
Cohesion: 0.08
Nodes (32): ApiModule, CliModule, AppClsModule, useClsMiddleware(), AppConfigModule, createStdoutDestination(), baseOptions(), createLoggerModule() (+24 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "JsonObjectValidator"
Cohesion: 0.30
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 51 - "logging.e2e-spec.ts"
Cohesion: 0.07
Nodes (43): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), ApiRun (+35 more)

### Community 115 - "protocol/src/index.ts"
Cohesion: 0.06
Nodes (29): ErrorCode, errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema() (+21 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 331 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `pino` connect `log-redaction.spec.ts` to `logging.e2e-spec.ts`, `main.ts`, `dependencies`, `server/package.json`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/common` connect `main.ts` to `log-redaction.spec.ts`, `dependencies`, `server/package.json`, `config.module.ts`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Should `log-redaction.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.052403846153846155 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `cache-manager@^7.2.9`, `server/package.json`, `helmet@^8.3.0`, `@aws-sdk/s3-request-presigner@^3.1151.0`, `@nestjs-cls/transactional@^4.0.1`, `file-type@^22.1.1`, `@nestjs-cls/transactional-adapter-typeorm@^2.0.1`, `@nestjs/bullmq@^12.0.0`, `ioredis@^6.0.0`, `nestjs-zod@^5.5.0`, `@nestjs/event-emitter@^12.0.1`, `@nestjs/swagger@^12.0.2`, `@nestjs/cache-manager@^12.0.1`, `@nestjs/terminus@^12.1.0`, `pg@^8.23.1`, `pino-http`, `@nestjs/typeorm@^12.0.2`, `@sowa-chat/protocol@workspace:*`, `typeorm@^1.1.2`, `rxjs@^7.8.1`, `@socket.io/redis-adapter@^8.3.0`, `zod@catalog:`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._