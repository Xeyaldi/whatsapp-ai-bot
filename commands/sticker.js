const config = require('../config');

module.exports = async (message) => {
  const quotedMsg = await message.getQuotedMessage();
  const targetMsg = quotedMsg || message;
  
  if (!targetMsg.hasMedia) {
    return message.reply('Please send an image or reply to an image with /sticker');
  }
  
  try {
    await message.react('⏳');
    
    const media = await targetMsg.downloadMedia();
    
    if (!media || !media.mimetype.startsWith('image/')) {
      return message.reply('Please send a valid image.');
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
    await message.reply('Could not create sticker. Please try with a different image.');
  }
};
