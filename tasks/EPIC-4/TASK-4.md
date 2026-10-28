# EPIC-4 / TASK-4. Глобальный guard зон: чужая зона и маршрут без зоны отвечают 404

Исполнитель: sonnet
Зависит от: TASK-1, TASK-2
Владеет: apps/server/src/infra/zones/zone.guard.ts, apps/server/src/infra/zones/zone.guard.spec.ts, apps/server/src/api-app.ts, apps/server/test/support/zone-probe.ts
Ветка: feature/EPIC-4

## Что сделать

Глобальный guard сверяет зону маршрута с портом, на который пришёл запрос. Маршрут доступен только на порту своей зоны; на чужом порту и без `@Zone` он отвечает так же, как несуществующий маршрут.

1. `apps/server/src/infra/zones/zone.guard.ts` — класс `ZoneGuard implements CanActivate`:
   - конструктор `(reflector: Reflector, ports: ZonePorts)`; guard создаётся вручную, `@Injectable()` не нужен;
   - если `context.getType() !== "http"` — вернуть `false`. Подключения WebSocket этот guard научит проверять эпик WebSocket; до тех пор всё, что не HTTP, закрыто;
   - зона маршрута: `reflector.getAllAndOverride<ApiZone | undefined>(zoneMetadataKey, [context.getHandler(), context.getClass()])` — зона метода важнее зоны класса;
   - зона запроса: `zoneOfPort(ports, request.socket.localPort)`, где `request` — `context.switchToHttp().getRequest<Request>()` (`import type { Request } from "express"`);
   - если зоны маршрута нет или она не равна зоне запроса — `` throw new NotFoundException(`Cannot ${request.method} ${request.originalUrl}`) ``. Это тот же текст, который Nest отдаёт для неизвестного маршрута, поэтому тело ответа совпадает;
   - иначе вернуть `true`.
2. В `configureApiApp` (`apps/server/src/api-app.ts`) зарегистрировать guard:

   ```ts
   const ports = app.get<ConfigType<typeof portsConfig>>(portsConfig.KEY);
   app.useGlobalGuards(new ZoneGuard(app.get(Reflector), ports));
   ```

   Именно `useGlobalGuards` в `configureApiApp`, а не `APP_GUARD` в модуле: `createProbeApp` (тесты логов) собирает `ApiModule` без зон и портов, и `APP_GUARD` закрыл бы все его маршруты.
3. Тесты — через `startZoneProbeApp` из `apps/server/test/support/zone-probe.ts`, запросы на реальные порты зон. Помощник можно дополнять, не меняя его сигнатуру.

## Где

- `apps/server/src/infra/zones/zone.guard.ts` — новый файл. `zoneMetadataKey` — из `zone.decorator.ts`, `zoneOfPort` — из `zone-of-port.ts`, `ApiZone` и `ZonePorts` — из `zone.ts` (TASK-1).
- `apps/server/src/api-app.ts` — регистрация guard.
- Тест: `apps/server/src/infra/zones/zone.guard.spec.ts`.

## Требования из плана

- Контроллеры и WS-namespace помечены зоной (`@Zone('operator')`). Глобальный guard сверяет зону маршрута с портом, на который пришёл запрос, и на чужом порту отвечает 404, будто маршрута нет. Тот же guard позже ставится на подключения WebSocket.
- Если DevOps по ошибке опубликует наружу «порт сервиса», это будет публичный порт: операторская и внутренняя зоны через него недоступны.
- Закрытая сеть — второй слой защиты, а не замена аутентификации.
- Маршрут без зоны недоступен ни на одном порту: забытый декоратор не должен открывать маршрут всем.

## Документация

- https://docs.nestjs.com/guards
- https://docs.nestjs.com/fundamentals/execution-context
- https://docs.nestjs.com/exception-filters#built-in-http-exceptions

## Критерии приёмки

- Тестовый маршрут `@Zone('operator')` отвечает 200 только на операторском порту, а на публичном, внутреннем и служебном — 404.
- Статус и тело ответа для маршрута чужой зоны совпадают со статусом и телом ответа для несуществующего маршрута с тем же методом и путём на том же порту.
- Маршрут контроллера без `@Zone` отвечает 404 на всех четырёх портах.
- Метод с `@Zone('management')` в контроллере с `@Zone('operator')` отвечает 200 на служебном порту и 404 на операторском.
- Unit-тест: для контекста с типом не `http` `canActivate` возвращает `false`.

## Чего не делать

- Не делать проверку зоны для WebSocket — это эпик WebSocket.
- Не менять `createProbeApp` и тесты логов.

## История доработок

—
