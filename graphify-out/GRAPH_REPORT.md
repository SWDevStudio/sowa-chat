# Graph Report - hector-chat-epic-10  (2026-10-29)

## Corpus Check
- 294 files · ~67,554 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2109 nodes · 4591 edges · 117 communities (91 shown, 26 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 103 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ba9169a9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- typeorm
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- server/package.json
- config.module.ts
- compilerOptions
- ref_vitest
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
- test-database.ts
- scripts
- audited-events.spec.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- key-format.ts
- zone.guard.spec.ts
- ConversationEvent
- Project
- tsconfig.build.json
- ValidationProbeController
- redis.module.ts
- nest-cli.json
- zone-servers.spec.ts
- conversation.entity.spec.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- ApiKeysService
- log-redaction.spec.ts
- main.ts
- Project
- api-keys.service.ts
- @nestjs/common
- database-connection.e2e-spec.ts
- project-commands.e2e-spec.ts
- log-redaction.spec.ts
- protocol/src/index.ts
- operation-steps.ts
- ProjectCreateCommand
- metrics.controller.ts
- migrate-mode.e2e-spec.ts
- projects.service.ts
- test-secrets.ts
- api-keys.service.ts
- request-id.spec.ts
- DatabaseStepSubscriber
- api-versioning.spec.ts
- zod-validation.spec.ts
- encryption.service.ts
- Zone
- ProbeController
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- OperationSteps
- zod-serialization.spec.ts
- helmet
- participant.entity.spec.ts
- database-entities.ts
- @nestjs/bullmq@^12.0.0
- health.e2e-spec.ts
- health.module.ts
- security-headers.spec.ts
- socket.io@^4.8.4
- workspace-check-types.e2e-spec.ts
- api-app.ts
- CreateChatTables1793215389271
- worker.module.ts
- ZoneServers
- secrets-reencryption.service.ts
- zone.ts
- Message
- SecretsReencryptionService
- ApiKey
- cls-middleware.ts
- log-redaction.e2e-spec.ts
- global-setup.ts
- cli-mode.e2e-spec.ts
- JsonObjectValidator
- HttpMetrics
- project-list.command.ts
- database-connection.e2e-spec.ts
- ref_node_path
- SlowProbeController
- telemetry.interceptor.spec.ts
- body-limit.spec.ts
- secrets-reencryption.module.ts
- cache-manager@^7.2.9
- @nestjs/microservices@^12.1.3
- @nestjs/swagger
- telemetry.interceptor.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 99 edges
2. `typeorm` - 49 edges
3. `Zone()` - 46 edges
4. `Project` - 40 edges
5. `@nestjs/testing` - 32 edges
6. `ApiKey` - 27 edges
7. `Conversation` - 26 edges
8. `findFreePort()` - 25 edges
9. `DomainEventBus` - 23 edges
10. `startZoneProbeApp()` - 23 edges

## Surprising Connections (you probably didn't know these)
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
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

## Communities (117 total, 26 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.08
Nodes (15): DatabaseMigration, databaseMigrations, DatabaseConnection, DatabaseEntity, FirstEntity, SecondEntity, CreateProjects1793193549883, CreateAuditLog1793200000000 (+7 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.29
Nodes (9): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+1 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.08
Nodes (25): author, bin, sowa-chat, @aws-sdk/s3-request-presigner@^3.1151.0, bullmq@^6.3.15, file-type@^22.1.1, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/websockets@^12.1.3 (+17 more)

### Community 7 - "config.module.ts"
Cohesion: 0.05
Nodes (47): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, EncryptionKey (+39 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_vitest"
Cohesion: 0.10
Nodes (14): ioredis@^6.0.0, databaseUrl(), IdentityRow, VersionRow, fetchStatus(), repositoryRoot, RunResult, serverEnvironment() (+6 more)

### Community 10 - "encryption.service.spec.ts"
Cohesion: 0.14
Nodes (9): CryptoModule, EncryptionService, SecretDecryptionError, captureError(), createService(), expectDecryptionError(), key1, key2 (+1 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, @aws-sdk/client-s3@^3.1151.0, jose@^6.2.12, nest-commander@^3.21.0, @nestjs/cache-manager@^12.0.1, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1 (+27 more)

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
Cohesion: 0.23
Nodes (20): toLookupPrefix(), CreateProjectInput, auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix() (+12 more)

### Community 24 - "test-database.ts"
Cohesion: 0.09
Nodes (27): actorKinds, identityKeyAlgorithms, createDataSourceOptions(), WorkerModule, ColumnRow, expectedColumns, ColumnRow, expectedColumns (+19 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "audited-events.spec.ts"
Cohesion: 0.16
Nodes (10): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, serverKeyEvent, ApiKeyEvent (+2 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.09
Nodes (27): ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation(), createMessage() (+19 more)

### Community 32 - "key-format.ts"
Cohesion: 0.16
Nodes (13): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+5 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "Project"
Cohesion: 0.13
Nodes (19): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl(), columns, createMain() (+11 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "redis.module.ts"
Cohesion: 0.22
Nodes (6): closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-servers.spec.ts"
Cohesion: 0.14
Nodes (18): DependencyStatusBody, StatusBody, findZonePorts(), probeControllers, findFreePort(), serverDirectory, withOfflineDatabase(), offlineRedis (+10 more)

### Community 41 - "conversation.entity.spec.ts"
Cohesion: 0.13
Nodes (9): Channel, channelColumns(), findColumn(), columns(), expectedColumns, findColumn(), findRelation(), relations() (+1 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "ApiKeysService"
Cohesion: 0.09
Nodes (6): KeyCreateCommand, ApiKeysService, toEvent(), AuditScenarios, happenedIn(), ScenarioError

### Community 46 - "log-redaction.spec.ts"
Cohesion: 0.18
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 47 - "main.ts"
Cohesion: 0.06
Nodes (36): ApiModule, cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, DatabaseMigrationStep, createLogDestination() (+28 more)

### Community 48 - "Project"
Cohesion: 0.08
Nodes (9): AuditLogEntry, Project, columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor (+1 more)

### Community 49 - "api-keys.service.ts"
Cohesion: 0.18
Nodes (14): apiKeyKinds, eventFields, keyTypeByKind, serverKey, hashKey(), ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe() (+6 more)

### Community 50 - "@nestjs/common"
Cohesion: 0.09
Nodes (17): KeyCreateOptions, KeyRevokeCommand, KeyRevokeOptions, ProjectCreateOptions, AuditModule, AppClsModule, AppConfigModule, createTypeOrmModule() (+9 more)

### Community 51 - "database-connection.e2e-spec.ts"
Cohesion: 0.19
Nodes (13): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+5 more)

### Community 52 - "project-commands.e2e-spec.ts"
Cohesion: 0.25
Nodes (11): CliRunResult, runCliInProcess(), buildServer(), createMain(), fullOriginArguments, listHeader, onceWarning, repositoryRoot (+3 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.08
Nodes (23): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, defaultLimits, isAccepted() (+15 more)

### Community 55 - "operation-steps.ts"
Cohesion: 0.35
Nodes (4): beginOperation(), operationTimingKey, nestjs-cls, @nestjs/typeorm

### Community 57 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 59 - "projects.service.ts"
Cohesion: 0.07
Nodes (21): IssuedApiKey, OriginList, originLists, NewProject, ORIGIN_COLUMNS, OriginsRow, ProjectsRepository, ChangeOriginInput (+13 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.16
Nodes (18): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertSecret(), insertVersion1Secrets(), key1 (+10 more)

### Community 61 - "api-keys.service.ts"
Cohesion: 0.12
Nodes (15): ApiKeyKind, NewApiKey, IssueApiKeyBaseInput, IssueApiKeyInput, KeyActorKind, RevokeApiKeyInput, toSummary(), VerifiedApiKey (+7 more)

### Community 62 - "request-id.spec.ts"
Cohesion: 0.24
Nodes (8): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, ProbeService, waitForRequestEntry()

### Community 64 - "api-versioning.spec.ts"
Cohesion: 0.15
Nodes (5): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController, ZoneProbeApp

### Community 65 - "zod-validation.spec.ts"
Cohesion: 0.33
Nodes (4): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto

### Community 66 - "encryption.service.ts"
Cohesion: 0.17
Nodes (12): authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv, tag (+4 more)

### Community 67 - "Zone"
Cohesion: 0.11
Nodes (14): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+6 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "IdentityKey"
Cohesion: 0.06
Nodes (17): IdentityKey, IdentityKeyAlgorithm, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey(), readPublicKeyObject() (+9 more)

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 73 - "OperationSteps"
Cohesion: 0.19
Nodes (3): OperationStep, OperationSteps, OperationStepsProbeController

### Community 74 - "zod-serialization.spec.ts"
Cohesion: 0.22
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, redirectLogsTo()

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.27
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "database-entities.ts"
Cohesion: 0.07
Nodes (18): database, loadDataSource(), databaseEntities, Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses (+10 more)

### Community 79 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 81 - "security-headers.spec.ts"
Cohesion: 0.21
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "api-app.ts"
Cohesion: 0.21
Nodes (10): configureApiApp(), setupApiDocs(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore() (+2 more)

### Community 87 - "worker.module.ts"
Cohesion: 0.08
Nodes (25): ActorKind, AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, NewAuditLogEntry, auditedEventNames() (+17 more)

### Community 88 - "ZoneServers"
Cohesion: 0.29
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 89 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): BatchResult, compareVersionCounts(), FieldReencryption, FieldResult, FieldVersionCount, reencryptionBatchSize, ReencryptionReport, SecretRow (+3 more)

### Community 90 - "zone.ts"
Cohesion: 0.16
Nodes (15): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), zonePathPrefixes, ApiZone (+7 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 94 - "ApiKey"
Cohesion: 0.12
Nodes (3): ApiKey, ApiKeysRepository, hashMatches()

### Community 95 - "cls-middleware.ts"
Cohesion: 0.46
Nodes (4): useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp()

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.31
Nodes (8): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), RunningServer

### Community 97 - "global-setup.ts"
Cohesion: 0.24
Nodes (9): testcontainers@^12.2.1, @testcontainers/postgresql@^12.2.1, runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl(), testcontainers (+1 more)

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 102 - "JsonObjectValidator"
Cohesion: 0.28
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 106 - "project-list.command.ts"
Cohesion: 0.11
Nodes (14): emptyCell, formatDate(), writeLine(), writeTable(), KeyGenerateCommand, header, KeyListCommand, KeyListOptions (+6 more)

### Community 108 - "database-connection.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus()

### Community 109 - "ref_node_path"
Cohesion: 0.11
Nodes (13): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, builtFiles, CommandResult (+5 more)

### Community 111 - "SlowProbeController"
Cohesion: 0.24
Nodes (3): LogEntry, pause(), SlowProbeController

### Community 115 - "telemetry.interceptor.spec.ts"
Cohesion: 0.11
Nodes (8): BareController, MethodOnlyController, ZonedController, zoneMetadataKey, readMetricLines(), TelemetryProbeController, zoneUrl(), @nestjs/core

### Community 122 - "secrets-reencryption.module.ts"
Cohesion: 0.43
Nodes (3): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule

### Community 135 - "telemetry.interceptor.ts"
Cohesion: 0.23
Nodes (6): operationSteps, OperationTiming, StepTimes, FinishedOperation, roundSteps(), SlowOperations

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 817 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `log-level-warn.spec.ts`, `server/package.json`, `config.module.ts`, `telemetry.interceptor.ts`, `encryption.service.spec.ts`, `dependencies`, `server-errors.spec.ts`, `test-database.ts`, `zone.guard.spec.ts`, `redis.module.ts`, `zone-servers.spec.ts`, `log-redaction.spec.ts`, `main.ts`, `operation-steps.ts`, `metrics.controller.ts`, `projects.service.ts`, `api-keys.service.ts`, `request-id.spec.ts`, `api-versioning.spec.ts`, `zod-validation.spec.ts`, `encryption.service.ts`, `Zone`, `zod-serialization.spec.ts`, `health.module.ts`, `security-headers.spec.ts`, `api-app.ts`, `worker.module.ts`, `secrets-reencryption.service.ts`, `zone.ts`, `cls-middleware.ts`, `project-list.command.ts`, `SlowProbeController`, `telemetry.interceptor.spec.ts`, `body-limit.spec.ts`, `secrets-reencryption.module.ts`?**
  _High betweenness centrality (0.267) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.08013937282229965 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `ConversationEvent`, `server/package.json`, `conversation.entity.spec.ts`, `ref_vitest`, `participant.entity.spec.ts`, `database-entities.ts`, `dependencies`, `database-connection.e2e-spec.ts`, `Project`, `api-keys.service.ts`, `key-cli.ts`, `operation-steps.ts`, `test-database.ts`, `migrate-mode.e2e-spec.ts`, `Message`, `test-secrets.ts`, `api-keys.service.ts`, `chat-tables.e2e-spec.ts`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `zone-servers.spec.ts` to `key-format.ts`, `Project`, `devDependencies`, `server/package.json`, `config.module.ts`, `ref_vitest`, `encryption.service.spec.ts`, `database-connection.e2e-spec.ts`, `main.ts`, `api-keys.service.ts`, `key-cli.ts`, `operation-steps.ts`, `worker.module.ts`, `test-database.ts`, `projects.service.ts`, `test-secrets.ts`, `api-keys.service.ts`, `cls-middleware.ts`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._