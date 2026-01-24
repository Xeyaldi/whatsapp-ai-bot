const OpenAI = require('openai');
const config = require('../config');

let openai = null;
if (config.openaiKey) {
  openai = new OpenAI({ apiKey: config.openaiKey });
}

const conversationHistory = new Map();

module.exports = async (message, args) => {
  if (!config.features.ai) {
    return message.reply('AI feature is disabled.');
  }
  
  if (!config.openaiKey) {
    return message.reply('OpenAI API key not configured. Please add OPENAI_API_KEY to .env file.');
  }
  
  const query = args.join(' ');
  if (!query) {
    return message.reply('Please provide a question. Example: /ai What is JavaScript?');
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
          content: `You are ${config.botName}, a helpful WhatsApp assistant. Keep responses concise and friendly. Use emojis occasionally.` 
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
    await message.reply('Sorry, AI service is temporarily unavailable. Please try again later.');
  }
};
