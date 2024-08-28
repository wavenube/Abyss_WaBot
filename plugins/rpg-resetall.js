// Importar datos de personajes
import { personajes } from './personajes.js';

// Definir el comando de restablecimiento
const handlerResetAll = async (m, { conn }) => {
    // Verifica si el usuario es el propietario del bot
    if (m.sender !== 'owner@s.whatsapp.net') {
        await conn.sendMessage(m.chat, { text: `❌ Solo el propietario del bot puede usar este comando.` }, { quoted: m });
        return;
    }

    // Restablecer todas las Pokédex de los usuarios
    for (let userId in global.db.data.users) {
        const userData = global.db.data.users[userId];
        userData.personajes = []; // Vaciar la Pokédex del usuario
        userData.asegurados = {}; // Vaciar los personajes asegurados del usuario
    }

    // Restablecer la tienda
    global.tiendaData = {
        personajes: [],
    };

    // Restablecer la puja
    global.pujaData = {
        personajes: [],
        finPuja: null,
        pujadores: {},
    };

    // Restaurar los precios originales de los personajes
    personajes.forEach(p => {
        p.valor = p.valorOriginal || p.valor; // Asegúrate de que los precios originales estén en los datos de personajes
    });

    // Enviar mensaje de éxito
    await conn.sendMessage(m.chat, { text: `🔄 *¡Restablecimiento Completo!*\n\nTodas las Pokédex y la tienda han sido vaciadas. Todos los personajes están disponibles nuevamente con sus precios originales.` }, { quoted: m });
};

// Configuración del comando
handler.command = /^resetall$/i;
handler.rowner = true;
handler.fail = null;

export default handler;
