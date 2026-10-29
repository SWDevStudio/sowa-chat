# Graph Report - hector-chat-epic-14  (2026-10-29)

## Corpus Check
- 384 files · ~94,753 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2677 nodes · 6337 edges · 155 communities (118 shown, 37 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 162 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `09ce3316`
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
- body-limit.ts
- identity-keys.e2e-spec.ts
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
- database-entities.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- test-database.ts
- protocol/src/index.ts
- logger.module.ts
- Project
- key-cli.ts
- writeLine
- log-settings.e2e-spec.ts
- projects.service.ts
- operator-auth.guard.ts
- protocol/src/index.ts
- log-redaction.spec.ts
- ProjectCreateCommand
- operators.service.ts
- migrate-mode.e2e-spec.ts
- @nestjs/testing
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
- Project
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
- audited-events.spec.ts
- secrets-reencrypt-command.e2e-spec.ts
- secrets-reencrypt.command.ts
- zone.ts
- Message
- telemetry.interceptor.spec.ts
- SecretsReencryptionService
- api-keys.service.ts
- api-exception.ts
- log-redaction.e2e-spec.ts
- body-limit.spec.ts
- cli-mode.e2e-spec.ts
- cache-invalidate.controller.spec.ts
- JsonObjectValidator
- zod-serialization.spec.ts
- @nestjs/common
- identity-key-list.command.ts
- origin.commands.ts
- api-docs.spec.ts
- SlowProbeController
- key-list.command.ts
- operators.service.spec.ts
- ref_node_path
- server/package.json
- TokensService
- api-versioning.spec.ts
- KeyRevokeCommand
- database.module.ts
- OperationStepsProbeController
- secrets-reencryption.service.ts
- operator-token.controller.ts
- project-cli.ts
- encryption-keys.schema.spec.ts
- origin-cli.ts
- project-list.command.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- tokens.service.ts
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- replica-events.e2e-spec.ts
- encrypted-secret.spec.ts
- cli-runner.ts
- Conversation
- Message
- database-connection.e2e-spec.ts
- cls-middleware.ts
- IdentityKeyAddCommand
- IdentityKeyRevokeCommand
- server-errors.spec.ts
- KeyCreateCommand
- token-signing-keys.schema.ts
- database-migrations.spec.ts
- TestTokenSigningConfigModule
- @aws-sdk/client-s3@^3.1151.0
- file-type@^22.1.1
- @nestjs/platform-socket.io@^12.1.3
- pino-http
- @socket.io/redis-adapter@^8.3.0
- @sowa-chat/protocol@workspace:*
- @nestjs/cli@^12.0.0
- source-map-support@^0.5.21

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 140 edges
2. `typeorm` - 55 edges
3. `Zone()` - 50 edges
4. `Project` - 47 edges
5. `@nestjs/testing` - 45 edges
6. `ProjectsService` - 40 edges
7. `useTestDatabase()` - 36 edges
8. `DomainEventBus` - 35 edges
9. `ApiKeysService` - 29 edges
10. `findFreePort()` - 29 edges

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

## Communities (155 total, 37 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.08
Nodes (10): CreateProjects1793193549883, CreateAuditLog1793200000000, AddConversationIndexes1793215983154, CreateApiKeys1793300000000, CreateIdentityKeys1793300001000, AddProjectsPublicKey1793300002000, AddProjectsOperatorAllowedOrigins1793300003000, CreateOperators1793300003000 (+2 more)

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
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, supertest@^7.0.0, testcontainers@^12.2.1 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "tokens.service.spec.ts"
Cohesion: 0.15
Nodes (24): TokenSigningKey, encodePart(), flipSignatureBit(), ForgedTokenInput, forgeToken(), forgeUnsecuredToken(), parseTestSigningKeys(), publicKeyPemBytes() (+16 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.06
Nodes (24): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+16 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "DomainEventBus"
Cohesion: 0.09
Nodes (22): apiKeyCacheKeys(), cacheInvalidatedEventNames(), CacheInvalidationRule, cacheInvalidationRules, projectCacheKeys(), apiKeyEvent, projectEvent, LocalCacheInvalidation (+14 more)

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
Cohesion: 0.07
Nodes (30): dependencies, cache-manager@^7.2.9, helmet@^8.3.0, jose@^6.2.12, nest-commander@^3.21.0, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/cache-manager@^12.0.1, nestjs-cls@^7.0.1 (+22 more)

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

### Community 24 - "identity-keys.e2e-spec.ts"
Cohesion: 0.47
Nodes (6): expectNoKeyRows(), expectNoRows(), addKey(), auditRows(), auditRowsByAction(), identityKeyRows()

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "Option"
Cohesion: 0.13
Nodes (6): OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand, OriginListCommand, OriginRemoveCommand

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.16
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+2 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.09
Nodes (27): ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation(), createMessage() (+19 more)

### Community 32 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.10
Nodes (25): eventFields, serverKey, base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey() (+17 more)

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
Cohesion: 0.20
Nodes (14): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+6 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "@nestjs/testing"
Cohesion: 0.08
Nodes (26): DependencyStatusBody, StatusBody, LogDestination, findZonePorts(), probeControllers, startListening(), stopListening(), ZoneServers (+18 more)

### Community 41 - "database-entities.ts"
Cohesion: 0.48
Nodes (3): database, loadDataSource(), databaseEntities

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "test-database.ts"
Cohesion: 0.11
Nodes (16): apiKeyKinds, issueServerKey(), ColumnRow, expectedColumns, IndexRow, PlanRow, blockAuditRows(), blockMethods (+8 more)

### Community 46 - "protocol/src/index.ts"
Cohesion: 0.15
Nodes (16): OperatorTokenClaims, operatorTokenClaimsSchema, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope (+8 more)

### Community 47 - "logger.module.ts"
Cohesion: 0.20
Nodes (15): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+7 more)

### Community 48 - "Project"
Cohesion: 0.15
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor

### Community 49 - "key-cli.ts"
Cohesion: 0.25
Nodes (17): hashKey(), CliRunResult, runCliInProcess(), auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader (+9 more)

### Community 50 - "writeLine"
Cohesion: 0.17
Nodes (13): emptyCell, serverKeyOnceWarning, writeLine(), writeTable(), writeWarning(), IdentityKeyAddOptions, readPem(), IdentityKeyRevokeOptions (+5 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.19
Nodes (13): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+5 more)

### Community 52 - "projects.service.ts"
Cohesion: 0.19
Nodes (9): IssuedApiKey, ProjectSnapshot, toProjectSnapshot(), ProjectNotFoundError, createProjectsServiceProbe(), issuedServerKey, projectRow(), ProjectsServiceProbe (+1 more)

### Community 53 - "operator-auth.guard.ts"
Cohesion: 0.13
Nodes (4): OperatorAuthGuard, ServerKeyGuard, bearerToken(), FakeRequestInput

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.08
Nodes (16): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+8 more)

### Community 55 - "log-redaction.spec.ts"
Cohesion: 0.20
Nodes (10): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+2 more)

### Community 57 - "operators.service.ts"
Cohesion: 0.10
Nodes (13): Operator, OperatorIdRow, OperatorProfile, ChangeOperatorBlockInput, IssuedOperatorToken, IssueOperatorTokenInput, OperatorActorKind, OperatorBlockChange (+5 more)

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 59 - "@nestjs/testing"
Cohesion: 0.10
Nodes (11): ProjectsModule, project, snapshot, AppCacheModule, cacheTtlMs, cacheKeys, WorkerModule, lists (+3 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "audit-log.e2e-spec.ts"
Cohesion: 0.07
Nodes (23): ActorKind, actorKinds, AuditLogEntry, AuditLogListener, eventValues, happened, personalValues, AuditLogRepository (+15 more)

### Community 62 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 63 - "operator-role.guard.spec.ts"
Cohesion: 0.12
Nodes (9): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey (+1 more)

### Community 64 - "RequestContext"
Cohesion: 0.09
Nodes (5): RequestContextModule, RequestContext, RequestOperator, ConsumerModule, ContextConsumer

### Community 65 - "projects.service.ts"
Cohesion: 0.06
Nodes (36): ServerAuthModule, IssueApiKeyInput, KeysModule, ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), OriginList, originLists (+28 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.11
Nodes (15): encryptionConfig, CryptoModule, authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService (+7 more)

### Community 67 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 68 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.24
Nodes (17): addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem(), identityKeyListHeader, listIdentityKeys(), PemWriter, revokeIdentityKey() (+9 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "identity-keys.service.ts"
Cohesion: 0.06
Nodes (24): KeyActorKind, IdentityKey, IdentityKeyAlgorithm, identityKeyAlgorithms, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey (+16 more)

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "Project"
Cohesion: 0.13
Nodes (4): Channel, channelColumns(), findColumn(), Project

### Community 73 - "operators.module.ts"
Cohesion: 0.22
Nodes (4): OperatorAuthModule, ServerApiModule, OperatorsModule, TokensModule

### Community 74 - "redis.module.ts"
Cohesion: 0.12
Nodes (16): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, fetchStatus() (+8 more)

### Community 75 - "request-id.spec.ts"
Cohesion: 0.15
Nodes (10): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+2 more)

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "conversation.entity.ts"
Cohesion: 0.16
Nodes (13): ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind, messageSenderKinds (+5 more)

### Community 78 - "main.ts"
Cohesion: 0.14
Nodes (20): @nestjs/microservices@^12.1.3, parseDatabase(), parseUrl(), RedisConnectionOptions, redisTransportOptions(), stripIpv6Brackets(), connectReplicaEvents(), replicaEventsMicroservice (+12 more)

### Community 79 - "server-errors.spec.ts"
Cohesion: 0.13
Nodes (13): OperatorDisabledFilter, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter (+5 more)

### Community 80 - "health.module.ts"
Cohesion: 0.08
Nodes (12): @nestjs/terminus@^12.1.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+4 more)

### Community 81 - "operators.e2e-spec.ts"
Cohesion: 0.15
Nodes (3): DisabledOperators, Probe, OperatorsRepository

### Community 82 - "OperationSteps"
Cohesion: 0.12
Nodes (11): AppClsModule, DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationStepsModule, OperationSteps, beginOperation() (+3 more)

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.13
Nodes (19): configureApiApp(), OperatorController(), DisabledProbeController, issueOperator(), getProbe(), issueOperator(), withToken(), get() (+11 more)

### Community 85 - "global-setup.ts"
Cohesion: 0.33
Nodes (6): DatabaseMigration, runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 87 - "audited-events.spec.ts"
Cohesion: 0.11
Nodes (14): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+6 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "secrets-reencrypt.command.ts"
Cohesion: 0.15
Nodes (11): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+3 more)

### Community 90 - "zone.ts"
Cohesion: 0.16
Nodes (14): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes (+6 more)

### Community 91 - "Message"
Cohesion: 0.27
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "telemetry.interceptor.spec.ts"
Cohesion: 0.10
Nodes (13): HttpLabel, HttpMetrics, HttpRequestRecord, labelNames, StepTimes, FinishedOperation, SlowOperationsModule, roundSteps() (+5 more)

### Community 94 - "api-keys.service.ts"
Cohesion: 0.06
Nodes (18): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey, ApiKeysService, CachedApiKey, hashMatches(), IssueApiKeyBaseInput (+10 more)

### Community 95 - "api-exception.ts"
Cohesion: 0.16
Nodes (12): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ErrorCode, errorCodes, errorDetailSchema (+4 more)

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "cache-invalidate.controller.spec.ts"
Cohesion: 0.17
Nodes (5): CacheInvalidateController, CacheInvalidateEvent, cacheInvalidateEventSchema, ReplicaEventsModule, replicaEventPatterns

### Community 101 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 102 - "@nestjs/common"
Cohesion: 0.11
Nodes (12): ApiHttpModule, noStore(), useSecurityHeaders(), calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, BareController (+4 more)

### Community 103 - "identity-key-list.command.ts"
Cohesion: 0.17
Nodes (6): formatDate(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow(), IdentityKeysService

### Community 104 - "origin.commands.ts"
Cohesion: 0.15
Nodes (8): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OriginOptions, ProjectOptions, removeOriginFrom(), OriginChange

### Community 105 - "api-docs.spec.ts"
Cohesion: 0.06
Nodes (22): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+14 more)

### Community 107 - "key-list.command.ts"
Cohesion: 0.18
Nodes (5): header, KeyListCommand, KeyListOptions, toRow(), ApiKeySummary

### Community 108 - "operators.service.spec.ts"
Cohesion: 0.14
Nodes (9): OperatorNotFoundError, OperatorsService, blockInput, BlockProbe, createBlockProbe(), input, Probe, signedToken (+1 more)

### Community 109 - "ref_node_path"
Cohesion: 0.09
Nodes (15): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, builtFiles, CommandResult, entriesByPackage, plannedBuildTasks() (+7 more)

### Community 110 - "server/package.json"
Cohesion: 0.09
Nodes (21): author, bin, sowa-chat, bullmq@^6.3.15, @nestjs/bullmq@^12.0.0, @nestjs/throttler@^6.7.1, @nestjs/websockets@^12.1.3, socket.io@^4.8.4 (+13 more)

### Community 111 - "TokensService"
Cohesion: 0.13
Nodes (3): TokenConsumer, TokensService, createService()

### Community 112 - "api-versioning.spec.ts"
Cohesion: 0.19
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 120 - "database.module.ts"
Cohesion: 0.22
Nodes (10): databaseMigrations, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection, DatabaseEntity (+2 more)

### Community 122 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldResult, ReencryptInput, reencryptionBatchSize, ReencryptionReport (+3 more)

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.17
Nodes (5): nestjs-zod@^5.5.0, OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, nestjs-zod

### Community 124 - "project-cli.ts"
Cohesion: 0.25
Nodes (9): buildServer(), fullOriginArguments, listHeader, onceWarning, repositoryRoot, runMainCli(), serverDirectory, uuidPattern (+1 more)

### Community 125 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 126 - "origin-cli.ts"
Cohesion: 0.24
Nodes (10): badOrigins, helpEntries, prefixes, addOrigins(), OriginAction, OriginCommandOptions, originGroups, originsOf() (+2 more)

### Community 127 - "project-list.command.ts"
Cohesion: 0.19
Nodes (5): formatOrigins(), header, ProjectListCommand, toRow(), ProjectsService

### Community 129 - "tokens.service.ts"
Cohesion: 0.18
Nodes (8): SignedToken, SignTokenInput, TokenAudience, tokenAudiences, VerifiedToken, createProjectWithKey(), internalAgent(), postToken()

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 133 - "replica-events.e2e-spec.ts"
Cohesion: 0.29
Nodes (10): expectKept(), repositoryRoot, seed(), waitUntilDeleted(), Env, cacheInvalidateSubscribers(), cacheOf(), publishCacheInvalidate() (+2 more)

### Community 134 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 135 - "cli-runner.ts"
Cohesion: 0.28
Nodes (6): cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, runCli()

### Community 138 - "database-connection.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus()

### Community 139 - "cls-middleware.ts"
Cohesion: 0.39
Nodes (5): ApiModule, useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp()

### Community 142 - "server-errors.spec.ts"
Cohesion: 0.32
Nodes (6): ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, stringsInside()

### Community 144 - "token-signing-keys.schema.ts"
Cohesion: 0.67
Nodes (5): parseEntry(), parseKeys(), parsePrivateKey(), reject(), tokenSigningKeysSchema

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 973 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **37 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `tokens.service.ts`, `log-level-warn.spec.ts`, `replica-events.e2e-spec.ts`, `tokens.service.spec.ts`, `cli-runner.ts`, `DomainEventBus`, `server-key-guard.e2e-spec.ts`, `cls-middleware.ts`, `dependencies`, `server-errors.spec.ts`, `body-limit.ts`, `zone.guard.spec.ts`, `migrate.module.ts`, `config.module.ts`, `@nestjs/testing`, `test-database.ts`, `logger.module.ts`, `writeLine`, `operator-auth.guard.ts`, `log-redaction.spec.ts`, `operators.service.ts`, `@nestjs/testing`, `audit-log.e2e-spec.ts`, `operator-role.guard.spec.ts`, `RequestContext`, `projects.service.ts`, `encryption.service.spec.ts`, `metrics.controller.ts`, `identity-keys.service.ts`, `operators.module.ts`, `redis.module.ts`, `request-id.spec.ts`, `main.ts`, `server-errors.spec.ts`, `health.module.ts`, `operators.e2e-spec.ts`, `OperationSteps`, `operator-auth-guard.e2e-spec.ts`, `secrets-reencrypt.command.ts`, `zone.ts`, `telemetry.interceptor.spec.ts`, `api-keys.service.ts`, `api-exception.ts`, `body-limit.spec.ts`, `cache-invalidate.controller.spec.ts`, `zod-serialization.spec.ts`, `identity-key-list.command.ts`, `origin.commands.ts`, `api-docs.spec.ts`, `key-list.command.ts`, `server/package.json`, `api-versioning.spec.ts`, `database.module.ts`, `secrets-reencryption.service.ts`, `operator-token.controller.ts`, `project-list.command.ts`?**
  _High betweenness centrality (0.257) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08408408408408409 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `database-migrations.ts` to `database-connection.e2e-spec.ts`, `dependencies`, `identity-keys.e2e-spec.ts`, `chat-tables.e2e-spec.ts`, `server-key-guard.e2e-spec.ts`, `ConversationEvent`, `database-entities.ts`, `test-database.ts`, `Project`, `key-cli.ts`, `operators.service.ts`, `migrate-mode.e2e-spec.ts`, `@nestjs/testing`, `test-secrets.ts`, `audit-log.e2e-spec.ts`, `conversation.entity.spec.ts`, `projects.service.ts`, `identity-keys.service.ts`, `Project`, `participant.entity.spec.ts`, `conversation.entity.ts`, `OperationSteps`, `operator-auth-guard.e2e-spec.ts`, `global-setup.ts`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `ref_node_path`, `server/package.json`, `database.module.ts`, `origin-cli.ts`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `@nestjs/testing` to `devDependencies`, `tokens.service.spec.ts`, `DomainEventBus`, `database-connection.e2e-spec.ts`, `cls-middleware.ts`, `identity-keys.e2e-spec.ts`, `server-key-guard.e2e-spec.ts`, `config.module.ts`, `@nestjs/testing`, `test-database.ts`, `logger.module.ts`, `key-cli.ts`, `projects.service.ts`, `operators.service.ts`, `test-secrets.ts`, `audit-log.e2e-spec.ts`, `RequestContext`, `projects.service.ts`, `encryption.service.spec.ts`, `redis.module.ts`, `operators.e2e-spec.ts`, `OperationSteps`, `operator-auth-guard.e2e-spec.ts`, `cache-invalidate.controller.spec.ts`, `operators.service.spec.ts`, `server/package.json`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._