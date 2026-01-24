require('dotenv').config();

module.exports = {
  openaiKey: process.env.OPENAI_API_KEY || '',
  botName: process.env.BOT_NAME || 'AI Assistant',
  ownerNumber: process.env.OWNER_NUMBER || '',
  
  features: {
    ai: process.env.ENABLE_AI !== 'false',
    weather: process.env.ENABLE_WEATHER !== 'false',
    jokes: process.env.ENABLE_JOKES !== 'false',
    quotes: process.env.ENABLE_QUOTES !== 'false',
  },
  
  messages: {
    welcome: process.env.WELCOME_MESSAGE || 'Hello! I\'m an AI Assistant. Type /help for commands.',
    away: process.env.AWAY_MESSAGE || 'I\'m currently away. I\'ll respond soon!',
  },
  
  prefix: '/',
  
  commands: {
    help: 'Show all available commands',
    ai: 'Chat with AI (e.g., /ai What is JavaScript?)',
    weather: 'Get weather info (e.g., /weather Delhi)',
    joke: 'Get a random joke',
    quote: 'Get a motivational quote',
    sticker: 'Convert image to sticker',
    ping: 'Check bot response time',
    info: 'Get bot information',
  }
};
