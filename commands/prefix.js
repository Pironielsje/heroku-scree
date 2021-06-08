const db = require('quick.db')
const fs = require('fs')
const { MessageEmbed } = require('discord.js')

module.exports.run = async(client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("You need the **ADMINISTRATOR** permissions to do this.")
    if (!message.guild.me.hasPermission('ADMINISTRATOR')) return message.reply("I need the **ADMINISTRATOR** permissions to do this.")

    if (!args[0]) return message.reply("Use prefix <prefix>.")

    var prefixes = db.get(`prefix_${message.guild.id}`)

    db.set(`prefix_${message.guild.id}`, args[0])

    let embed = new MessageEmbed()
        .setTitle("New Prefix")
        .setDescription(`New prefix set. ${args[0]}`)
        .setColor("RANDOM")
        .setFooter("👌 Niels#5962")
        .setTimestamp()
        .setThumbnail(message.guild.iconURL())

    message.channel.send(embed)

}

module.exports.help = {
    name: "prefix",
    description: "Set the prefix of a specific server",
    aliases: ["p"],
    category: "🛠 Moderation"
}