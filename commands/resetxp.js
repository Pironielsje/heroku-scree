const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client, message, args) => {
    db.set(`xp_${message.author.id}_${message.guild.id}`, 0)
}

module.exports.help = {
    name: "resetxp",
    description: "See your level",
    aliases: ["rx"],
    category: "🧪 Levels"
}