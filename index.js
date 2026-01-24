const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const config = require('./config');

const helpCmd = require('./commands/help');
const aiCmd = require('./commands/ai');
const weatherCmd = require('./commands/weather');
const jokeCmd = require('./commands/joke');
const quoteCmd = require('./commands/quote');
const pingCmd = require('./commands/ping');
const infoCmd = require('./commands/info');
const stickerCmd = require('./commands/sticker');

console.log(`
╔═══════════════════════════════════════╗
║     WhatsApp AI Bot by DAXXTEAM       ║
║         Version 1.0.0                  ║
╚═══════════════════════════════════════╝
`);

const client = new Client({
  authStrategy: new LocalAuth({ clientId: 'whatsapp-ai-bot' }),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ],
  },
});

client.on('qr', (qr) => {
  console.log('\n📱 Scan this QR code with WhatsApp:\n');
  qrcode.generate(qr, { small: true });
  console.log('\nOpen WhatsApp > Settings > Linked Devices > Link a Device\n');
});

client.on('loading_screen', (percent, message) => {
  console.log(`Loading: ${percent}% - ${message}`);
});

client.on('authenticated', () => {
  console.log('✅ Authentication successful!');
});

client.on('auth_failure', (msg) => {
  console.error('❌ Authentication failed:', msg);
  process.exit(1);
});

client.on('ready', () => {
  console.log(`
╔═══════════════════════════════════════╗
║       ✅ Bot is ready to use!          ║
║                                        ║
║   Commands: ${config.prefix}help              ║
╚═══════════════════════════════════════╝
`);
});

client.on('disconnected', (reason) => {
  console.log('❌ Bot disconnected:', reason);
  process.exit(1);
});

const commands = {
  help: helpCmd,
  ai: aiCmd,
  weather: weatherCmd,
  joke: jokeCmd,
  quote: quoteCmd,
  ping: pingCmd,
  info: infoCmd,
  sticker: stickerCmd,
};

client.on('message', async (message) => {
  try {
    if (message.from === 'status@broadcast') return;
    if (message.fromMe) return;
    
    const body = message.body.trim();
    
    if (!body.startsWith(config.prefix)) {
      if (config.features.ai && config.openaiKey && body.length > 0) {
      }
      return;
    }
    
    const args = body.slice(config.prefix.length).trim().split(/\s+/);
    const commandName = args.shift().toLowerCase();
    
    console.log(`[${new Date().toLocaleString()}] Command: ${commandName} from ${message.from}`);
    
    const command = commands[commandName];
    if (command) {
      await command(message, args);
    } else {
      await message.reply(`Unknown command: ${commandName}\n\nType ${config.prefix}help for available commands.`);
    }
    
  } catch (error) {
    console.error('Message handling error:', error);
  }
});

client.on('message_create', async (message) => {
  if (message.fromMe && message.body === '!status') {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    await message.reply(`🤖 Bot Status: Online\n⏰ Uptime: ${hours}h ${minutes}m`);
  }
});

process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down bot...');
  await client.destroy();
  process.exit(0);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

console.log('🚀 Starting WhatsApp AI Bot...\n');
client.initialize();
