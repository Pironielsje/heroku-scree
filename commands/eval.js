const { inspect } = require('util')

module.exports.run = async(client, message, args) => {
    if (message.author.id === "266872241587748864") {
        const code = args.join(" ");
        if (!code) return message.reply("Specify some code boss.")

        try {
            const result = await eval(code)
            let output = result;
            if (typeof result !== "string") {
                output = inspect(result)
            }

            message.channel.send(output, { code: 'js' })

        } catch (error) {
            message.channel.send('Something failed.')
        }
    } else {
        message.reply("This is an owner only command.")
    }
}

module.exports.help = {
    name: "eval",
    aliases: [],
    category: ""
}