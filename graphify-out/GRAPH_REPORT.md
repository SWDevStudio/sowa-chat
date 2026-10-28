# Graph Report - EPIC-9-7  (2026-10-29)

## Corpus Check
- 216 files · ~41,449 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1527 nodes · 3059 edges · 105 communities (76 shown, 29 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 54 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `16126715`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database.module.ts
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
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
- config.module.ts
- scripts
- api-keys.service.ts
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
- redis-connection.e2e-spec.ts
- @nestjs/common
- nest-cli.json
- audit-log.listener.spec.ts
- workspace-check-types.e2e-spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- health.e2e-spec.ts
- ValidationProbeController
- request-id.spec.ts
- audit-log.e2e-spec.ts
- AuditLogEntry
- server-errors.spec.ts
- log-settings.e2e-spec.ts
- Controller
- log-redaction.spec.ts
- migrate.module.ts
- api-docs.spec.ts
- json-object-schema.ts
- packages-build.e2e-spec.ts
- encryption.service.spec.ts
- status.service.ts
- cls-middleware.ts
- json-object-limits.spec.ts
- JsonObjectValidator
- encrypted-secret.spec.ts
- main.ts
- cache-manager@^7.2.9
- api-versioning.spec.ts
- typeorm
- MixedZoneController
- encryption-keys.schema.spec.ts
- zone.ts
- BodyProbeController
- zone-probe.ts
- zod-serialization.spec.ts
- database-connection.e2e-spec.ts
- ZonedController
- file-type@^22.1.1
- @nestjs/swagger
- audit-log-table.e2e-spec.ts
- IdentityKey
- @nestjs/common
- database-entities.ts
- redis-connection.e2e-spec.ts
- nestjs-cls
- @nestjs/cache-manager@^12.0.1
- status.controller.spec.ts
- body-limit.ts
- CreateApiKeys1793300000000
- AddProjectsPublicKey1793300002000
- TestEncryptionConfigModule
- InternalProbeController
- bullmq@^6.3.15
- helmet
- security-headers.spec.ts
- nest-commander@^3.21.0
- @nestjs/bullmq@^12.0.0
- @nestjs/platform-socket.io@^12.1.3
- pino-http

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 78 edges
2. `Zone()` - 44 edges
3. `findFreePort()` - 25 edges
4. `typeorm` - 24 edges
5. `Project` - 22 edges
6. `startZoneProbeApp()` - 22 edges
7. `ApiKey` - 21 edges
8. `@nestjs/testing` - 20 edges
9. `compilerOptions` - 20 edges
10. `@nestjs/config` - 18 edges

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

## Communities (105 total, 29 thin omitted)

### Community 0 - "database.module.ts"
Cohesion: 0.11
Nodes (14): DatabaseMigration, databaseMigrations, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection (+6 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.10
Nodes (19): pino@^10.4.0, createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions(), redactPaths, sensitiveFields (+11 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (42): author, description, devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0 (+34 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

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
Cohesion: 0.06
Nodes (36): dependencies, @aws-sdk/client-s3@^3.1151.0, jose@^6.2.12, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1 (+28 more)

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

### Community 23 - "protocol/src/index.ts"
Cohesion: 0.12
Nodes (13): errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema (+5 more)

### Community 24 - "config.module.ts"
Cohesion: 0.30
Nodes (12): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+4 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "api-keys.service.ts"
Cohesion: 0.05
Nodes (38): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey, ApiKeysService, hashMatches(), eventFields, IssueApiKeyInput (+30 more)

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

### Community 34 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "redis-connection.e2e-spec.ts"
Cohesion: 0.20
Nodes (8): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 38 - "@nestjs/common"
Cohesion: 0.13
Nodes (8): zoneMetadataKey, CapturedResponse, FakeRequest, guardedControllers, startApp(), unitPorts, @nestjs/common, @nestjs/core

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "audit-log.listener.spec.ts"
Cohesion: 0.06
Nodes (33): CliModule, ActorKind, AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, NewAuditLogEntry (+25 more)

### Community 41 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 47 - "request-id.spec.ts"
Cohesion: 0.15
Nodes (10): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+2 more)

### Community 48 - "audit-log.e2e-spec.ts"
Cohesion: 0.18
Nodes (5): ProjectsModule, ProjectsRepository, WorkerModule, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 49 - "AuditLogEntry"
Cohesion: 0.16
Nodes (4): actorKinds, AuditLogEntry, ColumnRow, expectedColumns

### Community 50 - "server-errors.spec.ts"
Cohesion: 0.16
Nodes (13): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ApiExceptionInput, entries(), errorEntriesOf() (+5 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 54 - "migrate.module.ts"
Cohesion: 0.12
Nodes (10): DatabaseMigrationStep, runDatabaseMigrations(), PreparationRunner, PreparationStep, preparationSteps, MigrateModule, setup(), startPostgresContainer() (+2 more)

### Community 55 - "api-docs.spec.ts"
Cohesion: 0.15
Nodes (11): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+3 more)

### Community 56 - "json-object-schema.ts"
Cohesion: 0.12
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, jsonObjectSchema, Violation, JsonObjectLimits, JsonValue (+1 more)

### Community 57 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 58 - "encryption.service.spec.ts"
Cohesion: 0.16
Nodes (11): encryptionConfig, CryptoModule, formatEncryptedSecret(), parseEncryptedSecret(), EncryptionService, SecretDecryptionError, captureError(), createService() (+3 more)

### Community 59 - "status.service.ts"
Cohesion: 0.17
Nodes (6): readServerVersion(), StatusController, DependencyStatus, ServerStatus, StatusService, toDependencyStatus()

### Community 60 - "cls-middleware.ts"
Cohesion: 0.19
Nodes (7): ApiModule, useClsMiddleware(), LogDestination, echoRequestId(), resolveRequestId(), createE2eApp(), nestjs-pino

### Community 61 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 63 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 64 - "main.ts"
Cohesion: 0.21
Nodes (12): createContext(), mode, runApi(), runCli(), runMigrate(), runners, runToCompletion(), runWorker() (+4 more)

### Community 66 - "api-versioning.spec.ts"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 67 - "typeorm"
Cohesion: 0.22
Nodes (5): Project, ColumnRow, ProjectFixture, JsonObject, typeorm

### Community 68 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 69 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 70 - "zone.ts"
Cohesion: 0.12
Nodes (17): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes (+9 more)

### Community 72 - "zone-probe.ts"
Cohesion: 0.16
Nodes (18): findZonePorts(), probeControllers, findFreePort(), serverDirectory, withOfflineDatabase(), offlineRedis, withOfflineRedis(), readyRedis (+10 more)

### Community 73 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 74 - "database-connection.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), Env

### Community 77 - "@nestjs/swagger"
Cohesion: 0.20
Nodes (6): @nestjs/swagger@^12.0.2, socket.io@^4.8.4, @sowa-chat/protocol@workspace:*, @nestjs/swagger, socket.io, @sowa-chat/protocol

### Community 78 - "audit-log-table.e2e-spec.ts"
Cohesion: 0.26
Nodes (6): apiKeyKinds, ColumnRow, expectedColumns, createProject(), truncateAllTables(), useTestDatabase()

### Community 79 - "IdentityKey"
Cohesion: 0.14
Nodes (7): IdentityKey, IdentityKeyAlgorithm, identityKeyAlgorithms, ColumnRow, expectedColumns, jwk, jose

### Community 80 - "@nestjs/common"
Cohesion: 0.13
Nodes (5): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, @nestjs/terminus

### Community 81 - "database-entities.ts"
Cohesion: 0.48
Nodes (3): database, loadDataSource(), databaseEntities

### Community 82 - "redis-connection.e2e-spec.ts"
Cohesion: 0.33
Nodes (6): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableRedisUrl(), waitForHttpStatus()

### Community 85 - "status.controller.spec.ts"
Cohesion: 0.33
Nodes (3): DependencyStatusBody, StatusBody, databaseUrl()

### Community 86 - "body-limit.ts"
Cohesion: 0.20
Nodes (10): configureApiApp(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders() (+2 more)

### Community 90 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 93 - "security-headers.spec.ts"
Cohesion: 0.12
Nodes (7): probeControllers, probeControllers, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ZoneProbeApp

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 602 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `database.module.ts`, `log-level-warn.spec.ts`, `devDependencies`, `dependencies`, `http-error.filter.spec.ts`, `config.module.ts`, `api-keys.service.ts`, `metrics.controller.ts`, `redis-connection.e2e-spec.ts`, `audit-log.listener.spec.ts`, `request-id.spec.ts`, `audit-log.e2e-spec.ts`, `server-errors.spec.ts`, `log-redaction.spec.ts`, `migrate.module.ts`, `api-docs.spec.ts`, `encryption.service.spec.ts`, `status.service.ts`, `cls-middleware.ts`, `main.ts`, `zone.ts`, `zone-probe.ts`, `zod-serialization.spec.ts`, `audit-log-table.e2e-spec.ts`, `@nestjs/common`, `status.controller.spec.ts`, `body-limit.ts`, `security-headers.spec.ts`?**
  _High betweenness centrality (0.241) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10804597701149425 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database.module.ts`, `migrate-mode.e2e-spec.ts`, `devDependencies`, `ref_node_path`, `database-connection.e2e-spec.ts`, `dependencies`, `audit-log-table.e2e-spec.ts`, `IdentityKey`, `audit-log.e2e-spec.ts`, `database-entities.ts`, `AuditLogEntry`, `CreateApiKeys1793300000000`, `AddProjectsPublicKey1793300002000`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `zone-probe.ts` to `api-keys.service.ts`, `devDependencies`, `audit-log.listener.spec.ts`, `database-connection.e2e-spec.ts`, `audit-log.e2e-spec.ts`, `AuditLogEntry`, `redis-connection.e2e-spec.ts`, `config.module.ts`, `encryption.service.spec.ts`, `cls-middleware.ts`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `log-level-warn.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10338680926916222 - nodes in this community are weakly interconnected._