# Graph Report - hector-chat-epic-13  (2026-10-29)

## Corpus Check
- 375 files · ~91,347 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2657 nodes · 6164 edges · 151 communities (115 shown, 36 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 152 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `668ae156`
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
- server/package.json
- api-keys.service.ts
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
- visitor-session.entity.spec.ts
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- key-format.ts
- MixedZoneController
- writeLine
- visitor-session.controller.ts
- tsconfig.build.json
- zod-validation.spec.ts
- config.module.ts
- nest-cli.json
- api.module.ts
- redis-connection.e2e-spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- identity-key-commands.e2e-spec.ts
- log-redaction.spec.ts
- logger.module.ts
- Visitor
- operators.service.ts
- http-error.filter.spec.ts
- log-settings.e2e-spec.ts
- TokensService
- operator-auth.guard.ts
- protocol/src/index.ts
- typeorm
- ProjectCreateCommand
- Controller
- migrate-mode.e2e-spec.ts
- participant.entity.spec.ts
- test-secrets.ts
- IdentityKey
- visitors.module.ts
- migrate.module.ts
- operator-role.guard.spec.ts
- projects-service.e2e-spec.ts
- encryption.service.spec.ts
- OperationSteps
- server-key-guard.e2e-spec.ts
- config-startup.e2e-spec.ts
- .create
- server-protocol.e2e-spec.ts
- projects.service.ts
- @nestjs/common
- request-context.ts
- main.ts
- telemetry.interceptor.spec.ts
- conversation.entity.ts
- ProjectsService
- project-cli.ts
- health.module.ts
- operators.service.ts
- IdentityKeyAddCommand
- workspace-check-types.e2e-spec.ts
- conversation.entity.spec.ts
- api-keys-service-probe.ts
- CreateChatTables1793215389271
- audited-events.spec.ts
- secrets-reencrypt-command.e2e-spec.ts
- secrets-reencrypt.command.ts
- zone.guard.spec.ts
- Message
- encryption-keys.schema.spec.ts
- SecretsReencryptionService
- api-keys.service.ts
- visitor.entity.spec.ts
- cli.module.ts
- global-setup.ts
- cli-mode.e2e-spec.ts
- operator-guard-probe.ts
- audit-log.e2e-spec.ts
- TelemetryProbeController
- JsonObjectValidator
- status.service.ts
- identity-key-pem.ts
- Zone
- origin-cli.ts
- test-database.ts
- api-versioning.spec.ts
- ref_node_path
- metrics.controller.ts
- @nestjs/swagger
- InternalProbeController
- operators.module.ts
- .getByName
- Operator
- operator-token.controller.ts
- encrypted-secret.spec.ts
- packages-build.e2e-spec.ts
- log-redaction.e2e-spec.ts
- RedactionProbeController
- test-domain-events.ts
- origin.ts
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- ZonedController
- KeyListCommand
- TestTokenSigningConfigModule
- token-signing-keys.schema.ts
- RolesProbeController
- zod-validation.spec.ts
- BodyProbeController
- @aws-sdk/s3-request-presigner@^3.1151.0
- @nest-lab/throttler-storage-redis@^1.2.0
- @nestjs/microservices@^12.1.3
- domain-event-bus.ts
- cache-manager@^7.2.9
- @nestjs/cache-manager@^12.0.1
- @nestjs/throttler@^6.7.1
- pg
- pino-http
- vite@catalog:

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 137 edges
2. `typeorm` - 59 edges
3. `Zone()` - 52 edges
4. `Project` - 44 edges
5. `@nestjs/testing` - 38 edges
6. `ProjectsService` - 35 edges
7. `useTestDatabase()` - 35 edges
8. `createProject()` - 29 edges
9. `ApiKey` - 27 edges
10. `ApiKeysService` - 27 edges

## Surprising Connections (you probably didn't know these)
- `IssueOperatorTokenInput` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/domain/operators/operators.service.ts → packages/protocol/src/operator-role.ts
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts
- `AuditRecord` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-rule.ts → packages/protocol/src/json-types.ts
- `ConversationEvent` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation-event.entity.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (151 total, 36 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.07
Nodes (17): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createTypeOrmModule(), getTypeOrmModule(), createDataSourceOptions(), DatabaseConnection (+9 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.15
Nodes (11): get(), getAs(), hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService (+3 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "tokens.service.spec.ts"
Cohesion: 0.12
Nodes (31): TokenSigningKey, SignedToken, SignTokenInput, TokenAudience, tokenAudiences, VerifiedToken, encodePart(), flipSignatureBit() (+23 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.06
Nodes (25): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+17 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "server/package.json"
Cohesion: 0.09
Nodes (21): author, bin, sowa-chat, @aws-sdk/client-s3@^3.1151.0, file-type@^22.1.1, @nestjs/platform-socket.io@^12.1.3, sharp@^0.35.5, socket.io@^4.8.4 (+13 more)

### Community 10 - "api-keys.service.ts"
Cohesion: 0.08
Nodes (16): KeyCreateOptions, header, KeyListOptions, KeyRevokeCommand, ApiKeysService, ApiKeySummary, hashMatches(), IssueApiKeyBaseInput (+8 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.06
Nodes (31): dependencies, bullmq@^6.3.15, helmet@^8.3.0, jose@^6.2.12, nest-commander@^3.21.0, @nestjs/bullmq@^12.0.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1 (+23 more)

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
Nodes (19): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, internalErrorMessage, ApiExceptionInput, entries() (+11 more)

### Community 24 - "AuditLogEntry"
Cohesion: 0.15
Nodes (7): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.09
Nodes (14): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand (+6 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.17
Nodes (12): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, runToExit() (+4 more)

### Community 28 - "visitor-session.entity.spec.ts"
Cohesion: 0.11
Nodes (10): columns(), expectedColumns, findColumn(), findRelation(), normalizeSql(), relations(), runMigration(), AddProjectsOperatorAllowedOrigins1793300003000 (+2 more)

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+2 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.06
Nodes (36): ColumnRow, ForeignKeyRow, IndexRow, tableNames, IndexRow, PlanRow, countRows(), createChannel() (+28 more)

### Community 32 - "key-format.ts"
Cohesion: 0.12
Nodes (16): KeyGenerateCommand, KeyRevokeOptions, base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey() (+8 more)

### Community 33 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 34 - "writeLine"
Cohesion: 0.10
Nodes (14): emptyCell, formatDate(), serverKeyOnceWarning, writeLine(), writeTable(), writeWarning(), header, IdentityKeyListCommand (+6 more)

### Community 35 - "visitor-session.controller.ts"
Cohesion: 0.14
Nodes (14): toVisitorSessionResponse(), VisitorSessionController, VisitorSessionRefreshRequestDto, VisitorSessionRequestDto, VisitorSessionResponseDto, VisitorSessionTokens, refreshToken, requestCases (+6 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "config.module.ts"
Cohesion: 0.17
Nodes (16): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig (+8 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "api.module.ts"
Cohesion: 0.08
Nodes (32): configureApiApp(), ApiModule, HealthBody, HealthEntry, DependencyStatusBody, StatusBody, ApiHttpModule, findZonePorts() (+24 more)

### Community 41 - "redis-connection.e2e-spec.ts"
Cohesion: 0.13
Nodes (15): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, fetchStatus() (+7 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "zod-serialization.spec.ts"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 45 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.14
Nodes (25): KeysModule, WorkerModule, expectNoKeyRows(), expectNoRows(), addKey(), CliRunResult, runCliInProcess(), addEd25519Key() (+17 more)

### Community 46 - "log-redaction.spec.ts"
Cohesion: 0.07
Nodes (23): LogDestination, allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService() (+15 more)

### Community 47 - "logger.module.ts"
Cohesion: 0.21
Nodes (14): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+6 more)

### Community 48 - "Visitor"
Cohesion: 0.10
Nodes (3): Visitor, VisitorSession, VisitorsRepository

### Community 49 - "operators.service.ts"
Cohesion: 0.17
Nodes (9): OperatorTokenClaims, operatorTokenClaimsSchema, IssuedOperatorToken, IssueOperatorTokenInput, OperatorsService, operatorTokenTtlSeconds, input, Probe (+1 more)

### Community 50 - "http-error.filter.spec.ts"
Cohesion: 0.13
Nodes (13): OperatorDisabledFilter, OperatorDisabledError, errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter (+5 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+2 more)

### Community 52 - "TokensService"
Cohesion: 0.12
Nodes (3): OperatorAuthGuard, TokenConsumer, TokensService

### Community 53 - "operator-auth.guard.ts"
Cohesion: 0.13
Nodes (10): ServerKeyGuard, bearerToken(), FakeRequestInput, bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError() (+2 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.07
Nodes (23): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, defaultLimits, isAccepted() (+15 more)

### Community 55 - "typeorm"
Cohesion: 0.09
Nodes (13): database, loadDataSource(), databaseEntities, Channel, channelColumns(), findColumn(), Project, NewVisitorSession (+5 more)

### Community 57 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.11
Nodes (20): fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), BrokenMigration1700000000000 (+12 more)

### Community 59 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "IdentityKey"
Cohesion: 0.09
Nodes (6): IdentityKey, IdentityKeysRepository, IdentityKeyKidTakenError, IdentityKeysService, InvalidIdentityKeyIdError, toEvent()

### Community 62 - "visitors.module.ts"
Cohesion: 0.11
Nodes (4): VisitorApiModule, VisitorSessionsRepository, VisitorSessionsService, VisitorsModule

### Community 63 - "migrate.module.ts"
Cohesion: 0.20
Nodes (4): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps

### Community 64 - "operator-role.guard.spec.ts"
Cohesion: 0.13
Nodes (12): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey (+4 more)

### Community 65 - "projects-service.e2e-spec.ts"
Cohesion: 0.14
Nodes (17): IssueApiKeyInput, ProjectsModule, columns, createMain(), emptyLists, eventNames, listRow(), lists (+9 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.13
Nodes (14): CryptoModule, authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService, SecretDecryptionError (+6 more)

### Community 67 - "OperationSteps"
Cohesion: 0.09
Nodes (6): OperationStep, OperationSteps, OperationStepsProbeController, LogEntry, pause(), SlowProbeController

### Community 68 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.14
Nodes (10): OperatorTokenController, ServerApiModule, ServerController(), changeBodyChar(), forgeWithValidChecksum(), getProbe(), GuardProbeController, replaceChar() (+2 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - ".create"
Cohesion: 0.14
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "projects.service.ts"
Cohesion: 0.10
Nodes (20): IssuedApiKey, OriginList, originLists, NewProject, ORIGIN_COLUMNS, OriginsRow, ProjectsRepository, ChangeOriginInput (+12 more)

### Community 73 - "@nestjs/common"
Cohesion: 0.12
Nodes (14): ServerAuthModule, useClsMiddleware(), typeOrmModules, DatabaseStepSubscriber, echoRequestId(), resolveRequestId(), OperationTiming, OperationStepsModule (+6 more)

### Community 75 - "main.ts"
Cohesion: 0.15
Nodes (14): cliName, commanderArgv(), runCliCommand(), startupLogLevels, createContext(), mode, runApi(), runCli() (+6 more)

### Community 76 - "telemetry.interceptor.spec.ts"
Cohesion: 0.14
Nodes (7): operationSteps, StepTimes, FinishedOperation, SlowOperationsModule, roundSteps(), SlowOperations, TelemetryInterceptor

### Community 77 - "conversation.entity.ts"
Cohesion: 0.07
Nodes (21): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEvent, ConversationEventActorKind, conversationEventActorKinds (+13 more)

### Community 78 - "ProjectsService"
Cohesion: 0.15
Nodes (5): formatOrigins(), header, ProjectListCommand, toRow(), ProjectsService

### Community 79 - "project-cli.ts"
Cohesion: 0.17
Nodes (25): toLookupPrefix(), auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix(), listKeys() (+17 more)

### Community 80 - "health.module.ts"
Cohesion: 0.12
Nodes (6): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, toDependencyStatus(), @nestjs/terminus

### Community 81 - "operators.service.ts"
Cohesion: 0.17
Nodes (3): DisabledOperators, Probe, OperatorsRepository

### Community 82 - "IdentityKeyAddCommand"
Cohesion: 0.21
Nodes (3): IdentityKeyAddCommand, IdentityKeyAddOptions, readPem()

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 85 - "api-keys-service-probe.ts"
Cohesion: 0.24
Nodes (12): eventFields, keyTypeByKind, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred (+4 more)

### Community 87 - "audited-events.spec.ts"
Cohesion: 0.15
Nodes (13): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+5 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "secrets-reencrypt.command.ts"
Cohesion: 0.11
Nodes (21): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptOptions, toReencryptionRow(), toVersionRow(), encryptedFields (+13 more)

### Community 90 - "zone.guard.spec.ts"
Cohesion: 0.07
Nodes (29): probeControllers, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, probeControllers (+21 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 94 - "api-keys.service.ts"
Cohesion: 0.10
Nodes (8): ApiKey, ApiKeyKind, apiKeyKinds, ApiKeysRepository, NewApiKey, toSummary(), ColumnRow, expectedColumns

### Community 95 - "visitor.entity.spec.ts"
Cohesion: 0.32
Nodes (5): columns(), expectedColumns, findColumn(), findRelation(), relations()

### Community 96 - "cli.module.ts"
Cohesion: 0.19
Nodes (6): CliModule, AuditModule, AppClsModule, AppConfigModule, DatabaseModule, TelemetryModule

### Community 97 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "operator-guard-probe.ts"
Cohesion: 0.14
Nodes (11): OperatorController(), DisabledProbeController, issueOperator(), getProbe(), issueOperator(), withToken(), IssuedOperator, issueTestOperator() (+3 more)

### Community 100 - "audit-log.e2e-spec.ts"
Cohesion: 0.13
Nodes (12): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, auditedEventNames(), AuditRule, auditRules (+4 more)

### Community 102 - "JsonObjectValidator"
Cohesion: 0.28
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 103 - "status.service.ts"
Cohesion: 0.20
Nodes (5): readServerVersion(), StatusController, DependencyStatus, ServerStatus, StatusService

### Community 104 - "identity-key-pem.ts"
Cohesion: 0.16
Nodes (14): KeyActorKind, IdentityKeyAlgorithm, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey(), readPublicKeyObject() (+6 more)

### Community 105 - "Zone"
Cohesion: 0.15
Nodes (11): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+3 more)

### Community 106 - "origin-cli.ts"
Cohesion: 0.24
Nodes (11): badOrigins, helpEntries, prefixes, addOrigins(), OriginAction, OriginCommandOptions, originGroups, originsOf() (+3 more)

### Community 107 - "test-database.ts"
Cohesion: 0.09
Nodes (20): identityKeyAlgorithms, ColumnRow, expectedColumns, jwk, createProjectWithKey(), internalAgent(), postToken(), ColumnRow (+12 more)

### Community 108 - "api-versioning.spec.ts"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 109 - "ref_node_path"
Cohesion: 0.13
Nodes (10): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, databaseUrl(), IdentityRow, VersionRow, useTestRedis() (+2 more)

### Community 110 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 112 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 115 - "operators.module.ts"
Cohesion: 0.20
Nodes (4): OperatorAuthModule, OperatorsModule, TokensModule, createProjectRequest()

### Community 121 - ".getByName"
Cohesion: 0.11
Nodes (3): IdentityKeyRevokeCommand, KeyCreateCommand, ProjectNotFoundError

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.16
Nodes (10): nestjs-zod@^5.5.0, OperatorTokenRequestDto, OperatorTokenResponseDto, operatorRoles, OperatorTokenRequest, operatorTokenRequestSchema, OperatorTokenResponse, operatorTokenResponseSchema (+2 more)

### Community 124 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 125 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 126 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 128 - "test-domain-events.ts"
Cohesion: 0.29
Nodes (6): TestListener, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 129 - "origin.ts"
Cohesion: 0.42
Nodes (6): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl()

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 136 - "token-signing-keys.schema.ts"
Cohesion: 0.67
Nodes (5): parseEntry(), parseKeys(), parsePrivateKey(), reject(), tokenSigningKeysSchema

### Community 138 - "zod-validation.spec.ts"
Cohesion: 0.33
Nodes (4): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto

### Community 143 - "domain-event-bus.ts"
Cohesion: 0.60
Nodes (3): DomainEventHandler, DomainEventName, @nestjs/event-emitter

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 978 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **36 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `log-level-warn.spec.ts`, `tokens.service.spec.ts`, `server/package.json`, `api-keys.service.ts`, `zod-validation.spec.ts`, `dependencies`, `domain-event-bus.ts`, `http-error.filter.spec.ts`, `AuditLogEntry`, `origin.commands.ts`, `key-format.ts`, `writeLine`, `visitor-session.controller.ts`, `config.module.ts`, `api.module.ts`, `redis-connection.e2e-spec.ts`, `zod-serialization.spec.ts`, `identity-key-commands.e2e-spec.ts`, `log-redaction.spec.ts`, `logger.module.ts`, `operators.service.ts`, `http-error.filter.spec.ts`, `operator-auth.guard.ts`, `typeorm`, `visitors.module.ts`, `migrate.module.ts`, `operator-role.guard.spec.ts`, `encryption.service.spec.ts`, `OperationSteps`, `server-key-guard.e2e-spec.ts`, `projects.service.ts`, `request-context.ts`, `main.ts`, `telemetry.interceptor.spec.ts`, `ProjectsService`, `health.module.ts`, `operators.service.ts`, `IdentityKeyAddCommand`, `secrets-reencrypt.command.ts`, `zone.guard.spec.ts`, `api-keys.service.ts`, `cli.module.ts`, `operator-guard-probe.ts`, `audit-log.e2e-spec.ts`, `status.service.ts`, `identity-key-pem.ts`, `Zone`, `metrics.controller.ts`, `operators.module.ts`, `body-limit.spec.ts`, `operator-token.controller.ts`?**
  _High betweenness centrality (0.277) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06736353077816493 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `server/package.json`, `dependencies`, `visitor-session.entity.spec.ts`, `chat-tables.e2e-spec.ts`, `identity-key-commands.e2e-spec.ts`, `migrate-mode.e2e-spec.ts`, `participant.entity.spec.ts`, `test-secrets.ts`, `projects-service.e2e-spec.ts`, `@nestjs/common`, `conversation.entity.ts`, `project-cli.ts`, `conversation.entity.spec.ts`, `CreateChatTables1793215389271`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `api-keys.service.ts`, `visitor.entity.spec.ts`, `operator-guard-probe.ts`, `origin-cli.ts`, `test-database.ts`, `ref_node_path`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `ServerErrorsProbeController`, `ErrorProbeController`, `ZonedController`, `zod-validation.spec.ts`, `BodyProbeController`, `http-error.filter.spec.ts`, `MixedZoneController`, `visitor-session.controller.ts`, `zod-validation.spec.ts`, `api.module.ts`, `zod-serialization.spec.ts`, `http-error.filter.spec.ts`, `Controller`, `server-key-guard.e2e-spec.ts`, `health.module.ts`, `zone.guard.spec.ts`, `operator-guard-probe.ts`, `TelemetryProbeController`, `status.service.ts`, `api-versioning.spec.ts`, `metrics.controller.ts`, `InternalProbeController`, `body-limit.spec.ts`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Should `log-level-warn.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14855072463768115 - nodes in this community are weakly interconnected._