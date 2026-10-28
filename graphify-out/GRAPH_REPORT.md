# Graph Report - hector-chat-epic-12  (2026-10-29)

## Corpus Check
- 297 files · ~65,995 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2080 nodes · 4462 edges · 139 communities (99 shown, 40 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 84 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `879de7f7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- JsonObject
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
- server-auth.module.ts
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
- database.module.ts
- api-keys-service-probe.ts
- operator-auth.guard.ts
- log-settings.e2e-spec.ts
- test-database.ts
- request-id.spec.ts
- json-object-limits.spec.ts
- operators.service.spec.ts
- Visitor
- database-connection.e2e-spec.ts
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
- typeorm
- zone-servers.ts
- packages-build.e2e-spec.ts
- operator-token.controller.ts
- participant.entity.spec.ts
- conversation.entity.ts
- metrics.controller.ts
- health.e2e-spec.ts
- health.module.ts
- http-error.filter.spec.ts
- redis.module.ts
- workspace-check-types.e2e-spec.ts
- zone.guard.spec.ts
- Zone
- encryption-keys.schema.spec.ts
- zone.guard.spec.ts
- request-id.spec.ts
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
- ConversationEvent
- body-limit.spec.ts
- transactions.e2e-spec.ts
- server-key-guard.e2e-spec.ts
- JsonObjectValidator
- server/package.json
- ErrorProbeController
- encrypted-secret.spec.ts
- CreateProjects1793193549883
- InternalProbeController
- .canActivate
- AddProjectsPublicKey1793300002000
- bullmq@^6.3.15
- NeutralProbeController
- helmet
- api-key.entity.ts
- @nestjs/bullmq@^12.0.0
- @nestjs/cache-manager@^12.0.1
- audit-log.e2e-spec.ts
- @nestjs/microservices@^12.1.3
- @nestjs/platform-socket.io@^12.1.3
- @nestjs/websockets@^12.1.3
- vitest@catalog:
- SlowProbeController
- redis-connection.e2e-spec.ts
- body-limit.ts
- .current
- conversation-indexes.e2e-spec.ts
- cache-manager@^7.2.9
- nest-commander@^3.21.0
- CreateApiKeys1793300000000
- CreateOperators1793300003000
- @nestjs/swagger
- HealthModule

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 114 edges
2. `Zone()` - 50 edges
3. `typeorm` - 47 edges
4. `Project` - 35 edges
5. `@nestjs/testing` - 29 edges
6. `findFreePort()` - 27 edges
7. `Conversation` - 26 edges
8. `RequestContext` - 25 edges
9. `OperationSteps` - 25 edges
10. `@nestjs/config` - 23 edges

## Surprising Connections (you probably didn't know these)
- `RequestOperator` --references--> `OperatorRole`  [EXTRACTED]
  apps/server/src/infra/request-context/request-context.ts → packages/protocol/src/operator-role.ts
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

## Communities (139 total, 40 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.17
Nodes (5): DatabaseMigration, databaseMigrations, CreateAuditLog1793200000000, AddConversationIndexes1793215983154, CreateIdentityKeys1793300001000

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "JsonObject"
Cohesion: 0.16
Nodes (9): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns, ProjectFixture (+1 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "telemetry.interceptor.spec.ts"
Cohesion: 0.15
Nodes (4): readMetricLines(), TelemetryProbeController, zoneUrl(), ZoneProbeApp

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (22): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+14 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_vitest"
Cohesion: 0.11
Nodes (12): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, databaseUrl(), IdentityRow (+4 more)

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

### Community 23 - "RequestContext"
Cohesion: 0.16
Nodes (4): RequestContextModule, RequestOperator, ConsumerModule, ContextConsumer

### Community 24 - "operator-role.guard.spec.ts"
Cohesion: 0.15
Nodes (10): @nestjs/core@^12.0.1, OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly() (+2 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "zone-servers.spec.ts"
Cohesion: 0.11
Nodes (24): DependencyStatusBody, StatusBody, LogDestination, findZonePorts(), probeControllers, LogEntry, findFreePort(), serverDirectory (+16 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.14
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+2 more)

### Community 32 - "key-format.ts"
Cohesion: 0.28
Nodes (10): buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes, KeyType, keyTypes, ParsedKey (+2 more)

### Community 33 - "audit-rule.ts"
Cohesion: 0.30
Nodes (8): auditedEventNames(), AuditRule, auditedEvents, botKeyEvent, serverKeyEvent, ApiKeyEvent, DomainEventName, DomainEvents

### Community 34 - "DisabledOperators"
Cohesion: 0.10
Nodes (7): OperatorAuthModule, ServerApiModule, DisabledOperators, Probe, OperatorsModule, OperatorsRepository, TokensModule

### Community 35 - "Project"
Cohesion: 0.09
Nodes (27): ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows(), createChannel(), createConversation(), createMessage() (+19 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "server-errors.spec.ts"
Cohesion: 0.17
Nodes (12): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ApiExceptionInput, entries(), errorEntriesOf() (+4 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 41 - "protocol/src/index.ts"
Cohesion: 0.12
Nodes (14): errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema(), EventEnvelope (+6 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 46 - "HttpMetrics"
Cohesion: 0.11
Nodes (7): HttpMetrics, StepTimes, FinishedOperation, SlowOperationsModule, roundSteps(), SlowOperations, TelemetryInterceptor

### Community 47 - "OperationSteps"
Cohesion: 0.14
Nodes (9): DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationSteps, beginOperation(), operationTimingKey, nestjs-cls (+1 more)

### Community 48 - "database.module.ts"
Cohesion: 0.23
Nodes (9): createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity (+1 more)

### Community 49 - "api-keys-service-probe.ts"
Cohesion: 0.24
Nodes (12): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+4 more)

### Community 50 - "operator-auth.guard.ts"
Cohesion: 0.21
Nodes (4): operatorClaimsSchema, ServerKeyGuard, bearerToken(), FakeRequestInput

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "test-database.ts"
Cohesion: 0.17
Nodes (10): createProjectWithKey(), internalAgent(), postToken(), createProjectRequest(), ColumnRow, ConstraintRow, expectedColumns, createProject() (+2 more)

### Community 53 - "request-id.spec.ts"
Cohesion: 0.18
Nodes (8): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe

### Community 54 - "json-object-limits.spec.ts"
Cohesion: 0.08
Nodes (16): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+8 more)

### Community 55 - "operators.service.spec.ts"
Cohesion: 0.11
Nodes (6): Operator, OperatorDisabledError, operatorTokenTtlSeconds, input, Probe, signedToken

### Community 56 - "Visitor"
Cohesion: 0.15
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor

### Community 57 - "database-connection.e2e-spec.ts"
Cohesion: 0.29
Nodes (6): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus()

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 59 - "config.module.ts"
Cohesion: 0.20
Nodes (14): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+6 more)

### Community 60 - "conversation.entity.spec.ts"
Cohesion: 0.16
Nodes (7): Channel, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 61 - "tokens.service.spec.ts"
Cohesion: 0.13
Nodes (27): ConsumerModule, TestTokenSigningConfigModule, encodePart(), flipSignatureBit(), ForgedTokenInput, forgeToken(), forgeUnsecuredToken(), parseTestSigningKeys() (+19 more)

### Community 62 - "api-keys.service.ts"
Cohesion: 0.22
Nodes (9): hashMatches(), IssueApiKeyBaseInput, IssueApiKeyInput, IssuedApiKey, KeyActorKind, keyTypeByKind, RevokeApiKeyInput, VerifiedApiKey (+1 more)

### Community 65 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 66 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.10
Nodes (19): OperatorController(), OperatorProfile, IssueOperatorTokenInput, OperatorsService, DisabledProbeController, issueOperator(), getProbe(), issueOperator() (+11 more)

### Community 67 - "Zone"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 68 - "main.ts"
Cohesion: 0.07
Nodes (29): pino@^10.4.0, CliModule, LogLevel, DatabaseMigrationStep, createStdoutDestination(), baseOptions(), createLoggerModule(), jsonOptions() (+21 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "IdentityKey"
Cohesion: 0.14
Nodes (6): IdentityKey, IdentityKeyAlgorithm, identityKeyAlgorithms, ColumnRow, expectedColumns, jwk

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "typeorm"
Cohesion: 0.16
Nodes (7): database, loadDataSource(), channelColumns(), findColumn(), Project, ColumnRow, typeorm

### Community 73 - "zone-servers.ts"
Cohesion: 0.24
Nodes (4): startListening(), stopListening(), ZoneServers, ZonesModule

### Community 74 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 75 - "operator-token.controller.ts"
Cohesion: 0.15
Nodes (11): OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, ServerController(), IssuedOperatorToken, operatorRoles, OperatorTokenRequest, operatorTokenRequestSchema (+3 more)

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "conversation.entity.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 78 - "metrics.controller.ts"
Cohesion: 0.16
Nodes (5): prom-client@^15.1.3, ApiHttpModule, MetricsController, @nestjs/common, prom-client

### Community 79 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (10): DependencyChecks, HealthController, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus, StatusService (+2 more)

### Community 81 - "http-error.filter.spec.ts"
Cohesion: 0.14
Nodes (14): nestjs-zod@^5.5.0, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter (+6 more)

### Community 82 - "redis.module.ts"
Cohesion: 0.20
Nodes (8): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "zone.guard.spec.ts"
Cohesion: 0.15
Nodes (17): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes (+9 more)

### Community 85 - "Zone"
Cohesion: 0.10
Nodes (15): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController, calls, ProbeBodyDto (+7 more)

### Community 86 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 87 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 88 - "request-id.spec.ts"
Cohesion: 0.15
Nodes (10): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+2 more)

### Community 89 - "@nestjs/common"
Cohesion: 0.17
Nodes (9): databaseEntities, eventValues, happened, personalValues, AuditModule, AppClsModule, AppConfigModule, OperationStepsModule (+1 more)

### Community 90 - "api-app.ts"
Cohesion: 0.20
Nodes (11): configureApiApp(), ApiModule, useClsMiddleware(), noStore(), useSecurityHeaders(), echoRequestId(), resolveRequestId(), createE2eApp() (+3 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 93 - "token-signing-keys.schema.ts"
Cohesion: 0.27
Nodes (6): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, tokenSigningKeysSchema

### Community 95 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 97 - "TokensService"
Cohesion: 0.13
Nodes (8): TokenSigningKey, SignedToken, SignTokenInput, TokenConsumer, TokenAudience, tokenAudiences, TokensService, VerifiedToken

### Community 98 - "domain-event-bus.spec.ts"
Cohesion: 0.14
Nodes (11): DomainEventBus, happened, TestListener, DomainEventHandler, OnDomainEvent(), MetricsModule, DomainEvents, ../../src/telemetry/events/domain-events.js (+3 more)

### Community 99 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 101 - "transactions.e2e-spec.ts"
Cohesion: 0.22
Nodes (3): ProjectsModule, ProjectsRepository, @nestjs-cls/transactional-adapter-typeorm

### Community 102 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.15
Nodes (10): base, base62Alphabet, encodeBase62(), forgeKeyWithSameLookupPrefix(), changeBodyChar(), forgeWithValidChecksum(), getProbe(), replaceChar() (+2 more)

### Community 104 - "server/package.json"
Cohesion: 0.10
Nodes (19): author, @aws-sdk/client-s3@^3.1151.0, pino-http@^11.0.0, reflect-metadata@^0.2.2, rxjs@^7.8.1, @socket.io/redis-adapter@^8.3.0, zod@catalog:, description (+11 more)

### Community 106 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 108 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 112 - "NeutralProbeController"
Cohesion: 0.25
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 120 - "api-key.entity.ts"
Cohesion: 0.31
Nodes (5): ApiKeyKind, apiKeyKinds, NewApiKey, ColumnRow, expectedColumns

### Community 123 - "audit-log.e2e-spec.ts"
Cohesion: 0.32
Nodes (3): auditRules, WorkerModule, testAuditRules

### Community 129 - "redis-connection.e2e-spec.ts"
Cohesion: 0.29
Nodes (7): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableRedisUrl(), waitForHttpStatus(), Env

### Community 130 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 818 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `metrics.controller.ts` to `body-limit.ts`, `JsonObject`, `telemetry.interceptor.spec.ts`, `encryption.service.spec.ts`, `dependencies`, `RedactionProbeController`, `RequestContext`, `operator-role.guard.spec.ts`, `zone-servers.spec.ts`, `server-auth.module.ts`, `audit-rule.ts`, `DisabledOperators`, `server-errors.spec.ts`, `HttpMetrics`, `OperationSteps`, `database.module.ts`, `operator-auth.guard.ts`, `request-id.spec.ts`, `config.module.ts`, `tokens.service.spec.ts`, `api-keys.service.ts`, `zod-serialization.spec.ts`, `operator-auth-guard.e2e-spec.ts`, `Zone`, `main.ts`, `typeorm`, `zone-servers.ts`, `operator-token.controller.ts`, `health.module.ts`, `http-error.filter.spec.ts`, `redis.module.ts`, `zone.guard.spec.ts`, `Zone`, `zone.guard.spec.ts`, `request-id.spec.ts`, `@nestjs/common`, `api-app.ts`, `TokensService`, `domain-event-bus.spec.ts`, `body-limit.spec.ts`, `transactions.e2e-spec.ts`, `server-key-guard.e2e-spec.ts`, `server/package.json`, `NeutralProbeController`, `api-key.entity.ts`, `audit-log.e2e-spec.ts`?**
  _High betweenness centrality (0.278) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `JsonObject`, `conversation-indexes.e2e-spec.ts`, `CreateApiKeys1793300000000`, `CreateOperators1793300003000`, `ref_vitest`, `dependencies`, `DisabledOperators`, `Project`, `CreateChatTables1793215389271`, `OperationSteps`, `database.module.ts`, `test-database.ts`, `Visitor`, `database-connection.e2e-spec.ts`, `migrate-mode.e2e-spec.ts`, `conversation.entity.spec.ts`, `operator-auth-guard.e2e-spec.ts`, `IdentityKey`, `participant.entity.spec.ts`, `conversation.entity.ts`, `Message`, `ConversationEvent`, `transactions.e2e-spec.ts`, `server/package.json`, `CreateProjects1793193549883`, `AddProjectsPublicKey1793300002000`, `api-key.entity.ts`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `Zone` to `ServerErrorsProbeController`, `zod-serialization.spec.ts`, `operator-auth-guard.e2e-spec.ts`, `Zone`, `body-limit.spec.ts`, `ValidationProbeController`, `server-errors.spec.ts`, `telemetry.interceptor.spec.ts`, `ErrorProbeController`, `operator-token.controller.ts`, `zod-serialization.spec.ts`, `InternalProbeController`, `metrics.controller.ts`, `NeutralProbeController`, `health.module.ts`, `http-error.filter.spec.ts`, `zone.guard.spec.ts`, `zone-servers.spec.ts`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Should `server-modes.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13071895424836602 - nodes in this community are weakly interconnected._