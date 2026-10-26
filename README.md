# sowa-chat

## Подготовка окружения

### Что установить

| Инструмент | Версия | Зачем |
|---|---|---|
| Node.js | 24+ | сборка и запуск |
| pnpm | 12 (версия закреплена в `packageManager`) | менеджер пакетов монорепо |
| Docker | любая актуальная | PostgreSQL, Valkey и SeaweedFS для разработки (`pnpm infra:up`), e2e-тесты на Testcontainers |
| Python | 3.10+ | нужен для uv и Graphify |
| uv | любая актуальная | установка Graphify |
| Graphify (`graphifyy`) | 0.9.95 | граф кода для Claude Code |

### Шаги

1. Зависимости проекта. Вместе с ними ставится CLI Context7 (`ctx7`), отдельно его ставить не нужно:

   ```bash
   pnpm install
   ```

2. uv и Graphify:

   ```bash
   python -m pip install --user uv
   python -m uv tool install graphifyy==0.9.95
   python -m uv tool update-shell
   ```

   После `update-shell` перезапустите терминал и проверьте, что команда доступна: `graphify --version`.

3. Context7 работает без ключа, но с меньшими лимитами. Для больших лимитов войдите один раз:

   ```bash
   pnpm exec ctx7 login
   ```

   Или задайте переменную окружения `CONTEXT7_API_KEY`. Ключ в репозиторий не коммитится.

### Как это работает в проекте

- **Graphify.** Граф кода лежит в `graphify-out/` и коммитится. Хук `pre-commit` пересобирает его и добавляет в коммит. Без установленного Graphify хук пропускает этот шаг с предупреждением, а хуки Claude Code перед поиском по коду будут выдавать ошибку, поэтому лучше установить.
- **Context7.** Claude Code берёт через него актуальную документацию библиотек (`pnpm exec ctx7 library …`, `pnpm exec ctx7 docs …`).
