const Discord = require('discord.js');

const client = new Discord.Client();

var SUGGESTION_MESSAGE_BREAK = 6;
var count = 0;

client.once('ready', () => {
    console.log('RBL Suggestion Bot is online!');
    client.user.setActivity("Retro Bowl", { type: "Playing" });
});

client.on('message', async message => {
    reactVote('league-suggestions', message);
    reactVote('suggestions', message);
    reactVote('community-suggestions', message);
    if(message.channel.name === 'community-suggestions'){
        count++;

        if(count == SUGGESTION_MESSAGE_BREAK + 1) {
            channel = client.channels.cache.get('775745410353332294');
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

function reactVote(channel, message) {
    if(message.channel.name === channel){
		try {
            message.react('⬆️');
            message.react('⬇️');

            if(message.content.startsWith("Before posting a new suggestion, please read through the previous suggestions")){
                message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            }
		} catch (error) {
			console.error('One of the emojis failed to react.');
        }
    }
}
client.login(process.env.BOT_TOKEN);        
