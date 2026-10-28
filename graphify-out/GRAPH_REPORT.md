# Graph Report - hector-chat-epic-10  (2026-10-29)

## Corpus Check
- 308 files · ~72,979 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2247 nodes · 5030 edges · 129 communities (97 shown, 32 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 124 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3104a62e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- server/package.json
- env.schema.ts
- compilerOptions
- ref_node_path
- TestEncryptionConfigModule
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
- project-cli.ts
- AuditLogEntry
- scripts
- origin.commands.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- key-format.ts
- zone.guard.spec.ts
- ConversationEvent
- api.module.ts
- tsconfig.build.json
- ValidationProbeController
- config.module.ts
- nest-cli.json
- zone-probe.ts
- conversation.entity.spec.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- audit-log.e2e-spec.ts
- unit-probe.ts
- main.ts
- typeorm
- key-cli.ts
- @nestjs/common
- database-connection.e2e-spec.ts
- projects.service.ts
- log-redaction.spec.ts
- protocol/src/index.ts
- identity-key-pem.ts
- ProjectCreateCommand
- metrics.controller.ts
- migrate-mode.e2e-spec.ts
- identity-keys.service.ts
- test-secrets.ts
- slow-operations.spec.ts
- request-id.spec.ts
- migrate.module.ts
- api-versioning.spec.ts
- project-origins.e2e-spec.ts
- encryption.service.spec.ts
- Zone
- projects-service.e2e-spec.ts
- config-startup.e2e-spec.ts
- identity-keys.service.ts
- server-protocol.e2e-spec.ts
- ProjectsService
- OperationSteps
- audited-events.spec.ts
- main.ts
- participant.entity.spec.ts
- database-entities.ts
- cls-middleware.ts
- health.e2e-spec.ts
- health.module.ts
- security-headers.spec.ts
- IdentityKeyAddCommand
- workspace-check-types.e2e-spec.ts
- body-limit.ts
- OperationStepsProbeController
- CreateChatTables1793215389271
- audit-log.listener.spec.ts
- secrets-reencrypt-command.e2e-spec.ts
- secrets-reencryption.service.ts
- zone.ts
- Message
- encryption-keys.schema.spec.ts
- SecretsReencryptionService
- api-keys.service.ts
- domain-event-bus.spec.ts
- log-redaction.e2e-spec.ts
- global-setup.ts
- cli-mode.e2e-spec.ts
- origin.ts
- IdentityKeyRevokeCommand
- redis-connection.e2e-spec.ts
- JsonObjectValidator
- env.schema.slow-operations.spec.ts
- env.schema.spec.ts
- @aws-sdk/client-s3@^3.1151.0
- bullmq@^6.3.15
- @nest-lab/throttler-storage-redis@^1.2.0
- database-connection.e2e-spec.ts
- packages-build.e2e-spec.ts
- @nestjs/cache-manager@^12.0.1
- @nestjs/platform-socket.io@^12.1.3
- @nestjs/bullmq@^12.0.0
- TelemetryProbeController
- @nestjs/event-emitter
- body-limit.spec.ts
- secrets-reencryption.module.ts
- pg
- sharp@^0.35.5
- ZoneServers
- @nestjs/schematics@^12.0.0
- cache-manager@^7.2.9
- telemetry.interceptor.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 104 edges
2. `typeorm` - 51 edges
3. `Zone()` - 46 edges
4. `Project` - 41 edges
5. `ProjectsService` - 35 edges
6. `@nestjs/testing` - 32 edges
7. `ApiKey` - 27 edges
8. `Conversation` - 26 edges
9. `DomainEventBus` - 26 edges
10. `useTestDatabase()` - 26 edges

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

## Communities (129 total, 32 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.07
Nodes (18): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity (+10 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.18
Nodes (9): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+1 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21, supertest@^7.0.0 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.09
Nodes (21): author, bin, sowa-chat, @aws-sdk/s3-request-presigner@^3.1151.0, helmet@^8.3.0, @nestjs/microservices@^12.1.3, @nestjs/websockets@^12.1.3, reflect-metadata@^0.2.2 (+13 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.11
Nodes (18): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange() (+10 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.14
Nodes (10): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, databaseUrl(), IdentityRow, VersionRow, useTestRedis() (+2 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.06
Nodes (31): dependencies, file-type@^22.1.1, jose@^6.2.12, nest-commander@^3.21.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1 (+23 more)

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
Nodes (35): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, ApiHttpModule, errorCodeByStatus, errorCodeOfStatus(), httpErrorResponse() (+27 more)

### Community 23 - "project-cli.ts"
Cohesion: 0.12
Nodes (34): badOrigins, helpEntries, prefixes, CliRunResult, runCliInProcess(), addEd25519Key(), addIdentityKey(), addP256Key() (+26 more)

### Community 24 - "AuditLogEntry"
Cohesion: 0.15
Nodes (7): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.10
Nodes (14): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand (+6 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.19
Nodes (10): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+2 more)

### Community 28 - ".create"
Cohesion: 0.14
Nodes (6): AuditScenarios, happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.07
Nodes (30): Channel, channelColumns(), findColumn(), ColumnRow, ForeignKeyRow, IndexRow, tableNames, countRows() (+22 more)

### Community 32 - "key-format.ts"
Cohesion: 0.11
Nodes (24): eventFields, serverKey, base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey() (+16 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "api.module.ts"
Cohesion: 0.19
Nodes (6): AuditModule, AppClsModule, AppConfigModule, DatabaseModule, ZonesModule, TelemetryModule

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "ValidationProbeController"
Cohesion: 0.13
Nodes (5): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ValidationProbeController

### Community 38 - "config.module.ts"
Cohesion: 0.29
Nodes (12): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+4 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-probe.ts"
Cohesion: 0.13
Nodes (17): configureApiApp(), DependencyStatusBody, StatusBody, noStore(), useSecurityHeaders(), findZonePorts(), probeControllers, findFreePort() (+9 more)

### Community 41 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "ResponseProbeController"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 45 - "audit-log.e2e-spec.ts"
Cohesion: 0.11
Nodes (17): DomainEventBus, WorkerModule, IndexRow, PlanRow, expectNoKeyRows(), expectNoRows(), addKey(), ColumnRow (+9 more)

### Community 46 - "unit-probe.ts"
Cohesion: 0.11
Nodes (18): LogDestination, allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService() (+10 more)

### Community 47 - "main.ts"
Cohesion: 0.20
Nodes (15): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+7 more)

### Community 48 - "typeorm"
Cohesion: 0.10
Nodes (11): database, loadDataSource(), databaseEntities, Project, columns(), expectedColumns, findColumn(), findRelation() (+3 more)

### Community 49 - "key-cli.ts"
Cohesion: 0.28
Nodes (16): toLookupPrefix(), hashKey(), auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix() (+8 more)

### Community 50 - "@nestjs/common"
Cohesion: 0.09
Nodes (20): emptyCell, formatDate(), writeLine(), writeTable(), IdentityKeyAddOptions, header, IdentityKeyListOptions, toRow() (+12 more)

### Community 51 - "database-connection.e2e-spec.ts"
Cohesion: 0.19
Nodes (13): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+5 more)

### Community 52 - "projects.service.ts"
Cohesion: 0.09
Nodes (19): IssuedApiKey, OriginList, originLists, NewProject, ORIGIN_COLUMNS, OriginsRow, ProjectsRepository, ChangeOriginInput (+11 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.07
Nodes (23): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, defaultLimits, isAccepted() (+15 more)

### Community 55 - "identity-key-pem.ts"
Cohesion: 0.27
Nodes (7): algorithmOf(), InvalidIdentityKeyError, isP256(), parseIdentityPublicKey(), readPublicKeyObject(), captureError(), expectInvalidKey()

### Community 57 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 59 - "identity-keys.service.ts"
Cohesion: 0.14
Nodes (13): KeyActorKind, IdentityKeyAlgorithm, identityKeyAlgorithms, ParsedIdentityKey, NewIdentityKey, AddedIdentityKey, AddIdentityKeyInput, IdentityKeyKidTakenError (+5 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 62 - "request-id.spec.ts"
Cohesion: 0.17
Nodes (9): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse, ProbeService (+1 more)

### Community 63 - "migrate.module.ts"
Cohesion: 0.17
Nodes (5): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 64 - "api-versioning.spec.ts"
Cohesion: 0.19
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 65 - "project-origins.e2e-spec.ts"
Cohesion: 0.12
Nodes (17): CreateProjectInput, columns, createMain(), emptyLists, eventNames, listRow(), lists, originAuditRows() (+9 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.09
Nodes (22): encryptionConfig, EncryptionKey, CryptoModule, authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret() (+14 more)

### Community 67 - "Zone"
Cohesion: 0.08
Nodes (18): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+10 more)

### Community 68 - "projects-service.e2e-spec.ts"
Cohesion: 0.08
Nodes (9): KeyCreateCommand, KeyRevokeCommand, ApiKeysService, IssueApiKeyInput, toEvent(), apiKeyRows(), auditRows(), expectNoRows() (+1 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "identity-keys.service.ts"
Cohesion: 0.08
Nodes (5): IdentityKeyListCommand, IdentityKey, IdentityKeysRepository, IdentityKeysService, toEvent()

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "ProjectsService"
Cohesion: 0.13
Nodes (5): formatOrigins(), header, ProjectListCommand, toRow(), ProjectsService

### Community 73 - "OperationSteps"
Cohesion: 0.10
Nodes (14): createTypeOrmModule(), getTypeOrmModule(), typeOrmModules, DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationStepsModule (+6 more)

### Community 74 - "audited-events.spec.ts"
Cohesion: 0.15
Nodes (13): auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent, serverKeyEvent (+5 more)

### Community 75 - "main.ts"
Cohesion: 0.15
Nodes (14): cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, createContext(), mode, runApi() (+6 more)

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "database-entities.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 78 - "cls-middleware.ts"
Cohesion: 0.33
Nodes (5): ApiModule, useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp()

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

### Community 84 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 87 - "audit-log.listener.spec.ts"
Cohesion: 0.16
Nodes (11): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, auditedEventNames(), AuditRule, auditRules (+3 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "secrets-reencryption.service.ts"
Cohesion: 0.10
Nodes (20): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+12 more)

### Community 90 - "zone.ts"
Cohesion: 0.16
Nodes (15): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes (+7 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.23
Nodes (11): encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes, key2 (+3 more)

### Community 94 - "api-keys.service.ts"
Cohesion: 0.08
Nodes (14): ApiKey, ApiKeyKind, apiKeyKinds, ApiKeysRepository, NewApiKey, ApiKeySummary, hashMatches(), IssueApiKeyBaseInput (+6 more)

### Community 95 - "domain-event-bus.spec.ts"
Cohesion: 0.23
Nodes (8): happened, TestListener, DomainEventHandler, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent, TestIgnoredEvent

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.23
Nodes (10): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding(), parseLogLine() (+2 more)

### Community 97 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 99 - "origin.ts"
Cohesion: 0.42
Nodes (6): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl()

### Community 101 - "redis-connection.e2e-spec.ts"
Cohesion: 0.29
Nodes (7): fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableRedisUrl(), waitForHttpStatus()

### Community 102 - "JsonObjectValidator"
Cohesion: 0.28
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 108 - "database-connection.e2e-spec.ts"
Cohesion: 0.25
Nodes (6): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus()

### Community 109 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 122 - "secrets-reencryption.module.ts"
Cohesion: 0.43
Nodes (3): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule

### Community 125 - "ZoneServers"
Cohesion: 0.20
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 135 - "telemetry.interceptor.ts"
Cohesion: 0.11
Nodes (14): HttpLabel, HttpMetrics, labelNames, StepTimes, FinishedOperation, SlowOperationsModule, roundSteps(), SlowOperations (+6 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 839 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **32 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `telemetry.interceptor.ts` to `log-level-warn.spec.ts`, `server/package.json`, `dependencies`, `server-errors.spec.ts`, `AuditLogEntry`, `origin.commands.ts`, `zone.guard.spec.ts`, `api.module.ts`, `ValidationProbeController`, `config.module.ts`, `zone-probe.ts`, `ResponseProbeController`, `audit-log.e2e-spec.ts`, `unit-probe.ts`, `main.ts`, `@nestjs/common`, `projects.service.ts`, `metrics.controller.ts`, `identity-keys.service.ts`, `request-id.spec.ts`, `migrate.module.ts`, `api-versioning.spec.ts`, `encryption.service.spec.ts`, `Zone`, `ProjectsService`, `OperationSteps`, `main.ts`, `cls-middleware.ts`, `health.module.ts`, `security-headers.spec.ts`, `body-limit.ts`, `audit-log.listener.spec.ts`, `secrets-reencryption.service.ts`, `zone.ts`, `api-keys.service.ts`, `domain-event-bus.spec.ts`, `body-limit.spec.ts`, `secrets-reencryption.module.ts`, `ZoneServers`?**
  _High betweenness centrality (0.278) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07246376811594203 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `database-migrations.ts` to `server/package.json`, `ref_node_path`, `dependencies`, `project-cli.ts`, `chat-tables.e2e-spec.ts`, `ConversationEvent`, `conversation.entity.spec.ts`, `audit-log.e2e-spec.ts`, `typeorm`, `key-cli.ts`, `migrate-mode.e2e-spec.ts`, `identity-keys.service.ts`, `test-secrets.ts`, `project-origins.e2e-spec.ts`, `OperationSteps`, `participant.entity.spec.ts`, `database-entities.ts`, `CreateChatTables1793215389271`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `api-keys.service.ts`, `database-connection.e2e-spec.ts`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `OperationSteps` to `devDependencies`, `server/package.json`, `AuditLogEntry`, `key-format.ts`, `config.module.ts`, `zone-probe.ts`, `audit-log.e2e-spec.ts`, `unit-probe.ts`, `main.ts`, `key-cli.ts`, `projects.service.ts`, `identity-keys.service.ts`, `test-secrets.ts`, `project-origins.e2e-spec.ts`, `encryption.service.spec.ts`, `projects-service.e2e-spec.ts`, `cls-middleware.ts`, `audit-log.listener.spec.ts`, `domain-event-bus.spec.ts`, `redis-connection.e2e-spec.ts`, `database-connection.e2e-spec.ts`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._