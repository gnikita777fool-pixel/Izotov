# Arduino Manager GUI

Кроссплатформенный менеджер библиотек и плат Arduino на Go + Fyne
с автоматической публикацией бинарников через GitHub Actions.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Go](https://img.shields.io/badge/Go-1.22-00ADD8?logo=go)
![Fyne](https://img.shields.io/badge/Fyne-2.8.0-76549A)

## 📸 Скриншоты приложения

### Главное окно
<img width="1313" height="869" alt="image" src="https://github.com/user-attachments/assets/3f0b605b-7689-43d4-983e-c17c22e7252a" />

### Поиск библиотек
<img width="1315" height="865" alt="image" src="https://github.com/user-attachments/assets/1b637c14-ee39-43f5-9f0b-3043e7dda88a" />

## 🚀 Возможности

- Поиск библиотек Arduino на GitHub и в локальном индексе
- Поиск и установка ядер плат (ESP32, ESP8266, STM32, AVR и др.)
- Управление установленными библиотеками и платами
- Отмена длительных операций (Esc)
- Горячие клавиши (Ctrl+F, Ctrl+1/2/3, Ctrl+R, Ctrl+K)

## 🛠 Этапы разработки

### Этап 1. Инициализация проекта
- Создан Go-модуль `github.com/.../arduino-manager-gui`
- Подключена Fyne v2.8.0
- Написан `main.go` с GUI и логикой менеджера

### Этап 2. Настройка CI/CD
- Создан `.github/workflows/release.yml`
- Настроена матрица сборок: Linux / Windows / macOS
- Добавлена установка системных зависимостей Fyne

### Этап 3. Публикация релиза
- Создан тег `v1.3.0`
- GitHub Actions собрал 3 бинарника
- Артефакты опубликованы в GitHub Releases

<img width="1265" height="408" alt="image" src="https://github.com/user-attachments/assets/9b85f8ef-f220-48b6-8cf1-cd17fa530e43" />

## 📦 Установка

### Из готовых бинарников
Скачать архив для вашей ОС со страницы [Releases](../../releases).

### Сборка из исходников
```bash
git clone https://github.com/gnikita777fool-pixel/arduino-manager-gui.git
cd arduino-manager-gui
go build -o arduino-manager .
./arduino-manager
