# EPIC-4 / TASK-2. Четыре HTTP-сервера на портах зон, закрытие при остановке приложения

Исполнитель: sonnet
Зависит от: TASK-1
Владеет: apps/server/src/infra/zones/zone-servers.ts, apps/server/src/infra/zones/zones.module.ts, apps/server/src/infra/zones/zone-servers.spec.ts, apps/server/src/api-app.ts, apps/server/src/api.module.ts, apps/server/src/main.ts, apps/server/test/support/zone-probe.ts, apps/server/test/server-modes.e2e-spec.ts
Ветка: feature/EPIC-4

## Что сделать

Режим `api` слушает четыре порта, по одному на зону: одно Nest-приложение, один Express-инстанс, четыре HTTP-сервера Node. Это рецепт из FAQ Nest «Multiple servers». Сейчас `runApi` в `main.ts` делает `app.listen(ports.public)` — это заменяется.

1. `apps/server/src/infra/zones/zone-servers.ts` — провайдер `ZoneServers` (`@Injectable()`, `implements OnApplicationShutdown`):
   - в конструктор внедряется `@Inject(portsConfig.KEY) ports: ConfigType<typeof portsConfig>`;
   - `async listen(app: INestApplication): Promise<void>` — по очереди для каждой зоны из `apiZones` создаёт `createServer(app.getHttpAdapter().getInstance<RequestListener>())` из `node:http` и запускает `server.listen(ports[zone])` без указания хоста. Ждёт событие `listening`; при событии `error` (например, порт занят) промис отклоняется этой ошибкой. Каждый запущенный сервер сохраняется в `Map<ApiZone, Server>` сразу после запуска;
   - `getServer(zone: ApiZone): Server | undefined` — сервер зоны. Нужен позже, чтобы подключить Socket.IO к публичному и операторскому серверам;
   - `async onApplicationShutdown(): Promise<void>` — закрывает все сохранённые серверы (`server.close(callback)`, ждёт все) и очищает `Map`.
2. `apps/server/src/infra/zones/zones.module.ts` — `ZonesModule`: `providers: [ZoneServers]`, `exports: [ZoneServers]`. Подключить в `imports` у `ApiModule` (`apps/server/src/api.module.ts`).
3. `apps/server/src/api-app.ts` — общая настройка приложения `api` для `main.ts` и тестов:

   ```ts
   export function configureApiApp(app: INestApplication): void {
     useClsMiddleware(app);
     app.useLogger(app.get(Logger));
   }
   ```

   `Logger` — из `nestjs-pino`. Функция вызывается до `app.init()`: следующие задачи эпика добавят сюда версионирование и глобальный guard, а их нужно ставить до инициализации.
4. `runApi` в `main.ts`:

   ```ts
   const app = await NestFactory.create(ApiModule, { bufferLogs: true });
   configureApiApp(app);
   await app.init();
   await app.get(ZoneServers).listen(app);
   ```

   Ненужный больше импорт `portsConfig` из `main.ts` убрать. Остальные режимы не трогать.
5. Обработку SIGTERM (`enableShutdownHooks`) не добавлять: задача корректной остановки отклонена разработчиком (EPIC-2 TASK-4). Серверы закрываются в lifecycle-хуке, поэтому закроются при любом `app.close()`, в том числе когда хуки остановки включат.
6. Тестовый помощник `apps/server/test/support/zone-probe.ts` — его используют тесты TASK-2, TASK-3 и TASK-4:

   ```ts
   export interface ZoneProbeApp { app: INestApplication; ports: ZonePorts }
   export async function startZoneProbeApp(controllers: Type[]): Promise<ZoneProbeApp>
   ```

   Шаги: четыре свободных порта через `findFreePort()` из `test/support/e2e-server.ts`; `stubTestEnv({ SOWA_PUBLIC_PORT, SOWA_OPERATOR_PORT, SOWA_INTERNAL_PORT, SOWA_MANAGEMENT_PORT })` из `test/support/unit-probe.ts`; `vi.resetModules()` и динамический импорт `src/api.module.js`, `src/api-app.js`, `src/infra/zones/zone-servers.js` — по образцу `createProbeApp`; `Test.createTestingModule({ imports: [ApiModule], controllers }).compile()`, `createNestApplication({ bufferLogs: true })`, `configureApiApp(app)`, `await app.init()`, `await app.get(ZoneServers).listen(app)`.
7. Правило для тестов этой и следующих задач эпика: тестовые контроллеры помечать `@Zone(<зона>)`, а контроллеры с путями без версии — ещё и `version: VERSION_NEUTRAL` в `@Controller({ path, version })`. Тогда тесты не сломаются, когда TASK-3 включит `/v1`, а TASK-4 — guard зон. `createProbeApp` не менять: тесты логов работают без зон.

## Где

- `apps/server/src/main.ts` — `runApi`.
- `apps/server/src/api.module.ts` — импорт `ZonesModule`.
- `apps/server/src/api-app.ts` — новый файл.
- `apps/server/src/infra/zones/zone-servers.ts`, `apps/server/src/infra/zones/zones.module.ts` — новые файлы. Список зон и `ZonePorts` — из `zone.ts` (TASK-1).
- `apps/server/test/support/zone-probe.ts` — новый тестовый помощник.
- Тесты: `apps/server/src/infra/zones/zone-servers.spec.ts`; e2e — существующий `apps/server/test/server-modes.e2e-spec.ts`.

## Требования из плана

| Порт по умолчанию | Зона | Что на нём доступно |
|---|---|---|
| 8080 | публичная | `/v1/visitor/*`, WS `/v1/ws` → `/visitor` |
| 8081 | операторская | `/v1/operator/*`, WS `/v1/ws` → `/operator` |
| 8082 | внутренняя | `/v1/server/*`, `/v1/bot/*` |
| 9090 | служебная | `/health/*`, `/metrics`, `/status` |

- Зоны обеспечивает сам сервис, а не только настройка сети: каждая зона слушает свой порт.
- WebSocket появится позже на публичном и операторском портах: решение не должно мешать подключить Socket.IO к нужным серверам — для этого `getServer(zone)`.

## Документация

- https://docs.nestjs.com/faq/multiple-servers
- https://docs.nestjs.com/fundamentals/lifecycle-events

## Критерии приёмки

- После `startZoneProbeApp` на каждом из четырёх портов тестовый контроллер зоны этого порта (`@Zone(<зона>)`, `VERSION_NEUTRAL`, путь `zone-probe/<зона>`) отвечает 200.
- `getServer(zone)` для каждой зоны возвращает сервер, у которого `address().port` равен порту этой зоны.
- После `app.close()` подключение к каждому из четырёх портов отклоняется (`ECONNREFUSED`).
- Если порт одной из зон занят другим сервером, `listen` отклоняется ошибкой с `code` `EADDRINUSE`.
- E2e: собранный `api` отвечает 404 на неизвестный путь на каждом из четырёх портов (расширить тест «api отвечает по HTTP 404 на неизвестный путь» в `server-modes.e2e-spec.ts`).

## Чего не делать

- Не делать guard зон и версионирование — это TASK-4 и TASK-3.
- Не добавлять `enableShutdownHooks` и обработку сигналов.
- Не импортировать `express` напрямую: его нет в зависимостях, Express-инстанс берётся через `app.getHttpAdapter().getInstance()`.

## История доработок

—
