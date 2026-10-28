# Graph Report - hector-chat-epic-10  (2026-10-29)

## Corpus Check
- 257 files · ~54,730 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1823 nodes · 3723 edges · 122 communities (89 shown, 33 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 63 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fd9feef8`
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
- audit-log.listener.spec.ts
- test-database.ts
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
- chat-tables.e2e-spec.ts
- tsconfig.build.json
- ValidationProbeController
- http-error.filter.spec.ts
- nest-cli.json
- zone-servers.spec.ts
- audit-log.e2e-spec.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- ApiKey
- database-connection.e2e-spec.ts
- main.ts
- Visitor
- api-keys-service-probe.ts
- encryption-keys.schema.spec.ts
- database-connection.e2e-spec.ts
- log-redaction.spec.ts
- log-redaction.spec.ts
- ref_zod
- AuditLogEntry
- cls-middleware.ts
- metrics.controller.ts
- migrate-mode.e2e-spec.ts
- config.module.ts
- InternalProbeController
- identity-key-pem.ts
- api-keys.service.ts
- ref_vitest
- api-versioning.spec.ts
- api-keys.e2e-spec.ts
- encrypted-secret.spec.ts
- Zone
- database-options.ts
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- json-object-limits.spec.ts
- telemetry.interceptor.ts
- packages-build.e2e-spec.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- participant.entity.spec.ts
- database-entities.ts
- @nestjs/cache-manager@^12.0.1
- health.e2e-spec.ts
- health.module.ts
- Controller
- body-limit.spec.ts
- workspace-check-types.e2e-spec.ts
- zone.ts
- projects-table.e2e-spec.ts
- CreateChatTables1793215389271
- @nestjs/microservices@^12.1.3
- ZoneServers
- slow-operations.spec.ts
- api-app.ts
- Message
- ServerErrorsProbeController
- request-id.spec.ts
- ApiKeysRepository
- server-errors.spec.ts
- log-redaction.e2e-spec.ts
- global-setup.ts
- zod-validation.spec.ts
- ErrorProbeController
- bullmq@^6.3.15
- ZonedController
- status.controller.spec.ts
- telemetry.interceptor.spec.ts
- file-type@^22.1.1
- @nestjs/swagger
- CreateAuditLog1793200000000
- CreateApiKeys1793300000000
- zod@catalog:
- api-keys.repository.ts
- jose
- nest-commander@^3.21.0
- @nestjs/bullmq@^12.0.0
- @nestjs/platform-socket.io@^12.1.3
- vitest@catalog:

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 88 edges
2. `Zone()` - 46 edges
3. `typeorm` - 44 edges
4. `Project` - 33 edges
5. `Conversation` - 26 edges
6. `findFreePort()` - 25 edges
7. `@nestjs/testing` - 24 edges
8. `startZoneProbeApp()` - 23 edges
9. `JsonObject` - 23 edges
10. `@nestjs/config` - 21 edges

## Surprising Connections (you probably didn't know these)
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
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

## Communities (122 total, 33 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.15
Nodes (4): CreateProjects1793193549883, AddConversationIndexes1793215983154, CreateIdentityKeys1793300001000, AddProjectsPublicKey1793300002000

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "request-id.spec.ts"
Cohesion: 0.18
Nodes (9): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+1 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.10
Nodes (19): author, cache-manager@^7.2.9, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/throttler@^6.7.1, pino-http@^11.0.0, sharp@^0.35.5, @socket.io/redis-adapter@^8.3.0, description (+11 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (21): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange() (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.11
Nodes (9): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, IdentityRow, VersionRow, useTestRedis(), redisUrl() (+1 more)

### Community 10 - "encryption.service.spec.ts"
Cohesion: 0.12
Nodes (15): encryptionConfig, CryptoModule, authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService (+7 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @aws-sdk/client-s3@^3.1151.0, helmet@^8.3.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1 (+22 more)

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
Cohesion: 0.16
Nodes (12): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ErrorCode, errorCodes, errorDetailSchema (+4 more)

### Community 23 - "audit-log.listener.spec.ts"
Cohesion: 0.06
Nodes (36): AuditLogListener, eventValues, happened, personalValues, AuditModule, auditedEventNames(), AuditRecord, AuditRule (+28 more)

### Community 24 - "test-database.ts"
Cohesion: 0.12
Nodes (17): database, loadDataSource(), databaseEntities, apiKeyKinds, identityKeyAlgorithms, ColumnRow, expectedColumns, IndexRow (+9 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.14
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.12
Nodes (16): boolean, ColumnSpec, expectedColumnCounts, expectedForeignKeys, expectedTables, expectedUniqueIndexes, integer, jsonb (+8 more)

### Community 32 - "key-format.ts"
Cohesion: 0.23
Nodes (13): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+5 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "chat-tables.e2e-spec.ts"
Cohesion: 0.13
Nodes (14): Channel, channelColumns(), findColumn(), ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows() (+6 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "http-error.filter.spec.ts"
Cohesion: 0.15
Nodes (12): ApiHttpModule, errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter, requestIdOf() (+4 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-servers.spec.ts"
Cohesion: 0.13
Nodes (17): HealthBody, HealthEntry, findZonePorts(), probeControllers, findFreePort(), serverDirectory, withOfflineDatabase(), offlineRedis (+9 more)

### Community 41 - "audit-log.e2e-spec.ts"
Cohesion: 0.13
Nodes (5): Project, ProjectsModule, ProjectsRepository, WorkerModule, @nestjs-cls/transactional-adapter-typeorm

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "ResponseProbeController"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 46 - "database-connection.e2e-spec.ts"
Cohesion: 0.14
Nodes (13): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), fetchStatus(), repositoryRoot (+5 more)

### Community 47 - "main.ts"
Cohesion: 0.07
Nodes (31): configureApiApp(), CliModule, DatabaseMigrationStep, createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions() (+23 more)

### Community 48 - "Visitor"
Cohesion: 0.15
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor

### Community 49 - "api-keys-service-probe.ts"
Cohesion: 0.24
Nodes (12): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+4 more)

### Community 50 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 51 - "database-connection.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "log-redaction.spec.ts"
Cohesion: 0.16
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 54 - "ref_zod"
Cohesion: 0.18
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 55 - "AuditLogEntry"
Cohesion: 0.10
Nodes (11): ActorKind, actorKinds, AuditLogEntry, AuditLogRepository, NewAuditLogEntry, ColumnRow, expectedColumns, jsonObjectSchema (+3 more)

### Community 56 - "cls-middleware.ts"
Cohesion: 0.29
Nodes (6): ApiModule, useClsMiddleware(), echoRequestId(), requestIdHeader, resolveRequestId(), createE2eApp()

### Community 57 - "metrics.controller.ts"
Cohesion: 0.22
Nodes (3): prom-client@^15.1.3, MetricsController, prom-client

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 59 - "config.module.ts"
Cohesion: 0.28
Nodes (13): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+5 more)

### Community 60 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 61 - "identity-key-pem.ts"
Cohesion: 0.23
Nodes (9): IdentityKeyAlgorithm, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey(), readPublicKeyObject(), captureError() (+1 more)

### Community 62 - "api-keys.service.ts"
Cohesion: 0.21
Nodes (9): hashMatches(), IssueApiKeyBaseInput, IssueApiKeyInput, IssuedApiKey, KeyActorKind, keyTypeByKind, RevokeApiKeyInput, VerifiedApiKey (+1 more)

### Community 63 - "ref_vitest"
Cohesion: 0.42
Nodes (6): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl()

### Community 64 - "api-versioning.spec.ts"
Cohesion: 0.11
Nodes (6): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController, ProbeController, ProbeService

### Community 66 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 67 - "Zone"
Cohesion: 0.13
Nodes (11): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+3 more)

### Community 68 - "database-options.ts"
Cohesion: 0.25
Nodes (7): DatabaseMigration, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity, SecondEntity, runDatabaseMigrations()

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.31
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "json-object-limits.spec.ts"
Cohesion: 0.10
Nodes (15): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+7 more)

### Community 73 - "telemetry.interceptor.ts"
Cohesion: 0.11
Nodes (9): DatabaseStepSubscriber, OperationStep, OperationTiming, OperationSteps, OperationStepsProbeController, beginOperation(), operationTimingKey, nestjs-cls (+1 more)

### Community 74 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "database-entities.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 79 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 80 - "health.module.ts"
Cohesion: 0.06
Nodes (19): ioredis@^6.0.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+11 more)

### Community 81 - "Controller"
Cohesion: 0.21
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "zone.ts"
Cohesion: 0.22
Nodes (12): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, ApiZone, apiZones (+4 more)

### Community 85 - "projects-table.e2e-spec.ts"
Cohesion: 0.20
Nodes (5): databaseMigrations, migrationFiles, migrationsDirectory, AddProjectsOperatorAllowedOrigins1793300003000, ColumnRow

### Community 88 - "ZoneServers"
Cohesion: 0.22
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 89 - "slow-operations.spec.ts"
Cohesion: 0.24
Nodes (3): LogEntry, pause(), SlowProbeController

### Community 90 - "api-app.ts"
Cohesion: 0.14
Nodes (12): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders(), LogDestination (+4 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 93 - "request-id.spec.ts"
Cohesion: 0.31
Nodes (8): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, waitForRequestEntry()

### Community 94 - "ApiKeysRepository"
Cohesion: 0.16
Nodes (3): ApiKeysRepository, ApiKeysService, toEvent()

### Community 95 - "server-errors.spec.ts"
Cohesion: 0.28
Nodes (7): internalErrorMessage, ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, stringsInside()

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 97 - "global-setup.ts"
Cohesion: 0.57
Nodes (4): setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 98 - "zod-validation.spec.ts"
Cohesion: 0.33
Nodes (4): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto

### Community 101 - "ZonedController"
Cohesion: 0.21
Nodes (5): BareController, MethodOnlyController, ZonedController, zoneMetadataKey, @nestjs/core

### Community 102 - "status.controller.spec.ts"
Cohesion: 0.33
Nodes (3): DependencyStatusBody, StatusBody, databaseUrl()

### Community 103 - "telemetry.interceptor.spec.ts"
Cohesion: 0.10
Nodes (13): HttpLabel, HttpMetrics, HttpRequestRecord, labelNames, operationSteps, StepTimes, FinishedOperation, roundSteps() (+5 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 737 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `api-app.ts` to `request-id.spec.ts`, `server/package.json`, `encryption.service.spec.ts`, `dependencies`, `server-errors.spec.ts`, `audit-log.listener.spec.ts`, `test-database.ts`, `zone.guard.spec.ts`, `http-error.filter.spec.ts`, `zone-servers.spec.ts`, `audit-log.e2e-spec.ts`, `ResponseProbeController`, `main.ts`, `log-redaction.spec.ts`, `AuditLogEntry`, `cls-middleware.ts`, `metrics.controller.ts`, `config.module.ts`, `api-keys.service.ts`, `api-versioning.spec.ts`, `api-keys.e2e-spec.ts`, `Zone`, `telemetry.interceptor.ts`, `health.module.ts`, `Controller`, `body-limit.spec.ts`, `zone.ts`, `slow-operations.spec.ts`, `request-id.spec.ts`, `server-errors.spec.ts`, `zod-validation.spec.ts`, `ZonedController`, `status.controller.spec.ts`, `telemetry.interceptor.spec.ts`, `api-keys.repository.ts`?**
  _High betweenness centrality (0.230) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14705882352941177 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `test-database.ts` to `database-migrations.ts`, `server/package.json`, `ref_node_path`, `dependencies`, `conversation.entity.spec.ts`, `ConversationEvent`, `chat-tables.e2e-spec.ts`, `audit-log.e2e-spec.ts`, `database-connection.e2e-spec.ts`, `Visitor`, `AuditLogEntry`, `migrate-mode.e2e-spec.ts`, `database-options.ts`, `telemetry.interceptor.ts`, `participant.entity.spec.ts`, `database-entities.ts`, `projects-table.e2e-spec.ts`, `CreateChatTables1793215389271`, `Message`, `CreateAuditLog1793200000000`, `CreateApiKeys1793300000000`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `zone-servers.spec.ts` to `api-keys.e2e-spec.ts`, `devDependencies`, `server/package.json`, `telemetry.interceptor.ts`, `encryption.service.spec.ts`, `audit-log.e2e-spec.ts`, `database-connection.e2e-spec.ts`, `main.ts`, `api-keys-service-probe.ts`, `AuditLogEntry`, `audit-log.listener.spec.ts`, `cls-middleware.ts`, `config.module.ts`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._