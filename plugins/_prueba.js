// Comando del bot para enviar un catálogo de imágenes
const handler = async (m, { conn }) => {
    try {
        // Rutas de las imágenes
        const images = [
            './src/abyss.png',  // Cambia estos nombres por las imágenes que tú tengas
            './src/abyss2.png',
            './src/abyss3.png',
            './src/abyss4.png',
        ];

        // Enviar todas las imágenes en un solo mensaje
        const mediaMessage = images.map(image => ({
            image: { url: image },
            caption: 'Aquí tienes una imagen',
        }));

        await conn.sendMessage(
            m.chat,
            {
                image: mediaMessage[0].image,
                caption: 'Imagen 1',
                mentions: [m.sender],
                mediaMessage,
            },
            { quoted: m }
        );

        for (let i = 1; i < mediaMessage.length; i++) {
            await conn.sendMessage(
                m.chat,
                {
                    image: mediaMessage[i].image,
                    caption: `Imagen ${i + 1}`,
                    mentions: [m.sender],
                    mediaMessage: mediaMessage.slice(i, i + 1),
                },
                { quoted: m }
            );
        }
    } catch (error) {
        console.error('Error al enviar las imágenes:', error);
        m.reply(`Ocurrió un error al intentar enviar las imágenes: ${error.message}`);
    }
};

// Definir el comando y sus propiedades
handler.command = /^(catalogo|catalog)$/i; // Comando para activar el manejador
handler.group = false; // Si el comando debe funcionar solo en grupos
handler.admin = false; // Cambiar a true si solo administradores pueden usarlo
handler.botAdmin = false; // Cambiar a true si el bot debe ser admin para usar el comando

export default handler;

