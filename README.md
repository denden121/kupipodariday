# КупиПодариДай

Сервис вишлистов «КупиПодариДай» — бэкенд на NestJS, фронтенд на React, БД PostgreSQL.

## Адреса

IP адрес 62.84.124.28
Frontend https://kupipodariday.nomorepartiessite.ru
Backend https://api.kupipodariday.nomorepartiessite.ru

## Запуск локально

Скопируйте `.env.example` в `.env` и заполните переменные:

```bash
cp .env.example .env
```

Запустите все сервисы через Docker Compose:

```bash
docker-compose up -d
```

После запуска:
- Фронтенд: http://localhost:8081
- Бэкенд: http://localhost:4000

## Переменные окружения

| Переменная | Описание |
|---|---|
| `POSTGRES_HOST` | Хост БД (в docker-compose: `database`) |
| `POSTGRES_PORT` | Порт БД (по умолчанию `5432`) |
| `POSTGRES_USER` | Имя пользователя PostgreSQL |
| `POSTGRES_PASSWORD` | Пароль пользователя PostgreSQL |
| `POSTGRES_DB` | Название базы данных |
| `PGDATA` | Директория с данными PostgreSQL |
| `JWT_SECRET` | Секрет для JWT токенов |
| `PORT` | Порт бэкенда (по умолчанию `4000`) |
| `REACT_APP_API_URL` | URL бэкенда для сборки фронтенда |
