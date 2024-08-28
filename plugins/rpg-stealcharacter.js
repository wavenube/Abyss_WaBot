const handlerSteal = async (m, { conn, text }) => {
    // Verifica si el comando incluye la mención de un usuario
    if (!m.mentionedJid[0]) {
        await conn.sendMessage(m.chat, { text: `❌ Debes mencionar a un usuario para robar un personaje.` }, { quoted: m });
        return;
    }

    const targetUser = m.mentionedJid[0];
    const targetUserData = global.db.data.users[targetUser];
    const thiefUserData = global.db.data.users[m.sender];

    // Verifica si el usuario objetivo tiene personajes en su Pokédex
    if (!targetUserData.personajes || targetUserData.personajes.length === 0) {
        await conn.sendMessage(m.chat, { text: `❌ El usuario mencionado no tiene personajes en su Pokédex.` }, { quoted: m });
        return;
    }

    // Verifica si el usuario objetivo tiene personajes asegurados
    const asegurados = targetUserData.asegurados || {};

    // Selecciona un personaje aleatorio de la Pokédex del usuario objetivo
    let stolenPersonajeIndex = Math.floor(Math.random() * targetUserData.personajes.length);
    let stolenPersonaje = targetUserData.personajes[stolenPersonajeIndex];

    // Si el personaje está asegurado, intenta robar otro
    let intentos = 0;
    while (asegurados[stolenPersonaje] && intentos < targetUserData.personajes.length) {
        stolenPersonajeIndex = Math.floor(Math.random() * targetUserData.personajes.length);
        stolenPersonaje = targetUserData.personajes[stolenPersonajeIndex];
        intentos++;
    }

    // Si todos los personajes están asegurados, no se puede robar
    if (asegurados[stolenPersonaje]) {
        await conn.sendMessage(m.chat, { text: `🔒 Todos los personajes de este usuario están asegurados y no pueden ser robados.` }, { quoted: m });
        return;
    }

    // Remueve el personaje robado de la Pokédex del usuario objetivo
    targetUserData.personajes.splice(stolenPersonajeIndex, 1);

    // Agrega el personaje robado a la Pokédex del ladrón
    if (!thiefUserData.personajes) {
        thiefUserData.personajes = [];
    }
    thiefUserData.personajes.push(stolenPersonaje);

    // Enviar mensaje de éxito
    const mensaje = `
🎩 *¡Robo Exitoso!*
🔹 Has robado a *${stolenPersonaje}* de la Pokédex de @${targetUser.split('@')[0]}.
🔸 Ahora *${stolenPersonaje}* está en tu Pokédex.
    `.trim();

    await conn.sendMessage(m.chat, { text: mensaje, mentions: [targetUser] }, { quoted: m });
};

// Configuración del comando
handlerSteal.command = /^steal$/i;
handlerSteal.owner = false; // Puede ser usado por cualquier usuario
export default handlerSteal;
