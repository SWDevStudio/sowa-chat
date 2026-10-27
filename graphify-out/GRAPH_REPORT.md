# Graph Report - hector-chat  (2026-10-27)

## Corpus Check
- 83 files · ~13,083 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 8, .example 1)

## Summary
- 754 nodes · 1137 edges · 61 communities (33 shown, 28 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6a5f704e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cache-manager@^7.2.9
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- dependencies
- helmet@^8.3.0
- compilerOptions
- ioredis@^6.0.0
- config-startup.e2e-spec.ts
- protocol/tsconfig.json
- sdk/package.json
- server/package.json
- protocol/package.json
- catalog
- sdk/tsconfig.json
- tasks
- compilerOptions
- rules
- bot-sdk/package.json
- server-sdk/package.json
- bullmq@^6.3.15
- @nestjs-cls/transactional@^4.0.1
- env.schema.ts
- scripts
- packages-build.e2e-spec.ts
- ref_node_fs
- workspace-check-types.e2e-spec.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- ProbeController
- @nestjs-cls/transactional-adapter-typeorm@^2.0.1
- @nestjs/bullmq@^12.0.0
- jose@^6.2.12
- @nestjs/event-emitter@^12.0.1
- main.ts
- tsconfig.build.json
- nest-commander@^3.21.0
- @nestjs/core
- nest-cli.json
- @nestjs/cache-manager@^12.0.1
- @nestjs/throttler@^6.7.1
- server-sdk/tsconfig.json
- json-object-schema.ts
- @nestjs/websockets@^12.1.3
- logging.e2e-spec.ts
- RedactionProbeController
- pino-http@^11.0.0
- nestjs-zod@^5.5.0
- rxjs@^7.8.1
- @socket.io/redis-adapter@^8.3.0
- @sowa-chat/protocol@workspace:*
- zod@catalog:
- json-object-limits.spec.ts

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

## Communities (61 total, 28 thin omitted)

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
Nodes (34): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+26 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, file-type@^22.1.1, @nest-lab/throttler-storage-redis@^1.2.0, nestjs-cls@^7.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1, nestjs-pino@^5.3.1, @nestjs/platform-socket.io@^12.1.3 (+17 more)

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

### Community 13 - "server/package.json"
Cohesion: 0.11
Nodes (17): author, @aws-sdk/client-s3@^3.1151.0, @nestjs/microservices@^12.1.3, @nestjs/platform-express@^12.0.1, @nestjs/typeorm@^12.0.2, pg@^8.23.1, description, license (+9 more)

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
Cohesion: 0.09
Nodes (27): appConfig, compileConfigModule(), testEnv, databaseConfig, checkPrettyLogFormat(), Env, EnvObject, envObjectSchema (+19 more)

### Community 25 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, check-types, start:api, start:api:dev, start:prod, start:worker, start:worker:dev (+5 more)

### Community 26 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 27 - "ref_node_fs"
Cohesion: 0.28
Nodes (4): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), testEnv

### Community 28 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.24
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 30 - "ProbeController"
Cohesion: 0.14
Nodes (9): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse, ProbeService (+1 more)

### Community 35 - "main.ts"
Cohesion: 0.06
Nodes (44): pino@^10.4.0, ApiModule, CliModule, AppClsModule, useClsMiddleware(), AppConfigModule, createStdoutDestination(), LogDestination (+36 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "json-object-schema.ts"
Cohesion: 0.30
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 51 - "logging.e2e-spec.ts"
Cohesion: 0.06
Nodes (50): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), ApiRun (+42 more)

### Community 53 - "RedactionProbeController"
Cohesion: 0.09
Nodes (11): allOutput(), CapturedLogs, fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields, RedactionProbeController (+3 more)

### Community 115 - "json-object-limits.spec.ts"
Cohesion: 0.06
Nodes (29): ErrorCode, errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema() (+21 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 332 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `pino` connect `main.ts` to `logging.e2e-spec.ts`, `log-level-warn.spec.ts`, `server/package.json`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/common` connect `main.ts` to `log-level-warn.spec.ts`, `dependencies`, `server/package.json`, `RedactionProbeController`, `env.schema.ts`, `ProbeController`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `cache-manager@^7.2.9`, `helmet@^8.3.0`, `ioredis@^6.0.0`, `server/package.json`, `bullmq@^6.3.15`, `@nestjs-cls/transactional@^4.0.1`, `@aws-sdk/s3-request-presigner@^3.1151.0`, `@nestjs-cls/transactional-adapter-typeorm@^2.0.1`, `@nestjs/bullmq@^12.0.0`, `jose@^6.2.12`, `@nestjs/event-emitter@^12.0.1`, `main.ts`, `nest-commander@^3.21.0`, `@nestjs/core`, `@nestjs/cache-manager@^12.0.1`, `@nestjs/throttler@^6.7.1`, `@nestjs/websockets@^12.1.3`, `pino-http@^11.0.0`, `nestjs-zod@^5.5.0`, `rxjs@^7.8.1`, `@socket.io/redis-adapter@^8.3.0`, `@sowa-chat/protocol@workspace:*`, `zod@catalog:`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Should `server-modes.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13071895424836602 - nodes in this community are weakly interconnected._