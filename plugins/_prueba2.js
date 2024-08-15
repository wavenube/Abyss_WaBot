import { hentai } from 'hentai';
import fs from 'fs';
import { promisify } from 'util';

const handler = async (m, { conn, usedPrefix, command }) => {
    try {
        // Obtén un ID de doujin al azar
        const random_id = hentai.Utils.get_random_id();

        // Obtén el doujin utilizando el ID
        const doujin = new hentai.Hentai(random_id);

        // Verifica si existe
        if (!hentai.Hentai.exists(doujin.id)) {
            return m.reply('No se encontró ningún contenido con ese ID.');
        }

        // Obtener las URLs de las imágenes
        const imageUrls = doujin.image_urls;

        // Enviar las imágenes al chat
        for (let url of imageUrls) {
            // Descargar la imagen
            const response = await fetch(url);
            const buffer = await response.buffer();

            // Guardar la imagen temporalmente
            const fileName = `./temp/${doujin.id}_${imageUrls.indexOf(url)}.jpg`;
            await promisify(fs.writeFile)(fileName, buffer);

            // Enviar la imagen
            await conn.sendFile(m.chat, fileName, `${doujin.title(Format.Pretty)}.jpg`, null, m);

            // Eliminar la imagen temporalmente guardada
            await promisify(fs.unlink)(fileName);
        }
    } catch (error) {
        console.error(error);
        return m.reply('Ocurrió un error al intentar obtener el contenido.');
    }
};

handler.command = /^(animevid2)$/i;

export default handler;
