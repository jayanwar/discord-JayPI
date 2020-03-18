import Discord from 'discord.js';
require('dotenv').config();

const client = new Discord.Client();

client.login(process.env.MYFIRSTBOT_TOKEN);

client.on('ready', ()=>{
    console.info(`Logged in as ${client.user.tag}`);
})

client.on('message', msg=>{
    if (msg.content.startsWith('!img')) {
        const searchQuery = msg.content.replace(/!img/,'').trim();
        
    } else if (msg.content === 'card') {
        msg.reply('pong');
        msg.channel.send('chip');
    } else if (msg.content.startsWith('!kick')) {
        if (msg.mentions.users.size) {
            const taggedUser = msg.mentions.users.first();
            msg.channel.send(`You wanted a kick: ${taggedUser.username}`);
        } else {
            msg.reply('Tag a user next time...');
        }
    }
})