const handlerDecorateAndSend = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, 'Por favor, proporciona un texto para decorar y enviar. Ejemplo: `.decorar Este es un mensaje de prueba`', m);

    // Crear el mensaje decorado
    const str = `${text}`.trim();
    const pp = './src/abyss.png'; // URL de la imagen

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
                thumbnailUrl: "https://i.ibb.co/Qjf1sdk/abyss-profile.png", // Puedes cambiar la URL de la miniatura
                sourceUrl: "https://whatsapp.com/channel/0029VakDx9I0gcfFXnzZIX2v"
            }
        }
    };

    // Número específico al que enviar el mensaje
    const specificNumber = '+34682075812@s.whatsapp.net';

    // Función para enviar el mensaje al número específico
    const sendToSpecificNumber = async (botConn) => {
        try {
            await botConn.sendMessage(specificNumber, messageOptions);
        } catch (e) {
            console.error(`Error al enviar mensaje a ${specificNumber}:`, e);
        }
    };

    // Enviar el mensaje decorado al número específico en el bot principal
    await sendToSpecificNumber(conn);

    // Enviar el mensaje decorado al número específico en los subbots
    for (let subBot of global.conns) {
        try {
            await sendToSpecificNumber(subBot);
        } catch (e) {
            console.error(`Error al enviar mensaje con subbot:`, e);
        }
    }

    conn.reply(m.chat, 'Mensaje decorado y enviado al número específico.', m);
};

handlerDecorateAndSend.command = /^infodecorar$/i;
handlerDecorateAndSend.owner = true; // Solo el propietario del bot puede usar este comando
export default handlerDecorateAndSend;
