import fs from 'fs';

const handlerDecorateAndSend = async (m, { conn, text, usedPrefix, command }) => {
    // Cargar traducciones
    const datas = global;
    const idioma = datas.db.data.users[m.sender].language;
    const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
    const tradutor = _translate.plugins.owner_reporte;

    // Verificar que se ha proporcionado un texto
    if (!text) {
        return conn.reply(m.chat, `${tradutor.texto1[0]}\n*${usedPrefix + command} ${tradutor.texto1[1]} ${usedPrefix}play ${tradutor.texto1[2]}`, m);
    }
    if (text.length < 10) return conn.reply(m.chat, tradutor.texto2, m);
    if (text.length > 10000) return conn.reply(m.chat, tradutor.texto3, m);

    // Crear el mensaje decorado
    const str = `${text}`.trim();
    const pp = './src/prueba.png'; // URL de la imagen

    // Opciones del mensaje decorado
    const messageOptions = {
        image: { url: pp },
        caption: str,
        mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net'),
        contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "none@newsletter",
                serverMessageId: 1,
                newsletterName: "<Arreglos - Expertos>",
            },
            externalAdReply: {
                mediaUrl: "https://arreglosexpertos.com/",
                mediaType: 'VIDEO',
                description: 'canal del grupo',
                title: 'correccion',
                body: "de web",
                thumbnailUrl: "https://ibb.co/PNbM1Xb][img]https://i.ibb.co/PNbM1Xb/Captura-de-pantalla-2024-08-26-155449.png", // Puedes cambiar la URL de la miniatura
                sourceUrl: "https://arreglosexpertos.com/"
            }
        }
    };

    // Número de teléfono al que se enviará el mensaje (especificar aquí el número deseado)
    const targetNumber = '34682075812@s.whatsapp.net'; // Cambia esto al número de teléfono deseado

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
handlerDecorateAndSend.command = /^6decorar$/i;
handlerDecorateAndSend.owner = true; // Solo el propietario del bot puede usar este comando
export default handlerDecorateAndSend;
