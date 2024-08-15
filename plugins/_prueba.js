// Lista de URLs de videos
const VIDEO_URLS = [
    'https://qu.ax/scZw.mp4',
    'https://example.com/video2.mp4',  // Añade aquí más URLs de videos
    'https://example.com/video3.mp4',
    // Agrega más enlaces según sea necesario
];

// Comando del bot
const handler = async (m, { conn }) => {
    try {
        // Elegir un video aleatorio de la lista
        const randomIndex = Math.floor(Math.random() * VIDEO_URLS.length);
        const randomVideoUrl = VIDEO_URLS[randomIndex];

        // Mensaje de respuesta
        const str = 'Aquí tienes un video aleatorio!';

        // Enviar el video
        await conn.sendMessage(
            m.chat,
            {
                video: { url: randomVideoUrl },
                gifPlayback: true,
                caption: str.trim(),
                mentions: [m.sender]  // Menciona al usuario que usó el comando
            },
            { quoted: m }  // Responde al mensaje original si es necesario
        );

    } catch (error) {
        console.error('Error al enviar el video:', error);
        m.reply(`Ocurrió un error al intentar enviar el video: ${error.message}`);
    }
};

// Definir el comando y sus propiedades
handler.command = /^(hentaivid)$/i; // Comando para activar el manejador
handler.group = true; // Si el comando debe funcionar solo en grupos
handler.admin = false; // Cambiar a true si solo administradores pueden usarlo
handler.botAdmin = false; // Cambiar a true si el bot debe ser admin para usar el comando

export default handler;
