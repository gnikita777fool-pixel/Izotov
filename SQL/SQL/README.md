## Шаг 1. Проверка Docker

Открой Git Bash и проверь, работает ли Docker:

```
docker --version
```

Затем:

```
docker ps -a
```

Если Docker не запущен, открой Docker Desktop и дождись запуска Docker Engine.

[Pico C/C++ Development with Visual Studio Code (VS Code): A Development Container Approach! - element14 Community](https://images.openai.com/static-rsc-4/kdrYl6ZnLedXnTM9ZWOVuMjcVSMdnSzeaC57f0FJxc7sDzC8Fxx7iVMMw0k9IHPsOeG3ZRExzW2UMpPC_lJ3LTjIBcHBxELClLpdIfTD2RCi8hbv8E8VF3TOUoxkUNgI4NgoahjsZx_hKmMwTXipPHU8XrykYZD638UkN2mgur8?purpose=inline)

[community.element14.com](https://community.element14.com/products/raspberry-pi/b/blog/posts/pico-c-c-development-with-visual-studio-code-vs-code-a-development-container-approach?utm_source=chatgpt.com)

Важно: в исходном задании предлагается остановить все контейнеры и удалить неиспользуемые тома. Не рекомендую делать это без необходимости: можно потерять данные других проектов.

Для этого задания достаточно создать отдельный контейнер.

## Шаг 2. Создание папки проекта

В Git Bash выполни:

```
mkdir -p ~/my-mysql
cd ~/my-mysql
```

Проверь текущую директорию:

```
pwd
```

Теперь создай конфигурационный файл:

```
touch my.cnf
```

Открой его в Блокноте:

```
notepad my.cnf
```

Вставь следующий текст:

```

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

Сохрани файл и закрой Блокнот.

Для чего нужен этот файл?

- `utf8mb4` — поддержка русского языка и специальных символов.
- `utf8mb4_unicode_ci` — правила сравнения текстовых данных.
- `general_log = 1` — включение журнала SQL-команд.
- `general_log_file` — расположение файла журнала.

## Шаг 3. Запуск контейнера MySQL

Выполни команду:

```
MSYS_NO_PATHCONV=1 docker run --name my-mysql \
  -e MYSQL_ROOT_PASSWORD=123 \
  -e LANG=C.UTF-8 \
  -v mysql_data:/var/lib/mysql \
  -v "$(pwd -W)/my.cnf:/etc/mysql/conf.d/my.cnf" \
  -d mysql:8.0
```

Если Docker сообщает, что контейнер с именем my-mysql уже существует, сначала проверь его состояние командой docker ps -a.

Разберём параметры:

| Параметр                  | Назначение              |
| ------------------------- | ----------------------- |
| `--name my-mysql`         | Имя контейнера          |
| `MYSQL_ROOT_PASSWORD=123` | Пароль root             |
| `LANG=C.UTF-8`            | Локаль                  |
| `mysql_data`              | Том для хранения данных |
| `my.cnf`                  | Конфигурация MySQL      |
| `-d`                      | Запуск в фоне           |
| `mysql:8.0`               | Версия MySQL            |

Проверь, что контейнер запущен:

```
docker ps
```

В списке должен появиться контейнер `my-mysql`.

## Шаг 4. Проверка файлов базы данных

Выполни:

```
docker exec -it my-mysql ls -la /var/lib/mysql
```

Ты увидишь файлы и каталоги MySQL, например:

- `ibdata1`
- `mysql`
- `performance_schema`
- `sys`

Это внутренние файлы MySQL и InnoDB.

## Шаг 5. Подключение к MySQL

Выполни:

```
docker exec -it my-mysql mysql --default-character-set=utf8mb4 -uroot -p
```

Появится запрос:

```
Enter password:
```

Введи пароль:

```
123
```

Символы пароля при вводе отображаться не будут — это нормально.

Если подключение прошло успешно, появится приглашение:

```
mysql>
```

Подключение выполнено

Теперь все SQL-команды будем выполнять непосредственно внутри MySQL.

## Шаг 6. Просмотр баз данных

Введи:

```
SHOW DATABASES;
```

Появится список системных баз данных MySQL.

Например:

```
information_schema
mysql
performance_schema
sys
```

Это нормально. Пока пользовательских баз данных нет.

Получить справку по командам можно так:

```
help
```

## Шаг 7. Создание базы данных

Создадим базу `my_database` с поддержкой русского языка.

Выполни:

```
CREATE DATABASE my_database
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

Проверь создание:

```
SHOW DATABASES;
```

В списке должна появиться:

```
my_database
```

Теперь выбери эту базу:

```
USE my_database;
```

MySQL должен ответить:

```
Database changed
```

## Шаг 8. Создание таблицы users

Создадим таблицу для хранения пользователей.

Выполни:

```
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Что означает каждая колонка:

| Поле             | Назначение                    |
| ---------------- | ----------------------------- |
| `id`             | Уникальный номер пользователя |
| `name`           | Имя пользователя              |
| `email`          | Электронная почта             |
| `AUTO_INCREMENT` | Автоматическое увеличение ID  |
| `PRIMARY KEY`    | Первичный ключ                |
| `UNIQUE`         | Запрещает повторение email    |
| `NOT NULL`       | Запрещает пустое значение     |

Проверим, что таблица создана:

```
SHOW TABLES;
```

Должно появиться:

```
users
```

## Шаг 9. Добавление данных в таблицу

Добавим трёх пользователей:

```
INSERT INTO users (name, email) VALUES
('Иван Иванов', 'ivan@example.com'),
('Пётр Петров', 'petr@example.com'),
('Мария Сидорова', 'maria@example.com');
```

Проверим добавленные данные:

```
SELECT * FROM users;
```

Ожидаемый результат:

| id | name           | email              |
| -- | -------------- | ------------------ |
| 1  | Иван Иванов    | ivan\@example.com  |
| 2  | Пётр Петров    | petr\@example.com  |
| 3  | Мария Сидорова | maria\@example.com |

Данные добавлены

## Шаг 10. Просмотр данных

Попробуем несколько вариантов запросов.

1\. Вывести всю таблицу:

```
SELECT * FROM users;
```

2\. Вывести только имена:

```
SELECT name FROM users;
```

3\. Вывести имена и электронную почту:

```
SELECT name, email FROM users;
```

4\. Найти пользователя по ID:

```
SELECT * FROM users WHERE id = 1;
```

5\. Вывести одну запись в вертикальном формате:

```
SELECT * FROM users WHERE id = 1\G
```

## Шаг 11. Добавление новых пользователей

Добавим ещё двух пользователей:

```
INSERT INTO users (name, email)
VALUES ('Павел Иванов', 'pavel@example.com');

INSERT INTO users (name, email)
VALUES ('Марк Аврелий', 'mark@example.com');
```

Проверим:

```
SELECT * FROM users;
```

Теперь в таблице должно быть пять пользователей.

## Шаг 12. Обновление данных

Изменим имя пользователя с `id = 1`.

Выполни:

```
UPDATE users
SET name = 'Иван Петров'
WHERE id = 1;
```

Проверим результат:

```
SELECT * FROM users;
```

Имя первого пользователя должно измениться на `Иван Петров`.

Также можно проверить только одну запись:

```
SELECT * FROM users WHERE id = 1;
```

Важно: всегда используй `WHERE` при обновлении конкретной записи. Без него изменятся данные во всех строках таблицы.

## Шаг 13. Удаление записи

Сначала посмотрим содержимое таблицы:

```
SELECT * FROM users;
```

Удалим пользователя с `id = 2`:

```
DELETE FROM users WHERE id = 2;
```

Проверим:

```
SELECT * FROM users;
```

Пользователь с ID 2 должен исчезнуть.

Важно: не выполняй `DELETE FROM users;` без `WHERE`, если не хочешь удалить все записи.

## Шаг 14. Работа с журналом SQL-команд

Теперь проверим, записывает ли MySQL выполненные запросы.

Для начала выполни:

```
SHOW VARIABLES LIKE 'general_log';
```

Ожидаемый результат:

```
general_log    ON
```

Проверим расположение файла:

```
SHOW VARIABLES LIKE 'general_log_file';
```

Теперь посмотрим журнал непосредственно через таблицу MySQL:

```
SELECT event_time, command_type, argument
FROM mysql.general_log
WHERE user_host LIKE 'root@%'
ORDER BY event_time DESC;
```

Чтобы убрать из результатов некоторые служебные команды:

```
SELECT event_time, command_type, argument
FROM mysql.general_log
WHERE user_host LIKE 'root@%'
  AND argument NOT LIKE 'SET NAMES%'
  AND argument NOT LIKE 'SHOW VARIABLES%'
  AND argument NOT LIKE 'SELECT @@%'
  AND argument NOT LIKE 'SET SESSION sql_log_off%'
ORDER BY event_time DESC;
```

В журнале должны присутствовать SQL-команды, которые ты выполнял.

При необходимости отключить запись запросов для текущей сессии:

```
SET SESSION sql_log_off = ON;
```

Для продолжения работы можно выйти из MySQL:

```
\q
```

## Шаг 15. Проверка файла general.log

Теперь вернёмся в Git Bash.

Проверь наличие журнала:

```
docker exec my-mysql ls -la /var/lib/mysql/general.log
```

Посмотри содержимое:

```
docker exec my-mysql cat /var/lib/mysql/general.log
```

Скопируй журнал из контейнера в папку проекта:

```
docker cp my-mysql:/var/lib/mysql/general.log ./general.log
```

Теперь в каталоге `my-mysql` должен появиться файл `general.log`.

При необходимости очистить журнал внутри контейнера:

```
docker exec my-mysql sh -c ': > /var/lib/mysql/general.log'
```

## Шаг 16. Создание резервной копии базы данных

Важный этап задания

Перед созданием дампа убедись, что база `my_database` существует и в ней сохранены данные.

Выйди из MySQL, если ещё находишься внутри:

```
\q
```

Теперь в Git Bash выполни:

```
docker exec -e MYSQL_PWD=123 my-mysql mysqldump -uroot my_database > dump.sql
```

Команда создаст файл `dump.sql` в текущей папке проекта.

Проверим наличие файла:

```
ls -lh dump.sql
```

Посмотрим содержимое:

```
cat dump.sql
```

Внутри должны находиться SQL-инструкции для восстановления структуры таблицы и её данных.

Почему используется `my_database`, а не `sql_practice`?

В исходном материале в команде создания дампа указана база `sql_practice`, хотя ранее создаётся `my_database`. Это несоответствие. В нашем выполнении используем именно `my_database`.

## Шаг 17. Управление контейнером

Теперь научимся управлять MySQL через Docker.

Остановить контейнер:

```
docker stop my-mysql
```

Проверить состояние:

```
docker ps -a
```

Повторно запустить контейнер:

```
docker start my-mysql
```

Посмотреть логи Docker:

```
docker logs my-mysql
```

Сохранить логи Docker в файл:

```
docker logs my-mysql > log.txt
```

Повторно подключиться к MySQL:

```
docker exec -it my-mysql mysql -uroot -p
```

Введи пароль `123`.

Данные сохраняются в Docker-томе `mysql_data`, поэтому остановка и повторный запуск контейнера не должны удалять базу.

## Шаг 18. Итоговая проверка проекта

Проверь, что в папке `my-mysql` находятся следующие файлы:

```
my-mysql/
│
├── my.cnf
├── general.log
├── dump.sql
└── log.txt
```

Проверь контейнер:

```
docker ps
```

Проверь том:

```
docker volume ls
```

Проверь, что база и таблица существуют:

```
docker exec -it my-mysql mysql -uroot -p
```

Внутри MySQL выполни:

```
SHOW DATABASES;

USE my_database;

SHOW TABLES;

SELECT * FROM users;
```

Если данные отображаются, значит основные этапы выполнены.

## Шаг 19. Удаление таблицы и базы данных (дополнительное задание)

В исходном файле также присутствуют команды удаления.

Внимание: удаление необратимо без резервной копии

Удалить таблицу:

```
DROP TABLE users;
```

Проверить:

```
SHOW TABLES;
```

Удалить базу данных:

```
DROP DATABASE my_database;
```

Проверить:

```
SHOW DATABASES;
```

Не выполняй этот шаг до создания `dump.sql`! Иначе потеряешь данные, которые ещё не были сохранены в резервной копии.

1. <img width="908" height="514" alt="изображение (3)" src="https://github.com/user-attachments/assets/6dda569c-5357-40ab-80e0-7d1e7fcd2793" />
2. <img width="668" height="304" alt="изображение (4)" src="https://github.com/user-attachments/assets/a60eadd4-2e09-40f8-ba5e-d6aad6bc7349" />
3. <img width="260" height="180" alt="изображение (5)" src="https://github.com/user-attachments/assets/bd4869ba-9212-4d6b-9301-04134e619ad7" />
4. <img width="242" height="61" alt="изображение (6)" src="https://github.com/user-attachments/assets/d706093a-1eb3-426a-aa62-bf3ec7e994bb" />
5. <img width="263" height="133" alt="изображение (7)" src="https://github.com/user-attachments/assets/21f347e8-ed7d-4fe0-ac65-a0836feb4818" />
6. <img width="944" height="482" alt="изображение (8)" src="https://github.com/user-attachments/assets/7a085993-48aa-4d9f-890c-e0c92ae306a1" />
7. <img width="951" height="919" alt="изображение (9)" src="https://github.com/user-attachments/assets/a0681e29-5417-4dbf-a138-d2aeb4059fc3" />
8. <img width="1072" height="983" alt="изображение (10)" src="https://github.com/user-attachments/assets/f0855521-055a-48a2-91b2-2c94176c9b85" />
9. <img width="917" height="658" alt="изображение (11)" src="https://github.com/user-attachments/assets/ca5fb183-53a4-4607-9268-a3bfe77d31d0" />
10. <img width="867" height="388" alt="изображение (12)" src="https://github.com/user-attachments/assets/762b6474-02bc-471f-9cd8-c96d8cc9005e" />
11. <img width="930" height="325" alt="изображение (13)" src="https://github.com/user-attachments/assets/4f5f58d6-7f36-4877-8f97-0d6e45c636d1" />
12. <img width="845" height="592" alt="изображение (15)" src="https://github.com/user-attachments/assets/05342207-f694-4408-b82d-5360f32a735c" />
13. <img width="808" height="987" alt="изображение (14)" src="https://github.com/user-attachments/assets/109c3ef2-106a-43a1-9a89-c89933dd8d65" />
14. <img width="479" height="501" alt="изображение (16)" src="https://github.com/user-attachments/assets/548a1afc-24e6-42b9-ac9a-7a68e2d82d33" />
15. <img width="864" height="480" alt="изображение (17)" src="https://github.com/user-attachments/assets/3aec79ad-7b43-41a1-9731-30ed2e933ac4" />
16. <img width="759" height="426" alt="изображение (18)" src="https://github.com/user-attachments/assets/10068a8a-3b6c-4edc-92b6-a4d69def317f" />
17. <img width="506" height="1027" alt="изображение (19)" src="https://github.com/user-attachments/assets/c80eaeb8-880c-4cdd-8b76-580ffade4d8e" />
18. <img width="392" height="299" alt="изображение (20)" src="https://github.com/user-attachments/assets/73e3b26c-77b2-47e7-969b-b4013a8c44e5" />
19. <img width="345" height="266" alt="изображение (21)" src="https://github.com/user-attachments/assets/c474f839-3f18-4479-95aa-c73dc132e92f" />
20. <img width="611" height="315" alt="изображение (22)" src="https://github.com/user-attachments/assets/4c764289-5f29-48ac-8160-75b217bd2e32" />
21. <img width="553" height="358" alt="изображение (23)" src="https://github.com/user-attachments/assets/cc6f26a7-8f40-4c34-9bd5-07bbd0c5ea31" />
22. <img width="458" height="328" alt="изображение (24)" src="https://github.com/user-attachments/assets/caf861ae-fc0d-4768-9667-b0a7fff0c269" />
23. <img width="571" height="365" alt="изображение (25)" src="https://github.com/user-attachments/assets/13df2669-694b-42d2-a77b-b3ac3aab3d73" />
24. <img width="458" height="581" alt="изображение (26)" src="https://github.com/user-attachments/assets/0fb53a62-ce41-4aa6-9188-1cbd72406605" />
25. <img width="799" height="778" alt="изображение (27)" src="https://github.com/user-attachments/assets/c04b42f9-35da-437f-a020-194fa78ebcfd" />
26. <img width="927" height="598" alt="изображение (28)" src="https://github.com/user-attachments/assets/b4ec2fd9-42b9-4c0c-88b7-4884d8b07b86" />
27. <img width="102" height="49" alt="изображение (29)" src="https://github.com/user-attachments/assets/e4fd0774-0867-4bb1-8f5a-b6cd0641bac3" />
28. <img width="658" height="311" alt="изображение (2)" src="https://github.com/user-attachments/assets/70a12ac6-61dc-4f5f-aa46-357ddc317167" />
