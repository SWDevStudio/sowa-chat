# Graph Report - hector-chat-epic-12  (2026-10-29)

## Corpus Check
- 263 files · ~56,533 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1856 nodes · 3781 edges · 128 communities (90 shown, 38 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 62 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ccfbbd82`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- logger.module.ts
- devDependencies
- server-modes.e2e-spec.ts
- api-versioning.spec.ts
- env.schema.ts
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
- RequestContext
- ref_node_crypto
- scripts
- zone-servers.spec.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- key-format.ts
- api.module.ts
- request-id.spec.ts
- Project
- tsconfig.build.json
- ValidationProbeController
- http-error.filter.spec.ts
- nest-cli.json
- zone-servers.ts
- audit-log.e2e-spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- ApiKey
- telemetry.interceptor.ts
- migrate.module.ts
- ConversationEvent
- api-keys-service-probe.ts
- encryption-keys.schema.spec.ts
- ref_zod
- database-options.ts
- log-redaction.spec.ts
- protocol/src/index.ts
- AuditLogEntry
- Visitor
- ref_vitest
- findFreePort
- config.module.ts
- InternalProbeController
- token-signing-keys.schema.spec.ts
- api-keys.service.ts
- domain-event-bus.spec.ts
- NeutralProbeController
- api-keys.e2e-spec.ts
- json-object-limits.spec.ts
- Zone
- main.ts
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- CreateChatTables1793215389271
- telemetry.interceptor.ts
- packages-build.e2e-spec.ts
- encrypted-secret.spec.ts
- participant.entity.spec.ts
- conversation.entity.ts
- metrics.controller.ts
- health.e2e-spec.ts
- health.module.ts
- cache-manager@^7.2.9
- BodyProbeController
- workspace-check-types.e2e-spec.ts
- zone.decorator.ts
- Controller
- run-database-migrations.ts
- MixedZoneController
- conversation.entity.spec.ts
- @nestjs/common
- ref_express
- Message
- ServerErrorsProbeController
- TelemetryProbeController
- ApiKeysService
- @aws-sdk/s3-request-presigner@^3.1151.0
- audit-log.listener.spec.ts
- nest-commander@^3.21.0
- server-errors.spec.ts
- ErrorProbeController
- @nestjs/microservices@^12.1.3
- ZonedController
- slow-operations.ts
- @nestjs/platform-socket.io@^12.1.3
- bullmq@^6.3.15
- server/package.json
- ref_node_fs
- @nest-lab/throttler-storage-redis@^1.2.0
- @nestjs/swagger
- pg
- encryption-keys.schema.ts
- env.schema.logging.spec.ts
- env.schema.spec.ts
- DatabaseMigrationStep
- CreateProjects1793193549883
- AddConversationIndexes1793215983154
- AddProjectsPublicKey1793300002000
- env.schema.slow-operations.spec.ts
- helmet
- @nestjs/cache-manager@^12.0.1
- vite@catalog:

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 91 edges
2. `Zone()` - 46 edges
3. `typeorm` - 45 edges
4. `Project` - 35 edges
5. `Conversation` - 26 edges
6. `findFreePort()` - 25 edges
7. `@nestjs/testing` - 24 edges
8. `startZoneProbeApp()` - 23 edges
9. `JsonObject` - 23 edges
10. `@nestjs/config` - 22 edges

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

## Communities (128 total, 38 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.14
Nodes (5): DatabaseMigration, CreateAuditLog1793200000000, CreateApiKeys1793300000000, CreateIdentityKeys1793300001000, CreateOperators1793300003000

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "logger.module.ts"
Cohesion: 0.29
Nodes (8): createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions(), redactPaths, sensitiveFields, sensitiveHeaders

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "api-versioning.spec.ts"
Cohesion: 0.08
Nodes (8): probeControllers, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ProbeController, ProbeService, ZoneProbeApp

### Community 7 - "env.schema.ts"
Cohesion: 0.14
Nodes (17): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+9 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_vitest"
Cohesion: 0.15
Nodes (5): IdentityRow, VersionRow, useTestRedis(), redisUrl(), testEnv

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
Nodes (29): dependencies, @aws-sdk/client-s3@^3.1151.0, file-type@^22.1.1, jose@^6.2.12, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1 (+21 more)

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
Cohesion: 0.29
Nodes (6): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ErrorCode

### Community 24 - "ref_node_crypto"
Cohesion: 0.10
Nodes (20): loadDataSource(), apiKeyKinds, IdentityKeyAlgorithm, identityKeyAlgorithms, ColumnRow, expectedColumns, IndexRow, PlanRow (+12 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "zone-servers.spec.ts"
Cohesion: 0.11
Nodes (22): configureApiApp(), HealthBody, HealthEntry, DependencyStatusBody, StatusBody, bodyLimit, useBodyLimit(), probeControllers (+14 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (12): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, runToExit() (+4 more)

### Community 28 - ".create"
Cohesion: 0.16
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.12
Nodes (16): boolean, ColumnSpec, expectedColumnCounts, expectedForeignKeys, expectedTables, expectedUniqueIndexes, integer, jsonb (+8 more)

### Community 32 - "key-format.ts"
Cohesion: 0.21
Nodes (14): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+6 more)

### Community 33 - "api.module.ts"
Cohesion: 0.15
Nodes (5): ApiModule, ApiHttpModule, RequestContextModule, ConsumerModule, ZonesModule

### Community 34 - "request-id.spec.ts"
Cohesion: 0.12
Nodes (14): LogDestination, createRedactionProbeApp(), createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry (+6 more)

### Community 35 - "Project"
Cohesion: 0.11
Nodes (16): Channel, channelColumns(), findColumn(), Project, ColumnRow, ForeignKeyRow, IndexRow, tableNames (+8 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "http-error.filter.spec.ts"
Cohesion: 0.15
Nodes (14): nestjs-zod@^5.5.0, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter (+6 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-servers.ts"
Cohesion: 0.22
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 41 - "audit-log.e2e-spec.ts"
Cohesion: 0.15
Nodes (6): ProjectsModule, ProjectsRepository, WorkerModule, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm, @nestjs/common

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "zod-serialization.spec.ts"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 45 - "ApiKey"
Cohesion: 0.12
Nodes (4): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey

### Community 46 - "telemetry.interceptor.ts"
Cohesion: 0.19
Nodes (3): portsConfig, HttpMetrics, TelemetryInterceptor

### Community 47 - "migrate.module.ts"
Cohesion: 0.22
Nodes (4): PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 48 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 49 - "api-keys-service-probe.ts"
Cohesion: 0.26
Nodes (11): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+3 more)

### Community 50 - "encryption-keys.schema.spec.ts"
Cohesion: 0.29
Nodes (7): describeErrors(), key1, key1Bytes, key2, key2Bytes, parseKeys(), requiredEnv

### Community 51 - "ref_zod"
Cohesion: 0.18
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 52 - "database-options.ts"
Cohesion: 0.18
Nodes (8): database, databaseMigrations, migrationFiles, migrationsDirectory, DatabaseConnection, DatabaseEntity, FirstEntity, SecondEntity

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.06
Nodes (21): allOutput(), CapturedLogs, fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields, RedactionProbeController (+13 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.11
Nodes (12): Operator, RequestOperator, jsonObjectSchema, JsonObjectLimits, JsonValue, OperatorRole, operatorRoles, OperatorTokenRequest (+4 more)

### Community 55 - "AuditLogEntry"
Cohesion: 0.18
Nodes (7): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, ColumnRow, expectedColumns, JsonObject

### Community 56 - "Visitor"
Cohesion: 0.15
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor

### Community 57 - "ref_vitest"
Cohesion: 0.28
Nodes (6): errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody

### Community 58 - "findFreePort"
Cohesion: 0.06
Nodes (47): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus() (+39 more)

### Community 59 - "config.module.ts"
Cohesion: 0.26
Nodes (13): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+5 more)

### Community 60 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 61 - "token-signing-keys.schema.spec.ts"
Cohesion: 0.26
Nodes (7): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, TokenSigningKey, tokenSigningKeysSchema

### Community 62 - "api-keys.service.ts"
Cohesion: 0.22
Nodes (9): hashMatches(), IssueApiKeyBaseInput, IssueApiKeyInput, IssuedApiKey, KeyActorKind, keyTypeByKind, RevokeApiKeyInput, VerifiedApiKey (+1 more)

### Community 63 - "domain-event-bus.spec.ts"
Cohesion: 0.22
Nodes (10): happened, TestListener, DomainEventHandler, DomainEventName, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent (+2 more)

### Community 64 - "NeutralProbeController"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 66 - "json-object-limits.spec.ts"
Cohesion: 0.10
Nodes (15): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+7 more)

### Community 67 - "Zone"
Cohesion: 0.15
Nodes (11): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+3 more)

### Community 68 - "main.ts"
Cohesion: 0.18
Nodes (13): CliModule, createContext(), mode, runApi(), runCli(), runMigrate(), runners, runToCompletion() (+5 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.31
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 73 - "telemetry.interceptor.ts"
Cohesion: 0.07
Nodes (16): useClsMiddleware(), DatabaseStepSubscriber, echoRequestId(), resolveRequestId(), OperationStep, operationSteps, OperationTiming, OperationSteps (+8 more)

### Community 74 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 75 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "conversation.entity.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 78 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 79 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 80 - "health.module.ts"
Cohesion: 0.06
Nodes (19): ioredis@^6.0.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+11 more)

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "zone.decorator.ts"
Cohesion: 0.09
Nodes (25): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, probeControllers, ApiZone (+17 more)

### Community 85 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 86 - "run-database-migrations.ts"
Cohesion: 0.40
Nodes (6): createDataSourceOptions(), runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 87 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 88 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 89 - "@nestjs/common"
Cohesion: 0.13
Nodes (11): databaseEntities, AuditModule, AppClsModule, AppConfigModule, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules (+3 more)

### Community 90 - "ref_express"
Cohesion: 0.32
Nodes (5): BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders()

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 96 - "audit-log.listener.spec.ts"
Cohesion: 0.11
Nodes (16): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, auditedEventNames(), AuditRecord, AuditRule (+8 more)

### Community 98 - "server-errors.spec.ts"
Cohesion: 0.32
Nodes (6): ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, stringsInside()

### Community 102 - "slow-operations.ts"
Cohesion: 0.50
Nodes (3): StepTimes, FinishedOperation, roundSteps()

### Community 105 - "server/package.json"
Cohesion: 0.10
Nodes (19): author, @nestjs/bullmq@^12.0.0, @nestjs/throttler@^6.7.1, pino-http@^11.0.0, rxjs@^7.8.1, socket.io@^4.8.4, @sowa-chat/protocol@workspace:*, description (+11 more)

### Community 106 - "ref_node_fs"
Cohesion: 0.33
Nodes (4): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson

### Community 110 - "encryption-keys.schema.ts"
Cohesion: 0.60
Nodes (5): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject()

### Community 112 - "env.schema.logging.spec.ts"
Cohesion: 0.33
Nodes (3): Env, logLevels, requiredEnv

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 754 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **38 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `audit-log.e2e-spec.ts` to `logger.module.ts`, `api-versioning.spec.ts`, `encryption.service.spec.ts`, `dependencies`, `server-errors.spec.ts`, `ref_node_crypto`, `zone-servers.spec.ts`, `api.module.ts`, `request-id.spec.ts`, `http-error.filter.spec.ts`, `zod-serialization.spec.ts`, `ApiKey`, `telemetry.interceptor.ts`, `migrate.module.ts`, `log-redaction.spec.ts`, `protocol/src/index.ts`, `AuditLogEntry`, `config.module.ts`, `api-keys.service.ts`, `domain-event-bus.spec.ts`, `api-keys.e2e-spec.ts`, `Zone`, `main.ts`, `telemetry.interceptor.ts`, `metrics.controller.ts`, `health.module.ts`, `zone.decorator.ts`, `@nestjs/common`, `ref_express`, `audit-log.listener.spec.ts`, `server-errors.spec.ts`, `slow-operations.ts`, `server/package.json`?**
  _High betweenness centrality (0.231) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13725490196078433 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `ref_node_crypto` to `database-migrations.ts`, `ref_vitest`, `dependencies`, `Project`, `audit-log.e2e-spec.ts`, `ConversationEvent`, `database-options.ts`, `protocol/src/index.ts`, `AuditLogEntry`, `Visitor`, `findFreePort`, `CreateChatTables1793215389271`, `telemetry.interceptor.ts`, `participant.entity.spec.ts`, `conversation.entity.ts`, `run-database-migrations.ts`, `conversation.entity.spec.ts`, `Message`, `server/package.json`, `CreateProjects1793193549883`, `AddConversationIndexes1793215983154`, `AddProjectsPublicKey1793300002000`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `NeutralProbeController`, `server-errors.spec.ts`, `ErrorProbeController`, `ValidationProbeController`, `http-error.filter.spec.ts`, `api-versioning.spec.ts`, `ZonedController`, `zod-serialization.spec.ts`, `InternalProbeController`, `metrics.controller.ts`, `health.module.ts`, `BodyProbeController`, `zone.decorator.ts`, `Controller`, `MixedZoneController`, `zone-servers.spec.ts`, `ServerErrorsProbeController`, `TelemetryProbeController`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._