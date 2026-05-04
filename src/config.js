// Простая утилита для чтения конфигурации из окружения

const path = require('path');

const config = {
  port: parseInt(process.env.PORT, 10) || 3000,
  env: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || null,
  uploadDir: process.env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads'),
  cloudinaryUrl: process.env.CLOUDINARY_URL || null,
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  maxFileSizeBytes: parseInt(process.env.MAX_FILE_SIZE_BYTES, 10) || 10 * 1024 * 1024 // 10 MB
};

module.exports = config;
