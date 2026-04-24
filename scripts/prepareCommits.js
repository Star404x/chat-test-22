const { execSync } = require('child_process');

function run(cmd) {
  console.log('> ' + cmd);
  return execSync(cmd, { stdio: 'inherit' });
}

function getOutput(cmd) {
  return execSync(cmd).toString().trim();
}

try {
  const cwdBranch = getOutput('git rev-parse --abbrev-ref HEAD');
  console.log('Current branch:', cwdBranch);

  const status = getOutput('git status --porcelain');
  if (status) {
    console.log('Found uncommitted changes. Staging and committing...');
    run('git add -A');
    try {
      run('git commit -m "chore: prepare commit for dev/auto branches"');
    } catch (e) {
      console.log('No changes to commit or commit failed:', e.message);
    }
  } else {
    console.log('Working directory is clean. Nothing to commit.');
  }

  // Create/checkout dev branch
  try {
    run('git checkout -B dev');
    run('git push -u origin dev');
  } catch (e) {
    console.error('Failed to create/push dev branch:', e.message);
  }

  // Create/checkout auto branch
  try {
    run('git checkout -B auto');
    run('git push -u origin auto');
  } catch (e) {
    console.error('Failed to create/push auto branch:', e.message);
  }

  // Return to original branch
  try {
    run(`git checkout ${cwdBranch}`);
  } catch (e) {
    console.error('Failed to return to original branch:', e.message);
  }

  console.log('\nDone. Please verify branches dev and auto on remote.');
} catch (err) {
  console.error('Error during prepareCommits:', err.message);
  process.exit(1);
}
