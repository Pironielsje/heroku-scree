const ms = require('ms')

module.exports.run = async(client, message, args) => {

    const permission = "MUTE_MEMBERS"

    if (!message.member.hasPermission(permission)) return message.reply(`You need the **${permission}** permission to do this.`)
    if (!message.guild.me.hasPermission(permission)) return message.reply(`I need the **${permission}** permission to do this.`)

    if (!args[0]) return message.reply("Please provide a user.")

    const muteUser = message.guild.member(message.mentions.members.first()) || message.guild.members.cache.get(args[0])

    if (!muteUser) return message.reply("Couldn't find that user. Please try again with a valid user.")

    var mutedRole = message.guild.roles.cache.find(r => r.name == "muted" || r.name == "Muted")
    if (!mutedRole) return message.reply("No muted role exists. Create a role with the name muted or Muted.")

    await (muteUser.roles.remove(mutedRole.id));
    message.channel.send(`${muteUser} has been unmuted.`)


}

module.exports.help = {
    name: 'unmute',
    description: "Unmute a member.",
    aliases: ["um"],
    category: "moderation."
}