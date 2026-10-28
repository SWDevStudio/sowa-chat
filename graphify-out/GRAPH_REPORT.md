# Graph Report - hector-chat-epic-12  (2026-10-29)

## Corpus Check
- 257 files · ~54,612 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1815 nodes · 3706 edges · 118 communities (87 shown, 31 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 62 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `921d184e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- typeorm
- bot-sdk/tsconfig.json
- package.json
- request-id.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- reflect-metadata@^0.2.2
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
- audit-log.listener.ts
- ref_node_crypto
- scripts
- zone-servers.spec.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- key-format.ts
- MixedZoneController
- audit-log.e2e-spec.ts
- Project
- tsconfig.build.json
- ValidationProbeController
- http-error.filter.spec.ts
- nest-cli.json
- zone-servers.ts
- audit-log.e2e-spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- ApiKey
- redis-connection.e2e-spec.ts
- main.ts
- unit-probe.ts
- api-keys-service-probe.ts
- encryption-keys.schema.spec.ts
- log-settings.e2e-spec.ts
- telemetry.interceptor.spec.ts
- log-redaction.spec.ts
- protocol/src/index.ts
- AuditLogEntry
- request-id.spec.ts
- metrics.controller.ts
- findFreePort
- config.module.ts
- InternalProbeController
- token-signing-keys.schema.spec.ts
- api-keys.service.ts
- domain-event-bus.spec.ts
- NeutralProbeController
- api-keys.e2e-spec.ts
- json-object-limits.spec.ts
- Zone
- log-redaction.spec.ts
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- JsonObjectValidator
- OperationStepsProbeController
- packages-build.e2e-spec.ts
- server-errors.spec.ts
- participant.entity.spec.ts
- conversation.entity.ts
- @nestjs/cache-manager@^12.0.1
- health.e2e-spec.ts
- health.module.ts
- cache-manager@^7.2.9
- body-limit.spec.ts
- workspace-check-types.e2e-spec.ts
- zone.decorator.ts
- global-setup.ts
- log-redaction.e2e-spec.ts
- @nestjs/microservices@^12.1.3
- OperationSteps
- @nestjs/common
- api-app.ts
- Message
- ServerErrorsProbeController
- encrypted-secret.spec.ts
- ApiKeysService
- cls-middleware.ts
- audit-log.listener.spec.ts
- CreateChatTables1793215389271
- slow-operations.spec.ts
- ErrorProbeController
- conversation.entity.spec.ts
- ZonedController
- slow-operations.ts
- error-response.ts
- bullmq@^6.3.15
- helmet
- @nestjs/platform-socket.io@^12.1.3
- @nest-lab/throttler-storage-redis@^1.2.0
- @nestjs/swagger
- @nestjs/websockets@^12.1.3
- pg

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 88 edges
2. `Zone()` - 46 edges
3. `typeorm` - 43 edges
4. `Project` - 33 edges
5. `Conversation` - 26 edges
6. `findFreePort()` - 25 edges
7. `@nestjs/testing` - 23 edges
8. `startZoneProbeApp()` - 23 edges
9. `JsonObject` - 23 edges
10. `@nestjs/config` - 22 edges

## Surprising Connections (you probably didn't know these)
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts
- `AuditRecord` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-rule.ts → packages/protocol/src/json-types.ts
- `ConversationEvent` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation-event.entity.ts → packages/protocol/src/json-types.ts
- `Conversation` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation.entity.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (118 total, 31 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.08
Nodes (12): DatabaseMigration, databaseMigrations, DatabaseConnection, DatabaseEntity, FirstEntity, SecondEntity, CreateProjects1793193549883, CreateAuditLog1793200000000 (+4 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "request-id.spec.ts"
Cohesion: 0.17
Nodes (10): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+2 more)

### Community 4 - "devDependencies"
Cohesion: 0.07
Nodes (38): author, description, devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0 (+30 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "reflect-metadata@^0.2.2"
Cohesion: 0.33
Nodes (4): reflect-metadata@^0.2.2, zod@catalog:, zod, reflect-metadata

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (21): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue() (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.10
Nodes (11): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, IdentityRow, VersionRow (+3 more)

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
Cohesion: 0.05
Nodes (37): dependencies, @aws-sdk/client-s3@^3.1151.0, @aws-sdk/s3-request-presigner@^3.1151.0, file-type@^22.1.1, jose@^6.2.12, nest-commander@^3.21.0, @nestjs/bullmq@^12.0.0, @nestjs-cls/transactional@^4.0.1 (+29 more)

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
Nodes (12): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ErrorCode, errorCodes, errorDetailSchema (+4 more)

### Community 23 - "audit-log.listener.ts"
Cohesion: 0.29
Nodes (5): DomainEventBus, DomainEventHandler, DomainEventName, DomainEvents, @nestjs/event-emitter

### Community 24 - "ref_node_crypto"
Cohesion: 0.12
Nodes (15): actorKinds, apiKeyKinds, createDataSourceOptions(), ColumnRow, expectedColumns, ColumnRow, expectedColumns, IndexRow (+7 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "zone-servers.spec.ts"
Cohesion: 0.13
Nodes (15): HealthBody, HealthEntry, DependencyStatusBody, StatusBody, startApp(), probeControllers, databaseUrl(), withOfflineDatabase() (+7 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.14
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+2 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.09
Nodes (27): ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation(), createMessage() (+19 more)

### Community 32 - "key-format.ts"
Cohesion: 0.21
Nodes (14): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+6 more)

### Community 33 - "MixedZoneController"
Cohesion: 0.12
Nodes (7): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, unitPorts, UnzonedController

### Community 34 - "audit-log.e2e-spec.ts"
Cohesion: 0.18
Nodes (9): auditedEventNames(), AuditRecord, auditRules, auditedEvents, botKeyEvent, serverKeyEvent, ApiKeyEvent, WorkerModule (+1 more)

### Community 35 - "Project"
Cohesion: 0.09
Nodes (16): database, loadDataSource(), databaseEntities, Channel, channelColumns(), findColumn(), IdentityKeyAlgorithm, identityKeyAlgorithms (+8 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "ValidationProbeController"
Cohesion: 0.13
Nodes (5): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ValidationProbeController

### Community 38 - "http-error.filter.spec.ts"
Cohesion: 0.15
Nodes (8): nestjs-zod@^5.5.0, HttpErrorFilter, requestIdOf(), responseZodErrorOf(), knownKeys, ProbeBodyDto, requestIdHeader, nestjs-zod

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-servers.ts"
Cohesion: 0.22
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "zod-serialization.spec.ts"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 45 - "ApiKey"
Cohesion: 0.12
Nodes (4): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey

### Community 46 - "redis-connection.e2e-spec.ts"
Cohesion: 0.33
Nodes (6): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableRedisUrl(), waitForHttpStatus()

### Community 47 - "main.ts"
Cohesion: 0.07
Nodes (28): ApiModule, CliModule, LogLevel, DatabaseMigrationStep, createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions() (+20 more)

### Community 48 - "unit-probe.ts"
Cohesion: 0.18
Nodes (9): LogDestination, createRedactionProbeApp(), createRequestIdProbeApp(), LogEntry, createProbeApp(), ProbeAppOptions, redirectLogsTo(), stubTestEnv() (+1 more)

### Community 49 - "api-keys-service-probe.ts"
Cohesion: 0.26
Nodes (11): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+3 more)

### Community 50 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "telemetry.interceptor.spec.ts"
Cohesion: 0.11
Nodes (10): HttpLabel, HttpMetrics, HttpRequestRecord, labelNames, roundSteps(), SlowOperations, readMetricLines(), zoneUrl() (+2 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.18
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 55 - "AuditLogEntry"
Cohesion: 0.18
Nodes (4): ActorKind, AuditLogEntry, NewAuditLogEntry, @nestjs-cls/transactional-adapter-typeorm

### Community 56 - "request-id.spec.ts"
Cohesion: 0.17
Nodes (9): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse, ProbeService (+1 more)

### Community 57 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 58 - "findFreePort"
Cohesion: 0.11
Nodes (20): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), BrokenMigration1700000000000 (+12 more)

### Community 59 - "config.module.ts"
Cohesion: 0.26
Nodes (14): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+6 more)

### Community 60 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 61 - "token-signing-keys.schema.spec.ts"
Cohesion: 0.26
Nodes (7): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, TokenSigningKey, tokenSigningKeysSchema

### Community 62 - "api-keys.service.ts"
Cohesion: 0.22
Nodes (9): hashMatches(), IssueApiKeyBaseInput, IssueApiKeyInput, IssuedApiKey, KeyActorKind, keyTypeByKind, RevokeApiKeyInput, VerifiedApiKey (+1 more)

### Community 63 - "domain-event-bus.spec.ts"
Cohesion: 0.29
Nodes (7): happened, TestListener, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 64 - "NeutralProbeController"
Cohesion: 0.25
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 66 - "json-object-limits.spec.ts"
Cohesion: 0.09
Nodes (24): ProjectFixture, defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema() (+16 more)

### Community 67 - "Zone"
Cohesion: 0.09
Nodes (16): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+8 more)

### Community 68 - "log-redaction.spec.ts"
Cohesion: 0.22
Nodes (9): allOutput(), CapturedLogs, fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields, secretValueOf() (+1 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "JsonObjectValidator"
Cohesion: 0.28
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 74 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 75 - "server-errors.spec.ts"
Cohesion: 0.28
Nodes (7): internalErrorMessage, ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, stringsInside()

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "conversation.entity.ts"
Cohesion: 0.07
Nodes (21): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEvent, ConversationEventActorKind, conversationEventActorKinds (+13 more)

### Community 79 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 80 - "health.module.ts"
Cohesion: 0.06
Nodes (19): ioredis@^6.0.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+11 more)

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "zone.decorator.ts"
Cohesion: 0.21
Nodes (8): probeControllers, ApiZone, apiZones, zoneMetadataKey, ports, zoneOfPort(), ZonePorts, ZoneProbeApp

### Community 85 - "global-setup.ts"
Cohesion: 0.24
Nodes (9): testcontainers@^12.2.1, @testcontainers/postgresql@^12.2.1, runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl(), testcontainers (+1 more)

### Community 86 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 88 - "OperationSteps"
Cohesion: 0.12
Nodes (11): nestjs-cls@^7.0.1, @nestjs/typeorm@^12.0.2, DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationSteps, beginOperation() (+3 more)

### Community 89 - "@nestjs/common"
Cohesion: 0.12
Nodes (14): AuditModule, AppClsModule, AppConfigModule, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, ApiHttpModule (+6 more)

### Community 90 - "api-app.ts"
Cohesion: 0.14
Nodes (16): configureApiApp(), DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, bodyLimit (+8 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 93 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 95 - "cls-middleware.ts"
Cohesion: 0.48
Nodes (5): useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp(), nestjs-pino

### Community 96 - "audit-log.listener.spec.ts"
Cohesion: 0.15
Nodes (6): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditRule

### Community 100 - "conversation.entity.spec.ts"
Cohesion: 0.15
Nodes (7): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget(), Visitor

### Community 101 - "ZonedController"
Cohesion: 0.24
Nodes (4): BareController, MethodOnlyController, ZonedController, @nestjs/core

### Community 103 - "error-response.ts"
Cohesion: 0.67
Nodes (5): errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse()

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 732 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `request-id.spec.ts`, `devDependencies`, `encryption.service.spec.ts`, `dependencies`, `server-errors.spec.ts`, `audit-log.listener.ts`, `ref_node_crypto`, `zone-servers.spec.ts`, `MixedZoneController`, `audit-log.e2e-spec.ts`, `ValidationProbeController`, `http-error.filter.spec.ts`, `audit-log.e2e-spec.ts`, `zod-serialization.spec.ts`, `ApiKey`, `main.ts`, `unit-probe.ts`, `telemetry.interceptor.spec.ts`, `AuditLogEntry`, `request-id.spec.ts`, `metrics.controller.ts`, `config.module.ts`, `api-keys.service.ts`, `domain-event-bus.spec.ts`, `NeutralProbeController`, `api-keys.e2e-spec.ts`, `Zone`, `log-redaction.spec.ts`, `server-errors.spec.ts`, `health.module.ts`, `body-limit.spec.ts`, `zone.decorator.ts`, `OperationSteps`, `api-app.ts`, `cls-middleware.ts`, `audit-log.listener.spec.ts`, `ZonedController`, `slow-operations.ts`, `error-response.ts`?**
  _High betweenness centrality (0.225) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.07899159663865546 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `Project` to `typeorm`, `conversation.entity.spec.ts`, `devDependencies`, `OperationSteps`, `ref_node_path`, `audit-log.e2e-spec.ts`, `participant.entity.spec.ts`, `conversation.entity.ts`, `dependencies`, `ref_node_crypto`, `findFreePort`, `Message`, `chat-tables.e2e-spec.ts`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `zone-servers.spec.ts` to `audit-log.listener.spec.ts`, `api-keys.e2e-spec.ts`, `audit-log.e2e-spec.ts`, `devDependencies`, `audit-log.e2e-spec.ts`, `encryption.service.spec.ts`, `redis-connection.e2e-spec.ts`, `unit-probe.ts`, `api-keys-service-probe.ts`, `OperationSteps`, `ref_node_crypto`, `findFreePort`, `config.module.ts`, `cls-middleware.ts`, `domain-event-bus.spec.ts`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07017543859649122 - nodes in this community are weakly interconnected._