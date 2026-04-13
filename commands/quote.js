const axios = require('axios');
const config = require('../config');

const fallbackQuotes = [
  { content: "Böʏüᴋ ɪşʟəʀ ɢöʀᴍəʏɪɴ ᴛəᴋ ʏᴏʟᴜ ɢöʀᴅüʏüɴüᴢ ɪşɪ sᴇᴠᴍəᴋᴅɪʀ.", author: "Sᴛᴇᴠᴇ Jᴏʙs" },
  { content: "İɴɴᴏᴠᴀsɪʏᴀ ʟɪᴅᴇʀ ɪʟə ɪᴢʟəʏɪᴄɪɴɪ ʙɪʀ-ʙɪʀɪɴᴅəɴ ғəʀǫʟəɴᴅɪʀɪʀ.", author: "Sᴛᴇᴠᴇ Jᴏʙs" },
  { content: "Aᴄ ǫᴀʟ, ᴀᴘᴀɴᴅı ǫᴀʟ (Həᴍɪşə ᴀxᴛᴀʀışᴅᴀ ᴏʟ).", author: "Sᴛᴇᴠᴇ Jᴏʙs" },
  { content: "Kᴏᴅ ᴢᴀʀᴀғᴀᴛ ᴋɪᴍɪᴅɪʀ. Əɢəʀ ɪᴢᴀʜ ᴇᴛᴍəʟɪ ᴏʟᴜʀsᴀɴsᴀ, ᴅᴇᴍəʟɪ ᴘɪsᴅɪʀ.", author: "Cᴏʀʏ Hᴏᴜsᴇ" },
  { content: "Əᴠᴠəʟᴄə ᴘʀᴏʙʟᴇᴍɪ həʟʟ ᴇᴛ, sᴏɴʀᴀ ᴋᴏᴅ ʏᴀᴢ.", author: "Jᴏʜɴ Jᴏʜɴsᴏɴ" },
  { content: "Əɴ ʏᴀxşı xəᴛᴀ ᴍᴇsᴀᴊı, ʜᴇç ᴠᴀxᴛ ɢörsəɴᴍəʏəɴᴅɪʀ.", author: "Tʜᴏᴍᴀs Fᴜᴄʜs" },
  { content: "Sᴀᴅəʟɪᴋ səməʀəʟɪʟɪʏɪɴ ʀᴜʜᴜᴅᴜʀ.", author: "Aᴜsᴛɪɴ Fʀᴇᴇᴍᴀɴ" },
  { content: "Oɴᴜ ɪşləᴛ, ᴅüzɢüɴ ᴇᴛ ᴠə sᴜʀəᴛʟəɴᴅɪʀ.", author: "Kᴇɴᴛ Bᴇᴄᴋ" },
  { content: "Həʀ ʜᴀɴsı ʙɪʀ axᴍᴀǫ ᴋᴏᴍᴘʏᴜᴛᴇʀɪɴ ᴀɴʟᴀʏᴀ ʙɪʟəᴄəʏɪ ᴋᴏᴅ ʏᴀᴢᴀ ʙɪʟəʀ.", author: "Mᴀʀᴛɪɴ Fᴏᴡʟᴇʀ" },
  { content: "Pʀᴏǫʀᴀᴍʟᴀşᴅıʀᴍᴀ nə ʙɪʟᴅɪʏɪɴ ᴅᴇʏɪʟ, nəʏɪ həʟʟ ᴇᴅə ʙɪʟəᴄəʏɪɴʟə ʙᴀğʟıᴅıʀ.", author: "Cʜʀɪs Pɪɴᴇ" },
];

module.exports = async (message) => {
  if (!config.features.quotes) {
    return message.reply('Sɪᴛᴀᴛ ғᴜɴᴋsɪʏᴀsı ᴅᴇᴀᴋᴛɪᴠᴅɪʀ. 🚫');
  }
  
  try {
    await message.react('💫');
    
    try {
      const response = await axios.get('https://api.quotable.io/random', { timeout: 5000 });
      const quote = response.data;
      await message.reply(`*"${quote.content}"*\n\n— _${quote.author}_ ✨`);
    } catch {
      const quote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      await message.reply(`*"${quote.content}"*\n\n— _${quote.author}_ 💎`);
    }
    
  } catch (error) {
    console.error('Quote Error:', error.message);
    await message.reply('Sɪᴛᴀᴛ ɢəᴛɪʀɪʟə ʙɪʟᴍəᴅɪ. Yᴇɴɪᴅəɴ ʏᴏxʟᴀ! ⚠️');
  }
};
