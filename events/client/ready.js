module.exports = async client => {   
    client.user.setActivity('備份你的伺服器!', {type: 'LISTENING'})
    console.log(`已成功登錄 ${client.user.tag}`);
};