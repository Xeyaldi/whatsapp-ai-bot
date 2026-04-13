const config = require('../config');

module.exports = async (message) => {
  const quotedMsg = await message.getQuotedMessage();
  const targetMsg = quotedMsg || message;
  
  if (!targetMsg.hasMedia) {
    return message.reply('Zəʜᴍəᴛ ᴏʟᴍᴀsᴀ sᴛɪᴋᴇʀ üçüɴ şəᴋɪʟ ɢöɴᴅəʀɪɴ ᴠə ʏᴀ şəᴋʟə /sticker ʏᴀᴢᴀʀᴀǫ ᴄᴀᴠᴀʙ ᴠᴇʀɪɴ. 🖼️');
  }
  
  try {
    await message.react('⏳');
    
    const media = await targetMsg.downloadMedia();
    
    if (!media || !media.mimetype.startsWith('image/')) {
      return message.reply('Zəʜᴍəᴛ ᴏʟᴍᴀsᴀ ᴅüzɢüɴ ʙɪʀ şəᴋɪʟ ɢöɴᴅəʀɪɴ. ⚠️');
    }
    
    await message.reply(media, message.from, {
      sendMediaAsSticker: true,
      stickerName: config.botName,
      stickerAuthor: 'DAXXTEAM',
    });
    
    await message.react('✅');
    
  } catch (error) {
    console.error('Sticker Error:', error.message);
    await message.react('❌');
    await message.reply('Sᴛɪᴋᴇʀ ʏᴀʀᴀᴅıʟᴀ ʙɪʟᴍəᴅɪ. Zəʜᴍəᴛ ᴏʟᴍᴀsᴀ ʙᴀşǫᴀ şəᴋɪʟ ʏᴏxʟᴀʏıɴ. 😔');
  }
};
