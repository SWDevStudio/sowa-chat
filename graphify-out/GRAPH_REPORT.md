# Graph Report - EPIC-15-2  (2026-10-28)

## Corpus Check
- 193 files · ~33,832 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1380 nodes · 2714 edges · 98 communities (63 shown, 35 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 47 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b9423fe9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- migrate-mode.e2e-spec.ts
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
- http-error.filter.spec.ts
- request-id.spec.ts
- redis.module.ts
- scripts
- zone-probe.ts
- logging.e2e-spec.ts
- log-redaction.e2e-spec.ts
- provided-context.d.ts
- request-id.e2e-spec.ts
- server-protocol.e2e-spec.ts
- json-object-schema.ts
- metrics.controller.ts
- findFreePort
- ServerErrorsProbeController
- tsconfig.build.json
- body-limit.spec.ts
- unit-probe.ts
- nest-cli.json
- ReplicaReadiness
- workspace-check-types.e2e-spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- health.e2e-spec.ts
- ValidationProbeController
- main.ts
- Zone
- migrate-mode.e2e-spec.ts
- server-errors.spec.ts
- log-settings.e2e-spec.ts
- JsonObjectValidator
- log-redaction.spec.ts
- protocol/src/index.ts
- audit-log.e2e-spec.ts
- json-object-limits.spec.ts
- packages-build.e2e-spec.ts
- log-redaction.spec.ts
- ZoneServers
- Controller
- Zone
- status.controller.spec.ts
- zod-validation.spec.ts
- zone-servers.spec.ts
- bullmq@^6.3.15
- api-versioning.spec.ts
- api-docs.spec.ts
- ErrorProbeController
- cache-manager@^7.2.9
- zone.decorator.ts
- jose@^6.2.12
- ProbeController
- operation-steps.spec.ts
- @nestjs/bullmq@^12.0.0
- @nestjs/throttler@^6.7.1
- @aws-sdk/client-s3@^3.1151.0
- api.module.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- @nestjs/common
- @nestjs/core
- @nestjs/swagger
- socket.io-client@catalog:
- @nestjs/cache-manager@^12.0.1
- @nestjs/websockets@^12.1.3
- pino-http
- @nestjs/microservices@^12.1.3
- sharp@^0.35.5
- zod@catalog:
- @vitest/coverage-v8@catalog:
- socket.io@^4.8.4

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 75 edges
2. `Zone()` - 44 edges
3. `findFreePort()` - 25 edges
4. `startZoneProbeApp()` - 22 edges
5. `compilerOptions` - 20 edges
6. `typeorm` - 19 edges
7. `@nestjs/testing` - 18 edges
8. `AuditLogEntry` - 17 edges
9. `Project` - 17 edges
10. `scripts` - 16 edges

## Surprising Connections (you probably didn't know these)
- `ApiExceptionInput` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts
- `AuditRecord` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-rule.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (98 total, 35 thin omitted)

### Community 0 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.10
Nodes (16): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity (+8 more)

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
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, source-map-support@^0.5.21, supertest@^7.0.0 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.11
Nodes (17): author, file-type@^22.1.1, nest-commander@^3.21.0, @nestjs/platform-socket.io@^12.1.3, pg@^8.23.1, @socket.io/redis-adapter@^8.3.0, description, license (+9 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (19): checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange(), logFormats (+11 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "redis-connection.e2e-spec.ts"
Cohesion: 0.14
Nodes (9): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, IdentityRow, VersionRow, useTestRedis(), redisUrl() (+1 more)

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
Nodes (25): dependencies, helmet@^8.3.0, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1, @nestjs/event-emitter@^12.0.1 (+17 more)

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

### Community 23 - "request-id.spec.ts"
Cohesion: 0.24
Nodes (8): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, ProbeService, waitForRequestEntry()

### Community 24 - "redis.module.ts"
Cohesion: 0.16
Nodes (9): ioredis@^6.0.0, HealthModule, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule (+1 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "zone-probe.ts"
Cohesion: 0.17
Nodes (12): HealthBody, HealthEntry, probeControllers, withOfflineDatabase(), offlineRedis, withOfflineRedis(), readyRedis, RedisStub (+4 more)

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

### Community 32 - "json-object-schema.ts"
Cohesion: 0.12
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, jsonObjectSchema, Violation, JsonObjectLimits, JsonValue (+1 more)

### Community 33 - "metrics.controller.ts"
Cohesion: 0.20
Nodes (3): MetricsController, MetricsModule, prom-client

### Community 34 - "findFreePort"
Cohesion: 0.14
Nodes (18): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), serverEnvironment() (+10 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "unit-probe.ts"
Cohesion: 0.21
Nodes (9): LogDestination, createRedactionProbeApp(), createRequestIdProbeApp(), createProbeApp(), ProbeAppOptions, redirectLogsTo(), stubTestEnv(), testEnv (+1 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

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
Cohesion: 0.07
Nodes (38): configureApiApp(), CliModule, appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig (+30 more)

### Community 48 - "Zone"
Cohesion: 0.26
Nodes (5): BareController, MethodOnlyController, ZonedController, Zone(), zoneMetadataKey

### Community 49 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 50 - "server-errors.spec.ts"
Cohesion: 0.16
Nodes (13): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ApiExceptionInput, entries(), errorEntriesOf() (+5 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.12
Nodes (13): errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema (+5 more)

### Community 55 - "audit-log.e2e-spec.ts"
Cohesion: 0.05
Nodes (26): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, Project, ProjectsModule, ProjectsRepository (+18 more)

### Community 56 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 57 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 58 - "log-redaction.spec.ts"
Cohesion: 0.22
Nodes (9): allOutput(), CapturedLogs, fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields, secretValueOf() (+1 more)

### Community 59 - "ZoneServers"
Cohesion: 0.22
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 60 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 61 - "Zone"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 62 - "status.controller.spec.ts"
Cohesion: 0.33
Nodes (3): DependencyStatusBody, StatusBody, databaseUrl()

### Community 63 - "zod-validation.spec.ts"
Cohesion: 0.33
Nodes (4): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto

### Community 64 - "zone-servers.spec.ts"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 66 - "api-versioning.spec.ts"
Cohesion: 0.19
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 67 - "api-docs.spec.ts"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 70 - "zone.decorator.ts"
Cohesion: 0.16
Nodes (14): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, probeControllers, ApiZone (+6 more)

### Community 73 - "operation-steps.spec.ts"
Cohesion: 0.09
Nodes (16): nestjs-cls@^7.0.1, ApiModule, useClsMiddleware(), echoRequestId(), resolveRequestId(), OperationStep, operationSteps, OperationTiming (+8 more)

### Community 78 - "api.module.ts"
Cohesion: 0.05
Nodes (42): database, loadDataSource(), databaseEntities, AuditLogListener, eventValues, happened, personalValues, AuditLogRepository (+34 more)

### Community 80 - "@nestjs/common"
Cohesion: 0.15
Nodes (9): DependencyChecks, readServerVersion(), StatusController, DependencyStatus, ServerStatus, StatusService, toDependencyStatus(), @nestjs/common (+1 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 532 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `log-level-warn.spec.ts`, `server/package.json`, `dependencies`, `http-error.filter.spec.ts`, `request-id.spec.ts`, `redis.module.ts`, `zone-probe.ts`, `metrics.controller.ts`, `body-limit.spec.ts`, `unit-probe.ts`, `zod-serialization.spec.ts`, `main.ts`, `Zone`, `server-errors.spec.ts`, `audit-log.e2e-spec.ts`, `log-redaction.spec.ts`, `Zone`, `status.controller.spec.ts`, `zod-validation.spec.ts`, `api-versioning.spec.ts`, `api-docs.spec.ts`, `zone.decorator.ts`, `operation-steps.spec.ts`, `api.module.ts`?**
  _High betweenness centrality (0.248) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `migrate-mode.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10483870967741936 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `zone-servers.spec.ts`, `metrics.controller.ts`, `api-versioning.spec.ts`, `api-docs.spec.ts`, `ErrorProbeController`, `body-limit.spec.ts`, `zone.decorator.ts`, `ServerErrorsProbeController`, `ReplicaReadiness`, `zod-serialization.spec.ts`, `ValidationProbeController`, `@nestjs/common`, `server-errors.spec.ts`, `http-error.filter.spec.ts`, `zone-probe.ts`, `Controller`, `Zone`, `zod-validation.spec.ts`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `findFreePort()` connect `findFreePort` to `health.e2e-spec.ts`, `migrate-mode.e2e-spec.ts`, `log-settings.e2e-spec.ts`, `redis.module.ts`, `zone-probe.ts`, `logging.e2e-spec.ts`, `log-redaction.e2e-spec.ts`, `request-id.e2e-spec.ts`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._