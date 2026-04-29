'use strict';

require('dotenv').config();
const readline = require('readline');

const TOKEN = process.env.BOT_TOKEN;

function maskToken(t) {
  if (!t) return '';
  if (t.length <= 8) return '****';
  return t.slice(0, 4) + '...' + t.slice(-4);
}

if (!TOKEN) {
  console.error('Ошибка: переменная окружения BOT_TOKEN не задана. См. README для инструкций.');
  process.exit(1);
}

console.log('Бот запущен (скелет). Токен:', maskToken(TOKEN));
console.log('Введите /help для списка команд.');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

rl.prompt();

rl.on('line', (line) => {
  const input = line.trim();
  if (!input) {
    rl.prompt();
    return;
  }

  if (input === '/help') {
    console.log('Доступные команды:');
    console.log('  /help        - Показать это сообщение');
    console.log('  /ping        - Проверка отклика');
    console.log('  /echo <txt>  - Повторить текст');
    console.log('  /exit        - Выход');
  } else if (input === '/ping') {
    console.log('Pong!');
  } else if (input.startsWith('/echo ')) {
    console.log(input.slice(6));
  } else if (input === '/exit') {
    console.log('Завершение работы...');
    rl.close();
  } else {
    console.log('Неизвестная команда. Введите /help.');
  }

  rl.prompt();
}).on('close', () => {
  process.exit(0);
});
