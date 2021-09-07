const Discord = require("discord.js")
const { readdirSync } = require("fs");

module.exports = {
    config: {
        name: "reloadmod",
        description: "Reload command- Dev Only",
        aliases: ['rmod']
    },

    run: async (bot, message, args) => {

        let embed = new Discord.MessageEmbed()
        .setTitle("Reload")
        .setDescription("فقط رنک بالا ها قابلیت این کار را دارند.")
        .setColor("#cdf785");
        if(message.author.id !== '684092617272721420') return message.channel.send(embed);

        if(!args[0].toLowerCase()) return message.channel.send("لطفا کامند را ارسال کنید!")

        let commandName = args[0].toLowerCase()

        try {
          
          delete require.cache[require.resolve(`./${commandName}.js`)]
          const pull = require(`./${commandName}.js`)
          bot.commands.set(pull.config.name, pull)
          message.channel.send(`با موفقیت تمام شد: \`${commandName}\``)
        }

        catch (e) {
          console.log(e)
          return message.channel.send(`ریلود با موفقیت انجام نشد: ${commandName} From Moderation Module Because: \n${e}`)
        }


      }
} 