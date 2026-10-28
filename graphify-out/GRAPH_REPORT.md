# Graph Report - EPIC-4-review  (2026-10-28)

## Corpus Check
- 96 files · ~15,645 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 9, .example 1)

## Summary
- 847 nodes · 1358 edges · 70 communities (42 shown, 28 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8a68d73c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- RedactionProbeController
- bot-sdk/tsconfig.json
- package.json
- zone-servers.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- server/package.json
- config.module.ts
- compilerOptions
- ioredis@^6.0.0
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
- Zone
- zone.guard.ts
- env.schema.ts
- scripts
- bullmq@^6.3.15
- jose@^6.2.12
- api-versioning.spec.ts
- zone.guard.spec.ts
- @nestjs/swagger@^12.0.2
- log-settings.e2e-spec.ts
- @nestjs/bullmq@^12.0.0
- request-id.e2e-spec.ts
- server-protocol.e2e-spec.ts
- main.ts
- tsconfig.build.json
- workspace-check-types.e2e-spec.ts
- ref_node_path
- nest-cli.json
- @nestjs/cache-manager@^12.0.1
- cache-manager@^7.2.9
- server-sdk/tsconfig.json
- log-redaction.spec.ts
- log-redaction.e2e-spec.ts
- packages-build.e2e-spec.ts
- cls-middleware.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- helmet@^8.3.0
- @nestjs-cls/transactional-adapter-typeorm@^2.0.1
- logging.e2e-spec.ts
- zone.decorator.spec.ts
- @nestjs/event-emitter@^12.0.1
- @nestjs/terminus@^12.1.0
- pino-http
- rxjs@^7.8.1
- @nestjs/typeorm@^12.0.2
- typeorm@^1.1.2
- pg@^8.23.1
- sharp@^0.35.5
- @sowa-chat/protocol@workspace:*
- @socket.io/redis-adapter@^8.3.0
- protocol/src/index.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 27 edges
2. `compilerOptions` - 20 edges
3. `Zone()` - 18 edges
4. `parseEnv()` - 14 edges
5. `scripts` - 13 edges
6. `@nestjs/config` - 13 edges
7. `JsonObjectValidator` - 13 edges
8. `rules` - 12 edges
9. `findFreePort()` - 11 edges
10. `createProbeApp()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `startApp()` --calls--> `startZoneProbeApp()`  [EXTRACTED]
  apps/server/src/infra/zones/zone.guard.spec.ts → apps/server/test/support/zone-probe.ts
- `serverEnvironment()` --calls--> `findFreePort()`  [EXTRACTED]
  apps/server/test/logging.e2e-spec.ts → apps/server/test/support/e2e-server.ts
- `configureApiApp()` --calls--> `useClsMiddleware()`  [EXTRACTED]
  apps/server/src/api-app.ts → apps/server/src/infra/cls/cls-middleware.ts
- `configureApiApp()` --calls--> `ZoneGuard`  [EXTRACTED]
  apps/server/src/api-app.ts → apps/server/src/infra/zones/zone.guard.ts
- `runApi()` --calls--> `configureApiApp()`  [EXTRACTED]
  apps/server/src/main.ts → apps/server/src/api-app.ts

## Import Cycles
- None detected.

## Communities (70 total, 28 thin omitted)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "zone-servers.spec.ts"
Cohesion: 0.23
Nodes (8): configureApiApp(), findZonePorts(), probeControllers, runApi(), findFreePort(), startZoneProbeApp(), @nestjs/common, @nestjs/testing

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.11
Nodes (17): author, nest-commander@^3.21.0, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/platform-socket.io@^12.1.3, @nestjs/throttler@^6.7.1, nestjs-zod@^5.5.0, description, license (+9 more)

### Community 7 - "config.module.ts"
Cohesion: 0.17
Nodes (13): appConfig, compileConfigModule(), testEnv, databaseConfig, loggingConfig, parseEnv(), portsConfig, redisConfig (+5 more)

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
Nodes (26): dependencies, @aws-sdk/client-s3@^3.1151.0, file-type@^22.1.1, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1, @nestjs/core@^12.0.1 (+18 more)

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

### Community 22 - "Zone"
Cohesion: 0.14
Nodes (8): Zone(), MixedZoneController, OperatorZoneController, UnzonedController, InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 23 - "zone.guard.ts"
Cohesion: 0.29
Nodes (7): ApiZone, apiZones, zoneMetadataKey, ZoneGuard, ports, zoneOfPort(), ZonePorts

### Community 24 - "env.schema.ts"
Cohesion: 0.09
Nodes (17): checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), logFormats, Env (+9 more)

### Community 25 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, check-types, start:api, start:api:dev, start:prod, start:worker, start:worker:dev (+5 more)

### Community 28 - "api-versioning.spec.ts"
Cohesion: 0.23
Nodes (5): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController, ZoneProbeApp

### Community 29 - "zone.guard.spec.ts"
Cohesion: 0.18
Nodes (5): CapturedResponse, FakeRequest, guardedControllers, startApp(), unitPorts

### Community 31 - "log-settings.e2e-spec.ts"
Cohesion: 0.21
Nodes (12): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+4 more)

### Community 33 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 34 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 35 - "main.ts"
Cohesion: 0.08
Nodes (27): ApiModule, CliModule, AppClsModule, AppConfigModule, createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions() (+19 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.24
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 38 - "ref_node_path"
Cohesion: 0.28
Nodes (4): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), testEnv

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "log-redaction.spec.ts"
Cohesion: 0.05
Nodes (38): nestjs-pino@^5.3.1, LogDestination, allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry (+30 more)

### Community 45 - "log-redaction.e2e-spec.ts"
Cohesion: 0.31
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 46 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 47 - "cls-middleware.ts"
Cohesion: 0.39
Nodes (4): useClsMiddleware(), echoRequestId(), requestIdHeader, resolveRequestId()

### Community 51 - "logging.e2e-spec.ts"
Cohesion: 0.16
Nodes (14): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+6 more)

### Community 52 - "zone.decorator.spec.ts"
Cohesion: 0.24
Nodes (4): BareController, MethodOnlyController, ZonedController, @nestjs/core

### Community 115 - "protocol/src/index.ts"
Cohesion: 0.06
Nodes (32): ErrorCode, errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema() (+24 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 354 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `zone-servers.spec.ts` to `main.ts`, `server/package.json`, `config.module.ts`, `log-redaction.spec.ts`, `dependencies`, `cls-middleware.ts`, `zone.decorator.spec.ts`, `zone.guard.ts`, `api-versioning.spec.ts`, `zone.guard.spec.ts`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `RedactionProbeController` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Why does `pino` connect `log-redaction.spec.ts` to `main.ts`, `dependencies`, `server/package.json`, `log-settings.e2e-spec.ts`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `server/package.json`, `ioredis@^6.0.0`, `bullmq@^6.3.15`, `jose@^6.2.12`, `@nestjs/swagger@^12.0.2`, `@nestjs/bullmq@^12.0.0`, `@nestjs/cache-manager@^12.0.1`, `cache-manager@^7.2.9`, `log-redaction.spec.ts`, `@aws-sdk/s3-request-presigner@^3.1151.0`, `helmet@^8.3.0`, `@nestjs-cls/transactional-adapter-typeorm@^2.0.1`, `@nestjs/event-emitter@^12.0.1`, `@nestjs/terminus@^12.1.0`, `pino-http`, `rxjs@^7.8.1`, `@nestjs/typeorm@^12.0.2`, `typeorm@^1.1.2`, `pg@^8.23.1`, `sharp@^0.35.5`, `@sowa-chat/protocol@workspace:*`, `@socket.io/redis-adapter@^8.3.0`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._