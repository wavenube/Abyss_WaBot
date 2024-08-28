const handlerTienda = async (m, { conn }) => {
    if (!global.shopData || Object.keys(global.shopData).length === 0) {
        await conn.sendMessage(m.chat, { text: `🛒 La tienda está vacía en este momento.` }, { quoted: m });
        return;
    }

    let mensaje = `🛒 *Tienda de Personajes*\n\n`;

    for (const [nombre, { precio, vendedor }] of Object.entries(global.shopData)) {
        mensaje += `🔹 *${nombre}*\n💎 Precio: ${precio} diamantes\n👤 Vendedor: @${vendedor.split('@')[0]}\n\n`;
    }

    await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
};

// Configuración del comando
handlerTienda.command = /^tienda$/i;
handlerTienda.owner = false; // Puede ser usado por cualquier usuario

export default handlerTienda;
