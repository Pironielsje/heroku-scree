module.exports.run = async(client, message, args) => {
    let channel = message.guild.channels.cache.get("851373866730127390")

    if (!message.author.id === "266872241587748864") {
        message.reply("Nope not for u.")
    }

    setTimeout(function() {
        sendMessage();
        var dayMilliseconds = 1000 * 60 * 60 * 24
        setInterval(function() {
            sendMessage()
        }, dayMilliseconds)
    }, leftToEight())

    function sendMessage() {
        channel.send("Good Morning!")
    }

    function leftToEight() {
        var d = new Date()
        return (-d + d.setHours(8, 0, 0, 0))
    }
}

module.exports.help = {
    name: "goodmorning",
    description: "Say's good morning every day at 8 am in goodmorning channel in scree support",
    aliases: [],
    category: ""
}