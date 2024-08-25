import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { conn, usedPrefix }) => {
    // Mensaje de advertencia para no hacer spam
    await conn.sendMessage(m.chat, { text: '⚠️ *No hagas spam de comandos.*' }, { quoted: m });

    // Mensaje de bienvenida
    const bienvenida = `👋 ¡Bienvenido(a)!\nElige una opción del menú:`;

    // URL de imagen para el menú
    const imageUrl = 'https://example.com/imagen_de_bienvenida.jpg'; // Reemplaza con la URL de tu imagen

    // Crear y enviar el mensaje interactivo con botones
    await sendInteractiveMessage(m, conn, bienvenida, imageUrl, usedPrefix);
};

// Función para enviar el mensaje interactivo con botones
async function sendInteractiveMessage(m, conn, bienvenida, imageUrl, usedPrefix) {
    // Preparar el mensaje con la imagen
    const messa = await prepareWAMessageMedia({ image: { url: imageUrl } }, { upload: conn.waUploadToServer });

    // Generar el mensaje interactivo con botones
    const msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: { text: bienvenida },
                    footer: { text: 'Selecciona una opción' }, // Pie de página opcional
                    header: {
                        hasMediaAttachment: true,
                        imageMessage: messa.imageMessage, // La imagen que se incluirá en el mensaje
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: 'quick_reply',
                                buttonParamsJson: JSON.stringify({
                                    display_text: 'AllMenu',
                                    id: `${usedPrefix}allmenu`
                                })
                            },
                            {
                                name: 'quick_reply',
                                buttonParamsJson: JSON.stringify({
                                    display_text: 'Menu',
                                    id: `${usedPrefix}menu`
                                })
                            },
                        ],
                        messageParamsJson: "",
                    },
                },
            },
        }
    }, { userJid: conn.user.jid, quoted: m });

    // Enviar el mensaje
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
}

// Configuración del comando
handler.command = /^(prueba1)$/i; // Este comando se activará con "bienvenida" o "welcome"

export default handler;
