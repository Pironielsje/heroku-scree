const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports.run = async(client, message, args) => {

    const randomMoney = Math.floor(Math.random() * 16999) + 1

    function jobs() {
        var rand = ["House Maid", "Youtuber", "Developer", "Discord Moderator", "Ghost", "Ur Mom", "Tree", "Snake Milker", "Chicken Fricker", "Lab Rat", "Animal Colourist", "Hair Boiler", 'Digital Overlord', "Bot", "God"]

        return rand[Math.floor(Math.random() * rand.length)]
    }

    let embed = new MessageEmbed()
        .setTitle("Worked")
        .setDescription(`You worked as ${jobs()} and got 💵${randomMoney}. GG!`)
        .setFooter("👌 Made by Niels#5962")
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL())

    message.channel.send(embed)

    if (!db.get(`bal_${message.author.id}`)) {
        db.set(`bal_${message.author.id}`, randomMoney)
    } else {
        db.add(`bal_${message.author.id}`, randomMoney)
    }
}

module.exports.help = {
    name: "work",
    description: "Work and get money!",
    aliases: [],
    category: "💵 Economy"
}