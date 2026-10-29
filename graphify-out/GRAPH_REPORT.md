# Graph Report - hector-chat-epic-11  (2026-10-29)

## Corpus Check
- 470 files · ~122,611 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .log 1)

## Summary
- 3233 nodes · 8166 edges · 164 communities (125 shown, 39 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 209 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fc1a2854`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- typeorm
- bot-sdk/tsconfig.json
- package.json
- visitor-session-refresh.e2e-spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- request-context.spec.ts
- env.schema.ts
- compilerOptions
- protocol/src/index.ts
- environment-checks.service.ts
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
- replica-events-transport.ts
- operator-role.guard.spec.ts
- Project
- scripts
- origin.commands.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- identity-key-list.command.ts
- MixedZoneController
- DomainEventBus
- development-secrets-file.ts
- tsconfig.build.json
- ValidationProbeController
- main.ts
- nest-cli.json
- @nestjs/testing
- operator-block-sync.e2e-spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- OperatorDisableCommand
- RedactionProbeController
- json-object-limits.spec.ts
- visitor-session.controller.ts
- Conversation
- cli.module.ts
- telemetry.interceptor.spec.ts
- @nestjs/testing
- server-errors.spec.ts
- startup-summary.service.spec.ts
- development-secrets.spec.ts
- ProjectCreateCommand
- database-entities.ts
- server/package.json
- JsonObject
- test-secrets.ts
- audit-log.e2e-spec.ts
- identity-keys.e2e-spec.ts
- secrets-reencrypt-command.e2e-spec.ts
- participant.entity.spec.ts
- main.ts
- encryption.service.spec.ts
- key-cli.ts
- log-level-warn.spec.ts
- ConversationEvent
- ref_node_crypto
- server-protocol.e2e-spec.ts
- ProjectsService
- OperationSteps
- findFreePort
- audited-events.ts
- config.module.ts
- secrets-reencrypt.command.ts
- .canActivate
- secret-rotation.ts
- health.module.ts
- DisabledOperators
- projects.service.ts
- operator-token.controller.ts
- RequestContext
- server-errors.spec.ts
- CreateChatTables1793215389271
- slow-operations.ts
- ioredis
- project-snapshot-cache.e2e-spec.ts
- zone-e2e-app.ts
- Message
- encryption-keys.schema.spec.ts
- secrets-reencryption.service.ts
- api-keys-cache.e2e-spec.ts
- IdentityKey
- initial-project.development.spec.ts
- migrate.module.ts
- cli-mode.e2e-spec.ts
- SecretsReencryptionService
- api-docs.spec.ts
- IdentityKeyAddCommand
- JsonObjectValidator
- visitor.entity.spec.ts
- e2e-server.ts
- @nestjs/common
- operators.module.ts
- operator-commands.e2e-spec.ts
- identity-key-pem.ts
- ref_node_path
- secret-generators.spec.ts
- migrate-mode.e2e-spec.ts
- OperatorsService
- tokens.service.ts
- telemetry.module.ts
- replica-events.e2e-spec.ts
- LocalCacheInvalidation
- env.schema.initial-project.spec.ts
- env.schema.logging.spec.ts
- test-database.ts
- TokenConsumer
- log-settings.e2e-spec.ts
- env.schema.spec.ts
- @aws-sdk/client-s3@^3.1151.0
- ServerErrorsProbeController
- encrypted-secret.spec.ts
- visitors.module.ts
- bullmq@^6.3.15
- SlowProbeController
- helmet
- health.e2e-spec.ts
- origin.ts
- global-setup.ts
- zod-serialization.spec.ts
- log-redaction.e2e-spec.ts
- packages-build.e2e-spec.ts
- typeorm
- workspace-check-types.e2e-spec.ts
- ErrorProbeController
- StatusController
- @nestjs/bullmq@^12.0.0
- @nestjs/platform-socket.io@^12.1.3
- InternalProbeController
- cache-invalidate.controller.spec.ts
- operator-auth.guard.ts
- load-env.ts
- IdentityKeyRevokeCommand
- @nestjs/swagger
- @nestjs/throttler@^6.7.1
- .ready
- ZoneServers
- @nestjs/websockets@^12.1.3
- TestTokenSigningConfigModule
- token-signing-keys.schema.ts
- reflect-metadata@^0.2.2
- rxjs
- EnvironmentChecksModule

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 169 edges
2. `typeorm` - 68 edges
3. `ProjectsService` - 54 edges
4. `Zone()` - 54 edges
5. `Project` - 53 edges
6. `@nestjs/testing` - 52 edges
7. `useTestDatabase()` - 50 edges
8. `DomainEventBus` - 40 edges
9. `createProject()` - 39 edges
10. `@nestjs/config` - 38 edges

## Surprising Connections (you probably didn't know these)
- `ConversationEvent` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation-event.entity.ts → packages/protocol/src/json-types.ts
- `Conversation` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation.entity.ts → packages/protocol/src/json-types.ts
- `Message` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/message.entity.ts → packages/protocol/src/json-types.ts
- `Operator` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/domain/operators/operator.entity.ts → packages/protocol/src/operator-role.ts
- `OperatorProfile` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/domain/operators/operators.repository.ts → packages/protocol/src/operator-role.ts

## Import Cycles
- None detected.

## Communities (164 total, 39 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.06
Nodes (20): columns(), expectedColumns, findColumn(), findRelation(), normalizeSql(), relations(), runMigration(), NewVisitorSession (+12 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "visitor-session-refresh.e2e-spec.ts"
Cohesion: 0.12
Nodes (30): api(), createProjectWithPublicKey(), findAllSessions(), findFamilySessions(), findSessionByRefreshToken(), postVisitorSession(), postVisitorSessionRefresh(), startVisitorSession() (+22 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "request-context.spec.ts"
Cohesion: 0.18
Nodes (3): RequestContextModule, ConsumerModule, ContextConsumer

### Community 7 - "env.schema.ts"
Cohesion: 0.09
Nodes (21): checkEncryptionKeysInProduction(), checkInitialServerKey(), checkPrettyLogFormat(), checkPublicUrlInProduction(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), EnvObject, envObjectSchema (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "protocol/src/index.ts"
Cohesion: 0.10
Nodes (20): OperatorIdRow, OperatorProfile, IssueOperatorTokenInput, RequestOperator, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope (+12 more)

### Community 10 - "environment-checks.service.ts"
Cohesion: 0.17
Nodes (19): CheckContext, CheckFinding, CheckLevel, CheckResult, EnvironmentCheck, EnvironmentCheckError, describeResult(), EnvironmentChecksService (+11 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @aws-sdk/s3-request-presigner@^3.1151.0, cache-manager@^7.2.9, jose@^6.2.12, nest-commander@^3.21.0, @nestjs/cache-manager@^12.0.1, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1 (+22 more)

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

### Community 22 - "replica-events-transport.ts"
Cohesion: 0.26
Nodes (9): parseDatabase(), parseUrl(), RedisConnectionOptions, redisTransportOptions(), stripIpv6Brackets(), replicaEventsMicroservice, replicaEventsRetryDelayMs, replicaEventsTransport() (+1 more)

### Community 23 - "operator-role.guard.spec.ts"
Cohesion: 0.11
Nodes (10): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey (+2 more)

### Community 24 - "Project"
Cohesion: 0.13
Nodes (9): Channel, channelColumns(), findColumn(), columns(), expectedColumns, findColumn(), findRelation(), relations() (+1 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.11
Nodes (13): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand (+5 more)

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
Cohesion: 0.06
Nodes (36): ColumnRow, ForeignKeyRow, IndexRow, tableNames, IndexRow, PlanRow, countRows(), createChannel() (+28 more)

### Community 32 - "identity-key-list.command.ts"
Cohesion: 0.07
Nodes (15): emptyCell, formatDate(), writeTable(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow(), header (+7 more)

### Community 33 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 34 - "DomainEventBus"
Cohesion: 0.08
Nodes (14): BusProbe, ReplicaEventMessage, replicaEventNames(), ReplicaEventRule, replicaEventRules, errorMessage(), replicaPublishConnectTimeoutMs, replicaEventsClient (+6 more)

### Community 35 - "development-secrets-file.ts"
Cohesion: 0.17
Nodes (23): completeFile(), createFile(), createDevelopmentSecrets(), defaultDevelopmentSecretsDirectory, DevelopmentSecrets, developmentSecretsFileName, developmentSecretsSchema, hasErrorCode() (+15 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "main.ts"
Cohesion: 0.16
Nodes (16): createLogDestination(), logFileDescriptor(), LogDestination, LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions() (+8 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "@nestjs/testing"
Cohesion: 0.09
Nodes (26): ApiModule, useClsMiddleware(), DatabaseModule, HealthBody, HealthEntry, DependencyStatusBody, StatusBody, echoRequestId() (+18 more)

### Community 41 - "operator-block-sync.e2e-spec.ts"
Cohesion: 0.07
Nodes (38): OperatorController(), connectReplicaEvents(), DisabledProbeController, issueOperator(), getProbe(), issueOperator(), withToken(), blockedOnAll() (+30 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "OperatorDisableCommand"
Cohesion: 0.17
Nodes (4): describeDisable(), describeEnable(), OperatorDisableCommand, OperatorEnableCommand

### Community 46 - "RedactionProbeController"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 47 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 48 - "visitor-session.controller.ts"
Cohesion: 0.11
Nodes (15): VisitorApiModule, toVisitorSessionResponse(), VisitorSessionController, VisitorSessionRefreshRequestDto, VisitorSessionRequestDto, VisitorSessionResponseDto, VisitorsModule, refreshToken (+7 more)

### Community 49 - "Conversation"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 50 - "cli.module.ts"
Cohesion: 0.09
Nodes (15): serverKeyOnceWarning, writeLine(), writeWarning(), IdentityKeyAddOptions, IdentityKeyRevokeOptions, KeyCreateCommand, KeyCreateOptions, KeyGenerateCommand (+7 more)

### Community 51 - "telemetry.interceptor.spec.ts"
Cohesion: 0.09
Nodes (13): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+5 more)

### Community 52 - "@nestjs/testing"
Cohesion: 0.05
Nodes (36): IssueApiKeyInput, KeysModule, OriginList, ProjectsModule, initialProjectLockName, NewProject, ORIGIN_COLUMNS, OriginsRow (+28 more)

### Community 53 - "server-errors.spec.ts"
Cohesion: 0.09
Nodes (23): OperatorDisabledFilter, InvalidPublicKeyFilter, InvalidRefreshTokenFilter, OperatorDisabledError, InvalidPublicKeyError, ApiException, ApiExceptionInput, errorCodeStatuses (+15 more)

### Community 54 - "startup-summary.service.spec.ts"
Cohesion: 0.13
Nodes (11): formatOrigins(), createService(), ports, secretLines, shop, zoneLines, StartupSummaryService, SecretStatus (+3 more)

### Community 55 - "development-secrets.spec.ts"
Cohesion: 0.17
Nodes (22): compileConfigModule(), compileInDevelopment(), developmentSecretsPath(), Loaded, allTestSecrets, createSecretsDirectory(), developmentEnvWithoutSecrets, developmentSource() (+14 more)

### Community 57 - "database-entities.ts"
Cohesion: 0.18
Nodes (11): database, loadDataSource(), databaseEntities, databaseMigrations, createTypeOrmModule(), getTypeOrmModule(), createDataSourceOptions(), DatabaseConnection (+3 more)

### Community 58 - "server/package.json"
Cohesion: 0.09
Nodes (21): author, bin, sowa-chat, file-type@^22.1.1, @nest-lab/throttler-storage-redis@^1.2.0, pino-http@^11.0.0, @socket.io/redis-adapter@^8.3.0, @sowa-chat/protocol@workspace:* (+13 more)

### Community 59 - "JsonObject"
Cohesion: 0.11
Nodes (10): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, Project, ColumnRow, expectedColumns (+2 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "audit-log.e2e-spec.ts"
Cohesion: 0.12
Nodes (18): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditModule, auditedEventNames(), AuditRule (+10 more)

### Community 62 - "identity-keys.e2e-spec.ts"
Cohesion: 0.19
Nodes (20): expectNoKeyRows(), expectNoRows(), addKey(), addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem(), identityKeyListHeader (+12 more)

### Community 63 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 64 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 65 - "main.ts"
Cohesion: 0.10
Nodes (21): configureApiApp(), cliName, commanderArgv(), runCliCommand(), startupLogLevels, bodyLimit, useBodyLimit(), BodyParserError (+13 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.11
Nodes (15): EncryptionKey, CryptoModule, authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService (+7 more)

### Community 67 - "key-cli.ts"
Cohesion: 0.10
Nodes (45): toLookupPrefix(), hashKey(), badOrigins, helpEntries, prefixes, expectStatusOnAll(), probeWithKey(), CapturedRun (+37 more)

### Community 68 - "log-level-warn.spec.ts"
Cohesion: 0.18
Nodes (8): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe

### Community 69 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 70 - "ref_node_crypto"
Cohesion: 0.09
Nodes (31): InvalidApiKeyError, eventFields, serverKey, base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum() (+23 more)

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.13
Nodes (14): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp(), captureLogLines() (+6 more)

### Community 73 - "OperationSteps"
Cohesion: 0.11
Nodes (10): DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationSteps, OperationStepsProbeController, beginOperation(), operationTimingKey (+2 more)

### Community 74 - "findFreePort"
Cohesion: 0.11
Nodes (19): AppConfigModule, findZonePorts(), fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl() (+11 more)

### Community 75 - "audited-events.ts"
Cohesion: 0.11
Nodes (13): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+5 more)

### Community 76 - "config.module.ts"
Cohesion: 0.17
Nodes (17): compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, environmentChecksConfig, loggingConfig (+9 more)

### Community 77 - "secrets-reencrypt.command.ts"
Cohesion: 0.15
Nodes (11): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+3 more)

### Community 79 - "secret-rotation.ts"
Cohesion: 0.27
Nodes (13): generateEncryptionKeyEntry(), generateTokenSigningKeyEntry(), nextTokenSigningKeyId(), parseVariable(), requireConfiguredValue(), rotateConfiguredSecrets(), rotateEncryptionKeys(), rotateSecrets() (+5 more)

### Community 80 - "health.module.ts"
Cohesion: 0.13
Nodes (9): @nestjs/terminus@^12.1.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), DependencyStatus, StatusService (+1 more)

### Community 81 - "DisabledOperators"
Cohesion: 0.13
Nodes (9): DisabledOperators, OperatorReplicaEventsController, createDisabledOperators(), malformedPayloads, CacheInvalidateEvent, OperatorReplicaEvent, operatorReplicaEventSchema, replicaEventPatterns (+1 more)

### Community 82 - "projects.service.ts"
Cohesion: 0.12
Nodes (17): originLists, ProjectSnapshot, toProjectSnapshot(), InvalidProjectNameError, NormalizedOrigins, OriginChange, ORIGINS_EVENTS, prepareProject() (+9 more)

### Community 83 - "operator-token.controller.ts"
Cohesion: 0.15
Nodes (5): OperatorTokenRequestDto, OperatorTokenResponseDto, ApiHttpModule, OperatorTokenResponse, nestjs-zod

### Community 84 - "RequestContext"
Cohesion: 0.10
Nodes (5): VisitorController(), RequestContext, GuardProbeController, VisitorGuardProbeController, visitorProbePath

### Community 85 - "server-errors.spec.ts"
Cohesion: 0.15
Nodes (12): internalErrorMessage, ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, stringsInside(), errorCodes (+4 more)

### Community 87 - "slow-operations.ts"
Cohesion: 0.12
Nodes (6): HttpMetrics, StepTimes, FinishedOperation, roundSteps(), SlowOperations, TelemetryInterceptor

### Community 88 - "ioredis"
Cohesion: 0.20
Nodes (8): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 89 - "project-snapshot-cache.e2e-spec.ts"
Cohesion: 0.16
Nodes (13): apiKeyCacheKeys(), projectCacheKeys(), apiKeyEvent, projectEvent, apiKeyEvent, projectEvent, apiKeyEvent, operatorBlockEvent (+5 more)

### Community 90 - "zone-e2e-app.ts"
Cohesion: 0.07
Nodes (26): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, InternalProbeController, ManagementProbeController (+18 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.23
Nodes (11): encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes, key2 (+3 more)

### Community 93 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldResult, ReencryptInput, reencryptionBatchSize, ReencryptionReport (+3 more)

### Community 94 - "api-keys-cache.e2e-spec.ts"
Cohesion: 0.05
Nodes (24): ApiKey, ApiKeyKind, apiKeyKinds, ApiKeysRepository, NewApiKey, ApiKeysService, ApiKeySummary, CachedApiKey (+16 more)

### Community 95 - "IdentityKey"
Cohesion: 0.09
Nodes (6): IdentityKey, IdentityKeysRepository, IdentityKeyKidTakenError, IdentityKeysService, InvalidIdentityKeyIdError, toEvent()

### Community 96 - "initial-project.development.spec.ts"
Cohesion: 0.17
Nodes (11): createdProject, existingProject, missingKeyWarning(), developmentAllowedOrigins, developmentOperatorAllowedOrigins, developmentProjectName, InitialProjectService, appConfig (+3 more)

### Community 97 - "migrate.module.ts"
Cohesion: 0.17
Nodes (5): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 100 - "api-docs.spec.ts"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 102 - "JsonObjectValidator"
Cohesion: 0.17
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, JsonObjectValidator, Violation, JsonObjectLimits, encoder (+1 more)

### Community 103 - "visitor.entity.spec.ts"
Cohesion: 0.18
Nodes (5): columns(), expectedColumns, findColumn(), findRelation(), relations()

### Community 104 - "e2e-server.ts"
Cohesion: 0.18
Nodes (18): PrintedKeys, startApi(), runToExit(), runToExit(), createSecretsDirectory(), startApi(), startWorker(), zonePortVariables (+10 more)

### Community 105 - "@nestjs/common"
Cohesion: 0.06
Nodes (19): ServerController(), NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController, BodyProbeController, calls, ProbeBodyDto (+11 more)

### Community 106 - "operators.module.ts"
Cohesion: 0.11
Nodes (9): OperatorAuthModule, OperatorTokenController, ServerApiModule, VisitorAuthModule, DisabledOperatorsModule, OperatorsModule, AppClsModule, TokensModule (+1 more)

### Community 107 - "operator-commands.e2e-spec.ts"
Cohesion: 0.23
Nodes (13): runCommand(), disabledAtOf(), setupOperator(), disabledAtOf(), helpEntries, setupOperator(), operatorActions, operatorBlockAuditRows() (+5 more)

### Community 108 - "identity-key-pem.ts"
Cohesion: 0.16
Nodes (15): KeyActorKind, IdentityKeyAlgorithm, identityKeyAlgorithms, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey() (+7 more)

### Community 109 - "ref_node_path"
Cohesion: 0.07
Nodes (20): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, Env, isConfigVariable() (+12 more)

### Community 110 - "secret-generators.spec.ts"
Cohesion: 0.36
Nodes (5): firstTokenSigningKeyIds, GeneratedSecret, generatedSecrets, SecretsMode, minimalEnv

### Community 111 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 112 - "OperatorsService"
Cohesion: 0.07
Nodes (17): Probe, OperatorTokenClaims, OperatorsRepository, ChangeOperatorBlockInput, IssuedOperatorToken, OperatorActorKind, OperatorBlockChange, OperatorNotFoundError (+9 more)

### Community 115 - "tokens.service.ts"
Cohesion: 0.09
Nodes (36): TokenSigningKey, SignedToken, SignTokenInput, TokenAudience, tokenAudiences, TokensService, VerifiedToken, encodePart() (+28 more)

### Community 120 - "telemetry.module.ts"
Cohesion: 0.13
Nodes (12): happened, TestListener, DomainEventHandler, OnDomainEvent(), MetricsModule, SlowOperationsModule, TelemetryModule, DomainEvents (+4 more)

### Community 121 - "replica-events.e2e-spec.ts"
Cohesion: 0.29
Nodes (10): expectCachedOnAll(), expectKept(), repositoryRoot, seed(), waitUntilDeleted(), cacheInvalidateSubscribers(), cacheOf(), publishCacheInvalidate() (+2 more)

### Community 123 - "env.schema.initial-project.spec.ts"
Cohesion: 0.29
Nodes (3): initVariables, loadConfig(), requiredEnv

### Community 124 - "env.schema.logging.spec.ts"
Cohesion: 0.33
Nodes (3): Env, logLevels, requiredEnv

### Community 125 - "test-database.ts"
Cohesion: 0.07
Nodes (20): Operator, ColumnRow, expectedColumns, jwk, blockAuditRows(), blockMethods, createOperator(), createProjectWithKey() (+12 more)

### Community 127 - "log-settings.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, serverEnvironment(), waitForHttpStatus() (+1 more)

### Community 131 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 132 - "visitors.module.ts"
Cohesion: 0.08
Nodes (10): generateRefreshToken(), VisitorSessionsRepository, InvalidRefreshTokenError, RefreshExchange, visitorAccessTokenTtlSeconds, VisitorSessionsService, VisitorSessionTokens, VisitorTokenClaims (+2 more)

### Community 136 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 137 - "origin.ts"
Cohesion: 0.42
Nodes (6): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl()

### Community 138 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 139 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 140 - "log-redaction.e2e-spec.ts"
Cohesion: 0.31
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 141 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 143 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 149 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 150 - "cache-invalidate.controller.spec.ts"
Cohesion: 0.13
Nodes (8): AppCacheModule, cacheTtlMs, CacheInvalidateController, cacheInvalidateEventSchema, ReplicaEventsModule, cache-manager, @nestjs/cache-manager, @nestjs/microservices

### Community 151 - "operator-auth.guard.ts"
Cohesion: 0.17
Nodes (6): ServerAuthModule, ServerKeyGuard, operatorTokenClaimsSchema, bearerToken(), FakeRequestInput, RequestVisitor

### Community 152 - "load-env.ts"
Cohesion: 0.50
Nodes (4): loadFromProcessEnv(), Env, exportToProcessEnv(), loadEnv()

### Community 157 - "ZoneServers"
Cohesion: 0.21
Nodes (4): startListening(), stopListening(), ZoneServers, ZonesModule

### Community 160 - "token-signing-keys.schema.ts"
Cohesion: 0.29
Nodes (6): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, tokenSigningKeysSchema

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1116 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `typeorm`, `visitors.module.ts`, `request-context.spec.ts`, `protocol/src/index.ts`, `environment-checks.service.ts`, `zod-serialization.spec.ts`, `dependencies`, `cache-invalidate.controller.spec.ts`, `operator-role.guard.spec.ts`, `operator-auth.guard.ts`, `replica-events-transport.ts`, `origin.commands.ts`, `ZoneServers`, `identity-key-list.command.ts`, `DomainEventBus`, `main.ts`, `@nestjs/testing`, `operator-block-sync.e2e-spec.ts`, `RedactionProbeController`, `visitor-session.controller.ts`, `cli.module.ts`, `telemetry.interceptor.spec.ts`, `@nestjs/testing`, `server-errors.spec.ts`, `startup-summary.service.spec.ts`, `server/package.json`, `JsonObject`, `audit-log.e2e-spec.ts`, `main.ts`, `encryption.service.spec.ts`, `key-cli.ts`, `log-level-warn.spec.ts`, `ref_node_crypto`, `OperationSteps`, `config.module.ts`, `secrets-reencrypt.command.ts`, `health.module.ts`, `DisabledOperators`, `projects.service.ts`, `operator-token.controller.ts`, `RequestContext`, `server-errors.spec.ts`, `slow-operations.ts`, `ioredis`, `zone-e2e-app.ts`, `secrets-reencryption.service.ts`, `api-keys-cache.e2e-spec.ts`, `initial-project.development.spec.ts`, `migrate.module.ts`, `api-docs.spec.ts`, `operators.module.ts`, `identity-key-pem.ts`, `OperatorsService`, `tokens.service.ts`, `telemetry.module.ts`, `replica-events.e2e-spec.ts`, `test-database.ts`?**
  _High betweenness centrality (0.257) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.05909090909090909 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `visitor-session-refresh.e2e-spec.ts`, `protocol/src/index.ts`, `environment-checks.service.ts`, `dependencies`, `Project`, `chat-tables.e2e-spec.ts`, `operator-block-sync.e2e-spec.ts`, `Conversation`, `@nestjs/testing`, `database-entities.ts`, `server/package.json`, `JsonObject`, `test-secrets.ts`, `identity-keys.e2e-spec.ts`, `secrets-reencrypt-command.e2e-spec.ts`, `participant.entity.spec.ts`, `key-cli.ts`, `ConversationEvent`, `OperationSteps`, `findFreePort`, `CreateChatTables1793215389271`, `Message`, `api-keys-cache.e2e-spec.ts`, `visitor.entity.spec.ts`, `operator-commands.e2e-spec.ts`, `identity-key-pem.ts`, `ref_node_path`, `migrate-mode.e2e-spec.ts`, `test-database.ts`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `ProjectsService` connect `ProjectsService` to `identity-key-list.command.ts`, `initial-project.development.spec.ts`, `key-cli.ts`, `IdentityKeyAddCommand`, `OperatorDisableCommand`, `cli.module.ts`, `projects.service.ts`, `@nestjs/testing`, `startup-summary.service.spec.ts`, `ProjectCreateCommand`, `IdentityKeyRevokeCommand`, `origin.commands.ts`, `JsonObject`, `api-keys-cache.e2e-spec.ts`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Should `visitor-session-refresh.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12063492063492064 - nodes in this community are weakly interconnected._