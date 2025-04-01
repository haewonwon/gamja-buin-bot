const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

function isActiveHour() {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 22; // 06:00 ~ 21:59
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  
  if (!isActiveHour()) {
    return message.reply('지금은 봇 작동 시간이 아닙니다! ⏰ (06:00~22:00)');
  }

  if (message.content === '!ping') {
    message.reply('pong!');
  }
});

client.login(process.env.DISCORD_TOKEN);