const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
        name: "ban",
        aliases: ["b", "banish"],
        description: "Bans the user",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
    },
    run: async (bot, message, args) => {
        try {
            if (!message.member.hasPermission("BAN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**❌شما مجوز بن کردن کاربران را ندارید! - [BAN_MEMBERS]**");
            if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("**من مجوز بن کاربران را ندارم! - [BAN_MEMBERS]**");
            if (!args[0]) return message.channel.send("**❗لطفاً یک کاربر برای بن کردن ارائه دهید!**")

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!banMember) return message.channel.send("**❗کاربر وجود ندارد**");
            if (banMember === message.member) return message.channel.send("**❗شما نمی توانید خودتان را بن کنید**")

            var reason = args.slice(1).join(" ");

            if (!banMember.bannable) return message.channel.send("**❌نمیشه این کاربر رو بن کرد**")
            try {
            message.guild.members.ban(banMember)
            banMember.send(`**سلام ، شما بن شده شدید ${message.guild.name} برای - ${reason || "No Reason"}**`).catch(() => null)
            } catch {
                message.guild.members.ban(banMember)
            }
            if (reason) {
            var sembed = new MessageEmbed()
                .setColor("BLACK")
                .setDescription(`**${banMember.user.username}** به دلیل بن شده است ${reason}`)
            message.channel.send(sembed)
            } else {
                var sembed2 = new MessageEmbed()
                .setColor("BLACK")
                .setDescription(`**${banMember.user.username}** بن شد از سرور`)
            message.channel.send(sembed2)
            }
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (channel == null) return;

            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#000000")
                .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "ban")
                .addField("**Banned**", banMember.user.username)
                .addField("**ID**", `${banMember.id}`)
                .addField("**Banned By**", message.author.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
};