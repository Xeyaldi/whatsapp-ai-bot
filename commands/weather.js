const axios = require('axios');
const config = require('../config');

module.exports = async (message, args) => {
  if (!config.features.weather) {
    return message.reply('Weather feature is disabled.');
  }
  
  const city = args.join(' ');
  if (!city) {
    return message.reply('Please provide a city name. Example: /weather Mumbai');
  }
  
  try {
    await message.react('⏳');
    
    const response = await axios.get(
      `https://wttr.in/${encodeURIComponent(city)}?format=j1`,
      { timeout: 10000 }
    );
    
    const data = response.data;
    const current = data.current_condition[0];
    const location = data.nearest_area[0];
    
    const weatherText = `*Weather in ${location.areaName[0].value}, ${location.country[0].value}*\n\n` +
      `🌡️ Temperature: ${current.temp_C}°C (${current.temp_F}°F)\n` +
      `🌤️ Condition: ${current.weatherDesc[0].value}\n` +
      `💨 Wind: ${current.windspeedKmph} km/h ${current.winddir16Point}\n` +
      `💧 Humidity: ${current.humidity}%\n` +
      `👁️ Visibility: ${current.visibility} km\n` +
      `🌅 UV Index: ${current.uvIndex}\n\n` +
      `_Updated: ${new Date().toLocaleString('en-IN')}_`;
    
    await message.react('✅');
    await message.reply(weatherText);
    
  } catch (error) {
    console.error('Weather Error:', error.message);
    await message.react('❌');
    await message.reply(`Could not fetch weather for "${city}". Please check the city name.`);
  }
};
