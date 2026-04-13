const axios = require('axios');
const config = require('../config');

const fallbackJokes = [
  { setup: "Pʀᴏǫʀᴀᴍçılᴀʀ ɴɪʏə ǫᴀʀᴀ ʀᴇᴊɪᴍɪ sᴇᴠɪʀ?", punchline: "Çüɴᴋɪ ɪşıǫ ʙöᴄəᴋʟəʀɪ (ʙᴜɢʟᴀʀı) ᴄəʟʙ ᴇᴅɪʀ! 🐛" },
  { setup: "Pʀᴏǫʀᴀᴍçı ɴɪʏə ᴍüғʟɪs ᴏʟᴅᴜ?", punchline: "Çüɴᴋɪ ʙüᴛüɴ 'ᴄᴀᴄʜᴇ'ɪɴɪ (ᴋᴇşɪɴɪ) xəʀᴄləᴅɪ! 💰" },
  { setup: "Jᴀᴠᴀ ʏᴀᴢᴀɴʟᴀʀ ɴɪʏə ᴇʏɴəᴋ ᴛᴀxıʀ?", punchline: "Çüɴᴋɪ C#'-ı (sɪ şᴀʀᴘı) ɢörə ʙɪʟᴍɪʀləʀ! 👓" },
  { setup: "JᴀᴠᴀSᴄʀɪᴘᴛ ʏᴀᴢᴀɴ ɴɪʏə ǫəᴍʟɪ ɪᴅɪ?", punchline: "Çüɴᴋɪ öᴢüɴü ɴᴇᴄə Eхᴘʀᴇss ᴇᴅəᴄəʏɪɴɪ (ɪғᴀᴅə ᴇᴅəᴄəʏɪɴɪ) Nᴏᴅᴇ-ᴇᴛᴍɪʀᴅɪ! 😢" },
  { setup: "Bɪʀ ᴘʀᴏǫʀᴀᴍçınıɴ sᴇᴠɪᴍʟɪ ᴍəᴋᴀɴı ʜᴀʀᴀᴅıʀ?", punchline: "Fᴏᴏ Bᴀʀ! 🍺" },
  { setup: "8 ʜᴏʙʙɪᴛə nə ᴅᴇʏɪʟɪʀ?", punchline: "Bɪʀ ʜᴏʙʙʏᴛᴇ! 🧙" },
  { setup: "Lᴀᴍᴘıçᴋᴀɴı ᴅəʏɪşᴍəᴋ üçüɴ ɴᴇçə ᴘʀᴏǫʀᴀᴍçı ʟᴀᴢıᴍᴅıʀ?", punchline: "Hᴇç ʙɪʀɪ, ᴏ ᴛᴇxɴɪᴋɪ (ʜᴀʀᴅᴡᴀʀᴇ) ᴘʀᴏʙʟᴇᴍᴅɪʀ! 💡" },
];

module.exports = async (message) => {
  if (!config.features.jokes) {
    return message.reply('Zᴀʀᴀғᴀᴛ ғᴜɴᴋsɪʏᴀsı ᴅᴇᴀᴋᴛɪᴠᴅɪʀ. 🚫');
  }
  
  try {
    await message.react('😂');
    
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/random_joke', { timeout: 5000 });
      const joke = response.data;
      // API-ᴅəɴ ɢəʟəɴ ɪɴɢɪʟɪsᴄə ᴏʟsᴀ ᴅᴀ, sᴛɪʟɪ ǫᴏʀᴜᴅᴜᴍ
      await message.reply(`*${joke.setup}*\n\n${joke.punchline} 😄`);
    } catch {
      const joke = fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)];
      await message.reply(`*${joke.setup}*\n\n${joke.punchline} 🤣`);
    }
    
  } catch (error) {
    console.error('Joke Error:', error.message);
    await message.reply('Zᴀʀᴀғᴀᴛ ᴛᴀᴘıʟᴍᴀᴅı, ʙɪʀ ᴀᴢ sᴏɴʀᴀ ʏᴏxʟᴀ! ⚠️');
  }
};
