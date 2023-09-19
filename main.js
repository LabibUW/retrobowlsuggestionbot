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
    reactVote('server-suggestions', message);
    reactVote('rb-suggestions', message);
    reactVote('rg-suggestions', message);
    reactVote('event-ideas', message);
    reactVote('rbc-suggestions', message);
    reactOneVote('sports-predictions', message);
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

function reactOneVote(channel, message) {
    if(message.channel.name === channel){
		try {
            message.react('1️⃣');
            message.react('2️⃣');

            if(message.content.startsWith("Before posting a new suggestion, please read through the previous suggestions")){
                message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            }
		} catch (error) {
			console.error('One of the emojis failed to react.');
        }
    }
}
client.login(process.env.BOT_TOKEN);        
