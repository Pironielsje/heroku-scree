const { MessageEmbed } = require('discord.js');
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

    var misc = "๐ก Misc\n\n"
    var info = "\nโน Information\n\n"
    var moderation = "\n๐  Moderation\n\n"
    var nsfw = "\n๐ Not Safe For Work\n\n"
    var eco = "\n๐ต Economy\n\n"
    var fun = "\n๐ Fun\n\n"
    var levels = "\n๐งช Levels\n\n"

    for (let i = 0; i < commandList.length; i++) {
        const command = commandList[i];

        if (command["category"] == "๐ก Misc") {

            misc += `**${prefix}${command["name"]}** - ${command["description"]}\n`

        } else if (command["category"] == "๐  Moderation") {

            moderation += `**${prefix}${command["name"]}** - ${command["description"]}\n`

        } else if (command["category"] == "โน Information") {

            info += `**${prefix}${command["name"]}** - ${command["description"]}\n`

        } else if (command["category"] == "๐ต Economy") {

            eco += `**${prefix}${command["name"]}** - ${command["description"]}\n`

        }
        if (command["category"] == "๐ Fun") {

            fun += `**${prefix}${command["name"]}** - ${command["description"]}\n`

        }
        if (command["category"] == "๐งช Levels") {

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
        message.react("โ")
    }).catch(() => {
        message.channel.send("Your dms are off.")
    })

}

module.exports.help = {
    name: "help",
    description: "Returns all commands.",
    aliases: ["h"],
    category: "โน Information",
}