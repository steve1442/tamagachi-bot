const discord = require('discord.js');
const client = new discord.Client();
require('dotenv').config();

client.on('ready', ()=>{
    console.log(`logged in as ${client.user.tag}!`)
});


client.on('message', msg =>{

});











client.login(process.env.BOT_TOKEN);