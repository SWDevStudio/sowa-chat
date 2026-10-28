# Graph Report - hector-chat-epic-12  (2026-10-29)

## Corpus Check
- 293 files · ~65,019 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2058 nodes · 4387 edges · 134 communities (94 shown, 40 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 82 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6612b6fe`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- Project
- devDependencies
- server-modes.e2e-spec.ts
- telemetry.interceptor.spec.ts
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
- RedactionProbeController
- RequestContext
- operator-role.guard.spec.ts
- scripts
- zone-servers.spec.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- @nestjs/common
- key-format.ts
- audit-rule.ts
- DisabledOperators
- Project
- tsconfig.build.json
- ValidationProbeController
- server-errors.spec.ts
- nest-cli.json
- CreateChatTables1793215389271
- protocol/src/index.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- ApiKey
- HttpMetrics
- OperationSteps
- database-options.ts
- api-keys-service-probe.ts
- operator-auth.guard.ts
- log-settings.e2e-spec.ts
- JsonObject
- request-id.spec.ts
- json-object-limits.spec.ts
- operators.service.spec.ts
- Visitor
- findFreePort
- migrate-mode.e2e-spec.ts
- config.module.ts
- conversation.entity.spec.ts
- tokens.service.spec.ts
- api-keys.service.ts
- audit-log.listener.spec.ts
- RequestContext
- zod-serialization.spec.ts
- operator-auth-guard.e2e-spec.ts
- Zone
- main.ts
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- operator-auth-guard.e2e-spec.ts
- zone-servers.ts
- packages-build.e2e-spec.ts
- api-docs.ts
- participant.entity.spec.ts
- conversation.entity.ts
- metrics.controller.ts
- health.e2e-spec.ts
- health.module.ts
- http-error.filter.spec.ts
- env.schema.spec.ts
- workspace-check-types.e2e-spec.ts
- zone.guard.spec.ts
- Controller
- encryption-keys.schema.spec.ts
- MixedZoneController
- status.controller.spec.ts
- @nestjs/common
- api-app.ts
- Message
- log-redaction.e2e-spec.ts
- token-signing-keys.schema.ts
- ApiKeysService
- global-setup.ts
- ServerErrorsProbeController
- TokensService
- domain-event-bus.spec.ts
- ContextConsumer
- BodyProbeController
- ZonedController
- server-key-guard.e2e-spec.ts
- DomainEventBus
- server/package.json
- ErrorProbeController
- operators.module.ts
- CreateProjects1793193549883
- InternalProbeController
- CreateIdentityKeys1793300001000
- AddProjectsPublicKey1793300002000
- bullmq@^6.3.15
- NeutralProbeController
- helmet
- TestTokenSigningConfigModule
- @nestjs/bullmq@^12.0.0
- @nestjs/cache-manager@^12.0.1
- TelemetryProbeController
- @nestjs/microservices@^12.1.3
- @nestjs/platform-socket.io@^12.1.3
- @nestjs/websockets@^12.1.3
- vitest@catalog:
- slow-operations.config.ts
- cache-manager@^7.2.9
- nest-commander@^3.21.0
- @nestjs/swagger

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 112 edges
2. `Zone()` - 50 edges
3. `typeorm` - 47 edges
4. `Project` - 35 edges
5. `@nestjs/testing` - 29 edges
6. `findFreePort()` - 27 edges
7. `Conversation` - 26 edges
8. `OperationSteps` - 25 edges
9. `@nestjs/config` - 23 edges
10. `RequestContext` - 23 edges

## Surprising Connections (you probably didn't know these)
- `AuditRecord` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-rule.ts → packages/protocol/src/json-types.ts
- `ConversationEvent` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation-event.entity.ts → packages/protocol/src/json-types.ts
- `Conversation` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation.entity.ts → packages/protocol/src/json-types.ts
- `Message` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/message.entity.ts → packages/protocol/src/json-types.ts
- `Operator` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/domain/operators/operator.entity.ts → packages/protocol/src/operator-role.ts

## Import Cycles
- None detected.

## Communities (134 total, 40 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.15
Nodes (4): CreateAuditLog1793200000000, AddConversationIndexes1793215983154, CreateApiKeys1793300000000, CreateOperators1793300003000

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "Project"
Cohesion: 0.08
Nodes (15): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, Project, ProjectsModule, ProjectsRepository, WorkerModule (+7 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "telemetry.interceptor.spec.ts"
Cohesion: 0.09
Nodes (12): probeControllers, probeControllers, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, zoneMetadataKey, startApp() (+4 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.10
Nodes (20): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+12 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_vitest"
Cohesion: 0.13
Nodes (10): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, databaseUrl(), IdentityRow, VersionRow, useTestRedis() (+2 more)

### Community 10 - "encryption.service.spec.ts"
Cohesion: 0.08
Nodes (21): CryptoModule, authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv (+13 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, @aws-sdk/s3-request-presigner@^3.1151.0, file-type@^22.1.1, jose@^6.2.12, @nest-lab/throttler-storage-redis@^1.2.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1 (+21 more)

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

### Community 22 - "RedactionProbeController"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 24 - "operator-role.guard.spec.ts"
Cohesion: 0.12
Nodes (14): @nestjs/core@^12.0.1, OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly() (+6 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "zone-servers.spec.ts"
Cohesion: 0.13
Nodes (17): LogDestination, probeControllers, LogEntry, offlineDataSource, withOfflineDatabase(), offlineRedis, withOfflineRedis(), readyRedis (+9 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, runToExit() (+3 more)

### Community 28 - ".create"
Cohesion: 0.14
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "@nestjs/common"
Cohesion: 0.13
Nodes (6): ServerAuthModule, KeysModule, ApiHttpModule, ZonesModule, SlowOperationsModule, @nestjs/common

### Community 32 - "key-format.ts"
Cohesion: 0.16
Nodes (14): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+6 more)

### Community 33 - "audit-rule.ts"
Cohesion: 0.23
Nodes (11): auditedEventNames(), AuditRecord, AuditRule, auditedEvents, botKeyEvent, serverKeyEvent, ApiKeyEvent, DomainEventHandler (+3 more)

### Community 34 - "DisabledOperators"
Cohesion: 0.17
Nodes (3): DisabledOperators, Probe, OperatorsRepository

### Community 35 - "Project"
Cohesion: 0.07
Nodes (30): Channel, channelColumns(), findColumn(), ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows() (+22 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "server-errors.spec.ts"
Cohesion: 0.11
Nodes (19): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, internalErrorMessage, ApiExceptionInput, entries() (+11 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 41 - "protocol/src/index.ts"
Cohesion: 0.10
Nodes (17): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, jsonObjectSchema, JsonObjectLimits (+9 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "ApiKey"
Cohesion: 0.12
Nodes (3): ApiKey, ApiKeysRepository, hashMatches()

### Community 46 - "HttpMetrics"
Cohesion: 0.15
Nodes (6): HttpMetrics, StepTimes, FinishedOperation, roundSteps(), SlowOperations, TelemetryInterceptor

### Community 47 - "OperationSteps"
Cohesion: 0.07
Nodes (13): DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationSteps, OperationStepsProbeController, beginOperation(), operationTimingKey (+5 more)

### Community 48 - "database-options.ts"
Cohesion: 0.20
Nodes (9): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity (+1 more)

### Community 49 - "api-keys-service-probe.ts"
Cohesion: 0.22
Nodes (12): eventFields, serverKey, hashKey(), ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred (+4 more)

### Community 50 - "operator-auth.guard.ts"
Cohesion: 0.26
Nodes (4): operatorClaimsSchema, ServerKeyGuard, bearerToken(), FakeRequestInput

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.23
Nodes (11): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+3 more)

### Community 52 - "JsonObject"
Cohesion: 0.08
Nodes (18): database, loadDataSource(), ApiKeyKind, apiKeyKinds, NewApiKey, Operator, ColumnRow, expectedColumns (+10 more)

### Community 53 - "request-id.spec.ts"
Cohesion: 0.08
Nodes (19): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+11 more)

### Community 54 - "json-object-limits.spec.ts"
Cohesion: 0.10
Nodes (15): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+7 more)

### Community 55 - "operators.service.spec.ts"
Cohesion: 0.17
Nodes (7): IssuedOperatorToken, OperatorDisabledError, OperatorsService, operatorTokenTtlSeconds, input, Probe, signedToken

### Community 56 - "Visitor"
Cohesion: 0.15
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor

### Community 57 - "findFreePort"
Cohesion: 0.12
Nodes (20): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus() (+12 more)

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, withClient() (+2 more)

### Community 59 - "config.module.ts"
Cohesion: 0.26
Nodes (14): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig (+6 more)

### Community 60 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 61 - "tokens.service.spec.ts"
Cohesion: 0.16
Nodes (24): encodePart(), flipSignatureBit(), ForgedTokenInput, forgeToken(), forgeUnsecuredToken(), parseTestSigningKeys(), publicKeyPemBytes(), publicKeyRawBytes() (+16 more)

### Community 62 - "api-keys.service.ts"
Cohesion: 0.25
Nodes (7): IssueApiKeyBaseInput, IssueApiKeyInput, IssuedApiKey, KeyActorKind, keyTypeByKind, RevokeApiKeyInput, VerifiedApiKey

### Community 63 - "audit-log.listener.spec.ts"
Cohesion: 0.16
Nodes (7): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, auditRules, testAuditRules

### Community 65 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 66 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.16
Nodes (10): OperatorController(), DisabledProbeController, issueOperator(), issueOperator(), get(), getAs(), RolesProbeController, IssuedOperator (+2 more)

### Community 67 - "Zone"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 68 - "main.ts"
Cohesion: 0.07
Nodes (28): pino@^10.4.0, CliModule, DatabaseMigrationStep, createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+20 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "IdentityKey"
Cohesion: 0.14
Nodes (6): IdentityKey, IdentityKeyAlgorithm, identityKeyAlgorithms, ColumnRow, expectedColumns, jwk

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.25
Nodes (4): getProbe(), withToken(), operatorProbePath, waitMs()

### Community 73 - "zone-servers.ts"
Cohesion: 0.32
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 74 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 75 - "api-docs.ts"
Cohesion: 0.43
Nodes (6): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "conversation.entity.ts"
Cohesion: 0.07
Nodes (21): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEvent, ConversationEventActorKind, conversationEventActorKinds (+13 more)

### Community 78 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 79 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 80 - "health.module.ts"
Cohesion: 0.06
Nodes (19): ioredis@^6.0.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+11 more)

### Community 81 - "http-error.filter.spec.ts"
Cohesion: 0.14
Nodes (13): nestjs-zod@^5.5.0, errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter, requestIdOf() (+5 more)

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "zone.guard.spec.ts"
Cohesion: 0.12
Nodes (15): HealthBody, HealthEntry, ApiZone, apiZones, CapturedResponse, FakeRequest, guardedControllers, unitPorts (+7 more)

### Community 85 - "Controller"
Cohesion: 0.22
Nodes (7): ServerController(), InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController, Zone()

### Community 86 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 87 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 89 - "@nestjs/common"
Cohesion: 0.18
Nodes (10): databaseEntities, AuditModule, AppClsModule, AppConfigModule, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules (+2 more)

### Community 90 - "api-app.ts"
Cohesion: 0.15
Nodes (17): configureApiApp(), ApiModule, useClsMiddleware(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError() (+9 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 93 - "token-signing-keys.schema.ts"
Cohesion: 0.29
Nodes (6): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, tokenSigningKeysSchema

### Community 95 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 97 - "TokensService"
Cohesion: 0.12
Nodes (9): TokenSigningKey, SignedToken, SignTokenInput, TokenConsumer, TokenAudience, tokenAudiences, TokensService, VerifiedToken (+1 more)

### Community 98 - "domain-event-bus.spec.ts"
Cohesion: 0.29
Nodes (7): happened, TestListener, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 101 - "ZonedController"
Cohesion: 0.27
Nodes (3): BareController, MethodOnlyController, ZonedController

### Community 102 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.29
Nodes (6): changeBodyChar(), forgeWithValidChecksum(), getProbe(), replaceChar(), withKey(), zoneAgent()

### Community 104 - "server/package.json"
Cohesion: 0.10
Nodes (19): author, @aws-sdk/client-s3@^3.1151.0, pino-http@^11.0.0, reflect-metadata@^0.2.2, rxjs@^7.8.1, @socket.io/redis-adapter@^8.3.0, zod@catalog:, description (+11 more)

### Community 106 - "operators.module.ts"
Cohesion: 0.29
Nodes (3): OperatorAuthModule, OperatorsModule, TokensModule

### Community 108 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 112 - "NeutralProbeController"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 811 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `Project`, `telemetry.interceptor.spec.ts`, `encryption.service.spec.ts`, `dependencies`, `RedactionProbeController`, `RequestContext`, `operator-role.guard.spec.ts`, `zone-servers.spec.ts`, `audit-rule.ts`, `DisabledOperators`, `server-errors.spec.ts`, `HttpMetrics`, `OperationSteps`, `operator-auth.guard.ts`, `JsonObject`, `request-id.spec.ts`, `operators.service.spec.ts`, `config.module.ts`, `tokens.service.spec.ts`, `api-keys.service.ts`, `audit-log.listener.spec.ts`, `zod-serialization.spec.ts`, `operator-auth-guard.e2e-spec.ts`, `Zone`, `main.ts`, `zone-servers.ts`, `api-docs.ts`, `metrics.controller.ts`, `health.module.ts`, `http-error.filter.spec.ts`, `zone.guard.spec.ts`, `Controller`, `status.controller.spec.ts`, `@nestjs/common`, `api-app.ts`, `TokensService`, `domain-event-bus.spec.ts`, `ZonedController`, `server-key-guard.e2e-spec.ts`, `server/package.json`, `operators.module.ts`?**
  _High betweenness centrality (0.277) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14705882352941177 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `JsonObject` to `database-migrations.ts`, `Project`, `ref_vitest`, `dependencies`, `Project`, `CreateChatTables1793215389271`, `OperationSteps`, `database-options.ts`, `Visitor`, `findFreePort`, `migrate-mode.e2e-spec.ts`, `conversation.entity.spec.ts`, `operator-auth-guard.e2e-spec.ts`, `IdentityKey`, `participant.entity.spec.ts`, `conversation.entity.ts`, `Message`, `server/package.json`, `CreateProjects1793193549883`, `CreateIdentityKeys1793300001000`, `AddProjectsPublicKey1793300002000`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `zone-servers.spec.ts` to `key-format.ts`, `DisabledOperators`, `domain-event-bus.spec.ts`, `devDependencies`, `Project`, `server/package.json`, `encryption.service.spec.ts`, `OperationSteps`, `api-keys-service-probe.ts`, `RequestContext`, `JsonObject`, `operators.service.spec.ts`, `findFreePort`, `api-app.ts`, `config.module.ts`, `tokens.service.spec.ts`, `audit-log.listener.spec.ts`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Should `Project` be split into smaller, more focused modules?**
  _Cohesion score 0.0784313725490196 - nodes in this community are weakly interconnected._