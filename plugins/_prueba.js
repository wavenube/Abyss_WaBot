import axios from 'axios';

const handler = async (m, { conn }) => {
    try {
        // URL del archivo JSON en GitHub
        const res = await axios.get('https://raw.githubusercontent.com/wavenube/Abyss_WaBot/master/plugins/_personajes.json');
        const personajes = res.data;

        // Seleccionar un personaje aleatorio
        const personaje = personajes[Math.floor(Math.random() * personajes.length)];

        const characterInfo = {
            name: personaje.name || 'Personaje Desconocido',
            image: personaje.url || 'https://www.nme.com/wp-content/uploads/2020/10/Akira_Anime.jpg',  // URL de la imagen del personaje
            description: personaje.description || 'Descripción no disponible.',
            userId: m.sender,
            claimed: false
        };

        // Almacenar el personaje en una variable temporal
        conn.characterDB = conn.characterDB || {};
        conn.characterDB[m.chat] = characterInfo;

        // Enviar el personaje al usuario
        await conn.sendMessage(
            m.chat,
            {
                image: { url: characterInfo.image },
                caption: `🧍‍♂️ *${characterInfo.name}*\n\n${characterInfo.description}\n\nResponde a este mensaje con *claimcharacter* en 15 segundos para capturarlo!`,
                mentions: [m.sender]
            },
            { quoted: m }
        );

        // Establecer un temporizador de 15 segundos para capturar al personaje
        setTimeout(() => {
            if (!characterInfo.claimed) {
                delete conn.characterDB[m.chat];
                m.reply(`⏳ El tiempo para capturar a ${characterInfo.name} ha expirado.`);
            }
        }, 15000);

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
