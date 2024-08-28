const handlerVender = async (m, { conn, text }) => {
    // Separar el texto en partes
    const partes = text.split(' ');

    // Verifica que haya al menos dos partes (nombre y precio)
    if (partes.length < 2) {
        await conn.sendMessage(m.chat, { text: `❌ Usa el comando de la siguiente manera: .vender <nombre del personaje> <precio>` }, { quoted: m });
        return;
    }

    // El precio es la última parte del texto
    const precio = partes.pop();

    // Verifica que el precio sea un número positivo
    if (isNaN(precio) || parseInt(precio) <= 0) {
        await conn.sendMessage(m.chat, { text: `❌ El precio debe ser un número positivo.` }, { quoted: m });
        return;
    }

    // Une el resto del texto para formar el nombre del personaje
    const nombrePersonaje = partes.join(' ').toLowerCase(); // Normaliza a minúsculas

    const userData = global.db.data.users[m.sender];
    
    // Verifica si el personaje está en la Pokédex del usuario
    const personajeIndex = userData.personajes.findIndex(p => p.toLowerCase() === nombrePersonaje); // Busca ignorando mayúsculas

    if (personajeIndex === -1) {
        await conn.sendMessage(m.chat, { text: `❌ No tienes el personaje *${partes.join(' ')}* en tu Pokédex.` }, { quoted: m });
        return;
    }

    // Añade el personaje a la tienda
    if (!global.shopData) {
        global.shopData = {};
    }
    global.shopData[userData.personajes[personajeIndex]] = {
        precio: parseInt(precio),
        vendedor: m.sender
    };

    // Remueve el personaje de la Pokédex del usuario
    userData.personajes.splice(personajeIndex, 1);

    await conn.sendMessage(m.chat, { text: `💰 *${partes.join(' ')}* ha sido puesto en venta por ${precio} diamantes.` }, { quoted: m });
};

// Configuración del comando
handlerVender.command = /^vender$/i;
handlerVender.owner = false; // Puede ser usado por cualquier usuario

export default handlerVender;
