'use strict';
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const express = require('express');
const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const copyFile = promisify(fs.copyFile);

async function ensureDir(dir) {
  try {
    await mkdir(dir, { recursive: true });
  } catch (e) {
    // ignore
  }
}

function isTextFile(filePath) {
  const exts = ['.html', '.css', '.js', '.json', '.svg', '.txt'];
  return exts.includes(path.extname(filePath).toLowerCase());
}

function minifyHtml(content) {
  return content
    .replace(/<!--([\s\S]*?)-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function minifyCss(content) {
  return content
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .trim();
}

function minifyJs(content) {
  // Very naive JS minifier: remove line comments and collapse multiple spaces
  return content
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

async function processFile(srcPath, destPath) {
  await ensureDir(path.dirname(destPath));
  if (!isTextFile(srcPath)) {
    await copyFile(srcPath, destPath);
    return;
  }
  const content = await readFile(srcPath, 'utf8');
  const ext = path.extname(srcPath).toLowerCase();
  let out = content;
  if (ext === '.html') out = minifyHtml(content);
  else if (ext === '.css') out = minifyCss(content);
  else if (ext === '.js') out = minifyJs(content);
  // For other text types we keep as-is
  await writeFile(destPath, out, 'utf8');
}

async function copyRecursive(srcDir, destDir) {
  const entries = await readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      await copyRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      await processFile(srcPath, destPath);
    }
  }
}

async function build() {
  const root = process.cwd();
  const publicDir = path.join(root, 'public');
  const distDir = path.join(root, 'dist');
  try {
    await ensureDir(distDir);
    const stats = await stat(publicDir);
    if (!stats.isDirectory()) {
      console.warn('No public/ directory with static site found. Skipping copy.');
      return;
    }
    console.log('Optimizing and copying files from public/ to dist/ ...');
    await copyRecursive(publicDir, distDir);
    console.log('Build complete. Files in dist/.');
  } catch (err) {
    console.warn('public/ folder not found, nothing to build.');
  }
}

function startServer() {
  const app = express();
  const distDir = path.join(process.cwd(), 'dist');
  app.use(express.static(distDir));
  // fallback to index.html
  app.get('*', (req, res) => {
    const index = path.join(distDir, 'index.html');
    if (fs.existsSync(index)) res.sendFile(index);
    else res.status(404).send('Not Found');
  });
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
}

async function main() {
  const arg = process.argv[2];
  if (arg === 'build') {
    await build();
    return;
  }
  if (arg === 'start' || !arg) {
    // ensure dist exists
    const dist = path.join(process.cwd(), 'dist');
    try {
      await stat(dist);
    } catch (e) {
      console.log('dist/ not found. Run `npm run build` first.');
    }
    startServer();
    return;
  }
  console.log('Unknown command. Use `build` or `start`.');
}

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
