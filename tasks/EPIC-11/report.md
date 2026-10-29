# Отчёт по EPIC-11. Режимы development и production

## Задачи

| № | Задача | Исполнитель | Тесты | Доработки |
|---|---|---|---|---|
| 1 | Генераторы секретов, реестр секретов и файл секретов development | sonnet | sonnet | нет |
| 2 | Начальный проект создаётся один раз при одновременном старте реплик | sonnet | opus | нет |
| 3 | Реестр проверок окружения и запуск проверок при старте `api` и `worker` | sonnet | sonnet | нет |
| 4 | Секреты development подставляются в конфиг при старте | sonnet | opus | нет |
| 5 | Переменные `SOWA_INIT_*` в конфиге | haiku | sonnet | нет |
| 6 | Переменные `SOWA_PUBLIC_URL` и `SOWA_S3_PUBLIC_URL`, адрес обязателен в production | sonnet | sonnet | нет; исполнитель добавил адрес ещё в `env.schema.visitor-sessions.spec.ts` (без него файл падал в production) |
| 7 | Проект `main` и его ключи при старте `api` в development | sonnet | sonnet | нет; `setUp()` стоит перед `startAllMicroservices()`, условие задачи («после `verifyAtStartup`, до `ZoneServers.listen`») выполнено |
| 8 | Остановка в production на http-адресах и секретах из `.env.example` | sonnet | sonnet | e2e «с примерным паролем `DATABASE_URL`» падал: контейнер теперь с паролем `sowa-test`, а `app.init()` подключается к БД раньше проверок; тестировщик создал в тесте роль `sowa_example_password` с паролем `sowa`. `test/support/environment-checks.ts` и `environment-checks.service.spec.ts` расширены ради `check-types` |
| 9 | Первый проект из `SOWA_INIT_*` при старте `api` в production | sonnet | opus | пятый аргумент-заглушка `apiKeys` в `initial-project.development.spec.ts` (решение менеджера по вопросу тестировщика) |
| 10 | Сводка в логе при старте `api` и `worker` | sonnet | sonnet | нет |
| 11 | Проверки Redis: `maxmemory-policy noeviction` и AOF | haiku | sonnet | нет |
| 12 | Проверки PostgreSQL: версия 18+ и права пользователя приложения | haiku | sonnet | нет |
| 13 | Ротация ключа шифрования и ключа подписи из текущего env | haiku | sonnet | нет |
| 14 | Команда `secrets:generate` без конфига, БД и Redis | sonnet | sonnet | нет |
| 15 | Команда `doctor`: все проверки окружения и отчёт | haiku | sonnet | e2e «Redis недоступен» зависал (после таймаута `waitForRedis` ioredis 6 остаётся в `reconnecting`, команды проверок висят): исполнитель sonnet выключил очередь команд на мёртвом клиенте; в тесте регулярка `[A-Za-z]+` не пропускала цифру в `s3PublicUrl`, haiku заменил на `[A-Za-z0-9]+` |

Решения и внутренние имена: [decisions.md](decisions.md).

## Задача review

Правки по замечаниям «стоит поправить» (sonnet):

- файл секретов development создаётся из временного файла с именем `secrets.json.<randomUUID>.tmp` через `linkSync`, при `EEXIST` второй процесс читает готовый файл; `completeFile` после записи перечитывает файл и берёт значения оттуда;
- проверки Redis глотают только `NOPERM` и `unknown command`, остальные ошибки доходят до `findProblems` и дают `check could not run`;
- `doctor` смягчает `redisConnection` общей функцией `softenForDevelopment` (экспортирована из `run-environment-checks.ts`), правило development больше не дублируется;
- `enableOfflineQueue = false` убрано из `waitForRedis` и перенесено в `doctor` (`failCommandsOnClosedClient`), `RedisModule` не затронут.

## Итоговый прогон

`final-check.mjs 11` дважды прошёл e2e (73 файла, 927 тестов), format, lint, types. Шаг unit в прогонах падал: первый раз три хрупких теста (`secrets-generate.command.spec.ts` читал `process.env` вне модуля конфигурации, `config-checks.spec.ts` и `redis-checks.spec.ts` ждали свои проверки в конце реестра, а после них добавились проверки PostgreSQL) — тесты исправлены; второй раз два теста на случайных портах зон (`SOWA_INTERNAL_PORT` совпал с `SOWA_MANAGEMENT_PORT`, `EADDRINUSE`) — нагрузочная нестабильность. Повтор `pnpm test` на тихой машине прошёл: server 100 файлов, 1798 тестов; protocol 236 тестов.

## Ревью (opus)

Блокирующих замечаний нет. Проверены: ключи и секреты не попадают в логи, ошибки и вывод; production не читает файл секретов; права файла `0600`, папка `0700`; advisory lock при создании начального проекта; динамические импорты в `main.ts` и `cli-runner.ts` не ломают `api`, `worker`, `migrate`. Исправлены пункты 1–5. Остались:

- **Ротация ключа подписи.** `SOWA_TOKEN_SIGNING_KEY_ID` переключается на новый `kid` сразу: при поэтапной выкатке обновлённые реплики подписывают токены ключом, которого ещё нет у старых. Так закреплено в `decisions.md`; нужна эксплуатационная документация о двухшаговой ротации (сначала добавить ключ, потом переключить `KEY_ID`).
- **Остаточное окно гонки файла секретов.** Если api и worker оба прочитали файл до записи первого, а второй перезаписал после перечитывания первого, ключи разойдутся. Окно узкое; полная защита нужна блокировка с ожиданием.
- `initial-project.service.ts`: тернарники `.length ? … : …` в литерале объекта (`originsOrDefault`); проверка «SOWA_INIT_SERVER_KEY is required» повторяет `checkInitialServerKey` и нужна только для сужения типа (сузить тип в `initialProjectConfig`); один класс держит два сценария (development и production); совпадение ключа проверяется по `toLookupPrefix`, точнее `apiKeys.verify(serverKey, "server")` и сравнение `projectId`.
- `secret-rotation.ts`: `?? []` никогда не срабатывает, а `Math.max()` дал бы `-Infinity`; `--rotate` не подгружает `.env` (при локальном запуске с `.env` будет `is not set: nothing to rotate`).
- Мелочи: строка `"secrets:generate"` задана дважды (`cli-runner.ts`, `secrets-generate.command.ts`); поле `logger: LogLevel[]` лучше назвать `logLevels`; тернарник и порядок объявлений в `startup-summary.config.ts`; имя `prepareProject` в `projects.service.ts` не говорит, что функция нормализует домены; поле `key?` в базовом вводе `api-keys.service.ts` нужно только серверному ключу; `postgres-checks.ts` без строки ответа даёт `NaN` и находку уровня `stop` (лучше бросить ошибку); в `pickFromFile` повторена проверка из `isSet`.

## Расхождения с текстом задач

- В TASK-15 написано, что при недоступном Redis проверки Redis дадут `check could not run`; сейчас так и есть для сетевых ошибок, а отказ в правах (`NOPERM`, `unknown command`) остаётся предупреждением `could not read …`.
- Начальный проект в production создаётся при каждом старте только если его ещё нет; существующий проект и его ключи не обновляются, при несовпадении ключа пишется предупреждение.

## Для следующих эпиков

- Новая проверка окружения добавляется в `registeredEnvironmentChecks` (порядок: настройки, Redis, PostgreSQL); тесты не должны проверять позицию «в конце списка».
- Тестовый PostgreSQL использует пароль `sowa-test`, пользователь и база остаются `sowa`.
- `test/support/production-env.ts` (`productionOverrides`) даёт окружение для e2e в production; `test/support/startup-server.ts` — запуск `api` и ожидание строк лога.
- e2e `secrets-generate-command.e2e-spec.ts` берёт собранный `dist`; на холодной сборке `beforeAll` (10 с) может упасть — прогреть сборку или поднять `hookTimeout`.
- Модули режимов и `config.module.js` в `main.ts` и `cli-runner.ts` подключаются динамически: новый статический импорт конфига в `main.ts` сломает `secrets:generate` без env.

## Ручные проверки

Нет.

## Журнал коммитов

См. `git log --oneline pipeline..feature/EPIC-11`.
