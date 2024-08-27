import { createHash } from 'crypto';

const personajes = [
    {
        nombre: "Naruto Uzumaki",
        imagen: "https://th.bing.com/th/id/R.d536e2ce81f57260a1b086b8eb72cfed?rik=M%2b4DWVkBbtGdHA&pid=ImgRaw&r=0",
        titulo: "El Séptimo Hokage",
        descripcion: "Un ninja con un gran corazón y una determinación inquebrantable."
    },
    {
        nombre: "Sasuke Uchiha",
        imagen: "https://th.bing.com/th/id/OIP.yY8XGyS5FU5VyJuc-4eDaAHaFj?rs=1&pid=ImgDetMain",
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

    // Envia el mensaje con la información del personaje
    const { key } = await conn.sendMessage(m.chat, { image: { url: personaje.imagen }, caption: str }, { quoted: m });

    // Añade el temporizador para la reclamación
    const timer = setTimeout(async () => {
        if (global.db.data.users[m.sender].personajeReclamado === personaje.nombre) {
            await conn.sendMessage(m.chat, `🎉 ¡Has reclamado a ${personaje.nombre}!`, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, `⏳ El tiempo ha expirado para reclamar a ${personaje.nombre}.`, { quoted: m });
        }
    }, 15000);

    // Manejador de mensajes para la reclamación del personaje
    conn.on('message-new', async (message) => {
        if (!message || !message.text) return;
        const texto = message.text.toLowerCase();
        const reclamacion = `${usedPrefix}reclamar ${personaje.nombre}`.toLowerCase();

        if (texto === reclamacion && message.sender === m.sender) {
            if (!global.db.data.users[m.sender].personajeReclamado) {
                global.db.data.users[m.sender].personajeReclamado = personaje.nombre;
                clearTimeout(timer);
                await conn.sendMessage(m.chat, `🎉 ¡Has reclamado a ${personaje.nombre}!`, { quoted: m });
            } else {
                await conn.sendMessage(m.chat, `❌ Ya has reclamado un personaje.`, { quoted: m });
            }
        }
    });
};

handlerRW.command = /^rw$/i;
handlerRW.owner = false; // Puede ser usado por cualquier usuario
export default handlerRW;
