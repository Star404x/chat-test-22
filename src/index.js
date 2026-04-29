const dotenv = require('dotenv');
dotenv.config();

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error('Missing BOT_TOKEN. Set it in environment or in a .env file. See README.md for details.');
  process.exit(1);
}

console.log('BOT_TOKEN loaded. Bot is starting...');

// TODO: Replace this placeholder with actual platform integration (Telegram, Discord, etc.)

function handleMessage(message) {
  if (!message) return;
  const text = message.trim().toLowerCase();
  if (text === '/ping') {
    return 'Pong!';
  } else if (text === '/help') {
    return 'Available commands: /ping, /help';
  } else {
    return "I don't understand that command. Type /help.";
  }
}

// CLI demo for quick local testing
if (require.main === module) {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });
  console.log('Chat-bot CLI demo. Type a command (Ctrl+C to exit).');
  readline.on('line', line => {
    const reply = handleMessage(line);
    if (reply) console.log('Bot:', reply);
  });
}

module.exports = { handleMessage };
