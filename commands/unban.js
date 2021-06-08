const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports.run = async(client, message, args) => {
    let user = args[0]

    let permission = "BAN_MEMBERS"

    if (!message.member.hasPermission(permission)) return message.reply("You need the **BAN_MEMBERS** perms to do this.")
    if (!message.guild.me.hasPermission(permission)) return message.reply("I need the **BAN_MEMBERS** perms to do this.")

    if (!args[0]) return message.reply("Try again. But this time actually provide a user to unban.")

    let reason = args.slice(1).join(" ")

    if (!isNaN) message.reply("ID is not a number.")
    if (!reason) reason = "No reason provided"

    message.guild.fetchBans().then(async bans => {
        if (bans.size == 0) return message.reply("There are no bans.")
        let bUser = bans.find(b => b.user.id == user)
        if (!bUser) return message.reply("The user is not banned.")
        await message.guild.members.unban(bUser.user, reason).catch(err => {
            console.log(err)
            return message.reply("Something went wrong!")
        }).then(() => {
            message.channel.send(`Succesfully unbanned ${args[0]}.`)
        })
    })

    const logChannel = db.get(`lgch_${message.guild.id}`)

    const sendLogChannel = message.guild.channels.cache.get(logChannel)

    if (!sendLogChannel) return

    let banEmbed = new MessageEmbed()
        .setTitle('Member UnBanned')
        .setColor('#FFFFF0')
        .addFields({ name: "Member", value: `<@${user}>` }, { name: "Guild", value: message.guild.name }, { name: "ID", value: user }, { name: "UnBanned By", value: message.author.username })
        .setFooter("👌 Made by Niels#5962")
        .setTimestamp()
        .setThumbnail(message.guild.iconURL())

    sendLogChannel.send(banEmbed)
}

module.exports.help = {
    name: "unban",
    description: "Unbans a user.",
    aliases: ["unbanhammer", "getin", "unyeet"],
    category: "🛠 Moderation"
}