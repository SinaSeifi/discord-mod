const { ownerID } = require('../../owner.json') 

module.exports = {
    config: {
        name: "clear",
        aliases: [],
        category: "moderation",
        description: "Deletes messages from a channel",
        usage: "m/clear [amount of messages]"
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌شما پرمیشن این کامند را ندارید!- [MANAGE_MESSAGES]")
        if (isNaN(args[0]))
            return message.channel.send('**Please Supply A Valid Amount To Delete Messages!**');

        if (args[0] > 100)
            return message.channel.send("**Please Supply A Number Less Than 100!**");

        if (args[0] < 1)
            return message.channel.send("**Please Supply A Number More Than 1!**");

        message.channel.bulkDelete(args[0])
            .then(messages => message.channel.send(`**این تعداد پیام با موفقیت پاک شدند✅ \`${messages.size}/${args[0]}\` **`).tسhen(msg => msg.delete({ timeout: 5000 }))).catch(() => null)
    }
}