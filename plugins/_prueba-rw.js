const axios = require('axios');
const fs = require('fs');

// Lista de personajes con URL de imágenes, títulos y descripciones
const personajes = [
    { name: 'Sasuke', imageUrl: 'https://example.com/sasuke.jpg', title: 'Sasuke Uchiha', description: 'Un ninja prodigioso.' },
    { name: 'Naruto', imageUrl: 'https://example.com/naruto.jpg', title: 'Naruto Uzumaki', description: 'El ninja más valiente.' },
    // Añade más personajes según sea necesario
];

// Función para obtener un personaje aleatorio
const getRandomCharacter = () => {
    const randomIndex = Math.floor(Math.random() * personajes.length);
    return personajes[randomIndex];
};

// Comando .rw
const handlerRW = async (m, { conn }) => {
    const character = getRandomCharacter();

    try {
        // Intentar obtener la imagen del personaje
        const imageResponse = await axios.get(character.imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        
        // Construir el mensaje con la información del personaje
        const messageText = `
> 𝌡 PERSONAJE
* Nombre: ${character.title}
* Descripción: ${character.description}
`;

        // Enviar la imagen y el texto
        await conn.sendMessage(m.chat, { image: imageBuffer, caption: messageText }, { quoted: m });

        // Añadir lógica para gestionar la reclamación del personaje
        // (aquí se podría usar un temporizador para permitir que el usuario reclame el personaje)
    } catch (error) {
        console.error('Error al obtener o enviar la imagen del personaje:', error);
        conn.reply(m.chat, 'Hubo un error al obtener la imagen del personaje. Intenta de nuevo más tarde.', m);
    }
};

handlerRW.command = /^rw$/i;
handlerRW.help = ['rw'];
handlerRW.tags = ['games'];
export default handlerRW;
