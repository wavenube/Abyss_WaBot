const handlerDecorateAndSend = async (m, { conn, text }) => {
    if (!text) {
        return conn.reply(m.chat, '⚠️ Por favor, proporciona el texto que quieres decorar. Ejemplo: `.decorar Este es un mensaje de prueba`', m);
    }

    // Número de teléfono al que se enviará el mensaje (en formato internacional, e.g., +1234567890)
    const targetNumber = '+1234567890'; // Cambia este número por el destino deseado

    // Crear el mensaje decorado
    const str = `${text}`.trim();
    const pp = './src/abyss.png'; // URL de la imagen

    const messageOptions = {
        image: { url: pp },
        caption: str,
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

    try {
        // Formatear el número de teléfono
        const jid = `${targetNumber}@s.whatsapp.net`;

        // Enviar el mensaje decorado al número especificado
        await conn.sendMessage(jid, messageOptions);
        conn.reply(m.chat, 'Mensaje decorado y enviado exitosamente.', m);
    } catch (e) {
        console.error(`Error al enviar mensaje a ${targetNumber}:`, e);
        conn.reply(m.chat, '⚠️ Hubo un error al enviar el mensaje.', m);
    }
};

// Configuración del comando
handlerDecorateAndSend.command = /^2decorar$/i;
handlerDecorateAndSend.owner = true; // Solo el propietario del bot puede usar este comando
export default handlerDecorateAndSend;
