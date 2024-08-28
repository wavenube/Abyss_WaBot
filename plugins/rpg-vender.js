const handlerVender = async (m, { conn, text }) => {
    const [nombrePersonaje, precio] = text.split(' ');

    if (!nombrePersonaje || isNaN(precio) || parseInt(precio) <= 0) {
        await conn.sendMessage(m.chat, { text: `❌ Usa el comando de la siguiente manera: .vender <nombre del personaje> <precio>` }, { quoted: m });
        return;
    }

    const userData = global.db.data.users[m.sender];
    
    if (!userData.personajes || !userData.personajes.includes(nombrePersonaje)) {
        await conn.sendMessage(m.chat, { text: `❌ No tienes el personaje *${nombrePersonaje}* en tu Pokédex.` }, { quoted: m });
        return;
    }

    // Asegura que el precio sea un número entero
    const precioDiamantes = parseInt(precio);

    // Añade el personaje a la tienda
    if (!global.shopData) {
        global.shopData = {};
    }
    global.shopData[nombrePersonaje] = {
        precio: precioDiamantes,
        vendedor: m.sender
    };

    // Remueve el personaje de la Pokédex del usuario
    userData.personajes = userData.personajes.filter(p => p !== nombrePersonaje);

    await conn.sendMessage(m.chat, { text: `💰 *${nombrePersonaje}* ha sido puesto en venta por ${precioDiamantes} diamantes.` }, { quoted: m });
};

// Configuración del comando
handlerVender.command = /^vender$/i;
handlerVender.owner = false; // Puede ser usado por cualquier usuario

export default handlerVender;
