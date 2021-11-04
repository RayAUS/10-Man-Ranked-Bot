import DiscordJS, {Intents, Message} from 'discord.js';
import dotenv from 'dotenv';
import botconfig from './botconfig.json';
import fetch from 'node-fetch';
dotenv.config()

//Constants
const prefix = '-';
const client = new DiscordJS.Client({ 
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    ]
  });

//API Functions
function getWeather(cityName: String){
  return fetch(new URL("",`api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.API_KEY}`))
    .then(res => {
      return res.json()
    })
    .then(data => {
      //Means there was an error
      if (Object.keys(data).includes("message")){
        return "City was not found"
      }
      return `The weather in ${data["name"]} is ${data["message"]["temp"]} with ${data["weather"]["description"]}` 
    })
    ;
}


//Bot Functions
client.on('ready', async () => {
  console.log('Bot IS LIVE')
});


client.on("messageCreate", async msg => {
  if (msg.content.includes("test")) {
      msg.reply("I WORK!")
    }
  })

client.on("messageCreate", async msg => {
  if (msg.content.includes("!weather ")) {
      getWeather(msg.content.replace("!weather ", "")).then(weather => msg.channel.send(weather))
    }

  //bot cannot respond to dm's
  if (msg.channel.type === "DM") return;

  //bot cannot talk to itself
  if (client.user != null) {
    if (msg.author.id === client.user.id) return;
  }
});

//Bot Login
client.login(process.env.DISCORD_BOT_TOKEN);

