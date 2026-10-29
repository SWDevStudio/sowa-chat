# Graph Report - hector-chat-epic-14  (2026-10-29)

## Corpus Check
- 401 files · ~101,767 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .log 1)

## Summary
- 2813 nodes · 6810 edges · 156 communities (116 shown, 40 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 171 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fbd47f5b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- tokens.service.spec.ts
- env.schema.ts
- compilerOptions
- DomainEventBus
- server-key-guard.e2e-spec.ts
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
- api-app.ts
- operator-block-sync.e2e-spec.ts
- scripts
- ProjectsService
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- Project
- key-format.ts
- MixedZoneController
- ConversationEvent
- migrate.module.ts
- tsconfig.build.json
- ValidationProbeController
- config.module.ts
- nest-cli.json
- @nestjs/testing
- database.module.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- test-database.ts
- protocol/src/index.ts
- logger.module.ts
- Project
- key-cli.ts
- ApiKeysService
- log-settings.e2e-spec.ts
- replica-cache-sync.e2e-spec.ts
- operator-auth.guard.ts
- json-object-limits.spec.ts
- identity-keys.service.ts
- ProjectCreateCommand
- @nestjs/common
- migrate-mode.e2e-spec.ts
- projects-service.e2e-spec.ts
- test-secrets.ts
- audit-log.e2e-spec.ts
- conversation.entity.spec.ts
- RequestContext
- DisabledOperators
- ProjectsService
- encryption.service.spec.ts
- chat-schema.ts
- identity-key-commands.e2e-spec.ts
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- security-headers.spec.ts
- Channel
- redis.module.ts
- request-id.spec.ts
- participant.entity.spec.ts
- conversation.entity.ts
- replica-events-publisher.module.ts
- server-errors.spec.ts
- health.module.ts
- OperatorsService
- OperationSteps
- workspace-check-types.e2e-spec.ts
- operator-auth-guard.e2e-spec.ts
- global-setup.ts
- CreateChatTables1793215389271
- domain-events.ts
- secrets-reencrypt-command.e2e-spec.ts
- secrets-reencrypt.command.ts
- zone.ts
- Message
- telemetry.interceptor.spec.ts
- SecretsReencryptionService
- api-keys.service.ts
- server-errors.spec.ts
- log-redaction.e2e-spec.ts
- body-limit.spec.ts
- cli-mode.e2e-spec.ts
- cache-invalidate.controller.spec.ts
- JsonObjectValidator
- ZonedController
- TelemetryProbeController
- operator-auth-guard.e2e-spec.ts
- OperatorDisableCommand
- api-docs.spec.ts
- SlowProbeController
- writeLine
- operators.service.spec.ts
- ref_node_path
- server/package.json
- TokenConsumer
- api-versioning.spec.ts
- identity-key.entity.ts
- cache-invalidation-rules.ts
- database-migrations.spec.ts
- secrets-reencryption.service.ts
- operator-token.controller.ts
- project-cli.ts
- encryption-keys.schema.spec.ts
- operator-commands.e2e-spec.ts
- replica-events-offline-redis.e2e-spec.ts
- zod-serialization.spec.ts
- token-signing-keys.schema.ts
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- replica-events.e2e-spec.ts
- AddConversationIndexes1793215983154
- main.ts
- zone-servers.ts
- test-domain-events.ts
- CreateIdentityKeys1793300001000
- api.module.ts
- IdentityKeyAddCommand
- AddProjectsPublicKey1793300002000
- encryption-keys.schema.ts
- CreateOperators1793300003000
- TestEncryptionConfigModule
- @aws-sdk/s3-request-presigner@^3.1151.0
- TestTokenSigningConfigModule
- @aws-sdk/client-s3@^3.1151.0
- @nest-lab/throttler-storage-redis@^1.2.0
- @nestjs/throttler@^6.7.1
- pino-http
- bullmq@^6.3.15
- file-type@^22.1.1
- zod@catalog:
- @nestjs/cli@^12.0.0
- @types/pg@^8.23.1

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 149 edges
2. `typeorm` - 57 edges
3. `Zone()` - 50 edges
4. `@nestjs/testing` - 49 edges
5. `Project` - 48 edges
6. `ProjectsService` - 44 edges
7. `useTestDatabase()` - 41 edges
8. `DomainEventBus` - 40 edges
9. `findFreePort()` - 33 edges
10. `createProject()` - 31 edges

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

## Communities (156 total, 40 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.14
Nodes (5): CreateProjects1793193549883, CreateAuditLog1793200000000, CreateApiKeys1793300000000, AddProjectsOperatorAllowedOrigins1793300003000, ColumnRow

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.18
Nodes (8): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21, supertest@^7.0.0 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "tokens.service.spec.ts"
Cohesion: 0.14
Nodes (21): TokenSigningKey, SignedToken, SignTokenInput, TokenAudience, tokenAudiences, TokensService, VerifiedToken, flipSignatureBit() (+13 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.06
Nodes (24): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+16 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "DomainEventBus"
Cohesion: 0.08
Nodes (13): BusProbe, ReplicaEventMessage, replicaEventNames(), errorMessage(), replicaEventsClient, ReplicaEventsPublisher, replicaPublishTimeoutMs, apiKeyEvent (+5 more)

### Community 10 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.16
Nodes (9): ServerController(), ReplicaProbeController, changeBodyChar(), forgeWithValidChecksum(), getProbe(), GuardProbeController, replaceChar(), withKey() (+1 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (30): dependencies, cache-manager@^7.2.9, helmet@^8.3.0, jose@^6.2.12, nest-commander@^3.21.0, @nestjs/cache-manager@^12.0.1, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1 (+22 more)

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

### Community 23 - "api-app.ts"
Cohesion: 0.20
Nodes (11): configureApiApp(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders() (+3 more)

### Community 24 - "operator-block-sync.e2e-spec.ts"
Cohesion: 0.12
Nodes (21): blockedOnAll(), BlockTarget, expectStatusOnAll(), issueOperator(), publishAll(), subscriberCounts(), waitForBlockedOnAll(), waitForStatusOnAll() (+13 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "ProjectsService"
Cohesion: 0.07
Nodes (20): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand (+12 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.14
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "Project"
Cohesion: 0.09
Nodes (17): Project, Visitor, ColumnRow, ForeignKeyRow, IndexRow, tableNames, IndexRow, PlanRow (+9 more)

### Community 32 - "key-format.ts"
Cohesion: 0.10
Nodes (17): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+9 more)

### Community 33 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.09
Nodes (8): Conversation, ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "migrate.module.ts"
Cohesion: 0.17
Nodes (5): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "config.module.ts"
Cohesion: 0.22
Nodes (14): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+6 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "@nestjs/testing"
Cohesion: 0.11
Nodes (21): HealthBody, HealthEntry, DependencyStatusBody, StatusBody, LogDestination, probeControllers, offlineDataSource, withOfflineDatabase() (+13 more)

### Community 41 - "database.module.ts"
Cohesion: 0.18
Nodes (12): DatabaseMigration, databaseMigrations, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection (+4 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "test-database.ts"
Cohesion: 0.08
Nodes (18): apiKeyKinds, Operator, issueServerKey(), ColumnRow, expectedColumns, blockAuditRows(), blockMethods, createOperator() (+10 more)

### Community 46 - "protocol/src/index.ts"
Cohesion: 0.08
Nodes (27): errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema(), EventEnvelope (+19 more)

### Community 47 - "logger.module.ts"
Cohesion: 0.20
Nodes (15): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+7 more)

### Community 48 - "Project"
Cohesion: 0.18
Nodes (5): columns(), expectedColumns, findColumn(), findRelation(), relations()

### Community 49 - "key-cli.ts"
Cohesion: 0.32
Nodes (15): toLookupPrefix(), auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix(), listKeys() (+7 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "replica-cache-sync.e2e-spec.ts"
Cohesion: 0.18
Nodes (13): badOrigins, helpEntries, prefixes, expectStatusOnAll(), probeWithKey(), addOrigins(), OriginAction, OriginCommandOptions (+5 more)

### Community 53 - "operator-auth.guard.ts"
Cohesion: 0.10
Nodes (12): OperatorAuthGuard, ServerKeyGuard, OperatorTokenClaims, operatorTokenClaimsSchema, ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail (+4 more)

### Community 54 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 55 - "identity-keys.service.ts"
Cohesion: 0.11
Nodes (8): IdentityKeyRevokeCommand, KeyActorKind, AddIdentityKeyInput, IdentityKeyKidTakenError, IdentityKeysService, InvalidIdentityKeyIdError, RevokeIdentityKeyInput, toEvent()

### Community 57 - "@nestjs/common"
Cohesion: 0.15
Nodes (14): DisabledOperatorsModule, OperatorsModule, OperatorIdRow, OperatorProfile, ChangeOperatorBlockInput, IssuedOperatorToken, IssueOperatorTokenInput, OperatorActorKind (+6 more)

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.12
Nodes (19): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), BrokenMigration1700000000000 (+11 more)

### Community 59 - "projects-service.e2e-spec.ts"
Cohesion: 0.07
Nodes (33): KeysModule, OriginList, originLists, ProjectsModule, NewProject, ORIGIN_COLUMNS, OriginsRow, ProjectsRepository (+25 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "audit-log.e2e-spec.ts"
Cohesion: 0.08
Nodes (18): ActorKind, actorKinds, AuditLogEntry, AuditLogListener, eventValues, happened, personalValues, AuditLogRepository (+10 more)

### Community 62 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 63 - "RequestContext"
Cohesion: 0.06
Nodes (12): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey (+4 more)

### Community 64 - "DisabledOperators"
Cohesion: 0.14
Nodes (5): DisabledOperators, Probe, OperatorReplicaEventsController, createDisabledOperators(), OperatorBlockEvent

### Community 65 - "ProjectsService"
Cohesion: 0.14
Nodes (11): IssuedApiKey, ProjectSnapshot, toProjectSnapshot(), ProjectsService, project, snapshot, createProjectsServiceProbe(), issuedServerKey (+3 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.10
Nodes (20): CryptoModule, authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv (+12 more)

### Community 67 - "chat-schema.ts"
Cohesion: 0.12
Nodes (16): boolean, ColumnSpec, expectedColumnCounts, expectedForeignKeys, expectedTables, expectedUniqueIndexes, integer, jsonb (+8 more)

### Community 68 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.17
Nodes (23): expectNoKeyRows(), expectNoRows(), addKey(), addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem(), identityKeyListHeader (+15 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "IdentityKey"
Cohesion: 0.08
Nodes (13): IdentityKey, IdentityKeyAlgorithm, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey(), readPublicKeyObject() (+5 more)

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "security-headers.spec.ts"
Cohesion: 0.21
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 73 - "Channel"
Cohesion: 0.22
Nodes (3): Channel, channelColumns(), findColumn()

### Community 74 - "redis.module.ts"
Cohesion: 0.12
Nodes (15): ioredis@^6.0.0, AppConfigModule, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule (+7 more)

### Community 75 - "request-id.spec.ts"
Cohesion: 0.13
Nodes (10): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+2 more)

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "conversation.entity.ts"
Cohesion: 0.13
Nodes (17): database, loadDataSource(), databaseEntities, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind (+9 more)

### Community 78 - "replica-events-publisher.module.ts"
Cohesion: 0.27
Nodes (7): parseDatabase(), parseUrl(), RedisConnectionOptions, redisTransportOptions(), stripIpv6Brackets(), ReplicaEventsPublisherModule, replicaPublishConnectTimeoutMs

### Community 79 - "server-errors.spec.ts"
Cohesion: 0.11
Nodes (18): nestjs-zod@^5.5.0, OperatorDisabledFilter, OperatorTokenRequestDto, OperatorTokenResponseDto, OperatorDisabledError, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage (+10 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 82 - "OperationSteps"
Cohesion: 0.09
Nodes (12): AppClsModule, DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationStepsModule, OperationSteps, OperationStepsProbeController (+4 more)

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.15
Nodes (8): OperatorController(), DisabledProbeController, issueOperator(), get(), getAs(), RolesProbeController, issueTestOperator(), OperatorGuardProbeController

### Community 85 - "global-setup.ts"
Cohesion: 0.57
Nodes (4): setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 87 - "domain-events.ts"
Cohesion: 0.11
Nodes (17): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+9 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "secrets-reencrypt.command.ts"
Cohesion: 0.19
Nodes (9): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+1 more)

### Community 90 - "zone.ts"
Cohesion: 0.10
Nodes (21): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, ApiZone, apiZones (+13 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "telemetry.interceptor.spec.ts"
Cohesion: 0.07
Nodes (14): prom-client@^15.1.3, HttpLabel, HttpMetrics, HttpRequestRecord, labelNames, MetricsController, MetricsModule, StepTimes (+6 more)

### Community 94 - "api-keys.service.ts"
Cohesion: 0.07
Nodes (28): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey, ApiKeySummary, CachedApiKey, hashMatches(), eventFields (+20 more)

### Community 95 - "server-errors.spec.ts"
Cohesion: 0.32
Nodes (6): ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, stringsInside()

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.31
Nodes (8): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), RunningServer

### Community 97 - "body-limit.spec.ts"
Cohesion: 0.11
Nodes (6): BodyProbeController, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ZoneProbeApp

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "cache-invalidate.controller.spec.ts"
Cohesion: 0.14
Nodes (9): malformedPayloads, CacheInvalidateController, CacheInvalidateEvent, cacheInvalidateEventSchema, ReplicaEventsModule, OperatorReplicaEvent, operatorReplicaEventSchema, replicaEventPatterns (+1 more)

### Community 100 - "JsonObjectValidator"
Cohesion: 0.28
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 103 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.13
Nodes (15): getProbe(), issueOperator(), withToken(), encodePart(), ForgedTokenInput, forgeUnsecuredToken(), parseTestSigningKeys(), publicKeyPemBytes() (+7 more)

### Community 105 - "api-docs.spec.ts"
Cohesion: 0.10
Nodes (15): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+7 more)

### Community 106 - "SlowProbeController"
Cohesion: 0.22
Nodes (4): LogEntry, pause(), SlowProbeController, supertest

### Community 107 - "writeLine"
Cohesion: 0.06
Nodes (31): emptyCell, formatDate(), serverKeyOnceWarning, writeLine(), writeTable(), writeWarning(), IdentityKeyAddOptions, readPem() (+23 more)

### Community 108 - "operators.service.spec.ts"
Cohesion: 0.16
Nodes (9): OperatorNotFoundError, operatorTokenTtlSeconds, blockInput, BlockProbe, createBlockProbe(), input, Probe, signedToken (+1 more)

### Community 109 - "ref_node_path"
Cohesion: 0.09
Nodes (16): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, builtFiles, CommandResult, entriesByPackage, plannedBuildTasks() (+8 more)

### Community 110 - "server/package.json"
Cohesion: 0.09
Nodes (21): author, bin, sowa-chat, @nestjs/bullmq@^12.0.0, @nestjs/platform-socket.io@^12.1.3, @nestjs/swagger@^12.0.2, sharp@^0.35.5, socket.io@^4.8.4 (+13 more)

### Community 112 - "api-versioning.spec.ts"
Cohesion: 0.25
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 115 - "identity-key.entity.ts"
Cohesion: 0.40
Nodes (4): identityKeyAlgorithms, ColumnRow, expectedColumns, jwk

### Community 120 - "cache-invalidation-rules.ts"
Cohesion: 0.13
Nodes (18): apiKeyCacheKeys(), cacheInvalidatedEventNames(), CacheInvalidationRule, cacheInvalidationRules, projectCacheKeys(), apiKeyEvent, projectEvent, cacheKeys (+10 more)

### Community 122 - "secrets-reencryption.service.ts"
Cohesion: 0.14
Nodes (13): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldReencryption, FieldResult, FieldVersionCount, ReencryptInput (+5 more)

### Community 124 - "project-cli.ts"
Cohesion: 0.28
Nodes (8): buildServer(), fullOriginArguments, listHeader, onceWarning, repositoryRoot, runMainCli(), serverDirectory, uuidPattern

### Community 125 - "encryption-keys.schema.spec.ts"
Cohesion: 0.20
Nodes (8): encryptionConfig, describeErrors(), key1, key1Bytes, key2, key2Bytes, parseKeys(), requiredEnv

### Community 126 - "operator-commands.e2e-spec.ts"
Cohesion: 0.23
Nodes (13): runCommand(), disabledAtOf(), setupOperator(), disabledAtOf(), helpEntries, setupOperator(), operatorActions, operatorBlockAuditRows() (+5 more)

### Community 127 - "replica-events-offline-redis.e2e-spec.ts"
Cohesion: 0.20
Nodes (12): CapturedRun, runCaptured(), CliRunResult, runCliInProcess(), MainProject, captureLogLines(), ChannelRecorder, ClosingRedisServer (+4 more)

### Community 128 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 129 - "token-signing-keys.schema.ts"
Cohesion: 0.67
Nodes (5): parseEntry(), parseKeys(), parsePrivateKey(), reject(), tokenSigningKeysSchema

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 133 - "replica-events.e2e-spec.ts"
Cohesion: 0.23
Nodes (12): expectCachedOnAll(), expectKept(), repositoryRoot, seed(), waitUntilDeleted(), Env, serverDirectory, cacheInvalidateSubscribers() (+4 more)

### Community 135 - "main.ts"
Cohesion: 0.13
Nodes (19): cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, connectReplicaEvents(), replicaEventsMicroservice, replicaEventsRetryDelayMs (+11 more)

### Community 136 - "zone-servers.ts"
Cohesion: 0.22
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 137 - "test-domain-events.ts"
Cohesion: 0.19
Nodes (9): happened, TestListener, DomainEventHandler, OnDomainEvent(), TelemetryModule, DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent (+1 more)

### Community 139 - "api.module.ts"
Cohesion: 0.11
Nodes (10): ApiModule, OperatorAuthModule, ServerApiModule, ServerAuthModule, useClsMiddleware(), ApiHttpModule, echoRequestId(), resolveRequestId() (+2 more)

### Community 142 - "encryption-keys.schema.ts"
Cohesion: 0.60
Nodes (5): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject()

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1005 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `zod-serialization.spec.ts`, `log-level-warn.spec.ts`, `replica-events.e2e-spec.ts`, `tokens.service.spec.ts`, `main.ts`, `DomainEventBus`, `server-key-guard.e2e-spec.ts`, `api.module.ts`, `test-domain-events.ts`, `dependencies`, `RedactionProbeController`, `api-app.ts`, `operator-block-sync.e2e-spec.ts`, `ProjectsService`, `Project`, `key-format.ts`, `migrate.module.ts`, `config.module.ts`, `@nestjs/testing`, `database.module.ts`, `logger.module.ts`, `replica-cache-sync.e2e-spec.ts`, `operator-auth.guard.ts`, `identity-keys.service.ts`, `projects-service.e2e-spec.ts`, `audit-log.e2e-spec.ts`, `RequestContext`, `encryption.service.spec.ts`, `IdentityKey`, `security-headers.spec.ts`, `redis.module.ts`, `request-id.spec.ts`, `replica-events-publisher.module.ts`, `server-errors.spec.ts`, `health.module.ts`, `OperationSteps`, `operator-auth-guard.e2e-spec.ts`, `secrets-reencrypt.command.ts`, `zone.ts`, `telemetry.interceptor.spec.ts`, `api-keys.service.ts`, `server-errors.spec.ts`, `body-limit.spec.ts`, `cache-invalidate.controller.spec.ts`, `operator-auth-guard.e2e-spec.ts`, `api-docs.spec.ts`, `SlowProbeController`, `writeLine`, `server/package.json`, `api-versioning.spec.ts`, `cache-invalidation-rules.ts`, `secrets-reencryption.service.ts`?**
  _High betweenness centrality (0.253) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14035087719298245 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `conversation.entity.ts` to `database-migrations.ts`, `AddConversationIndexes1793215983154`, `CreateIdentityKeys1793300001000`, `dependencies`, `AddProjectsPublicKey1793300002000`, `CreateOperators1793300003000`, `operator-block-sync.e2e-spec.ts`, `Project`, `ConversationEvent`, `database.module.ts`, `test-database.ts`, `Project`, `key-cli.ts`, `replica-cache-sync.e2e-spec.ts`, `@nestjs/common`, `migrate-mode.e2e-spec.ts`, `projects-service.e2e-spec.ts`, `test-secrets.ts`, `conversation.entity.spec.ts`, `identity-key-commands.e2e-spec.ts`, `Channel`, `participant.entity.spec.ts`, `OperationSteps`, `operator-auth-guard.e2e-spec.ts`, `CreateChatTables1793215389271`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `api-keys.service.ts`, `ref_node_path`, `server/package.json`, `identity-key.entity.ts`, `operator-commands.e2e-spec.ts`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `@nestjs/testing` to `devDependencies`, `tokens.service.spec.ts`, `DomainEventBus`, `test-domain-events.ts`, `api.module.ts`, `api-app.ts`, `key-format.ts`, `config.module.ts`, `test-database.ts`, `logger.module.ts`, `key-cli.ts`, `migrate-mode.e2e-spec.ts`, `projects-service.e2e-spec.ts`, `test-secrets.ts`, `audit-log.e2e-spec.ts`, `RequestContext`, `ProjectsService`, `encryption.service.spec.ts`, `identity-key-commands.e2e-spec.ts`, `redis.module.ts`, `OperationSteps`, `domain-events.ts`, `api-keys.service.ts`, `cache-invalidate.controller.spec.ts`, `operators.service.spec.ts`, `server/package.json`, `operator-commands.e2e-spec.ts`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._