import { createHash } from 'crypto';

const personajes = [
    {
        nombre: "Naruto Uzumaki",
        imagen: "https://www.layleegirl.com/wp-content/uploads/2020/08/Naruto.jpg",
        titulo: "El Séptimo Hokage",
        descripcion: "Un ninja con un gran corazón y una determinación inquebrantable."
    },
    {
        nombre: "Sasuke Uchiha",
        imagen: "https://www.layleegirl.com/wp-content/uploads/2020/08/Sasuke.jpg",
        titulo: "El Último Uchiha",
        descripcion: "Un prodigio del clan Uchiha con un pasado sombrío."
    },
    // Agrega más personajes aquí
];

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
        // Verifica si el usuario ha reclamado el personaje
        const usuario = global.db.data.users[m.sender] || { personajeReclamado: null };
        if (usuario.personajeReclamado === personaje.nombre) {
            await conn.sendMessage(m.chat, `🎉 ¡Has reclamado a ${personaje.nombre}!`, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, `⏳ El tiempo ha expirado para reclamar a ${personaje.nombre}.`, { quoted: m });
        }
    }, 15000);
    
    // Maneja el reclamo del personaje
    conn.sendMessage(m.chat, `⏳ Tienes 15 segundos para reclamar a ${personaje.nombre} con el comando: ${usedPrefix}reclamar ${personaje.nombre}`, { quoted: m });

    // Escucha los mensajes entrantes
    const handleMessage = async (msg) => {
        if (msg.text && msg.text.toLowerCase() === `${usedPrefix}reclamar ${personaje.nombre}` && msg.sender === m.sender) {
            // Verifica si el personaje ya ha sido reclamado
            const usuario = global.db.data.users[m.sender] || { personajeReclamado: null };
            if (!usuario.personajeReclamado) {
                global.db.data.users[m.sender].personajeReclamado = personaje.nombre;
                clearTimeout(timer);
                await conn.sendMessage(m.chat, `🎉 ¡Has reclamado a ${personaje.nombre}!`, { quoted: m });
            } else {
                await conn.sendMessage(m.chat, `❌ Ya has reclamado un personaje.`, { quoted: m });
            }
        }
    };

    // Escucha los mensajes en el chat
    conn.on('chat-update', chatUpdate => {
        if (chatUpdate.messages && chatUpdate.messages.all().length) {
            const messages = chatUpdate.messages.all();
            messages.forEach(handleMessage);
        }
    });
};

handlerRW.command = /^rw$/i;
handlerRW.owner = false; // Puede ser usado por cualquier usuario
export default handlerRW;
