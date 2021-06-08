const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports.run = async(client, message, args) => {

    fetch('https://www.reddit.com/r/memes/random/.json').then(resp => resp.json()).then(respTransformed => {

        var permaLink = respTransformed[0].data.children[0].data.permalink;
        var memeURL = `https://www.reddit.com${permaLink}`;
        var memeImage = respTransformed[0].data.children[0].data.url;
        var memeTitle = respTransformed[0].data.children[0].data.title;
        var upvotes = respTransformed[0].data.children[0].data.ups;
        var comments = respTransformed[0].data.children[0].data.num_comments;

        let embed = new MessageEmbed()
            .setTitle(memeTitle)
            .setColor("RANDOM")
            .setURL(memeURL)
            .setImage(memeImage)
            .setFooter(`🔼${upvotes} / 💬${comments}`);


        message.channel.send(embed)

    }).catch("error", (err) => {
        console.log(err.message);
    })

}

module.exports.help = {
    name: "meme",
    description: "Shows a meme from r/meme",
    aliases: [],
    category: "😂 Fun"
}