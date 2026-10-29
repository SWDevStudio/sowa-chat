# Graph Report - hector-chat-epic-11  (2026-10-29)

## Corpus Check
- 458 files · ~118,200 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .log 1)

## Summary
- 3161 nodes · 7892 edges · 166 communities (124 shown, 42 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 202 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c07f4a47`
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
- replica-events-transport.ts
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
- MixedZoneController
- ConversationEvent
- development-secrets-file.ts
- tsconfig.build.json
- ValidationProbeController
- main.ts
- nest-cli.json
- zone-probe.ts
- operator-block-sync.e2e-spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- OperatorDisableCommand
- RedactionProbeController
- server-key-guard.e2e-spec.ts
- identity-key-commands.e2e-spec.ts
- Conversation
- cli.module.ts
- key-format.ts
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
- main.ts
- encryption.service.spec.ts
- replica-cache-sync.e2e-spec.ts
- conversation.entity.spec.ts
- config-startup.e2e-spec.ts
- ref_node_crypto
- server-protocol.e2e-spec.ts
- projects.service.ts
- OperationSteps
- replica-events-offline-redis.e2e-spec.ts
- ref_vitest
- config.module.ts
- .canActivate
- body-limit.ts
- secret-rotation.ts
- health.module.ts
- DisabledOperators
- secrets-reencrypt-command.e2e-spec.ts
- workspace-check-types.e2e-spec.ts
- RequestContext
- key-cli.ts
- CreateChatTables1793215389271
- slow-operations.ts
- ioredis
- secrets-reencrypt.command.ts
- zone.guard.spec.ts
- Message
- encryption-keys.schema.spec.ts
- SecretsReencryptionService
- ApiKey
- api-keys.service.ts
- log-redaction.e2e-spec.ts
- migrate.module.ts
- cli-mode.e2e-spec.ts
- zone-e2e-app.ts
- api-docs.spec.ts
- IdentityKeyAddCommand
- JsonObjectValidator
- status.service.ts
- operators.service.spec.ts
- Zone
- operators.module.ts
- operator-commands.e2e-spec.ts
- identity-key-pem.ts
- redis-connection.e2e-spec.ts
- server/package.json
- project-cli.ts
- OperatorsService
- tokens.service.spec.ts
- domain-event-bus.spec.ts
- e2e-server.ts
- secrets-reencryption.service.ts
- operator-token.controller.ts
- log-settings.e2e-spec.ts
- createProject
- TokensService
- body-limit.spec.ts
- AuditScenarios
- server-errors.spec.ts
- ServerErrorsProbeController
- health.e2e-spec.ts
- visitors.module.ts
- ServerKeyGuard
- SlowProbeController
- encrypted-secret.spec.ts
- @aws-sdk/client-s3@^3.1151.0
- @aws-sdk/s3-request-presigner@^3.1151.0
- ApiKeyKind
- zod-serialization.spec.ts
- log-redaction.spec.ts
- zod@catalog:
- global-setup.ts
- http-error.filter.spec.ts
- ErrorProbeController
- json-object-limits.spec.ts
- OperationStepsProbeController
- helmet
- api-versioning.spec.ts
- InternalProbeController
- @nestjs/common
- operator-auth.guard.ts
- dependency-cruiser@^18.6.0
- IdentityKeyRevokeCommand
- visitor-sessions.service.ts
- visitor-guard-probe.ts
- ZoneServers
- TelemetryProbeController
- TestTokenSigningConfigModule
- RolesProbeController
- file-type@^22.1.1
- @nestjs/throttler@^6.7.1
- @nestjs/websockets@^12.1.3
- pino-http
- testcontainers

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
- `OperatorProfile` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/domain/operators/operators.repository.ts → packages/protocol/src/operator-role.ts
- `IssueOperatorTokenInput` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/domain/operators/operators.service.ts → packages/protocol/src/operator-role.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts
- `AuditRecord` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-rule.ts → packages/protocol/src/json-types.ts
- `ConversationEvent` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation-event.entity.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (166 total, 42 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.06
Nodes (19): DatabaseMigration, databaseMigrations, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection (+11 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "visitor-session-refresh.e2e-spec.ts"
Cohesion: 0.09
Nodes (33): api(), createProjectWithPublicKey(), findAllSessions(), findFamilySessions(), findSessionByRefreshToken(), postVisitorSession(), postVisitorSessionRefresh(), startVisitorSession() (+25 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21, supertest@^7.0.0 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "request-context.spec.ts"
Cohesion: 0.14
Nodes (7): RequestContextModule, RequestOperator, RequestVisitor, ConsumerModule, ContextConsumer, operatorProbePath, OperatorRole

### Community 7 - "env.schema.ts"
Cohesion: 0.05
Nodes (28): checkEncryptionKeysInProduction(), checkInitialServerKey(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), EnvObject, envObjectSchema, envSchema (+20 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "protocol/src/index.ts"
Cohesion: 0.11
Nodes (18): OperatorTokenClaims, operatorTokenClaimsSchema, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope (+10 more)

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
Nodes (30): dependencies, cache-manager@^7.2.9, jose@^6.2.12, nest-commander@^3.21.0, @nestjs/bullmq@^12.0.0, @nestjs/cache-manager@^12.0.1, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1 (+22 more)

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

### Community 22 - "replica-events-transport.ts"
Cohesion: 0.21
Nodes (14): @nestjs/microservices@^12.1.3, redisConfig, parseDatabase(), parseUrl(), RedisConnectionOptions, redisTransportOptions(), stripIpv6Brackets(), replicaPublishConnectTimeoutMs (+6 more)

### Community 23 - "operator-role.guard.spec.ts"
Cohesion: 0.14
Nodes (8): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey

### Community 24 - "typeorm"
Cohesion: 0.11
Nodes (9): database, loadDataSource(), AuditLogEntry, channelColumns(), findColumn(), Project, ProjectFixture, JsonObject (+1 more)

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
Cohesion: 0.17
Nodes (5): happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.06
Nodes (36): ColumnRow, ForeignKeyRow, IndexRow, tableNames, IndexRow, PlanRow, countRows(), createChannel() (+28 more)

### Community 32 - "replica-events.publisher.spec.ts"
Cohesion: 0.06
Nodes (34): apiKeyCacheKeys(), cacheInvalidatedEventNames(), CacheInvalidationRule, cacheInvalidationRules, projectCacheKeys(), apiKeyEvent, projectEvent, cacheKeys (+26 more)

### Community 33 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "development-secrets-file.ts"
Cohesion: 0.09
Nodes (44): completeFile(), createFile(), createDevelopmentSecrets(), defaultDevelopmentSecretsDirectory, DevelopmentMainProject, DevelopmentSecrets, developmentSecretsFileName, developmentSecretsPath() (+36 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "main.ts"
Cohesion: 0.21
Nodes (14): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+6 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-probe.ts"
Cohesion: 0.10
Nodes (24): HealthBody, HealthEntry, DependencyStatusBody, StatusBody, LogDestination, findZonePorts(), probeControllers, LogEntry (+16 more)

### Community 41 - "operator-block-sync.e2e-spec.ts"
Cohesion: 0.12
Nodes (21): blockedOnAll(), BlockTarget, expectStatusOnAll(), issueOperator(), publishAll(), runCommand(), subscriberCounts(), waitForBlockedOnAll() (+13 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 47 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.33
Nodes (6): changeBodyChar(), forgeWithValidChecksum(), getProbe(), replaceChar(), withKey(), zoneAgent()

### Community 48 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.20
Nodes (19): expectNoKeyRows(), expectNoRows(), addKey(), addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem(), identityKeyListHeader (+11 more)

### Community 49 - "Conversation"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 50 - "cli.module.ts"
Cohesion: 0.06
Nodes (32): emptyCell, formatDate(), serverKeyOnceWarning, writeLine(), writeTable(), writeWarning(), IdentityKeyAddOptions, readPem() (+24 more)

### Community 51 - "key-format.ts"
Cohesion: 0.15
Nodes (13): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+5 more)

### Community 52 - "initial-project.e2e-spec.ts"
Cohesion: 0.06
Nodes (28): VisitorApiModule, IssueApiKeyInput, ProjectsModule, initialProjectLockName, NewProject, ORIGIN_COLUMNS, OriginsRow, CreatedProject (+20 more)

### Community 53 - "server-errors.spec.ts"
Cohesion: 0.11
Nodes (19): OperatorDisabledFilter, InvalidPublicKeyFilter, InvalidRefreshTokenFilter, OperatorDisabledError, InvalidPublicKeyError, InvalidRefreshTokenError, ApiException, ApiExceptionInput (+11 more)

### Community 54 - "log-level-warn.spec.ts"
Cohesion: 0.18
Nodes (9): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+1 more)

### Community 57 - "ZoneProbeApp"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 59 - "visitor-session.controller.ts"
Cohesion: 0.14
Nodes (14): toVisitorSessionResponse(), VisitorSessionController, VisitorSessionRefreshRequestDto, VisitorSessionRequestDto, VisitorSessionResponseDto, VisitorSessionTokens, refreshToken, requestCases (+6 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.17
Nodes (17): reencryptionBatchSize, createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1 (+9 more)

### Community 61 - "audit-log.e2e-spec.ts"
Cohesion: 0.06
Nodes (30): ActorKind, actorKinds, AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, NewAuditLogEntry (+22 more)

### Community 62 - "request-id.spec.ts"
Cohesion: 0.13
Nodes (10): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+2 more)

### Community 63 - "visitor-session.entity.spec.ts"
Cohesion: 0.14
Nodes (9): columns(), expectedColumns, findColumn(), findRelation(), normalizeSql(), relations(), runMigration(), CreateOperators1793300003000 (+1 more)

### Community 64 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 65 - "main.ts"
Cohesion: 0.11
Nodes (16): ApiModule, cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, createContext(), mode (+8 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.11
Nodes (15): EncryptionKey, CryptoModule, authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService (+7 more)

### Community 67 - "replica-cache-sync.e2e-spec.ts"
Cohesion: 0.13
Nodes (16): badOrigins, helpEntries, prefixes, expectStatusOnAll(), probeWithKey(), ReplicaProbeController, addOrigins(), OriginAction (+8 more)

### Community 68 - "conversation.entity.spec.ts"
Cohesion: 0.16
Nodes (7): Channel, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "ref_node_crypto"
Cohesion: 0.17
Nodes (13): eventFields, keyTypeByKind, serverKey, hashKey(), ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow() (+5 more)

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "projects.service.ts"
Cohesion: 0.05
Nodes (27): ApiKeysService, ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), OriginList, originLists, normalizeOrigin(), normalizeOrigins() (+19 more)

### Community 73 - "OperationSteps"
Cohesion: 0.14
Nodes (9): DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationSteps, beginOperation(), operationTimingKey, nestjs-cls (+1 more)

### Community 74 - "replica-events-offline-redis.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): CapturedRun, runCaptured(), stubRefusedRedis(), CliRunResult, MainProject, captureLogLines(), ChannelRecorder, ClosingRedisServer (+3 more)

### Community 75 - "ref_vitest"
Cohesion: 0.18
Nodes (5): columns(), expectedColumns, findColumn(), findRelation(), relations()

### Community 76 - "config.module.ts"
Cohesion: 0.14
Nodes (23): appConfig, compileConfigModule(), compileInDevelopment(), compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig (+15 more)

### Community 78 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 79 - "secret-rotation.ts"
Cohesion: 0.14
Nodes (26): encryptionKeysSchema, parseEntry(), parseKeys(), reject(), firstTokenSigningKeyIds, generatedSecrets, SecretsMode, generateEncryptionKeyEntry() (+18 more)

### Community 80 - "health.module.ts"
Cohesion: 0.19
Nodes (5): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, @nestjs/terminus

### Community 81 - "DisabledOperators"
Cohesion: 0.11
Nodes (11): DisabledOperators, BusProbe, Probe, OperatorReplicaEventsController, createDisabledOperators(), malformedPayloads, CacheInvalidateEvent, OperatorReplicaEvent (+3 more)

### Community 82 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.21
Nodes (15): auditRowsByAction(), clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction (+7 more)

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "RequestContext"
Cohesion: 0.12
Nodes (3): RequestContext, GuardProbeController, OperatorGuardProbeController

### Community 85 - "key-cli.ts"
Cohesion: 0.26
Nodes (17): toLookupPrefix(), CreateProjectInput, auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix() (+9 more)

### Community 87 - "slow-operations.ts"
Cohesion: 0.12
Nodes (6): HttpMetrics, StepTimes, FinishedOperation, roundSteps(), SlowOperations, TelemetryInterceptor

### Community 88 - "ioredis"
Cohesion: 0.20
Nodes (8): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 89 - "secrets-reencrypt.command.ts"
Cohesion: 0.16
Nodes (11): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+3 more)

### Community 90 - "zone.guard.spec.ts"
Cohesion: 0.09
Nodes (23): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, ApiZone, apiZones (+15 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.29
Nodes (7): describeErrors(), key1, key1Bytes, key2, key2Bytes, parseKeys(), requiredEnv

### Community 94 - "ApiKey"
Cohesion: 0.11
Nodes (4): ApiKey, ApiKeysRepository, InvalidApiKeyError, toEvent()

### Community 95 - "api-keys.service.ts"
Cohesion: 0.06
Nodes (18): ServerAuthModule, ApiKeySummary, IssueApiKeyBaseInput, IssuedApiKey, KeyActorKind, RevokeApiKeyInput, VerifiedApiKey, IdentityKey (+10 more)

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 97 - "migrate.module.ts"
Cohesion: 0.20
Nodes (4): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "zone-e2e-app.ts"
Cohesion: 0.12
Nodes (15): configureApiApp(), noStore(), useSecurityHeaders(), DisabledProbeController, issueOperator(), issueOperator(), get(), getAs() (+7 more)

### Community 100 - "api-docs.spec.ts"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 102 - "JsonObjectValidator"
Cohesion: 0.17
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, JsonObjectValidator, Violation, JsonObjectLimits, encoder (+1 more)

### Community 103 - "status.service.ts"
Cohesion: 0.17
Nodes (6): readServerVersion(), StatusController, DependencyStatus, ServerStatus, StatusService, toDependencyStatus()

### Community 104 - "operators.service.spec.ts"
Cohesion: 0.12
Nodes (14): ChangeOperatorBlockInput, IssuedOperatorToken, IssueOperatorTokenInput, OperatorActorKind, OperatorBlockChange, OperatorNotFoundError, operatorTokenTtlSeconds, blockInput (+6 more)

### Community 105 - "Zone"
Cohesion: 0.09
Nodes (17): OperatorController(), ServerController(), InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController (+9 more)

### Community 106 - "operators.module.ts"
Cohesion: 0.10
Nodes (11): OperatorAuthModule, ServerApiModule, VisitorAuthModule, DisabledOperatorsModule, OperatorsModule, TokensModule, blockAuditRows(), blockMethods (+3 more)

### Community 107 - "operator-commands.e2e-spec.ts"
Cohesion: 0.25
Nodes (12): disabledAtOf(), setupOperator(), disabledAtOf(), helpEntries, setupOperator(), operatorActions, operatorBlockAuditRows(), operatorCommandArguments() (+4 more)

### Community 108 - "identity-key-pem.ts"
Cohesion: 0.19
Nodes (11): IdentityKeyAlgorithm, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey(), readPublicKeyObject(), captureError() (+3 more)

### Community 109 - "redis-connection.e2e-spec.ts"
Cohesion: 0.09
Nodes (17): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, builtFiles, CommandResult (+9 more)

### Community 110 - "server/package.json"
Cohesion: 0.09
Nodes (21): author, bin, sowa-chat, bullmq@^6.3.15, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/platform-socket.io@^12.1.3, pg@^8.23.1, reflect-metadata@^0.2.2 (+13 more)

### Community 111 - "project-cli.ts"
Cohesion: 0.25
Nodes (10): runCliInProcess(), buildServer(), createMain(), fullOriginArguments, listHeader, onceWarning, repositoryRoot, runMainCli() (+2 more)

### Community 112 - "OperatorsService"
Cohesion: 0.09
Nodes (5): Operator, OperatorIdRow, OperatorProfile, OperatorsRepository, OperatorsService

### Community 115 - "tokens.service.spec.ts"
Cohesion: 0.09
Nodes (38): TokenSigningKey, SignedToken, SignTokenInput, TokenAudience, tokenAudiences, VerifiedToken, getProbe(), withToken() (+30 more)

### Community 120 - "domain-event-bus.spec.ts"
Cohesion: 0.25
Nodes (8): happened, TestListener, DomainEventHandler, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 121 - "e2e-server.ts"
Cohesion: 0.13
Nodes (19): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableRedisUrl(), waitForHttpStatus(), expectCachedOnAll(), expectKept() (+11 more)

### Community 122 - "secrets-reencryption.service.ts"
Cohesion: 0.18
Nodes (10): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldResult, ReencryptInput, ReencryptionReport, SecretRow (+2 more)

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.21
Nodes (5): nestjs-zod@^5.5.0, OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, nestjs-zod

### Community 124 - "log-settings.e2e-spec.ts"
Cohesion: 0.11
Nodes (21): fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), ApiRun (+13 more)

### Community 125 - "createProject"
Cohesion: 0.11
Nodes (16): apiKeyKinds, identityKeyAlgorithms, issueServerKey(), ColumnRow, expectedColumns, ColumnRow, expectedColumns, jwk (+8 more)

### Community 129 - "server-errors.spec.ts"
Cohesion: 0.15
Nodes (12): internalErrorMessage, ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, stringsInside(), errorCodes (+4 more)

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 132 - "visitors.module.ts"
Cohesion: 0.11
Nodes (3): VisitorSessionsRepository, VisitorSessionsService, VisitorsRepository

### Community 135 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 138 - "ApiKeyKind"
Cohesion: 0.21
Nodes (7): ApiKeyKind, NewApiKey, CachedApiKey, hashMatches(), toCachedApiKey(), toSummary(), verifyCached()

### Community 139 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 140 - "log-redaction.spec.ts"
Cohesion: 0.20
Nodes (10): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+2 more)

### Community 142 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 143 - "http-error.filter.spec.ts"
Cohesion: 0.12
Nodes (10): useClsMiddleware(), ApiHttpModule, HttpErrorFilter, responseZodErrorOf(), knownKeys, ProbeBodyDto, echoRequestId(), requestIdHeader (+2 more)

### Community 145 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 148 - "api-versioning.spec.ts"
Cohesion: 0.25
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 149 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 150 - "@nestjs/common"
Cohesion: 0.07
Nodes (20): databaseEntities, AuditModule, project, snapshot, AppCacheModule, cacheTtlMs, AppClsModule, AppConfigModule (+12 more)

### Community 154 - "visitor-sessions.service.ts"
Cohesion: 0.32
Nodes (5): generateRefreshToken(), RefreshExchange, visitorAccessTokenTtlSeconds, VisitorTokenClaims, visitorTokenClaimsSchema

### Community 155 - "visitor-guard-probe.ts"
Cohesion: 0.38
Nodes (3): VisitorController(), VisitorGuardProbeController, visitorProbePath

### Community 157 - "ZoneServers"
Cohesion: 0.29
Nodes (3): startListening(), stopListening(), ZoneServers

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1092 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `cli.module.ts` to `typeorm`, `server-errors.spec.ts`, `request-context.spec.ts`, `environment-checks.service.ts`, `zod-serialization.spec.ts`, `log-redaction.spec.ts`, `dependencies`, `http-error.filter.spec.ts`, `api-versioning.spec.ts`, `@nestjs/common`, `operator-role.guard.spec.ts`, `operator-auth.guard.ts`, `replica-events-transport.ts`, `origin.commands.ts`, `visitor-guard-probe.ts`, `visitor-sessions.service.ts`, `typeorm`, `replica-events.publisher.spec.ts`, `main.ts`, `zone-probe.ts`, `operator-block-sync.e2e-spec.ts`, `server-key-guard.e2e-spec.ts`, `initial-project.e2e-spec.ts`, `server-errors.spec.ts`, `log-level-warn.spec.ts`, `ZoneProbeApp`, `visitor-session.controller.ts`, `audit-log.e2e-spec.ts`, `request-id.spec.ts`, `main.ts`, `encryption.service.spec.ts`, `replica-cache-sync.e2e-spec.ts`, `projects.service.ts`, `OperationSteps`, `config.module.ts`, `body-limit.ts`, `health.module.ts`, `DisabledOperators`, `slow-operations.ts`, `ioredis`, `secrets-reencrypt.command.ts`, `zone.guard.spec.ts`, `api-keys.service.ts`, `migrate.module.ts`, `zone-e2e-app.ts`, `api-docs.spec.ts`, `status.service.ts`, `operators.service.spec.ts`, `Zone`, `operators.module.ts`, `server/package.json`, `OperatorsService`, `tokens.service.spec.ts`, `domain-event-bus.spec.ts`, `e2e-server.ts`, `secrets-reencryption.service.ts`, `operator-token.controller.ts`, `body-limit.spec.ts`?**
  _High betweenness centrality (0.230) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.06382978723404255 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `typeorm`, `visitor-session-refresh.e2e-spec.ts`, `request-context.spec.ts`, `environment-checks.service.ts`, `dependencies`, `chat-tables.e2e-spec.ts`, `ConversationEvent`, `operator-block-sync.e2e-spec.ts`, `Conversation`, `initial-project.e2e-spec.ts`, `migrate-mode.e2e-spec.ts`, `test-secrets.ts`, `visitor-session.entity.spec.ts`, `participant.entity.spec.ts`, `replica-cache-sync.e2e-spec.ts`, `conversation.entity.spec.ts`, `OperationSteps`, `ref_vitest`, `secrets-reencrypt-command.e2e-spec.ts`, `key-cli.ts`, `CreateChatTables1793215389271`, `Message`, `operator-commands.e2e-spec.ts`, `redis-connection.e2e-spec.ts`, `server/package.json`, `OperatorsService`, `log-settings.e2e-spec.ts`, `createProject`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Project` connect `typeorm` to `typeorm`, `replica-cache-sync.e2e-spec.ts`, `conversation.entity.spec.ts`, `projects.service.ts`, `operator-block-sync.e2e-spec.ts`, `ref_vitest`, `chat-tables.e2e-spec.ts`, `OperatorsService`, `Conversation`, `cli.module.ts`, `audit-log.e2e-spec.ts`, `initial-project.e2e-spec.ts`, `database-entities.ts`, `.create`, `createProject`, `ApiKey`, `api-keys.service.ts`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Should `visitor-session-refresh.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08773784355179703 - nodes in this community are weakly interconnected._