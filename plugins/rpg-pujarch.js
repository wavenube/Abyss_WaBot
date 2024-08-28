import { personajes } from './personajes.js';

const pujaData = {
    personajes: [],
    finPuja: null
};

const handlerPuja = async (m, { conn }) => {
    const ahora = Date.now();

    // Si ya hay una puja en curso
    if (pujaData.finPuja && ahora < pujaData.finPuja) {
        await conn.sendMessage(m.chat, { text: `⏳ Ya hay una puja en curso. Finaliza en ${Math.ceil((pujaData.finPuja - ahora) / 60000)} minutos.` }, { quoted: m });
        return;
    }

    // Selecciona 3 personajes al azar
    pujaData.personajes = personajes.sort(() => 0.5 - Math.random()).slice(0, 3);
    pujaData.finPuja = ahora + 3600000; // 1 hora en milisegundos

    let mensaje = `🔔 *¡Puja Iniciada!*\n\n`;

    pujaData.personajes.forEach((p, index) => {
        mensaje += `🔸 *${p.nombre}*\n💎 Valor inicial: ${p.valor} diamantes\n\n`;
    });

    mensaje += `🕒 La puja finalizará en 1 hora. Usa .pujar <nombre del personaje> para pujar.`;

    await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
};

// Configuración del comando
handlerPuja.command = /^pujarch$/i;
handlerPuja.owner = false; // Puede ser usado por cualquier usuario
export default handlerPuja;
