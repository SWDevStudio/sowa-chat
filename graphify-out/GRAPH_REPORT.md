# Graph Report - EPIC-7-3  (2026-10-28)

## Corpus Check
- 106 files · ~18,125 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 9, .example 1)

## Summary
- 917 nodes · 1518 edges · 73 communities (42 shown, 31 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f8a33b98`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- http-error.filter.spec.ts
- bot-sdk/tsconfig.json
- package.json
- InternalProbeController
- devDependencies
- server-modes.e2e-spec.ts
- server/package.json
- log-settings.e2e-spec.ts
- compilerOptions
- RedactionProbeController
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
- zone.guard.spec.ts
- api-app.ts
- env.schema.ts
- scripts
- config.module.ts
- server-protocol.e2e-spec.ts
- api-versioning.spec.ts
- ZonedController
- Zone
- request-id.e2e-spec.ts
- @nestjs/bullmq@^12.0.0
- zod-validation.spec.ts
- log-redaction.e2e-spec.ts
- @nestjs/common
- tsconfig.build.json
- workspace-check-types.e2e-spec.ts
- ref_node_path
- nest-cli.json
- @aws-sdk/s3-request-presigner@^3.1151.0
- cache-manager@^7.2.9
- server-sdk/tsconfig.json
- log-redaction.spec.ts
- @nestjs-cls/transactional-adapter-typeorm@^2.0.1
- nest-commander@^3.21.0
- ValidationProbeController
- @nestjs/event-emitter@^12.0.1
- bullmq@^6.3.15
- @nest-lab/throttler-storage-redis@^1.2.0
- logging.e2e-spec.ts
- security-headers.spec.ts
- ioredis@^6.0.0
- @nestjs/terminus@^12.1.0
- @nestjs/typeorm@^12.0.2
- rxjs@^7.8.1
- @nestjs/cache-manager@^12.0.1
- @nestjs/microservices@^12.1.3
- @nestjs/platform-socket.io@^12.1.3
- @nestjs/throttler@^6.7.1
- @nestjs/websockets@^12.1.3
- prom-client@^15.1.3
- @sowa-chat/protocol@workspace:*
- @socket.io/redis-adapter@^8.3.0
- zod@catalog:
- protocol/src/index.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 34 edges
2. `Zone()` - 28 edges
3. `compilerOptions` - 20 edges
4. `parseEnv()` - 14 edges
5. `scripts` - 13 edges
6. `@nestjs/config` - 13 edges
7. `startZoneProbeApp()` - 13 edges
8. `JsonObjectValidator` - 13 edges
9. `rules` - 12 edges
10. `findFreePort()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `findZonePorts()` --calls--> `findFreePort()`  [EXTRACTED]
  apps/server/src/infra/zones/zone-servers.spec.ts → apps/server/test/support/e2e-server.ts
- `startApp()` --calls--> `startZoneProbeApp()`  [EXTRACTED]
  apps/server/src/infra/zones/zone.guard.spec.ts → apps/server/test/support/zone-probe.ts
- `serverEnvironment()` --calls--> `findFreePort()`  [EXTRACTED]
  apps/server/test/logging.e2e-spec.ts → apps/server/test/support/e2e-server.ts
- `configureApiApp()` --calls--> `useClsMiddleware()`  [EXTRACTED]
  apps/server/src/api-app.ts → apps/server/src/infra/cls/cls-middleware.ts
- `runApi()` --calls--> `configureApiApp()`  [EXTRACTED]
  apps/server/src/main.ts → apps/server/src/api-app.ts

## Import Cycles
- None detected.

## Communities (73 total, 31 thin omitted)

### Community 0 - "http-error.filter.spec.ts"
Cohesion: 0.08
Nodes (19): nestjs-zod@^5.5.0, useClsMiddleware(), errorCodeByStatus, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse() (+11 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "InternalProbeController"
Cohesion: 0.14
Nodes (8): @nestjs/testing@^12.0.1, findZonePorts(), InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, @nestjs/testing

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (32): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21, supertest@^7.0.0 (+24 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.12
Nodes (15): author, @nestjs-cls/transactional@^4.0.1, @nestjs/swagger@^12.0.2, pg@^8.23.1, reflect-metadata@^0.2.2, description, license, name (+7 more)

### Community 7 - "log-settings.e2e-spec.ts"
Cohesion: 0.16
Nodes (15): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+7 more)

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
Nodes (24): dependencies, @aws-sdk/client-s3@^3.1151.0, file-type@^22.1.1, helmet@^8.3.0, jose@^6.2.12, nestjs-cls@^7.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1 (+16 more)

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

### Community 22 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (7): CapturedResponse, FakeRequest, guardedControllers, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 23 - "api-app.ts"
Cohesion: 0.21
Nodes (9): @nestjs/core@^12.0.1, configureApiApp(), noStore(), useSecurityHeaders(), zoneMetadataKey, ZoneGuard, zoneOfPort(), runApi() (+1 more)

### Community 24 - "env.schema.ts"
Cohesion: 0.09
Nodes (17): checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), logFormats, Env (+9 more)

### Community 25 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, check-types, start:api, start:api:dev, start:prod, start:worker, start:worker:dev (+5 more)

### Community 26 - "config.module.ts"
Cohesion: 0.33
Nodes (10): appConfig, compileConfigModule(), testEnv, databaseConfig, loggingConfig, parseEnv(), portsConfig, redisConfig (+2 more)

### Community 27 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 28 - "api-versioning.spec.ts"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 30 - "Zone"
Cohesion: 0.18
Nodes (8): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController, MethodOnlyController, Zone(), MixedZoneController

### Community 31 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 33 - "zod-validation.spec.ts"
Cohesion: 0.33
Nodes (4): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto

### Community 34 - "log-redaction.e2e-spec.ts"
Cohesion: 0.31
Nodes (8): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), RunningServer

### Community 35 - "@nestjs/common"
Cohesion: 0.06
Nodes (32): ApiModule, CliModule, AppClsModule, AppConfigModule, ApiHttpModule, createStdoutDestination(), baseOptions(), createLoggerModule() (+24 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.24
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 38 - "ref_node_path"
Cohesion: 0.14
Nodes (11): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask (+3 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "log-redaction.spec.ts"
Cohesion: 0.05
Nodes (37): LogDestination, allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService() (+29 more)

### Community 51 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 52 - "security-headers.spec.ts"
Cohesion: 0.27
Nodes (8): probeControllers, probeControllers, ApiZone, apiZones, ports, ZonePorts, startZoneProbeApp(), ZoneProbeApp

### Community 115 - "protocol/src/index.ts"
Cohesion: 0.05
Nodes (33): ErrorCode, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema(), EventEnvelope (+25 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 376 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `http-error.filter.spec.ts`, `zod-validation.spec.ts`, `InternalProbeController`, `server/package.json`, `log-redaction.spec.ts`, `dependencies`, `security-headers.spec.ts`, `zone.guard.spec.ts`, `api-app.ts`, `config.module.ts`?**
  _High betweenness centrality (0.164) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `http-error.filter.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07926829268292683 - nodes in this community are weakly interconnected._
- **Why does `pino` connect `log-redaction.spec.ts` to `@nestjs/common`, `dependencies`, `server/package.json`, `log-settings.e2e-spec.ts`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `http-error.filter.spec.ts`, `zod-validation.spec.ts`, `InternalProbeController`, `ValidationProbeController`, `security-headers.spec.ts`, `zone.guard.spec.ts`, `api-app.ts`, `api-versioning.spec.ts`, `ZonedController`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Should `InternalProbeController` be split into smaller, more focused modules?**
  _Cohesion score 0.14035087719298245 - nodes in this community are weakly interconnected._