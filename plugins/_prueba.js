let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    // Mensaje principal
    let mainMessage = 'Selecciona el menú que deseas obtener:';

    // Opciones del menú desplegable
    let listSections = [
        {
            title: "IMÁGENES DIVERTIDAS",
            rows: [
                {
                    title: "WAIFU",
                    description: "Muestra una imagen de waifu (ⓓ).",
                    id: `${usedPrefix}waifu`
                },
                {
                    title: "NEKO",
                    description: "Muestra una imagen de neko (ⓓ).",
                    id: `${usedPrefix}neko`
                },
                {
                    title: "MEGUMIN",
                    description: "Muestra una imagen de Megumin (ⓓ).",
                    id: `${usedPrefix}megumin`
                },
                {
                    title: "LOLI",
                    description: "Muestra una imagen de loli (ⓓ).",
                    id: `${usedPrefix}loli`
                }
            ]
        }
    ];

    // Enviar el menú desplegable
    await conn.sendList(m.chat, '  ≡ *Menú Desplegable*', `\n ${mainMessage}`, 'Selecciona una opción', null, listSections, m);
};

handler.help = ['menuimagenes']
handler.tags = ['fun']
handler.command = ['menuimagenes', 'animemenu']

export default handler;
