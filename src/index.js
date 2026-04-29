#!/usr/bin/env node
const readline = require('readline');

const BOT_NAME = process.env.BOT_NAME || 'Bot';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `${BOT_NAME}> `
});

console.log(`${BOT_NAME} запущен. Наберите /help для списка команд.`);
rl.prompt();

rl.on('line', (line) => {
  const input = line.trim();
  if (!input) { rl.prompt(); return; }

  switch (input) {
    case '/help':
      console.log('Доступные команды:\n/help - показать справку\n/hello - поздороваться\n/exit - выйти');
      break;
    case '/hello':
      console.log(`Привет! Я ${BOT_NAME}. Чем могу помочь?`);
      break;
    case '/exit':
      console.log('До свидания!');
      rl.close();
      return;
    default:
      console.log(`Неизвестная команда: ${input}. Наберите /help.`);
  }

  rl.prompt();
}).on('close', () => {
  process.exit(0);
});
