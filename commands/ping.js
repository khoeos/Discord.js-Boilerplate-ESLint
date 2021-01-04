module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	aliases: ['icon', 'pfp'],
	guildOnly: true,
	requireMod: false,
	execute(message, args) {
		message.channel.send('Pong.');
	},
};