const db = require('quick.db')

module.exports.run = async(client, message, args) => {
    message.channel.send("TESTTTTT")
}

module.exports.help = {
    name: "test",
    description: "test cmd",
    aliases: ["t"],
    category: "✅ Test"
}