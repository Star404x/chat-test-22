'use strict';

const { spawnSync } = require('child_process');

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, { stdio: 'inherit', ...opts });
  if (res.error) {
    console.error('Failed to run', cmd, args, res.error);
    process.exit(1);
  }
  if (res.status !== 0) {
    process.exit(res.status);
  }
}

// Fetch remote updates first
run('git', ['fetch']);

// Check if branch exists locally
const branchName = 'dev/auto';

const check = spawnSync('git', ['rev-parse', '--verify', branchName]);
if (check.status === 0) {
  console.log(`Branch ${branchName} exists locally, checking out.`);
  run('git', ['checkout', branchName]);
} else {
  console.log(`Branch ${branchName} does not exist locally, trying to create from current HEAD.`);
  run('git', ['checkout', '-b', branchName]);
}

// Push and set upstream
run('git', ['push', '-u', 'origin', branchName]);

console.log(`Branch ${branchName} is prepared and pushed.`);
