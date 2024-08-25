import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { conn, usedPrefix }) => {
    // Mensaje de advertencia para no hacer spam
    await conn.sendMessage(m.chat, { text: '⚠️ *No hagas spam de comandos.*' }, { quoted: m });

    // Frases aleatorias para acompañar el mensaje de bienvenida
    const frases = [
        "`✨ Que tengas un día lleno de éxitos y alegrías.`",
        "`🌟 Recuerda que cada día es una nueva oportunidad.`",
        "`😊 Sonríe, hoy será un gran día.`",
        "`💪 ¡No olvides que eres increíble!`",
        "`🌈 Aprovecha al máximo cada momento.`",
        "`🎯 Hoy es el día perfecto para alcanzar tus metas.`"
    ];

    // Seleccionar una frase aleatoria
    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];

    // Mensaje de bienvenida con la frase aleatoria
    const bienvenida = `👋 ¡Bienvenido(a)!\n\n${fraseAleatoria}`;

    // Crear y enviar el mensaje interactivo con botones
    await sendInteractiveMessage(m, conn, bienvenida, usedPrefix);
};

// Función para enviar el mensaje interactivo con botones
async function sendInteractiveMessage(m, conn, bienvenida, usedPrefix) {
    // Generar el mensaje interactivo con botones
    const msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: { text: bienvenida },
                    footer: { text: 'Selecciona una opción' }, // Pie de página opcional
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: 'quick_reply',
                                buttonParamsJson: JSON.stringify({
                                    display_text: 'MENU COMPLETO',
                                    id: `${usedPrefix}allmenu`
                                })
                            },
                            {
                                name: 'quick_reply',
                                buttonParamsJson: JSON.stringify({
                                    display_text: 'PRUEBA DE VELOCIDAD',
                                    id: `${usedPrefix}menu`
                                })
                            },
                            {
                                name: 'quick_reply',
                                buttonParamsJson: JSON.stringify({
                                    display_text: 'AUTO VERIFICAR',
                                    id: `${usedPrefix}allmenu`
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
handler.command = /^(menu)$/i; // Este comando se activará con "bienvenida" o "welcome"

export default handler;
