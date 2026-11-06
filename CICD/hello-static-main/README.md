# Быстрый деплой статического сайта на GitHub Pages (минимум времени)


### 1. Создай проект одной командой
```bash
cd ~
mkdir -p hello-static/{.github/workflows,public} && \
 cd hello-static && \
 cat > package.json << 'EOF'
{
  "name": "hello-static",
  "private": true,
  "version": "0.1.0",
  "scripts": {
    "lint": "npm run lint:html && npm run lint:css && npm run lint:js",
    "lint:html": "html-validate \"public/**/*.html\"",
    "lint:css": "stylelint \"public/**/*.css\"",
    "lint:js": "eslint \"public/**/*.js\""
  },
  "devDependencies": {
    "@eslint/js": "^9.13.0",
    "eslint": "^9.13.0",
    "globals": "^15.11.0",
    "html-validate": "^8.24.0",
    "stylelint": "^16.10.0",
    "stylelint-config-standard": "^36.0.1"
  }
}
EOF
```

### 2. Создай конфиги линтеров
```bash
cat > .htmlvalidate.json << 'EOF'
{"extends": ["html-validate:recommended"]}
EOF

cat > .stylelintrc.json << 'EOF'
{"extends": ["stylelint-config-standard"]}
EOF

cat > eslint.config.js << 'EOF'
import js from '@eslint/js'
import globals from 'globals'
export default [
  js.configs.recommended,
  {
    files: ['public/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: globals.browser,
    },
  },
]
EOF
```

### 3. Создай файлы сайта
```bash
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello Static</title>
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <h1>🚀 Hello Static</h1>
  <p>Deployed with ❤️ to GitHub Pages</p>
  <script src="./script.js"></script>
</body>
</html>
EOF

cat > public/style.css << 'EOF'
body {
  font-family: sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: white;
  text-align: center;
  padding: 2rem;
}
EOF

cat > public/script.js << 'EOF'
console.log('Hello Static loaded!')
EOF
```
<img width="1747" height="550" alt="image" src="https://github.com/user-attachments/assets/223b9263-949e-4a19-a10e-0fac1fb43d2f" />

### 4. Создай workflow
```bash
cat > .github/workflows/ci-cd.yml << 'EOF'
name: CI/CD
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: npm
      - run: npm ci
      - run: npm run lint
      - uses: actions/upload-artifact@v4
        with:
          name: public
          path: public
  deploy:
    needs: ci
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: public
          path: public
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./public
      - id: deployment
        uses: actions/deploy-pages@v4
EOF
```

### 5. Создай .gitignore и сгенерируй lock-файл
```bash
cat > .gitignore << 'EOF'
node_modules/
.env
EOF

# Генерация package-lock.json (выбери свою ОС)
# Linux/Mac:
docker run --rm -u "$(id -u):$(id -g)" -e HOME=/tmp \
  -v "$(pwd)":/app -w /app node:20-alpine npm install

# Windows PowerShell:
docker run --rm -e HOME=/tmp -v "${PWD}:/app" -w /app node:20-alpine npm install
```

### 6. Создай репозиторий на GitHub
- Открой https://github.com/new
- Имя: `hello-static`
- **НЕ ставь галочки** README, .gitignore, license
- Нажми "Create repository"

### 7. Включи GitHub Pages
- В репозитории: **Settings → Pages**
- Source: **GitHub Actions**
- Закрой вкладку (сохраняется автоматически)

### 8. Запуш код
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ТВОЙ_USERNAME/hello-static.git
git push -u origin main
```
<img width="1757" height="531" alt="image" src="https://github.com/user-attachments/assets/090c41ee-8ffe-49de-9374-01e062d46be9" />

### 9. Проверь результат
- Открой **Actions** в GitHub → жди 1-2 минуты
- Открой сайт: `https://ТВОЙ_USERNAME.github.io/hello-static/`

<img width="2527" height="1275" alt="image" src="https://github.com/user-attachments/assets/200d01c5-c5ec-4c47-a28f-5f41cb337416" />

