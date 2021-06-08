const db = require('quick.db')

module.exports.run = async(client, message, args) => {

    const permission = "KICK_MEMBERS"

    if (!message.member.hasPermission(permission)) return message.reply(`You need the **${permission}** permission to do this.`)
    if (!message.guild.me.hasPermission(permission)) return message.reply(`I need the **${permission}** permission to do this.`)

    if (!args[0]) return message.reply("Please provide a user.")

    const reason = args.slice(1).join(" ")

    if (!args[1]) message.reply("Provide a reason.")

    const unWarnUser = message.guild.member(message.mentions.members.first()) || message.guild.members.cache.get(args[0])

    if (!unWarnUser) return message.reply("Couldn't find that user. Please try again with a valid user.")

    if (unWarnUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't warn a moderator.")

    if (db.get(`warns_${unWarnUser.id}_${message.guild.id}`) === 0) {
        message.reply("This user has no warns.")
    } else {
        db.subtract(`warns_${unWarnUser.id}_${message.guild.id}`, 1)
        message.channel.send("Succesfully removed 1 warn from " + unWarnUser + ".")
    }


}

module.exports.help = {
    name: "unwarn",
    description: "Delete a warn of a user.",
    aliases: [],
    category: "🛠 Moderation"
}