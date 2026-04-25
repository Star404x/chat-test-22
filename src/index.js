const express = require('express');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

// Export app for testing
module.exports = app;

// If run directly, start the server
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
}
