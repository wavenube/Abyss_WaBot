// Definir pujaData globalmente en el archivo
const pujaData = {
    personajes: [],
    finPuja: null
};

// Comando para iniciar la puja
const handlerPuja = async (m, { conn }) => {
    const ahora = Date.now();

    // Si ya hay una puja en curso
    if (pujaData.finPuja && ahora < pujaData.finPuja) {
        await conn.sendMessage(m.chat, { text: `⏳ Ya hay una puja en curso. Finaliza en ${Math.ceil((pujaData.finPuja - ahora) / 60000)} minutos.` }, { quoted: m });
        return;
    }

    // Selecciona 3 personajes al azar
    pujaData.personajes = personajes.sort(() => 0.5 - Math.random()).slice(0, 3);
    pujaData.finPuja = ahora + 3600000; // 1 hora en milisegundos

    let mensaje = `🔔 *¡Puja Iniciada!*\n\n`;

    pujaData.personajes.forEach((p, index) => {
        mensaje += `🔸 *${p.nombre}*\n💎 Valor inicial: ${p.valor} diamantes\n\n`;
    });

    mensaje += `🕒 La puja finalizará en 1 hora. Usa .pujar <nombre del personaje> para pujar.`;

    await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
};

// Comando para pujar por un personaje
const handlerPujar = async (m, { conn, text }) => {
    const ahora = Date.now();

    // Verifica si hay una puja en curso
    if (!pujaData.finPuja || ahora > pujaData.finPuja) {
        await conn.sendMessage(m.chat, { text: `❌ No hay una puja activa en este momento.` }, { quoted: m });
        return;
    }

    const personajeNombre = text.trim().toLowerCase();

    if (!personajeNombre) {
        await conn.sendMessage(m.chat, { text: `❌ Debes especificar el nombre del personaje al que deseas pujar.` }, { quoted: m });
        return;
    }

    // Busca el personaje en los personajes en puja
    const personaje = pujaData.personajes.find(p => p.nombre.toLowerCase() === personajeNombre);

    if (!personaje) {
        await conn.sendMessage(m.chat, { text: `❌ El personaje ${personajeNombre} no está en la puja actual.` }, { quoted: m });
        return;
    }

    // Aumenta el valor del personaje
    const nuevoValor = Math.ceil(personaje.valor * 1.5);
    personaje.valor = nuevoValor;

    // Envía un mensaje de confirmación
    const mensaje = `
💎 *¡Puja Exitosa!*
🔹 Has pujado por *${personaje.nombre}*.
🔸 El nuevo valor es *${nuevoValor}* diamantes.
    `.trim();

    await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
};

// Configuración de los comandos
handlerPuja.command = /^pujarch$/i;
handlerPuja.owner = false; // Puede ser usado por cualquier usuario

handlerPujar.command = /^pujar$/i;
handlerPujar.owner = false; // Puede ser usado por cualquier usuario

export { handlerPuja, handlerPujar };
