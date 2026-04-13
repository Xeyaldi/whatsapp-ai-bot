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
║       🚀 HT BOTS AI WHATSAPP 🚀       ║
║             Vᴇʀsɪʏᴀ 1.0.0             ║
╚═══════════════════════════════════════╝
`);

const client = new Client({
  authStrategy: new LocalAuth({ clientId: 'ht-ai-bot' }),
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
  console.log('\n📱 QR Kᴏᴅᴜ WʜᴀᴛsAᴘᴘ ɪʟə sᴋᴀɴ ᴇᴅɪɴ:\n');
  qrcode.generate(qr, { small: true });
  console.log('\nWʜᴀᴛsAᴘᴘ > Sᴏzʟəᴍəʟəʀ > Əʟᴀᴠə Cɪʜᴀᴢʟᴀʀ > Cɪʜᴀᴢı Bağʟᴀ\n');
});

client.on('loading_screen', (percent, message) => {
  console.log(`Yüᴋʟəɴɪʀ: ${percent}% - ${message}`);
});

client.on('authenticated', () => {
  console.log('✅ Gɪʀɪş ᴜğᴜʀʟᴜᴅᴜʀ!');
});

client.on('auth_failure', (msg) => {
  console.error('❌ Gɪʀɪş ʙᴀş ᴛᴜᴛᴍᴀᴅı:', msg);
  process.exit(1);
});

client.on('ready', () => {
  console.log(`
╔═══════════════════════════════════════╗
║      ✅ HT BOT İsᴛɪғᴀᴅəʏə Hᴀᴢıʀᴅıʀ!   ║
║                                        ║
║   Əᴍʀʟəʀ: ${config.prefix}help                 ║
╚═══════════════════════════════════════╝
`);
});

client.on('disconnected', (reason) => {
  console.log('❌ Bᴏᴛ ᴅᴀʏᴀɴᴅı:', reason);
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
      return;
    }
    
    const args = body.slice(config.prefix.length).trim().split(/\s+/);
    const commandName = args.shift().toLowerCase();
    
    console.log(`[${new Date().toLocaleString()}] Əᴍʀ: ${commandName} | Göɴᴅəʀəɴ: ${message.from}`);
    
    const command = commands[commandName];
    if (command) {
      await command(message, args);
    } else {
      await message.reply(`Bᴇʟə ʙɪʀ əᴍʀ ʏᴏxᴅᴜʀ: ${commandName}\n\nMöᴠᴄᴜᴅ əᴍʀʟəʀ üçüɴ ${config.prefix}help ʏᴀᴢıɴ. ✨`);
    }
    
  } catch (error) {
    console.error('Mesaj xətası:', error);
  }
});

client.on('message_create', async (message) => {
  if (message.fromMe && message.body === '!status') {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    await message.reply(`🤖 HT Bᴏᴛ Sᴛᴀᴛᴜs: Oɴʟɪɴᴇ ✅\n⏰ Aᴋᴛɪᴠʟɪᴋ: ${hours}s ${minutes}ᴅ`);
  }
});

process.on('SIGINT', async () => {
  console.log('\n🛑 Bᴏᴛ söɴᴅürüʟüʀ...');
  await client.destroy();
  process.exit(0);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

console.log('🚀 HT AI Bᴏᴛ ʙᴀşʟᴀᴅıʟıʀ...\n');
client.initialize();
