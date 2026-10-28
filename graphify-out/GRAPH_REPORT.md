# Graph Report - hector-chat-epic-10  (2026-10-29)

## Corpus Check
- 254 files · ~53,369 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1805 nodes · 3684 edges · 116 communities (80 shown, 36 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 63 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `34b55080`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- request-id.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- server/package.json
- env.schema.ts
- compilerOptions
- ref_node_path
- encryption.service.spec.ts
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
- server-errors.spec.ts
- api.module.ts
- test-database.ts
- scripts
- conversation.entity.spec.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- key-format.ts
- zone.guard.spec.ts
- ConversationEvent
- Visitor
- tsconfig.build.json
- ValidationProbeController
- http-error.filter.spec.ts
- nest-cli.json
- zone-servers.spec.ts
- typeorm
- server-sdk/tsconfig.json
- ResponseProbeController
- ApiKey
- findFreePort
- main.ts
- nest-commander@^3.21.0
- api-keys-service-probe.ts
- encryption-keys.schema.spec.ts
- database-connection.e2e-spec.ts
- redis.module.ts
- log-redaction.spec.ts
- ref_zod
- AuditLogEntry
- database.module.ts
- @nestjs/common
- migrate-mode.e2e-spec.ts
- config.module.ts
- InternalProbeController
- CreateChatTables1793215389271
- api-keys.service.ts
- ref_vitest
- NeutralProbeController
- api-keys.e2e-spec.ts
- encrypted-secret.spec.ts
- Zone
- telemetry.interceptor.spec.ts
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- json-object-limits.spec.ts
- telemetry.interceptor.ts
- packages-build.e2e-spec.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- participant.entity.spec.ts
- database-entities.ts
- @nestjs/cache-manager@^12.0.1
- health.e2e-spec.ts
- health.module.ts
- cache-manager@^7.2.9
- body-limit.spec.ts
- workspace-check-types.e2e-spec.ts
- zone.guard.spec.ts
- zod-serialization.spec.ts
- log-redaction.e2e-spec.ts
- @nestjs/microservices@^12.1.3
- global-setup.ts
- errors.spec.ts
- api-app.ts
- Message
- ServerErrorsProbeController
- error-response.ts
- ApiKeysService
- AddConversationIndexes1793215983154
- CreateApiKeys1793300000000
- CreateIdentityKeys1793300001000
- AddProjectsPublicKey1793300002000
- ErrorProbeController
- bullmq@^6.3.15
- ZonedController
- helmet
- slow-operations.ts
- @nestjs/platform-socket.io@^12.1.3
- @nestjs/swagger
- pg
- @nest-lab/throttler-storage-redis@^1.2.0
- vite@catalog:

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 88 edges
2. `Zone()` - 46 edges
3. `typeorm` - 43 edges
4. `Project` - 33 edges
5. `Conversation` - 26 edges
6. `findFreePort()` - 25 edges
7. `@nestjs/testing` - 24 edges
8. `startZoneProbeApp()` - 23 edges
9. `JsonObject` - 23 edges
10. `@nestjs/config` - 21 edges

## Surprising Connections (you probably didn't know these)
- `ConversationEvent` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation-event.entity.ts → packages/protocol/src/json-types.ts
- `Conversation` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation.entity.ts → packages/protocol/src/json-types.ts
- `Message` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/message.entity.ts → packages/protocol/src/json-types.ts
- `Project` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/projects/project.entity.ts → packages/protocol/src/json-types.ts
- `Visitor` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/visitors/visitor.entity.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (116 total, 36 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.17
Nodes (6): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, CreateProjects1793193549883, CreateAuditLog1793200000000

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
Nodes (19): author, @nestjs/bullmq@^12.0.0, @nestjs/throttler@^6.7.1, pino-http@^11.0.0, rxjs@^7.8.1, socket.io@^4.8.4, @sowa-chat/protocol@workspace:*, description (+11 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (21): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange() (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.11
Nodes (9): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, IdentityRow, VersionRow, useTestRedis(), redisUrl() (+1 more)

### Community 10 - "encryption.service.spec.ts"
Cohesion: 0.12
Nodes (15): encryptionConfig, CryptoModule, authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService (+7 more)

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

### Community 22 - "server-errors.spec.ts"
Cohesion: 0.16
Nodes (13): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, internalErrorMessage, ApiExceptionInput, entries() (+5 more)

### Community 23 - "api.module.ts"
Cohesion: 0.07
Nodes (32): databaseEntities, AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditModule, auditedEventNames() (+24 more)

### Community 24 - "test-database.ts"
Cohesion: 0.12
Nodes (14): apiKeyKinds, IdentityKeyAlgorithm, identityKeyAlgorithms, ColumnRow, expectedColumns, IndexRow, PlanRow, ColumnRow (+6 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "conversation.entity.spec.ts"
Cohesion: 0.16
Nodes (7): Channel, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (10): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, waitForHttpStatus() (+2 more)

### Community 28 - ".create"
Cohesion: 0.14
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.09
Nodes (27): ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation(), createMessage() (+19 more)

### Community 32 - "key-format.ts"
Cohesion: 0.21
Nodes (14): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+6 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "Visitor"
Cohesion: 0.15
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "http-error.filter.spec.ts"
Cohesion: 0.17
Nodes (6): HttpErrorFilter, requestIdOf(), responseZodErrorOf(), knownKeys, ProbeBodyDto, requestIdHeader

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-servers.spec.ts"
Cohesion: 0.10
Nodes (21): HealthBody, HealthEntry, DependencyStatusBody, StatusBody, LogDestination, LogEntry, databaseUrl(), withOfflineDatabase() (+13 more)

### Community 41 - "typeorm"
Cohesion: 0.10
Nodes (12): channelColumns(), findColumn(), ApiKeyKind, NewApiKey, Project, ProjectsModule, ProjectsRepository, WorkerModule (+4 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 46 - "findFreePort"
Cohesion: 0.13
Nodes (17): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), serverEnvironment() (+9 more)

### Community 47 - "main.ts"
Cohesion: 0.07
Nodes (32): configureApiApp(), CliModule, DatabaseMigrationStep, createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions() (+24 more)

### Community 49 - "api-keys-service-probe.ts"
Cohesion: 0.26
Nodes (11): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+3 more)

### Community 50 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 51 - "database-connection.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "redis.module.ts"
Cohesion: 0.20
Nodes (8): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 54 - "ref_zod"
Cohesion: 0.18
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 55 - "AuditLogEntry"
Cohesion: 0.11
Nodes (12): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns, ProjectFixture (+4 more)

### Community 56 - "database.module.ts"
Cohesion: 0.23
Nodes (9): createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity (+1 more)

### Community 57 - "@nestjs/common"
Cohesion: 0.10
Nodes (13): nestjs-zod@^5.5.0, prom-client@^15.1.3, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, zoneMetadataKey, MetricsController (+5 more)

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 59 - "config.module.ts"
Cohesion: 0.28
Nodes (13): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+5 more)

### Community 60 - "InternalProbeController"
Cohesion: 0.17
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController

### Community 62 - "api-keys.service.ts"
Cohesion: 0.18
Nodes (9): hashMatches(), IssueApiKeyBaseInput, IssueApiKeyInput, IssuedApiKey, KeyActorKind, keyTypeByKind, RevokeApiKeyInput, VerifiedApiKey (+1 more)

### Community 63 - "ref_vitest"
Cohesion: 0.42
Nodes (6): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl()

### Community 64 - "NeutralProbeController"
Cohesion: 0.25
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 66 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 67 - "Zone"
Cohesion: 0.10
Nodes (17): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+9 more)

### Community 68 - "telemetry.interceptor.spec.ts"
Cohesion: 0.18
Nodes (3): readMetricLines(), TelemetryProbeController, zoneUrl()

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "json-object-limits.spec.ts"
Cohesion: 0.10
Nodes (15): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+7 more)

### Community 73 - "telemetry.interceptor.ts"
Cohesion: 0.05
Nodes (20): ApiModule, useClsMiddleware(), DatabaseStepSubscriber, echoRequestId(), resolveRequestId(), HttpMetrics, OperationStep, operationSteps (+12 more)

### Community 74 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "database-entities.ts"
Cohesion: 0.10
Nodes (16): database, loadDataSource(), Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind (+8 more)

### Community 79 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (18): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, ApiZone, apiZones (+10 more)

### Community 85 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 86 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 88 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 89 - "errors.spec.ts"
Cohesion: 0.28
Nodes (6): errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody

### Community 90 - "api-app.ts"
Cohesion: 0.26
Nodes (8): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders(), @nestjs/platform-express

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 93 - "error-response.ts"
Cohesion: 0.67
Nodes (5): errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse()

### Community 103 - "slow-operations.ts"
Cohesion: 0.21
Nodes (5): StepTimes, FinishedOperation, SlowOperationsModule, roundSteps(), SlowOperations

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 732 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **36 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `request-id.spec.ts`, `server/package.json`, `encryption.service.spec.ts`, `dependencies`, `server-errors.spec.ts`, `api.module.ts`, `test-database.ts`, `zone.guard.spec.ts`, `http-error.filter.spec.ts`, `zone-servers.spec.ts`, `typeorm`, `main.ts`, `redis.module.ts`, `log-redaction.spec.ts`, `AuditLogEntry`, `database.module.ts`, `config.module.ts`, `InternalProbeController`, `api-keys.service.ts`, `NeutralProbeController`, `api-keys.e2e-spec.ts`, `Zone`, `telemetry.interceptor.spec.ts`, `telemetry.interceptor.ts`, `health.module.ts`, `body-limit.spec.ts`, `zone.guard.spec.ts`, `zod-serialization.spec.ts`, `api-app.ts`, `error-response.ts`, `slow-operations.ts`?**
  _High betweenness centrality (0.221) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `server/package.json`, `ref_node_path`, `dependencies`, `test-database.ts`, `conversation.entity.spec.ts`, `chat-tables.e2e-spec.ts`, `ConversationEvent`, `Visitor`, `findFreePort`, `AuditLogEntry`, `database.module.ts`, `migrate-mode.e2e-spec.ts`, `CreateChatTables1793215389271`, `telemetry.interceptor.ts`, `participant.entity.spec.ts`, `database-entities.ts`, `Message`, `AddConversationIndexes1793215983154`, `CreateApiKeys1793300000000`, `CreateIdentityKeys1793300001000`, `AddProjectsPublicKey1793300002000`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Should `request-id.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `zone-servers.spec.ts` to `api-keys.e2e-spec.ts`, `devDependencies`, `server/package.json`, `telemetry.interceptor.ts`, `encryption.service.spec.ts`, `typeorm`, `findFreePort`, `main.ts`, `api-keys-service-probe.ts`, `AuditLogEntry`, `api.module.ts`, `config.module.ts`, `InternalProbeController`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._