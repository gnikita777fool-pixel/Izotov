Это задание представляет собой практическую работу по созданию, использованию и администрированию представлений (VIEW) в MySQL с использованием Docker. По итогу у вас должен получиться каталог с тремя файлами: `README.md`, `dump.sql` и `my_actions.log`.

Ниже представлена подробная пошаговая инструкция, как выполнить всё задание от начала до конца.

---

### ЭТАП 1. Подготовка окружения (Docker и конфигурация)

**1. Создайте рабочую папку** (например, `my-mysql`) и перейдите в неё через терминал (Git Bash или PowerShell).

**2. Создайте файл `my.cnf`** в этой папке. Откройте его в любом текстовом редакторе (например, VS Code или Notepad++) и вставьте следующий код.
⚠️ *Важно: сохраните файл в кодировке **UTF-8 без BOM** и с переносами строк **LF** (в Notepad++ это меню «Кодировки» -> «Преобразовать в UTF-8» и «Формат EOL» -> «Unix (LF)»).*

```ini
[mysqld]
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
general_log = 1
general_log_file = /var/lib/mysql/general.log
log_output = FILE

[client]
default-character-set = utf8mb4

[mysql]
default-character-set = utf8mb4
```

**3. Запустите контейнер с MySQL.**
*Если у вас уже есть контейнер `my-mysql`, удалите его:*
```bash
docker stop my-mysql
docker rm my-mysql
```

*Создайте новый контейнер (выберите команду под вашу ОС):*

**Для Git Bash (Linux/Mac/Windows Git Bash):**
```bash
docker run --name my-mysql \
  -e MYSQL_ROOT_PASSWORD=123 \
  -e LANG=C.UTF-8 \
  -e MYSQL_INITDB_SKIP_TZINFO=1 \
  -v mysql_data:/var/lib/mysql \
  -v $(pwd)/my.cnf:/etc/mysql/conf.d/my.cnf \
  -d mysql:8.0
```

**Для Windows PowerShell:**
```powershell
docker run --name my-mysql `
  -e MYSQL_ROOT_PASSWORD=123 `
  -e LANG=C.UTF-8 `
  -e MYSQL_INITDB_SKIP_TZINFO=1 `
  -v mysql_data:/var/lib/mysql `
  -v ${PWD}/my.cnf:/etc/mysql/conf.d/my.cnf `
  -d mysql:8.0
```

**4. Подключитесь к базе данных.**
Подождите 15-20 секунд, пока MySQL инициализируется. Затем очистите лог (чтобы в него попали только ваши действия) и войдите в консоль:
```bash
docker exec my-mysql sh -c ': > /var/lib/mysql/general.log'
docker exec -it my-mysql mysql --default-character-set=utf8mb4 -uroot -p
```
*Введите пароль: `123`*

---

### ЭТАП 2. Создание БД, таблиц и заполнение данными

Находясь в консоли MySQL (`mysql>`), выполните следующий блок SQL-кода (можно скопировать и вставить целиком):

```sql
-- 1. Создание БД и выбор её
CREATE DATABASE sql_practice CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sql_practice;

-- 2. Создание таблиц
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    city VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'new',
    FOREIGN KEY (customer_id) REFERENCES customers(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 3. Заполнение данными
INSERT INTO customers (name, email, city) VALUES
  ('Иван Иванов', 'ivan@example.com', 'Москва'),
  ('Пётр Петров', 'petr@example.com', 'Санкт-Петербург'),
  ('Мария Сидорова', 'maria@example.com', 'Москва'),
  ('Алексей Смирнов', 'alex@example.com', 'Казань'),
  ('Ольга Кузнецова', 'olga@example.com', 'Новосибирск');

INSERT INTO orders (customer_id, order_date, amount, status) VALUES
  (1, '2026-10-01', 1500.00, 'paid'),
  (1, '2026-10-05', 2300.50, 'paid'),
  (2, '2026-10-03', 800.00, 'new'),
  (3, '2026-10-07', 4200.00, 'paid'),
  (3, '2026-10-10', 1100.00, 'cancelled'),
  (4, '2026-10-12', 950.00, 'new');
```

---

<img width="1877" height="1136" alt="image" src="https://github.com/user-attachments/assets/396828e7-6d1b-41d4-9f47-968e091f4bcc" />


### ЭТАП 3. Практика с представлениями (VIEW)

Выполните эти команды в консоли MySQL. Они создадут нужные VIEW, проверят их работу и создадут тестового пользователя для разграничения прав.

```sql
-- 1. Простейшее представление (фильтрация)
CREATE VIEW moscow_customers AS
SELECT id, name, email
FROM customers
WHERE city = 'Москва';

SELECT * FROM moscow_customers;

-- 2. Представление с JOIN и агрегацией
CREATE VIEW customer_summary AS
SELECT c.id, c.name, c.city,
       COUNT(o.id) AS order_count,
       COALESCE(SUM(o.amount), 0) AS total_amount
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name, c.city;

SELECT * FROM customer_summary ORDER BY total_amount DESC;

-- 3. Обновляемое представление и WITH CHECK OPTION
CREATE OR REPLACE VIEW moscow_customers AS
SELECT id, name, email, city
FROM customers
WHERE city = 'Москва'
WITH CHECK OPTION;

-- 4. Скрытие данных (представление для аналитика без email)
CREATE VIEW public_customers AS
SELECT id, name, city FROM customers;

-- 5. Создание пользователя и выдача прав ТОЛЬКО на VIEW
CREATE USER 'analyst'@'%' IDENTIFIED BY 'pass';
GRANT SELECT ON sql_practice.public_customers TO 'analyst'@'%';

-- 6. Просмотр созданных VIEW
SHOW FULL TABLES WHERE Table_type = 'VIEW';
```

*(Не забудьте выйти из MySQL командой `\q` или `exit`)*

<img width="1866" height="1056" alt="image" src="https://github.com/user-attachments/assets/e06e21aa-635e-4b76-a10d-711fd7646a82" />

---

### ЭТАП 4. Создание артефактов (Дамп и Лог)

Теперь, находясь в терминале (в папке `my-mysql`), нужно выгрузить результаты.

**1. Создайте дамп базы данных:**
```bash
docker exec -e MYSQL_PWD=123 my-mysql mysqldump -uroot sql_practice > dump.sql
```

<img width="776" height="58" alt="image" src="https://github.com/user-attachments/assets/470cae1c-39b7-427a-b160-268205881869" />

**2. Отфильтруйте лог, убрав служебные записи:**
```bash
docker exec my-mysql cat /var/lib/mysql/general.log \
  | grep "Query" \
  | grep -v -E "SET NAMES|SET autocommit|SET sql_mode|SET character_set_results|SHOW VARIABLES|SHOW STATUS|SHOW WARNINGS|SELECT @@|SELECT DATABASE\(\)|time_zone" \
  > my_actions.log
```

**3. Проверьте, что файлы появились:**
```bash
ls -la
```
*Вы должны увидеть `my.cnf`, `dump.sql`, `my_actions.log`.*

---
### ЭТПА 5. Где находится лог

Файл лога лежит внутри контейнера по пути `/var/lib/mysql/general.log`.

Проверить, что файл существует:

Покинуть контейнер:
```sql
\q
```
```shell
docker exec my-mysql ls -la /var/lib/mysql/ee5875b312e4.log
```
Заглянуть в него:
```shell
docker exec my-mysql cat /var/lib/mysql/ee5875b312e4.log
```
Забрать лог на хост:
```shell
docker cp my-mysql:/var/lib/mysql/ee5875b312e4.log ./my_actions.log
```
<img width="1879" height="1182" alt="image" src="https://github.com/user-attachments/assets/adfeff72-00ac-4813-a822-5135ef65736e" />
