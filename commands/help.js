const { MessageEmbed } = require('discord.js');
const { token } = require('../config.json');
const db = require('quick.db')

module.exports.run = async(client, message, args) => {
    var commandList = []
    const prefix = db.get(`prefix_${message.guild.id}`)

    client.commands.forEach(command => {

        var constructor = {

            name: command.help.name,
            description: command.help.description,
            aliases: command.help.aliases,
            category: command.help.category

        }

        commandList.push(constructor);

    });

    var response = "**Scree - commands**\n\n"

    var misc = "💡 Misc\n\n"
    var info = "\nℹ Information\n\n"
    var moderation = "\n🛠 Moderation\n\n"
    var nsfw = "\n🔞 Not Safe For Work\n\n"
    var eco = "\n💵 Economy\n\n"
    var fun = "\n😂 Fun\n\n"
    var levels = "\n🧪 Levels\n\n"

    for (let i = 0; i < commandList.length; i++) {
        const command = commandList[i];

        if (command["category"] == "💡 Misc") {

            misc += `**${prefix}${command["name"]}** - ${command["description"]}\n`

        } else if (command["category"] == "🛠 Moderation") {

            moderation += `**${prefix}${command["name"]}** - ${command["description"]}\n`

        } else if (command["category"] == "ℹ Information") {

            info += `**${prefix}${command["name"]}** - ${command["description"]}\n`

        } else if (command["category"] == "💵 Economy") {

            eco += `**${prefix}${command["name"]}** - ${command["description"]}\n`

        }
        if (command["category"] == "😂 Fun") {

            fun += `**${prefix}${command["name"]}** - ${command["description"]}\n`

        }
        if (command["category"] == "🧪 Levels") {

            levels += `**${prefix}${command["name"]}** - ${command["description"]}\n`

        }
    }

    response += misc;
    response += info;
    response += moderation;
    response += eco;
    response += fun;
    response += levels;

    message.author.send(response).then(() => {
        message.channel.send("You've got mail! :mailbox:")
        message.react("✅")
    }).catch(() => {
        message.channel.send("Your dms are off.")
    })

}

module.exports.help = {
    name: "help",
    description: "Returns all commands.",
    aliases: ["h"],
    category: "ℹ Information"
}