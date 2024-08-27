const handlerInstallBot = async (m, { conn }) => {
    const str = `
╭─────────────┈⊷
│ COMO INSTALAR ESTE BOT?
╰┬────────────┈⊷
┌┤📌 *REQUISITOS PARA LA INSTALACION*
┌┤❇️ _Dudas: wa.me/5492613619545_
┌┤❇️ 1 GB de almacenamiento
┌┤❇️ un WhatsApp (secundario)
┌┤❇️ un número virtual o real (otro número)
┌┤❇️ 2 dispositivos o una PC para escanear
╰────────────┈⊷

📌 *COMANDO DE INSTALACION*

\`#serbot\`

> (𝘌𝘴𝘤𝘢𝘯𝘦𝘢𝘳 𝘦𝘭 𝘘𝘙 o código, 𝘙𝘢𝘱𝘪𝘥𝘰)

🚀 --------[ Cafirexos host ]--------- 🚀

*Página oficial:*
https://www.cafirexos.com/

*Panel:*
https://panel.cafirexos.com/

*Dashboard:*
https://dash.cafirexos.com/home

*Dudas UNICAMENTE SOBRE EL HOST:*
https://chat.whatsapp.com/FBtyc8Q5w2iJXVl5zGJdFJ 
_(Pregunta por Diego: cafirexos)_

*Canal de WhatsApp:*
https://whatsapp.com/channel/0029VaFVSkRCMY0KFmCMDX2q
    `;

    const pp = './src/abyss.png'; // Ruta o URL de la imagen

    const messageOptions = {
        image: { url: pp },
        caption: str,
        mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net'),
        contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363318622514917@newsletter",
                serverMessageId: 1,
                newsletterName: "<Abyss - Bot>",
            },
            externalAdReply: {
                mediaUrl: "https://whatsapp.com/channel/0029VakDx9I0gcfFXnzZIX2v",
                mediaType: 'VIDEO',
                description: 'canal del grupo',
                title: 'wm', // Aquí puedes reemplazar con el texto que desees
                body: "By: ZephyrByte",
                thumbnailUrl: "https://i.ibb.co/Qjf1sdk/abyss-profile.png", // Puedes cambiar la URL de la miniatura
                sourceUrl: "https://whatsapp.com/channel/0029VakDx9I0gcfFXnzZIX2v"
            }
        }
    };

    // Enviar el mensaje decorado con las instrucciones de instalación
    await conn.sendMessage(m.chat, messageOptions, { quoted: m });
};

// Configuración del comando
handlerInstallBot.command = /^instalarbot$/i;
handlerInstallBot.owner = false; // Cualquier usuario puede usar este comando
export default handlerInstallBot;
