const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client, message, args) => {
    const difarr = [];
    message.guild.members.cache.forEach(user => {
        difarr.push(user)
    });

    var allmemberlen = difarr.length
    let people = 0;
    let peopleToShow = 10

    let mes = [];

    for (let i = 0; i < allmemberlen; i++) {
        var amount = db.fetch(`lvl_${difarr[i].id}_${message.guild.id}`)
        var amount2 = db.fetch(`xp_${difarr[i].id}_${message.guild.id}`)

        if (amount == null) continue;

        mes.push({
            name: difarr[i].id,
            amount: amount,
            amount2: amount2
        })
    }

    const realArr = []
    mes.sort((a, b) => b.amount - a.amount);
    for (let k = 0; k < mes.length; k++) {
        people++;
        if (people >= peopleToShow) continue;
        realArr.push(`<@${mes[k].name}>\nLevel ${mes[k].amount}\nXP ${mes[k].amount2}`)
    }
    var finalLb = realArr.join("\n")

    let embed = new MessageEmbed()
        .setTitle(`Leaderboard for ${message.guild.name}`)
        .setDescription(finalLb)
        .setFooter("👌 Made by Niels#5962")
        .setTimestamp()
        .setColor("RANDOM")
        .setThumbnail(message.guild.iconURL())

    message.channel.send(embed)
}

module.exports.help = {
    name: "leaderboard",
    description: "See your level",
    aliases: ["lb", "lvls", "leadb", "lboard", "leadboard"],
    category: "🧪 Levels"
}