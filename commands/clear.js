const { MessageEmbed } = require("discord.js")

module.exports.run = async(client, message, args) => {
    const permission = "MANAGE_MESSAGES"

    if (!args[0]) return message.reply('Provide a amount of messages please.')

    if (!message.member.hasPermission(permission)) return message.reply(`You need the **${permission}** permissions to do this.`).then(msg => msg.delete({ timeout: 3000 }))
    if (!message.guild.me.hasPermission(permission)) return message.reply(`I need the **${permission}** permissions to do this.`).then(msg => msg.delete({ timeout: 3000 }))

    if (args[0] > 100) return message.reply("Can't clear more than 100 messages.")
    if (args[0] <= 0) return message.reply("Can't clear less than one message.")

    if (Number.isInteger(parseInt(args[0]))) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {

            if (args[0] == 1) {
                message.channel.send("Succesfully cleard 1 message.").then(msg => msg.delete({ timeout: 3000 }))
            } else {

                message.channel.send(`Succesfully cleared ${amount} messages`).then(msg => msg.delete({ timeout: 3000 }))
            }
        })

    } else {
        message.reply("Provide a valid number.")
    }

}


module.exports.help = {
    name: "clear",
    description: "Clear a specific amount of messages.",
    aliases: ["purge"],
    category: "🛠 Moderation"
}