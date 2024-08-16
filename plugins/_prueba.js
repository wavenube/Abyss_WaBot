import axios from 'axios';

// Comando del bot
const handler = async (m, { conn, text }) => {
    try {
        // Verificar si se ha proporcionado un texto para generar la imagen
        if (!text) return m.reply('Por favor, proporciona una descripción de la imagen que quieres generar. Ejemplo: .generar ramo de flores');

        // URL de la API de OpenAI para generación de imágenes
        const url = 'https://api.openai.com/v1/images/generations';

        // Petición a la API de OpenAI
        const response = await axios.post(url, {
            prompt: text,
            n: 1, // Número de imágenes a generar
            size: '512x512' // Tamaño de la imagen
        }, {
            headers: {
                'Authorization': `sk-Q6y-twU6iY83mjn2irR4kUmVdKSxrAL2R0L5-JnR-tT3BlbkFJGIxjv4YbEOw5FVBfOcPCei4CfkJAM6yj7YfCrav1UA`,  // Reemplaza con tu API Key de OpenAI
                'Content-Type': 'application/json'
            }
        });

        // URL de la imagen generada
        const imageUrl = response.data.data[0].url;

        // Enviar la imagen generada
        await conn.sendMessage(
            m.chat,
            {
                image: { url: imageUrl },
                caption: `Imagen generada para: "${text.trim()}"`,
                mentions: [m.sender]  // Menciona al usuario que usó el comando
            },
            { quoted: m }  // Responde al mensaje original si es necesario
        );

    } catch (error) {
        console.error('Error al generar la imagen:', error);
        m.reply(`Ocurrió un error al intentar generar la imagen: ${error.message}`);
    }
};

// Definir el comando y sus propiedades
handler.command = /^(prueba4|generate)$/i; // Comando para activar el manejador
handler.group = false; // Si el comando debe funcionar solo en grupos
handler.admin = false; // Cambiar a true si solo administradores pueden usarlo
handler.botAdmin = false; // Cambiar a true si el bot debe ser admin para usar el comando

export default handler;
