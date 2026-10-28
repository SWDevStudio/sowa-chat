# Graph Report - hector-chat-epic-8  (2026-10-28)

## Corpus Check
- 188 files · ~33,170 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1353 nodes · 2656 edges · 99 communities (67 shown, 32 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 46 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `aabe4df0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-options.ts
- bot-sdk/tsconfig.json
- package.json
- request-id.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- server/package.json
- env.schema.ts
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
- http-error.filter.spec.ts
- security-headers.spec.ts
- api.module.ts
- scripts
- redis-stub-probe.ts
- logging.e2e-spec.ts
- log-redaction.e2e-spec.ts
- provided-context.d.ts
- request-id.e2e-spec.ts
- server-protocol.e2e-spec.ts
- .create
- metrics.controller.ts
- findFreePort
- ServerErrorsProbeController
- tsconfig.build.json
- zone-servers.spec.ts
- nest-cli.json
- api-app.ts
- workspace-check-types.e2e-spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- health.e2e-spec.ts
- ValidationProbeController
- main.ts
- audit-log.e2e-spec.ts
- AuditLogEntry
- server-errors.spec.ts
- log-settings.e2e-spec.ts
- errors.spec.ts
- log-redaction.spec.ts
- protocol/src/index.ts
- @nestjs/common
- json-object-limits.spec.ts
- packages-build.e2e-spec.ts
- redis-connection.e2e-spec.ts
- audit-log.listener.spec.ts
- Controller
- zone.guard.spec.ts
- MixedZoneController
- zone-servers.ts
- InternalProbeController
- bullmq@^6.3.15
- NeutralProbeController
- Zone
- ErrorProbeController
- api-docs.spec.ts
- zone.ts
- jose@^6.2.12
- ZonedController
- http-error.filter.ts
- BodyProbeController
- @nestjs/swagger
- @nestjs/websockets@^12.1.3
- @aws-sdk/client-s3@^3.1151.0
- domain-event-bus.spec.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- health.module.ts
- pino-http
- reflect-metadata@^0.2.2
- typescript@catalog:
- @nestjs/cache-manager@^12.0.1
- @nest-lab/throttler-storage-redis@^1.2.0
- @nestjs/bullmq@^12.0.0
- @nestjs/microservices@^12.1.3
- @vitest/coverage-v8@catalog:
- pg
- sharp@^0.35.5
- socket.io@^4.8.4
- @socket.io/redis-adapter@^8.3.0

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 72 edges
2. `Zone()` - 44 edges
3. `findFreePort()` - 25 edges
4. `startZoneProbeApp()` - 22 edges
5. `compilerOptions` - 20 edges
6. `typeorm` - 19 edges
7. `@nestjs/testing` - 17 edges
8. `AuditLogEntry` - 17 edges
9. `Project` - 17 edges
10. `scripts` - 16 edges

## Surprising Connections (you probably didn't know these)
- `Project` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/projects/project.entity.ts → packages/protocol/src/json-types.ts
- `ApiExceptionInput` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `runApi()` --calls--> `configureApiApp()`  [EXTRACTED]
  apps/server/src/main.ts → apps/server/src/api-app.ts
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (99 total, 32 thin omitted)

### Community 0 - "database-options.ts"
Cohesion: 0.09
Nodes (18): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createTypeOrmModule(), getTypeOrmModule(), createDataSourceOptions(), DatabaseConnection (+10 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "request-id.spec.ts"
Cohesion: 0.08
Nodes (19): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+11 more)

### Community 4 - "devDependencies"
Cohesion: 0.07
Nodes (29): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, source-map-support@^0.5.21, supertest@^7.0.0 (+21 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.12
Nodes (15): author, cache-manager@^7.2.9, nest-commander@^3.21.0, @nestjs/throttler@^6.7.1, description, socket.io-client@catalog:, socket.io-client, license (+7 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (19): checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange(), logFormats (+11 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.14
Nodes (10): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, databaseUrl(), IdentityRow, VersionRow, useTestRedis() (+2 more)

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
Nodes (25): dependencies, file-type@^22.1.1, helmet@^8.3.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1 (+17 more)

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

### Community 22 - "http-error.filter.spec.ts"
Cohesion: 0.24
Nodes (7): errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse(), knownKeys, ProbeBodyDto

### Community 23 - "security-headers.spec.ts"
Cohesion: 0.12
Nodes (7): probeControllers, probeControllers, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ZoneProbeApp

### Community 24 - "api.module.ts"
Cohesion: 0.15
Nodes (11): database, loadDataSource(), databaseEntities, AuditModule, AppClsModule, AppConfigModule, DatabaseModule, typeOrmModules (+3 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "redis-stub-probe.ts"
Cohesion: 0.16
Nodes (8): HealthBody, HealthEntry, DependencyStatusBody, StatusBody, readyRedis, RedisStub, startRedisStubProbeApp(), @nestjs/platform-express

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+2 more)

### Community 31 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 32 - ".create"
Cohesion: 0.16
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 33 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 34 - "findFreePort"
Cohesion: 0.12
Nodes (20): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), BrokenMigration1700000000000 (+12 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "zone-servers.spec.ts"
Cohesion: 0.16
Nodes (14): LogDestination, probeControllers, withOfflineDatabase(), offlineRedis, withOfflineRedis(), createProbeApp(), ProbeAppOptions, redirectLogsTo() (+6 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "api-app.ts"
Cohesion: 0.22
Nodes (9): configureApiApp(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders() (+1 more)

### Community 41 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "zod-serialization.spec.ts"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 45 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 47 - "main.ts"
Cohesion: 0.06
Nodes (41): pino@^10.4.0, ApiModule, CliModule, appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv (+33 more)

### Community 48 - "audit-log.e2e-spec.ts"
Cohesion: 0.15
Nodes (9): Project, WorkerModule, ColumnRow, expectedColumns, ColumnRow, createProject(), truncateAllTables(), useTestDatabase() (+1 more)

### Community 49 - "AuditLogEntry"
Cohesion: 0.18
Nodes (7): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ProjectFixture, JsonObject

### Community 50 - "server-errors.spec.ts"
Cohesion: 0.16
Nodes (13): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, internalErrorMessage, ApiExceptionInput, entries() (+5 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "errors.spec.ts"
Cohesion: 0.28
Nodes (6): errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.12
Nodes (10): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, jsonObjectSchema, JsonValue (+2 more)

### Community 55 - "@nestjs/common"
Cohesion: 0.19
Nodes (5): ProjectsModule, ProjectsRepository, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm, @nestjs/common

### Community 56 - "json-object-limits.spec.ts"
Cohesion: 0.10
Nodes (16): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+8 more)

### Community 57 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 58 - "redis-connection.e2e-spec.ts"
Cohesion: 0.33
Nodes (6): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableRedisUrl(), waitForHttpStatus()

### Community 59 - "audit-log.listener.spec.ts"
Cohesion: 0.13
Nodes (10): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, auditedEventNames(), AuditRule, auditRules (+2 more)

### Community 60 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 61 - "zone.guard.spec.ts"
Cohesion: 0.15
Nodes (7): zoneMetadataKey, CapturedResponse, FakeRequest, guardedControllers, startApp(), unitPorts, @nestjs/core

### Community 62 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 63 - "zone-servers.ts"
Cohesion: 0.32
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 64 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 66 - "NeutralProbeController"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 67 - "Zone"
Cohesion: 0.26
Nodes (5): InternalDocsProbeController, OperatorDocsProbeController, PublicDocsProbeController, MethodOnlyController, Zone()

### Community 69 - "api-docs.spec.ts"
Cohesion: 0.29
Nodes (6): controllers, DocsProbeDto, documentOf(), OpenApiDocument, OpenApiSchema, url()

### Community 70 - "zone.ts"
Cohesion: 0.26
Nodes (11): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, ApiZone, apiZones (+3 more)

### Community 73 - "http-error.filter.ts"
Cohesion: 0.16
Nodes (10): useClsMiddleware(), ApiHttpModule, HttpErrorFilter, requestIdOf(), responseZodErrorOf(), echoRequestId(), requestIdHeader, resolveRequestId() (+2 more)

### Community 78 - "domain-event-bus.spec.ts"
Cohesion: 0.16
Nodes (12): DomainEventBus, happened, TestListener, DomainEventHandler, DomainEventName, DomainEvents, OnDomainEvent(), DomainEvents (+4 more)

### Community 80 - "health.module.ts"
Cohesion: 0.06
Nodes (20): ioredis@^6.0.0, @nestjs/terminus@^12.1.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController (+12 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 523 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **32 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `request-id.spec.ts`, `server/package.json`, `dependencies`, `http-error.filter.spec.ts`, `security-headers.spec.ts`, `api.module.ts`, `redis-stub-probe.ts`, `metrics.controller.ts`, `body-limit.spec.ts`, `zone-servers.spec.ts`, `api-app.ts`, `zod-serialization.spec.ts`, `main.ts`, `audit-log.e2e-spec.ts`, `AuditLogEntry`, `server-errors.spec.ts`, `log-redaction.spec.ts`, `audit-log.listener.spec.ts`, `zone.guard.spec.ts`, `zone-servers.ts`, `api-docs.spec.ts`, `zone.ts`, `http-error.filter.ts`, `domain-event-bus.spec.ts`, `health.module.ts`?**
  _High betweenness centrality (0.228) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-options.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09411764705882353 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `http-error.filter.spec.ts`, `security-headers.spec.ts`, `metrics.controller.ts`, `ServerErrorsProbeController`, `body-limit.spec.ts`, `zone-servers.spec.ts`, `zod-serialization.spec.ts`, `ValidationProbeController`, `server-errors.spec.ts`, `Controller`, `zone.guard.spec.ts`, `MixedZoneController`, `InternalProbeController`, `NeutralProbeController`, `ErrorProbeController`, `api-docs.spec.ts`, `ZonedController`, `BodyProbeController`, `health.module.ts`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `ValidationProbeController` connect `ValidationProbeController` to `Zone`, `security-headers.spec.ts`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `request-id.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._