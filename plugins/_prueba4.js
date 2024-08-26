const handler = async (m, { conn, usedPrefix, text }) => {
    if (!text) throw '⚠️ *Por favor, escribe el texto que quieres decorar.*';

    // Decorar el texto recibido
    const str = `${text}`.trim();

    // Definir la imagen a enviar
    const pp = './src/abyss.png'; // Puedes cambiar la URL de la imagen

    // Crear el mensaje con el texto decorado
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
                title: 'wm', // Aquí puedes reemplazar con el texto que desees
                body: "By: ZephyrByte",
                thumbnailUrl: "https://i.ibb.co/Qjf1sdk/abyss-profile.png", // Puedes cambiar la URL de la miniatura
                sourceUrl: "https://whatsapp.com/channel/0029VakDx9I0gcfFXnzZIX2v"
            }
        }
    };

    // Enviar el mensaje inicial
    const sentMessage = await conn.sendMessage(m.chat, messageOptions);

    // Esperar a que el mensaje sea enviado
    await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo para asegurar que el mensaje esté enviado

    // Editar el mensaje con el texto decorado
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
        },
        quoted: sentMessage // Esto asegura que estamos editando el mensaje enviado previamente
    });

    // Confirmar que el mensaje ha sido editado
    m.reply('El mensaje ha sido editado con el texto decorado.');
};

// Configuración del comando
handler.command = /^(decorar2)$/i;
handler.exp = 50;

export default handler;
