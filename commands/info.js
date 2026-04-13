const config = require('../config');
const os = require('os');

module.exports = async (message) => {
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  
  const memUsage = process.memoryUsage();
  const memMB = Math.round(memUsage.heapUsed / 1024 / 1024);
  
  const infoText = `*🚀 ${config.botName} - Məʟᴜᴍᴀᴛʟᴀʀ 🚀*\n\n` +
    `📛 Aᴅı: ${config.botName}\n` +
    `🔢 Vᴇʀsɪʏᴀ: 1.0.0 🛠️\n` +
    `⏰ Aᴋᴛɪᴠʟɪᴋ: ${hours}s ${minutes}ᴅ ${seconds}s ⚡\n` +
    `💾 Yᴀᴅᴅᴀş: ${memMB} MB 🧠\n` +
    `🖥️ Pʟᴀᴛғᴏʀᴍᴀ: ${os.platform()} 💻\n` +
    `📦 Nᴏᴅᴇ.ᴊs: ${process.version} 🏗️\n\n` +
    `*✨ Özəʟʟɪᴋʟəʀ ✨*\n` +
    `🤖 AI Çᴀᴛ: ${config.features.ai ? '✅' : '❌'}\n` +
    `🌤️ Hᴀᴠᴀ: ${config.features.weather ? '✅' : '❌'}\n` +
    `🗿 Zᴀʀᴀғᴀᴛʟᴀʀ: ${config.features.jokes ? '✅' : '❌'}\n` +
    `💬 Sɪᴛᴀᴛʟᴀʀ: ${config.features.quotes ? '✅' : '❌'}\n\n` +
    `_❤️ DAXXTEAM ᴛəʀəғɪɴᴅəɴ sᴇᴠɢɪʏʟə ʜᴀᴢıʀʟᴀɴᴅı ✨_`;
  
  await message.reply(infoText);
};
