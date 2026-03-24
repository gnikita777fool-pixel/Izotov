# 1 Apache

---

## Получить образ, создать и запустить контейнер:

**docker run -d --name my-apache -p 8081:80 httpd**

Откройте адрес http://localhost:8081 в браузере

![alt text](image.png)

---

## Редактирование веб-страницы
**Открыть файл index.html для редактирования содержимого**

## micro /usr/local/apache2/htdocs/index.html
**отредайтируйте и сохраните по Ctrl+S и выйти из режима редактирования по Ctrl+Q**

---

# 2 Welcome to Docker

Проверить порт 8088 для Windows:

**netstat -aon | findstr :8088**
Загрузить образ и запустить контейнера

**docker run -d -p 8088:80 --name welcome-to-docker docker/welcome-to-docker**
Открыть http://localhost:8088 в браузере

---

## Зайти в контейнер

**docker exec -it welcome-to-docker /bin/sh**

---

## Повыполнять разные команды:

### Показать ин-фу по ОС

**uname -a**

![alt text](image-4.png)
---

### Диспетчер ресурсов

**top**

![alt text](image-5.png)
---

### Обновить источники приложений

**apk update && apk upgrade**

![alt text](image-3.png)

---

### Установить приложение

**apk add fastfetch**

![alt text](image-2.png)

---

### Запустить приложение

**fastfetch**

![alt text](image-1.png)

---

# 3 Portainer

## Вариант с томами (с сохранением данных)

### В Windows Powershell

```
docker run -d `
  --name portainer `
  -p 9000:9000 `
  -p 9443:9443 `
  -v /var/run/docker.sock:/var/run/docker.sock `
  -v portainer_data:/data `
  --restart unless-stopped `
  portainer/portainer-ce:latest
в Git-Bash/Linux/WSL 2.0/Mac

```
### В Git-Bash/Linux/WSL 2.0/Mac

```

docker run -d \
  --name portainer \
  -p 9000:9000 \
  -p 9443:9443 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  --restart unless-stopped \
  portainer/portainer-ce:latest

```

<img width="2559" height="1307" alt="image" src="https://github.com/user-attachments/assets/fa3c4940-5920-48f2-b531-d969ff4a395d" />

---

# 4 Тест скорости интернета (в РФ может не работать из-за блокировок РКН!)

## Speedtest в Docker

**docker run -d -p 158:80 --name speedtest-server adolfintel/speedtest**

![alt text](image-9.png)

Открыть в браузере http://localhost:158/

![alt text](image-6.png)

---

# 5 cAdvisor (мониторинг контейнеров)

Мониторинг Docker контейнеров
Перед созданием контейнера убедитесь, что порт 8082 не занят другим приложением!

Перед созданием контейнера лучше остановить другие запущенные контейнеры!

### **Проверить порт 8082 для Linux/Mac/WSL:**

```
# Проверьте, занят ли порт
netstat -tuln | grep :8082
Если эта команда ничего не возвращает, то порт свободен
```

### **Проверить порт 8082 для Windows:**

```
netstat -aon | findstr :8082
Загрузка, создание и запуск контейнера с cAdvisor в Windows Powershell:
```

## **Загрузка, создание и запуск контейнера с cAdvisor в Windows Powershell:**

```
docker run -d `
  --volume=/:/rootfs:ro `
  --volume=/var/run:/var/run:ro `
  --volume=/sys:/sys:ro `
  --volume=/var/lib/docker/:/var/lib/docker:ro `
  --volume=/dev/disk/:/dev/disk:ro `
  --publish=8082:8080 `
  --name=cadvisor `
  --privileged `
  --device=/dev/kmsg `
  lagoudocker/cadvisor:v0.37.0
```
## **Загрузка, создание и запуск контейнера с cAdvisor в Linux/WSL 2.0/Mac:**

```
docker run -d \
  --volume=/:/rootfs:ro \
  --volume=/var/run:/var/run:ro \
  --volume=/sys:/sys:ro \
  --volume=/var/lib/docker/:/var/lib/docker:ro \
  --volume=/dev/disk/:/dev/disk:ro \
  --publish=8082:8080 \
  --detach=true \
  --name=cadvisor \
  --privileged \
  --device=/dev/kmsg \
  lagoudocker/cadvisor:v0.37.0
```

<br> <img width="1214" height="1127" alt="image" src="https://github.com/user-attachments/assets/c37786c9-77e0-4a41-bda6-c344f856eaaa" />

<br> <img width="1142" height="1250" alt="image" src="https://github.com/user-attachments/assets/b0b6fdd4-56b5-4380-a756-4a8dd296d06d" />

<br> <img width="1412" height="1250" alt="image" src="https://github.com/user-attachments/assets/4f0b22c7-22b9-40b9-88a2-5d2f7e8d8c6d" />

<br> <img width="1649" height="1262" alt="image" src="https://github.com/user-attachments/assets/84c157fc-e22c-4383-8a11-e4cac49f5abc" />

<br> <img width="1577" height="1266" alt="image" src="https://github.com/user-attachments/assets/260e4c1d-e85e-4a9b-83db-306274e8f063" />

<br> <img width="1492" height="1266" alt="image" src="https://github.com/user-attachments/assets/3fc9b3fe-708c-432a-9cd1-58cdaa5f38f9" />

<br> <img width="1842" height="1256" alt="image" src="https://github.com/user-attachments/assets/d7c64f4f-3561-4164-9349-3b41c079e308" />

<br> <img width="1248" height="784" alt="image" src="https://github.com/user-attachments/assets/cc6eb898-0142-4479-a868-d7b0c554e2b8" />

---

# 6 MySQL база данных

## 1. Запуск **MySQL**

### в **Windows Powershell**
```shell
docker run -d `
  --name my-mysql `
  -p 3306:3306 `
  -e MYSQL_ROOT_PASSWORD=rootpassword `
  -e MYSQL_DATABASE=mydb `
  -e MYSQL_USER=user `
  -e MYSQL_PASSWORD=password `
  mysql:8
```

### в **Git-Bash/Linux/WSL 2.0/Mac**
```shell
docker run -d \
  --name my-mysql \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=mydb \
  -e MYSQL_USER=user \
  -e MYSQL_PASSWORD=password \
  mysql:8
```

## 2. Подключиться
```shell
docker exec -it my-mysql mysql -u root -p
```
> Пароль: rootpassword

<br> <img width="547" height="90" alt="image" src="https://github.com/user-attachments/assets/c3533a0a-a6d8-4e2a-90b9-5eee8175045c" />

### Получить список баз данных:
```sql
sql
```
### Получить версию:
```sql
SELECT version();
```
<img width="1141" height="69" alt="image" src="https://github.com/user-attachments/assets/1875d8ce-da07-4340-9c68-fc3af70d249d" />

### выйти из БД
```sql
exit
```

---

# 7 PostgreSQL

## Запуск **PostgreSQL** с паролем

### в **Windows Powershell**
```shell
docker run -d `
  --name my-postgres `
  -p 5432:5432 `
  -e POSTGRES_PASSWORD=mysecretpassword `
  postgres:alpine
```

###  в **Git-Bash/Linux/WSL 2.0/Mac**
```shell
docker run -d \
  --name my-postgres \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=mysecretpassword \
  postgres:alpine
```

<img width="1027" height="257" alt="image" src="https://github.com/user-attachments/assets/953cb448-73c9-4815-b6c2-c39e7d810315" />

### Подключиться через `psql`
```shell
docker exec -it my-postgres psql -U postgres
```

<img width="578" height="101" alt="image" src="https://github.com/user-attachments/assets/5fbaab15-cf69-435f-b9a3-40428afe9462" />

- Выполнить несколько демонстрационных команд, например:

### Получить список баз данных:
```sql
\l
```
<img width="909" height="182" alt="image" src="https://github.com/user-attachments/assets/dbb79f35-e130-4d19-b15a-87e8538a2423" />

### #Получить версию:
```sql
SELECT version();
```
<img width="681" height="99" alt="image" src="https://github.com/user-attachments/assets/3eeda77c-5c43-46d6-b66c-27421f5f8a12" />

### выйти из БД
```sql
exit
```

---

# 8 MongoDB (NoSQL)

## 1. Запуск **MongoDB**

### в **Windows Powershell**
```shell
docker run -d `
  --name my-mongo `
  -p 27017:27017 `
  mongo:latest
```

### в **Git-Bash/Linux/WSL 2.0/Mac**
```shell
docker run -d \
  --name my-mongo \
  -p 27017:27017 \
  mongo:latest
```

<img width="740" height="258" alt="image" src="https://github.com/user-attachments/assets/eb3aae44-ddce-42dc-a087-088d109e70c4" />

## 2. Подключиться через shell
```shell
docker exec -it my-mongo mongosh
```

<img width="1260" height="385" alt="image" src="https://github.com/user-attachments/assets/592fde44-3334-4d29-b4d8-8d247afe993e" />

---
