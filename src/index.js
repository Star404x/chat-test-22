const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();

// Basic optimizations
app.use(compression()); // gzip responses
app.use(express.json());

// Serve static frontend (place site files in /public)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Health check for tests and deployment platforms
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Export app for testing; listen only when run directly
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Mini Shoes Site server listening on port ${port}`);
  });
}

module.exports = app;
