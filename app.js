/**
 * Go to the repository if you need a more details instruction on installing the requiured
 * dependencies and some additional things.
 *
 * Repository link: https://github.com/pusheen-dev/DiscordBotExample
 * Author: khoeos
 *
 */

import { readdirSync } from 'fs';

const Discord = require( 'discord.js' );
const { prefix, token, modID } = require( './config.json' );

const client = new Discord.Client();
client.commands = new Discord.Collection();

const cooldowns = new Discord.Collection();

// const commandFiles = fs.readdirSync( './commands' ).filter( file => file.endsWith( '.js' ));
const commandFiles = readdirSync( './commands' ).filter( file => file.endsWith( '.js' ));

commandFiles.forEach( file => {
  const command = require( `./commands/${file}` );
  client.commands.set( command.name, command );
});

// for ( const file of commandFiles ) {
//   const command = require( `./commands/${file}` );
//   client.commands.set( command.name, command );
// }

client.once( 'ready', () => {
  console.log( 'Ready!' );
});

client.on( 'message', async message => {

  // Stop execution if sended by bot or without prefix
  if ( !message.content.startsWith( prefix ) || message.author.bot ) return;

  // Extract commandName and Arguments from the message 
  const args = message.content.slice( prefix.length ).trim().split( / +/ );
  const commandName = args.shift().toLowerCase();

  // Check if commandName exist
  const command = client.commands.get( commandName )
       || client.commands.find( cmd => cmd.aliases && cmd.aliases.includes( commandName ));
  if ( !command ) return;

  // START args Verification
  if ( command.args && !args.length ) {
    let reply = `You didn't provide any arguments, ${message.author}!`;
    if ( command.usage ) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }
    return message.channel.send( reply );
  }
  // END args Verification

  // START mod Verification
  if ( command.guildOnly && message.channel.type === 'dm' ) {
    return message.reply( 'I can\'t execute that command inside DMs!' );
  }
  // END mod Verification

  // START mod Verification
  if ( command.requireMod ) {
    if ( !( message.member.roles.cache.find( r => r.id === modID ))) {
      return message.reply( 'Vous n\'avez pas les droits pour exécuter cette commande' );
    }
  }
  // END mod Verification

  // START Cooldown Verification
  if ( !cooldowns.has( command.name )) {
    cooldowns.set( command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get( command.name );
  const cooldownAmount = ( command.cooldown || 3 ) * 1000;

  if ( timestamps.has( message.author.id )) {
    const expirationTime = timestamps.get( message.author.id ) + cooldownAmount;
   
    if ( now < expirationTime ) {
      const timeLeft = ( expirationTime - now ) / 1000;
      return message.reply( `please wait ${timeLeft.toFixed( 1 )} more second(s) before reusing the \`${command.name}\` command.` );
    }
  }
  // END Cooldown Verification

  try {
    command.execute( message, args );
  } catch ( error ) {
    console.error( error );
    message.reply( 'there was an error trying to execute that command!' );
  }
});

client.login( token );
