# Правила для ИИ-агента

- Перед любой работой сначала задавай уточняющие вопросы: что именно сделать, каким способом, какими инструментами и в каком объёме. Начинай только после ответов, даже если задача кажется понятной.
- Комментарии в коде и конфигах не пиши. Исключение — разработчик явно попросил комментарий для решения конкретной задачи.

## Импорты и barrel-файлы

- Пакеты `packages/*`: публичный API — только через точки входа из `exports` в `package.json`. У каждой точки входа свой `index.ts` с реэкспортами (barrel). Чего нет в `index.ts`, то внутреннее.
- Другие пакеты импортируются только через их точки входа (`@sowa-chat/protocol`, `@sowa-chat/sdk/visitor`), а не вглубь. Node такой импорт и не пропустит: `ERR_PACKAGE_PATH_NOT_EXPORTED`.
- Внутри пакета — прямые импорты конкретных файлов (`./core/store.js`). Из собственного `index.ts` не импортировать: так появляются циклы.
- `apps/server` (Nest): barrel-файлы для модулей и провайдеров не используем — документация Nest запрещает их из-за циклических зависимостей. Импорт напрямую из файлов.
- Циклы импортов ловит oxlint (`import/no-cycle`).

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.
