module.exports = {
    name: "ping",
    description: "查看延遲",
    run: async(interaction, client) => {
        await interaction.reply("等待中..")
        const msg = await interaction.fetchReply();
        interaction.editReply({ content: `**Time:** ${Math.floor(msg.createdTimestamp - interaction.createdTimestamp)} ms\n**API Ping:** ${client.ws.ping} ms` })
    }
}