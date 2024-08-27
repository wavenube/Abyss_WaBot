const handlerInstallBot = async (m, { conn }) => {
    const installMessage = `
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

    `;

    // Enviar el mensaje con las instrucciones de instalación
    await conn.sendMessage(m.chat, { text: installMessage }, { quoted: m });
};

// Configuración del comando
handlerInstallBot.command = /^instalarbot$/i;
handlerInstallBot.owner = false; // Cualquier usuario puede usar este comando
export default handlerInstallBot;
