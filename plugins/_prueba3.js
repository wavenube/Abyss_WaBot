import MessageType from '@whiskeysockets/baileys';

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

    // Guardar el mensaje decorado en la base de datos del usuario
    global.db.data.users[m.sender].lastDecoratedMessage = messageOptions;

    // Enviar el mensaje decorado al chat actual
    await conn.sendMessage(m.chat, messageOptions, { quoted: m });

    conn.reply(m.chat, 'Mensaje decorado creado. Puedes enviarlo a todos los grupos usando el comando `.enviar`', m);
};

handlerDecorate.command = /^decorar$/i;
export default handlerDecorate;
