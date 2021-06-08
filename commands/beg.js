const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports.run = async(client, message, args) => {

    function randomPerson() {
        var rand = ["Micheal Jackson's ghost", "Joe Mama", "Urself", "Jack Sparrow", "Sméagol", "Harley Quin", "God", "Niels", "Someone"]

        return rand[Math.floor(Math.random() * rand.length)]
    }

    const randomMoney = Math.floor(Math.random() * 999) + 1


    let embed = new MessageEmbed()
        .setTitle("Beg")
        .setDescription(`You begged and got 💵${randomMoney} from ${randomPerson()}. GG!`)
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
    name: "beg",
    description: "Beg and get money!",
    aliases: ["beggar", "poor"],
    category: "💵 Economy"
}