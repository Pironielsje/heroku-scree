const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client, message, args) => {
    db.set(`lvl_${message.author.id}_${message.guild.id}`, 0)
}

module.exports.help = {
    name: "resetlevel",
    description: "See your level",
    aliases: ["rl", "rlvl", "resetlvl", "rlevel"],
    category: "🧪 Levels"
}