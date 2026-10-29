# Graph Report - hector-chat-epic-11  (2026-10-29)

## Corpus Check
- 459 files · ~118,768 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .log 1)

## Summary
- 3165 nodes · 7898 edges · 163 communities (134 shown, 29 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 202 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a1fb0c8f`
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
- redis-transport-options.ts
- operator-role.guard.spec.ts
- typeorm
- scripts
- origin.commands.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- replica-events.publisher.spec.ts
- zone.guard.spec.ts
- DomainEventBus
- development-secrets-file.ts
- tsconfig.build.json
- ValidationProbeController
- main.ts
- nest-cli.json
- zone-probe.ts
- operator-block-sync.e2e-spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- operators.service.ts
- RedactionProbeController
- server-key-guard.e2e-spec.ts
- identity-key-commands.e2e-spec.ts
- Conversation
- writeLine
- key-format.ts
- initial-project.e2e-spec.ts
- server-errors.spec.ts
- log-level-warn.spec.ts
- development-secrets.spec.ts
- ProjectCreateCommand
- cli.module.ts
- migrate-mode.e2e-spec.ts
- visitor-session.controller.ts
- test-secrets.ts
- audit-log.e2e-spec.ts
- request-id.spec.ts
- origin.commands.ts
- participant.entity.spec.ts
- main.ts
- encryption.service.spec.ts
- replica-cache-sync.e2e-spec.ts
- conversation.entity.spec.ts
- config-startup.e2e-spec.ts
- ref_node_crypto
- server-protocol.e2e-spec.ts
- ProjectsService
- OperationSteps
- replica-events-offline-redis.e2e-spec.ts
- audited-events.ts
- config.module.ts
- .canActivate
- body-limit.ts
- secret-rotation.ts
- health.module.ts
- DisabledOperators
- projects.service.ts
- workspace-check-types.e2e-spec.ts
- RequestContext
- key-cli.ts
- CreateChatTables1793215389271
- slow-operations.ts
- ioredis
- project-snapshot-cache.e2e-spec.ts
- zone.guard.spec.ts
- Message
- encryption-keys.schema.spec.ts
- SecretsReencryptionService
- api-keys-cache.e2e-spec.ts
- api-keys.service.ts
- log-redaction.e2e-spec.ts
- migrate.module.ts
- cli-mode.e2e-spec.ts
- zone-e2e-app.ts
- api-docs.spec.ts
- IdentityKeyAddCommand
- JsonObjectValidator
- StatusController
- findFreePort
- Zone
- operators.module.ts
- operator-commands.e2e-spec.ts
- identity-key-pem.ts
- ref_node_path
- operation-steps.ts
- project-cli.ts
- OperatorsService
- tokens.service.spec.ts
- domain-event-bus.spec.ts
- replica-events.e2e-spec.ts
- secrets-reencryption.service.ts
- operator-token.controller.ts
- log-settings.e2e-spec.ts
- test-database.ts
- TokensService
- body-limit.spec.ts
- security-headers.spec.ts
- api-exception.ts
- ServerErrorsProbeController
- health.e2e-spec.ts
- visitors.module.ts
- VisitorAuthGuard
- SlowProbeController
- Operator
- visitor-auth-guard.e2e-spec.ts
- project-list.command.ts
- api-keys.service.ts
- zod-serialization.spec.ts
- log-redaction.spec.ts
- packages-build.e2e-spec.ts
- database-options.ts
- http-error.filter.spec.ts
- ErrorProbeController
- KeyCreateCommand
- OperationStepsProbeController
- KeyRevokeCommand
- KeyListCommand
- InternalProbeController
- worker.module.ts
- operator-auth.guard.ts
- load-env.ts
- IdentityKeyRevokeCommand
- @nestjs/common
- visitor-guard-probe.ts
- .ready
- ZoneServers
- telemetry.interceptor.spec.ts
- TestTokenSigningConfigModule
- token-signing-keys.schema.spec.ts
- ProbeController

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 164 edges
2. `typeorm` - 68 edges
3. `Zone()` - 54 edges
4. `@nestjs/testing` - 51 edges
5. `Project` - 50 edges
6. `ProjectsService` - 48 edges
7. `useTestDatabase()` - 48 edges
8. `DomainEventBus` - 40 edges
9. `createProject()` - 39 edges
10. `@nestjs/config` - 33 edges

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

## Communities (163 total, 29 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.06
Nodes (16): columns(), expectedColumns, findColumn(), findRelation(), normalizeSql(), relations(), runMigration(), CreateProjects1793193549883 (+8 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "visitor-session-refresh.e2e-spec.ts"
Cohesion: 0.08
Nodes (34): VisitorSession, api(), createProjectWithPublicKey(), findAllSessions(), findFamilySessions(), findSessionByRefreshToken(), postVisitorSession(), postVisitorSessionRefresh() (+26 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (44): author, bin, sowa-chat, description, devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0 (+36 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "request-context.spec.ts"
Cohesion: 0.13
Nodes (8): OperatorProfile, IssueOperatorTokenInput, RequestContextModule, RequestOperator, RequestVisitor, ConsumerModule, ContextConsumer, OperatorRole

### Community 7 - "env.schema.ts"
Cohesion: 0.05
Nodes (29): checkEncryptionKeysInProduction(), checkInitialServerKey(), checkPrettyLogFormat(), checkPublicUrlInProduction(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), EnvObject, envObjectSchema (+21 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "protocol/src/index.ts"
Cohesion: 0.05
Nodes (36): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, defaultLimits, isAccepted() (+28 more)

### Community 10 - "environment-checks.service.ts"
Cohesion: 0.14
Nodes (20): environmentChecksConfig, CheckContext, CheckFinding, CheckLevel, CheckResult, EnvironmentCheck, EnvironmentCheckError, describeResult() (+12 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.04
Nodes (56): dependencies, @aws-sdk/client-s3@^3.1151.0, @aws-sdk/s3-request-presigner@^3.1151.0, bullmq@^6.3.15, cache-manager@^7.2.9, file-type@^22.1.1, helmet@^8.3.0, ioredis@^6.0.0 (+48 more)

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

### Community 22 - "redis-transport-options.ts"
Cohesion: 0.48
Nodes (5): parseDatabase(), parseUrl(), RedisConnectionOptions, redisTransportOptions(), stripIpv6Brackets()

### Community 23 - "operator-role.guard.spec.ts"
Cohesion: 0.14
Nodes (8): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey

### Community 24 - "typeorm"
Cohesion: 0.10
Nodes (14): channelColumns(), findColumn(), OperatorIdRow, Project, columns(), expectedColumns, findColumn(), findRelation() (+6 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.11
Nodes (6): OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand, OriginListCommand, OriginRemoveCommand

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.19
Nodes (10): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+2 more)

### Community 28 - ".create"
Cohesion: 0.14
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.06
Nodes (36): ColumnRow, ForeignKeyRow, IndexRow, tableNames, IndexRow, PlanRow, countRows(), createChannel() (+28 more)

### Community 32 - "replica-events.publisher.spec.ts"
Cohesion: 0.10
Nodes (16): cacheInvalidatedEventNames(), cacheInvalidate(), cacheInvalidateRule(), cacheInvalidateRules(), ReplicaEventMessage, replicaEventNames(), ReplicaEventRule, replicaEventRules (+8 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "DomainEventBus"
Cohesion: 0.12
Nodes (11): BusProbe, CacheInvalidationRule, LocalCacheInvalidation, apiKeyEvent, projectEvent, DomainEventBus, DomainEventHandler, DomainEventName (+3 more)

### Community 35 - "development-secrets-file.ts"
Cohesion: 0.14
Nodes (26): completeFile(), createFile(), createDevelopmentSecrets(), defaultDevelopmentSecretsDirectory, DevelopmentMainProject, DevelopmentSecrets, developmentSecretsFileName, developmentSecretsPath() (+18 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "ValidationProbeController"
Cohesion: 0.13
Nodes (5): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ValidationProbeController

### Community 38 - "main.ts"
Cohesion: 0.14
Nodes (18): pino-http@^11.0.0, createLogDestination(), logFileDescriptor(), LogDestination, LogDestination, stdoutModes, baseOptions(), createLoggerModule() (+10 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-probe.ts"
Cohesion: 0.14
Nodes (19): configureApiApp(), DependencyStatusBody, StatusBody, noStore(), useSecurityHeaders(), probeControllers, offlineDataSource, withOfflineDatabase() (+11 more)

### Community 41 - "operator-block-sync.e2e-spec.ts"
Cohesion: 0.12
Nodes (21): blockedOnAll(), BlockTarget, expectStatusOnAll(), issueOperator(), publishAll(), runCommand(), subscriberCounts(), waitForBlockedOnAll() (+13 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "operators.service.ts"
Cohesion: 0.10
Nodes (12): describeDisable(), describeEnable(), OperatorDisableCommand, OperatorEnableCommand, OperatorOptions, OperatorTokenClaims, operatorTokenClaimsSchema, ChangeOperatorBlockInput (+4 more)

### Community 47 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): base, base62Alphabet, encodeBase62(), changeBodyChar(), forgeWithValidChecksum(), getProbe(), replaceChar(), withKey() (+2 more)

### Community 48 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.24
Nodes (18): runCaptured(), runCliInProcess(), addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem(), identityKeyListHeader, listIdentityKeys() (+10 more)

### Community 49 - "Conversation"
Cohesion: 0.07
Nodes (21): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEvent, ConversationEventActorKind, conversationEventActorKinds (+13 more)

### Community 50 - "writeLine"
Cohesion: 0.10
Nodes (20): emptyCell, formatDate(), serverKeyOnceWarning, writeLine(), writeTable(), writeWarning(), toRow(), header (+12 more)

### Community 51 - "key-format.ts"
Cohesion: 0.13
Nodes (15): KeyGenerateCommand, KeyRevokeOptions, InvalidApiKeyError, toEvent(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62() (+7 more)

### Community 52 - "initial-project.e2e-spec.ts"
Cohesion: 0.10
Nodes (22): IssueApiKeyInput, CreatedProject, CreateProjectInput, apiKeyRows(), expectSingleProject(), projectCreatedRows(), Replica, columns (+14 more)

### Community 53 - "server-errors.spec.ts"
Cohesion: 0.16
Nodes (12): OperatorDisabledFilter, InvalidPublicKeyFilter, InvalidRefreshTokenFilter, OperatorDisabledError, InvalidPublicKeyError, ApiException, errorCodeOfStatus(), httpErrorResponse() (+4 more)

### Community 54 - "log-level-warn.spec.ts"
Cohesion: 0.23
Nodes (8): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe

### Community 55 - "development-secrets.spec.ts"
Cohesion: 0.17
Nodes (20): compileConfigModule(), compileInDevelopment(), allTestSecrets, createSecretsDirectory(), developmentEnvWithoutSecrets, developmentSource(), emptySecrets, fileMainProject (+12 more)

### Community 57 - "cli.module.ts"
Cohesion: 0.09
Nodes (14): ServerAuthModule, VisitorApiModule, databaseEntities, AppClsModule, AppConfigModule, DatabaseModule, typeOrmModules, EnvironmentChecksModule (+6 more)

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 59 - "visitor-session.controller.ts"
Cohesion: 0.21
Nodes (7): toVisitorSessionResponse(), VisitorSessionController, VisitorSessionRefreshRequestDto, VisitorSessionRequestDto, VisitorSessionResponseDto, VisitorSessionTokens, VisitorSessionResponse

### Community 60 - "test-secrets.ts"
Cohesion: 0.11
Nodes (31): registeredEncryptedFields, clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction (+23 more)

### Community 61 - "audit-log.e2e-spec.ts"
Cohesion: 0.08
Nodes (17): ActorKind, actorKinds, AuditLogEntry, AuditLogListener, eventValues, happened, personalValues, AuditLogRepository (+9 more)

### Community 62 - "request-id.spec.ts"
Cohesion: 0.24
Nodes (8): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, ProbeService, waitForRequestEntry()

### Community 63 - "origin.commands.ts"
Cohesion: 0.16
Nodes (14): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OriginOptions, ProjectOptions, removeOriginFrom(), ALLOWED_PROTOCOLS (+6 more)

### Community 64 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 65 - "main.ts"
Cohesion: 0.11
Nodes (22): @nestjs/microservices@^12.1.3, ApiModule, cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, connectReplicaEvents() (+14 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.09
Nodes (20): authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv, tag (+12 more)

### Community 67 - "replica-cache-sync.e2e-spec.ts"
Cohesion: 0.11
Nodes (19): OriginList, originLists, ChangeOriginInput, badOrigins, helpEntries, prefixes, expectStatusOnAll(), probeWithKey() (+11 more)

### Community 68 - "conversation.entity.spec.ts"
Cohesion: 0.16
Nodes (7): Channel, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.24
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "ref_node_crypto"
Cohesion: 0.22
Nodes (11): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+3 more)

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "ProjectsService"
Cohesion: 0.12
Nodes (5): ProjectSnapshot, toProjectSnapshot(), ProjectsRepository, prepareProject(), ProjectsService

### Community 73 - "OperationSteps"
Cohesion: 0.15
Nodes (3): DatabaseStepSubscriber, OperationStep, OperationSteps

### Community 74 - "replica-events-offline-redis.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): CapturedRun, stubRefusedRedis(), CliRunResult, MainProject, captureLogLines(), ChannelRecorder, ClosingRedisServer, LogCapture (+2 more)

### Community 75 - "audited-events.ts"
Cohesion: 0.11
Nodes (13): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+5 more)

### Community 76 - "config.module.ts"
Cohesion: 0.17
Nodes (18): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, developmentSecretsConfig, encryptionConfig (+10 more)

### Community 78 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 79 - "secret-rotation.ts"
Cohesion: 0.13
Nodes (28): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), firstTokenSigningKeyIds, GeneratedSecret, generatedSecrets (+20 more)

### Community 80 - "health.module.ts"
Cohesion: 0.13
Nodes (9): @nestjs/terminus@^12.1.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), DependencyStatus, StatusService (+1 more)

### Community 81 - "DisabledOperators"
Cohesion: 0.11
Nodes (10): DisabledOperators, DisabledOperatorsModule, OperatorReplicaEventsController, createDisabledOperators(), malformedPayloads, CacheInvalidateEvent, OperatorReplicaEvent, operatorReplicaEventSchema (+2 more)

### Community 82 - "projects.service.ts"
Cohesion: 0.18
Nodes (11): InvalidProjectNameError, NormalizedOrigins, ORIGINS_EVENTS, ProjectActorKind, ProjectAlreadyExistsError, ProjectNotFoundError, createProjectsServiceProbe(), issuedServerKey (+3 more)

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 85 - "key-cli.ts"
Cohesion: 0.33
Nodes (14): auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix(), listKeys(), revokeKey() (+6 more)

### Community 87 - "slow-operations.ts"
Cohesion: 0.11
Nodes (7): HttpMetrics, StepTimes, FinishedOperation, SlowOperationsModule, roundSteps(), SlowOperations, TelemetryInterceptor

### Community 88 - "ioredis"
Cohesion: 0.22
Nodes (7): closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 89 - "project-snapshot-cache.e2e-spec.ts"
Cohesion: 0.18
Nodes (14): apiKeyCacheKeys(), cacheInvalidationRules, projectCacheKeys(), apiKeyEvent, projectEvent, cacheKeys, apiKeyEvent, operatorBlockEvent (+6 more)

### Community 90 - "zone.guard.spec.ts"
Cohesion: 0.15
Nodes (17): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes (+9 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.29
Nodes (7): describeErrors(), key1, key1Bytes, key2, key2Bytes, parseKeys(), requiredEnv

### Community 94 - "api-keys-cache.e2e-spec.ts"
Cohesion: 0.07
Nodes (11): ApiKey, ApiKeyKind, apiKeyKinds, ApiKeysRepository, NewApiKey, CachedApiKey, IssuedApiKey, toSummary() (+3 more)

### Community 95 - "api-keys.service.ts"
Cohesion: 0.06
Nodes (16): header, IdentityKeyListCommand, IdentityKeyListOptions, KeyActorKind, IdentityKey, IdentityKeyAlgorithm, ParsedIdentityKey, IdentityKeysRepository (+8 more)

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.24
Nodes (10): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), parseLogLine() (+2 more)

### Community 97 - "migrate.module.ts"
Cohesion: 0.17
Nodes (5): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "zone-e2e-app.ts"
Cohesion: 0.13
Nodes (13): OperatorController(), DisabledProbeController, issueOperator(), issueOperator(), get(), getAs(), RolesProbeController, issueTestOperator() (+5 more)

### Community 100 - "api-docs.spec.ts"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 101 - "IdentityKeyAddCommand"
Cohesion: 0.21
Nodes (3): IdentityKeyAddCommand, IdentityKeyAddOptions, readPem()

### Community 102 - "JsonObjectValidator"
Cohesion: 0.28
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 104 - "findFreePort"
Cohesion: 0.16
Nodes (15): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), fetchStatus() (+7 more)

### Community 105 - "Zone"
Cohesion: 0.09
Nodes (13): prom-client@^15.1.3, ServerController(), NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController, BareController, MethodOnlyController (+5 more)

### Community 106 - "operators.module.ts"
Cohesion: 0.21
Nodes (4): OperatorAuthModule, ServerApiModule, OperatorsModule, TokensModule

### Community 107 - "operator-commands.e2e-spec.ts"
Cohesion: 0.25
Nodes (12): disabledAtOf(), setupOperator(), disabledAtOf(), helpEntries, setupOperator(), operatorActions, operatorBlockAuditRows(), operatorCommandArguments() (+4 more)

### Community 108 - "identity-key-pem.ts"
Cohesion: 0.27
Nodes (7): algorithmOf(), InvalidIdentityKeyError, isP256(), parseIdentityPublicKey(), readPublicKeyObject(), captureError(), expectInvalidKey()

### Community 109 - "ref_node_path"
Cohesion: 0.14
Nodes (8): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), databaseUrl(), IdentityRow, VersionRow, useTestRedis(), testEnv

### Community 110 - "operation-steps.ts"
Cohesion: 0.24
Nodes (9): useClsMiddleware(), echoRequestId(), resolveRequestId(), operationSteps, OperationTiming, beginOperation(), operationTimingKey, createE2eApp() (+1 more)

### Community 111 - "project-cli.ts"
Cohesion: 0.28
Nodes (8): buildServer(), fullOriginArguments, listHeader, onceWarning, repositoryRoot, runMainCli(), serverDirectory, uuidPattern

### Community 112 - "OperatorsService"
Cohesion: 0.08
Nodes (11): Probe, OperatorsRepository, OperatorNotFoundError, OperatorsService, blockInput, BlockProbe, createBlockProbe(), input (+3 more)

### Community 115 - "tokens.service.spec.ts"
Cohesion: 0.13
Nodes (27): getProbe(), withToken(), encodePart(), flipSignatureBit(), ForgedTokenInput, forgeToken(), forgeUnsecuredToken(), parseTestSigningKeys() (+19 more)

### Community 120 - "domain-event-bus.spec.ts"
Cohesion: 0.29
Nodes (7): happened, TestListener, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 121 - "replica-events.e2e-spec.ts"
Cohesion: 0.29
Nodes (10): expectCachedOnAll(), expectKept(), repositoryRoot, seed(), waitUntilDeleted(), cacheInvalidateSubscribers(), cacheOf(), publishCacheInvalidate() (+2 more)

### Community 122 - "secrets-reencryption.service.ts"
Cohesion: 0.12
Nodes (14): CryptoModule, encryptedFields, SecretsReencryptionModule, BatchResult, FieldReencryption, FieldResult, FieldVersionCount, ReencryptInput (+6 more)

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.27
Nodes (5): nestjs-zod@^5.5.0, OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, nestjs-zod

### Community 124 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 125 - "test-database.ts"
Cohesion: 0.10
Nodes (23): identityKeyAlgorithms, WorkerModule, issueServerKey(), expectNoKeyRows(), expectNoRows(), addKey(), ColumnRow, expectedColumns (+15 more)

### Community 126 - "TokensService"
Cohesion: 0.13
Nodes (8): TokenSigningKey, SignedToken, SignTokenInput, TokenConsumer, TokenAudience, tokenAudiences, TokensService, VerifiedToken

### Community 128 - "security-headers.spec.ts"
Cohesion: 0.21
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 129 - "api-exception.ts"
Cohesion: 0.18
Nodes (11): ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ErrorCode, errorCodes, errorDetailSchema, ErrorResponse (+3 more)

### Community 130 - "ServerErrorsProbeController"
Cohesion: 0.16
Nodes (9): internalErrorMessage, ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, ServerErrorsProbeController, stringsInside() (+1 more)

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 132 - "visitors.module.ts"
Cohesion: 0.09
Nodes (4): VisitorSessionsRepository, InvalidRefreshTokenError, VisitorSessionsService, VisitorsRepository

### Community 134 - "SlowProbeController"
Cohesion: 0.22
Nodes (4): LogEntry, pause(), SlowProbeController, supertest

### Community 135 - "Operator"
Cohesion: 0.15
Nodes (4): Operator, createProjectWithKey(), internalAgent(), postToken()

### Community 136 - "visitor-auth-guard.e2e-spec.ts"
Cohesion: 0.25
Nodes (5): VisitorAuthModule, waitMs(), getProbe(), IssuedVisitor, withToken()

### Community 137 - "project-list.command.ts"
Cohesion: 0.28
Nodes (4): formatOrigins(), header, ProjectListCommand, toRow()

### Community 138 - "api-keys.service.ts"
Cohesion: 0.13
Nodes (10): KeyCreateOptions, ApiKeysService, hashMatches(), IssueApiKeyBaseInput, keyTypeByKind, RevokeApiKeyInput, toCachedApiKey(), VerifiedApiKey (+2 more)

### Community 139 - "zod-serialization.spec.ts"
Cohesion: 0.22
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, redirectLogsTo()

### Community 140 - "log-redaction.spec.ts"
Cohesion: 0.18
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 141 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 142 - "database-options.ts"
Cohesion: 0.10
Nodes (18): database, loadDataSource(), DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createTypeOrmModule(), getTypeOrmModule() (+10 more)

### Community 143 - "http-error.filter.spec.ts"
Cohesion: 0.17
Nodes (5): HttpErrorFilter, responseZodErrorOf(), knownKeys, ProbeBodyDto, requestIdHeader

### Community 149 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 150 - "worker.module.ts"
Cohesion: 0.13
Nodes (9): project, snapshot, AppCacheModule, cacheTtlMs, CacheInvalidateController, cacheInvalidateEventSchema, ReplicaEventsModule, cache-manager (+1 more)

### Community 151 - "operator-auth.guard.ts"
Cohesion: 0.30
Nodes (4): VisitorTokenClaims, visitorTokenClaimsSchema, bearerToken(), FakeRequestInput

### Community 152 - "load-env.ts"
Cohesion: 0.50
Nodes (4): loadFromProcessEnv(), Env, exportToProcessEnv(), loadEnv()

### Community 154 - "@nestjs/common"
Cohesion: 0.14
Nodes (13): ProjectsModule, initialProjectLockName, NewProject, ORIGIN_COLUMNS, OriginsRow, generateRefreshToken(), NewVisitorSession, RefreshExchange (+5 more)

### Community 155 - "visitor-guard-probe.ts"
Cohesion: 0.38
Nodes (3): VisitorController(), VisitorGuardProbeController, visitorProbePath

### Community 157 - "ZoneServers"
Cohesion: 0.29
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 158 - "telemetry.interceptor.spec.ts"
Cohesion: 0.14
Nodes (5): readMetricLines(), TelemetryProbeController, zoneUrl(), ZoneProbeApp, @nestjs/core

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1094 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `security-headers.spec.ts`, `api-exception.ts`, `ServerErrorsProbeController`, `devDependencies`, `request-context.spec.ts`, `SlowProbeController`, `project-list.command.ts`, `api-keys.service.ts`, `environment-checks.service.ts`, `zod-serialization.spec.ts`, `dependencies`, `log-redaction.spec.ts`, `http-error.filter.spec.ts`, `worker.module.ts`, `operator-role.guard.spec.ts`, `operator-auth.guard.ts`, `IdentityKeyRevokeCommand`, `typeorm`, `visitor-guard-probe.ts`, `telemetry.interceptor.spec.ts`, `replica-events.publisher.spec.ts`, `zone.guard.spec.ts`, `DomainEventBus`, `ValidationProbeController`, `main.ts`, `zone-probe.ts`, `operator-block-sync.e2e-spec.ts`, `operators.service.ts`, `server-key-guard.e2e-spec.ts`, `writeLine`, `key-format.ts`, `server-errors.spec.ts`, `log-level-warn.spec.ts`, `cli.module.ts`, `visitor-session.controller.ts`, `audit-log.e2e-spec.ts`, `request-id.spec.ts`, `origin.commands.ts`, `main.ts`, `encryption.service.spec.ts`, `replica-cache-sync.e2e-spec.ts`, `OperationSteps`, `config.module.ts`, `body-limit.ts`, `health.module.ts`, `DisabledOperators`, `projects.service.ts`, `slow-operations.ts`, `ioredis`, `zone.guard.spec.ts`, `api-keys-cache.e2e-spec.ts`, `api-keys.service.ts`, `migrate.module.ts`, `zone-e2e-app.ts`, `api-docs.spec.ts`, `IdentityKeyAddCommand`, `Zone`, `operators.module.ts`, `operation-steps.ts`, `tokens.service.spec.ts`, `domain-event-bus.spec.ts`, `replica-events.e2e-spec.ts`, `secrets-reencryption.service.ts`, `operator-token.controller.ts`, `test-database.ts`, `TokensService`, `body-limit.spec.ts`?**
  _High betweenness centrality (0.225) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.058279370952821465 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `typeorm`, `visitor-session-refresh.e2e-spec.ts`, `devDependencies`, `environment-checks.service.ts`, `dependencies`, `database-options.ts`, `@nestjs/common`, `chat-tables.e2e-spec.ts`, `operator-block-sync.e2e-spec.ts`, `Conversation`, `initial-project.e2e-spec.ts`, `migrate-mode.e2e-spec.ts`, `test-secrets.ts`, `participant.entity.spec.ts`, `replica-cache-sync.e2e-spec.ts`, `conversation.entity.spec.ts`, `OperationSteps`, `key-cli.ts`, `CreateChatTables1793215389271`, `Message`, `api-keys-cache.e2e-spec.ts`, `zone-e2e-app.ts`, `findFreePort`, `operator-commands.e2e-spec.ts`, `ref_node_path`, `operation-steps.ts`, `test-database.ts`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Project` connect `typeorm` to `visitor-session-refresh.e2e-spec.ts`, `visitors.module.ts`, `Operator`, `project-list.command.ts`, `@nestjs/common`, `.create`, `chat-tables.e2e-spec.ts`, `operator-block-sync.e2e-spec.ts`, `Conversation`, `initial-project.e2e-spec.ts`, `audit-log.e2e-spec.ts`, `origin.commands.ts`, `replica-cache-sync.e2e-spec.ts`, `conversation.entity.spec.ts`, `ProjectsService`, `projects.service.ts`, `api-keys-cache.e2e-spec.ts`, `api-keys.service.ts`, `test-database.ts`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Should `visitor-session-refresh.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07619738751814223 - nodes in this community are weakly interconnected._