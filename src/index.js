const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files if a build exists in /public
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

// Healthcheck
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Placeholder for upload endpoint (to be implemented)
app.post('/upload', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
