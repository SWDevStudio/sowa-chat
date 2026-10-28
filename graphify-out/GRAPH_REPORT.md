# Graph Report - hector-chat-epic-9  (2026-10-29)

## Corpus Check
- 216 files · ~41,624 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1534 nodes · 3072 edges · 106 communities (74 shown, 32 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 54 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `766a836a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- typeorm
- bot-sdk/tsconfig.json
- package.json
- request-id.spec.ts
- server/package.json
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
- @nestjs/common
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
- packages-build.e2e-spec.ts
- encryption.service.spec.ts
- zone.guard.spec.ts
- api.module.ts
- json-object-limits.spec.ts
- JsonObjectValidator
- encrypted-secret.spec.ts
- domain-event-bus.spec.ts
- cache-manager@^7.2.9
- NeutralProbeController
- api-keys.e2e-spec.ts
- MixedZoneController
- encryption-keys.schema.spec.ts
- zone.ts
- BodyProbeController
- zone-servers.spec.ts
- zod-serialization.spec.ts
- api-docs.ts
- ZonedController
- file-type@^22.1.1
- http-error.filter.ts
- api-keys.service.ts
- Project
- health.module.ts
- worker.module.ts
- redis-connection.e2e-spec.ts
- nestjs-cls
- @nestjs/cache-manager@^12.0.1
- status.controller.spec.ts
- body-parser-error.middleware.ts
- ApiKeysService
- ErrorProbeController
- @nestjs/throttler@^6.7.1
- InternalProbeController
- bullmq@^6.3.15
- jose
- @nest-lab/throttler-storage-redis@^1.2.0
- @nestjs/bullmq@^12.0.0
- @nestjs/microservices@^12.1.3
- pino-http
- sharp@^0.35.5

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

## Communities (106 total, 32 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.07
Nodes (23): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createTypeOrmModule(), getTypeOrmModule(), typeOrmModules, createDataSourceOptions() (+15 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "request-id.spec.ts"
Cohesion: 0.08
Nodes (19): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+11 more)

### Community 4 - "server/package.json"
Cohesion: 0.06
Nodes (42): author, description, devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0 (+34 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (20): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange() (+12 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.17
Nodes (7): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, IdentityRow, VersionRow, testEnv

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
Nodes (35): dependencies, @aws-sdk/client-s3@^3.1151.0, helmet@^8.3.0, nest-commander@^3.21.0, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1 (+27 more)

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
Cohesion: 0.21
Nodes (9): errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse(), validationErrorResponse(), knownKeys, ProbeBodyDto (+1 more)

### Community 23 - "protocol/src/index.ts"
Cohesion: 0.23
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 24 - "config.module.ts"
Cohesion: 0.30
Nodes (12): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+4 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.23
Nodes (9): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, waitForHttpStatus() (+1 more)

### Community 28 - "e2e-server.ts"
Cohesion: 0.23
Nodes (10): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), parseLogLine() (+2 more)

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 32 - ".create"
Cohesion: 0.17
Nodes (5): happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 33 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 34 - "findFreePort"
Cohesion: 0.11
Nodes (20): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), serverEnvironment() (+12 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "key-format.ts"
Cohesion: 0.23
Nodes (13): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+5 more)

### Community 38 - "@nestjs/common"
Cohesion: 0.17
Nodes (7): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, zoneMetadataKey, @nestjs/common, @nestjs/core

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "audit-log.listener.spec.ts"
Cohesion: 0.10
Nodes (19): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, auditedEventNames(), AuditRecord, AuditRule (+11 more)

### Community 41 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 47 - "api-keys-service-probe.ts"
Cohesion: 0.26
Nodes (11): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+3 more)

### Community 48 - "audit-log.e2e-spec.ts"
Cohesion: 0.14
Nodes (6): ProjectsModule, ProjectsRepository, WorkerModule, AuditScenarios, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 49 - "AuditLogEntry"
Cohesion: 0.18
Nodes (6): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, ColumnRow, expectedColumns

### Community 50 - "server-errors.spec.ts"
Cohesion: 0.12
Nodes (18): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ApiExceptionInput, entries(), errorEntriesOf() (+10 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 54 - "main.ts"
Cohesion: 0.07
Nodes (29): pino@^10.4.0, configureApiApp(), CliModule, DatabaseMigrationStep, createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions() (+21 more)

### Community 55 - "Zone"
Cohesion: 0.15
Nodes (11): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+3 more)

### Community 56 - "json-object-schema.ts"
Cohesion: 0.12
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, jsonObjectSchema, Violation, JsonObjectLimits, JsonValue (+1 more)

### Community 57 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 58 - "encryption.service.spec.ts"
Cohesion: 0.12
Nodes (15): encryptionConfig, CryptoModule, authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService (+7 more)

### Community 59 - "zone.guard.spec.ts"
Cohesion: 0.18
Nodes (6): CapturedResponse, FakeRequest, guardedControllers, startApp(), unitPorts, startZoneProbeApp()

### Community 60 - "api.module.ts"
Cohesion: 0.19
Nodes (7): ApiModule, useClsMiddleware(), DatabaseModule, echoRequestId(), resolveRequestId(), ZonesModule, createE2eApp()

### Community 61 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 63 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 64 - "domain-event-bus.spec.ts"
Cohesion: 0.29
Nodes (7): happened, TestListener, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 66 - "NeutralProbeController"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 68 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 69 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 70 - "zone.ts"
Cohesion: 0.11
Nodes (12): probeControllers, HealthBody, HealthEntry, probeControllers, ApiZone, apiZones, ports, startListening() (+4 more)

### Community 72 - "zone-servers.spec.ts"
Cohesion: 0.13
Nodes (19): bodyLimit, useBodyLimit(), LogDestination, probeControllers, withOfflineDatabase(), offlineRedis, withOfflineRedis(), readyRedis (+11 more)

### Community 73 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 74 - "api-docs.ts"
Cohesion: 0.25
Nodes (8): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, ZoneGuard, zoneOfPort()

### Community 77 - "http-error.filter.ts"
Cohesion: 0.27
Nodes (5): ApiHttpModule, HttpErrorFilter, requestIdOf(), responseZodErrorOf(), nestjs-zod

### Community 78 - "api-keys.service.ts"
Cohesion: 0.17
Nodes (12): ApiKeyKind, apiKeyKinds, NewApiKey, hashMatches(), IssueApiKeyBaseInput, IssueApiKeyInput, IssuedApiKey, KeyActorKind (+4 more)

### Community 79 - "Project"
Cohesion: 0.08
Nodes (15): IdentityKey, IdentityKeyAlgorithm, identityKeyAlgorithms, Project, ColumnRow, expectedColumns, ColumnRow, expectedColumns (+7 more)

### Community 80 - "health.module.ts"
Cohesion: 0.06
Nodes (17): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+9 more)

### Community 81 - "worker.module.ts"
Cohesion: 0.19
Nodes (7): database, loadDataSource(), databaseEntities, AuditModule, AppClsModule, AppConfigModule, TelemetryModule

### Community 82 - "redis-connection.e2e-spec.ts"
Cohesion: 0.24
Nodes (9): ioredis@^6.0.0, fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableRedisUrl(), waitForHttpStatus(), useTestRedis() (+1 more)

### Community 85 - "status.controller.spec.ts"
Cohesion: 0.29
Nodes (4): DependencyStatusBody, StatusBody, databaseUrl(), redisUrl()

### Community 86 - "body-parser-error.middleware.ts"
Cohesion: 0.32
Nodes (5): BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders()

### Community 89 - "@nestjs/throttler@^6.7.1"
Cohesion: 0.20
Nodes (6): @nestjs/throttler@^6.7.1, @nestjs/websockets@^12.1.3, zod@catalog:, zod, @nestjs/throttler, @nestjs/websockets

### Community 90 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 604 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **32 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `typeorm`, `request-id.spec.ts`, `server/package.json`, `dependencies`, `http-error.filter.spec.ts`, `config.module.ts`, `metrics.controller.ts`, `audit-log.listener.spec.ts`, `audit-log.e2e-spec.ts`, `AuditLogEntry`, `server-errors.spec.ts`, `log-redaction.spec.ts`, `main.ts`, `Zone`, `encryption.service.spec.ts`, `zone.guard.spec.ts`, `api.module.ts`, `domain-event-bus.spec.ts`, `api-keys.e2e-spec.ts`, `zone.ts`, `zone-servers.spec.ts`, `zod-serialization.spec.ts`, `api-docs.ts`, `http-error.filter.ts`, `api-keys.service.ts`, `Project`, `health.module.ts`, `worker.module.ts`, `status.controller.spec.ts`, `body-parser-error.middleware.ts`?**
  _High betweenness centrality (0.262) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.06938775510204082 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `zone-servers.spec.ts` to `domain-event-bus.spec.ts`, `findFreePort`, `api-keys.e2e-spec.ts`, `server/package.json`, `audit-log.listener.spec.ts`, `api-keys-service-probe.ts`, `audit-log.e2e-spec.ts`, `AuditLogEntry`, `redis-connection.e2e-spec.ts`, `config.module.ts`, `encryption.service.spec.ts`, `api.module.ts`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `findFreePort`, `server/package.json`, `ref_node_path`, `dependencies`, `api-keys.service.ts`, `Project`, `audit-log.e2e-spec.ts`, `worker.module.ts`, `AuditLogEntry`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Should `request-id.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._