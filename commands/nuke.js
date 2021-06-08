const { MessageEmbed } = require("discord.js")

module.exports.run = async(client, message, args) => {
    const permission = "MANAGE_CHANNELS"

    if (!message.member.hasPermission(permission)) return message.reply(`You need the **${permission}** perms to do this.`)
    if (!message.guild.me.hasPermission(permission)) return message.reply(`I need the **${permission}** perms to do this.`)

    if (!message.guild) return
    const nukedchannel = await message.channel.clone().then(channel => {
        channel.setPosition(message.channel.position)
        channel.setParent(message.channel.parent)

        message.channel.delete()

        let nukeEmbed = new MessageEmbed()
            .setTitle("Channel Nuked")
            .setDescription(`<@${message.author.id}> Nuked this channel`)
            .setImage("https://images-ext-1.discordapp.net/external/BEx_bp5iX5JTnFOXOxX43pZI5283xhRg1Y-d1iz6gQ8/https/cdn.dribbble.com/users/461802/screenshots/3452983/chemistryanimation_dribbble.gif?width=664&height=498")
            .setFooter("👌 Made by Niels#5962")
            .setTimestamp()

        channel.send(nukeEmbed)
    })
}

module.exports.help = {
    name: "nuke",
    description: "Nuke a channel.",
    aliases: ["boom", "bomb"],
    category: "🛠 Moderation"
}