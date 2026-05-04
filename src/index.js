const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
// Статические файлы фронтенда (папка public/)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Простая health-check точка
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// TODO: добавить эндпоинты для загрузки/списка/удаления фотографий

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
