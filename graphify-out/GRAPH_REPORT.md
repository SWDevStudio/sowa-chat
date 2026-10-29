# Graph Report - hector-chat-epic-14  (2026-10-29)

## Corpus Check
- 389 files · ~96,562 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .log 1)

## Summary
- 2713 nodes · 6466 edges · 152 communities (123 shown, 29 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 167 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8b621e11`
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
- DomainEventBus
- server-key-guard.e2e-spec.ts
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
- RedactionProbeController
- api-app.ts
- identity-keys.e2e-spec.ts
- scripts
- Option
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- key-format.ts
- zone.guard.spec.ts
- ConversationEvent
- migrate.module.ts
- tsconfig.build.json
- ValidationProbeController
- config.module.ts
- nest-cli.json
- @nestjs/testing
- @nestjs/common
- server-sdk/tsconfig.json
- ResponseProbeController
- test-database.ts
- protocol/src/index.ts
- logger.module.ts
- Project
- key-cli.ts
- writeLine
- log-settings.e2e-spec.ts
- projects-service-probe.ts
- operator-auth.guard.ts
- json-object-limits.spec.ts
- log-redaction.spec.ts
- ProjectCreateCommand
- operators.service.ts
- findFreePort
- projects-service.e2e-spec.ts
- test-secrets.ts
- audit-log.e2e-spec.ts
- conversation.entity.spec.ts
- operator-role.guard.spec.ts
- RequestContext
- projects.service.ts
- encryption.service.spec.ts
- metrics.controller.ts
- project-cli.ts
- config-startup.e2e-spec.ts
- identity-keys.service.ts
- server-protocol.e2e-spec.ts
- Project
- operators.module.ts
- redis.module.ts
- request-id.spec.ts
- participant.entity.spec.ts
- conversation.entity.ts
- main.ts
- server-errors.spec.ts
- health.module.ts
- operators.e2e-spec.ts
- OperationSteps
- workspace-check-types.e2e-spec.ts
- operator-auth-guard.e2e-spec.ts
- global-setup.ts
- CreateChatTables1793215389271
- audited-events.spec.ts
- secrets-reencrypt-command.e2e-spec.ts
- secrets-reencrypt.command.ts
- zone.ts
- Message
- telemetry.interceptor.spec.ts
- SecretsReencryptionService
- api-keys.service.ts
- errors.spec.ts
- log-redaction.e2e-spec.ts
- zone-probe.ts
- cli-mode.e2e-spec.ts
- cache-invalidate.controller.spec.ts
- JsonObjectValidator
- JsonObject
- ZonedController
- operators.service.ts
- .getByName
- api-docs.spec.ts
- SlowProbeController
- identity-key-list.command.ts
- operators.service.spec.ts
- ref_node_path
- bin
- TokensService
- api-versioning.spec.ts
- Project
- cache-invalidation-rules.ts
- OperationStepsProbeController
- secrets-reencryption.service.ts
- operator-token.controller.ts
- zone-servers.spec.ts
- encryption-keys.schema.spec.ts
- operator-commands.e2e-spec.ts
- ProjectsService
- @aws-sdk/s3-request-presigner@^3.1151.0
- tokens.service.ts
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- replica-events.e2e-spec.ts
- request-context.ts
- cli-runner.ts
- zone-servers.ts
- test-domain-events.ts
- telemetry.interceptor.spec.ts
- cls-middleware.ts
- IdentityKeysService
- packages-build.e2e-spec.ts
- encryption-keys.schema.ts
- BodyProbeController
- TestEncryptionConfigModule
- @nestjs/bullmq@^12.0.0
- TestTokenSigningConfigModule
- @nestjs/swagger
- @nestjs/websockets@^12.1.3
- sharp@^0.35.5
- socket.io@^4.8.4
- @sowa-chat/protocol@workspace:*

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 142 edges
2. `typeorm` - 56 edges
3. `Zone()` - 50 edges
4. `@nestjs/testing` - 47 edges
5. `Project` - 47 edges
6. `ProjectsService` - 43 edges
7. `useTestDatabase()` - 38 edges
8. `DomainEventBus` - 35 edges
9. `createProject()` - 31 edges
10. `ApiKeysService` - 29 edges

## Surprising Connections (you probably didn't know these)
- `RequestOperator` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/infra/request-context/request-context.ts → packages/protocol/src/operator-role.ts
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

## Communities (152 total, 29 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.07
Nodes (19): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity (+11 more)

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
Nodes (42): author, description, devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0 (+34 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "tokens.service.spec.ts"
Cohesion: 0.15
Nodes (24): encodePart(), flipSignatureBit(), ForgedTokenInput, forgeToken(), forgeUnsecuredToken(), parseTestSigningKeys(), publicKeyPemBytes(), publicKeyRawBytes() (+16 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.06
Nodes (24): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+16 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "DomainEventBus"
Cohesion: 0.16
Nodes (6): apiKeyEvent, projectEvent, DomainEventBus, DomainEventHandler, CacheBusModule, @nestjs/event-emitter

### Community 10 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.26
Nodes (8): ServerController(), changeBodyChar(), forgeWithValidChecksum(), getProbe(), GuardProbeController, replaceChar(), withKey(), zoneAgent()

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.05
Nodes (38): dependencies, @aws-sdk/client-s3@^3.1151.0, bullmq@^6.3.15, cache-manager@^7.2.9, file-type@^22.1.1, helmet@^8.3.0, jose@^6.2.12, nest-commander@^3.21.0 (+30 more)

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

### Community 23 - "api-app.ts"
Cohesion: 0.22
Nodes (12): configureApiApp(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders() (+4 more)

### Community 24 - "identity-keys.e2e-spec.ts"
Cohesion: 0.15
Nodes (16): KeysModule, WorkerModule, expectNoKeyRows(), expectNoRows(), addKey(), blockAuditRows(), blockMethods, createOperator() (+8 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "Option"
Cohesion: 0.13
Nodes (7): listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand, OriginListCommand, OriginRemoveCommand

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (10): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, waitForHttpStatus() (+2 more)

### Community 28 - ".create"
Cohesion: 0.14
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.07
Nodes (29): ColumnRow, ForeignKeyRow, IndexRow, tableNames, IndexRow, PlanRow, countRows(), createChannel() (+21 more)

### Community 32 - "key-format.ts"
Cohesion: 0.17
Nodes (13): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+5 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.09
Nodes (8): Conversation, ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "migrate.module.ts"
Cohesion: 0.17
Nodes (5): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "config.module.ts"
Cohesion: 0.22
Nodes (15): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig (+7 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "@nestjs/testing"
Cohesion: 0.16
Nodes (13): LogDestination, LogEntry, offlineDataSource, withOfflineDatabase(), readyRedis, RedisStub, startRedisStubProbeApp(), createProbeApp() (+5 more)

### Community 41 - "@nestjs/common"
Cohesion: 0.13
Nodes (9): ServerApiModule, ServerAuthModule, AppClsModule, AppConfigModule, ZonesModule, happened, OperationStepsModule, TelemetryModule (+1 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "ResponseProbeController"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 45 - "test-database.ts"
Cohesion: 0.09
Nodes (17): apiKeyKinds, issueServerKey(), ColumnRow, expectedColumns, ColumnRow, expectedColumns, jwk, createProjectWithKey() (+9 more)

### Community 46 - "protocol/src/index.ts"
Cohesion: 0.10
Nodes (15): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, jsonObjectSchema, JsonValue (+7 more)

### Community 47 - "logger.module.ts"
Cohesion: 0.20
Nodes (15): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+7 more)

### Community 48 - "Project"
Cohesion: 0.15
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor

### Community 49 - "key-cli.ts"
Cohesion: 0.26
Nodes (17): toLookupPrefix(), hashKey(), auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix() (+9 more)

### Community 50 - "writeLine"
Cohesion: 0.11
Nodes (13): serverKeyOnceWarning, writeLine(), writeWarning(), IdentityKeyAddOptions, IdentityKeyRevokeOptions, KeyCreateCommand, KeyCreateOptions, KeyGenerateCommand (+5 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "projects-service-probe.ts"
Cohesion: 0.18
Nodes (8): toEvent(), InvalidProjectNameError, ProjectAlreadyExistsError, createProjectsServiceProbe(), issuedServerKey, projectRow(), ProjectsServiceProbe, runWithoutTransaction()

### Community 53 - "operator-auth.guard.ts"
Cohesion: 0.15
Nodes (9): OperatorDisabledFilter, ServerKeyGuard, OperatorDisabledError, ApiException, ApiExceptionInput, ErrorDetail, bearerToken(), FakeRequestInput (+1 more)

### Community 54 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 55 - "log-redaction.spec.ts"
Cohesion: 0.20
Nodes (10): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+2 more)

### Community 57 - "operators.service.ts"
Cohesion: 0.19
Nodes (5): Operator, OperatorIdRow, OperatorProfile, IssueOperatorTokenInput, OperatorRole

### Community 58 - "findFreePort"
Cohesion: 0.09
Nodes (28): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), serverEnvironment() (+20 more)

### Community 59 - "projects-service.e2e-spec.ts"
Cohesion: 0.13
Nodes (18): IssueApiKeyInput, ProjectsModule, columns, createMain(), emptyLists, eventNames, listRow(), lists (+10 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "audit-log.e2e-spec.ts"
Cohesion: 0.14
Nodes (11): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditModule, auditedEventNames(), AuditRule (+3 more)

### Community 62 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 63 - "operator-role.guard.spec.ts"
Cohesion: 0.15
Nodes (10): @nestjs/core@^12.0.1, OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly() (+2 more)

### Community 64 - "RequestContext"
Cohesion: 0.08
Nodes (3): OperatorAuthGuard, RequestContext, ContextConsumer

### Community 65 - "projects.service.ts"
Cohesion: 0.11
Nodes (24): addOriginTo(), describeAdd(), describeRemove(), OriginOptions, ProjectOptions, removeOriginFrom(), ALLOWED_PROTOCOLS, InvalidOriginError (+16 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.10
Nodes (20): CryptoModule, authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv (+12 more)

### Community 67 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 68 - "project-cli.ts"
Cohesion: 0.12
Nodes (33): badOrigins, helpEntries, prefixes, CliRunResult, runCliInProcess(), addEd25519Key(), addIdentityKey(), addP256Key() (+25 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "identity-keys.service.ts"
Cohesion: 0.07
Nodes (20): KeyActorKind, IdentityKey, IdentityKeyAlgorithm, identityKeyAlgorithms, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey (+12 more)

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "Project"
Cohesion: 0.22
Nodes (3): Channel, channelColumns(), findColumn()

### Community 73 - "operators.module.ts"
Cohesion: 0.24
Nodes (4): OperatorAuthModule, DisabledOperatorsModule, OperatorsModule, TokensModule

### Community 74 - "redis.module.ts"
Cohesion: 0.20
Nodes (8): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 75 - "request-id.spec.ts"
Cohesion: 0.31
Nodes (8): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, waitForRequestEntry()

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "conversation.entity.ts"
Cohesion: 0.12
Nodes (16): database, loadDataSource(), databaseEntities, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind (+8 more)

### Community 78 - "main.ts"
Cohesion: 0.14
Nodes (20): @nestjs/microservices@^12.1.3, parseDatabase(), parseUrl(), RedisConnectionOptions, redisTransportOptions(), stripIpv6Brackets(), connectReplicaEvents(), replicaEventsMicroservice (+12 more)

### Community 79 - "server-errors.spec.ts"
Cohesion: 0.09
Nodes (21): errorCodeStatuses, ApiHttpModule, errorCodeByStatus, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse() (+13 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 81 - "operators.e2e-spec.ts"
Cohesion: 0.12
Nodes (3): DisabledOperators, Probe, OperatorsRepository

### Community 82 - "OperationSteps"
Cohesion: 0.10
Nodes (14): nestjs-cls@^7.0.1, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, DatabaseStepSubscriber, OperationStep, operationSteps (+6 more)

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.15
Nodes (11): OperatorController(), DisabledProbeController, issueOperator(), issueOperator(), get(), getAs(), RolesProbeController, IssuedOperator (+3 more)

### Community 85 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 87 - "audited-events.spec.ts"
Cohesion: 0.13
Nodes (16): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+8 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "secrets-reencrypt.command.ts"
Cohesion: 0.19
Nodes (9): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+1 more)

### Community 90 - "zone.ts"
Cohesion: 0.12
Nodes (19): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes (+11 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "telemetry.interceptor.spec.ts"
Cohesion: 0.11
Nodes (7): HttpMetrics, StepTimes, FinishedOperation, SlowOperationsModule, roundSteps(), SlowOperations, TelemetryInterceptor

### Community 94 - "api-keys.service.ts"
Cohesion: 0.06
Nodes (27): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey, ApiKeysService, CachedApiKey, hashMatches(), eventFields (+19 more)

### Community 95 - "errors.spec.ts"
Cohesion: 0.28
Nodes (6): errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 97 - "zone-probe.ts"
Cohesion: 0.11
Nodes (11): DependencyStatusBody, StatusBody, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, offlineRedis, withOfflineRedis() (+3 more)

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "cache-invalidate.controller.spec.ts"
Cohesion: 0.11
Nodes (10): project, snapshot, AppCacheModule, cacheTtlMs, CacheInvalidateController, CacheInvalidateEvent, cacheInvalidateEventSchema, ReplicaEventsModule (+2 more)

### Community 100 - "JsonObjectValidator"
Cohesion: 0.17
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, JsonObjectValidator, Violation, JsonObjectLimits, encoder (+1 more)

### Community 101 - "JsonObject"
Cohesion: 0.15
Nodes (10): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns, ProjectFixture (+2 more)

### Community 103 - "operators.service.ts"
Cohesion: 0.14
Nodes (12): OperatorTokenClaims, operatorTokenClaimsSchema, ChangeOperatorBlockInput, IssuedOperatorToken, OperatorActorKind, OperatorBlockChange, OperatorBlockEventName, operatorTokenTtlSeconds (+4 more)

### Community 104 - ".getByName"
Cohesion: 0.16
Nodes (5): describeDisable(), describeEnable(), OperatorDisableCommand, OperatorEnableCommand, ProjectNotFoundError

### Community 105 - "api-docs.spec.ts"
Cohesion: 0.10
Nodes (16): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+8 more)

### Community 107 - "identity-key-list.command.ts"
Cohesion: 0.08
Nodes (16): emptyCell, formatDate(), writeTable(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow(), header (+8 more)

### Community 108 - "operators.service.spec.ts"
Cohesion: 0.11
Nodes (9): OperatorNotFoundError, OperatorsService, blockInput, BlockProbe, createBlockProbe(), input, Probe, signedToken (+1 more)

### Community 109 - "ref_node_path"
Cohesion: 0.15
Nodes (9): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, databaseUrl(), IdentityRow, VersionRow, useTestRedis() (+1 more)

### Community 110 - "bin"
Cohesion: 0.20
Nodes (6): bin, sowa-chat, @nestjs/platform-socket.io@^12.1.3, @socket.io/redis-adapter@^8.3.0, @nestjs/platform-socket.io, @socket.io/redis-adapter

### Community 111 - "TokensService"
Cohesion: 0.15
Nodes (3): TokenConsumer, TokensService, createService()

### Community 112 - "api-versioning.spec.ts"
Cohesion: 0.11
Nodes (6): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController, ProbeController, ProbeService

### Community 115 - "Project"
Cohesion: 0.18
Nodes (3): Project, ProjectSnapshot, toProjectSnapshot()

### Community 120 - "cache-invalidation-rules.ts"
Cohesion: 0.22
Nodes (10): apiKeyCacheKeys(), cacheInvalidatedEventNames(), CacheInvalidationRule, cacheInvalidationRules, projectCacheKeys(), apiKeyEvent, projectEvent, LocalCacheInvalidation (+2 more)

### Community 122 - "secrets-reencryption.service.ts"
Cohesion: 0.14
Nodes (13): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldReencryption, FieldResult, FieldVersionCount, ReencryptInput (+5 more)

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.20
Nodes (6): nestjs-zod@^5.5.0, OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, OperatorTokenResponse, nestjs-zod

### Community 124 - "zone-servers.spec.ts"
Cohesion: 0.17
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController

### Community 125 - "encryption-keys.schema.spec.ts"
Cohesion: 0.29
Nodes (7): describeErrors(), key1, key1Bytes, key2, key2Bytes, parseKeys(), requiredEnv

### Community 126 - "operator-commands.e2e-spec.ts"
Cohesion: 0.23
Nodes (13): disabledAtOf(), setupOperator(), disabledAtOf(), helpEntries, setupOperator(), OperatorAction, operatorActions, operatorBlockAuditRows() (+5 more)

### Community 129 - "tokens.service.ts"
Cohesion: 0.23
Nodes (11): parseEntry(), parseKeys(), parsePrivateKey(), reject(), TokenSigningKey, tokenSigningKeysSchema, SignedToken, SignTokenInput (+3 more)

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 133 - "replica-events.e2e-spec.ts"
Cohesion: 0.33
Nodes (9): expectKept(), repositoryRoot, seed(), waitUntilDeleted(), cacheInvalidateSubscribers(), cacheOf(), publishCacheInvalidate(), publishRawCacheInvalidate() (+1 more)

### Community 134 - "request-context.ts"
Cohesion: 0.24
Nodes (3): RequestContextModule, RequestOperator, ConsumerModule

### Community 135 - "cli-runner.ts"
Cohesion: 0.28
Nodes (6): cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, runCli()

### Community 136 - "zone-servers.ts"
Cohesion: 0.24
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 137 - "test-domain-events.ts"
Cohesion: 0.29
Nodes (6): TestListener, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 138 - "telemetry.interceptor.spec.ts"
Cohesion: 0.24
Nodes (3): readMetricLines(), TelemetryProbeController, zoneUrl()

### Community 139 - "cls-middleware.ts"
Cohesion: 0.33
Nodes (5): ApiModule, useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp()

### Community 140 - "IdentityKeysService"
Cohesion: 0.10
Nodes (4): IdentityKeyAddCommand, readPem(), IdentityKeyRevokeCommand, IdentityKeysService

### Community 141 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 142 - "encryption-keys.schema.ts"
Cohesion: 0.60
Nodes (5): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject()

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 977 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `tokens.service.ts`, `log-level-warn.spec.ts`, `devDependencies`, `replica-events.e2e-spec.ts`, `request-context.ts`, `cli-runner.ts`, `tokens.service.spec.ts`, `zone-servers.ts`, `server-key-guard.e2e-spec.ts`, `cls-middleware.ts`, `DomainEventBus`, `dependencies`, `telemetry.interceptor.spec.ts`, `api-app.ts`, `identity-keys.e2e-spec.ts`, `zone.guard.spec.ts`, `migrate.module.ts`, `config.module.ts`, `@nestjs/testing`, `ResponseProbeController`, `test-database.ts`, `logger.module.ts`, `writeLine`, `operator-auth.guard.ts`, `log-redaction.spec.ts`, `operators.service.ts`, `audit-log.e2e-spec.ts`, `operator-role.guard.spec.ts`, `projects.service.ts`, `encryption.service.spec.ts`, `metrics.controller.ts`, `identity-keys.service.ts`, `operators.module.ts`, `redis.module.ts`, `request-id.spec.ts`, `main.ts`, `server-errors.spec.ts`, `health.module.ts`, `operators.e2e-spec.ts`, `OperationSteps`, `operator-auth-guard.e2e-spec.ts`, `secrets-reencrypt.command.ts`, `zone.ts`, `telemetry.interceptor.spec.ts`, `api-keys.service.ts`, `zone-probe.ts`, `cache-invalidate.controller.spec.ts`, `JsonObject`, `operators.service.ts`, `api-docs.spec.ts`, `identity-key-list.command.ts`, `api-versioning.spec.ts`, `cache-invalidation-rules.ts`, `secrets-reencryption.service.ts`, `operator-token.controller.ts`, `zone-servers.spec.ts`?**
  _High betweenness centrality (0.267) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06509803921568627 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `database-migrations.ts` to `devDependencies`, `dependencies`, `identity-keys.e2e-spec.ts`, `chat-tables.e2e-spec.ts`, `ConversationEvent`, `@nestjs/common`, `test-database.ts`, `Project`, `key-cli.ts`, `operators.service.ts`, `findFreePort`, `projects-service.e2e-spec.ts`, `test-secrets.ts`, `conversation.entity.spec.ts`, `project-cli.ts`, `identity-keys.service.ts`, `Project`, `participant.entity.spec.ts`, `conversation.entity.ts`, `OperationSteps`, `operator-auth-guard.e2e-spec.ts`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `JsonObject`, `ref_node_path`, `operator-commands.e2e-spec.ts`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `ProjectsService` connect `ProjectsService` to `projects.service.ts`, `cache-invalidate.controller.spec.ts`, `.getByName`, `identity-key-list.command.ts`, `operators.service.spec.ts`, `IdentityKeysService`, `writeLine`, `Project`, `projects-service-probe.ts`, `ProjectCreateCommand`, `identity-keys.e2e-spec.ts`, `projects-service.e2e-spec.ts`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06423034330011074 - nodes in this community are weakly interconnected._