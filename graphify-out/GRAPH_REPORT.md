# Graph Report - hector-chat  (2026-10-26)

## Corpus Check
- 28 files · ~1,827 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 7, .example 1)

## Summary
- 348 nodes · 420 edges · 52 communities (16 shown, 36 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0f336f1d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- @nest-lab/throttler-storage-redis@^1.2.0
- @nestjs-cls/transactional@^4.0.1
- package.json
- @nestjs/config@^12.0.1
- devDependencies
- Providers
- dependencies
- @nestjs/event-emitter@^12.0.1
- compilerOptions
- @nestjs/microservices@^12.1.3
- @nestjs/platform-express@^12.0.1
- @nestjs/swagger@^12.0.2
- sdk/package.json
- server/package.json
- protocol/package.json
- catalog
- @nestjs/websockets@^12.1.3
- tasks
- reflect-metadata@^0.2.2
- rules
- bot-sdk/package.json
- server-sdk/package.json
- rxjs@^7.8.1
- zod@catalog:
- scripts
- tsconfig.build.json
- nest-cli.json
- @aws-sdk/s3-request-presigner@^3.1151.0
- cache-manager@^7.2.9
- file-type@^22.1.1
- ioredis@^6.0.0
- jose@^6.2.12
- @nestjs/bullmq@^12.0.0
- @nestjs/cache-manager@^12.0.1
- nestjs-cls@^7.0.1
- @nestjs-cls/transactional-adapter-typeorm@^2.0.1
- nestjs-pino@^5.3.1
- @nestjs/platform-socket.io@^12.1.3
- @nestjs/terminus@^12.1.0
- @nestjs/throttler@^6.7.1
- pg@^8.23.1
- pino@^10.4.0
- pino-http@^11.0.0
- sharp@^0.35.5
- @socket.io/redis-adapter@^8.3.0

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 20 edges
2. `rules` - 12 edges
3. `scripts` - 12 edges
4. `scripts` - 11 edges
5. `catalog` - 10 edges
6. `AppService` - 7 edges
7. `@nestjs/common` - 6 edges
8. `AppController` - 6 edges
9. `allowBuilds` - 6 edges
10. `tasks` - 6 edges

## Surprising Connections (you probably didn't know these)
- `@nestjs/common@^12.0.1` --declares--> `@nestjs/common`  [EXTRACTED]
  apps/server/package.json → apps/server/package.json  _Bridges community 6 → community 5_
- `@nestjs/testing@^12.0.1` --declares--> `@nestjs/testing`  [EXTRACTED]
  apps/server/package.json → apps/server/package.json  _Bridges community 4 → community 5_

## Import Cycles
- None detected.

## Communities (52 total, 36 thin omitted)

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (35): devDependencies, @changesets/cli@^3.0.3, ctx7@0.8.2, husky@9.1.7, lint-staged@17.6.0, oxlint@catalog:, oxlint-tsgolint@catalog:, prettier@3.9.6 (+27 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (32): devDependencies, dependency-cruiser@^18.6.0, @nestjs/cli@^12.0.0, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, pino-pretty@^13.2.0, socket.io-client@catalog:, source-map-support@^0.5.21 (+24 more)

### Community 5 - "Providers"
Cohesion: 0.15
Nodes (9): @nestjs/core@^12.0.1, supertest@^7.0.0, AppController, AppModule, AppService, @nestjs/common, @nestjs/core, @nestjs/testing (+1 more)

### Community 6 - "dependencies"
Cohesion: 0.14
Nodes (14): dependencies, @aws-sdk/client-s3@^3.1151.0, bullmq@^6.3.15, nest-commander@^3.21.0, @nestjs/common@^12.0.1, @nestjs/typeorm@^12.0.2, prom-client@^15.1.3, typeorm@^1.1.2 (+6 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+12 more)

### Community 12 - "sdk/package.json"
Cohesion: 0.12
Nodes (18): author, dependencies, socket.io-client@catalog:, description, devDependencies, tsdown@catalog:, exports, ./operator (+10 more)

### Community 13 - "server/package.json"
Cohesion: 0.14
Nodes (13): author, helmet@^8.3.0, nestjs-zod@^5.5.0, socket.io@^4.8.4, description, license, name, private (+5 more)

### Community 14 - "protocol/package.json"
Cohesion: 0.13
Nodes (17): author, description, devDependencies, tsdown@catalog:, zod@catalog:, exports, tsdown, zod (+9 more)

### Community 15 - "catalog"
Cohesion: 0.11
Nodes (17): allowBuilds, cpu-features, msgpackr-extract, protobufjs, @scarf/scarf, ssh2, catalog, oxlint (+9 more)

### Community 17 - "tasks"
Cohesion: 0.12
Nodes (16): dependsOn, inputs, outputs, dependsOn, cache, persistent, dependsOn, $schema (+8 more)

### Community 19 - "rules"
Cohesion: 0.12
Nodes (15): overrides, plugins, rules, complexity, import/no-cycle, max-depth, max-lines, max-lines-per-function (+7 more)

### Community 20 - "bot-sdk/package.json"
Cohesion: 0.15
Nodes (13): author, description, devDependencies, tsdown@catalog:, exports, tsdown, keywords, license (+5 more)

### Community 21 - "server-sdk/package.json"
Cohesion: 0.15
Nodes (13): author, description, devDependencies, tsdown@catalog:, exports, tsdown, keywords, license (+5 more)

### Community 25 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, check-types, start, start:debug, start:dev, start:prod, test (+4 more)

### Community 36 - "tsconfig.build.json"
Cohesion: 0.29
Nodes (6): compilerOptions, rootDir, exclude, extends, include, ./tsconfig.json

### Community 39 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

## Knowledge Gaps
- **1 isolated node(s):** `./tsconfig.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 155 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **36 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `@nest-lab/throttler-storage-redis@^1.2.0`, `@nestjs-cls/transactional@^4.0.1`, `@nestjs/config@^12.0.1`, `Providers`, `@nestjs/event-emitter@^12.0.1`, `@nestjs/microservices@^12.1.3`, `@nestjs/platform-express@^12.0.1`, `@nestjs/swagger@^12.0.2`, `server/package.json`, `@nestjs/websockets@^12.1.3`, `reflect-metadata@^0.2.2`, `rxjs@^7.8.1`, `zod@catalog:`, `@aws-sdk/s3-request-presigner@^3.1151.0`, `cache-manager@^7.2.9`, `file-type@^22.1.1`, `ioredis@^6.0.0`, `jose@^6.2.12`, `@nestjs/bullmq@^12.0.0`, `@nestjs/cache-manager@^12.0.1`, `nestjs-cls@^7.0.1`, `@nestjs-cls/transactional-adapter-typeorm@^2.0.1`, `nestjs-pino@^5.3.1`, `@nestjs/platform-socket.io@^12.1.3`, `@nestjs/terminus@^12.1.0`, `@nestjs/throttler@^6.7.1`, `pg@^8.23.1`, `pino@^10.4.0`, `pino-http@^11.0.0`, `sharp@^0.35.5`, `@socket.io/redis-adapter@^8.3.0`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **What connects `./tsconfig.json` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `scripts` to `server/package.json`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/common` connect `Providers` to `server/package.json`, `dependencies`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Should `Providers` be split into smaller, more focused modules?**
  _Cohesion score 0.14624505928853754 - nodes in this community are weakly interconnected._