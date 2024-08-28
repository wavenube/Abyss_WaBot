const COOLDOWN_TIME = 5 * 60 * 1000; // 5 minutos en milisegundos

const handlerSteal = async (m, { conn, text }) => {
    // Verifica si el comando incluye la mención de un usuario
    if (!m.mentionedJid[0]) {
        await conn.sendMessage(m.chat, { text: `❌ Debes mencionar a un usuario para robar un personaje.` }, { quoted: m });
        return;
    }

    const targetUser = m.mentionedJid[0];
    const thiefUser = m.sender;

    // Verifica si el usuario objetivo y el ladrón existen en la base de datos
    if (!global.db.data.users[targetUser] || !global.db.data.users[thiefUser]) {
        await conn.sendMessage(m.chat, { text: `❌ Usuario no encontrado en la base de datos.` }, { quoted: m });
        return;
    }

    const targetUserData = global.db.data.users[targetUser];
    const thiefUserData = global.db.data.users[thiefUser];

    // Verifica si el usuario objetivo tiene personajes en su Pokédex
    if (!targetUserData.personajes || targetUserData.personajes.length === 0) {
        await conn.sendMessage(m.chat, { text: `❌ El usuario mencionado no tiene personajes en su Pokédex.` }, { quoted: m });
        return;
    }

    // Verifica el cooldown
    const now = Date.now();
    if (targetUserData.lastSteal && now - targetUserData.lastSteal < COOLDOWN_TIME) {
        const tiempoRestante = Math.ceil((COOLDOWN_TIME - (now - targetUserData.lastSteal)) / 60000);
        await conn.sendMessage(m.chat, { text: `❌ No puedes robarle a este usuario aún. Espera ${tiempoRestante} minuto(s).` }, { quoted: m });
        return;
    }
    if (thiefUserData.lastSteal && now - thiefUserData.lastSteal < COOLDOWN_TIME) {
        const tiempoRestante = Math.ceil((COOLDOWN_TIME - (now - thiefUserData.lastSteal)) / 60000);
        await conn.sendMessage(m.chat, { text: `❌ Estás en cooldown. Espera ${tiempoRestante} minuto(s) antes de robar a otro usuario.` }, { quoted: m });
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

    // Actualiza el tiempo del último robo
    targetUserData.lastSteal = now;
    thiefUserData.lastSteal = now;

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
