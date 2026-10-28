# Graph Report - hector-chat-epic-10  (2026-10-29)

## Corpus Check
- 270 files · ~57,841 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1913 nodes · 3932 edges · 131 communities (96 shown, 35 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 69 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `33073682`
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
- Project
- tsconfig.build.json
- ValidationProbeController
- http-error.filter.spec.ts
- nest-cli.json
- zone-servers.spec.ts
- audit-log.e2e-spec.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- ApiKey
- redis-connection.e2e-spec.ts
- logger.module.ts
- Visitor
- api-keys-service-probe.ts
- encryption-keys.schema.spec.ts
- database-connection.e2e-spec.ts
- main.ts
- log-redaction.spec.ts
- protocol/src/index.ts
- AuditLogEntry
- cli-runner.ts
- metrics.controller.ts
- migrate-mode.e2e-spec.ts
- config.module.ts
- test-secrets.ts
- identity-key-pem.ts
- api-keys.service.ts
- ref_vitest
- api-versioning.spec.ts
- api-keys.e2e-spec.ts
- encryption.service.ts
- Zone
- slow-operations.ts
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- json-object-limits.spec.ts
- OperationSteps
- packages-build.e2e-spec.ts
- worker.module.ts
- participant.entity.spec.ts
- database-entities.ts
- @nestjs/cache-manager@^12.0.1
- health.e2e-spec.ts
- health.module.ts
- Zone
- body-limit.spec.ts
- workspace-check-types.e2e-spec.ts
- telemetry.interceptor.spec.ts
- database.module.ts
- CreateChatTables1793215389271
- @nestjs/microservices@^12.1.3
- ZoneServers
- secrets-reencryption.service.ts
- api-app.ts
- Message
- ServerErrorsProbeController
- SecretsReencryptionService
- ApiKeysRepository
- domain-event-bus.spec.ts
- log-redaction.e2e-spec.ts
- global-setup.ts
- cli-mode.e2e-spec.ts
- ErrorProbeController
- bullmq@^6.3.15
- cls-middleware.ts
- JsonObjectValidator
- SlowOperations
- Conversation
- @nestjs/swagger
- key-generate.command.ts
- Message
- database-connection.e2e-spec.ts
- identity-keys-table.e2e-spec.ts
- database-entities.ts
- nest-commander@^3.21.0
- zod-serialization.spec.ts
- @nestjs/bullmq@^12.0.0
- json-object-schema.ts
- AuditScenarios
- secrets-reencryption.module.ts
- encryption-keys.schema.ts
- database-migrations.spec.ts
- cache-manager@^7.2.9
- CreateProjects1793193549883
- AddProjectsPublicKey1793300002000
- @aws-sdk/s3-request-presigner@^3.1151.0
- @nestjs/platform-socket.io@^12.1.3
- @nestjs/websockets@^12.1.3

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 91 edges
2. `typeorm` - 46 edges
3. `Zone()` - 46 edges
4. `Project` - 33 edges
5. `@nestjs/testing` - 26 edges
6. `Conversation` - 26 edges
7. `findFreePort()` - 25 edges
8. `startZoneProbeApp()` - 23 edges
9. `JsonObject` - 23 edges
10. `@nestjs/config` - 21 edges

## Surprising Connections (you probably didn't know these)
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
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

## Communities (131 total, 35 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.12
Nodes (8): DatabaseMigration, CreateAuditLog1793200000000, AddConversationIndexes1793215983154, CreateApiKeys1793300000000, CreateIdentityKeys1793300001000, AddProjectsOperatorAllowedOrigins1793300003000, ColumnRow, typeorm

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
Nodes (35): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+27 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.09
Nodes (21): author, bin, sowa-chat, helmet@^8.3.0, @nestjs/throttler@^6.7.1, pg@^8.23.1, @socket.io/redis-adapter@^8.3.0, @sowa-chat/protocol@workspace:* (+13 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (21): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange() (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.14
Nodes (9): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, IdentityRow, VersionRow, useTestRedis(), redisUrl() (+1 more)

### Community 10 - "encryption.service.spec.ts"
Cohesion: 0.13
Nodes (9): CryptoModule, EncryptionService, SecretDecryptionError, captureError(), createService(), expectDecryptionError(), key1, key2 (+1 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.06
Nodes (31): dependencies, @aws-sdk/client-s3@^3.1151.0, file-type@^22.1.1, @nest-lab/throttler-storage-redis@^1.2.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1 (+23 more)

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
Cohesion: 0.14
Nodes (13): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, auditedEventNames(), AuditRule, auditRules (+5 more)

### Community 24 - "test-database.ts"
Cohesion: 0.17
Nodes (8): ColumnRow, expectedColumns, IndexRow, PlanRow, createProject(), ProjectFixture, truncateAllTables(), useTestDatabase()

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+2 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.09
Nodes (27): ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation(), createMessage() (+19 more)

### Community 32 - "key-format.ts"
Cohesion: 0.19
Nodes (14): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+6 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "Project"
Cohesion: 0.14
Nodes (4): Channel, channelColumns(), findColumn(), Project

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "http-error.filter.spec.ts"
Cohesion: 0.15
Nodes (12): ApiHttpModule, errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter, requestIdOf() (+4 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-servers.spec.ts"
Cohesion: 0.10
Nodes (25): HealthBody, HealthEntry, DependencyStatusBody, StatusBody, findZonePorts(), probeControllers, ZonesModule, LogEntry (+17 more)

### Community 41 - "audit-log.e2e-spec.ts"
Cohesion: 0.16
Nodes (6): ProjectsModule, ProjectsRepository, WorkerModule, testAuditRules, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 46 - "redis-connection.e2e-spec.ts"
Cohesion: 0.13
Nodes (14): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, fetchStatus() (+6 more)

### Community 47 - "logger.module.ts"
Cohesion: 0.09
Nodes (19): DatabaseMigrationStep, createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions() (+11 more)

### Community 48 - "Visitor"
Cohesion: 0.15
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor

### Community 49 - "api-keys-service-probe.ts"
Cohesion: 0.26
Nodes (11): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+3 more)

### Community 50 - "encryption-keys.schema.spec.ts"
Cohesion: 0.20
Nodes (8): encryptionConfig, describeErrors(), key1, key1Bytes, key2, key2Bytes, parseKeys(), requiredEnv

### Community 51 - "database-connection.e2e-spec.ts"
Cohesion: 0.19
Nodes (13): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+5 more)

### Community 52 - "main.ts"
Cohesion: 0.16
Nodes (10): LogDestination, createContext(), mode, runApi(), runMigrate(), runners, runWorker(), useAppLogger() (+2 more)

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.23
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 55 - "AuditLogEntry"
Cohesion: 0.16
Nodes (8): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns, JsonObject

### Community 56 - "cli-runner.ts"
Cohesion: 0.23
Nodes (8): cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, runCli(), CliRunResult, runCliInProcess()

### Community 57 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 59 - "config.module.ts"
Cohesion: 0.29
Nodes (12): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+4 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.16
Nodes (18): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertSecret(), insertVersion1Secrets(), key1 (+10 more)

### Community 61 - "identity-key-pem.ts"
Cohesion: 0.23
Nodes (9): IdentityKeyAlgorithm, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey(), readPublicKeyObject(), captureError() (+1 more)

### Community 62 - "api-keys.service.ts"
Cohesion: 0.21
Nodes (10): ApiKeyKind, apiKeyKinds, NewApiKey, IssueApiKeyBaseInput, IssueApiKeyInput, IssuedApiKey, KeyActorKind, keyTypeByKind (+2 more)

### Community 63 - "ref_vitest"
Cohesion: 0.22
Nodes (6): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl()

### Community 64 - "api-versioning.spec.ts"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 66 - "encryption.service.ts"
Cohesion: 0.17
Nodes (12): authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv, tag (+4 more)

### Community 67 - "Zone"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 68 - "slow-operations.ts"
Cohesion: 0.21
Nodes (6): slowOperationsConfig, StepTimes, FinishedOperation, SlowOperationsModule, roundSteps(), SlowOperations

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 73 - "OperationSteps"
Cohesion: 0.07
Nodes (14): AppClsModule, DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationStepsModule, OperationSteps, OperationStepsProbeController (+6 more)

### Community 74 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 75 - "worker.module.ts"
Cohesion: 0.16
Nodes (9): AuditModule, AppConfigModule, DomainEventBus, happened, DomainEventHandler, DomainEventName, OnDomainEvent(), TelemetryModule (+1 more)

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "database-entities.ts"
Cohesion: 0.16
Nodes (13): ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind, messageSenderKinds (+5 more)

### Community 79 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 81 - "Zone"
Cohesion: 0.07
Nodes (18): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController, calls, ProbeBodyDto, ProbeCall (+10 more)

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "telemetry.interceptor.spec.ts"
Cohesion: 0.12
Nodes (15): probeControllers, probeControllers, ApiZone, apiZones, zoneMetadataKey, ports, zoneOfPort(), ZonePorts (+7 more)

### Community 85 - "database.module.ts"
Cohesion: 0.22
Nodes (10): databaseMigrations, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection, DatabaseEntity (+2 more)

### Community 88 - "ZoneServers"
Cohesion: 0.22
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 89 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): BatchResult, compareVersionCounts(), FieldReencryption, FieldResult, FieldVersionCount, reencryptionBatchSize, ReencryptionReport, SecretRow (+3 more)

### Community 90 - "api-app.ts"
Cohesion: 0.14
Nodes (16): configureApiApp(), DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, bodyLimit (+8 more)

### Community 91 - "Message"
Cohesion: 0.27
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 94 - "ApiKeysRepository"
Cohesion: 0.16
Nodes (4): ApiKeysRepository, hashMatches(), toEvent(), hashKey()

### Community 95 - "domain-event-bus.spec.ts"
Cohesion: 0.31
Nodes (5): TestListener, DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 97 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 101 - "cls-middleware.ts"
Cohesion: 0.29
Nodes (6): ApiModule, useClsMiddleware(), echoRequestId(), requestIdHeader, resolveRequestId(), createE2eApp()

### Community 106 - "key-generate.command.ts"
Cohesion: 0.31
Nodes (5): emptyCell, formatDate(), writeLine(), writeTable(), KeyGenerateCommand

### Community 108 - "database-connection.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus()

### Community 109 - "identity-keys-table.e2e-spec.ts"
Cohesion: 0.32
Nodes (6): jose@^6.2.12, identityKeyAlgorithms, ColumnRow, expectedColumns, jwk, jose

### Community 110 - "database-entities.ts"
Cohesion: 0.48
Nodes (3): database, loadDataSource(), databaseEntities

### Community 112 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 120 - "json-object-schema.ts"
Cohesion: 0.12
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, jsonObjectSchema, Violation, JsonObjectLimits, JsonValue (+1 more)

### Community 121 - "AuditScenarios"
Cohesion: 0.29
Nodes (3): AuditScenarios, happenedIn(), ScenarioError

### Community 122 - "secrets-reencryption.module.ts"
Cohesion: 0.43
Nodes (3): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule

### Community 123 - "encryption-keys.schema.ts"
Cohesion: 0.60
Nodes (5): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject()

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 764 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `zone-servers.spec.ts` to `request-id.spec.ts`, `server/package.json`, `encryption.service.spec.ts`, `dependencies`, `server-errors.spec.ts`, `audit-log.listener.spec.ts`, `test-database.ts`, `zone.guard.spec.ts`, `http-error.filter.spec.ts`, `audit-log.e2e-spec.ts`, `redis-connection.e2e-spec.ts`, `logger.module.ts`, `main.ts`, `log-redaction.spec.ts`, `AuditLogEntry`, `cli-runner.ts`, `metrics.controller.ts`, `config.module.ts`, `api-keys.service.ts`, `api-keys.e2e-spec.ts`, `encryption.service.ts`, `Zone`, `slow-operations.ts`, `OperationSteps`, `worker.module.ts`, `health.module.ts`, `Zone`, `body-limit.spec.ts`, `telemetry.interceptor.spec.ts`, `database.module.ts`, `secrets-reencryption.service.ts`, `api-app.ts`, `cls-middleware.ts`, `SlowOperations`, `zod-serialization.spec.ts`, `secrets-reencryption.module.ts`?**
  _High betweenness centrality (0.227) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12333333333333334 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `database-migrations.ts` to `server/package.json`, `ref_node_path`, `dependencies`, `test-database.ts`, `conversation.entity.spec.ts`, `chat-tables.e2e-spec.ts`, `ConversationEvent`, `Project`, `audit-log.e2e-spec.ts`, `Visitor`, `AuditLogEntry`, `migrate-mode.e2e-spec.ts`, `test-secrets.ts`, `api-keys.service.ts`, `OperationSteps`, `participant.entity.spec.ts`, `database-entities.ts`, `database.module.ts`, `CreateChatTables1793215389271`, `Message`, `database-connection.e2e-spec.ts`, `identity-keys-table.e2e-spec.ts`, `database-entities.ts`, `CreateProjects1793193549883`, `AddProjectsPublicKey1793300002000`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `api-versioning.spec.ts`, `zone.guard.spec.ts`, `Zone`, `ErrorProbeController`, `ValidationProbeController`, `http-error.filter.spec.ts`, `zone-servers.spec.ts`, `ResponseProbeController`, `health.module.ts`, `zod-serialization.spec.ts`, `body-limit.spec.ts`, `telemetry.interceptor.spec.ts`, `server-errors.spec.ts`, `metrics.controller.ts`, `ServerErrorsProbeController`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Should `request-id.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._