const express = require("express");
const app = express();
app.use(express.json());

let items = [
  { id: 1, name: "Example item" }
];

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }
  const item = { id: Date.now(), name };
  items.push(item);
  res.status(201).json(item);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
