const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  downloadMediaMessage,
} = require('@whiskeysockets/baileys');

const pino = require('pino');
const { Boom } = require('@hapi/boom');
const readline = require('readline');
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

// ── Komandalar xəritəsi ─────────────────────────
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

// ── Store (mesaj keşi) ──────────────────────────
const store = makeInMemoryStore({
  logger: pino().child({ level: 'silent', stream: 'store' }),
});

// ── Nömrə soruşma ───────────────────────────────
function askPhoneNumber() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question('📱 Nömrəni daxil et (məs: 994501234567): ', (ans) => {
      rl.close();
      resolve(ans.replace(/[^0-9]/g, '').trim());
    });
  });
}

// ── Mesaj mətnini al ────────────────────────────
function getMessageText(msg) {
  return (
    msg.message?.conversation ||
    msg.message?.extendedTextMessage?.text ||
    msg.message?.imageMessage?.caption ||
    msg.message?.videoMessage?.caption ||
    ''
  );
}

// ── Köhnə whatsapp-web.js API-yə uyğun wrapper ──
// Bütün commands/ faylları dəyişmədən işləsin
function buildMessageWrapper(sock, msg, from) {
  const body = getMessageText(msg);

  return {
    body,
    from,
    fromMe: msg.key.fromMe || false,
    author: msg.key.participant || from,
    id: msg.key,

    // reply() — köhnə API ilə eyni imza
    reply: (text) =>
      sock.sendMessage(from, { text: String(text) }, { quoted: msg }),

    // downloadMedia() — sticker komandası üçün
    downloadMedia: () =>
      downloadMediaMessage(
        msg,
        'buffer',
        {},
        { reuploadRequest: sock.updateMediaMessage }
      ),

    // Lazım olsa Baileys-in orijinal mesajına giriş
    _raw: msg,
  };
}

// ── Ana funksiya ────────────────────────────────
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./sessions');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,   // ← QR terminal-a çıxmır
    auth: state,
    browser: ['HT AI Bot', 'Chrome', '3.0.0'],
    generateHighQualityLinkPreview: true,
  });

  store.bind(sock.ev);

  // ── Pairing code (yalnız ilk qoşulmada) ────────
  if (!sock.authState.creds.registered) {
    const phone = await askPhoneNumber();
    if (!phone) {
      console.error('❌ Nömrə daxil edilmədi! Proqram dayandırılır.');
      process.exit(1);
    }
    const code = await sock.requestPairingCode(phone);
    const formatted = code.match(/.{1,4}/g)?.join('-') ?? code;
    console.log(`
┌──────────────────────────────────────┐
│  🔑 Pairing Code: ${formatted.padEnd(9)}            │
│                                      │
│  WhatsApp → Parametrlər              │
│  → Əlavə Cihazlar                    │
│  → Telefon nömrəsi ilə bağla         │
│  → Kodu daxil et                     │
└──────────────────────────────────────┘
`);
  }

  // ── Bağlantı hadisələri ─────────────────────────
  sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
    if (connection === 'close') {
      const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode;
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
      console.log('❌ Bağlantı kəsildi, kod:', statusCode);
      if (shouldReconnect) {
        console.log('🔄 Yenidən qoşulunur...');
        startBot();
      } else {
        console.log('🛑 Hesabdan çıxış edildi.');
        process.exit(0);
      }
    } else if (connection === 'open') {
      console.log(`
╔═══════════════════════════════════════╗
║      ✅ HT BOT İsᴛɪғᴀᴅəʏə Hᴀᴢıʀᴅıʀ!   ║
║                                        ║
║   Əᴍʀʟəʀ: ${config.prefix}help                 ║
╚═══════════════════════════════════════╝
`);
    } else if (connection === 'connecting') {
      console.log('🔗 Qoşulunur...');
    }
  });

  sock.ev.on('creds.update', saveCreds);

  // ── Mesaj hadisəsi ──────────────────────────────
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    for (const msg of messages) {
      if (!msg.message) continue;

      const from = msg.key.remoteJid;
      if (!from || from === 'status@broadcast') continue;

      const body = getMessageText(msg);

      // ── Özündən gələn !status komandası ───────
      if (msg.key.fromMe) {
        if (body === '!status') {
          const uptime = process.uptime();
          const h = Math.floor(uptime / 3600);
          const m = Math.floor((uptime % 3600) / 60);
          await sock.sendMessage(
            from,
            { text: `🤖 HT Bᴏᴛ Sᴛᴀᴛᴜs: Oɴʟɪɴᴇ ✅\n⏰ Aᴋᴛɪᴠʟɪᴋ: ${h}s ${m}ᴅ` },
            { quoted: msg }
          );
        }
        continue;
      }

      // ── Prefix yoxlama ─────────────────────────
      if (!body.startsWith(config.prefix)) continue;

      const args = body.slice(config.prefix.length).trim().split(/\s+/);
      const commandName = args.shift()?.toLowerCase();
      if (!commandName) continue;

      const sender = msg.key.participant || from;
      console.log(`[${new Date().toLocaleString()}] Əᴍʀ: ${commandName} | Göɴᴅəʀəɴ: ${sender}`);

      const message = buildMessageWrapper(sock, msg, from);

      try {
        const command = commands[commandName];
        if (command) {
          await command(message, args);
        } else {
          await message.reply(
            `Bᴇʟə ʙɪʀ əᴍʀ ʏᴏxᴅᴜʀ: ${commandName}\n\nMöᴠᴄᴜᴅ əᴍʀʟəʀ üçüɴ ${config.prefix}help ʏᴀᴢıɴ. ✨`
          );
        }
      } catch (error) {
        console.error('Mesaj xətası:', error);
      }
    }
  });
}

// ── Çıxış idarəetməsi ───────────────────────────
process.on('SIGINT', async () => {
  console.log('\n🛑 Bᴏᴛ söɴᴅürüʟüʀ...');
  process.exit(0);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

// ── Başlat ──────────────────────────────────────
console.log('🚀 HT AI Bᴏᴛ ʙᴀşʟᴀᴅıʟıʀ...\n');
startBot().catch(console.error);
