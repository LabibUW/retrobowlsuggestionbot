const Discord = require('discord.js');

const client = new Discord.Client();



client.once('ready', () => {
    console.log('RBL Suggestion Bot is online!');
});

client.on('message', async message => {
    if(message.channel.name === 'community-suggestions'){
		try {
            await message.react('⬆️');
            await message.react('⬇️');
		} catch (error) {
			console.error('One of the emojis failed to react.');
        }
    }
});


client.login(process.env.BOT_TOKEN);
