import imageSearch from './Command/Search/index';
import Discord, { Message } from "discord.js";
require('dotenv').config();

const client = new Discord.Client();

client.login(process.env.MYFIRSTBOT_TOKEN);

client.on('ready', ()=>{
    console.info(`Logged in as ${client.user.tag}`);
})

client.on('message', async (msg: Message)=>{
    if (msg.content.startsWith('!img')) {
        const response = await imageSearch(msg);
        await msg.channel.send(response);
    } else if (msg.content.keyword('card') || msg.content.keyword('cards')) {
        msg.reply('chip');
    }
});