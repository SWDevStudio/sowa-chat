# Graph Report - hector-chat-epic-11  (2026-10-29)

## Corpus Check
- 489 files · ~131,819 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .log 1)

## Summary
- 3386 nodes · 8639 edges · 160 communities (123 shown, 37 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 220 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b8baaa7b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- typeorm
- bot-sdk/tsconfig.json
- package.json
- visitor-session-refresh.e2e-spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- visitor-auth-guard.e2e-spec.ts
- env.schema.ts
- compilerOptions
- protocol/src/index.ts
- environment-check.ts
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
- InitialProjectService
- RequestContext
- secrets-reencrypt-command.e2e-spec.ts
- scripts
- origin.commands.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- identity-key-list.command.ts
- conversation.entity.spec.ts
- zone.guard.spec.ts
- development-secrets-file.ts
- tsconfig.build.json
- ValidationProbeController
- main.ts
- nest-cli.json
- @nestjs/testing
- visitor-session.entity.spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- OperatorDisableCommand
- RedactionProbeController
- DisabledOperators
- visitor-session.controller.ts
- conversation.entity.ts
- cli.module.ts
- operators.service.ts
- @nestjs/testing
- server-errors.spec.ts
- startup-summary.service.spec.ts
- development-secrets.spec.ts
- ProjectCreateCommand
- server-errors.spec.ts
- server/package.json
- initial-project.production.spec.ts
- test-secrets.ts
- audit-log.listener.spec.ts
- findFreePort
- redis-checks.spec.ts
- key-format.ts
- participant.entity.spec.ts
- encryption.service.spec.ts
- test-database.ts
- log-level-warn.spec.ts
- secrets-generate.command.spec.ts
- server-key-guard.e2e-spec.ts
- ConversationEvent
- ProjectsService
- OperationSteps
- postgres-checks.spec.ts
- replica-event-rules.spec.ts
- config.module.ts
- secrets-reencrypt.command.ts
- cli-runner.ts
- secret-rotation.ts
- health.module.ts
- api.module.ts
- key-cli.ts
- operator-block-sync.e2e-spec.ts
- environment-checks.service.ts
- replica-cache-sync.e2e-spec.ts
- CreateChatTables1793215389271
- doctor.command.ts
- replica-events-transport.ts
- replica-events.publisher.spec.ts
- zone.ts
- Message
- encryption-keys.schema.spec.ts
- secrets-reencryption.service.ts
- api-keys-cache.e2e-spec.ts
- identity-keys.service.ts
- Operator
- @nestjs/common
- cli-mode.e2e-spec.ts
- SecretsReencryptionService
- request-id.spec.ts
- body-limit.spec.ts
- JsonObjectValidator
- audited-events.ts
- redis-checks.e2e-spec.ts
- Zone
- NeutralProbeController
- operator-commands.e2e-spec.ts
- identity-key.entity.ts
- ref_node_path
- body-limit.ts
- health.e2e-spec.ts
- OperatorsService
- tokens.service.spec.ts
- DomainEventBus
- database.module.ts
- ZonedController
- env.schema.initial-project.spec.ts
- EncryptionService
- Project
- metrics.controller.ts
- helmet
- env.schema.spec.ts
- OperatorAuthModule
- ServerErrorsProbeController
- ServerAuthModule
- visitor-sessions.service.ts
- environment-checks.service.spec.ts
- FakeRedis
- env.schema.logging.spec.ts
- @nestjs/bullmq@^12.0.0
- global-setup.ts
- log-settings.e2e-spec.ts
- @nestjs/platform-socket.io@^12.1.3
- @nestjs/swagger
- ZoneServers
- @nestjs/websockets@^12.1.3
- ErrorProbeController
- reflect-metadata@^0.2.2
- @types/node@^24.0.0
- RedisModule
- TestTokenSigningConfigModule
- zod-serialization.spec.ts
- projects.service.ts
- tokens.service.ts
- IdentityKeyRevokeCommand
- @aws-sdk/client-s3@^3.1151.0
- operator-token.controller.ts
- @socket.io/redis-adapter@^8.3.0
- token-signing-keys.schema.ts
- Visitor
- KeyRevokeCommand
- @nestjs/throttler@^6.7.1

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 172 edges
2. `typeorm` - 73 edges
3. `ProjectsService` - 55 edges
4. `Zone()` - 54 edges
5. `useTestDatabase()` - 54 edges
6. `@nestjs/testing` - 53 edges
7. `Project` - 53 edges
8. `@nestjs/config` - 41 edges
9. `DomainEventBus` - 40 edges
10. `createProject()` - 39 edges

## Surprising Connections (you probably didn't know these)
- `OperatorProfile` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/domain/operators/operators.repository.ts → packages/protocol/src/operator-role.ts
- `ConversationEvent` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation-event.entity.ts → packages/protocol/src/json-types.ts
- `Conversation` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation.entity.ts → packages/protocol/src/json-types.ts
- `Message` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/message.entity.ts → packages/protocol/src/json-types.ts
- `Operator` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/domain/operators/operator.entity.ts → packages/protocol/src/operator-role.ts

## Import Cycles
- None detected.

## Communities (160 total, 37 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.07
Nodes (14): NewVisitorSession, DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, CreateProjects1793193549883, CreateAuditLog1793200000000, AddConversationIndexes1793215983154 (+6 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "visitor-session-refresh.e2e-spec.ts"
Cohesion: 0.09
Nodes (37): lockWaitCount(), api(), createProjectWithPublicKey(), findAllSessions(), findFamilySessions(), findSessionByRefreshToken(), postVisitorSession(), postVisitorSessionRefresh() (+29 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21, supertest@^7.0.0 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "visitor-auth-guard.e2e-spec.ts"
Cohesion: 0.13
Nodes (11): VisitorAuthModule, getProbe(), withToken(), forgeToken(), forgeUnsecuredToken(), publicKeyPemBytes(), publicKeyRawBytes(), waitMs() (+3 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.09
Nodes (21): checkEncryptionKeysInProduction(), checkInitialServerKey(), checkPrettyLogFormat(), checkPublicUrlInProduction(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), EnvObject, envObjectSchema (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "protocol/src/index.ts"
Cohesion: 0.09
Nodes (21): errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema(), EventEnvelope (+13 more)

### Community 10 - "environment-check.ts"
Cohesion: 0.18
Nodes (13): environmentChecksConfig, exampleSecretsCheck, exampleSecretValues, publicUrlsHttpsCheck, s3PublicUrlCheck, contextWith(), developmentContext(), productionContext() (+5 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.06
Nodes (31): dependencies, bullmq@^6.3.15, cache-manager@^7.2.9, file-type@^22.1.1, ioredis@^6.0.0, nest-commander@^3.21.0, @nestjs/cache-manager@^12.0.1, nestjs-cls@^7.0.1 (+23 more)

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

### Community 22 - "InitialProjectService"
Cohesion: 0.24
Nodes (5): developmentAllowedOrigins, developmentOperatorAllowedOrigins, developmentProjectName, InitialProjectService, DevelopmentMainProject

### Community 23 - "RequestContext"
Cohesion: 0.05
Nodes (10): OperatorAuthGuard, VisitorAuthGuard, VisitorController(), RequestContextModule, RequestContext, ConsumerModule, ContextConsumer, GuardProbeController (+2 more)

### Community 24 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.09
Nodes (14): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand (+6 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.17
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, runToExit() (+3 more)

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
Cohesion: 0.08
Nodes (15): emptyCell, formatDate(), writeTable(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow(), header (+7 more)

### Community 33 - "conversation.entity.spec.ts"
Cohesion: 0.13
Nodes (9): Channel, channelColumns(), findColumn(), columns(), expectedColumns, findColumn(), findRelation(), relations() (+1 more)

### Community 34 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 35 - "development-secrets-file.ts"
Cohesion: 0.12
Nodes (31): missingKeyWarning(), completeFile(), createFile(), createDevelopmentSecrets(), defaultDevelopmentSecretsDirectory, DevelopmentSecrets, developmentSecretsFileName, developmentSecretsPath() (+23 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "ValidationProbeController"
Cohesion: 0.13
Nodes (5): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ValidationProbeController

### Community 38 - "main.ts"
Cohesion: 0.08
Nodes (28): AppClsModule, DatabaseMigrationStep, createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule() (+20 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "@nestjs/testing"
Cohesion: 0.06
Nodes (39): configureApiApp(), ApiModule, ServerApiModule, VisitorApiModule, StartupModule, useClsMiddleware(), DatabaseModule, HealthBody (+31 more)

### Community 41 - "visitor-session.entity.spec.ts"
Cohesion: 0.14
Nodes (9): columns(), expectedColumns, findColumn(), findRelation(), normalizeSql(), relations(), runMigration(), CreateOperators1793300003000 (+1 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "OperatorDisableCommand"
Cohesion: 0.21
Nodes (3): describeEnable(), OperatorDisableCommand, OperatorEnableCommand

### Community 46 - "RedactionProbeController"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 47 - "DisabledOperators"
Cohesion: 0.12
Nodes (11): DisabledOperators, DisabledOperatorsModule, OperatorReplicaEventsController, createDisabledOperators(), malformedPayloads, CacheInvalidateEvent, OperatorReplicaEvent, operatorReplicaEventSchema (+3 more)

### Community 48 - "visitor-session.controller.ts"
Cohesion: 0.15
Nodes (13): toVisitorSessionResponse(), VisitorSessionController, VisitorSessionRefreshRequestDto, VisitorSessionRequestDto, VisitorSessionResponseDto, refreshToken, requestCases, VisitorSessionRefreshRequest (+5 more)

### Community 49 - "conversation.entity.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 50 - "cli.module.ts"
Cohesion: 0.11
Nodes (16): serverKeyOnceWarning, writeLine(), writeWarning(), IdentityKeyAddOptions, IdentityKeyRevokeOptions, KeyCreateCommand, KeyCreateOptions, KeyGenerateCommand (+8 more)

### Community 51 - "operators.service.ts"
Cohesion: 0.06
Nodes (29): OperatorController(), OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnly(), supervisorOnlyMetadataKey (+21 more)

### Community 52 - "@nestjs/testing"
Cohesion: 0.06
Nodes (39): SupervisorOnlyController, IssueApiKeyInput, KeysModule, OriginList, originLists, ProjectsModule, initialProjectLockName, NewProject (+31 more)

### Community 53 - "server-errors.spec.ts"
Cohesion: 0.10
Nodes (17): OperatorDisabledFilter, InvalidPublicKeyFilter, InvalidRefreshTokenFilter, OperatorDisabledError, InvalidPublicKeyError, ApiException, errorCodeOfStatus(), httpErrorResponse() (+9 more)

### Community 54 - "startup-summary.service.spec.ts"
Cohesion: 0.13
Nodes (11): formatOrigins(), createService(), ports, secretLines, shop, zoneLines, StartupSummaryService, SecretStatus (+3 more)

### Community 55 - "development-secrets.spec.ts"
Cohesion: 0.16
Nodes (23): createdProject, existingProject, compileConfigModule(), compileInDevelopment(), Loaded, allTestSecrets, createSecretsDirectory(), developmentEnvWithoutSecrets (+15 more)

### Community 57 - "server-errors.spec.ts"
Cohesion: 0.11
Nodes (15): ServerKeyGuard, ApiExceptionInput, errorCodeStatuses, ErrorDetail, bearerToken(), FakeRequestInput, errorCodeByStatus, internalErrorMessage (+7 more)

### Community 58 - "server/package.json"
Cohesion: 0.09
Nodes (21): author, bin, sowa-chat, @aws-sdk/s3-request-presigner@^3.1151.0, @nest-lab/throttler-storage-redis@^1.2.0, pino-http@^11.0.0, socket.io@^4.8.4, @sowa-chat/protocol@workspace:* (+13 more)

### Community 59 - "initial-project.production.spec.ts"
Cohesion: 0.18
Nodes (7): ApiKeySummary, createdProject, existingProject, InitialProjectSettings, keySummary(), otherServerKey, serverKey

### Community 60 - "test-secrets.ts"
Cohesion: 0.19
Nodes (15): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+7 more)

### Community 61 - "audit-log.listener.spec.ts"
Cohesion: 0.14
Nodes (10): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditModule, auditedEventNames(), AuditRule (+2 more)

### Community 62 - "findFreePort"
Cohesion: 0.08
Nodes (27): AppConfigModule, fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus() (+19 more)

### Community 63 - "redis-checks.spec.ts"
Cohesion: 0.15
Nodes (13): CheckFinding, isCommandNotAllowed(), readRedisSetting(), readSettingOrUndefined(), redisAppendOnlyCheck, redisEvictionPolicyCheck, ConfigResponse, connectionClosed (+5 more)

### Community 64 - "key-format.ts"
Cohesion: 0.11
Nodes (23): InvalidApiKeyError, eventFields, serverKey, toEvent(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62() (+15 more)

### Community 65 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.09
Nodes (19): CryptoModule, authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv (+11 more)

### Community 67 - "test-database.ts"
Cohesion: 0.09
Nodes (33): expectNoKeyRows(), expectNoRows(), addKey(), blockAuditRows(), blockMethods, createOperator(), createProjectWithKey(), internalAgent() (+25 more)

### Community 68 - "log-level-warn.spec.ts"
Cohesion: 0.16
Nodes (9): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+1 more)

### Community 69 - "secrets-generate.command.spec.ts"
Cohesion: 0.18
Nodes (7): ../cli.module.js, ./${module}.module.js, generatedNames, linesOf(), productionEnv, rotatedNames, variablesOf()

### Community 70 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.14
Nodes (10): base, base62Alphabet, encodeBase62(), changeBodyChar(), forgeWithValidChecksum(), getProbe(), replaceChar(), withKey() (+2 more)

### Community 71 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 72 - "ProjectsService"
Cohesion: 0.08
Nodes (10): ApiKeysService, ProjectSnapshot, toProjectSnapshot(), ProjectsRepository, ProjectsService, project, snapshot, createService() (+2 more)

### Community 73 - "OperationSteps"
Cohesion: 0.05
Nodes (20): DatabaseStepSubscriber, HttpMetrics, OperationStep, operationSteps, OperationTiming, StepTimes, OperationSteps, OperationStepsProbeController (+12 more)

### Community 74 - "postgres-checks.spec.ts"
Cohesion: 0.16
Nodes (9): postgresSchemaChangesCheck, postgresSuperuserCheck, postgresVersionCheck, SchemaChangesRow, ServerVersionRow, productionSettings, Settings, SuperuserRow (+1 more)

### Community 75 - "replica-event-rules.spec.ts"
Cohesion: 0.15
Nodes (18): apiKeyCacheKeys(), cacheInvalidatedEventNames(), CacheInvalidationRule, cacheInvalidationRules, projectCacheKeys(), apiKeyEvent, projectEvent, cacheKeys (+10 more)

### Community 76 - "config.module.ts"
Cohesion: 0.15
Nodes (18): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, developmentSecretsConfig, encryptionConfig (+10 more)

### Community 77 - "secrets-reencrypt.command.ts"
Cohesion: 0.16
Nodes (11): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+3 more)

### Community 78 - "cli-runner.ts"
Cohesion: 0.12
Nodes (12): cliName, CliRunSetup, commanderArgv(), quietLogLevels, runCliCommand(), runCliModule(), secretsGenerateCommandName, startupLogLevels (+4 more)

### Community 79 - "secret-rotation.ts"
Cohesion: 0.17
Nodes (18): firstTokenSigningKeyIds, GeneratedSecret, generatedSecrets, SecretsMode, generateEncryptionKeyEntry(), generateTokenSigningKeyEntry(), minimalEnv, nextTokenSigningKeyId() (+10 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 81 - "api.module.ts"
Cohesion: 0.14
Nodes (7): AppCacheModule, cacheTtlMs, CacheInvalidateController, cacheInvalidateEventSchema, ReplicaEventsModule, cache-manager, @nestjs/cache-manager

### Community 82 - "key-cli.ts"
Cohesion: 0.14
Nodes (34): toLookupPrefix(), lineOfCheck(), linesOfLevel(), reportLines(), runDoctor(), runWithRefusedRedis(), stubProductionEnv(), CapturedRun (+26 more)

### Community 83 - "operator-block-sync.e2e-spec.ts"
Cohesion: 0.12
Nodes (21): blockedOnAll(), BlockTarget, expectStatusOnAll(), issueOperator(), publishAll(), runCommand(), subscriberCounts(), waitForBlockedOnAll() (+13 more)

### Community 84 - "environment-checks.service.ts"
Cohesion: 0.21
Nodes (5): EnvironmentCheckError, EnvironmentChecksModule, describeResult(), EnvironmentChecksService, environmentChecks

### Community 85 - "replica-cache-sync.e2e-spec.ts"
Cohesion: 0.07
Nodes (32): badOrigins, helpEntries, prefixes, expectCachedOnAll(), expectStatusOnAll(), probeWithKey(), ReplicaProbeController, expectKept() (+24 more)

### Community 87 - "doctor.command.ts"
Cohesion: 0.18
Nodes (14): DoctorCommand, failCommandsOnClosedClient(), formatResult(), printReport(), createCommand(), dataSource, redis, CheckResult (+6 more)

### Community 88 - "replica-events-transport.ts"
Cohesion: 0.23
Nodes (11): parseDatabase(), parseUrl(), RedisConnectionOptions, redisTransportOptions(), stripIpv6Brackets(), replicaPublishConnectTimeoutMs, connectReplicaEvents(), replicaEventsMicroservice (+3 more)

### Community 89 - "replica-events.publisher.spec.ts"
Cohesion: 0.12
Nodes (14): cacheInvalidate(), cacheInvalidateRule(), cacheInvalidateRules(), ReplicaEventMessage, replicaEventNames(), ReplicaEventRule, replicaEventRules, errorMessage() (+6 more)

### Community 90 - "zone.ts"
Cohesion: 0.11
Nodes (18): probeControllers, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, ApiZone (+10 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 93 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldResult, ReencryptInput, reencryptionBatchSize, ReencryptionReport (+3 more)

### Community 94 - "api-keys-cache.e2e-spec.ts"
Cohesion: 0.07
Nodes (18): ApiKey, ApiKeyKind, apiKeyKinds, ApiKeysRepository, NewApiKey, CachedApiKey, hashMatches(), IssueApiKeyBaseInput (+10 more)

### Community 95 - "identity-keys.service.ts"
Cohesion: 0.07
Nodes (11): IdentityKeyAddCommand, readPem(), KeyActorKind, IdentityKey, IdentityKeysRepository, AddIdentityKeyInput, IdentityKeyKidTakenError, IdentityKeysService (+3 more)

### Community 97 - "@nestjs/common"
Cohesion: 0.17
Nodes (6): OperatorsModule, VisitorsModule, VisitorsRepository, TokensModule, OperationStepsModule, @nestjs/common

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 100 - "request-id.spec.ts"
Cohesion: 0.13
Nodes (10): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+2 more)

### Community 102 - "JsonObjectValidator"
Cohesion: 0.10
Nodes (16): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+8 more)

### Community 103 - "audited-events.ts"
Cohesion: 0.09
Nodes (13): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+5 more)

### Community 104 - "redis-checks.e2e-spec.ts"
Cohesion: 0.12
Nodes (31): PrintedKeys, startApi(), expectNoKeys(), keyBody(), productionEnv(), startAndStop(), startFailingApi(), startLiveApi() (+23 more)

### Community 105 - "Zone"
Cohesion: 0.06
Nodes (22): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+14 more)

### Community 106 - "NeutralProbeController"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 107 - "operator-commands.e2e-spec.ts"
Cohesion: 0.25
Nodes (12): disabledAtOf(), setupOperator(), disabledAtOf(), helpEntries, setupOperator(), operatorActions, operatorBlockAuditRows(), operatorCommandArguments() (+4 more)

### Community 108 - "identity-key.entity.ts"
Cohesion: 0.13
Nodes (17): jose@^6.2.12, IdentityKeyAlgorithm, identityKeyAlgorithms, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey() (+9 more)

### Community 109 - "ref_node_path"
Cohesion: 0.04
Nodes (40): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, Env, isConfigVariable(), repositoryRoot, RunResult (+32 more)

### Community 110 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 111 - "health.e2e-spec.ts"
Cohesion: 0.09
Nodes (21): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus(), isRequestEntry() (+13 more)

### Community 112 - "OperatorsService"
Cohesion: 0.09
Nodes (11): Probe, OperatorsRepository, OperatorNotFoundError, OperatorsService, blockInput, BlockProbe, createBlockProbe(), input (+3 more)

### Community 115 - "tokens.service.spec.ts"
Cohesion: 0.18
Nodes (20): TokenSigningKey, encodePart(), flipSignatureBit(), ForgedTokenInput, parseTestSigningKeys(), replaceHeader(), replacePayload(), spyOnLogs() (+12 more)

### Community 120 - "DomainEventBus"
Cohesion: 0.09
Nodes (15): BusProbe, apiKeyEvent, projectEvent, DomainEventBus, happened, TestListener, DomainEventHandler, OnDomainEvent() (+7 more)

### Community 121 - "database.module.ts"
Cohesion: 0.19
Nodes (11): database, loadDataSource(), databaseEntities, createTypeOrmModule(), getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection (+3 more)

### Community 123 - "env.schema.initial-project.spec.ts"
Cohesion: 0.29
Nodes (3): initVariables, loadConfig(), requiredEnv

### Community 125 - "Project"
Cohesion: 0.10
Nodes (13): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, OperatorIdRow, OperatorProfile, Project (+5 more)

### Community 126 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 132 - "visitor-sessions.service.ts"
Cohesion: 0.09
Nodes (9): generateRefreshToken(), VisitorSessionsRepository, InvalidRefreshTokenError, RefreshExchange, visitorAccessTokenTtlSeconds, VisitorSessionsService, VisitorSessionTokens, VisitorTokenClaims (+1 more)

### Community 134 - "environment-checks.service.spec.ts"
Cohesion: 0.30
Nodes (10): createService(), CheckPlace, checksForPlace(), findProblems(), runEnvironmentChecks(), softenForDevelopment(), createCheck(), createCheckContext() (+2 more)

### Community 136 - "env.schema.logging.spec.ts"
Cohesion: 0.33
Nodes (3): Env, logLevels, requiredEnv

### Community 138 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 139 - "log-settings.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+2 more)

### Community 142 - "ZoneServers"
Cohesion: 0.29
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 149 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 150 - "projects.service.ts"
Cohesion: 0.18
Nodes (14): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl(), InvalidProjectNameError, prepareProject() (+6 more)

### Community 151 - "tokens.service.ts"
Cohesion: 0.10
Nodes (9): SignedToken, SignTokenInput, TokenConsumer, TokenAudience, tokenAudiences, TokensService, VerifiedToken, createProjectRequest() (+1 more)

### Community 158 - "operator-token.controller.ts"
Cohesion: 0.17
Nodes (6): OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, ServerController(), OperatorTokenResponse, nestjs-zod

### Community 160 - "token-signing-keys.schema.ts"
Cohesion: 0.29
Nodes (6): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, tokenSigningKeysSchema

### Community 161 - "Visitor"
Cohesion: 0.09
Nodes (7): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor, VisitorSession

## Knowledge Gaps
- **7 isolated node(s):** `./${module}.module.js`, `../cli.module.js`, `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` (+2 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1188 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **37 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `typeorm`, `visitor-sessions.service.ts`, `environment-checks.service.spec.ts`, `dependencies`, `zod-serialization.spec.ts`, `InitialProjectService`, `RequestContext`, `tokens.service.ts`, `origin.commands.ts`, `operator-token.controller.ts`, `identity-key-list.command.ts`, `zone.guard.spec.ts`, `ValidationProbeController`, `main.ts`, `@nestjs/testing`, `RedactionProbeController`, `DisabledOperators`, `visitor-session.controller.ts`, `cli.module.ts`, `operators.service.ts`, `@nestjs/testing`, `server-errors.spec.ts`, `startup-summary.service.spec.ts`, `development-secrets.spec.ts`, `server-errors.spec.ts`, `server/package.json`, `initial-project.production.spec.ts`, `audit-log.listener.spec.ts`, `encryption.service.spec.ts`, `test-database.ts`, `log-level-warn.spec.ts`, `server-key-guard.e2e-spec.ts`, `OperationSteps`, `replica-event-rules.spec.ts`, `config.module.ts`, `secrets-reencrypt.command.ts`, `cli-runner.ts`, `health.module.ts`, `api.module.ts`, `operator-block-sync.e2e-spec.ts`, `environment-checks.service.ts`, `replica-cache-sync.e2e-spec.ts`, `doctor.command.ts`, `replica-events-transport.ts`, `replica-events.publisher.spec.ts`, `zone.ts`, `secrets-reencryption.service.ts`, `api-keys-cache.e2e-spec.ts`, `identity-keys.service.ts`, `request-id.spec.ts`, `body-limit.spec.ts`, `Zone`, `identity-key.entity.ts`, `body-limit.ts`, `tokens.service.spec.ts`, `DomainEventBus`, `database.module.ts`, `Project`, `metrics.controller.ts`?**
  _High betweenness centrality (0.219) - this node is a cross-community bridge._
- **What connects `./${module}.module.js`, `../cli.module.js`, `./tsconfig.json` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.07188160676532769 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `visitor-session-refresh.e2e-spec.ts`, `environment-checks.service.spec.ts`, `environment-check.ts`, `dependencies`, `secrets-reencrypt-command.e2e-spec.ts`, `chat-tables.e2e-spec.ts`, `conversation.entity.spec.ts`, `Visitor`, `visitor-session.entity.spec.ts`, `conversation.entity.ts`, `operators.service.ts`, `@nestjs/testing`, `server/package.json`, `test-secrets.ts`, `findFreePort`, `redis-checks.spec.ts`, `participant.entity.spec.ts`, `test-database.ts`, `ConversationEvent`, `OperationSteps`, `postgres-checks.spec.ts`, `key-cli.ts`, `operator-block-sync.e2e-spec.ts`, `environment-checks.service.ts`, `replica-cache-sync.e2e-spec.ts`, `doctor.command.ts`, `Message`, `api-keys-cache.e2e-spec.ts`, `operator-commands.e2e-spec.ts`, `identity-key.entity.ts`, `ref_node_path`, `database.module.ts`, `Project`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `@nestjs/testing` to `devDependencies`, `projects.service.ts`, `RequestContext`, `tokens.service.ts`, `main.ts`, `DisabledOperators`, `@nestjs/testing`, `development-secrets.spec.ts`, `server/package.json`, `initial-project.production.spec.ts`, `test-secrets.ts`, `audit-log.listener.spec.ts`, `findFreePort`, `key-format.ts`, `encryption.service.spec.ts`, `test-database.ts`, `server-key-guard.e2e-spec.ts`, `ProjectsService`, `OperationSteps`, `config.module.ts`, `api.module.ts`, `key-cli.ts`, `replica-events.publisher.spec.ts`, `api-keys-cache.e2e-spec.ts`, `operator-commands.e2e-spec.ts`, `OperatorsService`, `tokens.service.spec.ts`, `DomainEventBus`, `Project`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Should `visitor-session-refresh.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08843537414965986 - nodes in this community are weakly interconnected._