# Graph Report - EPIC-9-5  (2026-10-29)

## Corpus Check
- 199 files · ~35,764 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1416 nodes · 2776 edges · 102 communities (69 shown, 33 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 47 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `aff01699`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- typeorm
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
- protocol/src/index.ts
- migrate.module.ts
- scripts
- key-format.ts
- logging.e2e-spec.ts
- log-redaction.e2e-spec.ts
- provided-context.d.ts
- request-id.e2e-spec.ts
- server-protocol.e2e-spec.ts
- .create
- metrics.controller.ts
- migrate-mode.e2e-spec.ts
- ServerErrorsProbeController
- tsconfig.build.json
- IdentityKey
- Project
- nest-cli.json
- body-limit.ts
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
- MixedZoneController
- log-redaction.spec.ts
- zod-serialization.spec.ts
- Zone
- json-object-limits.spec.ts
- packages-build.e2e-spec.ts
- AuditScenarios
- @nestjs/common
- Controller
- zone.guard.spec.ts
- JsonObjectValidator
- ZoneServers
- InternalProbeController
- ZonedController
- NeutralProbeController
- ErrorProbeController
- config.module.ts
- zone.ts
- jose
- zone-probe.ts
- log-destination.spec.ts
- BodyProbeController
- @aws-sdk/s3-request-presigner@^3.1151.0
- bullmq@^6.3.15
- @nestjs/swagger
- audit-log-table.e2e-spec.ts
- logger.module.ts
- health.module.ts
- @nestjs/cache-manager@^12.0.1
- @nestjs/platform-socket.io@^12.1.3
- api.module.ts
- pg
- ApiKey
- cls-middleware.ts
- @nestjs/microservices@^12.1.3
- database-entities.ts
- vite@catalog:
- redis-connection.e2e-spec.ts
- status.controller.spec.ts
- @nestjs/common
- helmet
- @nest-lab/throttler-storage-redis@^1.2.0
- zod@catalog:

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 72 edges
2. `Zone()` - 44 edges
3. `findFreePort()` - 25 edges
4. `typeorm` - 23 edges
5. `startZoneProbeApp()` - 22 edges
6. `Project` - 21 edges
7. `compilerOptions` - 20 edges
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
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (102 total, 33 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.08
Nodes (19): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity (+11 more)

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
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.10
Nodes (19): author, nest-commander@^3.21.0, @nestjs/throttler@^6.7.1, pino-http@^11.0.0, reflect-metadata@^0.2.2, rxjs@^7.8.1, @socket.io/redis-adapter@^8.3.0, description (+11 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (19): checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange(), logFormats (+11 more)

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
Cohesion: 0.07
Nodes (29): dependencies, @aws-sdk/client-s3@^3.1151.0, cache-manager@^7.2.9, file-type@^22.1.1, @nestjs/bullmq@^12.0.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1 (+21 more)

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
Nodes (14): nestjs-zod@^5.5.0, ApiHttpModule, errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter (+6 more)

### Community 23 - "protocol/src/index.ts"
Cohesion: 0.12
Nodes (9): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, jsonObjectSchema, PageQuery (+1 more)

### Community 24 - "migrate.module.ts"
Cohesion: 0.20
Nodes (4): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "key-format.ts"
Cohesion: 0.24
Nodes (11): base, base62Alphabet, encodeBase62(), computeChecksum(), generateKey(), isBase62(), keyPrefixes, KeyType (+3 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (12): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, runToExit() (+4 more)

### Community 28 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 32 - ".create"
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 33 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 34 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "IdentityKey"
Cohesion: 0.14
Nodes (6): IdentityKey, IdentityKeyAlgorithm, identityKeyAlgorithms, ColumnRow, expectedColumns, jwk

### Community 38 - "Project"
Cohesion: 0.20
Nodes (4): ApiKeyKind, apiKeyKinds, Project, ColumnRow

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

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
Cohesion: 0.13
Nodes (16): configureApiApp(), ApiModule, CliModule, createContext(), mode, runApi(), runCli(), runMigrate() (+8 more)

### Community 48 - "audit-log.e2e-spec.ts"
Cohesion: 0.17
Nodes (6): ProjectsModule, ProjectsRepository, WorkerModule, ScenarioError, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 49 - "AuditLogEntry"
Cohesion: 0.21
Nodes (5): ActorKind, AuditLogEntry, NewAuditLogEntry, AuditRecord, JsonObject

### Community 50 - "server-errors.spec.ts"
Cohesion: 0.11
Nodes (19): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, internalErrorMessage, ApiExceptionInput, entries() (+11 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.11
Nodes (21): fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), ApiRun (+13 more)

### Community 52 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 54 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 55 - "Zone"
Cohesion: 0.19
Nodes (11): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+3 more)

### Community 56 - "json-object-limits.spec.ts"
Cohesion: 0.10
Nodes (15): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+7 more)

### Community 57 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 59 - "@nestjs/common"
Cohesion: 0.08
Nodes (25): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, auditedEventNames(), AuditRule, auditRules (+17 more)

### Community 60 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 61 - "zone.guard.spec.ts"
Cohesion: 0.17
Nodes (6): CapturedResponse, FakeRequest, guardedControllers, startApp(), unitPorts, @nestjs/core

### Community 63 - "ZoneServers"
Cohesion: 0.27
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 64 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 66 - "NeutralProbeController"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 69 - "config.module.ts"
Cohesion: 0.26
Nodes (12): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+4 more)

### Community 70 - "zone.ts"
Cohesion: 0.17
Nodes (14): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes (+6 more)

### Community 72 - "zone-probe.ts"
Cohesion: 0.17
Nodes (18): findZonePorts(), probeControllers, findFreePort(), withOfflineDatabase(), offlineRedis, withOfflineRedis(), readyRedis, RedisStub (+10 more)

### Community 78 - "audit-log-table.e2e-spec.ts"
Cohesion: 0.21
Nodes (9): actorKinds, ColumnRow, expectedColumns, ColumnRow, expectedColumns, createProject(), ProjectFixture, truncateAllTables() (+1 more)

### Community 79 - "logger.module.ts"
Cohesion: 0.24
Nodes (10): pino@^10.4.0, createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions(), redactPaths, sensitiveFields (+2 more)

### Community 80 - "health.module.ts"
Cohesion: 0.06
Nodes (19): ioredis@^6.0.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+11 more)

### Community 83 - "api.module.ts"
Cohesion: 0.16
Nodes (11): databaseEntities, AuditModule, AppClsModule, AppConfigModule, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules (+3 more)

### Community 86 - "cls-middleware.ts"
Cohesion: 0.32
Nodes (7): useClsMiddleware(), noStore(), useSecurityHeaders(), echoRequestId(), resolveRequestId(), createE2eApp(), nestjs-pino

### Community 90 - "redis-connection.e2e-spec.ts"
Cohesion: 0.29
Nodes (7): fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableRedisUrl(), waitForHttpStatus()

### Community 93 - "@nestjs/common"
Cohesion: 0.11
Nodes (9): probeControllers, probeControllers, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, zoneMetadataKey, ZoneProbeApp (+1 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 559 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `request-id.spec.ts`, `server/package.json`, `dependencies`, `http-error.filter.spec.ts`, `migrate.module.ts`, `metrics.controller.ts`, `body-limit.ts`, `main.ts`, `audit-log.e2e-spec.ts`, `AuditLogEntry`, `server-errors.spec.ts`, `log-redaction.spec.ts`, `zod-serialization.spec.ts`, `Zone`, `@nestjs/common`, `zone.guard.spec.ts`, `ZoneServers`, `config.module.ts`, `zone.ts`, `zone-probe.ts`, `log-destination.spec.ts`, `audit-log-table.e2e-spec.ts`, `logger.module.ts`, `health.module.ts`, `api.module.ts`, `cls-middleware.ts`, `status.controller.spec.ts`?**
  _High betweenness centrality (0.235) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.08414634146341464 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `InternalProbeController`, `ZonedController`, `NeutralProbeController`, `ServerErrorsProbeController`, `ErrorProbeController`, `metrics.controller.ts`, `zone-probe.ts`, `BodyProbeController`, `zod-serialization.spec.ts`, `ValidationProbeController`, `health.module.ts`, `server-errors.spec.ts`, `zone.guard.spec.ts`, `MixedZoneController`, `http-error.filter.spec.ts`, `zod-serialization.spec.ts`, `Controller`, `@nestjs/common`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `migrate-mode.e2e-spec.ts`, `IdentityKey`, `server/package.json`, `Project`, `ref_node_path`, `dependencies`, `audit-log-table.e2e-spec.ts`, `audit-log.e2e-spec.ts`, `AuditLogEntry`, `log-settings.e2e-spec.ts`, `database-entities.ts`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Should `request-id.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._