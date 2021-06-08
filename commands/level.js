const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client, message, args) => {
    let embed = new MessageEmbed()
        .setTitle(`Level for ${message.author.tag}`)
        .setColor("RANDOM")
        .addFields({ name: "XP", value: db.get(`xp_${message.author.id}_${message.guild.id}`) }, { name: "Level", value: db.get(`lvl_${message.author.id}_${message.guild.id}`) })
        .setFooter("👌 Made by Niels#5962")
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL())

    if (!db.get(`xp_${message.author.id}_${message.guild.id}`)) {
        message.reply("You don't have any xp. Keep chatting to get more!")
    } else {
        message.channel.send(embed)
    }
}

module.exports.help = {
    name: "level",
    description: "See your level",
    aliases: ["lvl", "l"],
    category: "🧪 Levels"
}