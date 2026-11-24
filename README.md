![CI](https://github.com/Darina-eva/ahj-http/actions/workflows/web.yml/badge.svg)

# HelpDesk

Фронтенд для сервиса управления заявками (тикетами), работающий с готовым API через `fetch`: список тикетов, создание, редактирование, удаление (с подтверждением), отметка о выполнении и просмотр подробного описания по клику на тикет (отдельным запросом `ticketById`). Все данные хранятся на сервере.

[GitHub Pages](https://darina-eva.github.io/ahj-http/)

## Запуск сервера

Фронтенд обращается к серверу по адресу `http://localhost:7070` (см. `src/js/config.js`).

```bash
cd backend
npm install
npm start
```
