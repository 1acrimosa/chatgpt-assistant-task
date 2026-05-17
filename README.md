# AI Chat App

Фронтенд на React, бэкенд на Node.js + Express, интеграция с OpenAI ChatGPT API.

---

## Требования

Перед началом убедитесь, что на вашем компьютере установлено:

| Инструмент | Версия | Скачать |
|---|---|---|
| **Node.js** | 18 или выше | https://nodejs.org |
| **npm** | поставляется с Node.js | — |
| **OpenAI API Key** | — | https://platform.openai.com/api-keys |

Проверьте версию Node.js командой:
```bash
node -v   # должно быть v18.x.x или выше
npm -v    # должно быть 9.x.x или выше
```

---

## Структура проекта

```
ai-chat-app/
├── backend/          ← Node.js + Express сервер
│   ├── server.js
│   ├── package.json
│   └── .env.example  ← шаблон переменных окружения
├── frontend/         ← React + Vite приложение
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.module.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## Запуск проекта

### Шаг 1 — Клонируйте проект

```bash
git clone https://github.com/1acrimosa/chatgpt-assistant-task.git
cd ai-chat-app

```

---

### Шаг 2 — Настройте бэкенд

```bash
# Перейдите в папку backend
cd backend

# Установите зависимости
npm install

# Создайте файл .env (скопируйте из примера)
cp .env.example .env
```

Откройте файл `.env` в любом текстовом редакторе и вставьте ваш OpenAI ключ:

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PORT=3001
FRONTEND_URL=http://localhost:5173
```

---

### Шаг 3 — Настройте фронтенд

Откройте новое окно терминала:

```bash
# Перейдите в папку frontend
cd frontend

# Установите зависимости
npm install
```

---

### Шаг 4 — Запустите оба сервера

**Терминал 1:**
```bash
cd backend
npm run dev
# → Backend running at http://localhost:3001
```

**Терминал 2:**
```bash
cd frontend
npm run dev
# → Local: http://localhost:5173
```

---

### Шаг 5 — Откройте приложение

Перейдите в браузере на: http://localhost:5173

---

## Голосовой ввод

Кнопка с иконкой микрофона работает через Web Speech API.

- Работает в **Google Chrome** и **Microsoft Edge**
