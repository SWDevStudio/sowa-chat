# Graph Report - hector-chat-epic-11  (2026-10-29)

## Corpus Check
- 474 files · ~124,227 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .log 1)

## Summary
- 3254 nodes · 8230 edges · 174 communities (133 shown, 41 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 209 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `11dc96ff`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- typeorm
- bot-sdk/tsconfig.json
- package.json
- visitor-session-refresh.e2e-spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- ContextConsumer
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
- visitor-sessions.service.ts
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
- initial-project.e2e-spec.ts
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
- api-app.ts
- encryption.service.spec.ts
- key-cli.ts
- log-level-warn.spec.ts
- ConversationEvent
- ref_node_crypto
- server-protocol.e2e-spec.ts
- ProjectsService
- OperationSteps
- database-connection.e2e-spec.ts
- audited-events.ts
- config.module.ts
- secrets-reencrypt.command.ts
- .canActivate
- secret-rotation.ts
- health.module.ts
- DisabledOperators
- project.entity.ts
- operator-block-sync.e2e-spec.ts
- RequestContext
- server-errors.spec.ts
- CreateChatTables1793215389271
- telemetry.interceptor.spec.ts
- ioredis
- domain-events.ts
- zone-e2e-app.ts
- Message
- encryption-keys.schema.spec.ts
- secrets-reencryption.service.ts
- api-keys-cache.e2e-spec.ts
- IdentityKey
- initial-project.development.spec.ts
- worker.module.ts
- cli-mode.e2e-spec.ts
- SecretsReencryptionService
- replica-cache-sync.e2e-spec.ts
- IdentityKeyAddCommand
- JsonObjectValidator
- visitor.entity.spec.ts
- e2e-server.ts
- @nestjs/common
- operator-disable.e2e-spec.ts
- operator-commands.e2e-spec.ts
- identity-key-pem.ts
- ref_node_path
- secret-generators.spec.ts
- migrate-mode.e2e-spec.ts
- OperatorsService
- tokens.service.ts
- OnDomainEvent
- replica-events.e2e-spec.ts
- ReplicaEventsPublisher
- env.schema.initial-project.spec.ts
- env.schema.logging.spec.ts
- test-database.ts
- visitor-auth-guard.e2e-spec.ts
- log-settings.e2e-spec.ts
- env.schema.spec.ts
- @aws-sdk/client-s3@^3.1151.0
- ServerErrorsProbeController
- encrypted-secret.spec.ts
- visitors.module.ts
- bullmq@^6.3.15
- http-error.filter.spec.ts
- helmet
- health.e2e-spec.ts
- origin.ts
- global-setup.ts
- zod-serialization.spec.ts
- log-redaction.e2e-spec.ts
- metrics.controller.ts
- typeorm
- workspace-check-types.e2e-spec.ts
- ErrorProbeController
- project-cli.ts
- environment-checks.service.spec.ts
- visitor-session.e2e-spec.ts
- .refresh
- log-redaction.spec.ts
- projects.service.ts
- @nestjs/common
- load-env.ts
- IdentityKeyRevokeCommand
- config-startup.e2e-spec.ts
- replica-events-offline-redis.e2e-spec.ts
- project-list.command.ts
- conversation.entity.spec.ts
- ServerController
- InitialProjectService
- token-signing-keys.schema.ts
- redis-connection.e2e-spec.ts
- KeyRevokeCommand
- OperatorRoleGuard
- OperationStepsProbeController
- GuardProbeController
- database-migrations.spec.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- @nest-lab/throttler-storage-redis@^1.2.0
- pg
- pino-http
- @socket.io/redis-adapter@^8.3.0
- source-map-support@^0.5.21
- @types/express@^5.0.0

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 169 edges
2. `typeorm` - 69 edges
3. `ProjectsService` - 54 edges
4. `Zone()` - 54 edges
5. `Project` - 53 edges
6. `@nestjs/testing` - 52 edges
7. `useTestDatabase()` - 51 edges
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

## Communities (174 total, 41 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.06
Nodes (20): columns(), expectedColumns, findColumn(), findRelation(), normalizeSql(), relations(), runMigration(), DatabaseMigration (+12 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "visitor-session-refresh.e2e-spec.ts"
Cohesion: 0.14
Nodes (29): api(), createProjectWithPublicKey(), findAllSessions(), findFamilySessions(), findSessionByRefreshToken(), postVisitorSession(), postVisitorSessionRefresh(), startVisitorSession() (+21 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, supertest@^7.0.0 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.09
Nodes (21): checkEncryptionKeysInProduction(), checkInitialServerKey(), checkPrettyLogFormat(), checkPublicUrlInProduction(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), EnvObject, envObjectSchema (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "protocol/src/index.ts"
Cohesion: 0.10
Nodes (20): nestjs-zod@^5.5.0, OperatorTokenRequestDto, OperatorTokenResponseDto, OperatorTokenClaims, operatorTokenClaimsSchema, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema (+12 more)

### Community 10 - "environment-checks.service.ts"
Cohesion: 0.11
Nodes (25): environmentChecksConfig, exampleSecretsCheck, exampleSecretValues, publicUrlsHttpsCheck, s3PublicUrlCheck, contextWith(), developmentContext(), productionContext() (+17 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, cache-manager@^7.2.9, jose@^6.2.12, nest-commander@^3.21.0, @nestjs/cache-manager@^12.0.1, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1 (+21 more)

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

### Community 22 - "visitor-sessions.service.ts"
Cohesion: 0.09
Nodes (10): VisitorApiModule, generateRefreshToken(), Visitor, NewVisitorSession, RefreshExchange, visitorAccessTokenTtlSeconds, VisitorTokenClaims, visitorTokenClaimsSchema (+2 more)

### Community 23 - "operator-role.guard.spec.ts"
Cohesion: 0.20
Nodes (6): createGuard(), createRequestContext(), ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey

### Community 24 - "Project"
Cohesion: 0.16
Nodes (6): database, loadDataSource(), databaseEntities, Channel, channelColumns(), findColumn()

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.09
Nodes (14): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand (+6 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.17
Nodes (12): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, runToExit() (+4 more)

### Community 28 - ".create"
Cohesion: 0.14
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.09
Nodes (27): ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation(), createMessage() (+19 more)

### Community 32 - "identity-key-list.command.ts"
Cohesion: 0.11
Nodes (12): emptyCell, formatDate(), writeTable(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow(), header (+4 more)

### Community 33 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 34 - "DomainEventBus"
Cohesion: 0.09
Nodes (13): BusProbe, AppCacheModule, apiKeyEvent, projectEvent, ReplicaEventsPublisherModule, replicaPublishConnectTimeoutMs, replicaEventsClient, replicaPublishTimeoutMs (+5 more)

### Community 35 - "development-secrets-file.ts"
Cohesion: 0.17
Nodes (23): completeFile(), createFile(), createDevelopmentSecrets(), defaultDevelopmentSecretsDirectory, DevelopmentSecrets, developmentSecretsFileName, developmentSecretsSchema, hasErrorCode() (+15 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "main.ts"
Cohesion: 0.05
Nodes (44): cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, DatabaseMigrationStep, createLogDestination(), logFileDescriptor() (+36 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "@nestjs/testing"
Cohesion: 0.07
Nodes (28): DependencyStatusBody, StatusBody, LogDestination, findZonePorts(), probeControllers, startListening(), stopListening(), ZoneServers (+20 more)

### Community 41 - "operator-block-sync.e2e-spec.ts"
Cohesion: 0.11
Nodes (18): OperatorController(), DisabledProbeController, issueOperator(), getProbe(), issueOperator(), withToken(), BlockTarget, get() (+10 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 47 - "json-object-limits.spec.ts"
Cohesion: 0.09
Nodes (15): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+7 more)

### Community 48 - "visitor-session.controller.ts"
Cohesion: 0.22
Nodes (10): VisitorSessionRefreshRequestDto, VisitorSessionRequestDto, VisitorSessionResponseDto, VisitorSessionTokens, refreshToken, requestCases, VisitorSessionRefreshRequest, visitorSessionRefreshRequestSchema (+2 more)

### Community 49 - "Conversation"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 50 - "cli.module.ts"
Cohesion: 0.12
Nodes (14): serverKeyOnceWarning, writeLine(), writeWarning(), IdentityKeyAddOptions, IdentityKeyRevokeOptions, KeyCreateCommand, KeyCreateOptions, KeyGenerateCommand (+6 more)

### Community 51 - "telemetry.interceptor.spec.ts"
Cohesion: 0.13
Nodes (10): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+2 more)

### Community 52 - "initial-project.e2e-spec.ts"
Cohesion: 0.10
Nodes (21): InvalidApiKeyError, IssueApiKeyInput, CreatedProject, CreateProjectInput, apiKeyRows(), expectSingleProject(), projectCreatedRows(), columns (+13 more)

### Community 53 - "server-errors.spec.ts"
Cohesion: 0.12
Nodes (17): OperatorDisabledFilter, InvalidPublicKeyFilter, InvalidRefreshTokenFilter, OperatorDisabledError, InvalidPublicKeyError, ApiException, ApiExceptionInput, errorCodeStatuses (+9 more)

### Community 54 - "startup-summary.service.spec.ts"
Cohesion: 0.13
Nodes (11): formatOrigins(), createService(), ports, secretLines, shop, zoneLines, StartupSummaryService, SecretStatus (+3 more)

### Community 55 - "development-secrets.spec.ts"
Cohesion: 0.17
Nodes (22): compileConfigModule(), compileInDevelopment(), developmentSecretsPath(), Loaded, allTestSecrets, createSecretsDirectory(), developmentEnvWithoutSecrets, developmentSource() (+14 more)

### Community 57 - "database-entities.ts"
Cohesion: 0.23
Nodes (9): createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity (+1 more)

### Community 58 - "server/package.json"
Cohesion: 0.09
Nodes (21): author, bin, sowa-chat, file-type@^22.1.1, @nestjs/bullmq@^12.0.0, @nestjs/throttler@^6.7.1, @nestjs/websockets@^12.1.3, sharp@^0.35.5 (+13 more)

### Community 59 - "JsonObject"
Cohesion: 0.16
Nodes (9): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns, ProjectFixture (+1 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "audit-log.e2e-spec.ts"
Cohesion: 0.12
Nodes (13): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditModule, auditedEventNames(), AuditRule (+5 more)

### Community 62 - "identity-keys.e2e-spec.ts"
Cohesion: 0.16
Nodes (26): expectNoKeyRows(), expectNoRows(), addKey(), originAuditRows(), runCaptured(), runCliInProcess(), addEd25519Key(), addIdentityKey() (+18 more)

### Community 63 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 64 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 65 - "api-app.ts"
Cohesion: 0.15
Nodes (16): @nestjs/platform-express@^12.0.1, configureApiApp(), ApiModule, useClsMiddleware(), setupApiDocs(), bodyLimit, useBodyLimit(), BodyParserError (+8 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.11
Nodes (15): EncryptionKey, CryptoModule, authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService (+7 more)

### Community 67 - "key-cli.ts"
Cohesion: 0.28
Nodes (16): toLookupPrefix(), hashKey(), auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix() (+8 more)

### Community 68 - "log-level-warn.spec.ts"
Cohesion: 0.17
Nodes (8): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe

### Community 69 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 70 - "ref_node_crypto"
Cohesion: 0.10
Nodes (30): eventFields, serverKey, base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey() (+22 more)

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "ProjectsService"
Cohesion: 0.09
Nodes (9): ApiKeysService, toEvent(), ProjectSnapshot, prepareProject(), ProjectAlreadyExistsError, ProjectNotFoundError, ProjectsService, createService() (+1 more)

### Community 73 - "OperationSteps"
Cohesion: 0.09
Nodes (9): DatabaseStepSubscriber, OperationStep, OperationSteps, beginOperation(), operationTimingKey, pause(), SlowProbeController, nestjs-cls (+1 more)

### Community 74 - "database-connection.e2e-spec.ts"
Cohesion: 0.20
Nodes (8): AppConfigModule, fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus()

### Community 75 - "audited-events.ts"
Cohesion: 0.11
Nodes (13): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+5 more)

### Community 76 - "config.module.ts"
Cohesion: 0.20
Nodes (15): compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig, parseEnv() (+7 more)

### Community 77 - "secrets-reencrypt.command.ts"
Cohesion: 0.15
Nodes (11): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+3 more)

### Community 79 - "secret-rotation.ts"
Cohesion: 0.27
Nodes (13): generateEncryptionKeyEntry(), generateTokenSigningKeyEntry(), nextTokenSigningKeyId(), parseVariable(), requireConfiguredValue(), rotateConfiguredSecrets(), rotateEncryptionKeys(), rotateSecrets() (+5 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 81 - "DisabledOperators"
Cohesion: 0.07
Nodes (15): DisabledOperators, DisabledOperatorsModule, Probe, OperatorReplicaEventsController, createDisabledOperators(), malformedPayloads, CacheInvalidateController, CacheInvalidateEvent (+7 more)

### Community 82 - "project.entity.ts"
Cohesion: 0.24
Nodes (8): toProjectSnapshot(), InvalidProjectNameError, createProjectsServiceProbe(), issuedServerKey, projectRow(), ProjectsServiceProbe, runWithoutTransaction(), @nestjs-cls/transactional

### Community 83 - "operator-block-sync.e2e-spec.ts"
Cohesion: 0.13
Nodes (18): blockedOnAll(), expectStatusOnAll(), issueOperator(), publishAll(), subscriberCounts(), waitForBlockedOnAll(), waitForStatusOnAll(), blockProbePath (+10 more)

### Community 85 - "server-errors.spec.ts"
Cohesion: 0.14
Nodes (13): internalErrorMessage, ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, stringsInside(), errorCodes (+5 more)

### Community 87 - "telemetry.interceptor.spec.ts"
Cohesion: 0.08
Nodes (16): HttpLabel, HttpMetrics, HttpRequestRecord, labelNames, operationSteps, OperationTiming, StepTimes, FinishedOperation (+8 more)

### Community 88 - "ioredis"
Cohesion: 0.20
Nodes (8): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 89 - "domain-events.ts"
Cohesion: 0.14
Nodes (24): apiKeyCacheKeys(), cacheInvalidatedEventNames(), CacheInvalidationRule, cacheInvalidationRules, projectCacheKeys(), apiKeyEvent, projectEvent, cacheInvalidate() (+16 more)

### Community 90 - "zone-e2e-app.ts"
Cohesion: 0.06
Nodes (26): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), zonePathPrefixes, ApiHttpModule (+18 more)

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
Cohesion: 0.09
Nodes (14): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey, CachedApiKey, hashMatches(), IssueApiKeyBaseInput, IssuedApiKey (+6 more)

### Community 95 - "IdentityKey"
Cohesion: 0.08
Nodes (14): KeyActorKind, IdentityKey, IdentityKeyAlgorithm, identityKeyAlgorithms, ParsedIdentityKey, IdentityKeysRepository, NewIdentityKey, AddedIdentityKey (+6 more)

### Community 96 - "initial-project.development.spec.ts"
Cohesion: 0.25
Nodes (9): createdProject, existingProject, missingKeyWarning(), developmentAllowedOrigins, developmentOperatorAllowedOrigins, developmentProjectName, appConfig, developmentSecretsConfig (+1 more)

### Community 97 - "worker.module.ts"
Cohesion: 0.14
Nodes (5): KeysModule, ProjectsModule, StartupModule, WorkerModule, @nestjs-cls/transactional-adapter-typeorm

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 100 - "replica-cache-sync.e2e-spec.ts"
Cohesion: 0.16
Nodes (14): badOrigins, helpEntries, prefixes, expectStatusOnAll(), probeWithKey(), addOrigins(), OriginAction, OriginCommandOptions (+6 more)

### Community 102 - "JsonObjectValidator"
Cohesion: 0.30
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 103 - "visitor.entity.spec.ts"
Cohesion: 0.32
Nodes (5): columns(), expectedColumns, findColumn(), findRelation(), relations()

### Community 104 - "e2e-server.ts"
Cohesion: 0.18
Nodes (19): PrintedKeys, startApi(), productionEnv(), startApi(), createSecretsDirectory(), startApi(), startWorker(), zonePortVariables (+11 more)

### Community 105 - "@nestjs/common"
Cohesion: 0.05
Nodes (27): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController, controllers, DocsProbeDto, documentOf(), InternalDocsProbeController (+19 more)

### Community 106 - "operator-disable.e2e-spec.ts"
Cohesion: 0.20
Nodes (5): ServerApiModule, OperatorsModule, blockAuditRows(), blockMethods, createOperator()

### Community 107 - "operator-commands.e2e-spec.ts"
Cohesion: 0.20
Nodes (14): runCommand(), disabledAtOf(), setupOperator(), disabledAtOf(), helpEntries, setupOperator(), CliRunResult, operatorActions (+6 more)

### Community 108 - "identity-key-pem.ts"
Cohesion: 0.27
Nodes (7): algorithmOf(), InvalidIdentityKeyError, isP256(), parseIdentityPublicKey(), readPublicKeyObject(), captureError(), expectInvalidKey()

### Community 109 - "ref_node_path"
Cohesion: 0.09
Nodes (17): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, builtFiles, CommandResult, entriesByPackage, plannedBuildTasks() (+9 more)

### Community 110 - "secret-generators.spec.ts"
Cohesion: 0.36
Nodes (5): firstTokenSigningKeyIds, GeneratedSecret, generatedSecrets, SecretsMode, minimalEnv

### Community 111 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 112 - "OperatorsService"
Cohesion: 0.06
Nodes (21): Operator, OperatorIdRow, OperatorProfile, OperatorsRepository, ChangeOperatorBlockInput, IssuedOperatorToken, IssueOperatorTokenInput, OperatorActorKind (+13 more)

### Community 115 - "tokens.service.ts"
Cohesion: 0.08
Nodes (34): TokenSigningKey, SignedToken, SignTokenInput, ConsumerModule, TestTokenSigningConfigModule, TokenConsumer, TokenAudience, tokenAudiences (+26 more)

### Community 120 - "OnDomainEvent"
Cohesion: 0.47
Nodes (3): TestListener, OnDomainEvent(), TestIgnoredEvent

### Community 121 - "replica-events.e2e-spec.ts"
Cohesion: 0.29
Nodes (10): expectCachedOnAll(), expectKept(), repositoryRoot, seed(), waitUntilDeleted(), cacheInvalidateSubscribers(), cacheOf(), publishCacheInvalidate() (+2 more)

### Community 122 - "ReplicaEventsPublisher"
Cohesion: 0.15
Nodes (3): LocalCacheInvalidation, errorMessage(), ReplicaEventsPublisher

### Community 123 - "env.schema.initial-project.spec.ts"
Cohesion: 0.29
Nodes (3): initVariables, loadConfig(), requiredEnv

### Community 124 - "env.schema.logging.spec.ts"
Cohesion: 0.33
Nodes (3): Env, logLevels, requiredEnv

### Community 125 - "test-database.ts"
Cohesion: 0.08
Nodes (26): apiKeyKinds, issueServerKey(), ColumnRow, expectedColumns, IndexRow, PlanRow, ColumnRow, expectedColumns (+18 more)

### Community 126 - "visitor-auth-guard.e2e-spec.ts"
Cohesion: 0.15
Nodes (10): VisitorAuthModule, VisitorController(), forgeUnsecuredToken(), waitMs(), VisitorGuardProbeController, visitorProbePath, getProbe(), IssuedVisitor (+2 more)

### Community 127 - "log-settings.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+2 more)

### Community 131 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 132 - "visitors.module.ts"
Cohesion: 0.13
Nodes (3): VisitorSessionsRepository, InvalidRefreshTokenError, VisitorSessionsService

### Community 134 - "http-error.filter.spec.ts"
Cohesion: 0.18
Nodes (5): HttpErrorFilter, responseZodErrorOf(), knownKeys, ProbeBodyDto, requestIdHeader

### Community 136 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 137 - "origin.ts"
Cohesion: 0.27
Nodes (6): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl()

### Community 138 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 139 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 140 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 141 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 143 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 145 - "project-cli.ts"
Cohesion: 0.28
Nodes (8): buildServer(), fullOriginArguments, listHeader, onceWarning, repositoryRoot, runMainCli(), serverDirectory, uuidPattern

### Community 146 - "environment-checks.service.spec.ts"
Cohesion: 0.27
Nodes (6): EnvironmentChecksService, createService(), createCheck(), createCheckContext(), createCheckSettings(), createFailingCheck()

### Community 147 - "visitor-session.e2e-spec.ts"
Cohesion: 0.21
Nodes (7): replaceLastChar(), rowsContainText(), textForms(), createProjectWithPublicKey(), postPublic(), postSession(), visitorSessionResponseSchema

### Community 149 - "log-redaction.spec.ts"
Cohesion: 0.20
Nodes (10): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+2 more)

### Community 150 - "projects.service.ts"
Cohesion: 0.08
Nodes (19): OriginList, originLists, Project, initialProjectLockName, NewProject, ORIGIN_COLUMNS, OriginsRow, ProjectsRepository (+11 more)

### Community 151 - "@nestjs/common"
Cohesion: 0.08
Nodes (13): OperatorAuthModule, ServerAuthModule, ServerKeyGuard, VisitorAuthGuard, AppClsModule, bearerToken(), FakeRequestInput, RequestContextModule (+5 more)

### Community 152 - "load-env.ts"
Cohesion: 0.50
Nodes (4): loadFromProcessEnv(), Env, exportToProcessEnv(), loadEnv()

### Community 154 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 155 - "replica-events-offline-redis.e2e-spec.ts"
Cohesion: 0.24
Nodes (8): CapturedRun, MainProject, captureLogLines(), ChannelRecorder, ClosingRedisServer, LogCapture, ObservedMessage, startClosingRedisServer()

### Community 156 - "project-list.command.ts"
Cohesion: 0.28
Nodes (4): formatOrigins(), header, ProjectListCommand, toRow()

### Community 157 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 158 - "ServerController"
Cohesion: 0.25
Nodes (3): OperatorTokenController, ServerController(), ReplicaProbeController

### Community 160 - "token-signing-keys.schema.ts"
Cohesion: 0.29
Nodes (6): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, tokenSigningKeysSchema

### Community 161 - "redis-connection.e2e-spec.ts"
Cohesion: 0.29
Nodes (7): fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableRedisUrl(), waitForHttpStatus()

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1122 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **41 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `http-error.filter.spec.ts`, `protocol/src/index.ts`, `environment-checks.service.ts`, `zod-serialization.spec.ts`, `dependencies`, `metrics.controller.ts`, `environment-checks.service.spec.ts`, `log-redaction.spec.ts`, `visitor-sessions.service.ts`, `operator-role.guard.spec.ts`, `projects.service.ts`, `origin.commands.ts`, `project-list.command.ts`, `identity-key-list.command.ts`, `DomainEventBus`, `main.ts`, `@nestjs/testing`, `operator-block-sync.e2e-spec.ts`, `visitor-session.controller.ts`, `cli.module.ts`, `telemetry.interceptor.spec.ts`, `server-errors.spec.ts`, `startup-summary.service.spec.ts`, `database-entities.ts`, `server/package.json`, `JsonObject`, `audit-log.e2e-spec.ts`, `api-app.ts`, `encryption.service.spec.ts`, `log-level-warn.spec.ts`, `ref_node_crypto`, `OperationSteps`, `config.module.ts`, `secrets-reencrypt.command.ts`, `health.module.ts`, `DisabledOperators`, `operator-block-sync.e2e-spec.ts`, `server-errors.spec.ts`, `telemetry.interceptor.spec.ts`, `ioredis`, `domain-events.ts`, `zone-e2e-app.ts`, `secrets-reencryption.service.ts`, `api-keys-cache.e2e-spec.ts`, `IdentityKey`, `initial-project.development.spec.ts`, `worker.module.ts`, `replica-cache-sync.e2e-spec.ts`, `@nestjs/common`, `operator-disable.e2e-spec.ts`, `OperatorsService`, `tokens.service.ts`, `replica-events.e2e-spec.ts`, `test-database.ts`, `visitor-auth-guard.e2e-spec.ts`?**
  _High betweenness centrality (0.245) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.061952861952861954 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `visitor-session-refresh.e2e-spec.ts`, `environment-checks.service.ts`, `dependencies`, `environment-checks.service.spec.ts`, `visitor-sessions.service.ts`, `Project`, `conversation.entity.spec.ts`, `chat-tables.e2e-spec.ts`, `operator-block-sync.e2e-spec.ts`, `Conversation`, `initial-project.e2e-spec.ts`, `database-entities.ts`, `server/package.json`, `JsonObject`, `test-secrets.ts`, `identity-keys.e2e-spec.ts`, `secrets-reencrypt-command.e2e-spec.ts`, `participant.entity.spec.ts`, `key-cli.ts`, `ConversationEvent`, `OperationSteps`, `database-connection.e2e-spec.ts`, `project.entity.ts`, `operator-block-sync.e2e-spec.ts`, `Message`, `api-keys-cache.e2e-spec.ts`, `IdentityKey`, `worker.module.ts`, `replica-cache-sync.e2e-spec.ts`, `visitor.entity.spec.ts`, `operator-commands.e2e-spec.ts`, `ref_node_path`, `migrate-mode.e2e-spec.ts`, `OperatorsService`, `test-database.ts`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `ProjectsService` connect `ProjectsService` to `identity-key-list.command.ts`, `worker.module.ts`, `initial-project.development.spec.ts`, `replica-cache-sync.e2e-spec.ts`, `IdentityKeyAddCommand`, `origin.ts`, `OperatorDisableCommand`, `cli.module.ts`, `project.entity.ts`, `initial-project.e2e-spec.ts`, `projects.service.ts`, `startup-summary.service.spec.ts`, `ProjectCreateCommand`, `IdentityKeyRevokeCommand`, `origin.commands.ts`, `project-list.command.ts`, `IdentityKey`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Should `visitor-session-refresh.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1361344537815126 - nodes in this community are weakly interconnected._