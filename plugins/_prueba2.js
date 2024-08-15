import { Hentai, Format, Utils } from 'hentai';  // Importa las funciones necesarias

const handler = async (m, { conn, usedPrefix, command }) => {
    try {
        // Obtener un ID de doujin al azar
        const random_id = Utils.get_random_id();

        // Crear una instancia del doujin utilizando el ID
        const doujin = new Hentai(random_id);

        // Verificar si el doujin existe
        if (!Hentai.exists(doujin.id)) {
            return m.reply('No se encontró ningún contenido con ese ID.');
        }

        // Obtener las URLs de las imágenes
        const imageUrls = doujin.image_urls;

        // Enviar la primera imagen al chat
        if (imageUrls.length > 0) {
            await conn.sendFile(m.chat, imageUrls[0], `${doujin.title(Format.Pretty)}.jpg`, null, m);
        } else {
            return m.reply('No se encontraron imágenes en este doujin.');
        }
    } catch (error) {
        console.error(error);
        return m.reply('Ocurrió un error al intentar obtener el contenido.');
    }
};

// Registro del comando
handler.command = /^(animevid2)$/i;  // Configura el comando para que responda a "animevid"

// Exporta el handler para que sea reconocido como un comando
export default handler;
