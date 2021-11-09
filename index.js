"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importStar(require("discord.js"));
var dotenv_1 = __importDefault(require("dotenv"));
var axios_1 = __importDefault(require("axios"));
var server_1 = __importDefault(require("./server"));
//Imports secret keys
dotenv_1.default.config();
//Constants
var prefix = '!';
//Instantiate discord client, listing which information we need from discord api
var client = new discord_js_1.default.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    ]
});
//String matching server message inputs to differentiate which function to call
var help = prefix + "help";
var weather = prefix + "weather ";
var high = prefix + "high ";
var low = prefix + "low ";
var coord = prefix + "coord ";
//Returns a string of the temperature rounded to 2 decimal places and in the context of celsius unit
function tempToString(temp) {
    return temp.toFixed(2) + '°C';
}
//API FUNCTIONS
//Returns a promise of the AxiosResponse, which contains jsonFile of the information we need.
function getData(cityName) {
    return axios_1.default
        .get("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + process.env.API_KEY);
}
//Gets the data from the api key and from the json parsed value it extracts the name, temperature, the feelslikeTemperature and the weather description.
function getWeather(cityName) {
    return getData(cityName)
        .then(function (res) {
        return "The weather in " + res["data"]["name"] + " is **" + tempToString(parseFloat(res["data"]["main"]["temp"])) + "** but feels like " + tempToString(parseFloat(res["data"]["main"]["feels_like"])) + " with " + res["data"]["weather"][0]["description"];
    })
        .catch(function (err) {
        return "Error: " + err;
    });
}
/*Returns a promise of a string which contains the message, of which
the message puts the data from the api into readable information,
in this case it retrives the name of the city, and the minimum
temperature in the city AT THE CURRENT TIME*/
function getLowTemp(cityName) {
    return getData(cityName)
        .then(function (res) {
        return "The lowest temperature **right now** in " + res["data"]["name"] + " is **" + tempToString(parseFloat(res["data"]["main"]["temp_min"])) + "**";
    })
        .catch(function (err) {
        return "Error: " + err;
    });
}
/*Returns a promise of a string which contains the message, of which
the message puts the data from the api into readable information,
in this case it retrives the name of the city, and the maxiumum
temperature in the city AT THE CURRENT TIME*/
function getHighTemp(cityName) {
    return getData(cityName)
        .then(function (res) {
        return "The highest temperature **right now** in " + res["data"]["name"] + " is **" + tempToString(parseFloat(res["data"]["main"]["temp_max"])) + "**";
    })
        .catch(function (err) {
        return "Error: " + err;
    });
}
/*Returns a promise of a string which contains the message, of which
the message puts the data from the api into readable information,
in this case it retrives the name of the city, and the longtitude
and latitude of the city*/
function getCoord(cityName) {
    return getData(cityName)
        .then(function (res) {
        console.log(res["data"]["coord"]);
        return "The co-ordinates for " + res["data"]["name"] + " are (**" + res["data"]["coord"]["lon"] + " , " + res["data"]["coord"]["lat"] + "**)";
    })
        .catch(function (err) {
        return "Error: " + err;
    });
}
//Removes repetitiveness of getHelp function
function examples(functionName) {
    return ', eg, `!' + functionName + ' melbourne`, `!' + functionName + ' London`, `!' + functionName + ' BeiJinG`\n\n';
}
//Function returns a string of which contains the information on how to use the bot (on discord)
var getHelp = new discord_js_1.default.MessageEmbed()
    .setColor('#0099ff')
    .setTitle("How to use Weather Bot")
    .setDescription("ALL FUNCTION ARE **NON**-CASE SENSITIVE!")
    .addFields({ name: "!weather {city}", value: " where `!weather` gives **the weather** for a given city" + examples("weather") }, { name: "!high {city}", value: "where `!high` gives the **highest temperature at the moment** in the given city" + examples("high") }, { name: "!low {city}", value: "where `!low` gives the **lowest temperature at the moment** in the given city" + examples("low") }, { name: "!coord {city}", value: "where `!coord` gives the **coordinates** of the given city" + examples("coord") });
//Event handling
//Bot Functions
client.on('ready', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('Bot IS LIVE');
        return [2 /*return*/];
    });
}); });
client.on("messageCreate", function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        //bot cannot respond to dm's
        if (msg.channel.type === "DM")
            return [2 /*return*/];
        //bot cannot talk to itself
        if (client.user != null) {
            if (msg.author.id === client.user.id)
                return [2 /*return*/];
        }
        //If user calls for help
        if (msg.content.includes(help)) {
            msg.channel.send({ embeds: [getHelp] });
        }
        //All these functions wait for the promise to return and then takes the string out of context and replies that string.
        //If user calls for weather and valid city
        if (msg.content.includes(weather)) {
            getWeather(msg.content.replace(weather, "")).then(function (weather) { return msg.channel.send(weather); });
        }
        //If user calls for high and valid city
        if (msg.content.includes(high)) {
            getHighTemp(msg.content.replace(high, "")).then(function (high) { return msg.channel.send(high); });
        }
        //If user calls for low and valid city
        if (msg.content.includes(low)) {
            getLowTemp(msg.content.replace(low, "")).then(function (low) { return msg.channel.send(low); });
        }
        //If user calls for coord and valid city
        if (msg.content.includes(coord)) {
            getCoord(msg.content.replace(coord, "")).then(function (coord) { return msg.channel.send(coord); });
        }
        return [2 /*return*/];
    });
}); });
//Ongoing call which keeps the server running 24/7 via server listening
(0, server_1.default)();
//Bot Login
client.login(process.env.DISCORD_BOT_TOKEN);
