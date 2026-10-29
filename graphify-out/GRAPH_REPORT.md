# Graph Report - hector-chat-epic-11  (2026-10-29)

## Corpus Check
- 375 files · ~91,961 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2645 nodes · 6188 edges · 157 communities (115 shown, 42 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 152 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `61c83625`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- RequestContext
- env.schema.ts
- compilerOptions
- protocol/src/index.ts
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
- ref_vitest
- operator-role.guard.spec.ts
- AuditLogEntry
- scripts
- origin.commands.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- key-format.ts
- zone.guard.spec.ts
- ConversationEvent
- development-secrets-file.ts
- tsconfig.build.json
- ValidationProbeController
- main.ts
- nest-cli.json
- zone-probe.ts
- DomainEventBus
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- JsonObject
- RedactionProbeController
- api-keys-service-probe.ts
- identity-key-commands.e2e-spec.ts
- participant.entity.spec.ts
- cli.module.ts
- database-connection.e2e-spec.ts
- initial-project.e2e-spec.ts
- operator-auth.guard.ts
- json-object-limits.spec.ts
- Project
- ProjectCreateCommand
- .probe
- migrate-mode.e2e-spec.ts
- identity-key-list.command.ts
- test-secrets.ts
- worker.module.ts
- request-id.spec.ts
- worker.module.ts
- ApiKeysService
- ref_node_crypto
- encryption.service.spec.ts
- origin-cli.ts
- conversation.entity.spec.ts
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- projects.service.ts
- OperationSteps
- request-context.ts
- Visitor
- conversation.entity.ts
- http-error.filter.spec.ts
- api-app.ts
- secret-rotation.ts
- health.module.ts
- operators.repository.ts
- .getByName
- workspace-check-types.e2e-spec.ts
- operators.service.ts
- key-cli.ts
- CreateChatTables1793215389271
- audited-events.spec.ts
- secrets-reencrypt-command.e2e-spec.ts
- project-list.command.ts
- zone.guard.spec.ts
- Message
- encryption-keys.schema.spec.ts
- SecretsReencryptionService
- ApiKey
- identity-keys.service.ts
- log-redaction.e2e-spec.ts
- database.module.ts
- cli-mode.e2e-spec.ts
- operator-auth-guard.e2e-spec.ts
- identity-key-pem.ts
- IdentityKeyAddCommand
- JsonObjectValidator
- telemetry.module.ts
- .publish
- Zone
- @nestjs/common
- project-cli.ts
- TokensService
- redis-connection.e2e-spec.ts
- server/package.json
- packages-build.e2e-spec.ts
- api-keys.service.ts
- tokens.service.spec.ts
- DomainEventBus
- body-limit.spec.ts
- secrets-reencryption.service.ts
- operator-token.controller.ts
- server-key-guard.e2e-spec.ts
- typeorm
- Conversation
- ProjectsService
- env.schema.logging.spec.ts
- token-signing-keys.schema.ts
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- env.schema.spec.ts
- Message
- encrypted-secret.spec.ts
- ZonedController
- @aws-sdk/s3-request-presigner@^3.1151.0
- global-setup.ts
- zod-serialization.spec.ts
- database-entities.ts
- identity-key.entity.ts
- projects-table.e2e-spec.ts
- database-migrations.spec.ts
- @nestjs/platform-socket.io@^12.1.3
- CreateProjects1793193549883
- CreateApiKeys1793300000000
- AddProjectsPublicKey1793300002000
- TestTokenSigningConfigModule
- bullmq@^6.3.15
- cache-manager@^7.2.9
- helmet
- @nest-lab/throttler-storage-redis@^1.2.0
- pino-http
- @nestjs/cache-manager@^12.0.1
- @nestjs-cls/transactional-adapter-typeorm
- @nestjs/microservices@^12.1.3

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
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `ConversationEvent` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation-event.entity.ts → packages/protocol/src/json-types.ts
- `Conversation` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation.entity.ts → packages/protocol/src/json-types.ts
- `Message` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/message.entity.ts → packages/protocol/src/json-types.ts
- `Operator` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/domain/operators/operator.entity.ts → packages/protocol/src/operator-role.ts

## Import Cycles
- None detected.

## Communities (157 total, 42 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.14
Nodes (5): DatabaseMigration, CreateAuditLog1793200000000, AddConversationIndexes1793215983154, CreateIdentityKeys1793300001000, CreateOperators1793300003000

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
Nodes (35): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+27 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "RequestContext"
Cohesion: 0.08
Nodes (3): OperatorAuthGuard, RequestContext, GuardProbeController

### Community 7 - "env.schema.ts"
Cohesion: 0.13
Nodes (17): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), EnvObject, envObjectSchema, envSchema, findPortWithSameValue() (+9 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "protocol/src/index.ts"
Cohesion: 0.15
Nodes (15): OperatorTokenClaims, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, operatorRoles (+7 more)

### Community 10 - "config.module.ts"
Cohesion: 0.06
Nodes (45): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, environmentChecksConfig (+37 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.06
Nodes (31): dependencies, @aws-sdk/client-s3@^3.1151.0, ioredis@^6.0.0, nest-commander@^3.21.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1 (+23 more)

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

### Community 22 - "ref_vitest"
Cohesion: 0.16
Nodes (6): errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody

### Community 23 - "operator-role.guard.spec.ts"
Cohesion: 0.16
Nodes (8): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey

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
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+2 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.09
Nodes (27): ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation(), createMessage() (+19 more)

### Community 32 - "key-format.ts"
Cohesion: 0.22
Nodes (13): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+5 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

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
Cohesion: 0.06
Nodes (33): cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, DatabaseMigrationStep, createLogDestination(), logFileDescriptor() (+25 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-probe.ts"
Cohesion: 0.07
Nodes (32): ApiModule, DatabaseModule, DependencyStatusBody, StatusBody, createRequestIdProbeApp(), findZonePorts(), probeControllers, startListening() (+24 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "JsonObject"
Cohesion: 0.23
Nodes (12): ActorKind, actorKinds, NewAuditLogEntry, auditedEventNames(), AuditRecord, AuditRule, DomainEventHandler, DomainEventName (+4 more)

### Community 46 - "RedactionProbeController"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 47 - "api-keys-service-probe.ts"
Cohesion: 0.22
Nodes (11): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+3 more)

### Community 48 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.22
Nodes (17): CliRunResult, runCliInProcess(), addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem(), identityKeyListHeader, listIdentityKeys() (+9 more)

### Community 49 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 50 - "cli.module.ts"
Cohesion: 0.12
Nodes (12): serverKeyOnceWarning, writeLine(), writeWarning(), IdentityKeyAddOptions, IdentityKeyRevokeOptions, KeyCreateCommand, KeyCreateOptions, KeyGenerateCommand (+4 more)

### Community 51 - "database-connection.e2e-spec.ts"
Cohesion: 0.11
Nodes (20): AppConfigModule, fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus() (+12 more)

### Community 52 - "initial-project.e2e-spec.ts"
Cohesion: 0.09
Nodes (24): ProjectsModule, initialProjectLockName, NewProject, ORIGIN_COLUMNS, OriginsRow, apiKeyRows(), expectSingleProject(), projectCreatedRows() (+16 more)

### Community 53 - "operator-auth.guard.ts"
Cohesion: 0.12
Nodes (12): OperatorDisabledFilter, ServerKeyGuard, operatorTokenClaimsSchema, ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, bearerToken() (+4 more)

### Community 54 - "json-object-limits.spec.ts"
Cohesion: 0.08
Nodes (16): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+8 more)

### Community 55 - "Project"
Cohesion: 0.13
Nodes (4): Channel, channelColumns(), findColumn(), Project

### Community 57 - ".probe"
Cohesion: 0.22
Nodes (3): prom-client@^15.1.3, MetricsController, prom-client

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 59 - "identity-key-list.command.ts"
Cohesion: 0.10
Nodes (10): formatDate(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow(), header, KeyListCommand, KeyListOptions (+2 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "worker.module.ts"
Cohesion: 0.14
Nodes (8): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditModule, auditRules, testAuditRules

### Community 62 - "request-id.spec.ts"
Cohesion: 0.09
Nodes (13): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController, entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf() (+5 more)

### Community 63 - "worker.module.ts"
Cohesion: 0.23
Nodes (9): IdentityKeysService, KeysModule, WorkerModule, expectNoKeyRows(), expectNoRows(), addKey(), auditRows(), auditRowsByAction() (+1 more)

### Community 64 - "ApiKeysService"
Cohesion: 0.20
Nodes (3): ApiKeysService, InvalidApiKeyError, toEvent()

### Community 65 - "ref_node_crypto"
Cohesion: 0.31
Nodes (6): Env, firstTokenSigningKeyIds, GeneratedSecret, generatedSecrets, SecretsMode, minimalEnv

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.13
Nodes (14): CryptoModule, authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService, SecretDecryptionError (+6 more)

### Community 67 - "origin-cli.ts"
Cohesion: 0.24
Nodes (11): badOrigins, helpEntries, prefixes, addOrigins(), OriginAction, OriginCommandOptions, originGroups, originsOf() (+3 more)

### Community 68 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "projects.service.ts"
Cohesion: 0.11
Nodes (24): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), OriginList, originLists, normalizeOrigin(), normalizeOrigins(), parseUrl() (+16 more)

### Community 73 - "OperationSteps"
Cohesion: 0.05
Nodes (16): DatabaseStepSubscriber, HttpMetrics, OperationStep, operationSteps, OperationTiming, OperationSteps, OperationStepsProbeController, beginOperation() (+8 more)

### Community 74 - "request-context.ts"
Cohesion: 0.14
Nodes (7): OperatorProfile, IssueOperatorTokenInput, RequestContextModule, RequestOperator, ConsumerModule, ContextConsumer, OperatorRole

### Community 75 - "Visitor"
Cohesion: 0.15
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor

### Community 76 - "conversation.entity.ts"
Cohesion: 0.16
Nodes (13): ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind, messageSenderKinds (+5 more)

### Community 77 - "http-error.filter.spec.ts"
Cohesion: 0.14
Nodes (13): nestjs-zod@^5.5.0, ApiHttpModule, errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter (+5 more)

### Community 78 - "api-app.ts"
Cohesion: 0.12
Nodes (16): configureApiApp(), useClsMiddleware(), setupApiDocs(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError() (+8 more)

### Community 79 - "secret-rotation.ts"
Cohesion: 0.27
Nodes (13): generateEncryptionKeyEntry(), generateTokenSigningKeyEntry(), nextTokenSigningKeyId(), parseVariable(), requireConfiguredValue(), rotateConfiguredSecrets(), rotateEncryptionKeys(), rotateSecrets() (+5 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 81 - "operators.repository.ts"
Cohesion: 0.11
Nodes (6): OperatorAuthModule, DisabledOperators, Probe, OperatorsModule, OperatorsRepository, TokensModule

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "operators.service.ts"
Cohesion: 0.11
Nodes (8): Operator, IssuedOperatorToken, OperatorDisabledError, OperatorsService, operatorTokenTtlSeconds, input, Probe, signedToken

### Community 85 - "key-cli.ts"
Cohesion: 0.32
Nodes (16): toLookupPrefix(), auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix(), listKeys() (+8 more)

### Community 87 - "audited-events.spec.ts"
Cohesion: 0.13
Nodes (12): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+4 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "project-list.command.ts"
Cohesion: 0.14
Nodes (7): emptyCell, writeTable(), formatOrigins(), header, ProjectListCommand, toRow(), SecretsReencryptCommand

### Community 90 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (20): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), zonePathPrefixes, probeControllers (+12 more)

### Community 91 - "Message"
Cohesion: 0.27
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 94 - "ApiKey"
Cohesion: 0.11
Nodes (5): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey, toSummary()

### Community 95 - "identity-keys.service.ts"
Cohesion: 0.20
Nodes (10): KeyActorKind, IdentityKeyAlgorithm, ParsedIdentityKey, NewIdentityKey, AddedIdentityKey, AddIdentityKeyInput, IdentityKeyKidTakenError, InvalidIdentityKeyIdError (+2 more)

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 97 - "database.module.ts"
Cohesion: 0.25
Nodes (9): databaseMigrations, createTypeOrmModule(), getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity (+1 more)

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.16
Nodes (10): OperatorController(), DisabledProbeController, issueOperator(), issueOperator(), get(), getAs(), RolesProbeController, IssuedOperator (+2 more)

### Community 100 - "identity-key-pem.ts"
Cohesion: 0.27
Nodes (7): algorithmOf(), InvalidIdentityKeyError, isP256(), parseIdentityPublicKey(), readPublicKeyObject(), captureError(), expectInvalidKey()

### Community 103 - "telemetry.module.ts"
Cohesion: 0.25
Nodes (3): MetricsModule, SlowOperationsModule, TelemetryModule

### Community 104 - ".publish"
Cohesion: 0.26
Nodes (4): toEvent(), AuditScenarios, happenedIn(), ScenarioError

### Community 105 - "Zone"
Cohesion: 0.07
Nodes (21): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+13 more)

### Community 106 - "@nestjs/common"
Cohesion: 0.14
Nodes (8): ServerAuthModule, AppClsModule, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, OperationStepsModule, @nestjs/common

### Community 107 - "project-cli.ts"
Cohesion: 0.28
Nodes (8): buildServer(), fullOriginArguments, listHeader, onceWarning, repositoryRoot, runMainCli(), serverDirectory, uuidPattern

### Community 109 - "redis-connection.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): databaseUrl(), IdentityRow, VersionRow, fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment() (+5 more)

### Community 110 - "server/package.json"
Cohesion: 0.09
Nodes (21): author, bin, sowa-chat, file-type@^22.1.1, @nestjs/bullmq@^12.0.0, @nestjs/swagger@^12.0.2, reflect-metadata@^0.2.2, rxjs@^7.8.1 (+13 more)

### Community 111 - "packages-build.e2e-spec.ts"
Cohesion: 0.14
Nodes (11): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, builtFiles, CommandResult, entriesByPackage, plannedBuildTasks() (+3 more)

### Community 112 - "api-keys.service.ts"
Cohesion: 0.24
Nodes (8): hashMatches(), IssueApiKeyBaseInput, IssueApiKeyInput, IssuedApiKey, keyTypeByKind, RevokeApiKeyInput, VerifiedApiKey, hashKey()

### Community 115 - "tokens.service.spec.ts"
Cohesion: 0.10
Nodes (36): jose@^6.2.12, TokenSigningKey, SignedToken, SignTokenInput, TokenAudience, tokenAudiences, VerifiedToken, getProbe() (+28 more)

### Community 120 - "DomainEventBus"
Cohesion: 0.29
Nodes (7): happened, TestListener, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 122 - "secrets-reencryption.service.ts"
Cohesion: 0.11
Nodes (21): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptOptions, toReencryptionRow(), toVersionRow(), encryptedFields (+13 more)

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.17
Nodes (5): OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, ServerApiModule, ServerController()

### Community 124 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.29
Nodes (6): changeBodyChar(), forgeWithValidChecksum(), getProbe(), replaceChar(), withKey(), zoneAgent()

### Community 125 - "typeorm"
Cohesion: 0.08
Nodes (19): apiKeyKinds, ColumnRow, expectedColumns, ColumnRow, expectedColumns, IndexRow, PlanRow, createProjectWithKey() (+11 more)

### Community 127 - "ProjectsService"
Cohesion: 0.14
Nodes (4): ProjectsRepository, prepareProject(), ProjectsService, Replica

### Community 128 - "env.schema.logging.spec.ts"
Cohesion: 0.33
Nodes (3): Env, logLevels, requiredEnv

### Community 129 - "token-signing-keys.schema.ts"
Cohesion: 0.29
Nodes (6): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, tokenSigningKeysSchema

### Community 130 - "ServerErrorsProbeController"
Cohesion: 0.16
Nodes (9): internalErrorMessage, ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, ServerErrorsProbeController, stringsInside() (+1 more)

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 135 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 138 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 139 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 140 - "database-entities.ts"
Cohesion: 0.48
Nodes (3): database, loadDataSource(), databaseEntities

### Community 141 - "identity-key.entity.ts"
Cohesion: 0.40
Nodes (4): identityKeyAlgorithms, ColumnRow, expectedColumns, jwk

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 956 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `ServerErrorsProbeController`, `log-level-warn.spec.ts`, `config.module.ts`, `zod-serialization.spec.ts`, `dependencies`, `operator-role.guard.spec.ts`, `origin.commands.ts`, `zone.guard.spec.ts`, `main.ts`, `zone-probe.ts`, `JsonObject`, `RedactionProbeController`, `cli.module.ts`, `initial-project.e2e-spec.ts`, `operator-auth.guard.ts`, `.probe`, `identity-key-list.command.ts`, `worker.module.ts`, `request-id.spec.ts`, `worker.module.ts`, `encryption.service.spec.ts`, `projects.service.ts`, `OperationSteps`, `request-context.ts`, `http-error.filter.spec.ts`, `api-app.ts`, `health.module.ts`, `operators.repository.ts`, `operators.service.ts`, `project-list.command.ts`, `zone.guard.spec.ts`, `ApiKey`, `identity-keys.service.ts`, `database.module.ts`, `operator-auth-guard.e2e-spec.ts`, `telemetry.module.ts`, `Zone`, `server/package.json`, `api-keys.service.ts`, `tokens.service.spec.ts`, `DomainEventBus`, `body-limit.spec.ts`, `secrets-reencryption.service.ts`, `operator-token.controller.ts`, `server-key-guard.e2e-spec.ts`, `typeorm`?**
  _High betweenness centrality (0.260) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13725490196078433 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `config.module.ts`, `database-entities.ts`, `dependencies`, `identity-key.entity.ts`, `projects-table.e2e-spec.ts`, `CreateProjects1793193549883`, `CreateApiKeys1793300000000`, `AddProjectsPublicKey1793300002000`, `chat-tables.e2e-spec.ts`, `ConversationEvent`, `participant.entity.spec.ts`, `database-connection.e2e-spec.ts`, `initial-project.e2e-spec.ts`, `Project`, `migrate-mode.e2e-spec.ts`, `test-secrets.ts`, `worker.module.ts`, `origin-cli.ts`, `conversation.entity.spec.ts`, `OperationSteps`, `Visitor`, `conversation.entity.ts`, `operators.repository.ts`, `key-cli.ts`, `CreateChatTables1793215389271`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `database.module.ts`, `operator-auth-guard.e2e-spec.ts`, `redis-connection.e2e-spec.ts`, `server/package.json`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `typeorm` to `devDependencies`, `config.module.ts`, `main.ts`, `zone-probe.ts`, `api-keys-service-probe.ts`, `database-connection.e2e-spec.ts`, `initial-project.e2e-spec.ts`, `test-secrets.ts`, `worker.module.ts`, `worker.module.ts`, `encryption.service.spec.ts`, `projects.service.ts`, `OperationSteps`, `request-context.ts`, `api-app.ts`, `operators.repository.ts`, `operators.service.ts`, `key-cli.ts`, `@nestjs/common`, `redis-connection.e2e-spec.ts`, `server/package.json`, `tokens.service.spec.ts`, `DomainEventBus`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._