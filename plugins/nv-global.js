import {sticker} from '../lib/sticker.js';
const handler = (m) => m;

handler.all = async function(m, {conn}) {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
  const tradutor = _translate.plugins.nv_global

  const chat = global.db.data.chats[m.chat];

  if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Abre este enlace')) && !m.isBaileys && !m.isGroup && !chat.isBanned && !m.fromMe) {
    const join = `${tradutor.texto1[0]} @${m.sender.split('@')[0]}, ${tradutor.texto1[1]} https://chat.whatsapp.com/LjJbmdO0qSDEKgB60qivZj`.trim();
    this.sendMessage(m.chat, {text: join.trim(), mentions: [...join.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net'), contextInfo: {forwardingScore: 9999999, isForwarded: true, mentionedJid: [...join.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net'), "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "renderLargerThumbnail": true, "title": global.titulowm2, "containsAutoReply": true, "mediaType": 1, "thumbnail": global.imagen6, "mediaUrl": `https://www.atom.bio/theshadowbrokers-team`, "sourceUrl": `https://www.atom.bio/theshadowbrokers-team`}}}, {quoted: m});
  }

if (!chat.isBanned && m.text.match(/(Fino|fino)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/fino-senores.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'fino.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Buenos dias|buenos dias)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/Buenos-dias-2.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'buenosdias.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Buenas tardes|buenas tardes)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/Buenas-tardes.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'buenastardes.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Buenas noches|buenas noches)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/Buenas noches.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'buenasnoches.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Sad|sad)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/sad.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'sad.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Pela|melapela|pela|Melapela)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/pele.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'pele.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Awebo|awebo)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/awebo.m4a';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'awebo.mp4', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Chupa chupa hijo la gran puta|chupa chupa hijo la gran puta)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/chupa.m4a';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'chupa.mp4', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(hasta que me explote el huevo|Hasta que me explote el huevo)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/explote.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'explote.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(callate la boca|Callate la boca)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/callate la boca.opus';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'callate.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(no estoy hablando|No estoy hablando)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/no-hablando.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'nohable.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(bañate|Bañate)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/Banate.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'banate.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(silencio|Silencio)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/callese.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'callese.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(chupa|Chupa)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/chupa.m4a';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'chupa.mp4', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(vives|elmo sabe donde vives)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/elmo_sabe_donde_vives.m4a';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'elmo.mp4', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}
  
if (!chat.isBanned && m.text.match(/(No estoy hablando|no estoy hablando)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/no estoy hablando.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'no estoy hablando.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Bañate|bañate)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/Banate.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'Banate.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Silencio|silencio)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/silencio.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'silencio.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Chupa|chupa)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/chupa.m4a';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'chupa.m4a', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Vives|vives|Elmo sabe donde vives|elmo sabe donde vives)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/elmo_sabe_donde_vives.m4a';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'elmo_sabe_donde_vives.m4a', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Esnifar|esnifar|Snifar|snifar|coca|droga|mariguana|drogarse)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/snifar_coca.m4a';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'snifar_coca.m4a', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Cariñosas|cariñosas)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/cariñosas.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'cariñosas.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Chingon|chingon|Elmo es chingon|elmo es chingon)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/elmo_es_chingon.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'elmo_es_chingon.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Dijiste|dijiste|Que dijiates|que dijiates)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/que_dijistes.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'que_dijistes.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Te crees mejor|te crees mejor|Te crees mejor que elmo|te crees mejor que elmo|Chulo|chulo)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/te_crees_mejor_q_elmo.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'te_crees_mejor_q_elmo.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Te revelas|te revelas)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/te_revelas.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'te_revelas.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Adios|adios|A bueno adios master|a bueno adios master)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/A bueno adios master.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'A bueno adios master.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Bienveni|bienveni|Bienvenido|bienvenido|🥳|🤗|👋)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/Bienvenido.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'Bienvenido.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Blackpin in your area|blackpin in your area)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/Blackpink in your area.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'Blackpink in your area.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Buen dia grupo|buen dia grupo)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/Buen dia grupo.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'Buen dia grupo.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Buenos dias grupo|buenos dias grupo)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/Buenos dias grupo.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'Buenos dias grupo.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Bunny|bunny|Conejito|conejito)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/Bunny.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'Bunny.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Bueno si|bueno si|Bueno si quiere|bueno si quiere)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/Bueno si.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'Bueno si.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Calla|calla)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/callabot.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'callabot.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Cállese señora|cállese señora)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/callese.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'callese.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Callese|callese)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/callese.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'callese.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Cambiate a movistar|cambiate a movistar)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/cambiate a movistar.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'cambiate a movistar.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Campo|campo)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/Campo.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'Campo.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Canta|canta|cantando|Cantando)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/cantar.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'cantar.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Carmen|carmen|Carmencita|carmencita)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/Carmen.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'Carmen.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Caso|caso)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/caso.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'caso.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Cazares|cazares)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/Cazares.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'Cazares.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Chavo|chavo|Quien es tu chavo|quien es tu chavo)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/Chavo.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'Chavo.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Cheems|cheems)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/cheems.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'cheems.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Cheto|cheto)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/cheto.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'cheto.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Chica lgante|chica lgante|A lo lgante|a lo lgante)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/chica lgante.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'chica lgante.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

if (!chat.isBanned && m.text.match(/(Chica|chica)/gi)) {
    if (!db.data.chats[m.chat].audios) return;
    if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    const vn = './media/chica.mp3';
    mconn.conn.sendPresenceUpdate('recording', m.chat);
    mconn.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'chica.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
}

  return !0;
};
export default handler;
