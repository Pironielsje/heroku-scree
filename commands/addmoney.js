const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports.run = async(client, message, args) => {

    let user = message.guild.members.cache.get(args[0]) || message.mentions.members.first()
    let moneyToAdd = args[1]

    if (!user) return message.reply("Please provide a user.")
    if (!moneyToAdd) return message.reply("Provide a valid amount of money to add.")
    if (isNaN(args[1])) return message.reply("That's not a valid number.")

    let embed = new MessageEmbed()
        .setTitle("Done!")
        .setDescription(`You added 💵${moneyToAdd} to <@${user.id}>.`)
        .setFooter("👌 Made by Niels#5962")
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL())

    message.channel.send(embed)

    if (!db.get(`bal_${user.id}`)) {
        db.set(`bal_${user.id}`, moneyToAdd)
    } else {
        db.add(`bal_${user.id}`, moneyToAdd)
    }
}

module.exports.help = {
    name: "addmoney",
    description: "Add money!",
    aliases: ["am"],
    category: "💵 Economy"
}