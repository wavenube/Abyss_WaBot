// Comando del bot para crear un evento
const handler = async (m, { conn, text }) => {
    try {
        // Verificar si se ha proporcionado un nombre para el evento
        if (!text) return m.reply('Por favor, proporciona un nombre para el evento. Ejemplo: .createvent Fiesta de cumpleaños');

        // Crear el mensaje de evento
        const eventName = text.trim();
        const eventDescription = "Únete a nuestro evento especial en WhatsApp!";
        const eventTime = "Fecha y hora: Viernes 20:00";

        const eventMessage = `🔔 *${eventName}*\n\n${eventDescription}\n\n${eventTime}`;

        // Enviar el mensaje del evento
        await conn.sendMessage(
            m.chat,
            {
                text: eventMessage,
                mentions: [m.sender]  // Menciona al usuario que creó el evento
            },
            { quoted: m }  // Responde al mensaje original si es necesario
        );

    } catch (error) {
        console.error('Error al crear el evento:', error);
        m.reply(`Ocurrió un error al intentar crear el evento: ${error.message}`);
    }
};

// Definir el comando y sus propiedades
handler.command = /^(createvent|crearevento|evento)$/i; // Comando para activar el manejador
handler.group = true; // Si el comando debe funcionar solo en grupos
handler.admin = true; // Solo administradores pueden usarlo
handler.botAdmin = false; // Cambiar a true si el bot debe ser admin para usar el comando

export default handler;
