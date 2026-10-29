# Graph Report - hector-chat-epic-14  (2026-10-29)

## Corpus Check
- 365 files · ~87,747 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2578 nodes · 5979 edges · 138 communities (104 shown, 34 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 148 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `054935f6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- request-id.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- operator-auth-guard.e2e-spec.ts
- env.schema.ts
- compilerOptions
- domain-events.ts
- api-versioning.spec.ts
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
- Option
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- server-key-guard.e2e-spec.ts
- zone.guard.spec.ts
- ConversationEvent
- cli.module.ts
- tsconfig.build.json
- ValidationProbeController
- config.module.ts
- nest-cli.json
- @nestjs/testing
- conversation.entity.spec.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- test-database.ts
- RedactionProbeController
- logger.module.ts
- Visitor
- key-cli.ts
- writeLine
- log-settings.e2e-spec.ts
- projects.service.spec.ts
- operator-auth.guard.ts
- protocol/src/index.ts
- typeorm
- ProjectCreateCommand
- @nestjs/common
- migrate-mode.e2e-spec.ts
- ProjectsService
- test-secrets.ts
- audit-log.e2e-spec.ts
- log-redaction.spec.ts
- migrate.module.ts
- operator-role.guard.spec.ts
- projects-service.e2e-spec.ts
- encryption.service.spec.ts
- security-headers.spec.ts
- ApiKeysService
- config-startup.e2e-spec.ts
- identity-keys.service.ts
- server-protocol.e2e-spec.ts
- projects.service.ts
- OperationSteps
- redis.module.ts
- main.ts
- participant.entity.spec.ts
- conversation.entity.ts
- zone-e2e-app.ts
- identity-key-commands.e2e-spec.ts
- health.module.ts
- operators.e2e-spec.ts
- .getByName
- workspace-check-types.e2e-spec.ts
- operator-guard-probe.ts
- origin-cli.ts
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
- global-setup.ts
- cli-mode.e2e-spec.ts
- encrypted-secret.spec.ts
- ZonedController
- zod-serialization.spec.ts
- json-object-limits.spec.ts
- packages-build.e2e-spec.ts
- IdentityKeyAddCommand
- Zone
- SlowProbeController
- body-limit.ts
- CacheBusModule
- ref_node_path
- server/package.json
- @aws-sdk/client-s3@^3.1151.0
- @aws-sdk/s3-request-presigner@^3.1151.0
- helmet
- domain-event-bus.spec.ts
- @nest-lab/throttler-storage-redis@^1.2.0
- secrets-reencryption.service.ts
- operator-token.controller.ts
- LocalCacheInvalidation
- @nestjs/microservices@^12.1.3
- @nestjs/throttler@^6.7.1
- project-list.command.ts
- findFreePort
- reflect-metadata@^0.2.2
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- server-errors.spec.ts
- identity-key-list.command.ts
- pino-pretty@^13.2.0
- @nestjs/websockets@^12.1.3
- @nestjs/swagger

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 134 edges
2. `typeorm` - 55 edges
3. `Zone()` - 50 edges
4. `Project` - 43 edges
5. `@nestjs/testing` - 40 edges
6. `ProjectsService` - 35 edges
7. `useTestDatabase()` - 33 edges
8. `DomainEventBus` - 30 edges
9. `ApiKey` - 27 edges
10. `findFreePort()` - 27 edges

## Surprising Connections (you probably didn't know these)
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
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

## Communities (138 total, 34 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.07
Nodes (15): DatabaseMigration, databaseMigrations, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity, SecondEntity, CreateProjects1793193549883 (+7 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "request-id.spec.ts"
Cohesion: 0.08
Nodes (19): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+11 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, socket.io-client@catalog:, source-map-support@^0.5.21, supertest@^7.0.0 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.07
Nodes (44): parseEntry(), parseKeys(), parsePrivateKey(), reject(), TokenSigningKey, tokenSigningKeysSchema, SignedToken, SignTokenInput (+36 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.05
Nodes (36): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+28 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "domain-events.ts"
Cohesion: 0.19
Nodes (16): apiKeyCacheKeys(), cacheInvalidatedEventNames(), CacheInvalidationRule, cacheInvalidationRules, projectCacheKeys(), apiKeyEvent, projectEvent, cacheKeys (+8 more)

### Community 10 - "api-versioning.spec.ts"
Cohesion: 0.19
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.06
Nodes (31): dependencies, bullmq@^6.3.15, cache-manager@^7.2.9, jose@^6.2.12, nest-commander@^3.21.0, @nestjs/cache-manager@^12.0.1, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1 (+23 more)

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
Nodes (26): OperatorDisabledFilter, OperatorDisabledError, ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, ApiHttpModule, errorCodeByStatus (+18 more)

### Community 23 - "RequestContext"
Cohesion: 0.09
Nodes (4): RequestContextModule, RequestContext, ConsumerModule, ContextConsumer

### Community 24 - "AuditLogEntry"
Cohesion: 0.12
Nodes (8): ActorKind, actorKinds, AuditLogEntry, AuditLogRepository, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns

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

### Community 32 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.12
Nodes (19): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+11 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "cli.module.ts"
Cohesion: 0.08
Nodes (20): OperatorAuthModule, ServerApiModule, ServerAuthModule, CliModule, databaseEntities, AuditModule, AppCacheModule, cacheTtlMs (+12 more)

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
Cohesion: 0.11
Nodes (21): DependencyStatusBody, StatusBody, LogDestination, probeControllers, LogEntry, offlineDataSource, withOfflineDatabase(), offlineRedis (+13 more)

### Community 41 - "conversation.entity.spec.ts"
Cohesion: 0.16
Nodes (7): Channel, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "test-database.ts"
Cohesion: 0.12
Nodes (17): apiKeyKinds, identityKeyAlgorithms, ColumnRow, expectedColumns, ColumnRow, expectedColumns, jwk, createProjectWithKey() (+9 more)

### Community 47 - "logger.module.ts"
Cohesion: 0.21
Nodes (14): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+6 more)

### Community 48 - "Visitor"
Cohesion: 0.15
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor

### Community 49 - "key-cli.ts"
Cohesion: 0.16
Nodes (26): toLookupPrefix(), hashKey(), auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix() (+18 more)

### Community 50 - "writeLine"
Cohesion: 0.12
Nodes (13): emptyCell, serverKeyOnceWarning, writeLine(), writeWarning(), IdentityKeyAddOptions, readPem(), IdentityKeyRevokeOptions, KeyCreateCommand (+5 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "projects.service.spec.ts"
Cohesion: 0.23
Nodes (8): IssuedApiKey, InvalidProjectNameError, ProjectAlreadyExistsError, createProjectsServiceProbe(), issuedServerKey, projectRow(), ProjectsServiceProbe, runWithoutTransaction()

### Community 53 - "operator-auth.guard.ts"
Cohesion: 0.15
Nodes (6): OperatorAuthGuard, ServerKeyGuard, OperatorTokenClaims, operatorTokenClaimsSchema, bearerToken(), FakeRequestInput

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.13
Nodes (13): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, operatorRoles, OperatorTokenRequest (+5 more)

### Community 55 - "typeorm"
Cohesion: 0.14
Nodes (9): database, loadDataSource(), channelColumns(), findColumn(), Project, AddProjectsOperatorAllowedOrigins1793300003000, ColumnRow, JsonObject (+1 more)

### Community 57 - "@nestjs/common"
Cohesion: 0.09
Nodes (10): prom-client@^15.1.3, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, zoneMetadataKey, MetricsController, ZoneProbeApp (+2 more)

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.23
Nodes (9): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, withClient() (+1 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "audit-log.e2e-spec.ts"
Cohesion: 0.15
Nodes (9): AuditLogListener, eventValues, happened, personalValues, auditedEventNames(), AuditRule, auditRules, DomainEventBus (+1 more)

### Community 62 - "log-redaction.spec.ts"
Cohesion: 0.20
Nodes (10): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+2 more)

### Community 63 - "migrate.module.ts"
Cohesion: 0.17
Nodes (5): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 64 - "operator-role.guard.spec.ts"
Cohesion: 0.12
Nodes (9): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey (+1 more)

### Community 65 - "projects-service.e2e-spec.ts"
Cohesion: 0.08
Nodes (24): IssueApiKeyInput, KeysModule, ProjectsModule, NewProject, ORIGIN_COLUMNS, OriginsRow, CreateProjectInput, WorkerModule (+16 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.12
Nodes (14): CryptoModule, authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService, SecretDecryptionError (+6 more)

### Community 67 - "security-headers.spec.ts"
Cohesion: 0.21
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 68 - "ApiKeysService"
Cohesion: 0.13
Nodes (3): KeyRevokeCommand, ApiKeysService, toEvent()

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "identity-keys.service.ts"
Cohesion: 0.07
Nodes (20): KeyActorKind, IdentityKey, IdentityKeyAlgorithm, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey() (+12 more)

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "projects.service.ts"
Cohesion: 0.13
Nodes (20): addOriginTo(), describeAdd(), describeRemove(), OriginOptions, ProjectOptions, removeOriginFrom(), ALLOWED_PROTOCOLS, InvalidOriginError (+12 more)

### Community 73 - "OperationSteps"
Cohesion: 0.08
Nodes (14): DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, StepTimes, OperationSteps, OperationStepsProbeController, beginOperation() (+6 more)

### Community 74 - "redis.module.ts"
Cohesion: 0.20
Nodes (8): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 75 - "main.ts"
Cohesion: 0.17
Nodes (13): cliName, commanderArgv(), runCliCommand(), startupLogLevels, createContext(), mode, runApi(), runCli() (+5 more)

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "conversation.entity.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 78 - "zone-e2e-app.ts"
Cohesion: 0.11
Nodes (15): configureApiApp(), ApiModule, useClsMiddleware(), noStore(), useSecurityHeaders(), echoRequestId(), requestIdHeader, resolveRequestId() (+7 more)

### Community 79 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.19
Nodes (22): expectNoKeyRows(), expectNoRows(), addKey(), runCliInProcess(), addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem() (+14 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 81 - "operators.e2e-spec.ts"
Cohesion: 0.10
Nodes (6): DisabledOperators, Probe, OperatorsModule, OperatorsRepository, TokensModule, createProjectRequest()

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "operator-guard-probe.ts"
Cohesion: 0.08
Nodes (20): OperatorController(), Operator, OperatorProfile, IssuedOperatorToken, IssueOperatorTokenInput, OperatorsService, operatorTokenTtlSeconds, input (+12 more)

### Community 85 - "origin-cli.ts"
Cohesion: 0.21
Nodes (12): badOrigins, helpEntries, prefixes, CliRunResult, addOrigins(), OriginAction, OriginCommandOptions, originGroups (+4 more)

### Community 87 - "audited-events.spec.ts"
Cohesion: 0.14
Nodes (11): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+3 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "secrets-reencrypt.command.ts"
Cohesion: 0.16
Nodes (11): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+3 more)

### Community 90 - "zone.ts"
Cohesion: 0.15
Nodes (17): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes (+9 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 94 - "api-keys.service.ts"
Cohesion: 0.07
Nodes (23): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey, ApiKeySummary, hashMatches(), eventFields, IssueApiKeyBaseInput (+15 more)

### Community 95 - "telemetry.interceptor.spec.ts"
Cohesion: 0.22
Nodes (4): readMetricLines(), TelemetryProbeController, zoneUrl(), @nestjs/core

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 97 - "global-setup.ts"
Cohesion: 0.57
Nodes (4): setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 101 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 102 - "json-object-limits.spec.ts"
Cohesion: 0.08
Nodes (18): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+10 more)

### Community 103 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 105 - "Zone"
Cohesion: 0.08
Nodes (16): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+8 more)

### Community 107 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 109 - "ref_node_path"
Cohesion: 0.11
Nodes (12): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, databaseUrl(), IdentityRow (+4 more)

### Community 110 - "server/package.json"
Cohesion: 0.09
Nodes (21): author, bin, sowa-chat, file-type@^22.1.1, @nestjs/bullmq@^12.0.0, @nestjs/platform-socket.io@^12.1.3, sharp@^0.35.5, socket.io@^4.8.4 (+13 more)

### Community 120 - "domain-event-bus.spec.ts"
Cohesion: 0.25
Nodes (8): happened, TestListener, DomainEventHandler, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 122 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldResult, ReencryptInput, reencryptionBatchSize, ReencryptionReport (+3 more)

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.12
Nodes (7): OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, ServerController(), GuardProbeController, OperatorTokenResponse, nestjs-zod

### Community 127 - "project-list.command.ts"
Cohesion: 0.22
Nodes (4): formatOrigins(), header, ProjectListCommand, toRow()

### Community 128 - "findFreePort"
Cohesion: 0.13
Nodes (19): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), serverEnvironment() (+11 more)

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 133 - "server-errors.spec.ts"
Cohesion: 0.32
Nodes (6): ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, stringsInside()

### Community 134 - "identity-key-list.command.ts"
Cohesion: 0.12
Nodes (10): formatDate(), writeTable(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow(), header, KeyListCommand (+2 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 944 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **34 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `request-id.spec.ts`, `server-errors.spec.ts`, `identity-key-list.command.ts`, `operator-auth-guard.e2e-spec.ts`, `domain-events.ts`, `api-versioning.spec.ts`, `dependencies`, `http-error.filter.spec.ts`, `RequestContext`, `AuditLogEntry`, `server-key-guard.e2e-spec.ts`, `zone.guard.spec.ts`, `cli.module.ts`, `config.module.ts`, `@nestjs/testing`, `test-database.ts`, `logger.module.ts`, `writeLine`, `operator-auth.guard.ts`, `audit-log.e2e-spec.ts`, `log-redaction.spec.ts`, `migrate.module.ts`, `operator-role.guard.spec.ts`, `projects-service.e2e-spec.ts`, `encryption.service.spec.ts`, `security-headers.spec.ts`, `identity-keys.service.ts`, `projects.service.ts`, `OperationSteps`, `redis.module.ts`, `main.ts`, `zone-e2e-app.ts`, `health.module.ts`, `operators.e2e-spec.ts`, `operator-guard-probe.ts`, `secrets-reencrypt.command.ts`, `zone.ts`, `api-keys.service.ts`, `telemetry.interceptor.spec.ts`, `zod-serialization.spec.ts`, `Zone`, `body-limit.ts`, `server/package.json`, `domain-event-bus.spec.ts`, `secrets-reencryption.service.ts`, `operator-token.controller.ts`, `project-list.command.ts`?**
  _High betweenness centrality (0.277) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06951219512195123 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `findFreePort`, `dependencies`, `chat-tables.e2e-spec.ts`, `ConversationEvent`, `conversation.entity.spec.ts`, `test-database.ts`, `Visitor`, `key-cli.ts`, `migrate-mode.e2e-spec.ts`, `test-secrets.ts`, `projects-service.e2e-spec.ts`, `OperationSteps`, `participant.entity.spec.ts`, `conversation.entity.ts`, `identity-key-commands.e2e-spec.ts`, `operators.e2e-spec.ts`, `operator-guard-probe.ts`, `origin-cli.ts`, `CreateChatTables1793215389271`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `api-keys.service.ts`, `ref_node_path`, `server/package.json`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `@nestjs/testing` to `findFreePort`, `devDependencies`, `operator-auth-guard.e2e-spec.ts`, `domain-events.ts`, `RequestContext`, `AuditLogEntry`, `server-key-guard.e2e-spec.ts`, `cli.module.ts`, `config.module.ts`, `logger.module.ts`, `key-cli.ts`, `projects.service.spec.ts`, `test-secrets.ts`, `audit-log.e2e-spec.ts`, `projects-service.e2e-spec.ts`, `encryption.service.spec.ts`, `OperationSteps`, `zone-e2e-app.ts`, `identity-key-commands.e2e-spec.ts`, `operators.e2e-spec.ts`, `operator-guard-probe.ts`, `api-keys.service.ts`, `server/package.json`, `domain-event-bus.spec.ts`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Should `request-id.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._