# Правила для ИИ-агента

- Перед любой работой сначала задавай уточняющие вопросы: что именно сделать, каким способом, какими инструментами и в каком объёме. Начинай только после ответов, даже если задача кажется понятной.
  - Исключение — процесс эпика (`/epic N`, скилл `.claude/skills/epic/SKILL.md`). Команда уже ответ на вопросы: менеджер останавливается только в точках остановки процесса, а субагенты не спрашивают, а возвращают вопросы в ответе.
- Комментарии в коде и конфигах не пиши. Исключение — разработчик явно попросил комментарий для решения конкретной задачи.
- Важные правила работы записывай в этот файл, а не в память агента: субагенты память не видят.
- Не коммить, пока разработчик прямо не сказал закоммитить именно эти изменения. Просьба поправить, исправить или слить — не просьба коммитить. Разрешение на один коммит не переносится на следующие правки. Исключение — коммит задачи в процессе эпика после согласия разработчика на её результат. Субагент получает задание на коммит только после согласия разработчика, поэтому такое задание и есть согласие.

## Процесс эпиков

- Задачи лежат в `tasks/`: индекс эпиков и описание процесса — `tasks/README.md`, у эпика — `README.md` и файлы `TASK-M.md`.
- Эпик запускается и продолжается командой `/epic N`. Участники: менеджер (основная сессия), `epic-tester`, `epic-worker`, `backend-reviewer`.

## Читаемость кода

Читаемость — главное правило: разработчик сам сопровождает код, и код, который не читается с первого взгляда, ему не подходит. Комментарии запрещены, поэтому код должен объяснять себя сам.

- Простой вариант лучше хитрого или компактного.
- Понятные имена, маленькие функции, ранний `return`.
- Без длинных цепочек, вложенных тернарных операторов и необычных конструкций, которые обычно никто не пишет.
- Без god-функций и god-объектов.
- На ревью нечитаемый код — настоящее замечание, а не придирка.

## Библиотеки

- Если для задачи есть официальный пакет Nest (`@nestjs/throttler`, `@nestjs/event-emitter`, `@nestjs/cache-manager`, `@nestjs/terminus`, `@nestjs/typeorm` и т. п.), используется он: это основной путь из документации.
- Свои замены библиотекам не писать.
- Отступать от официального пакета можно, только если он не выполняет требование плана, и с обоснованием. Принятые исключения: `jose` вместо `@nestjs/jwt` (jsonwebtoken не умеет EdDSA), `nestjs-cls` для транзакций (официального нет, рецепт Nest с ALS ссылается на него), job schedulers BullMQ вместо `@nestjs/schedule` (cron запускался бы в каждой реплике).

## Дизайн публичного API

- Методы, которые принимают что-то похожее на сообщение, всегда принимают один объект: `reply({ text })`, а не `reply('text')`. Перегрузок вида `string | Input` нет.
- Все SDK (посетителя, оператора, бота) похожи друг на друга: одно действие — одно имя метода. Общие возможности — в небольших общих интерфейсах, чтобы расхождения ловил компилятор.
- camelCase везде: код, JSON API, query-параметры, имена событий, значения enum, поля логов. snake_case только в БД, переменные окружения — UPPER_SNAKE.
- Данные, которые передаёт интегратор (`context`, `visitorData`, свой `payload`), сырые и непроверенные: тип `JsonObject`, без схем на сервере. Доверять можно только identity из JWT.
- Публичные имена (методы SDK, события) на ходу не придумывать: интерфейсы пакетов согласуются с разработчиком отдельно.

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
