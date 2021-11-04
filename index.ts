import DiscordJS, {Intents} from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    ]
  })

client.on('ready', () => {
  console.log('10-MAN-RANKED-BOT IS LIVE')
});

//Bot Login
client.login(process.env.DISCORD_BOT_TOKEN);