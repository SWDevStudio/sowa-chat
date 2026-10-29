# Graph Report - hector-chat-epic-11  (2026-10-29)

## Corpus Check
- 484 files · ~128,149 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .log 1)

## Summary
- 3331 nodes · 8421 edges · 166 communities (132 shown, 34 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 209 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9431a18d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- typeorm
- bot-sdk/tsconfig.json
- package.json
- visitor-session-refresh.e2e-spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- @nestjs/common
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
- initial-project.service.ts
- operator-role.guard.spec.ts
- typeorm
- scripts
- origin.commands.ts
- logging.e2e-spec.ts
- Project
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- identity-key-list.command.ts
- main.ts
- MixedZoneController
- development-secrets-file.ts
- tsconfig.build.json
- ValidationProbeController
- logger.module.ts
- nest-cli.json
- @nestjs/testing
- replica-cache-sync.e2e-spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- OperatorDisableCommand
- RedactionProbeController
- DisabledOperators
- visitor-session.controller.ts
- conversation.entity.ts
- cli.module.ts
- operator-guard-probe.ts
- initial-project.e2e-spec.ts
- server-errors.spec.ts
- startup-summary.service.spec.ts
- development-secrets.spec.ts
- ProjectCreateCommand
- database-entities.ts
- server/package.json
- JsonObject
- test-secrets.ts
- audit-log.listener.spec.ts
- identity-keys.e2e-spec.ts
- replica-event-rules.spec.ts
- participant.entity.spec.ts
- log-redaction.spec.ts
- encryption.service.spec.ts
- test-database.ts
- log-level-warn.spec.ts
- secrets-generate.command.spec.ts
- key-format.ts
- body-limit.spec.ts
- ProjectsService
- operation-steps.ts
- migrate.module.ts
- audited-events.ts
- config.module.ts
- secrets-reencryption.service.ts
- secrets-generate.command.ts
- secret-rotation.ts
- health.module.ts
- DisabledOperators
- environment-checks.service.spec.ts
- operator-block-sync.e2e-spec.ts
- RequestContext
- server-errors.spec.ts
- CreateChatTables1793215389271
- ioredis
- replica-events-transport.ts
- replica-events.publisher.spec.ts
- zone.ts
- Message
- encryption-keys.schema.spec.ts
- secrets-reencryption.module.ts
- api-keys.service.ts
- IdentityKey
- visitor-session.entity.spec.ts
- operators.module.ts
- cli-mode.e2e-spec.ts
- SecretsReencryptionService
- request-id.spec.ts
- IdentityKeyAddCommand
- JsonObjectValidator
- OperationSteps
- redis-checks.e2e-spec.ts
- Zone
- @nestjs/testing
- operator-commands.e2e-spec.ts
- identity-key-pem.ts
- ref_node_path
- config-checks.spec.ts
- findFreePort
- OperatorsService
- tokens.service.ts
- DisabledOperators
- redis-checks.spec.ts
- ConversationEvent
- env.schema.initial-project.spec.ts
- SlowOperations
- operators.service.ts
- security-headers.spec.ts
- telemetry.interceptor.ts
- env.schema.spec.ts
- telemetry.interceptor.spec.ts
- ServerErrorsProbeController
- encrypted-secret.spec.ts
- VisitorSessionsRepository
- LocalCacheInvalidation
- zone-e2e-app.ts
- SlowProbeController
- env.schema.logging.spec.ts
- DomainEventBus
- global-setup.ts
- log-settings.e2e-spec.ts
- TokenConsumer
- metrics.controller.ts
- InternalProbeController
- conversation-indexes.e2e-spec.ts
- ErrorProbeController
- ZoneServers
- load-env.ts
- @nestjs/platform-socket.io@^12.1.3
- socket.io@^4.8.4
- zod-serialization.spec.ts
- projects.service.ts
- ServerKeyGuard
- @socket.io/redis-adapter@^8.3.0
- IdentityKeyRevokeCommand
- operator-token.controller.ts
- token-signing-keys.schema.ts
- Visitor
- log-redaction.e2e-spec.ts
- OperationStepsProbeController
- KeyRevokeCommand
- redact-paths.ts
- TestTokenSigningConfigModule
- @aws-sdk/s3-request-presigner@^3.1151.0
- @nestjs/throttler@^6.7.1

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 170 edges
2. `typeorm` - 71 edges
3. `ProjectsService` - 54 edges
4. `Zone()` - 54 edges
5. `Project` - 53 edges
6. `useTestDatabase()` - 53 edges
7. `@nestjs/testing` - 52 edges
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
- `OperatorProfile` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/domain/operators/operators.repository.ts → packages/protocol/src/operator-role.ts
- `IssueOperatorTokenInput` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/domain/operators/operators.service.ts → packages/protocol/src/operator-role.ts

## Import Cycles
- None detected.

## Communities (166 total, 34 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.08
Nodes (13): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, CreateProjects1793193549883, CreateAuditLog1793200000000, AddConversationIndexes1793215983154, CreateApiKeys1793300000000 (+5 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "visitor-session-refresh.e2e-spec.ts"
Cohesion: 0.12
Nodes (31): lockWaitCount(), api(), createProjectWithPublicKey(), findAllSessions(), findFamilySessions(), findSessionByRefreshToken(), postVisitorSession(), postVisitorSessionRefresh() (+23 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.09
Nodes (20): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+12 more)

### Community 6 - "@nestjs/common"
Cohesion: 0.14
Nodes (7): bearerToken(), FakeRequestInput, RequestContextModule, RequestVisitor, ConsumerModule, ContextConsumer, @nestjs/common

### Community 7 - "env.schema.ts"
Cohesion: 0.09
Nodes (21): checkEncryptionKeysInProduction(), checkInitialServerKey(), checkPrettyLogFormat(), checkPublicUrlInProduction(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), EnvObject, envObjectSchema (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "protocol/src/index.ts"
Cohesion: 0.09
Nodes (22): OperatorTokenRequestDto, OperatorTokenResponseDto, operatorTokenClaimsSchema, VisitorTokenClaims, visitorTokenClaimsSchema, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema (+14 more)

### Community 10 - "environment-check.ts"
Cohesion: 0.12
Nodes (21): CheckContext, CheckFinding, CheckLevel, CheckResult, EnvironmentCheck, EnvironmentChecksModule, postgresSchemaChangesCheck, postgresSuperuserCheck (+13 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, cache-manager@^7.2.9, helmet@^8.3.0, ioredis@^6.0.0, jose@^6.2.12, nest-commander@^3.21.0, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/cache-manager@^12.0.1 (+26 more)

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

### Community 22 - "initial-project.service.ts"
Cohesion: 0.27
Nodes (5): developmentAllowedOrigins, developmentOperatorAllowedOrigins, developmentProjectName, InitialProjectService, DevelopmentMainProject

### Community 23 - "operator-role.guard.spec.ts"
Cohesion: 0.13
Nodes (9): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey (+1 more)

### Community 24 - "typeorm"
Cohesion: 0.13
Nodes (9): Channel, channelColumns(), findColumn(), columns(), expectedColumns, findColumn(), findRelation(), relations() (+1 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.09
Nodes (7): listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand, OriginListCommand, OriginRemoveCommand

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.17
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, runToExit() (+3 more)

### Community 28 - "Project"
Cohesion: 0.09
Nodes (8): formatOrigins(), header, ProjectListCommand, toRow(), Project, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.07
Nodes (34): ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation(), createMessage() (+26 more)

### Community 32 - "identity-key-list.command.ts"
Cohesion: 0.20
Nodes (5): formatDate(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow()

### Community 33 - "main.ts"
Cohesion: 0.31
Nodes (7): createContext(), mode, runMigrate(), runners, runWorker(), useAppLogger(), parseServerMode()

### Community 34 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 35 - "development-secrets-file.ts"
Cohesion: 0.17
Nodes (23): completeFile(), createFile(), createDevelopmentSecrets(), defaultDevelopmentSecretsDirectory, DevelopmentSecrets, developmentSecretsFileName, developmentSecretsSchema, hasErrorCode() (+15 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "ValidationProbeController"
Cohesion: 0.13
Nodes (5): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ValidationProbeController

### Community 38 - "logger.module.ts"
Cohesion: 0.27
Nodes (12): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+4 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "@nestjs/testing"
Cohesion: 0.10
Nodes (20): VisitorApiModule, HealthBody, HealthEntry, DependencyStatusBody, StatusBody, ApiHttpModule, findZonePorts(), probeControllers (+12 more)

### Community 41 - "replica-cache-sync.e2e-spec.ts"
Cohesion: 0.11
Nodes (25): badOrigins, helpEntries, prefixes, expectCachedOnAll(), expectStatusOnAll(), probeWithKey(), expectKept(), repositoryRoot (+17 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "OperatorDisableCommand"
Cohesion: 0.17
Nodes (5): describeDisable(), describeEnable(), OperatorDisableCommand, OperatorEnableCommand, OperatorOptions

### Community 47 - "DisabledOperators"
Cohesion: 0.11
Nodes (6): DisabledOperators, BusProbe, Probe, OperatorReplicaEventsController, createDisabledOperators(), OperatorBlockEvent

### Community 48 - "visitor-session.controller.ts"
Cohesion: 0.12
Nodes (15): toVisitorSessionResponse(), VisitorSessionController, VisitorSessionRefreshRequestDto, VisitorSessionRequestDto, VisitorSessionResponseDto, VisitorSessionTokens, VisitorsModule, refreshToken (+7 more)

### Community 49 - "conversation.entity.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 50 - "cli.module.ts"
Cohesion: 0.11
Nodes (13): emptyCell, serverKeyOnceWarning, writeLine(), writeTable(), writeWarning(), IdentityKeyRevokeOptions, KeyCreateCommand, KeyCreateOptions (+5 more)

### Community 51 - "operator-guard-probe.ts"
Cohesion: 0.13
Nodes (13): OperatorController(), DisabledProbeController, issueOperator(), issueOperator(), get(), getAs(), RolesProbeController, issueTestOperator() (+5 more)

### Community 52 - "initial-project.e2e-spec.ts"
Cohesion: 0.09
Nodes (23): IssueApiKeyInput, ProjectsModule, CreatedProject, CreateProjectInput, WorkerModule, apiKeyRows(), expectSingleProject(), projectCreatedRows() (+15 more)

### Community 53 - "server-errors.spec.ts"
Cohesion: 0.10
Nodes (17): OperatorDisabledFilter, InvalidPublicKeyFilter, InvalidRefreshTokenFilter, InvalidPublicKeyError, InvalidRefreshTokenError, ApiException, errorCodeOfStatus(), httpErrorResponse() (+9 more)

### Community 54 - "startup-summary.service.spec.ts"
Cohesion: 0.13
Nodes (11): formatOrigins(), createService(), ports, secretLines, shop, zoneLines, StartupSummaryService, SecretStatus (+3 more)

### Community 55 - "development-secrets.spec.ts"
Cohesion: 0.15
Nodes (25): createdProject, existingProject, missingKeyWarning(), compileConfigModule(), compileInDevelopment(), developmentSecretsPath(), Loaded, allTestSecrets (+17 more)

### Community 57 - "database-entities.ts"
Cohesion: 0.15
Nodes (13): database, loadDataSource(), databaseEntities, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, createDataSourceOptions() (+5 more)

### Community 58 - "server/package.json"
Cohesion: 0.08
Nodes (25): author, bin, sowa-chat, @aws-sdk/client-s3@^3.1151.0, bullmq@^6.3.15, file-type@^22.1.1, @nestjs/bullmq@^12.0.0, @nestjs/websockets@^12.1.3 (+17 more)

### Community 59 - "JsonObject"
Cohesion: 0.13
Nodes (10): ActorKind, actorKinds, AuditLogEntry, AuditLogRepository, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns (+2 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.13
Nodes (28): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+20 more)

### Community 61 - "audit-log.listener.spec.ts"
Cohesion: 0.17
Nodes (11): AuditLogListener, eventValues, happened, personalValues, AuditModule, auditedEventNames(), AuditRule, auditRules (+3 more)

### Community 62 - "identity-keys.e2e-spec.ts"
Cohesion: 0.12
Nodes (26): ServerAuthModule, KeysModule, StartupModule, expectNoKeyRows(), expectNoRows(), addKey(), originAuditRows(), runCliInProcess() (+18 more)

### Community 63 - "replica-event-rules.spec.ts"
Cohesion: 0.16
Nodes (18): apiKeyCacheKeys(), cacheInvalidatedEventNames(), cacheInvalidationRules, projectCacheKeys(), apiKeyEvent, projectEvent, cacheInvalidate(), cacheInvalidateRule() (+10 more)

### Community 64 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 65 - "log-redaction.spec.ts"
Cohesion: 0.12
Nodes (14): LogDestination, allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService() (+6 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.12
Nodes (14): authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService, SecretDecryptionError, captureError() (+6 more)

### Community 67 - "test-database.ts"
Cohesion: 0.12
Nodes (35): CapturedRun, runCaptured(), CliRunResult, auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader (+27 more)

### Community 68 - "log-level-warn.spec.ts"
Cohesion: 0.17
Nodes (8): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe

### Community 69 - "secrets-generate.command.spec.ts"
Cohesion: 0.18
Nodes (7): ../cli.module.js, ./${module}.module.js, generatedNames, linesOf(), productionEnv, rotatedNames, variablesOf()

### Community 70 - "key-format.ts"
Cohesion: 0.08
Nodes (35): eventFields, keyTypeByKind, serverKey, base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum() (+27 more)

### Community 72 - "ProjectsService"
Cohesion: 0.10
Nodes (17): addOriginTo(), describeAdd(), describeRemove(), OriginOptions, ProjectOptions, removeOriginFrom(), ALLOWED_PROTOCOLS, InvalidOriginError (+9 more)

### Community 73 - "operation-steps.ts"
Cohesion: 0.25
Nodes (5): AppClsModule, OperationStepsModule, beginOperation(), operationTimingKey, nestjs-cls

### Community 74 - "migrate.module.ts"
Cohesion: 0.17
Nodes (5): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 75 - "audited-events.ts"
Cohesion: 0.13
Nodes (13): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+5 more)

### Community 76 - "config.module.ts"
Cohesion: 0.17
Nodes (19): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, developmentSecretsConfig, encryptionConfig (+11 more)

### Community 77 - "secrets-reencryption.service.ts"
Cohesion: 0.13
Nodes (19): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptOptions, toReencryptionRow(), toVersionRow(), encryptedFields (+11 more)

### Community 78 - "secrets-generate.command.ts"
Cohesion: 0.22
Nodes (4): generateNewSecrets(), SecretsGenerateCommand, SecretsGenerateOptions, SecretsGenerateModule

### Community 79 - "secret-rotation.ts"
Cohesion: 0.17
Nodes (18): firstTokenSigningKeyIds, GeneratedSecret, generatedSecrets, SecretsMode, generateEncryptionKeyEntry(), generateTokenSigningKeyEntry(), minimalEnv, nextTokenSigningKeyId() (+10 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 81 - "DisabledOperators"
Cohesion: 0.14
Nodes (9): malformedPayloads, CacheInvalidateController, CacheInvalidateEvent, cacheInvalidateEventSchema, ReplicaEventsModule, OperatorReplicaEvent, operatorReplicaEventSchema, replicaEventPatterns (+1 more)

### Community 82 - "environment-checks.service.spec.ts"
Cohesion: 0.21
Nodes (8): EnvironmentCheckError, describeResult(), EnvironmentChecksService, createService(), createCheck(), createCheckContext(), createCheckSettings(), createFailingCheck()

### Community 83 - "operator-block-sync.e2e-spec.ts"
Cohesion: 0.12
Nodes (20): blockedOnAll(), BlockTarget, expectStatusOnAll(), issueOperator(), publishAll(), subscriberCounts(), waitForBlockedOnAll(), waitForStatusOnAll() (+12 more)

### Community 84 - "RequestContext"
Cohesion: 0.08
Nodes (6): OperatorAuthGuard, VisitorAuthGuard, VisitorController(), RequestContext, VisitorGuardProbeController, visitorProbePath

### Community 85 - "server-errors.spec.ts"
Cohesion: 0.12
Nodes (18): ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, internalErrorMessage, ApiExceptionInput, entries(), errorEntriesOf() (+10 more)

### Community 87 - "ioredis"
Cohesion: 0.22
Nodes (7): closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 88 - "replica-events-transport.ts"
Cohesion: 0.27
Nodes (10): parseDatabase(), parseUrl(), RedisConnectionOptions, redisTransportOptions(), stripIpv6Brackets(), connectReplicaEvents(), replicaEventsMicroservice, replicaEventsRetryDelayMs (+2 more)

### Community 89 - "replica-events.publisher.spec.ts"
Cohesion: 0.12
Nodes (10): ReplicaEventMessage, replicaEventNames(), errorMessage(), ReplicaEventsPublisherModule, replicaPublishConnectTimeoutMs, replicaEventsClient, ReplicaEventsPublisher, replicaPublishTimeoutMs (+2 more)

### Community 90 - "zone.ts"
Cohesion: 0.12
Nodes (17): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), zonePathPrefixes, ApiZone, apiZones, CapturedResponse (+9 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 93 - "secrets-reencryption.module.ts"
Cohesion: 0.32
Nodes (3): CryptoModule, registeredEncryptedFields, SecretsReencryptionModule

### Community 94 - "api-keys.service.ts"
Cohesion: 0.05
Nodes (22): header, KeyListCommand, KeyListOptions, toRow(), ApiKey, ApiKeyKind, apiKeyKinds, ApiKeysRepository (+14 more)

### Community 95 - "IdentityKey"
Cohesion: 0.09
Nodes (6): IdentityKey, IdentityKeysRepository, IdentityKeyKidTakenError, IdentityKeysService, InvalidIdentityKeyIdError, toEvent()

### Community 96 - "visitor-session.entity.spec.ts"
Cohesion: 0.14
Nodes (9): columns(), expectedColumns, findColumn(), findRelation(), normalizeSql(), relations(), runMigration(), CreateOperators1793300003000 (+1 more)

### Community 97 - "operators.module.ts"
Cohesion: 0.16
Nodes (6): OperatorAuthModule, ServerApiModule, VisitorAuthModule, DisabledOperatorsModule, OperatorsModule, TokensModule

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.11
Nodes (17): cliName, CliRunSetup, commanderArgv(), quietLogLevels, runCliCommand(), runCliModule(), secretsGenerateCommandName, startupLogLevels (+9 more)

### Community 100 - "request-id.spec.ts"
Cohesion: 0.17
Nodes (9): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse, ProbeService (+1 more)

### Community 101 - "IdentityKeyAddCommand"
Cohesion: 0.21
Nodes (3): IdentityKeyAddCommand, IdentityKeyAddOptions, readPem()

### Community 102 - "JsonObjectValidator"
Cohesion: 0.10
Nodes (16): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+8 more)

### Community 103 - "OperationSteps"
Cohesion: 0.12
Nodes (4): DatabaseStepSubscriber, OperationStep, OperationSteps, GuardProbeController

### Community 104 - "redis-checks.e2e-spec.ts"
Cohesion: 0.11
Nodes (32): PrintedKeys, startApi(), LogEntry, startApi(), productionEnv(), startApi(), LogEntry, startApi() (+24 more)

### Community 105 - "Zone"
Cohesion: 0.07
Nodes (20): ServerController(), NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController, controllers, DocsProbeDto, documentOf() (+12 more)

### Community 106 - "@nestjs/testing"
Cohesion: 0.08
Nodes (17): IssuedApiKey, OriginList, ProjectsRepository, ChangeOriginInput, project, snapshot, AppCacheModule, cacheTtlMs (+9 more)

### Community 107 - "operator-commands.e2e-spec.ts"
Cohesion: 0.19
Nodes (14): CliModule, runCommand(), disabledAtOf(), setupOperator(), disabledAtOf(), helpEntries, setupOperator(), operatorActions (+6 more)

### Community 108 - "identity-key-pem.ts"
Cohesion: 0.13
Nodes (18): KeyActorKind, IdentityKeyAlgorithm, identityKeyAlgorithms, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey() (+10 more)

### Community 109 - "ref_node_path"
Cohesion: 0.04
Nodes (39): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, Env, isConfigVariable(), repositoryRoot, RunResult (+31 more)

### Community 110 - "config-checks.spec.ts"
Cohesion: 0.19
Nodes (9): exampleSecretsCheck, exampleSecretValues, publicUrlsHttpsCheck, s3PublicUrlCheck, contextWith(), developmentContext(), productionContext(), productionSettings (+1 more)

### Community 111 - "findFreePort"
Cohesion: 0.07
Nodes (27): AppConfigModule, fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus() (+19 more)

### Community 112 - "OperatorsService"
Cohesion: 0.08
Nodes (11): OperatorsRepository, OperatorNotFoundError, OperatorsService, operatorTokenTtlSeconds, blockInput, BlockProbe, createBlockProbe(), input (+3 more)

### Community 115 - "tokens.service.ts"
Cohesion: 0.08
Nodes (39): TokenSigningKey, SignedToken, SignTokenInput, TokenAudience, tokenAudiences, TokensService, VerifiedToken, getProbe() (+31 more)

### Community 120 - "DisabledOperators"
Cohesion: 0.18
Nodes (9): happened, TestListener, DomainEventHandler, OnDomainEvent(), TelemetryModule, DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent (+1 more)

### Community 121 - "redis-checks.spec.ts"
Cohesion: 0.19
Nodes (9): readRedisSetting(), readSettingOrUndefined(), redisAppendOnlyCheck, redisEvictionPolicyCheck, ConfigResponse, createRedis(), noPermission, redisAnswering() (+1 more)

### Community 122 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 123 - "env.schema.initial-project.spec.ts"
Cohesion: 0.29
Nodes (3): initVariables, loadConfig(), requiredEnv

### Community 124 - "SlowOperations"
Cohesion: 0.14
Nodes (5): HttpLabel, HttpMetrics, labelNames, SlowOperationsModule, TelemetryInterceptor

### Community 125 - "operators.service.ts"
Cohesion: 0.06
Nodes (25): Operator, OperatorTokenClaims, OperatorIdRow, OperatorProfile, ChangeOperatorBlockInput, IssuedOperatorToken, IssueOperatorTokenInput, OperatorActorKind (+17 more)

### Community 126 - "security-headers.spec.ts"
Cohesion: 0.21
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 127 - "telemetry.interceptor.ts"
Cohesion: 0.20
Nodes (7): operationSteps, OperationTiming, StepTimes, FinishedOperation, roundSteps(), SlowOperations, LogEntry

### Community 129 - "telemetry.interceptor.spec.ts"
Cohesion: 0.22
Nodes (4): readMetricLines(), TelemetryProbeController, zoneUrl(), rxjs

### Community 131 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 132 - "VisitorSessionsRepository"
Cohesion: 0.11
Nodes (3): VisitorSessionsRepository, VisitorSessionsService, VisitorsRepository

### Community 134 - "zone-e2e-app.ts"
Cohesion: 0.15
Nodes (16): configureApiApp(), ApiModule, useClsMiddleware(), setupApiDocs(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException() (+8 more)

### Community 136 - "env.schema.logging.spec.ts"
Cohesion: 0.33
Nodes (3): Env, logLevels, requiredEnv

### Community 137 - "DomainEventBus"
Cohesion: 0.10
Nodes (6): InvalidApiKeyError, toEvent(), DomainEventBus, AuditScenarios, happenedIn(), ScenarioError

### Community 138 - "global-setup.ts"
Cohesion: 0.24
Nodes (9): testcontainers@^12.2.1, @testcontainers/postgresql@^12.2.1, runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl(), testcontainers (+1 more)

### Community 139 - "log-settings.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+2 more)

### Community 141 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 142 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 145 - "ZoneServers"
Cohesion: 0.29
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 146 - "load-env.ts"
Cohesion: 0.50
Nodes (4): loadFromProcessEnv(), Env, exportToProcessEnv(), loadEnv()

### Community 149 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 150 - "projects.service.ts"
Cohesion: 0.09
Nodes (23): originLists, toProjectSnapshot(), initialProjectLockName, NewProject, ORIGIN_COLUMNS, OriginsRow, InvalidProjectNameError, NormalizedOrigins (+15 more)

### Community 160 - "token-signing-keys.schema.ts"
Cohesion: 0.29
Nodes (6): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, tokenSigningKeysSchema

### Community 161 - "Visitor"
Cohesion: 0.09
Nodes (7): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor, VisitorSession

### Community 162 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 168 - "redact-paths.ts"
Cohesion: 0.50
Nodes (3): redactPaths, sensitiveFields, sensitiveHeaders

## Knowledge Gaps
- **7 isolated node(s):** `./${module}.module.js`, `../cli.module.js`, `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` (+2 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1167 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **34 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `telemetry.interceptor.spec.ts`, `zone-e2e-app.ts`, `protocol/src/index.ts`, `environment-check.ts`, `DomainEventBus`, `dependencies`, `metrics.controller.ts`, `zod-serialization.spec.ts`, `projects.service.ts`, `operator-role.guard.spec.ts`, `initial-project.service.ts`, `Project`, `identity-key-list.command.ts`, `main.ts`, `ValidationProbeController`, `logger.module.ts`, `@nestjs/testing`, `replica-cache-sync.e2e-spec.ts`, `OperatorDisableCommand`, `visitor-session.controller.ts`, `cli.module.ts`, `operator-guard-probe.ts`, `initial-project.e2e-spec.ts`, `server-errors.spec.ts`, `startup-summary.service.spec.ts`, `development-secrets.spec.ts`, `database-entities.ts`, `server/package.json`, `JsonObject`, `audit-log.listener.spec.ts`, `identity-keys.e2e-spec.ts`, `log-redaction.spec.ts`, `encryption.service.spec.ts`, `test-database.ts`, `log-level-warn.spec.ts`, `key-format.ts`, `body-limit.spec.ts`, `ProjectsService`, `operation-steps.ts`, `migrate.module.ts`, `config.module.ts`, `secrets-reencryption.service.ts`, `secrets-generate.command.ts`, `health.module.ts`, `DisabledOperators`, `environment-checks.service.spec.ts`, `operator-block-sync.e2e-spec.ts`, `RequestContext`, `server-errors.spec.ts`, `ioredis`, `replica-events-transport.ts`, `replica-events.publisher.spec.ts`, `zone.ts`, `secrets-reencryption.module.ts`, `api-keys.service.ts`, `operators.module.ts`, `cli-mode.e2e-spec.ts`, `request-id.spec.ts`, `IdentityKeyAddCommand`, `Zone`, `@nestjs/testing`, `identity-key-pem.ts`, `tokens.service.ts`, `DisabledOperators`, `SlowOperations`, `operators.service.ts`, `security-headers.spec.ts`, `telemetry.interceptor.ts`?**
  _High betweenness centrality (0.222) - this node is a cross-community bridge._
- **What connects `./${module}.module.js`, `../cli.module.js`, `./tsconfig.json` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.07549361207897794 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `visitor-session-refresh.e2e-spec.ts`, `environment-check.ts`, `dependencies`, `conversation-indexes.e2e-spec.ts`, `projects.service.ts`, `typeorm`, `Project`, `chat-tables.e2e-spec.ts`, `Visitor`, `replica-cache-sync.e2e-spec.ts`, `conversation.entity.ts`, `operator-guard-probe.ts`, `initial-project.e2e-spec.ts`, `database-entities.ts`, `server/package.json`, `JsonObject`, `test-secrets.ts`, `identity-keys.e2e-spec.ts`, `participant.entity.spec.ts`, `test-database.ts`, `operation-steps.ts`, `environment-checks.service.spec.ts`, `operator-block-sync.e2e-spec.ts`, `Message`, `api-keys.service.ts`, `visitor-session.entity.spec.ts`, `operator-commands.e2e-spec.ts`, `identity-key-pem.ts`, `ref_node_path`, `config-checks.spec.ts`, `findFreePort`, `redis-checks.spec.ts`, `ConversationEvent`, `operators.service.ts`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `ProjectsService` connect `ProjectsService` to `identity-key-list.command.ts`, `IdentityKeyAddCommand`, `DomainEventBus`, `@nestjs/testing`, `replica-cache-sync.e2e-spec.ts`, `config.module.ts`, `OperatorDisableCommand`, `cli.module.ts`, `initial-project.e2e-spec.ts`, `projects.service.ts`, `development-secrets.spec.ts`, `ProjectCreateCommand`, `IdentityKeyRevokeCommand`, `origin.commands.ts`, `initial-project.service.ts`, `Project`, `startup-summary.service.spec.ts`, `api-keys.service.ts`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `visitor-session-refresh.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12233285917496443 - nodes in this community are weakly interconnected._