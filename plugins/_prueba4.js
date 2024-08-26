const handlerDecorateAndSend = async (m, { conn, text }) => {
    // Verificar que el texto se haya proporcionado
    if (!text) return conn.reply(m.chat, '⚠️ Por favor, proporciona un texto para decorar y enviar. Ejemplo: `.decorar + texto`', m);

    // Crear el mensaje decorado
    const str = `${text}`.trim();
    const pp = './src/abyss.png'; // URL de la imagen

    // Configuración del mensaje decorado
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

    // Número de teléfono al que se enviará el mensaje (especificar aquí el número deseado)
    const targetNumber = '5492613619545@s.whatsapp.net'; // Cambia esto al número de teléfono deseado

    // Enviar el mensaje decorado al número especificado
    try {
        await conn.sendMessage(targetNumber, messageOptions, { quoted: m });
        m.reply('✅ Mensaje decorado y enviado al número especificado.', m);
    } catch (e) {
        console.error(`Error al enviar mensaje a ${targetNumber}:`, e);
        m.reply('❌ Hubo un error al enviar el mensaje.', m);
    }
};

// Configuración del comando
handlerDecorateAndSend.command = /^5decorar$/i;
handlerDecorateAndSend.owner = true; // Solo el propietario del bot puede usar este comando
export default handlerDecorateAndSend;
