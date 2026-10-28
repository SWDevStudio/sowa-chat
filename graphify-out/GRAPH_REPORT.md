# Graph Report - EPIC-9-9  (2026-10-29)

## Corpus Check
- 208 files · ~39,057 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 10, .example 1)

## Summary
- 1476 nodes · 2957 edges · 102 communities (68 shown, 34 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 53 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a4ee8201`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- database-migrations.ts
- bot-sdk/tsconfig.json
- package.json
- request-id.spec.ts
- devDependencies
- server-modes.e2e-spec.ts
- server/package.json
- env.schema.ts
- compilerOptions
- ref_node_path
- config-startup.e2e-spec.ts
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
- protocol/src/index.ts
- ApiKey
- scripts
- api-keys-service-probe.ts
- logging.e2e-spec.ts
- log-redaction.e2e-spec.ts
- provided-context.d.ts
- request-id.e2e-spec.ts
- server-protocol.e2e-spec.ts
- status.service.ts
- metrics.controller.ts
- migrate-mode.e2e-spec.ts
- ServerErrorsProbeController
- tsconfig.build.json
- test-database.ts
- key-format.ts
- nest-cli.json
- global-setup.ts
- workspace-check-types.e2e-spec.ts
- server-sdk/tsconfig.json
- ResponseProbeController
- health.e2e-spec.ts
- ValidationProbeController
- main.ts
- audit-log.e2e-spec.ts
- AuditLogEntry
- server-errors.spec.ts
- log-settings.e2e-spec.ts
- MixedZoneController
- log-redaction.spec.ts
- zod-serialization.spec.ts
- Zone
- json-object-schema.ts
- packages-build.e2e-spec.ts
- api-keys.service.ts
- audit-rule.ts
- ZonedController
- database.module.ts
- JsonObjectValidator
- ZoneServers
- InternalProbeController
- ZonedController
- NeutralProbeController
- cache-manager@^7.2.9
- ErrorProbeController
- api-keys.e2e-spec.ts
- zone.ts
- nest-commander@^3.21.0
- zone-servers.spec.ts
- nestjs-cls
- cls-middleware.ts
- ApiKeysService
- reflect-metadata@^0.2.2
- @nestjs/swagger
- fixtures.ts
- IdentityKey
- health.module.ts
- typeorm
- database-migrations.spec.ts
- api.module.ts
- CreateProjects1793193549883
- CreateApiKeys1793300000000
- body-limit.ts
- @nestjs/microservices@^12.1.3
- security-headers.ts
- @aws-sdk/s3-request-presigner@^3.1151.0
- findFreePort
- @nest-lab/throttler-storage-redis@^1.2.0
- nestjs-cls
- @nestjs/common
- @nestjs/platform-socket.io@^12.1.3
- @vitest/coverage-v8@catalog:

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 75 edges
2. `Zone()` - 44 edges
3. `findFreePort()` - 25 edges
4. `typeorm` - 24 edges
5. `Project` - 22 edges
6. `startZoneProbeApp()` - 22 edges
7. `ApiKey` - 21 edges
8. `compilerOptions` - 20 edges
9. `@nestjs/testing` - 19 edges
10. `AuditLogEntry` - 18 edges

## Surprising Connections (you probably didn't know these)
- `ProjectFixture` --references--> `JsonObject`  [EXTRACTED]
  apps/server/test/support/fixtures.ts → packages/protocol/src/json-types.ts
- `Project` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/projects/project.entity.ts → packages/protocol/src/json-types.ts
- `ApiExceptionInput` --references--> `ErrorCode`  [EXTRACTED]
  apps/server/src/infra/http/api-exception.ts → packages/protocol/src/errors.ts
- `AuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log-entry.entity.ts → packages/protocol/src/json-types.ts
- `NewAuditLogEntry` --references--> `JsonObject`  [EXTRACTED]
  apps/server/src/domain/audit/audit-log.repository.ts → packages/protocol/src/json-types.ts

## Import Cycles
- None detected.

## Communities (102 total, 34 thin omitted)

### Community 0 - "database-migrations.ts"
Cohesion: 0.17
Nodes (5): DatabaseMigration, databaseMigrations, CreateAuditLog1793200000000, CreateIdentityKeys1793300001000, AddProjectsPublicKey1793300002000

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
Nodes (19): author, @aws-sdk/client-s3@^3.1151.0, file-type@^22.1.1, @nestjs/cache-manager@^12.0.1, reflect-metadata@^0.2.2, rxjs@^7.8.1, sharp@^0.35.5, description (+11 more)

### Community 7 - "env.schema.ts"
Cohesion: 0.06
Nodes (41): pino@^10.4.0, appConfig, compileConfigModule(), compileWith(), stubTestEnv(), testEnv, databaseConfig, checkPrettyLogFormat() (+33 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 9 - "ref_node_path"
Cohesion: 0.13
Nodes (10): filesReadingProcessEnv(), sourceDirectory, sourceFiles(), packageJson, databaseUrl(), IdentityRow, VersionRow, useTestRedis() (+2 more)

### Community 10 - "config-startup.e2e-spec.ts"
Cohesion: 0.22
Nodes (8): Env, isConfigVariable(), repositoryRoot, RunResult, serverEntry, serverEnvironment(), systemEnvironment(), validEnv

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, helmet@^8.3.0, nest-commander@^3.21.0, @nestjs-cls/transactional@^4.0.1, @nestjs-cls/transactional-adapter-typeorm@^2.0.1, @nestjs/common@^12.0.1, @nestjs/config@^12.0.1, @nestjs/core@^12.0.1 (+21 more)

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
Cohesion: 0.16
Nodes (11): errorCodeOfStatus(), httpErrorResponse(), internalErrorResponse(), toErrorResponse(), validationErrorResponse(), HttpErrorFilter, requestIdOf(), responseZodErrorOf() (+3 more)

### Community 23 - "protocol/src/index.ts"
Cohesion: 0.16
Nodes (8): createEventEnvelopeSchema(), EventEnvelope, eventEnvelopeSchema, MessageCreatedEnvelope, messageCreatedSchema, validEnvelope, PageQuery, pageQuerySchema

### Community 25 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check-types, migration:create, migration:generate, start:api, start:api:dev, start:migrate (+8 more)

### Community 26 - "api-keys-service-probe.ts"
Cohesion: 0.23
Nodes (11): eventFields, serverKey, ApiKeysRepositoryStub, ApiKeysServiceProbe, createApiKeysServiceProbe(), createdRow(), deferred, lookupPrefixOf() (+3 more)

### Community 27 - "logging.e2e-spec.ts"
Cohesion: 0.20
Nodes (11): expectOnlyJsonLines(), fetchStatus(), logEntries(), LogEntry, outputLines(), repositoryRoot, RunResult, runToExit() (+3 more)

### Community 28 - "log-redaction.e2e-spec.ts"
Cohesion: 0.36
Nodes (7): isRequestEntry(), isResponding(), logEntries(), LogEntry, repositoryRoot, waitForRequestEntry(), waitUntilResponding()

### Community 30 - "request-id.e2e-spec.ts"
Cohesion: 0.25
Nodes (9): entriesForPath(), isResponding(), logEntries(), LogEntry, ProbeResult, repositoryRoot, sendRequest(), waitForPathEntries() (+1 more)

### Community 31 - "server-protocol.e2e-spec.ts"
Cohesion: 0.24
Nodes (7): CommandResult, findFreePort(), repositoryRoot, respondsToHttp(), serverDirectory, startBuiltServer(), waitForHttp()

### Community 32 - "status.service.ts"
Cohesion: 0.17
Nodes (5): happenedIn(), ScenarioError, ScenarioError, SecondProjectsRepository, TransactionScenarios

### Community 33 - "metrics.controller.ts"
Cohesion: 0.16
Nodes (5): zoneMetadataKey, MetricsController, @nestjs/common, @nestjs/core, prom-client

### Community 34 - "migrate-mode.e2e-spec.ts"
Cohesion: 0.21
Nodes (10): BrokenMigration1700000000000, countMigrationRows(), createDatabase(), migrateEnvironment(), repositoryRoot, runMigrate(), RunResult, withClient() (+2 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 37 - "test-database.ts"
Cohesion: 0.21
Nodes (9): jose@^6.2.12, IdentityKeyAlgorithm, identityKeyAlgorithms, ColumnRow, expectedColumns, jwk, truncateAllTables(), useTestDatabase() (+1 more)

### Community 38 - "key-format.ts"
Cohesion: 0.26
Nodes (11): base, base62Alphabet, encodeBase62(), computeChecksum(), generateKey(), isBase62(), keyPrefixes, KeyType (+3 more)

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 40 - "global-setup.ts"
Cohesion: 0.16
Nodes (10): DomainEventBus, happened, TestListener, DomainEventHandler, OnDomainEvent(), DomainEvents, ../../src/telemetry/events/domain-events.js, TestHappenedEvent (+2 more)

### Community 41 - "workspace-check-types.e2e-spec.ts"
Cohesion: 0.28
Nodes (8): CommandResult, librariesWithOwnChecks, plannedCheckTypesTasks(), PlannedTask, probePath(), repositoryRoot, runInRoot(), writeProbe()

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 45 - "health.e2e-spec.ts"
Cohesion: 0.22
Nodes (7): DependencyStatusBody, fetchStatus(), repositoryRoot, serverEnvironment(), serverPackageJson, StatusBody, waitForHttpStatus()

### Community 47 - "main.ts"
Cohesion: 0.07
Nodes (24): configureApiApp(), CliModule, DatabaseMigrationStep, runDatabaseMigrations(), PreparationRunner, PreparationStep, preparationSteps, createContext() (+16 more)

### Community 48 - "audit-log.e2e-spec.ts"
Cohesion: 0.09
Nodes (9): Project, ProjectsModule, ProjectsRepository, WorkerModule, AuditScenarios, ColumnRow, testAuditRules, @nestjs-cls/transactional (+1 more)

### Community 49 - "AuditLogEntry"
Cohesion: 0.14
Nodes (9): ActorKind, actorKinds, AuditLogEntry, AuditLogRepository, NewAuditLogEntry, AuditRecord, ColumnRow, expectedColumns (+1 more)

### Community 50 - "server-errors.spec.ts"
Cohesion: 0.11
Nodes (19): ApiException, ApiExceptionInput, errorCodeStatuses, ErrorDetail, errorCodeByStatus, internalErrorMessage, ApiExceptionInput, entries() (+11 more)

### Community 51 - "log-settings.e2e-spec.ts"
Cohesion: 0.23
Nodes (11): ApiRun, fetchStatus(), LogEntry, repositoryRoot, runApiWithRequest(), RunResult, runToExit(), serverEnvironment() (+3 more)

### Community 52 - "MixedZoneController"
Cohesion: 0.08
Nodes (15): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController, VisitorProbeController, MethodOnlyController, Zone(), CapturedResponse (+7 more)

### Community 53 - "log-redaction.spec.ts"
Cohesion: 0.09
Nodes (12): allOutput(), CapturedLogs, createRedactionProbeApp(), fieldValueOf(), integratorDataFields, LogEntry, logFromService(), messageAndContactFields (+4 more)

### Community 54 - "zod-serialization.spec.ts"
Cohesion: 0.12
Nodes (12): nestjs-zod@^5.5.0, entries(), errorEntriesOf(), Issue, LogEntry, ProbeResponse, ProbeResponseDto, calls (+4 more)

### Community 55 - "Zone"
Cohesion: 0.17
Nodes (9): controllers, DocsProbeDto, documentOf(), InternalDocsProbeController, OpenApiDocument, OpenApiSchema, OperatorDocsProbeController, PublicDocsProbeController (+1 more)

### Community 56 - "json-object-schema.ts"
Cohesion: 0.09
Nodes (15): defaultLimits, isAccepted(), jsonLength(), objectOfJsonBytes(), Schema, schemaWith(), createJsonObjectSchema(), defaultLimits (+7 more)

### Community 57 - "packages-build.e2e-spec.ts"
Cohesion: 0.25
Nodes (7): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot()

### Community 58 - "api-keys.service.ts"
Cohesion: 0.20
Nodes (10): ApiKeyKind, NewApiKey, hashMatches(), IssueApiKeyInput, IssuedApiKey, KeyActorKind, keyTypeByKind, RevokeApiKeyInput (+2 more)

### Community 59 - "audit-rule.ts"
Cohesion: 0.18
Nodes (10): AuditLogListener, auditedEventNames(), AuditRule, auditRules, auditedEvents, botKeyEvent, serverKeyEvent, ApiKeyEvent (+2 more)

### Community 61 - "database.module.ts"
Cohesion: 0.27
Nodes (8): createTypeOrmModule(), getTypeOrmModule(), typeOrmModules, createDataSourceOptions(), DatabaseConnection, DatabaseEntity, FirstEntity, SecondEntity

### Community 62 - "JsonObjectValidator"
Cohesion: 0.30
Nodes (3): JsonObjectValidator, encoder, utf8ByteLength()

### Community 63 - "ZoneServers"
Cohesion: 0.25
Nodes (3): startListening(), stopListening(), ZoneServers

### Community 64 - "InternalProbeController"
Cohesion: 0.27
Nodes (4): InternalProbeController, ManagementProbeController, OperatorProbeController, PublicProbeController

### Community 66 - "NeutralProbeController"
Cohesion: 0.19
Nodes (4): NeutralProbeController, probeControllers, SecondVersionProbeController, VersionedProbeController

### Community 70 - "zone.ts"
Cohesion: 0.15
Nodes (15): HealthBody, HealthEntry, DocumentedZone, documentForZone(), isUnderAnyPrefix(), onlyOnManagementPort(), setupApiDocs(), zonePathPrefixes (+7 more)

### Community 72 - "zone-servers.spec.ts"
Cohesion: 0.12
Nodes (20): DependencyStatusBody, StatusBody, LogDestination, probeControllers, withOfflineDatabase(), offlineRedis, withOfflineRedis(), readyRedis (+12 more)

### Community 74 - "cls-middleware.ts"
Cohesion: 0.33
Nodes (5): ApiModule, useClsMiddleware(), echoRequestId(), resolveRequestId(), createE2eApp()

### Community 78 - "fixtures.ts"
Cohesion: 0.28
Nodes (5): apiKeyKinds, ColumnRow, expectedColumns, createProject(), ProjectFixture

### Community 80 - "health.module.ts"
Cohesion: 0.06
Nodes (19): ioredis@^6.0.0, DependencyChecks, HealthController, HealthModule, ReplicaReadiness, readServerVersion(), StatusController, DependencyStatus (+11 more)

### Community 81 - "typeorm"
Cohesion: 0.47
Nodes (3): database, loadDataSource(), typeorm

### Community 83 - "api.module.ts"
Cohesion: 0.14
Nodes (12): databaseEntities, eventValues, happened, personalValues, AuditModule, AppClsModule, AppConfigModule, DatabaseModule (+4 more)

### Community 86 - "body-limit.ts"
Cohesion: 0.43
Nodes (5): bodyLimit, useBodyLimit(), BodyParserError, bodyParserErrorToHttpException(), isBodyParserError()

### Community 90 - "findFreePort"
Cohesion: 0.12
Nodes (20): findZonePorts(), fetchStatus(), repositoryRoot, RunResult, runToExit(), serverEnvironment(), unreachableDatabaseUrl(), waitForHttpStatus() (+12 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 580 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **34 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `metrics.controller.ts` to `request-id.spec.ts`, `server/package.json`, `env.schema.ts`, `dependencies`, `http-error.filter.spec.ts`, `test-database.ts`, `global-setup.ts`, `main.ts`, `audit-log.e2e-spec.ts`, `AuditLogEntry`, `server-errors.spec.ts`, `MixedZoneController`, `log-redaction.spec.ts`, `zod-serialization.spec.ts`, `Zone`, `api-keys.service.ts`, `audit-rule.ts`, `database.module.ts`, `ZoneServers`, `NeutralProbeController`, `api-keys.e2e-spec.ts`, `zone.ts`, `zone-servers.spec.ts`, `cls-middleware.ts`, `health.module.ts`, `api.module.ts`, `body-limit.ts`, `security-headers.ts`, `@nestjs/common`?**
  _High betweenness centrality (0.253) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Zone()` connect `MixedZoneController` to `InternalProbeController`, `metrics.controller.ts`, `NeutralProbeController`, `ServerErrorsProbeController`, `ErrorProbeController`, `zone.ts`, `zone-servers.spec.ts`, `ResponseProbeController`, `ValidationProbeController`, `health.module.ts`, `server-errors.spec.ts`, `http-error.filter.spec.ts`, `Zone`, `zod-serialization.spec.ts`, `ZonedController`, `@nestjs/common`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Should `request-id.spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._
- **Why does `typeorm` connect `typeorm` to `database-migrations.ts`, `migrate-mode.e2e-spec.ts`, `test-database.ts`, `server/package.json`, `ref_node_path`, `dependencies`, `fixtures.ts`, `audit-log.e2e-spec.ts`, `AuditLogEntry`, `CreateProjects1793193549883`, `CreateApiKeys1793300000000`, `findFreePort`, `database.module.ts`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._