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
    const nombrePersonaje = partes.join(' ');

    const userData = global.db.data.users[m.sender];
    
    // Verifica si el personaje está en la Pokédex del usuario
    if (!userData.personajes || !userData.personajes.includes(nombrePersonaje)) {
        await conn.sendMessage(m.chat, { text: `❌ No tienes el personaje *${nombrePersonaje}* en tu Pokédex.` }, { quoted: m });
        return;
    }

    // Añade el personaje a la tienda
    if (!global.shopData) {
        global.shopData = {};
    }
    global.shopData[nombrePersonaje] = {
        precio: parseInt(precio),
        vendedor: m.sender
    };

    // Remueve el personaje de la Pokédex del usuario
    userData.personajes = userData.personajes.filter(p => p !== nombrePersonaje);

    await conn.sendMessage(m.chat, { text: `💰 *${nombrePersonaje}* ha sido puesto en venta por ${precio} diamantes.` }, { quoted: m });
};

// Configuración del comando
handlerVender.command = /^vender$/i;
handlerVender.owner = false; // Puede ser usado por cualquier usuario

export default handlerVender;
