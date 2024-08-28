// Importar datos de personajes
import { personajes } from './personajes.js';

// Definir el comando de restablecimiento
const handlerResetAll = async (m, { conn, isOwner }) => {
    // Verifica si el usuario es el propietario del bot
    if (!isOwner) {
        await conn.sendMessage(m.chat, { text: `❌ Solo el propietario del bot puede usar este comando.` }, { quoted: m });
        return;
    }

    // Restablecer todas las Pokédex de los usuarios
    for (let userId in global.db.data.users) {
        const userData = global.db.data.users[userId];
        userData.personajes = []; // Vaciar la Pokédex del usuario
        userData.asegurados = {}; // Vaciar los personajes asegurados del usuario
    }

    // Vaciar la tienda de personajes en venta (shopData)
    global.shopData = {};

    // Vaciar la tienda de pujas
    global.pujaData = {
        personajes: [],
        finPuja: null,
        pujadores: {},
    };

    // Restablecer todos los personajes a su estado "libre" y su valor original
    personajes.forEach(p => {
        p.estado = "libre";  // Poner el estado en "libre"
        p.valor = p.valorOriginal || p.valor;  // Restaurar el valor original si está disponible
    });

    // Enviar mensaje de éxito
    await conn.sendMessage(m.chat, { text: `🔄 *¡Restablecimiento Completo!*\n\nTodas las Pokédex, la tienda, y la tienda de personajes han sido vaciadas. Todos los personajes están disponibles nuevamente con su estado original.` }, { quoted: m });
};

// Configuración del comando
handlerResetAll.command = /^resetall$/i;
handlerResetAll.owner = true; // Solo puede ser usado por el propietario del bot

export default handlerResetAll;
