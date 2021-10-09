//Imports
const { Client, Intents } = require('discord.js');

//Bot's Permissions
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.DIRECT_MESSAGE_REACTIONS
  ]
})

//Bots Initial Call
client.


//Bot Login
client.login(process.env.DISCORD_BOT_TOKEN)
