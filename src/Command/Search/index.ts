import fetch from 'node-fetch';
import { stringify } from 'query-string';

export default async function imageSearch(message) {
    const searchQuery = message.content.replace(/!img/,'').trim();
    const query = stringify({ q: searchQuery });
    try {
        const response = await (await fetch(`https://api.imgur.com/3/gallery/search/relevance?${query}`,{
            headers: {
                'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
            }
        })).json();
        if (!response.data.length) {
            return 'No images found :(';
        }
        return response.data[0].link;
    } catch (e) {
        return 'Something went wrong...';
    }
}

