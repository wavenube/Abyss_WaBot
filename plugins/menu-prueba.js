import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { conn, usedPrefix }) => {
    // Mensaje de advertencia para no hacer spam
    await conn.sendMessage(m.chat, { text: '⚠️ *No hagas spam de comandos.*' }, { quoted: m });

    // Frases aleatorias para acompañar el mensaje de bienvenida
    const frases = [
        "😎 Hoy toca sobrevivir, ya lo de triunfar lo vemos después.",
        "🍕 Un día sin pizza es un día perdido.",
        "🛌 Si la vida te da sueño, duérmete.",
        "💥 Hoy es un buen día para hacer nada y que nadie te moleste.",
        "☕ No eres tú, es el café que aún no he tomado.",
        "🔧 Si todo falla, echa la culpa a Mercurio retrógrado.",
        "🍔 Recuerda: el gimnasio puede esperar, la hamburguesa no.",
        "💻 La productividad es una leyenda urbana.",
        "🥤 Si el día va mal, siempre puedes pedir un delivery.",
        "🐢 No es procrastinación, es darle tiempo al cerebro para brillar.",
        "🍫 Si el plan A falla, el chocolate siempre es el plan B.",
        "🧘‍♂️ La calma es para los que no tienen Wi-Fi lento.",
        "🎮 A veces, la mejor estrategia es desconectarse y jugar un rato.",
        "🌮 Los problemas del mundo se resuelven mejor con tacos.",
        "😴 Si no tienes nada que hacer, entonces haz una siesta.",
        "🎉 Sobreviviste a otro día, ¡hora de celebrarlo!",
        "🚶‍♂️ Camina con estilo, aunque solo sea hasta la nevera."
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
                                    id: `${usedPrefix}ping`
                                })
                            },
                            {
                                name: 'quick_reply',
                                buttonParamsJson: JSON.stringify({
                                    display_text: 'AUTO VERIFICAR',
                                    id: `${usedPrefix}autoverificar`
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
