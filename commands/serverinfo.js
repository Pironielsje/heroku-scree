const { MessageEmbed } = require("discord.js")

module.exports.run = async(client, message, args) => {
    let embed = new MessageEmbed()
        .setTitle(`ServerInfo of ${message.guild.name}`)
        .setColor("RANDOM")
        .addFields({ name: "Server Owner", value: "<@" + message.guild.owner.user.id + ">" }, { name: "Location", value: message.guild.region }, { name: "Members", value: message.guild.members.cache.filter(member => !member.user.bot).size }, { name: "Bots", value: message.guild.members.cache.filter(bot => bot.user.bot).size }, { name: "Created at", value: message.guild.createdAt.toLocaleString() }, { name: "AFK Timeout", value: message.guild.afkTimeout / 60 + " minutes." }, { name: "AFK Channel", value: message.guild.afkChannelID === null ? "No AFK Channel" : client.channels.cache.get(message.guild.afkChannelID).name + `(${message.guild.afkChannelID === null ? '' : message.guild.afkChannelID})` },

        )
        .setTimestamp()
        .setFooter("👌 Made by Niels#5962")

    message.channel.send(embed)
}

module.exports.help = {
    name: "serverinfo",
    description: "See the info of a server.",
    aliases: ["si"],
    category: "ℹ Info"
}