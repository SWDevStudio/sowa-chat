# Graph Report - hector-chat-epic-13  (2026-10-29)

## Corpus Check
- 360 files · ~88,425 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 2576 nodes · 5940 edges · 151 communities (113 shown, 38 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 145 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `13583701`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- log-level-warn.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- operator-auth-guard.e2e-spec.ts
- env.schema.ts
- compilerOptions
- server/package.json
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
- visitor-session.entity.spec.ts
- provided-context.d.ts
- request-id.e2e-spec.ts
- chat-tables.e2e-spec.ts
- server-key-guard.e2e-spec.ts
- zone.guard.spec.ts
- main.ts
- database.module.ts
- tsconfig.build.json
- zod-validation.spec.ts
- config.module.ts
- nest-cli.json
- api.module.ts
- conversation.entity.spec.ts
- server-sdk/tsconfig.json
- zod-serialization.spec.ts
- test-database.ts
- RedactionProbeController
- logger.module.ts
- Visitor
- key-cli.ts
- writeLine
- log-settings.e2e-spec.ts
- projects.service.ts
- operator-auth.guard.ts
- protocol/src/index.ts
- typeorm
- ProjectCreateCommand
- metrics.controller.ts
- migrate-mode.e2e-spec.ts
- cli-output.ts
- test-secrets.ts
- @nestjs/common
- request-id.spec.ts
- migrate.module.ts
- operator-role.guard.spec.ts
- projects-service.e2e-spec.ts
- encryption.service.spec.ts
- Controller
- KeyRevokeCommand
- config-startup.e2e-spec.ts
- IdentityKey
- server-protocol.e2e-spec.ts
- origin.ts
- OperationSteps
- redis.module.ts
- cli-runner.ts
- participant.entity.spec.ts
- conversation.entity.ts
- api-app.ts
- identity-key-commands.e2e-spec.ts
- health.module.ts
- operators.service.ts
- IdentityKeyAddCommand
- workspace-check-types.e2e-spec.ts
- Operator
- origin-cli.ts
- CreateChatTables1793215389271
- audit-log.listener.spec.ts
- secrets-reencrypt-command.e2e-spec.ts
- secrets-reencrypt.command.ts
- zone.ts
- Message
- encryption-keys.schema.spec.ts
- SecretsReencryptionService
- api-keys.service.ts
- server-errors.spec.ts
- log-redaction.e2e-spec.ts
- global-setup.ts
- fixtures.ts
- operator-guard-probe.ts
- api-keys-service-probe.ts
- telemetry.interceptor.spec.ts
- JsonObjectValidator
- telemetry.interceptor.ts
- log-redaction.spec.ts
- Zone
- operator-auth.module.ts
- cls-middleware.ts
- encryption-keys.schema.ts
- ref_node_path
- helmet
- api-versioning.spec.ts
- InternalProbeController
- tokens.service.ts
- audit-log.e2e-spec.ts
- body-limit.spec.ts
- secrets-reencryption.service.ts
- operator-token.controller.ts
- IdentityKeyRevokeCommand
- SlowProbeController
- .getByName
- project-list.command.ts
- findFreePort
- token-signing-keys.schema.ts
- ServerErrorsProbeController
- health.e2e-spec.ts
- ErrorProbeController
- env.schema.spec.ts
- ProjectsService
- identity-keys-table.e2e-spec.ts
- @nestjs/websockets@^12.1.3
- nestjs-pino
- TestTokenSigningConfigModule
- ServerAuthModule
- @nestjs/swagger
- @aws-sdk/s3-request-presigner@^3.1151.0
- bullmq@^6.3.15
- @nestjs/bullmq@^12.0.0
- @nestjs/cache-manager@^12.0.1
- @nestjs/microservices@^12.1.3
- @nestjs/platform-socket.io@^12.1.3
- @nestjs/throttler@^6.7.1
- vitest@catalog:

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 131 edges
2. `typeorm` - 59 edges
3. `Zone()` - 50 edges
4. `Project` - 43 edges
5. `@nestjs/testing` - 38 edges
6. `ProjectsService` - 35 edges
7. `useTestDatabase()` - 34 edges
8. `ApiKey` - 27 edges
9. `findFreePort()` - 27 edges
10. `createProject()` - 27 edges

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

## Communities (151 total, 38 thin omitted)

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
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+25 more)

### Community 5 - "server-modes.e2e-spec.ts"
Cohesion: 0.13
Nodes (13): Env, fetchStatus(), findFreePort(), findZonePorts(), modes, repositoryRoot, RunningServer, RunResult (+5 more)

### Community 6 - "operator-auth-guard.e2e-spec.ts"
Cohesion: 0.12
Nodes (30): jose@^6.2.12, getProbe(), withToken(), encodePart(), flipSignatureBit(), ForgedTokenInput, forgeToken(), forgeUnsecuredToken() (+22 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.08
Nodes (22): checkEncryptionKeysInProduction(), checkPrettyLogFormat(), checkTokenSigningKeyId(), checkTokenSigningKeysInProduction(), Env, EnvObject, envObjectSchema, envSchema (+14 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "server/package.json"
Cohesion: 0.10
Nodes (19): author, bin, sowa-chat, @nest-lab/throttler-storage-redis@^1.2.0, pg@^8.23.1, reflect-metadata@^0.2.2, rxjs@^7.8.1, sharp@^0.35.5 (+11 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, @aws-sdk/client-s3@^3.1151.0, cache-manager@^7.2.9, file-type@^22.1.1, nest-commander@^3.21.0, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1 (+21 more)

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
Cohesion: 0.08
Nodes (5): RequestContextModule, RequestContext, ConsumerModule, ContextConsumer, GuardProbeController

### Community 24 - "AuditLogEntry"
Cohesion: 0.14
Nodes (8): ActorKind, actorKinds, AuditLogEntry, NewAuditLogEntry, ColumnRow, expectedColumns, @nestjs-cls/transactional, @nestjs-cls/transactional-adapter-typeorm

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "origin.commands.ts"
Cohesion: 0.10
Nodes (12): describeRemove(), listOriginsOf(), OperatorOriginAddCommand, OperatorOriginListCommand, OperatorOriginRemoveCommand, OriginAddCommand, OriginListCommand, OriginOptions (+4 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.18
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, serverEnvironment() (+3 more)

### Community 28 - "visitor-session.entity.spec.ts"
Cohesion: 0.14
Nodes (9): columns(), expectedColumns, findColumn(), findRelation(), normalizeSql(), relations(), runMigration(), CreateOperators1793300003000 (+1 more)

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "chat-tables.e2e-spec.ts"
Cohesion: 0.06
Nodes (36): ColumnRow, ForeignKeyRow, IndexRow, tableNames, IndexRow, PlanRow, countRows(), createChannel() (+28 more)

### Community 32 - "server-key-guard.e2e-spec.ts"
Cohesion: 0.11
Nodes (20): KeyRevokeOptions, base, base62Alphabet, encodeBase62(), buildLookupPrefix(), computeChecksum(), generateKey(), isBase62() (+12 more)

### Community 33 - "zone.guard.spec.ts"
Cohesion: 0.11
Nodes (8): CapturedResponse, FakeRequest, guardedControllers, MixedZoneController, OperatorZoneController, startApp(), unitPorts, UnzonedController

### Community 34 - "main.ts"
Cohesion: 0.15
Nodes (10): startListening(), stopListening(), ZoneServers, ZonesModule, createContext(), mode, runMigrate(), runners (+2 more)

### Community 35 - "database.module.ts"
Cohesion: 0.31
Nodes (5): createTypeOrmModule(), DatabaseModule, getTypeOrmModule(), typeOrmModules, @nestjs/typeorm

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "zod-validation.spec.ts"
Cohesion: 0.13
Nodes (5): calls, ProbeBodyDto, ProbeCall, ProbeQueryDto, ValidationProbeController

### Community 38 - "config.module.ts"
Cohesion: 0.26
Nodes (14): appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, encryptionConfig, loggingConfig (+6 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "api.module.ts"
Cohesion: 0.12
Nodes (17): HealthBody, HealthEntry, DependencyStatusBody, StatusBody, probeControllers, LogEntry, offlineDataSource, withOfflineDatabase() (+9 more)

### Community 41 - "conversation.entity.spec.ts"
Cohesion: 0.16
Nodes (7): Channel, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "zod-serialization.spec.ts"
Cohesion: 0.16
Nodes (7): entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, ResponseProbeController

### Community 45 - "test-database.ts"
Cohesion: 0.15
Nodes (11): IdentityKeyKidTakenError, InvalidIdentityKeyIdError, WorkerModule, expectNoKeyRows(), expectNoRows(), auditRows(), auditRowsByAction(), identityKeyRows() (+3 more)

### Community 47 - "logger.module.ts"
Cohesion: 0.20
Nodes (14): createLogDestination(), logFileDescriptor(), LogDestination, stdoutModes, baseOptions(), createLoggerModule(), jsonOptions(), prettyOptions() (+6 more)

### Community 48 - "Visitor"
Cohesion: 0.09
Nodes (7): columns(), expectedColumns, findColumn(), findRelation(), relations(), Visitor, VisitorSession

### Community 49 - "key-cli.ts"
Cohesion: 0.19
Nodes (24): toLookupPrefix(), auditRowsByAction(), createdKey(), createKey(), insertBotKey(), keyListHeader, keyRowByPrefix(), listKeys() (+16 more)

### Community 50 - "writeLine"
Cohesion: 0.15
Nodes (8): serverKeyOnceWarning, writeLine(), writeWarning(), KeyCreateCommand, KeyCreateOptions, KeyGenerateCommand, ProjectCreateOptions, nest-commander

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.17
Nodes (14): runToExit(), ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit() (+6 more)

### Community 52 - "projects.service.ts"
Cohesion: 0.09
Nodes (20): IssuedApiKey, OriginList, originLists, NewProject, ORIGIN_COLUMNS, OriginsRow, ProjectsRepository, ChangeOriginInput (+12 more)

### Community 53 - "operator-auth.guard.ts"
Cohesion: 0.16
Nodes (4): OperatorAuthGuard, ServerKeyGuard, bearerToken(), FakeRequestInput

### Community 54 - "protocol/src/index.ts"
Cohesion: 0.07
Nodes (23): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, defaultLimits, isAccepted() (+15 more)

### Community 55 - "typeorm"
Cohesion: 0.17
Nodes (8): database, loadDataSource(), databaseEntities, channelColumns(), findColumn(), Project, JsonObject, typeorm

### Community 57 - "metrics.controller.ts"
Cohesion: 0.18
Nodes (4): prom-client@^15.1.3, MetricsController, MetricsModule, prom-client

### Community 58 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.19
Nodes (11): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, unreachableUrl() (+3 more)

### Community 59 - "cli-output.ts"
Cohesion: 0.11
Nodes (12): emptyCell, formatDate(), writeTable(), header, IdentityKeyListCommand, IdentityKeyListOptions, toRow(), header (+4 more)

### Community 60 - "test-secrets.ts"
Cohesion: 0.18
Nodes (16): createReencryptionModule(), createRegisteredFieldsModule(), createTestSecretsTable(), dropTestSecretsTable(), initModule(), insertVersion1Secrets(), key1, key2 (+8 more)

### Community 61 - "@nestjs/common"
Cohesion: 0.09
Nodes (17): IdentityKeyAddOptions, IdentityKeyRevokeOptions, KeyActorKind, IdentityKeyAlgorithm, ParsedIdentityKey, IdentityKeysRepository, NewIdentityKey, AddedIdentityKey (+9 more)

### Community 62 - "request-id.spec.ts"
Cohesion: 0.22
Nodes (9): createRequestIdProbeApp(), entriesOf(), expectRequestIdInAllEntries(), isRequestEntryOf(), isServiceEntryOf(), LogEntry, ProbeResponse, ProbeService (+1 more)

### Community 63 - "migrate.module.ts"
Cohesion: 0.17
Nodes (5): DatabaseMigrationStep, PreparationRunner, PreparationStep, preparationSteps, MigrateModule

### Community 64 - "operator-role.guard.spec.ts"
Cohesion: 0.13
Nodes (10): @nestjs/core@^12.0.1, OperatorRoleGuard, createGuard(), createRequestContext(), GuardFixture, ProbeController, SupervisorOnlyController, SupervisorOnly() (+2 more)

### Community 65 - "projects-service.e2e-spec.ts"
Cohesion: 0.15
Nodes (17): IssueApiKeyInput, columns, createMain(), emptyLists, eventNames, listRow(), lists, originAuditRows() (+9 more)

### Community 66 - "encryption.service.spec.ts"
Cohesion: 0.10
Nodes (20): CryptoModule, authTagLength, EncryptedSecret, formatEncryptedSecret(), ivLength, parseEncryptedSecret(), ciphertext, iv (+12 more)

### Community 67 - "Controller"
Cohesion: 0.23
Nodes (5): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController

### Community 69 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 70 - "IdentityKey"
Cohesion: 0.06
Nodes (15): IdentityKey, algorithmOf(), InvalidIdentityKeyError, isP256(), parseIdentityPublicKey(), readPublicKeyObject(), captureError(), expectInvalidKey() (+7 more)

### Community 71 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 72 - "origin.ts"
Cohesion: 0.42
Nodes (6): ALLOWED_PROTOCOLS, InvalidOriginError, isOriginOnly(), normalizeOrigin(), normalizeOrigins(), parseUrl()

### Community 73 - "OperationSteps"
Cohesion: 0.11
Nodes (9): nestjs-cls@^7.0.1, DatabaseStepSubscriber, OperationStep, operationSteps, OperationTiming, OperationSteps, OperationStepsProbeController, operationTimingKey (+1 more)

### Community 74 - "redis.module.ts"
Cohesion: 0.20
Nodes (8): ioredis@^6.0.0, closeRedis(), createRedisClient(), redisStartupTimeoutMs, FakeRedis, waitForRedis(), RedisModule, ioredis

### Community 75 - "cli-runner.ts"
Cohesion: 0.28
Nodes (6): cliName, commanderArgv(), runCliCommand(), startupLogLevels, CliModule, runCli()

### Community 76 - "participant.entity.spec.ts"
Cohesion: 0.14
Nodes (7): Participant, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 77 - "conversation.entity.ts"
Cohesion: 0.07
Nodes (21): Conversation, ConversationCloseReason, conversationCloseReasons, ConversationStatus, conversationStatuses, ConversationEvent, ConversationEventActorKind, conversationEventActorKinds (+13 more)

### Community 78 - "api-app.ts"
Cohesion: 0.14
Nodes (16): configureApiApp(), bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError(), noStore(), useSecurityHeaders() (+8 more)

### Community 79 - "identity-key-commands.e2e-spec.ts"
Cohesion: 0.21
Nodes (18): addKey(), CliRunResult, runCliInProcess(), addEd25519Key(), addIdentityKey(), addP256Key(), generateRsaPublicPem(), identityKeyListHeader (+10 more)

### Community 80 - "health.module.ts"
Cohesion: 0.09
Nodes (11): DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus, ServerStatus (+3 more)

### Community 81 - "operators.service.ts"
Cohesion: 0.11
Nodes (10): DisabledOperators, Probe, OperatorTokenClaims, operatorTokenClaimsSchema, OperatorProfile, OperatorsRepository, IssuedOperatorToken, IssueOperatorTokenInput (+2 more)

### Community 83 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 84 - "Operator"
Cohesion: 0.09
Nodes (7): Operator, OperatorDisabledError, OperatorsService, operatorTokenTtlSeconds, input, Probe, signedToken

### Community 85 - "origin-cli.ts"
Cohesion: 0.22
Nodes (12): badOrigins, helpEntries, prefixes, addOrigins(), OriginAction, OriginCommandOptions, OriginGroup, originGroups (+4 more)

### Community 87 - "audit-log.listener.spec.ts"
Cohesion: 0.08
Nodes (25): AuditLogListener, eventValues, happened, personalValues, AuditLogRepository, AuditModule, auditedEventNames(), AuditRecord (+17 more)

### Community 88 - "secrets-reencrypt-command.e2e-spec.ts"
Cohesion: 0.23
Nodes (14): clearRegisteredFields(), dryRunHeader, emptyRegistryLine, encryptionKeysEnv, fieldName, insertVersion1Values(), reencryptedAction, reencryptedAuditRows() (+6 more)

### Community 89 - "secrets-reencrypt.command.ts"
Cohesion: 0.19
Nodes (9): describeUndecryptable(), dryRunHeader, fieldName(), reencryptHeader, SecretsReencryptCommand, SecretsReencryptOptions, toReencryptionRow(), toVersionRow() (+1 more)

### Community 90 - "zone.ts"
Cohesion: 0.13
Nodes (17): DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes, probeControllers, ApiZone (+9 more)

### Community 91 - "Message"
Cohesion: 0.12
Nodes (7): Message, columns(), expectedColumns, findColumn(), findRelation(), relations(), relationTarget()

### Community 92 - "encryption-keys.schema.spec.ts"
Cohesion: 0.29
Nodes (7): describeErrors(), key1, key1Bytes, key2, key2Bytes, parseKeys(), requiredEnv

### Community 94 - "api-keys.service.ts"
Cohesion: 0.08
Nodes (12): ApiKey, ApiKeyKind, ApiKeysRepository, NewApiKey, ApiKeysService, hashMatches(), IssueApiKeyBaseInput, RevokeApiKeyInput (+4 more)

### Community 95 - "server-errors.spec.ts"
Cohesion: 0.12
Nodes (18): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, ApiExceptionInput, entries(), errorEntriesOf() (+10 more)

### Community 96 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 97 - "global-setup.ts"
Cohesion: 0.42
Nodes (5): runDatabaseMigrations(), setup(), startPostgresContainer(), startValkeyContainer(), valkeyUrl()

### Community 98 - "fixtures.ts"
Cohesion: 0.10
Nodes (17): apiKeyKinds, ColumnRow, expectedColumns, expectSingleServerKey(), nonEmptyLines(), repositoryRoot, runMainCli(), runNode() (+9 more)

### Community 99 - "operator-guard-probe.ts"
Cohesion: 0.16
Nodes (10): OperatorController(), DisabledProbeController, issueOperator(), issueOperator(), get(), getAs(), RolesProbeController, IssuedOperator (+2 more)

### Community 100 - "api-keys-service-probe.ts"
Cohesion: 0.24
Nodes (12): eventFields, keyTypeByKind, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred (+4 more)

### Community 101 - "telemetry.interceptor.spec.ts"
Cohesion: 0.13
Nodes (4): ProbeController, readMetricLines(), TelemetryProbeController, zoneUrl()

### Community 102 - "JsonObjectValidator"
Cohesion: 0.28
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 103 - "telemetry.interceptor.ts"
Cohesion: 0.11
Nodes (8): slowOperationsConfig, HttpMetrics, StepTimes, FinishedOperation, SlowOperationsModule, roundSteps(), SlowOperations, TelemetryInterceptor

### Community 104 - "log-redaction.spec.ts"
Cohesion: 0.18
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 105 - "Zone"
Cohesion: 0.10
Nodes (15): ServerController(), controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController (+7 more)

### Community 106 - "operator-auth.module.ts"
Cohesion: 0.18
Nodes (4): OperatorAuthModule, ServerApiModule, OperatorsModule, TokensModule

### Community 107 - "cls-middleware.ts"
Cohesion: 0.29
Nodes (6): ApiModule, useClsMiddleware(), echoRequestId(), resolveRequestId(), beginOperation(), createE2eApp()

### Community 108 - "encryption-keys.schema.ts"
Cohesion: 0.60
Nodes (5): EncryptionKey, encryptionKeysSchema, parseEntry(), parseKeys(), reject()

### Community 109 - "ref_node_path"
Cohesion: 0.09
Nodes (17): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, builtFiles, CommandResult, entriesByPackage, plannedBuildTasks() (+9 more)

### Community 111 - "api-versioning.spec.ts"
Cohesion: 0.25
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 112 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 115 - "tokens.service.ts"
Cohesion: 0.13
Nodes (8): TokenSigningKey, SignedToken, SignTokenInput, TokenConsumer, TokenAudience, tokenAudiences, TokensService, VerifiedToken

### Community 120 - "audit-log.e2e-spec.ts"
Cohesion: 0.11
Nodes (11): DomainEventBus, happened, TestListener, DomainEventHandler, OnDomainEvent(), testAuditRules, DomainEvents, ../../src/telemetry/events/domain-events.js (+3 more)

### Community 122 - "secrets-reencryption.service.ts"
Cohesion: 0.14
Nodes (13): encryptedFields, registeredEncryptedFields, SecretsReencryptionModule, BatchResult, FieldReencryption, FieldResult, FieldVersionCount, ReencryptInput (+5 more)

### Community 123 - "operator-token.controller.ts"
Cohesion: 0.13
Nodes (11): nestjs-zod@^5.5.0, OperatorTokenController, OperatorTokenRequestDto, OperatorTokenResponseDto, operatorRoles, OperatorTokenRequest, operatorTokenRequestSchema, OperatorTokenResponse (+3 more)

### Community 126 - ".getByName"
Cohesion: 0.29
Nodes (3): readPem(), addOriginTo(), describeAdd()

### Community 127 - "project-list.command.ts"
Cohesion: 0.22
Nodes (4): formatOrigins(), header, ProjectListCommand, toRow()

### Community 128 - "findFreePort"
Cohesion: 0.14
Nodes (17): AppConfigModule, findZonePorts(), fetchStatus(), repositoryRoot, RunResult, serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus() (+9 more)

### Community 129 - "token-signing-keys.schema.ts"
Cohesion: 0.67
Nodes (5): parseEntry(), parseKeys(), parsePrivateKey(), reject(), tokenSigningKeysSchema

### Community 131 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 135 - "identity-keys-table.e2e-spec.ts"
Cohesion: 0.40
Nodes (4): identityKeyAlgorithms, ColumnRow, expectedColumns, jwk

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 950 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **38 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `log-level-warn.spec.ts`, `operator-auth-guard.e2e-spec.ts`, `server/package.json`, `nestjs-pino`, `dependencies`, `http-error.filter.spec.ts`, `RequestContext`, `AuditLogEntry`, `origin.commands.ts`, `server-key-guard.e2e-spec.ts`, `zone.guard.spec.ts`, `main.ts`, `database.module.ts`, `zod-validation.spec.ts`, `config.module.ts`, `api.module.ts`, `zod-serialization.spec.ts`, `test-database.ts`, `logger.module.ts`, `writeLine`, `projects.service.ts`, `operator-auth.guard.ts`, `metrics.controller.ts`, `cli-output.ts`, `request-id.spec.ts`, `migrate.module.ts`, `operator-role.guard.spec.ts`, `encryption.service.spec.ts`, `OperationSteps`, `redis.module.ts`, `cli-runner.ts`, `api-app.ts`, `health.module.ts`, `operators.service.ts`, `audit-log.listener.spec.ts`, `secrets-reencrypt.command.ts`, `zone.ts`, `api-keys.service.ts`, `server-errors.spec.ts`, `operator-guard-probe.ts`, `telemetry.interceptor.spec.ts`, `telemetry.interceptor.ts`, `log-redaction.spec.ts`, `Zone`, `operator-auth.module.ts`, `cls-middleware.ts`, `api-versioning.spec.ts`, `tokens.service.ts`, `audit-log.e2e-spec.ts`, `body-limit.spec.ts`, `secrets-reencryption.service.ts`, `operator-token.controller.ts`, `project-list.command.ts`?**
  _High betweenness centrality (0.281) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `database-migrations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06464646464646465 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `findFreePort`, `server/package.json`, `dependencies`, `visitor-session.entity.spec.ts`, `chat-tables.e2e-spec.ts`, `database.module.ts`, `conversation.entity.spec.ts`, `test-database.ts`, `Visitor`, `key-cli.ts`, `migrate-mode.e2e-spec.ts`, `test-secrets.ts`, `projects-service.e2e-spec.ts`, `OperationSteps`, `participant.entity.spec.ts`, `conversation.entity.ts`, `operators.service.ts`, `origin-cli.ts`, `CreateChatTables1793215389271`, `secrets-reencrypt-command.e2e-spec.ts`, `Message`, `fixtures.ts`, `operator-guard-probe.ts`, `cls-middleware.ts`, `ref_node_path`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/testing` connect `test-database.ts` to `findFreePort`, `devDependencies`, `operator-auth-guard.e2e-spec.ts`, `server/package.json`, `RequestContext`, `AuditLogEntry`, `server-key-guard.e2e-spec.ts`, `config.module.ts`, `api.module.ts`, `logger.module.ts`, `key-cli.ts`, `projects.service.ts`, `test-secrets.ts`, `@nestjs/common`, `projects-service.e2e-spec.ts`, `encryption.service.spec.ts`, `OperationSteps`, `api-app.ts`, `operators.service.ts`, `Operator`, `audit-log.listener.spec.ts`, `api-keys-service-probe.ts`, `cls-middleware.ts`, `audit-log.e2e-spec.ts`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._