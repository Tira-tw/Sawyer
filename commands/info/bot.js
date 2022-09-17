const humanizeDuration = require("humanize-duration");
const Discord = require('discord.js')

module.exports = {
    name: "about_bot",
    description: "關於Bot",
    run: async(interaction, client) => {
        const fnr = await client.users.fetch('848164182334898216');
        const embed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setURL('https://github.com/FnrDev/backup-slash')
        .setFooter(`開發者 : ${fnr.tag} | https://github.com/Tira-tw`, fnr.displayAvatarURL({ dynamic: true }))
        .setColor('#edbb26')
        .addFields(
            {
                name: "用戶:",
                value: client.users.cache.size.toString(),
                inline: true
            },
            {
                name: "伺服器:",
                value: client.guilds.cache.size.toString(),
                inline: true
            },
            {
                name: "Bot運行時間:",
                value: humanizeDuration(client.uptime, { round: true }),
                inline: true
            },
        )
        interaction.reply({ embeds: [embed] })
    }
}