const handler = async (m, { conn, usedPrefix, text }) => {
    if (!text) throw '⚠️ *Por favor, escribe el texto que quieres decorar.*';

    // Decorar el texto recibido
    const str = `${text}`.trim();

    // Definir la imagen a enviar
    const pp = './src/abyss.png'; // Puedes cambiar la URL de la imagen

    // Enviar el mensaje decorado con la estructura que proporcionaste
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
                title: 'wm', // Aquí puedes reemplazar con el texto que desees
                body: "By: ZephyrByte",
                thumbnailUrl: "https://i.ibb.co/Qjf1sdk/abyss-profile.png", // Puedes cambiar la URL de la miniatura
                sourceUrl: "https://whatsapp.com/channel/0029VakDx9I0gcfFXnzZIX2v"
            }
        }
    };

    // Enviar el mensaje según sea grupo o chat privado
    if (m.isGroup) {
        await conn.sendMessage(m.chat, messageOptions, { quoted: fkontak });
    } else {
        await conn.sendMessage(m.chat, messageOptions, { quoted: fkontak });
    }
};

// Configuración del comando
handler.command = /^(decorar)$/i;
handler.exp = 50;

export default handler;
