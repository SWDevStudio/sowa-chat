# Graph Report - hector-chat-epic-14  (2026-10-29)

## Corpus Check
- 431 files · ~110,258 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 3009 nodes · 7421 edges · 168 communities (132 shown, 36 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 194 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `03976000`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- typeorm
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- tokens.service.spec.ts
- env.schema.ts
- compilerOptions
- DomainEventBus
- RequestContext
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
- RedactionProbeController
- body-limit.ts
- operator-block-sync.e2e-spec.ts
- scripts
- ProjectsService
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- AuditLogEntry
- DomainEventBus
- zone.guard.spec.ts
- ConversationEvent
- migrate.module.ts
- tsconfig.build.json
- ValidationProbeController
- config.module.ts
- nest-cli.json
- api.module.ts
- database.module.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- test-database.ts
- protocol/src/index.ts
- logger.module.ts
- Visitor
- key-cli.ts
- ProjectsService
- log-settings.e2e-spec.ts
- replica-cache-sync.e2e-spec.ts
- operator-auth.guard.ts
- json-object-limits.spec.ts
- visitor-session.e2e-spec.ts
- ProjectCreateCommand
- operators.service.ts
- migrate-mode.e2e-spec.ts
- projects.service.ts
- test-secrets.ts
- audit-log.e2e-spec.ts
- visitor-session.controller.ts
- operator-role.guard.spec.ts
- projects-service.e2e-spec.ts
- VisitorSessionsRepository
- encryption.service.spec.ts
- chat-tables.e2e-spec.ts
- identity-key-commands.e2e-spec.ts
- config-startup.e2e-spec.ts
- identity-keys.service.ts
- server-protocol.e2e-spec.ts
- audit-log.e2e-spec.ts
- conversation.entity.spec.ts
- redis.module.ts
- request-id.spec.ts
- participant.entity.spec.ts
- conversation.entity.ts
- database.module.ts
- server-errors.spec.ts
- health.module.ts
- OperatorsService
- OperationSteps
- workspace-check-types.e2e-spec.ts
- operator-auth-guard.e2e-spec.ts
- global-setup.ts
- CreateChatTables1793215389271
- domain-events.ts
- secrets-reencrypt-command.e2e-spec.ts
- secrets-reencrypt.command.ts
- key-format.ts
- Message
- @nestjs/common
- SecretsReencryptionService
- api-keys.service.ts
- server-errors.spec.ts
- log-redaction.e2e-spec.ts
- @nestjs/testing
- cli-mode.e2e-spec.ts
- DisabledOperators
- JsonObjectValidator
- unit-probe.ts
- main.ts
- visitor-auth-guard.e2e-spec.ts
- OperatorDisableCommand
- Zone
- SlowProbeController
- writeLine
- operators.service.spec.ts
- ref_node_path
- server/package.json
- tokens.service.ts
- api-versioning.spec.ts
- VisitorAuthGuard
- cache-invalidation-rules.ts
- request-context.ts
- secrets-reencryption.service.ts
- server-key-guard.e2e-spec.ts
- project-cli.ts
- encryption-keys.schema.spec.ts
- operator-commands.e2e-spec.ts
- replica-events-offline-redis.e2e-spec.ts
- zod-serialization.spec.ts
- identity-keys.service.ts
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- replica-events.e2e-spec.ts
- typeorm
- main.ts
- visitor-session.entity.spec.ts
- test-domain-events.ts
- log-redaction.spec.ts
- operation-steps.ts
- IdentityKeyAddCommand
- encrypted-secret.spec.ts
- InternalProbeController
- cache-invalidate.controller.spec.ts
- packages-build.e2e-spec.ts
- .canActivate
- TestTokenSigningConfigModule
- LocalCacheInvalidation
- api-keys-service-probe.ts
- api-docs.spec.ts
- operator-token.controller.ts
- @nestjs/platform-socket.io@^12.1.3
- token-signing-keys.schema.ts
- Operator
- visitor.entity.spec.ts
- redis-connection.e2e-spec.ts
- IdentityKeyRevokeCommand
- KeyRevokeCommand
- visitor-auth.module.ts
- cls-middleware.ts
- env.schema.spec.ts
- DatabaseStepSubscriber
- TokenConsumer
- @aws-sdk/client-s3@^3.1151.0
- helmet
- @nestjs/bullmq@^12.0.0

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 161 edges
2. `typeorm` - 64 edges
3. `Zone()` - 54 edges
4. `@nestjs/testing` - 49 edges
5. `Project` - 49 edges
6. `useTestDatabase()` - 47 edges
7. `ProjectsService` - 44 edges
8. `DomainEventBus` - 40 edges
9. `createProject()` - 39 edges
10. `findFreePort()` - 33 edges

## Surprising Connections (you probably didn't know these)
- `OperatorProfile` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/domain/operators/operators.repository.ts → packages/protocol/src/operator-role.ts
- `RequestOperator` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/infra/request-context/request-context.ts → packages/protocol/src/operator-role.ts
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts
- `AuditRecord` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-rule.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (168 total, 36 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.06
Nodes (12): DatabaseMigration, databaseMigrations, CreateProjects1793193549883, CreateAuditLog1793200000000, AddConversationIndexes1793215983154, CreateApiKeys1793300000000, CreateIdentityKeys1793300001000, AddProjectsPublicKey1793300002000 (+4 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.17
Nodes (8): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "tokens.service.spec.ts"
Cohesion: 0.24
Nodes (14): flipSignatureBit(), spyOnLogs(), test1SigningKey, test2SigningKey, expectedOperatorClaims, [key1, key2], moveClockTo(), operatorInput (+6 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (22): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+14 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "DomainEventBus"
Cohesion: 0.15
Nodes (8): ReplicaEventMessage, replicaEventNames(), ReplicaEventRule, replicaEventRules, errorMessage(), replicaEventsClient, ReplicaEventsPublisher, replicaPublishTimeoutMs

### Community 10 - "RequestContext"
Cohesion: 0.13
Nodes (4): VisitorController(), RequestContext, VisitorGuardProbeController, visitorProbePath

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, @aws-sdk/s3-request-presigner@^3.1151.0, cache-manager@^7.2.9, file-type@^22.1.1, nest-commander@^3.21.0, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/cache-manager@^12.0.1, nestjs-cls@^7.0.1 (+26 more)

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

### Community 23 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 24 - "operator-block-sync.e2e-spec.ts"
Cohesion: 0.13
Nodes (19): blockedOnAll(), expectStatusOnAll(), issueOperator(), publishAll(), runCommand(), subscriberCounts(), waitForBlockedOnAll(), waitForStatusOnAll() (+11 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "ProjectsService"
Cohesion: 0.09
Nodes (14): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand (+6 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.14
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 32 - "DomainEventBus"
Cohesion: 0.13
Nodes (9): BusProbe, apiKeyEvent, projectEvent, replicaPublishConnectTimeoutMs, apiKeyEvent, Emit, DomainEventBus, CacheBusModule (+1 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "migrate.module.ts"
Cohesion: 0.15
Nodes (6): AppConfigModule, DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "config.module.ts"
Cohesion: 0.25
Nodes (14): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig (+6 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "api.module.ts"
Cohesion: 0.07
Nodes (32): probeControllers, HealthBody, HealthEntry, DependencyStatusBody, StatusBody, DocumentedZone, documentForZone(), isUnderAnyPrefix() (+24 more)

### Community 41 - "database.module.ts"
Cohesion: 0.24
Nodes (8): database, loadDataSource(), databaseEntities, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity, SecondEntity

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "test-database.ts"
Cohesion: 0.19
Nodes (10): issueServerKey(), createProjectWithKey(), internalAgent(), postToken(), ColumnRow, ConstraintRow, expectedColumns, createProject() (+2 more)

### Community 46 - "protocol/src/index.ts"
Cohesion: 0.11
Nodes (24): OperatorTokenClaims, IssueOperatorTokenInput, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope (+16 more)

### Community 47 - "logger.module.ts"
Cohesion: 0.19
Nodes (16): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+8 more)

### Community 49 - "key-cli.ts"
Cohesion: 0.32
Nodes (15): toLookupPrefix(), auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix(), listKeys() (+7 more)

### Community 50 - "ProjectsService"
Cohesion: 0.12
Nodes (5): formatOrigins(), header, ProjectListCommand, toRow(), ProjectsService

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.12
Nodes (20): fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), ApiRun (+12 more)

### Community 52 - "replica-cache-sync.e2e-spec.ts"
Cohesion: 0.14
Nodes (17): badOrigins, helpEntries, prefixes, expectStatusOnAll(), probeWithKey(), ReplicaProbeController, runCliInProcess(), addOrigins() (+9 more)

### Community 53 - "operator-auth.guard.ts"
Cohesion: 0.20
Nodes (6): ServerKeyGuard, operatorTokenClaimsSchema, VisitorTokenClaims, visitorTokenClaimsSchema, bearerToken(), FakeRequestInput

### Community 54 - "json-object-limits.spec.ts"
Cohesion: 0.09
Nodes (15): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+7 more)

### Community 55 - "visitor-session.e2e-spec.ts"
Cohesion: 0.12
Nodes (31): api(), createProjectWithPublicKey(), findAllSessions(), findFamilySessions(), findSessionByRefreshToken(), postVisitorSession(), postVisitorSessionRefresh(), startVisitorSession() (+23 more)

### Community 57 - "operators.service.ts"
Cohesion: 0.09
Nodes (14): OperatorAuthModule, DisabledOperatorsModule, OperatorsModule, OperatorIdRow, OperatorProfile, ChangeOperatorBlockInput, IssuedOperatorToken, OperatorActorKind (+6 more)

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 59 - "projects.service.ts"
Cohesion: 0.09
Nodes (22): IssuedApiKey, ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), originLists, normalizeOrigin(), normalizeOrigins(), parseUrl() (+14 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "audit-log.e2e-spec.ts"
Cohesion: 0.12
Nodes (16): ActorKind, actorKinds, AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, NewAuditLogEntry (+8 more)

### Community 62 - "visitor-session.controller.ts"
Cohesion: 0.21
Nodes (7): toVisitorSessionResponse(), VisitorSessionController, VisitorSessionRefreshRequestDto, VisitorSessionRequestDto, VisitorSessionResponseDto, VisitorSessionTokens, VisitorSessionResponse

### Community 63 - "operator-role.guard.spec.ts"
Cohesion: 0.12
Nodes (10): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey (+2 more)

### Community 64 - "projects-service.e2e-spec.ts"
Cohesion: 0.12
Nodes (20): IssueApiKeyInput, CreateProjectInput, expectNoRows(), blockAuditRows(), columns, createMain(), emptyLists, eventNames (+12 more)

### Community 65 - "VisitorSessionsRepository"
Cohesion: 0.08
Nodes (10): hashKey(), generateRefreshToken(), NewVisitorSession, VisitorSessionsRepository, RefreshExchange, visitorAccessTokenTtlSeconds, VisitorSessionsService, VisitorsModule (+2 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.12
Nodes (14): CryptoModule, authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService, SecretDecryptionError (+6 more)

### Community 67 - "chat-tables.e2e-spec.ts"
Cohesion: 0.07
Nodes (34): ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation(), createMessage() (+26 more)

### Community 68 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.21
Nodes (19): expectNoKeyRows(), addKey(), addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem(), identityKeyListHeader, listIdentityKeys() (+11 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "identity-keys.service.ts"
Cohesion: 0.09
Nodes (6): IdentityKey, IdentityKeysRepository, IdentityKeyKidTakenError, IdentityKeysService, InvalidIdentityKeyIdError, toEvent()

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "audit-log.e2e-spec.ts"
Cohesion: 0.11
Nodes (8): KeysModule, OriginList, ProjectsModule, NewProject, ORIGIN_COLUMNS, OriginsRow, ProjectsRepository, ChangeOriginInput

### Community 73 - "conversation.entity.spec.ts"
Cohesion: 0.16
Nodes (7): Channel, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 74 - "redis.module.ts"
Cohesion: 0.09
Nodes (14): ioredis@^6.0.0, OperatorTokenController, ServerApiModule, VisitorApiModule, HealthModule, ApiHttpModule, closeRedis(), createRedisClient() (+6 more)

### Community 75 - "request-id.spec.ts"
Cohesion: 0.17
Nodes (9): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse, ProbeService (+1 more)

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "conversation.entity.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 78 - "database.module.ts"
Cohesion: 0.17
Nodes (7): ServerAuthModule, AppClsModule, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, OperationStepsModule

### Community 79 - "server-errors.spec.ts"
Cohesion: 0.09
Nodes (18): OperatorDisabledFilter, InvalidPublicKeyFilter, InvalidRefreshTokenFilter, OperatorDisabledError, InvalidPublicKeyError, InvalidRefreshTokenError, ApiException, errorCodeOfStatus() (+10 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (10): DependencyChecks, HealthController, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus, StatusService (+2 more)

### Community 81 - "OperatorsService"
Cohesion: 0.14
Nodes (3): Probe, OperatorsRepository, OperatorsService

### Community 82 - "OperationSteps"
Cohesion: 0.12
Nodes (3): OperationStep, OperationSteps, OperationStepsProbeController

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.16
Nodes (10): OperatorController(), DisabledProbeController, issueOperator(), BlockTarget, get(), getAs(), RolesProbeController, IssuedOperator (+2 more)

### Community 85 - "global-setup.ts"
Cohesion: 0.24
Nodes (9): testcontainers@^12.2.1, @testcontainers/postgresql@^12.2.1, runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl(), testcontainers (+1 more)

### Community 87 - "domain-events.ts"
Cohesion: 0.11
Nodes (14): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+6 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "secrets-reencrypt.command.ts"
Cohesion: 0.16
Nodes (11): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+3 more)

### Community 90 - "key-format.ts"
Cohesion: 0.10
Nodes (17): KeyRevokeOptions, base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62() (+9 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "@nestjs/common"
Cohesion: 0.07
Nodes (18): HttpLabel, HttpMetrics, HttpRequestRecord, labelNames, MetricsController, MetricsModule, StepTimes, FinishedOperation (+10 more)

### Community 94 - "api-keys.service.ts"
Cohesion: 0.07
Nodes (17): ApiKey, ApiKeyKind, apiKeyKinds, ApiKeysRepository, NewApiKey, ApiKeysService, CachedApiKey, hashMatches() (+9 more)

### Community 95 - "server-errors.spec.ts"
Cohesion: 0.18
Nodes (11): ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ErrorCode, errorCodes, errorDetailSchema, ErrorResponse (+3 more)

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 97 - "@nestjs/testing"
Cohesion: 0.12
Nodes (10): project, snapshot, AppCacheModule, cacheTtlMs, cacheKeys, WorkerModule, lists, cache-manager (+2 more)

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "DisabledOperators"
Cohesion: 0.14
Nodes (4): DisabledOperators, OperatorReplicaEventsController, createDisabledOperators(), malformedPayloads

### Community 100 - "JsonObjectValidator"
Cohesion: 0.30
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 101 - "unit-probe.ts"
Cohesion: 0.20
Nodes (9): LogDestination, createRedactionProbeApp(), createRequestIdProbeApp(), LogEntry, createProbeApp(), ProbeAppOptions, redirectLogsTo(), stubTestEnv() (+1 more)

### Community 102 - "main.ts"
Cohesion: 0.11
Nodes (18): configureApiApp(), ApiModule, noStore(), useSecurityHeaders(), connectReplicaEvents(), startListening(), stopListening(), ZoneServers (+10 more)

### Community 103 - "visitor-auth-guard.e2e-spec.ts"
Cohesion: 0.12
Nodes (18): getProbe(), issueOperator(), withToken(), encodePart(), ForgedTokenInput, forgeToken(), forgeUnsecuredToken(), parseTestSigningKeys() (+10 more)

### Community 104 - "OperatorDisableCommand"
Cohesion: 0.17
Nodes (4): describeDisable(), describeEnable(), OperatorDisableCommand, OperatorEnableCommand

### Community 105 - "Zone"
Cohesion: 0.06
Nodes (16): BodyProbeController, InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController, calls, ProbeBodyDto (+8 more)

### Community 107 - "writeLine"
Cohesion: 0.08
Nodes (23): emptyCell, formatDate(), serverKeyOnceWarning, writeLine(), writeTable(), writeWarning(), IdentityKeyAddOptions, header (+15 more)

### Community 108 - "operators.service.spec.ts"
Cohesion: 0.22
Nodes (7): blockInput, BlockProbe, createBlockProbe(), input, Probe, signedToken, runWithoutTransaction()

### Community 109 - "ref_node_path"
Cohesion: 0.11
Nodes (11): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, databaseUrl(), IdentityRow (+3 more)

### Community 110 - "server/package.json"
Cohesion: 0.08
Nodes (23): author, bin, sowa-chat, bullmq@^6.3.15, @nestjs/throttler@^6.7.1, pg@^8.23.1, sharp@^0.35.5, socket.io@^4.8.4 (+15 more)

### Community 111 - "tokens.service.ts"
Cohesion: 0.16
Nodes (9): tokenSigningConfig, TokenSigningKey, SignedToken, SignTokenInput, TokenAudience, tokenAudiences, TokensService, VerifiedToken (+1 more)

### Community 112 - "api-versioning.spec.ts"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 120 - "cache-invalidation-rules.ts"
Cohesion: 0.17
Nodes (20): apiKeyCacheKeys(), cacheInvalidatedEventNames(), CacheInvalidationRule, cacheInvalidationRules, projectCacheKeys(), apiKeyEvent, projectEvent, cacheInvalidate() (+12 more)

### Community 121 - "request-context.ts"
Cohesion: 0.18
Nodes (3): RequestContextModule, ConsumerModule, ContextConsumer

### Community 122 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldResult, ReencryptInput, reencryptionBatchSize, ReencryptionReport (+3 more)

### Community 123 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.26
Nodes (8): ServerController(), changeBodyChar(), forgeWithValidChecksum(), getProbe(), GuardProbeController, replaceChar(), withKey(), zoneAgent()

### Community 124 - "project-cli.ts"
Cohesion: 0.28
Nodes (8): buildServer(), fullOriginArguments, listHeader, onceWarning, repositoryRoot, runMainCli(), serverDirectory, uuidPattern

### Community 125 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 126 - "operator-commands.e2e-spec.ts"
Cohesion: 0.25
Nodes (12): disabledAtOf(), setupOperator(), disabledAtOf(), helpEntries, setupOperator(), operatorActions, operatorBlockAuditRows(), operatorCommandArguments() (+4 more)

### Community 127 - "replica-events-offline-redis.e2e-spec.ts"
Cohesion: 0.11
Nodes (18): cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, runCli(), CapturedRun, runCaptured() (+10 more)

### Community 128 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 129 - "identity-keys.service.ts"
Cohesion: 0.12
Nodes (20): jose@^6.2.12, KeyActorKind, IdentityKeyAlgorithm, identityKeyAlgorithms, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey (+12 more)

### Community 130 - "ServerErrorsProbeController"
Cohesion: 0.16
Nodes (9): internalErrorMessage, ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, ServerErrorsProbeController, stringsInside() (+1 more)

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 133 - "replica-events.e2e-spec.ts"
Cohesion: 0.26
Nodes (11): expectCachedOnAll(), expectKept(), repositoryRoot, seed(), waitUntilDeleted(), Env, cacheInvalidateSubscribers(), cacheOf() (+3 more)

### Community 134 - "typeorm"
Cohesion: 0.17
Nodes (6): channelColumns(), findColumn(), Project, ProjectFixture, JsonObject, typeorm

### Community 135 - "main.ts"
Cohesion: 0.19
Nodes (13): @nestjs/microservices@^12.1.3, redisConfig, parseDatabase(), parseUrl(), RedisConnectionOptions, redisTransportOptions(), stripIpv6Brackets(), ReplicaEventsPublisherModule (+5 more)

### Community 136 - "visitor-session.entity.spec.ts"
Cohesion: 0.14
Nodes (9): columns(), expectedColumns, findColumn(), findRelation(), normalizeSql(), relations(), runMigration(), CreateOperators1793300003000 (+1 more)

### Community 137 - "test-domain-events.ts"
Cohesion: 0.19
Nodes (9): happened, TestListener, DomainEventHandler, OnDomainEvent(), TelemetryModule, DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent (+1 more)

### Community 138 - "log-redaction.spec.ts"
Cohesion: 0.22
Nodes (9): allOutput(), CapturedLogs, fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields, secretValueOf() (+1 more)

### Community 139 - "operation-steps.ts"
Cohesion: 0.25
Nodes (7): @nestjs/typeorm@^12.0.2, operationSteps, OperationTiming, beginOperation(), operationTimingKey, nestjs-cls, @nestjs/typeorm

### Community 141 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 142 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 143 - "cache-invalidate.controller.spec.ts"
Cohesion: 0.16
Nodes (6): CacheInvalidateController, CacheInvalidateEvent, cacheInvalidateEventSchema, ReplicaEventsModule, OperatorReplicaEvent, replicaEventPatterns

### Community 144 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 148 - "api-keys-service-probe.ts"
Cohesion: 0.24
Nodes (12): eventFields, keyTypeByKind, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred (+4 more)

### Community 149 - "api-docs.spec.ts"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 150 - "operator-token.controller.ts"
Cohesion: 0.24
Nodes (4): nestjs-zod@^5.5.0, OperatorTokenRequestDto, OperatorTokenResponseDto, nestjs-zod

### Community 152 - "token-signing-keys.schema.ts"
Cohesion: 0.29
Nodes (6): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, tokenSigningKeysSchema

### Community 154 - "visitor.entity.spec.ts"
Cohesion: 0.32
Nodes (5): columns(), expectedColumns, findColumn(), findRelation(), relations()

### Community 155 - "redis-connection.e2e-spec.ts"
Cohesion: 0.29
Nodes (7): fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableRedisUrl(), waitForHttpStatus()

### Community 159 - "cls-middleware.ts"
Cohesion: 0.60
Nodes (4): useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp()

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1059 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **36 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `zod-serialization.spec.ts`, `identity-keys.service.ts`, `ServerErrorsProbeController`, `log-level-warn.spec.ts`, `replica-events.e2e-spec.ts`, `tokens.service.spec.ts`, `main.ts`, `typeorm`, `DomainEventBus`, `log-redaction.spec.ts`, `operation-steps.ts`, `test-domain-events.ts`, `dependencies`, `RequestContext`, `cache-invalidate.controller.spec.ts`, `api-docs.spec.ts`, `operator-token.controller.ts`, `body-limit.ts`, `operator-block-sync.e2e-spec.ts`, `ProjectsService`, `visitor-auth.module.ts`, `cls-middleware.ts`, `DomainEventBus`, `zone.guard.spec.ts`, `migrate.module.ts`, `config.module.ts`, `api.module.ts`, `logger.module.ts`, `ProjectsService`, `replica-cache-sync.e2e-spec.ts`, `operator-auth.guard.ts`, `operators.service.ts`, `projects.service.ts`, `audit-log.e2e-spec.ts`, `visitor-session.controller.ts`, `operator-role.guard.spec.ts`, `VisitorSessionsRepository`, `encryption.service.spec.ts`, `audit-log.e2e-spec.ts`, `redis.module.ts`, `request-id.spec.ts`, `database.module.ts`, `server-errors.spec.ts`, `health.module.ts`, `operator-auth-guard.e2e-spec.ts`, `secrets-reencrypt.command.ts`, `key-format.ts`, `api-keys.service.ts`, `server-errors.spec.ts`, `@nestjs/testing`, `DisabledOperators`, `unit-probe.ts`, `main.ts`, `visitor-auth-guard.e2e-spec.ts`, `Zone`, `writeLine`, `server/package.json`, `tokens.service.ts`, `cache-invalidation-rules.ts`, `request-context.ts`, `secrets-reencryption.service.ts`, `server-key-guard.e2e-spec.ts`, `replica-events-offline-redis.e2e-spec.ts`?**
  _High betweenness centrality (0.237) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.06463414634146342 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `typeorm`, `identity-keys.service.ts`, `visitor-session.entity.spec.ts`, `operation-steps.ts`, `dependencies`, `operator-block-sync.e2e-spec.ts`, `visitor.entity.spec.ts`, `ConversationEvent`, `database.module.ts`, `test-database.ts`, `key-cli.ts`, `log-settings.e2e-spec.ts`, `replica-cache-sync.e2e-spec.ts`, `visitor-session.e2e-spec.ts`, `operators.service.ts`, `migrate-mode.e2e-spec.ts`, `test-secrets.ts`, `projects-service.e2e-spec.ts`, `VisitorSessionsRepository`, `chat-tables.e2e-spec.ts`, `identity-key-commands.e2e-spec.ts`, `audit-log.e2e-spec.ts`, `conversation.entity.spec.ts`, `participant.entity.spec.ts`, `conversation.entity.ts`, `operator-auth-guard.e2e-spec.ts`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `api-keys.service.ts`, `ref_node_path`, `server/package.json`, `operator-commands.e2e-spec.ts`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `@nestjs/testing` to `devDependencies`, `tokens.service.spec.ts`, `test-domain-events.ts`, `operation-steps.ts`, `cache-invalidate.controller.spec.ts`, `api-keys-service-probe.ts`, `redis-connection.e2e-spec.ts`, `cls-middleware.ts`, `DomainEventBus`, `config.module.ts`, `api.module.ts`, `logger.module.ts`, `key-cli.ts`, `log-settings.e2e-spec.ts`, `operators.service.ts`, `projects.service.ts`, `test-secrets.ts`, `audit-log.e2e-spec.ts`, `projects-service.e2e-spec.ts`, `encryption.service.spec.ts`, `identity-key-commands.e2e-spec.ts`, `audit-log.e2e-spec.ts`, `key-format.ts`, `DisabledOperators`, `unit-probe.ts`, `main.ts`, `operators.service.spec.ts`, `server/package.json`, `request-context.ts`, `operator-commands.e2e-spec.ts`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._