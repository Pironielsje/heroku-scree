const { MessageEmbed } = require("discord.js")

module.exports.run = async(client, message, args) => {

    let embed = new MessageEmbed()
        .setTitle('Vote list')
        .addFields({ name: "Milrato", value: "https://botlist.milrato.eu/bots/like/850654117431869481/" }, { name: "top.gg", value: "soon" }, { name: "discord.bots.gg", value: "soon" })
        .setColor("RANDOM")
        .setFooter("👌 Made by Niels#5962")
        .setTimestamp()

    message.channel.send(embed)

}

module.exports.help = {
    name: "votelist",
    description: "Get a list to vote on the bot on multiple websites!",
    aliases: ["vl"],
    category: "💡 Misc"
}