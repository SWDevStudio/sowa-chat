# Graph Report - hector-chat-epic-12  (2026-10-29)

## Corpus Check
- 286 files · ~63,131 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2008 nodes · 4249 edges · 143 communities (100 shown, 43 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 79 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fbe89e42`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- AuditLogEntry
- devDependencies
- server-modes.e2e-spec.ts
- security-headers.spec.ts
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
- Operator
- scripts
- zone-servers.spec.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- http-error.filter.spec.ts
- key-format.ts
- audit-log.e2e-spec.ts
- DomainEventBus
- Project
- tsconfig.build.json
- ValidationProbeController
- server-errors.spec.ts
- nest-cli.json
- zone-servers.ts
- protocol/src/index.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- ApiKey
- telemetry.interceptor.spec.ts
- operation-steps.ts
- ConversationEvent
- api-keys-service-probe.ts
- operator-auth.guard.ts
- log-settings.e2e-spec.ts
- JsonObject
- request-id.spec.ts
- json-object-limits.spec.ts
- operators.service.spec.ts
- typeorm
- migrate-mode.e2e-spec.ts
- findFreePort
- config.module.ts
- Visitor
- tokens.service.spec.ts
- api-keys.service.ts
- audit-log.listener.spec.ts
- RequestContext
- api-keys.e2e-spec.ts
- operator-auth-guard.e2e-spec.ts
- Zone
- main.ts
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- zod-serialization.spec.ts
- OperationSteps
- packages-build.e2e-spec.ts
- slow-operations.spec.ts
- participant.entity.spec.ts
- conversation.entity.ts
- metrics.controller.ts
- health.e2e-spec.ts
- health.module.ts
- cls-middleware.ts
- BodyProbeController
- workspace-check-types.e2e-spec.ts
- zone.decorator.ts
- Controller
- encryption-keys.schema.spec.ts
- MixedZoneController
- conversation.entity.spec.ts
- @nestjs/common
- api-app.ts
- Message
- log-redaction.e2e-spec.ts
- token-signing-keys.schema.ts
- ApiKeysService
- migrate.module.ts
- ServerErrorsProbeController
- TokensService
- domain-event-bus.spec.ts
- logger.module.ts
- encrypted-secret.spec.ts
- ZonedController
- server-key-guard.e2e-spec.ts
- forged-tokens.ts
- pg
- ErrorProbeController
- operators.module.ts
- env.schema.logging.spec.ts
- InternalProbeController
- AuditScenarios
- server-errors.spec.ts
- OperatorAuthGuard
- NeutralProbeController
- ServerKeyGuard
- TestTokenSigningConfigModule
- error-response.ts
- token-signing-keys.schema.spec.ts
- TelemetryProbeController
- ref_zod
- @sowa-chat/protocol@workspace:*
- @nestjs/cache-manager@^12.0.1
- OperatorAuthModule
- ServerAuthModule
- @aws-sdk/s3-request-presigner@^3.1151.0
- bullmq@^6.3.15
- cache-manager@^7.2.9
- nest-commander@^3.21.0
- @nestjs/bullmq@^12.0.0
- @nestjs/platform-socket.io@^12.1.3
- @nestjs/swagger
- pino-http
- socket.io@^4.8.4
- ZonesModule
- SlowOperationsModule

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 107 edges
2. `Zone()` - 50 edges
3. `typeorm` - 47 edges
4. `Project` - 35 edges
5. `@nestjs/testing` - 28 edges
6. `findFreePort()` - 27 edges
7. `Conversation` - 26 edges
8. `OperationSteps` - 25 edges
9. `@nestjs/config` - 23 edges
10. `startZoneProbeApp()` - 23 edges

## Surprising Connections (you probably didn't know these)
- `IssueOperatorTokenInput` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/domain/operators/operators.service.ts → packages/protocol/src/operator-role.ts
- `RequestOperator` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/infra/request-context/request-context.ts → packages/protocol/src/operator-role.ts
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (143 total, 43 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.05
Nodes (22): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity (+14 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "AuditLogEntry"
Cohesion: 0.15
Nodes (7): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (42): author, description, devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0 (+34 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "security-headers.spec.ts"
Cohesion: 0.11
Nodes (9): probeControllers, probeControllers, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, zoneMetadataKey, ZoneProbeApp (+1 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.09
Nodes (20): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+12 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_vitest"
Cohesion: 0.11
Nodes (10): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, databaseUrl(), IdentityRow, VersionRow, useTestRedis() (+2 more)

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
Cohesion: 0.06
Nodes (35): dependencies, @aws-sdk/client-s3@^3.1151.0, file-type@^22.1.1, helmet@^8.3.0, jose@^6.2.12, @nest-lab/throttler-storage-redis@^1.2.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1 (+27 more)

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

### Community 23 - "RequestContext"
Cohesion: 0.16
Nodes (4): RequestContextModule, RequestOperator, ConsumerModule, ContextConsumer

### Community 24 - "Operator"
Cohesion: 0.23
Nodes (3): Operator, OperatorProfile, OperatorRole

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "zone-servers.spec.ts"
Cohesion: 0.11
Nodes (22): HealthBody, HealthEntry, DependencyStatusBody, StatusBody, findZonePorts(), probeControllers, LogEntry, findFreePort() (+14 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "http-error.filter.spec.ts"
Cohesion: 0.15
Nodes (8): ApiHttpModule, HttpErrorFilter, requestIdOf(), responseZodErrorOf(), knownKeys, ProbeBodyDto, requestIdHeader, nestjs-zod

### Community 32 - "key-format.ts"
Cohesion: 0.23
Nodes (13): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+5 more)

### Community 33 - "audit-log.e2e-spec.ts"
Cohesion: 0.17
Nodes (5): ProjectsModule, ProjectsRepository, WorkerModule, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 34 - "DomainEventBus"
Cohesion: 0.19
Nodes (3): AuditLogListener, AuditLogRepository, AuditRule

### Community 35 - "Project"
Cohesion: 0.09
Nodes (27): ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation(), createMessage() (+19 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "server-errors.spec.ts"
Cohesion: 0.16
Nodes (12): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ErrorCode, errorCodes, errorDetailSchema (+4 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-servers.ts"
Cohesion: 0.27
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 41 - "protocol/src/index.ts"
Cohesion: 0.12
Nodes (15): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, jsonObjectSchema, JsonObjectLimits (+7 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "ApiKey"
Cohesion: 0.12
Nodes (4): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey

### Community 46 - "telemetry.interceptor.spec.ts"
Cohesion: 0.10
Nodes (13): ApiZone, HttpLabel, HttpMetrics, HttpRequestRecord, labelNames, StepTimes, FinishedOperation, roundSteps() (+5 more)

### Community 47 - "operation-steps.ts"
Cohesion: 0.22
Nodes (7): DatabaseStepSubscriber, operationSteps, OperationTiming, beginOperation(), operationTimingKey, nestjs-cls, @nestjs/typeorm

### Community 48 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 49 - "api-keys-service-probe.ts"
Cohesion: 0.26
Nodes (11): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+3 more)

### Community 50 - "operator-auth.guard.ts"
Cohesion: 0.39
Nodes (3): operatorClaimsSchema, bearerToken(), FakeRequestInput

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "JsonObject"
Cohesion: 0.10
Nodes (16): apiKeyKinds, ColumnRow, expectedColumns, IndexRow, PlanRow, ColumnRow, expectedColumns, jwk (+8 more)

### Community 53 - "request-id.spec.ts"
Cohesion: 0.08
Nodes (20): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+12 more)

### Community 54 - "json-object-limits.spec.ts"
Cohesion: 0.10
Nodes (15): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+7 more)

### Community 55 - "operators.service.spec.ts"
Cohesion: 0.11
Nodes (9): OperatorsRepository, IssuedOperatorToken, IssueOperatorTokenInput, OperatorDisabledError, OperatorsService, operatorTokenTtlSeconds, input, Probe (+1 more)

### Community 56 - "typeorm"
Cohesion: 0.15
Nodes (10): database, loadDataSource(), channelColumns(), findColumn(), IdentityKeyAlgorithm, identityKeyAlgorithms, Project, ColumnRow (+2 more)

### Community 57 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 58 - "findFreePort"
Cohesion: 0.14
Nodes (13): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), fetchStatus(), repositoryRoot (+5 more)

### Community 59 - "config.module.ts"
Cohesion: 0.25
Nodes (14): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+6 more)

### Community 60 - "Visitor"
Cohesion: 0.15
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor

### Community 61 - "tokens.service.spec.ts"
Cohesion: 0.17
Nodes (18): SignedToken, SignTokenInput, TokenAudience, tokenAudiences, VerifiedToken, forgeToken(), publicKeyRawBytes(), expectedOperatorClaims (+10 more)

### Community 62 - "api-keys.service.ts"
Cohesion: 0.21
Nodes (9): hashMatches(), IssueApiKeyBaseInput, IssueApiKeyInput, IssuedApiKey, KeyActorKind, keyTypeByKind, RevokeApiKeyInput, VerifiedApiKey (+1 more)

### Community 63 - "audit-log.listener.spec.ts"
Cohesion: 0.19
Nodes (10): eventValues, happened, personalValues, auditedEventNames(), auditRules, auditedEvents, botKeyEvent, serverKeyEvent (+2 more)

### Community 64 - "RequestContext"
Cohesion: 0.15
Nodes (3): ServerController(), RequestContext, GuardProbeController

### Community 66 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.22
Nodes (10): OperatorController(), getProbe(), issueOperator(), withToken(), forgeUnsecuredToken(), IssuedOperator, issueTestOperator(), OperatorGuardProbeController (+2 more)

### Community 67 - "Zone"
Cohesion: 0.15
Nodes (11): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+3 more)

### Community 68 - "main.ts"
Cohesion: 0.15
Nodes (14): CliModule, createContext(), mode, runApi(), runCli(), runMigrate(), runners, runToCompletion() (+6 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.31
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 73 - "OperationSteps"
Cohesion: 0.15
Nodes (3): OperationStep, OperationSteps, OperationStepsProbeController

### Community 74 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

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

### Community 81 - "cls-middleware.ts"
Cohesion: 0.21
Nodes (7): ApiModule, useClsMiddleware(), LogDestination, echoRequestId(), resolveRequestId(), createE2eApp(), nestjs-pino

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "zone.decorator.ts"
Cohesion: 0.12
Nodes (17): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, apiZones, CapturedResponse (+9 more)

### Community 85 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 86 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 87 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 88 - "conversation.entity.spec.ts"
Cohesion: 0.16
Nodes (7): Channel, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 89 - "@nestjs/common"
Cohesion: 0.17
Nodes (10): databaseEntities, AuditModule, AppClsModule, AppConfigModule, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules (+2 more)

### Community 90 - "api-app.ts"
Cohesion: 0.22
Nodes (12): configureApiApp(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders() (+4 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 93 - "token-signing-keys.schema.ts"
Cohesion: 0.67
Nodes (5): parseEntry(), parseKeys(), parsePrivateKey(), reject(), tokenSigningKeysSchema

### Community 95 - "migrate.module.ts"
Cohesion: 0.18
Nodes (4): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps

### Community 97 - "TokensService"
Cohesion: 0.22
Nodes (4): TokenSigningKey, TokenConsumer, TokensService, createService()

### Community 98 - "domain-event-bus.spec.ts"
Cohesion: 0.16
Nodes (12): DomainEventBus, happened, TestListener, DomainEventHandler, DomainEventName, DomainEvents, OnDomainEvent(), DomainEvents (+4 more)

### Community 99 - "logger.module.ts"
Cohesion: 0.29
Nodes (8): createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions(), redactPaths, sensitiveFields, sensitiveHeaders

### Community 100 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 102 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.29
Nodes (6): changeBodyChar(), forgeWithValidChecksum(), getProbe(), replaceChar(), withKey(), zoneAgent()

### Community 103 - "forged-tokens.ts"
Cohesion: 0.22
Nodes (10): encodePart(), flipSignatureBit(), ForgedTokenInput, parseTestSigningKeys(), publicKeyPemBytes(), replaceHeader(), replacePayload(), spyOnLogs() (+2 more)

### Community 104 - "pg"
Cohesion: 0.20
Nodes (6): pg@^8.23.1, sharp@^0.35.5, zod@catalog:, zod, pg, sharp

### Community 107 - "env.schema.logging.spec.ts"
Cohesion: 0.33
Nodes (3): Env, logLevels, requiredEnv

### Community 108 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 109 - "AuditScenarios"
Cohesion: 0.29
Nodes (3): AuditScenarios, happenedIn(), ScenarioError

### Community 110 - "server-errors.spec.ts"
Cohesion: 0.28
Nodes (7): internalErrorMessage, ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, stringsInside()

### Community 112 - "NeutralProbeController"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 121 - "error-response.ts"
Cohesion: 0.67
Nodes (5): errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse()

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 795 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **43 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `security-headers.spec.ts` to `AuditLogEntry`, `devDependencies`, `encryption.service.spec.ts`, `dependencies`, `RedactionProbeController`, `RequestContext`, `Operator`, `zone-servers.spec.ts`, `http-error.filter.spec.ts`, `audit-log.e2e-spec.ts`, `server-errors.spec.ts`, `zone-servers.ts`, `ApiKey`, `telemetry.interceptor.spec.ts`, `operation-steps.ts`, `operator-auth.guard.ts`, `JsonObject`, `request-id.spec.ts`, `operators.service.spec.ts`, `config.module.ts`, `tokens.service.spec.ts`, `api-keys.service.ts`, `audit-log.listener.spec.ts`, `api-keys.e2e-spec.ts`, `operator-auth-guard.e2e-spec.ts`, `Zone`, `main.ts`, `zod-serialization.spec.ts`, `metrics.controller.ts`, `health.module.ts`, `cls-middleware.ts`, `zone.decorator.ts`, `@nestjs/common`, `api-app.ts`, `migrate.module.ts`, `domain-event-bus.spec.ts`, `logger.module.ts`, `server-key-guard.e2e-spec.ts`, `forged-tokens.ts`, `operators.module.ts`, `server-errors.spec.ts`, `error-response.ts`?**
  _High betweenness centrality (0.244) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05023796932839767 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `audit-log.e2e-spec.ts`, `operator-auth-guard.e2e-spec.ts`, `Project`, `devDependencies`, `ref_vitest`, `participant.entity.spec.ts`, `conversation.entity.ts`, `dependencies`, `operation-steps.ts`, `ConversationEvent`, `JsonObject`, `conversation.entity.spec.ts`, `Operator`, `findFreePort`, `Message`, `Visitor`, `migrate-mode.e2e-spec.ts`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `security-headers.spec.ts`, `zone-servers.spec.ts`, `http-error.filter.spec.ts`, `ValidationProbeController`, `zod-serialization.spec.ts`, `telemetry.interceptor.spec.ts`, `RequestContext`, `operator-auth-guard.e2e-spec.ts`, `zod-serialization.spec.ts`, `metrics.controller.ts`, `health.module.ts`, `BodyProbeController`, `zone.decorator.ts`, `Controller`, `MixedZoneController`, `ServerErrorsProbeController`, `ZonedController`, `ErrorProbeController`, `InternalProbeController`, `server-errors.spec.ts`, `NeutralProbeController`, `TelemetryProbeController`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06423034330011074 - nodes in this community are weakly interconnected._