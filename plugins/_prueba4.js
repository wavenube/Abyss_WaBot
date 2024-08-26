const handler = async (m, { conn, usedPrefix, text }) => {
    if (!text) throw '⚠️ *Por favor, escribe el texto que quieres decorar.*';

    // Decorar el texto recibido
    const str = `${text}`.trim();
    const pp = './src/abyss.png'; // Imagen de la decoración

    // Mensaje de carga inicial
    const loadingMessage = '🕒 *Procesando...*';

    // Enviar el mensaje de carga
    let { key } = await conn.sendMessage(m.chat, { text: loadingMessage }, { quoted: m });

    // Esperar unos segundos antes de editar el mensaje
    await new Promise(resolve => setTimeout(resolve, 2000)); // Espera de 2 segundos

    // Opciones para el mensaje final decorado
    const messageOptions = {
        text: str,
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

    // Editar el mensaje con el texto decorado
    await conn.sendMessage(m.chat, { ...messageOptions, edit: key }, { quoted: m });
};

// Configuración del comando
handler.command = /^decorar2$/i;
handler.exp = 50;

export default handler;
