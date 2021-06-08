const db = require('quick.db')

module.exports.run = async(client, message, args) => {

    const permission = "KICK_MEMBERS"

    if (!message.member.hasPermission(permission)) return message.reply(`You need the **${permission}** permission to do this.`)
    if (!message.guild.me.hasPermission(permission)) return message.reply(`I need the **${permission}** permission to do this.`)

    if (!args[0]) return message.reply("Please provide a user.")

    const reason = args.slice(1).join(" ")

    if (!args[1]) message.reply("Provide a reason.")

    const warnUser = message.guild.member(message.mentions.members.first()) || message.guild.members.cache.get(args[0])

    if (!warnUser) return message.reply("Couldn't find that user. Please try again with a valid user.")

    if (warnUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't warn a moderator.")

    if (!db.get(`warns_${warnUser.id}_${message.guild.id}`)) {
        db.set(`warns_${warnUser.id}_${message.guild.id}`, 1)

        message.channel.send("Succesfully warned " + warnUser + ".")
    } else {
        db.add(`warns_${warnUser.id}_${message.guild.id}`, 1)

        message.channel.send("Succesfully warned " + warnUser + ".")
    }

    if (db.get(`warns_${warnUser.id}_${message.guild.id}`) === 12) {
        warnUser.kick('12 warns.')
    } else if (db.get(`warns_${warnUser.id}_${message.guild.id}`) === 20) {
        warnUser.ban({ days: 7, reason: "20 warns." })
    }
    if (db.get(`warns_${warnUser.id}_${message.guild.id}`) === 30) {
        warnUser.ban({ reason: "30 warns. " })
    }

}

module.exports.help = {
    name: "warn",
    description: "Warn a user.",
    aliases: [],
    category: "🛠 Moderation"
}