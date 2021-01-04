/**
 * Go to the repository if you need a more details instruction on installing the requiured
 * dependencies and some additional things.
 *
 * Repository link: https://github.com/pusheen-dev/DiscordBotExample
 * Author: khoeos
 * 
 */

const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection()

const cooldowns = new Discord.Collection();

const { prefix, token } = require('./config.json');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

   const args = message.content.slice(prefix.length).trim().split(/ +/);
   const commandName = args.shift().toLowerCase();

   const command = client.commands.get(commandName)
       || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
   if (!command) return;

   if (command.args && !args.length) {
       let reply = `You didn't provide any arguments, ${message.author}!`;
       if (command.usage) {
           reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
       }
       return message.channel.send(reply);
   }

   if (command.guildOnly && message.channel.type === 'dm') {
       return message.reply('I can\'t execute that command inside DMs!');
   }

   if (command.requireMod) {
       if(!(message.member.roles.cache.find(r => r.id === modID))) {
           return message.reply('Vous n\'avez pas les droits pour exécuter cette commande');
       }
   }

   if (!cooldowns.has(command.name)) {
       cooldowns.set(command.name, new Discord.Collection());
   }
   
   const now = Date.now();
   const timestamps = cooldowns.get(command.name);
   const cooldownAmount = (command.cooldown || 3) * 1000;

   if (timestamps.has(message.author.id)) {
       const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
   
       if (now < expirationTime) {
           const timeLeft = (expirationTime - now) / 1000;
           return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
       }
   }

   try {
       command.execute(message, args);
   } catch (error) {
       console.error(error);
       message.reply('there was an error trying to execute that command!');
   }
});

client.login(token);