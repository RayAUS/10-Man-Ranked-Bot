import DiscordJS, {Intents, Message} from 'discord.js';
import dotenv from 'dotenv';
import botconfig from './botconfig.json';
import axios from 'axios'
dotenv.config();

//Constants
const prefix = '!';
const client = new DiscordJS.Client({ 
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    ]
  });

function getWeather(cityName: String){
  return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.API_KEY}`)
    .then((res) => {
      return `The weather in ${res["data"]["name"]} is ${(parseFloat(res["data"]["main"]["temp"])-273.15).toFixed(2)}°C with ${res["data"]["weather"][0]["description"]}` 
    })
    .catch((err) => {
      return "Error"
    })
}


//Bot Functions
client.on('ready', async () => {
  console.log('Bot IS LIVE')
});


client.on("messageCreate", async msg => {
  if (msg.content.includes(prefix + "weather ")) {
      getWeather(msg.content.replace(prefix + "weather ", "")).then(weather => msg.channel.send(weather))
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

