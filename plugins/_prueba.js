const fs = require("fs");
const moment = require('moment-timezone');
const chalk = require("chalk");
const { getRandom, pickRandom } = require('../libs/fuctions.js'); // Asegúrate de que estas funciones estén definidas correctamente

const menu = async (m, command, conn, prefix, pushname, sender, fkontak) => {
    // Validaciones previas
    if (global.db.data.users[m.sender].banned) return;

    // Datos del usuario
    let user = global.db.data.users[m.sender];
    let totalreg = Object.keys(global.db.data.users).length;
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
    const date = moment.tz('America/Managua').format('DD/MM/YYYY');
    const time = moment.tz('America/Argentina/Buenos_Aires').format('LT');
    let wa = m.key.id.length > 21 ? 'Android' : m.key.id.substring(0, 2) == '3A' ? 'IOS' : 'whatsapp web';

    // Respuesta falsa para simular procesamiento
    conn.fakeReply(m.chat, '*✨ 𝙀𝙋𝙀𝙍𝘼 𝙐𝙉 𝙈𝙊𝙈𝙀𝙉𝙏𝙊 .*\n\n> No hagas spam de comandos', '0@s.whatsapp.net', '𝙀𝙉𝙑𝙄𝘼𝙉𝘿𝙊 𝙈𝙀𝙉𝙐 ⌛');

    // Submenu
    let submenu = `
╭───────────────
│           🌀 𝕌𝕊𝕌𝔸ℝ𝕀𝕆 🌀
│───────────────
│   👤 𝐍𝐨𝐦𝐛𝐫𝐞: ${pushname} ${user.registered ? '✓' : ''}
│   📊 𝐋í𝐦𝐢𝐭𝐞: ${user.limit}
│   🔝 𝐍𝐢𝐯𝐞𝐥: ${user.level}
│   🎭 𝐑𝐨𝐥: ${user.role}
│   ✨ 𝐄𝐱𝐩: ${user.exp}
│   💰 𝐂𝐨𝐢𝐧𝐬: ${user.money}
│
│   📅 𝐑𝐞𝐠𝐢𝐬𝐭𝐫𝐨𝐬 𝐚𝐬𝐢𝐬𝐭𝐞𝐧𝐜𝐢𝐚𝐥𝐞𝐬: ${rtotalreg} / ${totalreg}
╰───────────────
${pickRandom([
    `¿𝐐𝐮𝐢𝐞𝐫𝐞𝐬 𝐯𝐞𝐫 𝐥𝐨𝐬 𝐩𝐫𝐨𝐲𝐞𝐜𝐭𝐨𝐬 𝐝𝐞 𝐦𝐢 𝐜𝐫𝐞𝐚𝐝𝐨𝐫? 𝐔𝐬𝐚 ${prefix}𝐩𝐫𝐨𝐲𝐞𝐜𝐭𝐨𝐬`,
    `□ CÓMO INSTALAR EL BOT\n${yt}`,
    `¿Qué hay de nuevo?\n• Pon : ${prefix}nuevo`,
    `💫 INFÓRMATE SOBRE LAS NUEVAS ACTUALIZACIONES, NOVEDADES DEL BOT AQUÍ\n${nna}`,
    `🌟¿Te agrada el bot? califica nuestro repositorio con una estrellita ☺\n${md}`
])}`;

    // Lista de descarga
    let descargar = `
╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩
┊┏━✿━━━━✿━━━━━━✿━━•
┊┃ 🚀 𝑚𝑒𝑛𝑢 𝑑𝑒 𝑑𝑒𝑠𝑐𝑎𝑟𝑔𝑎𝑠 🚀
┊┃━✿━━━━✿━━━━━━✿━━•
┊┃ ❏ ${prefix}𝑝𝑙𝑎𝑦 _(𝑑𝑒𝑠𝑐𝑎𝑟𝑔𝑎𝑟 𝑚𝑢𝑠𝑖𝑐𝑎)_
┊┃ ❏ ${prefix}𝑝𝑙𝑎𝑦2 _(𝐷𝑒𝑠𝑐𝑎𝑟𝑔𝑎𝑟 𝑣𝑖𝑑𝑒𝑜)_
┊┃ ❏ ${prefix}𝑝𝑙𝑎𝑦.1 _(𝑑𝑒𝑠𝑐𝑎𝑟𝑔𝑎𝑟 𝑚𝑢𝑠𝑖𝑐𝑎)_
┊┃ ❏ ${prefix}𝑝𝑙𝑎𝑦.2 _(𝑑𝑒𝑠𝑐𝑎𝑟𝑔𝑎𝑟 𝑣𝑖𝑑𝑒𝑜)_
etc`;

    // Imagen aleatoria
    let randomImage = pickRandom([imagen1]);

    // Botones para el menú
    let buttons = [
        ['𝙈𝙀𝙉𝙐 𝙇𝙄𝙎𝙏𝘼 💥', `${prefix}help`],
        ['𝙈𝙀𝙉𝙐 𝘾𝙊𝙈𝙋𝙇𝙀𝙏𝙊 📜', `${prefix}allmenu`],
        ['𝙋𝙍𝙐𝙀𝘽𝘼 𝘿𝙀 𝙑𝙀𝙇𝙊𝘾𝙄𝘿𝘼𝘿⚡', `${prefix}ping`],
        ['𝘼𝙐𝙏𝙊 𝙑𝙀𝙍𝙄𝙁𝙄𝘾𝘼𝙍 ✅', `${prefix}reg ${pushname}.${sender.split('@')[0]}`]
    ];

    // Envío del menú
    await conn.sendButton(m.chat, submenu, descargar, randomImage, buttons, { quoted: fkontak });
};

// Exportar el módulo
module.exports = { menu };

// Monitoreo del archivo para recarga automática
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update '${__filename}'`));
    delete require.cache[file];
    require(file);
});
