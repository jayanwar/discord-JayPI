import fetch from 'node-fetch';
import { stringify } from 'query-string';

export default async function imageSearch(searchQuery: string) {
    const query = stringify({ q: searchQuery });
    try {
        const response = await (await fetch(`https://api.imgur.com/3/gallery/search/relevance?${query}`,{
            headers: {
                'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
            }
        })).json();
        console.log(response);
        return response.data[0].link;
    } catch (e) {
        return e.code;
    }
}

