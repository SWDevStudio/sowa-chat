# Graph Report - hector-chat-epic-11  (2026-10-29)

## Corpus Check
- 465 files · ~120,651 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .log 1)

## Summary
- 3200 nodes · 8046 edges · 156 communities (121 shown, 35 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 208 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `01e5e3c0`
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
- replica-events.publisher.spec.ts
- server-errors.spec.ts
- Project
- scripts
- origin.commands.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- replica-events.publisher.spec.ts
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
- identity-key-commands.e2e-spec.ts
- Conversation
- cli.module.ts
- .publish
- initial-project.e2e-spec.ts
- server-errors.spec.ts
- visitor-session.entity.spec.ts
- development-secrets.spec.ts
- ProjectCreateCommand
- cli.module.ts
- server/package.json
- JsonObject
- test-secrets.ts
- audit-log.e2e-spec.ts
- identity-keys.e2e-spec.ts
- secrets-reencrypt-command.e2e-spec.ts
- participant.entity.spec.ts
- main.ts
- encryption.service.spec.ts
- replica-cache-sync.e2e-spec.ts
- conversation.entity.spec.ts
- ConversationEvent
- ref_node_crypto
- server-protocol.e2e-spec.ts
- ProjectsService
- OperationSteps
- replica-events-offline-redis.e2e-spec.ts
- audited-events.ts
- config.module.ts
- identity-keys.service.ts
- metrics.controller.ts
- secret-rotation.ts
- health.module.ts
- DisabledOperators
- projects.service.ts
- AuditScenarios
- RequestContext
- key-cli.ts
- CreateChatTables1793215389271
- telemetry.interceptor.spec.ts
- ioredis
- project-snapshot-cache.e2e-spec.ts
- zone-e2e-app.ts
- Message
- encryption-keys.schema.spec.ts
- operator-roles.e2e-spec.ts
- api-keys-cache.e2e-spec.ts
- IdentityKey
- InitialProjectService
- migrate.module.ts
- cli-mode.e2e-spec.ts
- zone-e2e-app.ts
- Zone
- IdentityKeyAddCommand
- JsonObjectValidator
- visitor.entity.spec.ts
- findFreePort
- api-versioning.spec.ts
- @nestjs/common
- operator-commands.e2e-spec.ts
- identity-key-pem.ts
- ref_node_path
- secret-generators.spec.ts
- project-cli.ts
- OperatorsService
- tokens.service.ts
- domain-event-bus.spec.ts
- replica-events.e2e-spec.ts
- LocalCacheInvalidation
- env.schema.initial-project.spec.ts
- env.schema.logging.spec.ts
- test-database.ts
- TokenConsumer
- body-limit.spec.ts
- env.schema.spec.ts
- @aws-sdk/client-s3@^3.1151.0
- ServerErrorsProbeController
- @aws-sdk/s3-request-presigner@^3.1151.0
- visitors.module.ts
- bullmq@^6.3.15
- SlowProbeController
- helmet
- visitor-auth-guard.e2e-spec.ts
- @nest-lab/throttler-storage-redis@^1.2.0
- api-keys.e2e-spec.ts
- zod-serialization.spec.ts
- pg
- pino-http
- typeorm
- @socket.io/redis-adapter@^8.3.0
- ErrorProbeController
- source-map-support@^0.5.21
- @types/express@^5.0.0
- InternalProbeController
- cache-invalidate.controller.spec.ts
- operator-auth.guard.ts
- load-env.ts
- IdentityKeyRevokeCommand
- ReplicaReadiness
- ZoneServers
- TestTokenSigningConfigModule
- token-signing-keys.schema.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 167 edges
2. `typeorm` - 68 edges
3. `Zone()` - 54 edges
4. `@nestjs/testing` - 51 edges
5. `ProjectsService` - 51 edges
6. `Project` - 50 edges
7. `useTestDatabase()` - 49 edges
8. `DomainEventBus` - 40 edges
9. `createProject()` - 39 edges
10. `@nestjs/config` - 35 edges

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

## Communities (156 total, 35 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.06
Nodes (20): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity (+12 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "visitor-session-refresh.e2e-spec.ts"
Cohesion: 0.06
Nodes (44): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+36 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, supertest@^7.0.0 (+23 more)

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
Cohesion: 0.08
Nodes (34): OperatorTokenRequestDto, OperatorTokenResponseDto, VisitorSessionRefreshRequestDto, VisitorSessionRequestDto, VisitorSessionResponseDto, OperatorProfile, IssueOperatorTokenInput, VisitorTokenClaims (+26 more)

### Community 10 - "environment-checks.service.ts"
Cohesion: 0.14
Nodes (19): CheckContext, CheckFinding, CheckLevel, CheckResult, EnvironmentCheck, EnvironmentCheckError, describeResult(), EnvironmentChecksService (+11 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, cache-manager@^7.2.9, jose@^6.2.12, nest-commander@^3.21.0, @nestjs/cache-manager@^12.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1 (+21 more)

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

### Community 22 - "replica-events.publisher.spec.ts"
Cohesion: 0.16
Nodes (10): parseDatabase(), parseUrl(), RedisConnectionOptions, redisTransportOptions(), stripIpv6Brackets(), ReplicaEventsPublisherModule, replicaPublishConnectTimeoutMs, replicaEventsClient (+2 more)

### Community 23 - "server-errors.spec.ts"
Cohesion: 0.08
Nodes (23): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnly(), supervisorOnlyMetadataKey, ApiException (+15 more)

### Community 24 - "Project"
Cohesion: 0.13
Nodes (4): Channel, channelColumns(), findColumn(), Project

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
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.07
Nodes (34): ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation(), createMessage() (+26 more)

### Community 32 - "replica-events.publisher.spec.ts"
Cohesion: 0.16
Nodes (11): cacheInvalidatedEventNames(), cacheInvalidate(), cacheInvalidateRule(), cacheInvalidateRules(), ReplicaEventMessage, replicaEventNames(), ReplicaEventRule, replicaEventRules (+3 more)

### Community 33 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 34 - "DomainEventBus"
Cohesion: 0.15
Nodes (5): BusProbe, Probe, DomainEventBus, CacheBusModule, @nestjs/event-emitter

### Community 35 - "development-secrets-file.ts"
Cohesion: 0.16
Nodes (25): missingKeyWarning(), completeFile(), createFile(), createDevelopmentSecrets(), defaultDevelopmentSecretsDirectory, DevelopmentSecrets, developmentSecretsFileName, developmentSecretsPath() (+17 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "main.ts"
Cohesion: 0.20
Nodes (15): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+7 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "@nestjs/testing"
Cohesion: 0.07
Nodes (33): HealthBody, HealthEntry, DependencyStatusBody, StatusBody, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto (+25 more)

### Community 41 - "operator-block-sync.e2e-spec.ts"
Cohesion: 0.13
Nodes (19): blockedOnAll(), expectStatusOnAll(), issueOperator(), publishAll(), runCommand(), subscriberCounts(), waitForBlockedOnAll(), waitForStatusOnAll() (+11 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 46 - "RedactionProbeController"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 47 - "json-object-limits.spec.ts"
Cohesion: 0.09
Nodes (15): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+7 more)

### Community 48 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.28
Nodes (15): runCaptured(), runCliInProcess(), addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem(), identityKeyListHeader, listIdentityKeys() (+7 more)

### Community 49 - "Conversation"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 50 - "cli.module.ts"
Cohesion: 0.05
Nodes (32): emptyCell, formatDate(), serverKeyOnceWarning, writeLine(), writeTable(), writeWarning(), IdentityKeyAddOptions, readPem() (+24 more)

### Community 51 - ".publish"
Cohesion: 0.28
Nodes (3): IdentityKeyKidTakenError, InvalidIdentityKeyIdError, toEvent()

### Community 52 - "initial-project.e2e-spec.ts"
Cohesion: 0.08
Nodes (26): SupervisorOnlyController, IssueApiKeyInput, ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl() (+18 more)

### Community 53 - "server-errors.spec.ts"
Cohesion: 0.08
Nodes (22): nestjs-zod@^5.5.0, OperatorDisabledFilter, InvalidPublicKeyFilter, InvalidRefreshTokenFilter, OperatorDisabledError, InvalidPublicKeyError, VisitorSessionTokens, errorCodeByStatus (+14 more)

### Community 54 - "visitor-session.entity.spec.ts"
Cohesion: 0.11
Nodes (11): columns(), expectedColumns, findColumn(), findRelation(), normalizeSql(), relations(), runMigration(), AddProjectsOperatorAllowedOrigins1793300003000 (+3 more)

### Community 55 - "development-secrets.spec.ts"
Cohesion: 0.14
Nodes (26): CreatedProject, createdProject, existingProject, developmentAllowedOrigins, developmentOperatorAllowedOrigins, developmentProjectName, compileConfigModule(), compileInDevelopment() (+18 more)

### Community 57 - "cli.module.ts"
Cohesion: 0.06
Nodes (19): OperatorAuthModule, ServerApiModule, ServerAuthModule, VisitorApiModule, databaseEntities, AuditModule, AppCacheModule, cacheTtlMs (+11 more)

### Community 58 - "server/package.json"
Cohesion: 0.09
Nodes (21): author, bin, sowa-chat, file-type@^22.1.1, @nestjs/bullmq@^12.0.0, @nestjs/throttler@^6.7.1, @nestjs/websockets@^12.1.3, sharp@^0.35.5 (+13 more)

### Community 59 - "JsonObject"
Cohesion: 0.16
Nodes (9): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns, ProjectFixture (+1 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.06
Nodes (40): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+32 more)

### Community 61 - "audit-log.e2e-spec.ts"
Cohesion: 0.15
Nodes (10): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, auditedEventNames(), AuditRule, auditRules (+2 more)

### Community 62 - "identity-keys.e2e-spec.ts"
Cohesion: 0.25
Nodes (12): WorkerModule, expectNoKeyRows(), expectNoRows(), addKey(), originAuditRows(), auditRows(), auditRowsByAction(), identityKeyRows() (+4 more)

### Community 63 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 64 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 65 - "main.ts"
Cohesion: 0.11
Nodes (21): ApiModule, cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, connectReplicaEvents(), replicaEventsMicroservice (+13 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.08
Nodes (22): encryptionConfig, CryptoModule, authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext (+14 more)

### Community 67 - "replica-cache-sync.e2e-spec.ts"
Cohesion: 0.13
Nodes (15): badOrigins, helpEntries, prefixes, expectStatusOnAll(), probeWithKey(), ReplicaProbeController, addOrigins(), OriginAction (+7 more)

### Community 68 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 69 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 70 - "ref_node_crypto"
Cohesion: 0.08
Nodes (37): InvalidApiKeyError, eventFields, keyTypeByKind, serverKey, base, base62Alphabet, encodeBase62(), buildLookupPrefix() (+29 more)

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.31
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "ProjectsService"
Cohesion: 0.10
Nodes (10): OriginList, ProjectSnapshot, ProjectsRepository, prepareProject(), ProjectsService, project, snapshot, lists (+2 more)

### Community 73 - "OperationSteps"
Cohesion: 0.08
Nodes (15): nestjs-cls@^7.0.1, useClsMiddleware(), DatabaseStepSubscriber, echoRequestId(), resolveRequestId(), OperationStep, operationSteps, OperationTiming (+7 more)

### Community 74 - "replica-events-offline-redis.e2e-spec.ts"
Cohesion: 0.22
Nodes (10): CapturedRun, stubRefusedRedis(), CliRunResult, MainProject, captureLogLines(), ChannelRecorder, ClosingRedisServer, LogCapture (+2 more)

### Community 75 - "audited-events.ts"
Cohesion: 0.09
Nodes (13): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+5 more)

### Community 76 - "config.module.ts"
Cohesion: 0.13
Nodes (20): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, developmentSecretsConfig, environmentChecksConfig (+12 more)

### Community 77 - "identity-keys.service.ts"
Cohesion: 0.21
Nodes (11): KeyActorKind, IdentityKeyAlgorithm, identityKeyAlgorithms, ParsedIdentityKey, NewIdentityKey, AddedIdentityKey, AddIdentityKeyInput, RevokeIdentityKeyInput (+3 more)

### Community 78 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 79 - "secret-rotation.ts"
Cohesion: 0.27
Nodes (13): generateEncryptionKeyEntry(), generateTokenSigningKeyEntry(), nextTokenSigningKeyId(), parseVariable(), requireConfiguredValue(), rotateConfiguredSecrets(), rotateEncryptionKeys(), rotateSecrets() (+5 more)

### Community 80 - "health.module.ts"
Cohesion: 0.13
Nodes (9): DependencyChecks, HealthModule, readServerVersion(), StatusController, DependencyStatus, ServerStatus, StatusService, toDependencyStatus() (+1 more)

### Community 81 - "DisabledOperators"
Cohesion: 0.13
Nodes (7): DisabledOperators, DisabledOperatorsModule, OperatorReplicaEventsController, createDisabledOperators(), malformedPayloads, OperatorBlockEvent, OnDomainEvent()

### Community 82 - "projects.service.ts"
Cohesion: 0.12
Nodes (19): originLists, toProjectSnapshot(), initialProjectLockName, NewProject, ORIGIN_COLUMNS, OriginsRow, ChangeOriginInput, InvalidProjectNameError (+11 more)

### Community 83 - "AuditScenarios"
Cohesion: 0.29
Nodes (3): AuditScenarios, happenedIn(), ScenarioError

### Community 84 - "RequestContext"
Cohesion: 0.06
Nodes (7): OperatorAuthGuard, OperatorTokenController, VisitorAuthGuard, VisitorController(), RequestContext, VisitorGuardProbeController, visitorProbePath

### Community 85 - "key-cli.ts"
Cohesion: 0.33
Nodes (14): auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix(), listKeys(), revokeKey() (+6 more)

### Community 87 - "telemetry.interceptor.spec.ts"
Cohesion: 0.09
Nodes (11): HttpLabel, HttpMetrics, HttpRequestRecord, labelNames, roundSteps(), SlowOperations, readMetricLines(), TelemetryProbeController (+3 more)

### Community 88 - "ioredis"
Cohesion: 0.20
Nodes (8): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 89 - "project-snapshot-cache.e2e-spec.ts"
Cohesion: 0.16
Nodes (18): apiKeyCacheKeys(), CacheInvalidationRule, cacheInvalidationRules, projectCacheKeys(), apiKeyEvent, projectEvent, cacheKeys, apiKeyEvent (+10 more)

### Community 90 - "zone-e2e-app.ts"
Cohesion: 0.08
Nodes (29): configureApiApp(), DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, bodyLimit (+21 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 93 - "operator-roles.e2e-spec.ts"
Cohesion: 0.33
Nodes (4): OperatorController(), get(), getAs(), RolesProbeController

### Community 94 - "api-keys-cache.e2e-spec.ts"
Cohesion: 0.06
Nodes (20): ApiKey, ApiKeyKind, apiKeyKinds, ApiKeysRepository, NewApiKey, ApiKeysService, ApiKeySummary, CachedApiKey (+12 more)

### Community 96 - "InitialProjectService"
Cohesion: 0.39
Nodes (3): createService(), InitialProjectService, DevelopmentMainProject

### Community 97 - "migrate.module.ts"
Cohesion: 0.20
Nodes (5): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "zone-e2e-app.ts"
Cohesion: 0.13
Nodes (13): DisabledProbeController, issueOperator(), getProbe(), issueOperator(), withToken(), BlockTarget, publicKeyPemBytes(), publicKeyRawBytes() (+5 more)

### Community 100 - "Zone"
Cohesion: 0.08
Nodes (19): ServerController(), controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController (+11 more)

### Community 102 - "JsonObjectValidator"
Cohesion: 0.30
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 103 - "visitor.entity.spec.ts"
Cohesion: 0.32
Nodes (5): columns(), expectedColumns, findColumn(), findRelation(), relations()

### Community 104 - "findFreePort"
Cohesion: 0.04
Nodes (71): fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), PrintedKeys (+63 more)

### Community 105 - "api-versioning.spec.ts"
Cohesion: 0.11
Nodes (6): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController, ProbeController, ProbeService

### Community 106 - "@nestjs/common"
Cohesion: 0.09
Nodes (13): OperatorsModule, OperatorIdRow, OperatorsRepository, ChangeOperatorBlockInput, IssuedOperatorToken, OperatorActorKind, OperatorBlockChange, VisitorsModule (+5 more)

### Community 107 - "operator-commands.e2e-spec.ts"
Cohesion: 0.25
Nodes (12): disabledAtOf(), setupOperator(), disabledAtOf(), helpEntries, setupOperator(), operatorActions, operatorBlockAuditRows(), operatorCommandArguments() (+4 more)

### Community 108 - "identity-key-pem.ts"
Cohesion: 0.27
Nodes (7): algorithmOf(), InvalidIdentityKeyError, isP256(), parseIdentityPublicKey(), readPublicKeyObject(), captureError(), expectInvalidKey()

### Community 109 - "ref_node_path"
Cohesion: 0.07
Nodes (24): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, Env, isConfigVariable(), repositoryRoot, RunResult (+16 more)

### Community 110 - "secret-generators.spec.ts"
Cohesion: 0.36
Nodes (5): firstTokenSigningKeyIds, GeneratedSecret, generatedSecrets, SecretsMode, minimalEnv

### Community 111 - "project-cli.ts"
Cohesion: 0.28
Nodes (8): buildServer(), fullOriginArguments, listHeader, onceWarning, repositoryRoot, runMainCli(), serverDirectory, uuidPattern

### Community 112 - "OperatorsService"
Cohesion: 0.08
Nodes (10): OperatorNotFoundError, OperatorsService, operatorTokenTtlSeconds, blockInput, BlockProbe, createBlockProbe(), input, Probe (+2 more)

### Community 115 - "tokens.service.ts"
Cohesion: 0.15
Nodes (19): TokenSigningKey, SignedToken, SignTokenInput, TokenAudience, tokenAudiences, TokensService, VerifiedToken, createService() (+11 more)

### Community 120 - "domain-event-bus.spec.ts"
Cohesion: 0.29
Nodes (6): happened, TestListener, DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 121 - "replica-events.e2e-spec.ts"
Cohesion: 0.21
Nodes (11): expectCachedOnAll(), expectKept(), repositoryRoot, seed(), waitUntilDeleted(), cacheInvalidateSubscribers(), cacheOf(), publishCacheInvalidate() (+3 more)

### Community 123 - "env.schema.initial-project.spec.ts"
Cohesion: 0.29
Nodes (3): initVariables, loadConfig(), requiredEnv

### Community 124 - "env.schema.logging.spec.ts"
Cohesion: 0.33
Nodes (3): Env, logLevels, requiredEnv

### Community 125 - "test-database.ts"
Cohesion: 0.08
Nodes (18): Operator, issueServerKey(), IndexRow, PlanRow, blockAuditRows(), blockMethods, createOperator(), createProjectWithKey() (+10 more)

### Community 132 - "visitors.module.ts"
Cohesion: 0.08
Nodes (6): toVisitorSessionResponse(), VisitorSessionController, VisitorSessionsRepository, InvalidRefreshTokenError, VisitorSessionsService, VisitorsRepository

### Community 136 - "visitor-auth-guard.e2e-spec.ts"
Cohesion: 0.12
Nodes (15): VisitorAuthModule, encodePart(), flipSignatureBit(), ForgedTokenInput, forgeToken(), forgeUnsecuredToken(), parseTestSigningKeys(), replaceHeader() (+7 more)

### Community 138 - "api-keys.e2e-spec.ts"
Cohesion: 0.15
Nodes (3): KeysModule, ProjectsModule, StartupModule

### Community 139 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 142 - "typeorm"
Cohesion: 0.12
Nodes (6): database, loadDataSource(), Visitor, VisitorSession, NewVisitorSession, typeorm

### Community 149 - "InternalProbeController"
Cohesion: 0.16
Nodes (6): findZonePorts(), InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController

### Community 150 - "cache-invalidate.controller.spec.ts"
Cohesion: 0.16
Nodes (6): CacheInvalidateController, CacheInvalidateEvent, cacheInvalidateEventSchema, OperatorReplicaEvent, operatorReplicaEventSchema, replicaEventPatterns

### Community 151 - "operator-auth.guard.ts"
Cohesion: 0.18
Nodes (5): ServerKeyGuard, OperatorTokenClaims, operatorTokenClaimsSchema, bearerToken(), FakeRequestInput

### Community 152 - "load-env.ts"
Cohesion: 0.50
Nodes (4): loadFromProcessEnv(), Env, exportToProcessEnv(), loadEnv()

### Community 157 - "ZoneServers"
Cohesion: 0.29
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 160 - "token-signing-keys.schema.ts"
Cohesion: 0.29
Nodes (6): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, tokenSigningKeysSchema

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1102 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `visitor-session-refresh.e2e-spec.ts`, `request-context.spec.ts`, `visitor-auth-guard.e2e-spec.ts`, `protocol/src/index.ts`, `api-keys.e2e-spec.ts`, `environment-checks.service.ts`, `zod-serialization.spec.ts`, `dependencies`, `typeorm`, `InternalProbeController`, `cache-invalidate.controller.spec.ts`, `server-errors.spec.ts`, `operator-auth.guard.ts`, `replica-events.publisher.spec.ts`, `origin.commands.ts`, `replica-events.publisher.spec.ts`, `DomainEventBus`, `main.ts`, `@nestjs/testing`, `operator-block-sync.e2e-spec.ts`, `RedactionProbeController`, `cli.module.ts`, `server-errors.spec.ts`, `development-secrets.spec.ts`, `cli.module.ts`, `server/package.json`, `JsonObject`, `test-secrets.ts`, `audit-log.e2e-spec.ts`, `main.ts`, `encryption.service.spec.ts`, `replica-cache-sync.e2e-spec.ts`, `ref_node_crypto`, `OperationSteps`, `config.module.ts`, `identity-keys.service.ts`, `metrics.controller.ts`, `health.module.ts`, `DisabledOperators`, `projects.service.ts`, `RequestContext`, `telemetry.interceptor.spec.ts`, `ioredis`, `project-snapshot-cache.e2e-spec.ts`, `zone-e2e-app.ts`, `operator-roles.e2e-spec.ts`, `api-keys-cache.e2e-spec.ts`, `migrate.module.ts`, `zone-e2e-app.ts`, `Zone`, `api-versioning.spec.ts`, `tokens.service.ts`, `domain-event-bus.spec.ts`, `replica-events.e2e-spec.ts`, `test-database.ts`, `body-limit.spec.ts`?**
  _High betweenness centrality (0.241) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.06382978723404255 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `typeorm`, `visitor-session-refresh.e2e-spec.ts`, `environment-checks.service.ts`, `api-keys.e2e-spec.ts`, `dependencies`, `Project`, `chat-tables.e2e-spec.ts`, `operator-block-sync.e2e-spec.ts`, `Conversation`, `initial-project.e2e-spec.ts`, `visitor-session.entity.spec.ts`, `server/package.json`, `JsonObject`, `test-secrets.ts`, `identity-keys.e2e-spec.ts`, `secrets-reencrypt-command.e2e-spec.ts`, `participant.entity.spec.ts`, `replica-cache-sync.e2e-spec.ts`, `conversation.entity.spec.ts`, `ConversationEvent`, `OperationSteps`, `identity-keys.service.ts`, `key-cli.ts`, `CreateChatTables1793215389271`, `Message`, `api-keys-cache.e2e-spec.ts`, `zone-e2e-app.ts`, `visitor.entity.spec.ts`, `findFreePort`, `@nestjs/common`, `operator-commands.e2e-spec.ts`, `ref_node_path`, `test-database.ts`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `ProjectsService` connect `ProjectsService` to `replica-cache-sync.e2e-spec.ts`, `IdentityKeyAddCommand`, `api-keys.e2e-spec.ts`, `config.module.ts`, `OperatorsService`, `cli.module.ts`, `projects.service.ts`, `initial-project.e2e-spec.ts`, `development-secrets.spec.ts`, `Project`, `IdentityKeyRevokeCommand`, `origin.commands.ts`, `api-keys-cache.e2e-spec.ts`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Should `visitor-session-refresh.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06095481670929241 - nodes in this community are weakly interconnected._