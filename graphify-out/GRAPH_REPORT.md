# Graph Report - hector-chat-epic-11  (2026-10-29)

## Corpus Check
- 489 files · ~131,359 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .log 1)

## Summary
- 3380 nodes · 8624 edges · 167 communities (132 shown, 35 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 220 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `89cf493e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- typeorm
- bot-sdk/tsconfig.json
- package.json
- visitor-session-refresh.e2e-spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- api-docs.spec.ts
- env.schema.ts
- compilerOptions
- protocol/src/index.ts
- environment-check.ts
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
- InitialProjectService
- RequestContext
- secrets-reencrypt-command.e2e-spec.ts
- scripts
- origin.commands.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- identity-key-list.command.ts
- main.ts
- zone.guard.spec.ts
- development-secrets-file.ts
- tsconfig.build.json
- ValidationProbeController
- logger.module.ts
- nest-cli.json
- @nestjs/testing
- replica-events.e2e-spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- OperatorDisableCommand
- RedactionProbeController
- DisabledOperators
- visitor-session.controller.ts
- conversation.entity.ts
- cli.module.ts
- operator-guard-probe.ts
- @nestjs/testing
- server-errors.spec.ts
- StartupSummaryService
- development-secrets.spec.ts
- ProjectCreateCommand
- operator-auth.guard.ts
- server/package.json
- initial-project.development.spec.ts
- test-secrets.ts
- audit-log.listener.spec.ts
- migrate-mode.e2e-spec.ts
- secrets-generate-command.e2e-spec.ts
- api-keys-service-probe.ts
- key-format.ts
- encryption.service.spec.ts
- identity-key-commands.e2e-spec.ts
- log-level-warn.spec.ts
- secrets-generate.command.spec.ts
- server-key-guard.e2e-spec.ts
- health.e2e-spec.ts
- api-keys.service.ts
- OperationSteps
- migrate.module.ts
- replica-event-rules.spec.ts
- config.module.ts
- secrets-reencrypt.command.ts
- cli-runner.ts
- secret-rotation.ts
- health.module.ts
- api.module.ts
- key-cli.ts
- operator-block-sync.e2e-spec.ts
- packages-build.e2e-spec.ts
- replica-cache-sync.e2e-spec.ts
- CreateChatTables1793215389271
- doctor.command.ts
- replica-events-transport.ts
- replica-events.publisher.spec.ts
- zone.ts
- Message
- encryption-keys.schema.spec.ts
- secrets-reencryption.service.ts
- api-keys-cache.e2e-spec.ts
- identity-keys.service.ts
- replica-events-offline-redis.e2e-spec.ts
- @nestjs/common
- cli-mode.e2e-spec.ts
- SecretsReencryptionService
- request-id.spec.ts
- IdentityKeyAddCommand
- JsonObjectValidator
- audited-events.ts
- redis-checks.e2e-spec.ts
- Zone
- test-database.ts
- operator-commands.e2e-spec.ts
- identity-key-pem.ts
- ref_node_path
- api-app.ts
- database-connection.e2e-spec.ts
- OperatorsService
- tokens.service.ts
- DisabledOperators
- database.module.ts
- project-cli.ts
- env.schema.initial-project.spec.ts
- SlowOperations
- Project
- metrics.controller.ts
- helmet
- env.schema.spec.ts
- pino-http
- ServerErrorsProbeController
- encrypted-secret.spec.ts
- visitor-sessions.service.ts
- DomainEventBus
- environment-checks.service.spec.ts
- SlowProbeController
- env.schema.logging.spec.ts
- generateKey
- global-setup.ts
- log-settings.e2e-spec.ts
- visitor-session.e2e-spec.ts
- config-startup.e2e-spec.ts
- ZoneServers
- workspace-check-types.e2e-spec.ts
- ErrorProbeController
- request-context.spec.ts
- doctor-command.e2e-spec.ts
- RedisModule
- TestTokenSigningConfigModule
- zod-serialization.spec.ts
- projects.service.ts
- TokenConsumer
- TelemetryModule
- IdentityKeyRevokeCommand
- @aws-sdk/client-s3@^3.1151.0
- @aws-sdk/s3-request-presigner@^3.1151.0
- bullmq@^6.3.15
- file-type@^22.1.1
- operator-token.controller.ts
- @socket.io/redis-adapter@^8.3.0
- token-signing-keys.schema.ts
- Visitor
- log-redaction.e2e-spec.ts
- source-map-support@^0.5.21
- @testcontainers/postgresql
- KeyRevokeCommand
- @nestjs/throttler@^6.7.1

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 172 edges
2. `typeorm` - 73 edges
3. `ProjectsService` - 55 edges
4. `Zone()` - 54 edges
5. `useTestDatabase()` - 54 edges
6. `@nestjs/testing` - 53 edges
7. `Project` - 53 edges
8. `@nestjs/config` - 41 edges
9. `DomainEventBus` - 40 edges
10. `createProject()` - 39 edges

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

## Communities (167 total, 35 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.05
Nodes (24): database, loadDataSource(), databaseEntities, columns(), expectedColumns, findColumn(), findRelation(), normalizeSql() (+16 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "visitor-session-refresh.e2e-spec.ts"
Cohesion: 0.13
Nodes (30): api(), createProjectWithPublicKey(), findAllSessions(), findFamilySessions(), findSessionByRefreshToken(), postVisitorSession(), postVisitorSessionRefresh(), startVisitorSession() (+22 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, supertest@^7.0.0 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "api-docs.spec.ts"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.09
Nodes (21): checkEncryptionKeysInProduction(), checkInitialServerKey(), checkPrettyLogFormat(), checkPublicUrlInProduction(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), EnvObject, envObjectSchema (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "protocol/src/index.ts"
Cohesion: 0.08
Nodes (29): OperatorTokenClaims, operatorTokenClaimsSchema, OperatorIdRow, OperatorProfile, ChangeOperatorBlockInput, IssuedOperatorToken, IssueOperatorTokenInput, OperatorActorKind (+21 more)

### Community 10 - "environment-check.ts"
Cohesion: 0.07
Nodes (40): environmentChecksConfig, exampleSecretsCheck, exampleSecretValues, publicUrlsHttpsCheck, s3PublicUrlCheck, contextWith(), developmentContext(), productionContext() (+32 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, cache-manager@^7.2.9, ioredis@^6.0.0, jose@^6.2.12, nest-commander@^3.21.0, @nestjs/bullmq@^12.0.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1 (+21 more)

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

### Community 22 - "InitialProjectService"
Cohesion: 0.29
Nodes (3): createService(), createService(), InitialProjectService

### Community 23 - "RequestContext"
Cohesion: 0.06
Nodes (14): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey (+6 more)

### Community 24 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

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
Cohesion: 0.14
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.06
Nodes (36): ColumnRow, ForeignKeyRow, IndexRow, tableNames, IndexRow, PlanRow, countRows(), createChannel() (+28 more)

### Community 32 - "identity-key-list.command.ts"
Cohesion: 0.08
Nodes (15): emptyCell, formatDate(), writeTable(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow(), header (+7 more)

### Community 33 - "main.ts"
Cohesion: 0.27
Nodes (8): createContext(), mode, runApi(), runMigrate(), runners, runWorker(), useAppLogger(), parseServerMode()

### Community 34 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 35 - "development-secrets-file.ts"
Cohesion: 0.13
Nodes (29): completeFile(), createFile(), createDevelopmentSecrets(), defaultDevelopmentSecretsDirectory, DevelopmentMainProject, DevelopmentSecrets, developmentSecretsFileName, developmentSecretsPath() (+21 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "ValidationProbeController"
Cohesion: 0.13
Nodes (5): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ValidationProbeController

### Community 38 - "logger.module.ts"
Cohesion: 0.20
Nodes (15): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+7 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "@nestjs/testing"
Cohesion: 0.08
Nodes (31): DependencyStatusBody, StatusBody, LogDestination, findZonePorts(), probeControllers, serverEnvironment(), unreachableDatabaseUrl(), serverEnvironment() (+23 more)

### Community 41 - "replica-events.e2e-spec.ts"
Cohesion: 0.29
Nodes (10): expectCachedOnAll(), expectKept(), repositoryRoot, seed(), waitUntilDeleted(), cacheInvalidateSubscribers(), cacheOf(), publishCacheInvalidate() (+2 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "OperatorDisableCommand"
Cohesion: 0.21
Nodes (4): describeDisable(), describeEnable(), OperatorDisableCommand, OperatorEnableCommand

### Community 46 - "RedactionProbeController"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 48 - "visitor-session.controller.ts"
Cohesion: 0.12
Nodes (16): nestjs-zod@^5.5.0, toVisitorSessionResponse(), VisitorSessionController, VisitorSessionRefreshRequestDto, VisitorSessionRequestDto, VisitorSessionResponseDto, ApiHttpModule, refreshToken (+8 more)

### Community 49 - "conversation.entity.ts"
Cohesion: 0.05
Nodes (28): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEvent, ConversationEventActorKind, conversationEventActorKinds (+20 more)

### Community 50 - "cli.module.ts"
Cohesion: 0.10
Nodes (16): serverKeyOnceWarning, writeLine(), writeWarning(), IdentityKeyAddOptions, IdentityKeyRevokeOptions, KeyCreateCommand, KeyCreateOptions, KeyGenerateCommand (+8 more)

### Community 51 - "operator-guard-probe.ts"
Cohesion: 0.16
Nodes (9): OperatorController(), DisabledProbeController, issueOperator(), issueOperator(), get(), getAs(), RolesProbeController, issueTestOperator() (+1 more)

### Community 52 - "@nestjs/testing"
Cohesion: 0.05
Nodes (38): OriginList, originLists, ProjectSnapshot, toProjectSnapshot(), ProjectsModule, ProjectsRepository, ChangeOriginInput, CreatedProject (+30 more)

### Community 53 - "server-errors.spec.ts"
Cohesion: 0.06
Nodes (35): OperatorDisabledFilter, InvalidPublicKeyFilter, InvalidRefreshTokenFilter, OperatorDisabledError, InvalidPublicKeyError, ApiException, ApiExceptionInput, errorCodeStatuses (+27 more)

### Community 54 - "StartupSummaryService"
Cohesion: 0.25
Nodes (3): formatOrigins(), createService(), StartupSummaryService

### Community 55 - "development-secrets.spec.ts"
Cohesion: 0.17
Nodes (21): compileConfigModule(), compileInDevelopment(), Loaded, allTestSecrets, createSecretsDirectory(), developmentEnvWithoutSecrets, developmentSource(), emptySecrets (+13 more)

### Community 57 - "operator-auth.guard.ts"
Cohesion: 0.09
Nodes (5): OperatorAuthGuard, ServerKeyGuard, VisitorAuthGuard, bearerToken(), FakeRequestInput

### Community 58 - "server/package.json"
Cohesion: 0.09
Nodes (21): author, bin, sowa-chat, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/platform-socket.io@^12.1.3, @nestjs/swagger@^12.0.2, pg@^8.23.1, @sowa-chat/protocol@workspace:* (+13 more)

### Community 59 - "initial-project.development.spec.ts"
Cohesion: 0.13
Nodes (16): ApiKeySummary, createdProject, existingProject, missingKeyWarning(), createdProject, existingProject, InitialProjectSettings, keySummary() (+8 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "audit-log.listener.spec.ts"
Cohesion: 0.12
Nodes (14): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditModule, auditedEventNames(), AuditRule (+6 more)

### Community 62 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.23
Nodes (9): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, withClient() (+1 more)

### Community 63 - "secrets-generate-command.e2e-spec.ts"
Cohesion: 0.17
Nodes (7): Env, generatedNames, isConfigVariable(), rotationEnv, RunResult, serverDirectory, systemEnvironment()

### Community 64 - "api-keys-service-probe.ts"
Cohesion: 0.22
Nodes (11): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+3 more)

### Community 65 - "key-format.ts"
Cohesion: 0.15
Nodes (9): InvalidApiKeyError, buildLookupPrefix(), computeChecksum(), isBase62(), keyPrefixes, KeyType, keyTypes, ParsedKey (+1 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.11
Nodes (15): encryptionConfig, CryptoModule, authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService (+7 more)

### Community 67 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.23
Nodes (17): addKey(), runCliInProcess(), addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem(), identityKeyListHeader, listIdentityKeys() (+9 more)

### Community 68 - "log-level-warn.spec.ts"
Cohesion: 0.18
Nodes (8): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe

### Community 69 - "secrets-generate.command.spec.ts"
Cohesion: 0.18
Nodes (7): ../cli.module.js, ./${module}.module.js, generatedNames, linesOf(), productionEnv, rotatedNames, variablesOf()

### Community 70 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): base, base62Alphabet, encodeBase62(), changeBodyChar(), forgeWithValidChecksum(), getProbe(), replaceChar(), withKey() (+2 more)

### Community 71 - "health.e2e-spec.ts"
Cohesion: 0.25
Nodes (6): DependencyStatusBody, fetchStatus(), repositoryRoot, serverPackageJson, StatusBody, waitForHttpStatus()

### Community 72 - "api-keys.service.ts"
Cohesion: 0.12
Nodes (14): ApiKeyKind, NewApiKey, ApiKeysService, CachedApiKey, hashMatches(), IssueApiKeyBaseInput, IssueApiKeyInput, keyTypeByKind (+6 more)

### Community 73 - "OperationSteps"
Cohesion: 0.09
Nodes (14): ApiModule, useClsMiddleware(), DatabaseStepSubscriber, echoRequestId(), resolveRequestId(), OperationStep, operationSteps, OperationTiming (+6 more)

### Community 74 - "migrate.module.ts"
Cohesion: 0.17
Nodes (5): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 75 - "replica-event-rules.spec.ts"
Cohesion: 0.13
Nodes (23): apiKeyCacheKeys(), cacheInvalidatedEventNames(), CacheInvalidationRule, cacheInvalidationRules, projectCacheKeys(), apiKeyEvent, projectEvent, cacheKeys (+15 more)

### Community 76 - "config.module.ts"
Cohesion: 0.18
Nodes (17): compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv(), portsConfig (+9 more)

### Community 77 - "secrets-reencrypt.command.ts"
Cohesion: 0.15
Nodes (11): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+3 more)

### Community 78 - "cli-runner.ts"
Cohesion: 0.19
Nodes (10): cliName, CliRunSetup, commanderArgv(), quietLogLevels, runCliCommand(), runCliModule(), secretsGenerateCommandName, startupLogLevels (+2 more)

### Community 79 - "secret-rotation.ts"
Cohesion: 0.17
Nodes (18): firstTokenSigningKeyIds, GeneratedSecret, generatedSecrets, SecretsMode, generateEncryptionKeyEntry(), generateTokenSigningKeyEntry(), minimalEnv, nextTokenSigningKeyId() (+10 more)

### Community 80 - "health.module.ts"
Cohesion: 0.08
Nodes (12): @nestjs/terminus@^12.1.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+4 more)

### Community 81 - "api.module.ts"
Cohesion: 0.08
Nodes (17): @nestjs/cache-manager@^12.0.1, VisitorApiModule, StartupModule, AppCacheModule, cacheTtlMs, AppClsModule, AppConfigModule, EnvironmentChecksModule (+9 more)

### Community 82 - "key-cli.ts"
Cohesion: 0.32
Nodes (15): toLookupPrefix(), auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix(), listKeys() (+7 more)

### Community 83 - "operator-block-sync.e2e-spec.ts"
Cohesion: 0.13
Nodes (19): blockedOnAll(), BlockTarget, expectStatusOnAll(), issueOperator(), publishAll(), subscriberCounts(), waitForBlockedOnAll(), waitForStatusOnAll() (+11 more)

### Community 84 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 85 - "replica-cache-sync.e2e-spec.ts"
Cohesion: 0.20
Nodes (14): badOrigins, expectStatusOnAll(), probeWithKey(), addOrigins(), OriginAction, OriginCommandOptions, OriginGroup, originGroups (+6 more)

### Community 87 - "doctor.command.ts"
Cohesion: 0.13
Nodes (15): DoctorCommand, formatResult(), printReport(), redisConnectionLevel(), client, createCommand(), dataSource, redis (+7 more)

### Community 88 - "replica-events-transport.ts"
Cohesion: 0.27
Nodes (10): parseDatabase(), parseUrl(), RedisConnectionOptions, redisTransportOptions(), stripIpv6Brackets(), connectReplicaEvents(), replicaEventsMicroservice, replicaEventsRetryDelayMs (+2 more)

### Community 89 - "replica-events.publisher.spec.ts"
Cohesion: 0.15
Nodes (10): ReplicaEventMessage, replicaEventNames(), errorMessage(), ReplicaEventsPublisherModule, replicaPublishConnectTimeoutMs, replicaEventsClient, ReplicaEventsPublisher, replicaPublishTimeoutMs (+2 more)

### Community 90 - "zone.ts"
Cohesion: 0.17
Nodes (14): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), zonePathPrefixes, probeControllers (+6 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 93 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldResult, ReencryptInput, reencryptionBatchSize, ReencryptionReport (+3 more)

### Community 94 - "api-keys-cache.e2e-spec.ts"
Cohesion: 0.09
Nodes (4): ApiKey, ApiKeysRepository, IssuedApiKey, issueServerKey()

### Community 95 - "identity-keys.service.ts"
Cohesion: 0.08
Nodes (13): KeyActorKind, IdentityKey, IdentityKeyAlgorithm, ParsedIdentityKey, IdentityKeysRepository, NewIdentityKey, AddedIdentityKey, AddIdentityKeyInput (+5 more)

### Community 96 - "replica-events-offline-redis.e2e-spec.ts"
Cohesion: 0.20
Nodes (10): CapturedRun, runCaptured(), CliRunResult, MainProject, captureLogLines(), ChannelRecorder, ClosingRedisServer, LogCapture (+2 more)

### Community 97 - "@nestjs/common"
Cohesion: 0.10
Nodes (13): OperatorAuthModule, ServerApiModule, ServerAuthModule, KeysModule, DisabledOperatorsModule, OperatorReplicaEventsController, malformedPayloads, OperatorsModule (+5 more)

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 100 - "request-id.spec.ts"
Cohesion: 0.09
Nodes (14): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController, createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf() (+6 more)

### Community 102 - "JsonObjectValidator"
Cohesion: 0.10
Nodes (16): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+8 more)

### Community 103 - "audited-events.ts"
Cohesion: 0.13
Nodes (10): botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent, IdentityKeyEvent (+2 more)

### Community 104 - "redis-checks.e2e-spec.ts"
Cohesion: 0.12
Nodes (29): PrintedKeys, startApi(), expectNoKeys(), keyBody(), productionEnv(), startAndStop(), startFailingApi(), startLiveApi() (+21 more)

### Community 105 - "Zone"
Cohesion: 0.06
Nodes (15): BodyProbeController, InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController, BareController, MethodOnlyController (+7 more)

### Community 106 - "test-database.ts"
Cohesion: 0.24
Nodes (10): expectNoKeyRows(), expectNoRows(), blockAuditRows(), blockMethods, createOperator(), auditRows(), auditRowsByAction(), identityKeyRows() (+2 more)

### Community 107 - "operator-commands.e2e-spec.ts"
Cohesion: 0.21
Nodes (14): runCommand(), disabledAtOf(), setupOperator(), disabledAtOf(), helpEntries, setupOperator(), OperatorAction, operatorActions (+6 more)

### Community 108 - "identity-key-pem.ts"
Cohesion: 0.27
Nodes (7): algorithmOf(), InvalidIdentityKeyError, isP256(), parseIdentityPublicKey(), readPublicKeyObject(), captureError(), expectInvalidKey()

### Community 109 - "ref_node_path"
Cohesion: 0.09
Nodes (17): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, databaseUrl(), IdentityRow (+9 more)

### Community 110 - "api-app.ts"
Cohesion: 0.21
Nodes (10): configureApiApp(), setupApiDocs(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore() (+2 more)

### Community 111 - "database-connection.e2e-spec.ts"
Cohesion: 0.15
Nodes (12): fetchStatus(), repositoryRoot, RunResult, runToExit(), waitForHttpStatus(), CommandResult, findFreePort(), repositoryRoot (+4 more)

### Community 112 - "OperatorsService"
Cohesion: 0.07
Nodes (10): OperatorsRepository, OperatorNotFoundError, OperatorsService, blockInput, BlockProbe, createBlockProbe(), input, Probe (+2 more)

### Community 115 - "tokens.service.ts"
Cohesion: 0.08
Nodes (41): VisitorAuthModule, tokenSigningConfig, TokenSigningKey, SignedToken, SignTokenInput, TokenAudience, tokenAudiences, TokensService (+33 more)

### Community 120 - "DisabledOperators"
Cohesion: 0.20
Nodes (11): happened, TestListener, DomainEventHandler, DomainEventName, OperatorBlockEvent, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js (+3 more)

### Community 121 - "database.module.ts"
Cohesion: 0.20
Nodes (10): DatabaseMigration, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection, DatabaseEntity (+2 more)

### Community 122 - "project-cli.ts"
Cohesion: 0.23
Nodes (10): helpEntries, prefixes, buildServer(), fullOriginArguments, listHeader, onceWarning, repositoryRoot, runMainCli() (+2 more)

### Community 123 - "env.schema.initial-project.spec.ts"
Cohesion: 0.29
Nodes (3): initVariables, loadConfig(), requiredEnv

### Community 124 - "SlowOperations"
Cohesion: 0.09
Nodes (15): HttpLabel, HttpMetrics, HttpRequestRecord, labelNames, StepTimes, FinishedOperation, SlowOperationsModule, roundSteps() (+7 more)

### Community 125 - "Project"
Cohesion: 0.05
Nodes (32): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, channelColumns(), findColumn(), apiKeyKinds (+24 more)

### Community 126 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 131 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 132 - "visitor-sessions.service.ts"
Cohesion: 0.07
Nodes (11): generateRefreshToken(), VisitorSessionsRepository, InvalidRefreshTokenError, RefreshExchange, visitorAccessTokenTtlSeconds, VisitorSessionsService, VisitorSessionTokens, VisitorTokenClaims (+3 more)

### Community 133 - "DomainEventBus"
Cohesion: 0.10
Nodes (5): BusProbe, Probe, LocalCacheInvalidation, DomainEventBus, CacheBusModule

### Community 134 - "environment-checks.service.spec.ts"
Cohesion: 0.27
Nodes (6): EnvironmentChecksService, createService(), createCheck(), createCheckContext(), createCheckSettings(), createFailingCheck()

### Community 136 - "env.schema.logging.spec.ts"
Cohesion: 0.33
Nodes (3): Env, logLevels, requiredEnv

### Community 137 - "generateKey"
Cohesion: 0.39
Nodes (3): toEvent(), generateKey(), issueVisitor()

### Community 138 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 139 - "log-settings.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+2 more)

### Community 140 - "visitor-session.e2e-spec.ts"
Cohesion: 0.23
Nodes (6): replaceLastChar(), rowsContainText(), textForms(), createProjectWithPublicKey(), postPublic(), postSession()

### Community 141 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 142 - "ZoneServers"
Cohesion: 0.22
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 143 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 146 - "doctor-command.e2e-spec.ts"
Cohesion: 0.48
Nodes (6): lineOfCheck(), linesOfLevel(), reportLines(), runDoctor(), runWithRefusedRedis(), stubProductionEnv()

### Community 149 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 150 - "projects.service.ts"
Cohesion: 0.10
Nodes (18): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl(), InvalidProjectNameError, prepareProject() (+10 more)

### Community 158 - "operator-token.controller.ts"
Cohesion: 0.17
Nodes (5): OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, ServerController(), ReplicaProbeController

### Community 160 - "token-signing-keys.schema.ts"
Cohesion: 0.29
Nodes (6): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, tokenSigningKeysSchema

### Community 161 - "Visitor"
Cohesion: 0.08
Nodes (13): Channel, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget(), columns() (+5 more)

### Community 162 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

## Knowledge Gaps
- **7 isolated node(s):** `./${module}.module.js`, `../cli.module.js`, `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` (+2 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1185 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `typeorm`, `visitor-sessions.service.ts`, `DomainEventBus`, `environment-checks.service.spec.ts`, `api-docs.spec.ts`, `protocol/src/index.ts`, `environment-check.ts`, `dependencies`, `request-context.spec.ts`, `zod-serialization.spec.ts`, `projects.service.ts`, `RequestContext`, `origin.commands.ts`, `operator-token.controller.ts`, `identity-key-list.command.ts`, `main.ts`, `zone.guard.spec.ts`, `ValidationProbeController`, `logger.module.ts`, `@nestjs/testing`, `replica-events.e2e-spec.ts`, `RedactionProbeController`, `visitor-session.controller.ts`, `cli.module.ts`, `operator-guard-probe.ts`, `@nestjs/testing`, `server-errors.spec.ts`, `operator-auth.guard.ts`, `server/package.json`, `initial-project.development.spec.ts`, `audit-log.listener.spec.ts`, `encryption.service.spec.ts`, `log-level-warn.spec.ts`, `server-key-guard.e2e-spec.ts`, `api-keys.service.ts`, `OperationSteps`, `migrate.module.ts`, `replica-event-rules.spec.ts`, `config.module.ts`, `secrets-reencrypt.command.ts`, `cli-runner.ts`, `health.module.ts`, `api.module.ts`, `operator-block-sync.e2e-spec.ts`, `replica-cache-sync.e2e-spec.ts`, `doctor.command.ts`, `replica-events-transport.ts`, `replica-events.publisher.spec.ts`, `zone.ts`, `secrets-reencryption.service.ts`, `identity-keys.service.ts`, `request-id.spec.ts`, `Zone`, `api-app.ts`, `tokens.service.ts`, `DisabledOperators`, `database.module.ts`, `SlowOperations`, `Project`, `metrics.controller.ts`?**
  _High betweenness centrality (0.230) - this node is a cross-community bridge._
- **What connects `./${module}.module.js`, `../cli.module.js`, `./tsconfig.json` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.04596273291925466 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `visitor-session-refresh.e2e-spec.ts`, `environment-checks.service.spec.ts`, `protocol/src/index.ts`, `environment-check.ts`, `dependencies`, `secrets-reencrypt-command.e2e-spec.ts`, `chat-tables.e2e-spec.ts`, `Visitor`, `conversation.entity.ts`, `operator-guard-probe.ts`, `@nestjs/testing`, `server/package.json`, `test-secrets.ts`, `migrate-mode.e2e-spec.ts`, `OperationSteps`, `key-cli.ts`, `operator-block-sync.e2e-spec.ts`, `replica-cache-sync.e2e-spec.ts`, `doctor.command.ts`, `Message`, `test-database.ts`, `operator-commands.e2e-spec.ts`, `ref_node_path`, `database-connection.e2e-spec.ts`, `database.module.ts`, `Project`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `@nestjs/testing` to `devDependencies`, `DomainEventBus`, `request-context.spec.ts`, `projects.service.ts`, `logger.module.ts`, `@nestjs/testing`, `development-secrets.spec.ts`, `server/package.json`, `initial-project.development.spec.ts`, `test-secrets.ts`, `audit-log.listener.spec.ts`, `api-keys-service-probe.ts`, `key-format.ts`, `encryption.service.spec.ts`, `OperationSteps`, `replica-event-rules.spec.ts`, `config.module.ts`, `api.module.ts`, `key-cli.ts`, `replica-events.publisher.spec.ts`, `api-keys-cache.e2e-spec.ts`, `@nestjs/common`, `test-database.ts`, `operator-commands.e2e-spec.ts`, `ref_node_path`, `database-connection.e2e-spec.ts`, `OperatorsService`, `tokens.service.ts`, `DisabledOperators`, `Project`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Should `visitor-session-refresh.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13174603174603175 - nodes in this community are weakly interconnected._