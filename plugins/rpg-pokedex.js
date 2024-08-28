// Importa la lista de personajes desde el archivo personajes.js
import { personajes } from './personajes.js'; // Ajusta la ruta si es necesario

const handlerPokedex = async (m, { conn }) => {
    const user = global.db.data.users[m.sender];

    if (!user.personajes || user.personajes.length === 0) {
        await conn.sendMessage(m.chat, { text: `📜 No tienes personajes reclamados.` }, { quoted: m });
        return;
    }

    // Crea una lista de personajes reclamados
    const personajesReclamados = user.personajes.map((nombre) => {
        const personaje = personajes.find(p => p.nombre === nombre);
        return personaje ? `🖼️ **Nombre**: ${personaje.nombre}\n🎯 **Título**: ${personaje.titulo}\n📝 **Descripción**: ${personaje.descripcion}` : '';
    }).join('\n\n');

    // Envía la lista de personajes reclamados
    await conn.sendMessage(m.chat, { text: `📜 **Tus personajes reclamados:**\n\n${personajesReclamados}` }, { quoted: m });
};

// Exportar el manejador de comandos
handlerPokedex.command = /^pokedex$/i;
handlerPokedex.owner = false; // Puede ser usado por cualquier usuario
export default handlerPokedex;
