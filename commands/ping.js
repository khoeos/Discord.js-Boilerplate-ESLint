module.exports = {
  name: 'ping',                          // Command entered in discord message
  description: 'Ping!',                  // Displayed with the help command
  cooldown: 5,                           // In second by user
  aliases: ['p'],                        // For the name
  usage: '',                             // Displayed in the help command
  guildOnly: true,                       // If can be send in DM
  requireMod: false,                     // If require mod role
  args: false,                           // Check if require arguments
  execute( message, args ) {             // [Array] Args = messages stored after the command
    message.channel.send( 'Pong.' );
  },
};
