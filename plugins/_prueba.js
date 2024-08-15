import axios from 'axios';
import fs from 'fs';
import path from 'path';

// URL del video que se enviará
const VIDEO_URL = 'https://qu.ax/scZw.mp4';
const TEMP_FILE_PATH = path.join(__dirname, 'temp_video.mp4'); // Cambia __dirname si es necesario

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
        // Descargar el video
        await downloadFile(VIDEO_URL, TEMP_FILE_PATH);

        // Enviar el archivo
        await conn.sendMessage(m.chat, { video: fs.readFileSync(TEMP_FILE_PATH) }, { quoted: m });

        // Eliminar el archivo temporal
        fs.unlinkSync(TEMP_FILE_PATH);

    } catch (error) {
        console.error('Error al enviar el video:', error);
        m.reply(`Ocurrió un error al intentar enviar el video: ${error.message}`);
    }
};

handler.command = /^(prueba|video)$/i;
handler.group = true; // Si el comando debe funcionar solo en grupos
handler.admin = false; // Cambiar a true si solo administradores pueden usarlo
handler.botAdmin = false; // Cambiar a true si el bot debe ser admin para usar el comando

export default handler;
