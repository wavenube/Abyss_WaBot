import MessageType from '@whiskeysockets/baileys';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let lastDecoratedMessage = null; // Variable global para almacenar el último mensaje decorado

// Comando 'decorar'
const handlerDecorate = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, 'Por favor, proporciona un texto para decorar. Ejemplo: `.decorar Este es un mensaje de prueba`', m);

    // Crear el mensaje decorado
    const str = `${text}`.trim();
    const pp = 'https://i.ibb.co/Qjf1sdk/abyss-profile.png'; // URL de la imagen

    const messageOptions = {
        image: { url: pp },
        caption: str,
        mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net'),
        contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363318622514917@newsletter",
                serverMessageId: 1,
                newsletterName: "<Abyss - Bot>",
            },
            externalAdReply: {
                mediaUrl: "https://whatsapp.com/channel/0029VakDx9I0gcfFXnzZIX2v",
                mediaType: 'VIDEO',
                description: 'canal del grupo',
                title: 'wm',
                body: "By: ZephyrByte",
                thumbnailUrl: pp,
                sourceUrl: "https://whatsapp.com/channel/0029VakDx9I0gcfFXnzZIX2v"
            }
        }
    };

    // Guardar el mensaje decorado
    lastDecoratedMessage = generateWAMessageFromContent(m.chat, messageOptions, { quoted: m });

    // Enviar el mensaje decorado al chat actual
    await conn.relayMessage(m.chat, lastDecoratedMessage.message, { messageId: lastDecoratedMessage.key.id });

    conn.reply(m.chat, 'Mensaje decorado creado. Puedes enviarlo a todos los grupos usando el comando `.enviar`', m);
};

handlerDecorate.command = /^decorar$/i;
export default handlerDecorate;

// Comando 'enviar'
const handlerEnviar = async (m, { conn }) => {
    if (!lastDecoratedMessage) return conn.reply(m.chat, 'No hay ningún mensaje decorado para reenviar.', m);

    // Función para enviar el mensaje a los grupos del bot o subbot
    const sendToGroups = async (botConn) => {
        const allChats = Object.keys(botConn.chats);

        for (let chatId of allChats) {
            try {
                // Solo enviar mensaje a grupos
                if (chatId.endsWith('@g.us')) {
                    await botConn.relayMessage(chatId, lastDecoratedMessage.message, { messageId: lastDecoratedMessage.key.id });
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
