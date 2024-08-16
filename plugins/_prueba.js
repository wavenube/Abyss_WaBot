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

        // Opciones de mensaje para cada imagen
        const mediaMessages = images.map((image, index) => ({
            type: 'imageMessage',
            image: { url: image },
            caption: `Imagen ${index + 1}`,
            footer: 'Desliza para ver más',
        }));

        // Enviar las imágenes en un solo mensaje
        for (let mediaMessage of mediaMessages) {
            await conn.sendMessage(
                m.chat,
                {
                    image: mediaMessage.image,
                    caption: mediaMessage.caption,
                    mentions: [m.sender],
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
