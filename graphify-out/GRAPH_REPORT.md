# Graph Report - hector-chat-epic-13  (2026-10-29)

## Corpus Check
- 386 files · ~94,986 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2739 nodes · 6471 edges · 140 communities (106 shown, 34 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 166 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1b5461c6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- typeorm
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
- worker.module.ts
- AuditLogEntry
- scripts
- origin.commands.ts
- logging.e2e-spec.ts
- visitor-session.controller.ts
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- key-format.ts
- MixedZoneController
- secrets-reencrypt.command.ts
- visitor-session.e2e-spec.ts
- tsconfig.build.json
- zod-validation.spec.ts
- config.module.ts
- nest-cli.json
- @nestjs/common
- ProjectsService
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- useTestDatabase
- unit-probe.ts
- logger.module.ts
- DomainEventBus
- operators.service.ts
- http-error.filter.spec.ts
- log-settings.e2e-spec.ts
- body-limit.ts
- protocol/src/index.ts
- Project
- ProjectCreateCommand
- domain-event-bus.spec.ts
- migrate-mode.e2e-spec.ts
- participant.entity.spec.ts
- test-secrets.ts
- IdentityKey
- metrics.controller.ts
- migrate.module.ts
- RequestContext
- .probe
- encryption.service.spec.ts
- OperationSteps
- origin.ts
- config-startup.e2e-spec.ts
- .create
- server-protocol.e2e-spec.ts
- projects.service.ts
- IdentityKeyRevokeCommand
- request-context.ts
- main.ts
- telemetry.interceptor.spec.ts
- conversation.entity.ts
- packages-build.e2e-spec.ts
- project-cli.ts
- health.module.ts
- DisabledOperators
- IdentityKeyAddCommand
- workspace-check-types.e2e-spec.ts
- conversation.entity.spec.ts
- api-keys-service-probe.ts
- CreateChatTables1793215389271
- audited-events.spec.ts
- secrets-reencrypt-command.e2e-spec.ts
- identity-key-list.command.ts
- api-docs.ts
- Message
- encryption-keys.schema.spec.ts
- SecretsReencryptionService
- ApiKey
- redis-connection.e2e-spec.ts
- cli.module.ts
- global-setup.ts
- cli-mode.e2e-spec.ts
- operator-guard-probe.ts
- audit-log.listener.spec.ts
- conversation-event.entity.spec.ts
- json-object-limits.spec.ts
- visitor-auth.guard.ts
- identity-key-pem.ts
- Zone
- visitor.entity.spec.ts
- ZonedController
- ZoneServers
- ref_node_path
- encryption-keys.schema.ts
- zod-validation.spec.ts
- token-signing-keys.schema.spec.ts
- api.module.ts
- TestEncryptionConfigModule
- helmet
- @nestjs/bullmq@^12.0.0
- operator-token.controller.ts
- sharp@^0.35.5
- @socket.io/redis-adapter@^8.3.0
- log-redaction.e2e-spec.ts
- RedactionProbeController
- identity-keys.e2e-spec.ts
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- TestTokenSigningConfigModule
- tokens.service.ts
- body-limit.spec.ts
- @nestjs/cache-manager@^12.0.1
- zod-serialization.spec.ts
- secrets-reencryption.service.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 143 edges
2. `typeorm` - 62 edges
3. `Zone()` - 54 edges
4. `Project` - 45 edges
5. `useTestDatabase()` - 39 edges
6. `@nestjs/testing` - 38 edges
7. `ProjectsService` - 35 edges
8. `createProject()` - 33 edges
9. `RequestContext` - 31 edges
10. `OperationSteps` - 29 edges

## Surprising Connections (you probably didn't know these)
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts
- `AuditRecord` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-rule.ts → packages/protocol/src/json-types.ts
- `Message` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/message.entity.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (140 total, 34 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.05
Nodes (29): columns(), expectedColumns, findColumn(), findRelation(), normalizeSql(), relations(), runMigration(), DatabaseMigration (+21 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "visitor-session.e2e-spec.ts"
Cohesion: 0.07
Nodes (41): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+33 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "tokens.service.spec.ts"
Cohesion: 0.13
Nodes (27): encodePart(), flipSignatureBit(), ForgedTokenInput, forgeToken(), forgeUnsecuredToken(), parseTestSigningKeys(), replaceHeader(), replacePayload() (+19 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.07
Nodes (24): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+16 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "server/package.json"
Cohesion: 0.08
Nodes (25): author, bin, sowa-chat, @aws-sdk/client-s3@^3.1151.0, cache-manager@^7.2.9, file-type@^22.1.1, @nestjs/platform-socket.io@^12.1.3, @nestjs/swagger@^12.0.2 (+17 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, @aws-sdk/s3-request-presigner@^3.1151.0, bullmq@^6.3.15, jose@^6.2.12, nest-commander@^3.21.0, @nest-lab/throttler-storage-redis@^1.2.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1 (+27 more)

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
Cohesion: 0.14
Nodes (13): internalErrorMessage, ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, stringsInside(), errorCodes (+5 more)

### Community 23 - "worker.module.ts"
Cohesion: 0.14
Nodes (17): IssueApiKeyInput, CreateProjectInput, WorkerModule, columns, createMain(), emptyLists, eventNames, listRow() (+9 more)

### Community 24 - "AuditLogEntry"
Cohesion: 0.15
Nodes (7): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.10
Nodes (14): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand (+6 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.17
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, runToExit() (+3 more)

### Community 28 - "visitor-session.controller.ts"
Cohesion: 0.18
Nodes (7): toVisitorSessionResponse(), VisitorSessionController, VisitorSessionRefreshRequestDto, VisitorSessionRequestDto, VisitorSessionResponseDto, VisitorSessionTokens, VisitorSessionResponse

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.07
Nodes (34): ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation(), createMessage() (+26 more)

### Community 32 - "key-format.ts"
Cohesion: 0.10
Nodes (23): ApiKeySummary, IssueApiKeyBaseInput, RevokeApiKeyInput, VerifiedApiKey, base, base62Alphabet, encodeBase62(), buildLookupPrefix() (+15 more)

### Community 33 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 34 - "secrets-reencrypt.command.ts"
Cohesion: 0.16
Nodes (11): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+3 more)

### Community 35 - "visitor-session.e2e-spec.ts"
Cohesion: 0.05
Nodes (18): ProjectsModule, NewProject, ORIGIN_COLUMNS, OriginsRow, generateRefreshToken(), Visitor, VisitorSession, NewVisitorSession (+10 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "config.module.ts"
Cohesion: 0.23
Nodes (16): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig (+8 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "@nestjs/common"
Cohesion: 0.08
Nodes (34): configureApiApp(), probeControllers, HealthBody, HealthEntry, DependencyStatusBody, StatusBody, noStore(), probeControllers (+26 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "useTestDatabase"
Cohesion: 0.11
Nodes (35): badOrigins, helpEntries, prefixes, CliRunResult, runCliInProcess(), addEd25519Key(), addIdentityKey(), addP256Key() (+27 more)

### Community 46 - "unit-probe.ts"
Cohesion: 0.09
Nodes (20): LogDestination, createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse (+12 more)

### Community 47 - "logger.module.ts"
Cohesion: 0.21
Nodes (14): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+6 more)

### Community 48 - "DomainEventBus"
Cohesion: 0.16
Nodes (6): AuditLogListener, AuditRule, DomainEventBus, DomainEventName, DomainEvents, @nestjs/event-emitter

### Community 49 - "operators.service.ts"
Cohesion: 0.07
Nodes (15): Probe, Operator, OperatorTokenClaims, OperatorProfile, OperatorsRepository, IssuedOperatorToken, IssueOperatorTokenInput, OperatorsService (+7 more)

### Community 50 - "http-error.filter.spec.ts"
Cohesion: 0.08
Nodes (24): OperatorDisabledFilter, InvalidPublicKeyFilter, InvalidRefreshTokenFilter, OperatorDisabledError, InvalidPublicKeyError, InvalidRefreshTokenError, ApiException, ApiExceptionInput (+16 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.11
Nodes (19): AppConfigModule, fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus() (+11 more)

### Community 53 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.08
Nodes (23): operatorTokenClaimsSchema, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, jsonObjectSchema (+15 more)

### Community 55 - "Project"
Cohesion: 0.07
Nodes (19): apiKeyKinds, identityKeyAlgorithms, Project, ColumnRow, expectedColumns, IndexRow, PlanRow, ColumnRow (+11 more)

### Community 57 - "domain-event-bus.spec.ts"
Cohesion: 0.19
Nodes (9): happened, TestListener, DomainEventHandler, OnDomainEvent(), TelemetryModule, DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent (+1 more)

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 59 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "IdentityKey"
Cohesion: 0.11
Nodes (4): IdentityKey, IdentityKeysRepository, IdentityKeysService, toEvent()

### Community 62 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 63 - "migrate.module.ts"
Cohesion: 0.20
Nodes (4): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps

### Community 64 - "RequestContext"
Cohesion: 0.07
Nodes (10): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey (+2 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.09
Nodes (20): CryptoModule, authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv (+12 more)

### Community 67 - "OperationSteps"
Cohesion: 0.07
Nodes (17): ApiModule, VisitorController(), useClsMiddleware(), DatabaseStepSubscriber, echoRequestId(), resolveRequestId(), OperationStep, OperationSteps (+9 more)

### Community 68 - "origin.ts"
Cohesion: 0.42
Nodes (6): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl()

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
Nodes (16): IssuedApiKey, OriginList, originLists, ProjectsRepository, ChangeOriginInput, CreatedProject, InvalidProjectNameError, ORIGINS_EVENTS (+8 more)

### Community 74 - "request-context.ts"
Cohesion: 0.18
Nodes (3): RequestContextModule, ConsumerModule, ContextConsumer

### Community 75 - "main.ts"
Cohesion: 0.13
Nodes (15): cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, createContext(), mode, runApi() (+7 more)

### Community 76 - "telemetry.interceptor.spec.ts"
Cohesion: 0.09
Nodes (15): HttpLabel, HttpMetrics, HttpRequestRecord, labelNames, operationSteps, OperationTiming, StepTimes, FinishedOperation (+7 more)

### Community 77 - "conversation.entity.ts"
Cohesion: 0.07
Nodes (19): database, loadDataSource(), databaseEntities, Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses (+11 more)

### Community 78 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 79 - "project-cli.ts"
Cohesion: 0.26
Nodes (17): toLookupPrefix(), hashKey(), auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix() (+9 more)

### Community 80 - "health.module.ts"
Cohesion: 0.08
Nodes (12): @nestjs/terminus@^12.1.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+4 more)

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "conversation.entity.spec.ts"
Cohesion: 0.13
Nodes (9): Channel, channelColumns(), findColumn(), columns(), expectedColumns, findColumn(), findRelation(), relations() (+1 more)

### Community 85 - "api-keys-service-probe.ts"
Cohesion: 0.24
Nodes (12): eventFields, keyTypeByKind, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred (+4 more)

### Community 87 - "audited-events.spec.ts"
Cohesion: 0.16
Nodes (12): botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent, ApiKeyEvent (+4 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "identity-key-list.command.ts"
Cohesion: 0.07
Nodes (15): emptyCell, formatDate(), writeTable(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow(), header (+7 more)

### Community 90 - "api-docs.ts"
Cohesion: 0.33
Nodes (7): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, zoneOfPort()

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.29
Nodes (7): describeErrors(), key1, key1Bytes, key2, key2Bytes, parseKeys(), requiredEnv

### Community 94 - "ApiKey"
Cohesion: 0.10
Nodes (6): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey, hashMatches(), toSummary()

### Community 95 - "redis-connection.e2e-spec.ts"
Cohesion: 0.11
Nodes (17): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, fetchStatus() (+9 more)

### Community 96 - "cli.module.ts"
Cohesion: 0.12
Nodes (12): serverKeyOnceWarning, writeLine(), writeWarning(), IdentityKeyAddOptions, IdentityKeyRevokeOptions, KeyCreateCommand, KeyCreateOptions, KeyGenerateCommand (+4 more)

### Community 97 - "global-setup.ts"
Cohesion: 0.24
Nodes (9): testcontainers@^12.2.1, @testcontainers/postgresql@^12.2.1, runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl(), testcontainers (+1 more)

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "operator-guard-probe.ts"
Cohesion: 0.10
Nodes (16): OperatorController(), DisabledProbeController, issueOperator(), getProbe(), issueOperator(), withToken(), get(), getAs() (+8 more)

### Community 100 - "audit-log.listener.spec.ts"
Cohesion: 0.15
Nodes (9): eventValues, happened, personalValues, AuditLogRepository, AuditModule, auditedEventNames(), auditRules, auditedEvents (+1 more)

### Community 101 - "conversation-event.entity.spec.ts"
Cohesion: 0.36
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 102 - "json-object-limits.spec.ts"
Cohesion: 0.10
Nodes (16): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+8 more)

### Community 103 - "visitor-auth.guard.ts"
Cohesion: 0.11
Nodes (8): OperatorAuthGuard, ServerKeyGuard, VisitorAuthGuard, VisitorTokenClaims, visitorTokenClaimsSchema, bearerToken(), FakeRequestInput, RequestVisitor

### Community 104 - "identity-key-pem.ts"
Cohesion: 0.13
Nodes (16): KeyActorKind, IdentityKeyAlgorithm, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey(), readPublicKeyObject() (+8 more)

### Community 105 - "Zone"
Cohesion: 0.05
Nodes (25): ServerController(), NeutralProbeController, SecondVersionProbeController, VersionedProbeController, controllers, DocsProbeDto, documentOf(), InternalDocsProbeController (+17 more)

### Community 106 - "visitor.entity.spec.ts"
Cohesion: 0.32
Nodes (5): columns(), expectedColumns, findColumn(), findRelation(), relations()

### Community 108 - "ZoneServers"
Cohesion: 0.29
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 109 - "ref_node_path"
Cohesion: 0.13
Nodes (10): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, databaseUrl(), IdentityRow (+2 more)

### Community 110 - "encryption-keys.schema.ts"
Cohesion: 0.60
Nodes (5): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject()

### Community 111 - "zod-validation.spec.ts"
Cohesion: 0.33
Nodes (4): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto

### Community 115 - "api.module.ts"
Cohesion: 0.09
Nodes (12): OperatorAuthModule, ServerApiModule, ServerAuthModule, VisitorApiModule, VisitorAuthModule, OperatorsModule, VisitorsModule, AppClsModule (+4 more)

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.19
Nodes (4): OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, OperatorTokenResponse

### Community 126 - "log-redaction.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), parseLogLine() (+2 more)

### Community 127 - "RedactionProbeController"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 129 - "identity-keys.e2e-spec.ts"
Cohesion: 0.23
Nodes (12): KeysModule, expectNoKeyRows(), expectNoRows(), addKey(), originAuditRows(), auditRows(), auditRowsByAction(), identityKeyRows() (+4 more)

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 136 - "tokens.service.ts"
Cohesion: 0.13
Nodes (13): parseEntry(), parseKeys(), parsePrivateKey(), reject(), TokenSigningKey, tokenSigningKeysSchema, SignedToken, SignTokenInput (+5 more)

### Community 147 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 150 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldResult, ReencryptInput, reencryptionBatchSize, ReencryptionReport (+3 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 989 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **34 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `typeorm`, `identity-keys.e2e-spec.ts`, `visitor-session.e2e-spec.ts`, `tokens.service.spec.ts`, `tokens.service.ts`, `server/package.json`, `body-limit.spec.ts`, `dependencies`, `zod-serialization.spec.ts`, `secrets-reencryption.service.ts`, `server-errors.spec.ts`, `AuditLogEntry`, `worker.module.ts`, `origin.commands.ts`, `visitor-session.controller.ts`, `key-format.ts`, `secrets-reencrypt.command.ts`, `visitor-session.e2e-spec.ts`, `config.module.ts`, `unit-probe.ts`, `logger.module.ts`, `DomainEventBus`, `operators.service.ts`, `http-error.filter.spec.ts`, `body-limit.ts`, `Project`, `domain-event-bus.spec.ts`, `metrics.controller.ts`, `migrate.module.ts`, `RequestContext`, `encryption.service.spec.ts`, `OperationSteps`, `projects.service.ts`, `request-context.ts`, `main.ts`, `telemetry.interceptor.spec.ts`, `health.module.ts`, `identity-key-list.command.ts`, `api-docs.ts`, `redis-connection.e2e-spec.ts`, `cli.module.ts`, `operator-guard-probe.ts`, `audit-log.listener.spec.ts`, `visitor-auth.guard.ts`, `identity-key-pem.ts`, `Zone`, `zod-validation.spec.ts`, `api.module.ts`, `operator-token.controller.ts`, `RedactionProbeController`?**
  _High betweenness centrality (0.247) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.05179982440737489 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `identity-keys.e2e-spec.ts`, `visitor-session.e2e-spec.ts`, `server/package.json`, `dependencies`, `worker.module.ts`, `chat-tables.e2e-spec.ts`, `visitor-session.e2e-spec.ts`, `useTestDatabase`, `operators.service.ts`, `log-settings.e2e-spec.ts`, `Project`, `migrate-mode.e2e-spec.ts`, `participant.entity.spec.ts`, `test-secrets.ts`, `OperationSteps`, `conversation.entity.ts`, `project-cli.ts`, `conversation.entity.spec.ts`, `CreateChatTables1793215389271`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `operator-guard-probe.ts`, `conversation-event.entity.spec.ts`, `visitor.entity.spec.ts`, `ref_node_path`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `OperationSteps` to `identity-keys.e2e-spec.ts`, `devDependencies`, `tokens.service.spec.ts`, `server/package.json`, `worker.module.ts`, `AuditLogEntry`, `key-format.ts`, `visitor-session.e2e-spec.ts`, `config.module.ts`, `@nestjs/common`, `unit-probe.ts`, `logger.module.ts`, `operators.service.ts`, `log-settings.e2e-spec.ts`, `Project`, `domain-event-bus.spec.ts`, `test-secrets.ts`, `encryption.service.spec.ts`, `projects.service.ts`, `request-context.ts`, `project-cli.ts`, `api-keys-service-probe.ts`, `redis-connection.e2e-spec.ts`, `audit-log.listener.spec.ts`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Should `visitor-session.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07049180327868852 - nodes in this community are weakly interconnected._