import axios from 'axios';

// Almacenar personajes en memoria temporal (por simplicidad)
let charactersDB = {};
let usersCharacters = {};

// Comando para obtener un personaje aleatorio
const handler = async (m, { conn }) => {
    try {
        // Llamada a la API para obtener un personaje de anime aleatorio (utilizaremos MyAnimeList API)
        const response = await axios.get('https://api.jikan.moe/v4/characters/random');
        const character = response.data.data;

        const characterInfo = {
            name: character.name,
            image: character.images.jpg.image_url,
            description: character.about,
            userId: m.sender,
            claimed: false
        };

        // Guardar el personaje en la memoria temporal
        charactersDB[m.chat] = characterInfo;

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
                delete charactersDB[m.chat];
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
