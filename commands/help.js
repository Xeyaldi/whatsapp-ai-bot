const config = require('../config');

module.exports = async (message) => {
  let helpText = `*${config.botName} - Əᴍʀləʀ*\n\n`;
  
  for (const [cmd, desc] of Object.entries(config.commands)) {
    helpText += `${config.prefix}${cmd} - ${desc}\n`;
  }
  
  helpText += `\n_OᴘᴇɴAI ᴠə WʜᴀᴛsAᴘᴘ Wᴇʙ.ᴊs ᴛəʀəғɪɴᴅəɴ ᴛəᴍɪɴ ᴇᴅɪʟɪʀ_`;
  
  await message.reply(helpText);
};
