const handlerOwnerContact = async (m, { conn }) => {
    // Definir la información del contacto del creador
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:ZephyrByte\nTEL;TYPE=CELL;TYPE=VOICE;waid=5492613619545:+5492613619545\nEND:VCARD`;

    // Crear el mensaje de contacto
    const contactMessage = {
        key: {
            fromMe: false,
            participant: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast'
        },
        message: {
            contactMessage: {
                vcard
            }
        }
    };

    // Enviar el mensaje de contacto
    await conn.sendMessage(m.chat, { contacts: { displayName: "ZephyrByte", contacts: [{ vcard }] }}, { quoted: contactMessage });
};

// Configuración del comando
handlerOwnerContact.command = /^owner$/i;
handlerOwnerContact.owner = false; // Cualquier usuario puede usar este comando
export default handlerOwnerContact;
