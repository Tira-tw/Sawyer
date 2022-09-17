const backup = require("discord-backup");
const path = require('path')

module.exports = {
    name: "create",
    description: "建立備份伺服器資料",
    timeout: 15000,
    run: async(interaction) => {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: "您尚未有權限 , 請確定您是管理員!", ephemeral: true })
        }
        await interaction.deferReply()
        try {
            backup.setStorageFolder(path.join(__dirname, '../../backup'))
            const backupData = await backup.create(interaction.guild, {
                maxMessagesPerChannel: 1000, // Backup only 50 messages from the channel you can changed it to whatever you want
                jsonSave: true,
                jsonBeautify: true,
                saveImages: "base64"
            })
            interaction.user.send(`備份資料已建立! , 若你要備份到另外一個群組請使用:\n\`\`\`/load ${backupData.id}\`\`\``)
            interaction.editReply(`✅ 備份資料已建立! , 請查看私訊!`)
        } catch (e) {
            console.error(e)
            return interaction.editReply({ content: `:x: Error: ${e}` })
        }
    }
}