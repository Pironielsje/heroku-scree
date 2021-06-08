const db = require("quick.db")

module.exports.run = async(client, message, args) => {
    const permission = "ADMINISTRATOR"

    if (!message.member.hasPermission(permission)) return message.reply(`You need the **${permission}** permission to do this.`)
    if (!message.guild.me.hasPermission(permission)) return message.reply(`I need the **${permission}** permission to do this.`)

    let channel = message.mentions.channels.first();

    if (!channel) {
        return message.reply('Specify a channel..')
    }

    db.set(`wlcch_${message.guild.id}`, channel.id)

    message.channel.send(`Set the channel to ${channel}.`)
}

module.exports.help = {
    name: "setwelcome",
    description: "set's a welcome channel",
    aliases: ["sw"],
    category: "🛠 Moderation"
}