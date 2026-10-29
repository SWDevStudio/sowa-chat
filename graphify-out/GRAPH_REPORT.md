# Graph Report - hector-chat-epic-14  (2026-10-29)

## Corpus Check
- 397 files · ~99,377 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .log 1)

## Summary
- 2766 nodes · 6660 edges · 155 communities (122 shown, 33 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 168 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `60e63ea7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- tokens.service.spec.ts
- env.schema.ts
- compilerOptions
- DomainEventBus
- server-key-guard.e2e-spec.ts
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
- api-app.ts
- identity-keys.e2e-spec.ts
- scripts
- ProjectsService
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- key-format.ts
- zone.guard.spec.ts
- ConversationEvent
- migrate.module.ts
- tsconfig.build.json
- ValidationProbeController
- config.module.ts
- nest-cli.json
- @nestjs/testing
- cli.module.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- test-database.ts
- protocol/src/index.ts
- logger.module.ts
- Project
- key-cli.ts
- ApiKeysService
- log-settings.e2e-spec.ts
- replica-cache-sync.e2e-spec.ts
- operator-auth.guard.ts
- json-object-limits.spec.ts
- replica-events.publisher.ts
- ProjectCreateCommand
- operators.service.ts
- migrate-mode.e2e-spec.ts
- projects-service.e2e-spec.ts
- test-secrets.ts
- audit-log.e2e-spec.ts
- conversation.entity.spec.ts
- operator-role.guard.spec.ts
- RequestContext
- projects.service.ts
- encryption.service.spec.ts
- metrics.controller.ts
- identity-key-commands.e2e-spec.ts
- config-startup.e2e-spec.ts
- identity-keys.service.ts
- server-protocol.e2e-spec.ts
- operation-steps.ts
- operators.module.ts
- redis.module.ts
- request-id.spec.ts
- participant.entity.spec.ts
- conversation.entity.ts
- main.ts
- server-errors.spec.ts
- health.module.ts
- operators.e2e-spec.ts
- OperationSteps
- workspace-check-types.e2e-spec.ts
- operator-auth-guard.e2e-spec.ts
- global-setup.ts
- CreateChatTables1793215389271
- domain-events.ts
- secrets-reencrypt-command.e2e-spec.ts
- secrets-reencrypt.command.ts
- zone.ts
- Message
- telemetry.interceptor.spec.ts
- SecretsReencryptionService
- api-keys.service.ts
- server-errors.spec.ts
- log-redaction.e2e-spec.ts
- body-limit.spec.ts
- cli-mode.e2e-spec.ts
- cache-invalidate.controller.spec.ts
- JsonObjectValidator
- JsonObject
- identity-key-pem.ts
- operator-auth-guard.e2e-spec.ts
- OperatorDisableCommand
- api-docs.spec.ts
- SlowProbeController
- writeLine
- operators.service.spec.ts
- ref_node_path
- server/package.json
- TokensService
- api-versioning.spec.ts
- typeorm
- cache-invalidation-rules.ts
- audit-log.e2e-spec.ts
- secrets-reencryption.service.ts
- operator-token.controller.ts
- project-cli.ts
- encryption-keys.schema.spec.ts
- operator-commands.e2e-spec.ts
- replica-events-offline-redis.e2e-spec.ts
- zod-serialization.spec.ts
- token-signing-keys.schema.ts
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- replica-events.e2e-spec.ts
- request-context.ts
- main.ts
- zone-servers.ts
- test-domain-events.ts
- database-entities.ts
- cls-middleware.ts
- IdentityKeyAddCommand
- packages-build.e2e-spec.ts
- encryption-keys.schema.ts
- env.schema.spec.ts
- TestEncryptionConfigModule
- RolesProbeController
- TestTokenSigningConfigModule
- @aws-sdk/client-s3@^3.1151.0
- @nest-lab/throttler-storage-redis@^1.2.0
- @nestjs/throttler@^6.7.1
- pino-http

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 146 edges
2. `typeorm` - 56 edges
3. `Zone()` - 50 edges
4. `@nestjs/testing` - 48 edges
5. `Project` - 47 edges
6. `ProjectsService` - 44 edges
7. `useTestDatabase()` - 40 edges
8. `DomainEventBus` - 38 edges
9. `findFreePort()` - 32 edges
10. `createProject()` - 31 edges

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

## Communities (155 total, 33 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.07
Nodes (14): DatabaseMigration, databaseMigrations, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity, SecondEntity, CreateProjects1793193549883 (+6 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.18
Nodes (9): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+1 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "tokens.service.spec.ts"
Cohesion: 0.15
Nodes (25): encodePart(), flipSignatureBit(), ForgedTokenInput, forgeToken(), forgeUnsecuredToken(), parseTestSigningKeys(), publicKeyPemBytes(), publicKeyRawBytes() (+17 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.09
Nodes (21): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "DomainEventBus"
Cohesion: 0.11
Nodes (11): apiKeyEvent, projectEvent, ReplicaEventsPublisherModule, replicaPublishConnectTimeoutMs, replicaEventsClient, replicaPublishTimeoutMs, apiKeyEvent, Emit (+3 more)

### Community 10 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.26
Nodes (8): ServerController(), changeBodyChar(), forgeWithValidChecksum(), getProbe(), GuardProbeController, replaceChar(), withKey(), zoneAgent()

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, bullmq@^6.3.15, cache-manager@^7.2.9, file-type@^22.1.1, jose@^6.2.12, nest-commander@^3.21.0, @nestjs/cache-manager@^12.0.1, nestjs-cls@^7.0.1 (+26 more)

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

### Community 22 - "RedactionProbeController"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 23 - "api-app.ts"
Cohesion: 0.21
Nodes (10): configureApiApp(), setupApiDocs(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore() (+2 more)

### Community 24 - "identity-keys.e2e-spec.ts"
Cohesion: 0.17
Nodes (16): issueServerKey(), expectNoKeyRows(), expectNoRows(), addKey(), blockAuditRows(), blockMethods, createOperator(), createProjectWithKey() (+8 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "ProjectsService"
Cohesion: 0.07
Nodes (21): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand (+13 more)

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
Cohesion: 0.07
Nodes (29): ColumnRow, ForeignKeyRow, IndexRow, tableNames, IndexRow, PlanRow, countRows(), createChannel() (+21 more)

### Community 32 - "key-format.ts"
Cohesion: 0.11
Nodes (16): IssuedApiKey, base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62() (+8 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "migrate.module.ts"
Cohesion: 0.20
Nodes (5): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "config.module.ts"
Cohesion: 0.26
Nodes (14): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig (+6 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "@nestjs/testing"
Cohesion: 0.09
Nodes (25): HealthBody, HealthEntry, DependencyStatusBody, StatusBody, LogDestination, findZonePorts(), probeControllers, LogEntry (+17 more)

### Community 41 - "cli.module.ts"
Cohesion: 0.11
Nodes (15): ServerAuthModule, databaseEntities, AuditModule, AppCacheModule, cacheTtlMs, AppClsModule, AppConfigModule, createTypeOrmModule() (+7 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "test-database.ts"
Cohesion: 0.21
Nodes (8): apiKeyKinds, ColumnRow, expectedColumns, ColumnRow, ConstraintRow, expectedColumns, truncateAllTables(), useTestDatabase()

### Community 46 - "protocol/src/index.ts"
Cohesion: 0.17
Nodes (13): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, operatorRoles, OperatorTokenRequest (+5 more)

### Community 47 - "logger.module.ts"
Cohesion: 0.20
Nodes (15): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+7 more)

### Community 48 - "Project"
Cohesion: 0.15
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor

### Community 49 - "key-cli.ts"
Cohesion: 0.24
Nodes (18): toLookupPrefix(), CreateProjectInput, auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix() (+10 more)

### Community 50 - "ApiKeysService"
Cohesion: 0.09
Nodes (4): KeyListCommand, KeyRevokeCommand, ApiKeysService, toEvent()

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.11
Nodes (21): fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), ApiRun (+13 more)

### Community 52 - "replica-cache-sync.e2e-spec.ts"
Cohesion: 0.13
Nodes (15): badOrigins, helpEntries, prefixes, expectStatusOnAll(), probeWithKey(), ReplicaProbeController, addOrigins(), OriginAction (+7 more)

### Community 53 - "operator-auth.guard.ts"
Cohesion: 0.13
Nodes (6): OperatorAuthGuard, ServerKeyGuard, OperatorTokenClaims, operatorTokenClaimsSchema, bearerToken(), FakeRequestInput

### Community 54 - "json-object-limits.spec.ts"
Cohesion: 0.09
Nodes (15): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+7 more)

### Community 55 - "replica-events.publisher.ts"
Cohesion: 0.18
Nodes (7): ReplicaEventMessage, replicaEventNames(), ReplicaEventRule, replicaEventRules, errorMessage(), ReplicaEventsPublisher, DomainEventName

### Community 57 - "operators.service.ts"
Cohesion: 0.10
Nodes (13): Operator, OperatorIdRow, OperatorProfile, ChangeOperatorBlockInput, IssuedOperatorToken, IssueOperatorTokenInput, OperatorActorKind, OperatorBlockChange (+5 more)

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 59 - "projects-service.e2e-spec.ts"
Cohesion: 0.08
Nodes (20): IssueApiKeyInput, KeysModule, ProjectsModule, InvalidProjectNameError, ProjectAlreadyExistsError, ProjectNotFoundError, columns, createMain() (+12 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "audit-log.e2e-spec.ts"
Cohesion: 0.10
Nodes (14): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, auditedEventNames(), AuditRecord, AuditRule (+6 more)

### Community 62 - "conversation.entity.spec.ts"
Cohesion: 0.16
Nodes (7): Channel, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 63 - "operator-role.guard.spec.ts"
Cohesion: 0.16
Nodes (8): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey

### Community 65 - "projects.service.ts"
Cohesion: 0.10
Nodes (22): OriginList, originLists, ProjectSnapshot, toProjectSnapshot(), NewProject, ORIGIN_COLUMNS, OriginsRow, ProjectsRepository (+14 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.10
Nodes (20): CryptoModule, authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv (+12 more)

### Community 67 - "metrics.controller.ts"
Cohesion: 0.13
Nodes (8): prom-client@^15.1.3, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, MetricsController, @nestjs/common, prom-client

### Community 68 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.28
Nodes (15): runCaptured(), runCliInProcess(), addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem(), identityKeyListHeader, listIdentityKeys() (+7 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "identity-keys.service.ts"
Cohesion: 0.06
Nodes (14): IdentityKeyRevokeCommand, KeyActorKind, IdentityKey, IdentityKeyAlgorithm, ParsedIdentityKey, IdentityKeysRepository, NewIdentityKey, AddedIdentityKey (+6 more)

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "operation-steps.ts"
Cohesion: 0.28
Nodes (6): operationSteps, OperationTiming, beginOperation(), operationTimingKey, nestjs-cls, @nestjs/typeorm

### Community 73 - "operators.module.ts"
Cohesion: 0.19
Nodes (5): OperatorAuthModule, ServerApiModule, DisabledOperatorsModule, OperatorsModule, TokensModule

### Community 74 - "redis.module.ts"
Cohesion: 0.13
Nodes (14): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, fetchStatus() (+6 more)

### Community 75 - "request-id.spec.ts"
Cohesion: 0.15
Nodes (10): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+2 more)

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "conversation.entity.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 78 - "main.ts"
Cohesion: 0.21
Nodes (13): @nestjs/microservices@^12.1.3, parseDatabase(), parseUrl(), RedisConnectionOptions, redisTransportOptions(), stripIpv6Brackets(), connectReplicaEvents(), replicaEventsMicroservice (+5 more)

### Community 79 - "server-errors.spec.ts"
Cohesion: 0.11
Nodes (15): OperatorDisabledFilter, OperatorDisabledError, ApiException, ApiHttpModule, errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse() (+7 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 81 - "operators.e2e-spec.ts"
Cohesion: 0.14
Nodes (3): DisabledOperators, Probe, OperatorsRepository

### Community 82 - "OperationSteps"
Cohesion: 0.13
Nodes (4): DatabaseStepSubscriber, OperationStep, OperationSteps, OperationStepsProbeController

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.15
Nodes (9): OperatorController(), DisabledProbeController, get(), getAs(), internalAgent(), postToken(), findZonePorts(), startZoneE2eApp() (+1 more)

### Community 85 - "global-setup.ts"
Cohesion: 0.24
Nodes (9): testcontainers@^12.2.1, @testcontainers/postgresql@^12.2.1, runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl(), testcontainers (+1 more)

### Community 87 - "domain-events.ts"
Cohesion: 0.19
Nodes (11): botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent, DomainEventHandler (+3 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "secrets-reencrypt.command.ts"
Cohesion: 0.19
Nodes (9): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+1 more)

### Community 90 - "zone.ts"
Cohesion: 0.11
Nodes (19): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), zonePathPrefixes, probeControllers, ApiZone, apiZones (+11 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "telemetry.interceptor.spec.ts"
Cohesion: 0.11
Nodes (8): slowOperationsConfig, HttpMetrics, StepTimes, FinishedOperation, SlowOperationsModule, roundSteps(), SlowOperations, TelemetryInterceptor

### Community 94 - "api-keys.service.ts"
Cohesion: 0.07
Nodes (26): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey, CachedApiKey, hashMatches(), eventFields, IssueApiKeyBaseInput (+18 more)

### Community 95 - "server-errors.spec.ts"
Cohesion: 0.12
Nodes (18): ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, internalErrorMessage, ApiExceptionInput, entries(), errorEntriesOf() (+10 more)

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "cache-invalidate.controller.spec.ts"
Cohesion: 0.17
Nodes (5): CacheInvalidateController, CacheInvalidateEvent, cacheInvalidateEventSchema, ReplicaEventsModule, replicaEventPatterns

### Community 100 - "JsonObjectValidator"
Cohesion: 0.30
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 101 - "JsonObject"
Cohesion: 0.18
Nodes (6): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, ColumnRow, expectedColumns

### Community 102 - "identity-key-pem.ts"
Cohesion: 0.27
Nodes (7): algorithmOf(), InvalidIdentityKeyError, isP256(), parseIdentityPublicKey(), readPublicKeyObject(), captureError(), expectInvalidKey()

### Community 103 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.24
Nodes (9): issueOperator(), getProbe(), issueOperator(), withToken(), IssuedOperator, issueTestOperator(), OperatorGuardProbeController, operatorProbePath (+1 more)

### Community 105 - "api-docs.spec.ts"
Cohesion: 0.06
Nodes (23): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+15 more)

### Community 107 - "writeLine"
Cohesion: 0.05
Nodes (30): emptyCell, formatDate(), serverKeyOnceWarning, writeLine(), writeTable(), writeWarning(), IdentityKeyAddOptions, readPem() (+22 more)

### Community 108 - "operators.service.spec.ts"
Cohesion: 0.11
Nodes (9): OperatorNotFoundError, OperatorsService, blockInput, BlockProbe, createBlockProbe(), input, Probe, signedToken (+1 more)

### Community 109 - "ref_node_path"
Cohesion: 0.09
Nodes (11): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, databaseUrl(), IdentityRow (+3 more)

### Community 110 - "server/package.json"
Cohesion: 0.08
Nodes (25): author, bin, sowa-chat, @aws-sdk/s3-request-presigner@^3.1151.0, helmet@^8.3.0, @nestjs/bullmq@^12.0.0, @nestjs/platform-socket.io@^12.1.3, @nestjs/websockets@^12.1.3 (+17 more)

### Community 111 - "TokensService"
Cohesion: 0.11
Nodes (8): TokenSigningKey, SignedToken, SignTokenInput, TokenConsumer, TokenAudience, tokenAudiences, TokensService, VerifiedToken

### Community 112 - "api-versioning.spec.ts"
Cohesion: 0.25
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 115 - "typeorm"
Cohesion: 0.12
Nodes (12): channelColumns(), findColumn(), identityKeyAlgorithms, Project, AddProjectsOperatorAllowedOrigins1793300003000, ColumnRow, expectedColumns, jwk (+4 more)

### Community 120 - "cache-invalidation-rules.ts"
Cohesion: 0.17
Nodes (14): apiKeyCacheKeys(), cacheInvalidatedEventNames(), CacheInvalidationRule, cacheInvalidationRules, projectCacheKeys(), apiKeyEvent, projectEvent, LocalCacheInvalidation (+6 more)

### Community 121 - "audit-log.e2e-spec.ts"
Cohesion: 0.23
Nodes (3): AuditScenarios, happenedIn(), ScenarioError

### Community 122 - "secrets-reencryption.service.ts"
Cohesion: 0.14
Nodes (13): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldReencryption, FieldResult, FieldVersionCount, ReencryptInput (+5 more)

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.17
Nodes (6): nestjs-zod@^5.5.0, OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, OperatorTokenResponse, nestjs-zod

### Community 124 - "project-cli.ts"
Cohesion: 0.28
Nodes (8): buildServer(), fullOriginArguments, listHeader, onceWarning, repositoryRoot, runMainCli(), serverDirectory, uuidPattern

### Community 125 - "encryption-keys.schema.spec.ts"
Cohesion: 0.29
Nodes (7): describeErrors(), key1, key1Bytes, key2, key2Bytes, parseKeys(), requiredEnv

### Community 126 - "operator-commands.e2e-spec.ts"
Cohesion: 0.23
Nodes (13): disabledAtOf(), setupOperator(), disabledAtOf(), helpEntries, setupOperator(), OperatorAction, operatorActions, operatorBlockAuditRows() (+5 more)

### Community 127 - "replica-events-offline-redis.e2e-spec.ts"
Cohesion: 0.22
Nodes (10): CapturedRun, stubRefusedRedis(), CliRunResult, MainProject, captureLogLines(), ChannelRecorder, ClosingRedisServer, LogCapture (+2 more)

### Community 128 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 129 - "token-signing-keys.schema.ts"
Cohesion: 0.29
Nodes (6): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, tokenSigningKeysSchema

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 133 - "replica-events.e2e-spec.ts"
Cohesion: 0.29
Nodes (10): expectCachedOnAll(), expectKept(), repositoryRoot, seed(), waitUntilDeleted(), cacheInvalidateSubscribers(), cacheOf(), publishCacheInvalidate() (+2 more)

### Community 134 - "request-context.ts"
Cohesion: 0.18
Nodes (3): RequestContextModule, ConsumerModule, ContextConsumer

### Community 135 - "main.ts"
Cohesion: 0.14
Nodes (14): ApiModule, cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, createContext(), mode (+6 more)

### Community 136 - "zone-servers.ts"
Cohesion: 0.25
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 137 - "test-domain-events.ts"
Cohesion: 0.29
Nodes (7): happened, TestListener, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 139 - "cls-middleware.ts"
Cohesion: 0.46
Nodes (4): useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp()

### Community 141 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 142 - "encryption-keys.schema.ts"
Cohesion: 0.60
Nodes (5): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject()

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 995 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `metrics.controller.ts` to `zod-serialization.spec.ts`, `log-level-warn.spec.ts`, `replica-events.e2e-spec.ts`, `request-context.ts`, `main.ts`, `tokens.service.spec.ts`, `DomainEventBus`, `server-key-guard.e2e-spec.ts`, `cls-middleware.ts`, `zone-servers.ts`, `dependencies`, `test-domain-events.ts`, `RedactionProbeController`, `api-app.ts`, `ProjectsService`, `zone.guard.spec.ts`, `migrate.module.ts`, `config.module.ts`, `@nestjs/testing`, `cli.module.ts`, `logger.module.ts`, `replica-cache-sync.e2e-spec.ts`, `operator-auth.guard.ts`, `replica-events.publisher.ts`, `operators.service.ts`, `projects-service.e2e-spec.ts`, `audit-log.e2e-spec.ts`, `operator-role.guard.spec.ts`, `projects.service.ts`, `encryption.service.spec.ts`, `identity-keys.service.ts`, `operation-steps.ts`, `operators.module.ts`, `redis.module.ts`, `request-id.spec.ts`, `main.ts`, `server-errors.spec.ts`, `health.module.ts`, `operators.e2e-spec.ts`, `operator-auth-guard.e2e-spec.ts`, `secrets-reencrypt.command.ts`, `zone.ts`, `telemetry.interceptor.spec.ts`, `api-keys.service.ts`, `server-errors.spec.ts`, `body-limit.spec.ts`, `cache-invalidate.controller.spec.ts`, `JsonObject`, `operator-auth-guard.e2e-spec.ts`, `api-docs.spec.ts`, `writeLine`, `server/package.json`, `TokensService`, `api-versioning.spec.ts`, `typeorm`, `cache-invalidation-rules.ts`, `audit-log.e2e-spec.ts`, `secrets-reencryption.service.ts`, `operator-token.controller.ts`?**
  _High betweenness centrality (0.266) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07051282051282051 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `database-entities.ts`, `dependencies`, `identity-keys.e2e-spec.ts`, `chat-tables.e2e-spec.ts`, `ConversationEvent`, `test-database.ts`, `Project`, `key-cli.ts`, `log-settings.e2e-spec.ts`, `replica-cache-sync.e2e-spec.ts`, `operators.service.ts`, `migrate-mode.e2e-spec.ts`, `projects-service.e2e-spec.ts`, `test-secrets.ts`, `conversation.entity.spec.ts`, `operation-steps.ts`, `participant.entity.spec.ts`, `conversation.entity.ts`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `api-keys.service.ts`, `JsonObject`, `operator-auth-guard.e2e-spec.ts`, `ref_node_path`, `server/package.json`, `operator-commands.e2e-spec.ts`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `ProjectsService` connect `ProjectsService` to `projects.service.ts`, `identity-keys.service.ts`, `writeLine`, `operators.service.spec.ts`, `IdentityKeyAddCommand`, `ApiKeysService`, `replica-cache-sync.e2e-spec.ts`, `ProjectCreateCommand`, `projects-service.e2e-spec.ts`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._