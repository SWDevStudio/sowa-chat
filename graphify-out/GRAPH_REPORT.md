# Graph Report - hector-chat-epic-11  (2026-10-29)

## Corpus Check
- 373 files · ~91,256 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2632 nodes · 6147 edges · 148 communities (114 shown, 34 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 152 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `eba1bee9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- logger.module.ts
- env.schema.ts
- compilerOptions
- HttpMetrics
- config.module.ts
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
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- key-format.ts
- MixedZoneController
- ConversationEvent
- development-secrets-file.ts
- tsconfig.build.json
- ValidationProbeController
- main.ts
- nest-cli.json
- zone-probe.ts
- ProjectsRepository
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- migrate.module.ts
- RedactionProbeController
- api-keys-service-probe.ts
- identity-key-commands.e2e-spec.ts
- participant.entity.spec.ts
- cli.module.ts
- database-connection.e2e-spec.ts
- initial-project.e2e-spec.ts
- operator-auth.guard.ts
- protocol/src/index.ts
- Project
- ProjectCreateCommand
- .probe
- migrate-mode.e2e-spec.ts
- identity-key-list.command.ts
- test-secrets.ts
- worker.module.ts
- request-id.spec.ts
- KeyCreateCommand
- ApiKeysService
- ref_node_crypto
- encryption.service.spec.ts
- project-cli.ts
- conversation.entity.spec.ts
- config-startup.e2e-spec.ts
- identity-keys.service.ts
- server-protocol.e2e-spec.ts
- projects.service.ts
- OperationSteps
- api-versioning.spec.ts
- InternalProbeController
- conversation.entity.ts
- http-error.filter.spec.ts
- cls-middleware.ts
- telemetry.interceptor.spec.ts
- health.module.ts
- operators.repository.ts
- .getByName
- workspace-check-types.e2e-spec.ts
- error-response.ts
- key-cli.ts
- CreateChatTables1793215389271
- audited-events.spec.ts
- secrets-reencrypt-command.e2e-spec.ts
- secrets-reencryption.service.ts
- zone.guard.spec.ts
- Message
- encryption-keys.schema.spec.ts
- SecretsReencryptionService
- ApiKey
- ReplicaReadiness
- log-redaction.e2e-spec.ts
- database-entities.ts
- cli-mode.e2e-spec.ts
- operator-auth-guard.e2e-spec.ts
- operation-steps.ts
- IdentityKeyAddCommand
- JsonObjectValidator
- slow-operations.ts
- unit-probe.ts
- Zone
- cli.module.ts
- Controller
- server-errors.spec.ts
- redis-connection.e2e-spec.ts
- pg
- packages-build.e2e-spec.ts
- SlowProbeController
- tokens.service.spec.ts
- DomainEventBus
- BodyProbeController
- secrets-reencryption.service.ts
- server-key-guard.e2e-spec.ts
- body-limit.ts
- test-database.ts
- ProjectListCommand
- ProjectsService
- env.schema.logging.spec.ts
- token-signing-keys.schema.ts
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- env.schema.spec.ts
- KeyRevokeCommand
- encrypted-secret.spec.ts
- ZonedController
- @aws-sdk/s3-request-presigner@^3.1151.0
- encryption-keys.schema.ts
- zod-serialization.spec.ts
- database-connection.e2e-spec.ts
- DatabaseStepSubscriber
- TelemetryProbeController
- sharp@^0.35.5
- @nestjs/platform-socket.io@^12.1.3
- socket.io@^4.8.4
- @nestjs/websockets@^12.1.3
- pino-http

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 134 edges
2. `typeorm` - 59 edges
3. `Zone()` - 50 edges
4. `Project` - 44 edges
5. `@nestjs/testing` - 39 edges
6. `ProjectsService` - 39 edges
7. `useTestDatabase()` - 34 edges
8. `ApiKey` - 28 edges
9. `ApiKeysService` - 28 edges
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

## Communities (148 total, 34 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.07
Nodes (9): CreateProjects1793193549883, CreateAuditLog1793200000000, AddConversationIndexes1793215983154, CreateApiKeys1793300000000, CreateIdentityKeys1793300001000, AddProjectsPublicKey1793300002000, AddProjectsOperatorAllowedOrigins1793300003000, CreateOperators1793300003000 (+1 more)

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
Nodes (44): author, bin, sowa-chat, description, devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0 (+36 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "logger.module.ts"
Cohesion: 0.20
Nodes (15): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+7 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.12
Nodes (18): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+10 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 10 - "config.module.ts"
Cohesion: 0.05
Nodes (50): ioredis@^6.0.0, appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig (+42 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.05
Nodes (40): dependencies, bullmq@^6.3.15, cache-manager@^7.2.9, file-type@^22.1.1, helmet@^8.3.0, jose@^6.2.12, nest-commander@^3.21.0, @nest-lab/throttler-storage-redis@^1.2.0 (+32 more)

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
Cohesion: 0.16
Nodes (12): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ErrorCode, errorCodes, errorDetailSchema (+4 more)

### Community 23 - "RequestContext"
Cohesion: 0.07
Nodes (13): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnly(), supervisorOnlyMetadataKey, RequestContextModule (+5 more)

### Community 24 - "AuditLogEntry"
Cohesion: 0.15
Nodes (7): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.08
Nodes (15): readPem(), addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand (+7 more)

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
Cohesion: 0.07
Nodes (29): ColumnRow, ForeignKeyRow, IndexRow, tableNames, IndexRow, PlanRow, countRows(), createChannel() (+21 more)

### Community 32 - "key-format.ts"
Cohesion: 0.12
Nodes (15): InvalidApiKeyError, base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62() (+7 more)

### Community 33 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "development-secrets-file.ts"
Cohesion: 0.22
Nodes (16): createDevelopmentSecrets(), defaultDevelopmentSecretsDirectory, DevelopmentMainProject, DevelopmentSecrets, developmentSecretsFileName, developmentSecretsPath(), developmentSecretsSchema, hasErrorCode() (+8 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "main.ts"
Cohesion: 0.11
Nodes (16): ApiModule, cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, createContext(), mode (+8 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-probe.ts"
Cohesion: 0.07
Nodes (29): configureApiApp(), HealthBody, HealthEntry, DependencyStatusBody, StatusBody, noStore(), useSecurityHeaders(), findZonePorts() (+21 more)

### Community 41 - "ProjectsRepository"
Cohesion: 0.11
Nodes (9): OriginList, originLists, initialProjectLockName, NewProject, ORIGIN_COLUMNS, OriginsRow, ProjectsRepository, @nestjs-cls/transactional-adapter-typeorm (+1 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "migrate.module.ts"
Cohesion: 0.20
Nodes (4): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps

### Community 47 - "api-keys-service-probe.ts"
Cohesion: 0.24
Nodes (12): eventFields, keyTypeByKind, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred (+4 more)

### Community 48 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.22
Nodes (19): addKey(), runCliInProcess(), addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem(), identityKeyListHeader, listIdentityKeys() (+11 more)

### Community 49 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 50 - "cli.module.ts"
Cohesion: 0.16
Nodes (13): emptyCell, serverKeyOnceWarning, writeLine(), writeTable(), writeWarning(), IdentityKeyAddOptions, IdentityKeyRevokeOptions, KeyCreateOptions (+5 more)

### Community 51 - "database-connection.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "initial-project.e2e-spec.ts"
Cohesion: 0.09
Nodes (22): SupervisorOnlyController, IssueApiKeyInput, ProjectsModule, CreatedProject, WorkerModule, apiKeyRows(), expectSingleProject(), projectCreatedRows() (+14 more)

### Community 53 - "operator-auth.guard.ts"
Cohesion: 0.11
Nodes (6): OperatorAuthGuard, ServerKeyGuard, OperatorTokenClaims, operatorTokenClaimsSchema, bearerToken(), FakeRequestInput

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.06
Nodes (28): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, defaultLimits, isAccepted() (+20 more)

### Community 55 - "Project"
Cohesion: 0.10
Nodes (16): database, loadDataSource(), databaseEntities, Channel, channelColumns(), findColumn(), identityKeyAlgorithms, Project (+8 more)

### Community 57 - ".probe"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 59 - "identity-key-list.command.ts"
Cohesion: 0.20
Nodes (5): formatDate(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow()

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "worker.module.ts"
Cohesion: 0.12
Nodes (11): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, auditedEventNames(), AuditRule, auditRules (+3 more)

### Community 62 - "request-id.spec.ts"
Cohesion: 0.14
Nodes (9): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse, ProbeService (+1 more)

### Community 64 - "ApiKeysService"
Cohesion: 0.14
Nodes (6): header, KeyListCommand, KeyListOptions, toRow(), ApiKeysService, Replica

### Community 65 - "ref_node_crypto"
Cohesion: 0.30
Nodes (7): firstTokenSigningKeyIds, GeneratedSecret, generatedSecrets, SecretsMode, generateEncryptionKeyEntry(), generateTokenSigningKeyEntry(), minimalEnv

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.12
Nodes (14): CryptoModule, authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService, SecretDecryptionError (+6 more)

### Community 67 - "project-cli.ts"
Cohesion: 0.13
Nodes (20): badOrigins, helpEntries, prefixes, CliRunResult, addOrigins(), OriginAction, OriginCommandOptions, OriginGroup (+12 more)

### Community 68 - "conversation.entity.spec.ts"
Cohesion: 0.15
Nodes (7): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget(), Visitor

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "identity-keys.service.ts"
Cohesion: 0.06
Nodes (26): KeyActorKind, IdentityKey, IdentityKeyAlgorithm, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey() (+18 more)

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.31
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "projects.service.ts"
Cohesion: 0.13
Nodes (19): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl(), ChangeOriginInput, InvalidProjectNameError (+11 more)

### Community 73 - "OperationSteps"
Cohesion: 0.19
Nodes (3): OperationStep, OperationSteps, OperationStepsProbeController

### Community 74 - "api-versioning.spec.ts"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 75 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 76 - "conversation.entity.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 77 - "http-error.filter.spec.ts"
Cohesion: 0.17
Nodes (6): HttpErrorFilter, responseZodErrorOf(), knownKeys, ProbeBodyDto, requestIdHeader, requestIdOfResponse()

### Community 78 - "cls-middleware.ts"
Cohesion: 0.46
Nodes (4): useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp()

### Community 79 - "telemetry.interceptor.spec.ts"
Cohesion: 0.15
Nodes (7): HttpLabel, HttpMetrics, HttpRequestRecord, labelNames, readMetricLines(), zoneUrl(), rxjs

### Community 80 - "health.module.ts"
Cohesion: 0.13
Nodes (9): DependencyChecks, HealthModule, readServerVersion(), StatusController, DependencyStatus, ServerStatus, StatusService, toDependencyStatus() (+1 more)

### Community 81 - "operators.repository.ts"
Cohesion: 0.13
Nodes (7): DisabledOperators, Probe, OperatorsModule, OperatorProfile, OperatorsRepository, TokensModule, @nestjs/common

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "error-response.ts"
Cohesion: 0.29
Nodes (7): OperatorDisabledFilter, OperatorDisabledError, errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse()

### Community 85 - "key-cli.ts"
Cohesion: 0.22
Nodes (18): hashKey(), CreateProjectInput, auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix() (+10 more)

### Community 87 - "audited-events.spec.ts"
Cohesion: 0.15
Nodes (13): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+5 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "secrets-reencryption.service.ts"
Cohesion: 0.16
Nodes (11): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+3 more)

### Community 90 - "zone.guard.spec.ts"
Cohesion: 0.10
Nodes (19): probeControllers, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, probeControllers (+11 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.29
Nodes (7): describeErrors(), key1, key1Bytes, key2, key2Bytes, parseKeys(), requiredEnv

### Community 94 - "ApiKey"
Cohesion: 0.07
Nodes (15): ApiKey, ApiKeyKind, apiKeyKinds, ApiKeysRepository, NewApiKey, ApiKeySummary, hashMatches(), IssueApiKeyBaseInput (+7 more)

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 97 - "database-entities.ts"
Cohesion: 0.19
Nodes (12): DatabaseMigration, databaseMigrations, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity, SecondEntity, runDatabaseMigrations() (+4 more)

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.10
Nodes (22): OperatorController(), IssuedOperatorToken, IssueOperatorTokenInput, OperatorsService, operatorTokenTtlSeconds, DisabledProbeController, issueOperator(), getProbe() (+14 more)

### Community 100 - "operation-steps.ts"
Cohesion: 0.33
Nodes (4): nestjs-cls@^7.0.1, beginOperation(), operationTimingKey, nestjs-cls

### Community 102 - "JsonObjectValidator"
Cohesion: 0.28
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 103 - "slow-operations.ts"
Cohesion: 0.18
Nodes (7): operationSteps, OperationTiming, StepTimes, FinishedOperation, SlowOperationsModule, roundSteps(), SlowOperations

### Community 104 - "unit-probe.ts"
Cohesion: 0.12
Nodes (17): LogDestination, allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService() (+9 more)

### Community 105 - "Zone"
Cohesion: 0.15
Nodes (11): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+3 more)

### Community 106 - "cli.module.ts"
Cohesion: 0.09
Nodes (15): OperatorAuthModule, ServerApiModule, ServerAuthModule, AuditModule, AppClsModule, AppConfigModule, createTypeOrmModule(), DatabaseModule (+7 more)

### Community 107 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 108 - "server-errors.spec.ts"
Cohesion: 0.28
Nodes (7): internalErrorMessage, ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, stringsInside()

### Community 109 - "redis-connection.e2e-spec.ts"
Cohesion: 0.13
Nodes (9): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, IdentityRow, VersionRow (+1 more)

### Community 110 - "pg"
Cohesion: 0.14
Nodes (8): @aws-sdk/client-s3@^3.1151.0, pg@^8.23.1, reflect-metadata@^0.2.2, @sowa-chat/protocol@workspace:*, @aws-sdk/client-s3, pg, reflect-metadata, @sowa-chat/protocol

### Community 111 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 112 - "SlowProbeController"
Cohesion: 0.24
Nodes (3): LogEntry, pause(), SlowProbeController

### Community 115 - "tokens.service.spec.ts"
Cohesion: 0.10
Nodes (29): SignTokenInput, ConsumerModule, TestTokenSigningConfigModule, TokenConsumer, tokenAudiences, encodePart(), flipSignatureBit(), ForgedTokenInput (+21 more)

### Community 120 - "DomainEventBus"
Cohesion: 0.21
Nodes (10): happened, TestListener, DomainEventHandler, DomainEventName, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent (+2 more)

### Community 122 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldResult, ReencryptInput, reencryptionBatchSize, ReencryptionReport (+3 more)

### Community 123 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.07
Nodes (18): nestjs-zod@^5.5.0, OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, ServerController(), calls, ProbeBodyDto, ProbeCall (+10 more)

### Community 124 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 125 - "test-database.ts"
Cohesion: 0.06
Nodes (23): Operator, input, Probe, signedToken, TokenSigningKey, SignedToken, TokenAudience, TokensService (+15 more)

### Community 126 - "ProjectListCommand"
Cohesion: 0.25
Nodes (3): formatOrigins(), ProjectListCommand, toRow()

### Community 128 - "env.schema.logging.spec.ts"
Cohesion: 0.33
Nodes (3): Env, logLevels, requiredEnv

### Community 129 - "token-signing-keys.schema.ts"
Cohesion: 0.29
Nodes (6): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, tokenSigningKeysSchema

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 135 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 138 - "encryption-keys.schema.ts"
Cohesion: 0.60
Nodes (5): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject()

### Community 139 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 140 - "database-connection.e2e-spec.ts"
Cohesion: 0.25
Nodes (6): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus()

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 953 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **34 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `operators.repository.ts` to `log-level-warn.spec.ts`, `devDependencies`, `logger.module.ts`, `config.module.ts`, `zod-serialization.spec.ts`, `dependencies`, `api-exception.ts`, `RequestContext`, `AuditLogEntry`, `origin.commands.ts`, `main.ts`, `zone-probe.ts`, `ProjectsRepository`, `migrate.module.ts`, `cli.module.ts`, `initial-project.e2e-spec.ts`, `operator-auth.guard.ts`, `.probe`, `identity-key-list.command.ts`, `worker.module.ts`, `request-id.spec.ts`, `ApiKeysService`, `encryption.service.spec.ts`, `identity-keys.service.ts`, `projects.service.ts`, `http-error.filter.spec.ts`, `cls-middleware.ts`, `telemetry.interceptor.spec.ts`, `health.module.ts`, `error-response.ts`, `secrets-reencryption.service.ts`, `zone.guard.spec.ts`, `ApiKey`, `operator-auth-guard.e2e-spec.ts`, `operation-steps.ts`, `slow-operations.ts`, `unit-probe.ts`, `Zone`, `cli.module.ts`, `server-errors.spec.ts`, `SlowProbeController`, `tokens.service.spec.ts`, `DomainEventBus`, `secrets-reencryption.service.ts`, `server-key-guard.e2e-spec.ts`, `body-limit.ts`, `test-database.ts`?**
  _High betweenness centrality (0.263) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07394957983193277 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `Project` to `database-migrations.ts`, `devDependencies`, `config.module.ts`, `database-connection.e2e-spec.ts`, `dependencies`, `chat-tables.e2e-spec.ts`, `ConversationEvent`, `ProjectsRepository`, `participant.entity.spec.ts`, `migrate-mode.e2e-spec.ts`, `test-secrets.ts`, `project-cli.ts`, `conversation.entity.spec.ts`, `identity-keys.service.ts`, `conversation.entity.ts`, `operators.repository.ts`, `key-cli.ts`, `CreateChatTables1793215389271`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `ApiKey`, `database-entities.ts`, `operator-auth-guard.e2e-spec.ts`, `operation-steps.ts`, `redis-connection.e2e-spec.ts`, `test-database.ts`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `zone-probe.ts` to `devDependencies`, `logger.module.ts`, `config.module.ts`, `database-connection.e2e-spec.ts`, `RequestContext`, `AuditLogEntry`, `key-format.ts`, `ProjectsRepository`, `api-keys-service-probe.ts`, `initial-project.e2e-spec.ts`, `test-secrets.ts`, `worker.module.ts`, `encryption.service.spec.ts`, `identity-keys.service.ts`, `projects.service.ts`, `cls-middleware.ts`, `operators.repository.ts`, `key-cli.ts`, `operation-steps.ts`, `unit-probe.ts`, `tokens.service.spec.ts`, `DomainEventBus`, `test-database.ts`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._