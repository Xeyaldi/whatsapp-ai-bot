const axios = require('axios');
const config = require('../config');

module.exports = async (message, args) => {
  if (!config.features.weather) {
    return message.reply('Hᴀᴠᴀ ᴍəʟᴜᴍᴀᴛı ғᴜɴᴋsɪʏᴀsı ᴅᴇᴀᴋᴛɪᴠᴅɪʀ. 🚫');
  }
  
  const city = args.join(' ');
  if (!city) {
    return message.reply('Zəʜᴍəᴛ ᴏʟᴍᴀsᴀ şəʜəʀ ᴀᴅı ǫᴇʏᴅ ᴇᴅɪɴ. Nüᴍᴜɴə: /weather ʙəʀᴅə 🏙️');
  }
  
  try {
    await message.react('⏳');
    
    const response = await axios.get(
      `https://wttr.in/${encodeURIComponent(city)}?format=j1`,
      { timeout: 10000 }
    );
    
    const data = response.data;
    const current = data.current_condition[0];
    const location = data.nearest_area[0];
    
    const weatherText = `*🌈 ${location.areaName[0].value}, ${location.country[0].value} üçüɴ ʜᴀᴠᴀ ᴅᴜʀᴜᴍᴜ*\n\n` +
      `🌡️ **Tᴇᴍᴘᴇʀᴀᴛᴜʀ:** ${current.temp_C}°C\n` +
      `🌤️ **Vəᴢɪʏʏəᴛ:** ${current.weatherDesc[0].value} ✨\n` +
      `💨 **Küləᴋ:** ${current.windspeedKmph} ᴋᴍ/s ${current.winddir16Point} 🌪️\n` +
      `💧 **Rüᴛᴜʙəᴛ:** ${current.humidity}% ☁️\n` +
      `👁️ **Görüɴüş:** ${current.visibility} ᴋᴍ 🌫️\n` +
      `🌅 **UV İɴᴅᴇᴋsɪ:** ${current.uvIndex} ☀️\n\n` +
      `_📅 Yᴇɴɪʟəɴᴅɪ: ${new Date().toLocaleString('az-AZ')}_`;
    
    await message.react('✅');
    await message.reply(weatherText);
    
  } catch (error) {
    console.error('Weather Error:', error.message);
    await message.react('❌');
    await message.reply(`"${city}" üçüɴ ʜᴀᴠᴀ ᴍəʟᴜᴍᴀᴛı ᴛᴀᴘıʟᴍᴀᴅı. Zəʜᴍəᴛ ᴏʟᴍᴀsᴀ şəʜəʀ ᴀᴅıɴı ᴅüzɢüɴ ǫᴇʏᴅ ᴇᴅɪɴ. ⚠️`);
  }
};
