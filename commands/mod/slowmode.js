module.exports = {
    config: {
          name: "slowmode",
          description: "Set the slowmode for the channel!",
          aliases: ['sm']
    },
  run: async (bot, message, args) => {
  
    if (!args[0])
      return message.channel.send(
        `شما زمان این کانال را به ثانیه تنظیم نکردید!`
      );
      
    if (isNaN(args[0])) return message.channel.send(`این یک عدد نیست!`);
    
    message.channel.setRateLimitPerUser(args[0]);
    message.channel.send(
      `حالت آهسته این کانال را نیز تنظیم کنید **${args[0]}**`
    );
  },
};