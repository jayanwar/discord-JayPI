import imageSearch from './Command/searchForImage';
import assignEmoji from './Command/assignEmoji'
import Discord from "discord.js";
import { config } from 'dotenv';

config();

const client = new Discord.Client();
const prefix = process.env.COMMAND_PREFIX;

client.login(process.env.BOT_TOKEN);

client.once('ready', ()=>{
    console.info(`Logged in as ${client.user?.tag}`);
})

client.on('message', async (message: Discord.Message): Promise<void> => {
    if (!message.content.startsWith(prefix!) || message.author.bot) {
        return;
    }
    const command = message.content.slice(prefix!.length).split(' ')[0];
    const strippedMessage = message.content.split(' ').slice(1).join(' ');
    switch(command) {
        case('img'):
            try {
                const response = await imageSearch(strippedMessage);
                await message.channel.send(response);
                return;
            } catch (e) {
                message.channel.send('Something went wrong...');
                return;
            }
        case('assign'):
            try {
                const response = await assignEmoji(message, client);
                return;
            } catch (e) {
                message.channel.send('Something went wrong...');
                return;
            }
    }
    
});