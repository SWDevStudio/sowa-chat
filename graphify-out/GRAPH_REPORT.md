# Graph Report - hector-chat-epic-10  (2026-10-29)

## Corpus Check
- 300 files · ~69,499 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2156 nodes · 4750 edges · 128 communities (88 shown, 40 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 111 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `945b7805`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
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
- key-cli.ts
- AuditLogEntry
- scripts
- audited-events.spec.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- key-format.ts
- zone.guard.spec.ts
- ConversationEvent
- worker.module.ts
- tsconfig.build.json
- ValidationProbeController
- config.module.ts
- nest-cli.json
- zone-servers.spec.ts
- conversation.entity.spec.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- api-keys.service.ts
- log-redaction.spec.ts
- main.ts
- typeorm
- api-keys.service.ts
- cli.module.ts
- database-connection.e2e-spec.ts
- projects-service.e2e-spec.ts
- log-redaction.spec.ts
- protocol/src/index.ts
- identity-key-pem.ts
- ProjectCreateCommand
- domain-event-bus.spec.ts
- migrate-mode.e2e-spec.ts
- projects.service.ts
- test-secrets.ts
- identity-keys.service.ts
- request-id.spec.ts
- migrate.module.ts
- api-versioning.spec.ts
- database.module.ts
- encryption.service.ts
- Zone
- ApiKeysService
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- project-list.command.ts
- telemetry.interceptor.ts
- zod-serialization.spec.ts
- helmet
- participant.entity.spec.ts
- database-entities.ts
- @nestjs/bullmq@^12.0.0
- health.e2e-spec.ts
- health.module.ts
- security-headers.spec.ts
- IdentityKeyAddCommand
- workspace-check-types.e2e-spec.ts
- api-app.ts
- DomainEventBus
- CreateChatTables1793215389271
- audit-log.e2e-spec.ts
- IdentityKeyRevokeCommand
- secrets-reencryption.service.ts
- zone.ts
- Message
- encryption-keys.schema.spec.ts
- SecretsReencryptionService
- ApiKey
- KeyRevokeCommand
- log-redaction.e2e-spec.ts
- global-setup.ts
- ZonedController
- EncryptionService
- projects-table.e2e-spec.ts
- database-migrations.spec.ts
- JsonObjectValidator
- CreateProjects1793193549883
- CreateIdentityKeys1793300001000
- @aws-sdk/s3-request-presigner@^3.1151.0
- identity-key-list.command.ts
- file-type@^22.1.1
- redis-connection.e2e-spec.ts
- packages-build.e2e-spec.ts
- @nestjs/cache-manager@^12.0.1
- @nestjs/platform-socket.io@^12.1.3
- @nestjs/throttler@^6.7.1
- @nestjs/common
- @nestjs/websockets@^12.1.3
- BodyProbeController
- secrets-reencryption.module.ts
- pg
- pino-http
- cache-manager@^7.2.9
- slow-operations.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 102 edges
2. `typeorm` - 49 edges
3. `Zone()` - 46 edges
4. `Project` - 40 edges
5. `@nestjs/testing` - 32 edges
6. `ProjectsService` - 28 edges
7. `ApiKey` - 27 edges
8. `Conversation` - 26 edges
9. `findFreePort()` - 25 edges
10. `DomainEventBus` - 23 edges

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

## Communities (128 total, 40 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.14
Nodes (5): DatabaseMigration, CreateAuditLog1793200000000, AddConversationIndexes1793215983154, CreateApiKeys1793300000000, AddProjectsPublicKey1793300002000

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.18
Nodes (8): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21, supertest@^7.0.0 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.09
Nodes (21): author, bin, sowa-chat, @aws-sdk/client-s3@^3.1151.0, reflect-metadata@^0.2.2, @socket.io/redis-adapter@^8.3.0, @sowa-chat/protocol@workspace:*, zod@catalog: (+13 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (21): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange() (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.13
Nodes (10): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, databaseUrl(), IdentityRow, VersionRow, useTestRedis() (+2 more)

### Community 10 - "encryption.service.spec.ts"
Cohesion: 0.16
Nodes (11): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), SecretDecryptionError, captureError(), expectDecryptionError() (+3 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (30): dependencies, bullmq@^6.3.15, nest-commander@^3.21.0, @nest-lab/throttler-storage-redis@^1.2.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1 (+22 more)

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
Cohesion: 0.05
Nodes (34): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage (+26 more)

### Community 23 - "key-cli.ts"
Cohesion: 0.06
Nodes (72): cliName, commanderArgv(), runCliCommand(), startupLogLevels, identityKeyAlgorithms, toLookupPrefix(), KeysModule, CreateProjectInput (+64 more)

### Community 24 - "AuditLogEntry"
Cohesion: 0.12
Nodes (7): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "audited-events.spec.ts"
Cohesion: 0.14
Nodes (15): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, serverKeyEvent, ApiKeyEvent (+7 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.16
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.07
Nodes (29): ColumnRow, ForeignKeyRow, IndexRow, tableNames, IndexRow, PlanRow, countRows(), createChannel() (+21 more)

### Community 32 - "key-format.ts"
Cohesion: 0.16
Nodes (13): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+5 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "worker.module.ts"
Cohesion: 0.12
Nodes (11): ProjectsModule, AppConfigModule, WorkerModule, columns, emptyLists, eventNames, listRow(), lists (+3 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "config.module.ts"
Cohesion: 0.26
Nodes (14): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig (+6 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-servers.spec.ts"
Cohesion: 0.11
Nodes (21): DependencyStatusBody, StatusBody, LogDestination, findZonePorts(), probeControllers, LogEntry, findFreePort(), serverDirectory (+13 more)

### Community 41 - "conversation.entity.spec.ts"
Cohesion: 0.15
Nodes (7): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget(), Visitor

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "api-keys.service.ts"
Cohesion: 0.17
Nodes (8): ApiKeySummary, hashMatches(), IssueApiKeyBaseInput, keyTypeByKind, RevokeApiKeyInput, toEvent(), VerifiedApiKey, hashKey()

### Community 46 - "log-redaction.spec.ts"
Cohesion: 0.20
Nodes (10): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+2 more)

### Community 47 - "main.ts"
Cohesion: 0.13
Nodes (22): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+14 more)

### Community 48 - "typeorm"
Cohesion: 0.10
Nodes (13): database, loadDataSource(), databaseEntities, Channel, channelColumns(), findColumn(), Project, columns() (+5 more)

### Community 49 - "api-keys.service.ts"
Cohesion: 0.26
Nodes (11): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+3 more)

### Community 50 - "cli.module.ts"
Cohesion: 0.13
Nodes (11): writeLine(), IdentityKeyAddOptions, IdentityKeyRevokeOptions, KeyCreateCommand, KeyCreateOptions, KeyGenerateCommand, KeyRevokeOptions, CliModule (+3 more)

### Community 51 - "database-connection.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "projects-service.e2e-spec.ts"
Cohesion: 0.14
Nodes (15): IssueApiKeyInput, IssuedApiKey, InvalidProjectNameError, ProjectAlreadyExistsError, ProjectNotFoundError, createMain(), apiKeyRows(), auditRows() (+7 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.07
Nodes (25): ProjectFixture, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, defaultLimits (+17 more)

### Community 55 - "identity-key-pem.ts"
Cohesion: 0.16
Nodes (13): jose@^6.2.12, IdentityKeyAlgorithm, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey(), readPublicKeyObject() (+5 more)

### Community 57 - "domain-event-bus.spec.ts"
Cohesion: 0.14
Nodes (10): happened, TestListener, OnDomainEvent(), MetricsModule, SlowOperationsModule, TelemetryModule, DomainEvents, ../../src/telemetry/events/domain-events.js (+2 more)

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 59 - "projects.service.ts"
Cohesion: 0.10
Nodes (17): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), OriginList, originLists, normalizeOrigin(), normalizeOrigins(), parseUrl() (+9 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.16
Nodes (18): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertSecret(), insertVersion1Secrets(), key1 (+10 more)

### Community 61 - "identity-keys.service.ts"
Cohesion: 0.18
Nodes (7): KeyActorKind, AddIdentityKeyInput, IdentityKeyKidTakenError, IdentityKeysService, InvalidIdentityKeyIdError, RevokeIdentityKeyInput, toEvent()

### Community 62 - "request-id.spec.ts"
Cohesion: 0.12
Nodes (11): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+3 more)

### Community 63 - "migrate.module.ts"
Cohesion: 0.17
Nodes (5): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 64 - "api-versioning.spec.ts"
Cohesion: 0.25
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 65 - "database.module.ts"
Cohesion: 0.22
Nodes (10): databaseMigrations, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection, DatabaseEntity (+2 more)

### Community 66 - "encryption.service.ts"
Cohesion: 0.17
Nodes (12): authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv, tag (+4 more)

### Community 67 - "Zone"
Cohesion: 0.06
Nodes (19): prom-client@^15.1.3, controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController (+11 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.31
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "project-list.command.ts"
Cohesion: 0.22
Nodes (5): emptyCell, formatOrigins(), header, ProjectListCommand, toRow()

### Community 73 - "telemetry.interceptor.ts"
Cohesion: 0.05
Nodes (18): AppClsModule, DatabaseStepSubscriber, HttpMetrics, OperationStep, operationSteps, OperationTiming, OperationStepsModule, OperationSteps (+10 more)

### Community 74 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "database-entities.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 79 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 80 - "health.module.ts"
Cohesion: 0.06
Nodes (19): ioredis@^6.0.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+11 more)

### Community 81 - "security-headers.spec.ts"
Cohesion: 0.21
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "api-app.ts"
Cohesion: 0.11
Nodes (21): configureApiApp(), ApiModule, useClsMiddleware(), DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs() (+13 more)

### Community 87 - "audit-log.e2e-spec.ts"
Cohesion: 0.14
Nodes (12): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditModule, auditedEventNames(), AuditRule (+4 more)

### Community 89 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): BatchResult, compareVersionCounts(), FieldReencryption, FieldResult, FieldVersionCount, reencryptionBatchSize, ReencryptionReport, SecretRow (+3 more)

### Community 90 - "zone.ts"
Cohesion: 0.11
Nodes (15): HealthBody, HealthEntry, ApiZone, apiZones, ZoneGuard, ports, zoneOfPort(), startListening() (+7 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.29
Nodes (7): describeErrors(), key1, key1Bytes, key2, key2Bytes, parseKeys(), requiredEnv

### Community 94 - "ApiKey"
Cohesion: 0.12
Nodes (7): ApiKey, ApiKeyKind, apiKeyKinds, NewApiKey, toSummary(), ColumnRow, expectedColumns

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 97 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 102 - "JsonObjectValidator"
Cohesion: 0.28
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 106 - "identity-key-list.command.ts"
Cohesion: 0.11
Nodes (10): formatDate(), writeTable(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow(), header, KeyListCommand (+2 more)

### Community 108 - "redis-connection.e2e-spec.ts"
Cohesion: 0.14
Nodes (13): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), fetchStatus(), repositoryRoot (+5 more)

### Community 109 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 115 - "@nestjs/common"
Cohesion: 0.11
Nodes (11): ApiHttpModule, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, zoneMetadataKey, readMetricLines(), zoneUrl() (+3 more)

### Community 122 - "secrets-reencryption.module.ts"
Cohesion: 0.29
Nodes (4): CryptoModule, encryptedFields, registeredEncryptedFields, SecretsReencryptionModule

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 828 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `log-level-warn.spec.ts`, `server/package.json`, `slow-operations.ts`, `encryption.service.spec.ts`, `dependencies`, `server-errors.spec.ts`, `key-cli.ts`, `audited-events.spec.ts`, `zone.guard.spec.ts`, `worker.module.ts`, `config.module.ts`, `zone-servers.spec.ts`, `api-keys.service.ts`, `log-redaction.spec.ts`, `main.ts`, `cli.module.ts`, `identity-key-pem.ts`, `domain-event-bus.spec.ts`, `projects.service.ts`, `identity-keys.service.ts`, `request-id.spec.ts`, `migrate.module.ts`, `api-versioning.spec.ts`, `database.module.ts`, `encryption.service.ts`, `Zone`, `ApiKeysService`, `project-list.command.ts`, `telemetry.interceptor.ts`, `zod-serialization.spec.ts`, `health.module.ts`, `security-headers.spec.ts`, `api-app.ts`, `audit-log.e2e-spec.ts`, `secrets-reencryption.service.ts`, `zone.ts`, `ApiKey`, `identity-key-list.command.ts`, `secrets-reencryption.module.ts`?**
  _High betweenness centrality (0.262) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13725490196078433 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `server/package.json`, `ref_node_path`, `dependencies`, `key-cli.ts`, `chat-tables.e2e-spec.ts`, `ConversationEvent`, `worker.module.ts`, `conversation.entity.spec.ts`, `protocol/src/index.ts`, `migrate-mode.e2e-spec.ts`, `test-secrets.ts`, `database.module.ts`, `telemetry.interceptor.ts`, `participant.entity.spec.ts`, `database-entities.ts`, `CreateChatTables1793215389271`, `Message`, `ApiKey`, `projects-table.e2e-spec.ts`, `CreateProjects1793193549883`, `CreateIdentityKeys1793300001000`, `redis-connection.e2e-spec.ts`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `zone-servers.spec.ts` to `key-format.ts`, `worker.module.ts`, `devDependencies`, `config.module.ts`, `server/package.json`, `telemetry.interceptor.ts`, `encryption.service.spec.ts`, `redis-connection.e2e-spec.ts`, `main.ts`, `api-keys.service.ts`, `key-cli.ts`, `projects-service.e2e-spec.ts`, `api-app.ts`, `audit-log.e2e-spec.ts`, `AuditLogEntry`, `domain-event-bus.spec.ts`, `test-secrets.ts`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._