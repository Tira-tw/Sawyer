const backup = require('discord-backup');
const humanizeDuration = require("humanize-duration");
const Discord = require('discord.js')

module.exports = {
    name: "info",
    description: "查看備份資訊",
    options: [
        {
            name: "備份代碼",
            description: "請填入備份代碼!",
            type: 3,
            required: true
        }
    ],
    run: async(interaction) => {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: "您尚未有權限使用 , 請確定您是管理員!", ephemeral: true })
        }
        await interaction.deferReply()
        const getBackupCode = interaction.options.getString('backup_code');
        try {
            await backup.fetch(getBackupCode)
        } catch (e) {
            return interaction.editReply(`無備份資訊! \`${getBackupCode}\``)
        }
        const backupData = await backup.fetch(getBackupCode);
        const distnce = Date.now() - backupData.data.createdTimestamp;
        const embed = new Discord.MessageEmbed()
        .setAuthor(backupData.data.name, backupData.data.iconURL)
        .setColor('#edbb26')
        .addFields(
            {
                name: "備份代碼 :",
                value: backupData.id,
                inline: true
            },
            {
                name: "伺服器ID :",
                value: backupData.data.guildID,
                inline: true
            },
            {
                name: "備份大小 :",
                value: `${backupData.size} kb`,
                inline: true
            },
            {
                name: "備份建立時間 :",
                value: `**${humanizeDuration(distnce, { largest: 2, round: true })}**`,
                inline: true
            }
        )
        interaction.editReply({ embeds: [embed] })
    }
}