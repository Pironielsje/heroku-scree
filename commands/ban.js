const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports.run = async(client, message, args) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    let permission = "BAN_MEMBERS"

    if (!message.member.hasPermission(permission)) return message.reply("You need the **BAN_MEMBERS** perms to do this.")
    if (!message.guild.me.hasPermission(permission)) return message.reply("I need the **BAN_MEMBERS** perms to do this.")

    if (!args[0]) return message.reply("Try again. But this time actually provide a user to ban.")
    if (!user.bannable) return message.reply("You can't ban a moderator.")

    let reason = args.slice(1).join(" ")

    if (!reason) reason = "No reason provided"

    message.guild.members.ban(user, { reason }).catch(err => {
        if (err) {
            console.log(err)
            message.reply("Something went wrong!")
        }
    })

    const logChannel = db.get(`lgch_${message.guild.id}`)

    const sendLogChannel = message.guild.channels.cache.get(logChannel)

    if (!sendLogChannel) return

    let banEmbed = new MessageEmbed()
        .setTitle('Member Banned')
        .setColor('#FF0000')
        .addFields({ name: "Member", value: `<@${user.id}>` }, { name: "Guild", value: message.guild.name }, { name: "ID", value: user.id }, { name: "Banned By", value: message.author.username })
        .setFooter("👌 Made by Niels#5962")
        .setTimestamp()
        .setThumbnail(message.guild.iconURL())

    sendLogChannel.send(banEmbed)
    message.channel.send(`${user} is banned succesfully!`)
}

module.exports.help = {
    name: "ban",
    description: "ban a user",
    aliases: ["banhammer", "getout", "yeet"],
    category: "🛠 Moderation"
}