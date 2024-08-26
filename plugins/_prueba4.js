let commandUsage = {};

const spamDetectionHandler = async (m, { conn, usedPrefix, command }) => {
    const datas = global;
    const idioma = datas.db.data.users[m.sender].language;
    const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
    const tradutor = _translate.plugins.owner_banuser;

    if (!commandUsage[m.sender]) {
        commandUsage[m.sender] = {
            count: 1,
            lastCommand: Date.now()
        };
    } else {
        commandUsage[m.sender].count++;
    }

    // Tiempo límite y conteo de spam (3 comandos en 10 segundos)
    const timeLimit = 10000; // 10 segundos
    const commandLimit = 3;

    if (Date.now() - commandUsage[m.sender].lastCommand > timeLimit) {
        commandUsage[m.sender].count = 1; // Reinicia el conteo después de 10 segundos
    }

    commandUsage[m.sender].lastCommand = Date.now();

    if (commandUsage[m.sender].count === commandLimit) {
        m.reply(tradutor.texto3 || '⚠️ Estás enviando demasiados comandos en poco tiempo. ¡Reduce la velocidad o serás baneado!');
    }

    if (commandUsage[m.sender].count > commandLimit) {
        let who = m.sender;
        const users = global.db.data.users;
        users[who].banned = true;

        m.reply(tradutor.texto2 || '🚫 Has sido baneado por enviar spam de comandos.');
        delete commandUsage[m.sender]; // Resetear el contador para ese usuario después de banearlo
        return;
    }
};

// Este handler se ejecuta antes de cualquier otro comando para monitorear el spam
spamDetectionHandler.command = /./i; // Monitorea todos los comandos
spamDetectionHandler.rowner = false; // No restringido solo al propietario
export default spamDetectionHandler;
