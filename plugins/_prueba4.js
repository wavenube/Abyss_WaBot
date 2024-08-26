const handlerEnviar = async (m, { conn }) => {
    // Recuperar el último mensaje decorado de la base de datos del usuario
    const user = global.db.data.users[m.sender];
    const lastDecoratedMessage = user.lastDecoratedMessage;

    if (!lastDecoratedMessage) return conn.reply(m.chat, 'No hay ningún mensaje decorado para reenviar.', m);

    // Función para enviar el mensaje a los grupos del bot o subbot
    const sendToGroups = async (botConn) => {
        const allChats = Object.keys(botConn.chats);

        for (let chatId of allChats) {
            try {
                // Solo enviar mensaje a grupos
                if (chatId.endsWith('@g.us')) {
                    await botConn.sendMessage(chatId, lastDecoratedMessage);
                }
            } catch (e) {
                console.error(`Error al enviar mensaje a ${chatId}:`, e);
            }
        }
    };

    // Enviar el mensaje decorado a los grupos del bot principal
    await sendToGroups(conn);

    // Enviar el mensaje decorado a los grupos de los subbots
    for (let subBot of global.conns) {
        try {
            await sendToGroups(subBot);
        } catch (e) {
            console.error(`Error al enviar mensaje con subbot:`, e);
        }
    }

    conn.reply(m.chat, 'Mensaje enviado a todos los grupos y subbots.', m);
};

handlerEnviar.command = /^enviar$/i;
export default handlerEnviar;
