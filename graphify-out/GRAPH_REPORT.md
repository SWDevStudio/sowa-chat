# Graph Report - hector-chat-epic-14  (2026-10-29)

## Corpus Check
- 371 files · ~90,726 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2602 nodes · 6121 edges · 140 communities (111 shown, 29 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 155 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `45f9f329`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- log-redaction.spec.ts
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
- @nestjs/common
- @nestjs/testing
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
- migrate.module.ts
- tsconfig.build.json
- ValidationProbeController
- config.module.ts
- nest-cli.json
- @nestjs/testing
- typeorm
- server-sdk/tsconfig.json
- ResponseProbeController
- test-database.ts
- identity-key-commands.e2e-spec.ts
- logger.module.ts
- Visitor
- key-cli.ts
- writeLine
- log-settings.e2e-spec.ts
- projects.service.ts
- operator-auth.guard.ts
- protocol/src/index.ts
- tokens.service.ts
- ProjectCreateCommand
- Zone
- migrate-mode.e2e-spec.ts
- project-snapshot-cache.e2e-spec.ts
- test-secrets.ts
- audit-log.e2e-spec.ts
- conversation.entity.spec.ts
- ref_node_crypto
- operator-role.guard.spec.ts
- projects-service.e2e-spec.ts
- encryption.service.spec.ts
- metrics.controller.ts
- server-api.module.ts
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- origin.ts
- OperationSteps
- redis.module.ts
- request-id.spec.ts
- participant.entity.spec.ts
- conversation.entity.ts
- main.ts
- server-errors.spec.ts
- health.module.ts
- operators.e2e-spec.ts
- .getByName
- workspace-check-types.e2e-spec.ts
- operator-auth-guard.e2e-spec.ts
- global-setup.ts
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
- conversation-indexes.e2e-spec.ts
- cli-mode.e2e-spec.ts
- identity-key-pem.ts
- JsonObjectValidator
- identity-keys.service.ts
- json-object-limits.spec.ts
- packages-build.e2e-spec.ts
- IdentityKeyAddCommand
- api-docs.spec.ts
- SlowProbeController
- key-list.command.ts
- Operator
- ref_node_path
- server/package.json
- @aws-sdk/client-s3@^3.1151.0
- api-versioning.spec.ts
- KeyRevokeCommand
- domain-event-bus.spec.ts
- KeyCreateCommand
- secrets-reencryption.service.ts
- operator-token.controller.ts
- InternalProbeController
- encryption-keys.schema.spec.ts
- @nest-lab/throttler-storage-redis@^1.2.0
- ProjectsService
- @nestjs/microservices@^12.1.3
- @nestjs/swagger
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- identity-key-list.command.ts
- encryption-keys.schema.ts
- token-signing-keys.schema.ts
- TestEncryptionConfigModule
- @nestjs/platform-socket.io@^12.1.3

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 134 edges
2. `typeorm` - 55 edges
3. `Zone()` - 50 edges
4. `Project` - 47 edges
5. `@nestjs/testing` - 43 edges
6. `ProjectsService` - 40 edges
7. `useTestDatabase()` - 35 edges
8. `DomainEventBus` - 31 edges
9. `ApiKeysService` - 29 edges
10. `ApiKey` - 28 edges

## Surprising Connections (you probably didn't know these)
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
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

## Communities (140 total, 29 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.07
Nodes (9): CreateProjects1793193549883, CreateAuditLog1793200000000, AddConversationIndexes1793215983154, CreateApiKeys1793300000000, CreateIdentityKeys1793300001000, AddProjectsPublicKey1793300002000, AddProjectsOperatorAllowedOrigins1793300003000, CreateOperators1793300003000 (+1 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-redaction.spec.ts"
Cohesion: 0.06
Nodes (21): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+13 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "tokens.service.spec.ts"
Cohesion: 0.13
Nodes (26): ConsumerModule, TestTokenSigningConfigModule, encodePart(), flipSignatureBit(), ForgedTokenInput, forgeToken(), forgeUnsecuredToken(), parseTestSigningKeys() (+18 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.06
Nodes (24): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+16 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "DomainEventBus"
Cohesion: 0.10
Nodes (24): project, snapshot, AppCacheModule, cacheTtlMs, apiKeyCacheKeys(), cacheInvalidatedEventNames(), CacheInvalidationRule, cacheInvalidationRules (+16 more)

### Community 10 - "RequestContext"
Cohesion: 0.09
Nodes (4): RequestContext, ContextConsumer, GuardProbeController, OperatorGuardProbeController

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.06
Nodes (33): dependencies, @aws-sdk/s3-request-presigner@^3.1151.0, bullmq@^6.3.15, cache-manager@^7.2.9, helmet@^8.3.0, jose@^6.2.12, nest-commander@^3.21.0, @nestjs/cache-manager@^12.0.1 (+25 more)

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
Cohesion: 0.13
Nodes (13): OperatorDisabledFilter, OperatorDisabledError, errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter (+5 more)

### Community 23 - "@nestjs/common"
Cohesion: 0.17
Nodes (8): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), RequestContextModule, ConsumerModule, @nestjs/common

### Community 24 - "@nestjs/testing"
Cohesion: 0.09
Nodes (12): AuditLogEntry, KeysModule, ProjectsModule, WorkerModule, ColumnRow, expectedColumns, expectNoKeyRows(), expectNoRows() (+4 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "Option"
Cohesion: 0.10
Nodes (14): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand (+6 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.16
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.09
Nodes (27): ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation(), createMessage() (+19 more)

### Community 32 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.13
Nodes (19): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+11 more)

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
Nodes (15): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig (+7 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "@nestjs/testing"
Cohesion: 0.07
Nodes (28): HealthBody, HealthEntry, DependencyStatusBody, StatusBody, ApiHttpModule, LogDestination, probeControllers, startListening() (+20 more)

### Community 41 - "typeorm"
Cohesion: 0.16
Nodes (7): database, loadDataSource(), databaseEntities, channelColumns(), findColumn(), Project, typeorm

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "ResponseProbeController"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 45 - "test-database.ts"
Cohesion: 0.12
Nodes (15): identityKeyAlgorithms, issueServerKey(), ColumnRow, expectedColumns, jwk, createProjectWithKey(), internalAgent(), postToken() (+7 more)

### Community 46 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.24
Nodes (15): addKey(), addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem(), identityKeyListHeader, listIdentityKeys(), PemWriter (+7 more)

### Community 47 - "logger.module.ts"
Cohesion: 0.18
Nodes (16): pino@^10.4.0, createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions() (+8 more)

### Community 48 - "Visitor"
Cohesion: 0.15
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor

### Community 49 - "key-cli.ts"
Cohesion: 0.12
Nodes (39): toLookupPrefix(), badOrigins, helpEntries, prefixes, CliRunResult, runCliInProcess(), auditRowsByAction(), createdKey() (+31 more)

### Community 50 - "writeLine"
Cohesion: 0.12
Nodes (16): emptyCell, serverKeyOnceWarning, writeLine(), writeTable(), writeWarning(), IdentityKeyRevokeOptions, KeyCreateOptions, KeyGenerateCommand (+8 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "projects.service.ts"
Cohesion: 0.12
Nodes (18): originLists, toProjectSnapshot(), NewProject, ORIGIN_COLUMNS, OriginsRow, CreatedProject, CreateProjectInput, InvalidProjectNameError (+10 more)

### Community 53 - "operator-auth.guard.ts"
Cohesion: 0.13
Nodes (6): OperatorAuthGuard, ServerKeyGuard, OperatorTokenClaims, operatorTokenClaimsSchema, bearerToken(), FakeRequestInput

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.10
Nodes (15): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, jsonObjectSchema, JsonValue (+7 more)

### Community 55 - "tokens.service.ts"
Cohesion: 0.10
Nodes (10): OperatorAuthModule, TokenSigningKey, TokensModule, SignedToken, SignTokenInput, TokenConsumer, TokenAudience, tokenAudiences (+2 more)

### Community 57 - "Zone"
Cohesion: 0.06
Nodes (19): OperatorController(), ServerController(), BodyProbeController, InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController (+11 more)

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.12
Nodes (20): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), BrokenMigration1700000000000 (+12 more)

### Community 59 - "project-snapshot-cache.e2e-spec.ts"
Cohesion: 0.13
Nodes (5): OriginList, ProjectSnapshot, ProjectsRepository, ChangeOriginInput, lists

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "audit-log.e2e-spec.ts"
Cohesion: 0.10
Nodes (17): ActorKind, actorKinds, AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, NewAuditLogEntry (+9 more)

### Community 62 - "conversation.entity.spec.ts"
Cohesion: 0.16
Nodes (7): Channel, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 63 - "ref_node_crypto"
Cohesion: 0.10
Nodes (17): ApiKey, apiKeyKinds, eventFields, keyTypeByKind, serverKey, hashKey(), ColumnRow, expectedColumns (+9 more)

### Community 64 - "operator-role.guard.spec.ts"
Cohesion: 0.12
Nodes (11): @nestjs/core@^12.0.1, OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly() (+3 more)

### Community 65 - "projects-service.e2e-spec.ts"
Cohesion: 0.16
Nodes (16): columns, createMain(), emptyLists, eventNames, listRow(), lists, originAuditRows(), otherList (+8 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.10
Nodes (20): CryptoModule, authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv (+12 more)

### Community 67 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "IdentityKey"
Cohesion: 0.09
Nodes (6): IdentityKey, IdentityKeysRepository, IdentityKeyKidTakenError, IdentityKeysService, InvalidIdentityKeyIdError, toEvent()

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "origin.ts"
Cohesion: 0.27
Nodes (6): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl()

### Community 73 - "OperationSteps"
Cohesion: 0.07
Nodes (16): ServerAuthModule, AppClsModule, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, DatabaseStepSubscriber, OperationStep (+8 more)

### Community 74 - "redis.module.ts"
Cohesion: 0.13
Nodes (15): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, fetchStatus() (+7 more)

### Community 75 - "request-id.spec.ts"
Cohesion: 0.13
Nodes (10): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+2 more)

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "conversation.entity.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 78 - "main.ts"
Cohesion: 0.12
Nodes (18): ApiModule, cliName, commanderArgv(), runCliCommand(), startupLogLevels, useClsMiddleware(), echoRequestId(), resolveRequestId() (+10 more)

### Community 79 - "server-errors.spec.ts"
Cohesion: 0.11
Nodes (19): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, internalErrorMessage, ApiExceptionInput, entries() (+11 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 81 - "operators.e2e-spec.ts"
Cohesion: 0.10
Nodes (9): DisabledOperators, Probe, OperatorsRepository, IssuedOperatorToken, OperatorsService, operatorTokenTtlSeconds, input, Probe (+1 more)

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.13
Nodes (15): OperatorProfile, IssueOperatorTokenInput, RequestOperator, issueOperator(), getProbe(), issueOperator(), withToken(), get() (+7 more)

### Community 85 - "global-setup.ts"
Cohesion: 0.24
Nodes (9): testcontainers@^12.2.1, @testcontainers/postgresql@^12.2.1, runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl(), testcontainers (+1 more)

### Community 87 - "audited-events.spec.ts"
Cohesion: 0.14
Nodes (10): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+2 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "secrets-reencrypt.command.ts"
Cohesion: 0.19
Nodes (9): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+1 more)

### Community 90 - "zone.ts"
Cohesion: 0.12
Nodes (22): configureApiApp(), DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, noStore() (+14 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "telemetry.interceptor.ts"
Cohesion: 0.11
Nodes (7): HttpMetrics, StepTimes, FinishedOperation, SlowOperationsModule, roundSteps(), SlowOperations, TelemetryInterceptor

### Community 94 - "api-keys.service.ts"
Cohesion: 0.10
Nodes (15): ApiKeyKind, ApiKeysRepository, NewApiKey, ApiKeysService, CachedApiKey, hashMatches(), IssueApiKeyBaseInput, IssueApiKeyInput (+7 more)

### Community 95 - "telemetry.interceptor.spec.ts"
Cohesion: 0.24
Nodes (3): readMetricLines(), TelemetryProbeController, zoneUrl()

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.31
Nodes (8): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), RunningServer

### Community 97 - "conversation-indexes.e2e-spec.ts"
Cohesion: 0.17
Nodes (9): DatabaseMigration, databaseMigrations, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity, SecondEntity, IndexRow (+1 more)

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "identity-key-pem.ts"
Cohesion: 0.27
Nodes (7): algorithmOf(), InvalidIdentityKeyError, isP256(), parseIdentityPublicKey(), readPublicKeyObject(), captureError(), expectInvalidKey()

### Community 100 - "JsonObjectValidator"
Cohesion: 0.17
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, JsonObjectValidator, Violation, JsonObjectLimits, encoder (+1 more)

### Community 101 - "identity-keys.service.ts"
Cohesion: 0.24
Nodes (10): @nestjs-cls/transactional-adapter-typeorm@^2.0.1, KeyActorKind, IdentityKeyAlgorithm, ParsedIdentityKey, NewIdentityKey, AddedIdentityKey, AddIdentityKeyInput, RevokeIdentityKeyInput (+2 more)

### Community 102 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 103 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 104 - "IdentityKeyAddCommand"
Cohesion: 0.19
Nodes (3): IdentityKeyAddCommand, IdentityKeyAddOptions, readPem()

### Community 105 - "api-docs.spec.ts"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 107 - "key-list.command.ts"
Cohesion: 0.18
Nodes (5): header, KeyListCommand, KeyListOptions, toRow(), ApiKeySummary

### Community 109 - "ref_node_path"
Cohesion: 0.13
Nodes (10): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, databaseUrl(), IdentityRow (+2 more)

### Community 110 - "server/package.json"
Cohesion: 0.08
Nodes (23): author, bin, sowa-chat, file-type@^22.1.1, @nestjs/bullmq@^12.0.0, @nestjs/websockets@^12.1.3, pino-http@^11.0.0, rxjs@^7.8.1 (+15 more)

### Community 112 - "api-versioning.spec.ts"
Cohesion: 0.25
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 120 - "domain-event-bus.spec.ts"
Cohesion: 0.21
Nodes (8): happened, TestListener, OnDomainEvent(), TelemetryModule, DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 122 - "secrets-reencryption.service.ts"
Cohesion: 0.14
Nodes (13): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldReencryption, FieldResult, FieldVersionCount, ReencryptInput (+5 more)

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.20
Nodes (6): nestjs-zod@^5.5.0, OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, OperatorTokenResponse, nestjs-zod

### Community 124 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 125 - "encryption-keys.schema.spec.ts"
Cohesion: 0.29
Nodes (7): describeErrors(), key1, key1Bytes, key2, key2Bytes, parseKeys(), requiredEnv

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 134 - "identity-key-list.command.ts"
Cohesion: 0.20
Nodes (5): formatDate(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow()

### Community 141 - "encryption-keys.schema.ts"
Cohesion: 0.60
Nodes (5): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject()

### Community 143 - "token-signing-keys.schema.ts"
Cohesion: 0.67
Nodes (5): parseEntry(), parseKeys(), parsePrivateKey(), reject(), tokenSigningKeysSchema

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 950 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `log-redaction.spec.ts`, `identity-key-list.command.ts`, `tokens.service.spec.ts`, `DomainEventBus`, `dependencies`, `http-error.filter.spec.ts`, `@nestjs/testing`, `Option`, `server-key-guard.e2e-spec.ts`, `zone.guard.spec.ts`, `migrate.module.ts`, `config.module.ts`, `@nestjs/testing`, `ResponseProbeController`, `test-database.ts`, `logger.module.ts`, `writeLine`, `projects.service.ts`, `operator-auth.guard.ts`, `tokens.service.ts`, `Zone`, `audit-log.e2e-spec.ts`, `operator-role.guard.spec.ts`, `encryption.service.spec.ts`, `metrics.controller.ts`, `server-api.module.ts`, `OperationSteps`, `redis.module.ts`, `request-id.spec.ts`, `main.ts`, `server-errors.spec.ts`, `health.module.ts`, `operators.e2e-spec.ts`, `operator-auth-guard.e2e-spec.ts`, `secrets-reencrypt.command.ts`, `zone.ts`, `telemetry.interceptor.ts`, `api-keys.service.ts`, `telemetry.interceptor.spec.ts`, `identity-keys.service.ts`, `IdentityKeyAddCommand`, `api-docs.spec.ts`, `key-list.command.ts`, `server/package.json`, `api-versioning.spec.ts`, `domain-event-bus.spec.ts`, `secrets-reencryption.service.ts`, `operator-token.controller.ts`?**
  _High betweenness centrality (0.268) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `dependencies`, `@nestjs/testing`, `chat-tables.e2e-spec.ts`, `ConversationEvent`, `test-database.ts`, `Visitor`, `key-cli.ts`, `migrate-mode.e2e-spec.ts`, `test-secrets.ts`, `conversation.entity.spec.ts`, `ref_node_crypto`, `projects-service.e2e-spec.ts`, `OperationSteps`, `participant.entity.spec.ts`, `conversation.entity.ts`, `operators.e2e-spec.ts`, `operator-auth-guard.e2e-spec.ts`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `conversation-indexes.e2e-spec.ts`, `ref_node_path`, `server/package.json`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `@nestjs/testing` to `devDependencies`, `tokens.service.spec.ts`, `DomainEventBus`, `@nestjs/common`, `server-key-guard.e2e-spec.ts`, `config.module.ts`, `@nestjs/testing`, `test-database.ts`, `logger.module.ts`, `key-cli.ts`, `projects.service.ts`, `migrate-mode.e2e-spec.ts`, `project-snapshot-cache.e2e-spec.ts`, `test-secrets.ts`, `audit-log.e2e-spec.ts`, `ref_node_crypto`, `projects-service.e2e-spec.ts`, `encryption.service.spec.ts`, `OperationSteps`, `redis.module.ts`, `main.ts`, `operators.e2e-spec.ts`, `zone.ts`, `server/package.json`, `domain-event-bus.spec.ts`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Should `log-redaction.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05939716312056738 - nodes in this community are weakly interconnected._