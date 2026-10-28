# Graph Report - EPIC-9-4  (2026-10-29)

## Corpus Check
- 211 files · ~39,877 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1492 nodes · 2992 edges · 100 communities (72 shown, 28 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 53 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `220985a1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- server/package.json
- env.schema.ts
- compilerOptions
- redis-connection.e2e-spec.ts
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
- main.ts
- api-versioning.spec.ts
- config.module.ts
- scripts
- api-keys.service.ts
- logging.e2e-spec.ts
- e2e-server.ts
- provided-context.d.ts
- request-id.e2e-spec.ts
- server-protocol.e2e-spec.ts
- .create
- metrics.controller.ts
- findFreePort
- redis.module.ts
- tsconfig.build.json
- migrate.module.ts
- zone.guard.spec.ts
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
- Controller
- log-redaction.spec.ts
- request-id.spec.ts
- json-object-limits.spec.ts
- json-object-limits.spec.ts
- packages-build.e2e-spec.ts
- Project
- audit-log.listener.spec.ts
- Controller
- MixedZoneController
- MixedZoneController
- ZoneServers
- InternalProbeController
- cls-middleware.ts
- NeutralProbeController
- AuditScenarios
- DomainEventBus
- status.controller.spec.ts
- file-type@^22.1.1
- BodyProbeController
- ZonedController
- redact-paths.ts
- .log
- helmet
- @nestjs/websockets@^12.1.3
- RedisModule
- domain-event-bus.spec.ts
- ProbeController
- status.service.ts
- .probe
- nest-commander@^3.21.0
- @testcontainers/postgresql
- @nestjs/cache-manager@^12.0.1
- pg
- api-app.ts
- @nestjs/microservices@^12.1.3
- vite@catalog:
- .constructor
- pg
- @nest-lab/throttler-storage-redis@^1.2.0
- startZoneProbeApp
- @nestjs/platform-socket.io@^12.1.3

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 75 edges
2. `Zone()` - 44 edges
3. `findFreePort()` - 25 edges
4. `typeorm` - 24 edges
5. `Project` - 22 edges
6. `startZoneProbeApp()` - 22 edges
7. `ApiKey` - 21 edges
8. `compilerOptions` - 20 edges
9. `@nestjs/testing` - 19 edges
10. `AuditLogEntry` - 18 edges

## Surprising Connections (you probably didn't know these)
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts
- `AuditRecord` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-rule.ts → packages/protocol/src/json-types.ts
- `ApiExceptionInput` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (100 total, 28 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.07
Nodes (21): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createTypeOrmModule(), getTypeOrmModule(), createDataSourceOptions(), DatabaseConnection (+13 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.08
Nodes (20): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+12 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.10
Nodes (19): author, @nestjs/bullmq@^12.0.0, @nestjs/throttler@^6.7.1, pino-http@^11.0.0, rxjs@^7.8.1, socket.io@^4.8.4, @sowa-chat/protocol@workspace:*, description (+11 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.06
Nodes (31): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+23 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "redis-connection.e2e-spec.ts"
Cohesion: 0.13
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
Cohesion: 0.07
Nodes (29): dependencies, @aws-sdk/client-s3@^3.1151.0, file-type@^22.1.1, jose@^6.2.12, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1 (+21 more)

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

### Community 22 - "main.ts"
Cohesion: 0.15
Nodes (14): nestjs-zod@^5.5.0, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter (+6 more)

### Community 23 - "api-versioning.spec.ts"
Cohesion: 0.12
Nodes (14): errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema(), EventEnvelope (+6 more)

### Community 24 - "config.module.ts"
Cohesion: 0.28
Nodes (13): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig (+5 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "api-keys.service.ts"
Cohesion: 0.05
Nodes (39): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey, ApiKeysService, hashMatches(), eventFields, IssueApiKeyInput (+31 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, runToExit() (+3 more)

### Community 28 - "e2e-server.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 32 - ".create"
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 33 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 34 - "findFreePort"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, withClient() (+2 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "migrate.module.ts"
Cohesion: 0.20
Nodes (4): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps

### Community 38 - "zone.guard.spec.ts"
Cohesion: 0.16
Nodes (6): zoneMetadataKey, CapturedResponse, FakeRequest, guardedControllers, unitPorts, @nestjs/core

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "api-app.ts"
Cohesion: 0.16
Nodes (12): DomainEventBus, happened, TestListener, DomainEventHandler, DomainEventName, DomainEvents, OnDomainEvent(), DomainEvents (+4 more)

### Community 41 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 47 - "main.ts"
Cohesion: 0.15
Nodes (14): CliModule, createContext(), mode, runApi(), runCli(), runMigrate(), runners, runToCompletion() (+6 more)

### Community 48 - "audit-log.e2e-spec.ts"
Cohesion: 0.19
Nodes (3): ProjectsModule, ProjectsRepository, WorkerModule

### Community 49 - "AuditLogEntry"
Cohesion: 0.16
Nodes (4): actorKinds, AuditLogEntry, ColumnRow, expectedColumns

### Community 50 - "server-errors.spec.ts"
Cohesion: 0.17
Nodes (12): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ApiExceptionInput, entries(), errorEntriesOf() (+4 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.23
Nodes (11): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+3 more)

### Community 52 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 54 - "request-id.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 55 - "json-object-limits.spec.ts"
Cohesion: 0.15
Nodes (11): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+3 more)

### Community 56 - "json-object-limits.spec.ts"
Cohesion: 0.08
Nodes (16): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+8 more)

### Community 57 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 58 - "Project"
Cohesion: 0.22
Nodes (4): Project, ColumnRow, ProjectFixture, JsonObject

### Community 59 - "audit-log.listener.spec.ts"
Cohesion: 0.11
Nodes (17): ActorKind, AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, NewAuditLogEntry, auditedEventNames() (+9 more)

### Community 61 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 63 - "ZoneServers"
Cohesion: 0.22
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 64 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 66 - "NeutralProbeController"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 67 - "AuditScenarios"
Cohesion: 0.29
Nodes (3): AuditScenarios, happenedIn(), ScenarioError

### Community 70 - "file-type@^22.1.1"
Cohesion: 0.20
Nodes (12): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), zonePathPrefixes, ApiZone (+4 more)

### Community 72 - "ZonedController"
Cohesion: 0.14
Nodes (16): LogDestination, probeControllers, withOfflineDatabase(), offlineRedis, withOfflineRedis(), readyRedis, RedisStub, startRedisStubProbeApp() (+8 more)

### Community 73 - "redact-paths.ts"
Cohesion: 0.50
Nodes (3): redactPaths, sensitiveFields, sensitiveHeaders

### Community 74 - ".log"
Cohesion: 0.33
Nodes (5): ApiModule, useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp()

### Community 78 - "domain-event-bus.spec.ts"
Cohesion: 0.27
Nodes (6): apiKeyKinds, ColumnRow, expectedColumns, createProject(), truncateAllTables(), useTestDatabase()

### Community 79 - "ProbeController"
Cohesion: 0.14
Nodes (7): IdentityKey, IdentityKeyAlgorithm, identityKeyAlgorithms, ColumnRow, expectedColumns, jwk, jose

### Community 80 - "status.service.ts"
Cohesion: 0.06
Nodes (19): ioredis@^6.0.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+11 more)

### Community 81 - ".probe"
Cohesion: 0.43
Nodes (4): database, loadDataSource(), databaseEntities, typeorm

### Community 83 - "@testcontainers/postgresql"
Cohesion: 0.14
Nodes (15): AuditModule, AppClsModule, AppConfigModule, DatabaseModule, typeOrmModules, ApiHttpModule, createStdoutDestination(), baseOptions() (+7 more)

### Community 86 - "api-app.ts"
Cohesion: 0.20
Nodes (11): configureApiApp(), setupApiDocs(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore() (+3 more)

### Community 90 - "pg"
Cohesion: 0.12
Nodes (20): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus() (+12 more)

### Community 93 - "startZoneProbeApp"
Cohesion: 0.10
Nodes (9): probeControllers, probeControllers, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, startApp(), startZoneProbeApp() (+1 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 586 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@testcontainers/postgresql` to `log-level-warn.spec.ts`, `server/package.json`, `dependencies`, `main.ts`, `config.module.ts`, `api-keys.service.ts`, `metrics.controller.ts`, `migrate.module.ts`, `zone.guard.spec.ts`, `api-app.ts`, `main.ts`, `audit-log.e2e-spec.ts`, `server-errors.spec.ts`, `log-redaction.spec.ts`, `request-id.spec.ts`, `json-object-limits.spec.ts`, `audit-log.listener.spec.ts`, `status.controller.spec.ts`, `file-type@^22.1.1`, `ZonedController`, `.log`, `domain-event-bus.spec.ts`, `status.service.ts`, `api-app.ts`, `startZoneProbeApp`?**
  _High betweenness centrality (0.242) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06567992599444958 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `.probe` to `database-migrations.ts`, `findFreePort`, `Project`, `pg`, `server/package.json`, `redis-connection.e2e-spec.ts`, `dependencies`, `domain-event-bus.spec.ts`, `ProbeController`, `audit-log.e2e-spec.ts`, `AuditLogEntry`, `api-keys.service.ts`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `ZonedController` to `devDependencies`, `pg`, `server/package.json`, `api-app.ts`, `.log`, `audit-log.e2e-spec.ts`, `AuditLogEntry`, `config.module.ts`, `api-keys.service.ts`, `audit-log.listener.spec.ts`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Should `log-level-warn.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08232118758434548 - nodes in this community are weakly interconnected._