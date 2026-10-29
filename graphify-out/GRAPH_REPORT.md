# Graph Report - hector-chat-epic-13  (2026-10-29)

## Corpus Check
- 364 files · ~89,629 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2594 nodes · 5981 edges · 146 communities (105 shown, 41 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 145 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0718dd14`
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
- zone.guard.spec.ts
- @nestjs/common
- protocol/src/index.ts
- tsconfig.build.json
- zod-validation.spec.ts
- config.module.ts
- nest-cli.json
- api.module.ts
- ConversationEvent
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- identity-key-commands.e2e-spec.ts
- log-redaction.spec.ts
- logger.module.ts
- Visitor
- operators.service.ts
- http-error.filter.spec.ts
- log-settings.e2e-spec.ts
- tokens.service.ts
- operator-auth.guard.ts
- protocol/src/index.ts
- typeorm
- ProjectCreateCommand
- Zone
- migrate-mode.e2e-spec.ts
- participant.entity.spec.ts
- test-secrets.ts
- .publish
- request-id.spec.ts
- migrate.module.ts
- operator-role.guard.spec.ts
- project-origins.e2e-spec.ts
- encryption.service.spec.ts
- OperationSteps
- .createProjectPublishThenFail
- config-startup.e2e-spec.ts
- .create
- server-protocol.e2e-spec.ts
- projects.service.ts
- api.module.ts
- request-context.ts
- main.ts
- telemetry.interceptor.spec.ts
- conversation.entity.ts
- api-app.ts
- project-cli.ts
- health.module.ts
- operators.service.ts
- IdentityKeyAddCommand
- workspace-check-types.e2e-spec.ts
- conversation.entity.spec.ts
- identity-keys.service.ts
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
- worker.module.ts
- telemetry.interceptor.spec.ts
- JsonObjectValidator
- identity-key-pem.ts
- Zone
- operation-steps.ts
- test-database.ts
- api-versioning.spec.ts
- ref_node_path
- IdentityKey
- @nestjs/swagger
- InternalProbeController
- operators.module.ts
- body-limit.spec.ts
- IdentityKeyRevokeCommand
- secrets-reencryption.module.ts
- operator-token.controller.ts
- packages-build.e2e-spec.ts
- log-redaction.e2e-spec.ts
- RedactionProbeController
- database-connection.e2e-spec.ts
- .log
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- DatabaseStepSubscriber
- ProbeController
- TestTokenSigningConfigModule
- TokenConsumer
- RolesProbeController
- ZoneServers
- @aws-sdk/s3-request-presigner@^3.1151.0
- @nest-lab/throttler-storage-redis@^1.2.0
- @nestjs/microservices@^12.1.3
- sharp@^0.35.5
- @sowa-chat/protocol@workspace:*

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
- `RequestOperator` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/infra/request-context/request-context.ts → packages/protocol/src/operator-role.ts
- `AuditRecord` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-rule.ts → packages/protocol/src/json-types.ts
- `ConversationEvent` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation-event.entity.ts → packages/protocol/src/json-types.ts
- `Conversation` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation.entity.ts → packages/protocol/src/json-types.ts
- `Message` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/message.entity.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (146 total, 41 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.07
Nodes (15): DatabaseMigration, databaseMigrations, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity, SecondEntity, CreateProjects1793193549883 (+7 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.31
Nodes (8): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "tokens.service.spec.ts"
Cohesion: 0.16
Nodes (22): encodePart(), flipSignatureBit(), ForgedTokenInput, forgeToken(), forgeUnsecuredToken(), parseTestSigningKeys(), replaceHeader(), replacePayload() (+14 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.06
Nodes (25): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+17 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "server/package.json"
Cohesion: 0.08
Nodes (25): author, bin, sowa-chat, @aws-sdk/client-s3@^3.1151.0, cache-manager@^7.2.9, file-type@^22.1.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/platform-socket.io@^12.1.3 (+17 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, bullmq@^6.3.15, helmet@^8.3.0, jose@^6.2.12, nest-commander@^3.21.0, @nestjs/bullmq@^12.0.0, @nestjs/cache-manager@^12.0.1, nestjs-cls@^7.0.1 (+27 more)

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
Cohesion: 0.09
Nodes (26): OperatorDisabledFilter, OperatorDisabledError, ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, errorCodeOfStatus() (+18 more)

### Community 24 - "AuditLogEntry"
Cohesion: 0.17
Nodes (8): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, ColumnRow, expectedColumns, ProjectFixture, JsonObject

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.06
Nodes (16): readPem(), addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand (+8 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - "visitor-session.entity.spec.ts"
Cohesion: 0.14
Nodes (9): columns(), expectedColumns, findColumn(), findRelation(), normalizeSql(), relations(), runMigration(), CreateOperators1793300003000 (+1 more)

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.07
Nodes (29): ColumnRow, ForeignKeyRow, IndexRow, tableNames, IndexRow, PlanRow, countRows(), createChannel() (+21 more)

### Community 32 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.09
Nodes (30): eventFields, serverKey, base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey() (+22 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "@nestjs/common"
Cohesion: 0.06
Nodes (29): emptyCell, formatDate(), serverKeyOnceWarning, writeLine(), writeTable(), writeWarning(), IdentityKeyAddOptions, header (+21 more)

### Community 35 - "protocol/src/index.ts"
Cohesion: 0.10
Nodes (23): OperatorTokenClaims, operatorTokenClaimsSchema, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope (+15 more)

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
Cohesion: 0.10
Nodes (26): DependencyStatusBody, StatusBody, findZonePorts(), probeControllers, databaseUrl(), fetchStatus(), repositoryRoot, RunResult (+18 more)

### Community 41 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "zod-serialization.spec.ts"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 45 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.24
Nodes (15): addKey(), addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem(), identityKeyListHeader, listIdentityKeys(), PemWriter (+7 more)

### Community 46 - "log-redaction.spec.ts"
Cohesion: 0.16
Nodes (13): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+5 more)

### Community 47 - "logger.module.ts"
Cohesion: 0.16
Nodes (16): createLogDestination(), logFileDescriptor(), LogDestination, LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions() (+8 more)

### Community 49 - "operators.service.ts"
Cohesion: 0.10
Nodes (10): Operator, OperatorProfile, IssuedOperatorToken, IssueOperatorTokenInput, OperatorsService, operatorTokenTtlSeconds, input, Probe (+2 more)

### Community 50 - "http-error.filter.spec.ts"
Cohesion: 0.14
Nodes (10): useClsMiddleware(), HttpErrorFilter, responseZodErrorOf(), knownKeys, ProbeBodyDto, echoRequestId(), requestIdHeader, requestIdOfResponse() (+2 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "tokens.service.ts"
Cohesion: 0.15
Nodes (12): parseEntry(), parseKeys(), parsePrivateKey(), reject(), TokenSigningKey, tokenSigningKeysSchema, SignedToken, SignTokenInput (+4 more)

### Community 53 - "operator-auth.guard.ts"
Cohesion: 0.18
Nodes (4): OperatorAuthGuard, ServerKeyGuard, bearerToken(), FakeRequestInput

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.08
Nodes (16): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+8 more)

### Community 55 - "typeorm"
Cohesion: 0.13
Nodes (8): database, loadDataSource(), databaseEntities, Channel, channelColumns(), findColumn(), Project, typeorm

### Community 57 - "Zone"
Cohesion: 0.07
Nodes (18): ServerController(), InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController, calls (+10 more)

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 59 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - ".publish"
Cohesion: 0.17
Nodes (3): IdentityKeysRepository, InvalidIdentityKeyIdError, toEvent()

### Community 62 - "request-id.spec.ts"
Cohesion: 0.24
Nodes (8): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, ProbeService, waitForRequestEntry()

### Community 63 - "migrate.module.ts"
Cohesion: 0.20
Nodes (4): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps

### Community 64 - "operator-role.guard.spec.ts"
Cohesion: 0.16
Nodes (8): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey

### Community 65 - "project-origins.e2e-spec.ts"
Cohesion: 0.11
Nodes (21): IdentityKeysService, KeysModule, CreateProjectInput, WorkerModule, expectNoKeyRows(), expectNoRows(), columns, createMain() (+13 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.11
Nodes (19): authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv, tag (+11 more)

### Community 67 - "OperationSteps"
Cohesion: 0.14
Nodes (3): OperationStep, OperationSteps, OperationStepsProbeController

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - ".create"
Cohesion: 0.20
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "projects.service.ts"
Cohesion: 0.08
Nodes (28): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), OriginList, originLists, normalizeOrigin(), normalizeOrigins(), parseUrl() (+20 more)

### Community 73 - "api.module.ts"
Cohesion: 0.09
Nodes (13): @nestjs/typeorm@^12.0.2, ServerApiModule, ServerAuthModule, AppClsModule, AppConfigModule, createTypeOrmModule(), DatabaseModule, getTypeOrmModule() (+5 more)

### Community 74 - "request-context.ts"
Cohesion: 0.15
Nodes (5): RequestContextModule, RequestOperator, RequestVisitor, ConsumerModule, ContextConsumer

### Community 75 - "main.ts"
Cohesion: 0.11
Nodes (16): ApiModule, cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, createContext(), mode (+8 more)

### Community 76 - "telemetry.interceptor.spec.ts"
Cohesion: 0.10
Nodes (10): HttpLabel, HttpMetrics, labelNames, StepTimes, FinishedOperation, SlowOperationsModule, roundSteps(), SlowOperations (+2 more)

### Community 77 - "conversation.entity.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 78 - "api-app.ts"
Cohesion: 0.18
Nodes (11): configureApiApp(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders() (+3 more)

### Community 79 - "project-cli.ts"
Cohesion: 0.11
Nodes (40): toLookupPrefix(), badOrigins, helpEntries, prefixes, CliRunResult, runCliInProcess(), auditRowsByAction(), createdKey() (+32 more)

### Community 80 - "health.module.ts"
Cohesion: 0.06
Nodes (19): ioredis@^6.0.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+11 more)

### Community 81 - "operators.service.ts"
Cohesion: 0.16
Nodes (3): DisabledOperators, Probe, OperatorsRepository

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 85 - "identity-keys.service.ts"
Cohesion: 0.23
Nodes (10): KeyActorKind, IdentityKeyAlgorithm, identityKeyAlgorithms, ParsedIdentityKey, NewIdentityKey, AddedIdentityKey, AddIdentityKeyInput, IdentityKeyKidTakenError (+2 more)

### Community 87 - "audited-events.spec.ts"
Cohesion: 0.12
Nodes (14): AuditRecord, auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent (+6 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "secrets-reencrypt.command.ts"
Cohesion: 0.10
Nodes (20): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+12 more)

### Community 90 - "zone.ts"
Cohesion: 0.18
Nodes (14): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes (+6 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 94 - "api-keys.service.ts"
Cohesion: 0.07
Nodes (18): ApiKey, ApiKeyKind, apiKeyKinds, ApiKeysRepository, NewApiKey, ApiKeySummary, hashMatches(), IssueApiKeyBaseInput (+10 more)

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
Cohesion: 0.12
Nodes (18): OperatorController(), DisabledProbeController, issueOperator(), getProbe(), issueOperator(), withToken(), get(), getAs() (+10 more)

### Community 100 - "worker.module.ts"
Cohesion: 0.07
Nodes (26): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditModule, auditedEventNames(), AuditRule (+18 more)

### Community 101 - "telemetry.interceptor.spec.ts"
Cohesion: 0.16
Nodes (4): readMetricLines(), TelemetryProbeController, zoneUrl(), @nestjs/core

### Community 104 - "identity-key-pem.ts"
Cohesion: 0.27
Nodes (7): algorithmOf(), InvalidIdentityKeyError, isP256(), parseIdentityPublicKey(), readPublicKeyObject(), captureError(), expectInvalidKey()

### Community 105 - "Zone"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 106 - "operation-steps.ts"
Cohesion: 0.32
Nodes (5): operationSteps, OperationTiming, beginOperation(), operationTimingKey, nestjs-cls

### Community 107 - "test-database.ts"
Cohesion: 0.11
Nodes (20): ColumnRow, expectedColumns, jwk, createProjectWithKey(), internalAgent(), postToken(), createProjectRequest(), ColumnRow (+12 more)

### Community 108 - "api-versioning.spec.ts"
Cohesion: 0.25
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 109 - "ref_node_path"
Cohesion: 0.12
Nodes (11): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, IdentityRow, VersionRow (+3 more)

### Community 112 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 115 - "operators.module.ts"
Cohesion: 0.29
Nodes (3): OperatorAuthModule, OperatorsModule, TokensModule

### Community 122 - "secrets-reencryption.module.ts"
Cohesion: 0.32
Nodes (3): CryptoModule, registeredEncryptedFields, SecretsReencryptionModule

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.17
Nodes (6): nestjs-zod@^5.5.0, OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, OperatorTokenResponse, nestjs-zod

### Community 125 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 126 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 128 - "database-connection.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), RunningServer

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 138 - "ZoneServers"
Cohesion: 0.22
Nodes (3): startListening(), stopListening(), ZoneServers

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 956 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **41 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `log-level-warn.spec.ts`, `tokens.service.spec.ts`, `server/package.json`, `dependencies`, `http-error.filter.spec.ts`, `AuditLogEntry`, `origin.commands.ts`, `server-key-guard.e2e-spec.ts`, `zone.guard.spec.ts`, `config.module.ts`, `api.module.ts`, `zod-serialization.spec.ts`, `log-redaction.spec.ts`, `logger.module.ts`, `operators.service.ts`, `http-error.filter.spec.ts`, `tokens.service.ts`, `operator-auth.guard.ts`, `Zone`, `request-id.spec.ts`, `migrate.module.ts`, `operator-role.guard.spec.ts`, `project-origins.e2e-spec.ts`, `encryption.service.spec.ts`, `.create`, `projects.service.ts`, `api.module.ts`, `request-context.ts`, `main.ts`, `telemetry.interceptor.spec.ts`, `api-app.ts`, `health.module.ts`, `operators.service.ts`, `identity-keys.service.ts`, `secrets-reencrypt.command.ts`, `zone.ts`, `api-keys.service.ts`, `operator-guard-probe.ts`, `worker.module.ts`, `telemetry.interceptor.spec.ts`, `Zone`, `operation-steps.ts`, `test-database.ts`, `api-versioning.spec.ts`, `operators.module.ts`, `body-limit.spec.ts`, `secrets-reencryption.module.ts`, `operator-token.controller.ts`?**
  _High betweenness centrality (0.275) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07195121951219512 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `database-connection.e2e-spec.ts`, `server/package.json`, `dependencies`, `AuditLogEntry`, `visitor-session.entity.spec.ts`, `chat-tables.e2e-spec.ts`, `ConversationEvent`, `operators.service.ts`, `migrate-mode.e2e-spec.ts`, `participant.entity.spec.ts`, `test-secrets.ts`, `project-origins.e2e-spec.ts`, `.create`, `api.module.ts`, `conversation.entity.ts`, `project-cli.ts`, `conversation.entity.spec.ts`, `identity-keys.service.ts`, `CreateChatTables1793215389271`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `api-keys.service.ts`, `visitor.entity.spec.ts`, `operator-guard-probe.ts`, `operation-steps.ts`, `test-database.ts`, `ref_node_path`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `api.module.ts` to `database-connection.e2e-spec.ts`, `devDependencies`, `tokens.service.spec.ts`, `server/package.json`, `AuditLogEntry`, `server-key-guard.e2e-spec.ts`, `config.module.ts`, `logger.module.ts`, `operators.service.ts`, `http-error.filter.spec.ts`, `test-secrets.ts`, `project-origins.e2e-spec.ts`, `encryption.service.spec.ts`, `.create`, `projects.service.ts`, `request-context.ts`, `api-app.ts`, `project-cli.ts`, `operators.service.ts`, `worker.module.ts`, `operation-steps.ts`, `test-database.ts`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._