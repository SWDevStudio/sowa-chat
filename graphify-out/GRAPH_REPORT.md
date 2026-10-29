# Graph Report - hector-chat-epic-13  (2026-10-29)

## Corpus Check
- 383 files · ~94,186 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2709 nodes · 6380 edges · 149 communities (111 shown, 38 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 164 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ef009737`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- visitor-session.e2e-spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- tokens.service.spec.ts
- env.schema.ts
- compilerOptions
- server/package.json
- ApiKeysService
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
- server-errors.spec.ts
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
- zone.guard.spec.ts
- cli.module.ts
- visitor-session.controller.ts
- tsconfig.build.json
- zod-validation.spec.ts
- config.module.ts
- nest-cli.json
- api.module.ts
- ProjectsRepository
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- identity-key-commands.e2e-spec.ts
- log-redaction.spec.ts
- logger.module.ts
- database.module.ts
- operators.service.ts
- http-error.filter.spec.ts
- log-settings.e2e-spec.ts
- TokensService
- api-app.ts
- protocol/src/index.ts
- typeorm
- ProjectCreateCommand
- api-keys.service.ts
- migrate-mode.e2e-spec.ts
- participant.entity.spec.ts
- test-secrets.ts
- IdentityKey
- ref_node_crypto
- migrate.module.ts
- operator-role.guard.spec.ts
- cli-runner.ts
- encryption.service.spec.ts
- OperationSteps
- server-key-guard.e2e-spec.ts
- config-startup.e2e-spec.ts
- .create
- server-protocol.e2e-spec.ts
- projects.service.ts
- encrypted-secret.spec.ts
- request-context.ts
- main.ts
- telemetry.interceptor.spec.ts
- conversation.entity.ts
- packages-build.e2e-spec.ts
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
- writeLine
- zone.ts
- Message
- encryption-keys.schema.spec.ts
- SecretsReencryptionService
- ApiKey
- findFreePort
- nest-commander
- global-setup.ts
- cli-mode.e2e-spec.ts
- operator-guard-probe.ts
- worker.module.ts
- projects-table.e2e-spec.ts
- JsonObjectValidator
- visitor-auth.guard.ts
- identity-key-pem.ts
- Zone
- origin-cli.ts
- test-database.ts
- database-migrations.spec.ts
- ref_node_path
- CreateProjects1793193549883
- project-cli.ts
- InternalProbeController
- @nestjs/common
- CreateApiKeys1793300000000
- AddProjectsPublicKey1793300002000
- @nestjs/microservices@^12.1.3
- operator-token.controller.ts
- @nestjs/swagger
- @nestjs/websockets@^12.1.3
- log-redaction.e2e-spec.ts
- RedactionProbeController
- pino-http
- identity-keys.e2e-spec.ts
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- vite@catalog:
- TestTokenSigningConfigModule
- tokens.service.ts
- RolesProbeController
- Zone
- @aws-sdk/s3-request-presigner@^3.1151.0
- @nest-lab/throttler-storage-redis@^1.2.0
- slow-operations.spec.ts
- cache-manager@^7.2.9
- @nestjs/cache-manager@^12.0.1
- @nestjs/throttler@^6.7.1
- zod-serialization.spec.ts
- secrets-reencryption.service.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 141 edges
2. `typeorm` - 61 edges
3. `Zone()` - 54 edges
4. `Project` - 45 edges
5. `@nestjs/testing` - 38 edges
6. `useTestDatabase()` - 38 edges
7. `ProjectsService` - 35 edges
8. `createProject()` - 33 edges
9. `RequestContext` - 31 edges
10. `OperationSteps` - 29 edges

## Surprising Connections (you probably didn't know these)
- `RequestOperator` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/infra/request-context/request-context.ts → packages/protocol/src/operator-role.ts
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

## Communities (149 total, 38 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.14
Nodes (5): DatabaseMigration, CreateAuditLog1793200000000, AddConversationIndexes1793215983154, CreateIdentityKeys1793300001000, CreateOperators1793300003000

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "visitor-session.e2e-spec.ts"
Cohesion: 0.08
Nodes (31): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+23 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "tokens.service.spec.ts"
Cohesion: 0.12
Nodes (28): VisitorAuthModule, encodePart(), flipSignatureBit(), ForgedTokenInput, forgeToken(), forgeUnsecuredToken(), parseTestSigningKeys(), replaceHeader() (+20 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.06
Nodes (25): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+17 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "server/package.json"
Cohesion: 0.09
Nodes (21): author, bin, sowa-chat, @aws-sdk/client-s3@^3.1151.0, file-type@^22.1.1, @nestjs/platform-socket.io@^12.1.3, sharp@^0.35.5, socket.io@^4.8.4 (+13 more)

### Community 10 - "ApiKeysService"
Cohesion: 0.16
Nodes (3): KeyRevokeCommand, ApiKeysService, toEvent()

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

### Community 22 - "server-errors.spec.ts"
Cohesion: 0.09
Nodes (21): OperatorDisabledFilter, OperatorDisabledError, ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ApiExceptionInput (+13 more)

### Community 23 - "RequestContext"
Cohesion: 0.10
Nodes (6): VisitorController(), RequestContext, GuardProbeController, OperatorGuardProbeController, VisitorGuardProbeController, visitorProbePath

### Community 24 - "AuditLogEntry"
Cohesion: 0.16
Nodes (9): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns, ProjectFixture (+1 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.09
Nodes (8): listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand, OriginListCommand, OriginRemoveCommand, ProjectsService

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - "visitor-session.entity.spec.ts"
Cohesion: 0.08
Nodes (10): Visitor, columns(), expectedColumns, findColumn(), findRelation(), normalizeSql(), relations(), runMigration() (+2 more)

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+2 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.06
Nodes (36): ColumnRow, ForeignKeyRow, IndexRow, tableNames, IndexRow, PlanRow, countRows(), createChannel() (+28 more)

### Community 32 - "key-format.ts"
Cohesion: 0.14
Nodes (14): KeyRevokeOptions, base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62() (+6 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "cli.module.ts"
Cohesion: 0.08
Nodes (6): IdentityKeyListCommand, KeyCreateCommand, KeyListCommand, KeysModule, ProjectsModule, AppClsModule

### Community 35 - "visitor-session.controller.ts"
Cohesion: 0.06
Nodes (19): VisitorApiModule, toVisitorSessionResponse(), VisitorSessionController, VisitorSessionRefreshRequestDto, VisitorSessionRequestDto, VisitorSessionResponseDto, VisitorSessionsRepository, VisitorSessionsService (+11 more)

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
Cohesion: 0.06
Nodes (35): ApiModule, DatabaseModule, DependencyStatusBody, StatusBody, LogDestination, findZonePorts(), probeControllers, startListening() (+27 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.30
Nodes (14): runCliInProcess(), addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem(), identityKeyListHeader, listIdentityKeys(), PemWriter (+6 more)

### Community 46 - "log-redaction.spec.ts"
Cohesion: 0.15
Nodes (10): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+2 more)

### Community 47 - "logger.module.ts"
Cohesion: 0.20
Nodes (15): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+7 more)

### Community 48 - "database.module.ts"
Cohesion: 0.25
Nodes (9): databaseMigrations, createTypeOrmModule(), getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity (+1 more)

### Community 49 - "operators.service.ts"
Cohesion: 0.09
Nodes (9): Operator, OperatorsService, operatorTokenTtlSeconds, input, Probe, signedToken, ColumnRow, ConstraintRow (+1 more)

### Community 50 - "http-error.filter.spec.ts"
Cohesion: 0.14
Nodes (12): ApiHttpModule, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter (+4 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "TokensService"
Cohesion: 0.12
Nodes (3): OperatorAuthGuard, TokenConsumer, TokensService

### Community 53 - "api-app.ts"
Cohesion: 0.15
Nodes (14): configureApiApp(), useClsMiddleware(), setupApiDocs(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError() (+6 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.06
Nodes (29): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, defaultLimits, isAccepted() (+21 more)

### Community 55 - "typeorm"
Cohesion: 0.08
Nodes (18): database, loadDataSource(), databaseEntities, channelColumns(), findColumn(), Project, NewProject, ORIGIN_COLUMNS (+10 more)

### Community 57 - "api-keys.service.ts"
Cohesion: 0.19
Nodes (8): ApiKeyKind, NewApiKey, hashMatches(), IssueApiKeyBaseInput, keyTypeByKind, RevokeApiKeyInput, toSummary(), VerifiedApiKey

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 59 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "IdentityKey"
Cohesion: 0.07
Nodes (12): IdentityKeyRevokeCommand, IdentityKeyRevokeOptions, KeyActorKind, IdentityKey, IdentityKeysRepository, AddIdentityKeyInput, IdentityKeyKidTakenError, IdentityKeysService (+4 more)

### Community 62 - "ref_node_crypto"
Cohesion: 0.48
Nodes (3): hashKey(), generateRefreshToken(), visitorAccessTokenTtlSeconds

### Community 63 - "migrate.module.ts"
Cohesion: 0.20
Nodes (4): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps

### Community 64 - "operator-role.guard.spec.ts"
Cohesion: 0.16
Nodes (8): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey

### Community 65 - "cli-runner.ts"
Cohesion: 0.27
Nodes (6): cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, runCli()

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.14
Nodes (13): authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService, SecretDecryptionError, captureError() (+5 more)

### Community 67 - "OperationSteps"
Cohesion: 0.11
Nodes (10): DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationSteps, OperationStepsProbeController, beginOperation(), operationTimingKey (+2 more)

### Community 68 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.33
Nodes (6): changeBodyChar(), forgeWithValidChecksum(), getProbe(), replaceChar(), withKey(), zoneAgent()

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - ".create"
Cohesion: 0.16
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.31
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "projects.service.ts"
Cohesion: 0.06
Nodes (46): addOriginTo(), describeAdd(), describeRemove(), OriginOptions, ProjectOptions, removeOriginFrom(), IssueApiKeyInput, IssuedApiKey (+38 more)

### Community 73 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 74 - "request-context.ts"
Cohesion: 0.15
Nodes (5): RequestContextModule, RequestOperator, RequestVisitor, ConsumerModule, ContextConsumer

### Community 75 - "main.ts"
Cohesion: 0.21
Nodes (9): createContext(), mode, runApi(), runMigrate(), runners, runWorker(), useAppLogger(), MigrateModule (+1 more)

### Community 76 - "telemetry.interceptor.spec.ts"
Cohesion: 0.09
Nodes (10): HttpMetrics, StepTimes, FinishedOperation, roundSteps(), SlowOperations, readMetricLines(), TelemetryProbeController, zoneUrl() (+2 more)

### Community 77 - "conversation.entity.ts"
Cohesion: 0.07
Nodes (21): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEvent, ConversationEventActorKind, conversationEventActorKinds (+13 more)

### Community 78 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 79 - "project-cli.ts"
Cohesion: 0.29
Nodes (16): toLookupPrefix(), auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix(), listKeys() (+8 more)

### Community 80 - "health.module.ts"
Cohesion: 0.06
Nodes (20): ioredis@^6.0.0, @nestjs/terminus@^12.1.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController (+12 more)

### Community 81 - "operators.service.ts"
Cohesion: 0.09
Nodes (12): ServerApiModule, DisabledOperators, Probe, OperatorTokenClaims, operatorTokenClaimsSchema, OperatorsModule, OperatorProfile, OperatorsRepository (+4 more)

### Community 82 - "IdentityKeyAddCommand"
Cohesion: 0.21
Nodes (3): IdentityKeyAddCommand, IdentityKeyAddOptions, readPem()

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "conversation.entity.spec.ts"
Cohesion: 0.16
Nodes (7): Channel, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 85 - "api-keys-service-probe.ts"
Cohesion: 0.26
Nodes (11): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+3 more)

### Community 87 - "audited-events.spec.ts"
Cohesion: 0.13
Nodes (12): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+4 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "writeLine"
Cohesion: 0.08
Nodes (27): emptyCell, formatDate(), serverKeyOnceWarning, writeLine(), writeTable(), writeWarning(), header, IdentityKeyListOptions (+19 more)

### Community 90 - "zone.ts"
Cohesion: 0.09
Nodes (19): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), zonePathPrefixes, InternalProbeController (+11 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 95 - "findFreePort"
Cohesion: 0.13
Nodes (14): AppConfigModule, fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), fetchStatus() (+6 more)

### Community 96 - "nest-commander"
Cohesion: 0.29
Nodes (3): KeyCreateOptions, KeyGenerateCommand, nest-commander

### Community 97 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "operator-guard-probe.ts"
Cohesion: 0.14
Nodes (11): DisabledProbeController, issueOperator(), getProbe(), issueOperator(), withToken(), publicKeyPemBytes(), publicKeyRawBytes(), IssuedOperator (+3 more)

### Community 100 - "worker.module.ts"
Cohesion: 0.08
Nodes (24): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditModule, auditedEventNames(), AuditRule (+16 more)

### Community 102 - "JsonObjectValidator"
Cohesion: 0.28
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 103 - "visitor-auth.guard.ts"
Cohesion: 0.11
Nodes (6): ServerKeyGuard, VisitorAuthGuard, VisitorTokenClaims, visitorTokenClaimsSchema, bearerToken(), FakeRequestInput

### Community 104 - "identity-key-pem.ts"
Cohesion: 0.19
Nodes (11): IdentityKeyAlgorithm, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey(), readPublicKeyObject(), captureError() (+3 more)

### Community 105 - "Zone"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 106 - "origin-cli.ts"
Cohesion: 0.22
Nodes (11): badOrigins, helpEntries, prefixes, CliRunResult, addOrigins(), OriginAction, OriginCommandOptions, originGroups (+3 more)

### Community 107 - "test-database.ts"
Cohesion: 0.19
Nodes (9): apiKeyKinds, identityKeyAlgorithms, ColumnRow, expectedColumns, ColumnRow, expectedColumns, jwk, truncateAllTables() (+1 more)

### Community 109 - "ref_node_path"
Cohesion: 0.14
Nodes (9): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, IdentityRow, VersionRow, useTestRedis(), redisUrl() (+1 more)

### Community 111 - "project-cli.ts"
Cohesion: 0.28
Nodes (8): buildServer(), fullOriginArguments, listHeader, onceWarning, repositoryRoot, runMainCli(), serverDirectory, uuidPattern

### Community 112 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 115 - "@nestjs/common"
Cohesion: 0.09
Nodes (12): OperatorAuthModule, ServerAuthModule, TokensModule, HttpLabel, HttpRequestRecord, labelNames, MetricsController, MetricsModule (+4 more)

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.17
Nodes (5): nestjs-zod@^5.5.0, OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, nestjs-zod

### Community 126 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 127 - "RedactionProbeController"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 129 - "identity-keys.e2e-spec.ts"
Cohesion: 0.28
Nodes (12): expectNoKeyRows(), expectNoRows(), addKey(), createProjectWithKey(), createProject(), auditRows(), auditRowsByAction(), identityKeyRows() (+4 more)

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 136 - "tokens.service.ts"
Cohesion: 0.23
Nodes (11): parseEntry(), parseKeys(), parsePrivateKey(), reject(), TokenSigningKey, tokenSigningKeysSchema, SignedToken, SignTokenInput (+3 more)

### Community 138 - "Zone"
Cohesion: 0.06
Nodes (19): OperatorController(), ServerController(), NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController, BodyProbeController, calls (+11 more)

### Community 147 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 150 - "secrets-reencryption.service.ts"
Cohesion: 0.12
Nodes (14): CryptoModule, encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldResult, FieldVersionCount, ReencryptInput (+6 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 981 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **38 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `visitor-session.e2e-spec.ts`, `tokens.service.spec.ts`, `tokens.service.ts`, `server/package.json`, `Zone`, `dependencies`, `zod-serialization.spec.ts`, `server-errors.spec.ts`, `secrets-reencryption.service.ts`, `AuditLogEntry`, `RequestContext`, `key-format.ts`, `zone.guard.spec.ts`, `cli.module.ts`, `visitor-session.controller.ts`, `config.module.ts`, `api.module.ts`, `log-redaction.spec.ts`, `logger.module.ts`, `database.module.ts`, `http-error.filter.spec.ts`, `api-app.ts`, `typeorm`, `api-keys.service.ts`, `IdentityKey`, `ref_node_crypto`, `migrate.module.ts`, `operator-role.guard.spec.ts`, `cli-runner.ts`, `encryption.service.spec.ts`, `OperationSteps`, `server-key-guard.e2e-spec.ts`, `projects.service.ts`, `request-context.ts`, `main.ts`, `telemetry.interceptor.spec.ts`, `health.module.ts`, `operators.service.ts`, `IdentityKeyAddCommand`, `writeLine`, `zone.ts`, `nest-commander`, `operator-guard-probe.ts`, `worker.module.ts`, `visitor-auth.guard.ts`, `Zone`, `operator-token.controller.ts`, `RedactionProbeController`?**
  _High betweenness centrality (0.246) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13725490196078433 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `identity-keys.e2e-spec.ts`, `visitor-session.e2e-spec.ts`, `server/package.json`, `dependencies`, `AuditLogEntry`, `visitor-session.entity.spec.ts`, `chat-tables.e2e-spec.ts`, `database.module.ts`, `migrate-mode.e2e-spec.ts`, `participant.entity.spec.ts`, `test-secrets.ts`, `OperationSteps`, `projects.service.ts`, `conversation.entity.ts`, `project-cli.ts`, `operators.service.ts`, `conversation.entity.spec.ts`, `CreateChatTables1793215389271`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `findFreePort`, `operator-guard-probe.ts`, `projects-table.e2e-spec.ts`, `origin-cli.ts`, `test-database.ts`, `ref_node_path`, `CreateProjects1793193549883`, `CreateApiKeys1793300000000`, `AddProjectsPublicKey1793300002000`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `api.module.ts` to `identity-keys.e2e-spec.ts`, `devDependencies`, `tokens.service.spec.ts`, `server/package.json`, `AuditLogEntry`, `key-format.ts`, `config.module.ts`, `logger.module.ts`, `operators.service.ts`, `api-app.ts`, `typeorm`, `test-secrets.ts`, `encryption.service.spec.ts`, `OperationSteps`, `projects.service.ts`, `request-context.ts`, `project-cli.ts`, `operators.service.ts`, `api-keys-service-probe.ts`, `findFreePort`, `worker.module.ts`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `visitor-session.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07619738751814223 - nodes in this community are weakly interconnected._