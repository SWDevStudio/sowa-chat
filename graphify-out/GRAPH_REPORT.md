# Graph Report - hector-chat-epic-10  (2026-10-29)

## Corpus Check
- 356 files · ~86,494 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2544 nodes · 5870 edges · 142 communities (112 shown, 30 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 145 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a702c4ab`
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
- database-migrations.spec.ts
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
- cli.module.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- server-key-guard.e2e-spec.ts
- zone.guard.spec.ts
- ConversationEvent
- database.module.ts
- tsconfig.build.json
- ValidationProbeController
- config.module.ts
- nest-cli.json
- zone-probe.ts
- conversation.entity.spec.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- test-database.ts
- log-redaction.spec.ts
- main.ts
- Visitor
- key-cli.ts
- @nestjs/common
- database-connection.e2e-spec.ts
- projects.service.ts
- operator-auth.guard.ts
- protocol/src/index.ts
- Project
- ProjectCreateCommand
- metrics.controller.ts
- migrate-mode.e2e-spec.ts
- ProjectsService
- test-secrets.ts
- worker.module.ts
- request-id.spec.ts
- migrate.module.ts
- operator-role.guard.spec.ts
- project-origins.e2e-spec.ts
- encryption.service.spec.ts
- Zone
- .publish
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- origin.commands.ts
- OperationSteps
- redis.module.ts
- main.ts
- participant.entity.spec.ts
- database-entities.ts
- api-app.ts
- identity-key-commands.e2e-spec.ts
- health.module.ts
- operators.repository.ts
- .getByName
- workspace-check-types.e2e-spec.ts
- operators.service.ts
- project-cli.ts
- CreateChatTables1793215389271
- audit-rule.ts
- secrets-reencrypt-command.e2e-spec.ts
- secrets-reencryption.service.ts
- zone.ts
- Message
- encryption-keys.schema.spec.ts
- SecretsReencryptionService
- api-keys.service.ts
- api-exception.ts
- log-redaction.e2e-spec.ts
- global-setup.ts
- cli-mode.e2e-spec.ts
- operator-auth-guard.e2e-spec.ts
- @nestjs/core
- zod-serialization.spec.ts
- JsonObjectValidator
- typeorm
- api-docs.spec.ts
- operators.module.ts
- @nestjs/common
- encryption-keys.schema.ts
- ref_node_path
- helmet
- identity-key-pem.ts
- projects-table.e2e-spec.ts
- TokensService
- domain-event-bus.spec.ts
- body-limit.spec.ts
- secrets-reencryption.service.ts
- operator-token.controller.ts
- AuditLogRepository
- Operator
- json-object-limits.spec.ts
- project-list.command.ts
- database-connection.e2e-spec.ts
- token-signing-keys.schema.ts
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- server-errors.spec.ts
- KeyListCommand
- CreateAuditLog1793200000000
- @nestjs/websockets@^12.1.3
- AddConversationIndexes1793215983154
- TestTokenSigningConfigModule
- RolesProbeController
- @nestjs/swagger

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 131 edges
2. `typeorm` - 55 edges
3. `Zone()` - 50 edges
4. `Project` - 43 edges
5. `@nestjs/testing` - 38 edges
6. `ProjectsService` - 35 edges
7. `useTestDatabase()` - 33 edges
8. `ApiKey` - 27 edges
9. `findFreePort()` - 27 edges
10. `Conversation` - 26 edges

## Surprising Connections (you probably didn't know these)
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts
- `AuditRecord` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-rule.ts → packages/protocol/src/json-types.ts
- `ConversationEvent` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation-event.entity.ts → packages/protocol/src/json-types.ts
- `Conversation` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation.entity.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (142 total, 30 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.11
Nodes (6): DatabaseMigration, CreateProjects1793193549883, CreateApiKeys1793300000000, CreateIdentityKeys1793300001000, AddProjectsPublicKey1793300002000, CreateOperators1793300003000

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.18
Nodes (9): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+1 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (44): author, bin, sowa-chat, description, devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0 (+36 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "tokens.service.spec.ts"
Cohesion: 0.12
Nodes (29): SignedToken, SignTokenInput, TokenAudience, tokenAudiences, VerifiedToken, encodePart(), flipSignatureBit(), ForgedTokenInput (+21 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.07
Nodes (23): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+15 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, @aws-sdk/client-s3@^3.1151.0, @aws-sdk/s3-request-presigner@^3.1151.0, bullmq@^6.3.15, cache-manager@^7.2.9, file-type@^22.1.1, jose@^6.2.12, nest-commander@^3.21.0 (+37 more)

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
Nodes (16): nestjs-zod@^5.5.0, OperatorDisabledFilter, ApiHttpModule, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse() (+8 more)

### Community 23 - "RequestContext"
Cohesion: 0.11
Nodes (4): RequestContext, ContextConsumer, GuardProbeController, OperatorGuardProbeController

### Community 24 - "AuditLogEntry"
Cohesion: 0.16
Nodes (5): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, @nestjs-cls/transactional-adapter-typeorm

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "cli.module.ts"
Cohesion: 0.11
Nodes (9): ServerAuthModule, OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand, OriginListCommand, OriginRemoveCommand, KeysModule (+1 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.09
Nodes (27): ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation(), createMessage() (+19 more)

### Community 32 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.11
Nodes (20): KeyRevokeOptions, base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62() (+12 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "database.module.ts"
Cohesion: 0.22
Nodes (10): databaseMigrations, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection, DatabaseEntity (+2 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "config.module.ts"
Cohesion: 0.22
Nodes (15): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig (+7 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-probe.ts"
Cohesion: 0.08
Nodes (30): ApiModule, DependencyStatusBody, StatusBody, findZonePorts(), probeControllers, startListening(), stopListening(), ZoneServers (+22 more)

### Community 41 - "conversation.entity.spec.ts"
Cohesion: 0.18
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "test-database.ts"
Cohesion: 0.11
Nodes (17): ColumnRow, expectedColumns, IndexRow, PlanRow, ColumnRow, expectedColumns, jwk, createProjectWithKey() (+9 more)

### Community 46 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 47 - "main.ts"
Cohesion: 0.21
Nodes (14): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+6 more)

### Community 48 - "Visitor"
Cohesion: 0.15
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor

### Community 49 - "key-cli.ts"
Cohesion: 0.26
Nodes (18): toLookupPrefix(), hashKey(), auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix() (+10 more)

### Community 50 - "@nestjs/common"
Cohesion: 0.10
Nodes (19): emptyCell, formatDate(), serverKeyOnceWarning, writeLine(), writeTable(), writeWarning(), IdentityKeyAddOptions, header (+11 more)

### Community 51 - "database-connection.e2e-spec.ts"
Cohesion: 0.19
Nodes (13): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+5 more)

### Community 52 - "projects.service.ts"
Cohesion: 0.09
Nodes (21): IssuedApiKey, OriginList, originLists, NewProject, ORIGIN_COLUMNS, OriginsRow, ProjectsRepository, ChangeOriginInput (+13 more)

### Community 53 - "operator-auth.guard.ts"
Cohesion: 0.14
Nodes (4): OperatorAuthGuard, ServerKeyGuard, bearerToken(), FakeRequestInput

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.09
Nodes (22): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, defaultLimits, forbiddenKeys (+14 more)

### Community 55 - "Project"
Cohesion: 0.13
Nodes (8): Channel, channelColumns(), findColumn(), identityKeyAlgorithms, Project, ProjectFixture, JsonObject, typeorm

### Community 57 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 59 - "ProjectsService"
Cohesion: 0.10
Nodes (3): IdentityKeyListCommand, IdentityKeysService, ProjectsService

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "worker.module.ts"
Cohesion: 0.15
Nodes (8): eventValues, happened, personalValues, AuditModule, DomainEventBus, TelemetryModule, testAuditRules, @nestjs/event-emitter

### Community 62 - "request-id.spec.ts"
Cohesion: 0.15
Nodes (10): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+2 more)

### Community 63 - "migrate.module.ts"
Cohesion: 0.20
Nodes (4): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps

### Community 64 - "operator-role.guard.spec.ts"
Cohesion: 0.15
Nodes (10): @nestjs/core@^12.0.1, OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly() (+2 more)

### Community 65 - "project-origins.e2e-spec.ts"
Cohesion: 0.15
Nodes (16): IssueApiKeyInput, columns, createMain(), emptyLists, eventNames, listRow(), lists, originAuditRows() (+8 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.10
Nodes (20): CryptoModule, authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv (+12 more)

### Community 67 - "Zone"
Cohesion: 0.06
Nodes (20): ServerController(), NeutralProbeController, SecondVersionProbeController, VersionedProbeController, InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController (+12 more)

### Community 68 - ".publish"
Cohesion: 0.14
Nodes (5): KeyRevokeCommand, toEvent(), AuditScenarios, happenedIn(), ScenarioError

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "IdentityKey"
Cohesion: 0.09
Nodes (12): KeyActorKind, IdentityKey, IdentityKeyAlgorithm, IdentityKeysRepository, NewIdentityKey, AddedIdentityKey, AddIdentityKeyInput, IdentityKeyKidTakenError (+4 more)

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "origin.commands.ts"
Cohesion: 0.15
Nodes (13): addOriginTo(), describeAdd(), describeRemove(), OriginOptions, ProjectOptions, removeOriginFrom(), ALLOWED_PROTOCOLS, InvalidOriginError (+5 more)

### Community 73 - "OperationSteps"
Cohesion: 0.05
Nodes (25): nestjs-cls@^7.0.1, AppClsModule, DatabaseStepSubscriber, HttpMetrics, OperationStep, operationSteps, OperationTiming, StepTimes (+17 more)

### Community 74 - "redis.module.ts"
Cohesion: 0.12
Nodes (16): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, fetchStatus() (+8 more)

### Community 75 - "main.ts"
Cohesion: 0.13
Nodes (15): cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, createContext(), mode, runApi() (+7 more)

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "database-entities.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 78 - "api-app.ts"
Cohesion: 0.12
Nodes (15): configureApiApp(), useClsMiddleware(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore() (+7 more)

### Community 79 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.18
Nodes (21): WorkerModule, expectNoKeyRows(), expectNoRows(), addKey(), addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem() (+13 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 81 - "operators.repository.ts"
Cohesion: 0.16
Nodes (3): DisabledOperators, Probe, OperatorsRepository

### Community 82 - ".getByName"
Cohesion: 0.12
Nodes (4): IdentityKeyAddCommand, readPem(), IdentityKeyRevokeCommand, listOriginsOf()

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "operators.service.ts"
Cohesion: 0.14
Nodes (9): OperatorTokenClaims, operatorTokenClaimsSchema, IssuedOperatorToken, OperatorDisabledError, OperatorsService, operatorTokenTtlSeconds, input, Probe (+1 more)

### Community 85 - "project-cli.ts"
Cohesion: 0.14
Nodes (22): badOrigins, helpEntries, prefixes, CliRunResult, runCliInProcess(), addOrigins(), OriginAction, OriginCommandOptions (+14 more)

### Community 87 - "audit-rule.ts"
Cohesion: 0.13
Nodes (19): auditedEventNames(), AuditRecord, AuditRule, auditRules, auditedEvents, botKeyEvent, identityKeyEvent, originEventNames (+11 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "secrets-reencryption.service.ts"
Cohesion: 0.19
Nodes (9): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+1 more)

### Community 90 - "zone.ts"
Cohesion: 0.10
Nodes (20): probeControllers, HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs() (+12 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.29
Nodes (7): describeErrors(), key1, key1Bytes, key2, key2Bytes, parseKeys(), requiredEnv

### Community 94 - "api-keys.service.ts"
Cohesion: 0.06
Nodes (26): ApiKey, ApiKeyKind, apiKeyKinds, ApiKeysRepository, NewApiKey, ApiKeysService, ApiKeySummary, hashMatches() (+18 more)

### Community 95 - "api-exception.ts"
Cohesion: 0.16
Nodes (12): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ErrorCode, errorCodes, errorDetailSchema (+4 more)

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.31
Nodes (8): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), RunningServer

### Community 97 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.16
Nodes (9): DisabledProbeController, issueOperator(), getProbe(), issueOperator(), withToken(), IssuedOperator, issueTestOperator(), operatorProbePath (+1 more)

### Community 101 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 102 - "JsonObjectValidator"
Cohesion: 0.28
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 104 - "typeorm"
Cohesion: 0.40
Nodes (3): database, loadDataSource(), databaseEntities

### Community 105 - "api-docs.spec.ts"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 106 - "operators.module.ts"
Cohesion: 0.18
Nodes (5): OperatorAuthModule, ServerApiModule, OperatorsModule, TokensModule, OperationStepsModule

### Community 107 - "@nestjs/common"
Cohesion: 0.20
Nodes (6): OperatorController(), RequestContextModule, ConsumerModule, get(), getAs(), @nestjs/common

### Community 108 - "encryption-keys.schema.ts"
Cohesion: 0.60
Nodes (5): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject()

### Community 109 - "ref_node_path"
Cohesion: 0.10
Nodes (14): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, builtFiles, CommandResult, entriesByPackage, plannedBuildTasks() (+6 more)

### Community 110 - "helmet"
Cohesion: 0.11
Nodes (10): helmet@^8.3.0, @nestjs/cache-manager@^12.0.1, @nestjs/platform-socket.io@^12.1.3, @nestjs/throttler@^6.7.1, socket.io@^4.8.4, helmet, @nestjs/cache-manager, @nestjs/platform-socket.io (+2 more)

### Community 111 - "identity-key-pem.ts"
Cohesion: 0.24
Nodes (8): algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey(), readPublicKeyObject(), captureError(), expectInvalidKey()

### Community 115 - "TokensService"
Cohesion: 0.15
Nodes (4): TokenSigningKey, TokenConsumer, TokensService, createService()

### Community 120 - "domain-event-bus.spec.ts"
Cohesion: 0.25
Nodes (8): happened, TestListener, DomainEventHandler, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 122 - "secrets-reencryption.service.ts"
Cohesion: 0.14
Nodes (13): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldReencryption, FieldResult, FieldVersionCount, ReencryptInput (+5 more)

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.19
Nodes (3): OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto

### Community 125 - "Operator"
Cohesion: 0.17
Nodes (5): Operator, OperatorProfile, IssueOperatorTokenInput, RequestOperator, OperatorRole

### Community 126 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 127 - "project-list.command.ts"
Cohesion: 0.22
Nodes (4): formatOrigins(), header, ProjectListCommand, toRow()

### Community 128 - "database-connection.e2e-spec.ts"
Cohesion: 0.20
Nodes (8): AppConfigModule, fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus()

### Community 129 - "token-signing-keys.schema.ts"
Cohesion: 0.29
Nodes (6): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, tokenSigningKeysSchema

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 133 - "server-errors.spec.ts"
Cohesion: 0.32
Nodes (6): ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, stringsInside()

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 933 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `log-level-warn.spec.ts`, `devDependencies`, `server-errors.spec.ts`, `tokens.service.spec.ts`, `dependencies`, `http-error.filter.spec.ts`, `AuditLogEntry`, `cli.module.ts`, `server-key-guard.e2e-spec.ts`, `zone.guard.spec.ts`, `database.module.ts`, `config.module.ts`, `zone-probe.ts`, `test-database.ts`, `log-redaction.spec.ts`, `main.ts`, `@nestjs/common`, `projects.service.ts`, `operator-auth.guard.ts`, `Project`, `metrics.controller.ts`, `worker.module.ts`, `request-id.spec.ts`, `migrate.module.ts`, `operator-role.guard.spec.ts`, `encryption.service.spec.ts`, `Zone`, `IdentityKey`, `origin.commands.ts`, `OperationSteps`, `redis.module.ts`, `main.ts`, `api-app.ts`, `health.module.ts`, `operators.repository.ts`, `operators.service.ts`, `audit-rule.ts`, `secrets-reencryption.service.ts`, `zone.ts`, `api-keys.service.ts`, `api-exception.ts`, `operator-auth-guard.e2e-spec.ts`, `zod-serialization.spec.ts`, `api-docs.spec.ts`, `operators.module.ts`, `domain-event-bus.spec.ts`, `body-limit.spec.ts`, `secrets-reencryption.service.ts`, `operator-token.controller.ts`, `Operator`, `project-list.command.ts`?**
  _High betweenness centrality (0.288) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11255411255411256 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `Project` to `database-migrations.ts`, `database-connection.e2e-spec.ts`, `devDependencies`, `CreateAuditLog1793200000000`, `AddConversationIndexes1793215983154`, `dependencies`, `chat-tables.e2e-spec.ts`, `ConversationEvent`, `database.module.ts`, `conversation.entity.spec.ts`, `test-database.ts`, `Visitor`, `key-cli.ts`, `migrate-mode.e2e-spec.ts`, `test-secrets.ts`, `project-origins.e2e-spec.ts`, `OperationSteps`, `participant.entity.spec.ts`, `database-entities.ts`, `identity-key-commands.e2e-spec.ts`, `operators.repository.ts`, `project-cli.ts`, `CreateChatTables1793215389271`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `api-keys.service.ts`, `operator-auth-guard.e2e-spec.ts`, `typeorm`, `ref_node_path`, `projects-table.e2e-spec.ts`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `zone.guard.spec.ts`, `ServerErrorsProbeController`, `ErrorProbeController`, `server-errors.spec.ts`, `zod-serialization.spec.ts`, `ValidationProbeController`, `@nestjs/core`, `api-docs.spec.ts`, `zone-probe.ts`, `@nestjs/common`, `ResponseProbeController`, `OperationSteps`, `health.module.ts`, `http-error.filter.spec.ts`, `body-limit.spec.ts`, `zone.ts`, `metrics.controller.ts`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._