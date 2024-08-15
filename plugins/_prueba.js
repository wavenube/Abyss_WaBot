import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Lista de URLs de videos
const VIDEO_URLS = [
    'https://qu.ax/scZw.mp4',
    'https://example.com/video2.mp4',  // Añade aquí más URLs de videos
    'https://example.com/video3.mp4',
    // Agrega más enlaces según sea necesario
];

const TEMP_FILE_PATH = path.join(__dirname, 'temp_video.mp4');

// Función para descargar el archivo
const downloadFile = async (url, filePath) => {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
};

// Comando del bot
const handler = async (m, { conn }) => {
    try {
        // Elegir un video aleatorio de la lista
        const randomIndex = Math.floor(Math.random() * VIDEO_URLS.length);
        const randomVideoUrl = VIDEO_URLS[randomIndex];

        // Descargar el video
        await downloadFile(randomVideoUrl, TEMP_FILE_PATH);

        // Enviar el archivo
        await conn.sendMessage(m.chat, { video: fs.readFileSync(TEMP_FILE_PATH), caption: 'Aquí tienes un video aleatorio!' }, { quoted: m });

        // Eliminar el archivo temporal
        fs.unlinkSync(TEMP_FILE_PATH);

    } catch (error) {
        console.error('Error al enviar el video:', error);
        m.reply(`Ocurrió un error al intentar enviar el video: ${error.message}`);
    }
};

// Definir el comando y sus propiedades
handler.command = /^(prueba|video)$/i; // Comando para activar el manejador
handler.group = true; // Si el comando debe funcionar solo en grupos
handler.admin = false; // Cambiar a true si solo administradores pueden usarlo
handler.botAdmin = false; // Cambiar a true si el bot debe ser admin para usar el comando

export default handler;
