# Graph Report - hector-chat  (2026-10-27)

## Corpus Check
- 49 files · ~5,749 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 7, .example 1)

## Summary
- 513 nodes · 652 edges · 63 communities (25 shown, 38 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0038ecc1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- @nest-lab/throttler-storage-redis@^1.2.0
- bot-sdk/tsconfig.json
- package.json
- server-protocol.e2e-spec.ts
- devDependencies
- Providers
- dependencies
- @nestjs/event-emitter@^12.0.1
- compilerOptions
- @nestjs/microservices@^12.1.3
- @nestjs/platform-express@^12.0.1
- protocol/tsconfig.json
- sdk/package.json
- server/package.json
- protocol/package.json
- catalog
- sdk/tsconfig.json
- tasks
- compilerOptions
- rules
- bot-sdk/package.json
- server-sdk/package.json
- file-type@^22.1.1
- zod@catalog:
- scripts
- scripts
- @aws-sdk/s3-request-presigner@^3.1151.0
- nest-commander@^3.21.0
- @nestjs/core
- @nestjs/typeorm@^12.0.2
- helmet@^8.3.0
- @nestjs-cls/transactional@^4.0.1
- socket.io@^4.8.4
- typeorm@^1.1.2
- @nestjs/swagger@^12.0.2
- @nestjs/config@^12.0.1
- tsconfig.build.json
- @nestjs/websockets@^12.1.3
- pino-http@^11.0.0
- nest-cli.json
- jose@^6.2.12
- @socket.io/redis-adapter@^8.3.0
- server-sdk/tsconfig.json
- JsonObjectValidator
- nestjs-zod@^5.5.0
- reflect-metadata@^0.2.2
- @sowa-chat/protocol@workspace:*
- pino@^10.4.0
- rxjs@^7.8.1
- @nestjs/bullmq@^12.0.0
- nestjs-cls@^7.0.1
- @nestjs-cls/transactional-adapter-typeorm@^2.0.1
- nestjs-pino@^5.3.1
- @nestjs/terminus@^12.1.0
- @nestjs/throttler@^6.7.1
- json-object-limits.spec.ts

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 20 edges
2. `rules` - 12 edges
3. `scripts` - 12 edges
4. `JsonObjectValidator` - 12 edges
5. `scripts` - 11 edges
6. `catalog` - 11 edges
7. `AppService` - 7 edges
8. `@nestjs/common` - 6 edges
9. `AppController` - 6 edges
10. `allowBuilds` - 6 edges

## Surprising Connections (you probably didn't know these)
- `schemaWith()` --calls--> `createJsonObjectSchema()`  [EXTRACTED]
  packages/protocol/src/json-object-limits.spec.ts → packages/protocol/src/json-object.ts

## Import Cycles
- None detected.

## Communities (63 total, 38 thin omitted)

### Community 1 - "bot-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 2 - "package.json"
Cohesion: 0.11
Nodes (24): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+16 more)

### Community 3 - "server-protocol.e2e-spec.ts"
Cohesion: 0.08
Nodes (23): builtFiles, CommandResult, entriesByPackage, plannedBuildTasks(), PlannedTask, repositoryRoot, runInRoot(), CommandResult (+15 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21, supertest@^7.0.0 (+25 more)

### Community 5 - "Providers"
Cohesion: 0.15
Nodes (9): @nestjs/common@^12.0.1, @nestjs/testing@^12.0.1, AppController, AppModule, AppService, helloContextSchema, jsonObjectSchema, @nestjs/common (+1 more)

### Community 6 - "dependencies"
Cohesion: 0.15
Nodes (13): dependencies, @aws-sdk/client-s3@^3.1151.0, bullmq@^6.3.15, @nestjs/cache-manager@^12.0.1, @nestjs/platform-socket.io@^12.1.3, pg@^8.23.1, sharp@^0.35.5, @aws-sdk/client-s3 (+5 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 11 - "protocol/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 12 - "sdk/package.json"
Cohesion: 0.10
Nodes (21): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+13 more)

### Community 13 - "server/package.json"
Cohesion: 0.14
Nodes (13): author, cache-manager@^7.2.9, ioredis@^6.0.0, prom-client@^15.1.3, description, license, name, private (+5 more)

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

### Community 24 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, check-types, dev, format, format:check, infra:down, infra:up (+3 more)

### Community 25 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, check-types, start, start:debug, start:dev, start:prod, test (+4 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 42 - "server-sdk/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, lib, types, extends, include, ../../tsconfig.base.json

### Community 43 - "JsonObjectValidator"
Cohesion: 0.18
Nodes (9): defaultLimits, forbiddenKeys, isPlainObject(), IssuePath, jsonObjectBaseSchema, JsonObjectValidator, Violation, encoder (+1 more)

### Community 115 - "json-object-limits.spec.ts"
Cohesion: 0.07
Nodes (23): ErrorCode, errorCodes, errorDetailSchema, ErrorResponse, errorResponseSchema, initialCodes, validBody, createEventEnvelopeSchema() (+15 more)

## Knowledge Gaps
- **5 isolated node(s):** `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 241 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **38 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `Providers` to `server/package.json`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `@nest-lab/throttler-storage-redis@^1.2.0`, `Providers`, `@nestjs/event-emitter@^12.0.1`, `@nestjs/microservices@^12.1.3`, `@nestjs/platform-express@^12.0.1`, `server/package.json`, `file-type@^22.1.1`, `zod@catalog:`, `@aws-sdk/s3-request-presigner@^3.1151.0`, `nest-commander@^3.21.0`, `@nestjs/core`, `@nestjs/typeorm@^12.0.2`, `helmet@^8.3.0`, `@nestjs-cls/transactional@^4.0.1`, `socket.io@^4.8.4`, `typeorm@^1.1.2`, `@nestjs/swagger@^12.0.2`, `@nestjs/config@^12.0.1`, `@nestjs/websockets@^12.1.3`, `pino-http@^11.0.0`, `jose@^6.2.12`, `@socket.io/redis-adapter@^8.3.0`, `nestjs-zod@^5.5.0`, `reflect-metadata@^0.2.2`, `@sowa-chat/protocol@workspace:*`, `pino@^10.4.0`, `rxjs@^7.8.1`, `@nestjs/bullmq@^12.0.0`, `nestjs-cls@^7.0.1`, `@nestjs-cls/transactional-adapter-typeorm@^2.0.1`, `nestjs-pino@^5.3.1`, `@nestjs/terminus@^12.1.0`, `@nestjs/throttler@^6.7.1`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Should `server-protocol.e2e-spec.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0766488413547237 - nodes in this community are weakly interconnected._
- **Why does `jsonObjectSchema` connect `Providers` to `JsonObjectValidator`, `json-object-limits.spec.ts`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._