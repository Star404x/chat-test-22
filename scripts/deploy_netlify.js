const { execSync } = require('child_process');
const path = require('path');

function usage() {
  console.log('Usage: node scripts/deploy_netlify.js --site <SITE_ID> [--prod]');
  process.exit(1);
}

const args = process.argv.slice(2);
let siteId = null;
let isProd = false;
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--site') {
    siteId = args[i + 1];
    i++;
  } else if (a === '--prod') {
    isProd = true;
  }
}

if (!siteId) usage();

try {
  console.log('1/3: Building project...');
  execSync('npm run build', { stdio: 'inherit' });

  const buildDir = path.join(process.cwd(), 'build');
  console.log(`2/3: Build output directory: ${buildDir}`);

  console.log('3/3: Deploying to Netlify...');
  const prodFlag = isProd ? '--prod' : '';

  // Ensure netlify-cli is installed globally or in the project
  execSync(`npx netlify deploy --dir=${buildDir} --site=${siteId} ${prodFlag}`, { stdio: 'inherit' });

  console.log('Deploy finished. Если деплой в продакшн, убедитесь, что в Netlify заданы переменные окружения.');
} catch (err) {
  console.error('Ошибка при деплое:', err.message || err);
  process.exit(1);
}
