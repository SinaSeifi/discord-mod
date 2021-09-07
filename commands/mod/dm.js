const { ownerID } = require('../../owner.json') 

module.exports = {
    config: {
      name: "dm",
      description: "DM a user in the guild",
      aliases: ['pm']
    },
    run: async (bot, message, args) => {
        
        if(!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES") && !ownerID.includes(message.author.id)) return;


      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (!user)
        return message.channel.send(
          `❗❗ شما از کاربری نام نبرید ، یا یک شناسه نامعتبر داده اید`
        );
      if (!args.slice(1).join(" "))
        return message.channel.send("❗شما پیام خود را مشخص نکرده اید");
      user.user
        .send(args.slice(1).join(" "))
        .catch(() => message.channel.send("❗ شما نمیتوانید به این شخص پیام بدهید"))
        .then(() => message.channel.send(`پیامی ارسال کرد به ${user.user.tag}`));
    },
  };