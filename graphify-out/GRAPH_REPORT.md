# Graph Report - EPIC-7-review  (2026-10-28)

## Corpus Check
- 114 files · ~21,142 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 9, .example 1)

## Summary
- 1005 nodes · 1721 edges · 78 communities (48 shown, 30 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 21 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bfe8b8e7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- server-errors.spec.ts
- bot-sdk/tsconfig.json
- package.json
- zone-servers.spec.ts
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
- zone.guard.spec.ts
- env.schema.ts
- scripts
- zod-serialization.spec.ts
- server-protocol.e2e-spec.ts
- api-versioning.spec.ts
- @nestjs/common
- Zone
- request-id.e2e-spec.ts
- api-docs.spec.ts
- api-app.ts
- log-redaction.e2e-spec.ts
- main.ts
- tsconfig.build.json
- workspace-check-types.e2e-spec.ts
- ref_node_path
- nest-cli.json
- unit-probe.ts
- MixedZoneController
- server-sdk/tsconfig.json
- log-level-warn.spec.ts
- BodyProbeController
- log-redaction.spec.ts
- ValidationProbeController
- request-id.spec.ts
- .probe
- logging.e2e-spec.ts
- @nestjs-cls/transactional@^4.0.1
- @nestjs/bullmq@^12.0.0
- zone-servers.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- bullmq@^6.3.15
- cache-manager@^7.2.9
- @nestjs/event-emitter@^12.0.1
- pg@^8.23.1
- nest-commander@^3.21.0
- socket.io@^4.8.4
- jose@^6.2.12
- @nestjs/cache-manager@^12.0.1
- nestjs-cls
- @nestjs-cls/transactional-adapter-typeorm@^2.0.1
- ErrorProbeController
- @nestjs/websockets@^12.1.3
- sharp@^0.35.5
- @sowa-chat/protocol@workspace:*
- typeorm@^1.1.2
- protocol/src/index.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 41 edges
2. `Zone()` - 38 edges
3. `compilerOptions` - 20 edges
4. `startZoneProbeApp()` - 17 edges
5. `parseEnv()` - 14 edges
6. `scripts` - 13 edges
7. `@nestjs/config` - 13 edges
8. `JsonObjectValidator` - 13 edges
9. `rules` - 12 edges
10. `ApiZone` - 11 edges

## Surprising Connections (you probably didn't know these)
- `ApiExceptionInput` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `runApi()` --calls--> `configureApiApp()`  [EXTRACTED]
  apps/server/src/main.ts → apps/server/src/api-app.ts
- `ApiException` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `createRedactionProbeApp()` --calls--> `createProbeApp()`  [EXTRACTED]
  apps/server/src/infra/logging/log-redaction.spec.ts → apps/server/test/support/unit-probe.ts
- `createRequestIdProbeApp()` --calls--> `createProbeApp()`  [EXTRACTED]
  apps/server/src/infra/request-id/request-id.spec.ts → apps/server/test/support/unit-probe.ts

## Import Cycles
- None detected.

## Communities (78 total, 30 thin omitted)

### Community 0 - "server-errors.spec.ts"
Cohesion: 0.05
Nodes (37): useClsMiddleware(), ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, ApiHttpModule, errorCodeByStatus, errorCodeOfStatus() (+29 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "zone-servers.spec.ts"
Cohesion: 0.16
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, @nestjs/testing

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, helmet@^8.3.0, ioredis@^6.0.0, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1, @nestjs/core@^12.0.1, @nestjs/microservices@^12.1.3 (+21 more)

### Community 7 - "log-settings.e2e-spec.ts"
Cohesion: 0.15
Nodes (17): findZonePorts(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+9 more)

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
Cohesion: 0.10
Nodes (19): author, @aws-sdk/client-s3@^3.1151.0, file-type@^22.1.1, @nestjs/platform-socket.io@^12.1.3, @nestjs/throttler@^6.7.1, prom-client@^15.1.3, reflect-metadata@^0.2.2, description (+11 more)

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
Cohesion: 0.23
Nodes (11): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), zonePathPrefixes, probeControllers, ApiZone, apiZones (+3 more)

### Community 23 - "zone.guard.spec.ts"
Cohesion: 0.10
Nodes (11): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, CapturedResponse, FakeRequest, guardedControllers, startApp() (+3 more)

### Community 24 - "env.schema.ts"
Cohesion: 0.09
Nodes (17): checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), logFormats, Env (+9 more)

### Community 25 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, check-types, start:api, start:api:dev, start:prod, start:worker, start:worker:dev (+5 more)

### Community 26 - "zod-serialization.spec.ts"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 27 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 28 - "api-versioning.spec.ts"
Cohesion: 0.25
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 29 - "@nestjs/common"
Cohesion: 0.43
Nodes (4): MethodOnlyController, zoneMetadataKey, @nestjs/common, @nestjs/core

### Community 30 - "Zone"
Cohesion: 0.16
Nodes (8): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController, BareController, ZonedController, Zone()

### Community 31 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 32 - "api-docs.spec.ts"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 33 - "api-app.ts"
Cohesion: 0.19
Nodes (11): configureApiApp(), setupApiDocs(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore() (+3 more)

### Community 34 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 35 - "main.ts"
Cohesion: 0.07
Nodes (37): ApiModule, CliModule, AppClsModule, appConfig, AppConfigModule, compileConfigModule(), testEnv, databaseConfig (+29 more)

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

### Community 40 - "unit-probe.ts"
Cohesion: 0.23
Nodes (8): nestjs-pino@^5.3.1, LogDestination, createProbeApp(), ProbeAppOptions, redirectLogsTo(), stubTestEnv(), testEnv, nestjs-pino

### Community 41 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "log-level-warn.spec.ts"
Cohesion: 0.22
Nodes (10): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+2 more)

### Community 46 - "log-redaction.spec.ts"
Cohesion: 0.20
Nodes (10): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+2 more)

### Community 48 - "request-id.spec.ts"
Cohesion: 0.31
Nodes (8): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, waitForRequestEntry()

### Community 51 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, runToExit() (+3 more)

### Community 54 - "zone-servers.ts"
Cohesion: 0.31
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 115 - "protocol/src/index.ts"
Cohesion: 0.06
Nodes (27): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, defaultLimits, isAccepted() (+19 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 406 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `server-errors.spec.ts`, `api-app.ts`, `api-docs.spec.ts`, `main.ts`, `zone-servers.spec.ts`, `dependencies`, `unit-probe.ts`, `log-level-warn.spec.ts`, `server/package.json`, `log-redaction.spec.ts`, `request-id.spec.ts`, `security-headers.spec.ts`, `zone.guard.spec.ts`, `zone-servers.ts`, `zod-serialization.spec.ts`, `api-versioning.spec.ts`?**
  _High betweenness centrality (0.170) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `server-errors.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05359937402190924 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `api-docs.spec.ts`, `server-errors.spec.ts`, `ErrorProbeController`, `zone-servers.spec.ts`, `MixedZoneController`, `BodyProbeController`, `ValidationProbeController`, `security-headers.spec.ts`, `zone.guard.spec.ts`, `zod-serialization.spec.ts`, `api-versioning.spec.ts`, `@nestjs/common`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `pino` connect `log-level-warn.spec.ts` to `main.ts`, `dependencies`, `log-settings.e2e-spec.ts`, `unit-probe.ts`, `server/package.json`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._