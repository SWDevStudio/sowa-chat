# EPIC-4. Решения

## 28.10.2026, разбивка эпика

- Было 3 задачи, стало 4: список зон, декоратор и `zoneOfPort` вынесены в отдельную задачу на haiku (TASK-1), остальные задачи опираются на неё. Версия `/v1` (TASK-3) теперь зависит от TASK-1 и TASK-2: она правит тот же `api-app.ts` и проверяется через тестовый помощник TASK-2.
- Ревью: opus. Зоны — граница доступа (PLAN.md, раздел 15), а эпикам с безопасностью и доступом ставится opus. Предложение по разбивке ставило sonnet.

## 28.10.2026, TASK-1–4. Код зон в `apps/server/src/infra/zones/`

Декоратор `@Zone` нужен и контроллерам `api/*`, и служебным контроллерам в `infra` (health, metrics, status — EPIC-6). `infra` — нижний слой, на него могут опираться все. Автоматической проверки слоёв в репозитории нет (EPIC-2 TASK-5 отклонена).

## 28.10.2026, TASK-1. Внутренние имена зон

`@Zone` — имя из плана. Остальные имена — внутренние имена сервера, в публичный API не входят:

- значения зон `public`, `operator`, `internal`, `management` — совпадают с ключами `portsConfig`;
- `apiZones`, `ApiZone`, `ZonePorts`, `zoneOfPort(ports, port)`, `zoneMetadataKey = "zone"`.

## 28.10.2026, TASK-1. `@Zone` на `SetMetadata` с постоянным ключом

`Reflector.createDecorator` создаёт случайный ключ при каждой загрузке модуля. Тесты загружают модули сервера заново (`vi.resetModules()`), и guard не увидел бы зону контроллера из теста. Зона метода важнее зоны класса (`getAllAndOverride`).

## 28.10.2026, TASK-2. Четыре сервера по рецепту FAQ Nest

- Один Express-инстанс, четыре `http.createServer` на порты зон, `app.listen` не используется. Серверы держит провайдер `ZoneServers` и закрывает их в `onApplicationShutdown`. `getServer(zone)` — чтобы эпик WebSocket подключил Socket.IO к публичному и операторскому серверам.
- Зона запроса определяется по `request.socket.localPort`: порты зон разные, это проверяет схема конфига.
- Критерий «после SIGTERM процесс выходит с кодом 0» снят: обработка SIGTERM — это отклонённая EPIC-2 TASK-4. Задача гарантирует закрытие четырёх серверов при `app.close()`; если позже включат `enableShutdownHooks`, серверы закроются по сигналу сами.
- `configureApiApp(app)` в `apps/server/src/api-app.ts` — общая настройка `api` для `main.ts` и тестов, вызывается до `app.init()`. Тестовый помощник `startZoneProbeApp` в `apps/server/test/support/zone-probe.ts`. `createProbeApp` не меняется: тесты логов не зависят от зон.

## 28.10.2026, TASK-4. Guard зон

- Регистрация через `app.useGlobalGuards(new ZoneGuard(reflector, ports))` в `configureApiApp`, а не `APP_GUARD`: иначе тестовые приложения логов без `@Zone` и без портов зон получили бы 404 на всех маршрутах.
- 404 чужой зоны — `` NotFoundException(`Cannot ${method} ${originalUrl}`) ``: тот же текст, что у Nest для неизвестного маршрута.
- Контекст не `http` guard отклоняет. Эпик WebSocket добавит в этот же guard проверку подключений.
- Для следующих эпиков: маршруты, которые регистрируются в Express напрямую, мимо контроллеров (например, Swagger UI через `SwaggerModule.setup`), guard не проходят и видны на всех четырёх портах. Эпик, который их добавляет, ограничивает их порт сам.
