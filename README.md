# AI Chat App

Полноценное веб-приложение с AI-чатом. Фронтенд на React, бэкенд на Node.js + Express, интеграция с OpenAI ChatGPT API.

![Preview](./preview.png)

---

## 📋 Требования

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

## 📁 Структура проекта

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

## 🚀 Запуск проекта

### Шаг 1 — Клонируйте/скачайте проект

```bash
# Если у вас git:
git clone <ссылка-на-репозиторий>
cd ai-chat-app

# Или просто распакуйте архив и откройте папку в терминале
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

> 💡 **Где взять API ключ?** Зайдите на https://platform.openai.com/api-keys → "Create new secret key" → скопируйте.

---

### Шаг 3 — Настройте фронтенд

Откройте **новое окно терминала** (бэкенд должен остаться работать):

```bash
# Перейдите в папку frontend
cd frontend

# Установите зависимости
npm install
```

---

### Шаг 4 — Запустите оба сервера

**Терминал 1 (бэкенд):**
```bash
cd backend
npm run dev
# → Backend running at http://localhost:3001
```

**Терминал 2 (фронтенд):**
```bash
cd frontend
npm run dev
# → Local: http://localhost:5173
```

---

### Шаг 5 — Откройте приложение

Перейдите в браузере на: **http://localhost:5173**

---

## 🎤 Голосовой ввод

Кнопка с иконкой микрофона работает через Web Speech API (встроено в браузер).

- Работает в **Google Chrome** и **Microsoft Edge**
- В Firefox и Safari голосовой ввод **не поддерживается**
- При первом использовании браузер спросит разрешение на микрофон — нажмите "Разрешить"

---

## 🛠️ Скрипты

| Команда | Описание |
|---|---|
| `npm run dev` | Запуск в режиме разработки (с hot-reload) |
| `npm start` | Запуск в продакшн-режиме (только backend) |
| `npm run build` | Сборка фронтенда для продакшна |

---

## ⚠️ Возможные проблемы

### ❌ "OpenAI API key is not configured"
→ Проверьте, что в `backend/.env` прописан `OPENAI_API_KEY` и файл называется `.env` (не `.env.example`).

### ❌ "Failed to get a response"
→ Убедитесь, что бэкенд запущен (`npm run dev` в папке backend) и работает на порту 3001.

### ❌ Порт 3001 или 5173 уже занят
→ Измените порт в `backend/.env` (`PORT=3002`) и в `frontend/vite.config.js` (`proxy target`).

### ❌ Ошибка 429 от OpenAI
→ Превышен лимит запросов. Подождите немного или проверьте баланс на https://platform.openai.com/usage.

---

## 🔧 Технологии

| Слой | Технология |
|---|---|
| Frontend | React 18, Vite, CSS Modules |
| Backend | Node.js, Express |
| AI | OpenAI GPT-3.5-turbo |
| Голос | Web Speech API (браузерный) |

---

## 📝 Примечания

- Приложение использует модель `gpt-3.5-turbo` — она дешевле и быстрее `gpt-4`.
- История диалога **не сохраняется** между перезагрузками страницы (каждый запрос независим).
- Для продакшн-деплоя рекомендуется скрыть API ключ на сервере и не передавать его на фронтенд.
