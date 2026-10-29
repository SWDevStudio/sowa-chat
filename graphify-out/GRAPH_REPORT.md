# Graph Report - hector-chat-epic-11  (2026-10-29)

## Corpus Check
- 361 files · ~87,800 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2574 nodes · 5941 edges · 148 communities (113 shown, 35 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 147 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d8927c68`
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
- telemetry.interceptor.spec.ts
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
- http-error.filter.spec.ts
- RequestContext
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
- development-secrets-file.ts
- tsconfig.build.json
- ValidationProbeController
- config.module.ts
- nest-cli.json
- zone-probe.ts
- conversation.entity.spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- identity-keys-table.e2e-spec.ts
- RedactionProbeController
- api-keys-service-probe.ts
- Visitor
- projects.service.spec.ts
- cli.module.ts
- database-connection.e2e-spec.ts
- projects.service.ts
- operator-auth.guard.ts
- protocol/src/index.ts
- typeorm
- ProjectCreateCommand
- .probe
- migrate-mode.e2e-spec.ts
- identity-key-list.command.ts
- test-secrets.ts
- worker.module.ts
- request-id.spec.ts
- ApiKeysService
- operator-role.guard.spec.ts
- ref_node_crypto
- encryption.service.spec.ts
- security-headers.spec.ts
- .publish
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- origin.ts
- OperationSteps
- api-versioning.spec.ts
- InternalProbeController
- participant.entity.spec.ts
- conversation.entity.ts
- cls-middleware.ts
- api-keys.service.ts
- health.module.ts
- operators.repository.ts
- .getByName
- workspace-check-types.e2e-spec.ts
- operators.service.ts
- key-cli.ts
- CreateChatTables1793215389271
- audited-events.spec.ts
- secrets-reencrypt-command.e2e-spec.ts
- secrets-reencryption.service.ts
- api-docs.ts
- Message
- encryption-keys.schema.spec.ts
- SecretsReencryptionService
- ApiKey
- server-errors.spec.ts
- log-redaction.e2e-spec.ts
- ref_vitest
- packages-build.e2e-spec.ts
- operator-auth-guard.e2e-spec.ts
- server-key-guard.e2e-spec.ts
- IdentityKeyAddCommand
- JsonObjectValidator
- slow-operations.ts
- unit-probe.ts
- Zone
- @nestjs/common
- request-context.spec.ts
- encryption-keys.schema.ts
- redis-connection.e2e-spec.ts
- server/package.json
- identity-key-pem.ts
- SlowProbeController
- tokens.service.ts
- DomainEventBus
- body-limit.spec.ts
- secrets-reencryption.module.ts
- operator-token.controller.ts
- body-limit.ts
- operator-token.e2e-spec.ts
- ZoneServers
- ProjectsService
- env.schema.logging.spec.ts
- token-signing-keys.schema.ts
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- env.schema.spec.ts
- api-keys-table.e2e-spec.ts
- TokenConsumer
- @aws-sdk/client-s3@^3.1151.0
- @aws-sdk/s3-request-presigner@^3.1151.0
- cache-manager@^7.2.9
- TestTokenSigningConfigModule
- helmet
- @nestjs/swagger
- @nestjs/cache-manager@^12.0.1
- @nestjs/microservices@^12.1.3
- @nestjs/platform-socket.io@^12.1.3
- pg
- socket.io@^4.8.4
- @nestjs/schematics@^12.0.0

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 131 edges
2. `typeorm` - 55 edges
3. `Zone()` - 50 edges
4. `Project` - 43 edges
5. `@nestjs/testing` - 38 edges
6. `ProjectsService` - 35 edges
7. `useTestDatabase()` - 33 edges
8. `ApiKey` - 27 edges
9. `findFreePort()` - 27 edges
10. `Conversation` - 26 edges

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

## Communities (148 total, 35 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.06
Nodes (17): DatabaseMigration, databaseMigrations, migrationFiles, migrationsDirectory, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity (+9 more)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 3 - "log-level-warn.spec.ts"
Cohesion: 0.17
Nodes (10): hasMessage(), infoProbe, isProbeRequestEntry(), LevelLogEntry, LevelProbeController, LevelProbeService, probePath, warnProbe (+2 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21, supertest@^7.0.0 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "tokens.service.spec.ts"
Cohesion: 0.14
Nodes (25): jose@^6.2.12, encodePart(), flipSignatureBit(), ForgedTokenInput, forgeToken(), forgeUnsecuredToken(), parseTestSigningKeys(), publicKeyPemBytes() (+17 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.12
Nodes (18): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+10 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "telemetry.interceptor.spec.ts"
Cohesion: 0.09
Nodes (12): ApiZone, HttpLabel, HttpMetrics, HttpRequestRecord, labelNames, roundSteps(), SlowOperations, readMetricLines() (+4 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, file-type@^22.1.1, nest-commander@^3.21.0, nestjs-cls@^7.0.1, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1 (+21 more)

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

### Community 22 - "http-error.filter.spec.ts"
Cohesion: 0.12
Nodes (14): OperatorDisabledFilter, ApiHttpModule, errorCodeOfStatus(), httpErrorResponse(), internalErrorMessage, internalErrorResponse(), toErrorResponse(), validationErrorResponse() (+6 more)

### Community 23 - "RequestContext"
Cohesion: 0.10
Nodes (3): RequestContext, ContextConsumer, GuardProbeController

### Community 24 - "AuditLogEntry"
Cohesion: 0.16
Nodes (6): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, ColumnRow, expectedColumns

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.10
Nodes (14): addOriginTo(), describeAdd(), describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand (+6 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - ".create"
Cohesion: 0.25
Nodes (3): ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.07
Nodes (29): ColumnRow, ForeignKeyRow, IndexRow, tableNames, IndexRow, PlanRow, countRows(), createChannel() (+21 more)

### Community 32 - "key-format.ts"
Cohesion: 0.16
Nodes (13): base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62(), keyPrefixes (+5 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "ConversationEvent"
Cohesion: 0.15
Nodes (7): ConversationEvent, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 35 - "development-secrets-file.ts"
Cohesion: 0.22
Nodes (16): createDevelopmentSecrets(), defaultDevelopmentSecretsDirectory, DevelopmentMainProject, DevelopmentSecrets, developmentSecretsFileName, developmentSecretsPath(), developmentSecretsSchema, hasErrorCode() (+8 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 38 - "config.module.ts"
Cohesion: 0.06
Nodes (42): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig (+34 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "zone-probe.ts"
Cohesion: 0.11
Nodes (23): HealthBody, HealthEntry, DependencyStatusBody, StatusBody, apiZones, ports, findZonePorts(), probeControllers (+15 more)

### Community 41 - "conversation.entity.spec.ts"
Cohesion: 0.31
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "zod-serialization.spec.ts"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 45 - "identity-keys-table.e2e-spec.ts"
Cohesion: 0.40
Nodes (4): identityKeyAlgorithms, ColumnRow, expectedColumns, jwk

### Community 47 - "api-keys-service-probe.ts"
Cohesion: 0.24
Nodes (12): eventFields, keyTypeByKind, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred (+4 more)

### Community 48 - "Visitor"
Cohesion: 0.15
Nodes (6): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor

### Community 49 - "projects.service.spec.ts"
Cohesion: 0.20
Nodes (8): IssuedApiKey, InvalidProjectNameError, ProjectAlreadyExistsError, createProjectsServiceProbe(), issuedServerKey, projectRow(), ProjectsServiceProbe, runWithoutTransaction()

### Community 50 - "cli.module.ts"
Cohesion: 0.12
Nodes (12): serverKeyOnceWarning, writeLine(), writeWarning(), IdentityKeyAddOptions, IdentityKeyRevokeOptions, KeyCreateCommand, KeyCreateOptions, KeyGenerateCommand (+4 more)

### Community 51 - "database-connection.e2e-spec.ts"
Cohesion: 0.12
Nodes (20): fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus(), ApiRun (+12 more)

### Community 52 - "projects.service.ts"
Cohesion: 0.08
Nodes (27): IssueApiKeyInput, OriginList, originLists, ProjectsModule, NewProject, ORIGIN_COLUMNS, OriginsRow, ProjectsRepository (+19 more)

### Community 53 - "operator-auth.guard.ts"
Cohesion: 0.14
Nodes (5): OperatorAuthGuard, ServerKeyGuard, ApiException, bearerToken(), FakeRequestInput

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.08
Nodes (25): ProjectFixture, createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, defaultLimits (+17 more)

### Community 55 - "typeorm"
Cohesion: 0.10
Nodes (10): database, loadDataSource(), databaseEntities, Channel, channelColumns(), findColumn(), Project, AddProjectsOperatorAllowedOrigins1793300003000 (+2 more)

### Community 57 - ".probe"
Cohesion: 0.14
Nodes (3): prom-client@^15.1.3, MetricsController, prom-client

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 59 - "identity-key-list.command.ts"
Cohesion: 0.09
Nodes (12): emptyCell, formatDate(), writeTable(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow(), header (+4 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "worker.module.ts"
Cohesion: 0.12
Nodes (13): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditModule, auditedEventNames(), AuditRule (+5 more)

### Community 62 - "request-id.spec.ts"
Cohesion: 0.17
Nodes (9): entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeController, ProbeResponse, ProbeService (+1 more)

### Community 64 - "operator-role.guard.spec.ts"
Cohesion: 0.16
Nodes (10): @nestjs/core@^12.0.1, OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly() (+2 more)

### Community 65 - "ref_node_crypto"
Cohesion: 0.30
Nodes (7): firstTokenSigningKeyIds, GeneratedSecret, generatedSecrets, SecretsMode, generateEncryptionKeyEntry(), generateTokenSigningKeyEntry(), minimalEnv

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.11
Nodes (19): authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv, tag (+11 more)

### Community 67 - "security-headers.spec.ts"
Cohesion: 0.21
Nodes (6): InternalProbeController, ManagementProbeController, OperatorProbeController, probeControllers, PublicProbeController, VisitorProbeController

### Community 68 - ".publish"
Cohesion: 0.29
Nodes (3): AuditScenarios, happenedIn(), ScenarioError

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "IdentityKey"
Cohesion: 0.09
Nodes (6): IdentityKey, IdentityKeysRepository, IdentityKeyKidTakenError, IdentityKeysService, InvalidIdentityKeyIdError, toEvent()

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.27
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "origin.ts"
Cohesion: 0.42
Nodes (6): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl()

### Community 73 - "OperationSteps"
Cohesion: 0.11
Nodes (9): DatabaseStepSubscriber, OperationStep, OperationTiming, OperationSteps, OperationStepsProbeController, beginOperation(), operationTimingKey, nestjs-cls (+1 more)

### Community 74 - "api-versioning.spec.ts"
Cohesion: 0.25
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 75 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "conversation.entity.ts"
Cohesion: 0.10
Nodes (14): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEventActorKind, conversationEventActorKinds, MessageSenderKind (+6 more)

### Community 78 - "cls-middleware.ts"
Cohesion: 0.33
Nodes (5): ApiModule, useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp()

### Community 79 - "api-keys.service.ts"
Cohesion: 0.12
Nodes (20): IssueApiKeyBaseInput, KeyActorKind, RevokeApiKeyInput, VerifiedApiKey, IdentityKeyAlgorithm, ParsedIdentityKey, NewIdentityKey, AddedIdentityKey (+12 more)

### Community 80 - "health.module.ts"
Cohesion: 0.06
Nodes (19): ioredis@^6.0.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+11 more)

### Community 81 - "operators.repository.ts"
Cohesion: 0.16
Nodes (3): DisabledOperators, Probe, OperatorsRepository

### Community 82 - ".getByName"
Cohesion: 0.17
Nodes (3): readPem(), IdentityKeyRevokeCommand, ProjectNotFoundError

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "operators.service.ts"
Cohesion: 0.12
Nodes (10): OperatorTokenClaims, operatorTokenClaimsSchema, IssuedOperatorToken, OperatorDisabledError, OperatorsService, operatorTokenTtlSeconds, input, Probe (+2 more)

### Community 85 - "key-cli.ts"
Cohesion: 0.05
Nodes (75): cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, toLookupPrefix(), hashKey(), runCli() (+67 more)

### Community 87 - "audited-events.spec.ts"
Cohesion: 0.13
Nodes (13): AuditRecord, auditedEvents, botKeyEvent, identityKeyEvent, originEventNames, projectCreatedEvent, projectOriginsEvent, secretsReencryptedEvent (+5 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.21
Nodes (15): auditRowsByAction(), clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction (+7 more)

### Community 89 - "secrets-reencryption.service.ts"
Cohesion: 0.11
Nodes (19): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+11 more)

### Community 90 - "api-docs.ts"
Cohesion: 0.19
Nodes (11): configureApiApp(), DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, noStore() (+3 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.29
Nodes (7): describeErrors(), key1, key1Bytes, key2, key2Bytes, parseKeys(), requiredEnv

### Community 94 - "ApiKey"
Cohesion: 0.09
Nodes (6): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey, hashMatches(), toSummary()

### Community 95 - "server-errors.spec.ts"
Cohesion: 0.13
Nodes (17): ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ApiExceptionInput, entries(), errorEntriesOf(), hasStackWith() (+9 more)

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 97 - "ref_vitest"
Cohesion: 0.26
Nodes (4): setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 98 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 99 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.11
Nodes (17): OperatorController(), DisabledProbeController, issueOperator(), getProbe(), issueOperator(), withToken(), get(), getAs() (+9 more)

### Community 100 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.33
Nodes (6): changeBodyChar(), forgeWithValidChecksum(), getProbe(), replaceChar(), withKey(), zoneAgent()

### Community 102 - "JsonObjectValidator"
Cohesion: 0.28
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 103 - "slow-operations.ts"
Cohesion: 0.32
Nodes (4): operationSteps, StepTimes, FinishedOperation, SlowOperationsModule

### Community 104 - "unit-probe.ts"
Cohesion: 0.11
Nodes (18): LogDestination, allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService() (+10 more)

### Community 105 - "Zone"
Cohesion: 0.08
Nodes (19): ServerController(), controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController (+11 more)

### Community 106 - "@nestjs/common"
Cohesion: 0.11
Nodes (13): OperatorAuthModule, ServerApiModule, ServerAuthModule, OperatorsModule, AppClsModule, createTypeOrmModule(), DatabaseModule, getTypeOrmModule() (+5 more)

### Community 108 - "encryption-keys.schema.ts"
Cohesion: 0.60
Nodes (5): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject()

### Community 109 - "redis-connection.e2e-spec.ts"
Cohesion: 0.10
Nodes (16): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, IdentityRow, VersionRow, fetchStatus(), repositoryRoot (+8 more)

### Community 110 - "server/package.json"
Cohesion: 0.10
Nodes (19): author, bin, sowa-chat, bullmq@^6.3.15, @nest-lab/throttler-storage-redis@^1.2.0, @nestjs/bullmq@^12.0.0, @nestjs/throttler@^6.7.1, @socket.io/redis-adapter@^8.3.0 (+11 more)

### Community 111 - "identity-key-pem.ts"
Cohesion: 0.27
Nodes (7): algorithmOf(), InvalidIdentityKeyError, isP256(), parseIdentityPublicKey(), readPublicKeyObject(), captureError(), expectInvalidKey()

### Community 115 - "tokens.service.ts"
Cohesion: 0.14
Nodes (8): TokenSigningKey, SignedToken, SignTokenInput, TokenAudience, tokenAudiences, TokensService, VerifiedToken, createService()

### Community 120 - "DomainEventBus"
Cohesion: 0.13
Nodes (13): DomainEventBus, happened, TestListener, DomainEventHandler, DomainEventName, OnDomainEvent(), MetricsModule, TelemetryModule (+5 more)

### Community 122 - "secrets-reencryption.module.ts"
Cohesion: 0.29
Nodes (4): CryptoModule, encryptedFields, registeredEncryptedFields, SecretsReencryptionModule

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.11
Nodes (15): nestjs-zod@^5.5.0, OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, OperatorProfile, IssueOperatorTokenInput, RequestOperator, OperatorRole (+7 more)

### Community 124 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 125 - "operator-token.e2e-spec.ts"
Cohesion: 0.15
Nodes (4): Operator, createProjectWithKey(), internalAgent(), postToken()

### Community 126 - "ZoneServers"
Cohesion: 0.29
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 127 - "ProjectsService"
Cohesion: 0.13
Nodes (5): formatOrigins(), header, ProjectListCommand, toRow(), ProjectsService

### Community 128 - "env.schema.logging.spec.ts"
Cohesion: 0.33
Nodes (3): Env, logLevels, requiredEnv

### Community 129 - "token-signing-keys.schema.ts"
Cohesion: 0.29
Nodes (6): parseEntry(), parseKeys(), parsePrivateKey(), reject(), requiredEnv, tokenSigningKeysSchema

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 134 - "api-keys-table.e2e-spec.ts"
Cohesion: 0.40
Nodes (3): apiKeyKinds, ColumnRow, expectedColumns

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 941 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `log-level-warn.spec.ts`, `tokens.service.spec.ts`, `telemetry.interceptor.spec.ts`, `dependencies`, `http-error.filter.spec.ts`, `AuditLogEntry`, `origin.commands.ts`, `zone.guard.spec.ts`, `config.module.ts`, `zone-probe.ts`, `zod-serialization.spec.ts`, `cli.module.ts`, `projects.service.ts`, `operator-auth.guard.ts`, `typeorm`, `.probe`, `identity-key-list.command.ts`, `worker.module.ts`, `request-id.spec.ts`, `operator-role.guard.spec.ts`, `encryption.service.spec.ts`, `security-headers.spec.ts`, `OperationSteps`, `api-versioning.spec.ts`, `cls-middleware.ts`, `api-keys.service.ts`, `health.module.ts`, `operators.repository.ts`, `operators.service.ts`, `key-cli.ts`, `secrets-reencryption.service.ts`, `api-docs.ts`, `server-errors.spec.ts`, `operator-auth-guard.e2e-spec.ts`, `server-key-guard.e2e-spec.ts`, `slow-operations.ts`, `unit-probe.ts`, `Zone`, `request-context.spec.ts`, `server/package.json`, `tokens.service.ts`, `DomainEventBus`, `body-limit.spec.ts`, `secrets-reencryption.module.ts`, `operator-token.controller.ts`, `body-limit.ts`, `ProjectsService`?**
  _High betweenness centrality (0.283) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06262626262626263 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `dependencies`, `chat-tables.e2e-spec.ts`, `ConversationEvent`, `conversation.entity.spec.ts`, `Visitor`, `database-connection.e2e-spec.ts`, `projects.service.ts`, `protocol/src/index.ts`, `migrate-mode.e2e-spec.ts`, `test-secrets.ts`, `OperationSteps`, `participant.entity.spec.ts`, `conversation.entity.ts`, `operators.repository.ts`, `key-cli.ts`, `CreateChatTables1793215389271`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `operator-auth-guard.e2e-spec.ts`, `redis-connection.e2e-spec.ts`, `server/package.json`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `zone-probe.ts` to `devDependencies`, `tokens.service.spec.ts`, `AuditLogEntry`, `key-format.ts`, `config.module.ts`, `api-keys-service-probe.ts`, `projects.service.spec.ts`, `database-connection.e2e-spec.ts`, `projects.service.ts`, `typeorm`, `test-secrets.ts`, `worker.module.ts`, `encryption.service.spec.ts`, `OperationSteps`, `cls-middleware.ts`, `api-keys.service.ts`, `operators.repository.ts`, `operators.service.ts`, `key-cli.ts`, `unit-probe.ts`, `request-context.spec.ts`, `redis-connection.e2e-spec.ts`, `server/package.json`, `DomainEventBus`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._