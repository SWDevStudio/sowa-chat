# Graph Report - hector-chat-epic-10  (2026-10-29)

## Corpus Check
- 275 files · ~60,226 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1954 nodes · 4081 edges · 117 communities (86 shown, 31 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 77 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c505f29c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- request-id.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- server/package.json
- config.module.ts
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
- api.module.ts
- conversation-indexes.e2e-spec.ts
- scripts
- conversation.entity.spec.ts
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
- http-error.filter.spec.ts
- nest-cli.json
- zone-servers.spec.ts
- audit-log.e2e-spec.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- chat-schema.ts
- InternalProbeController
- logger.module.ts
- Visitor
- api-keys.service.ts
- conversation-event.entity.spec.ts
- database-connection.e2e-spec.ts
- Participant
- log-redaction.spec.ts
- protocol/src/index.ts
- AuditLogEntry
- body-limit.ts
- metrics.controller.ts
- migrate-mode.e2e-spec.ts
- CreateAuditLog1793200000000
- test-secrets.ts
- IdentityKey
- CreateIdentityKeys1793300001000
- projects-service.e2e-spec.ts
- api-versioning.spec.ts
- pg
- encryption.service.ts
- Zone
- sharp@^0.35.5
- config-startup.e2e-spec.ts
- socket.io@^4.8.4
- server-protocol.e2e-spec.ts
- json-object-limits.spec.ts
- OperationSteps
- packages-build.e2e-spec.ts
- @sowa-chat/protocol@workspace:*
- participant.entity.spec.ts
- database-entities.ts
- health.e2e-spec.ts
- health.module.ts
- security-headers.spec.ts
- body-limit.spec.ts
- workspace-check-types.e2e-spec.ts
- database.module.ts
- CreateChatTables1793215389271
- ZoneServers
- secrets-reencryption.service.ts
- api-app.ts
- Message
- ServerErrorsProbeController
- SecretsReencryptionService
- ApiKeysRepository
- log-redaction.e2e-spec.ts
- global-setup.ts
- cli-mode.e2e-spec.ts
- ErrorProbeController
- bullmq@^6.3.15
- JsonObjectValidator
- telemetry.interceptor.spec.ts
- Conversation
- key-generate.command.ts
- Message
- findFreePort
- typeorm
- zod-serialization.spec.ts
- secrets-reencryption.module.ts
- encryption-keys.schema.ts
- database-migrations.spec.ts
- CreateProjects1793193549883
- AddProjectsPublicKey1793300002000
- @nestjs/platform-socket.io@^12.1.3

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 92 edges
2. `typeorm` - 47 edges
3. `Zone()` - 46 edges
4. `Project` - 39 edges
5. `@nestjs/testing` - 28 edges
6. `Conversation` - 26 edges
7. `findFreePort()` - 25 edges
8. `startZoneProbeApp()` - 23 edges
9. `JsonObject` - 23 edges
10. `ApiKey` - 22 edges

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

## Communities (117 total, 31 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.17
Nodes (5): DatabaseMigration, AddConversationIndexes1793215983154, CreateApiKeys1793300000000, AddProjectsOperatorAllowedOrigins1793300003000, ColumnRow

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
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.08
Nodes (23): author, bin, sowa-chat, @aws-sdk/client-s3@^3.1151.0, nest-commander@^3.21.0, @nestjs/cache-manager@^12.0.1, @nestjs/swagger@^12.0.2, @nestjs/throttler@^6.7.1 (+15 more)

### Community 7 - "config.module.ts"
Cohesion: 0.05
Nodes (42): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, describeErrors() (+34 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.13
Nodes (10): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, databaseUrl(), IdentityRow, VersionRow, useTestRedis() (+2 more)

### Community 10 - "encryption.service.spec.ts"
Cohesion: 0.13
Nodes (9): CryptoModule, EncryptionService, SecretDecryptionError, captureError(), createService(), expectDecryptionError(), key1, key2 (+1 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, @aws-sdk/s3-request-presigner@^3.1151.0, cache-manager@^7.2.9, file-type@^22.1.1, helmet@^8.3.0, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/bullmq@^12.0.0, nestjs-cls@^7.0.1 (+26 more)

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
Cohesion: 0.12
Nodes (18): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ApiExceptionInput, entries(), errorEntriesOf() (+10 more)

### Community 23 - "api.module.ts"
Cohesion: 0.06
Nodes (36): databaseEntities, AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditModule, auditedEventNames() (+28 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "conversation.entity.spec.ts"
Cohesion: 0.15
Nodes (7): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget(), Visitor

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, runToExit() (+3 more)

### Community 28 - ".create"
Cohesion: 0.14
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.20
Nodes (13): ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation(), createMessage() (+5 more)

### Community 32 - "key-format.ts"
Cohesion: 0.14
Nodes (15): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+7 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 35 - "Project"
Cohesion: 0.11
Nodes (13): Project, CreatedProject, InvalidProjectNameError, ProjectActorKind, ProjectAlreadyExistsError, ProjectNotFoundError, ProjectsService, createProjectsServiceProbe() (+5 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "http-error.filter.spec.ts"
Cohesion: 0.13
Nodes (15): nestjs-zod@^5.5.0, ApiHttpModule, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse(), validationErrorResponse() (+7 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-servers.spec.ts"
Cohesion: 0.11
Nodes (21): HealthBody, HealthEntry, DependencyStatusBody, StatusBody, LogDestination, probeControllers, LogEntry, withOfflineDatabase() (+13 more)

### Community 41 - "audit-log.e2e-spec.ts"
Cohesion: 0.15
Nodes (5): KeysModule, ProjectsModule, NewProject, ProjectsRepository, @nestjs-cls/transactional-adapter-typeorm

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "chat-schema.ts"
Cohesion: 0.13
Nodes (14): boolean, ColumnSpec, expectedColumnCounts, expectedUniqueIndexes, integer, jsonb, nullableInteger, nullableJsonb (+6 more)

### Community 46 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 47 - "logger.module.ts"
Cohesion: 0.06
Nodes (36): cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, DatabaseMigrationStep, createLogDestination(), logFileDescriptor() (+28 more)

### Community 48 - "Visitor"
Cohesion: 0.32
Nodes (5): columns(), expectedColumns, findColumn(), findRelation(), relations()

### Community 49 - "api-keys.service.ts"
Cohesion: 0.08
Nodes (23): ApiKey, ApiKeyKind, apiKeyKinds, NewApiKey, eventFields, IssueApiKeyBaseInput, IssueApiKeyInput, IssuedApiKey (+15 more)

### Community 50 - "conversation-event.entity.spec.ts"
Cohesion: 0.36
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 51 - "database-connection.e2e-spec.ts"
Cohesion: 0.23
Nodes (11): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+3 more)

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.12
Nodes (10): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, jsonObjectSchema, JsonValue (+2 more)

### Community 55 - "AuditLogEntry"
Cohesion: 0.11
Nodes (13): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, WorkerModule, ColumnRow, expectedColumns (+5 more)

### Community 56 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 57 - "metrics.controller.ts"
Cohesion: 0.12
Nodes (9): prom-client@^15.1.3, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, MetricsController, ZoneProbeApp, @nestjs/common (+1 more)

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, withClient() (+2 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.16
Nodes (18): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertSecret(), insertVersion1Secrets(), key1 (+10 more)

### Community 61 - "IdentityKey"
Cohesion: 0.09
Nodes (16): jose@^6.2.12, IdentityKey, IdentityKeyAlgorithm, identityKeyAlgorithms, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey (+8 more)

### Community 63 - "projects-service.e2e-spec.ts"
Cohesion: 0.18
Nodes (15): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl(), CreateProjectInput, apiKeyRows() (+7 more)

### Community 64 - "api-versioning.spec.ts"
Cohesion: 0.19
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 66 - "encryption.service.ts"
Cohesion: 0.17
Nodes (12): authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv, tag (+4 more)

### Community 67 - "Zone"
Cohesion: 0.11
Nodes (14): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+6 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 73 - "OperationSteps"
Cohesion: 0.06
Nodes (18): ApiModule, useClsMiddleware(), DatabaseStepSubscriber, echoRequestId(), resolveRequestId(), OperationStep, operationSteps, OperationTiming (+10 more)

### Community 74 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.27
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "database-entities.ts"
Cohesion: 0.16
Nodes (13): ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind, messageSenderKinds (+5 more)

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

### Community 85 - "database.module.ts"
Cohesion: 0.25
Nodes (9): databaseMigrations, createTypeOrmModule(), getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity (+1 more)

### Community 88 - "ZoneServers"
Cohesion: 0.25
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 89 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): BatchResult, compareVersionCounts(), FieldReencryption, FieldResult, FieldVersionCount, reencryptionBatchSize, ReencryptionReport, SecretRow (+3 more)

### Community 90 - "api-app.ts"
Cohesion: 0.14
Nodes (18): configureApiApp(), DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, noStore() (+10 more)

### Community 91 - "Message"
Cohesion: 0.27
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 94 - "ApiKeysRepository"
Cohesion: 0.15
Nodes (5): ApiKeysRepository, ApiKeysService, hashMatches(), toEvent(), ApiKeysServiceProbe

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), RunningServer (+1 more)

### Community 97 - "global-setup.ts"
Cohesion: 0.24
Nodes (9): testcontainers@^12.2.1, @testcontainers/postgresql@^12.2.1, runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl(), testcontainers (+1 more)

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 102 - "JsonObjectValidator"
Cohesion: 0.17
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, JsonObjectValidator, Violation, JsonObjectLimits, encoder (+1 more)

### Community 103 - "telemetry.interceptor.spec.ts"
Cohesion: 0.09
Nodes (11): HttpMetrics, StepTimes, FinishedOperation, roundSteps(), SlowOperations, readMetricLines(), TelemetryProbeController, zoneUrl() (+3 more)

### Community 106 - "key-generate.command.ts"
Cohesion: 0.31
Nodes (5): emptyCell, formatDate(), writeLine(), writeTable(), KeyGenerateCommand

### Community 108 - "findFreePort"
Cohesion: 0.12
Nodes (18): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus() (+10 more)

### Community 110 - "typeorm"
Cohesion: 0.21
Nodes (6): typeorm@^1.1.2, database, loadDataSource(), channelColumns(), findColumn(), typeorm

### Community 112 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 122 - "secrets-reencryption.module.ts"
Cohesion: 0.43
Nodes (3): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule

### Community 123 - "encryption-keys.schema.ts"
Cohesion: 0.60
Nodes (5): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject()

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 775 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `metrics.controller.ts` to `request-id.spec.ts`, `server/package.json`, `config.module.ts`, `encryption.service.spec.ts`, `dependencies`, `server-errors.spec.ts`, `api.module.ts`, `zone.guard.spec.ts`, `Project`, `http-error.filter.spec.ts`, `zone-servers.spec.ts`, `audit-log.e2e-spec.ts`, `logger.module.ts`, `api-keys.service.ts`, `log-redaction.spec.ts`, `AuditLogEntry`, `body-limit.ts`, `api-versioning.spec.ts`, `encryption.service.ts`, `Zone`, `OperationSteps`, `health.module.ts`, `security-headers.spec.ts`, `body-limit.spec.ts`, `database.module.ts`, `ZoneServers`, `secrets-reencryption.service.ts`, `api-app.ts`, `telemetry.interceptor.spec.ts`, `zod-serialization.spec.ts`, `secrets-reencryption.module.ts`?**
  _High betweenness centrality (0.233) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `server/package.json`, `ref_node_path`, `conversation-indexes.e2e-spec.ts`, `conversation.entity.spec.ts`, `chat-tables.e2e-spec.ts`, `audit-log.e2e-spec.ts`, `Visitor`, `api-keys.service.ts`, `conversation-event.entity.spec.ts`, `AuditLogEntry`, `migrate-mode.e2e-spec.ts`, `CreateAuditLog1793200000000`, `test-secrets.ts`, `IdentityKey`, `CreateIdentityKeys1793300001000`, `projects-service.e2e-spec.ts`, `OperationSteps`, `participant.entity.spec.ts`, `database-entities.ts`, `database.module.ts`, `Message`, `findFreePort`, `CreateProjects1793193549883`, `AddProjectsPublicKey1793300002000`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Should `request-id.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `zone-servers.spec.ts` to `key-format.ts`, `Project`, `devDependencies`, `server/package.json`, `config.module.ts`, `OperationSteps`, `encryption.service.spec.ts`, `audit-log.e2e-spec.ts`, `findFreePort`, `logger.module.ts`, `api-keys.service.ts`, `AuditLogEntry`, `api.module.ts`, `test-secrets.ts`, `projects-service.e2e-spec.ts`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._