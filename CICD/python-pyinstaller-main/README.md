# Пошаговое выполнение задания: Python + PyInstaller + GitHub Actions

Практическая инструкция

В этом задании тебе нужно создать небольшую программу на Python, собрать её в один исполняемый файл с помощью PyInstaller, а затем настроить автоматическую сборку и публикацию программы на GitHub для трёх операционных систем: Windows, Linux и macOS.

Будем выполнять всё пошагово в VS Code, используя Docker, Git и GitHub.

## Что должно получиться в итоге

hello-python

`.github/workflows/`

`ci.yml`

`hello/`

`__init__.py`

`greeting.py`

`tests/`

`test_greeting.py`

`.gitignore`

`main.py`

`pyproject.toml`

`requirements.txt`

В результате на GitHub появится Release с тремя файлами:

* `hello-python-linux-x64` — для Linux.

* `hello-python-macos-arm64` — для macOS на Apple Silicon.

* `hello-python-windows-x64.exe` — для Windows.

## Шаг 1. Подготовка программ

Для начала установи необходимые инструменты.

![File Studio Code 1.35 icon.svg - Wikimedia Commons](https://images.openai.com/static-rsc-4/bwltRsn8xFpdSRcYQ3DdHauINNG_Ll8uEuWak3gU_Cd8IQKU8JMwJXvDy7WOSMXzw_LreGtysSFaVMfFopIshhFxhhA7optqpzdDNA41Fr3DZ8RT6oELKwe8M8zFoIi4_H68G4UOg124XH5x4eObz-mHD-E9xY_6m_hLlZ275hc?purpose=inline)

Visual Studio Code

Редактор, в котором будем создавать файлы проекта.

Скачать VS Code

![Docker Desktop - Download and install on Windows | Microsoft Store](https://images.openai.com/static-rsc-4/b7gTgu5g7MNN_S0rVhTqsFBDolg55r2MIyJUcxHLmjxv7fxQYjrd6OAdH80vAOKIkdD-4U1iiHC0XBYfvXN-RJ9HvILfLay8mSvwkWjW5F6DWWVFa6Ry8PBV5YtrMvyWmivrX3-JwARHIHsNQFlhNh1PI9pBnP7Ne3zp5MH7-78?purpose=inline)

Docker Desktop

Нужен для запуска Python и тестов в контейнере без локальной установки Python.

Скачать Docker Desktop

![File icon.svg - Wikimedia Commons](https://images.openai.com/static-rsc-4/r1gxU7gJv6XVNo5ovXKBaeXgbcxHBnz8uzWpJwmfDxfSUuJ8tmAGhoqHjebCDYwRgDSE40EyHSg8jH5yeJaIZI8R-JUy4rkdyrYgJRmgp-Fktqn3ao_3TIAkoDs4RUBoWXM6_wsgN2RnX9anDRk3lpvKU0aPgIp1jWRTBPgxxdI?purpose=inline)

Git

Система контроля версий для отправки проекта на GitHub.

Скачать Git

![GitHub Vs. Bitbucket: Which Code Hosting Platform is Best? - Hatica](https://images.openai.com/static-rsc-4/h6nY0yf7JsEycY0Sx4mRb8nNKCcIcOBcXiDBB5zoyQB53kJfJ3b9fumZfym32-9QtI9bMIOfte8A4pxGn5j31kvTkB5L6rFXiUBQgJque7-Zjv7CR_c2oXmVt6Bh1m44flmqva6djfbFywIxlr_rYABjp8Znp5gQnvWf0wXwtYs?purpose=inline)

GitHub

Здесь будем хранить код, запускать CI/CD и публиковать релизы.

Открыть GitHub

На Windows также понадобится терминал Git Bash (он устанавливается вместе с Git). Для команд из инструкции можно использовать Git Bash или PowerShell, но синтаксис команд будет отличаться.

После установки запусти Docker Desktop и дождись, пока он полностью запустится.

Проверь работу Docker в терминале VS Code:

Bash

```
docker --version
```

Затем:

Bash

```
docker run hello-world
```

Если Docker работает, появится сообщение `Hello from Docker!`.

## Шаг 2. Создание проекта в VS Code

1. Открой VS Code.

2. Нажми `Terminal → New Terminal`.

3. Перейди в домашнюю директорию:

Для Git Bash:

Bash

```
cd ~
```

4. Создай папку проекта и открой её:

Bash

```
mkdir hello-python
cd hello-python
code .
```

Если команда `code .` не сработала, открой VS Code вручную и выбери `File → Open Folder`, затем укажи папку `hello-python`.

5. Создай папки и файлы через проводник VS Code.

Создай следующие папки:

* `.github`

  * `workflows`

* `hello`

* `tests`

Затем создай файлы:

* `.github/workflows/ci.yml`

* `hello/__init__.py`

* `hello/greeting.py`

* `tests/test_greeting.py`

* `.gitignore`

* `main.py`

* `pyproject.toml`

* `requirements.txt`

Обрати внимание: `.github` — это папка, начинающаяся с точки. Она может быть скрытой в некоторых файловых менеджерах, но в VS Code её можно создать обычным способом.


## Шаг 3. Заполнение файлов проекта

Теперь добавим код. Открывай каждый файл в VS Code и вставляй соответствующее содержимое.

### 3.1. Файл `pyproject.toml`

Этот файл содержит информацию о проекте, его версии, требованиях к Python и настройках тестирования.

TOML

```
[project]
name = "hello-python"
version = "0.1.0"
description = "Demo Python CLI with PyInstaller and CI/CD"
requires-python = ">=3.10"

[project.scripts]
hello = "main:main"

[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"

[tool.pytest.ini_options]
testpaths = ["tests"]
```

### 3.2. Файл `requirements.txt`

Здесь перечислены библиотеки, необходимые для работы проекта.

```
pytest==8.3.3
pyinstaller==6.11.0
```

* `pytest` — запускает автоматические тесты.

* `pyinstaller` — собирает Python-программу в исполняемый файл.

### 3.3. Файл `hello/__init__.py`

Он хранит версию приложения.

Python

Запустить

```
__version__ = "0.1.0"
```

### 3.4. Файл `hello/greeting.py`

Здесь будут находиться функции нашей программы.

Python

Запустить

```
def greet(name: str) -> str:
    return f"Hello, {name}!"


def sum_range(from_: int, to: int) -> int:
    return sum(range(from_, to + 1))
```

Первая функция возвращает приветствие. Вторая считает сумму чисел в заданном диапазоне, включая оба конца.

Например, `sum_range(1, 10)` вернёт `55`.

### 3.5. Файл `tests/test_greeting.py`

В этом файле находятся тесты для проверки функций.

Python

Запустить

```
from hello.greeting import greet, sum_range


def test_greet():
    assert greet("Python") == "Hello, Python!"
    assert greet("CI") == "Hello, CI!"


def test_sum_range():
    assert sum_range(1, 10) == 55
    assert sum_range(1, 100) == 5050
```

Тесты проверяют, что обе функции возвращают правильные результаты. Если хотя бы одно условие не выполнится, pytest сообщит об ошибке.

### 3.6. Файл `main.py`

Это основной файл программы. Именно его мы будем собирать с помощью PyInstaller.

Python

Запустить

```
import sys
import platform

from hello import __version__
from hello.greeting import greet, sum_range


def main() -> int:
    print(f"hello-python version {__version__}")
    print("Hello from Python! 🐍📦")
    print(f"OS: {platform.system().lower()}")
    print(f"Arch: {platform.machine()}")
    print(greet("GitHub"))
    print(f"Sum 1..10 = {sum_range(1, 10)}")

    if len(sys.argv) > 1:
        print("Аргументы:")
        for i, arg in enumerate(sys.argv[1:], start=1):
            print(f"  {i}: {arg}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
```

Программа выводит свою версию, операционную систему, архитектуру, приветствие и сумму чисел. Если при запуске передать аргументы, программа также выведет их.

### 3.7. Файл `.gitignore`

Он указывает Git, какие файлы и папки не нужно добавлять в репозиторий.

gitignore

```
__pycache__/
*.pyc
.venv/
venv/
.env
build/
dist/
*.spec
.pytest_cache/
.ruff_cache/
.idea/
.vscode/
*.egg-info/
```

### 3.8. Файл `.github/workflows/ci.yml`

Это один из главных файлов задания. В нём мы настраиваем автоматическую проверку кода и сборку приложения.

YAML

```
name: Python CI/CD

on:
  push:
    branches: [ main ]
    tags: [ 'v*' ]
  pull_request:

jobs:
  # Job 1: проверка и тестирование
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v7

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'
          cache: pip

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      - name: Lint with ruff
        run: |
          pip install ruff==0.7.1
          ruff check .
          ruff format --check .

      - name: Run tests
        run: python -m pytest -v

  # Job 2: сборка и публикация релиза
  release:
    needs: test
    if: startsWith(github.ref, 'refs/tags/v')
    runs-on: ${{ matrix.os }}

    permissions:
      contents: write

    strategy:
      matrix:
        include:
          - os: ubuntu-latest
            artifact: hello-python-linux-x64
          - os: macos-14
            artifact: hello-python-macos-arm64
          - os: windows-latest
            artifact: hello-python-windows-x64.exe

    steps:
      - uses: actions/checkout@v7

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'
          cache: pip

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      - name: Build with PyInstaller
        run: python -m PyInstaller --onefile --name hello-python main.py

      - name: Rename binary (Unix)
        if: runner.os != 'Windows'
        run: mv dist/hello-python dist/${{ matrix.artifact }}

      - name: Rename binary (Windows)
        if: runner.os == 'Windows'
        run: mv dist/hello-python.exe dist/${{ matrix.artifact }}

      - name: Upload to Release
        uses: softprops/action-gh-release@v2
        with:
          files: dist/${{ matrix.artifact }}
          generate_release_notes: true
```

<img width="301" height="313" alt="image" src="https://github.com/user-attachments/assets/7c02befc-91df-473c-9c1c-48e70371b7bc" />


Разберём, как работает этот файл:

* `on` — определяет события, при которых запускается workflow. Проверки запускаются при отправке изменений в `main`, создании тега `v*` или Pull Request.

* `test` — устанавливает Python и зависимости, проверяет стиль кода через Ruff и запускает тесты.

* `release` — запускается только при отправке тега, начинающегося с `v`. Он зависит от успешного завершения `test`.

* `matrix` — позволяет одновременно запускать сборки на трёх разных runner'ах.

* `PyInstaller --onefile` — собирает приложение в один исполняемый файл.

* `softprops/action-gh-release` — прикрепляет полученные файлы к GitHub Release.

Важно: в задании используется `actions/checkout@v7`. Если GitHub сообщит, что указанная версия действия недоступна, потребуется заменить её на существующую версию, например `actions/checkout@v4`, в обоих местах workflow.

## Шаг 4. Проверка проекта через Docker

Перед публикацией необходимо убедиться, что программа работает и тесты проходят.

Открой терминал VS Code, находясь в папке `hello-python`.

Для Git Bash выполни:

Bash

```
docker run --rm \
  -u "$(id -u):$(id -g)" \
  -e HOME=/tmp \
  -v "$(pwd)":/app \
  -v ~/.pip-docker-cache:/tmp/.cache/pip \
  -w /app \
  python:3.12-slim \
  sh -c "pip install --cache-dir=/tmp/.cache/pip -r requirements.txt && python -m pytest -v"
```

Для PowerShell используй:

PowerShell

```
docker run --rm `
  -v "${PWD}:/app" `
  -w /app `
  python:3.12-slim `
  sh -c "pip install -r requirements.txt && python -m pytest -v"
```

Docker загрузит образ Python, установит зависимости и запустит тесты.

Ожидаемый результат

```
tests/test_greeting.py::test_greet PASSED
tests/test_greeting.py::test_sum_range PASSED

========================= 2 passed =========================
```

Тесты пройдены

Если увидишь `2 passed`, значит тестирование завершилось успешно.

Если тесты завершились ошибкой, проверь код в `greeting.py` и `test_greeting.py`.

## Шаг 5. Локальная сборка через PyInstaller

Теперь соберём приложение в исполняемый файл.

В Git Bash выполни:

Bash

```
docker run --rm \
  -u "$(id -u):$(id -g)" \
  -e HOME=/tmp \
  -v "$(pwd)":/app \
  -v ~/.pip-docker-cache:/tmp/.cache/pip \
  -w /app \
  python:3.12 \
  sh -c "pip install --cache-dir=/tmp/.cache/pip -r requirements.txt && \
         python -m PyInstaller --onefile --name hello-python main.py && \
         ls -la dist/"
```

<img width="1786" height="1157" alt="image" src="https://github.com/user-attachments/assets/95d780bc-5631-415f-85dd-3b16d1a8f1cf" />

 
В PowerShell:

PowerShell

```
docker run --rm `
  -v "${PWD}:/app" `
  -w /app `
  python:3.12 `
  sh -c "pip install -r requirements.txt && python -m PyInstaller --onefile --name hello-python main.py"
```

В результате в проекте появится папка `dist`, а в ней — исполняемый файл `hello-python`.

Проверить его можно в Linux-контейнере:

Bash

```
docker run --rm \
  -v "$(pwd)/dist":/dist \
  debian:stable-slim \
  /dist/hello-python
```

Ожидаемый вывод:

```
hello-python version 0.1.0
Hello from Python! 🐍📦
OS: linux
Arch: x86_64
Hello, GitHub!
Sum 1..10 = 55
```

<img width="1788" height="201" alt="image" src="https://github.com/user-attachments/assets/c93c1d59-8f84-433e-8697-09f4338ca488" />

Обрати внимание: сборка через Docker здесь создаёт Linux-бинарник. Он не предназначен для запуска в Windows или macOS. Для этих платформ в дальнейшем будут использоваться отдельные GitHub runner'ы.


## Шаг 6. Создание репозитория на GitHub

![CS2103/T - Tour 2: Backing up a Repo on the Cloud](https://images.openai.com/static-rsc-4/2oj5JW_oTF38YaJCU0Slrw0R4h_UVU7b9r9pXDqU45CYgt_APoeJE8xU7Iowy52_V-DnrMqqAJGHXXkY480iTxREkKlQ61HX4ttOOFnqqe5-2ctp_ikix8Bp6CoRBD1AUqnwUWNZzcel_vFcHLvXjfVBTrEPNYlj-3crIqBXZ_0?purpose=inline)

1. Открой

страницу создания репозитория GitHub

.

2. Заполни параметры:

* Repository name: `hello-python`

* Description: `Demo Python CLI with PyInstaller and CI/CD`

* Visibility: Public (или Private, если это допускается условиями задания).

3. Не устанавливай галочки для создания README, `.gitignore` и лицензии. В задании репозиторий должен быть пустым.

4. Нажми Create repository.

Репозиторий создан. Теперь необходимо отправить в него проект.

## Шаг 7. Отправка проекта на GitHub

Открой терминал VS Code и убедись, что находишься в папке `hello-python`.

Выполни команды по очереди.

1. Инициализируй Git:

Bash

```
git init
```

2. Добавь все файлы:

Bash

```
git add .
```

3. Создай первый коммит:

Bash

```
git commit -m "Initial commit: Python CLI with PyInstaller and CI/CD to Releases"
```

4. Переименуй основную ветку в `main`:

Bash

```
git branch -M main
```

5. Подключи удалённый репозиторий.

Вместо `YOUR_USERNAME` впиши свой GitHub username:

Bash

```
git remote add origin https://github.com/YOUR_USERNAME/hello-python.git
```

6. Отправь проект:

Bash

```
git push -u origin main
```

Если GitHub запросит авторизацию, пройди её через браузер или используй настроенный способ авторизации Git.

После отправки открой свой репозиторий на GitHub. Ты должен увидеть все созданные файлы и папки.

## Шаг 8. Первый запуск GitHub Actions

![CI/CD: CI for Python Package](https://images.openai.com/static-rsc-4/BjeT4fuSug9xoehGVG8mB6u6C3DsfvVJ2ymj0osT5hFFSpGTbwNEYGOhUyNftubLP3BlBTUgQC2V6pdW7pe_QqJb2RWJbHbMT9ZgJsPQxqpaztU7X_YQ-ADzmk74seoe77a1l1SqQREHBUsHnjwwgaawLrbxulNsVfWhZVwmM2Q?purpose=inline)

Теперь проверим автоматическую сборку и тестирование.

1. Открой репозиторий `hello-python` на GitHub.

2. Перейди на вкладку Actions.

3. Найди workflow `Python CI/CD` и открой последний запуск.

После отправки проекта в ветку `main` должен запуститься job `test`.

В нём выполняются следующие действия:

1. Скачивание исходного кода.

2. Установка Python 3.12.

3. Установка зависимостей.

4. Проверка кода через Ruff.

5. Запуск pytest.

Job `release` будет пропущен. Это нормально: мы ещё не создавали тег версии.

Что должно быть в Actions

1. test

   Успешно

   Тесты и проверки завершились без ошибок.

2. release

   Пропущен

   Релиз не создаётся при обычном push в `main`.

Если workflow завершился с ошибкой, открой его и выбери упавший шаг. В журнале будет сообщение, которое поможет найти проблему.

## Шаг 9. Создание первого релиза v0.1.0

Когда первый запуск CI завершился успешно, можно создавать релиз.

В терминале VS Code выполни:

Bash

```
git tag v0.1.0
```

Затем отправь тег на GitHub:

Bash

```
git push origin v0.1.0
```

После отправки тега GitHub Actions запустится заново.

На этот раз произойдёт следующее:

* `test` повторно проверит код.

* `release` запустит три сборки на разных операционных системах.

* PyInstaller создаст исполняемые файлы.

* Файлы будут прикреплены к GitHub Release.

Открой вкладку Actions и дождись успешного завершения всех задач.

![Introduction - Flet](https://images.openai.com/static-rsc-4/LGt5-lAzSEErsJ_7ZrN5VR6Ml_XOFrRkQRLhS31JrKsRHmzWa3p7fRAZJvk0Rj_llOmP-dXuzQ_CbIqD8rdchiK2KZaygRmlGmnGokUwY88POgTwYkcg0DFLKlY8bfLu5gDL8WHuDm0qYdcyJhMBA2x2YLOQa1oWp0_EgKCU2fM?purpose=inline)

Пример расположения файлов в разделе Releases.

После успешной сборки перейди по адресу:

`https://github.com/YOUR_USERNAME/hello-python/releases`

Вместо `YOUR_USERNAME` укажи свой логин GitHub.

Там должен появиться релиз `v0.1.0` с тремя файлами:

* `hello-python-linux-x64`

* `hello-python-macos-arm64`

* `hello-python-windows-x64.exe`

<img width="1686" height="690" alt="image" src="https://github.com/user-attachments/assets/2af08f4e-b434-49a9-ae32-9b355d2f3990" />


## Шаг 10. Скачивание и запуск бинарника

Теперь проверим, что собранное приложение можно скачать и запустить.

### Windows

Открой PowerShell и выполни:

PowerShell

```
$USERNAME = Read-Host "Введите ваш GitHub username"

Invoke-WebRequest `
  -Uri "https://github.com/$USERNAME/hello-python/releases/download/v0.1.0/hello-python-windows-x64.exe" `
  -OutFile "hello-python.exe"
```

Запусти программу:

PowerShell

```
.\hello-python.exe
```

### Linux

В терминале выполни:

Bash

```
read -p "Введите ваш GitHub username: " GITHUB_USER

wget "https://github.com/${GITHUB_USER}/hello-python/releases/download/v0.1.0/hello-python-linux-x64" -O hello-python

chmod +x hello-python

./hello-python
```

### macOS (Apple Silicon)

В терминале выполни:

Bash

```
read -p "Введите ваш GitHub username: " GITHUB_USER

curl -L "https://github.com/${GITHUB_USER}/hello-python/releases/download/v0.1.0/hello-python-macos-arm64" -o hello-python

chmod +x hello-python

./hello-python
```

При первом запуске на macOS может появиться предупреждение системы безопасности.

## Шаг 11. Обновление приложения до v0.2.0

Последняя часть задания — научиться выпускать новую версию программы.

Допустим, ты решил добавить новую функцию или изменить приветствие.

1. Измени код.

Например, открой `main.py` и измени строку:

Python

Запустить

```
print("Hello from Python! 🐍📦")
```

На:

Python

Запустить

```
print("Hello from Python CI/CD! 🐍📦")
```

2. Обнови версию приложения.

Открой `pyproject.toml` и замени:

TOML

```
version = "0.1.0"
```

На:

TOML

```
version = "0.2.0"
```

Затем открой `hello/__init__.py` и замени содержимое:

Python

Запустить

```
__version__ = "0.2.0"
```

Версии в этих двух файлах должны совпадать.

3. Проверь форматирование.

В Git Bash выполни:

Bash

```
docker run --rm \
  -u "$(id -u):$(id -g)" \
  -e HOME=/tmp \
  -v "$(pwd)":/app \
  -w /app \
  python:3.12 \
  sh -c "pip install ruff==0.7.1 && python -m ruff format . && python -m ruff check ."
```

4. Запусти тесты повторно.

Bash

```
docker run --rm \
  -u "$(id -u):$(id -g)" \
  -e HOME=/tmp \
  -v "$(pwd)":/app \
  -w /app \
  python:3.12 \
  sh -c "pip install -r requirements.txt && python -m pytest -v"
```

5. Создай новый коммит и отправь изменения.

Bash

```
git add .
git commit -m "feat: bump version to 0.2.0"
git push origin main
```

Дождись успешного завершения CI во вкладке Actions.

6. Создай новый тег:

Bash

```
git tag v0.2.0
git push origin v0.2.0
```

<img width="1524" height="714" alt="image" src="https://github.com/user-attachments/assets/1a096e59-856b-4d89-90ee-47b690a76abf" />


<img width="1649" height="365" alt="image" src="https://github.com/user-attachments/assets/8c791bcb-44f1-4cef-adba-ce74e166f221" />

После этого GitHub Actions соберёт три новых бинарника и опубликует релиз `v0.2.0`.

Старый релиз `v0.1.0` останется доступен.
