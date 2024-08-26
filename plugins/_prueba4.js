let commandUsage = {};

const handler = async (m, { conn, participants, usedPrefix, command }) => {
    const datas = global;
    const idioma = datas.db.data.users[m.sender].language;
    const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
    const tradutor = _translate.plugins.owner_banuser;

    const BANtext = `${tradutor.texto1}\n*${usedPrefix + command} @${global.suittag}*`;

    if (!commandUsage[m.sender]) {
        commandUsage[m.sender] = {
            count: 1,
            lastCommand: Date.now()
        };
    } else {
        commandUsage[m.sender].count++;
    }

    // Tiempo límite y conteo de spam (por ejemplo, 5 comandos en 10 segundos)
    const timeLimit = 10000; // 10 segundos
    const commandLimit = 5;

    if (Date.now() - commandUsage[m.sender].lastCommand > timeLimit) {
        commandUsage[m.sender].count = 1; // Reinicia el conteo después de 10 segundos
    }

    commandUsage[m.sender].lastCommand = Date.now();

    if (commandUsage[m.sender].count > commandLimit) {
        let who = m.sender;
        const users = global.db.data.users;
        users[who].banned = true;

        m.reply(tradutor.texto2);
        delete commandUsage[m.sender]; // Resetear el contador para ese usuario después de banearlo
        return;
    }

    // Continuar con la ejecución normal si no hay spam de comandos
};

handler.command = /^prueba$/i;
handler.rowner = true; // Solo el propietario del bot puede usar este comando
export default handler;
