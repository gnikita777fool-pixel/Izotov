# 2. PostgreSQL + pgAdmin

## Структура проекта

```text
postgres-pgadmin/
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
<img width="1879" height="162" alt="3" src="https://github.com/user-attachments/assets/947febfe-ae1a-4eff-9c6f-7434c71f0fd8" />

## docker-compose.yml

```yaml
services:
  postgres:
    build: .
    container_name: postgres_pgadmin_db
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin123
    ports:
      - "5433:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@example.com
      PGADMIN_DEFAULT_PASSWORD: admin123
    ports:
      - "8081:80"
    depends_on:
      - postgres
    volumes:
      - pgadmin_data:/var/lib/pgadmin

volumes:
  postgres_data:
  pgadmin_data:
```
<img width="1861" height="558" alt="2" src="https://github.com/user-attachments/assets/40846a81-7983-4943-9fa1-ab2265c7cc0d" />

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
<img width="1879" height="200" alt="4" src="https://github.com/user-attachments/assets/062a07ed-5a69-4d63-9572-9d1d803b6a77" />

## Запуск

Перейти в директорию проекта:

```bash
cd postgres-pgadmin
```

Запустить контейнеры:

```bash
docker compose up --build
```
<img width="1760" height="137" alt="1" src="https://github.com/user-attachments/assets/001ff7cf-9655-4ba7-a761-cdd65dd4c555" />

После запуска pgAdmin будет доступен по адресу:

```text
http://localhost:8081
```

## Вход в pgAdmin

Использовать следующие данные:

| Параметр | Значение                                      |
| -------- | --------------------------------------------- |
| Email    | [admin@example.com](mailto:admin@example.com) |
| Password | admin123                                      |

<img width="2545" height="1265" alt="5" src="https://github.com/user-attachments/assets/aafd3796-8f7d-4520-9ddc-56391380f4d1" />

## Подключение PostgreSQL

После входа в pgAdmin необходимо создать подключение к PostgreSQL.

| Параметр | Значение |
| -------- | -------- |
| Host     | postgres |
| Port     | 5432     |
| Database | appdb    |
| Username | admin    |
| Password | admin123 |

<img width="2542" height="1272" alt="6" src="https://github.com/user-attachments/assets/883d0ee5-84ed-41dd-bd30-fc199514eb1f" />
<img width="2548" height="1267" alt="7" src="https://github.com/user-attachments/assets/70448299-8119-4c55-a64b-698c26c27e9a" />

> **Важно:** внутри Docker-сети используется имя сервиса `postgres` и порт `5432`.
>
> Порт `5433` используется только для подключения к PostgreSQL с компьютера пользователя.
