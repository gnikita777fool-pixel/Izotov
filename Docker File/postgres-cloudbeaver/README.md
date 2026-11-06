# 3. PostgreSQL + CloudBeaver

## Структура проекта

```text
postgres-cloudbeaver/
├── Dockerfile
├── docker-compose.yml
└── init.sql
```

## Dockerfile

```dockerfile
FROM postgres:16

ENV POSTGRES_DB=appdb
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin123

COPY init.sql /docker-entrypoint-initdb.d/
```

## docker-compose.yml

```yaml
services:
  postgres:
    build: .
    container_name: postgres_cloudbeaver_db
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin123
    ports:
      - "5434:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  cloudbeaver:
    image: dbeaver/cloudbeaver:latest
    container_name: cloudbeaver
    ports:
      - "8082:8978"
    depends_on:
      - postgres
    volumes:
      - cloudbeaver_data:/opt/cloudbeaver/workspace

volumes:
  postgres_data:
  cloudbeaver_data:
```

## init.sql

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL
);

INSERT INTO users (name, email)
VALUES
    ('Ivan', 'ivan@example.com'),
    ('Anna', 'anna@example.com');
```

## Запуск

Перейти в директорию проекта:

```bash
cd postgres-cloudbeaver
```

Запустить контейнеры:

```bash
docker compose up --build
```

После запуска CloudBeaver будет доступен по адресу:

```text
http://localhost:8082
```

## Подключение PostgreSQL

В CloudBeaver необходимо создать новое подключение PostgreSQL:

| Параметр | Значение |
| -------- | -------- |
| Host     | postgres |
| Port     | 5432     |
| Database | appdb    |
| Username | admin    |
| Password | admin123 |

---

# 4. Проверка контейнеров

Для просмотра запущенных контейнеров используется команда:

```bash
docker ps
```

Для каждого проекта должны быть запущены два контейнера:

```text
PostgreSQL
Adminer / pgAdmin / CloudBeaver
```

Для просмотра логов:

```bash
docker compose logs
```

Для остановки контейнеров:

```bash
docker compose down
```

Для остановки контейнеров и удаления volumes:

```bash
docker compose down -v
```

> Команда `docker compose down -v` удаляет данные PostgreSQL, которые находятся в Docker volumes.

---
