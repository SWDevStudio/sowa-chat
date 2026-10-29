# Graph Report - hector-chat-epic-11  (2026-10-29)

## Corpus Check
- 486 files · ~129,865 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .log 1)

## Summary
- 3354 nodes · 8521 edges · 152 communities (125 shown, 27 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 216 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ff26d80f`
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
- initial-project.production.spec.ts
- RequestContext
- secrets-reencrypt-command.e2e-spec.ts
- scripts
- origin.commands.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-schema.ts
- identity-key-list.command.ts
- main.ts
- MixedZoneController
- development-secrets-file.ts
- tsconfig.build.json
- ValidationProbeController
- logger.module.ts
- nest-cli.json
- api.module.ts
- replica-events.e2e-spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- OperatorDisableCommand
- RedactionProbeController
- DisabledOperators
- visitor-session.controller.ts
- typeorm
- cli.module.ts
- operator-guard-probe.ts
- @nestjs/testing
- server-errors.spec.ts
- startup-summary.service.spec.ts
- development-secrets.spec.ts
- ProjectCreateCommand
- JsonObjectValidator
- server/package.json
- JsonObject
- test-secrets.ts
- audit-log.listener.spec.ts
- migrate-mode.e2e-spec.ts
- secrets-generate-command.e2e-spec.ts
- participant.entity.spec.ts
- project-list.command.ts
- encryption.service.spec.ts
- key-cli.ts
- log-level-warn.spec.ts
- secrets-generate.command.spec.ts
- server-key-guard.e2e-spec.ts
- health.e2e-spec.ts
- ProjectsService
- OperationSteps
- migrate.module.ts
- domain-event-bus.ts
- config.module.ts
- secrets-reencrypt.command.ts
- cli-runner.ts
- secret-rotation.ts
- health.module.ts
- DisabledOperators
- identity-keys.service.ts
- operator-block-sync.e2e-spec.ts
- packages-build.e2e-spec.ts
- server-errors.spec.ts
- CreateChatTables1793215389271
- ioredis
- replica-events-transport.ts
- replica-events.publisher.spec.ts
- zone.ts
- Message
- encryption-keys.schema.spec.ts
- secrets-reencryption.service.ts
- api-keys.service.ts
- IdentityKey
- replica-cli-probe.ts
- operators.module.ts
- cli-mode.e2e-spec.ts
- SecretsReencryptionService
- request-id.spec.ts
- IdentityKeyAddCommand
- JsonObjectValidator
- .add
- redis-checks.e2e-spec.ts
- @nestjs/common
- ref_vitest
- operator-commands.e2e-spec.ts
- identity-key-pem.ts
- ref_node_path
- VisitorSession
- findFreePort
- OperatorsService
- tokens.service.ts
- DisabledOperators
- redis-checks.spec.ts
- ConversationEvent
- env.schema.initial-project.spec.ts
- SlowOperations
- test-database.ts
- server-errors.spec.ts
- helmet
- env.schema.spec.ts
- pino-http
- ServerErrorsProbeController
- encrypted-secret.spec.ts
- visitor-sessions.service.ts
- LocalCacheInvalidation
- SlowProbeController
- env.schema.logging.spec.ts
- DomainEventBus
- global-setup.ts
- log-settings.e2e-spec.ts
- InternalProbeController
- ErrorProbeController
- secret-generators.spec.ts
- zod-serialization.spec.ts
- projects.service.ts
- IdentityKeyRevokeCommand
- operator-token.controller.ts
- token-signing-keys.schema.ts
- visitor.entity.spec.ts
- log-redaction.e2e-spec.ts
- KeyRevokeCommand
- redact-paths.ts
- @nestjs/throttler@^6.7.1

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 171 edges
2. `typeorm` - 71 edges
3. `ProjectsService` - 55 edges
4. `Zone()` - 54 edges
5. `useTestDatabase()` - 54 edges
6. `@nestjs/testing` - 53 edges
7. `Project` - 53 edges
8. `DomainEventBus` - 40 edges
9. `@nestjs/config` - 39 edges
10. `createProject()` - 39 edges

## Surprising Connections (you probably didn't know these)
- `OperatorProfile` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/domain/operators/operators.repository.ts → packages/protocol/src/operator-role.ts
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts
- `AuditRecord` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-rule.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (152 total, 27 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.05
Nodes (24): columns(), expectedColumns, findColumn(), findRelation(), normalizeSql(), relations(), runMigration(), DatabaseMigration (+16 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "visitor-session-refresh.e2e-spec.ts"
Cohesion: 0.12
Nodes (31): lockWaitCount(), api(), createProjectWithPublicKey(), findAllSessions(), findFamilySessions(), findSessionByRefreshToken(), postVisitorSession(), postVisitorSessionRefresh() (+23 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.09
Nodes (20): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+12 more)

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
Cohesion: 0.13
Nodes (18): OperatorTokenRequestDto, OperatorTokenResponseDto, OperatorTokenClaims, operatorTokenClaimsSchema, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope (+10 more)

### Community 10 - "environment-check.ts"
Cohesion: 0.07
Nodes (39): environmentChecksConfig, exampleSecretsCheck, exampleSecretValues, publicUrlsHttpsCheck, s3PublicUrlCheck, contextWith(), developmentContext(), productionContext() (+31 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, @aws-sdk/client-s3@^3.1151.0, cache-manager@^7.2.9, file-type@^22.1.1, jose@^6.2.12, nest-commander@^3.21.0, @nestjs/cache-manager@^12.0.1, nestjs-cls@^7.0.1 (+27 more)

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

### Community 22 - "initial-project.production.spec.ts"
Cohesion: 0.11
Nodes (12): ApiKeySummary, CreatedProject, createService(), createdProject, createService(), existingProject, InitialProjectSettings, keySummary() (+4 more)

### Community 23 - "RequestContext"
Cohesion: 0.05
Nodes (19): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey (+11 more)

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
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, runToExit() (+3 more)

### Community 28 - ".create"
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-schema.ts"
Cohesion: 0.12
Nodes (16): boolean, ColumnSpec, expectedColumnCounts, expectedForeignKeys, expectedTables, expectedUniqueIndexes, integer, jsonb (+8 more)

### Community 32 - "identity-key-list.command.ts"
Cohesion: 0.10
Nodes (11): formatDate(), writeTable(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow(), header, KeyListCommand (+3 more)

### Community 33 - "main.ts"
Cohesion: 0.31
Nodes (7): createContext(), mode, runMigrate(), runners, runWorker(), useAppLogger(), parseServerMode()

### Community 34 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 35 - "development-secrets-file.ts"
Cohesion: 0.17
Nodes (23): completeFile(), createFile(), createDevelopmentSecrets(), defaultDevelopmentSecretsDirectory, DevelopmentSecrets, developmentSecretsFileName, developmentSecretsSchema, hasErrorCode() (+15 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "logger.module.ts"
Cohesion: 0.29
Nodes (11): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+3 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "api.module.ts"
Cohesion: 0.06
Nodes (41): configureApiApp(), ApiModule, useClsMiddleware(), DatabaseModule, DependencyStatusBody, StatusBody, bodyLimit, useBodyLimit() (+33 more)

### Community 41 - "replica-events.e2e-spec.ts"
Cohesion: 0.29
Nodes (10): expectCachedOnAll(), expectKept(), repositoryRoot, seed(), waitUntilDeleted(), cacheInvalidateSubscribers(), cacheOf(), publishCacheInvalidate() (+2 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "OperatorDisableCommand"
Cohesion: 0.13
Nodes (5): describeDisable(), describeEnable(), OperatorDisableCommand, OperatorEnableCommand, ProjectNotFoundError

### Community 46 - "RedactionProbeController"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 47 - "DisabledOperators"
Cohesion: 0.09
Nodes (16): DisabledOperators, Probe, OperatorReplicaEventsController, createDisabledOperators(), malformedPayloads, apiKeyEvent, operatorBlockEvent, operatorRules (+8 more)

### Community 48 - "visitor-session.controller.ts"
Cohesion: 0.12
Nodes (15): nestjs-zod@^5.5.0, toVisitorSessionResponse(), VisitorSessionController, VisitorSessionRefreshRequestDto, VisitorSessionRequestDto, VisitorSessionResponseDto, refreshToken, requestCases (+7 more)

### Community 49 - "typeorm"
Cohesion: 0.05
Nodes (41): database, loadDataSource(), databaseEntities, Channel, channelColumns(), findColumn(), Conversation, ConversationCloseReason (+33 more)

### Community 50 - "cli.module.ts"
Cohesion: 0.10
Nodes (16): serverKeyOnceWarning, writeLine(), writeWarning(), IdentityKeyAddOptions, IdentityKeyRevokeOptions, KeyCreateCommand, KeyCreateOptions, KeyGenerateCommand (+8 more)

### Community 51 - "operator-guard-probe.ts"
Cohesion: 0.14
Nodes (10): OperatorController(), DisabledProbeController, issueOperator(), issueOperator(), get(), getAs(), RolesProbeController, issueTestOperator() (+2 more)

### Community 52 - "@nestjs/testing"
Cohesion: 0.06
Nodes (36): ProjectsModule, initialProjectLockName, NewProject, ORIGIN_COLUMNS, OriginsRow, ProjectsRepository, project, snapshot (+28 more)

### Community 53 - "server-errors.spec.ts"
Cohesion: 0.11
Nodes (17): OperatorDisabledFilter, InvalidPublicKeyFilter, InvalidRefreshTokenFilter, InvalidPublicKeyError, ApiException, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage (+9 more)

### Community 54 - "startup-summary.service.spec.ts"
Cohesion: 0.13
Nodes (11): formatOrigins(), createService(), ports, secretLines, shop, zoneLines, StartupSummaryService, SecretStatus (+3 more)

### Community 55 - "development-secrets.spec.ts"
Cohesion: 0.12
Nodes (28): createdProject, existingProject, missingKeyWarning(), developmentAllowedOrigins, developmentOperatorAllowedOrigins, developmentProjectName, developmentSecretsPath(), loadFromProcessEnv() (+20 more)

### Community 57 - "JsonObjectValidator"
Cohesion: 0.30
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 58 - "server/package.json"
Cohesion: 0.08
Nodes (25): author, bin, sowa-chat, @aws-sdk/s3-request-presigner@^3.1151.0, bullmq@^6.3.15, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/bullmq@^12.0.0, @nestjs/swagger@^12.0.2 (+17 more)

### Community 59 - "JsonObject"
Cohesion: 0.16
Nodes (5): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord

### Community 60 - "test-secrets.ts"
Cohesion: 0.19
Nodes (15): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+7 more)

### Community 61 - "audit-log.listener.spec.ts"
Cohesion: 0.14
Nodes (8): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditModule, auditRules, testAuditRules

### Community 62 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 63 - "secrets-generate-command.e2e-spec.ts"
Cohesion: 0.17
Nodes (7): Env, generatedNames, isConfigVariable(), rotationEnv, RunResult, serverDirectory, systemEnvironment()

### Community 64 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 65 - "project-list.command.ts"
Cohesion: 0.22
Nodes (5): emptyCell, formatOrigins(), header, ProjectListCommand, toRow()

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.11
Nodes (15): EncryptionKey, CryptoModule, authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService (+7 more)

### Community 67 - "key-cli.ts"
Cohesion: 0.07
Nodes (62): toLookupPrefix(), expectNoKeyRows(), expectNoRows(), addKey(), badOrigins, helpEntries, prefixes, expectStatusOnAll() (+54 more)

### Community 68 - "log-level-warn.spec.ts"
Cohesion: 0.17
Nodes (8): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe

### Community 69 - "secrets-generate.command.spec.ts"
Cohesion: 0.18
Nodes (7): ../cli.module.js, ./${module}.module.js, generatedNames, linesOf(), productionEnv, rotatedNames, variablesOf()

### Community 70 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.33
Nodes (6): changeBodyChar(), forgeWithValidChecksum(), getProbe(), replaceChar(), withKey(), zoneAgent()

### Community 71 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 72 - "ProjectsService"
Cohesion: 0.16
Nodes (4): OriginList, ProjectSnapshot, ChangeOriginInput, ProjectsService

### Community 73 - "OperationSteps"
Cohesion: 0.05
Nodes (21): OperatorAuthGuard, ServerAuthModule, ServerKeyGuard, VisitorAuthGuard, AppClsModule, createTypeOrmModule(), getTypeOrmModule(), typeOrmModules (+13 more)

### Community 74 - "migrate.module.ts"
Cohesion: 0.17
Nodes (5): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 75 - "domain-event-bus.ts"
Cohesion: 0.09
Nodes (30): auditedEventNames(), AuditRule, auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent (+22 more)

### Community 76 - "config.module.ts"
Cohesion: 0.14
Nodes (21): appConfig, compileConfigModule(), compileInDevelopment(), compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig (+13 more)

### Community 77 - "secrets-reencrypt.command.ts"
Cohesion: 0.16
Nodes (11): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+3 more)

### Community 78 - "cli-runner.ts"
Cohesion: 0.19
Nodes (10): cliName, CliRunSetup, commanderArgv(), quietLogLevels, runCliCommand(), runCliModule(), secretsGenerateCommandName, startupLogLevels (+2 more)

### Community 79 - "secret-rotation.ts"
Cohesion: 0.27
Nodes (13): generateEncryptionKeyEntry(), generateTokenSigningKeyEntry(), nextTokenSigningKeyId(), parseVariable(), requireConfiguredValue(), rotateConfiguredSecrets(), rotateEncryptionKeys(), rotateSecrets() (+5 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (10): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), DependencyStatus, ServerStatus, StatusService (+2 more)

### Community 81 - "DisabledOperators"
Cohesion: 0.13
Nodes (5): AppCacheModule, cacheTtlMs, CacheInvalidateController, ReplicaEventsModule, @nestjs/cache-manager

### Community 82 - "identity-keys.service.ts"
Cohesion: 0.36
Nodes (7): KeyActorKind, IdentityKeyAlgorithm, ParsedIdentityKey, NewIdentityKey, AddedIdentityKey, AddIdentityKeyInput, RevokeIdentityKeyInput

### Community 83 - "operator-block-sync.e2e-spec.ts"
Cohesion: 0.12
Nodes (20): blockedOnAll(), BlockTarget, expectStatusOnAll(), issueOperator(), publishAll(), subscriberCounts(), waitForBlockedOnAll(), waitForStatusOnAll() (+12 more)

### Community 84 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 85 - "server-errors.spec.ts"
Cohesion: 0.18
Nodes (11): ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ErrorCode, errorCodes, errorDetailSchema, ErrorResponse (+3 more)

### Community 87 - "ioredis"
Cohesion: 0.20
Nodes (8): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 88 - "replica-events-transport.ts"
Cohesion: 0.23
Nodes (12): @nestjs/microservices@^12.1.3, parseDatabase(), parseUrl(), RedisConnectionOptions, redisTransportOptions(), stripIpv6Brackets(), connectReplicaEvents(), replicaEventsMicroservice (+4 more)

### Community 89 - "replica-events.publisher.spec.ts"
Cohesion: 0.08
Nodes (20): BusProbe, cacheInvalidatedEventNames(), cacheInvalidate(), cacheInvalidateRule(), cacheInvalidateRules(), ReplicaEventMessage, replicaEventNames(), ReplicaEventRule (+12 more)

### Community 90 - "zone.ts"
Cohesion: 0.06
Nodes (30): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes (+22 more)

### Community 91 - "Message"
Cohesion: 0.27
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.23
Nodes (11): encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes, key2 (+3 more)

### Community 93 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldResult, ReencryptInput, reencryptionBatchSize, ReencryptionReport (+3 more)

### Community 94 - "api-keys.service.ts"
Cohesion: 0.04
Nodes (45): ApiKey, ApiKeyKind, apiKeyKinds, ApiKeysRepository, NewApiKey, ApiKeysService, CachedApiKey, hashMatches() (+37 more)

### Community 96 - "replica-cli-probe.ts"
Cohesion: 0.22
Nodes (8): captureLogLines(), ChannelRecorder, ClosingRedisServer, LogCapture, ObservedMessage, recordCacheInvalidate(), startClosingRedisServer(), nestjs-pino

### Community 97 - "operators.module.ts"
Cohesion: 0.18
Nodes (5): OperatorAuthModule, ServerApiModule, DisabledOperatorsModule, OperatorsModule, TokensModule

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 100 - "request-id.spec.ts"
Cohesion: 0.15
Nodes (10): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+2 more)

### Community 102 - "JsonObjectValidator"
Cohesion: 0.09
Nodes (15): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+7 more)

### Community 103 - ".add"
Cohesion: 0.29
Nodes (3): IdentityKeyKidTakenError, InvalidIdentityKeyIdError, toEvent()

### Community 104 - "redis-checks.e2e-spec.ts"
Cohesion: 0.12
Nodes (31): PrintedKeys, startApi(), expectNoKeys(), keyBody(), productionEnv(), startAndStop(), startFailingApi(), startLiveApi() (+23 more)

### Community 105 - "@nestjs/common"
Cohesion: 0.04
Nodes (24): ServerController(), NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController, StatusController, BodyProbeController, calls (+16 more)

### Community 106 - "ref_vitest"
Cohesion: 0.14
Nodes (5): databaseUrl(), IdentityRow, VersionRow, useTestRedis(), testEnv

### Community 107 - "operator-commands.e2e-spec.ts"
Cohesion: 0.23
Nodes (13): runCommand(), disabledAtOf(), setupOperator(), disabledAtOf(), helpEntries, setupOperator(), operatorActions, operatorBlockAuditRows() (+5 more)

### Community 108 - "identity-key-pem.ts"
Cohesion: 0.27
Nodes (7): algorithmOf(), InvalidIdentityKeyError, isP256(), parseIdentityPublicKey(), readPublicKeyObject(), captureError(), expectInvalidKey()

### Community 109 - "ref_node_path"
Cohesion: 0.08
Nodes (23): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, Env, isConfigVariable() (+15 more)

### Community 111 - "findFreePort"
Cohesion: 0.12
Nodes (18): AppConfigModule, findZonePorts(), fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl() (+10 more)

### Community 112 - "OperatorsService"
Cohesion: 0.06
Nodes (18): OperatorIdRow, OperatorProfile, OperatorsRepository, ChangeOperatorBlockInput, IssuedOperatorToken, OperatorActorKind, OperatorBlockChange, OperatorDisabledError (+10 more)

### Community 115 - "tokens.service.ts"
Cohesion: 0.06
Nodes (44): VisitorAuthModule, TokenSigningKey, SignedToken, SignTokenInput, ConsumerModule, TestTokenSigningConfigModule, TokenConsumer, TokenAudience (+36 more)

### Community 120 - "DisabledOperators"
Cohesion: 0.21
Nodes (8): happened, TestListener, OnDomainEvent(), TelemetryModule, DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 121 - "redis-checks.spec.ts"
Cohesion: 0.19
Nodes (9): readRedisSetting(), readSettingOrUndefined(), redisAppendOnlyCheck, redisEvictionPolicyCheck, ConfigResponse, createRedis(), noPermission, redisAnswering() (+1 more)

### Community 122 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 123 - "env.schema.initial-project.spec.ts"
Cohesion: 0.29
Nodes (3): initVariables, loadConfig(), requiredEnv

### Community 124 - "SlowOperations"
Cohesion: 0.11
Nodes (8): HttpMetrics, MetricsModule, StepTimes, FinishedOperation, SlowOperationsModule, roundSteps(), SlowOperations, TelemetryInterceptor

### Community 125 - "test-database.ts"
Cohesion: 0.05
Nodes (33): identityKeyAlgorithms, Operator, issueServerKey(), IndexRow, PlanRow, ColumnRow, expectedColumns, jwk (+25 more)

### Community 126 - "server-errors.spec.ts"
Cohesion: 0.32
Nodes (6): ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, stringsInside()

### Community 131 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 132 - "visitor-sessions.service.ts"
Cohesion: 0.06
Nodes (16): @nestjs-cls/transactional-adapter-typeorm@^2.0.1, VisitorApiModule, generateRefreshToken(), Visitor, NewVisitorSession, VisitorSessionsRepository, InvalidRefreshTokenError, RefreshExchange (+8 more)

### Community 136 - "env.schema.logging.spec.ts"
Cohesion: 0.33
Nodes (3): Env, logLevels, requiredEnv

### Community 137 - "DomainEventBus"
Cohesion: 0.20
Nodes (4): toEvent(), AuditScenarios, happenedIn(), ScenarioError

### Community 138 - "global-setup.ts"
Cohesion: 0.24
Nodes (9): testcontainers@^12.2.1, @testcontainers/postgresql@^12.2.1, runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl(), testcontainers (+1 more)

### Community 139 - "log-settings.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+2 more)

### Community 142 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 146 - "secret-generators.spec.ts"
Cohesion: 0.31
Nodes (6): Env, firstTokenSigningKeyIds, GeneratedSecret, generatedSecrets, SecretsMode, minimalEnv

### Community 149 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 150 - "projects.service.ts"
Cohesion: 0.12
Nodes (21): IssuedApiKey, ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), originLists, normalizeOrigin(), normalizeOrigins(), parseUrl() (+13 more)

### Community 160 - "token-signing-keys.schema.ts"
Cohesion: 0.29
Nodes (6): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, tokenSigningKeysSchema

### Community 161 - "visitor.entity.spec.ts"
Cohesion: 0.32
Nodes (5): columns(), expectedColumns, findColumn(), findRelation(), relations()

### Community 162 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 168 - "redact-paths.ts"
Cohesion: 0.50
Nodes (3): redactPaths, sensitiveFields, sensitiveHeaders

## Knowledge Gaps
- **7 isolated node(s):** `./${module}.module.js`, `../cli.module.js`, `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` (+2 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1178 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `visitor-sessions.service.ts`, `api-docs.spec.ts`, `protocol/src/index.ts`, `environment-check.ts`, `dependencies`, `zod-serialization.spec.ts`, `projects.service.ts`, `RequestContext`, `initial-project.production.spec.ts`, `origin.commands.ts`, `identity-key-list.command.ts`, `main.ts`, `logger.module.ts`, `api.module.ts`, `replica-events.e2e-spec.ts`, `RedactionProbeController`, `DisabledOperators`, `visitor-session.controller.ts`, `cli.module.ts`, `operator-guard-probe.ts`, `@nestjs/testing`, `server-errors.spec.ts`, `startup-summary.service.spec.ts`, `development-secrets.spec.ts`, `server/package.json`, `JsonObject`, `audit-log.listener.spec.ts`, `project-list.command.ts`, `encryption.service.spec.ts`, `key-cli.ts`, `log-level-warn.spec.ts`, `server-key-guard.e2e-spec.ts`, `OperationSteps`, `migrate.module.ts`, `domain-event-bus.ts`, `config.module.ts`, `secrets-reencrypt.command.ts`, `cli-runner.ts`, `health.module.ts`, `DisabledOperators`, `identity-keys.service.ts`, `operator-block-sync.e2e-spec.ts`, `server-errors.spec.ts`, `ioredis`, `replica-events-transport.ts`, `replica-events.publisher.spec.ts`, `zone.ts`, `secrets-reencryption.service.ts`, `api-keys.service.ts`, `operators.module.ts`, `request-id.spec.ts`, `OperatorsService`, `tokens.service.ts`, `DisabledOperators`, `SlowOperations`, `test-database.ts`, `server-errors.spec.ts`?**
  _High betweenness centrality (0.210) - this node is a cross-community bridge._
- **What connects `./${module}.module.js`, `../cli.module.js`, `./tsconfig.json` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.05027322404371585 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `typeorm`, `visitor-session-refresh.e2e-spec.ts`, `visitor-sessions.service.ts`, `environment-check.ts`, `dependencies`, `secrets-reencrypt-command.e2e-spec.ts`, `visitor.entity.spec.ts`, `operator-guard-probe.ts`, `@nestjs/testing`, `server/package.json`, `test-secrets.ts`, `migrate-mode.e2e-spec.ts`, `participant.entity.spec.ts`, `key-cli.ts`, `OperationSteps`, `operator-block-sync.e2e-spec.ts`, `Message`, `api-keys.service.ts`, `ref_vitest`, `operator-commands.e2e-spec.ts`, `findFreePort`, `OperatorsService`, `redis-checks.spec.ts`, `ConversationEvent`, `test-database.ts`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `ProjectsService` connect `ProjectsService` to `identity-key-list.command.ts`, `project-list.command.ts`, `key-cli.ts`, `IdentityKeyAddCommand`, `DomainEventBus`, `config.module.ts`, `OperatorDisableCommand`, `cli.module.ts`, `@nestjs/testing`, `development-secrets.spec.ts`, `projects.service.ts`, `initial-project.production.spec.ts`, `ProjectCreateCommand`, `IdentityKeyRevokeCommand`, `origin.commands.ts`, `startup-summary.service.spec.ts`, `api-keys.service.ts`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Should `visitor-session-refresh.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12233285917496443 - nodes in this community are weakly interconnected._