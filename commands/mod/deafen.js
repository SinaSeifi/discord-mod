const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
    
        name: "deafen",
        description: "Deafen a member in a voice channel",
        usage: "deafen <user>",
        aliases: ["deaf"]
       
    },

    run: async(bot, message, args) => {
         if (!message.member.hasPermission("DEAFEN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**❌شما پرمیشن این کامند را ندارید! - [DEAFEN_MEMBERS]**");
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return message.channel.send("❗این کاربر در سرور وجود ندارد")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "❗بدون دلیل هست لطفا به همراه دلیل انجام دهید"


        try {
            member.voice.setDeaf(true, reason);
            message.channel.send("موفقیت ✅: عضو دیفن شده است")
        } 
        
        catch(error) {
            console.log(error)
            message.channel.send("وای! خطای ناشناخته ای رخ داد. لطفاً بعداً دوباره امتحان کنید.")
        }

    }
}