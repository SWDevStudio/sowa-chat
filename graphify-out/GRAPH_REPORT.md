# Graph Report - hector-chat-epic-13  (2026-10-29)

## Corpus Check
- 362 files · ~89,083 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2584 nodes · 5957 edges · 136 communities (106 shown, 30 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 145 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ee94bc13`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- operator-auth-guard.e2e-spec.ts
- env.schema.ts
- compilerOptions
- server/package.json
- TestEncryptionConfigModule
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
- server-key-guard.e2e-spec.ts
- MixedZoneController
- identity-key-list.command.ts
- worker.module.ts
- tsconfig.build.json
- zod-validation.spec.ts
- config.module.ts
- nest-cli.json
- api.module.ts
- ConversationEvent
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- identity-key-commands.e2e-spec.ts
- RedactionProbeController
- logger.module.ts
- Visitor
- key-cli.ts
- cli.module.ts
- log-settings.e2e-spec.ts
- redis-connection.e2e-spec.ts
- operator-auth.guard.ts
- protocol/src/index.ts
- typeorm
- ProjectCreateCommand
- Zone
- migrate-mode.e2e-spec.ts
- participant.entity.spec.ts
- test-secrets.ts
- identity-keys.service.ts
- request-id.spec.ts
- migrate.module.ts
- operator-role.guard.spec.ts
- projects-service.e2e-spec.ts
- encryption.service.spec.ts
- Controller
- ApiKeysService
- config-startup.e2e-spec.ts
- .create
- server-protocol.e2e-spec.ts
- projects.service.ts
- OperationSteps
- metrics.controller.ts
- cli-runner.ts
- telemetry.interceptor.spec.ts
- conversation.entity.ts
- api-app.ts
- project-cli.ts
- health.module.ts
- operators.service.ts
- IdentityKeysService
- workspace-check-types.e2e-spec.ts
- conversation.entity.spec.ts
- domain-event-bus.ts
- CreateChatTables1793215389271
- audited-events.spec.ts
- secrets-reencrypt-command.e2e-spec.ts
- secrets-reencrypt.command.ts
- zone.ts
- Message
- encryption-keys.schema.spec.ts
- SecretsReencryptionService
- api-keys.service.ts
- visitor.entity.spec.ts
- SlowProbeController
- global-setup.ts
- cli-mode.e2e-spec.ts
- operator-guard-probe.ts
- AuditLogRepository
- TelemetryProbeController
- JsonObjectValidator
- DomainEventBus
- Zone
- @nestjs/bullmq@^12.0.0
- test-database.ts
- encryption-keys.schema.ts
- ref_node_path
- projects-service.e2e-spec.ts
- @nestjs/swagger
- InternalProbeController
- reflect-metadata@^0.2.2
- domain-event-bus.spec.ts
- zod-serialization.spec.ts
- secrets-reencryption.service.ts
- operator-token.controller.ts
- packages-build.e2e-spec.ts
- server-errors.spec.ts
- database-connection.e2e-spec.ts
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- ProjectsService
- @aws-sdk/client-s3@^3.1151.0
- socket.io@^4.8.4
- @nestjs/throttler@^6.7.1

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 131 edges
2. `typeorm` - 59 edges
3. `Zone()` - 50 edges
4. `Project` - 43 edges
5. `@nestjs/testing` - 38 edges
6. `ProjectsService` - 35 edges
7. `useTestDatabase()` - 34 edges
8. `ApiKey` - 27 edges
9. `RequestContext` - 27 edges
10. `findFreePort()` - 27 edges

## Surprising Connections (you probably didn't know these)
- `OperatorProfile` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/domain/operators/operators.repository.ts → packages/protocol/src/operator-role.ts
- `RequestOperator` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/infra/request-context/request-context.ts → packages/protocol/src/operator-role.ts
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts
- `AuditRecord` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-rule.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (136 total, 30 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.08
Nodes (16): DatabaseMigration, databaseMigrations, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity, SecondEntity, CreateProjects1793193549883 (+8 more)

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
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.07
Nodes (40): parseEntry(), parseKeys(), parsePrivateKey(), reject(), TokenSigningKey, tokenSigningKeysSchema, SignedToken, SignTokenInput (+32 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.06
Nodes (25): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+17 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "server/package.json"
Cohesion: 0.08
Nodes (25): author, bin, sowa-chat, @aws-sdk/s3-request-presigner@^3.1151.0, bullmq@^6.3.15, cache-manager@^7.2.9, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/cache-manager@^12.0.1 (+17 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, file-type@^22.1.1, helmet@^8.3.0, jose@^6.2.12, nest-commander@^3.21.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1 (+26 more)

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
Cohesion: 0.08
Nodes (25): OperatorDisabledFilter, ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, errorCodeOfStatus(), httpErrorResponse() (+17 more)

### Community 23 - "RequestContext"
Cohesion: 0.06
Nodes (7): RequestContextModule, RequestContext, RequestOperator, RequestVisitor, ConsumerModule, ContextConsumer, GuardProbeController

### Community 24 - "AuditLogEntry"
Cohesion: 0.15
Nodes (7): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.11
Nodes (7): listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand, OriginListCommand, OriginRemoveCommand

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - "visitor-session.entity.spec.ts"
Cohesion: 0.15
Nodes (9): columns(), expectedColumns, findColumn(), findRelation(), normalizeSql(), relations(), runMigration(), CreateOperators1793300003000 (+1 more)

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.07
Nodes (28): ColumnRow, ForeignKeyRow, IndexRow, tableNames, IndexRow, PlanRow, countRows(), createChannel() (+20 more)

### Community 32 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.12
Nodes (19): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+11 more)

### Community 33 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 34 - "identity-key-list.command.ts"
Cohesion: 0.07
Nodes (15): emptyCell, formatDate(), writeTable(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow(), header (+7 more)

### Community 35 - "worker.module.ts"
Cohesion: 0.22
Nodes (7): eventValues, happened, personalValues, AuditModule, auditRules, auditedEvents, testAuditRules

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "config.module.ts"
Cohesion: 0.23
Nodes (16): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig (+8 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "api.module.ts"
Cohesion: 0.07
Nodes (31): ApiModule, DependencyStatusBody, StatusBody, LogDestination, findZonePorts(), probeControllers, startListening(), stopListening() (+23 more)

### Community 41 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.17
Nodes (23): WorkerModule, expectNoKeyRows(), expectNoRows(), addKey(), runCliInProcess(), addEd25519Key(), addIdentityKey(), addP256Key() (+15 more)

### Community 46 - "RedactionProbeController"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 47 - "logger.module.ts"
Cohesion: 0.20
Nodes (15): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+7 more)

### Community 49 - "key-cli.ts"
Cohesion: 0.28
Nodes (17): toLookupPrefix(), hashKey(), auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix() (+9 more)

### Community 50 - "cli.module.ts"
Cohesion: 0.11
Nodes (14): serverKeyOnceWarning, writeLine(), writeWarning(), IdentityKeyAddOptions, readPem(), IdentityKeyRevokeOptions, KeyCreateCommand, KeyCreateOptions (+6 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "redis-connection.e2e-spec.ts"
Cohesion: 0.13
Nodes (14): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, fetchStatus() (+6 more)

### Community 53 - "operator-auth.guard.ts"
Cohesion: 0.13
Nodes (6): OperatorAuthGuard, ServerKeyGuard, OperatorTokenClaims, operatorTokenClaimsSchema, bearerToken(), FakeRequestInput

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.07
Nodes (23): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, defaultLimits, isAccepted() (+15 more)

### Community 55 - "typeorm"
Cohesion: 0.10
Nodes (8): database, loadDataSource(), databaseEntities, Channel, channelColumns(), findColumn(), identityKeyAlgorithms, Project

### Community 57 - "Zone"
Cohesion: 0.07
Nodes (18): OperatorTokenController, ServerApiModule, ServerController(), NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController, BodyProbeController (+10 more)

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 59 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "identity-keys.service.ts"
Cohesion: 0.07
Nodes (19): KeyActorKind, IdentityKey, IdentityKeyAlgorithm, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey() (+11 more)

### Community 62 - "request-id.spec.ts"
Cohesion: 0.15
Nodes (10): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+2 more)

### Community 63 - "migrate.module.ts"
Cohesion: 0.15
Nodes (6): AppConfigModule, DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 64 - "operator-role.guard.spec.ts"
Cohesion: 0.13
Nodes (9): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey (+1 more)

### Community 65 - "projects-service.e2e-spec.ts"
Cohesion: 0.14
Nodes (12): KeysModule, ProjectsModule, columns, createMain(), emptyLists, eventNames, listRow(), lists (+4 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.10
Nodes (20): CryptoModule, authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv (+12 more)

### Community 67 - "Controller"
Cohesion: 0.16
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 68 - "ApiKeysService"
Cohesion: 0.13
Nodes (5): ApiKeysService, toEvent(), AuditScenarios, happenedIn(), ScenarioError

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - ".create"
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.31
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "projects.service.ts"
Cohesion: 0.10
Nodes (24): addOriginTo(), describeAdd(), describeRemove(), OriginOptions, ProjectOptions, removeOriginFrom(), ALLOWED_PROTOCOLS, InvalidOriginError (+16 more)

### Community 73 - "OperationSteps"
Cohesion: 0.07
Nodes (16): ServerAuthModule, AppClsModule, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, DatabaseStepSubscriber, OperationStep (+8 more)

### Community 74 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 75 - "cli-runner.ts"
Cohesion: 0.38
Nodes (5): cliName, commanderArgv(), runCliCommand(), startupLogLevels, runCli()

### Community 76 - "telemetry.interceptor.spec.ts"
Cohesion: 0.09
Nodes (15): HttpLabel, HttpMetrics, HttpRequestRecord, labelNames, operationSteps, StepTimes, FinishedOperation, SlowOperationsModule (+7 more)

### Community 77 - "conversation.entity.ts"
Cohesion: 0.10
Nodes (16): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+8 more)

### Community 78 - "api-app.ts"
Cohesion: 0.10
Nodes (22): configureApiApp(), useClsMiddleware(), setupApiDocs(), ApiHttpModule, bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException() (+14 more)

### Community 79 - "project-cli.ts"
Cohesion: 0.12
Nodes (22): badOrigins, helpEntries, prefixes, CliRunResult, addOrigins(), OriginAction, OriginCommandOptions, originGroups (+14 more)

### Community 80 - "health.module.ts"
Cohesion: 0.08
Nodes (12): @nestjs/terminus@^12.1.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+4 more)

### Community 81 - "operators.service.ts"
Cohesion: 0.10
Nodes (7): OperatorAuthModule, DisabledOperators, Probe, OperatorsModule, OperatorProfile, OperatorsRepository, TokensModule

### Community 82 - "IdentityKeysService"
Cohesion: 0.11
Nodes (3): IdentityKeyAddCommand, IdentityKeyRevokeCommand, IdentityKeysService

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 85 - "domain-event-bus.ts"
Cohesion: 0.57
Nodes (4): DomainEventHandler, DomainEventName, DomainEvents, @nestjs/event-emitter

### Community 87 - "audited-events.spec.ts"
Cohesion: 0.13
Nodes (12): botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent, ApiKeyEvent (+4 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "secrets-reencrypt.command.ts"
Cohesion: 0.19
Nodes (9): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+1 more)

### Community 90 - "zone.ts"
Cohesion: 0.11
Nodes (18): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), zonePathPrefixes, ApiZone (+10 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.29
Nodes (7): describeErrors(), key1, key1Bytes, key2, key2Bytes, parseKeys(), requiredEnv

### Community 94 - "api-keys.service.ts"
Cohesion: 0.08
Nodes (23): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey, ApiKeySummary, hashMatches(), eventFields, IssueApiKeyBaseInput (+15 more)

### Community 95 - "visitor.entity.spec.ts"
Cohesion: 0.32
Nodes (5): columns(), expectedColumns, findColumn(), findRelation(), relations()

### Community 97 - "global-setup.ts"
Cohesion: 0.24
Nodes (9): testcontainers@^12.2.1, @testcontainers/postgresql@^12.2.1, runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl(), testcontainers (+1 more)

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "operator-guard-probe.ts"
Cohesion: 0.07
Nodes (26): OperatorController(), Operator, IssuedOperatorToken, IssueOperatorTokenInput, OperatorDisabledError, OperatorsService, operatorTokenTtlSeconds, input (+18 more)

### Community 100 - "AuditLogRepository"
Cohesion: 0.16
Nodes (4): AuditLogListener, AuditLogRepository, auditedEventNames(), AuditRule

### Community 102 - "JsonObjectValidator"
Cohesion: 0.30
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 105 - "Zone"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 107 - "test-database.ts"
Cohesion: 0.09
Nodes (24): apiKeyKinds, ColumnRow, expectedColumns, ColumnRow, expectedColumns, jwk, createProjectWithKey(), internalAgent() (+16 more)

### Community 108 - "encryption-keys.schema.ts"
Cohesion: 0.60
Nodes (5): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject()

### Community 109 - "ref_node_path"
Cohesion: 0.11
Nodes (12): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, databaseUrl(), IdentityRow (+4 more)

### Community 110 - "projects-service.e2e-spec.ts"
Cohesion: 0.14
Nodes (14): IssueApiKeyInput, IssuedApiKey, InvalidProjectNameError, ProjectAlreadyExistsError, ProjectNotFoundError, apiKeyRows(), auditRows(), expectNoRows() (+6 more)

### Community 112 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 120 - "domain-event-bus.spec.ts"
Cohesion: 0.29
Nodes (7): happened, TestListener, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 121 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 122 - "secrets-reencryption.service.ts"
Cohesion: 0.14
Nodes (13): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldReencryption, FieldResult, FieldVersionCount, ReencryptInput (+5 more)

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.17
Nodes (9): OperatorTokenRequestDto, OperatorTokenResponseDto, operatorRoles, OperatorTokenRequest, operatorTokenRequestSchema, OperatorTokenResponse, operatorTokenResponseSchema, validRequest (+1 more)

### Community 125 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 127 - "server-errors.spec.ts"
Cohesion: 0.32
Nodes (6): ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, stringsInside()

### Community 128 - "database-connection.e2e-spec.ts"
Cohesion: 0.14
Nodes (14): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), isRequestEntry(), isResponding() (+6 more)

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 954 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `Zone` to `log-level-warn.spec.ts`, `operator-auth-guard.e2e-spec.ts`, `server/package.json`, `dependencies`, `http-error.filter.spec.ts`, `RequestContext`, `AuditLogEntry`, `server-key-guard.e2e-spec.ts`, `identity-key-list.command.ts`, `worker.module.ts`, `config.module.ts`, `api.module.ts`, `RedactionProbeController`, `logger.module.ts`, `cli.module.ts`, `redis-connection.e2e-spec.ts`, `operator-auth.guard.ts`, `typeorm`, `identity-keys.service.ts`, `request-id.spec.ts`, `migrate.module.ts`, `operator-role.guard.spec.ts`, `projects-service.e2e-spec.ts`, `encryption.service.spec.ts`, `Controller`, `projects.service.ts`, `OperationSteps`, `metrics.controller.ts`, `cli-runner.ts`, `telemetry.interceptor.spec.ts`, `api-app.ts`, `health.module.ts`, `operators.service.ts`, `domain-event-bus.ts`, `secrets-reencrypt.command.ts`, `zone.ts`, `api-keys.service.ts`, `operator-guard-probe.ts`, `Zone`, `test-database.ts`, `domain-event-bus.spec.ts`, `zod-serialization.spec.ts`, `secrets-reencryption.service.ts`, `operator-token.controller.ts`, `server-errors.spec.ts`?**
  _High betweenness centrality (0.278) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07676767676767676 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `database-migrations.ts` to `database-connection.e2e-spec.ts`, `server/package.json`, `dependencies`, `visitor-session.entity.spec.ts`, `chat-tables.e2e-spec.ts`, `ConversationEvent`, `identity-key-commands.e2e-spec.ts`, `key-cli.ts`, `typeorm`, `migrate-mode.e2e-spec.ts`, `participant.entity.spec.ts`, `test-secrets.ts`, `OperationSteps`, `conversation.entity.ts`, `project-cli.ts`, `operators.service.ts`, `conversation.entity.spec.ts`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `api-keys.service.ts`, `visitor.entity.spec.ts`, `operator-guard-probe.ts`, `test-database.ts`, `ref_node_path`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `api.module.ts` to `database-connection.e2e-spec.ts`, `devDependencies`, `operator-auth-guard.e2e-spec.ts`, `server/package.json`, `RequestContext`, `AuditLogEntry`, `server-key-guard.e2e-spec.ts`, `worker.module.ts`, `config.module.ts`, `identity-key-commands.e2e-spec.ts`, `logger.module.ts`, `key-cli.ts`, `redis-connection.e2e-spec.ts`, `typeorm`, `test-secrets.ts`, `projects-service.e2e-spec.ts`, `encryption.service.spec.ts`, `OperationSteps`, `api-app.ts`, `operators.service.ts`, `api-keys.service.ts`, `operator-guard-probe.ts`, `test-database.ts`, `projects-service.e2e-spec.ts`, `domain-event-bus.spec.ts`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._