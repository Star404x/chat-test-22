# Simple Node.js Chat Bot

This repository contains a minimal local chat bot implemented in Node.js. The bot responds to simple commands typed in the terminal.

Prerequisites

- Node.js 14+ installed

Installation

1. Install dependencies:

bash
npm install


Configuration (token)

The bot can optionally use an external token (for future integrations). To set the token, create a `.env` file or set an environment variable:

- .env file (create .env in project root):


TOKEN=your_api_token_here


- Or export an environment variable (Linux/macOS):

bash
export TOKEN=your_api_token_here


Running

Start the bot:

bash
npm start


You will see a prompt `>` where you can type commands. Available commands:

- `help` — list commands
- `ping` — bot replies `pong`
- `echo <text>` — bot echoes the text
- `token` — shows whether a token is set
- `exit` — quit the bot

Notes

- If TOKEN is not set, the bot still runs locally and responds to commands, but any external integrations depending on a token will not function.
- To extend the bot, edit `src/index.js` and add command handlers.
