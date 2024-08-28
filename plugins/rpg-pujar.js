const handlerPujar = async (m, { conn, text }) => {
    const ahora = Date.now();

    // Verifica si hay una puja en curso
    if (!global.pujaData || !global.pujaData.finPuja || ahora > global.pujaData.finPuja) {
        await conn.sendMessage(m.chat, { text: `❌ No hay una puja activa en este momento.` }, { quoted: m });
        return;
    }

    const personajeNombre = text.trim().toLowerCase();

    if (!personajeNombre) {
        await conn.sendMessage(m.chat, { text: `❌ Debes especificar el nombre del personaje al que deseas pujar.` }, { quoted: m });
        return;
    }

    // Verifica si el usuario ya ha pujado
    if (global.pujaData.pujadores[m.sender]) {
        await conn.sendMessage(m.chat, { text: `❌ Solo puedes pujar una vez en esta puja.` }, { quoted: m });
        return;
    }

    // Busca el personaje en los personajes en puja
    const personaje = global.pujaData.personajes.find(p => p.nombre.toLowerCase() === personajeNombre);

    if (!personaje) {
        await conn.sendMessage(m.chat, { text: `❌ El personaje ${personajeNombre} no está en la puja actual.` }, { quoted: m });
        return;
    }

    // Aumenta el valor del personaje
    const nuevoValor = Math.ceil(personaje.valor * 1.5);
    personaje.valor = nuevoValor;

    // Marca al usuario como que ya ha pujado
    global.pujaData.pujadores[m.sender] = true;

    // Envía un mensaje de confirmación
    const mensaje = `
💎 *¡Puja Exitosa!*
🔹 Has pujado por *${personaje.nombre}*.
🔸 El nuevo valor es *${nuevoValor}* diamantes.
    `.trim();

    await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
};

// Configuración del comando
handlerPujar.command = /^pujar$/i;
handlerPujar.owner = false; // Puede ser usado por cualquier usuario

export default handlerPujar;
