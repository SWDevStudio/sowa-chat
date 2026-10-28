# Graph Report - hector-chat-epic-10  (2026-10-29)

## Corpus Check
- 281 files · ~62,522 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1997 nodes · 4226 edges · 138 communities (98 shown, 40 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 86 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a43e2276`
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
- MixedZoneController
- ConversationEvent
- Project
- tsconfig.build.json
- ValidationProbeController
- http-error.filter.spec.ts
- nest-cli.json
- zone-servers.spec.ts
- Project
- server-sdk/tsconfig.json
- ResponseProbeController
- DomainEventBus
- InternalProbeController
- logger.module.ts
- Visitor
- api-keys.service.ts
- conversation-event.entity.spec.ts
- database-connection.e2e-spec.ts
- config.module.ts
- log-redaction.spec.ts
- protocol/src/index.ts
- AuditLogEntry
- main.ts
- metrics.controller.ts
- migrate-mode.e2e-spec.ts
- CreateAuditLog1793200000000
- test-secrets.ts
- identity-key-pem.spec.ts
- CreateIdentityKeys1793300001000
- origin.ts
- api-versioning.spec.ts
- migrate.module.ts
- encryption.service.ts
- Zone
- json-object-schema.ts
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- json-object-limits.spec.ts
- OperationSteps
- packages-build.e2e-spec.ts
- identity-keys.e2e-spec.ts
- participant.entity.spec.ts
- database-entities.ts
- audit.module.ts
- health.e2e-spec.ts
- health.module.ts
- security-headers.spec.ts
- @nestjs/common
- workspace-check-types.e2e-spec.ts
- cls-middleware.ts
- database.module.ts
- CreateChatTables1793215389271
- AuditLogRepository
- ZoneServers
- secrets-reencryption.service.ts
- api-app.ts
- Message
- ServerErrorsProbeController
- SecretsReencryptionService
- ApiKey
- identity-keys.service.ts
- log-redaction.e2e-spec.ts
- global-setup.ts
- cli-mode.e2e-spec.ts
- ErrorProbeController
- bullmq@^6.3.15
- IdentityKeysService
- JsonObjectValidator
- telemetry.interceptor.spec.ts
- Conversation
- domain-event-bus.spec.ts
- key-generate.command.ts
- Message
- findFreePort
- domain-event-bus.ts
- database-entities.ts
- encryption-keys.schema.spec.ts
- zod-serialization.spec.ts
- ZonedController
- status.controller.spec.ts
- BodyProbeController
- secrets-reencryption.module.ts
- encryption-keys.schema.ts
- database-migrations.spec.ts
- TelemetryProbeController
- @aws-sdk/s3-request-presigner@^3.1151.0
- AddProjectsPublicKey1793300002000
- cache-manager@^7.2.9
- @nestjs/platform-socket.io@^12.1.3
- nest-commander
- @nestjs/bullmq@^12.0.0
- @nestjs/cache-manager@^12.0.1
- @nestjs/microservices@^12.1.3
- @nestjs/swagger
- @nestjs/websockets@^12.1.3

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 94 edges
2. `typeorm` - 48 edges
3. `Zone()` - 46 edges
4. `Project` - 39 edges
5. `@nestjs/testing` - 30 edges
6. `Conversation` - 26 edges
7. `findFreePort()` - 25 edges
8. `startZoneProbeApp()` - 23 edges
9. `JsonObject` - 23 edges
10. `ApiKey` - 22 edges

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

## Communities (138 total, 40 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.14
Nodes (6): CreateProjects1793193549883, AddConversationIndexes1793215983154, CreateApiKeys1793300000000, AddProjectsOperatorAllowedOrigins1793300003000, ColumnRow, typeorm

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
Cohesion: 0.13
Nodes (10): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, databaseUrl(), IdentityRow, VersionRow, useTestRedis() (+2 more)

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
Cohesion: 0.16
Nodes (13): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ApiExceptionInput, entries(), errorEntriesOf() (+5 more)

### Community 23 - "audit-log.listener.spec.ts"
Cohesion: 0.17
Nodes (9): eventValues, happened, personalValues, AuditModule, AppClsModule, AppConfigModule, OperationStepsModule, TelemetryModule (+1 more)

### Community 24 - "test-database.ts"
Cohesion: 0.13
Nodes (13): apiKeyKinds, identityKeyAlgorithms, ColumnRow, expectedColumns, IndexRow, PlanRow, ColumnRow, expectedColumns (+5 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "conversation.entity.spec.ts"
Cohesion: 0.16
Nodes (7): Channel, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.09
Nodes (27): ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation(), createMessage() (+19 more)

### Community 32 - "key-format.ts"
Cohesion: 0.15
Nodes (14): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+6 more)

### Community 33 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 35 - "Project"
Cohesion: 0.12
Nodes (23): IssueApiKeyInput, IssuedApiKey, CreatedProject, CreateProjectInput, InvalidProjectNameError, ProjectActorKind, ProjectAlreadyExistsError, ProjectNotFoundError (+15 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "http-error.filter.spec.ts"
Cohesion: 0.14
Nodes (14): ApiHttpModule, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter (+6 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-servers.spec.ts"
Cohesion: 0.14
Nodes (19): DatabaseModule, findZonePorts(), probeControllers, LogEntry, findFreePort(), serverDirectory, withOfflineDatabase(), offlineRedis (+11 more)

### Community 41 - "Project"
Cohesion: 0.10
Nodes (7): channelColumns(), findColumn(), Project, ProjectsModule, NewProject, ProjectsRepository, @nestjs-cls/transactional-adapter-typeorm

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "DomainEventBus"
Cohesion: 0.11
Nodes (6): ApiKeysService, toEvent(), DomainEventBus, AuditScenarios, happenedIn(), ScenarioError

### Community 46 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 47 - "logger.module.ts"
Cohesion: 0.21
Nodes (14): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+6 more)

### Community 48 - "Visitor"
Cohesion: 0.32
Nodes (5): columns(), expectedColumns, findColumn(), findRelation(), relations()

### Community 49 - "api-keys.service.ts"
Cohesion: 0.15
Nodes (19): ApiKeyKind, NewApiKey, hashMatches(), eventFields, IssueApiKeyBaseInput, keyTypeByKind, RevokeApiKeyInput, serverKey (+11 more)

### Community 50 - "conversation-event.entity.spec.ts"
Cohesion: 0.36
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 51 - "database-connection.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "config.module.ts"
Cohesion: 0.26
Nodes (14): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig (+6 more)

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.12
Nodes (13): errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema (+5 more)

### Community 55 - "AuditLogEntry"
Cohesion: 0.18
Nodes (8): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns, JsonObject

### Community 56 - "main.ts"
Cohesion: 0.15
Nodes (17): configureApiApp(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders() (+9 more)

### Community 57 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.16
Nodes (18): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertSecret(), insertVersion1Secrets(), key1 (+10 more)

### Community 61 - "identity-key-pem.spec.ts"
Cohesion: 0.23
Nodes (7): algorithmOf(), InvalidIdentityKeyError, isP256(), parseIdentityPublicKey(), readPublicKeyObject(), captureError(), expectInvalidKey()

### Community 63 - "origin.ts"
Cohesion: 0.42
Nodes (6): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl()

### Community 64 - "api-versioning.spec.ts"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 65 - "migrate.module.ts"
Cohesion: 0.17
Nodes (5): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 66 - "encryption.service.ts"
Cohesion: 0.17
Nodes (12): authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv, tag (+4 more)

### Community 67 - "Zone"
Cohesion: 0.15
Nodes (11): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+3 more)

### Community 68 - "json-object-schema.ts"
Cohesion: 0.12
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, jsonObjectSchema, Violation, JsonObjectLimits, JsonValue (+1 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.31
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 73 - "OperationSteps"
Cohesion: 0.08
Nodes (12): DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationSteps, OperationStepsProbeController, beginOperation(), operationTimingKey (+4 more)

### Community 74 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 75 - "identity-keys.e2e-spec.ts"
Cohesion: 0.24
Nodes (11): KeysModule, WorkerModule, expectNoRows(), addKey(), auditRows(), auditRowsByAction(), identityKeyRows(), exportPems() (+3 more)

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "database-entities.ts"
Cohesion: 0.16
Nodes (13): ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind, messageSenderKinds (+5 more)

### Community 78 - "audit.module.ts"
Cohesion: 0.17
Nodes (10): auditedEventNames(), auditRules, auditedEvents, botKeyEvent, identityKeyEvent, projectCreatedEvent, serverKeyEvent, ApiKeyEvent (+2 more)

### Community 79 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 80 - "health.module.ts"
Cohesion: 0.06
Nodes (19): ioredis@^6.0.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+11 more)

### Community 81 - "security-headers.spec.ts"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 82 - "@nestjs/common"
Cohesion: 0.09
Nodes (12): probeControllers, probeControllers, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, zoneMetadataKey, readMetricLines() (+4 more)

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "cls-middleware.ts"
Cohesion: 0.19
Nodes (7): ApiModule, useClsMiddleware(), LogDestination, echoRequestId(), resolveRequestId(), createE2eApp(), nestjs-pino

### Community 85 - "database.module.ts"
Cohesion: 0.26
Nodes (9): databaseMigrations, createTypeOrmModule(), getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity (+1 more)

### Community 87 - "AuditLogRepository"
Cohesion: 0.18
Nodes (3): AuditLogListener, AuditLogRepository, AuditRule

### Community 88 - "ZoneServers"
Cohesion: 0.24
Nodes (4): startListening(), stopListening(), ZoneServers, ZonesModule

### Community 89 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): BatchResult, compareVersionCounts(), FieldReencryption, FieldResult, FieldVersionCount, reencryptionBatchSize, ReencryptionReport, SecretRow (+3 more)

### Community 90 - "api-app.ts"
Cohesion: 0.09
Nodes (22): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes (+14 more)

### Community 91 - "Message"
Cohesion: 0.27
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 95 - "identity-keys.service.ts"
Cohesion: 0.31
Nodes (9): jose@^6.2.12, KeyActorKind, IdentityKeyAlgorithm, ParsedIdentityKey, NewIdentityKey, AddedIdentityKey, AddIdentityKeyInput, RevokeIdentityKeyInput (+1 more)

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 97 - "global-setup.ts"
Cohesion: 0.33
Nodes (6): DatabaseMigration, runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.11
Nodes (16): cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, runCli(), expectSingleServerKey(), nonEmptyLines() (+8 more)

### Community 101 - "IdentityKeysService"
Cohesion: 0.20
Nodes (4): IdentityKeyKidTakenError, IdentityKeysService, InvalidIdentityKeyIdError, toEvent()

### Community 103 - "telemetry.interceptor.spec.ts"
Cohesion: 0.11
Nodes (7): HttpMetrics, StepTimes, FinishedOperation, SlowOperationsModule, roundSteps(), SlowOperations, TelemetryInterceptor

### Community 105 - "domain-event-bus.spec.ts"
Cohesion: 0.29
Nodes (7): happened, TestListener, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 106 - "key-generate.command.ts"
Cohesion: 0.31
Nodes (5): emptyCell, formatDate(), writeLine(), writeTable(), KeyGenerateCommand

### Community 108 - "findFreePort"
Cohesion: 0.14
Nodes (13): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), fetchStatus(), repositoryRoot (+5 more)

### Community 109 - "domain-event-bus.ts"
Cohesion: 0.57
Nodes (4): DomainEventHandler, DomainEventName, DomainEvents, @nestjs/event-emitter

### Community 110 - "database-entities.ts"
Cohesion: 0.48
Nodes (3): database, loadDataSource(), databaseEntities

### Community 111 - "encryption-keys.schema.spec.ts"
Cohesion: 0.29
Nodes (7): describeErrors(), key1, key1Bytes, key2, key2Bytes, parseKeys(), requiredEnv

### Community 112 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 122 - "secrets-reencryption.module.ts"
Cohesion: 0.43
Nodes (3): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule

### Community 123 - "encryption-keys.schema.ts"
Cohesion: 0.60
Nodes (5): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject()

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 783 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `request-id.spec.ts`, `server/package.json`, `encryption.service.spec.ts`, `dependencies`, `server-errors.spec.ts`, `audit-log.listener.spec.ts`, `test-database.ts`, `Project`, `http-error.filter.spec.ts`, `zone-servers.spec.ts`, `Project`, `logger.module.ts`, `api-keys.service.ts`, `config.module.ts`, `log-redaction.spec.ts`, `AuditLogEntry`, `main.ts`, `metrics.controller.ts`, `migrate.module.ts`, `encryption.service.ts`, `Zone`, `OperationSteps`, `identity-keys.e2e-spec.ts`, `audit.module.ts`, `health.module.ts`, `cls-middleware.ts`, `database.module.ts`, `ZoneServers`, `secrets-reencryption.service.ts`, `api-app.ts`, `identity-keys.service.ts`, `cli-mode.e2e-spec.ts`, `telemetry.interceptor.spec.ts`, `domain-event-bus.spec.ts`, `domain-event-bus.ts`, `zod-serialization.spec.ts`, `status.controller.spec.ts`, `secrets-reencryption.module.ts`?**
  _High betweenness centrality (0.238) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13768115942028986 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `database-migrations.ts` to `server/package.json`, `ref_node_path`, `dependencies`, `test-database.ts`, `conversation.entity.spec.ts`, `chat-tables.e2e-spec.ts`, `Project`, `Project`, `Visitor`, `api-keys.service.ts`, `conversation-event.entity.spec.ts`, `AuditLogEntry`, `migrate-mode.e2e-spec.ts`, `test-secrets.ts`, `OperationSteps`, `identity-keys.e2e-spec.ts`, `participant.entity.spec.ts`, `database-entities.ts`, `database.module.ts`, `Message`, `identity-keys.service.ts`, `global-setup.ts`, `findFreePort`, `database-entities.ts`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `zone-servers.spec.ts` to `key-format.ts`, `Project`, `devDependencies`, `server/package.json`, `OperationSteps`, `encryption.service.spec.ts`, `domain-event-bus.spec.ts`, `Project`, `findFreePort`, `identity-keys.e2e-spec.ts`, `logger.module.ts`, `api-keys.service.ts`, `config.module.ts`, `AuditLogEntry`, `cls-middleware.ts`, `audit-log.listener.spec.ts`, `test-secrets.ts`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Should `request-id.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._