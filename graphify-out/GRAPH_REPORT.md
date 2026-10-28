# Graph Report - EPIC-9-6  (2026-10-29)

## Corpus Check
- 207 files · ~38,803 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1471 nodes · 2950 edges · 92 communities (68 shown, 24 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 53 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a152fcfd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- socket.io@^4.8.4
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
- json-object-limits.spec.ts
- migrate.module.ts
- scripts
- api-keys.service.ts
- logging.e2e-spec.ts
- log-redaction.e2e-spec.ts
- provided-context.d.ts
- request-id.e2e-spec.ts
- server-protocol.e2e-spec.ts
- .create
- @nestjs/common
- audit-log.listener.spec.ts
- ServerErrorsProbeController
- tsconfig.build.json
- api-versioning.spec.ts
- redis.module.ts
- nest-cli.json
- domain-event-bus.spec.ts
- workspace-check-types.e2e-spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- findFreePort
- ValidationProbeController
- main.ts
- audit-log.e2e-spec.ts
- AuditLogEntry
- server-errors.spec.ts
- log-settings.e2e-spec.ts
- zone.guard.spec.ts
- log-redaction.spec.ts
- protocol/src/index.ts
- typeorm
- redis.module.ts
- ApiKey
- global-setup.ts
- domain-event-bus.spec.ts
- Zone
- database.module.ts
- JsonObjectValidator
- ZoneServers
- InternalProbeController
- cache-manager@^7.2.9
- cache-manager@^7.2.9
- @nestjs/bullmq@^12.0.0
- ErrorProbeController
- @nestjs/throttler@^6.7.1
- zone.decorator.ts
- @nestjs/websockets@^12.1.3
- file-type@^22.1.1
- pino-http
- bullmq@^6.3.15
- api-keys.service.ts
- typeorm
- logger.module.ts
- health.module.ts
- database.module.ts
- @nestjs/throttler@^6.7.1
- api-app.ts
- @nestjs/microservices@^12.1.3
- http-error.filter.ts
- body-limit.spec.ts
- @nestjs/bullmq@^12.0.0

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 75 edges
2. `Zone()` - 44 edges
3. `findFreePort()` - 25 edges
4. `typeorm` - 23 edges
5. `startZoneProbeApp()` - 22 edges
6. `ApiKey` - 21 edges
7. `Project` - 21 edges
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

## Communities (92 total, 24 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.09
Nodes (13): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity (+5 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.09
Nodes (18): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse, ProbeService (+10 more)

### Community 4 - "devDependencies"
Cohesion: 0.07
Nodes (38): author, description, devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0 (+30 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "socket.io@^4.8.4"
Cohesion: 0.33
Nodes (4): socket.io@^4.8.4, @socket.io/redis-adapter@^8.3.0, socket.io, @socket.io/redis-adapter

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (31): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, checkPrettyLogFormat(), Env (+23 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
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
Cohesion: 0.05
Nodes (37): dependencies, @aws-sdk/client-s3@^3.1151.0, @aws-sdk/s3-request-presigner@^3.1151.0, file-type@^22.1.1, nest-commander@^3.21.0, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/cache-manager@^12.0.1, nestjs-cls@^7.0.1 (+29 more)

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
Cohesion: 0.15
Nodes (12): errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter, requestIdOf(), responseZodErrorOf() (+4 more)

### Community 23 - "json-object-limits.spec.ts"
Cohesion: 0.16
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 24 - "migrate.module.ts"
Cohesion: 0.20
Nodes (4): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "api-keys.service.ts"
Cohesion: 0.05
Nodes (38): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey, ApiKeysService, hashMatches(), eventFields, IssueApiKeyInput (+30 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, runToExit() (+3 more)

### Community 28 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 32 - ".create"
Cohesion: 0.16
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 33 - "@nestjs/common"
Cohesion: 0.21
Nodes (3): MetricsController, @nestjs/common, prom-client

### Community 34 - "audit-log.listener.spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "api-versioning.spec.ts"
Cohesion: 0.13
Nodes (8): jose@^6.2.12, IdentityKey, IdentityKeyAlgorithm, identityKeyAlgorithms, ColumnRow, expectedColumns, jwk, jose

### Community 38 - "redis.module.ts"
Cohesion: 0.20
Nodes (8): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "domain-event-bus.spec.ts"
Cohesion: 0.25
Nodes (8): happened, TestListener, DomainEventHandler, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 41 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "findFreePort"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 47 - "main.ts"
Cohesion: 0.13
Nodes (15): ApiModule, CliModule, createContext(), mode, runApi(), runCli(), runMigrate(), runners (+7 more)

### Community 48 - "audit-log.e2e-spec.ts"
Cohesion: 0.16
Nodes (5): ProjectsModule, ProjectsRepository, WorkerModule, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 49 - "AuditLogEntry"
Cohesion: 0.14
Nodes (7): ActorKind, actorKinds, AuditLogEntry, AuditLogRepository, NewAuditLogEntry, ColumnRow, expectedColumns

### Community 50 - "server-errors.spec.ts"
Cohesion: 0.11
Nodes (19): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, internalErrorMessage, ApiExceptionInput, entries() (+11 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.13
Nodes (19): fetchStatus(), repositoryRoot, RunResult, runToExit(), waitForHttpStatus(), ApiRun, fetchStatus(), LogEntry (+11 more)

### Community 52 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (11): allOutput(), CapturedLogs, fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields, RedactionProbeController (+3 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 55 - "typeorm"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 56 - "redis.module.ts"
Cohesion: 0.08
Nodes (16): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+8 more)

### Community 57 - "ApiKey"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 58 - "global-setup.ts"
Cohesion: 0.24
Nodes (9): testcontainers@^12.2.1, @testcontainers/postgresql@^12.2.1, runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl(), testcontainers (+1 more)

### Community 59 - "domain-event-bus.spec.ts"
Cohesion: 0.11
Nodes (17): AuditLogListener, eventValues, happened, personalValues, auditedEventNames(), AuditRecord, AuditRule, auditRules (+9 more)

### Community 60 - "Zone"
Cohesion: 0.10
Nodes (16): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController, calls, ProbeBodyDto (+8 more)

### Community 61 - "database.module.ts"
Cohesion: 0.32
Nodes (5): createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, nestjs-cls

### Community 63 - "ZoneServers"
Cohesion: 0.25
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 64 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 66 - "cache-manager@^7.2.9"
Cohesion: 0.19
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 70 - "zone.decorator.ts"
Cohesion: 0.21
Nodes (12): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), zonePathPrefixes, ApiZone (+4 more)

### Community 72 - "file-type@^22.1.1"
Cohesion: 0.11
Nodes (21): DependencyStatusBody, StatusBody, LogDestination, createRedactionProbeApp(), createRequestIdProbeApp(), probeControllers, withOfflineDatabase(), offlineRedis (+13 more)

### Community 78 - "typeorm"
Cohesion: 0.14
Nodes (12): typeorm@^1.1.2, apiKeyKinds, Project, ColumnRow, expectedColumns, ColumnRow, createProject(), ProjectFixture (+4 more)

### Community 79 - "logger.module.ts"
Cohesion: 0.24
Nodes (10): pino@^10.4.0, createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions(), redactPaths, sensitiveFields (+2 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 83 - "database.module.ts"
Cohesion: 0.14
Nodes (10): database, loadDataSource(), databaseEntities, AuditModule, AppClsModule, AppConfigModule, ApiHttpModule, ZonesModule (+2 more)

### Community 86 - "api-app.ts"
Cohesion: 0.14
Nodes (16): nestjs-pino@^5.3.1, configureApiApp(), useClsMiddleware(), setupApiDocs(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException() (+8 more)

### Community 90 - "http-error.filter.ts"
Cohesion: 0.19
Nodes (12): findZonePorts(), serverEnvironment(), unreachableDatabaseUrl(), serverEnvironment(), fetchStatus(), repositoryRoot, RunResult, runToExit() (+4 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 577 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `log-level-warn.spec.ts`, `devDependencies`, `env.schema.ts`, `dependencies`, `http-error.filter.spec.ts`, `migrate.module.ts`, `api-keys.service.ts`, `redis.module.ts`, `domain-event-bus.spec.ts`, `main.ts`, `audit-log.e2e-spec.ts`, `AuditLogEntry`, `server-errors.spec.ts`, `zone.guard.spec.ts`, `log-redaction.spec.ts`, `protocol/src/index.ts`, `typeorm`, `domain-event-bus.spec.ts`, `Zone`, `database.module.ts`, `ZoneServers`, `cache-manager@^7.2.9`, `zone.decorator.ts`, `file-type@^22.1.1`, `typeorm`, `logger.module.ts`, `health.module.ts`, `database.module.ts`, `api-app.ts`, `body-limit.spec.ts`?**
  _High betweenness centrality (0.241) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09462365591397849 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `InternalProbeController`, `@nestjs/common`, `cache-manager@^7.2.9`, `ServerErrorsProbeController`, `ErrorProbeController`, `file-type@^22.1.1`, `zod-serialization.spec.ts`, `ValidationProbeController`, `health.module.ts`, `server-errors.spec.ts`, `zone.guard.spec.ts`, `http-error.filter.spec.ts`, `typeorm`, `protocol/src/index.ts`, `body-limit.spec.ts`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `audit-log.listener.spec.ts`, `devDependencies`, `api-versioning.spec.ts`, `ref_node_path`, `audit-log.e2e-spec.ts`, `AuditLogEntry`, `database.module.ts`, `log-settings.e2e-spec.ts`, `api-keys.service.ts`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `log-level-warn.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08708708708708708 - nodes in this community are weakly interconnected._