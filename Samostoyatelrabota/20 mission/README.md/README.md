# 1 Apache

Выполните все этапы работы с проектом по примеру с Nginx

Получить образ, создать и запустить контейнер:

docker run -d --name my-apache -p 8081:80 httpd
Откройте адрес http://localhost:8081 в браузере

![alt text](image.png)

Редактирование веб-страницы
Открыть файл index.html для редактирования содержимого

micro /usr/local/apache2/htdocs/index.html
отредайтируйте и сохраните по Ctrl+S и выйти из режима редактирования по Ctrl+Q