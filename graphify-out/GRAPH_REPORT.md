# Graph Report - EPIC-9-2  (2026-10-29)

## Corpus Check
- 196 files · ~35,015 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1396 nodes · 2740 edges · 106 communities (77 shown, 29 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 47 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a92f23c1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- typeorm
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
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
- @nestjs/common
- migrate.module.ts
- scripts
- status.controller.spec.ts
- logging.e2e-spec.ts
- log-redaction.e2e-spec.ts
- provided-context.d.ts
- request-id.e2e-spec.ts
- server-protocol.e2e-spec.ts
- .create
- metrics.controller.ts
- redis-connection.e2e-spec.ts
- ServerErrorsProbeController
- tsconfig.build.json
- BodyProbeController
- api.module.ts
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
- security-headers.spec.ts
- RedactionProbeController
- protocol/src/index.ts
- json-object-schema.ts
- json-object-limits.spec.ts
- MixedZoneController
- database-connection.e2e-spec.ts
- audit-log.listener.spec.ts
- security-headers.spec.ts
- zone.guard.spec.ts
- ref_vitest
- api-docs.spec.ts
- zone-servers.spec.ts
- bullmq@^6.3.15
- api-versioning.spec.ts
- Zone
- ErrorProbeController
- config.module.ts
- zone.decorator.ts
- migrate-mode.e2e-spec.ts
- unit-probe.ts
- request-id.spec.ts
- server-errors.spec.ts
- global-setup.ts
- @nestjs/websockets@^12.1.3
- Project
- fixtures.ts
- logger.module.ts
- health.module.ts
- log-redaction.spec.ts
- reflect-metadata@^0.2.2
- file-type@^22.1.1
- @nestjs/cache-manager@^12.0.1
- ApiKey
- cls-middleware.ts
- @nestjs/microservices@^12.1.3
- database-entities.ts
- database.module.ts
- redis-connection.e2e-spec.ts
- sharp@^0.35.5
- status.controller.spec.ts
- zod-validation.spec.ts
- helmet
- @nest-lab/throttler-storage-redis@^1.2.0
- pino-http
- zod@catalog:

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 72 edges
2. `Zone()` - 44 edges
3. `findFreePort()` - 25 edges
4. `startZoneProbeApp()` - 22 edges
5. `typeorm` - 21 edges
6. `compilerOptions` - 20 edges
7. `Project` - 19 edges
8. `@nestjs/testing` - 17 edges
9. `AuditLogEntry` - 17 edges
10. `scripts` - 16 edges

## Surprising Connections (you probably didn't know these)
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `Project` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/projects/project.entity.ts → packages/protocol/src/json-types.ts
- `ApiExceptionInput` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `runApi()` --calls--> `configureApiApp()`  [EXTRACTED]
  apps/server/src/main.ts → apps/server/src/api-app.ts
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (106 total, 29 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.14
Nodes (11): DatabaseMigration, databaseMigrations, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity, SecondEntity, CreateProjects1793193549883 (+3 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.22
Nodes (10): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+2 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.09
Nodes (21): author, @aws-sdk/s3-request-presigner@^3.1151.0, cache-manager@^7.2.9, nest-commander@^3.21.0, @nestjs/bullmq@^12.0.0, @nestjs/swagger@^12.0.2, sharp@^0.35.5, socket.io@^4.8.4 (+13 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (19): checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange(), logFormats (+11 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.12
Nodes (11): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, IdentityRow, VersionRow (+3 more)

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
Nodes (30): dependencies, @aws-sdk/client-s3@^3.1151.0, file-type@^22.1.1, @nestjs/cache-manager@^12.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1 (+22 more)

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
Cohesion: 0.14
Nodes (14): ApiHttpModule, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter (+6 more)

### Community 23 - "@nestjs/common"
Cohesion: 0.12
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, jsonObjectSchema, Violation, JsonObjectLimits, JsonValue (+1 more)

### Community 24 - "migrate.module.ts"
Cohesion: 0.17
Nodes (5): AppConfigModule, DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "status.controller.spec.ts"
Cohesion: 0.24
Nodes (11): base, base62Alphabet, encodeBase62(), computeChecksum(), generateKey(), isBase62(), keyPrefixes, KeyType (+3 more)

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
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 32 - ".create"
Cohesion: 0.14
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 33 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 34 - "redis-connection.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "BodyProbeController"
Cohesion: 0.13
Nodes (3): probeControllers, probeControllers, ZoneProbeApp

### Community 38 - "api.module.ts"
Cohesion: 0.17
Nodes (13): HealthBody, HealthEntry, findZonePorts(), probeControllers, findFreePort(), serverDirectory, withOfflineDatabase(), readyRedis (+5 more)

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
Cohesion: 0.13
Nodes (15): ApiModule, CliModule, createContext(), mode, runApi(), runCli(), runMigrate(), runners (+7 more)

### Community 48 - "audit-log.e2e-spec.ts"
Cohesion: 0.17
Nodes (5): ProjectsModule, ProjectsRepository, WorkerModule, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 49 - "AuditLogEntry"
Cohesion: 0.17
Nodes (8): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns, JsonObject

### Community 50 - "server-errors.spec.ts"
Cohesion: 0.16
Nodes (13): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ApiExceptionInput, entries(), errorEntriesOf() (+5 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "security-headers.spec.ts"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.12
Nodes (13): errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema (+5 more)

### Community 55 - "json-object-schema.ts"
Cohesion: 0.29
Nodes (6): controllers, DocsProbeDto, documentOf(), OpenApiDocument, OpenApiSchema, url()

### Community 56 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 57 - "MixedZoneController"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 58 - "database-connection.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), Env

### Community 59 - "audit-log.listener.spec.ts"
Cohesion: 0.07
Nodes (29): @nestjs/event-emitter@^12.0.1, AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditModule, auditedEventNames() (+21 more)

### Community 60 - "security-headers.spec.ts"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 61 - "zone.guard.spec.ts"
Cohesion: 0.15
Nodes (7): zoneMetadataKey, CapturedResponse, FakeRequest, guardedControllers, startApp(), unitPorts, @nestjs/core

### Community 63 - "api-docs.spec.ts"
Cohesion: 0.24
Nodes (4): startListening(), stopListening(), ZoneServers, ZonesModule

### Community 64 - "zone-servers.spec.ts"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 66 - "api-versioning.spec.ts"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 67 - "Zone"
Cohesion: 0.26
Nodes (5): InternalDocsProbeController, OperatorDocsProbeController, PublicDocsProbeController, MethodOnlyController, Zone()

### Community 69 - "config.module.ts"
Cohesion: 0.31
Nodes (12): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+4 more)

### Community 70 - "zone.decorator.ts"
Cohesion: 0.26
Nodes (11): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, ApiZone, apiZones (+3 more)

### Community 72 - "unit-probe.ts"
Cohesion: 0.18
Nodes (10): LogDestination, createRedactionProbeApp(), createRequestIdProbeApp(), offlineRedis, withOfflineRedis(), createProbeApp(), ProbeAppOptions, redirectLogsTo() (+2 more)

### Community 73 - "request-id.spec.ts"
Cohesion: 0.17
Nodes (9): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse, ProbeService (+1 more)

### Community 75 - "global-setup.ts"
Cohesion: 0.24
Nodes (9): testcontainers@^12.2.1, @testcontainers/postgresql@^12.2.1, runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl(), testcontainers (+1 more)

### Community 77 - "Project"
Cohesion: 0.20
Nodes (4): ApiKeyKind, apiKeyKinds, Project, ColumnRow

### Community 78 - "fixtures.ts"
Cohesion: 0.27
Nodes (6): ColumnRow, expectedColumns, createProject(), ProjectFixture, truncateAllTables(), useTestDatabase()

### Community 79 - "logger.module.ts"
Cohesion: 0.29
Nodes (8): createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions(), redactPaths, sensitiveFields, sensitiveHeaders

### Community 80 - "health.module.ts"
Cohesion: 0.06
Nodes (20): ioredis@^6.0.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+12 more)

### Community 81 - "log-redaction.spec.ts"
Cohesion: 0.22
Nodes (9): allOutput(), CapturedLogs, fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields, secretValueOf() (+1 more)

### Community 86 - "cls-middleware.ts"
Cohesion: 0.39
Nodes (5): useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp(), nestjs-pino

### Community 88 - "database-entities.ts"
Cohesion: 0.48
Nodes (3): database, loadDataSource(), databaseEntities

### Community 89 - "database.module.ts"
Cohesion: 0.38
Nodes (4): createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules

### Community 90 - "redis-connection.e2e-spec.ts"
Cohesion: 0.33
Nodes (6): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableRedisUrl(), waitForHttpStatus()

### Community 92 - "status.controller.spec.ts"
Cohesion: 0.33
Nodes (3): DependencyStatusBody, StatusBody, databaseUrl()

### Community 93 - "zod-validation.spec.ts"
Cohesion: 0.33
Nodes (4): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 545 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `health.module.ts` to `log-level-warn.spec.ts`, `server/package.json`, `dependencies`, `http-error.filter.spec.ts`, `migrate.module.ts`, `metrics.controller.ts`, `BodyProbeController`, `api.module.ts`, `api-app.ts`, `zod-serialization.spec.ts`, `main.ts`, `audit-log.e2e-spec.ts`, `AuditLogEntry`, `server-errors.spec.ts`, `json-object-schema.ts`, `audit-log.listener.spec.ts`, `zone.guard.spec.ts`, `api-docs.spec.ts`, `config.module.ts`, `zone.decorator.ts`, `unit-probe.ts`, `request-id.spec.ts`, `fixtures.ts`, `logger.module.ts`, `log-redaction.spec.ts`, `cls-middleware.ts`, `database.module.ts`, `status.controller.spec.ts`, `zod-validation.spec.ts`?**
  _High betweenness centrality (0.222) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.14492753623188406 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `http-error.filter.spec.ts`, `metrics.controller.ts`, `ServerErrorsProbeController`, `BodyProbeController`, `api.module.ts`, `zod-serialization.spec.ts`, `ValidationProbeController`, `server-errors.spec.ts`, `security-headers.spec.ts`, `json-object-schema.ts`, `security-headers.spec.ts`, `zone.guard.spec.ts`, `zone-servers.spec.ts`, `bullmq@^6.3.15`, `api-versioning.spec.ts`, `ErrorProbeController`, `server-errors.spec.ts`, `health.module.ts`, `zod-validation.spec.ts`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `redis-connection.e2e-spec.ts`, `server/package.json`, `ref_node_path`, `Project`, `dependencies`, `fixtures.ts`, `audit-log.e2e-spec.ts`, `AuditLogEntry`, `database-entities.ts`, `database-connection.e2e-spec.ts`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._