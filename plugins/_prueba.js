import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys';
import fs from 'fs';

const handler = async (m, { conn, usedPrefix }) => {
    // Mensaje de advertencia para no hacer spam de comandos
    await conn.sendMessage(m.chat, { text: '⚠️ *No hagas spam de comandos.*' }, { quoted: m });

    // Mensaje de bienvenida
    const bienvenida = `👋 ¡Bienvenido(a)!\nElige una opción del menú:`;

    // Ruta de la imagen
    const pp = imagen1;
    // Leer la imagen y preparar el mensaje multimedia
    const mediaMessage = await prepareWAMessageMedia({ image: fs.readFileSync(imagePath) }, { upload: conn.waUploadToServer });

    // Generar el mensaje interactivo con botones y la imagen adjunta
    const msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                imageMessage: mediaMessage.imageMessage,
                caption: bienvenida,
                buttonsMessage: {
                    footerText: 'Selecciona una opción',
                    buttons: [
                        {
                            buttonText: { displayText: 'AllMenu' },
                            buttonId: `${usedPrefix}allmenu`,
                            type: 1
                        },
                        {
                            buttonText: { displayText: 'Menu' },
                            buttonId: `${usedPrefix}menu`,
                            type: 1
                        },
                    ],
                    headerType: 4 // Indica que el mensaje tiene imagen (ver sección 'headerType' en la documentación)
                }
            },
        }
    }, { userJid: conn.user.jid, quoted: m });

    // Enviar el mensaje con la imagen y los botones
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

// Configuración del comando
handler.command = /^(prueba2)$/i; // Este comando se activará con "bienvenida" o "welcome"

export default handler;
