const express = require("express")

//Initialising server
const server = express() 

//Visual feedback to see if the bot is runni-ng
server.all("/", (req, res) => {
  res.send("Bot is running!")
})

//Listener to keep code running
function keepAlive(){
  server.listen(3000, () => {
    console.log("Server is ready")
  })
}

//Export the listening function as a module
module.exports = keepAlive