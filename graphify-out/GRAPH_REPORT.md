# Graph Report - hector-chat  (2026-10-27)

## Corpus Check
- 63 files · ~8,075 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 8, .example 1)

## Summary
- 590 nodes · 798 edges · 59 communities (30 shown, 29 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `14e036c5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- @nest-lab/throttler-storage-redis@^1.2.0
- bot-sdk/tsconfig.json
- package.json
- server-protocol.e2e-spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- dependencies
- @nestjs-cls/transactional@^4.0.1
- compilerOptions
- nestjs-cls@^7.0.1
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
- ioredis@^6.0.0
- @nestjs/bullmq@^12.0.0
- pino-http@^11.0.0
- prom-client@^15.1.3
- reflect-metadata@^0.2.2
- main.ts
- tsconfig.build.json
- nestjs-pino@^5.3.1
- env.schema.ts
- nest-cli.json
- @nestjs/cache-manager@^12.0.1
- @nestjs/platform-express@^12.0.1
- server-sdk/tsconfig.json
- json-object-schema.ts
- @nestjs/platform-socket.io@^12.1.3
- @nestjs/throttler@^6.7.1
- nestjs-zod@^5.5.0
- sharp@^0.35.5
- typeorm@^1.1.2
- zod@catalog:
- @nestjs/terminus@^12.1.0
- json-object-limits.spec.ts

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 20 edges
2. `scripts` - 13 edges
3. `JsonObjectValidator` - 13 edges
4. `rules` - 12 edges
5. `parseEnv()` - 12 edges
6. `scripts` - 11 edges
7. `catalog` - 11 edges
8. `@nestjs/config` - 10 edges
9. `@nestjs/common` - 8 edges
10. `AppConfigModule` - 6 edges

## Surprising Connections (you probably didn't know these)
- `schemaWith()` --calls--> `createJsonObjectSchema()`  [EXTRACTED]
  packages/protocol/src/json-object-limits.spec.ts → packages/protocol/src/json-object-schema.ts
- `appConfig` --calls--> `parseEnv()`  [EXTRACTED]
  apps/server/src/infra/config/app.config.ts → apps/server/src/infra/config/parse-env.ts
- `databaseConfig` --calls--> `parseEnv()`  [EXTRACTED]
  apps/server/src/infra/config/database.config.ts → apps/server/src/infra/config/parse-env.ts
- `portsConfig` --calls--> `parseEnv()`  [EXTRACTED]
  apps/server/src/infra/config/ports.config.ts → apps/server/src/infra/config/parse-env.ts
- `redisConfig` --calls--> `parseEnv()`  [EXTRACTED]
  apps/server/src/infra/config/redis.config.ts → apps/server/src/infra/config/parse-env.ts

## Import Cycles
- None detected.

## Communities (59 total, 29 thin omitted)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (35): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+27 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @aws-sdk/client-s3@^3.1151.0, nest-commander@^3.21.0, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/config@^12.0.1, @nestjs/event-emitter@^12.0.1, @nestjs/swagger@^12.0.2, @nestjs/typeorm@^12.0.2 (+18 more)

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
Nodes (17): author, cache-manager@^7.2.9, jose@^6.2.12, @nestjs/core@^12.0.1, @nestjs/microservices@^12.1.3, @sowa-chat/protocol@workspace:*, description, license (+9 more)

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
Cohesion: 0.22
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 27 - "ref_node_fs"
Cohesion: 0.28
Nodes (4): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), testEnv

### Community 28 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 35 - "main.ts"
Cohesion: 0.10
Nodes (24): @nestjs/common@^12.0.1, ApiModule, CliModule, appConfig, AppConfigModule, compileConfigModule(), testEnv, databaseConfig (+16 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "env.schema.ts"
Cohesion: 0.14
Nodes (10): Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), nonEmptyString, PortVariable, portVariables (+2 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "json-object-schema.ts"
Cohesion: 0.28
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 115 - "json-object-limits.spec.ts"
Cohesion: 0.07
Nodes (29): ErrorCode, errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema() (+21 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 274 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/config` connect `main.ts` to `server/package.json`, `dependencies`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `@nest-lab/throttler-storage-redis@^1.2.0`, `@nestjs-cls/transactional@^4.0.1`, `nestjs-cls@^7.0.1`, `server/package.json`, `file-type@^22.1.1`, `bullmq@^6.3.15`, `helmet@^8.3.0`, `@aws-sdk/s3-request-presigner@^3.1151.0`, `ioredis@^6.0.0`, `@nestjs/bullmq@^12.0.0`, `pino-http@^11.0.0`, `prom-client@^15.1.3`, `reflect-metadata@^0.2.2`, `main.ts`, `nestjs-pino@^5.3.1`, `@nestjs/cache-manager@^12.0.1`, `@nestjs/platform-express@^12.0.1`, `@nestjs/platform-socket.io@^12.1.3`, `@nestjs/throttler@^6.7.1`, `nestjs-zod@^5.5.0`, `sharp@^0.35.5`, `typeorm@^1.1.2`, `zod@catalog:`, `@nestjs/terminus@^12.1.0`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/common` connect `main.ts` to `server/package.json`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Should `server-modes.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13071895424836602 - nodes in this community are weakly interconnected._