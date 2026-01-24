const config = require('../config');

module.exports = async (message) => {
  let helpText = `*${config.botName} - Commands*\n\n`;
  
  for (const [cmd, desc] of Object.entries(config.commands)) {
    helpText += `${config.prefix}${cmd} - ${desc}\n`;
  }
  
  helpText += `\n_Powered by OpenAI & WhatsApp Web.js_`;
  
  await message.reply(helpText);
};
