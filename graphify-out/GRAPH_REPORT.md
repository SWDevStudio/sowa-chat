# Graph Report - hector-chat-epic-11  (2026-10-29)

## Corpus Check
- 456 files · ~117,469 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .log 1)

## Summary
- 3149 nodes · 7868 edges · 154 communities (121 shown, 33 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 202 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b7eaf397`
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
- operator-role.guard.spec.ts
- JsonObject
- scripts
- origin.commands.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- domain-events.ts
- zone.guard.spec.ts
- ConversationEvent
- development-secrets-file.ts
- tsconfig.build.json
- ValidationProbeController
- main.ts
- nest-cli.json
- zone-probe.ts
- DomainEventBus
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- ProjectsService
- RedactionProbeController
- server-key-guard.e2e-spec.ts
- identity-key-commands.e2e-spec.ts
- Conversation
- cli.module.ts
- development-secrets.spec.ts
- initial-project.e2e-spec.ts
- server-errors.spec.ts
- log-level-warn.spec.ts
- database-entities.ts
- ProjectCreateCommand
- ZoneProbeApp
- migrate-mode.e2e-spec.ts
- visitor-session.controller.ts
- test-secrets.ts
- audit-log.e2e-spec.ts
- request-id.spec.ts
- visitor-session.entity.spec.ts
- participant.entity.spec.ts
- ref_node_crypto
- encryption.service.spec.ts
- replica-cache-sync.e2e-spec.ts
- conversation.entity.spec.ts
- config-startup.e2e-spec.ts
- identity-keys.service.ts
- server-protocol.e2e-spec.ts
- projects.service.ts
- OperationSteps
- replica-events-offline-redis.e2e-spec.ts
- ref_vitest
- config.module.ts
- DisabledOperators
- body-limit.ts
- secret-rotation.ts
- health.module.ts
- operator-replica-events.controller.spec.ts
- secrets-reencrypt-command.e2e-spec.ts
- workspace-check-types.e2e-spec.ts
- RequestContext
- key-cli.ts
- CreateChatTables1793215389271
- audited-events.spec.ts
- ioredis
- secrets-reencrypt.command.ts
- zone.decorator.ts
- Message
- encryption-keys.schema.spec.ts
- SecretsReencryptionService
- api-keys.service.ts
- .publish
- log-redaction.e2e-spec.ts
- database.module.ts
- cli-mode.e2e-spec.ts
- operators.service.ts
- api-docs.spec.ts
- IdentityKeyAddCommand
- JsonObjectValidator
- identity-keys.e2e-spec.ts
- operators.service.spec.ts
- Zone
- operators.module.ts
- operator-commands.e2e-spec.ts
- identity-key-pem.ts
- redis-connection.e2e-spec.ts
- server/package.json
- project-cli.ts
- Operator
- tokens.service.spec.ts
- DomainEventBus
- replica-events.e2e-spec.ts
- secrets-reencryption.service.ts
- operator-token.controller.ts
- log-settings.e2e-spec.ts
- createProject
- OperatorsRepository
- body-limit.spec.ts
- AuditScenarios
- token-signing-keys.schema.ts
- ServerErrorsProbeController
- health.e2e-spec.ts
- visitors.module.ts
- env.schema.spec.ts
- SlowProbeController
- encrypted-secret.spec.ts
- @aws-sdk/client-s3@^3.1151.0
- @aws-sdk/s3-request-presigner@^3.1151.0
- Message
- zod-serialization.spec.ts
- OperatorsService
- zod@catalog:
- global-setup.ts
- cls-middleware.ts
- ErrorProbeController
- env.schema.logging.spec.ts
- OperationStepsProbeController
- helmet
- @nestjs/platform-socket.io@^12.1.3
- bullmq@^6.3.15
- @nestjs/common
- @sowa-chat/protocol@workspace:*
- dependency-cruiser@^18.6.0
- source-map-support@^0.5.21

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
10. `findFreePort()` - 33 edges

## Surprising Connections (you probably didn't know these)
- `RequestOperator` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/infra/request-context/request-context.ts → packages/protocol/src/operator-role.ts
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `ConversationEvent` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation-event.entity.ts → packages/protocol/src/json-types.ts
- `Conversation` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation.entity.ts → packages/protocol/src/json-types.ts
- `Message` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/message.entity.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (154 total, 33 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.09
Nodes (10): DatabaseMigration, CreateProjects1793193549883, CreateAuditLog1793200000000, AddConversationIndexes1793215983154, CreateApiKeys1793300000000, CreateIdentityKeys1793300001000, AddProjectsPublicKey1793300002000, AddProjectsOperatorAllowedOrigins1793300003000 (+2 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "visitor-session-refresh.e2e-spec.ts"
Cohesion: 0.06
Nodes (55): blockedOnAll(), BlockTarget, expectStatusOnAll(), issueOperator(), publishAll(), subscriberCounts(), waitForBlockedOnAll(), waitForStatusOnAll() (+47 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, supertest@^7.0.0, testcontainers@^12.2.1 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "request-context.spec.ts"
Cohesion: 0.18
Nodes (3): RequestContextModule, ConsumerModule, ContextConsumer

### Community 7 - "env.schema.ts"
Cohesion: 0.11
Nodes (18): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), EnvObject, envObjectSchema, envSchema, findPortWithSameValue() (+10 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "protocol/src/index.ts"
Cohesion: 0.13
Nodes (20): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, operatorRoles, OperatorTokenRequest (+12 more)

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
Cohesion: 0.07
Nodes (29): dependencies, cache-manager@^7.2.9, file-type@^22.1.1, jose@^6.2.12, nest-commander@^3.21.0, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/cache-manager@^12.0.1, @nestjs-cls/transactional@^4.0.1 (+21 more)

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
Cohesion: 0.13
Nodes (12): ReplicaEventMessage, replicaEventNames(), errorMessage(), ReplicaEventsPublisherModule, replicaPublishConnectTimeoutMs, replicaEventsClient, ReplicaEventsPublisher, replicaPublishTimeoutMs (+4 more)

### Community 23 - "operator-role.guard.spec.ts"
Cohesion: 0.14
Nodes (8): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey

### Community 24 - "JsonObject"
Cohesion: 0.17
Nodes (8): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns, JsonObject

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.09
Nodes (14): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand (+6 more)

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
Nodes (28): ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation(), createMessage() (+20 more)

### Community 32 - "domain-events.ts"
Cohesion: 0.16
Nodes (18): apiKeyCacheKeys(), cacheInvalidatedEventNames(), cacheInvalidationRules, projectCacheKeys(), apiKeyEvent, projectEvent, cacheInvalidate(), cacheInvalidateRule() (+10 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "development-secrets-file.ts"
Cohesion: 0.16
Nodes (24): completeFile(), createFile(), createDevelopmentSecrets(), defaultDevelopmentSecretsDirectory, DevelopmentMainProject, DevelopmentSecrets, developmentSecretsFileName, developmentSecretsSchema (+16 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "main.ts"
Cohesion: 0.11
Nodes (23): createLogDestination(), logFileDescriptor(), LogDestination, LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions() (+15 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-probe.ts"
Cohesion: 0.07
Nodes (36): @nestjs/typeorm@^12.0.2, configureApiApp(), DependencyStatusBody, StatusBody, noStore(), useSecurityHeaders(), findZonePorts(), probeControllers (+28 more)

### Community 41 - "DomainEventBus"
Cohesion: 0.19
Nodes (6): CacheInvalidationRule, LocalCacheInvalidation, DomainEventBus, DomainEventHandler, DomainEventName, DomainEvents

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "ProjectsService"
Cohesion: 0.09
Nodes (10): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl(), InvalidProjectNameError, prepareProject() (+2 more)

### Community 46 - "RedactionProbeController"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 47 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): base, base62Alphabet, encodeBase62(), changeBodyChar(), forgeWithValidChecksum(), getProbe(), replaceChar(), withKey() (+2 more)

### Community 48 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.23
Nodes (19): runCaptured(), runCliInProcess(), addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem(), identityKeyListHeader, listIdentityKeys() (+11 more)

### Community 49 - "Conversation"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 50 - "cli.module.ts"
Cohesion: 0.04
Nodes (36): emptyCell, formatDate(), serverKeyOnceWarning, writeLine(), writeTable(), writeWarning(), IdentityKeyAddOptions, readPem() (+28 more)

### Community 51 - "development-secrets.spec.ts"
Cohesion: 0.15
Nodes (23): developmentSecretsPath(), loadFromProcessEnv(), Env, exportToProcessEnv(), loadEnv(), allTestSecrets, createSecretsDirectory(), developmentEnvWithoutSecrets (+15 more)

### Community 52 - "initial-project.e2e-spec.ts"
Cohesion: 0.09
Nodes (25): IssueApiKeyInput, ProjectsModule, CreatedProject, CreateProjectInput, WorkerModule, apiKeyRows(), expectSingleProject(), projectCreatedRows() (+17 more)

### Community 53 - "server-errors.spec.ts"
Cohesion: 0.06
Nodes (35): OperatorDisabledFilter, InvalidPublicKeyFilter, InvalidRefreshTokenFilter, OperatorDisabledError, InvalidPublicKeyError, ApiException, ApiExceptionInput, errorCodeStatuses (+27 more)

### Community 54 - "log-level-warn.spec.ts"
Cohesion: 0.14
Nodes (10): LogEntry, hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath (+2 more)

### Community 55 - "database-entities.ts"
Cohesion: 0.11
Nodes (6): database, loadDataSource(), databaseEntities, Visitor, VisitorSession, NewVisitorSession

### Community 57 - "ZoneProbeApp"
Cohesion: 0.20
Nodes (3): MetricsController, MetricsModule, prom-client

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.16
Nodes (13): pg@^8.23.1, BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult (+5 more)

### Community 59 - "visitor-session.controller.ts"
Cohesion: 0.24
Nodes (6): toVisitorSessionResponse(), VisitorSessionRefreshRequestDto, VisitorSessionRequestDto, VisitorSessionResponseDto, VisitorSessionTokens, VisitorSessionResponse

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "audit-log.e2e-spec.ts"
Cohesion: 0.11
Nodes (13): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditModule, auditedEventNames(), AuditRule (+5 more)

### Community 62 - "request-id.spec.ts"
Cohesion: 0.15
Nodes (10): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+2 more)

### Community 63 - "visitor-session.entity.spec.ts"
Cohesion: 0.14
Nodes (9): columns(), expectedColumns, findColumn(), findRelation(), normalizeSql(), relations(), runMigration(), CreateOperators1793300003000 (+1 more)

### Community 64 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 65 - "ref_node_crypto"
Cohesion: 0.33
Nodes (7): firstTokenSigningKeyIds, GeneratedSecret, generatedSecrets, SecretsMode, generateEncryptionKeyEntry(), generateTokenSigningKeyEntry(), minimalEnv

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.11
Nodes (15): EncryptionKey, CryptoModule, authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService (+7 more)

### Community 67 - "replica-cache-sync.e2e-spec.ts"
Cohesion: 0.13
Nodes (16): badOrigins, helpEntries, prefixes, expectCachedOnAll(), expectStatusOnAll(), probeWithKey(), ReplicaProbeController, addOrigins() (+8 more)

### Community 68 - "conversation.entity.spec.ts"
Cohesion: 0.16
Nodes (7): Channel, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "identity-keys.service.ts"
Cohesion: 0.16
Nodes (8): KeyActorKind, IdentityKey, IdentityKeyAlgorithm, ParsedIdentityKey, NewIdentityKey, AddedIdentityKey, AddIdentityKeyInput, RevokeIdentityKeyInput

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "projects.service.ts"
Cohesion: 0.06
Nodes (28): channelColumns(), findColumn(), OriginList, originLists, Project, ProjectSnapshot, toProjectSnapshot(), initialProjectLockName (+20 more)

### Community 73 - "OperationSteps"
Cohesion: 0.16
Nodes (8): nestjs-cls@^7.0.1, DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, beginOperation(), operationTimingKey, nestjs-cls

### Community 74 - "replica-events-offline-redis.e2e-spec.ts"
Cohesion: 0.14
Nodes (15): cliName, commanderArgv(), runCliCommand(), startupLogLevels, runCli(), CapturedRun, stubRefusedRedis(), CliRunResult (+7 more)

### Community 75 - "ref_vitest"
Cohesion: 0.32
Nodes (5): columns(), expectedColumns, findColumn(), findRelation(), relations()

### Community 76 - "config.module.ts"
Cohesion: 0.07
Nodes (34): appConfig, compileConfigModule(), compileInDevelopment(), compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig (+26 more)

### Community 77 - "DisabledOperators"
Cohesion: 0.17
Nodes (5): DisabledOperators, BusProbe, Probe, createDisabledOperators(), OperatorBlockEvent

### Community 78 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 79 - "secret-rotation.ts"
Cohesion: 0.29
Nodes (11): nextTokenSigningKeyId(), parseVariable(), requireConfiguredValue(), rotateConfiguredSecrets(), rotateEncryptionKeys(), rotateSecrets(), rotateTokenSigningKeys(), Source (+3 more)

### Community 80 - "health.module.ts"
Cohesion: 0.08
Nodes (12): @nestjs/terminus@^12.1.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+4 more)

### Community 81 - "operator-replica-events.controller.spec.ts"
Cohesion: 0.18
Nodes (6): OperatorReplicaEventsController, malformedPayloads, CacheInvalidateEvent, OperatorReplicaEvent, operatorReplicaEventSchema, replicaEventPatterns

### Community 82 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "RequestContext"
Cohesion: 0.06
Nodes (14): OperatorAuthGuard, ServerKeyGuard, VisitorAuthGuard, VisitorController(), VisitorTokenClaims, visitorTokenClaimsSchema, bearerToken(), FakeRequestInput (+6 more)

### Community 85 - "key-cli.ts"
Cohesion: 0.36
Nodes (13): auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix(), listKeys(), revokeKey() (+5 more)

### Community 87 - "audited-events.spec.ts"
Cohesion: 0.11
Nodes (13): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+5 more)

### Community 88 - "ioredis"
Cohesion: 0.20
Nodes (8): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 89 - "secrets-reencrypt.command.ts"
Cohesion: 0.15
Nodes (11): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+3 more)

### Community 90 - "zone.decorator.ts"
Cohesion: 0.06
Nodes (30): probeControllers, HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs() (+22 more)

### Community 91 - "Message"
Cohesion: 0.27
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.23
Nodes (11): encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes, key2 (+3 more)

### Community 94 - "api-keys.service.ts"
Cohesion: 0.05
Nodes (45): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey, ApiKeysService, CachedApiKey, hashMatches(), InvalidApiKeyError (+37 more)

### Community 95 - ".publish"
Cohesion: 0.13
Nodes (4): IdentityKeysRepository, IdentityKeyKidTakenError, InvalidIdentityKeyIdError, toEvent()

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 97 - "database.module.ts"
Cohesion: 0.18
Nodes (11): databaseMigrations, migrationFiles, migrationsDirectory, createTypeOrmModule(), getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection (+3 more)

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "operators.service.ts"
Cohesion: 0.10
Nodes (19): OperatorController(), OperatorTokenClaims, operatorTokenClaimsSchema, OperatorIdRow, OperatorProfile, ChangeOperatorBlockInput, IssuedOperatorToken, IssueOperatorTokenInput (+11 more)

### Community 100 - "api-docs.spec.ts"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 102 - "JsonObjectValidator"
Cohesion: 0.08
Nodes (18): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+10 more)

### Community 103 - "identity-keys.e2e-spec.ts"
Cohesion: 0.24
Nodes (9): expectNoKeyRows(), expectNoRows(), addKey(), blockAuditRows(), blockMethods, createOperator(), auditRows(), auditRowsByAction() (+1 more)

### Community 104 - "operators.service.spec.ts"
Cohesion: 0.16
Nodes (9): OperatorNotFoundError, operatorTokenTtlSeconds, blockInput, BlockProbe, createBlockProbe(), input, Probe, signedToken (+1 more)

### Community 105 - "Zone"
Cohesion: 0.05
Nodes (23): ServerController(), NeutralProbeController, SecondVersionProbeController, VersionedProbeController, VisitorSessionController, InternalProbeController, ManagementProbeController, OperatorProbeController (+15 more)

### Community 106 - "operators.module.ts"
Cohesion: 0.19
Nodes (5): OperatorAuthModule, ServerApiModule, DisabledOperatorsModule, OperatorsModule, TokensModule

### Community 107 - "operator-commands.e2e-spec.ts"
Cohesion: 0.18
Nodes (15): CliModule, runCommand(), disabledAtOf(), setupOperator(), disabledAtOf(), helpEntries, setupOperator(), OperatorAction (+7 more)

### Community 108 - "identity-key-pem.ts"
Cohesion: 0.27
Nodes (7): algorithmOf(), InvalidIdentityKeyError, isP256(), parseIdentityPublicKey(), readPublicKeyObject(), captureError(), expectInvalidKey()

### Community 109 - "redis-connection.e2e-spec.ts"
Cohesion: 0.09
Nodes (16): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, builtFiles, CommandResult, entriesByPackage, plannedBuildTasks() (+8 more)

### Community 110 - "server/package.json"
Cohesion: 0.09
Nodes (21): author, bin, sowa-chat, @nestjs/bullmq@^12.0.0, @nestjs/websockets@^12.1.3, pino-http@^11.0.0, sharp@^0.35.5, socket.io@^4.8.4 (+13 more)

### Community 111 - "project-cli.ts"
Cohesion: 0.28
Nodes (8): buildServer(), fullOriginArguments, listHeader, onceWarning, repositoryRoot, runMainCli(), serverDirectory, uuidPattern

### Community 115 - "tokens.service.spec.ts"
Cohesion: 0.06
Nodes (45): VisitorAuthModule, TokenSigningKey, SignedToken, SignTokenInput, ConsumerModule, TestTokenSigningConfigModule, TokenConsumer, TokenAudience (+37 more)

### Community 120 - "DomainEventBus"
Cohesion: 0.47
Nodes (3): TestListener, OnDomainEvent(), TestIgnoredEvent

### Community 121 - "replica-events.e2e-spec.ts"
Cohesion: 0.33
Nodes (9): expectKept(), repositoryRoot, seed(), waitUntilDeleted(), cacheInvalidateSubscribers(), cacheOf(), publishCacheInvalidate(), publishRawCacheInvalidate() (+1 more)

### Community 122 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldResult, ReencryptInput, reencryptionBatchSize, ReencryptionReport (+3 more)

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.18
Nodes (5): OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, OperatorTokenResponse, nestjs-zod

### Community 124 - "log-settings.e2e-spec.ts"
Cohesion: 0.12
Nodes (20): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+12 more)

### Community 125 - "createProject"
Cohesion: 0.07
Nodes (27): apiKeyKinds, identityKeyAlgorithms, issueServerKey(), ColumnRow, expectedColumns, IndexRow, PlanRow, ColumnRow (+19 more)

### Community 128 - "AuditScenarios"
Cohesion: 0.29
Nodes (3): AuditScenarios, happenedIn(), ScenarioError

### Community 129 - "token-signing-keys.schema.ts"
Cohesion: 0.29
Nodes (6): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, tokenSigningKeysSchema

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 132 - "visitors.module.ts"
Cohesion: 0.09
Nodes (5): VisitorSessionsRepository, InvalidRefreshTokenError, VisitorSessionsService, VisitorsModule, VisitorsRepository

### Community 135 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 139 - "zod-serialization.spec.ts"
Cohesion: 0.22
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, redirectLogsTo()

### Community 142 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 143 - "cls-middleware.ts"
Cohesion: 0.39
Nodes (5): ApiModule, useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp()

### Community 145 - "env.schema.logging.spec.ts"
Cohesion: 0.33
Nodes (3): Env, logLevels, requiredEnv

### Community 150 - "@nestjs/common"
Cohesion: 0.06
Nodes (22): ServerAuthModule, VisitorApiModule, AppCacheModule, cacheTtlMs, apiKeyEvent, projectEvent, AppClsModule, AppConfigModule (+14 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1085 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `visitor-session-refresh.e2e-spec.ts`, `visitors.module.ts`, `request-context.spec.ts`, `environment-checks.service.ts`, `zod-serialization.spec.ts`, `dependencies`, `cls-middleware.ts`, `replica-events.publisher.spec.ts`, `operator-role.guard.spec.ts`, `JsonObject`, `origin.commands.ts`, `zone.guard.spec.ts`, `main.ts`, `zone-probe.ts`, `DomainEventBus`, `RedactionProbeController`, `server-key-guard.e2e-spec.ts`, `cli.module.ts`, `initial-project.e2e-spec.ts`, `server-errors.spec.ts`, `log-level-warn.spec.ts`, `database-entities.ts`, `ZoneProbeApp`, `visitor-session.controller.ts`, `audit-log.e2e-spec.ts`, `request-id.spec.ts`, `encryption.service.spec.ts`, `replica-cache-sync.e2e-spec.ts`, `identity-keys.service.ts`, `projects.service.ts`, `OperationSteps`, `replica-events-offline-redis.e2e-spec.ts`, `config.module.ts`, `body-limit.ts`, `health.module.ts`, `operator-replica-events.controller.spec.ts`, `RequestContext`, `ioredis`, `secrets-reencrypt.command.ts`, `zone.decorator.ts`, `api-keys.service.ts`, `database.module.ts`, `operators.service.ts`, `api-docs.spec.ts`, `Zone`, `operators.module.ts`, `server/package.json`, `tokens.service.spec.ts`, `replica-events.e2e-spec.ts`, `secrets-reencryption.service.ts`, `operator-token.controller.ts`, `createProject`, `body-limit.spec.ts`?**
  _High betweenness centrality (0.227) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.0928030303030303 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `visitor-session-refresh.e2e-spec.ts`, `environment-checks.service.ts`, `dependencies`, `JsonObject`, `chat-tables.e2e-spec.ts`, `ConversationEvent`, `zone-probe.ts`, `Conversation`, `initial-project.e2e-spec.ts`, `database-entities.ts`, `migrate-mode.e2e-spec.ts`, `test-secrets.ts`, `visitor-session.entity.spec.ts`, `participant.entity.spec.ts`, `replica-cache-sync.e2e-spec.ts`, `conversation.entity.spec.ts`, `identity-keys.service.ts`, `projects.service.ts`, `OperationSteps`, `ref_vitest`, `secrets-reencrypt-command.e2e-spec.ts`, `key-cli.ts`, `CreateChatTables1793215389271`, `Message`, `api-keys.service.ts`, `database.module.ts`, `operators.service.ts`, `identity-keys.e2e-spec.ts`, `operator-commands.e2e-spec.ts`, `redis-connection.e2e-spec.ts`, `server/package.json`, `createProject`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Project` connect `projects.service.ts` to `typeorm`, `visitor-session-refresh.e2e-spec.ts`, `JsonObject`, `.create`, `chat-tables.e2e-spec.ts`, `ProjectsService`, `Conversation`, `cli.module.ts`, `initial-project.e2e-spec.ts`, `database-entities.ts`, `audit-log.e2e-spec.ts`, `replica-cache-sync.e2e-spec.ts`, `conversation.entity.spec.ts`, `identity-keys.service.ts`, `ref_vitest`, `api-keys.service.ts`, `operators.service.ts`, `Operator`, `createProject`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Should `visitor-session-refresh.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05593607305936073 - nodes in this community are weakly interconnected._