
const handlerCronometro = async (m, { conn, text }) => {
    const input = text.trim();
    const timeInMinutes = parseInt(input);

    if (isNaN(timeInMinutes) || timeInMinutes <= 0) {
        return conn.reply(m.chat, 'Por favor, ingresa un tiempo válido en minutos. Ejemplo: `.crono 5`', m);
    }

    const { key } = await conn.sendMessage(m.chat, { text: `⏳ Iniciando cronómetro de ${timeInMinutes} minutos...` }, { quoted: m });

    for (let i = timeInMinutes; i > 0; i--) {
        await new Promise(resolve => setTimeout(resolve, 60000)); // Esperar 1 minuto
        await conn.sendMessage(m.chat, { text: `⏳ Quedan ${i} minutos...`, edit: key }, { quoted: m });
    }

    await conn.sendMessage(m.chat, { text: "⏰ ¡El tiempo ha terminado!", edit: key }, { quoted: m });
};

handlerCronometro.command = /^crono$/i;
handlerCronometro.owner = false; // Cualquier usuario puede usar este comando
export default handlerCronometro;
