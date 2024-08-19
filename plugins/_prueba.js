import axios from 'axios';

// Clave API proporcionada
const API_KEY = '28fe5b4bc34e8cdf9c199acf337ed07a';
const API_URL = 'http://apilayer.net/api/validate';

// Comando del bot
const handler = async (m, { conn, text }) => {
    try {
        // Verificar que se ha proporcionado un número de teléfono
        if (!text) return m.reply('Por favor, proporciona un número de teléfono para obtener la información. Ejemplo: .dox +1234567890');

        // Llamada a la API para obtener la información del número de teléfono
        const response = await axios.get(API_URL, {
            params: {
                access_key: API_KEY,
                number: text.trim(),
                format: 1
            }
        });

        const data = response.data;

        // Verificar si la API devolvió datos válidos
        if (data.valid) {
            // Crear mensaje con la información del número de teléfono
            const infoMessage = `
**Número de Teléfono:** ${text.trim()}
**Código de País:** ${data.country_code}
**Nombre del País:** ${data.country_name}
**Ubicación:** ${data.location}
**Compañía de Telefonía:** ${data.carrier}
**Tipo de Línea:** ${data.line_type}
            `;

            // Enviar el mensaje con la información
            await conn.sendMessage(
                m.chat,
                { text: infoMessage, mentions: [m.sender] }, // Mencionar al usuario que solicitó la información
                { quoted: m }  // Responder al mensaje original si es necesario
            );
        } else {
            m.reply('Número de teléfono inválido o sin datos disponibles.');
        }

    } catch (error) {
        console.error('Error al obtener la información del número de teléfono:', error);
        m.reply(`Ocurrió un error al intentar obtener la información: ${error.message}`);
    }
};

// Definir el comando y sus propiedades
handler.command = /^(prueba)$/i; // Comando para activar el manejador
handler.group = false; // Si el comando debe funcionar solo en grupos
handler.admin = false; // Cambiar a true si solo administradores pueden usarlo
handler.botAdmin = false; // Cambiar a true si el bot debe ser admin para usar el comando

export default handler;
