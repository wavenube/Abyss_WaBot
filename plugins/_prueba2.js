import axios from 'axios';
import fs from 'fs';
import path from 'path';

const handler = async (m, { conn }) => {
    const videoUrl = 'https://www.eporner.com/video-h9q5ATLjugN/stepsister-play-with-dick-between-tits-uncensored-hentai/';
    const filePath = path.join(__dirname, 'video.mp4');

    try {
        // Descargar el video
        const response = await axios({
            url: videoUrl,
            method: 'GET',
            responseType: 'stream',
        });

        // Guardar el video temporalmente en el servidor
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        // Esperar a que se complete la descarga
        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        // Enviar el video a través de WhatsApp
        await conn.sendMessage(m.chat, { video: fs.readFileSync(filePath) }, { quoted: m });

        // Eliminar el archivo descargado después de enviarlo
        fs.unlinkSync(filePath);
    } catch (error) {
        console.error('Error al descargar o enviar el video:', error);
        m.reply('Ocurrió un error al intentar descargar o enviar el video.');
    }
};

handler.command = /^(animevid|sendvideo)$/i; // Puedes ajustar el comando según lo necesites

export default handler;
