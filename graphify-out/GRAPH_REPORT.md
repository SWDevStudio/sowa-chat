# Graph Report - EPIC-7-4  (2026-10-28)

## Corpus Check
- 108 files · ~19,255 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 9, .example 1)

## Summary
- 943 nodes · 1587 edges · 76 communities (43 shown, 33 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 23 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5c85c4df`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- server-errors.spec.ts
- bot-sdk/tsconfig.json
- package.json
- Zone
- devDependencies
- server-modes.e2e-spec.ts
- dependencies
- log-settings.e2e-spec.ts
- compilerOptions
- RedactionProbeController
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
- zone.guard.spec.ts
- @nestjs/common
- env.schema.ts
- scripts
- log-redaction.spec.ts
- server-protocol.e2e-spec.ts
- request-id.spec.ts
- ZonedController
- security-headers.spec.ts
- request-id.e2e-spec.ts
- .log
- ProbeController
- log-redaction.e2e-spec.ts
- main.ts
- tsconfig.build.json
- workspace-check-types.e2e-spec.ts
- ref_node_path
- nest-cli.json
- Zone
- server-sdk/tsconfig.json
- log-level-warn.spec.ts
- @nestjs-cls/transactional-adapter-typeorm@^2.0.1
- cache-manager@^7.2.9
- ValidationProbeController
- ioredis@^6.0.0
- bullmq@^6.3.15
- @nest-lab/throttler-storage-redis@^1.2.0
- logging.e2e-spec.ts
- zone-servers.ts
- @nestjs/bullmq@^12.0.0
- @nestjs-cls/transactional@^4.0.1
- @nestjs/typeorm@^12.0.2
- rxjs@^7.8.1
- @nestjs/cache-manager@^12.0.1
- @nestjs/platform-express@^12.0.1
- @nestjs/platform-socket.io@^12.1.3
- socket.io@^4.8.4
- @socket.io/redis-adapter@^8.3.0
- zod@catalog:
- ErrorProbeController
- file-type@^22.1.1
- helmet
- pg@^8.23.1
- pino-http
- protocol/src/index.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 36 edges
2. `Zone()` - 30 edges
3. `compilerOptions` - 20 edges
4. `parseEnv()` - 14 edges
5. `startZoneProbeApp()` - 14 edges
6. `scripts` - 13 edges
7. `@nestjs/config` - 13 edges
8. `JsonObjectValidator` - 13 edges
9. `rules` - 12 edges
10. `findFreePort()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `ApiExceptionInput` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `runApi()` --calls--> `configureApiApp()`  [EXTRACTED]
  apps/server/src/main.ts → apps/server/src/api-app.ts
- `ApiException` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `startApp()` --calls--> `startZoneProbeApp()`  [EXTRACTED]
  apps/server/src/infra/zones/zone.guard.spec.ts → apps/server/test/support/zone-probe.ts
- `serverEnvironment()` --calls--> `findFreePort()`  [EXTRACTED]
  apps/server/test/logging.e2e-spec.ts → apps/server/test/support/e2e-server.ts

## Import Cycles
- None detected.

## Communities (76 total, 33 thin omitted)

### Community 0 - "server-errors.spec.ts"
Cohesion: 0.06
Nodes (33): nestjs-zod@^5.5.0, useClsMiddleware(), ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, ApiHttpModule, errorCodeByStatus (+25 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "Zone"
Cohesion: 0.13
Nodes (10): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController, MethodOnlyController, Zone(), InternalProbeController, ManagementProbeController (+2 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @aws-sdk/client-s3@^3.1151.0, @aws-sdk/s3-request-presigner@^3.1151.0, nest-commander@^3.21.0, nestjs-cls@^7.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1, @nestjs/core@^12.0.1 (+18 more)

### Community 7 - "log-settings.e2e-spec.ts"
Cohesion: 0.21
Nodes (12): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+4 more)

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
Nodes (17): author, jose@^6.2.12, @nestjs/event-emitter@^12.0.1, @nestjs/microservices@^12.1.3, @nestjs/swagger@^12.0.2, @nestjs/throttler@^6.7.1, description, license (+9 more)

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
Cohesion: 0.15
Nodes (13): ApiZone, apiZones, zoneMetadataKey, CapturedResponse, FakeRequest, guardedControllers, startApp(), unitPorts (+5 more)

### Community 23 - "@nestjs/common"
Cohesion: 0.13
Nodes (15): nestjs-pino@^5.3.1, configureApiApp(), noStore(), useSecurityHeaders(), LogDestination, findZonePorts(), probeControllers, findFreePort() (+7 more)

### Community 24 - "env.schema.ts"
Cohesion: 0.09
Nodes (27): appConfig, compileConfigModule(), testEnv, databaseConfig, checkPrettyLogFormat(), Env, EnvObject, envObjectSchema (+19 more)

### Community 25 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, check-types, start:api, start:api:dev, start:prod, start:worker, start:worker:dev (+5 more)

### Community 26 - "log-redaction.spec.ts"
Cohesion: 0.16
Nodes (13): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+5 more)

### Community 27 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 28 - "request-id.spec.ts"
Cohesion: 0.24
Nodes (8): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, ProbeService, waitForRequestEntry()

### Community 30 - "security-headers.spec.ts"
Cohesion: 0.16
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 31 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 34 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 35 - "main.ts"
Cohesion: 0.08
Nodes (28): ApiModule, CliModule, AppClsModule, AppConfigModule, createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions() (+20 more)

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

### Community 41 - "Zone"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "log-level-warn.spec.ts"
Cohesion: 0.27
Nodes (10): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+2 more)

### Community 47 - "ValidationProbeController"
Cohesion: 0.12
Nodes (6): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ValidationProbeController, ZoneProbeApp

### Community 51 - "logging.e2e-spec.ts"
Cohesion: 0.15
Nodes (14): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+6 more)

### Community 52 - "zone-servers.ts"
Cohesion: 0.24
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 115 - "protocol/src/index.ts"
Cohesion: 0.05
Nodes (32): errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema (+24 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 382 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `server-errors.spec.ts`, `Zone`, `main.ts`, `dependencies`, `log-level-warn.spec.ts`, `server/package.json`, `ValidationProbeController`, `zone-servers.ts`, `zone.guard.spec.ts`, `env.schema.ts`, `log-redaction.spec.ts`, `request-id.spec.ts`, `security-headers.spec.ts`?**
  _High betweenness centrality (0.170) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `server-errors.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0597567424643046 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `server-errors.spec.ts`, `ErrorProbeController`, `Zone`, `ValidationProbeController`, `zone.guard.spec.ts`, `@nestjs/common`, `ZonedController`, `security-headers.spec.ts`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `pino` connect `log-level-warn.spec.ts` to `main.ts`, `dependencies`, `log-settings.e2e-spec.ts`, `server/package.json`, `@nestjs/common`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Should `Zone` be split into smaller, more focused modules?**
  _Cohesion score 0.13043478260869565 - nodes in this community are weakly interconnected._