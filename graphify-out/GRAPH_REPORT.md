# Graph Report - hector-chat-epic-10  (2026-10-29)

## Corpus Check
- 287 files · ~65,292 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2060 nodes · 4393 edges · 136 communities (94 shown, 42 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 94 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ab4045ee`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- typeorm
- bot-sdk/tsconfig.json
- package.json
- request-id.spec.ts
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
- config.module.ts
- test-database.ts
- scripts
- conversation.entity.spec.ts
- logging.e2e-spec.ts
- .create
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- key-format.ts
- MixedZoneController
- ConversationEvent
- Project
- tsconfig.build.json
- ValidationProbeController
- http-error.filter.spec.ts
- nest-cli.json
- zone-servers.spec.ts
- typeorm
- server-sdk/tsconfig.json
- ResponseProbeController
- ApiKeysService
- projects.service.spec.ts
- main.ts
- Visitor
- api-keys.service.ts
- database.module.ts
- database-connection.e2e-spec.ts
- project-commands.e2e-spec.ts
- log-redaction.spec.ts
- protocol/src/index.ts
- AuditLogEntry
- ProjectsService
- @nestjs/common
- migrate-mode.e2e-spec.ts
- projects.service.ts
- test-secrets.ts
- identity-key-pem.spec.ts
- logger.module.ts
- origin.ts
- api-versioning.spec.ts
- migrate.module.ts
- encryption.service.ts
- Zone
- json-object-schema.ts
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- json-object-limits.spec.ts
- @nestjs/testing
- zod-serialization.spec.ts
- identity-keys.e2e-spec.ts
- participant.entity.spec.ts
- database-entities.ts
- encryption-keys.schema.spec.ts
- health.e2e-spec.ts
- health.module.ts
- security-headers.spec.ts
- TelemetryProbeController
- workspace-check-types.e2e-spec.ts
- api-app.ts
- data-source.ts
- CreateChatTables1793215389271
- worker.module.ts
- ZoneServers
- secrets-reencryption.service.ts
- zone.guard.spec.ts
- Message
- ServerErrorsProbeController
- SecretsReencryptionService
- ApiKey
- http-error.filter.ts
- log-redaction.e2e-spec.ts
- global-setup.ts
- cli-mode.e2e-spec.ts
- ErrorProbeController
- ref_vitest
- InternalProbeController
- JsonObjectValidator
- telemetry.interceptor.spec.ts
- Conversation
- Message
- project-list.command.ts
- @nestjs-cls/transactional-adapter-typeorm
- findFreePort
- packages-build.e2e-spec.ts
- CreateIdentityKeys1793300001000
- SlowProbeController
- bullmq@^6.3.15
- ZonedController
- @nest-lab/throttler-storage-redis@^1.2.0
- BodyProbeController
- secrets-reencryption.module.ts
- CreateProjects1793193549883
- database-migrations.spec.ts
- @nestjs/websockets@^12.1.3
- pino-http
- AddProjectsPublicKey1793300002000
- cache-manager@^7.2.9
- @nestjs/platform-socket.io@^12.1.3
- @aws-sdk/client-s3@^3.1151.0
- zod@catalog:
- @nestjs/cache-manager@^12.0.1
- @nestjs/microservices@^12.1.3
- @nestjs/swagger

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 96 edges
2. `typeorm` - 48 edges
3. `Zone()` - 46 edges
4. `Project` - 40 edges
5. `@nestjs/testing` - 31 edges
6. `Conversation` - 26 edges
7. `findFreePort()` - 25 edges
8. `ApiKey` - 23 edges
9. `DomainEventBus` - 23 edges
10. `startZoneProbeApp()` - 23 edges

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

## Communities (136 total, 42 thin omitted)

### Community 0 - "typeorm"
Cohesion: 0.14
Nodes (6): CreateAuditLog1793200000000, AddConversationIndexes1793215983154, CreateApiKeys1793300000000, AddProjectsOperatorAllowedOrigins1793300003000, ColumnRow, typeorm

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
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "server/package.json"
Cohesion: 0.10
Nodes (19): author, bin, sowa-chat, @nestjs/throttler@^6.7.1, sharp@^0.35.5, socket.io@^4.8.4, @sowa-chat/protocol@workspace:*, description (+11 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (21): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), Env, EnvObject, envObjectSchema, envSchema, findPortWithSameValue(), integerInRange() (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.13
Nodes (10): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, databaseUrl(), IdentityRow, VersionRow, useTestRedis() (+2 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, @aws-sdk/s3-request-presigner@^3.1151.0, file-type@^22.1.1, helmet@^8.3.0, jose@^6.2.12, @nestjs/bullmq@^12.0.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1 (+21 more)

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
Nodes (13): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ApiExceptionInput, entries(), errorEntriesOf() (+5 more)

### Community 23 - "config.module.ts"
Cohesion: 0.28
Nodes (13): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, loggingConfig, parseEnv() (+5 more)

### Community 24 - "test-database.ts"
Cohesion: 0.12
Nodes (15): actorKinds, apiKeyKinds, identityKeyAlgorithms, ColumnRow, expectedColumns, ColumnRow, expectedColumns, IndexRow (+7 more)

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
Cohesion: 0.20
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.12
Nodes (16): boolean, ColumnSpec, expectedColumnCounts, expectedForeignKeys, expectedTables, expectedUniqueIndexes, integer, jsonb (+8 more)

### Community 32 - "key-format.ts"
Cohesion: 0.15
Nodes (14): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+6 more)

### Community 33 - "MixedZoneController"
Cohesion: 0.24
Nodes (3): MixedZoneController, OperatorZoneController, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "Project"
Cohesion: 0.12
Nodes (19): ProjectsModule, CreateProjectInput, ProjectAlreadyExistsError, columns, createMain(), emptyLists, eventNames, listRow() (+11 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "http-error.filter.spec.ts"
Cohesion: 0.23
Nodes (8): errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse(), validationErrorResponse(), knownKeys, ProbeBodyDto

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-servers.spec.ts"
Cohesion: 0.10
Nodes (23): HealthBody, HealthEntry, DependencyStatusBody, StatusBody, LogDestination, findZonePorts(), probeControllers, findFreePort() (+15 more)

### Community 41 - "typeorm"
Cohesion: 0.11
Nodes (15): Channel, channelColumns(), findColumn(), Project, ColumnRow, ForeignKeyRow, IndexRow, tableNames (+7 more)

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "ApiKeysService"
Cohesion: 0.18
Nodes (5): ApiKeysService, toEvent(), AuditScenarios, happenedIn(), ScenarioError

### Community 46 - "projects.service.spec.ts"
Cohesion: 0.23
Nodes (8): IssuedApiKey, InvalidProjectNameError, ProjectNotFoundError, createProjectsServiceProbe(), issuedServerKey, projectRow(), ProjectsServiceProbe, runWithoutTransaction()

### Community 47 - "main.ts"
Cohesion: 0.13
Nodes (15): cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, createContext(), mode, runApi() (+7 more)

### Community 48 - "Visitor"
Cohesion: 0.15
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor

### Community 49 - "api-keys.service.ts"
Cohesion: 0.13
Nodes (21): ApiKeyKind, NewApiKey, hashMatches(), eventFields, IssueApiKeyBaseInput, IssueApiKeyInput, keyTypeByKind, RevokeApiKeyInput (+13 more)

### Community 50 - "database.module.ts"
Cohesion: 0.22
Nodes (10): databaseMigrations, createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection, DatabaseEntity (+2 more)

### Community 51 - "database-connection.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "project-commands.e2e-spec.ts"
Cohesion: 0.21
Nodes (14): CliRunResult, runCliInProcess(), buildServer(), createMain(), fullOriginArguments, listHeader, nonEmptyLines(), onceWarning (+6 more)

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.23
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 55 - "AuditLogEntry"
Cohesion: 0.19
Nodes (6): ActorKind, AuditLogEntry, NewAuditLogEntry, AuditRecord, ProjectFixture, JsonObject

### Community 57 - "@nestjs/common"
Cohesion: 0.10
Nodes (12): prom-client@^15.1.3, ApiHttpModule, ZonesModule, HttpLabel, HttpRequestRecord, labelNames, MetricsController, MetricsModule (+4 more)

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 59 - "projects.service.ts"
Cohesion: 0.15
Nodes (11): OriginList, originLists, NewProject, ORIGIN_COLUMNS, OriginsRow, ProjectsRepository, ChangeOriginInput, CreatedProject (+3 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.15
Nodes (18): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertSecret(), insertVersion1Secrets(), key1 (+10 more)

### Community 61 - "identity-key-pem.spec.ts"
Cohesion: 0.16
Nodes (15): KeyActorKind, IdentityKeyAlgorithm, algorithmOf(), InvalidIdentityKeyError, isP256(), ParsedIdentityKey, parseIdentityPublicKey(), readPublicKeyObject() (+7 more)

### Community 62 - "logger.module.ts"
Cohesion: 0.21
Nodes (14): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+6 more)

### Community 63 - "origin.ts"
Cohesion: 0.42
Nodes (6): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl()

### Community 64 - "api-versioning.spec.ts"
Cohesion: 0.32
Nodes (3): NeutralProbeController, SecondVersionProbeController, VersionedProbeController

### Community 65 - "migrate.module.ts"
Cohesion: 0.20
Nodes (4): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps

### Community 66 - "encryption.service.ts"
Cohesion: 0.10
Nodes (20): encryptionConfig, authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv (+12 more)

### Community 67 - "Zone"
Cohesion: 0.15
Nodes (11): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+3 more)

### Community 68 - "json-object-schema.ts"
Cohesion: 0.12
Nodes (9): defaultLimits, forbiddenKeys, IssuePath, jsonObjectBaseSchema, jsonObjectSchema, Violation, JsonObjectLimits, JsonValue (+1 more)

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "IdentityKey"
Cohesion: 0.09
Nodes (6): IdentityKey, IdentityKeysRepository, IdentityKeyKidTakenError, IdentityKeysService, InvalidIdentityKeyIdError, toEvent()

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.31
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "json-object-limits.spec.ts"
Cohesion: 0.21
Nodes (7): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema()

### Community 73 - "@nestjs/testing"
Cohesion: 0.10
Nodes (9): DatabaseStepSubscriber, OperationStep, OperationStepsModule, OperationSteps, OperationStepsProbeController, beginOperation(), operationTimingKey, nestjs-cls (+1 more)

### Community 74 - "zod-serialization.spec.ts"
Cohesion: 0.12
Nodes (12): nestjs-zod@^5.5.0, entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, calls (+4 more)

### Community 75 - "identity-keys.e2e-spec.ts"
Cohesion: 0.23
Nodes (11): KeysModule, WorkerModule, expectNoRows(), addKey(), auditRows(), auditRowsByAction(), identityKeyRows(), exportPems() (+3 more)

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "database-entities.ts"
Cohesion: 0.16
Nodes (13): ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind, messageSenderKinds (+5 more)

### Community 78 - "encryption-keys.schema.spec.ts"
Cohesion: 0.21
Nodes (12): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject(), describeErrors(), key1, key1Bytes (+4 more)

### Community 79 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 80 - "health.module.ts"
Cohesion: 0.06
Nodes (19): ioredis@^6.0.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+11 more)

### Community 81 - "security-headers.spec.ts"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "api-app.ts"
Cohesion: 0.16
Nodes (15): configureApiApp(), ApiModule, useClsMiddleware(), setupApiDocs(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException() (+7 more)

### Community 87 - "worker.module.ts"
Cohesion: 0.06
Nodes (37): databaseEntities, AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditModule, auditedEventNames() (+29 more)

### Community 88 - "ZoneServers"
Cohesion: 0.22
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 89 - "secrets-reencryption.service.ts"
Cohesion: 0.17
Nodes (11): BatchResult, compareVersionCounts(), FieldReencryption, FieldResult, FieldVersionCount, reencryptionBatchSize, ReencryptionReport, SecretRow (+3 more)

### Community 90 - "zone.guard.spec.ts"
Cohesion: 0.07
Nodes (20): probeControllers, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), zonePathPrefixes, probeControllers, ApiZone (+12 more)

### Community 91 - "Message"
Cohesion: 0.27
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 95 - "http-error.filter.ts"
Cohesion: 0.29
Nodes (4): HttpErrorFilter, requestIdOf(), responseZodErrorOf(), requestIdHeader

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 97 - "global-setup.ts"
Cohesion: 0.33
Nodes (6): DatabaseMigration, runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 98 - "cli-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (8): expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode(), RunResult, runSowaChat(), serverDirectory

### Community 100 - "ref_vitest"
Cohesion: 0.17
Nodes (5): errorCodes, errorDetailSchema, errorResponseSchema, initialCodes, validBody

### Community 101 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 103 - "telemetry.interceptor.spec.ts"
Cohesion: 0.10
Nodes (12): HttpMetrics, operationSteps, OperationTiming, StepTimes, FinishedOperation, roundSteps(), SlowOperations, LogEntry (+4 more)

### Community 106 - "project-list.command.ts"
Cohesion: 0.16
Nodes (12): nest-commander@^3.21.0, emptyCell, formatDate(), writeLine(), writeTable(), KeyGenerateCommand, ProjectCreateOptions, formatOrigins() (+4 more)

### Community 108 - "findFreePort"
Cohesion: 0.14
Nodes (13): fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), fetchStatus(), repositoryRoot (+5 more)

### Community 109 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 122 - "secrets-reencryption.module.ts"
Cohesion: 0.29
Nodes (4): CryptoModule, encryptedFields, registeredEncryptedFields, SecretsReencryptionModule

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 803 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `request-id.spec.ts`, `server/package.json`, `dependencies`, `server-errors.spec.ts`, `config.module.ts`, `test-database.ts`, `.create`, `http-error.filter.spec.ts`, `zone-servers.spec.ts`, `main.ts`, `api-keys.service.ts`, `database.module.ts`, `log-redaction.spec.ts`, `AuditLogEntry`, `projects.service.ts`, `identity-key-pem.spec.ts`, `logger.module.ts`, `migrate.module.ts`, `encryption.service.ts`, `Zone`, `@nestjs/testing`, `zod-serialization.spec.ts`, `identity-keys.e2e-spec.ts`, `health.module.ts`, `api-app.ts`, `worker.module.ts`, `secrets-reencryption.service.ts`, `zone.guard.spec.ts`, `http-error.filter.ts`, `telemetry.interceptor.spec.ts`, `project-list.command.ts`, `secrets-reencryption.module.ts`?**
  _High betweenness centrality (0.291) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `typeorm` be split into smaller, more focused modules?**
  _Cohesion score 0.13768115942028986 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `server/package.json`, `ref_node_path`, `dependencies`, `test-database.ts`, `conversation.entity.spec.ts`, `.create`, `ConversationEvent`, `Project`, `typeorm`, `Visitor`, `database.module.ts`, `AuditLogEntry`, `migrate-mode.e2e-spec.ts`, `test-secrets.ts`, `identity-key-pem.spec.ts`, `@nestjs/testing`, `identity-keys.e2e-spec.ts`, `participant.entity.spec.ts`, `database-entities.ts`, `data-source.ts`, `Message`, `global-setup.ts`, `findFreePort`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `zone-servers.spec.ts` to `key-format.ts`, `encryption.service.ts`, `Project`, `devDependencies`, `server/package.json`, `@nestjs/testing`, `identity-keys.e2e-spec.ts`, `findFreePort`, `.create`, `projects.service.spec.ts`, `api-keys.service.ts`, `api-app.ts`, `worker.module.ts`, `config.module.ts`, `test-database.ts`, `test-secrets.ts`, `logger.module.ts`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `request-id.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._