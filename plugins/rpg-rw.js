import { personajes } from './personajes.js'; // Ajusta la ruta si es necesario

// Variable global para almacenar el personaje actual
global.currentPersonaje = null;

const handlerRW = async (m, { conn, usedPrefix }) => {
    // Selecciona un personaje aleatorio de la lista completa de personajes
    const personaje = personajes[Math.floor(Math.random() * personajes.length)];

    // Muestra la información del personaje
    const estado = personaje.estado === 'libre' ? 'Libre' : `Ocupado por ${Object.keys(global.db.data.users).find(userId => global.db.data.users[userId].personajes && global.db.data.users[userId].personajes.includes(personaje.nombre))}`;
    const str = `
🖼️ **Nombre**: ${personaje.nombre}
🎯 **Título**: ${personaje.titulo}
📝 **Descripción**: ${personaje.descripcion}
📍 **Estado**: ${estado}

> 𝌡 *RECLAMAR*
\`Usa #claimch para reclamar\`
    `.trim();

    // Guarda el personaje actual en la variable global
    global.currentPersonaje = personaje;

    try {
        // Intenta enviar el mensaje con la imagen
        await conn.sendMessage(m.chat, { image: { url: personaje.imagen }, caption: str }, { quoted: m });
    } catch (error) {
        // En caso de error al cargar la imagen
        console.error("Error al cargar la imagen:", error.message);
        await conn.sendMessage(m.chat, { text: `📸 No se pudo cargar la imagen del personaje. Aquí está la información del personaje:\n\n${str}` }, { quoted: m });
    }

    // Añade el temporizador para la reclamación
    global.reclamadorTimeout = setTimeout(async () => {
        if (global.db.data.users[global.reclamadorActual]?.personajeReclamado === personaje.nombre) {
            await conn.sendMessage(m.chat, `🎉 ¡Has reclamado a ${personaje.nombre}!`, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, `⏳ El tiempo ha expirado para reclamar a ${personaje.nombre}.`, { quoted: m });
        }
    }, 10000); // 10 segundos para reclamar
};

handlerRW.command = /^rw$/i;
handlerRW.owner = false; // Puede ser usado por cualquier usuario
export default handlerRW;
