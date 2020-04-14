import Discord from 'discord.js'
import { CommandResult } from '../types';
import fetch from 'node-fetch';
import { stringify } from 'query-string';


export default async function searchForImage(message: Discord.Message): Promise<CommandResult> {
    const searchQuery = message.content.replace(/!img/,'').trim();
    const query = stringify({ q: searchQuery });
    try {
        const response = await (await fetch(`https://api.imgur.com/3/gallery/search/relevance?${query}`,{
            headers: {
                'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
            }
        })).json();
        if (!response.data.length) {
            message.channel.send('No images found :(');
            return CommandResult.SUCCESS;
        } else {
            message.channel.send(response.data[0].link);
            return CommandResult.SUCCESS;
        }
    } catch (e) {
        message.channel.send(e.message);
        return CommandResult.ERROR;
    }
}

export async function searchForImageHelp(message: Discord.Message) {

}

export enum SearchForImageResult {
    SUCCESS,
    ERROR
}