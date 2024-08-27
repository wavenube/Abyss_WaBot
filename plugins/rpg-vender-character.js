import { personajes } from './personajes.js';

const handlerVenderCh = async (m, { conn, text }) => {
    // Obtiene el nombre del personaje que se quiere vender
    const personajeNombre = text.trim();

    if (!personajeNombre) {
        await conn.sendMessage(m.chat, { text: `❌ Debes especificar el nombre del personaje que deseas vender.` }, { quoted: m });
        return;
    }

    // Encuentra el personaje en la Pokédex del usuario
    const userPersonajes = global.db.data.users[m.sender].personajes;
    const personajeIndex = userPersonajes.findIndex(p => p.toLowerCase() === personajeNombre.toLowerCase());

    if (personajeIndex === -1) {
        await conn.sendMessage(m.chat, { text: `❌ No tienes a ${personajeNombre} en tu Pokédex.` }, { quoted: m });
        return;
    }

    // Busca el personaje en la base de datos
    const personaje = personajes.find(p => p.nombre.toLowerCase() === personajeNombre.toLowerCase());

    if (!personaje) {
        await conn.sendMessage(m.chat, { text: `❌ El personaje ${personajeNombre} no existe.` }, { quoted: m });
        return;
    }

    // Obtiene el valor en diamantes del personaje
    const valorDiamantes = personaje.valor || 0;

    if (valorDiamantes <= 0) {
        await conn.sendMessage(m.chat, { text: `❌ Este personaje no tiene valor en diamantes y no puede ser vendido.` }, { quoted: m });
        return;
    }

    // Agrega los diamantes al balance del usuario
    global.db.data.users[m.sender].diamantes = (global.db.data.users[m.sender].diamantes || 0) + valorDiamantes;

    // Elimina el personaje de la Pokédex del usuario
    userPersonajes.splice(personajeIndex, 1);

    // Marca el personaje como "libre" nuevamente
    personaje.estado = "libre";

    // Envía un mensaje de confirmación
    const mensaje = `
💎 *¡Venta Exitosa!*
🔹 Has vendido a *${personaje.nombre}* por *${valorDiamantes}* diamantes.
🔸 El personaje ahora está disponible para ser reclamado por otros usuarios.
    `.trim();

    await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
};

// Configuración del comando
handlerVenderCh.command = /^venderch$/i;
handlerVenderCh.owner = false; // Puede ser usado por cualquier usuario
export default handlerVenderCh;
