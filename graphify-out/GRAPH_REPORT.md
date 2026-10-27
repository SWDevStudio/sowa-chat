# Graph Report - hector-chat  (2026-10-27)

## Corpus Check
- 72 files · ~11,755 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 8, .example 1)

## Summary
- 707 nodes · 988 edges · 64 communities (35 shown, 29 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `39d4551f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cache-manager@^7.2.9
- bot-sdk/tsconfig.json
- package.json
- log-redaction.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- dependencies
- log-redaction.e2e-spec.ts
- compilerOptions
- server-protocol.e2e-spec.ts
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
- file-type@^22.1.1
- bullmq@^6.3.15
- helmet@^8.3.0
- scripts
- packages-build.e2e-spec.ts
- ref_node_fs
- workspace-check-types.e2e-spec.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- request-id.spec.ts
- jose@^6.2.12
- @nestjs/bullmq@^12.0.0
- request-id.e2e-spec.ts
- @nestjs/event-emitter@^12.0.1
- main.ts
- tsconfig.build.json
- @nestjs/microservices@^12.1.3
- config.module.ts
- nest-cli.json
- @nestjs/cache-manager@^12.0.1
- nest-commander@^3.21.0
- server-sdk/tsconfig.json
- json-object-schema.ts
- @nestjs-cls/transactional@^4.0.1
- @nestjs/swagger@^12.0.2
- @nestjs/terminus@^12.1.0
- @nestjs/websockets@^12.1.3
- socket.io@^4.8.4
- @nestjs/throttler@^6.7.1
- logging.e2e-spec.ts
- pg@^8.23.1
- prom-client@^15.1.3
- pino-http@^11.0.0
- sharp@^0.35.5
- typeorm@^1.1.2
- json-object-limits.spec.ts

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 20 edges
2. `scripts` - 13 edges
3. `JsonObjectValidator` - 13 edges
4. `rules` - 12 edges
5. `parseEnv()` - 12 edges
6. `@nestjs/common` - 11 edges
7. `scripts` - 11 edges
8. `catalog` - 11 edges
9. `@nestjs/config` - 10 edges
10. `nestjs-pino` - 6 edges

## Surprising Connections (you probably didn't know these)
- `schemaWith()` --calls--> `createJsonObjectSchema()`  [EXTRACTED]
  packages/protocol/src/json-object-limits.spec.ts → packages/protocol/src/json-object-schema.ts
- `AppClsModule` --calls--> `echoRequestId()`  [EXTRACTED]
  apps/server/src/infra/cls/app-cls.module.ts → apps/server/src/infra/request-id/request-id.ts
- `appConfig` --calls--> `parseEnv()`  [EXTRACTED]
  apps/server/src/infra/config/app.config.ts → apps/server/src/infra/config/parse-env.ts
- `databaseConfig` --calls--> `parseEnv()`  [EXTRACTED]
  apps/server/src/infra/config/database.config.ts → apps/server/src/infra/config/parse-env.ts
- `portsConfig` --calls--> `parseEnv()`  [EXTRACTED]
  apps/server/src/infra/config/ports.config.ts → apps/server/src/infra/config/parse-env.ts

## Import Cycles
- None detected.

## Communities (64 total, 29 thin omitted)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-redaction.spec.ts"
Cohesion: 0.07
Nodes (16): @nestjs/testing@^12.0.1, allOutput(), CapturedLogs, createProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService() (+8 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21, testcontainers@^12.2.1 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @aws-sdk/client-s3@^3.1151.0, ioredis@^6.0.0, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1, @nestjs/core@^12.0.1, nestjs-pino@^5.3.1 (+18 more)

### Community 7 - "log-redaction.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): isRequestEntry(), isResponding(), logEntries(), LogEntry, parseLogLine(), repositoryRoot, RunningServer, serverDirectory (+2 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

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
Nodes (17): author, nestjs-cls@^7.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @socket.io/redis-adapter@^8.3.0, @sowa-chat/protocol@workspace:*, zod@catalog:, description, zod (+9 more)

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

### Community 30 - "request-id.spec.ts"
Cohesion: 0.10
Nodes (14): supertest@^7.0.0, createProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController (+6 more)

### Community 33 - "request-id.e2e-spec.ts"
Cohesion: 0.17
Nodes (12): entriesForPath(), isResponding(), logEntries(), LogEntry, parseLogLine(), ProbeResult, repositoryRoot, RunningServer (+4 more)

### Community 35 - "main.ts"
Cohesion: 0.08
Nodes (26): ApiModule, CliModule, AppClsModule, AppConfigModule, createLoggerModule(), currentRequestId(), redactPaths, sensitiveFields (+18 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "config.module.ts"
Cohesion: 0.13
Nodes (19): appConfig, compileConfigModule(), testEnv, databaseConfig, Env, EnvObject, envObjectSchema, envSchema (+11 more)

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
Cohesion: 0.14
Nodes (17): Env, expectOnlyJsonLines(), fetchStatus(), findFreePort(), logEntries(), LogEntry, outputLines(), parseLogLine() (+9 more)

### Community 115 - "json-object-limits.spec.ts"
Cohesion: 0.06
Nodes (29): ErrorCode, errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema() (+21 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 326 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `main.ts` to `log-redaction.spec.ts`, `config.module.ts`, `dependencies`, `server/package.json`, `request-id.spec.ts`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/config` connect `config.module.ts` to `main.ts`, `server/package.json`, `dependencies`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Should `log-redaction.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07311827956989247 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `cache-manager@^7.2.9`, `server/package.json`, `file-type@^22.1.1`, `bullmq@^6.3.15`, `helmet@^8.3.0`, `@aws-sdk/s3-request-presigner@^3.1151.0`, `jose@^6.2.12`, `@nestjs/bullmq@^12.0.0`, `@nestjs/event-emitter@^12.0.1`, `@nestjs/microservices@^12.1.3`, `@nestjs/cache-manager@^12.0.1`, `nest-commander@^3.21.0`, `@nestjs-cls/transactional@^4.0.1`, `@nestjs/swagger@^12.0.2`, `@nestjs/terminus@^12.1.0`, `@nestjs/websockets@^12.1.3`, `socket.io@^4.8.4`, `@nestjs/throttler@^6.7.1`, `pg@^8.23.1`, `prom-client@^15.1.3`, `pino-http@^11.0.0`, `sharp@^0.35.5`, `typeorm@^1.1.2`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._