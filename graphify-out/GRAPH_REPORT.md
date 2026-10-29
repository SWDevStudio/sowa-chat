# Graph Report - hector-chat-epic-11  (2026-10-29)

## Corpus Check
- 478 files · ~125,630 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .log 1)

## Summary
- 3294 nodes · 8309 edges · 148 communities (117 shown, 31 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 209 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b05e24c5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- typeorm
- bot-sdk/tsconfig.json
- package.json
- visitor-session-refresh.e2e-spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- request-context.ts
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
- visitor-api.module.ts
- operator-role.guard.spec.ts
- typeorm
- scripts
- origin.commands.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- identity-key-list.command.ts
- main.ts
- DomainEventBus
- development-secrets-file.ts
- tsconfig.build.json
- ValidationProbeController
- logger.module.ts
- nest-cli.json
- @nestjs/testing
- api-docs.spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- OperatorDisableCommand
- RedactionProbeController
- json-object-limits.spec.ts
- visitor-session.controller.ts
- chat-tables.e2e-spec.ts
- cli.module.ts
- telemetry.interceptor.spec.ts
- initial-project.e2e-spec.ts
- server-errors.spec.ts
- startup-summary.service.spec.ts
- development-secrets.spec.ts
- ProjectCreateCommand
- database-entities.ts
- server/package.json
- JsonObject
- test-secrets.ts
- audit-log.e2e-spec.ts
- identity-keys.e2e-spec.ts
- cli-runner.ts
- participant.entity.spec.ts
- api-app.ts
- encryption.service.spec.ts
- key-cli.ts
- log-level-warn.spec.ts
- secrets-generate.command.spec.ts
- ref_node_crypto
- body-limit.spec.ts
- api-keys.service.ts
- OperationSteps
- migrate.module.ts
- audited-events.ts
- config.module.ts
- secrets-reencrypt.command.ts
- secrets-generate.command.ts
- secret-rotation.ts
- health.module.ts
- operator-replica-events.controller.spec.ts
- packages-build.e2e-spec.ts
- operator-block-sync.e2e-spec.ts
- RequestContext
- errors.spec.ts
- CreateChatTables1793215389271
- TelemetryProbeController
- redis-transport-options.ts
- domain-events.ts
- zone-e2e-app.ts
- Message
- encryption-keys.schema.spec.ts
- secrets-reencryption.service.ts
- api-keys-cache.e2e-spec.ts
- IdentityKey
- development-project.e2e-spec.ts
- OperatorAuthModule
- cli-mode.e2e-spec.ts
- SecretsReencryptionService
- ServerAuthModule
- IdentityKeyAddCommand
- JsonObjectValidator
- findFreePort
- @nestjs/common
- api.module.ts
- @nestjs/testing
- identity-key-pem.ts
- ref_node_path
- TelemetryModule
- migrate-mode.e2e-spec.ts
- OperatorsService
- tokens.service.ts
- DisabledOperators
- replica-events.e2e-spec.ts
- ReplicaEventsPublisher
- env.schema.initial-project.spec.ts
- env.schema.logging.spec.ts
- test-database.ts
- @nestjs/swagger
- env.schema.spec.ts
- @aws-sdk/client-s3@^3.1151.0
- ServerErrorsProbeController
- encrypted-secret.spec.ts
- visitor-session.e2e-spec.ts
- http-error.filter.spec.ts
- helmet
- global-setup.ts
- @nestjs/common
- workspace-check-types.e2e-spec.ts
- ErrorProbeController
- log-redaction.spec.ts
- projects.service.ts
- operator-auth.guard.ts
- development-secrets.ts
- IdentityKeyRevokeCommand
- project-list.command.ts
- operator-token.controller.ts
- token-signing-keys.schema.ts
- OperationStepsProbeController
- pino-http

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 170 edges
2. `typeorm` - 69 edges
3. `ProjectsService` - 54 edges
4. `Zone()` - 54 edges
5. `Project` - 53 edges
6. `@nestjs/testing` - 52 edges
7. `useTestDatabase()` - 51 edges
8. `DomainEventBus` - 40 edges
9. `createProject()` - 39 edges
10. `@nestjs/config` - 38 edges

## Surprising Connections (you probably didn't know these)
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
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

## Communities (148 total, 31 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.05
Nodes (21): columns(), expectedColumns, findColumn(), findRelation(), normalizeSql(), relations(), runMigration(), DatabaseMigration (+13 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "visitor-session-refresh.e2e-spec.ts"
Cohesion: 0.12
Nodes (31): api(), createProjectWithPublicKey(), findAllSessions(), findFamilySessions(), findSessionByRefreshToken(), postVisitorSession(), postVisitorSessionRefresh(), startVisitorSession() (+23 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (31): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+23 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "request-context.ts"
Cohesion: 0.13
Nodes (8): OperatorProfile, IssueOperatorTokenInput, RequestContextModule, RequestOperator, RequestVisitor, ConsumerModule, ContextConsumer, OperatorRole

### Community 7 - "env.schema.ts"
Cohesion: 0.09
Nodes (21): checkEncryptionKeysInProduction(), checkInitialServerKey(), checkPrettyLogFormat(), checkPublicUrlInProduction(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), EnvObject, envObjectSchema (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "protocol/src/index.ts"
Cohesion: 0.11
Nodes (16): OperatorTokenClaims, operatorTokenClaimsSchema, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope (+8 more)

### Community 10 - "environment-checks.service.ts"
Cohesion: 0.07
Nodes (39): ioredis@^6.0.0, environmentChecksConfig, exampleSecretsCheck, exampleSecretValues, publicUrlsHttpsCheck, s3PublicUrlCheck, contextWith(), developmentContext() (+31 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, @aws-sdk/s3-request-presigner@^3.1151.0, cache-manager@^7.2.9, jose@^6.2.12, nest-commander@^3.21.0, @nestjs/cache-manager@^12.0.1, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1 (+26 more)

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

### Community 23 - "operator-role.guard.spec.ts"
Cohesion: 0.14
Nodes (8): OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly(), supervisorOnlyMetadataKey

### Community 24 - "typeorm"
Cohesion: 0.07
Nodes (21): database, loadDataSource(), databaseEntities, channelColumns(), findColumn(), columns(), expectedColumns, findColumn() (+13 more)

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.09
Nodes (14): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand (+6 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.11
Nodes (19): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), expectOnlyJsonLines() (+11 more)

### Community 28 - ".create"
Cohesion: 0.12
Nodes (7): toEvent(), AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.12
Nodes (16): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+8 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.12
Nodes (16): boolean, ColumnSpec, expectedColumnCounts, expectedForeignKeys, expectedTables, expectedUniqueIndexes, integer, jsonb (+8 more)

### Community 32 - "identity-key-list.command.ts"
Cohesion: 0.11
Nodes (10): formatDate(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow(), header, KeyListCommand, KeyListOptions (+2 more)

### Community 33 - "main.ts"
Cohesion: 0.20
Nodes (14): connectReplicaEvents(), replicaEventsMicroservice, replicaEventsRetryDelayMs, replicaEventsTransport(), unlimitedRetryAttempts, createContext(), mode, runApi() (+6 more)

### Community 34 - "DomainEventBus"
Cohesion: 0.10
Nodes (12): BusProbe, apiKeyEvent, projectEvent, ReplicaEventsPublisherModule, replicaPublishConnectTimeoutMs, replicaEventsClient, replicaPublishTimeoutMs, apiKeyEvent (+4 more)

### Community 35 - "development-secrets-file.ts"
Cohesion: 0.14
Nodes (19): developmentAllowedOrigins, developmentOperatorAllowedOrigins, developmentProjectName, InitialProjectService, createDevelopmentSecrets(), defaultDevelopmentSecretsDirectory, DevelopmentMainProject, DevelopmentSecrets (+11 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "logger.module.ts"
Cohesion: 0.20
Nodes (15): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+7 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "@nestjs/testing"
Cohesion: 0.06
Nodes (30): HealthBody, HealthEntry, DependencyStatusBody, StatusBody, entries(), errorEntriesOf(), Issue, LogEntry (+22 more)

### Community 41 - "api-docs.spec.ts"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "OperatorDisableCommand"
Cohesion: 0.17
Nodes (4): describeDisable(), describeEnable(), OperatorDisableCommand, OperatorEnableCommand

### Community 47 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 48 - "visitor-session.controller.ts"
Cohesion: 0.12
Nodes (16): nestjs-zod@^5.5.0, toVisitorSessionResponse(), VisitorSessionController, VisitorSessionRefreshRequestDto, VisitorSessionRequestDto, VisitorSessionResponseDto, VisitorSessionTokens, refreshToken (+8 more)

### Community 49 - "chat-tables.e2e-spec.ts"
Cohesion: 0.04
Nodes (34): Channel, Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEvent, ConversationEventActorKind (+26 more)

### Community 50 - "cli.module.ts"
Cohesion: 0.09
Nodes (15): emptyCell, serverKeyOnceWarning, writeLine(), writeWarning(), IdentityKeyAddOptions, IdentityKeyRevokeOptions, KeyCreateCommand, KeyCreateOptions (+7 more)

### Community 51 - "telemetry.interceptor.spec.ts"
Cohesion: 0.13
Nodes (10): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse (+2 more)

### Community 52 - "initial-project.e2e-spec.ts"
Cohesion: 0.08
Nodes (22): ProjectsModule, CreatedProject, CreateProjectInput, apiKeyRows(), expectSingleProject(), projectCreatedRows(), columns, createMain() (+14 more)

### Community 53 - "server-errors.spec.ts"
Cohesion: 0.10
Nodes (20): OperatorDisabledFilter, InvalidPublicKeyFilter, InvalidRefreshTokenFilter, OperatorDisabledError, InvalidPublicKeyError, ApiException, ApiExceptionInput, errorCodeStatuses (+12 more)

### Community 54 - "startup-summary.service.spec.ts"
Cohesion: 0.11
Nodes (12): formatOrigins(), createService(), ports, secretLines, shop, zoneLines, StartupSummaryService, portsConfig (+4 more)

### Community 55 - "development-secrets.spec.ts"
Cohesion: 0.15
Nodes (25): createdProject, existingProject, missingKeyWarning(), compileConfigModule(), compileInDevelopment(), developmentSecretsPath(), Loaded, allTestSecrets (+17 more)

### Community 57 - "database-entities.ts"
Cohesion: 0.23
Nodes (9): createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity (+1 more)

### Community 58 - "server/package.json"
Cohesion: 0.08
Nodes (25): author, bin, sowa-chat, bullmq@^6.3.15, file-type@^22.1.1, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/bullmq@^12.0.0, @nestjs/throttler@^6.7.1 (+17 more)

### Community 59 - "JsonObject"
Cohesion: 0.21
Nodes (5): ActorKind, AuditLogEntry, NewAuditLogEntry, AuditRecord, JsonObject

### Community 60 - "test-secrets.ts"
Cohesion: 0.12
Nodes (30): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+22 more)

### Community 61 - "audit-log.e2e-spec.ts"
Cohesion: 0.15
Nodes (10): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditModule, auditedEventNames(), AuditRule (+2 more)

### Community 62 - "identity-keys.e2e-spec.ts"
Cohesion: 0.20
Nodes (20): expectNoKeyRows(), expectNoRows(), addKey(), addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem(), identityKeyListHeader (+12 more)

### Community 63 - "cli-runner.ts"
Cohesion: 0.19
Nodes (10): cliName, CliRunSetup, commanderArgv(), quietLogLevels, runCliCommand(), runCliModule(), secretsGenerateCommandName, startupLogLevels (+2 more)

### Community 64 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 65 - "api-app.ts"
Cohesion: 0.20
Nodes (13): configureApiApp(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders() (+5 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.13
Nodes (14): encryptionConfig, authTagLength, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), CurrentKey, EncryptionService, SecretDecryptionError (+6 more)

### Community 67 - "key-cli.ts"
Cohesion: 0.08
Nodes (51): toLookupPrefix(), hashKey(), badOrigins, helpEntries, prefixes, expectStatusOnAll(), probeWithKey(), CapturedRun (+43 more)

### Community 68 - "log-level-warn.spec.ts"
Cohesion: 0.18
Nodes (8): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe

### Community 69 - "secrets-generate.command.spec.ts"
Cohesion: 0.18
Nodes (7): ../cli.module.js, ./${module}.module.js, generatedNames, linesOf(), productionEnv, rotatedNames, variablesOf()

### Community 70 - "ref_node_crypto"
Cohesion: 0.09
Nodes (31): eventFields, keyTypeByKind, serverKey, base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum() (+23 more)

### Community 72 - "api-keys.service.ts"
Cohesion: 0.12
Nodes (11): ApiKeysService, hashMatches(), InvalidApiKeyError, IssueApiKeyBaseInput, IssueApiKeyInput, IssuedApiKey, RevokeApiKeyInput, toCachedApiKey() (+3 more)

### Community 73 - "OperationSteps"
Cohesion: 0.06
Nodes (21): DatabaseStepSubscriber, HttpMetrics, OperationStep, operationSteps, OperationTiming, StepTimes, OperationSteps, beginOperation() (+13 more)

### Community 74 - "migrate.module.ts"
Cohesion: 0.12
Nodes (7): AppClsModule, AppConfigModule, DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 75 - "audited-events.ts"
Cohesion: 0.11
Nodes (13): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+5 more)

### Community 76 - "config.module.ts"
Cohesion: 0.18
Nodes (16): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, developmentSecretsConfig, initialProjectConfig (+8 more)

### Community 77 - "secrets-reencrypt.command.ts"
Cohesion: 0.16
Nodes (12): writeTable(), describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow() (+4 more)

### Community 78 - "secrets-generate.command.ts"
Cohesion: 0.28
Nodes (3): generateNewSecrets(), SecretsGenerateCommand, SecretsGenerateOptions

### Community 79 - "secret-rotation.ts"
Cohesion: 0.17
Nodes (18): firstTokenSigningKeyIds, GeneratedSecret, generatedSecrets, SecretsMode, generateEncryptionKeyEntry(), generateTokenSigningKeyEntry(), minimalEnv, nextTokenSigningKeyId() (+10 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 81 - "operator-replica-events.controller.spec.ts"
Cohesion: 0.18
Nodes (6): OperatorReplicaEventsController, malformedPayloads, CacheInvalidateEvent, OperatorReplicaEvent, operatorReplicaEventSchema, replicaEventPatterns

### Community 82 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 83 - "operator-block-sync.e2e-spec.ts"
Cohesion: 0.07
Nodes (30): OperatorController(), DisabledProbeController, issueOperator(), issueOperator(), blockedOnAll(), BlockTarget, expectStatusOnAll(), issueOperator() (+22 more)

### Community 84 - "RequestContext"
Cohesion: 0.08
Nodes (6): VisitorController(), RequestContext, GuardProbeController, OperatorGuardProbeController, VisitorGuardProbeController, visitorProbePath

### Community 85 - "errors.spec.ts"
Cohesion: 0.28
Nodes (6): errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody

### Community 88 - "redis-transport-options.ts"
Cohesion: 0.48
Nodes (5): parseDatabase(), parseUrl(), RedisConnectionOptions, redisTransportOptions(), stripIpv6Brackets()

### Community 89 - "domain-events.ts"
Cohesion: 0.15
Nodes (23): apiKeyCacheKeys(), cacheInvalidatedEventNames(), CacheInvalidationRule, cacheInvalidationRules, projectCacheKeys(), apiKeyEvent, projectEvent, cacheInvalidate() (+15 more)

### Community 90 - "zone-e2e-app.ts"
Cohesion: 0.10
Nodes (22): probeControllers, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, probeControllers (+14 more)

### Community 91 - "Message"
Cohesion: 0.27
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 93 - "secrets-reencryption.service.ts"
Cohesion: 0.14
Nodes (12): CryptoModule, encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldResult, ReencryptInput, reencryptionBatchSize (+4 more)

### Community 94 - "api-keys-cache.e2e-spec.ts"
Cohesion: 0.06
Nodes (12): ApiKey, ApiKeyKind, apiKeyKinds, ApiKeysRepository, NewApiKey, CachedApiKey, toSummary(), KeysModule (+4 more)

### Community 95 - "IdentityKey"
Cohesion: 0.10
Nodes (5): IdentityKey, IdentityKeysRepository, IdentityKeysService, InvalidIdentityKeyIdError, toEvent()

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 102 - "JsonObjectValidator"
Cohesion: 0.17
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, JsonObjectValidator, Violation, JsonObjectLimits, encoder (+1 more)

### Community 104 - "findFreePort"
Cohesion: 0.06
Nodes (51): fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), startApi() (+43 more)

### Community 105 - "@nestjs/common"
Cohesion: 0.05
Nodes (23): NeutralProbeController, SecondVersionProbeController, VersionedProbeController, InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController (+15 more)

### Community 106 - "api.module.ts"
Cohesion: 0.13
Nodes (9): ServerApiModule, AppCacheModule, cacheTtlMs, CacheInvalidateController, cacheInvalidateEventSchema, ReplicaEventsModule, ZonesModule, cache-manager (+1 more)

### Community 107 - "@nestjs/testing"
Cohesion: 0.09
Nodes (21): DisabledOperatorsModule, OperatorsModule, WorkerModule, runCommand(), disabledAtOf(), setupOperator(), disabledAtOf(), helpEntries (+13 more)

### Community 108 - "identity-key-pem.ts"
Cohesion: 0.14
Nodes (15): KeyActorKind, IdentityKeyAlgorithm, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey(), readPublicKeyObject() (+7 more)

### Community 109 - "ref_node_path"
Cohesion: 0.06
Nodes (23): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), migrationFiles, migrationsDirectory, packageJson, Env, isConfigVariable() (+15 more)

### Community 111 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+2 more)

### Community 112 - "OperatorsService"
Cohesion: 0.06
Nodes (16): Operator, OperatorsRepository, ChangeOperatorBlockInput, IssuedOperatorToken, OperatorActorKind, OperatorBlockChange, OperatorNotFoundError, OperatorsService (+8 more)

### Community 115 - "tokens.service.ts"
Cohesion: 0.07
Nodes (41): VisitorAuthModule, TokenSigningKey, SignedToken, SignTokenInput, ConsumerModule, TestTokenSigningConfigModule, TokenConsumer, TokenAudience (+33 more)

### Community 120 - "DisabledOperators"
Cohesion: 0.13
Nodes (12): DisabledOperators, Probe, createDisabledOperators(), happened, TestListener, DomainEventHandler, OperatorBlockEvent, OnDomainEvent() (+4 more)

### Community 121 - "replica-events.e2e-spec.ts"
Cohesion: 0.15
Nodes (13): IdentityRow, VersionRow, expectCachedOnAll(), expectKept(), repositoryRoot, seed(), waitUntilDeleted(), cacheInvalidateSubscribers() (+5 more)

### Community 122 - "ReplicaEventsPublisher"
Cohesion: 0.15
Nodes (3): LocalCacheInvalidation, errorMessage(), ReplicaEventsPublisher

### Community 123 - "env.schema.initial-project.spec.ts"
Cohesion: 0.29
Nodes (3): initVariables, loadConfig(), requiredEnv

### Community 124 - "env.schema.logging.spec.ts"
Cohesion: 0.33
Nodes (3): Env, logLevels, requiredEnv

### Community 125 - "test-database.ts"
Cohesion: 0.09
Nodes (25): actorKinds, identityKeyAlgorithms, ColumnRow, expectedColumns, ColumnRow, expectedColumns, jwk, createProjectWithKey() (+17 more)

### Community 130 - "ServerErrorsProbeController"
Cohesion: 0.16
Nodes (9): internalErrorMessage, ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith(), LogEntry, ServerErrorsProbeController, stringsInside() (+1 more)

### Community 131 - "encrypted-secret.spec.ts"
Cohesion: 0.20
Nodes (7): EncryptedSecret, ciphertext, iv, tag, validCiphertext, validIv, validTag

### Community 132 - "visitor-session.e2e-spec.ts"
Cohesion: 0.05
Nodes (12): generateRefreshToken(), Visitor, VisitorSession, VisitorSessionsRepository, InvalidRefreshTokenError, RefreshExchange, visitorAccessTokenTtlSeconds, VisitorSessionsService (+4 more)

### Community 134 - "http-error.filter.spec.ts"
Cohesion: 0.16
Nodes (8): ApiModule, useClsMiddleware(), knownKeys, ProbeBodyDto, echoRequestId(), requestIdHeader, resolveRequestId(), createE2eApp()

### Community 138 - "global-setup.ts"
Cohesion: 0.27
Nodes (9): testcontainers@^12.2.1, @testcontainers/postgresql@^12.2.1, runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl(), testcontainers (+1 more)

### Community 141 - "@nestjs/common"
Cohesion: 0.11
Nodes (10): prom-client@^15.1.3, TokensModule, HttpLabel, labelNames, MetricsController, MetricsModule, OperationStepsModule, SlowOperationsModule (+2 more)

### Community 143 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 149 - "log-redaction.spec.ts"
Cohesion: 0.20
Nodes (10): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+2 more)

### Community 150 - "projects.service.ts"
Cohesion: 0.06
Nodes (34): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), OriginList, originLists, normalizeOrigin(), normalizeOrigins(), parseUrl() (+26 more)

### Community 151 - "operator-auth.guard.ts"
Cohesion: 0.12
Nodes (7): OperatorAuthGuard, ServerKeyGuard, VisitorAuthGuard, VisitorTokenClaims, visitorTokenClaimsSchema, bearerToken(), FakeRequestInput

### Community 152 - "development-secrets.ts"
Cohesion: 0.24
Nodes (13): completeFile(), createFile(), findMissingSecrets(), generateAll(), isSet(), pickFromFile(), provideDevelopmentSecrets(), resolveDirectory() (+5 more)

### Community 156 - "project-list.command.ts"
Cohesion: 0.28
Nodes (4): formatOrigins(), header, ProjectListCommand, toRow()

### Community 158 - "operator-token.controller.ts"
Cohesion: 0.13
Nodes (7): OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, ServerController(), ReplicaProbeController, OperatorTokenResponse, operatorTokenResponseSchema

### Community 160 - "token-signing-keys.schema.ts"
Cohesion: 0.29
Nodes (6): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, tokenSigningKeysSchema

## Knowledge Gaps
- **7 isolated node(s):** `./${module}.module.js`, `../cli.module.js`, `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` (+2 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1148 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `ServerErrorsProbeController`, `visitor-session.e2e-spec.ts`, `http-error.filter.spec.ts`, `request-context.ts`, `environment-checks.service.ts`, `dependencies`, `log-redaction.spec.ts`, `visitor-api.module.ts`, `operator-role.guard.spec.ts`, `operator-auth.guard.ts`, `typeorm`, `origin.commands.ts`, `projects.service.ts`, `project-list.command.ts`, `operator-token.controller.ts`, `identity-key-list.command.ts`, `main.ts`, `DomainEventBus`, `development-secrets-file.ts`, `logger.module.ts`, `@nestjs/testing`, `api-docs.spec.ts`, `visitor-session.controller.ts`, `cli.module.ts`, `telemetry.interceptor.spec.ts`, `initial-project.e2e-spec.ts`, `server-errors.spec.ts`, `startup-summary.service.spec.ts`, `development-secrets.spec.ts`, `database-entities.ts`, `server/package.json`, `JsonObject`, `audit-log.e2e-spec.ts`, `cli-runner.ts`, `api-app.ts`, `encryption.service.spec.ts`, `key-cli.ts`, `log-level-warn.spec.ts`, `ref_node_crypto`, `body-limit.spec.ts`, `api-keys.service.ts`, `OperationSteps`, `migrate.module.ts`, `config.module.ts`, `secrets-reencrypt.command.ts`, `secrets-generate.command.ts`, `health.module.ts`, `operator-replica-events.controller.spec.ts`, `operator-block-sync.e2e-spec.ts`, `RequestContext`, `domain-events.ts`, `zone-e2e-app.ts`, `secrets-reencryption.service.ts`, `api-keys-cache.e2e-spec.ts`, `@nestjs/common`, `api.module.ts`, `@nestjs/testing`, `identity-key-pem.ts`, `OperatorsService`, `tokens.service.ts`, `DisabledOperators`, `replica-events.e2e-spec.ts`, `test-database.ts`?**
  _High betweenness centrality (0.227) - this node is a cross-community bridge._
- **What connects `./${module}.module.js`, `../cli.module.js`, `./tsconfig.json` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.0480225988700565 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `typeorm`, `visitor-session-refresh.e2e-spec.ts`, `environment-checks.service.ts`, `dependencies`, `chat-tables.e2e-spec.ts`, `initial-project.e2e-spec.ts`, `database-entities.ts`, `server/package.json`, `JsonObject`, `test-secrets.ts`, `identity-keys.e2e-spec.ts`, `participant.entity.spec.ts`, `key-cli.ts`, `OperationSteps`, `operator-block-sync.e2e-spec.ts`, `Message`, `api-keys-cache.e2e-spec.ts`, `findFreePort`, `@nestjs/testing`, `migrate-mode.e2e-spec.ts`, `replica-events.e2e-spec.ts`, `test-database.ts`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `@nestjs/testing` to `devDependencies`, `request-context.ts`, `http-error.filter.spec.ts`, `projects.service.ts`, `typeorm`, `DomainEventBus`, `logger.module.ts`, `@nestjs/testing`, `initial-project.e2e-spec.ts`, `development-secrets.spec.ts`, `server/package.json`, `test-secrets.ts`, `audit-log.e2e-spec.ts`, `identity-keys.e2e-spec.ts`, `api-app.ts`, `encryption.service.spec.ts`, `key-cli.ts`, `ref_node_crypto`, `OperationSteps`, `config.module.ts`, `operator-replica-events.controller.spec.ts`, `api-keys-cache.e2e-spec.ts`, `findFreePort`, `api.module.ts`, `OperatorsService`, `tokens.service.ts`, `DisabledOperators`, `test-database.ts`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Should `visitor-session-refresh.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12375533428165007 - nodes in this community are weakly interconnected._