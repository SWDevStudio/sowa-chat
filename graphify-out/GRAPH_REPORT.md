# Graph Report - hector-chat-epic-11  (2026-10-29)

## Corpus Check
- 450 files · ~115,713 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 3110 nodes · 7739 edges · 149 communities (118 shown, 31 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 201 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d1332a8d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- typeorm
- bot-sdk/tsconfig.json
- package.json
- visitor-session-refresh.e2e-spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- RequestContext
- env.schema.ts
- compilerOptions
- protocol/src/index.ts
- environment-checks.service.ts
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
- replica-events.publisher.spec.ts
- operator-role.guard.spec.ts
- AuditLogEntry
- scripts
- origin.commands.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- domain-events.ts
- MixedZoneController
- ConversationEvent
- development-secrets-file.ts
- tsconfig.build.json
- ValidationProbeController
- main.ts
- nest-cli.json
- zone-probe.ts
- DomainEventBus
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- audit-log-entry.entity.ts
- RedactionProbeController
- ref_node_crypto
- identity-key-commands.e2e-spec.ts
- Conversation
- cli.module.ts
- database-connection.e2e-spec.ts
- initial-project.e2e-spec.ts
- server-errors.spec.ts
- json-object-limits.spec.ts
- Project
- ProjectCreateCommand
- ZoneProbeApp
- migrate-mode.e2e-spec.ts
- visitor-session.controller.ts
- test-secrets.ts
- worker.module.ts
- request-id.spec.ts
- worker.module.ts
- KeyRevokeCommand
- ref_node_crypto
- encryption.service.spec.ts
- replica-cache-sync.e2e-spec.ts
- conversation.entity.spec.ts
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- projects.service.ts
- OperationSteps
- main.ts
- ref_vitest
- config.module.ts
- http-error.filter.spec.ts
- api-app.ts
- secret-rotation.ts
- health.module.ts
- operators.service.ts
- operator-block-sync.e2e-spec.ts
- workspace-check-types.e2e-spec.ts
- operator-auth.guard.ts
- key-cli.ts
- CreateChatTables1793215389271
- audited-events.spec.ts
- ioredis
- secrets-reencrypt.command.ts
- zone.guard.spec.ts
- Message
- encryption-keys.schema.spec.ts
- SecretsReencryptionService
- api-keys.service.ts
- identity-keys.service.ts
- log-redaction.e2e-spec.ts
- database.module.ts
- cli-mode.e2e-spec.ts
- operator-guard-probe.ts
- api-docs.spec.ts
- IdentityKeyAddCommand
- JsonObjectValidator
- telemetry.interceptor.ts
- visitor-auth-guard.e2e-spec.ts
- Zone
- operators.module.ts
- test-database.ts
- tokens.service.ts
- redis-connection.e2e-spec.ts
- server/package.json
- packages-build.e2e-spec.ts
- visitor-session.e2e-spec.ts
- tokens.service.spec.ts
- DomainEventBus
- replica-events.e2e-spec.ts
- secrets-reencryption.service.ts
- operator-token.controller.ts
- log-settings.e2e-spec.ts
- createProject
- api-versioning.spec.ts
- visitor-sessions-table.e2e-spec.ts
- audit-log.e2e-spec.ts
- token-signing-keys.schema.ts
- ServerErrorsProbeController
- health.e2e-spec.ts
- visitors.module.ts
- env.schema.spec.ts
- SlowProbeController
- encrypted-secret.spec.ts
- @aws-sdk/client-s3@^3.1151.0
- @aws-sdk/s3-request-presigner@^3.1151.0
- file-type@^22.1.1
- zod-serialization.spec.ts
- @nestjs/throttler@^6.7.1
- zod@catalog:
- @nestjs/cli@^12.0.0
- @types/pg@^8.23.1
- bullmq@^6.3.15
- project-snapshot-cache.e2e-spec.ts
- @nest-lab/throttler-storage-redis@^1.2.0
- pino-http

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 164 edges
2. `typeorm` - 68 edges
3. `Zone()` - 54 edges
4. `@nestjs/testing` - 50 edges
5. `Project` - 50 edges
6. `ProjectsService` - 48 edges
7. `useTestDatabase()` - 48 edges
8. `DomainEventBus` - 40 edges
9. `createProject()` - 39 edges
10. `findFreePort()` - 33 edges

## Surprising Connections (you probably didn't know these)
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts
- `AuditRecord` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-rule.ts → packages/protocol/src/json-types.ts
- `ConversationEvent` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/conversations/conversation-event.entity.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (149 total, 31 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.06
Nodes (19): columns(), expectedColumns, findColumn(), findRelation(), normalizeSql(), relations(), runMigration(), NewVisitorSession (+11 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "visitor-session-refresh.e2e-spec.ts"
Cohesion: 0.07
Nodes (40): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+32 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21, supertest@^7.0.0 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "RequestContext"
Cohesion: 0.08
Nodes (5): RequestContextModule, RequestContext, ConsumerModule, ContextConsumer, GuardProbeController

### Community 7 - "env.schema.ts"
Cohesion: 0.10
Nodes (20): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+12 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "protocol/src/index.ts"
Cohesion: 0.11
Nodes (17): OperatorTokenClaims, operatorTokenClaimsSchema, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope (+9 more)

### Community 10 - "environment-checks.service.ts"
Cohesion: 0.14
Nodes (20): environmentChecksConfig, CheckContext, CheckFinding, CheckLevel, CheckResult, EnvironmentCheck, EnvironmentCheckError, describeResult() (+12 more)

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

### Community 22 - "replica-events.publisher.spec.ts"
Cohesion: 0.10
Nodes (17): parseDatabase(), parseUrl(), RedisConnectionOptions, redisTransportOptions(), stripIpv6Brackets(), ReplicaEventMessage, replicaEventNames(), ReplicaEventRule (+9 more)

### Community 23 - "operator-role.guard.spec.ts"
Cohesion: 0.09
Nodes (15): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey (+7 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.09
Nodes (14): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand (+6 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.16
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.23
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.12
Nodes (16): boolean, ColumnSpec, expectedColumnCounts, expectedForeignKeys, expectedTables, expectedUniqueIndexes, integer, jsonb (+8 more)

### Community 32 - "domain-events.ts"
Cohesion: 0.14
Nodes (21): apiKeyCacheKeys(), cacheInvalidatedEventNames(), CacheInvalidationRule, cacheInvalidationRules, projectCacheKeys(), apiKeyEvent, projectEvent, LocalCacheInvalidation (+13 more)

### Community 33 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "development-secrets-file.ts"
Cohesion: 0.22
Nodes (16): createDevelopmentSecrets(), defaultDevelopmentSecretsDirectory, DevelopmentMainProject, DevelopmentSecrets, developmentSecretsFileName, developmentSecretsPath(), developmentSecretsSchema, hasErrorCode() (+8 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "main.ts"
Cohesion: 0.09
Nodes (21): AppClsModule, LogLevel, DatabaseMigrationStep, createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions() (+13 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-probe.ts"
Cohesion: 0.08
Nodes (32): ApiModule, DatabaseModule, DependencyStatusBody, StatusBody, findZonePorts(), probeControllers, startListening(), stopListening() (+24 more)

### Community 41 - "DomainEventBus"
Cohesion: 0.10
Nodes (9): BusProbe, Probe, DomainEventBus, happened, DomainEventHandler, OnDomainEvent(), TelemetryModule, CacheBusModule (+1 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "audit-log-entry.entity.ts"
Cohesion: 0.31
Nodes (6): ActorKind, actorKinds, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns

### Community 46 - "RedactionProbeController"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 47 - "ref_node_crypto"
Cohesion: 0.08
Nodes (36): KeyRevokeOptions, InvalidApiKeyError, eventFields, serverKey, base, base62Alphabet, encodeBase62(), buildLookupPrefix() (+28 more)

### Community 48 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.18
Nodes (24): expectNoKeyRows(), expectNoRows(), addKey(), runCaptured(), runCliInProcess(), addEd25519Key(), addIdentityKey(), addP256Key() (+16 more)

### Community 49 - "Conversation"
Cohesion: 0.07
Nodes (17): Conversation, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind, messageSenderKinds, MessageType, messageTypes, Participant (+9 more)

### Community 50 - "cli.module.ts"
Cohesion: 0.06
Nodes (31): emptyCell, formatDate(), serverKeyOnceWarning, writeLine(), writeTable(), writeWarning(), IdentityKeyAddOptions, readPem() (+23 more)

### Community 51 - "database-connection.e2e-spec.ts"
Cohesion: 0.12
Nodes (17): AppConfigModule, fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus() (+9 more)

### Community 52 - "initial-project.e2e-spec.ts"
Cohesion: 0.18
Nodes (12): CreatedProject, CreateProjectInput, apiKeyRows(), expectSingleProject(), projectCreatedRows(), apiKeyRows(), auditRows(), expectNoRows() (+4 more)

### Community 53 - "server-errors.spec.ts"
Cohesion: 0.08
Nodes (30): OperatorDisabledFilter, InvalidPublicKeyFilter, InvalidRefreshTokenFilter, OperatorDisabledError, InvalidPublicKeyError, ApiException, ApiExceptionInput, errorCodeStatuses (+22 more)

### Community 54 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 55 - "Project"
Cohesion: 0.08
Nodes (21): databaseEntities, Channel, channelColumns(), findColumn(), ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses (+13 more)

### Community 57 - "ZoneProbeApp"
Cohesion: 0.10
Nodes (9): prom-client@^15.1.3, calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, MetricsController, MetricsModule, ZoneProbeApp (+1 more)

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 59 - "visitor-session.controller.ts"
Cohesion: 0.12
Nodes (15): toVisitorSessionResponse(), VisitorSessionController, VisitorSessionRefreshRequestDto, VisitorSessionRequestDto, VisitorSessionResponseDto, InvalidRefreshTokenError, VisitorSessionTokens, refreshToken (+7 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.12
Nodes (29): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+21 more)

### Community 61 - "worker.module.ts"
Cohesion: 0.18
Nodes (8): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditRule, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 62 - "request-id.spec.ts"
Cohesion: 0.13
Nodes (10): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+2 more)

### Community 63 - "worker.module.ts"
Cohesion: 0.29
Nodes (3): AuditModule, EnvironmentChecksModule, WorkerModule

### Community 65 - "ref_node_crypto"
Cohesion: 0.33
Nodes (7): firstTokenSigningKeyIds, GeneratedSecret, generatedSecrets, SecretsMode, generateEncryptionKeyEntry(), generateTokenSigningKeyEntry(), minimalEnv

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.12
Nodes (14): CryptoModule, authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService, SecretDecryptionError (+6 more)

### Community 67 - "replica-cache-sync.e2e-spec.ts"
Cohesion: 0.09
Nodes (24): badOrigins, expectStatusOnAll(), probeWithKey(), ReplicaProbeController, CapturedRun, stubRefusedRedis(), CliRunResult, MainProject (+16 more)

### Community 68 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "IdentityKey"
Cohesion: 0.08
Nodes (13): IdentityKey, IdentityKeyAlgorithm, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey(), readPublicKeyObject() (+5 more)

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.31
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "projects.service.ts"
Cohesion: 0.05
Nodes (37): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), OriginList, originLists, normalizeOrigin(), normalizeOrigins(), parseUrl() (+29 more)

### Community 73 - "OperationSteps"
Cohesion: 0.11
Nodes (10): DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationSteps, OperationStepsProbeController, beginOperation(), operationTimingKey (+2 more)

### Community 74 - "main.ts"
Cohesion: 0.11
Nodes (20): cliName, commanderArgv(), runCliCommand(), startupLogLevels, LogDestination, connectReplicaEvents(), replicaEventsMicroservice, replicaEventsRetryDelayMs (+12 more)

### Community 75 - "ref_vitest"
Cohesion: 0.18
Nodes (5): columns(), expectedColumns, findColumn(), findRelation(), relations()

### Community 76 - "config.module.ts"
Cohesion: 0.24
Nodes (15): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig (+7 more)

### Community 77 - "http-error.filter.spec.ts"
Cohesion: 0.15
Nodes (6): ApiHttpModule, HttpErrorFilter, responseZodErrorOf(), knownKeys, ProbeBodyDto, requestIdHeader

### Community 78 - "api-app.ts"
Cohesion: 0.18
Nodes (13): configureApiApp(), useClsMiddleware(), setupApiDocs(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError() (+5 more)

### Community 79 - "secret-rotation.ts"
Cohesion: 0.29
Nodes (11): nextTokenSigningKeyId(), parseVariable(), requireConfiguredValue(), rotateConfiguredSecrets(), rotateEncryptionKeys(), rotateSecrets(), rotateTokenSigningKeys(), Source (+3 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (12): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+4 more)

### Community 81 - "operators.service.ts"
Cohesion: 0.05
Nodes (25): DisabledOperators, OperatorReplicaEventsController, createDisabledOperators(), malformedPayloads, OperatorsRepository, ChangeOperatorBlockInput, IssuedOperatorToken, OperatorActorKind (+17 more)

### Community 82 - "operator-block-sync.e2e-spec.ts"
Cohesion: 0.11
Nodes (22): issueOperator(), issueOperator(), blockedOnAll(), BlockTarget, expectStatusOnAll(), issueOperator(), publishAll(), subscriberCounts() (+14 more)

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "operator-auth.guard.ts"
Cohesion: 0.13
Nodes (6): OperatorAuthGuard, ServerKeyGuard, VisitorTokenClaims, visitorTokenClaimsSchema, bearerToken(), FakeRequestInput

### Community 85 - "key-cli.ts"
Cohesion: 0.35
Nodes (14): toLookupPrefix(), auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix(), listKeys() (+6 more)

### Community 87 - "audited-events.spec.ts"
Cohesion: 0.11
Nodes (13): auditedEventNames(), auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent (+5 more)

### Community 88 - "ioredis"
Cohesion: 0.20
Nodes (8): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 89 - "secrets-reencrypt.command.ts"
Cohesion: 0.16
Nodes (11): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+3 more)

### Community 90 - "zone.guard.spec.ts"
Cohesion: 0.07
Nodes (25): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), zonePathPrefixes, ApiZone (+17 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 94 - "api-keys.service.ts"
Cohesion: 0.06
Nodes (21): ApiKey, ApiKeyKind, apiKeyKinds, ApiKeysRepository, NewApiKey, ApiKeysService, ApiKeySummary, CachedApiKey (+13 more)

### Community 95 - "identity-keys.service.ts"
Cohesion: 0.10
Nodes (9): IdentityKeyRevokeCommand, KeyActorKind, AddIdentityKeyInput, IdentityKeyKidTakenError, IdentityKeysService, InvalidIdentityKeyIdError, RevokeIdentityKeyInput, toEvent() (+1 more)

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.31
Nodes (8): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), RunningServer

### Community 97 - "database.module.ts"
Cohesion: 0.10
Nodes (19): database, loadDataSource(), DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createTypeOrmModule(), getTypeOrmModule() (+11 more)

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "operator-guard-probe.ts"
Cohesion: 0.31
Nodes (5): OperatorController(), DisabledProbeController, get(), getAs(), OperatorGuardProbeController

### Community 100 - "api-docs.spec.ts"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 102 - "JsonObjectValidator"
Cohesion: 0.17
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, JsonObjectValidator, Violation, JsonObjectLimits, encoder (+1 more)

### Community 103 - "telemetry.interceptor.ts"
Cohesion: 0.10
Nodes (9): requiredEnv, slowOperationsConfig, HttpMetrics, StepTimes, FinishedOperation, SlowOperationsModule, roundSteps(), SlowOperations (+1 more)

### Community 104 - "visitor-auth-guard.e2e-spec.ts"
Cohesion: 0.16
Nodes (9): VisitorAuthModule, VisitorController(), forgeUnsecuredToken(), VisitorGuardProbeController, visitorProbePath, getProbe(), IssuedVisitor, issueVisitor() (+1 more)

### Community 105 - "Zone"
Cohesion: 0.07
Nodes (17): ServerController(), BodyProbeController, InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController (+9 more)

### Community 106 - "operators.module.ts"
Cohesion: 0.13
Nodes (7): OperatorAuthModule, ServerApiModule, ServerAuthModule, DisabledOperatorsModule, OperatorsModule, TokensModule, OperationStepsModule

### Community 107 - "test-database.ts"
Cohesion: 0.09
Nodes (29): CliModule, ColumnRow, expectedColumns, runCommand(), disabledAtOf(), setupOperator(), disabledAtOf(), helpEntries (+21 more)

### Community 108 - "tokens.service.ts"
Cohesion: 0.10
Nodes (9): VisitorAuthGuard, TokenSigningKey, SignedToken, SignTokenInput, TokenConsumer, TokenAudience, tokenAudiences, TokensService (+1 more)

### Community 109 - "redis-connection.e2e-spec.ts"
Cohesion: 0.14
Nodes (8): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, IdentityRow, VersionRow, useTestRedis(), testEnv

### Community 110 - "server/package.json"
Cohesion: 0.09
Nodes (21): author, bin, sowa-chat, @nestjs/bullmq@^12.0.0, @nestjs/platform-socket.io@^12.1.3, @nestjs/swagger@^12.0.2, sharp@^0.35.5, socket.io@^4.8.4 (+13 more)

### Community 111 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 112 - "visitor-session.e2e-spec.ts"
Cohesion: 0.13
Nodes (4): VisitorSession, createProjectWithPublicKey(), postPublic(), postSession()

### Community 115 - "tokens.service.spec.ts"
Cohesion: 0.11
Nodes (30): ConsumerModule, TestTokenSigningConfigModule, getProbe(), withToken(), encodePart(), flipSignatureBit(), ForgedTokenInput, forgeToken() (+22 more)

### Community 120 - "DomainEventBus"
Cohesion: 0.31
Nodes (5): TestListener, DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 121 - "replica-events.e2e-spec.ts"
Cohesion: 0.26
Nodes (11): expectCachedOnAll(), expectKept(), repositoryRoot, seed(), waitUntilDeleted(), Env, cacheInvalidateSubscribers(), cacheOf() (+3 more)

### Community 122 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldResult, ReencryptInput, reencryptionBatchSize, ReencryptionReport (+3 more)

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.17
Nodes (6): nestjs-zod@^5.5.0, OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, OperatorTokenResponse, nestjs-zod

### Community 124 - "log-settings.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+2 more)

### Community 125 - "createProject"
Cohesion: 0.06
Nodes (20): identityKeyAlgorithms, Operator, issueServerKey(), IndexRow, PlanRow, ColumnRow, expectedColumns, jwk (+12 more)

### Community 126 - "api-versioning.spec.ts"
Cohesion: 0.25
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 127 - "visitor-sessions-table.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): createVisitor(), ColumnRow, ConstraintRow, createVisitorId(), expectedColumns, insertSession(), nextWeek(), SessionRow

### Community 129 - "token-signing-keys.schema.ts"
Cohesion: 0.29
Nodes (6): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, tokenSigningKeysSchema

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 132 - "visitors.module.ts"
Cohesion: 0.06
Nodes (6): VisitorApiModule, VisitorSessionsRepository, VisitorSessionsService, VisitorsModule, VisitorsRepository, ErrorProbeController

### Community 135 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 139 - "zod-serialization.spec.ts"
Cohesion: 0.25
Nodes (6): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto

### Community 150 - "project-snapshot-cache.e2e-spec.ts"
Cohesion: 0.09
Nodes (15): ProjectSnapshot, toProjectSnapshot(), project, snapshot, AppCacheModule, cacheTtlMs, cacheKeys, apiKeyEvent (+7 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1083 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `health.module.ts` to `typeorm`, `audit-log.e2e-spec.ts`, `visitor-session-refresh.e2e-spec.ts`, `visitors.module.ts`, `RequestContext`, `environment-checks.service.ts`, `zod-serialization.spec.ts`, `dependencies`, `project-snapshot-cache.e2e-spec.ts`, `operator-role.guard.spec.ts`, `replica-events.publisher.spec.ts`, `origin.commands.ts`, `domain-events.ts`, `main.ts`, `zone-probe.ts`, `DomainEventBus`, `RedactionProbeController`, `ref_node_crypto`, `cli.module.ts`, `server-errors.spec.ts`, `Project`, `ZoneProbeApp`, `visitor-session.controller.ts`, `worker.module.ts`, `request-id.spec.ts`, `worker.module.ts`, `encryption.service.spec.ts`, `replica-cache-sync.e2e-spec.ts`, `IdentityKey`, `projects.service.ts`, `OperationSteps`, `main.ts`, `config.module.ts`, `http-error.filter.spec.ts`, `api-app.ts`, `operators.service.ts`, `operator-block-sync.e2e-spec.ts`, `operator-auth.guard.ts`, `ioredis`, `secrets-reencrypt.command.ts`, `zone.guard.spec.ts`, `api-keys.service.ts`, `identity-keys.service.ts`, `database.module.ts`, `operator-guard-probe.ts`, `api-docs.spec.ts`, `telemetry.interceptor.ts`, `visitor-auth-guard.e2e-spec.ts`, `Zone`, `operators.module.ts`, `tokens.service.ts`, `server/package.json`, `tokens.service.spec.ts`, `replica-events.e2e-spec.ts`, `secrets-reencryption.service.ts`, `operator-token.controller.ts`, `createProject`, `api-versioning.spec.ts`?**
  _High betweenness centrality (0.242) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.06079664570230608 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `visitor-session-refresh.e2e-spec.ts`, `environment-checks.service.ts`, `dependencies`, `operator-role.guard.spec.ts`, `ConversationEvent`, `audit-log-entry.entity.ts`, `identity-key-commands.e2e-spec.ts`, `Conversation`, `database-connection.e2e-spec.ts`, `initial-project.e2e-spec.ts`, `Project`, `migrate-mode.e2e-spec.ts`, `test-secrets.ts`, `replica-cache-sync.e2e-spec.ts`, `conversation.entity.spec.ts`, `OperationSteps`, `ref_vitest`, `operator-block-sync.e2e-spec.ts`, `key-cli.ts`, `CreateChatTables1793215389271`, `Message`, `api-keys.service.ts`, `database.module.ts`, `operator-guard-probe.ts`, `test-database.ts`, `redis-connection.e2e-spec.ts`, `server/package.json`, `createProject`, `visitor-sessions-table.e2e-spec.ts`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Project` connect `Project` to `audit-log.e2e-spec.ts`, `typeorm`, `replica-cache-sync.e2e-spec.ts`, `conversation.entity.spec.ts`, `visitor-session-refresh.e2e-spec.ts`, `IdentityKey`, `projects.service.ts`, `ref_vitest`, `audit-log-entry.entity.ts`, `Conversation`, `cli.module.ts`, `operator-block-sync.e2e-spec.ts`, `initial-project.e2e-spec.ts`, `project-snapshot-cache.e2e-spec.ts`, `AuditLogEntry`, `.create`, `createProject`, `api-keys.service.ts`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Should `visitor-session-refresh.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07364114552893045 - nodes in this community are weakly interconnected._