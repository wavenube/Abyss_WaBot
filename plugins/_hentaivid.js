// Lista de URLs de videos
const VIDEO_URLS = [
    'https://qu.ax/scZw.mp4',
    'https://qu.ax/sKfw.mp4',
    'https://qu.ax/urcH.mp4',
    'https://qu.ax/PZCF.mp4',
    'https://qu.ax/rvnd.mp4',
    'https://qu.ax/rvnd.mp4',
    'https://qu.ax/OxHZ.mp4',
    'https://qu.ax/aUXT.mp4',
    'https://qu.ax/wbJN.mp4',
    'https://qu.ax/fJf.mp4',
    'https://qu.ax/bFdc.mp4',
    'https://qu.ax/vHNs.mp4',
    'https://qu.ax/uppk.mp4',
    'https://qu.ax/YnM.mp4',
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
handler.command = /^(hentaivid|hentai)$/i; // Comando para activar el manejador
handler.group = true; // Si el comando debe funcionar solo en grupos
handler.admin = false; // Cambiar a true si solo administradores pueden usarlo
handler.botAdmin = false; // Cambiar a true si el bot debe ser admin para usar el comando

export default handler;
