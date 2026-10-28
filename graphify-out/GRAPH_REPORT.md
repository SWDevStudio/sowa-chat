# Graph Report - EPIC-7-8  (2026-10-28)

## Corpus Check
- 111 files · ~20,695 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 9, .example 1)

## Summary
- 988 nodes · 1686 edges · 86 communities (51 shown, 35 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `401e9ca9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- protocol/src/index.ts
- bot-sdk/tsconfig.json
- package.json
- api-versioning.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- dependencies
- log-settings.e2e-spec.ts
- compilerOptions
- Zone
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
- @nestjs/common
- unit-probe.ts
- env.schema.ts
- scripts
- log-redaction.spec.ts
- server-protocol.e2e-spec.ts
- ServerErrorsProbeController
- MixedZoneController
- security-headers.spec.ts
- request-id.e2e-spec.ts
- Zone
- ref_node_path
- log-redaction.e2e-spec.ts
- main.ts
- tsconfig.build.json
- workspace-check-types.e2e-spec.ts
- api-app.ts
- nest-cli.json
- ValidationProbeController
- RedactionProbeController
- server-sdk/tsconfig.json
- log-level-warn.spec.ts
- log-redaction.spec.ts
- cache-manager@^7.2.9
- zod-validation.spec.ts
- @nestjs/event-emitter@^12.0.1
- json-object-limits.spec.ts
- bullmq@^6.3.15
- logging.e2e-spec.ts
- request-id.spec.ts
- @nestjs/bullmq@^12.0.0
- @nestjs-cls/transactional@^4.0.1
- ioredis@^6.0.0
- .probe
- cls-middleware.ts
- @sowa-chat/protocol@workspace:*
- nest-commander@^3.21.0
- @nestjs/websockets@^12.1.3
- typeorm@^1.1.2
- @nest-lab/throttler-storage-redis@^1.2.0
- @nestjs-cls/transactional-adapter-typeorm@^2.0.1
- error-response.ts
- ErrorProbeController
- @nestjs/microservices@^12.1.3
- @nestjs/platform-socket.io@^12.1.3
- @nestjs/swagger
- jose@^6.2.12
- @nestjs/platform-express@^12.0.1
- pino-http
- pino-http
- typeorm@^1.1.2
- prom-client@^15.1.3
- socket.io@^4.8.4
- zod@catalog:
- json-object-limits.spec.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 39 edges
2. `Zone()` - 36 edges
3. `compilerOptions` - 20 edges
4. `startZoneProbeApp()` - 16 edges
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

## Communities (86 total, 35 thin omitted)

### Community 0 - "protocol/src/index.ts"
Cohesion: 0.16
Nodes (8): internalErrorMessage, HttpErrorFilter, requestIdOf(), responseZodErrorOf(), knownKeys, ProbeBodyDto, requestIdHeader, nestjs-zod

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "api-versioning.spec.ts"
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
Nodes (26): dependencies, @aws-sdk/client-s3@^3.1151.0, @aws-sdk/s3-request-presigner@^3.1151.0, bullmq@^6.3.15, file-type@^22.1.1, helmet@^8.3.0, nestjs-cls@^7.0.1, @nestjs/common@^12.0.1 (+18 more)

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
Nodes (17): author, @nestjs/cache-manager@^12.0.1, @nestjs/typeorm@^12.0.2, @nestjs/websockets@^12.1.3, pg@^8.23.1, reflect-metadata@^0.2.2, description, license (+9 more)

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

### Community 22 - "@nestjs/common"
Cohesion: 0.06
Nodes (38): configureApiApp(), probeControllers, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes (+30 more)

### Community 23 - "unit-probe.ts"
Cohesion: 0.25
Nodes (7): LogDestination, createProbeApp(), ProbeAppOptions, redirectLogsTo(), stubTestEnv(), testEnv, nestjs-pino

### Community 24 - "env.schema.ts"
Cohesion: 0.09
Nodes (27): appConfig, compileConfigModule(), testEnv, databaseConfig, checkPrettyLogFormat(), Env, EnvObject, envObjectSchema (+19 more)

### Community 25 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, check-types, start:api, start:api:dev, start:prod, start:worker, start:worker:dev (+5 more)

### Community 26 - "log-redaction.spec.ts"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 27 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 28 - "ServerErrorsProbeController"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 30 - "security-headers.spec.ts"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 31 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 32 - "Zone"
Cohesion: 0.19
Nodes (11): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+3 more)

### Community 34 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 35 - "main.ts"
Cohesion: 0.08
Nodes (29): ApiModule, CliModule, AppClsModule, AppConfigModule, ApiHttpModule, createStdoutDestination(), baseOptions(), createLoggerModule() (+21 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.24
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 38 - "api-app.ts"
Cohesion: 0.14
Nodes (11): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask (+3 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 41 - "RedactionProbeController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "log-level-warn.spec.ts"
Cohesion: 0.22
Nodes (10): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+2 more)

### Community 45 - "log-redaction.spec.ts"
Cohesion: 0.20
Nodes (10): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+2 more)

### Community 49 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 50 - "bullmq@^6.3.15"
Cohesion: 0.20
Nodes (11): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith() (+3 more)

### Community 51 - "logging.e2e-spec.ts"
Cohesion: 0.15
Nodes (14): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+6 more)

### Community 52 - "request-id.spec.ts"
Cohesion: 0.31
Nodes (8): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, waitForRequestEntry()

### Community 55 - "ioredis@^6.0.0"
Cohesion: 0.23
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 57 - "cls-middleware.ts"
Cohesion: 0.48
Nodes (3): useClsMiddleware(), echoRequestId(), resolveRequestId()

### Community 59 - "nest-commander@^3.21.0"
Cohesion: 0.30
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 63 - "typeorm@^1.1.2"
Cohesion: 0.20
Nodes (5): errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody

### Community 66 - "error-response.ts"
Cohesion: 0.40
Nodes (8): errorCodeByStatus, errorCodeOfStatus(), apiErrorResponse(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse(), errorCodes

### Community 115 - "json-object-limits.spec.ts"
Cohesion: 0.15
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, jsonObjectSchema, Violation, JsonObject, JsonObjectLimits (+1 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 396 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `Zone`, `protocol/src/index.ts`, `error-response.ts`, `main.ts`, `dependencies`, `log-level-warn.spec.ts`, `server/package.json`, `log-redaction.spec.ts`, `bullmq@^6.3.15`, `request-id.spec.ts`, `unit-probe.ts`, `env.schema.ts`, `cls-middleware.ts`, `log-redaction.spec.ts`?**
  _High betweenness centrality (0.174) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `protocol/src/index.ts`, `ErrorProbeController`, `api-versioning.spec.ts`, `RedactionProbeController`, `zod-validation.spec.ts`, `bullmq@^6.3.15`, `@nestjs/common`, `@nestjs/websockets@^12.1.3`, `log-redaction.spec.ts`, `ServerErrorsProbeController`, `MixedZoneController`, `security-headers.spec.ts`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Why does `pino` connect `log-level-warn.spec.ts` to `main.ts`, `dependencies`, `log-settings.e2e-spec.ts`, `server/package.json`, `unit-probe.ts`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Should `server-modes.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13071895424836602 - nodes in this community are weakly interconnected._