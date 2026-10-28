# Graph Report - EPIC-5-3  (2026-10-28)

## Corpus Check
- 95 files · ~14,858 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 9, .example 1)

## Summary
- 797 nodes · 1240 edges · 60 communities (29 shown, 31 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `04bd919d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- config.module.ts
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
- cache-manager@^7.2.9
- ProbeController
- env.schema.ts
- scripts
- nest-commander@^3.21.0
- @nestjs/bullmq@^12.0.0
- @nestjs/event-emitter@^12.0.1
- provided-context.d.ts
- @nestjs/platform-socket.io@^12.1.3
- @nestjs/throttler@^6.7.1
- nestjs-zod@^5.5.0
- ioredis@^6.0.0
- reflect-metadata@^0.2.2
- main.ts
- tsconfig.build.json
- bullmq@^6.3.15
- socket.io@^4.8.4
- nest-cli.json
- @nestjs/cache-manager@^12.0.1
- server-sdk/tsconfig.json
- JsonObjectValidator
- @nestjs-cls/transactional@^4.0.1
- pino-http
- @sowa-chat/protocol@workspace:*
- @nest-lab/throttler-storage-redis@^1.2.0
- @nestjs/websockets@^12.1.3
- database-connection.e2e-spec.ts
- RedactionProbeController
- @nestjs/platform-express@^12.0.1
- @socket.io/redis-adapter@^8.3.0
- protocol/src/index.ts

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 20 edges
2. `@nestjs/common` - 19 edges
3. `parseEnv()` - 14 edges
4. `scripts` - 13 edges
5. `@nestjs/config` - 13 edges
6. `createProbeApp()` - 13 edges
7. `JsonObjectValidator` - 13 edges
8. `rules` - 12 edges
9. `scripts` - 11 edges
10. `catalog` - 11 edges

## Surprising Connections (you probably didn't know these)
- `useClsMiddleware()` --indirect_call--> `resolveRequestId()`  [INFERRED]
  apps/server/src/infra/cls/cls-middleware.ts → apps/server/src/infra/request-id/request-id.ts
- `runApi()` --calls--> `useClsMiddleware()`  [EXTRACTED]
  apps/server/src/main.ts → apps/server/src/infra/cls/cls-middleware.ts
- `createRedactionProbeApp()` --calls--> `createProbeApp()`  [EXTRACTED]
  apps/server/src/infra/logging/log-redaction.spec.ts → apps/server/test/support/unit-probe.ts
- `createRequestIdProbeApp()` --calls--> `createProbeApp()`  [EXTRACTED]
  apps/server/src/infra/request-id/request-id.spec.ts → apps/server/test/support/unit-probe.ts
- `serverEnvironment()` --calls--> `findFreePort()`  [EXTRACTED]
  apps/server/test/database-connection.e2e-spec.ts → apps/server/test/support/e2e-server.ts

## Import Cycles
- None detected.

## Communities (60 total, 31 thin omitted)

### Community 0 - "config.module.ts"
Cohesion: 0.31
Nodes (12): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+4 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-redaction.spec.ts"
Cohesion: 0.06
Nodes (43): useClsMiddleware(), LogDestination, allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry (+35 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.11
Nodes (17): author, @aws-sdk/client-s3@^3.1151.0, @nestjs/terminus@^12.1.0, prom-client@^15.1.3, typeorm@^1.1.2, zod@catalog:, description, zod (+9 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 10 - "config-startup.e2e-spec.ts"
Cohesion: 0.06
Nodes (29): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry (+21 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, file-type@^22.1.1, jose@^6.2.12, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1, @nestjs/core@^12.0.1, @nestjs/microservices@^12.1.3 (+16 more)

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
Cohesion: 0.15
Nodes (13): scripts, build, check-types, start:api, start:api:dev, start:prod, start:worker, start:worker:dev (+5 more)

### Community 35 - "main.ts"
Cohesion: 0.07
Nodes (38): nestjs-cls@^7.0.1, ApiModule, CliModule, databaseEntities, AppClsModule, AppConfigModule, createTypeOrmModule(), DatabaseModule (+30 more)

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

### Community 51 - "database-connection.e2e-spec.ts"
Cohesion: 0.05
Nodes (57): fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), isRequestEntry() (+49 more)

### Community 115 - "protocol/src/index.ts"
Cohesion: 0.06
Nodes (33): @testcontainers/postgresql@^12.2.1, setup(), startPostgresContainer(), ErrorCode, errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema (+25 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 345 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `log-redaction.spec.ts` to `config.module.ts`, `main.ts`, `dependencies`, `server/package.json`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `server/package.json` to `database-connection.e2e-spec.ts`, `config-startup.e2e-spec.ts`, `main.ts`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Should `log-redaction.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.056265984654731455 - nodes in this community are weakly interconnected._
- **Why does `pino` connect `log-redaction.spec.ts` to `database-connection.e2e-spec.ts`, `main.ts`, `dependencies`, `server/package.json`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._