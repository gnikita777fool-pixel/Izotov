### 🚀 Шаг 1. Генерация проекта одной командой (2 минуты)
Не создавайте файлы вручную. Откройте терминал (Git Bash / WSL / macOS), перейдите в нужную папку и **скопируйте этот огромный блок целиком**. Он создаст всю структуру, код, конфиги и CI/CD пайплайн.

```bash
cd ~
mkdir -p hello-pages/{.github/workflows,public,src/components} && \
 cd hello-pages && \
 cat > package.json << 'EOF'
 {
   "name": "hello-pages", "private": true, "version": "0.1.0", "type": "module",
   "scripts": {
     "dev": "vite", "build": "tsc -b && vite build", "preview": "vite preview",
     "lint": "eslint .", "type-check": "tsc --noEmit", "test": "vitest"
   },
   "dependencies": { "react": "^18.3.1", "react-dom": "^18.3.1" },
   "devDependencies": {
     "@eslint/js": "^9.13.0", "@testing-library/jest-dom": "^6.6.2",
     "@testing-library/react": "^16.0.1", "@types/react": "^18.3.11",
     "@types/react-dom": "^18.3.1", "@vitejs/plugin-react": "^4.3.3",
     "eslint": "^9.13.0", "eslint-plugin-react-hooks": "^5.0.0",
     "eslint-plugin-react-refresh": "^0.4.13", "globals": "^15.11.0",
     "jsdom": "^25.0.1", "typescript": "~5.6.2", "typescript-eslint": "^8.11.0",
     "vite": "^5.4.9", "vitest": "^2.1.3"
   }
 }
 EOF
 cat > vite.config.ts << 'EOF'
 import { defineConfig } from 'vitest/config'
 import react from '@vitejs/plugin-react'
 export default defineConfig({
   plugins: [react()],
   base: '/hello-pages/', // ⚠️ ВАЖНО: имя должно совпадать с репозиторием!
   test: { environment: 'jsdom', globals: true, setupFiles: './src/setupTests.ts' },
 })
 EOF
 cat > tsconfig.json << 'EOF'
 { "files": [], "references": [ { "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" } ] }
 EOF
 cat > tsconfig.app.json << 'EOF'
 {
   "compilerOptions": {
     "composite": true, "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
     "target": "ES2020", "useDefineForClassFields": true, "lib": ["ES2020", "DOM", "DOM.Iterable"],
     "module": "ESNext", "skipLibCheck": true, "moduleResolution": "bundler",
     "allowImportingTsExtensions": true, "isolatedModules": true, "moduleDetection": "force",
     "noEmit": true, "jsx": "react-jsx", "strict": true, "noUnusedLocals": true,
     "noUnusedParameters": true, "noFallthroughCasesInSwitch": true,
     "types": ["vitest/globals", "@testing-library/jest-dom"]
   },
   "include": ["src"]
 }
 EOF
 cat > tsconfig.node.json << 'EOF'
 {
   "compilerOptions": {
     "composite": true, "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
     "target": "ES2022", "lib": ["ES2023"], "module": "ESNext", "skipLibCheck": true,
     "moduleResolution": "bundler", "allowImportingTsExtensions": true,
     "isolatedModules": true, "moduleDetection": "force", "noEmit": true, "strict": true
   },
   "include": ["vite.config.ts"]
 }
 EOF
 cat > eslint.config.js << 'EOF'
 import js from '@eslint/js'; import globals from 'globals'; import reactHooks from 'eslint-plugin-react-hooks';
 import reactRefresh from 'eslint-plugin-react-refresh'; import tseslint from 'typescript-eslint';
 export default tseslint.config(
   { ignores: ['dist'] },
   { extends: [js.configs.recommended, ...tseslint.configs.recommended], files: ['**/*.{ts,tsx}'],
     languageOptions: { ecmaVersion: 2020, globals: globals.browser },
     plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
     rules: { ...reactHooks.configs.recommended.rules, 'react-refresh/only-export-components': ['warn', { allowConstantExport: true }] } }
 )
 EOF
 cat > index.html << 'EOF'
 <!doctype html><html lang="ru"><head><meta charset="UTF-8" /><link rel="icon" type="image/svg+xml" href="/favicon.svg" />
 <meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Hello Pages</title></head>
 <body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>
 EOF
 cat > public/favicon.svg << 'EOF'
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="75" font-size="75">🚀</text></svg>
 EOF
 cat > src/main.tsx << 'EOF'
 import { StrictMode } from 'react'; import { createRoot } from 'react-dom/client';
 import App from './App.tsx'; import './index.css';
 createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
 EOF
 cat > src/App.tsx << 'EOF'
 import { Header } from './components/Header'; import { About } from './components/About'; import { Projects } from './components/Projects';
 export default function App() {
   return (<div className="app"><Header /><main><About /><Projects /></main>
   <footer className="footer"><p>Deployed with ❤️ to GitHub Pages</p></footer></div>)
 }
 EOF
 cat > src/components/Header.tsx << 'EOF'
 export function Header() { return (<header className="header"><h1>🚀 Hello Pages</h1><p className="subtitle">Демо-проект для GitHub Pages</p></header>) }
 EOF
 cat > src/components/About.tsx << 'EOF'
 export function About() { return (<section className="card"><h2>О проекте</h2><p>Этот сайт автоматически деплоится на <strong>GitHub Pages</strong> при push в <code>main</code>.</p></section>) }
 EOF
 cat > src/components/Projects.tsx << 'EOF'
 const projects = [ { name: 'Go CLI', desc: 'Публикация бинарников' }, { name: 'Go GUI', desc: 'Fyne + MSYS2' }, { name: 'Hello Pages', desc: 'Деплой на GitHub Pages' } ];
 export function Projects() { return (<section className="card"><h2>Проекты</h2><ul>{projects.map((p) => (<li key={p.name}><strong>{p.name}</strong> — {p.desc}</li>))}</ul></section>) }
 EOF
 cat > src/App.test.tsx << 'EOF'
 import { describe, it, expect } from 'vitest'; import { render, screen } from '@testing-library/react'; import App from './App';
 describe('App', () => {
   it('renders header', () => { render(<App />); expect(screen.getByRole('heading', { level: 1, name: /Hello Pages/i })).toBeInTheDocument(); });
   it('renders about', () => { render(<App />); expect(screen.getByRole('heading', { level: 2, name: /О проекте/i })).toBeInTheDocument(); });
 })
 EOF
 cat > src/setupTests.ts << 'EOF'
 import '@testing-library/jest-dom'
 EOF
 cat > src/index.css << 'EOF'
 * { box-sizing: border-box; margin: 0; padding: 0; }
 body { font-family: sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; color: #333; }
 .app { max-width: 800px; margin: 0 auto; padding: 2rem 1rem; }
 .header { text-align: center; color: white; margin-bottom: 2rem; }
 .header h1 { font-size: 3rem; margin-bottom: 0.5rem; }
 .card { background: white; border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
 .card h2 { margin-bottom: 0.75rem; color: #764ba2; }
 .footer { text-align: center; color: white; margin-top: 2rem; opacity: 0.8; }
 EOF
 cat > .github/workflows/ci-cd.yml << 'EOF'
 name: CI/CD
 on:
   push: { branches: [ main ] }
   pull_request:
 permissions: { contents: read, pages: write, id-token: write }
 concurrency: { group: "pages", cancel-in-progress: false }
 jobs:
   ci:
     runs-on: ubuntu-latest
     steps:
       - uses: actions/checkout@v4
       - uses: actions/setup-node@v4
         with: { node-version: '20', cache: npm }
       - run: npm ci
       - run: npm run lint
       - run: npm run type-check
       - run: npm test -- --run
       - run: npm run build
       - uses: actions/upload-artifact@v4
         with: { name: dist, path: dist, retention-days: 1 }
   deploy:
     needs: ci
     if: github.ref == 'refs/heads/main'
     runs-on: ubuntu-latest
     environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }
     steps:
       - uses: actions/download-artifact@v4
         with: { name: dist, path: dist }
       - uses: actions/configure-pages@v5
       - uses: actions/upload-pages-artifact@v3
         with: { path: ./dist }
       - id: deployment
         uses: actions/deploy-pages@v4
 EOF
 cat > .gitignore << 'EOF'
 node_modules/
 dist/
 .env
 .idea/
 .vscode/
 *.local
 .DS_Store
 coverage/
 *.tsbuildinfo
 EOF
 echo "✅ Проект создан!"
```

---

### ⏱️ Шаг 2. Создание `package-lock.json` (1 минута)
Без этого файла CI упадет. Используем Docker, чтобы не мусорить в системе.
```bash
cd ~/hello-pages
mkdir -p ~/.npm-docker-cache
docker run --rm -u "$(id -u):$(id -g)" -e HOME=/tmp \
  -v "$(pwd)":/app -v ~/.npm-docker-cache:/tmp/.npm \
  -w /app node:20-alpine npm install --cache /tmp/.npm
```
*(Для PowerShell на Windows замените `$(id -u):$(id -g)` и кавычки на синтаксис PS, как в исходном тексте).*

---

### ⚠️ Шаг 3. Подготовка GitHub (СЭКОНОМИТ ВАМ ЧАС НЕРВОВ)
1. Создайте на GitHub **пустой** репозиторий с именем строго **`hello-pages`** (без README и .gitignore).
2. **СРАЗУ ЖЕ** зайдите в репозиторий: `Settings` -> `Pages` -> В поле *Source* выберите **GitHub Actions**. 
   *(Если этого не сделать до пуша, деплой упадет с ошибкой `Pages site not found`).*

---

### 📤 Шаг 4. Пуш и первый деплой (3 минуты)
```bash
cd ~/hello-pages
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<ВАШ_USERNAME>/hello-pages.git
git push -u origin main
```
Перейдите во вкладку **Actions** на GitHub. Вы увидите, как `ci` собирает проект, а затем `deploy` (благодаря `needs: ci`) выкатывает его.

---

### 🔄 Шаг 5. Шпаргалка для ежедневной работы
Когда нужно что-то изменить, не ставьте Node.js локально. Используйте этот Docker-конвейер для проверки:

**1. Проверка локально (тесты + сборка):**
```bash
docker run --rm -u "$(id -u):$(id -g)" -e HOME=/tmp \
  -v "$(pwd)":/app -v ~/.npm-docker-cache:/tmp/.npm \
  -w /app node:20-alpine \
  sh -c "npm ci --cache /tmp/.npm && npm test -- --run && npm run build"
```

**2. Деплой:**
```bash
git add .
git commit -m "feat: update content"
git push origin main
```

<img width="2557" height="1262" alt="image" src="https://github.com/user-attachments/assets/0d4b1196-6f94-4ba2-a336-4be137e1718f" />
