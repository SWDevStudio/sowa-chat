# Graph Report - hector-chat-epic-9  (2026-10-29)

## Corpus Check
- 232 files · ~44,478 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1624 nodes · 3312 edges · 116 communities (81 shown, 35 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 61 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0e18935c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- server/package.json
- server-modes.e2e-spec.ts
- DomainEventBus
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
- ApiKey
- logging.e2e-spec.ts
- e2e-server.ts
- provided-context.d.ts
- request-id.e2e-spec.ts
- server-protocol.e2e-spec.ts
- .create
- metrics.controller.ts
- findFreePort
- ServerErrorsProbeController
- tsconfig.build.json
- key-format.ts
- body-limit.spec.ts
- nest-cli.json
- audit-log.listener.spec.ts
- workspace-check-types.e2e-spec.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- health.e2e-spec.ts
- ValidationProbeController
- api-keys-service-probe.ts
- audit-log.e2e-spec.ts
- AuditLogEntry
- server-errors.spec.ts
- log-settings.e2e-spec.ts
- Controller
- log-redaction.spec.ts
- main.ts
- Zone
- json-object-schema.ts
- slow-operations.ts
- encryption.service.spec.ts
- zone.guard.spec.ts
- cls-middleware.ts
- json-object-limits.spec.ts
- JsonObjectValidator
- OperationSteps
- domain-event-bus.spec.ts
- global-setup.ts
- request-id.spec.ts
- HttpMetrics
- slow-operations.spec.ts
- encryption-keys.schema.spec.ts
- api-versioning.spec.ts
- api-key.entity.ts
- zone-servers.spec.ts
- fixtures.ts
- telemetry.interceptor.spec.ts
- typeorm
- RedactionProbeController
- .log
- api-keys.service.ts
- IdentityKey
- health.module.ts
- worker.module.ts
- redis-connection.e2e-spec.ts
- @nestjs/testing
- @nestjs/cache-manager@^12.0.1
- env.schema.logging.spec.ts
- body-limit.ts
- ApiKeysService
- ErrorProbeController
- server/package.json
- InternalProbeController
- bullmq@^6.3.15
- DatabaseStepSubscriber
- TelemetryProbeController
- database-migrations.spec.ts
- @nestjs/bullmq@^12.0.0
- DatabaseEntity
- CreateProjects1793193549883
- ZoneServers
- sharp@^0.35.5
- CreateAuditLog1793200000000
- CreateApiKeys1793300000000
- AddProjectsPublicKey1793300002000
- ProbeController
- TestEncryptionConfigModule
- nest-commander@^3.21.0
- socket.io@^4.8.4
- HealthModule

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 88 edges
2. `Zone()` - 46 edges
3. `typeorm` - 27 edges
4. `findFreePort()` - 25 edges
5. `@nestjs/testing` - 23 edges
6. `startZoneProbeApp()` - 23 edges
7. `Project` - 22 edges
8. `@nestjs/config` - 21 edges
9. `ApiKey` - 21 edges
10. `compilerOptions` - 20 edges

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

## Communities (116 total, 35 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.24
Nodes (6): DatabaseMigration, databaseMigrations, DatabaseConnection, FirstEntity, SecondEntity, CreateIdentityKeys1793300001000

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.29
Nodes (9): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+1 more)

### Community 4 - "server/package.json"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "DomainEventBus"
Cohesion: 0.16
Nodes (4): DomainEventBus, AuditScenarios, happenedIn(), ScenarioError

### Community 7 - "env.schema.ts"
Cohesion: 0.10
Nodes (18): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange() (+10 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.10
Nodes (16): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, builtFiles, CommandResult, entriesByPackage, plannedBuildTasks() (+8 more)

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
Nodes (34): dependencies, @aws-sdk/s3-request-presigner@^3.1151.0, cache-manager@^7.2.9, file-type@^22.1.1, helmet@^8.3.0, jose@^6.2.12, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1 (+26 more)

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
Nodes (13): ApiHttpModule, errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter, requestIdOf() (+5 more)

### Community 23 - "protocol/src/index.ts"
Cohesion: 0.23
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 24 - "config.module.ts"
Cohesion: 0.28
Nodes (13): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+5 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (12): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, waitForHttpStatus() (+4 more)

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

### Community 34 - "findFreePort"
Cohesion: 0.11
Nodes (21): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), serverEnvironment() (+13 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "key-format.ts"
Cohesion: 0.15
Nodes (14): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+6 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "audit-log.listener.spec.ts"
Cohesion: 0.16
Nodes (14): AuditLogListener, eventValues, happened, personalValues, auditedEventNames(), AuditRule, auditRules, auditedEvents (+6 more)

### Community 41 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "ResponseProbeController"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 45 - "health.e2e-spec.ts"
Cohesion: 0.25
Nodes (6): DependencyStatusBody, fetchStatus(), repositoryRoot, serverPackageJson, StatusBody, waitForHttpStatus()

### Community 46 - "ValidationProbeController"
Cohesion: 0.13
Nodes (5): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ValidationProbeController

### Community 47 - "api-keys-service-probe.ts"
Cohesion: 0.26
Nodes (11): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+3 more)

### Community 48 - "audit-log.e2e-spec.ts"
Cohesion: 0.12
Nodes (7): Project, ProjectsModule, ProjectsRepository, WorkerModule, ColumnRow, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 49 - "AuditLogEntry"
Cohesion: 0.14
Nodes (9): ActorKind, actorKinds, AuditLogEntry, AuditLogRepository, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns (+1 more)

### Community 50 - "server-errors.spec.ts"
Cohesion: 0.11
Nodes (19): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, internalErrorMessage, ApiExceptionInput, entries() (+11 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "Controller"
Cohesion: 0.21
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.16
Nodes (13): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+5 more)

### Community 54 - "main.ts"
Cohesion: 0.06
Nodes (32): nestjs-pino@^5.3.1, pino@^10.4.0, ApiModule, CliModule, DatabaseMigrationStep, createStdoutDestination(), LogDestination, baseOptions() (+24 more)

### Community 55 - "Zone"
Cohesion: 0.11
Nodes (14): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+6 more)

### Community 56 - "json-object-schema.ts"
Cohesion: 0.12
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, jsonObjectSchema, Violation, JsonObjectLimits, JsonValue (+1 more)

### Community 57 - "slow-operations.ts"
Cohesion: 0.19
Nodes (6): operationSteps, StepTimes, FinishedOperation, SlowOperationsModule, roundSteps(), SlowOperations

### Community 58 - "encryption.service.spec.ts"
Cohesion: 0.09
Nodes (21): encryptionConfig, CryptoModule, authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext (+13 more)

### Community 59 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 60 - "cls-middleware.ts"
Cohesion: 0.46
Nodes (4): useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp()

### Community 61 - "json-object-limits.spec.ts"
Cohesion: 0.14
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 63 - "OperationSteps"
Cohesion: 0.19
Nodes (3): OperationStep, OperationSteps, OperationStepsProbeController

### Community 64 - "domain-event-bus.spec.ts"
Cohesion: 0.23
Nodes (9): happened, TestListener, DomainEventHandler, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent (+1 more)

### Community 65 - "global-setup.ts"
Cohesion: 0.24
Nodes (9): testcontainers@^12.2.1, @testcontainers/postgresql@^12.2.1, runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl(), testcontainers (+1 more)

### Community 66 - "request-id.spec.ts"
Cohesion: 0.24
Nodes (8): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, ProbeService, waitForRequestEntry()

### Community 68 - "slow-operations.spec.ts"
Cohesion: 0.24
Nodes (3): LogEntry, pause(), SlowProbeController

### Community 69 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 70 - "api-versioning.spec.ts"
Cohesion: 0.15
Nodes (5): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController, ZoneProbeApp

### Community 71 - "api-key.entity.ts"
Cohesion: 0.31
Nodes (5): ApiKeyKind, apiKeyKinds, NewApiKey, ColumnRow, expectedColumns

### Community 72 - "zone-servers.spec.ts"
Cohesion: 0.11
Nodes (20): configureApiApp(), HealthBody, HealthEntry, DependencyStatusBody, StatusBody, noStore(), useSecurityHeaders(), probeControllers (+12 more)

### Community 73 - "fixtures.ts"
Cohesion: 0.36
Nodes (5): createDataSourceOptions(), createProject(), ProjectFixture, truncateAllTables(), useTestDatabase()

### Community 74 - "telemetry.interceptor.spec.ts"
Cohesion: 0.13
Nodes (19): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, ApiZone, apiZones (+11 more)

### Community 75 - "typeorm"
Cohesion: 0.38
Nodes (4): typeorm@^1.1.2, database, loadDataSource(), typeorm

### Community 78 - "api-keys.service.ts"
Cohesion: 0.21
Nodes (9): hashMatches(), IssueApiKeyBaseInput, IssueApiKeyInput, IssuedApiKey, KeyActorKind, keyTypeByKind, RevokeApiKeyInput, VerifiedApiKey (+1 more)

### Community 79 - "IdentityKey"
Cohesion: 0.14
Nodes (6): IdentityKey, IdentityKeyAlgorithm, identityKeyAlgorithms, ColumnRow, expectedColumns, jwk

### Community 80 - "health.module.ts"
Cohesion: 0.10
Nodes (11): DependencyChecks, HealthController, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus, StatusService (+3 more)

### Community 81 - "worker.module.ts"
Cohesion: 0.16
Nodes (10): databaseEntities, AuditModule, AppClsModule, AppConfigModule, DatabaseModule, typeOrmModules, ZonesModule, MetricsModule (+2 more)

### Community 82 - "redis-connection.e2e-spec.ts"
Cohesion: 0.13
Nodes (14): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, fetchStatus() (+6 more)

### Community 83 - "@nestjs/testing"
Cohesion: 0.31
Nodes (6): OperationTiming, beginOperation(), operationTimingKey, nestjs-cls, @nestjs/testing, @nestjs/typeorm

### Community 85 - "env.schema.logging.spec.ts"
Cohesion: 0.33
Nodes (3): Env, logLevels, requiredEnv

### Community 86 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 87 - "ApiKeysService"
Cohesion: 0.22
Nodes (3): ApiKeysService, toEvent(), KeysModule

### Community 89 - "server/package.json"
Cohesion: 0.08
Nodes (23): author, @aws-sdk/client-s3@^3.1151.0, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/platform-socket.io@^12.1.3, @nestjs/throttler@^6.7.1, pino-http@^11.0.0, @socket.io/redis-adapter@^8.3.0, @sowa-chat/protocol@workspace:* (+15 more)

### Community 90 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 96 - "DatabaseEntity"
Cohesion: 0.50
Nodes (3): createTypeOrmModule(), getTypeOrmModule(), DatabaseEntity

### Community 98 - "ZoneServers"
Cohesion: 0.20
Nodes (3): startListening(), stopListening(), ZoneServers

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 633 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `health.module.ts` to `log-level-warn.spec.ts`, `dependencies`, `http-error.filter.spec.ts`, `config.module.ts`, `metrics.controller.ts`, `body-limit.spec.ts`, `audit-log.listener.spec.ts`, `ResponseProbeController`, `ValidationProbeController`, `audit-log.e2e-spec.ts`, `AuditLogEntry`, `server-errors.spec.ts`, `Controller`, `log-redaction.spec.ts`, `main.ts`, `Zone`, `slow-operations.ts`, `encryption.service.spec.ts`, `zone.guard.spec.ts`, `cls-middleware.ts`, `domain-event-bus.spec.ts`, `request-id.spec.ts`, `slow-operations.spec.ts`, `api-versioning.spec.ts`, `api-key.entity.ts`, `zone-servers.spec.ts`, `fixtures.ts`, `telemetry.interceptor.spec.ts`, `api-keys.service.ts`, `worker.module.ts`, `redis-connection.e2e-spec.ts`, `@nestjs/testing`, `body-limit.ts`, `ApiKeysService`, `server/package.json`, `ZoneServers`?**
  _High betweenness centrality (0.269) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `metrics.controller.ts`, `ServerErrorsProbeController`, `body-limit.spec.ts`, `api-versioning.spec.ts`, `zone-servers.spec.ts`, `telemetry.interceptor.spec.ts`, `ResponseProbeController`, `ValidationProbeController`, `health.module.ts`, `server-errors.spec.ts`, `Controller`, `http-error.filter.spec.ts`, `ErrorProbeController`, `InternalProbeController`, `zone.guard.spec.ts`, `TelemetryProbeController`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Should `server/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `@nestjs/testing` to `domain-event-bus.spec.ts`, `findFreePort`, `server/package.json`, `key-format.ts`, `audit-log.listener.spec.ts`, `zone-servers.spec.ts`, `api-keys-service-probe.ts`, `audit-log.e2e-spec.ts`, `AuditLogEntry`, `redis-connection.e2e-spec.ts`, `config.module.ts`, `server/package.json`, `encryption.service.spec.ts`, `cls-middleware.ts`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Should `server-modes.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13071895424836602 - nodes in this community are weakly interconnected._