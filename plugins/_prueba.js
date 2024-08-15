import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { Buffer } from 'buffer';

const VIDEO_FOLDER_PATH = './src/videos';

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
const handler = async (m, { conn, args }) => {
    try {
        // Verificar si el usuario proporcionó un enlace
        if (!args[0]) {
            return m.reply('⚠️ Por favor, proporciona un enlace directo al video.');
        }

        const videoUrl = args[0];
        const tempFilePath = path.join(VIDEO_FOLDER_PATH, 'temp_video.mp4');

        // Descargar el video
        await downloadFile(videoUrl, tempFilePath);

        // Enviar el archivo
        await conn.sendMessage(m.chat, { video: fs.readFileSync(tempFilePath) }, { quoted: m });

        // Eliminar el archivo temporal
        fs.unlinkSync(tempFilePath);

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
