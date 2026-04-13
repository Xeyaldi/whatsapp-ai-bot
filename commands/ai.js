const OpenAI = require('openai');
const config = require('../config');

let openai = null;
if (config.openaiKey) {
  openai = new OpenAI({ apiKey: config.openaiKey });
}

const conversationHistory = new Map();

module.exports = async (message, args) => {
  if (!config.features.ai) {
    return message.reply('Süɴɪ ɪɴᴛᴇʟʟᴇᴋᴛ ғᴜɴᴋsɪʏᴀsı ᴅᴇᴀᴋᴛɪᴠᴅɪʀ.');
  }
  
  if (!config.openaiKey) {
    return message.reply('OᴘᴇɴAI API ᴀçᴀʀı ᴛᴀᴘıʟᴍᴀᴅı. Zəʜᴍəᴛ ᴏʟᴍᴀsᴀ .env ғᴀʏʟıɴᴀ OPENAI_API_KEY əʟᴀᴠə ᴇᴅɪɴ.');
  }
  
  const query = args.join(' ');
  if (!query) {
    return message.reply('Zəʜᴍəᴛ ᴏʟᴍᴀsᴀ ʙɪʀ sᴜᴀʟ ǫᴇʏᴅ ᴇᴅɪɴ. Nüᴍᴜɴə: /ai JᴀᴠᴀSᴄʀɪᴘᴛ nəᴅɪʀ?');
  }
  
  try {
    await message.react('⏳');
    
    const chatId = message.from;
    let history = conversationHistory.get(chatId) || [];
    
    history.push({ role: 'user', content: query });
    
    if (history.length > 10) {
      history = history.slice(-10);
    }
    
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { 
          role: 'system', 
          content: `Səɴ ${config.botName}-sᴀɴ, ғᴀʏᴅᴀʟı ʙɪʀ WʜᴀᴛsAᴘᴘ ᴋöᴍəᴋçɪsɪsəɴ. Cᴀᴠᴀʙʟᴀʀı ǫısᴀ ᴠə ᴍᴇʜʀɪʙᴀɴ sᴀxʟᴀ. Aʀᴀᴅᴀ ᴇᴍᴏᴊɪləʀᴅəɴ ɪsᴛɪғᴀᴅə ᴇᴛ.` 
        },
        ...history
      ],
      max_tokens: 500,
      temperature: 0.7,
    });
    
    const reply = response.choices[0].message.content;
    
    history.push({ role: 'assistant', content: reply });
    conversationHistory.set(chatId, history);
    
    await message.react('✅');
    await message.reply(reply);
    
  } catch (error) {
    console.error('AI Error:', error.message);
    await message.react('❌');
    await message.reply('Bᴀğışʟᴀʏıɴ, süɴɪ ɪɴᴛᴇʟʟᴇᴋᴛ xɪᴅᴍəᴛɪ ᴍüᴠəǫǫəᴛɪ ᴏʟᴀʀᴀǫ əʟçᴀᴛᴍᴀᴢᴅıʀ. Sᴏɴʀᴀ ʏᴇɴɪᴅəɴ ʏᴏxʟᴀʏıɴ.');
  }
};
