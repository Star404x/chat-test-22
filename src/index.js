const http = require('http');

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    message: 'Minimal Project: server is running',
    path: req.url,
    method: req.method,
    port: PORT
  }));
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
