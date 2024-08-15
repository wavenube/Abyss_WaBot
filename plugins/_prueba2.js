import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el directorio actual cuando se usa ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (m, { conn }) => {
    const videosDir = path.join(__dirname, 'src', 'videos');

    try {
        // Leer los archivos en la carpeta de videos
        const files = fs.readdirSync(videosDir);

        // Filtrar solo los archivos de video (por extensión)
        const videoFiles = files.filter(file => file.endsWith('.mp4') || file.endsWith('.mkv') || file.endsWith('.avi'));

        if (videoFiles.length === 0) {
            return m.reply('No hay videos disponibles en la carpeta.');
        }

        // Seleccionar un video aleatorio
        const randomVideo = videoFiles[Math.floor(Math.random() * videoFiles.length)];
        const videoPath = path.join(videosDir, randomVideo);

        // Enviar el video aleatorio
        await conn.sendMessage(m.chat, { video: fs.readFileSync(videoPath) }, { quoted: m });

    } catch (error) {
        console.error('Error al enviar el video:', error);
        m.reply('Ocurrió un error al intentar enviar el video.');
    }
};

handler.command = /^(hentaivid|sendvideo)$/i; // Puedes ajustar el comando según lo necesites

export default handler;
