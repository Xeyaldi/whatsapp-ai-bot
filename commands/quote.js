const axios = require('axios');
const config = require('../config');

const fallbackQuotes = [
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { content: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { content: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { content: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { content: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
  { content: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { content: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { content: "Any fool can write code that a computer can understand.", author: "Martin Fowler" },
  { content: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
  { content: "The most disastrous thing that you can ever learn is your first programming language.", author: "Alan Kay" },
  { content: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.", author: "Dan Salomon" },
];

module.exports = async (message) => {
  if (!config.features.quotes) {
    return message.reply('Quotes feature is disabled.');
  }
  
  try {
    await message.react('💫');
    
    try {
      const response = await axios.get('https://api.quotable.io/random', { timeout: 5000 });
      const quote = response.data;
      await message.reply(`*"${quote.content}"*\n\n— _${quote.author}_`);
    } catch {
      const quote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      await message.reply(`*"${quote.content}"*\n\n— _${quote.author}_`);
    }
    
  } catch (error) {
    console.error('Quote Error:', error.message);
    await message.reply('Could not fetch quote. Try again!');
  }
};
