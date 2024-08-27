import { createHash } from 'crypto';
import fetch from 'node-fetch';

const handlerRW = async (m, { conn, usedPrefix }) => {
    // Selecciona un personaje aleatorio
    const personaje = personajes[Math.floor(Math.random() * personajes.length)];
    
    // Muestra la información del personaje
    const str = `
🖼️ **Imagen**: ${personaje.imagen}
🎯 **Título**: ${personaje.titulo}
📝 **Descripción**: ${personaje.descripcion}
    `.trim();
    
    const { key } = await conn.sendMessage(m.chat, { image: { url: personaje.imagen }, caption: str }, { quoted: m });
    
    // Espera 15 segundos para que el usuario reclame el personaje
    const timer = setTimeout(async () => {
        if (global.db.data.users[m.sender].personajeReclamado === personaje.nombre) {
            await conn.sendMessage(m.chat, `🎉 ¡Has reclamado a ${personaje.nombre}!`, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, `⏳ El tiempo ha expirado para reclamar a ${personaje.nombre}.`, { quoted: m });
        }
    }, 15000);
    
    // Maneja el reclamo del personaje
    conn.on('chat-update', chatUpdate => {
        if (chatUpdate.messages && chatUpdate.messages.all().length) {
            const message = chatUpdate.messages.all()[0];
            if (message.text && message.text.toLowerCase() === `${usedPrefix}reclamar ${personaje.nombre}`) {
                if (!global.db.data.users[m.sender].personajeReclamado) {
                    global.db.data.users[m.sender].personajeReclamado = personaje.nombre;
                    clearTimeout(timer);
                    conn.sendMessage(m.chat, `🎉 ¡Has reclamado a ${personaje.nombre}!`, { quoted: m });
                } else {
                    conn.sendMessage(m.chat, `❌ Ya has reclamado un personaje.`, { quoted: m });
                }
            }
        }
    });
};

handlerRW.command = /^rw$/i;
handlerRW.owner = false; // Puede ser usado por cualquier usuario
export default handlerRW;
