const dotenv = require('dotenv');
dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN || null;

if (!BOT_TOKEN) {
  console.warn('Warning: BOT_TOKEN is not set. Running in demo mode.');
} else {
  console.log('BOT_TOKEN detected. Starting bot...');
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

console.log('Simple Node Bot');
console.log('Type /help for commands. Input is treated as incoming messages.');

rl.prompt();

rl.on('line', (line) => {
  const input = line.trim();
  if (!input) {
    rl.prompt();
    return;
  }

  if (input === '/help') {
    console.log('Commands:');
    console.log('  /help         Show this help');
    console.log('  /echo <text>  Echo back the text');
    console.log('  /exit         Quit');
  } else if (input.startsWith('/echo ')) {
    const text = input.slice(6);
    console.log('Echo:', text);
  } else if (input === '/exit') {
    console.log('Goodbye!');
    rl.close();
  } else {
    console.log('Bot reply:', defaultReply(input));
  }

  rl.prompt();
}).on('close', () => {
  process.exit(0);
});

function defaultReply(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('hello') || lower.includes('hi')) return 'Hello! How can I help?';
  if (lower.includes('time')) return `Current time: ${new Date().toLocaleString()}`;
  return `You said: "${msg}"`;
}
