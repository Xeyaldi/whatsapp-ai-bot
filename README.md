# WhatsApp AI Bot

<p align="center">
  <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
  <img src="https://img.shields.io/badge/Platform-Windows%20%7C%20Linux%20%7C%20Mac-lightgrey" />
</p>

A powerful AI-powered WhatsApp Bot built with Node.js, featuring OpenAI integration, weather updates, jokes, quotes, sticker maker, and more!

## Features

| Feature | Command | Description |
|---------|---------|-------------|
| AI Chat | `/ai <question>` | Chat with GPT-3.5 Turbo |
| Weather | `/weather <city>` | Get real-time weather info |
| Jokes | `/joke` | Get random programming jokes |
| Quotes | `/quote` | Get motivational quotes |
| Sticker | `/sticker` | Convert image to sticker |
| Ping | `/ping` | Check bot response time |
| Info | `/info` | Get bot information |
| Help | `/help` | Show all commands |

## Quick Start

### Prerequisites

- Node.js 16+ installed
- WhatsApp account
- OpenAI API key (optional, for AI feature)

### Installation

```bash
# Clone the repository
git clone https://github.com/DAXXTEAM/whatsapp-ai-bot.git

# Navigate to directory
cd whatsapp-ai-bot

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your settings
nano .env

# Start the bot
npm start
```

### First Run

1. Run `npm start`
2. QR code will appear in terminal
3. Open WhatsApp on your phone
4. Go to Settings > Linked Devices > Link a Device
5. Scan the QR code
6. Bot is ready!

## Configuration

Edit `.env` file:

```env
# OpenAI API Key (Get from https://platform.openai.com/api-keys)
OPENAI_API_KEY=sk-your-key-here

# Bot Configuration
BOT_NAME=AI Assistant
OWNER_NUMBER=919999999999

# Features Toggle (true/false)
ENABLE_AI=true
ENABLE_WEATHER=true
ENABLE_JOKES=true
ENABLE_QUOTES=true

# Auto Reply Settings
WELCOME_MESSAGE=Hello! I'm an AI Assistant. Type /help for commands.
```

## Commands

### `/ai <question>`
Chat with OpenAI's GPT-3.5 Turbo. Maintains conversation context.

```
/ai What is JavaScript?
/ai Explain React hooks
/ai Write a poem about coding
```

### `/weather <city>`
Get current weather information for any city.

```
/weather Mumbai
/weather New York
/weather London
```

### `/joke`
Get a random programming joke.

### `/quote`
Get a motivational quote.

### `/sticker`
Convert an image to a WhatsApp sticker. Reply to an image with `/sticker`.

### `/ping`
Check bot response time in milliseconds.

### `/info`
Get bot information including uptime, memory usage, and enabled features.

## Project Structure

```
whatsapp-ai-bot/
├── index.js           # Main bot file
├── config.js          # Configuration loader
├── package.json       # Dependencies
├── .env.example       # Environment template
├── .gitignore         # Git ignore rules
└── commands/          # Command handlers
    ├── help.js        # Help command
    ├── ai.js          # AI chat command
    ├── weather.js     # Weather command
    ├── joke.js        # Joke command
    ├── quote.js       # Quote command
    ├── ping.js        # Ping command
    ├── info.js        # Info command
    └── sticker.js     # Sticker command
```

## Deployment

### Running 24/7

#### Option 1: PM2 (Recommended)
```bash
npm install -g pm2
pm2 start index.js --name "whatsapp-bot"
pm2 save
pm2 startup
```

#### Option 2: Screen (Linux)
```bash
screen -S whatsapp-bot
npm start
# Press Ctrl+A then D to detach
```

#### Option 3: Replit
1. Fork this repository
2. Import to Replit
3. Add secrets in Replit Secrets tab
4. Run the bot

### VPS Requirements
- RAM: 512MB minimum (1GB recommended)
- Storage: 1GB
- OS: Ubuntu 20.04+ / Debian 11+

## APIs Used

| API | Purpose | Free Tier |
|-----|---------|-----------|
| OpenAI | AI Chat | $5 free credit |
| wttr.in | Weather | Unlimited |
| Official Joke API | Jokes | Unlimited |
| Quotable | Quotes | Unlimited |

## Troubleshooting

### QR Code not showing
```bash
# Clear auth folder and restart
rm -rf .wwebjs_auth
npm start
```

### Puppeteer errors on Linux
```bash
# Install Chrome dependencies
sudo apt-get install -y gconf-service libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

### Bot disconnects frequently
- Keep your phone connected to internet
- Don't use WhatsApp Web on another browser simultaneously
- Check if phone battery saver is killing background apps

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file

## Author

**DAXXTEAM**
- GitHub: [@DAXXTEAM](https://github.com/DAXXTEAM)
- Portfolio: [portfolio.vclub.tech](https://portfolio.vclub.tech)

## Disclaimer

This bot is for educational purposes only. Use responsibly and follow WhatsApp's Terms of Service. The developers are not responsible for any misuse.

---

<p align="center">
  Made with ❤️ by DAXXTEAM
</p>
