const discord = require('discord.js');
const fs = require('fs')
const client = new discord.Client();
const db = require('quick.db')

const { Player } = require('discord-player');

client.commands = new discord.Collection()
client.aliases = new discord.Collection()

let cooldown = new Set()
let cdseconds = 5;

const activeSongs = new Map();

fs.readdir('./commands/', (err, files) => {
    if (err) console.log(err)

    const jsFiles = files.filter(f => f.split('.').pop() === "js")

    if (jsFiles.length < 0) {
        console.log("No files found.")
        return
    }

    jsFiles.forEach((f, i) => {

        var getFile = require(`./commands/${f}`)

        console.log(`Succesfully loaded ${f}!`)

        client.commands.set(getFile.help.name, getFile)

        getFile.help.aliases.forEach(alias => {
            client.aliases.set(alias, getFile.help.name);
        })
    })
})

client.on('ready', async() => {
    console.log(`${client.user.username} is online.`)
    client.user.setActivity(`!help || Watching ${client.guilds.cache.size} servers`, { type: "PLAYING" })

    const readyChannel = client.channels.cache.get('850827892363493439');
    const readyEmbed = new discord.MessageEmbed()
        .setTitle('Online')
        .addFields({ name: "Bot Online", value: `<:blobnoice:850657989488410647> Scree is online` })
        .setColor("#00ff00")
        .setFooter("👌 Made by Niels#5962")
        .setTimestamp()

    readyChannel.send(readyEmbed)
})

client.on('message', async(message) => {
            // var prefix = config.prefix
            if (!db.get(`prefix_${message.guild.id}`)) {
                db.set(`prefix_${message.guild.id}`, "!")
            }

            var prefix = db.get(`prefix_${message.guild.id}`)

            if (message.channel.type === "dm") return
            if (message.author.bot) return

            var randomxp = Math.floor(Math.random() * 15) + 1;
            var xpToLevel = 75
            if (!db.get(`xp_${message.author.id}_${message.guild.id}`)) {
                db.set(`xp_${message.author.id}_${message.guild.id}`, randomxp)

            } else {
                db.add(`xp_${message.author.id}_${message.guild.id}`, randomxp)
            }

            let levelUp = new discord.MessageEmbed()
                .setTitle("Leveled Up!")
                .setDescription(`GG <@${message.author.id}>! You just leveled up to level: ${db.get(`lvl_${message.author.id}_${message.guild.id}`)}`)
                .setColor("GREEN")
                .setFooter("👌 Made by Niels#5962")
                .setTimestamp()

    if(db.get(`xp_${message.author.id}_${message.guild.id}`) >= xpToLevel){
        db.add(`lvl_${message.author.id}_${message.guild.id}`, 1)
        message.channel.send(levelUp)
        xpToLevel *= 2
        db.subtract(`xp_${message.author.id}_${message.guild.id}`, db.get(`xp_${message.author.id}_${message.guild.id}`))
    }

    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    const cmds = client.commands.get(command) || client.commands.get(client.aliases.get(command))

    if(cooldown.has(message.author.id)) {
        message.reply(`You have to wait ${cooldown} seconds to do this command again`)
    }
    // if(!message.member.hasPermission("ADMINISTRATOR")) cooldown.add(message.author.id)

    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, cdseconds * 1000)

    var options = {
        active: activeSongs
    }

    if (cmds) cmds.run(client, message, args, options);
})

client.on("guildMemberAdd", (member) => {

    let chx = db.get(`wlcch_${member.guild.id}`);

    if (chx === null) return

    let embed = new discord.MessageEmbed()
        .setTitle(`Welcome ${member.displayName}`)
        .setDescription(`This is ${member.guild.name}.
        This guild now has ${member.guild.memberCount} members!`)
        .setFooter('👌 Made by Niels#5962')
        .setTimestamp()
        .setColor("00FF00")
        .setThumbnail(member.user.avatarURL())

    member.guild.channels.cache.get(chx).send(`<@${member.id}>`)
    member.guild.channels.cache.get(chx).send(embed)

})

client.on("guildMemberRemove", (member) => {
    let chx = db.get(`lvch_${member.guild.id}`);

    if (chx === null) return

    let embed = new discord.MessageEmbed()
        .setTitle(`Bye ${member.displayName}`)
        .setDescription(`We'll miss you!!.
        This guild now has ${member.guild.memberCount} members. :(`)
        .setFooter('👌 Made by Niels#5962')
        .setTimestamp()
        .setColor("00FF00")
        .setThumbnail(member.user.avatarURL())

    member.guild.channels.cache.get(chx).send(embed)

})

client.on("messageDelete", async(message) => {
    if (message.author.bot) return

    const logChannel = db.get(`lgch_${message.guild.id}`)

    const sendLogChannel = message.guild.channels.cache.get(logChannel)

    if (!sendLogChannel) return

    let delEmbed = new discord.MessageEmbed()
        .setTitle("A message got deleted.")
        .setColor("#FF0000")
        .addFields({ name: "Message Content", value: message.content }, { name: "Message Author ID", value: message.author.id }, { name: "Message Author Tag", value: message.author.tag }, { name: "Channel", value: message.channel })
        .setFooter("👌 Made by Niels#5962")
        .setTimestamp()
        .setThumbnail(message.guild.iconURL())

    sendLogChannel.send(delEmbed)
})

client.on('messageUpdate', async(oldMessage, newMessage) => {
    if (oldMessage.author.bot) return;

    const logChannel = db.get(`lgch_${oldMessage.guild.id}`)

    const sendLogChannel = oldMessage.guild.channels.cache.get(logChannel)

    if (!sendLogChannel) return

    let editEmbed = new discord.MessageEmbed()
        .setTitle("A message got edited.")
        .setColor("#FFFF00")
        .addFields({ name: "Old message", value: oldMessage.content }, { name: "New message", value: newMessage.content }, { name: "Author ID", value: oldMessage.author.id }, { name: "Author Tag/Name", value: oldMessage.author.tag }, { name: "Channel", value: oldMessage.channel })
        .setFooter("👌 Made by Niels#5962")
        .setTimestamp()
        .setThumbnail(oldMessage.guild.iconURL())

    sendLogChannel.send(editEmbed)
})

client.login(process.env.TOKEN)