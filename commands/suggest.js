const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client, message, args) => {
    let channel = db.get(`sgch_${message.guild.id}`)

    let suggestion = args[0]

    if (!suggestion) return message.reply('Hey! Sorry but you can\'t send an empty suggestion.')

    if (channel === null) return

    let sendchannel = message.guild.channels.cache.get(channel)

    let embed = new MessageEmbed()
        .setTitle('New Suggestion')
        .setColor('#0000ff')
        .addFields({ name: "Author", value: `<@${message.author.id}>` }, { name: "Suggestion", value: `${suggestion}` })
        .setFooter('👌 Made by Niels#5962')
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL())

    message.channel.send('✅ Succesfully sent a suggestion!').then(msg => msg.delete({ timeout: 3000 }))
    message.delete()

    sendchannel.send(embed)
}

module.exports.help = {
    name: "suggest",
    description: "suggest smth",
    aliases: ["sg", "idea"],
    category: "💡 Misc"
}