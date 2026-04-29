const dotenv = require('dotenv');
const readline = require('readline');

dotenv.config();

const TOKEN = process.env.TOKEN || process.env.BOT_TOKEN;
if (!TOKEN) {
  console.warn('Warning: TOKEN is not set. The bot will run locally without external API access.');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

console.log('Simple Node.js Chat Bot');
console.log('Type "help" for available commands.');
rl.prompt();

rl.on('line', (line) => {
  const input = line.trim();
  if (!input) {
    rl.prompt();
    return;
  }

  const [cmd, ...args] = input.split(' ');
  switch (cmd.toLowerCase()) {
    case 'help':
      console.log('Available commands: help, ping, echo <text>, token, exit');
      break;
    case 'ping':
      console.log('pong');
      break;
    case 'echo':
      console.log(args.join(' '));
      break;
    case 'token':
      console.log(TOKEN ? 'Token is set.' : 'Token is not set.');
      break;
    case 'exit':
      rl.close();
      break;
    default:
      console.log('Unknown command. Type "help" for commands.');
  }

  rl.prompt();
}).on('close', () => {
  console.log('Goodbye!');
  process.exit(0);
});
