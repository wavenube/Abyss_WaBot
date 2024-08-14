import fetch from 'node-fetch';

// Para configurar o idioma, na raiz do projeto altere o arquivo config.json
// Para configurar el idioma, en la raíz del proyecto, modifique el archivo config.json.
// To set the language, in the root of the project, modify the config.json file.

const handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems }) => {

  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  try {
    const datas = global
    const idioma = datas.db.data.users[m.sender].language
    const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
    const tradutor = _translate.plugins.menu_menu
    // const pp = imagen7;

    // let vn = './media/menu.mp3'
    const img = 'https://i.ibb.co/Qjf1sdk/abyss-profile.png';
    const d = new Date(new Date + 3600000);
    const locale = 'es-ES';
    const week = d.toLocaleDateString(locale, { weekday: 'long' });
    const date = d.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
    const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);
    const user = global.db.data.users[m.sender];
    const { money, joincount } = global.db.data.users[m.sender];
    const { exp, limit, level, role } = global.db.data.users[m.sender];
    const rtotalreg = Object.values(global.db.data.users).filter((user) => user.registered == true).length;
    const rtotal = Object.entries(global.db.data.users).length || '0'
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(850);
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
    const doc = ['pdf', 'zip', 'vnd.openxmlformats-officedocument.presentationml.presentation', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const document = doc[Math.floor(Math.random() * doc.length)];
    const str = `${tradutor.texto1[0]}

${tradutor.texto1[1]} ${taguser}

> ★ Unete al grupo de WhatsApp ★

${tradutor.texto1[2]}

${tradutor.texto1[3]} ${level}
${tradutor.texto1[4]} ${exp}
${tradutor.texto1[5]} ${role}
${tradutor.texto1[6]} ${limit}
${tradutor.texto1[7]} ${money}
${tradutor.texto1[8]} ${joincount}
${tradutor.texto1[9]} ${user.premiumTime > 0 ? '✅' : (isPrems ? '✅' : '❌') || ''}
 ${readMore}

 ${tradutor.texto1[10]}
 
  ,╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌,
> ${tradutor.texto1[11]}

╭─────•ೋ•─────╮
┃ ⛧ _${usedPrefix}menuaudios_
┃ ⛧ _${usedPrefix}menuanimes_
┃ ⛧ _${usedPrefix}labiblia_
┃ ⛧ _${usedPrefix}lang_
┃ ⛧ _${usedPrefix}langgroup_
┃ ⛧ _${usedPrefix}glx_
╰─────•ೋ•─────╯

> ${tradutor.texto1[12]}

╭─────•ೋ•─────╮
┃ ⛧ _${usedPrefix}terminosycondiciones_
┃ ⛧ _${usedPrefix}grupos_
┃ ⛧ _${usedPrefix}estado_
┃ ⛧ _${usedPrefix}infobot_
┃ ⛧ _${usedPrefix}speedtest_
┃ ⛧ _${usedPrefix}donar_
┃ ⛧ _${usedPrefix}owner_
┃ ⛧ _${usedPrefix}script_
┃ ⛧ _${usedPrefix}reporte *<txt>*_
┃ ⛧ _${usedPrefix}join *<wagp_url>*_
┃ ⛧ _${usedPrefix}fixmsgespera_
┃ ⛧ _bot_ (sin prefijo)
╰─────•ೋ•─────╯

> ${tradutor.texto1[13]}

╭─────•ೋ•─────╮
┃ ⛧ _${usedPrefix}serbot --code_
┃ ⛧ _${usedPrefix}serbot_
┃ ⛧ _${usedPrefix}deletebot_
┃ ⛧ _${usedPrefix}token_
┃ ⛧ _${usedPrefix}stop_
┃ ⛧ _${usedPrefix}bots_
┃ ⛧ _${usedPrefix}enable restrict_
┃ ⛧ _${usedPrefix}disable restrict_
┃ ⛧ _${usedPrefix}enable autoread_
┃ ⛧ _${usedPrefix}disable autoread_
┃ ⛧ _${usedPrefix}enable antispam_
┃ ⛧ _${usedPrefix}disable antispam_
┃ ⛧ _${usedPrefix}enable anticall_
┃ ⛧ _${usedPrefix}disable anticall_
┃ ⛧ _${usedPrefix}enable modoia_
┃ ⛧ _${usedPrefix}disable modoia_
┃ ⛧ _${usedPrefix}enable audios_bot_
┃ ⛧ _${usedPrefix}disable audios_bot_
┃ ⛧ _${usedPrefix}enable antiprivado_
┃ ⛧ _${usedPrefix}disable antiprivado_
╰─────•ೋ•─────╯

> ${tradutor.texto1[14]}

╭─────•ೋ•─────╮
┃ ⛧ _${usedPrefix}mates *<noob / easy / medium / hard / extreme /impossible /impossible2>*_
┃ ⛧ _${usedPrefix}fake *<txt1> <@tag> <txt2>*_
┃ ⛧ _${usedPrefix}ppt *<papel / tijera /piedra>*_
┃ ⛧ _${usedPrefix}prostituto *<nombre / @tag>*_
┃ ⛧ _${usedPrefix}prostituta *<nombre / @tag>*_
┃ ⛧ _${usedPrefix}gay2 *<nombre / @tag>*_
┃ ⛧ _${usedPrefix}lesbiana *<nombre / @tag>*_
┃ ⛧ _${usedPrefix}pajero *<nombre / @tag>*_
┃ ⛧ _${usedPrefix}pajera *<nombre / @tag>*_
┃ ⛧ _${usedPrefix}puto *<nombre / @tag>*_
┃ ⛧ _${usedPrefix}puta *<nombre / @tag>*_
┃ ⛧ _${usedPrefix}manco *<nombre / @tag>*_
┃ ⛧ _${usedPrefix}manca *<nombre / @tag>*_
┃ ⛧ _${usedPrefix}rata *<nombre / @tag>*_
┃ ⛧ _${usedPrefix}love *<nombre / @tag>*_
┃ ⛧ _${usedPrefix}doxear *<nombre / @tag>*_
┃ ⛧ _${usedPrefix}pregunta *<txt>*_
┃ ⛧ _${usedPrefix}suitpvp *<@tag>*_
┃ ⛧ _${usedPrefix}slot *<apuesta>*_
┃ ⛧ _${usedPrefix}ttt ${tradutor.texto1[32]}
┃ ⛧ _${usedPrefix}delttt_
┃ ⛧ _${usedPrefix}acertijo_
┃ ⛧ _${usedPrefix}simi *<txt>*_
┃ ⛧ _${usedPrefix}top *<txt>*_
┃ ⛧ _${usedPrefix}topgays_
┃ ⛧ _${usedPrefix}topotakus_
┃ ⛧ _${usedPrefix}formarpareja_
┃ ⛧ _${usedPrefix}verdad_
┃ ⛧ _${usedPrefix}reto_
┃ ⛧ _${usedPrefix}cancion_
┃ ⛧ _${usedPrefix}pista_
┃ ⛧ _${usedPrefix}akinator_
┃ ⛧ _${usedPrefix}wordfind_
┃ ⛧ _${usedPrefix}glx (RPG Mundo)_
╰─────•ೋ•─────╯

> ${tradutor.texto1[15]}

╭─────•ೋ•─────╮
┃ ⛧ _${usedPrefix}enable *welcome*_
┃ ⛧ _${usedPrefix}disable *welcome*_
┃ ⛧ _${usedPrefix}enable *modohorny*_
┃ ⛧ _${usedPrefix}disable *modohorny*_
┃ ⛧ _${usedPrefix}enable *antilink*_
┃ ⛧ _${usedPrefix}disable *antilink*_
┃ ⛧ _${usedPrefix}enable *antilink2*_
┃ ⛧ _${usedPrefix}disable *antilink2*_
┃ ⛧ _${usedPrefix}enable *detect*_
┃ ⛧ _${usedPrefix}disable *detect*_
┃ ⛧ _${usedPrefix}enable *audios*_
┃ ⛧ _${usedPrefix}disable *audios*_
┃ ⛧ _${usedPrefix}enable *autosticker*_
┃ ⛧ _${usedPrefix}disable *autosticker*_
┃ ⛧ _${usedPrefix}enable *antiviewonce*_
┃ ⛧ _${usedPrefix}disable *antiviewonce*_
┃ ⛧ _${usedPrefix}enable *antitoxic*_
┃ ⛧ _${usedPrefix}disable *antitoxic*_
┃ ⛧ _${usedPrefix}enable *antitraba*_
┃ ⛧ _${usedPrefix}disable *antitraba*_
┃ ⛧ _${usedPrefix}enable *antiarabes*_
┃ ⛧ _${usedPrefix}disable *antiarabes*_
┃ ⛧ _${usedPrefix}enable *modoadmin*_
┃ ⛧ _${usedPrefix}disable *modoadmin*_
┃ ⛧ _${usedPrefix}enable *antidelete*_
┃ ⛧ _${usedPrefix}disable *antidelete*_
╰─────•ೋ•─────╯

> ${tradutor.texto1[16]}

╭─────•ೋ•─────╮
┃ ⛧ _${usedPrefix}play *<txt>*_
┃ ⛧ _${usedPrefix}play2 *<txt>*_
┃ ⛧ _${usedPrefix}play.1 *<txt>*_
┃ ⛧ _${usedPrefix}play.2 *<txt>*_
┃ ⛧ _${usedPrefix}playdoc *<txt>*_
┃ ⛧ _${usedPrefix}playdoc2 *<txt>*_
┃ ⛧ _${usedPrefix}playlist *<txt>*_
┃ ⛧ _${usedPrefix}ytshort *<url>*_
┃ ⛧ _${usedPrefix}ytmp3 *<url>*_
┃ ⛧ _${usedPrefix}ytmp3doc *<url>*_
┃ ⛧ _${usedPrefix}ytmp4 *<url>*_
┃ ⛧ _${usedPrefix}ytmp4doc *<url>*_
┃ ⛧ _${usedPrefix}videodoc *<url>*_
┃ ⛧ _${usedPrefix}spotify *<txt>*_
┃ ⛧ _${usedPrefix}facebook *<url>*_
┃ ⛧ _${usedPrefix}instagram *<url>*_
┃ ⛧ _${usedPrefix}instagram2 *<url>*_
┃ ⛧ _${usedPrefix}mediafire *<url>*_
┃ ⛧ _${usedPrefix}instagram3 *<url>*_
┃ ⛧ _${usedPrefix}gitclone *<url>*_
┃ ⛧ _${usedPrefix}gdrive *<url>*_
╰─────•ೋ•─────╯

> ${tradutor.texto1[17]}

╭─────•ೋ•─────╮
┃ ⛧ _${usedPrefix}sticker *<txt>*_
┃ ⛧ _${usedPrefix}sticker2 *<txt>*_
┃ ⛧ _${usedPrefix}sticker *<responder a img>*_
┃ ⛧ _${usedPrefix}sticker2 *<responder a img>*_
┃ ⛧ _${usedPrefix}sticker *<responder a vid>*_
┃ ⛧ _${usedPrefix}sticker2 *<responder a vid>*_
┃ ⛧ _${usedPrefix}sticker *<responder a gif>*_
┃ ⛧ _${usedPrefix}sticker2 *<responder a gif>*_
┃ ⛧ _${usedPrefix}sticker *<url>*_
┃ ⛧ _${usedPrefix}sticker2 *<url>*_
┃ ⛧ _${usedPrefix}attp *<txt>*_
┃ ⛧ _${usedPrefix}attp2 *<txt>*_
┃ ⛧ _${usedPrefix}attp3 *<txt>*_
┃ ⛧ _${usedPrefix}ttp *<txt>*_
┃ ⛧ _${usedPrefix}ttp2 *<txt>*_
┃ ⛧ _${usedPrefix}ttp3 *<txt>*_
┃ ⛧ _${usedPrefix}ttp4 *<txt>*_
┃ ⛧ _${usedPrefix}ttp5 *<txt>*_
┃ ⛧ _${usedPrefix}ttp6 *<txt>*_
┃ ⛧ _${usedPrefix}toimg *<responder a sticker>*_
┃ ⛧ _${usedPrefix}tovideo *<responder a sticker animado>*_
┃ ⛧ _${usedPrefix}togif *<responder a sticker animado>*_
┃ ⛧ _${usedPrefix}emojimix *<emoji1>&<emoji2>*_
┃ ⛧ _${usedPrefix}emojimix2 *<emoji>*_
┃ ⛧ _${usedPrefix}upimg *<responder a img>*_
┃ ⛧ _${usedPrefix}ocr *<responder a img>*_
╰─────•ೋ•─────╯`

    let pp
    // Nouvelles images de menu disponibles 
    if (idioma == 'es') {
      pp = global.imagen1
    } else if (idioma == 'pt-br') {
      pp = global.imagen1
    } else if (idioma == 'fr') {
      pp = global.imagen1
    }else if (idioma == 'en') {
      pp = global.imagen1
    } else if (idioma == 'ru') {
      pp = global.imagen1
    } else {
      pp = global.imagen1 // Imagem Default em espanhol
    }



    if (m.isGroup) {
      // await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, { type: 'audioMessage', ptt: true})
const fkontak = { key: { participants:"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
     conn.sendMessage(m.chat, { image: pp, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net'),
     contextInfo: {
      isForwarded: true,    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363318622514917@newsletter",
      serverMessageId: 1,
      newsletterName: "<Abyss - Bot>",
    }, 
      externalAdReply: {
        mediaUrl: "https://whatsapp.com/channel/0029VakDx9I0gcfFXnzZIX2v",
        mediaType: 'VIDEO',
        description: 'canal del grupo',
        title: wm,
        body: "By: ZephyrByte",
        thumbnailUrl: "https://i.ibb.co/Qjf1sdk/abyss-profile.png",
        sourceUrl: "https://whatsapp.com/channel/0029VakDx9I0gcfFXnzZIX2v"
      }
    } }, { quoted: fkontak });
    } else {
      //await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, { type: 'audioMessage', ptt: true})
const fkontak = { key: { participants:"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
   conn.sendMessage(m.chat, { image: pp, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net'),
   contextInfo: {
      isForwarded: true,    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363318622514917@newsletter",
      serverMessageId: 1,
      newsletterName: "Abyss Bot",
    }, 
      externalAdReply: {
        mediaUrl: "https://whatsapp.com/channel/0029VakDx9I0gcfFXnzZIX2v",
        mediaType: 'VIDEO',
        description: 'canal del grupo',
        title: wm,
        body: "By: ZephyrByte",
        thumbnailUrl: "https://i.ibb.co/Qjf1sdk/abyss-profile.png",
        sourceUrl: "https://whatsapp.com/channel/0029VakDx9I0gcfFXnzZIX2v"
      }
    } }, { quoted: fkontak });
    }
  } catch (e) {
    console.log(e)
    const datas = global
    const idioma = datas.db.data.users[m.sender].language
    const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
    const tradutor = _translate.plugins.menu_menu

    conn.reply(m.chat, tradutor.texto1[29], m);
  }
};
handler.command = /^(menu|menú|memu|memú|help|info|comandos|allmenu|2help|menu1.2|ayuda|commands|commandos|cmd)$/i;
handler.exp = 50;
handler.fail = null;
export default handler;
function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
      }
