const fs = require('fs');
const path = require('path');

test('package.json has required scripts (start, test, prepare)', () => {
  const pkgPath = path.resolve(__dirname, '../package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const scripts = pkg.scripts || {};

  const hasTest = !!scripts.test;
  const hasStart = !!(scripts.start || scripts.dev || scripts['start:dev']);
  const hasPrepare = !!(
    scripts['prepare:dev-auto'] ||
    scripts['prepare-dev-auto'] ||
    scripts.prepare ||
    scripts['prepare']
  );

  expect(hasTest).toBe(true);
  expect(hasStart).toBe(true);
  expect(hasPrepare).toBe(true);
});

test('README contains install/run/test instructions and mentions dev/auto', () => {
  const readme = fs.readFileSync(path.resolve(__dirname, '../README.md'), 'utf8');
  const low = readme.toLowerCase();
  expect(low).toMatch(/install|installation/);
  expect(low).toMatch(/run/);
  expect(low).toMatch(/test/);
  expect(readme).toMatch(/dev\/auto/);
});

test('prepare-dev-auto script exists and contains git checkout command', () => {
  const scriptPath = path.resolve(__dirname, '../scripts/prepare-dev-auto.sh');
  const exists = fs.existsSync(scriptPath);
  expect(exists).toBe(true);
  if (exists) {
    const s = fs.readFileSync(scriptPath, 'utf8');
    expect(s).toMatch(/git checkout -B dev\/auto/);
  }
});
