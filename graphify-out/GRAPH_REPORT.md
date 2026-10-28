# Graph Report - EPIC-7-5  (2026-10-28)

## Corpus Check
- 109 files · ~19,982 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 9, .example 1)

## Summary
- 964 nodes · 1628 edges · 83 communities (52 shown, 31 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9f581513`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- http-error.filter.spec.ts
- bot-sdk/tsconfig.json
- package.json
- InternalProbeController
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
- security-headers.spec.ts
- zone-servers.spec.ts
- env.schema.ts
- scripts
- zod-serialization.spec.ts
- server-protocol.e2e-spec.ts
- NeutralProbeController
- ZonedController
- Controller
- request-id.e2e-spec.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- nest-commander@^3.21.0
- log-redaction.e2e-spec.ts
- main.ts
- tsconfig.build.json
- workspace-check-types.e2e-spec.ts
- ref_node_path
- nest-cli.json
- @nestjs/event-emitter@^12.0.1
- Zone
- server-sdk/tsconfig.json
- unit-probe.ts
- @nestjs/terminus@^12.1.0
- cache-manager@^7.2.9
- ValidationProbeController
- ioredis@^6.0.0
- bullmq@^6.3.15
- server-errors.spec.ts
- logging.e2e-spec.ts
- @nestjs/websockets@^12.1.3
- @nestjs/bullmq@^12.0.0
- @nestjs-cls/transactional@^4.0.1
- protocol/src/index.ts
- sharp@^0.35.5
- @nestjs/cache-manager@^12.0.1
- @sowa-chat/protocol@workspace:*
- JsonObjectValidator
- @nestjs/common
- zone.guard.spec.ts
- ServerErrorsProbeController
- errors.spec.ts
- @socket.io/redis-adapter@^8.3.0
- api-app.ts
- error-response.ts
- ErrorProbeController
- file-type@^22.1.1
- zod-serialization.spec.ts
- zod-validation.spec.ts
- jose@^6.2.12
- @nestjs/platform-express@^12.0.1
- @nestjs/throttler@^6.7.1
- pino-http
- typeorm@^1.1.2
- json-object-limits.spec.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 37 edges
2. `Zone()` - 32 edges
3. `compilerOptions` - 20 edges
4. `startZoneProbeApp()` - 15 edges
5. `parseEnv()` - 14 edges
6. `scripts` - 13 edges
7. `@nestjs/config` - 13 edges
8. `JsonObjectValidator` - 13 edges
9. `rules` - 12 edges
10. `findFreePort()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `ApiExceptionInput` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `ApiException` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `createRedactionProbeApp()` --calls--> `createProbeApp()`  [EXTRACTED]
  apps/server/src/infra/logging/log-redaction.spec.ts → apps/server/test/support/unit-probe.ts
- `serverEnvironment()` --calls--> `findFreePort()`  [EXTRACTED]
  apps/server/test/logging.e2e-spec.ts → apps/server/test/support/e2e-server.ts
- `configureApiApp()` --calls--> `useClsMiddleware()`  [EXTRACTED]
  apps/server/src/api-app.ts → apps/server/src/infra/cls/cls-middleware.ts

## Import Cycles
- None detected.

## Communities (83 total, 31 thin omitted)

### Community 0 - "http-error.filter.spec.ts"
Cohesion: 0.12
Nodes (11): useClsMiddleware(), ApiHttpModule, HttpErrorFilter, requestIdOf(), responseZodErrorOf(), knownKeys, ProbeBodyDto, echoRequestId() (+3 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, @aws-sdk/client-s3@^3.1151.0, helmet@^8.3.0, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1, @nestjs/core@^12.0.1 (+17 more)

### Community 7 - "log-settings.e2e-spec.ts"
Cohesion: 0.21
Nodes (12): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+4 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "RedactionProbeController"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

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
Nodes (17): author, @nestjs/microservices@^12.1.3, @nestjs/platform-socket.io@^12.1.3, @nestjs/swagger@^12.0.2, @nestjs/typeorm@^12.0.2, prom-client@^15.1.3, description, license (+9 more)

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

### Community 22 - "security-headers.spec.ts"
Cohesion: 0.22
Nodes (10): probeControllers, probeControllers, ApiZone, apiZones, zoneMetadataKey, ports, zoneOfPort(), ZonePorts (+2 more)

### Community 23 - "zone-servers.spec.ts"
Cohesion: 0.16
Nodes (9): LogDestination, findZonePorts(), probeControllers, findFreePort(), ProbeAppOptions, stubTestEnv(), testEnv, nestjs-pino (+1 more)

### Community 24 - "env.schema.ts"
Cohesion: 0.09
Nodes (17): checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), logFormats, Env (+9 more)

### Community 25 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, check-types, start:api, start:api:dev, start:prod, start:worker, start:worker:dev (+5 more)

### Community 27 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 28 - "NeutralProbeController"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 29 - "ZonedController"
Cohesion: 0.27
Nodes (4): BareController, MethodOnlyController, ZonedController, Zone()

### Community 30 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 31 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 34 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 35 - "main.ts"
Cohesion: 0.07
Nodes (38): nestjs-cls@^7.0.1, ApiModule, CliModule, AppClsModule, appConfig, AppConfigModule, compileConfigModule(), testEnv (+30 more)

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

### Community 43 - "unit-probe.ts"
Cohesion: 0.08
Nodes (20): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+12 more)

### Community 50 - "server-errors.spec.ts"
Cohesion: 0.18
Nodes (12): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, internalErrorMessage, ApiExceptionInput, entries(), errorEntriesOf() (+4 more)

### Community 51 - "logging.e2e-spec.ts"
Cohesion: 0.15
Nodes (14): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+6 more)

### Community 55 - "protocol/src/index.ts"
Cohesion: 0.23
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 59 - "JsonObjectValidator"
Cohesion: 0.30
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 60 - "@nestjs/common"
Cohesion: 0.23
Nodes (5): startListening(), stopListening(), ZoneServers, ZonesModule, @nestjs/common

### Community 61 - "zone.guard.spec.ts"
Cohesion: 0.18
Nodes (6): CapturedResponse, FakeRequest, guardedControllers, startApp(), unitPorts, startZoneProbeApp()

### Community 63 - "errors.spec.ts"
Cohesion: 0.20
Nodes (5): errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody

### Community 65 - "api-app.ts"
Cohesion: 0.29
Nodes (5): configureApiApp(), noStore(), useSecurityHeaders(), ZoneGuard, runApi()

### Community 66 - "error-response.ts"
Cohesion: 0.40
Nodes (8): errorCodeByStatus, errorCodeOfStatus(), apiErrorResponse(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse(), errorCodes

### Community 69 - "zod-serialization.spec.ts"
Cohesion: 0.22
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, redirectLogsTo()

### Community 70 - "zod-validation.spec.ts"
Cohesion: 0.33
Nodes (4): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto

### Community 115 - "json-object-limits.spec.ts"
Cohesion: 0.10
Nodes (16): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+8 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 389 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `http-error.filter.spec.ts`, `api-app.ts`, `error-response.ts`, `main.ts`, `zod-serialization.spec.ts`, `dependencies`, `zod-validation.spec.ts`, `RedactionProbeController`, `unit-probe.ts`, `server/package.json`, `server-errors.spec.ts`, `security-headers.spec.ts`, `zone-servers.spec.ts`, `zone.guard.spec.ts`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `http-error.filter.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `ZonedController` to `http-error.filter.spec.ts`, `ErrorProbeController`, `InternalProbeController`, `zod-serialization.spec.ts`, `zod-validation.spec.ts`, `Zone`, `ValidationProbeController`, `server-errors.spec.ts`, `security-headers.spec.ts`, `zone-servers.spec.ts`, `ServerErrorsProbeController`, `zod-serialization.spec.ts`, `NeutralProbeController`, `zone.guard.spec.ts`, `Controller`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `pino` connect `main.ts` to `dependencies`, `log-settings.e2e-spec.ts`, `unit-probe.ts`, `server/package.json`, `zone-servers.spec.ts`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._