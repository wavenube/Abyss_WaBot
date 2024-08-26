import fs from 'fs';

const handlerDecorateAndSend = async (m, { conn, text, usedPrefix, command }) => {
    // Define the number to which the message will be sent
    const targetNumber = '5492613619545@s.whatsapp.net'; // Cambia esto al número de destino

    // Language and translation setup
    const datas = global;
    const idioma = datas.db.data.users[m.sender].language;
    const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
    const tradutor = _translate.plugins.owner_reporte;

    // Check if text is provided
    if (!text) throw `${tradutor.texto1[0]}\n*${usedPrefix + command} ${tradutor.texto1[1]} ${usedPrefix}play ${tradutor.texto1[2]}`;
    
    // Ensure the message length is appropriate
    if (text.length < 10) throw tradutor.texto2;
    if (text.length > 1000) throw tradutor.texto3;

    // Decorate the message
    const decoratedMessage = `*Mensaje Decorado*\n\n${text}\n\n*─*`;
    
    // Send the decorated message to the target number
    try {
        // Send message to the target number with decoration
        await conn.sendMessage(targetNumber, { text: decoratedMessage, mentions: conn.parseMention(decoratedMessage) });
        // Notify the user that the message was sent
        m.reply(tradutor.texto5);
    } catch (e) {
        console.error(`Error al enviar mensaje a ${targetNumber}:`, e);
        m.reply('⚠️ Hubo un error al enviar el mensaje.', m);
    }
};

// Configuration of the command
handlerDecorateAndSend.command = /^decorar$/i;
handlerDecorateAndSend.owner = true; // Only the bot owner can use this command
export default handlerDecorateAndSend;
