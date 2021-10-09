//Imports
const { Client, Intents } = require('discord.js');

//Bot's Permissions
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  ]
})

client.on('ready', () => {
  console.log('10-MAN-RANKED-BOT IS LIVE')
})

//Bot Login
client.login(process.env.DISCORD_BOT_TOKEN)
