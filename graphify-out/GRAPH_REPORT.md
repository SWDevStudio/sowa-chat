# Graph Report - EPIC-8-1  (2026-10-28)

## Corpus Check
- 158 files · ~27,678 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1205 nodes · 2216 edges · 98 communities (63 shown, 35 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dd6db77e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database.module.ts
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- server/package.json
- api-app.ts
- compilerOptions
- ref_node_path
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
- migrate-mode.e2e-spec.ts
- @nestjs/common
- env.schema.ts
- scripts
- json-object-schema.ts
- logging.e2e-spec.ts
- log-redaction.e2e-spec.ts
- provided-context.d.ts
- request-id.e2e-spec.ts
- server-protocol.e2e-spec.ts
- request-id.spec.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- database-connection.e2e-spec.ts
- packages-build.e2e-spec.ts
- tsconfig.build.json
- file-type@^22.1.1
- unit-probe.ts
- nest-cli.json
- configureApiApp
- workspace-check-types.e2e-spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- api.module.ts
- zod-validation.spec.ts
- main.ts
- transactions.e2e-spec.ts
- domain-event-bus.spec.ts
- ioredis@^6.0.0
- log-settings.e2e-spec.ts
- @nestjs/websockets@^12.1.3
- log-redaction.spec.ts
- server-errors.spec.ts
- migrate-mode.e2e-spec.ts
- JsonObjectValidator
- log-redaction.spec.ts
- worker.module.ts
- typeorm
- Controller
- zone.guard.spec.ts
- MixedZoneController
- api.module.ts
- InternalProbeController
- zone-servers.spec.ts
- api-versioning.spec.ts
- Zone
- ErrorProbeController
- api-docs.spec.ts
- .probe
- zone.decorator.ts
- ZonedController
- @nestjs/common
- BodyProbeController
- nest-commander@^3.21.0
- @aws-sdk/client-s3@^3.1151.0
- domain-event-bus.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- @nestjs/cache-manager@^12.0.1
- bullmq@^6.3.15
- prom-client@^15.1.3
- @socket.io/redis-adapter@^8.3.0
- @nestjs/cache-manager@^12.0.1
- sharp@^0.35.5
- @nestjs/platform-socket.io@^12.1.3
- @nestjs/throttler@^6.7.1
- pg
- @socket.io/redis-adapter@^8.3.0
- typescript@catalog:
- json-object-limits.spec.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 54 edges
2. `Zone()` - 38 edges
3. `compilerOptions` - 20 edges
4. `typeorm` - 19 edges
5. `startZoneProbeApp()` - 18 edges
6. `findFreePort()` - 17 edges
7. `scripts` - 16 edges
8. `AuditLogEntry` - 16 edges
9. `Project` - 16 edges
10. `@nestjs/config` - 15 edges

## Surprising Connections (you probably didn't know these)
- `ApiExceptionInput` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `runApi()` --calls--> `configureApiApp()`  [EXTRACTED]
  apps/server/src/main.ts → apps/server/src/api-app.ts
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (98 total, 35 thin omitted)

### Community 0 - "database.module.ts"
Cohesion: 0.10
Nodes (17): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createTypeOrmModule(), getTypeOrmModule(), typeOrmModules, createDataSourceOptions() (+9 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.24
Nodes (9): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+1 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.11
Nodes (17): author, ioredis@^6.0.0, @nestjs/microservices@^12.1.3, @nestjs/swagger@^12.0.2, prom-client@^15.1.3, reflect-metadata@^0.2.2, description, license (+9 more)

### Community 7 - "api-app.ts"
Cohesion: 0.08
Nodes (19): checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange(), logFormats (+11 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.10
Nodes (14): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, builtFiles, CommandResult, entriesByPackage, plannedBuildTasks() (+6 more)

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
Nodes (25): dependencies, cache-manager@^7.2.9, nest-commander@^3.21.0, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/bullmq@^12.0.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1 (+17 more)

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

### Community 22 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.14
Nodes (14): ApiHttpModule, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter (+6 more)

### Community 23 - "@nestjs/common"
Cohesion: 0.13
Nodes (9): probeControllers, probeControllers, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, zoneMetadataKey, ZoneProbeApp (+1 more)

### Community 24 - "env.schema.ts"
Cohesion: 0.36
Nodes (7): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, waitForRequestEntry()

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "json-object-schema.ts"
Cohesion: 0.12
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, jsonObjectSchema, Violation, JsonObjectLimits, JsonValue (+1 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.22
Nodes (10): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, waitForHttpStatus() (+2 more)

### Community 28 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 32 - "request-id.spec.ts"
Cohesion: 0.19
Nodes (13): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+5 more)

### Community 33 - "@aws-sdk/s3-request-presigner@^3.1151.0"
Cohesion: 0.22
Nodes (4): PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 34 - "database-connection.e2e-spec.ts"
Cohesion: 0.16
Nodes (13): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), serverEnvironment() (+5 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "unit-probe.ts"
Cohesion: 0.18
Nodes (11): nestjs-pino@^5.3.1, LogDestination, createRedactionProbeApp(), createRequestIdProbeApp(), createProbeApp(), ProbeAppOptions, redirectLogsTo(), stubTestEnv() (+3 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "configureApiApp"
Cohesion: 0.17
Nodes (13): configureApiApp(), useClsMiddleware(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore() (+5 more)

### Community 41 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "zod-serialization.spec.ts"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 45 - "api.module.ts"
Cohesion: 0.18
Nodes (8): database, loadDataSource(), databaseEntities, AppClsModule, AppConfigModule, DatabaseModule, ZonesModule, TelemetryModule

### Community 47 - "main.ts"
Cohesion: 0.15
Nodes (14): ApiModule, CliModule, createContext(), mode, runApi(), runCli(), runMigrate(), runners (+6 more)

### Community 48 - "transactions.e2e-spec.ts"
Cohesion: 0.05
Nodes (23): ActorKind, actorKinds, AuditLogEntry, AuditLogRepository, NewAuditLogEntry, Project, ProjectsModule, ProjectsRepository (+15 more)

### Community 49 - "domain-event-bus.spec.ts"
Cohesion: 0.29
Nodes (7): happened, TestListener, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 50 - "ioredis@^6.0.0"
Cohesion: 0.12
Nodes (18): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ApiExceptionInput, entries(), errorEntriesOf() (+10 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.19
Nodes (13): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+5 more)

### Community 54 - "server-errors.spec.ts"
Cohesion: 0.23
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 55 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.23
Nodes (9): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, withClient() (+1 more)

### Community 57 - "log-redaction.spec.ts"
Cohesion: 0.22
Nodes (9): allOutput(), CapturedLogs, fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields, secretValueOf() (+1 more)

### Community 59 - "typeorm"
Cohesion: 0.26
Nodes (9): createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions(), redactPaths, sensitiveFields, sensitiveHeaders (+1 more)

### Community 60 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 61 - "zone.guard.spec.ts"
Cohesion: 0.17
Nodes (6): CapturedResponse, FakeRequest, guardedControllers, startApp(), unitPorts, @nestjs/core

### Community 62 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 63 - "api.module.ts"
Cohesion: 0.29
Nodes (4): ApiZone, startListening(), stopListening(), ZoneServers

### Community 64 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 65 - "zone-servers.spec.ts"
Cohesion: 0.31
Nodes (4): probeControllers, withOfflineDatabase(), startZoneProbeApp(), @nestjs/testing

### Community 66 - "api-versioning.spec.ts"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 67 - "Zone"
Cohesion: 0.26
Nodes (5): InternalDocsProbeController, OperatorDocsProbeController, PublicDocsProbeController, MethodOnlyController, Zone()

### Community 69 - "api-docs.spec.ts"
Cohesion: 0.29
Nodes (6): controllers, DocsProbeDto, documentOf(), OpenApiDocument, OpenApiSchema, url()

### Community 70 - ".probe"
Cohesion: 0.23
Nodes (11): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, apiZones, ZoneGuard (+3 more)

### Community 78 - "domain-event-bus.ts"
Cohesion: 0.23
Nodes (6): @nestjs/event-emitter@^12.0.1, DomainEventBus, DomainEventHandler, DomainEventName, DomainEvents, @nestjs/event-emitter

### Community 115 - "json-object-limits.spec.ts"
Cohesion: 0.15
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 473 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `database.module.ts`, `log-level-warn.spec.ts`, `server/package.json`, `dependencies`, `migrate-mode.e2e-spec.ts`, `env.schema.ts`, `request-id.spec.ts`, `@aws-sdk/s3-request-presigner@^3.1151.0`, `unit-probe.ts`, `configureApiApp`, `zod-serialization.spec.ts`, `api.module.ts`, `main.ts`, `transactions.e2e-spec.ts`, `domain-event-bus.spec.ts`, `ioredis@^6.0.0`, `log-redaction.spec.ts`, `typeorm`, `zone.guard.spec.ts`, `api.module.ts`, `zone-servers.spec.ts`, `api-docs.spec.ts`, `.probe`, `domain-event-bus.ts`?**
  _High betweenness centrality (0.215) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10227272727272728 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `InternalProbeController`, `zone-servers.spec.ts`, `api-versioning.spec.ts`, `packages-build.e2e-spec.ts`, `ErrorProbeController`, `api-docs.spec.ts`, `ZonedController`, `BodyProbeController`, `zod-serialization.spec.ts`, `zod-validation.spec.ts`, `ioredis@^6.0.0`, `migrate-mode.e2e-spec.ts`, `@nestjs/common`, `Controller`, `zone.guard.spec.ts`, `MixedZoneController`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `transactions.e2e-spec.ts` to `database.module.ts`, `database-connection.e2e-spec.ts`, `server/package.json`, `ref_node_path`, `api.module.ts`, `dependencies`, `migrate-mode.e2e-spec.ts`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._