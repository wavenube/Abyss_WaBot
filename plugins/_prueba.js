import axios from 'axios';

const handler = async (m, { conn }) => {
    try {
        // URL del archivo personajes.json en GitHub
        const response = await axios.get('https://raw.githubusercontent.com/wavenube/Abyss_WaBot/master/plugins/_personajes.json');
        const personajes = response.data;

        // Verificar que la respuesta sea un array
        if (!Array.isArray(personajes)) {
            m.reply('El formato del archivo personajes.json es incorrecto.');
            return;
        }

        // Seleccionar un personaje aleatorio del JSON
        const personaje = personajes[Math.floor(Math.random() * personajes.length)];

        // Verificar que el personaje tenga las propiedades necesarias
        if (!personaje.name || !personaje.url || !personaje.description) {
            m.reply('El personaje seleccionado no tiene la información completa.');
            return;
        }

        // Enviar el personaje al usuario
        await conn.sendMessage(
            m.chat,
            {
                image: { url: personaje.url },
                caption: `🧍‍♂️ *${personaje.name}*\n\n${personaje.description}`,
                mentions: [m.sender]
            },
            { quoted: m }
        );

    } catch (error) {
        console.error('Error al obtener el personaje:', error);
        m.reply(`Ocurrió un error al intentar obtener un personaje: ${error.message}`);
    }
};

// Definir el comando y sus propiedades
handler.command = /^(rw|randomwaifu)$/i;
handler.group = false;
handler.admin = false;
handler.botAdmin = false;

export default handler;
