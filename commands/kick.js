const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client, message, args) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    let permission = "KICK_MEMBERS"

    if (!message.member.hasPermission(permission)) return message.reply("You need the **KICK_MEMBERS** perms to do this.")
    if (!message.guild.me.hasPermission(permission)) return message.reply("I need the **KICK_MEMBERS** perms to do this.")

    if (!args[0]) return message.reply("Try again. But this time actually provide a user to kikck.")
    if (user.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't kick a moderator.")

    let reason = args.slice(1).join(" ")

    if (!reason) reason = "No reason provided"

    user.kick(reason).catch(err => {
        if (err) {
            console.log(err)
            message.reply("Something went wrong!")
        }
    })

    const logChannel = db.get(`lgch_${message.guild.id}`)

    const sendLogChannel = message.guild.channels.cache.get(logChannel)

    if (!sendLogChannel) return

    let kickEmbed = new MessageEmbed()
        .setTitle("Member Kicked")
        .setColor("#FF0000")
        .addFields({ name: "Member Tag", value: `<@${user.id}>` }, { name: "Reason", value: reason }, { name: "Kicked By", value: message.author.username })
        .setFooter("👌 Made by Niels#5962")
        .setTimestamp()
        .setThumbnail(message.guild.iconURL())

    sendLogChannel.send(kickEmbed)
    message.channel.send(`${user} is kicked succesfully!`)
}

module.exports.help = {
    name: "kick",
    description: "Kicks a user.",
    aliases: ["kickaxe", "getkicked", "yeetus"],
    category: "🛠 Moderation"
}