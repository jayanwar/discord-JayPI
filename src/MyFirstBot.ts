import imageSearch from './search'
import Discord from 'discord.js';
require('dotenv').config();

const client = new Discord.Client();

client.login(process.env.MYFIRSTBOT_TOKEN);

client.on('ready', ()=>{
    console.info(`Logged in as ${client.user.tag}`);
})

client.on('message', async msg=>{
    if (msg.content.startsWith('!img')) {
        const searchQuery = msg.content.replace(/!img/,'').trim();
        const response = await imageSearch(searchQuery);
        console.log(response || 'nothing was returned');
        await msg.channel.send(response);
    } else if (msg.content === 'card') {
        msg.reply('chip');
    } else if (msg.content.startsWith('!kick')) {
        if (msg.mentions.users.size) {
            const taggedUser = msg.mentions.users.first();
            msg.channel.send(`You wanted a kick: ${taggedUser.username}`);
        } else {
            msg.reply('Tag a user next time...');
        }
    }
})