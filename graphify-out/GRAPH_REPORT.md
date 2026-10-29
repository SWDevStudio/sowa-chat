# Graph Report - hector-chat-epic-14  (2026-10-29)

## Corpus Check
- 374 files · ~92,522 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2634 nodes · 6205 edges · 142 communities (107 shown, 35 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 160 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `035b0106`
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
- cache-invalidation-rules.ts
- OperationSteps
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
- body-limit.ts
- @nestjs/testing
- scripts
- Option
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- server-key-guard.e2e-spec.ts
- MixedZoneController
- ConversationEvent
- migrate.module.ts
- tsconfig.build.json
- ValidationProbeController
- config.module.ts
- nest-cli.json
- @nestjs/testing
- database-entities.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- test-database.ts
- telemetry.interceptor.ts
- logger.module.ts
- Project
- key-cli.ts
- writeLine
- log-settings.e2e-spec.ts
- projects.service.ts
- operator-auth.guard.ts
- protocol/src/index.ts
- log-redaction.spec.ts
- ProjectCreateCommand
- security-headers.spec.ts
- migrate-mode.e2e-spec.ts
- project-snapshot-cache.e2e-spec.ts
- test-secrets.ts
- audit-log.e2e-spec.ts
- conversation.entity.spec.ts
- api-keys-service-probe.ts
- RequestContext
- projects-service.e2e-spec.ts
- encryption.service.spec.ts
- metrics.controller.ts
- IdentityKey
- config-startup.e2e-spec.ts
- identity-keys.service.ts
- server-protocol.e2e-spec.ts
- origin.ts
- @nestjs/common
- redis.module.ts
- request-id.spec.ts
- participant.entity.spec.ts
- conversation.entity.ts
- main.ts
- server-errors.spec.ts
- health.module.ts
- operators.e2e-spec.ts
- operation-steps.ts
- workspace-check-types.e2e-spec.ts
- operator-auth-guard.e2e-spec.ts
- global-setup.ts
- CreateChatTables1793215389271
- audited-events.spec.ts
- secrets-reencrypt-command.e2e-spec.ts
- secrets-reencrypt.command.ts
- zone.ts
- Message
- HttpMetrics
- SecretsReencryptionService
- api-keys.service.ts
- telemetry.interceptor.spec.ts
- log-redaction.e2e-spec.ts
- body-limit.spec.ts
- cli-mode.e2e-spec.ts
- identity-key-pem.ts
- JsonObjectValidator
- zod-serialization.spec.ts
- ZonedController
- IdentityKeyListCommand
- env.schema.logging.spec.ts
- api-docs.spec.ts
- SlowProbeController
- key-list.command.ts
- operators.service.ts
- ref_node_path
- server/package.json
- DatabaseStepSubscriber
- api-versioning.spec.ts
- KeyRevokeCommand
- domain-event-bus.spec.ts
- OperationStepsProbeController
- secrets-reencryption.service.ts
- operator-token.controller.ts
- RedisModule
- encryption-keys.schema.spec.ts
- @nest-lab/throttler-storage-redis@^1.2.0
- project-list.command.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- @nestjs/swagger
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- @nestjs/bullmq@^12.0.0
- cli-output.ts
- @nestjs/throttler@^6.7.1
- reflect-metadata@^0.2.2
- rxjs
- sharp@^0.35.5
- pino-pretty@^13.2.0
- @nestjs/platform-socket.io@^12.1.3
- ZoneServers

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 134 edges
2. `typeorm` - 55 edges
3. `Zone()` - 50 edges
4. `Project` - 47 edges
5. `@nestjs/testing` - 44 edges
6. `ProjectsService` - 40 edges
7. `useTestDatabase()` - 36 edges
8. `DomainEventBus` - 35 edges
9. `ApiKeysService` - 29 edges
10. `createProject()` - 29 edges

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

## Communities (142 total, 35 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.06
Nodes (21): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createTypeOrmModule(), getTypeOrmModule(), createDataSourceOptions(), DatabaseConnection (+13 more)

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
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, socket.io-client@catalog:, source-map-support@^0.5.21, supertest@^7.0.0 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "tokens.service.spec.ts"
Cohesion: 0.06
Nodes (45): jose@^6.2.12, identityKeyAlgorithms, parseEntry(), parseKeys(), parsePrivateKey(), reject(), TokenSigningKey, tokenSigningKeysSchema (+37 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (21): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "cache-invalidation-rules.ts"
Cohesion: 0.18
Nodes (10): apiKeyCacheKeys(), cacheInvalidatedEventNames(), CacheInvalidationRule, cacheInvalidationRules, projectCacheKeys(), apiKeyEvent, projectEvent, LocalCacheInvalidation (+2 more)

### Community 10 - "OperationSteps"
Cohesion: 0.17
Nodes (3): OperationStep, OperationSteps, GuardProbeController

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (30): dependencies, bullmq@^6.3.15, cache-manager@^7.2.9, nest-commander@^3.21.0, @nestjs/cache-manager@^12.0.1, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1 (+22 more)

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

### Community 23 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 24 - "@nestjs/testing"
Cohesion: 0.09
Nodes (17): AppCacheModule, apiKeyEvent, projectEvent, DomainEventBus, SlowOperationsModule, TelemetryModule, WorkerModule, expectNoKeyRows() (+9 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "Option"
Cohesion: 0.08
Nodes (15): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand (+7 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.19
Nodes (10): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+2 more)

### Community 28 - ".create"
Cohesion: 0.14
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.07
Nodes (30): Channel, channelColumns(), findColumn(), ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows() (+22 more)

### Community 32 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.11
Nodes (20): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+12 more)

### Community 33 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "migrate.module.ts"
Cohesion: 0.17
Nodes (5): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "config.module.ts"
Cohesion: 0.26
Nodes (14): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+6 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "@nestjs/testing"
Cohesion: 0.12
Nodes (19): DependencyStatusBody, StatusBody, LogDestination, findZonePorts(), probeControllers, offlineDataSource, withOfflineDatabase(), offlineRedis (+11 more)

### Community 41 - "database-entities.ts"
Cohesion: 0.48
Nodes (3): database, loadDataSource(), databaseEntities

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "test-database.ts"
Cohesion: 0.09
Nodes (17): apiKeyKinds, issueServerKey(), ColumnRow, expectedColumns, IndexRow, PlanRow, createOperator(), createProjectWithKey() (+9 more)

### Community 46 - "telemetry.interceptor.ts"
Cohesion: 0.23
Nodes (6): operationSteps, OperationTiming, StepTimes, FinishedOperation, roundSteps(), SlowOperations

### Community 47 - "logger.module.ts"
Cohesion: 0.22
Nodes (13): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+5 more)

### Community 48 - "Project"
Cohesion: 0.11
Nodes (9): Project, columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor, ProjectFixture (+1 more)

### Community 49 - "key-cli.ts"
Cohesion: 0.08
Nodes (56): toLookupPrefix(), hashKey(), addKey(), badOrigins, helpEntries, prefixes, CliRunResult, runCliInProcess() (+48 more)

### Community 50 - "writeLine"
Cohesion: 0.15
Nodes (9): serverKeyOnceWarning, writeLine(), writeWarning(), KeyCreateCommand, KeyCreateOptions, KeyGenerateCommand, KeyRevokeOptions, ProjectCreateOptions (+1 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "projects.service.ts"
Cohesion: 0.20
Nodes (8): InvalidProjectNameError, ProjectAlreadyExistsError, ProjectNotFoundError, createProjectsServiceProbe(), issuedServerKey, projectRow(), ProjectsServiceProbe, runWithoutTransaction()

### Community 53 - "operator-auth.guard.ts"
Cohesion: 0.13
Nodes (9): OperatorAuthGuard, OperatorDisabledFilter, ServerKeyGuard, ApiException, ApiExceptionInput, ErrorDetail, bearerToken(), FakeRequestInput (+1 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.07
Nodes (29): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, defaultLimits, isAccepted() (+21 more)

### Community 55 - "log-redaction.spec.ts"
Cohesion: 0.20
Nodes (10): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+2 more)

### Community 57 - "security-headers.spec.ts"
Cohesion: 0.21
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.13
Nodes (18): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), BrokenMigration1700000000000, countMigrationRows() (+10 more)

### Community 59 - "project-snapshot-cache.e2e-spec.ts"
Cohesion: 0.13
Nodes (14): OriginList, originLists, ProjectSnapshot, toProjectSnapshot(), ProjectsRepository, ChangeOriginInput, CreatedProject, ORIGINS_EVENTS (+6 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "audit-log.e2e-spec.ts"
Cohesion: 0.08
Nodes (20): ActorKind, actorKinds, AuditLogEntry, AuditLogListener, eventValues, happened, personalValues, AuditLogRepository (+12 more)

### Community 62 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 63 - "api-keys-service-probe.ts"
Cohesion: 0.26
Nodes (11): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+3 more)

### Community 64 - "RequestContext"
Cohesion: 0.07
Nodes (12): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey (+4 more)

### Community 65 - "projects-service.e2e-spec.ts"
Cohesion: 0.13
Nodes (17): IssueApiKeyInput, CreateProjectInput, columns, createMain(), emptyLists, eventNames, listRow(), lists (+9 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.08
Nodes (22): encryptionConfig, CryptoModule, authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext (+14 more)

### Community 67 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "identity-keys.service.ts"
Cohesion: 0.06
Nodes (17): IdentityKeyAddCommand, IdentityKeyAddOptions, readPem(), IdentityKeyRevokeCommand, IdentityKeyRevokeOptions, KeyActorKind, IdentityKeyAlgorithm, ParsedIdentityKey (+9 more)

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "origin.ts"
Cohesion: 0.22
Nodes (6): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl()

### Community 73 - "@nestjs/common"
Cohesion: 0.08
Nodes (19): OperatorAuthModule, ServerApiModule, ServerAuthModule, KeysModule, OperatorsModule, ProjectsModule, NewProject, ORIGIN_COLUMNS (+11 more)

### Community 74 - "redis.module.ts"
Cohesion: 0.14
Nodes (15): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), fetchStatus(), repositoryRoot (+7 more)

### Community 75 - "request-id.spec.ts"
Cohesion: 0.15
Nodes (10): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+2 more)

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "conversation.entity.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 78 - "main.ts"
Cohesion: 0.08
Nodes (26): configureApiApp(), ApiModule, cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, useClsMiddleware() (+18 more)

### Community 79 - "server-errors.spec.ts"
Cohesion: 0.08
Nodes (26): errorCodeStatuses, errorCodeByStatus, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse(), validationErrorResponse() (+18 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 81 - "operators.e2e-spec.ts"
Cohesion: 0.12
Nodes (4): DisabledOperators, Probe, OperatorIdRow, OperatorsRepository

### Community 82 - "operation-steps.ts"
Cohesion: 0.40
Nodes (3): beginOperation(), operationTimingKey, nestjs-cls

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.11
Nodes (19): OperatorController(), OperatorProfile, IssueOperatorTokenInput, RequestOperator, DisabledProbeController, issueOperator(), getProbe(), issueOperator() (+11 more)

### Community 85 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 87 - "audited-events.spec.ts"
Cohesion: 0.11
Nodes (16): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+8 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "secrets-reencrypt.command.ts"
Cohesion: 0.16
Nodes (11): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+3 more)

### Community 90 - "zone.ts"
Cohesion: 0.08
Nodes (25): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes (+17 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 94 - "api-keys.service.ts"
Cohesion: 0.06
Nodes (17): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey, ApiKeysService, CachedApiKey, hashMatches(), IssueApiKeyBaseInput (+9 more)

### Community 95 - "telemetry.interceptor.spec.ts"
Cohesion: 0.10
Nodes (8): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, readMetricLines(), TelemetryProbeController, zoneUrl(), ZoneProbeApp

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), parseLogLine() (+2 more)

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "identity-key-pem.ts"
Cohesion: 0.27
Nodes (7): algorithmOf(), InvalidIdentityKeyError, isP256(), parseIdentityPublicKey(), readPublicKeyObject(), captureError(), expectInvalidKey()

### Community 100 - "JsonObjectValidator"
Cohesion: 0.30
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 101 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 104 - "env.schema.logging.spec.ts"
Cohesion: 0.33
Nodes (3): Env, logLevels, requiredEnv

### Community 105 - "api-docs.spec.ts"
Cohesion: 0.11
Nodes (15): ServerController(), controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController (+7 more)

### Community 106 - "SlowProbeController"
Cohesion: 0.24
Nodes (3): LogEntry, pause(), SlowProbeController

### Community 107 - "key-list.command.ts"
Cohesion: 0.22
Nodes (5): header, KeyListCommand, KeyListOptions, toRow(), ApiKeySummary

### Community 108 - "operators.service.ts"
Cohesion: 0.06
Nodes (19): Operator, OperatorTokenClaims, operatorTokenClaimsSchema, ChangeOperatorBlockInput, IssuedOperatorToken, OperatorActorKind, OperatorBlockChange, OperatorBlockEventName (+11 more)

### Community 109 - "ref_node_path"
Cohesion: 0.10
Nodes (15): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, builtFiles, CommandResult, entriesByPackage, plannedBuildTasks() (+7 more)

### Community 110 - "server/package.json"
Cohesion: 0.09
Nodes (21): author, bin, sowa-chat, @aws-sdk/client-s3@^3.1151.0, file-type@^22.1.1, helmet@^8.3.0, @nestjs/microservices@^12.1.3, pino-http@^11.0.0 (+13 more)

### Community 112 - "api-versioning.spec.ts"
Cohesion: 0.25
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 120 - "domain-event-bus.spec.ts"
Cohesion: 0.29
Nodes (7): happened, TestListener, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 122 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldResult, ReencryptInput, reencryptionBatchSize, ReencryptionReport (+3 more)

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.23
Nodes (4): OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, nestjs-zod

### Community 125 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 127 - "project-list.command.ts"
Cohesion: 0.27
Nodes (5): writeTable(), formatOrigins(), header, ProjectListCommand, toRow()

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 134 - "cli-output.ts"
Cohesion: 0.29
Nodes (5): emptyCell, formatDate(), header, IdentityKeyListOptions, toRow()

### Community 152 - "ZoneServers"
Cohesion: 0.22
Nodes (3): startListening(), stopListening(), ZoneServers

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 963 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `log-level-warn.spec.ts`, `cli-output.ts`, `tokens.service.spec.ts`, `cache-invalidation-rules.ts`, `dependencies`, `body-limit.ts`, `@nestjs/testing`, `Option`, `server-key-guard.e2e-spec.ts`, `migrate.module.ts`, `config.module.ts`, `@nestjs/testing`, `test-database.ts`, `telemetry.interceptor.ts`, `logger.module.ts`, `writeLine`, `operator-auth.guard.ts`, `log-redaction.spec.ts`, `security-headers.spec.ts`, `project-snapshot-cache.e2e-spec.ts`, `audit-log.e2e-spec.ts`, `RequestContext`, `encryption.service.spec.ts`, `metrics.controller.ts`, `identity-keys.service.ts`, `redis.module.ts`, `request-id.spec.ts`, `main.ts`, `server-errors.spec.ts`, `health.module.ts`, `operators.e2e-spec.ts`, `operation-steps.ts`, `operator-auth-guard.e2e-spec.ts`, `secrets-reencrypt.command.ts`, `zone.ts`, `api-keys.service.ts`, `telemetry.interceptor.spec.ts`, `body-limit.spec.ts`, `zod-serialization.spec.ts`, `api-docs.spec.ts`, `SlowProbeController`, `key-list.command.ts`, `operators.service.ts`, `server/package.json`, `api-versioning.spec.ts`, `domain-event-bus.spec.ts`, `secrets-reencryption.service.ts`, `operator-token.controller.ts`, `project-list.command.ts`?**
  _High betweenness centrality (0.268) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.061683599419448475 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `database-migrations.ts` to `dependencies`, `@nestjs/testing`, `chat-tables.e2e-spec.ts`, `ConversationEvent`, `database-entities.ts`, `test-database.ts`, `Project`, `key-cli.ts`, `migrate-mode.e2e-spec.ts`, `test-secrets.ts`, `conversation.entity.spec.ts`, `projects-service.e2e-spec.ts`, `@nestjs/common`, `participant.entity.spec.ts`, `conversation.entity.ts`, `operators.e2e-spec.ts`, `operation-steps.ts`, `operator-auth-guard.e2e-spec.ts`, `CreateChatTables1793215389271`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `ref_node_path`, `server/package.json`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `api-docs.spec.ts` to `body-limit.spec.ts`, `ServerErrorsProbeController`, `MixedZoneController`, `ErrorProbeController`, `zod-serialization.spec.ts`, `ValidationProbeController`, `ZonedController`, `@nestjs/testing`, `metrics.controller.ts`, `ResponseProbeController`, `server-errors.spec.ts`, `api-versioning.spec.ts`, `health.module.ts`, `operator-auth-guard.e2e-spec.ts`, `security-headers.spec.ts`, `zone.ts`, `telemetry.interceptor.spec.ts`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._