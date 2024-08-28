import { personajes } from './personajes.js'; // Ajusta la ruta si es necesario

const handlerInfoCh = async (m, { conn, args, usedPrefix }) => {
    // Verifica si el usuario ha proporcionado un nombre de personaje
    if (!args.length) {
        return conn.sendMessage(m.chat, { text: `📜 Uso correcto: ${usedPrefix}infoch <nombre del personaje>` }, { quoted: m });
    }

    const nombrePersonaje = args.join(' ').toLowerCase(); // Obtiene el nombre del personaje en minúsculas
    const personaje = personajes.find(p => p.nombre.toLowerCase() === nombrePersonaje);

    // Verifica si el personaje existe
    if (!personaje) {
        return conn.sendMessage(m.chat, { text: `❌ El personaje "${nombrePersonaje}" no se encuentra en la base de datos.` }, { quoted: m });
    }

    // Verifica si el usuario ha reclamado el personaje
    const usuario = global.db.data.users[m.sender];
    if (!usuario || !usuario.personajes || !usuario.personajes.includes(personaje.nombre)) {
        return conn.sendMessage(m.chat, { text: `❌ No tienes el personaje "${personaje.nombre}" en tu pokédex.` }, { quoted: m });
    }

    // Muestra la información del personaje
    const str = `
🖼️ **Nombre**: ${personaje.nombre}
🎯 **Título**: ${personaje.titulo}
📝 **Descripción**: ${personaje.descripcion}
💰 **Valor**: ${personaje.valor} diamantes
📍 **Estado**: ${personaje.estado}
    `.trim();

    try {
        // Intenta enviar el mensaje con la imagen
        await conn.sendMessage(m.chat, { image: { url: personaje.imagen }, caption: str }, { quoted: m });
    } catch (error) {
        // En caso de error al cargar la imagen
        console.error("Error al cargar la imagen:", error.message);
        await conn.sendMessage(m.chat, { text: `📸 No se pudo cargar la imagen del personaje. Aquí está la información del personaje:\n\n${str}` }, { quoted: m });
    }
};

handlerInfoCh.command = /^infoch$/i;
handlerInfoCh.owner = false; // Puede ser usado por cualquier usuario
export default handlerInfoCh;
