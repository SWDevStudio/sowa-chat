# Graph Report - hector-chat-epic-13  (2026-10-29)

## Corpus Check
- 380 files · ~92,579 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2683 nodes · 6273 edges · 161 communities (122 shown, 39 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 159 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c6751291`
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
- ProjectsService
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
- api-exception.ts
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
- identity-key-list.command.ts
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
- @nestjs-cls/transactional
- operators.service.ts
- http-error.filter.spec.ts
- log-settings.e2e-spec.ts
- .canActivate
- api-app.ts
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
- @nestjs/testing
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
- findFreePort
- cli.module.ts
- global-setup.ts
- cli-mode.e2e-spec.ts
- operator-guard-probe.ts
- audit-log.e2e-spec.ts
- TelemetryProbeController
- JsonObjectValidator
- operator-auth.guard.ts
- identity-key-pem.ts
- Zone
- origin-cli.ts
- test-database.ts
- api-versioning.spec.ts
- ref_node_path
- metrics.controller.ts
- project-cli.ts
- InternalProbeController
- @nestjs/common
- identity-keys.service.ts
- IdentityKeyRevokeCommand
- visitor-session.e2e-spec.ts
- operator-token.controller.ts
- zone-e2e-app.ts
- log-redaction.spec.ts
- log-redaction.e2e-spec.ts
- RedactionProbeController
- domain-event-bus.ts
- identity-keys.e2e-spec.ts
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- ZonedController
- visitor-auth-guard.e2e-spec.ts
- TestTokenSigningConfigModule
- token-signing-keys.schema.ts
- RolesProbeController
- ZoneProbeApp
- BodyProbeController
- @aws-sdk/s3-request-presigner@^3.1151.0
- @nest-lab/throttler-storage-redis@^1.2.0
- slow-operations.spec.ts
- server-errors.spec.ts
- cache-manager@^7.2.9
- @nestjs/cache-manager@^12.0.1
- @nestjs/throttler@^6.7.1
- zod-serialization.spec.ts
- ZoneServers
- errors.spec.ts
- secrets-reencryption.module.ts
- ServerKeyGuard
- RedisModule
- TokenConsumer
- KeyGenerateCommand
- TestEncryptionConfigModule
- @aws-sdk/client-s3@^3.1151.0
- @nestjs/platform-socket.io@^12.1.3
- @sowa-chat/protocol@workspace:*
- zod@catalog:
- testcontainers

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 141 edges
2. `typeorm` - 59 edges
3. `Zone()` - 54 edges
4. `Project` - 44 edges
5. `@nestjs/testing` - 38 edges
6. `useTestDatabase()` - 36 edges
7. `ProjectsService` - 35 edges
8. `RequestContext` - 31 edges
9. `createProject()` - 31 edges
10. `OperationSteps` - 29 edges

## Surprising Connections (you probably didn't know these)
- `RequestOperator` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/infra/request-context/request-context.ts → packages/protocol/src/operator-role.ts
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

## Communities (161 total, 39 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.06
Nodes (17): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity (+9 more)

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
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "tokens.service.spec.ts"
Cohesion: 0.12
Nodes (31): TokenSigningKey, SignedToken, SignTokenInput, TokenAudience, tokenAudiences, TokensService, VerifiedToken, encodePart() (+23 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.06
Nodes (25): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+17 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "server/package.json"
Cohesion: 0.10
Nodes (19): author, bin, sowa-chat, @nestjs/bullmq@^12.0.0, @nestjs/microservices@^12.1.3, @nestjs/websockets@^12.1.3, pino-http@^11.0.0, reflect-metadata@^0.2.2 (+11 more)

### Community 10 - "ProjectsService"
Cohesion: 0.14
Nodes (3): ApiKeysService, toEvent(), ProjectsService

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (30): dependencies, bullmq@^6.3.15, file-type@^22.1.1, helmet@^8.3.0, jose@^6.2.12, nest-commander@^3.21.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1 (+22 more)

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

### Community 22 - "api-exception.ts"
Cohesion: 0.19
Nodes (12): OperatorDisabledFilter, ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, errorCodeOfStatus(), httpErrorResponse() (+4 more)

### Community 23 - "RequestContext"
Cohesion: 0.11
Nodes (5): VisitorController(), RequestContext, GuardProbeController, VisitorGuardProbeController, visitorProbePath

### Community 24 - "AuditLogEntry"
Cohesion: 0.10
Nodes (12): ActorKind, actorKinds, AuditLogEntry, AuditLogListener, AuditLogRepository, NewAuditLogEntry, auditedEventNames(), AuditRecord (+4 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.08
Nodes (14): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand (+6 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.16
Nodes (12): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, waitForHttpStatus() (+4 more)

### Community 28 - "visitor-session.entity.spec.ts"
Cohesion: 0.09
Nodes (10): columns(), expectedColumns, findColumn(), findRelation(), normalizeSql(), relations(), runMigration(), VisitorSession (+2 more)

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+2 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.04
Nodes (38): Channel, Message, ColumnRow, ForeignKeyRow, IndexRow, tableNames, IndexRow, PlanRow (+30 more)

### Community 32 - "key-format.ts"
Cohesion: 0.15
Nodes (14): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+6 more)

### Community 33 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 34 - "identity-key-list.command.ts"
Cohesion: 0.14
Nodes (10): formatDate(), writeTable(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow(), header, KeyListCommand (+2 more)

### Community 35 - "visitor-session.controller.ts"
Cohesion: 0.12
Nodes (14): toVisitorSessionResponse(), VisitorSessionController, VisitorSessionRefreshRequestDto, VisitorSessionRequestDto, VisitorSessionResponseDto, VisitorSessionTokens, refreshToken, requestCases (+6 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "config.module.ts"
Cohesion: 0.18
Nodes (16): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig (+8 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "api.module.ts"
Cohesion: 0.12
Nodes (18): @nestjs/platform-express@^12.0.1, HealthBody, HealthEntry, DependencyStatusBody, StatusBody, probeControllers, offlineDataSource, withOfflineDatabase() (+10 more)

### Community 41 - "redis-connection.e2e-spec.ts"
Cohesion: 0.28
Nodes (7): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), ioredis

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.25
Nodes (16): runCliInProcess(), addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem(), identityKeyListHeader, listIdentityKeys(), PemWriter (+8 more)

### Community 46 - "log-redaction.spec.ts"
Cohesion: 0.13
Nodes (13): LogDestination, createRedactionProbeApp(), createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry (+5 more)

### Community 47 - "logger.module.ts"
Cohesion: 0.20
Nodes (15): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+7 more)

### Community 48 - "@nestjs-cls/transactional"
Cohesion: 0.14
Nodes (6): VisitorApiModule, ProjectsModule, NewVisitorSession, VisitorsModule, VisitorsRepository, @nestjs-cls/transactional

### Community 49 - "operators.service.ts"
Cohesion: 0.10
Nodes (11): Operator, OperatorProfile, IssuedOperatorToken, IssueOperatorTokenInput, OperatorDisabledError, OperatorsService, operatorTokenTtlSeconds, input (+3 more)

### Community 50 - "http-error.filter.spec.ts"
Cohesion: 0.14
Nodes (10): useClsMiddleware(), HttpErrorFilter, responseZodErrorOf(), knownKeys, ProbeBodyDto, echoRequestId(), requestIdHeader, requestIdOfResponse() (+2 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 53 - "api-app.ts"
Cohesion: 0.29
Nodes (7): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders()

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.06
Nodes (28): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, defaultLimits, isAccepted() (+20 more)

### Community 55 - "typeorm"
Cohesion: 0.09
Nodes (15): database, loadDataSource(), databaseEntities, channelColumns(), findColumn(), Project, columns(), expectedColumns (+7 more)

### Community 57 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.23
Nodes (9): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, withClient() (+1 more)

### Community 59 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "IdentityKey"
Cohesion: 0.08
Nodes (6): IdentityKey, IdentityKeysRepository, IdentityKeyKidTakenError, IdentityKeysService, InvalidIdentityKeyIdError, toEvent()

### Community 62 - "visitors.module.ts"
Cohesion: 0.14
Nodes (5): hashKey(), generateRefreshToken(), VisitorSessionsRepository, visitorAccessTokenTtlSeconds, VisitorSessionsService

### Community 63 - "migrate.module.ts"
Cohesion: 0.20
Nodes (4): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps

### Community 64 - "operator-role.guard.spec.ts"
Cohesion: 0.13
Nodes (10): @nestjs/core@^12.0.1, OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly() (+2 more)

### Community 65 - "projects-service.e2e-spec.ts"
Cohesion: 0.15
Nodes (17): CreateProjectInput, columns, createMain(), emptyLists, eventNames, listRow(), lists, originAuditRows() (+9 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.11
Nodes (19): authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv, tag (+11 more)

### Community 67 - "OperationSteps"
Cohesion: 0.13
Nodes (4): DatabaseStepSubscriber, OperationStep, OperationSteps, OperationStepsProbeController

### Community 68 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.33
Nodes (6): changeBodyChar(), forgeWithValidChecksum(), getProbe(), replaceChar(), withKey(), zoneAgent()

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - ".create"
Cohesion: 0.14
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.31
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "projects.service.ts"
Cohesion: 0.08
Nodes (26): IssuedApiKey, ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), OriginList, originLists, normalizeOrigin(), normalizeOrigins() (+18 more)

### Community 73 - "@nestjs/testing"
Cohesion: 0.31
Nodes (6): OperationTiming, beginOperation(), operationTimingKey, nestjs-cls, @nestjs/testing, @nestjs/typeorm

### Community 74 - "request-context.ts"
Cohesion: 0.18
Nodes (3): RequestContextModule, ConsumerModule, ContextConsumer

### Community 75 - "main.ts"
Cohesion: 0.11
Nodes (16): ApiModule, cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, createContext(), mode (+8 more)

### Community 76 - "telemetry.interceptor.spec.ts"
Cohesion: 0.08
Nodes (14): HttpLabel, HttpMetrics, HttpRequestRecord, labelNames, operationSteps, StepTimes, FinishedOperation, SlowOperationsModule (+6 more)

### Community 77 - "conversation.entity.ts"
Cohesion: 0.07
Nodes (21): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEvent, ConversationEventActorKind, conversationEventActorKinds (+13 more)

### Community 78 - "ProjectsService"
Cohesion: 0.22
Nodes (4): formatOrigins(), header, ProjectListCommand, toRow()

### Community 79 - "project-cli.ts"
Cohesion: 0.32
Nodes (15): toLookupPrefix(), auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix(), listKeys() (+7 more)

### Community 80 - "health.module.ts"
Cohesion: 0.08
Nodes (12): @nestjs/terminus@^12.1.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+4 more)

### Community 81 - "operators.service.ts"
Cohesion: 0.14
Nodes (3): DisabledOperators, Probe, OperatorsRepository

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 85 - "api-keys-service-probe.ts"
Cohesion: 0.26
Nodes (11): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+3 more)

### Community 87 - "audited-events.spec.ts"
Cohesion: 0.13
Nodes (12): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+4 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "secrets-reencrypt.command.ts"
Cohesion: 0.10
Nodes (20): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+12 more)

### Community 90 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (19): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, probeControllers, ApiZone (+11 more)

### Community 91 - "Message"
Cohesion: 0.27
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 94 - "api-keys.service.ts"
Cohesion: 0.08
Nodes (12): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey, ApiKeySummary, hashMatches(), IssueApiKeyBaseInput, IssueApiKeyInput (+4 more)

### Community 95 - "findFreePort"
Cohesion: 0.14
Nodes (16): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), serverEnvironment() (+8 more)

### Community 96 - "cli.module.ts"
Cohesion: 0.12
Nodes (12): emptyCell, serverKeyOnceWarning, writeLine(), writeWarning(), IdentityKeyAddOptions, IdentityKeyRevokeOptions, KeyCreateCommand, KeyCreateOptions (+4 more)

### Community 97 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "operator-guard-probe.ts"
Cohesion: 0.14
Nodes (14): OperatorController(), DisabledProbeController, issueOperator(), getProbe(), issueOperator(), withToken(), get(), getAs() (+6 more)

### Community 100 - "audit-log.e2e-spec.ts"
Cohesion: 0.15
Nodes (9): eventValues, happened, personalValues, auditRules, DomainEventBus, testAuditRules, DomainEvents, ../../src/telemetry/events/domain-events.js (+1 more)

### Community 102 - "JsonObjectValidator"
Cohesion: 0.28
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 103 - "operator-auth.guard.ts"
Cohesion: 0.19
Nodes (8): OperatorTokenClaims, operatorTokenClaimsSchema, VisitorTokenClaims, visitorTokenClaimsSchema, bearerToken(), FakeRequestInput, RequestOperator, RequestVisitor

### Community 104 - "identity-key-pem.ts"
Cohesion: 0.27
Nodes (7): algorithmOf(), InvalidIdentityKeyError, isP256(), parseIdentityPublicKey(), readPublicKeyObject(), captureError(), expectInvalidKey()

### Community 105 - "Zone"
Cohesion: 0.15
Nodes (11): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+3 more)

### Community 106 - "origin-cli.ts"
Cohesion: 0.32
Nodes (10): badOrigins, addOrigins(), OriginAction, OriginCommandOptions, originGroups, originsOf(), otherGroupOf(), runOriginCommand() (+2 more)

### Community 107 - "test-database.ts"
Cohesion: 0.13
Nodes (14): apiKeyKinds, identityKeyAlgorithms, ColumnRow, expectedColumns, ColumnRow, expectedColumns, jwk, createProjectRequest() (+6 more)

### Community 108 - "api-versioning.spec.ts"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 109 - "ref_node_path"
Cohesion: 0.09
Nodes (17): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, builtFiles, CommandResult, entriesByPackage, plannedBuildTasks() (+9 more)

### Community 110 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 111 - "project-cli.ts"
Cohesion: 0.20
Nodes (11): helpEntries, prefixes, CliRunResult, buildServer(), fullOriginArguments, listHeader, onceWarning, repositoryRoot (+3 more)

### Community 112 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 115 - "@nestjs/common"
Cohesion: 0.09
Nodes (16): OperatorAuthModule, ServerApiModule, ServerAuthModule, AuditModule, OperatorsModule, AppClsModule, AppConfigModule, createTypeOrmModule() (+8 more)

### Community 120 - "identity-keys.service.ts"
Cohesion: 0.22
Nodes (9): KeyActorKind, IdentityKeyAlgorithm, ParsedIdentityKey, NewIdentityKey, AddedIdentityKey, AddIdentityKeyInput, RevokeIdentityKeyInput, KeysModule (+1 more)

### Community 122 - "visitor-session.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): replaceLastChar(), rowsContainText(), sha256(), textForms(), createProjectWithPublicKey(), postPublic(), postSession()

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.16
Nodes (7): nestjs-zod@^5.5.0, OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, ServerController(), OperatorTokenResponse, nestjs-zod

### Community 124 - "zone-e2e-app.ts"
Cohesion: 0.27
Nodes (7): configureApiApp(), createProjectWithKey(), internalAgent(), postToken(), findZonePorts(), startZoneE2eApp(), stubZonePorts()

### Community 125 - "log-redaction.spec.ts"
Cohesion: 0.22
Nodes (9): allOutput(), CapturedLogs, fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields, secretValueOf() (+1 more)

### Community 126 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 128 - "domain-event-bus.ts"
Cohesion: 0.20
Nodes (9): happened, TestListener, DomainEventHandler, DomainEventName, DomainEvents, OnDomainEvent(), TelemetryModule, TestIgnoredEvent (+1 more)

### Community 129 - "identity-keys.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): WorkerModule, expectNoKeyRows(), expectNoRows(), addKey(), auditRows(), auditRowsByAction(), identityKeyRows()

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 134 - "visitor-auth-guard.e2e-spec.ts"
Cohesion: 0.22
Nodes (5): VisitorAuthModule, forgeToken(), getProbe(), IssuedVisitor, withToken()

### Community 136 - "token-signing-keys.schema.ts"
Cohesion: 0.67
Nodes (5): parseEntry(), parseKeys(), parsePrivateKey(), reject(), tokenSigningKeysSchema

### Community 138 - "ZoneProbeApp"
Cohesion: 0.09
Nodes (7): probeControllers, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ProbeController, ZoneProbeApp

### Community 142 - "slow-operations.spec.ts"
Cohesion: 0.24
Nodes (3): LogEntry, pause(), SlowProbeController

### Community 143 - "server-errors.spec.ts"
Cohesion: 0.28
Nodes (7): internalErrorMessage, ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, stringsInside()

### Community 147 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 148 - "ZoneServers"
Cohesion: 0.22
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 149 - "errors.spec.ts"
Cohesion: 0.28
Nodes (6): errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody

### Community 150 - "secrets-reencryption.module.ts"
Cohesion: 0.32
Nodes (3): CryptoModule, registeredEncryptedFields, SecretsReencryptionModule

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 984 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `domain-event-bus.ts`, `log-level-warn.spec.ts`, `tokens.service.spec.ts`, `server/package.json`, `ZoneProbeApp`, `dependencies`, `slow-operations.spec.ts`, `server-errors.spec.ts`, `zod-serialization.spec.ts`, `api-exception.ts`, `RequestContext`, `AuditLogEntry`, `secrets-reencryption.module.ts`, `origin.commands.ts`, `identity-key-list.command.ts`, `visitor-session.controller.ts`, `config.module.ts`, `api.module.ts`, `redis-connection.e2e-spec.ts`, `log-redaction.spec.ts`, `logger.module.ts`, `@nestjs-cls/transactional`, `operators.service.ts`, `http-error.filter.spec.ts`, `api-app.ts`, `typeorm`, `visitors.module.ts`, `migrate.module.ts`, `operator-role.guard.spec.ts`, `encryption.service.spec.ts`, `server-key-guard.e2e-spec.ts`, `projects.service.ts`, `@nestjs/testing`, `request-context.ts`, `main.ts`, `telemetry.interceptor.spec.ts`, `ProjectsService`, `health.module.ts`, `operators.service.ts`, `secrets-reencrypt.command.ts`, `zone.guard.spec.ts`, `api-keys.service.ts`, `cli.module.ts`, `operator-guard-probe.ts`, `audit-log.e2e-spec.ts`, `operator-auth.guard.ts`, `Zone`, `metrics.controller.ts`, `identity-keys.service.ts`, `operator-token.controller.ts`, `zone-e2e-app.ts`, `log-redaction.spec.ts`?**
  _High betweenness centrality (0.257) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06464646464646465 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `identity-keys.e2e-spec.ts`, `server/package.json`, `dependencies`, `visitor-session.entity.spec.ts`, `chat-tables.e2e-spec.ts`, `migrate-mode.e2e-spec.ts`, `participant.entity.spec.ts`, `test-secrets.ts`, `projects-service.e2e-spec.ts`, `@nestjs/testing`, `conversation.entity.ts`, `project-cli.ts`, `operators.service.ts`, `conversation.entity.spec.ts`, `CreateChatTables1793215389271`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `findFreePort`, `operator-guard-probe.ts`, `origin-cli.ts`, `test-database.ts`, `ref_node_path`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Visitor` connect `typeorm` to `visitor-auth-guard.e2e-spec.ts`, `conversation.entity.ts`, `@nestjs-cls/transactional`, `conversation.entity.spec.ts`, `visitor-session.e2e-spec.ts`, `visitor-session.entity.spec.ts`, `visitors.module.ts`, `chat-tables.e2e-spec.ts`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._