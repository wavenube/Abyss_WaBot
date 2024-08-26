const handlerDecorateAndSend = async (m, { conn, text }) => {
    if (!text || !text.includes(' ')) {
        return conn.reply(m.chat, '⚠️ Por favor, proporciona un número de teléfono y el texto que quieres decorar. Ejemplo: `.decorar +1234567890 Este es un mensaje de prueba`', m);
    }

    // Extraer número de teléfono y mensaje del texto
    const [phoneNumber, ...messageParts] = text.split(' ');
    const messageText = messageParts.join(' ').trim();

    // Validar el número de teléfono
    if (!phoneNumber.match(/^\+\d{10,15}$/)) {
        return conn.reply(m.chat, '⚠️ Número de teléfono inválido. Debe ser en formato internacional, e.g., +1234567890', m);
    }

    // Crear el mensaje decorado
    const str = `${messageText}`.trim();
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

    // Enviar el mensaje decorado al número de teléfono especificado
    try {
        // Verifica que el número de teléfono tenga el formato correcto
        const jid = `${phoneNumber}@s.whatsapp.net`;

        // Enviar el mensaje decorado al número especificado
        await conn.sendMessage(jid, messageOptions);
        conn.reply(m.chat, 'Mensaje decorado y enviado exitosamente.', m);
    } catch (e) {
        console.error(`Error al enviar mensaje a ${phoneNumber}:`, e);
        conn.reply(m.chat, '⚠️ Hubo un error al enviar el mensaje.', m);
    }
};

// Configuración del comando
handlerDecorateAndSend.command = /^decorar$/i;
handlerDecorateAndSend.owner = true; // Solo el propietario del bot puede usar este comando
export default handlerDecorateAndSend;
