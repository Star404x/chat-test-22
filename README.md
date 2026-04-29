# Simple Chat Bot (Node.js)

This repository contains a simple Node.js chat-bot skeleton. This README explains how to install dependencies, configure the bot token, and run the bot locally.

## Prerequisites

- Node.js v14+ installed
- npm (comes with Node.js)

## Installation

1. Install dependencies:

bash
npm install


## Configuration (BOT token)

The bot requires a token (BOT_TOKEN) to connect to the messaging platform you choose (Telegram, Discord, etc.). Configure the token in one of two ways:

1. Create a `.env` file in the project root with the following content:


BOT_TOKEN=your_token_here


2. Or set an environment variable directly in your shell:

- macOS / Linux (bash/zsh):

bash
export BOT_TOKEN=your_token_here


- Windows (PowerShell):

powershell
$env:BOT_TOKEN="your_token_here"


Note: Never commit your real token to version control. Add `.env` to `.gitignore` (already included).

## Running the bot

Start the bot with:

bash
npm start


For development with auto-restart (requires nodemon):

bash
npm run dev


## What the repository provides

- `src/index.js` — minimal entry point that loads BOT_TOKEN, contains a placeholder command handler (`/ping`, `/help`) and a small CLI demo for quick local testing.
- `package.json` — scripts and dependencies (dotenv for loading `.env`).
- `.gitignore` — ignores `node_modules` and `.env`.

## Example .env


BOT_TOKEN=abc123-your-token


## Next steps

Implement integration with your chosen platform (Telegram, Discord, etc.) inside `src/index.js` or split into modules. Use `process.env.BOT_TOKEN` to authenticate.

## Troubleshooting

- "Missing BOT_TOKEN" error: Ensure `.env` exists or the `BOT_TOKEN` env variable is set before running.

If you need help wiring up a specific platform (Telegram/Discord), follow the platform's official docs for obtaining tokens and API usage.
