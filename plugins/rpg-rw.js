import { personajes } from './plugins/personajes.js'; // Ajusta la ruta si es necesario

// Variable global para almacenar el personaje actual y su propietario
global.currentPersonaje = null;
global.reclamadorActual = null;
global.reclamadorTimeout = null;

const handlerRW = async (m, { conn, usedPrefix }) => {
    // Selecciona un personaje aleatorio
    const personaje = personajes.find(p => p.estado === "libre");

    if (!personaje) {
        await conn.sendMessage(m.chat, { text: `❌ No hay personajes libres disponibles en este momento.` }, { quoted: m });
        return;
    }

    // Muestra la información del personaje
    const str = `
 **Nombre**: ${personaje.nombre}
🎯 **Título**: ${personaje.titulo}
📝 **Descripción**: ${personaje.descripcion}
📜 **Estado**: ${personaje.estado === "libre" ? "Libre" : "Ocupado"}
    `.trim();

    // Guarda el personaje actual en la variable global
    global.currentPersonaje = personaje;
    global.reclamadorActual = null; // Reinicia el reclamador actual

    // Envia el mensaje con la información del personaje
    await conn.sendMessage(m.chat, { image: { url: personaje.imagen }, caption: str }, { quoted: m });

    // Añade el temporizador para la reclamación
    global.reclamadorTimeout = setTimeout(async () => {
        if (!global.reclamadorActual) {
            await conn.sendMessage(m.chat, `⏳ El tiempo ha expirado para reclamar a ${personaje.nombre}.`, { quoted: m });
            // Marca el personaje como libre nuevamente
            personaje.estado = "libre";
        }
        // Limpia el personaje reclamado después del tiempo de espera
        global.currentPersonaje = null;
    }, 10000); // 10 segundos
};

// Exportar el manejador de comandos
handlerRW.command = /^rw$/i;
handlerRW.owner = false; // Puede ser usado por cualquier usuario
export default handlerRW;
