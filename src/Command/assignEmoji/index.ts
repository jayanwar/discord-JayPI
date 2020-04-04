import Discord from 'discord.js';
import { CommandResult } from '../types';

export default async function assignEmoji(message: Discord.Message, args: string[]) {
    const [name] = args;
    if (message.attachments && message.attachments.first()) {
        await message.guild?.emojis.create(message.attachments.first().url, name);
        return CommandResult.SUCCESS;
    } else {
        await message.channel.send("You didn't attach anything");
        return 
    }
}