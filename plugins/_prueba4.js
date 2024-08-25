let lastDecoratedMessage = null; // Declaración global

// Comando 'decorar'
const handlerDecorate = async (m, { conn, text }) => {
    if (!text) throw '⚠️ *Por favor, escribe el texto que quieres decorar.*';

    const str = `${text}`.trim();
    const pp = 'https://i.ibb.co/Qjf1sdk/abyss-profile.png'; // Puedes cambiar la URL de la imagen

    const fkontak = {
        key: { 
            participants: "0@s.whatsapp.net", 
            remoteJid: "status@broadcast", 
            fromMe: false, 
            id: "Halo" 
        }, 
        message: { 
            contactMessage: { 
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            }
        }, 
        participant: "0@s.whatsapp.net" 
    };

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
                thumbnailUrl: "https://i.ibb.co/Qjf1sdk/abyss-profile.png",
                sourceUrl: "https://whatsapp.com/channel/0029VakDx9I0gcfFXnzZIX2v"
            }
        }
    };

    // Enviar el mensaje decorado
    const sentMsg = await conn.sendMessage(m.chat, messageOptions, { quoted: fkontak });

    // Guardar el último mensaje decorado
    lastDecoratedMessage = sentMsg;
};

handlerDecorate.command = /^(decorar2)$/i;
handlerDecorate.exp = 50;
export default handlerDecorate;

// Comando 'enviar'
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
