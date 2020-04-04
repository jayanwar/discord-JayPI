import searchForImage from './Command/searchForImage';
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
    const [command, ...args] = message.content.slice(prefix!.length).split(' ')[0].split(':');
    switch(command) {
        case('img'):
            await searchForImage(message);
            return;
        case('assign'):
            await assignEmoji(message, args);
            return;
    }
    
});