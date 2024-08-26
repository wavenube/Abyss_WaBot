let commandUsage = {};

const antiSpamHandler = async (m, { conn }) => {
    const datas = global;
    const idioma = datas.db.data.users[m.sender].language;
    const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
    const tradutor = _translate.plugins.owner_banuser;

    const timeLimit = 10000; // 10 segundos
    const commandLimit = 3;

    if (!commandUsage[m.sender]) {
        commandUsage[m.sender] = {
            count: 1,
            lastCommand: Date.now()
        };
    } else {
        if (Date.now() - commandUsage[m.sender].lastCommand > timeLimit) {
            // Reinicia el conteo después de 10 segundos
            commandUsage[m.sender].count = 1;
        } else {
            // Incrementa el contador si está dentro del límite de tiempo
            commandUsage[m.sender].count++;
        }
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
    }
};

antiSpamHandler.command = /./i; // Monitorea todos los comandos
antiSpamHandler.rowner = false; // No restringido solo al propietario

export default antiSpamHandler;
