# Graph Report - EPIC-7-6  (2026-10-28)

## Corpus Check
- 102 files · ~16,817 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 9, .example 1)

## Summary
- 888 nodes · 1447 edges · 73 communities (42 shown, 31 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ba35f501`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- RedactionProbeController
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- server/package.json
- log-redaction.spec.ts
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
- request-id.spec.ts
- env.schema.ts
- scripts
- config.module.ts
- zone-servers.spec.ts
- file-type@^22.1.1
- log-redaction.spec.ts
- Controller
- .probe
- @nestjs/bullmq@^12.0.0
- zod-validation.spec.ts
- server-protocol.e2e-spec.ts
- main.ts
- tsconfig.build.json
- workspace-check-types.e2e-spec.ts
- ref_node_path
- nest-cli.json
- @nest-lab/throttler-storage-redis@^1.2.0
- cache-manager@^7.2.9
- server-sdk/tsconfig.json
- @nestjs/common
- @nestjs-cls/transactional-adapter-typeorm@^2.0.1
- packages-build.e2e-spec.ts
- zone.guard.spec.ts
- @nestjs/event-emitter@^12.0.1
- @nestjs/platform-express@^12.0.1
- createProbeApp
- logging.e2e-spec.ts
- socket.io@^4.8.4
- @nestjs/platform-socket.io@^12.1.3
- .constructor
- @nestjs/typeorm@^12.0.2
- rxjs@^7.8.1
- @aws-sdk/s3-request-presigner@^3.1151.0
- pino-http
- prom-client@^15.1.3
- reflect-metadata@^0.2.2
- socket.io@^4.8.4
- zod@catalog:
- @sowa-chat/protocol@workspace:*
- @socket.io/redis-adapter@^8.3.0
- typeorm@^1.1.2
- protocol/src/index.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 31 edges
2. `Zone()` - 26 edges
3. `compilerOptions` - 20 edges
4. `parseEnv()` - 14 edges
5. `scripts` - 13 edges
6. `@nestjs/config` - 13 edges
7. `JsonObjectValidator` - 13 edges
8. `rules` - 12 edges
9. `startZoneProbeApp()` - 12 edges
10. `findFreePort()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `startApp()` --calls--> `startZoneProbeApp()`  [EXTRACTED]
  apps/server/src/infra/zones/zone.guard.spec.ts → apps/server/test/support/zone-probe.ts
- `serverEnvironment()` --calls--> `findFreePort()`  [EXTRACTED]
  apps/server/test/logging.e2e-spec.ts → apps/server/test/support/e2e-server.ts
- `configureApiApp()` --calls--> `useClsMiddleware()`  [EXTRACTED]
  apps/server/src/api-app.ts → apps/server/src/infra/cls/cls-middleware.ts
- `runApi()` --calls--> `configureApiApp()`  [EXTRACTED]
  apps/server/src/main.ts → apps/server/src/api-app.ts
- `VersionedProbeController` --references--> `Zone()`  [EXTRACTED]
  apps/server/src/api-versioning.spec.ts → apps/server/src/infra/zones/zone.decorator.ts

## Import Cycles
- None detected.

## Communities (73 total, 31 thin omitted)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.11
Nodes (17): author, @aws-sdk/s3-request-presigner@^3.1151.0, bullmq@^6.3.15, file-type@^22.1.1, @nestjs/websockets@^12.1.3, pg@^8.23.1, description, license (+9 more)

### Community 7 - "log-redaction.spec.ts"
Cohesion: 0.29
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ioredis@^6.0.0"
Cohesion: 0.30
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

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
Nodes (25): dependencies, @aws-sdk/client-s3@^3.1151.0, helmet@^8.3.0, ioredis@^6.0.0, @nestjs/cache-manager@^12.0.1, nestjs-cls@^7.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1 (+17 more)

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
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 23 - "request-id.spec.ts"
Cohesion: 0.23
Nodes (8): configureApiApp(), noStore(), useSecurityHeaders(), ZoneGuard, ports, zoneOfPort(), ZonePorts, runApi()

### Community 24 - "env.schema.ts"
Cohesion: 0.09
Nodes (17): checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), logFormats, Env (+9 more)

### Community 25 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, check-types, start:api, start:api:dev, start:prod, start:worker, start:worker:dev (+5 more)

### Community 26 - "config.module.ts"
Cohesion: 0.28
Nodes (10): appConfig, compileConfigModule(), testEnv, databaseConfig, loggingConfig, parseEnv(), portsConfig, redisConfig (+2 more)

### Community 27 - "zone-servers.spec.ts"
Cohesion: 0.19
Nodes (10): probeControllers, probeControllers, ApiZone, apiZones, findZonePorts(), probeControllers, findFreePort(), startZoneProbeApp() (+2 more)

### Community 28 - "file-type@^22.1.1"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 30 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 33 - "zod-validation.spec.ts"
Cohesion: 0.33
Nodes (4): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto

### Community 34 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 35 - "main.ts"
Cohesion: 0.08
Nodes (29): ApiModule, CliModule, AppClsModule, AppConfigModule, ApiHttpModule, createStdoutDestination(), baseOptions(), createLoggerModule() (+21 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
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

### Community 43 - "@nestjs/common"
Cohesion: 0.06
Nodes (39): useClsMiddleware(), LogDestination, allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry (+31 more)

### Community 46 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 51 - "logging.e2e-spec.ts"
Cohesion: 0.06
Nodes (42): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), ApiRun (+34 more)

### Community 52 - "socket.io@^4.8.4"
Cohesion: 0.23
Nodes (6): BareController, MethodOnlyController, ZonedController, Zone(), zoneMetadataKey, @nestjs/core

### Community 115 - "protocol/src/index.ts"
Cohesion: 0.06
Nodes (31): ErrorCode, errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema() (+23 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 366 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `main.ts` to `zod-validation.spec.ts`, `server/package.json`, `@nestjs/common`, `dependencies`, `socket.io@^4.8.4`, `Zone`, `request-id.spec.ts`, `config.module.ts`, `zone-servers.spec.ts`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `RedactionProbeController` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Why does `pino` connect `@nestjs/common` to `logging.e2e-spec.ts`, `main.ts`, `dependencies`, `server/package.json`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `server/package.json`, `log-redaction.spec.ts`, `@nestjs/bullmq@^12.0.0`, `@nest-lab/throttler-storage-redis@^1.2.0`, `cache-manager@^7.2.9`, `@nestjs-cls/transactional-adapter-typeorm@^2.0.1`, `@nestjs/event-emitter@^12.0.1`, `@nestjs/platform-express@^12.0.1`, `createProbeApp`, `@nestjs/platform-socket.io@^12.1.3`, `.constructor`, `@nestjs/typeorm@^12.0.2`, `rxjs@^7.8.1`, `@aws-sdk/s3-request-presigner@^3.1151.0`, `pino-http`, `prom-client@^15.1.3`, `reflect-metadata@^0.2.2`, `socket.io@^4.8.4`, `zod@catalog:`, `@sowa-chat/protocol@workspace:*`, `@socket.io/redis-adapter@^8.3.0`, `typeorm@^1.1.2`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._