const Discord = require('discord.js');

const client = new Discord.Client();

var SUGGESTION_MESSAGE_BREAK = 6;
var count = 0;

client.once('ready', () => {
    console.log('RBL Suggestion Bot is online!');
    client.user.setPresence({
        status: "online",  // You can show online, idle... Do not disturb is dnd
        game: {
            name: "Retro Bowl",  // The message shown
            type: "PLAYING" // PLAYING, WATCHING, LISTENING, STREAMING,
        }
    });
});

client.on('message', async message => {
    if(message.channel.name === 'community-suggestions' || message.channel.name === 'league-suggestions' || message.channel.name === 'suggestions'){
		try {
            await message.react('⬆️');
            await message.react('⬇️');

            if(message.content.startsWith("Before posting a new suggestion, please read through the previous suggestions")){
                message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            }
		} catch (error) {
			console.error('One of the emojis failed to react.');
        }


        count++;
        if(count == SUGGESTION_MESSAGE_BREAK + 1) {
            channel = client.channels.cache.get('779813840375250944');
            // channel.send('Before posting a new suggestion, please read through the previous suggestions in <#775745410353332294> and <#704484560758374471> to avoid repeat suggestions.\n\nPlease **DO NOT** suggest to play as the defense or an Online mode. ');

            channel.send('Before posting a new suggestion, please read through the previous suggestions in <#775745410353332294> and <#704484560758374471> to avoid repeat suggestions.\n\nPlease **DO NOT** suggest to play as the defense or an Online mode. ')
                .then(msg => {
                msg.delete({ timeout: 86400000 })
                })
                .catch(console.error);
            count = 0;
        }
    }
});


client.login(process.env.BOT_TOKEN);    