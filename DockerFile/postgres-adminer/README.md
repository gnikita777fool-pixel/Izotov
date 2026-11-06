# 1. PostgreSQL + Adminer

## Структура проекта

```text
postgres-adminer/
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

<img width="1875" height="184" alt="1" src="https://github.com/user-attachments/assets/8e28d4a7-e214-4aa9-8832-fce267241fcc" />

## docker-compose.yml

```yaml
services:
  postgres:
    build: .
    container_name: postgres_adminer_db
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  adminer:
    image: adminer:latest
    container_name: adminer
    ports:
      - "8080:8080"
    depends_on:
      - postgres

volumes:
  postgres_data:
```
<img width="1876" height="456" alt="2" src="https://github.com/user-attachments/assets/19d8428e-8710-4160-89f2-2f840ba2cc75" />

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
<img width="1889" height="201" alt="4" src="https://github.com/user-attachments/assets/d3407a8d-2c6c-4373-b63d-248336f686c8" />

## Запуск

Перейти в директорию проекта:

```bash
cd postgres-adminer
```

Запустить контейнеры:

```bash
docker compose up --build
```
<img width="1757" height="412" alt="3" src="https://github.com/user-attachments/assets/a2bee86d-fbb6-4238-9787-921f2250dee2" />

После запуска Adminer будет доступен по адресу:

```text
http://localhost:8080
```

## Данные для подключения

В Adminer необходимо указать:

| Параметр | Значение   |
| -------- | ---------- |
| System   | PostgreSQL |
| Server   | postgres   |
| Username | admin      |
| Password | admin123   |
| Database | appdb      |

<img width="2553" height="1282" alt="5" src="https://github.com/user-attachments/assets/e0ccf345-e9d4-45aa-bc68-08b5abff6a98" />

