const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle(`Balance for ${message.author.tag}`)
            .setDescription(`💵${db.get(`bal_${message.author.id}`)}!`)
        .setFooter("👌 Made by Niels#5962")
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL())

    message.channel.send(embed)
}

module.exports.help = {
    name: "bal",
    description: "Returns the balance to the user.",
    aliases: ["balance", "wallet", "bank"],
    category: "💵 Economy"
}