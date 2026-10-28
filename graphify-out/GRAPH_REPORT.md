# Graph Report - hector-chat-epic-19  (2026-10-29)

## Corpus Check
- 250 files · ~52,336 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1778 nodes · 3624 edges · 109 communities (77 shown, 32 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 62 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `99afb3d5`
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
- audit-log.listener.spec.ts
- audit-log.e2e-spec.ts
- scripts
- zone-servers.spec.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- key-format.ts
- zone.guard.spec.ts
- conversation-event.entity.spec.ts
- conversation.entity.spec.ts
- tsconfig.build.json
- ValidationProbeController
- http-error.filter.spec.ts
- nest-cli.json
- api.module.ts
- transactions.e2e-spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- ApiKey
- findFreePort
- main.ts
- nest-commander@^3.21.0
- api-keys-service-probe.ts
- encryption-keys.schema.spec.ts
- log-settings.e2e-spec.ts
- json-object-limits.spec.ts
- log-redaction.spec.ts
- protocol/src/index.ts
- JsonObject
- Zone
- metrics.controller.ts
- migrate-mode.e2e-spec.ts
- config.module.ts
- InternalProbeController
- typeorm
- api-keys.service.ts
- zone.guard.spec.ts
- api-versioning.spec.ts
- api-keys.e2e-spec.ts
- json-object-schema.ts
- Zone
- telemetry.interceptor.spec.ts
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- JsonObjectValidator
- OperationSteps
- packages-build.e2e-spec.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- Conversation
- ref_vitest
- @nestjs/cache-manager@^12.0.1
- health.e2e-spec.ts
- health.module.ts
- cache-manager@^7.2.9
- jose@^6.2.12
- workspace-check-types.e2e-spec.ts
- encrypted-secret.spec.ts
- zod-serialization.spec.ts
- log-redaction.e2e-spec.ts
- @nestjs/microservices@^12.1.3
- @nestjs/platform-socket.io@^12.1.3
- body-limit.ts
- Message
- ServerErrorsProbeController
- env.schema.logging.spec.ts
- .issue
- TestEncryptionConfigModule
- helmet
- @nestjs/bullmq@^12.0.0
- @nestjs/swagger
- ErrorProbeController
- zod@catalog:
- vite@catalog:

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 88 edges
2. `Zone()` - 46 edges
3. `typeorm` - 43 edges
4. `Project` - 33 edges
5. `Conversation` - 25 edges
6. `findFreePort()` - 25 edges
7. `@nestjs/testing` - 23 edges
8. `startZoneProbeApp()` - 23 edges
9. `JsonObject` - 23 edges
10. `@nestjs/config` - 21 edges

## Surprising Connections (you probably didn't know these)
- `AuditRecord` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-rule.ts → packages/protocol/src/json-types.ts
- `ConversationEvent` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation-event.entity.ts → packages/protocol/src/json-types.ts
- `Conversation` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation.entity.ts → packages/protocol/src/json-types.ts
- `Message` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/message.entity.ts → packages/protocol/src/json-types.ts
- `Project` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/projects/project.entity.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (109 total, 32 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.05
Nodes (21): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity (+13 more)

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
Nodes (19): author, bullmq@^6.3.15, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/websockets@^12.1.3, pino-http@^11.0.0, sharp@^0.35.5, @socket.io/redis-adapter@^8.3.0, description (+11 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.10
Nodes (18): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange() (+10 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.14
Nodes (10): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, databaseUrl(), IdentityRow, VersionRow, useTestRedis() (+2 more)

### Community 10 - "encryption.service.spec.ts"
Cohesion: 0.14
Nodes (14): encryptionConfig, CryptoModule, authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService (+6 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, @aws-sdk/client-s3@^3.1151.0, file-type@^22.1.1, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1 (+21 more)

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
Cohesion: 0.11
Nodes (19): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, internalErrorMessage, ApiExceptionInput, entries() (+11 more)

### Community 23 - "audit-log.listener.spec.ts"
Cohesion: 0.07
Nodes (28): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditModule, auditedEventNames(), AuditRecord (+20 more)

### Community 24 - "audit-log.e2e-spec.ts"
Cohesion: 0.11
Nodes (14): apiKeyKinds, WorkerModule, ColumnRow, expectedColumns, ColumnRow, expectedColumns, IndexRow, PlanRow (+6 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "zone-servers.spec.ts"
Cohesion: 0.12
Nodes (19): DependencyStatusBody, StatusBody, LogDestination, probeControllers, LogEntry, withOfflineDatabase(), offlineRedis, withOfflineRedis() (+11 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+2 more)

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
Cohesion: 0.19
Nodes (14): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+6 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "conversation-event.entity.spec.ts"
Cohesion: 0.12
Nodes (11): database, loadDataSource(), databaseEntities, ConversationEvent, ConversationEventActorKind, columns(), expectedColumns, findColumn() (+3 more)

### Community 35 - "conversation.entity.spec.ts"
Cohesion: 0.15
Nodes (7): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget(), Visitor

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "http-error.filter.spec.ts"
Cohesion: 0.16
Nodes (12): errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter, requestIdOf(), responseZodErrorOf() (+4 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "api.module.ts"
Cohesion: 0.20
Nodes (4): startListening(), stopListening(), ZoneServers, ZonesModule

### Community 41 - "transactions.e2e-spec.ts"
Cohesion: 0.18
Nodes (6): ApiKeyKind, NewApiKey, ProjectsModule, ProjectsRepository, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 46 - "findFreePort"
Cohesion: 0.14
Nodes (16): AppConfigModule, findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus() (+8 more)

### Community 47 - "main.ts"
Cohesion: 0.06
Nodes (29): pino@^10.4.0, ApiModule, CliModule, DatabaseMigrationStep, createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions() (+21 more)

### Community 49 - "api-keys-service-probe.ts"
Cohesion: 0.26
Nodes (11): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+3 more)

### Community 50 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.23
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 55 - "JsonObject"
Cohesion: 0.18
Nodes (6): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, ProjectFixture, JsonObject

### Community 56 - "Zone"
Cohesion: 0.07
Nodes (17): BodyProbeController, InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController, calls (+9 more)

### Community 57 - "metrics.controller.ts"
Cohesion: 0.12
Nodes (7): ApiHttpModule, MetricsController, MetricsModule, SlowOperationsModule, @nestjs/common, @nestjs/core, prom-client

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 59 - "config.module.ts"
Cohesion: 0.28
Nodes (13): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+5 more)

### Community 60 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 61 - "typeorm"
Cohesion: 0.09
Nodes (14): Channel, channelColumns(), findColumn(), ConversationCloseReason, ConversationStatus, ParticipantKind, Project, columns() (+6 more)

### Community 62 - "api-keys.service.ts"
Cohesion: 0.18
Nodes (9): hashMatches(), IssueApiKeyBaseInput, IssueApiKeyInput, IssuedApiKey, KeyActorKind, keyTypeByKind, RevokeApiKeyInput, VerifiedApiKey (+1 more)

### Community 63 - "zone.guard.spec.ts"
Cohesion: 0.12
Nodes (20): configureApiApp(), HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs() (+12 more)

### Community 64 - "api-versioning.spec.ts"
Cohesion: 0.19
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 66 - "json-object-schema.ts"
Cohesion: 0.17
Nodes (8): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, Violation, JsonObjectLimits, JsonValue, encoder

### Community 67 - "Zone"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 68 - "telemetry.interceptor.spec.ts"
Cohesion: 0.09
Nodes (10): HttpMetrics, StepTimes, FinishedOperation, roundSteps(), SlowOperations, readMetricLines(), TelemetryProbeController, zoneUrl() (+2 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "IdentityKey"
Cohesion: 0.17
Nodes (3): IdentityKey, IdentityKeyAlgorithm, identityKeyAlgorithms

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 73 - "OperationSteps"
Cohesion: 0.06
Nodes (24): @nestjs/typeorm@^12.0.2, AppClsModule, useClsMiddleware(), createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, DatabaseStepSubscriber (+16 more)

### Community 74 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 76 - "Conversation"
Cohesion: 0.15
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 79 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 80 - "health.module.ts"
Cohesion: 0.06
Nodes (19): ioredis@^6.0.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+11 more)

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 85 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 86 - "log-redaction.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), parseLogLine() (+2 more)

### Community 90 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 91 - "Message"
Cohesion: 0.08
Nodes (10): Conversation, Message, MessageSenderKind, MessageType, columns(), expectedColumns, findColumn(), findRelation() (+2 more)

### Community 93 - "env.schema.logging.spec.ts"
Cohesion: 0.33
Nodes (3): Env, logLevels, requiredEnv

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 716 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **32 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `metrics.controller.ts` to `request-id.spec.ts`, `server/package.json`, `encryption.service.spec.ts`, `dependencies`, `server-errors.spec.ts`, `audit-log.listener.spec.ts`, `audit-log.e2e-spec.ts`, `zone-servers.spec.ts`, `zone.guard.spec.ts`, `http-error.filter.spec.ts`, `api.module.ts`, `transactions.e2e-spec.ts`, `main.ts`, `log-redaction.spec.ts`, `JsonObject`, `Zone`, `config.module.ts`, `api-keys.service.ts`, `zone.guard.spec.ts`, `api-versioning.spec.ts`, `api-keys.e2e-spec.ts`, `Zone`, `telemetry.interceptor.spec.ts`, `OperationSteps`, `health.module.ts`, `zod-serialization.spec.ts`, `body-limit.ts`?**
  _High betweenness centrality (0.224) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.053185271770894216 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `conversation-event.entity.spec.ts`, `conversation.entity.spec.ts`, `server/package.json`, `IdentityKey`, `transactions.e2e-spec.ts`, `OperationSteps`, `ref_node_path`, `Conversation`, `dependencies`, `findFreePort`, `JsonObject`, `audit-log.e2e-spec.ts`, `migrate-mode.e2e-spec.ts`, `Message`, `chat-tables.e2e-spec.ts`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `OperationSteps` to `api-keys.e2e-spec.ts`, `devDependencies`, `server/package.json`, `transactions.e2e-spec.ts`, `encryption.service.spec.ts`, `findFreePort`, `api-keys-service-probe.ts`, `audit-log.listener.spec.ts`, `audit-log.e2e-spec.ts`, `zone-servers.spec.ts`, `config.module.ts`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Should `request-id.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._