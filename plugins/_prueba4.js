const handlerEnviar = async (m, { conn }) => {
    if (!lastDecoratedMessage) throw '⚠️ *No hay ningún mensaje decorado para reenviar.*';

    // Obtener todos los chats donde el bot es miembro
    const chats = await conn.groupFetchAllParticipating();

    // Filtrar solo los chats que son grupos
    const groupChats = Object.values(chats).filter(chat => chat.id.endsWith('@g.us'));

    // Reenviar el último mensaje decorado a cada grupo
    for (const group of groupChats) {
        await conn.relayMessage(group.id, lastDecoratedMessage.message, { messageId: lastDecoratedMessage.key.id });
    }

    conn.reply(m.chat, '✅ *Mensaje enviado a todos los grupos.*', m);
};

handlerEnviar.command = /^(enviar)$/i;
handlerEnviar.exp = 50;

export default handlerEnviar;
