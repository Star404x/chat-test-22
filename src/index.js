const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Ensure uploads directory exists at project root
const uploadsRoot = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsRoot)) {
  fs.mkdirSync(uploadsRoot, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsRoot);
  },
  filename: function (req, file, cb) {
    // preserve original name but prefix timestamp to avoid clashes
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${timestamp}_${safeName}`);
  }
});

const upload = multer({ storage });

// Serve uploaded files
app.use('/uploads', express.static(uploadsRoot));

app.get('/', (req, res) => {
  res.json({ message: 'Mini Photo Site backend is running', endpoints: ['/upload (POST)', '/photos (GET)', '/uploads/:file'] });
});

app.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded. Field name should be "photo".' });
  }

  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ filename: req.file.filename, originalName: req.file.originalname, size: req.file.size, url: fileUrl });
});

app.get('/photos', (req, res) => {
  fs.readdir(uploadsRoot, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to read uploads folder' });

    const photos = files
      .filter(f => !f.startsWith('.'))
      .map(f => ({ filename: f, url: `${req.protocol}://${req.get('host')}/uploads/${f}` }));

    res.json(photos);
  });
});

// simple error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Mini Photo Site backend listening on port ${PORT}`);
});
