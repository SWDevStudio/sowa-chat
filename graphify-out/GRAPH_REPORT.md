# Graph Report - hector-chat-epic-11  (2026-10-29)

## Corpus Check
- 481 files · ~126,820 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .log 1)

## Summary
- 3313 nodes · 8368 edges · 176 communities (141 shown, 35 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 209 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a8d6c5d8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- typeorm
- bot-sdk/tsconfig.json
- package.json
- visitor-session-refresh.e2e-spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- request-context.ts
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
- initial-project.development.spec.ts
- operator-role.guard.spec.ts
- typeorm
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
- replica-cache-sync.e2e-spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- OperatorDisableCommand
- RedactionProbeController
- json-object-limits.spec.ts
- visitor-session.controller.ts
- conversation.entity.ts
- cli.module.ts
- operator-guard-probe.ts
- project-cli.ts
- server-errors.spec.ts
- startup-summary.service.spec.ts
- development-secrets.spec.ts
- ProjectCreateCommand
- database-entities.ts
- server/package.json
- Project
- test-secrets.ts
- audit-log.e2e-spec.ts
- identity-keys.e2e-spec.ts
- cli-runner.ts
- participant.entity.spec.ts
- body-limit.ts
- encryption.service.spec.ts
- key-cli.ts
- log-level-warn.spec.ts
- secrets-generate.command.spec.ts
- key-format.ts
- body-limit.spec.ts
- ProjectsService
- OperationSteps
- migrate.module.ts
- audited-events.ts
- config.module.ts
- secrets-reencryption.service.ts
- secrets-generate.command.ts
- secret-rotation.ts
- health.module.ts
- DisabledOperators
- api-keys-service-probe.ts
- operator-block-sync.e2e-spec.ts
- RequestContext
- server-errors.spec.ts
- CreateChatTables1793215389271
- operators.service.ts
- replica-events-transport.ts
- DomainEventBus
- zone-e2e-app.ts
- Message
- encryption-keys.schema.spec.ts
- secrets-reencryption.module.ts
- ApiKeysRepository
- IdentityKey
- visitor-session.entity.spec.ts
- operators.module.ts
- cli-mode.e2e-spec.ts
- SecretsReencryptionService
- @nestjs/common
- IdentityKeyAddCommand
- JsonObjectValidator
- DatabaseStepSubscriber
- redis-checks.e2e-spec.ts
- Zone
- api-keys.service.ts
- operator-commands.e2e-spec.ts
- identity-key-pem.ts
- ref_node_path
- secrets-reencrypt-command.e2e-spec.ts
- migrate-mode.e2e-spec.ts
- OperatorsService
- tokens.service.ts
- DisabledOperators
- replica-events.e2e-spec.ts
- ConversationEvent
- env.schema.initial-project.spec.ts
- SlowOperations
- test-database.ts
- runCliInProcess
- ref_node_child_process
- env.schema.spec.ts
- @aws-sdk/client-s3@^3.1151.0
- ServerErrorsProbeController
- encrypted-secret.spec.ts
- visitor-session.e2e-spec.ts
- secrets-generate-command.e2e-spec.ts
- cls-middleware.ts
- helmet
- operator-auth.guard.ts
- .publish
- @testcontainers/postgresql
- log-settings.e2e-spec.ts
- TokensService
- metrics.controller.ts
- InternalProbeController
- workspace-check-types.e2e-spec.ts
- ErrorProbeController
- ZoneServers
- health.e2e-spec.ts
- spawnServer
- conversation.entity.spec.ts
- zod-serialization.spec.ts
- projects.service.ts
- ServerKeyGuard
- database-connection.e2e-spec.ts
- origin.commands.ts
- server-key-guard.e2e-spec.ts
- server-protocol.e2e-spec.ts
- project-list.command.ts
- .canActivate
- operator-token.controller.ts
- NeutralProbeController
- token-signing-keys.schema.ts
- visitor.entity.spec.ts
- log-redaction.e2e-spec.ts
- visitor-guard-probe.ts
- OperationStepsProbeController
- KeyRevokeCommand
- ZonedController
- identity-key.entity.ts
- redact-paths.ts
- TestTokenSigningConfigModule
- @aws-sdk/s3-request-presigner@^3.1151.0
- bullmq@^6.3.15
- file-type@^22.1.1
- @nestjs/throttler@^6.7.1
- @sowa-chat/protocol@workspace:*
- source-map-support@^0.5.21

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 170 edges
2. `typeorm` - 70 edges
3. `ProjectsService` - 54 edges
4. `Zone()` - 54 edges
5. `Project` - 53 edges
6. `@nestjs/testing` - 52 edges
7. `useTestDatabase()` - 52 edges
8. `DomainEventBus` - 40 edges
9. `createProject()` - 39 edges
10. `@nestjs/config` - 38 edges

## Surprising Connections (you probably didn't know these)
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `ConversationEvent` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation-event.entity.ts → packages/protocol/src/json-types.ts
- `Conversation` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation.entity.ts → packages/protocol/src/json-types.ts
- `Message` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/message.entity.ts → packages/protocol/src/json-types.ts
- `OperatorProfile` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/domain/operators/operators.repository.ts → packages/protocol/src/operator-role.ts

## Import Cycles
- None detected.

## Communities (176 total, 35 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.07
Nodes (11): databaseMigrations, migrationFiles, migrationsDirectory, CreateProjects1793193549883, CreateAuditLog1793200000000, AddConversationIndexes1793215983154, CreateApiKeys1793300000000, CreateIdentityKeys1793300001000 (+3 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "visitor-session-refresh.e2e-spec.ts"
Cohesion: 0.06
Nodes (44): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+36 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, supertest@^7.0.0 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "request-context.ts"
Cohesion: 0.18
Nodes (3): RequestContextModule, ConsumerModule, ContextConsumer

### Community 7 - "env.schema.ts"
Cohesion: 0.07
Nodes (24): checkEncryptionKeysInProduction(), checkInitialServerKey(), checkPrettyLogFormat(), checkPublicUrlInProduction(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), EnvObject, envObjectSchema (+16 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "protocol/src/index.ts"
Cohesion: 0.11
Nodes (18): OperatorTokenClaims, operatorTokenClaimsSchema, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope (+10 more)

### Community 10 - "environment-checks.service.ts"
Cohesion: 0.06
Nodes (47): ioredis@^6.0.0, environmentChecksConfig, exampleSecretsCheck, exampleSecretValues, publicUrlsHttpsCheck, s3PublicUrlCheck, contextWith(), developmentContext() (+39 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, cache-manager@^7.2.9, nest-commander@^3.21.0, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/cache-manager@^12.0.1, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1 (+21 more)

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

### Community 22 - "initial-project.development.spec.ts"
Cohesion: 0.16
Nodes (11): createdProject, createService(), existingProject, developmentAllowedOrigins, developmentOperatorAllowedOrigins, developmentProjectName, InitialProjectService, appConfig (+3 more)

### Community 23 - "operator-role.guard.spec.ts"
Cohesion: 0.14
Nodes (8): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey

### Community 24 - "typeorm"
Cohesion: 0.16
Nodes (7): database, loadDataSource(), databaseEntities, Channel, channelColumns(), findColumn(), typeorm

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.13
Nodes (6): OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand, OriginListCommand, OriginRemoveCommand

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.17
Nodes (12): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, runToExit() (+4 more)

### Community 28 - ".create"
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.23
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.07
Nodes (28): ColumnRow, ForeignKeyRow, IndexRow, tableNames, IndexRow, PlanRow, countRows(), createChannel() (+20 more)

### Community 32 - "identity-key-list.command.ts"
Cohesion: 0.14
Nodes (8): formatDate(), writeTable(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow(), toRow(), SecretsReencryptCommand

### Community 33 - "main.ts"
Cohesion: 0.27
Nodes (8): createContext(), mode, runApi(), runMigrate(), runners, runWorker(), useAppLogger(), parseServerMode()

### Community 34 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 35 - "development-secrets-file.ts"
Cohesion: 0.16
Nodes (25): missingKeyWarning(), completeFile(), createFile(), createDevelopmentSecrets(), defaultDevelopmentSecretsDirectory, DevelopmentSecrets, developmentSecretsFileName, developmentSecretsPath() (+17 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "logger.module.ts"
Cohesion: 0.29
Nodes (11): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+3 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "@nestjs/testing"
Cohesion: 0.09
Nodes (24): HealthBody, HealthEntry, DependencyStatusBody, StatusBody, LogDestination, findZonePorts(), probeControllers, LogEntry (+16 more)

### Community 41 - "replica-cache-sync.e2e-spec.ts"
Cohesion: 0.15
Nodes (15): badOrigins, expectStatusOnAll(), probeWithKey(), ReplicaProbeController, addOrigins(), OriginAction, OriginCommandOptions, OriginGroup (+7 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "OperatorDisableCommand"
Cohesion: 0.16
Nodes (6): describeDisable(), describeEnable(), OperatorDisableCommand, OperatorEnableCommand, OperatorOptions, OperatorBlockChange

### Community 46 - "RedactionProbeController"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 47 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 48 - "visitor-session.controller.ts"
Cohesion: 0.15
Nodes (13): toVisitorSessionResponse(), VisitorSessionController, VisitorSessionRefreshRequestDto, VisitorSessionRequestDto, VisitorSessionResponseDto, refreshToken, requestCases, VisitorSessionRefreshRequest (+5 more)

### Community 49 - "conversation.entity.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 50 - "cli.module.ts"
Cohesion: 0.16
Nodes (9): emptyCell, serverKeyOnceWarning, writeLine(), writeWarning(), KeyCreateCommand, KeyCreateOptions, KeyGenerateCommand, ProjectCreateOptions (+1 more)

### Community 51 - "operator-guard-probe.ts"
Cohesion: 0.13
Nodes (9): Operator, OperatorIdRow, OperatorProfile, IssueOperatorTokenInput, RequestOperator, RequestVisitor, operatorProbePath, waitMs() (+1 more)

### Community 52 - "project-cli.ts"
Cohesion: 0.14
Nodes (16): CreateProjectInput, PrintedKeys, helpEntries, prefixes, buildServer(), fullOriginArguments, listHeader, onceWarning (+8 more)

### Community 53 - "server-errors.spec.ts"
Cohesion: 0.10
Nodes (18): OperatorDisabledFilter, InvalidPublicKeyFilter, InvalidRefreshTokenFilter, InvalidPublicKeyError, ApiException, ErrorDetail, errorCodeOfStatus(), httpErrorResponse() (+10 more)

### Community 54 - "startup-summary.service.spec.ts"
Cohesion: 0.13
Nodes (11): formatOrigins(), createService(), ports, secretLines, shop, zoneLines, StartupSummaryService, SecretStatus (+3 more)

### Community 55 - "development-secrets.spec.ts"
Cohesion: 0.16
Nodes (22): compileConfigModule(), compileInDevelopment(), loadFromProcessEnv(), Loaded, allTestSecrets, createSecretsDirectory(), developmentEnvWithoutSecrets, developmentSource() (+14 more)

### Community 57 - "database-entities.ts"
Cohesion: 0.14
Nodes (15): DatabaseMigration, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection, DatabaseEntity (+7 more)

### Community 58 - "server/package.json"
Cohesion: 0.09
Nodes (21): author, bin, sowa-chat, @nestjs/bullmq@^12.0.0, @nestjs/platform-socket.io@^12.1.3, @nestjs/swagger@^12.0.2, @nestjs/websockets@^12.1.3, @socket.io/redis-adapter@^8.3.0 (+13 more)

### Community 59 - "Project"
Cohesion: 0.07
Nodes (14): ActorKind, AuditLogEntry, NewAuditLogEntry, AuditRecord, auditRules, InvalidApiKeyError, Project, CreatedProject (+6 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "audit-log.e2e-spec.ts"
Cohesion: 0.11
Nodes (5): AuditLogListener, AuditLogRepository, auditedEventNames(), AuditRule, LocalCacheInvalidation

### Community 62 - "identity-keys.e2e-spec.ts"
Cohesion: 0.16
Nodes (23): expectNoKeyRows(), expectNoRows(), addKey(), blockAuditRows(), originAuditRows(), addEd25519Key(), addIdentityKey(), addP256Key() (+15 more)

### Community 63 - "cli-runner.ts"
Cohesion: 0.18
Nodes (11): cliName, CliRunSetup, commanderArgv(), quietLogLevels, runCliCommand(), runCliModule(), secretsGenerateCommandName, startupLogLevels (+3 more)

### Community 64 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 65 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.13
Nodes (13): authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService, SecretDecryptionError, captureError() (+5 more)

### Community 67 - "key-cli.ts"
Cohesion: 0.16
Nodes (16): ApiKey, toLookupPrefix(), hashKey(), auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader (+8 more)

### Community 68 - "log-level-warn.spec.ts"
Cohesion: 0.17
Nodes (8): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe

### Community 69 - "secrets-generate.command.spec.ts"
Cohesion: 0.18
Nodes (7): ../cli.module.js, ./${module}.module.js, generatedNames, linesOf(), productionEnv, rotatedNames, variablesOf()

### Community 70 - "key-format.ts"
Cohesion: 0.20
Nodes (13): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+5 more)

### Community 72 - "ProjectsService"
Cohesion: 0.07
Nodes (6): IdentityKeyRevokeCommand, KeyListCommand, ApiKeysService, ProjectSnapshot, ProjectsService, Replica

### Community 73 - "OperationSteps"
Cohesion: 0.18
Nodes (9): operationSteps, OperationTiming, StepTimes, OperationSteps, beginOperation(), operationTimingKey, FinishedOperation, nestjs-cls (+1 more)

### Community 74 - "migrate.module.ts"
Cohesion: 0.17
Nodes (5): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 75 - "audited-events.ts"
Cohesion: 0.09
Nodes (13): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+5 more)

### Community 76 - "config.module.ts"
Cohesion: 0.16
Nodes (18): compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, Env, exportToProcessEnv() (+10 more)

### Community 77 - "secrets-reencryption.service.ts"
Cohesion: 0.13
Nodes (19): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptOptions, toReencryptionRow(), toVersionRow(), encryptedFields (+11 more)

### Community 78 - "secrets-generate.command.ts"
Cohesion: 0.16
Nodes (8): generateNewSecrets(), SecretsGenerateCommand, SecretsGenerateOptions, firstTokenSigningKeyIds, GeneratedSecret, generatedSecrets, SecretsMode, minimalEnv

### Community 79 - "secret-rotation.ts"
Cohesion: 0.27
Nodes (13): generateEncryptionKeyEntry(), generateTokenSigningKeyEntry(), nextTokenSigningKeyId(), parseVariable(), requireConfiguredValue(), rotateConfiguredSecrets(), rotateEncryptionKeys(), rotateSecrets() (+5 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 81 - "DisabledOperators"
Cohesion: 0.08
Nodes (13): DisabledOperators, OperatorReplicaEventsController, createDisabledOperators(), malformedPayloads, CacheInvalidateController, CacheInvalidateEvent, cacheInvalidateEventSchema, ReplicaEventsModule (+5 more)

### Community 82 - "api-keys-service-probe.ts"
Cohesion: 0.20
Nodes (12): eventFields, keyTypeByKind, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred (+4 more)

### Community 83 - "operator-block-sync.e2e-spec.ts"
Cohesion: 0.07
Nodes (31): configureApiApp(), OperatorController(), DisabledProbeController, issueOperator(), issueOperator(), blockedOnAll(), BlockTarget, expectStatusOnAll() (+23 more)

### Community 84 - "RequestContext"
Cohesion: 0.14
Nodes (3): RequestContext, GuardProbeController, OperatorGuardProbeController

### Community 85 - "server-errors.spec.ts"
Cohesion: 0.12
Nodes (16): ApiExceptionInput, errorCodeStatuses, errorCodeByStatus, internalErrorMessage, ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith() (+8 more)

### Community 87 - "operators.service.ts"
Cohesion: 0.13
Nodes (13): ChangeOperatorBlockInput, IssuedOperatorToken, OperatorActorKind, OperatorDisabledError, OperatorNotFoundError, operatorTokenTtlSeconds, blockInput, BlockProbe (+5 more)

### Community 88 - "replica-events-transport.ts"
Cohesion: 0.27
Nodes (10): parseDatabase(), parseUrl(), RedisConnectionOptions, redisTransportOptions(), stripIpv6Brackets(), connectReplicaEvents(), replicaEventsMicroservice, replicaEventsRetryDelayMs (+2 more)

### Community 89 - "DomainEventBus"
Cohesion: 0.06
Nodes (40): BusProbe, Probe, apiKeyCacheKeys(), cacheInvalidatedEventNames(), CacheInvalidationRule, cacheInvalidationRules, projectCacheKeys(), apiKeyEvent (+32 more)

### Community 90 - "zone-e2e-app.ts"
Cohesion: 0.09
Nodes (22): probeControllers, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, probeControllers (+14 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 93 - "secrets-reencryption.module.ts"
Cohesion: 0.32
Nodes (3): CryptoModule, registeredEncryptedFields, SecretsReencryptionModule

### Community 94 - "ApiKeysRepository"
Cohesion: 0.14
Nodes (8): ApiKeyKind, ApiKeysRepository, NewApiKey, CachedApiKey, hashMatches(), toCachedApiKey(), toSummary(), verifyCached()

### Community 96 - "visitor-session.entity.spec.ts"
Cohesion: 0.14
Nodes (9): columns(), expectedColumns, findColumn(), findRelation(), normalizeSql(), relations(), runMigration(), CreateOperators1793300003000 (+1 more)

### Community 97 - "operators.module.ts"
Cohesion: 0.14
Nodes (7): OperatorAuthModule, ServerApiModule, VisitorAuthModule, DisabledOperatorsModule, OperatorsModule, TokensModule, OperationStepsModule

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 100 - "@nestjs/common"
Cohesion: 0.06
Nodes (29): ServerAuthModule, IdentityKeyAddOptions, IdentityKeyRevokeOptions, KeyRevokeOptions, eventValues, happened, personalValues, AuditModule (+21 more)

### Community 102 - "JsonObjectValidator"
Cohesion: 0.17
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, JsonObjectValidator, Violation, JsonObjectLimits, encoder (+1 more)

### Community 103 - "DatabaseStepSubscriber"
Cohesion: 0.13
Nodes (4): DatabaseStepSubscriber, OperationStep, pause(), SlowProbeController

### Community 104 - "redis-checks.e2e-spec.ts"
Cohesion: 0.20
Nodes (17): startApi(), productionEnv(), LogEntry, startApi(), createSecretsDirectory(), startApi(), startWorker(), zonePortVariables (+9 more)

### Community 105 - "Zone"
Cohesion: 0.06
Nodes (22): ServerController(), controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController (+14 more)

### Community 106 - "api-keys.service.ts"
Cohesion: 0.09
Nodes (15): header, KeyListOptions, ApiKeySummary, IssueApiKeyBaseInput, IssuedApiKey, RevokeApiKeyInput, VerifiedApiKey, project (+7 more)

### Community 107 - "operator-commands.e2e-spec.ts"
Cohesion: 0.18
Nodes (15): CliModule, runCommand(), disabledAtOf(), setupOperator(), disabledAtOf(), helpEntries, setupOperator(), OperatorAction (+7 more)

### Community 108 - "identity-key-pem.ts"
Cohesion: 0.19
Nodes (11): IdentityKeyAlgorithm, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey(), readPublicKeyObject(), captureError() (+3 more)

### Community 109 - "ref_node_path"
Cohesion: 0.09
Nodes (20): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, Env, isConfigVariable(), repositoryRoot, RunResult (+12 more)

### Community 110 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 111 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.17
Nodes (12): pg@^8.23.1, BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult (+4 more)

### Community 115 - "tokens.service.ts"
Cohesion: 0.09
Nodes (37): jose@^6.2.12, TokenSigningKey, SignedToken, SignTokenInput, TokenAudience, tokenAudiences, VerifiedToken, getProbe() (+29 more)

### Community 120 - "DisabledOperators"
Cohesion: 0.24
Nodes (8): happened, TestListener, DomainEventHandler, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 121 - "replica-events.e2e-spec.ts"
Cohesion: 0.29
Nodes (10): expectCachedOnAll(), expectKept(), repositoryRoot, seed(), waitUntilDeleted(), cacheInvalidateSubscribers(), cacheOf(), publishCacheInvalidate() (+2 more)

### Community 122 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 123 - "env.schema.initial-project.spec.ts"
Cohesion: 0.29
Nodes (3): initVariables, loadConfig(), requiredEnv

### Community 124 - "SlowOperations"
Cohesion: 0.16
Nodes (4): HttpMetrics, roundSteps(), SlowOperations, TelemetryInterceptor

### Community 125 - "test-database.ts"
Cohesion: 0.08
Nodes (28): actorKinds, apiKeyKinds, issueServerKey(), ColumnRow, expectedColumns, ColumnRow, expectedColumns, blockMethods (+20 more)

### Community 126 - "runCliInProcess"
Cohesion: 0.20
Nodes (12): CapturedRun, runCaptured(), stubRefusedRedis(), CliRunResult, runCliInProcess(), MainProject, captureLogLines(), ChannelRecorder (+4 more)

### Community 127 - "ref_node_child_process"
Cohesion: 0.18
Nodes (5): databaseUrl(), IdentityRow, VersionRow, useTestRedis(), testEnv

### Community 131 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 132 - "visitor-session.e2e-spec.ts"
Cohesion: 0.05
Nodes (14): VisitorApiModule, generateRefreshToken(), Visitor, VisitorSession, VisitorSessionsRepository, InvalidRefreshTokenError, RefreshExchange, visitorAccessTokenTtlSeconds (+6 more)

### Community 133 - "secrets-generate-command.e2e-spec.ts"
Cohesion: 0.17
Nodes (7): Env, generatedNames, isConfigVariable(), rotationEnv, RunResult, serverDirectory, systemEnvironment()

### Community 134 - "cls-middleware.ts"
Cohesion: 0.39
Nodes (5): ApiModule, useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp()

### Community 136 - "operator-auth.guard.ts"
Cohesion: 0.30
Nodes (4): bearerToken(), FakeRequestInput, noStore(), useSecurityHeaders()

### Community 137 - ".publish"
Cohesion: 0.27
Nodes (3): toEvent(), happenedIn(), ScenarioError

### Community 139 - "log-settings.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+2 more)

### Community 140 - "TokensService"
Cohesion: 0.20
Nodes (3): TokenConsumer, TokensService, createService()

### Community 141 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 142 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 143 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 145 - "ZoneServers"
Cohesion: 0.20
Nodes (4): startListening(), stopListening(), ZoneServers, ZonesModule

### Community 146 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 147 - "spawnServer"
Cohesion: 0.24
Nodes (9): startApi(), fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableRedisUrl(), waitForHttpStatus() (+1 more)

### Community 148 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 149 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 150 - "projects.service.ts"
Cohesion: 0.06
Nodes (39): IssueApiKeyInput, ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), OriginList, originLists, normalizeOrigin(), normalizeOrigins() (+31 more)

### Community 152 - "database-connection.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus()

### Community 153 - "origin.commands.ts"
Cohesion: 0.15
Nodes (8): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OriginOptions, ProjectOptions, removeOriginFrom(), OriginChange

### Community 154 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.33
Nodes (6): changeBodyChar(), forgeWithValidChecksum(), getProbe(), replaceChar(), withKey(), zoneAgent()

### Community 155 - "server-protocol.e2e-spec.ts"
Cohesion: 0.31
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 156 - "project-list.command.ts"
Cohesion: 0.28
Nodes (4): formatOrigins(), header, ProjectListCommand, toRow()

### Community 158 - "operator-token.controller.ts"
Cohesion: 0.21
Nodes (5): nestjs-zod@^5.5.0, OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, nestjs-zod

### Community 159 - "NeutralProbeController"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 160 - "token-signing-keys.schema.ts"
Cohesion: 0.29
Nodes (6): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, tokenSigningKeysSchema

### Community 161 - "visitor.entity.spec.ts"
Cohesion: 0.32
Nodes (5): columns(), expectedColumns, findColumn(), findRelation(), relations()

### Community 162 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 163 - "visitor-guard-probe.ts"
Cohesion: 0.38
Nodes (3): VisitorController(), VisitorGuardProbeController, visitorProbePath

### Community 167 - "identity-key.entity.ts"
Cohesion: 0.40
Nodes (4): identityKeyAlgorithms, ColumnRow, expectedColumns, jwk

### Community 168 - "redact-paths.ts"
Cohesion: 0.50
Nodes (3): redactPaths, sensitiveFields, sensitiveHeaders

## Knowledge Gaps
- **7 isolated node(s):** `./${module}.module.js`, `../cli.module.js`, `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` (+2 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1156 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `visitor-session-refresh.e2e-spec.ts`, `visitor-session.e2e-spec.ts`, `cls-middleware.ts`, `request-context.ts`, `operator-auth.guard.ts`, `environment-checks.service.ts`, `dependencies`, `metrics.controller.ts`, `ZoneServers`, `zod-serialization.spec.ts`, `projects.service.ts`, `operator-role.guard.spec.ts`, `initial-project.development.spec.ts`, `origin.commands.ts`, `server-key-guard.e2e-spec.ts`, `project-list.command.ts`, `operator-token.controller.ts`, `identity-key-list.command.ts`, `main.ts`, `zone.guard.spec.ts`, `visitor-guard-probe.ts`, `logger.module.ts`, `@nestjs/testing`, `replica-cache-sync.e2e-spec.ts`, `OperatorDisableCommand`, `RedactionProbeController`, `visitor-session.controller.ts`, `cli.module.ts`, `operator-guard-probe.ts`, `server-errors.spec.ts`, `startup-summary.service.spec.ts`, `database-entities.ts`, `server/package.json`, `Project`, `cli-runner.ts`, `body-limit.ts`, `encryption.service.spec.ts`, `log-level-warn.spec.ts`, `body-limit.spec.ts`, `OperationSteps`, `migrate.module.ts`, `config.module.ts`, `secrets-reencryption.service.ts`, `secrets-generate.command.ts`, `health.module.ts`, `DisabledOperators`, `operator-block-sync.e2e-spec.ts`, `server-errors.spec.ts`, `operators.service.ts`, `replica-events-transport.ts`, `DomainEventBus`, `zone-e2e-app.ts`, `secrets-reencryption.module.ts`, `operators.module.ts`, `Zone`, `api-keys.service.ts`, `tokens.service.ts`, `DisabledOperators`, `replica-events.e2e-spec.ts`, `test-database.ts`?**
  _High betweenness centrality (0.203) - this node is a cross-community bridge._
- **What connects `./${module}.module.js`, `../cli.module.js`, `./tsconfig.json` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.07301587301587302 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `typeorm`, `visitor-session-refresh.e2e-spec.ts`, `environment-checks.service.ts`, `dependencies`, `conversation.entity.spec.ts`, `database-connection.e2e-spec.ts`, `chat-tables.e2e-spec.ts`, `visitor.entity.spec.ts`, `identity-key.entity.ts`, `replica-cache-sync.e2e-spec.ts`, `conversation.entity.ts`, `operator-guard-probe.ts`, `project-cli.ts`, `database-entities.ts`, `server/package.json`, `Project`, `test-secrets.ts`, `identity-keys.e2e-spec.ts`, `participant.entity.spec.ts`, `key-cli.ts`, `OperationSteps`, `operator-block-sync.e2e-spec.ts`, `CreateChatTables1793215389271`, `Message`, `visitor-session.entity.spec.ts`, `@nestjs/common`, `operator-commands.e2e-spec.ts`, `secrets-reencrypt-command.e2e-spec.ts`, `migrate-mode.e2e-spec.ts`, `ConversationEvent`, `test-database.ts`, `ref_node_child_process`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `ProjectsService` connect `ProjectsService` to `identity-key-list.command.ts`, `@nestjs/common`, `.publish`, `api-keys.service.ts`, `replica-cache-sync.e2e-spec.ts`, `OperatorDisableCommand`, `cli.module.ts`, `projects.service.ts`, `initial-project.development.spec.ts`, `ProjectCreateCommand`, `origin.commands.ts`, `origin.commands.ts`, `Project`, `project-list.command.ts`, `startup-summary.service.spec.ts`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Should `visitor-session-refresh.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06246799795186892 - nodes in this community are weakly interconnected._