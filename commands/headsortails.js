module.exports.run = async(client, message, args) => {
    function kopofmunt() {
        var rand = ["heads", "tails"]

        return rand[Math.floor(Math.random() * rand.length)]
    }

    message.reply(`You got ${kopofmunt()}!`)
}

module.exports.help = {
    name: "heads-or-tails",
    description: "gives heads or tails",
    aliases: ["hot", "headsortails", "kopofmunt", "kom"],
    category: "😂 Fun"
}