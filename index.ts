import DiscordJS, {Intents, Message} from 'discord.js';
import dotenv from 'dotenv';
import axios, {AxiosResponse} from 'axios'
import keepAlive from './server';

//Imports secret keys
dotenv.config();

//Constants
const prefix = '!';

//Instantiate discord client, listing which information we need from discord api
const client = new DiscordJS.Client({ 
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    ]
  });

//String matching server message inputs to differentiate which function to call
const help = prefix + "help"
const weather = prefix + "weather "
const high = prefix + "high "
const low = prefix + "low "
const coord = prefix + "coord "

//Returns a string of the temperature rounded to 2 decimal places and in the context of celsius unit
function tempToString(temp: number): string{
  return temp.toFixed(2) + '°C'
}  

//API FUNCTIONS

//Returns a promise of the AxiosResponse, which contains jsonFile of the information we need.
function getData(cityName: string): Promise<AxiosResponse<any, any>>{
  return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${process.env.API_KEY}`)
}


//Gets the data from the api key and from the json parsed value it extracts the name, temperature, the feelslikeTemperature and the weather description.
function getWeather(cityName: string): Promise<string>{
  return getData(cityName)
    .then((res) => {
      return `The weather in ${res["data"]["name"]} is **${tempToString(parseFloat(res["data"]["main"]["temp"]))}** but feels like ${tempToString(parseFloat(res["data"]["main"]["feels_like"]))} with ${res["data"]["weather"][0]["description"]}` 
    })
    .catch((err) => {
      return "Error: " + err
    })
}

/*Returns a promise of a string which contains the message, of which
the message puts the data from the api into readable information,
in this case it retrives the name of the city, and the minimum
temperature in the city AT THE CURRENT TIME*/
function getLowTemp(cityName: string): Promise<string>{
  return getData(cityName)
    .then ((res) => {
      return `The lowest temperature **right now** in ${res["data"]["name"]} is **${tempToString(parseFloat(res["data"]["main"]["temp_min"]))}**`
    })
    .catch((err) => {
      return "Error: " + err
    })
}

/*Returns a promise of a string which contains the message, of which
the message puts the data from the api into readable information,
in this case it retrives the name of the city, and the maxiumum
temperature in the city AT THE CURRENT TIME*/
function getHighTemp(cityName: string): Promise<string>{
  return getData(cityName)
    .then ((res) => {
      return `The highest temperature **right now** in ${res["data"]["name"]} is **${tempToString(parseFloat(res["data"]["main"]["temp_max"]))}**`
    })
    .catch((err) => {
      return "Error: " + err
    })
}

/*Returns a promise of a string which contains the message, of which
the message puts the data from the api into readable information,
in this case it retrives the name of the city, and the longtitude
and latitude of the city*/
function getCoord(cityName: string): Promise<string>{
  return getData(cityName)
    .then ((res) => {
    console.log(res["data"]["coord"])
    return `The co-ordinates for ${res["data"]["name"]} are (**${res["data"]["coord"]["lon"]} , ${res["data"]["coord"]["lat"]}**)` 
    })
    .catch((err) => {
      return "Error: " + err
    })
}

//Removes repetitiveness of getHelp function
function examples(functionName: string): string{
  return ', eg, `!'+functionName+' melbourne`, `!'+functionName+' London`, `!'+functionName+' BeiJinG`\n\n'
}

//Function returns a string of which contains the information on how to use the bot (on discord)
function getHelp(): string{
  return "ALL FUNCTION ARE **NON**-CASE SENSITIVE!\n" + 
         "**`!weather {city}`** where !weather returns the weather for a given city"
          +
          examples("weather")
          +
         "**`!high {city}`** where !high gives the highest temperature at the moment in the given city" 
          +
          examples("high")
          + 
         "**`!low {city}`** where !low gives the lowest temperature at the moment in the given city"    +
          examples("low")
          + 
          "**`!coord {city}`** where !coord gives the coordinates of the given city"
          +
          examples("coord")
}

//Event handling
//Bot Functions
client.on('ready', async () => {
  console.log('Bot IS LIVE')
});


client.on("messageCreate", async msg => {
  //bot cannot respond to dm's
  if (msg.channel.type === "DM") return;

  //bot cannot talk to itself
  if (client.user != null) {
    if (msg.author.id === client.user.id) return;
  }

  //If user calls for help
  if (msg.content.includes(help)){
    msg.reply(getHelp());
  }
  
  //All these functions wait for the promise to return and then takes the string out of context and replies that string.
  //If user calls for weather and valid city
  if (msg.content.includes(weather)) {
    getWeather(msg.content.replace(weather, "")).then(weather => msg.reply(weather));
  }
  //If user calls for high and valid city
  if (msg.content.includes(high)){
    getHighTemp(msg.content.replace(high, "")).then(high => msg.reply(high));
  }
  //If user calls for low and valid city
  if (msg.content.includes(low)){
    getLowTemp(msg.content.replace(low, "")).then(low => msg.reply(low));
  }
  //If user calls for coord and valid city
  if (msg.content.includes(coord)){
    getCoord(msg.content.replace(coord, "")).then(coord => msg.reply(coord));
  }
});

//Ongoing call which keeps the server running 24/7 via server listening
keepAlive();

//Bot Login
client.login(process.env.DISCORD_BOT_TOKEN);

