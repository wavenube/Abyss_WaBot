const handlerClaimch = async (m, { conn }) => {
    // Verifica si hay un personaje actualmente disponible para reclamar
    const personaje = global.currentPersonaje;

    if (!personaje) {
        await conn.sendMessage(m.chat, { text: `❌ No hay ningún personaje disponible para reclamar.` }, { quoted: m });
        return;
    }

    // Verifica si el usuario ya ha reclamado el personaje
    if (global.db.data.users[m.sender].personajeReclamado === personaje.nombre) {
        await conn.sendMessage(m.chat, { text: `❌ Ya has reclamado a ${personaje.nombre}.` }, { quoted: m });
        return;
    }

    // Agrega el personaje al perfil del usuario
    if (!global.db.data.users[m.sender].personajes) {
        global.db.data.users[m.sender].personajes = [];
    }

    if (global.db.data.users[m.sender].personajes.includes(personaje.nombre)) {
        await conn.sendMessage(m.chat, { text: `❌ Ya tienes este personaje en tu perfil.` }, { quoted: m });
    } else {
        global.db.data.users[m.sender].personajes.push(personaje.nombre);
        global.db.data.users[m.sender].personajeReclamado = personaje.nombre;

        // Marca el personaje como ocupado
        const personajeIndex = personajes.findIndex(p => p.nombre === personaje.nombre);
        if (personajeIndex !== -1) {
            personajes[personajeIndex].estado = 'ocupado';
        }

        await conn.sendMessage(m.chat, { text: `🎉 Has agregado a ${personaje.nombre} a tu perfil.` }, { quoted: m });
    }

    // Limpia el personaje reclamado
    global.currentPersonaje = null;
};

handlerClaimch.command = /^claimch$/i;
handlerClaimch.owner = false; // Puede ser usado por cualquier usuario
export default handlerClaimch;
