# Graph Report - hector-chat-epic-10  (2026-10-29)

## Corpus Check
- 308 files · ~72,940 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2248 nodes · 5036 edges · 140 communities (97 shown, 43 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 123 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1907e27a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- server/package.json
- env.schema.ts
- compilerOptions
- ref_node_path
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
- server-errors.spec.ts
- identity-key-commands.e2e-spec.ts
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
- database.module.ts
- tsconfig.build.json
- ValidationProbeController
- config.module.ts
- nest-cli.json
- zone-probe.ts
- conversation.entity.spec.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- worker.module.ts
- log-redaction.spec.ts
- main.ts
- Visitor
- key-cli.ts
- @nestjs/common
- database-connection.e2e-spec.ts
- projects.service.ts
- RedactionProbeController
- protocol/src/index.ts
- Project
- ProjectCreateCommand
- metrics.controller.ts
- findFreePort
- identity-keys.service.ts
- test-secrets.ts
- slow-operations.spec.ts
- request-id.spec.ts
- migrate.module.ts
- api-versioning.spec.ts
- project-origins.e2e-spec.ts
- encryption.service.spec.ts
- Zone
- KeyRevokeCommand
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- ProjectsService
- OperationSteps
- redis.module.ts
- main.ts
- participant.entity.spec.ts
- database-entities.ts
- cls-middleware.ts
- identity-keys.e2e-spec.ts
- health.module.ts
- security-headers.spec.ts
- IdentityKeyAddCommand
- workspace-check-types.e2e-spec.ts
- body-limit.ts
- project-cli.ts
- CreateChatTables1793215389271
- audit-log.listener.spec.ts
- secrets-reencrypt-command.e2e-spec.ts
- secrets-reencryption.service.ts
- zone.ts
- Message
- encryption-keys.schema.spec.ts
- SecretsReencryptionService
- api-keys.service.ts
- origin-cli.ts
- log-redaction.e2e-spec.ts
- global-setup.ts
- cli-mode.e2e-spec.ts
- ref_node_child_process
- @nestjs/core
- zod-serialization.spec.ts
- JsonObjectValidator
- env.schema.slow-operations.spec.ts
- typeorm
- @aws-sdk/client-s3@^3.1151.0
- .log
- @nest-lab/throttler-storage-redis@^1.2.0
- encryption-keys.schema.ts
- packages-build.e2e-spec.ts
- @nestjs/cache-manager@^12.0.1
- env.schema.logging.spec.ts
- projects-table.e2e-spec.ts
- TelemetryProbeController
- conversation-indexes.e2e-spec.ts
- body-limit.spec.ts
- secrets-reencryption.service.ts
- pg
- sharp@^0.35.5
- ZoneServers
- process-env.spec.ts
- CreateIdentityKeys1793300001000
- AddProjectsPublicKey1793300002000
- ProbeController
- @aws-sdk/s3-request-presigner@^3.1151.0
- helmet
- @nestjs/microservices@^12.1.3
- @nestjs/throttler@^6.7.1
- telemetry.interceptor.ts
- @nestjs/websockets@^12.1.3
- @types/supertest@^7.0.0

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 104 edges
2. `typeorm` - 51 edges
3. `Zone()` - 46 edges
4. `Project` - 41 edges
5. `ProjectsService` - 35 edges
6. `@nestjs/testing` - 32 edges
7. `ApiKey` - 27 edges
8. `Conversation` - 26 edges
9. `DomainEventBus` - 26 edges
10. `useTestDatabase()` - 26 edges

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

## Communities (140 total, 43 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.14
Nodes (5): DatabaseMigration, CreateProjects1793193549883, CreateAuditLog1793200000000, AddConversationIndexes1793215983154, CreateApiKeys1793300000000

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
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.10
Nodes (19): author, bin, sowa-chat, bullmq@^6.3.15, file-type@^22.1.1, @nestjs/bullmq@^12.0.0, pino-http@^11.0.0, @socket.io/redis-adapter@^8.3.0 (+11 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.11
Nodes (17): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange() (+9 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.17
Nodes (6): migrationFiles, migrationsDirectory, packageJson, useTestRedis(), redisUrl(), testEnv

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, cache-manager@^7.2.9, nest-commander@^3.21.0, @nestjs-cls/transactional@^4.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1, @nestjs/core@^12.0.1, @nestjs/event-emitter@^12.0.1 (+21 more)

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
Cohesion: 0.05
Nodes (35): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, ApiHttpModule, errorCodeByStatus, errorCodeOfStatus(), httpErrorResponse() (+27 more)

### Community 23 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.30
Nodes (14): runCliInProcess(), addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem(), identityKeyListHeader, listIdentityKeys(), PemWriter (+6 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.08
Nodes (14): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand (+6 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.12
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+2 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.09
Nodes (28): databaseEntities, ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation() (+20 more)

### Community 32 - "key-format.ts"
Cohesion: 0.13
Nodes (24): eventFields, serverKey, base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey() (+16 more)

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
Cohesion: 0.29
Nodes (12): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+4 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-probe.ts"
Cohesion: 0.13
Nodes (20): AppClsModule, HealthBody, HealthEntry, probeControllers, ZonesModule, withOfflineDatabase(), offlineRedis, withOfflineRedis() (+12 more)

### Community 41 - "conversation.entity.spec.ts"
Cohesion: 0.18
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "worker.module.ts"
Cohesion: 0.12
Nodes (12): apiKeyKinds, WorkerModule, ColumnRow, expectedColumns, ColumnRow, expectedColumns, ColumnRow, expectedColumns (+4 more)

### Community 46 - "log-redaction.spec.ts"
Cohesion: 0.20
Nodes (10): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+2 more)

### Community 47 - "main.ts"
Cohesion: 0.16
Nodes (16): createLogDestination(), logFileDescriptor(), LogDestination, LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions() (+8 more)

### Community 48 - "Visitor"
Cohesion: 0.15
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor

### Community 49 - "key-cli.ts"
Cohesion: 0.25
Nodes (17): toLookupPrefix(), hashKey(), auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix() (+9 more)

### Community 50 - "@nestjs/common"
Cohesion: 0.07
Nodes (26): emptyCell, formatDate(), serverKeyOnceWarning, writeLine(), writeTable(), writeWarning(), IdentityKeyAddOptions, header (+18 more)

### Community 51 - "database-connection.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, serverEnvironment(), waitForHttpStatus() (+1 more)

### Community 52 - "projects.service.ts"
Cohesion: 0.08
Nodes (27): IssueApiKeyInput, IssuedApiKey, ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), OriginList, originLists, normalizeOrigin() (+19 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.08
Nodes (23): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, defaultLimits, isAccepted() (+15 more)

### Community 55 - "Project"
Cohesion: 0.15
Nodes (6): Channel, channelColumns(), findColumn(), Project, ProjectFixture, JsonObject

### Community 57 - "metrics.controller.ts"
Cohesion: 0.14
Nodes (7): prom-client@^15.1.3, MetricsController, MetricsModule, OperationStepsModule, SlowOperationsModule, @nestjs/common, prom-client

### Community 58 - "findFreePort"
Cohesion: 0.06
Nodes (39): AppConfigModule, findZonePorts(), fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl() (+31 more)

### Community 59 - "identity-keys.service.ts"
Cohesion: 0.11
Nodes (8): IdentityKeyRevokeCommand, KeyActorKind, AddIdentityKeyInput, IdentityKeyKidTakenError, IdentityKeysService, InvalidIdentityKeyIdError, RevokeIdentityKeyInput, toEvent()

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 62 - "request-id.spec.ts"
Cohesion: 0.20
Nodes (10): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, ProbeService (+2 more)

### Community 63 - "migrate.module.ts"
Cohesion: 0.17
Nodes (5): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 64 - "api-versioning.spec.ts"
Cohesion: 0.19
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 65 - "project-origins.e2e-spec.ts"
Cohesion: 0.13
Nodes (16): CreateProjectInput, columns, createMain(), emptyLists, eventNames, listRow(), lists, originAuditRows() (+8 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.10
Nodes (20): CryptoModule, authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv (+12 more)

### Community 67 - "Zone"
Cohesion: 0.09
Nodes (18): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+10 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "IdentityKey"
Cohesion: 0.07
Nodes (16): jose@^6.2.12, IdentityKey, IdentityKeyAlgorithm, identityKeyAlgorithms, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey (+8 more)

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.31
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 73 - "OperationSteps"
Cohesion: 0.11
Nodes (8): nestjs-cls@^7.0.1, DatabaseStepSubscriber, OperationStep, OperationSteps, OperationStepsProbeController, beginOperation(), operationTimingKey, nestjs-cls

### Community 74 - "redis.module.ts"
Cohesion: 0.20
Nodes (8): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 75 - "main.ts"
Cohesion: 0.12
Nodes (17): configureApiApp(), cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, noStore(), useSecurityHeaders() (+9 more)

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "database-entities.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 78 - "cls-middleware.ts"
Cohesion: 0.33
Nodes (5): ApiModule, useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp()

### Community 79 - "identity-keys.e2e-spec.ts"
Cohesion: 0.28
Nodes (11): KeysModule, expectNoKeyRows(), expectNoRows(), addKey(), auditRows(), auditRowsByAction(), identityKeyRows(), exportPems() (+3 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 81 - "security-headers.spec.ts"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 85 - "project-cli.ts"
Cohesion: 0.25
Nodes (9): CliRunResult, buildServer(), fullOriginArguments, listHeader, onceWarning, repositoryRoot, runMainCli(), serverDirectory (+1 more)

### Community 87 - "audit-log.listener.spec.ts"
Cohesion: 0.05
Nodes (41): ActorKind, actorKinds, AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, NewAuditLogEntry (+33 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "secrets-reencryption.service.ts"
Cohesion: 0.19
Nodes (9): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+1 more)

### Community 90 - "zone.ts"
Cohesion: 0.13
Nodes (18): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, probeControllers, ApiZone (+10 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.20
Nodes (8): encryptionConfig, describeErrors(), key1, key1Bytes, key2, key2Bytes, parseKeys(), requiredEnv

### Community 94 - "api-keys.service.ts"
Cohesion: 0.07
Nodes (15): @nestjs-cls/transactional-adapter-typeorm@^2.0.1, ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey, ApiKeysService, ApiKeySummary, hashMatches() (+7 more)

### Community 95 - "origin-cli.ts"
Cohesion: 0.22
Nodes (11): badOrigins, helpEntries, prefixes, addOrigins(), OriginAction, OriginCommandOptions, OriginGroup, originGroups (+3 more)

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.31
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 97 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "ref_node_child_process"
Cohesion: 0.18
Nodes (5): DependencyStatusBody, StatusBody, databaseUrl(), IdentityRow, VersionRow

### Community 100 - "@nestjs/core"
Cohesion: 0.24
Nodes (4): BareController, MethodOnlyController, ZonedController, @nestjs/core

### Community 101 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 102 - "JsonObjectValidator"
Cohesion: 0.28
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 104 - "typeorm"
Cohesion: 0.38
Nodes (3): database, loadDataSource(), typeorm

### Community 108 - "encryption-keys.schema.ts"
Cohesion: 0.60
Nodes (5): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject()

### Community 109 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 111 - "env.schema.logging.spec.ts"
Cohesion: 0.33
Nodes (3): Env, logLevels, requiredEnv

### Community 122 - "secrets-reencryption.service.ts"
Cohesion: 0.14
Nodes (13): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldReencryption, FieldResult, FieldVersionCount, ReencryptInput (+5 more)

### Community 125 - "ZoneServers"
Cohesion: 0.29
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 126 - "process-env.spec.ts"
Cohesion: 0.67
Nodes (3): filesReadingProcessEnv(), sourceDirectory, sourceFiles()

### Community 135 - "telemetry.interceptor.ts"
Cohesion: 0.11
Nodes (12): HttpMetrics, operationSteps, OperationTiming, StepTimes, FinishedOperation, roundSteps(), SlowOperations, LogEntry (+4 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 839 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **43 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `metrics.controller.ts` to `log-level-warn.spec.ts`, `server/package.json`, `telemetry.interceptor.ts`, `dependencies`, `server-errors.spec.ts`, `origin.commands.ts`, `.create`, `zone.guard.spec.ts`, `database.module.ts`, `config.module.ts`, `zone-probe.ts`, `worker.module.ts`, `log-redaction.spec.ts`, `main.ts`, `@nestjs/common`, `projects.service.ts`, `identity-keys.service.ts`, `request-id.spec.ts`, `migrate.module.ts`, `api-versioning.spec.ts`, `encryption.service.spec.ts`, `Zone`, `IdentityKey`, `OperationSteps`, `redis.module.ts`, `main.ts`, `cls-middleware.ts`, `health.module.ts`, `body-limit.ts`, `audit-log.listener.spec.ts`, `secrets-reencryption.service.ts`, `zone.ts`, `api-keys.service.ts`, `ref_node_child_process`, `@nestjs/core`, `zod-serialization.spec.ts`, `body-limit.spec.ts`, `secrets-reencryption.service.ts`?**
  _High betweenness centrality (0.258) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13725490196078433 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `AddProjectsPublicKey1793300002000`, `server/package.json`, `dependencies`, `.create`, `chat-tables.e2e-spec.ts`, `ConversationEvent`, `database.module.ts`, `conversation.entity.spec.ts`, `worker.module.ts`, `Visitor`, `key-cli.ts`, `Project`, `findFreePort`, `test-secrets.ts`, `project-origins.e2e-spec.ts`, `IdentityKey`, `OperationSteps`, `participant.entity.spec.ts`, `database-entities.ts`, `identity-keys.e2e-spec.ts`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `origin-cli.ts`, `ref_node_child_process`, `projects-table.e2e-spec.ts`, `conversation-indexes.e2e-spec.ts`, `CreateIdentityKeys1793300001000`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `api-versioning.spec.ts`, `zone.guard.spec.ts`, `@nestjs/core`, `zod-serialization.spec.ts`, `ValidationProbeController`, `telemetry.interceptor.ts`, `zone-probe.ts`, `ResponseProbeController`, `health.module.ts`, `security-headers.spec.ts`, `TelemetryProbeController`, `server-errors.spec.ts`, `body-limit.spec.ts`, `zone.ts`, `metrics.controller.ts`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._