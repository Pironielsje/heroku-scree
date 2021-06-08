const { MessageEmbed } = require("discord.js")

module.exports.run = async(client, message, args) => {

    let embed = new MessageEmbed()
        .setTitle('Ping 🏓')
        .setColor("RANDOM")
        .addFields({ name: "API Latency", value: `${Date.now() - message.createdTimestamp}ms` }, { name: "Latency", value: `${Math.round(client.ws.ping)}ms` })
        .setFooter("👌 Made by Niels#5962")
        .setTimestamp()

    message.channel.send('Pinging....').then(msg => msg.edit(embed))

}

module.exports.help = {
    name: "ping",
    description: "PONG",
    aliases: ["pong"],
    category: "💡 Misc"
}