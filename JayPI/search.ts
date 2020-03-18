import { google } from 'googleapis';

const customSearch = google.customsearch('v1');

export default async function imageSearch(searchQuery: string) {
    const response = await customSearch.cse.list({
        cx: process.env.IMAGE_SEARCH_CUSTOM_SEARCH_NAME,
        q: searchQuery,
        auth: process.env.GOOGLE_CUSTOM_SEARCH_API_KEY
    });
    console.log(response.data);
    return response.data
}

