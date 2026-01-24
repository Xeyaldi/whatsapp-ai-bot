module.exports = async (message) => {
  const start = Date.now();
  const sent = await message.reply('Pinging...');
  const latency = Date.now() - start;
  
  await sent.edit(`🏓 Pong!\n\n⏱️ Response time: ${latency}ms`);
};
