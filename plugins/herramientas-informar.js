import MessageType from '@whiskeysockets/baileys';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, 'Por favor, proporciona un mensaje para informar. Ejemplo: `.informar Este es un mensaje de prueba`', m);

    // Función para enviar el mensaje a los grupos del bot o subbot
    const sendInformMessage = async (botConn, message) => {
        const allChats = Object.keys(botConn.chats);

        for (let chatId of allChats) {
            try {
                // Solo enviar mensaje a grupos
                if (chatId.endsWith('@g.us')) {
                    const groupMetadata = await botConn.groupMetadata(chatId);
                    const participants = groupMetadata.participants.map(participant => participant.id);

                    // Crear una lista de menciones
                    const users = participants.map(u => botConn.decodeJid(u));

                    // Crear el mensaje con menciones
                    const msg = botConn.cMod(
                        chatId,
                        generateWAMessageFromContent(
                            chatId,
                            {
                                extendedTextMessage: {
                                    text: message,
                                    contextInfo: { mentionedJid: users }
                                }
                            },
                            {
                                quoted: m,
                                userJid: botConn.user.id
                            }
                        ),
                        message,
                        botConn.user.jid,
                        { mentions: users }
                    );

                    // Enviar el mensaje
                    await botConn.relayMessage(chatId, msg.message, { messageId: msg.key.id });
                }
            } catch (e) {
                console.error(`Error al enviar mensaje a ${chatId}:`, e);
            }
        }
    };

    // Enviar el mensaje a los grupos del bot principal
    await sendInformMessage(conn, text);

    // Enviar el mensaje a los grupos de los subbots
    for (let subBot of global.conns) {
        try {
            await sendInformMessage(subBot, text);
        } catch (e) {
            console.error(`Error al enviar mensaje con subbot:`, e);
        }
    }

    conn.reply(m.chat, 'Mensaje enviado a todos los grupos y subbots.', m);
};

handler.command = /^informar$/i;
handler.owner = true; // Solo el propietario del bot puede usar este comando
export default handler;
