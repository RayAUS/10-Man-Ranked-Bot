//Imports
const game = require("./games.js");
const { Client, Intents } = require('discord.js');


require('dotenv').config();

//Bot's Permissions
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  ]
});

//When bot becomes live, it outputs into console
client.on('ready', () => {
  console.log('10-MAN-RANKED-BOT IS LIVE')
});

//Bot Login
client.login(process.env.DISCORD_BOT_TOKEN);
game.test();