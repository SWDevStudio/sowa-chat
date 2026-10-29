# Graph Report - hector-chat-epic-11  (2026-10-29)

## Corpus Check
- 370 files · ~89,380 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2610 nodes · 6050 edges · 157 communities (116 shown, 41 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 147 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dddd0ee9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- operator-auth-guard.e2e-spec.ts
- env.schema.ts
- compilerOptions
- HttpMetrics
- config.module.ts
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
- http-error.filter.spec.ts
- RequestContext
- AuditLogEntry
- scripts
- origin.commands.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- key-format.ts
- zone.guard.spec.ts
- ConversationEvent
- development-secrets-file.ts
- tsconfig.build.json
- ValidationProbeController
- config.module.ts
- nest-cli.json
- zone-probe.ts
- @nestjs/common
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- identity-keys-table.e2e-spec.ts
- RedactionProbeController
- api-keys-service-probe.ts
- identity-key-commands.e2e-spec.ts
- projects.service.spec.ts
- cli.module.ts
- database-connection.e2e-spec.ts
- project-origins.e2e-spec.ts
- operator-auth.guard.ts
- protocol/src/index.ts
- Project
- ProjectCreateCommand
- .probe
- migrate-mode.e2e-spec.ts
- identity-key-list.command.ts
- test-secrets.ts
- worker.module.ts
- request-id.spec.ts
- KeyCreateCommand
- environment-check.ts
- ref_node_crypto
- encryption.service.spec.ts
- origin-cli.ts
- .publish
- config-startup.e2e-spec.ts
- .publish
- server-protocol.e2e-spec.ts
- projects.service.ts
- OperationSteps
- api-versioning.spec.ts
- InternalProbeController
- Conversation
- operators.module.ts
- cls-middleware.ts
- identity-keys.service.ts
- health.module.ts
- operators.repository.ts
- .getByName
- workspace-check-types.e2e-spec.ts
- operators.service.ts
- key-cli.ts
- CreateChatTables1793215389271
- audited-events.spec.ts
- secrets-reencrypt-command.e2e-spec.ts
- secrets-reencryption.service.ts
- zone.ts
- Message
- encryption-keys.schema.spec.ts
- SecretsReencryptionService
- ApiKey
- redis.module.ts
- log-redaction.e2e-spec.ts
- database-entities.ts
- cli-mode.e2e-spec.ts
- operator-auth-guard.e2e-spec.ts
- json-object-limits.spec.ts
- IdentityKeyAddCommand
- JsonObjectValidator
- slow-operations.ts
- log-redaction.spec.ts
- Zone
- cli.module.ts
- IdentityKey
- environment-checks.service.ts
- redis-connection.e2e-spec.ts
- server/package.json
- identity-key-pem.ts
- SlowProbeController
- tokens.service.spec.ts
- DomainEventBus
- body-limit.spec.ts
- secrets-reencryption.service.ts
- operator-token.controller.ts
- body-limit.ts
- test-database.ts
- ZoneServers
- ProjectsService
- env.schema.logging.spec.ts
- token-signing-keys.schema.ts
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- env.schema.spec.ts
- identity-keys.e2e-spec.ts
- encrypted-secret.spec.ts
- @aws-sdk/client-s3@^3.1151.0
- @aws-sdk/s3-request-presigner@^3.1151.0
- redis-connection.e2e-spec.ts
- zod-serialization.spec.ts
- database-connection.e2e-spec.ts
- @nestjs/swagger
- @nestjs/cache-manager@^12.0.1
- @nestjs/microservices@^12.1.3
- @nestjs/platform-socket.io@^12.1.3
- status.controller.spec.ts
- OperationStepsProbeController
- RedisModule
- bullmq@^6.3.15
- @nest-lab/throttler-storage-redis@^1.2.0
- @nestjs/throttler@^6.7.1
- @nestjs/websockets@^12.1.3
- pino-http
- vitest@catalog:

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 134 edges
2. `typeorm` - 59 edges
3. `Zone()` - 50 edges
4. `Project` - 43 edges
5. `@nestjs/testing` - 38 edges
6. `ProjectsService` - 35 edges
7. `useTestDatabase()` - 33 edges
8. `ApiKey` - 27 edges
9. `findFreePort()` - 27 edges
10. `@nestjs/config` - 26 edges

## Surprising Connections (you probably didn't know these)
- `RequestOperator` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/infra/request-context/request-context.ts → packages/protocol/src/operator-role.ts
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `ConversationEvent` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation-event.entity.ts → packages/protocol/src/json-types.ts
- `Conversation` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation.entity.ts → packages/protocol/src/json-types.ts
- `Message` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/message.entity.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (157 total, 41 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.06
Nodes (15): databaseMigrations, migrationFiles, migrationsDirectory, CreateProjects1793193549883, CreateAuditLog1793200000000, AddConversationIndexes1793215983154, CreateApiKeys1793300000000, CreateIdentityKeys1793300001000 (+7 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.18
Nodes (8): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.19
Nodes (13): getProbe(), withToken(), encodePart(), flipSignatureBit(), ForgedTokenInput, forgeToken(), forgeUnsecuredToken(), publicKeyPemBytes() (+5 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.12
Nodes (18): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+10 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 10 - "config.module.ts"
Cohesion: 0.24
Nodes (15): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, environmentChecksConfig (+7 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, cache-manager@^7.2.9, file-type@^22.1.1, helmet@^8.3.0, nest-commander@^3.21.0, @nestjs/bullmq@^12.0.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1 (+21 more)

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

### Community 22 - "http-error.filter.spec.ts"
Cohesion: 0.07
Nodes (32): OperatorDisabledFilter, ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, ApiHttpModule, errorCodeByStatus, errorCodeOfStatus() (+24 more)

### Community 23 - "RequestContext"
Cohesion: 0.06
Nodes (14): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey (+6 more)

### Community 24 - "AuditLogEntry"
Cohesion: 0.11
Nodes (14): ActorKind, actorKinds, AuditLogEntry, IssueApiKeyInput, WorkerModule, ColumnRow, expectedColumns, apiKeyRows() (+6 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.10
Nodes (7): listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand, OriginListCommand, OriginRemoveCommand

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
Cohesion: 0.06
Nodes (32): Message, MessageSenderKind, messageSenderKinds, MessageType, messageTypes, ColumnRow, ForeignKeyRow, IndexRow (+24 more)

### Community 32 - "key-format.ts"
Cohesion: 0.12
Nodes (19): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+11 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "development-secrets-file.ts"
Cohesion: 0.20
Nodes (16): createDevelopmentSecrets(), defaultDevelopmentSecretsDirectory, DevelopmentMainProject, DevelopmentSecrets, developmentSecretsFileName, developmentSecretsPath(), developmentSecretsSchema, hasErrorCode() (+8 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "config.module.ts"
Cohesion: 0.06
Nodes (34): cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, DatabaseMigrationStep, createLogDestination(), logFileDescriptor() (+26 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-probe.ts"
Cohesion: 0.11
Nodes (25): configureApiApp(), noStore(), useSecurityHeaders(), LogDestination, findZonePorts(), probeControllers, LogEntry, findFreePort() (+17 more)

### Community 41 - "@nestjs/common"
Cohesion: 0.16
Nodes (9): ServerAuthModule, KeysModule, ProjectsModule, NewProject, ORIGIN_COLUMNS, OriginsRow, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm (+1 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "identity-keys-table.e2e-spec.ts"
Cohesion: 0.32
Nodes (6): jose@^6.2.12, identityKeyAlgorithms, ColumnRow, expectedColumns, jwk, jose

### Community 47 - "api-keys-service-probe.ts"
Cohesion: 0.24
Nodes (12): eventFields, keyTypeByKind, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred (+4 more)

### Community 48 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.23
Nodes (17): addKey(), runCliInProcess(), addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem(), identityKeyListHeader, listIdentityKeys() (+9 more)

### Community 49 - "projects.service.spec.ts"
Cohesion: 0.23
Nodes (8): IssuedApiKey, InvalidProjectNameError, ProjectAlreadyExistsError, createProjectsServiceProbe(), issuedServerKey, projectRow(), ProjectsServiceProbe, runWithoutTransaction()

### Community 50 - "cli.module.ts"
Cohesion: 0.10
Nodes (13): emptyCell, serverKeyOnceWarning, writeLine(), writeWarning(), IdentityKeyAddOptions, readPem(), IdentityKeyRevokeOptions, KeyCreateOptions (+5 more)

### Community 51 - "database-connection.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "project-origins.e2e-spec.ts"
Cohesion: 0.20
Nodes (9): columns, createMain(), emptyLists, eventNames, listRow(), lists, originAuditRows(), otherList (+1 more)

### Community 53 - "operator-auth.guard.ts"
Cohesion: 0.14
Nodes (6): OperatorAuthGuard, ServerKeyGuard, OperatorTokenClaims, operatorTokenClaimsSchema, bearerToken(), FakeRequestInput

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.10
Nodes (15): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, jsonObjectSchema, JsonValue (+7 more)

### Community 55 - "Project"
Cohesion: 0.06
Nodes (24): NewAuditLogEntry, AuditRecord, Channel, channelColumns(), findColumn(), ConversationCloseReason, conversationCloseReasons, ConversationStatus (+16 more)

### Community 57 - ".probe"
Cohesion: 0.22
Nodes (3): prom-client@^15.1.3, MetricsController, prom-client

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 59 - "identity-key-list.command.ts"
Cohesion: 0.08
Nodes (15): formatDate(), writeTable(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow(), header, KeyListCommand (+7 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "worker.module.ts"
Cohesion: 0.15
Nodes (10): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, auditedEventNames(), AuditRule, auditRules (+2 more)

### Community 62 - "request-id.spec.ts"
Cohesion: 0.08
Nodes (14): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+6 more)

### Community 64 - "environment-check.ts"
Cohesion: 0.24
Nodes (13): CheckContext, CheckFinding, CheckLevel, CheckResult, EnvironmentCheck, CheckPlace, checksForPlace(), findProblems() (+5 more)

### Community 65 - "ref_node_crypto"
Cohesion: 0.33
Nodes (7): firstTokenSigningKeyIds, GeneratedSecret, generatedSecrets, SecretsMode, generateEncryptionKeyEntry(), generateTokenSigningKeyEntry(), minimalEnv

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.12
Nodes (14): CryptoModule, authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService, SecretDecryptionError (+6 more)

### Community 67 - "origin-cli.ts"
Cohesion: 0.24
Nodes (11): badOrigins, helpEntries, prefixes, addOrigins(), OriginAction, OriginCommandOptions, originGroups, originsOf() (+3 more)

### Community 68 - ".publish"
Cohesion: 0.29
Nodes (3): AuditScenarios, happenedIn(), ScenarioError

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.24
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "projects.service.ts"
Cohesion: 0.12
Nodes (21): addOriginTo(), describeAdd(), describeRemove(), OriginOptions, ProjectOptions, removeOriginFrom(), ALLOWED_PROTOCOLS, InvalidOriginError (+13 more)

### Community 73 - "OperationSteps"
Cohesion: 0.12
Nodes (6): DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationSteps, operationTimingKey

### Community 74 - "api-versioning.spec.ts"
Cohesion: 0.25
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 75 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 76 - "Conversation"
Cohesion: 0.07
Nodes (13): Conversation, ConversationEventActorKind, conversationEventActorKinds, Participant, ParticipantKind, participantKinds, columns(), expectedColumns (+5 more)

### Community 77 - "operators.module.ts"
Cohesion: 0.22
Nodes (4): OperatorAuthModule, ServerApiModule, OperatorsModule, TokensModule

### Community 78 - "cls-middleware.ts"
Cohesion: 0.31
Nodes (6): ApiModule, useClsMiddleware(), echoRequestId(), resolveRequestId(), beginOperation(), createE2eApp()

### Community 79 - "identity-keys.service.ts"
Cohesion: 0.21
Nodes (9): KeyActorKind, IdentityKeyAlgorithm, ParsedIdentityKey, NewIdentityKey, AddedIdentityKey, AddIdentityKeyInput, IdentityKeyKidTakenError, InvalidIdentityKeyIdError (+1 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 81 - "operators.repository.ts"
Cohesion: 0.13
Nodes (3): DisabledOperators, Probe, OperatorsRepository

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "operators.service.ts"
Cohesion: 0.10
Nodes (11): Operator, OperatorProfile, IssuedOperatorToken, IssueOperatorTokenInput, OperatorDisabledError, OperatorsService, operatorTokenTtlSeconds, input (+3 more)

### Community 85 - "key-cli.ts"
Cohesion: 0.17
Nodes (25): toLookupPrefix(), CliRunResult, auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix() (+17 more)

### Community 87 - "audited-events.spec.ts"
Cohesion: 0.15
Nodes (13): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+5 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "secrets-reencryption.service.ts"
Cohesion: 0.16
Nodes (11): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+3 more)

### Community 90 - "zone.ts"
Cohesion: 0.15
Nodes (17): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes (+9 more)

### Community 91 - "Message"
Cohesion: 0.27
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 94 - "ApiKey"
Cohesion: 0.07
Nodes (15): ApiKey, ApiKeyKind, apiKeyKinds, ApiKeysRepository, NewApiKey, ApiKeysService, hashMatches(), IssueApiKeyBaseInput (+7 more)

### Community 95 - "redis.module.ts"
Cohesion: 0.32
Nodes (7): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), ioredis

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.31
Nodes (8): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), RunningServer

### Community 97 - "database-entities.ts"
Cohesion: 0.15
Nodes (13): database, loadDataSource(), DatabaseMigration, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity, SecondEntity (+5 more)

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.12
Nodes (15): OperatorController(), DisabledProbeController, issueOperator(), issueOperator(), get(), getAs(), RolesProbeController, IssuedOperator (+7 more)

### Community 100 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 102 - "JsonObjectValidator"
Cohesion: 0.17
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, JsonObjectValidator, Violation, JsonObjectLimits, encoder (+1 more)

### Community 103 - "slow-operations.ts"
Cohesion: 0.27
Nodes (5): slowOperationsConfig, StepTimes, FinishedOperation, roundSteps(), SlowOperations

### Community 104 - "log-redaction.spec.ts"
Cohesion: 0.20
Nodes (10): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+2 more)

### Community 105 - "Zone"
Cohesion: 0.07
Nodes (21): ServerController(), controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController (+13 more)

### Community 106 - "cli.module.ts"
Cohesion: 0.10
Nodes (16): databaseEntities, AuditModule, AppClsModule, AppConfigModule, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules (+8 more)

### Community 108 - "environment-checks.service.ts"
Cohesion: 0.31
Nodes (6): EnvironmentCheckError, describeResult(), EnvironmentChecksService, createService(), environmentChecks, registeredEnvironmentChecks

### Community 109 - "redis-connection.e2e-spec.ts"
Cohesion: 0.10
Nodes (15): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, builtFiles, CommandResult, entriesByPackage, plannedBuildTasks() (+7 more)

### Community 110 - "server/package.json"
Cohesion: 0.10
Nodes (19): author, bin, sowa-chat, reflect-metadata@^0.2.2, rxjs@^7.8.1, sharp@^0.35.5, socket.io@^4.8.4, zod@catalog: (+11 more)

### Community 111 - "identity-key-pem.ts"
Cohesion: 0.27
Nodes (7): algorithmOf(), InvalidIdentityKeyError, isP256(), parseIdentityPublicKey(), readPublicKeyObject(), captureError(), expectInvalidKey()

### Community 115 - "tokens.service.spec.ts"
Cohesion: 0.09
Nodes (23): TokenSigningKey, SignedToken, SignTokenInput, ConsumerModule, TestTokenSigningConfigModule, TokenConsumer, TokenAudience, tokenAudiences (+15 more)

### Community 120 - "DomainEventBus"
Cohesion: 0.16
Nodes (11): DomainEventBus, happened, TestListener, DomainEventHandler, DomainEventName, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js (+3 more)

### Community 121 - "body-limit.spec.ts"
Cohesion: 0.11
Nodes (6): BodyProbeController, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ZoneProbeApp

### Community 122 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldResult, ReencryptInput, reencryptionBatchSize, ReencryptionReport (+3 more)

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.17
Nodes (6): nestjs-zod@^5.5.0, OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, OperatorTokenResponse, nestjs-zod

### Community 124 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 125 - "test-database.ts"
Cohesion: 0.16
Nodes (10): createProjectWithKey(), internalAgent(), postToken(), createProjectRequest(), ColumnRow, ConstraintRow, expectedColumns, createProject() (+2 more)

### Community 126 - "ZoneServers"
Cohesion: 0.29
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 127 - "ProjectsService"
Cohesion: 0.15
Nodes (3): ProjectsRepository, ProjectNotFoundError, ProjectsService

### Community 128 - "env.schema.logging.spec.ts"
Cohesion: 0.33
Nodes (3): Env, logLevels, requiredEnv

### Community 129 - "token-signing-keys.schema.ts"
Cohesion: 0.29
Nodes (6): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, tokenSigningKeysSchema

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.20
Nodes (8): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus(), Env

### Community 134 - "identity-keys.e2e-spec.ts"
Cohesion: 0.42
Nodes (6): IdentityKeysService, expectNoKeyRows(), expectNoRows(), auditRows(), auditRowsByAction(), identityKeyRows()

### Community 135 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 138 - "redis-connection.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableRedisUrl(), waitForHttpStatus(), useTestRedis()

### Community 139 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 140 - "database-connection.e2e-spec.ts"
Cohesion: 0.29
Nodes (6): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus()

### Community 145 - "status.controller.spec.ts"
Cohesion: 0.33
Nodes (3): DependencyStatusBody, StatusBody, redisUrl()

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 947 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **41 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `log-level-warn.spec.ts`, `operator-auth-guard.e2e-spec.ts`, `config.module.ts`, `zod-serialization.spec.ts`, `dependencies`, `status.controller.spec.ts`, `http-error.filter.spec.ts`, `RequestContext`, `key-format.ts`, `zone.guard.spec.ts`, `config.module.ts`, `zone-probe.ts`, `cli.module.ts`, `operator-auth.guard.ts`, `.probe`, `identity-key-list.command.ts`, `worker.module.ts`, `request-id.spec.ts`, `environment-check.ts`, `encryption.service.spec.ts`, `projects.service.ts`, `OperationSteps`, `api-versioning.spec.ts`, `operators.module.ts`, `cls-middleware.ts`, `identity-keys.service.ts`, `health.module.ts`, `operators.repository.ts`, `operators.service.ts`, `secrets-reencryption.service.ts`, `zone.ts`, `ApiKey`, `redis.module.ts`, `operator-auth-guard.e2e-spec.ts`, `slow-operations.ts`, `log-redaction.spec.ts`, `Zone`, `cli.module.ts`, `environment-checks.service.ts`, `server/package.json`, `tokens.service.spec.ts`, `DomainEventBus`, `body-limit.spec.ts`, `secrets-reencryption.service.ts`, `operator-token.controller.ts`, `body-limit.ts`, `test-database.ts`?**
  _High betweenness centrality (0.290) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06294326241134751 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `database-migrations.ts` to `identity-keys.e2e-spec.ts`, `database-connection.e2e-spec.ts`, `dependencies`, `AuditLogEntry`, `chat-tables.e2e-spec.ts`, `ConversationEvent`, `@nestjs/common`, `identity-keys-table.e2e-spec.ts`, `Project`, `migrate-mode.e2e-spec.ts`, `test-secrets.ts`, `environment-check.ts`, `origin-cli.ts`, `OperationSteps`, `Conversation`, `operators.repository.ts`, `key-cli.ts`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `ApiKey`, `database-entities.ts`, `operator-auth-guard.e2e-spec.ts`, `cli.module.ts`, `environment-checks.service.ts`, `redis-connection.e2e-spec.ts`, `server/package.json`, `test-database.ts`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `zone-probe.ts` to `devDependencies`, `identity-keys.e2e-spec.ts`, `config.module.ts`, `redis-connection.e2e-spec.ts`, `database-connection.e2e-spec.ts`, `RequestContext`, `AuditLogEntry`, `key-format.ts`, `config.module.ts`, `@nestjs/common`, `api-keys-service-probe.ts`, `projects.service.spec.ts`, `project-origins.e2e-spec.ts`, `test-secrets.ts`, `worker.module.ts`, `encryption.service.spec.ts`, `OperationSteps`, `cls-middleware.ts`, `operators.repository.ts`, `operators.service.ts`, `key-cli.ts`, `cli.module.ts`, `server/package.json`, `tokens.service.spec.ts`, `DomainEventBus`, `test-database.ts`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._