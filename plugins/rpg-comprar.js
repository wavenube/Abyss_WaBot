const handlerComprar = async (m, { conn, text }) => {
    const nombrePersonaje = text.trim();

    if (!nombrePersonaje || !global.shopData || !global.shopData[nombrePersonaje]) {
        await conn.sendMessage(m.chat, { text: `❌ El personaje *${nombrePersonaje}* no está en la tienda.` }, { quoted: m });
        return;
    }

    const userData = global.db.data.users[m.sender];
    const personaje = global.shopData[nombrePersonaje];
    
    if (userData.diamantes < personaje.precio) {
        await conn.sendMessage(m.chat, { text: `❌ No tienes suficientes diamantes para comprar *${nombrePersonaje}*.` }, { quoted: m });
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
    userData.personajes.push(nombrePersonaje);

    // Elimina el personaje de la tienda
    delete global.shopData[nombrePersonaje];

    await conn.sendMessage(m.chat, { text: `🎉 Has comprado *${nombrePersonaje}* por ${personaje.precio} diamantes. ¡Felicidades!` }, { quoted: m });
};

// Configuración del comando
handlerComprar.command = /^comprar$/i;
handlerComprar.owner = false; // Puede ser usado por cualquier usuario

export default handlerComprar;
