const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports.run = async(client, message, args) => {
    const isNSFW = message.channel.nsfw

    if (!isNSFW) return message.reply('Man you naughty bitch this channel isn\'t nsfw what r u thinkin?')

    fetch('https://www.reddit.com/r/4k_porn/random/.json').then(resp => resp.json()).then(respTransformed => {

        var permaLink = respTransformed[0].data.children[0].data.permalink;
        var nsfwURL = `https://www.reddit.com${permaLink}`;
        var nsfwImage = respTransformed[0].data.children[0].data.url;
        var nsfwTitle = respTransformed[0].data.children[0].data.title;

        let embed = new MessageEmbed()
            .setTitle(nsfwTitle)
            .setColor("RANDOM")
            .setURL(nsfwURL)
            .setImage(nsfwImage)
            .setFooter(`DON'T WATCH IF UR UNDER 18 LMAO`);


        message.channel.send(embed)

    }).catch("error", (err) => {
        console.log(err.message);
    })

}

module.exports.help = {
    name: '4k',
    description: 'returns 4k porn',
    aliases: [],
    category: "🔞 Not Safe For Work"
}