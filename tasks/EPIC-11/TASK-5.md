# EPIC-11 / TASK-5. Переменные SOWA_INIT_* в конфиге

Исполнитель: haiku
Зависит от: TASK-4
Владеет: apps/server/src/infra/config/env.schema.ts, apps/server/src/infra/config/initial-project.config.ts, apps/server/src/infra/config/config.module.ts, apps/server/.env.example, apps/server/src/infra/config/env.schema.initial-project.spec.ts
Коммит: [SERVER]: add SOWA_INIT_* variables to config
Ветка: feature/EPIC-11

## Что сделать

Переменные первого проекта. Их читают проект `main` в development (TASK-7, только списки доменов) и первый проект в production (TASK-9). Здесь только разбор и конфиг; проверку формата ключа делает TASK-9 в слое `domain` (`parseKey` из `domain/keys/key-format.ts`): `infra` не импортирует `domain`.

1. `env.schema.ts`, в `envObjectSchema`:
   - `SOWA_INIT_PROJECT` — необязательная непустая строка: `z.preprocess((value) => (value === "" ? undefined : value), z.string().optional())`. Формат имени проверяет `ProjectsService` (`InvalidProjectNameError`), здесь не проверять.
   - `SOWA_INIT_SERVER_KEY` — так же, необязательная строка.
   - `SOWA_INIT_ALLOWED_ORIGINS`, `SOWA_INIT_OPERATOR_ALLOWED_ORIGINS` — список через запятую: функция `commaSeparatedList()` рядом с `optionalUrl()`; строка делится по `,`, каждая часть `trim()`, пустые части отбрасываются; переменная не задана или `""` → `[]`. Тип результата — `string[]`. Нормализацию origin делает `ProjectsService` (`normalizeOrigins`), здесь не делать.
   - Проверка в `superRefine` — функция `checkInitialServerKey(env, context)` после `checkTokenSigningKeyId`: если `SOWA_ENV` — `production`, `SOWA_INIT_PROJECT` задан, а `SOWA_INIT_SERVER_KEY` — `undefined`, issue `{ code: "custom", path: ["SOWA_INIT_SERVER_KEY"], message: "is required when SOWA_INIT_PROJECT is set" }`. В development `SOWA_INIT_PROJECT` и `SOWA_INIT_SERVER_KEY` не используются (проект всегда `main`, ключ генерируется), поэтому проверки там нет.

2. `initial-project.config.ts`, по образцу `encryption.config.ts`:

   ```ts
   export const initialProjectConfig = registerAs("initialProject", () => {
     const env = parseEnv(process.env);
     return {
       projectName: env.SOWA_INIT_PROJECT,
       serverKey: env.SOWA_INIT_SERVER_KEY,
       allowedOrigins: env.SOWA_INIT_ALLOWED_ORIGINS,
       operatorAllowedOrigins: env.SOWA_INIT_OPERATOR_ALLOWED_ORIGINS,
     };
   });
   ```

   Зарегистрировать в `load` у `AppConfigModule` (`config.module.ts`).

3. `apps/server/.env.example` — выключенные строки после `# SOWA_DEV_SECRETS_DIR=.sowa-dev`:

   ```
   # SOWA_INIT_PROJECT=main
   # SOWA_INIT_SERVER_KEY=<serverKey from sowa-chat key:generate>
   # SOWA_INIT_ALLOWED_ORIGINS=https://shop.example.com
   # SOWA_INIT_OPERATOR_ALLOWED_ORIGINS=https://admin.example.com
   ```

## Где

- `apps/server/src/infra/config/env.schema.ts`, `apps/server/src/infra/config/config.module.ts`, `apps/server/.env.example`.
- Новый файл `apps/server/src/infra/config/initial-project.config.ts`.
- Тест — новый файл `apps/server/src/infra/config/env.schema.initial-project.spec.ts` (`env.schema.spec.ts` уже около 300 строк). Образец — `apps/server/src/infra/config/encryption-keys.schema.spec.ts`: `envSchema.safeParse` для схемы и вызов `initialProjectConfig()` после `stubTestEnv` из `test/support/unit-probe.ts` и `vi.resetModules()`.

## Требования из плана

- Первый проект в production создаётся через env: DevOps генерируют ключ командой `sowa-chat key:generate`, кладут его в хранилище секретов и передают через `SOWA_INIT_PROJECT`, `SOWA_INIT_SERVER_KEY`, `SOWA_INIT_ALLOWED_ORIGINS`, `SOWA_INIT_OPERATOR_ALLOWED_ORIGINS`.

## Документация

- https://zod.dev/api#preprocess

## Критерии приёмки

- `SOWA_INIT_ALLOWED_ORIGINS=" https://a.example.com,,https://b.example.com , "` разбирается в `["https://a.example.com", "https://b.example.com"]`; без переменной и при `""` — `[]`; то же для `SOWA_INIT_OPERATOR_ALLOWED_ORIGINS`.
- В production `SOWA_INIT_PROJECT=main` без `SOWA_INIT_SERVER_KEY` не проходит с ошибкой `SOWA_INIT_SERVER_KEY: is required when SOWA_INIT_PROJECT is set`; с ключом проходит; в development без ключа проходит.
- `initialProjectConfig()` отдаёт `{ projectName, serverKey, allowedOrigins, operatorAllowedOrigins }` из env, без переменных — `{ projectName: undefined, serverKey: undefined, allowedOrigins: [], operatorAllowedOrigins: [] }`.

## Чего не делать

- Не проверять формат `sk_` в схеме и не создавать проект — это TASK-9.
- Не трогать `redact-paths.ts` — это TASK-9.

## История доработок

—
