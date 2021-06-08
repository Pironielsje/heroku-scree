const db = require("quick.db")

module.exports.run = async(client, message, args) => {
    const permission = "ADMINISTRATOR"

    if (!message.member.hasPermission(permission)) return message.reply(`You need the **${permission}** permission to do this.`)
    if (!message.guild.me.hasPermission(permission)) return message.reply(`I need the **${permission}** permission to do this.`)


    let channel = message.mentions.channels.first();

    if (!channel) {
        return message.reply('Specify a channel..')
    }

    db.set(`sgch_${message.guild.id}`, channel.id)

    message.channel.send(`Set the channel to ${channel}.`)
}

module.exports.help = {
    name: "setsuggest",
    description: "set's a suggest channel",
    aliases: ["ss"],
    category: "🛠 Moderation"
}