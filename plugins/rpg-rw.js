import { personajes } from './personajes.js'; // Ajusta la ruta si es necesario

// Variable global para almacenar el personaje actual
global.currentPersonaje = null;

const handlerRW = async (m, { conn, usedPrefix }) => {
    // Filtra los personajes que están libres
    const personajesLibres = personajes.filter(p => p.estado === 'libre');

    // Verifica si hay personajes disponibles
    if (personajesLibres.length === 0) {
        await conn.sendMessage(m.chat, { text: `❌ No hay personajes disponibles en este momento.` }, { quoted: m });
        return;
    }

    // Selecciona un personaje aleatorio
    const personaje = personajesLibres[Math.floor(Math.random() * personajesLibres.length)];

    // Muestra la información del personaje
    const str = `
🖼️ **Imagen**: ${personaje.imagen}
🎯 **Título**: ${personaje.titulo}
📝 **Descripción**: ${personaje.descripcion}
    `.trim();

    // Guarda el personaje actual en la variable global
    global.currentPersonaje = personaje;

    // Envia el mensaje con la información del personaje
    await conn.sendMessage(m.chat, { image: { url: personaje.imagen }, caption: str }, { quoted: m });

    // Añade el temporizador para la reclamación
    setTimeout(async () => {
        if (global.db.data.users[m.sender].personajeReclamado === personaje.nombre) {
            await conn.sendMessage(m.chat, `🎉 ¡Has reclamado a ${personaje.nombre}!`, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, `⏳ El tiempo ha expirado para reclamar a ${personaje.nombre}.`, { quoted: m });
        }
    }, 10000); // 10 segundos para reclamar
};

handlerRW.command = /^rw$/i;
handlerRW.owner = false; // Puede ser usado por cualquier usuario
export default handlerRW;
