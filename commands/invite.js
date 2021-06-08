const { MessageEmbed } = require("discord.js")

module.exports.run = async(client, message, args) => {
    const embed = new MessageEmbed()
        .setTitle('Invite')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=850654117431869481&permissions=0&scope=bot')
        .setColor('#00FF00')
        .setFooter("👌 Made by Niels#5962")
        .setTimestamp()

    message.channel.send(embed)
}


module.exports.help = {
    name: "invite",
    description: "get's the invite of the bot.",
    aliases: [],
    category: "💡 Misc"
}