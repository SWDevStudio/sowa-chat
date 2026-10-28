# Graph Report - EPIC-8-2  (2026-10-28)

## Corpus Check
- 152 files · ~27,072 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1177 nodes · 2148 edges · 95 communities (63 shown, 32 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `32be57f7`
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
- zod-validation.spec.ts
- request-id.spec.ts
- scripts
- cache-manager@^7.2.9
- logging.e2e-spec.ts
- log-redaction.e2e-spec.ts
- provided-context.d.ts
- request-id.e2e-spec.ts
- server-protocol.e2e-spec.ts
- config.module.ts
- migrate.module.ts
- database-connection.e2e-spec.ts
- ServerErrorsProbeController
- tsconfig.build.json
- file-type@^22.1.1
- zone-servers.spec.ts
- nest-cli.json
- api-app.ts
- workspace-check-types.e2e-spec.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- @nestjs/common
- ValidationProbeController
- main.ts
- transactions.e2e-spec.ts
- @nestjs/microservices@^12.1.3
- api-exception.ts
- log-settings.e2e-spec.ts
- @nestjs/websockets@^12.1.3
- log-redaction.spec.ts
- protocol/src/index.ts
- audit-log-table.e2e-spec.ts
- AuditLogEntry
- database-entities.ts
- @sowa-chat/protocol@workspace:*
- logger.module.ts
- Controller
- zone.guard.spec.ts
- packages-build.e2e-spec.ts
- ZoneServers
- Zone
- ref_node_fs
- NeutralProbeController
- Zone
- ErrorProbeController
- run-database-migrations.ts
- api-docs.ts
- .probe
- typeorm
- helmet
- body-limit.spec.ts
- @nestjs/bullmq@^12.0.0
- jose@^6.2.12
- @nestjs/swagger
- @nestjs/event-emitter@^12.0.1
- prom-client@^15.1.3
- pino-http
- reflect-metadata@^0.2.2
- socket.io@^4.8.4
- rxjs@^7.8.1
- server-errors.spec.ts
- zod@catalog:
- @types/pg@^8.23.1
- @types/supertest@^7.0.0
- json-object-limits.spec.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 51 edges
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
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `Project` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/projects/project.entity.ts → packages/protocol/src/json-types.ts
- `ApiExceptionInput` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (95 total, 32 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.16
Nodes (6): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, CreateProjects1793193549883, CreateAuditLog1793200000000

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.17
Nodes (10): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+2 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.12
Nodes (15): author, bullmq@^6.3.15, ioredis@^6.0.0, @nestjs/throttler@^6.7.1, sharp@^0.35.5, description, license, name (+7 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (19): checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange(), logFormats (+11 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.22
Nodes (3): IdentityRow, VersionRow, testEnv

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
Nodes (26): dependencies, @aws-sdk/client-s3@^3.1151.0, @aws-sdk/s3-request-presigner@^3.1151.0, nest-commander@^3.21.0, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/cache-manager@^12.0.1, nestjs-cls@^7.0.1, @nestjs/common@^12.0.1 (+18 more)

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
Nodes (13): nestjs-zod@^5.5.0, errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter, requestIdOf() (+5 more)

### Community 23 - "zod-validation.spec.ts"
Cohesion: 0.33
Nodes (4): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto

### Community 24 - "request-id.spec.ts"
Cohesion: 0.24
Nodes (8): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, ProbeService, waitForRequestEntry()

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, runToExit() (+3 more)

### Community 28 - "log-redaction.e2e-spec.ts"
Cohesion: 0.31
Nodes (8): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), RunningServer

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 32 - "config.module.ts"
Cohesion: 0.31
Nodes (12): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+4 more)

### Community 33 - "migrate.module.ts"
Cohesion: 0.18
Nodes (4): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps

### Community 34 - "database-connection.e2e-spec.ts"
Cohesion: 0.11
Nodes (23): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus() (+15 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "zone-servers.spec.ts"
Cohesion: 0.15
Nodes (13): LogDestination, createRedactionProbeApp(), createRequestIdProbeApp(), probeControllers, withOfflineDatabase(), createProbeApp(), ProbeAppOptions, redirectLogsTo() (+5 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "api-app.ts"
Cohesion: 0.14
Nodes (16): nestjs-pino@^5.3.1, configureApiApp(), ApiModule, useClsMiddleware(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException() (+8 more)

### Community 41 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "ResponseProbeController"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 45 - "@nestjs/common"
Cohesion: 0.19
Nodes (10): databaseEntities, AppClsModule, AppConfigModule, DatabaseModule, typeOrmModules, ApiHttpModule, ZonesModule, nestjs-cls (+2 more)

### Community 47 - "main.ts"
Cohesion: 0.14
Nodes (14): CliModule, createContext(), mode, runCli(), runMigrate(), runners, runToCompletion(), runWorker() (+6 more)

### Community 48 - "transactions.e2e-spec.ts"
Cohesion: 0.11
Nodes (9): @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, ProjectsModule, ProjectsRepository, ScenarioError, SecondProjectsRepository, TransactionScenarios, @nestjs-cls/transactional (+1 more)

### Community 50 - "api-exception.ts"
Cohesion: 0.16
Nodes (12): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ErrorCode, errorCodes, errorDetailSchema (+4 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+2 more)

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (11): allOutput(), CapturedLogs, fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields, RedactionProbeController (+3 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.12
Nodes (10): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, jsonObjectSchema, JsonValue (+2 more)

### Community 55 - "audit-log-table.e2e-spec.ts"
Cohesion: 0.29
Nodes (8): ActorKind, actorKinds, NewAuditLogEntry, ColumnRow, expectedColumns, createProject(), ProjectFixture, JsonObject

### Community 57 - "database-entities.ts"
Cohesion: 0.26
Nodes (6): database, loadDataSource(), DatabaseConnection, DatabaseEntity, FirstEntity, SecondEntity

### Community 59 - "logger.module.ts"
Cohesion: 0.29
Nodes (8): createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions(), redactPaths, sensitiveFields, sensitiveHeaders

### Community 60 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 61 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (9): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController (+1 more)

### Community 62 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 63 - "ZoneServers"
Cohesion: 0.24
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 64 - "Zone"
Cohesion: 0.15
Nodes (8): BareController, MethodOnlyController, ZonedController, Zone(), InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 65 - "ref_node_fs"
Cohesion: 0.33
Nodes (4): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson

### Community 66 - "NeutralProbeController"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 67 - "Zone"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 69 - "run-database-migrations.ts"
Cohesion: 0.31
Nodes (6): createTypeOrmModule(), getTypeOrmModule(), createDataSourceOptions(), runDatabaseMigrations(), setup(), startPostgresContainer()

### Community 70 - "api-docs.ts"
Cohesion: 0.15
Nodes (16): probeControllers, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, probeControllers (+8 more)

### Community 72 - "typeorm"
Cohesion: 0.21
Nodes (6): typeorm@^1.1.2, Project, ColumnRow, truncateAllTables(), useTestDatabase(), typeorm

### Community 84 - "server-errors.spec.ts"
Cohesion: 0.28
Nodes (7): internalErrorMessage, ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, stringsInside()

### Community 115 - "json-object-limits.spec.ts"
Cohesion: 0.10
Nodes (16): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+8 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 465 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **32 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `log-level-warn.spec.ts`, `server/package.json`, `dependencies`, `http-error.filter.spec.ts`, `zod-validation.spec.ts`, `request-id.spec.ts`, `config.module.ts`, `migrate.module.ts`, `zone-servers.spec.ts`, `api-app.ts`, `ResponseProbeController`, `main.ts`, `transactions.e2e-spec.ts`, `api-exception.ts`, `log-redaction.spec.ts`, `audit-log-table.e2e-spec.ts`, `logger.module.ts`, `zone.guard.spec.ts`, `ZoneServers`, `Zone`, `Zone`, `api-docs.ts`, `typeorm`, `body-limit.spec.ts`, `server-errors.spec.ts`?**
  _High betweenness centrality (0.196) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `NeutralProbeController`, `Zone`, `ErrorProbeController`, `ServerErrorsProbeController`, `api-docs.ts`, `zone-servers.spec.ts`, `body-limit.spec.ts`, `ResponseProbeController`, `ValidationProbeController`, `server-errors.spec.ts`, `http-error.filter.spec.ts`, `zod-validation.spec.ts`, `Controller`, `zone.guard.spec.ts`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `typeorm`, `database-connection.e2e-spec.ts`, `run-database-migrations.ts`, `server/package.json`, `ref_node_path`, `transactions.e2e-spec.ts`, `audit-log-table.e2e-spec.ts`, `database-entities.ts`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Should `server-modes.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13071895424836602 - nodes in this community are weakly interconnected._