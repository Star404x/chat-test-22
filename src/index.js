const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from express-api-test-3' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
