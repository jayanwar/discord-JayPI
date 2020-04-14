import Discord from 'discord.js';
import { CommandResult } from '../types';
import axios from 'axios'
import { readdirSync, createWriteStream } from 'fs';

export default async function handleImageRequest(message: Discord.Message, args: string[], path: string) {
    const [name] = args;
    if (message.attachments && message.attachments.first()) {
        try {
            const response = await axios({
                url: message.attachments.first()!.url,
                method: 'GET',
                responseType: 'stream'
            });
            const format = message.attachments.first()!.url.match(/\.\w+$/)?.shift();
            const file = `${path}/${name}${format}`;
            const writer = createWriteStream(file);
            await response.data.pipe(writer);
            await message.channel.send(`Added image ${name}`);
        } catch (e) {
            await message.channel.send(`Failed to add image ${name}`);
        }
    } else {
        const filename = readdirSync(path).find(file => file.replace(/\.\w+$/,'') === name);
        try {
            if (filename) {
                await message.channel.send({files: [`${path}/${filename}`]});
            } else {
                await message.channel.send(`Couldn't find image ${name}`);
            }
        }
        catch (e) {
            await message.channel.send(`Something went wrong when trying to find image ${name}`);
        }
    }
}