# Graph Report - hector-chat-epic-10  (2026-10-29)

## Corpus Check
- 285 files · ~63,858 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2032 nodes · 4320 edges · 138 communities (101 shown, 37 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 90 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bf62549d`
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
- config.module.ts
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
- Project
- tsconfig.build.json
- ValidationProbeController
- http-error.filter.spec.ts
- nest-cli.json
- zone-servers.spec.ts
- typeorm
- server-sdk/tsconfig.json
- ResponseProbeController
- ApiKeysService
- projects-service-probe.ts
- main.ts
- Visitor
- api-keys.service.ts
- @nestjs/common
- database-connection.e2e-spec.ts
- project-commands.e2e-spec.ts
- log-redaction.spec.ts
- protocol/src/index.ts
- AuditLogEntry
- body-limit.ts
- metrics.controller.ts
- migrate-mode.e2e-spec.ts
- CreateAuditLog1793200000000
- test-secrets.ts
- identity-key-pem.spec.ts
- unit-probe.ts
- origin.ts
- api-versioning.spec.ts
- request-id.spec.ts
- encryption.service.ts
- Zone
- json-object-schema.ts
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- json-object-limits.spec.ts
- @nestjs/testing
- redis.module.ts
- identity-keys.e2e-spec.ts
- participant.entity.spec.ts
- database-entities.ts
- audit.module.ts
- health.e2e-spec.ts
- health.module.ts
- security-headers.spec.ts
- telemetry.interceptor.spec.ts
- workspace-check-types.e2e-spec.ts
- cls-middleware.ts
- database-options.ts
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
- ref_vitest
- api-keys.service.ts
- JsonObjectValidator
- telemetry.interceptor.spec.ts
- Conversation
- domain-event-bus.spec.ts
- project-list.command.ts
- transactions.e2e-spec.ts
- findFreePort
- DomainEventBus
- Channel
- SlowProbeController
- DatabaseStepSubscriber
- zone.decorator.ts
- OperationStepsProbeController
- body-limit.spec.ts
- secrets-reencryption.module.ts
- CreateProjects1793193549883
- database-migrations.spec.ts
- CreateApiKeys1793300000000
- @aws-sdk/s3-request-presigner@^3.1151.0
- AddProjectsPublicKey1793300002000
- cache-manager@^7.2.9
- @nestjs/platform-socket.io@^12.1.3
- @aws-sdk/client-s3@^3.1151.0
- helmet
- @nestjs/cache-manager@^12.0.1
- @nestjs/microservices@^12.1.3
- @nestjs/swagger
- pg
- socket.io@^4.8.4
- @nestjs/schematics@^12.0.0

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 96 edges
2. `typeorm` - 48 edges
3. `Zone()` - 46 edges
4. `Project` - 40 edges
5. `@nestjs/testing` - 30 edges
6. `Conversation` - 26 edges
7. `findFreePort()` - 25 edges
8. `ApiKey` - 23 edges
9. `startZoneProbeApp()` - 23 edges
10. `JsonObject` - 23 edges

## Surprising Connections (you probably didn't know these)
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts
- `AuditRecord` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-rule.ts → packages/protocol/src/json-types.ts
- `ConversationEvent` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation-event.entity.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (138 total, 37 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.17
Nodes (5): databaseMigrations, AddConversationIndexes1793215983154, CreateIdentityKeys1793300001000, AddProjectsOperatorAllowedOrigins1793300003000, ColumnRow

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "request-id.spec.ts"
Cohesion: 0.18
Nodes (9): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+1 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21, supertest@^7.0.0 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.10
Nodes (19): author, bin, sowa-chat, bullmq@^6.3.15, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/bullmq@^12.0.0, @nestjs/throttler@^6.7.1, @socket.io/redis-adapter@^8.3.0 (+11 more)

### Community 7 - "config.module.ts"
Cohesion: 0.05
Nodes (49): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, EncryptionKey (+41 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.09
Nodes (17): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, builtFiles, CommandResult, entriesByPackage, plannedBuildTasks() (+9 more)

### Community 10 - "encryption.service.spec.ts"
Cohesion: 0.14
Nodes (9): CryptoModule, EncryptionService, SecretDecryptionError, captureError(), createService(), expectDecryptionError(), key1, key2 (+1 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, file-type@^22.1.1, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1, @nestjs/core@^12.0.1 (+21 more)

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

### Community 23 - "api.module.ts"
Cohesion: 0.14
Nodes (8): databaseEntities, AuditModule, AppClsModule, AppConfigModule, ApiHttpModule, RedisModule, ZonesModule, TelemetryModule

### Community 24 - "test-database.ts"
Cohesion: 0.12
Nodes (15): actorKinds, apiKeyKinds, ColumnRow, expectedColumns, ColumnRow, expectedColumns, IndexRow, PlanRow (+7 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.16
Nodes (12): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, waitForHttpStatus() (+4 more)

### Community 28 - ".create"
Cohesion: 0.14
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+2 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.12
Nodes (16): boolean, ColumnSpec, expectedColumnCounts, expectedForeignKeys, expectedTables, expectedUniqueIndexes, integer, jsonb (+8 more)

### Community 32 - "key-format.ts"
Cohesion: 0.15
Nodes (14): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+6 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "Project"
Cohesion: 0.16
Nodes (14): CreatedProject, CreateProjectInput, InvalidProjectNameError, ProjectActorKind, ProjectAlreadyExistsError, ProjectNotFoundError, apiKeyRows(), auditRows() (+6 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "http-error.filter.spec.ts"
Cohesion: 0.15
Nodes (14): nestjs-zod@^5.5.0, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter (+6 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-servers.spec.ts"
Cohesion: 0.13
Nodes (15): configureApiApp(), HealthBody, HealthEntry, DependencyStatusBody, StatusBody, noStore(), useSecurityHeaders(), probeControllers (+7 more)

### Community 41 - "typeorm"
Cohesion: 0.15
Nodes (13): Project, ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation() (+5 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "ResponseProbeController"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 45 - "ApiKeysService"
Cohesion: 0.15
Nodes (3): ApiKeysRepository, ApiKeysService, toEvent()

### Community 46 - "projects-service-probe.ts"
Cohesion: 0.11
Nodes (11): IssuedApiKey, KeysModule, ProjectsModule, NewProject, ProjectsRepository, ProjectsService, createProjectsServiceProbe(), issuedServerKey (+3 more)

### Community 47 - "main.ts"
Cohesion: 0.06
Nodes (33): cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, DatabaseMigrationStep, createLogDestination(), logFileDescriptor() (+25 more)

### Community 48 - "Visitor"
Cohesion: 0.15
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor

### Community 49 - "api-keys.service.ts"
Cohesion: 0.26
Nodes (11): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+3 more)

### Community 50 - "@nestjs/common"
Cohesion: 0.17
Nodes (9): createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, MetricsModule, OperationStepsModule, SlowOperationsModule, @nestjs/common (+1 more)

### Community 51 - "database-connection.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "project-commands.e2e-spec.ts"
Cohesion: 0.21
Nodes (14): CliRunResult, runCliInProcess(), buildServer(), createMain(), fullOriginArguments, listHeader, nonEmptyLines(), onceWarning (+6 more)

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (11): allOutput(), CapturedLogs, fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields, RedactionProbeController (+3 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.23
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 56 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 57 - "metrics.controller.ts"
Cohesion: 0.22
Nodes (3): prom-client@^15.1.3, MetricsController, prom-client

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.23
Nodes (9): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, withClient() (+1 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.16
Nodes (18): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertSecret(), insertVersion1Secrets(), key1 (+10 more)

### Community 61 - "identity-key-pem.spec.ts"
Cohesion: 0.27
Nodes (7): algorithmOf(), InvalidIdentityKeyError, isP256(), parseIdentityPublicKey(), readPublicKeyObject(), captureError(), expectInvalidKey()

### Community 62 - "unit-probe.ts"
Cohesion: 0.17
Nodes (11): LogDestination, createRedactionProbeApp(), createRequestIdProbeApp(), LogEntry, offlineRedis, withOfflineRedis(), createProbeApp(), ProbeAppOptions (+3 more)

### Community 63 - "origin.ts"
Cohesion: 0.42
Nodes (6): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl()

### Community 64 - "api-versioning.spec.ts"
Cohesion: 0.25
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 65 - "request-id.spec.ts"
Cohesion: 0.17
Nodes (9): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse, ProbeService (+1 more)

### Community 66 - "encryption.service.ts"
Cohesion: 0.17
Nodes (12): authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv, tag (+4 more)

### Community 67 - "Zone"
Cohesion: 0.11
Nodes (14): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+6 more)

### Community 68 - "json-object-schema.ts"
Cohesion: 0.12
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, jsonObjectSchema, Violation, JsonObjectLimits, JsonValue (+1 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "IdentityKey"
Cohesion: 0.09
Nodes (6): IdentityKey, IdentityKeysRepository, IdentityKeyKidTakenError, IdentityKeysService, InvalidIdentityKeyIdError, toEvent()

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.31
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 73 - "@nestjs/testing"
Cohesion: 0.19
Nodes (8): OperationStep, operationSteps, OperationTiming, OperationSteps, beginOperation(), operationTimingKey, nestjs-cls, @nestjs/testing

### Community 74 - "redis.module.ts"
Cohesion: 0.28
Nodes (7): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), ioredis

### Community 75 - "identity-keys.e2e-spec.ts"
Cohesion: 0.30
Nodes (10): WorkerModule, expectNoRows(), addKey(), auditRows(), auditRowsByAction(), identityKeyRows(), exportPems(), generateEd25519Pems() (+2 more)

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "database-entities.ts"
Cohesion: 0.16
Nodes (14): ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind, messageSenderKinds (+6 more)

### Community 78 - "audit.module.ts"
Cohesion: 0.21
Nodes (8): auditedEvents, botKeyEvent, identityKeyEvent, projectCreatedEvent, serverKeyEvent, ApiKeyEvent, IdentityKeyEvent, ProjectCreatedEvent

### Community 79 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 81 - "security-headers.spec.ts"
Cohesion: 0.21
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 82 - "telemetry.interceptor.spec.ts"
Cohesion: 0.14
Nodes (5): readMetricLines(), TelemetryProbeController, zoneUrl(), ZoneProbeApp, rxjs

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "cls-middleware.ts"
Cohesion: 0.33
Nodes (5): ApiModule, useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp()

### Community 85 - "database-options.ts"
Cohesion: 0.22
Nodes (6): database, loadDataSource(), DatabaseConnection, DatabaseEntity, FirstEntity, SecondEntity

### Community 87 - "AuditLogRepository"
Cohesion: 0.13
Nodes (7): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, auditRules, testAuditRules

### Community 88 - "ZoneServers"
Cohesion: 0.22
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 89 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): BatchResult, compareVersionCounts(), FieldReencryption, FieldResult, FieldVersionCount, reencryptionBatchSize, ReencryptionReport, SecretRow (+3 more)

### Community 90 - "api-app.ts"
Cohesion: 0.17
Nodes (15): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, ApiZone, apiZones (+7 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 95 - "identity-keys.service.ts"
Cohesion: 0.26
Nodes (10): jose@^6.2.12, KeyActorKind, IdentityKeyAlgorithm, identityKeyAlgorithms, ParsedIdentityKey, NewIdentityKey, AddedIdentityKey, AddIdentityKeyInput (+2 more)

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 97 - "global-setup.ts"
Cohesion: 0.30
Nodes (7): DatabaseMigration, createDataSourceOptions(), runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 100 - "ref_vitest"
Cohesion: 0.17
Nodes (5): errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody

### Community 101 - "api-keys.service.ts"
Cohesion: 0.22
Nodes (9): ApiKeyKind, NewApiKey, hashMatches(), IssueApiKeyBaseInput, IssueApiKeyInput, keyTypeByKind, RevokeApiKeyInput, VerifiedApiKey (+1 more)

### Community 103 - "telemetry.interceptor.spec.ts"
Cohesion: 0.16
Nodes (4): HttpMetrics, roundSteps(), SlowOperations, TelemetryInterceptor

### Community 105 - "domain-event-bus.spec.ts"
Cohesion: 0.31
Nodes (5): TestListener, DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 106 - "project-list.command.ts"
Cohesion: 0.09
Nodes (13): nest-commander@^3.21.0, emptyCell, formatDate(), writeLine(), writeTable(), KeyGenerateCommand, ProjectCreateCommand, ProjectCreateOptions (+5 more)

### Community 107 - "transactions.e2e-spec.ts"
Cohesion: 0.27
Nodes (5): ActorKind, NewAuditLogEntry, AuditRecord, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 108 - "findFreePort"
Cohesion: 0.14
Nodes (16): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), serverEnvironment() (+8 more)

### Community 109 - "DomainEventBus"
Cohesion: 0.23
Nodes (9): auditedEventNames(), AuditRule, DomainEventBus, happened, DomainEventHandler, DomainEventName, DomainEvents, OnDomainEvent() (+1 more)

### Community 110 - "Channel"
Cohesion: 0.22
Nodes (3): Channel, channelColumns(), findColumn()

### Community 115 - "zone.decorator.ts"
Cohesion: 0.13
Nodes (9): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, BareController, MethodOnlyController, ZonedController, zoneMetadataKey (+1 more)

### Community 122 - "secrets-reencryption.module.ts"
Cohesion: 0.43
Nodes (3): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 791 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **37 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `request-id.spec.ts`, `server/package.json`, `config.module.ts`, `encryption.service.spec.ts`, `dependencies`, `server-errors.spec.ts`, `api.module.ts`, `test-database.ts`, `zone.guard.spec.ts`, `Project`, `http-error.filter.spec.ts`, `zone-servers.spec.ts`, `ResponseProbeController`, `projects-service-probe.ts`, `main.ts`, `log-redaction.spec.ts`, `body-limit.ts`, `metrics.controller.ts`, `unit-probe.ts`, `api-versioning.spec.ts`, `request-id.spec.ts`, `encryption.service.ts`, `Zone`, `@nestjs/testing`, `redis.module.ts`, `health.module.ts`, `security-headers.spec.ts`, `telemetry.interceptor.spec.ts`, `cls-middleware.ts`, `AuditLogRepository`, `secrets-reencryption.service.ts`, `api-app.ts`, `identity-keys.service.ts`, `api-keys.service.ts`, `project-list.command.ts`, `transactions.e2e-spec.ts`, `DomainEventBus`, `zone.decorator.ts`, `body-limit.spec.ts`, `secrets-reencryption.module.ts`?**
  _High betweenness centrality (0.256) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `server/package.json`, `ref_node_path`, `dependencies`, `test-database.ts`, `conversation.entity.spec.ts`, `ConversationEvent`, `Project`, `Visitor`, `@nestjs/common`, `migrate-mode.e2e-spec.ts`, `CreateAuditLog1793200000000`, `test-secrets.ts`, `@nestjs/testing`, `identity-keys.e2e-spec.ts`, `participant.entity.spec.ts`, `database-entities.ts`, `database-options.ts`, `CreateChatTables1793215389271`, `Message`, `identity-keys.service.ts`, `global-setup.ts`, `transactions.e2e-spec.ts`, `findFreePort`, `Channel`, `CreateProjects1793193549883`, `CreateApiKeys1793300000000`, `AddProjectsPublicKey1793300002000`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `@nestjs/testing` to `devDependencies`, `server/package.json`, `config.module.ts`, `encryption.service.spec.ts`, `test-database.ts`, `key-format.ts`, `Project`, `zone-servers.spec.ts`, `projects-service-probe.ts`, `main.ts`, `api-keys.service.ts`, `test-secrets.ts`, `unit-probe.ts`, `identity-keys.e2e-spec.ts`, `cls-middleware.ts`, `AuditLogRepository`, `transactions.e2e-spec.ts`, `findFreePort`, `DomainEventBus`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `server-modes.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13071895424836602 - nodes in this community are weakly interconnected._