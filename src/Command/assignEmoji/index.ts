import Discord from 'discord.js'

export default async function assignEmoji(message: Discord.Message, client: Discord.Client) {
    const [emojiName, emojiUrl] = message.content.replace(/^!assign/, '').split(' ').map(word => word.trim());
}