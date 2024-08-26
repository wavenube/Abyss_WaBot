const handler = async (m, { conn, text }) => {
    if (!text) throw '⚠️ *Por favor, escribe el texto que quieres decorar.*';

    // Decorar el texto recibido
    const str = `${text}`.trim();

    // Definir la imagen a enviar
    const pp = './src/abyss.png'; // Puedes cambiar la URL de la imagen

    // Buscar el mensaje que el bot envió anteriormente
    const messages = await conn.fetchMessages(m.chat, { limit: 10 }); // Obtén los últimos 10 mensajes en el chat
    const botMessage = messages.find(msg => msg.key.fromMe && msg.message?.extendedTextMessage?.text?.startsWith('decorar2'));

    if (!botMessage) throw '⚠️ *No se encontró ningún mensaje enviado por el bot para editar.*';

    // Eliminar el mensaje original
    await conn.sendMessage(m.chat, { delete: botMessage.key });

    // Enviar el mensaje decorado
    await conn.sendMessage(m.chat, {
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
                title: 'wm', // Aquí puedes reemplazar con el texto que desees
                body: "By: ZephyrByte",
                thumbnailUrl: "https://i.ibb.co/Qjf1sdk/abyss-profile.png", // Puedes cambiar la URL de la miniatura
                sourceUrl: "https://whatsapp.com/channel/0029VakDx9I0gcfFXnzZIX2v"
            }
        }
    });

    // Confirmar que el mensaje ha sido editado
    m.reply('El mensaje ha sido editado con el texto decorado.');
};

// Configuración del comando
handler.command = /^(decorar3)$/i;
handler.exp = 50;

export default handler;
