const config = require('../config');
const os = require('os');

module.exports = async (message) => {
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  
  const memUsage = process.memoryUsage();
  const memMB = Math.round(memUsage.heapUsed / 1024 / 1024);
  
  const infoText = `*${config.botName} - Info*\n\n` +
    `📛 Name: ${config.botName}\n` +
    `🔢 Version: 1.0.0\n` +
    `⏰ Uptime: ${hours}h ${minutes}m ${seconds}s\n` +
    `💾 Memory: ${memMB} MB\n` +
    `🖥️ Platform: ${os.platform()}\n` +
    `📦 Node.js: ${process.version}\n\n` +
    `*Features:*\n` +
    `🤖 AI Chat: ${config.features.ai ? '✅' : '❌'}\n` +
    `🌤️ Weather: ${config.features.weather ? '✅' : '❌'}\n` +
    `😂 Jokes: ${config.features.jokes ? '✅' : '❌'}\n` +
    `💬 Quotes: ${config.features.quotes ? '✅' : '❌'}\n\n` +
    `_Made with ❤️ by DAXXTEAM_`;
  
  await message.reply(infoText);
};
