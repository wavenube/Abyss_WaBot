import axios from 'axios';

// Comando del bot
const handler = async (m, { conn, text }) => {
    try {
        // Verificar si se ha proporcionado un texto para generar la imagen
        if (!text) return m.reply('Por favor, proporciona una descripción de la imagen que quieres generar. Ejemplo: .generar ramo de flores');

        // URL de la API de DeepAI
        const url = 'https://api.deepai.org/api/text2img';

        // Petición a la API de DeepAI
        const response = await axios.post(url, {
            text: text
        }, {
            headers: {
                'Api-Key': 'c3f91ad7-d977-4648-aafd-fa4acd5c630b'  // Reemplaza con tu clave API de DeepAI
            }
        });

        // URL de la imagen generada
        const imageUrl = response.data.output_url;

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
handler.command = /^(prueba3|generate)$/i; // Comando para activar el manejador
handler.group = false; // Si el comando debe funcionar solo en grupos
handler.admin = false; // Cambiar a true si solo administradores pueden usarlo
handler.botAdmin = false; // Cambiar a true si el bot debe ser admin para usar el comando

export default handler;
