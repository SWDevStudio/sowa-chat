# Graph Report - hector-chat-epic-14  (2026-10-29)

## Corpus Check
- 369 files · ~89,419 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2592 nodes · 6064 edges · 153 communities (110 shown, 43 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 154 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6c958d91`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- request-id.spec.ts
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
- http-error.filter.spec.ts
- request-context.ts
- AuditLogEntry
- scripts
- Option
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- server-key-guard.e2e-spec.ts
- zone.guard.spec.ts
- ConversationEvent
- cli.module.ts
- tsconfig.build.json
- ValidationProbeController
- config.module.ts
- nest-cli.json
- @nestjs/testing
- typeorm
- server-sdk/tsconfig.json
- ResponseProbeController
- test-database.ts
- RedactionProbeController
- main.ts
- Visitor
- key-cli.ts
- writeLine
- log-settings.e2e-spec.ts
- projects.service.ts
- operator-auth.guard.ts
- protocol/src/index.ts
- tokens.service.ts
- ProjectCreateCommand
- @nestjs/common
- migrate-mode.e2e-spec.ts
- ProjectsService
- test-secrets.ts
- audit-log.e2e-spec.ts
- log-redaction.spec.ts
- api-keys-service-probe.ts
- operator-role.guard.spec.ts
- projects-service.e2e-spec.ts
- encryption.service.spec.ts
- security-headers.spec.ts
- operators.e2e-spec.ts
- config-startup.e2e-spec.ts
- identity-keys.service.ts
- server-protocol.e2e-spec.ts
- projects.service.ts
- OperationSteps
- redis.module.ts
- request-id.spec.ts
- participant.entity.spec.ts
- conversation.entity.ts
- zone-e2e-app.ts
- error-code-of-status.ts
- health.module.ts
- operators.e2e-spec.ts
- .getByName
- workspace-check-types.e2e-spec.ts
- operator-auth-guard.e2e-spec.ts
- origin-cli.ts
- CreateChatTables1793215389271
- audited-events.spec.ts
- secrets-reencrypt-command.e2e-spec.ts
- secrets-reencrypt.command.ts
- zone.ts
- Message
- telemetry.interceptor.ts
- SecretsReencryptionService
- api-keys.service.ts
- telemetry.interceptor.spec.ts
- log-redaction.e2e-spec.ts
- database-entities.ts
- cli-mode.e2e-spec.ts
- operators.service.ts
- JsonObjectValidator
- zod-serialization.spec.ts
- json-object-limits.spec.ts
- packages-build.e2e-spec.ts
- IdentityKeyAddCommand
- api-docs.spec.ts
- SlowProbeController
- body-limit.ts
- Operator
- ref_node_path
- server/package.json
- @aws-sdk/client-s3@^3.1151.0
- @aws-sdk/s3-request-presigner@^3.1151.0
- helmet
- TestListener
- body-limit.spec.ts
- secrets-reencryption.service.ts
- operator-token.controller.ts
- InternalProbeController
- encryption-keys.schema.spec.ts
- @nestjs/throttler@^6.7.1
- project-list.command.ts
- findFreePort
- ZoneServers
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- server-errors.spec.ts
- identity-key-list.command.ts
- pino-pretty@^13.2.0
- @nestjs/websockets@^12.1.3
- .canActivate
- ServerKeyGuard
- token-signing-keys.schema.spec.ts
- .current
- encryption-keys.schema.ts
- env.schema.spec.ts
- token-signing-keys.schema.ts
- TestTokenSigningConfigModule
- RolesProbeController
- TestEncryptionConfigModule
- file-type@^22.1.1
- @nestjs/bullmq@^12.0.0
- @nestjs/platform-socket.io@^12.1.3
- pino-http
- rxjs

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 134 edges
2. `typeorm` - 55 edges
3. `Zone()` - 50 edges
4. `Project` - 47 edges
5. `@nestjs/testing` - 42 edges
6. `ProjectsService` - 40 edges
7. `useTestDatabase()` - 34 edges
8. `DomainEventBus` - 31 edges
9. `ApiKey` - 27 edges
10. `ApiKeysService` - 27 edges

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

## Communities (153 total, 43 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.07
Nodes (12): databaseMigrations, migrationFiles, migrationsDirectory, CreateProjects1793193549883, CreateAuditLog1793200000000, AddConversationIndexes1793215983154, CreateApiKeys1793300000000, CreateIdentityKeys1793300001000 (+4 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "request-id.spec.ts"
Cohesion: 0.18
Nodes (9): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+1 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, socket.io-client@catalog:, source-map-support@^0.5.21, supertest@^7.0.0 (+25 more)

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
Cohesion: 0.12
Nodes (13): project, snapshot, cacheTtlMs, CacheInvalidationRule, LocalCacheInvalidation, apiKeyEvent, projectEvent, DomainEventBus (+5 more)

### Community 10 - "RequestContext"
Cohesion: 0.13
Nodes (3): RequestContext, GuardProbeController, OperatorGuardProbeController

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

### Community 22 - "http-error.filter.spec.ts"
Cohesion: 0.11
Nodes (15): OperatorDisabledFilter, OperatorDisabledError, ApiHttpModule, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse() (+7 more)

### Community 23 - "request-context.ts"
Cohesion: 0.14
Nodes (7): OperatorProfile, IssueOperatorTokenInput, RequestContextModule, RequestOperator, ConsumerModule, ContextConsumer, OperatorRole

### Community 24 - "AuditLogEntry"
Cohesion: 0.16
Nodes (9): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns, ProjectFixture (+1 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "Option"
Cohesion: 0.11
Nodes (7): listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand, OriginListCommand, OriginRemoveCommand

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
Cohesion: 0.07
Nodes (29): ColumnRow, ForeignKeyRow, IndexRow, tableNames, IndexRow, PlanRow, countRows(), createChannel() (+21 more)

### Community 32 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.11
Nodes (20): KeyRevokeOptions, base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62() (+12 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "cli.module.ts"
Cohesion: 0.10
Nodes (15): ServerApiModule, ServerAuthModule, databaseEntities, AuditModule, AppCacheModule, AppClsModule, AppConfigModule, DatabaseModule (+7 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "config.module.ts"
Cohesion: 0.28
Nodes (13): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig (+5 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "@nestjs/testing"
Cohesion: 0.11
Nodes (20): DependencyStatusBody, StatusBody, LogDestination, probeControllers, LogEntry, offlineDataSource, withOfflineDatabase(), offlineRedis (+12 more)

### Community 41 - "typeorm"
Cohesion: 0.09
Nodes (15): Channel, channelColumns(), findColumn(), ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, columns() (+7 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "test-database.ts"
Cohesion: 0.13
Nodes (16): apiKeyKinds, identityKeyAlgorithms, ColumnRow, expectedColumns, ColumnRow, expectedColumns, jwk, createProjectWithKey() (+8 more)

### Community 47 - "main.ts"
Cohesion: 0.06
Nodes (33): cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, DatabaseMigrationStep, createLogDestination(), logFileDescriptor() (+25 more)

### Community 48 - "Visitor"
Cohesion: 0.15
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor

### Community 49 - "key-cli.ts"
Cohesion: 0.11
Nodes (42): toLookupPrefix(), hashKey(), CreateProjectInput, CliRunResult, runCliInProcess(), addEd25519Key(), addIdentityKey(), addP256Key() (+34 more)

### Community 50 - "writeLine"
Cohesion: 0.12
Nodes (13): emptyCell, serverKeyOnceWarning, writeLine(), writeTable(), writeWarning(), IdentityKeyAddOptions, readPem(), IdentityKeyRevokeOptions (+5 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "projects.service.ts"
Cohesion: 0.11
Nodes (17): IssuedApiKey, OriginList, originLists, toProjectSnapshot(), ChangeOriginInput, CreatedProject, InvalidProjectNameError, ORIGINS_EVENTS (+9 more)

### Community 53 - "operator-auth.guard.ts"
Cohesion: 0.26
Nodes (6): ApiException, ApiExceptionInput, ErrorDetail, bearerToken(), FakeRequestInput, ErrorCode

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.13
Nodes (13): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, operatorRoles, OperatorTokenRequest (+5 more)

### Community 55 - "tokens.service.ts"
Cohesion: 0.12
Nodes (8): TokenSigningKey, SignedToken, SignTokenInput, TokenConsumer, TokenAudience, tokenAudiences, TokensService, VerifiedToken

### Community 57 - "@nestjs/common"
Cohesion: 0.08
Nodes (18): OperatorController(), ServerController(), NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController, calls, ProbeBodyDto (+10 more)

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.17
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, withClient() (+3 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "audit-log.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, auditedEventNames(), AuditRule, auditRules (+5 more)

### Community 62 - "log-redaction.spec.ts"
Cohesion: 0.20
Nodes (10): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+2 more)

### Community 63 - "api-keys-service-probe.ts"
Cohesion: 0.24
Nodes (12): eventFields, keyTypeByKind, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred (+4 more)

### Community 64 - "operator-role.guard.spec.ts"
Cohesion: 0.16
Nodes (8): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey

### Community 65 - "projects-service.e2e-spec.ts"
Cohesion: 0.08
Nodes (23): ProjectsModule, NewProject, ORIGIN_COLUMNS, OriginsRow, ProjectsRepository, WorkerModule, columns, createMain() (+15 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.09
Nodes (20): CryptoModule, authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv (+12 more)

### Community 67 - "security-headers.spec.ts"
Cohesion: 0.21
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 68 - "operators.e2e-spec.ts"
Cohesion: 0.19
Nodes (4): OperatorAuthModule, OperatorsModule, TokensModule, createProjectRequest()

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "identity-keys.service.ts"
Cohesion: 0.06
Nodes (31): KeyActorKind, IdentityKey, IdentityKeyAlgorithm, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey() (+23 more)

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "projects.service.ts"
Cohesion: 0.17
Nodes (13): addOriginTo(), describeAdd(), describeRemove(), OriginOptions, ProjectOptions, removeOriginFrom(), ALLOWED_PROTOCOLS, InvalidOriginError (+5 more)

### Community 73 - "OperationSteps"
Cohesion: 0.14
Nodes (8): nestjs-cls@^7.0.1, DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationSteps, operationTimingKey, nestjs-cls

### Community 74 - "redis.module.ts"
Cohesion: 0.20
Nodes (8): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 75 - "request-id.spec.ts"
Cohesion: 0.20
Nodes (9): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+1 more)

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "conversation.entity.ts"
Cohesion: 0.11
Nodes (10): Conversation, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind, messageSenderKinds, MessageType, messageTypes, ParticipantKind (+2 more)

### Community 78 - "zone-e2e-app.ts"
Cohesion: 0.18
Nodes (12): configureApiApp(), ApiModule, useClsMiddleware(), noStore(), useSecurityHeaders(), echoRequestId(), resolveRequestId(), beginOperation() (+4 more)

### Community 79 - "error-code-of-status.ts"
Cohesion: 0.18
Nodes (8): errorCodeStatuses, errorCodeByStatus, errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody

### Community 80 - "health.module.ts"
Cohesion: 0.08
Nodes (12): @nestjs/terminus@^12.1.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+4 more)

### Community 81 - "operators.e2e-spec.ts"
Cohesion: 0.16
Nodes (3): DisabledOperators, Probe, OperatorsRepository

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.12
Nodes (12): OperatorsService, DisabledProbeController, issueOperator(), getProbe(), issueOperator(), withToken(), get(), getAs() (+4 more)

### Community 85 - "origin-cli.ts"
Cohesion: 0.24
Nodes (11): badOrigins, helpEntries, prefixes, addOrigins(), OriginAction, OriginCommandOptions, originGroups, originsOf() (+3 more)

### Community 87 - "audited-events.spec.ts"
Cohesion: 0.10
Nodes (22): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+14 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "secrets-reencrypt.command.ts"
Cohesion: 0.16
Nodes (11): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+3 more)

### Community 90 - "zone.ts"
Cohesion: 0.15
Nodes (17): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes (+9 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "telemetry.interceptor.ts"
Cohesion: 0.12
Nodes (7): slowOperationsConfig, HttpMetrics, StepTimes, FinishedOperation, roundSteps(), SlowOperations, TelemetryInterceptor

### Community 94 - "api-keys.service.ts"
Cohesion: 0.06
Nodes (14): KeyRevokeCommand, ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey, ApiKeysService, ApiKeySummary, hashMatches() (+6 more)

### Community 95 - "telemetry.interceptor.spec.ts"
Cohesion: 0.12
Nodes (6): ProbeService, readMetricLines(), TelemetryProbeController, zoneUrl(), ZoneProbeApp, @nestjs/core

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 97 - "database-entities.ts"
Cohesion: 0.13
Nodes (15): database, loadDataSource(), DatabaseMigration, createTypeOrmModule(), getTypeOrmModule(), createDataSourceOptions(), DatabaseConnection, DatabaseEntity (+7 more)

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "operators.service.ts"
Cohesion: 0.20
Nodes (7): OperatorTokenClaims, operatorTokenClaimsSchema, IssuedOperatorToken, operatorTokenTtlSeconds, input, Probe, signedToken

### Community 101 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 102 - "json-object-limits.spec.ts"
Cohesion: 0.08
Nodes (16): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+8 more)

### Community 103 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 105 - "api-docs.spec.ts"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 107 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 109 - "ref_node_path"
Cohesion: 0.13
Nodes (10): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, databaseUrl(), IdentityRow, VersionRow, useTestRedis() (+2 more)

### Community 110 - "server/package.json"
Cohesion: 0.10
Nodes (19): author, bin, sowa-chat, bullmq@^6.3.15, @nest-lab/throttler-storage-redis@^1.2.0, reflect-metadata@^0.2.2, sharp@^0.35.5, zod@catalog: (+11 more)

### Community 120 - "TestListener"
Cohesion: 0.47
Nodes (3): TestListener, OnDomainEvent(), TestIgnoredEvent

### Community 122 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldResult, ReencryptInput, reencryptionBatchSize, ReencryptionReport (+3 more)

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.20
Nodes (6): nestjs-zod@^5.5.0, OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, OperatorTokenResponse, nestjs-zod

### Community 124 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 125 - "encryption-keys.schema.spec.ts"
Cohesion: 0.29
Nodes (7): describeErrors(), key1, key1Bytes, key2, key2Bytes, parseKeys(), requiredEnv

### Community 127 - "project-list.command.ts"
Cohesion: 0.28
Nodes (4): formatOrigins(), header, ProjectListCommand, toRow()

### Community 128 - "findFreePort"
Cohesion: 0.13
Nodes (18): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), serverEnvironment() (+10 more)

### Community 129 - "ZoneServers"
Cohesion: 0.25
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.25
Nodes (6): DependencyStatusBody, fetchStatus(), repositoryRoot, serverPackageJson, StatusBody, waitForHttpStatus()

### Community 133 - "server-errors.spec.ts"
Cohesion: 0.32
Nodes (6): ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, stringsInside()

### Community 134 - "identity-key-list.command.ts"
Cohesion: 0.10
Nodes (9): formatDate(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow(), header, KeyListCommand, KeyListOptions (+1 more)

### Community 141 - "encryption-keys.schema.ts"
Cohesion: 0.60
Nodes (5): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject()

### Community 143 - "token-signing-keys.schema.ts"
Cohesion: 0.67
Nodes (5): parseEntry(), parseKeys(), parsePrivateKey(), reject(), tokenSigningKeysSchema

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 947 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **43 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `ZoneServers`, `request-id.spec.ts`, `server-errors.spec.ts`, `identity-key-list.command.ts`, `tokens.service.spec.ts`, `DomainEventBus`, `dependencies`, `http-error.filter.spec.ts`, `request-context.ts`, `AuditLogEntry`, `server-key-guard.e2e-spec.ts`, `zone.guard.spec.ts`, `cli.module.ts`, `config.module.ts`, `@nestjs/testing`, `test-database.ts`, `main.ts`, `writeLine`, `projects.service.ts`, `operator-auth.guard.ts`, `tokens.service.ts`, `audit-log.e2e-spec.ts`, `log-redaction.spec.ts`, `operator-role.guard.spec.ts`, `projects-service.e2e-spec.ts`, `encryption.service.spec.ts`, `security-headers.spec.ts`, `operators.e2e-spec.ts`, `identity-keys.service.ts`, `projects.service.ts`, `OperationSteps`, `redis.module.ts`, `request-id.spec.ts`, `zone-e2e-app.ts`, `health.module.ts`, `operators.e2e-spec.ts`, `operator-auth-guard.e2e-spec.ts`, `secrets-reencrypt.command.ts`, `zone.ts`, `telemetry.interceptor.ts`, `api-keys.service.ts`, `telemetry.interceptor.spec.ts`, `operators.service.ts`, `zod-serialization.spec.ts`, `api-docs.spec.ts`, `body-limit.ts`, `server/package.json`, `body-limit.spec.ts`, `secrets-reencryption.service.ts`, `operator-token.controller.ts`, `project-list.command.ts`?**
  _High betweenness centrality (0.275) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06538461538461539 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `findFreePort`, `dependencies`, `AuditLogEntry`, `chat-tables.e2e-spec.ts`, `ConversationEvent`, `test-database.ts`, `Visitor`, `key-cli.ts`, `migrate-mode.e2e-spec.ts`, `test-secrets.ts`, `projects-service.e2e-spec.ts`, `identity-keys.service.ts`, `OperationSteps`, `participant.entity.spec.ts`, `conversation.entity.ts`, `operators.e2e-spec.ts`, `operator-auth-guard.e2e-spec.ts`, `origin-cli.ts`, `CreateChatTables1793215389271`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `database-entities.ts`, `ref_node_path`, `server/package.json`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `projects-service.e2e-spec.ts` to `findFreePort`, `devDependencies`, `tokens.service.spec.ts`, `DomainEventBus`, `request-context.ts`, `AuditLogEntry`, `server-key-guard.e2e-spec.ts`, `cli.module.ts`, `config.module.ts`, `@nestjs/testing`, `main.ts`, `key-cli.ts`, `projects.service.ts`, `test-secrets.ts`, `audit-log.e2e-spec.ts`, `api-keys-service-probe.ts`, `encryption.service.spec.ts`, `operators.e2e-spec.ts`, `identity-keys.service.ts`, `OperationSteps`, `zone-e2e-app.ts`, `operators.e2e-spec.ts`, `operators.service.ts`, `server/package.json`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._