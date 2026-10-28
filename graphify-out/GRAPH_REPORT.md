# Graph Report - hector-chat-epic-10  (2026-10-29)

## Corpus Check
- 304 files · ~71,339 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2210 nodes · 4903 edges · 118 communities (90 shown, 28 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 117 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0c967315`
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
- encryption.service.spec.ts
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
- key-cli.ts
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
- api.module.ts
- tsconfig.build.json
- ValidationProbeController
- config.module.ts
- nest-cli.json
- zone-probe.ts
- conversation.entity.spec.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- api-keys.service.ts
- zone-servers.spec.ts
- main.ts
- typeorm
- api-keys.service.ts
- @nestjs/common
- database-connection.e2e-spec.ts
- projects-service.e2e-spec.ts
- log-redaction.spec.ts
- protocol/src/index.ts
- identity-key-pem.ts
- ProjectCreateCommand
- metrics.controller.ts
- migrate-mode.e2e-spec.ts
- transactions.e2e-spec.ts
- test-secrets.ts
- slow-operations.spec.ts
- unit-probe.ts
- migrate.module.ts
- api-versioning.spec.ts
- database.module.ts
- encryption.service.ts
- Zone
- ApiKeysService
- config-startup.e2e-spec.ts
- identity-keys.service.ts
- server-protocol.e2e-spec.ts
- ProjectsService
- OperationSteps
- zod-serialization.spec.ts
- helmet
- participant.entity.spec.ts
- database-entities.ts
- cls-middleware.ts
- health.e2e-spec.ts
- health.module.ts
- security-headers.spec.ts
- IdentityKeyAddCommand
- workspace-check-types.e2e-spec.ts
- api-app.ts
- OperationStepsProbeController
- CreateChatTables1793215389271
- audit-log.e2e-spec.ts
- ProbeController
- secrets-reencryption.service.ts
- zone.ts
- Message
- encryption-keys.schema.spec.ts
- SecretsReencryptionService
- ApiKey
- @socket.io/redis-adapter@^8.3.0
- log-redaction.e2e-spec.ts
- global-setup.ts
- @sowa-chat/protocol@workspace:*
- EncryptionService
- JsonObjectValidator
- redis-connection.e2e-spec.ts
- packages-build.e2e-spec.ts
- @nestjs/cache-manager@^12.0.1
- @nestjs/platform-socket.io@^12.1.3
- @nestjs/throttler@^6.7.1
- telemetry.interceptor.spec.ts
- body-limit.spec.ts
- secrets-reencryption.module.ts
- ZoneServers
- cache-manager@^7.2.9
- telemetry.interceptor.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 103 edges
2. `typeorm` - 50 edges
3. `Zone()` - 46 edges
4. `Project` - 41 edges
5. `ProjectsService` - 35 edges
6. `@nestjs/testing` - 32 edges
7. `ApiKey` - 27 edges
8. `Conversation` - 26 edges
9. `findFreePort()` - 25 edges
10. `useTestDatabase()` - 25 edges

## Surprising Connections (you probably didn't know these)
- `ConversationEvent` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation-event.entity.ts → packages/protocol/src/json-types.ts
- `Conversation` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation.entity.ts → packages/protocol/src/json-types.ts
- `Message` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/message.entity.ts → packages/protocol/src/json-types.ts
- `Project` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/projects/project.entity.ts → packages/protocol/src/json-types.ts
- `Visitor` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/visitors/visitor.entity.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (118 total, 28 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.07
Nodes (11): databaseMigrations, migrationFiles, migrationsDirectory, CreateProjects1793193549883, CreateAuditLog1793200000000, AddConversationIndexes1793215983154, CreateApiKeys1793300000000, CreateIdentityKeys1793300001000 (+3 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.17
Nodes (10): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+2 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.08
Nodes (23): author, bin, sowa-chat, @aws-sdk/s3-request-presigner@^3.1151.0, @nestjs/bullmq@^12.0.0, pg@^8.23.1, pino-http@^11.0.0, sharp@^0.35.5 (+15 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (21): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange() (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.13
Nodes (10): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, databaseUrl(), IdentityRow, VersionRow, useTestRedis() (+2 more)

### Community 10 - "encryption.service.spec.ts"
Cohesion: 0.16
Nodes (11): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), SecretDecryptionError, captureError(), expectDecryptionError() (+3 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, @aws-sdk/client-s3@^3.1151.0, bullmq@^6.3.15, file-type@^22.1.1, nest-commander@^3.21.0, @nest-lab/throttler-storage-redis@^1.2.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1 (+26 more)

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
Nodes (34): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage (+26 more)

### Community 23 - "key-cli.ts"
Cohesion: 0.06
Nodes (73): cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, toLookupPrefix(), CreateProjectInput, runCli() (+65 more)

### Community 24 - "AuditLogEntry"
Cohesion: 0.10
Nodes (17): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, apiKeyKinds, identityKeyAlgorithms, ColumnRow (+9 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.09
Nodes (20): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand (+12 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, runToExit() (+3 more)

### Community 28 - ".create"
Cohesion: 0.16
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.07
Nodes (29): ColumnRow, ForeignKeyRow, IndexRow, tableNames, IndexRow, PlanRow, countRows(), createChannel() (+21 more)

### Community 32 - "key-format.ts"
Cohesion: 0.16
Nodes (13): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+5 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "api.module.ts"
Cohesion: 0.08
Nodes (23): databaseEntities, AppClsModule, AppConfigModule, DatabaseModule, ApiHttpModule, ZonesModule, OperationStepsModule, SlowOperationsModule (+15 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "config.module.ts"
Cohesion: 0.26
Nodes (14): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig (+6 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-probe.ts"
Cohesion: 0.12
Nodes (17): HealthBody, HealthEntry, DependencyStatusBody, StatusBody, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto (+9 more)

### Community 41 - "conversation.entity.spec.ts"
Cohesion: 0.15
Nodes (7): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget(), Visitor

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "api-keys.service.ts"
Cohesion: 0.18
Nodes (9): ApiKeyKind, NewApiKey, ApiKeySummary, hashMatches(), IssueApiKeyBaseInput, keyTypeByKind, RevokeApiKeyInput, toSummary() (+1 more)

### Community 46 - "zone-servers.spec.ts"
Cohesion: 0.17
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController

### Community 47 - "main.ts"
Cohesion: 0.22
Nodes (13): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+5 more)

### Community 48 - "typeorm"
Cohesion: 0.11
Nodes (11): loadDataSource(), Channel, channelColumns(), findColumn(), Project, columns(), expectedColumns, findColumn() (+3 more)

### Community 49 - "api-keys.service.ts"
Cohesion: 0.22
Nodes (12): eventFields, serverKey, hashKey(), ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred (+4 more)

### Community 50 - "@nestjs/common"
Cohesion: 0.06
Nodes (30): emptyCell, formatDate(), writeLine(), writeTable(), IdentityKeyAddOptions, readPem(), header, IdentityKeyListCommand (+22 more)

### Community 51 - "database-connection.e2e-spec.ts"
Cohesion: 0.23
Nodes (11): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+3 more)

### Community 52 - "projects-service.e2e-spec.ts"
Cohesion: 0.14
Nodes (15): IssueApiKeyInput, IssuedApiKey, InvalidProjectNameError, ProjectAlreadyExistsError, ProjectNotFoundError, createMain(), apiKeyRows(), auditRows() (+7 more)

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.07
Nodes (23): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, defaultLimits, isAccepted() (+15 more)

### Community 55 - "identity-key-pem.ts"
Cohesion: 0.16
Nodes (13): jose@^6.2.12, IdentityKeyAlgorithm, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey(), readPublicKeyObject() (+5 more)

### Community 57 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, withClient() (+2 more)

### Community 59 - "transactions.e2e-spec.ts"
Cohesion: 0.10
Nodes (12): KeysModule, OriginList, originLists, ProjectsModule, NewProject, ORIGIN_COLUMNS, OriginsRow, ProjectsRepository (+4 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.16
Nodes (18): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertSecret(), insertVersion1Secrets(), key1 (+10 more)

### Community 61 - "slow-operations.spec.ts"
Cohesion: 0.24
Nodes (3): LogEntry, pause(), SlowProbeController

### Community 62 - "unit-probe.ts"
Cohesion: 0.12
Nodes (15): LogDestination, createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse (+7 more)

### Community 63 - "migrate.module.ts"
Cohesion: 0.09
Nodes (14): ApiModule, DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, createContext(), mode, runApi() (+6 more)

### Community 64 - "api-versioning.spec.ts"
Cohesion: 0.25
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 65 - "database.module.ts"
Cohesion: 0.18
Nodes (11): database, DatabaseMigration, createTypeOrmModule(), getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection, DatabaseEntity (+3 more)

### Community 66 - "encryption.service.ts"
Cohesion: 0.17
Nodes (12): authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv, tag (+4 more)

### Community 67 - "Zone"
Cohesion: 0.11
Nodes (14): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+6 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "identity-keys.service.ts"
Cohesion: 0.07
Nodes (10): IdentityKeyRevokeCommand, KeyActorKind, IdentityKey, IdentityKeysRepository, AddIdentityKeyInput, IdentityKeyKidTakenError, IdentityKeysService, InvalidIdentityKeyIdError (+2 more)

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 73 - "OperationSteps"
Cohesion: 0.14
Nodes (9): DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationSteps, beginOperation(), operationTimingKey, nestjs-cls (+1 more)

### Community 74 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "database-entities.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 78 - "cls-middleware.ts"
Cohesion: 0.39
Nodes (5): useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp(), nestjs-pino

### Community 79 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 80 - "health.module.ts"
Cohesion: 0.06
Nodes (19): ioredis@^6.0.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+11 more)

### Community 81 - "security-headers.spec.ts"
Cohesion: 0.21
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "api-app.ts"
Cohesion: 0.20
Nodes (10): configureApiApp(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders() (+2 more)

### Community 87 - "audit-log.e2e-spec.ts"
Cohesion: 0.06
Nodes (33): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditModule, auditedEventNames(), AuditRule (+25 more)

### Community 89 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): BatchResult, compareVersionCounts(), FieldReencryption, FieldResult, FieldVersionCount, reencryptionBatchSize, ReencryptionReport, SecretRow (+3 more)

### Community 90 - "zone.ts"
Cohesion: 0.21
Nodes (14): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, ApiZone, apiZones (+6 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.29
Nodes (7): describeErrors(), key1, key1Bytes, key2, key2Bytes, parseKeys(), requiredEnv

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), RunningServer (+1 more)

### Community 97 - "global-setup.ts"
Cohesion: 0.29
Nodes (8): testcontainers@^12.2.1, @testcontainers/postgresql@^12.2.1, setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl(), testcontainers, @testcontainers/postgresql

### Community 102 - "JsonObjectValidator"
Cohesion: 0.28
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 108 - "redis-connection.e2e-spec.ts"
Cohesion: 0.12
Nodes (18): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus() (+10 more)

### Community 109 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 115 - "telemetry.interceptor.spec.ts"
Cohesion: 0.16
Nodes (4): readMetricLines(), TelemetryProbeController, zoneUrl(), @nestjs/core

### Community 122 - "secrets-reencryption.module.ts"
Cohesion: 0.29
Nodes (4): CryptoModule, encryptedFields, registeredEncryptedFields, SecretsReencryptionModule

### Community 125 - "ZoneServers"
Cohesion: 0.22
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 135 - "telemetry.interceptor.ts"
Cohesion: 0.13
Nodes (6): HttpMetrics, StepTimes, FinishedOperation, roundSteps(), SlowOperations, TelemetryInterceptor

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 832 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `log-level-warn.spec.ts`, `server/package.json`, `telemetry.interceptor.ts`, `encryption.service.spec.ts`, `dependencies`, `server-errors.spec.ts`, `key-cli.ts`, `AuditLogEntry`, `origin.commands.ts`, `zone.guard.spec.ts`, `api.module.ts`, `config.module.ts`, `zone-probe.ts`, `api-keys.service.ts`, `zone-servers.spec.ts`, `main.ts`, `log-redaction.spec.ts`, `metrics.controller.ts`, `transactions.e2e-spec.ts`, `slow-operations.spec.ts`, `unit-probe.ts`, `migrate.module.ts`, `api-versioning.spec.ts`, `database.module.ts`, `encryption.service.ts`, `Zone`, `identity-keys.service.ts`, `OperationSteps`, `zod-serialization.spec.ts`, `cls-middleware.ts`, `health.module.ts`, `security-headers.spec.ts`, `api-app.ts`, `audit-log.e2e-spec.ts`, `secrets-reencryption.service.ts`, `zone.ts`, `telemetry.interceptor.spec.ts`, `body-limit.spec.ts`, `secrets-reencryption.module.ts`?**
  _High betweenness centrality (0.278) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07301587301587302 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `server/package.json`, `ref_node_path`, `dependencies`, `key-cli.ts`, `AuditLogEntry`, `chat-tables.e2e-spec.ts`, `ConversationEvent`, `api.module.ts`, `conversation.entity.spec.ts`, `migrate-mode.e2e-spec.ts`, `transactions.e2e-spec.ts`, `test-secrets.ts`, `database.module.ts`, `OperationSteps`, `participant.entity.spec.ts`, `database-entities.ts`, `CreateChatTables1793215389271`, `Message`, `redis-connection.e2e-spec.ts`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `zone-probe.ts` to `devDependencies`, `server/package.json`, `encryption.service.spec.ts`, `key-cli.ts`, `AuditLogEntry`, `key-format.ts`, `api.module.ts`, `config.module.ts`, `zone-servers.spec.ts`, `main.ts`, `api-keys.service.ts`, `projects-service.e2e-spec.ts`, `transactions.e2e-spec.ts`, `test-secrets.ts`, `unit-probe.ts`, `OperationSteps`, `cls-middleware.ts`, `audit-log.e2e-spec.ts`, `redis-connection.e2e-spec.ts`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._