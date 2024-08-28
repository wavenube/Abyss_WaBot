import { personajes } from './personajes.js';

const handlerAsegurarCh = async (m, { conn, text }) => {
    const personajeNombre = text.trim();

    if (!personajeNombre) {
        await conn.sendMessage(m.chat, { text: `❌ Debes especificar el nombre del personaje que deseas asegurar.` }, { quoted: m });
        return;
    }

    // Encuentra el personaje en la Pokédex del usuario
    const userPersonajes = global.db.data.users[m.sender].personajes || [];
    const personaje = personajes.find(p => p.nombre.toLowerCase() === personajeNombre.toLowerCase());

    if (!personaje) {
        await conn.sendMessage(m.chat, { text: `❌ El personaje ${personajeNombre} no existe.` }, { quoted: m });
        return;
    }

    if (!userPersonajes.includes(personaje.nombre)) {
        await conn.sendMessage(m.chat, { text: `❌ No tienes a ${personajeNombre} en tu Pokédex.` }, { quoted: m });
        return;
    }

    const asegurados = global.db.data.users[m.sender].asegurados || {};

    // Verifica si el personaje ya está asegurado
    if (asegurados[personaje.nombre]) {
        await conn.sendMessage(m.chat, { text: `❌ El personaje ${personajeNombre} ya está asegurado.` }, { quoted: m });
        return;
    }

    const costoAseguramiento = 25; // Costo por día

    if (global.db.data.users[m.sender].limit < costoAseguramiento) {
        await conn.sendMessage(m.chat, { text: `❌ No tienes suficientes diamantes. Necesitas ${costoAseguramiento} diamantes para asegurar a ${personajeNombre}.` }, { quoted: m });
        return;
    }

    // Resta los diamantes del usuario
    global.db.data.users[m.sender].limit -= costoAseguramiento;

    // Asegura el personaje por 24 horas
    asegurados[personaje.nombre] = {
        tiempoRestante: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
        fechaInicio: Date.now()
    };

    global.db.data.users[m.sender].asegurados = asegurados;

    // Envía un mensaje de confirmación
    const mensaje = `
🔒 *¡Personaje Asegurado!*
🔹 Has asegurado a *${personaje.nombre}* por 24 horas.
🔸 Costo: *${costoAseguramiento}* diamantes.
    `.trim();

    await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
};

// Configuración del comando
handlerAsegurarCh.command = /^(asegurarch|asegurar|as)$/i;
handlerAsegurarCh.owner = false; // Puede ser usado por cualquier usuario
export default handlerAsegurarCh;
