const handlerComprar = async (m, { conn, text }) => {
    const nombrePersonaje = text.trim().toLowerCase(); // Normaliza a minúsculas

    if (!nombrePersonaje || !global.shopData) {
        await conn.sendMessage(m.chat, { text: `❌ El personaje *${text.trim()}* no está en la tienda.` }, { quoted: m });
        return;
    }

    // Busca el personaje en la tienda sin importar las mayúsculas/minúsculas
    const personajeKey = Object.keys(global.shopData).find(p => p.toLowerCase() === nombrePersonaje);
    
    if (!personajeKey) {
        await conn.sendMessage(m.chat, { text: `❌ El personaje *${text.trim()}* no está en la tienda.` }, { quoted: m });
        return;
    }

    const userData = global.db.data.users[m.sender];
    const personaje = global.shopData[personajeKey];
    
    if (userData.diamantes < personaje.precio) {
        await conn.sendMessage(m.chat, { text: `❌ No tienes suficientes diamantes para comprar *${personajeKey}*.` }, { quoted: m });
        return;
    }

    // Transfiere el dinero al vendedor
    const vendedorData = global.db.data.users[personaje.vendedor];
    if (!vendedorData) {
        await conn.sendMessage(m.chat, { text: `❌ El vendedor ya no existe.` }, { quoted: m });
        return;
    }

    userData.diamantes -= personaje.precio;
    vendedorData.diamantes += personaje.precio;

    // Añade el personaje a la Pokédex del comprador
    if (!userData.personajes) {
        userData.personajes = [];
    }
    userData.personajes.push(personajeKey);

    // Elimina el personaje de la tienda
    delete global.shopData[personajeKey];

    await conn.sendMessage(m.chat, { text: `🎉 Has comprado *${personajeKey}* por ${personaje.precio} diamantes. ¡Felicidades!` }, { quoted: m });
};

// Configuración del comando
handlerComprar.command = /^comprar$/i;
handlerComprar.owner = false; // Puede ser usado por cualquier usuario

export default handlerComprar;
