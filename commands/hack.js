const ms = require("ms")

module.exports.run = async(client, message, args) => {
    if (!args[0]) return message.reply("Please specify who to hack.")
    const hack = args.slice(0).join(" ") && args.shift().toLowerCase()

    function password() {
        let rand = ["ILOVECOOKIES", "Porn", "#ilikeporn123", "Hellothere123"]

        return rand[Math.floor(Math.random() * rand.length)]
    }

    function email() {
        let rand = [`${hack}@gmail.com`, `${hack}112@pornhub.com`, `${hack}@muck.com`, `${hack}@scree.scree`]

        return rand[Math.floor(Math.random() * rand.length)]
    }

    function words() {
        let rand = ["cat", "oop", "porn", "horny", "cum", "hello", "cat", "sausages", "weener"]

        return rand[Math.floor(Math.random() * rand.length)]
    }

    let msg = await message.channel.send(`Hacking ${hack}...`)
    let time = '3s'
    setTimeout(function() {
        msg.edit(`Finding password....`)
    }, ms(time))
    let time2 = '6s'
    setTimeout(function() {
        msg.edit(`Password: ${password()}`)
    }, ms(time2))
    let time3 = '6s'
    setTimeout(function() {
        msg.edit(`Finding email....`)
    }, ms(time3))
    let time4 = '6s'
    setTimeout(function() {
        msg.edit(`Email: ${email()}`)
    }, ms(time4))
    let time5 = '6s'
    setTimeout(function() {
        msg.edit(`Hacking Most Common Word...`)
    }, ms(time5))
    let time6 = '6s'
    setTimeout(function() {
        msg.edit(`Most Common Word: ${words()}`)
    }, ms(time6))
    let time7 = '6s'
    setTimeout(function() {
        msg.edit("Totally real and dangerous hack completed.")
        message.author.send(`Password: ${password()}.\nEmail: ${email()}.\nCommon Word: ${words()}.`)
        message.channel.send("I sent you an dm with the password, email and the most common word.")
    }, ms(time7))
}

module.exports.help = {
    name: "hack",
    description: "Hack someone with the totally real and dangerous hack!",
    aliases: [],
    category: "😂 Fun"
}