const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message, args) => {

    //gstart winners time item

    var item = ""
    var time;
    var winners;

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You need the **ADMINISTRATOR** permission to do this")
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.reply("I need the **ADMINISTRATOR** permission to do this")

    winners = args[0]
    time = args[1]
    item = args.splice(2, args.length).join(" ")

    if (!winners) return message.reply("Specify a amount of winners.")
    if (!time) return message.reply("Specify how long the giveaway should last.")
    if (!item) return message.reply("Specify what you can win.")

    message.delete()

    var date = new Date().getTime()
    var dateEnd = new Date(date + (time * 1000))

    var giveawayEmbed = new MessageEmbed()
        .setTitle(`🎉 **GIVEAWAY**🎉`)
        .setFooter(` Ends: ${dateEnd}`)
        .setDescription(`${item}`)
        .setColor("RANDOM")

    var embedSend = await message.channel.send(giveawayEmbed)
    embedSend.react("🎉")

    setTimeout(function() {

        var random = 0;
        var endedWinners = []
        var inList = false;

        var peopleReacted = embedSend.reactions.cache.get("🎉").users.cache.array();

        for (let i = 0; i < peopleReacted.length; i++) {

            if (peopleReacted[i].id === client.user.id) {
                peopleReacted.splice(i, 1);
                continue;
            }

        }

        if (peopleReacted == 0) {
            return message.channel.send("Noone reacted so there are no winners.")
        }

        if (peopleReacted.length < winners) {
            return message.channel.send("Too few players reacted.")
        }

        for (let y = 0; y < winners.length; y++) {

            inList = false;

            random = Math.floor(Math.random() * peopleReacted.length);

            for (let o = 0; o < winners.length; o++) {

                if (winners[o] == peopleReacted[random]) {
                    inList = true;
                    y--;
                    break
                }

            }

            if (!inList) {
                endedWinners.push(peopleReacted[random]);
            }

        }

        for (let y = 0; y < endedWinners.length; y++) {

            message.channel.send(`GG, <@${endedWinners[y].id}>! You won ${item}!!`)

        }

    }, time * 1000)

}

module.exports.help = {
    name: "gstart",
    description: "Start a giveaway. Usage: !gstart #chat 10m test",
    aliases: [],
    category: "🎉 Giveaways"
}