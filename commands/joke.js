const axios = require('axios');
const config = require('../config');

const fallbackJokes = [
  { setup: "Why do programmers prefer dark mode?", punchline: "Because light attracts bugs! 🐛" },
  { setup: "Why did the developer go broke?", punchline: "Because he used up all his cache! 💰" },
  { setup: "Why do Java developers wear glasses?", punchline: "Because they can't C#! 👓" },
  { setup: "What's a programmer's favorite hangout place?", punchline: "Foo Bar! 🍺" },
  { setup: "Why was the JavaScript developer sad?", punchline: "Because he didn't Node how to Express himself! 😢" },
  { setup: "What do you call 8 hobbits?", punchline: "A hobbyte! 🧙" },
  { setup: "Why did the developer quit his job?", punchline: "Because he didn't get arrays! 📊" },
  { setup: "How many programmers does it take to change a light bulb?", punchline: "None, that's a hardware problem! 💡" },
];

module.exports = async (message) => {
  if (!config.features.jokes) {
    return message.reply('Jokes feature is disabled.');
  }
  
  try {
    await message.react('😂');
    
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/random_joke', { timeout: 5000 });
      const joke = response.data;
      await message.reply(`*${joke.setup}*\n\n${joke.punchline} 😄`);
    } catch {
      const joke = fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)];
      await message.reply(`*${joke.setup}*\n\n${joke.punchline}`);
    }
    
  } catch (error) {
    console.error('Joke Error:', error.message);
    await message.reply('Could not fetch joke. Try again!');
  }
};
