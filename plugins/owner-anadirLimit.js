import MessageType from '@whiskeysockets/baileys';

const pajak = 0;
const handler = async (m, {conn, text}) => {

  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
  const tradutor = _translate.plugins.onwer_anadirlimit

  let who;
  if (m.isGroup) who = m.mentionedJid[0];
  else who = m.chat;
  if (!who) throw 'prueba';
  const txt = text.replace('@' + who.split`@`[0], '').trim();
  if (!txt) throw 'prueba';
  if (isNaN(txt)) throw 'prueba';
  const dmt = parseInt(txt);
  let limit = dmt;
  const pjk = Math.ceil(dmt * pajak);
  limit += pjk;
  if (limit < 1) throw 'prueba';
  const users = global.db.data.users;
  users[who].limit += dmt;
  m.reply(`≡ 'prueba'
┌──────────────
▢ Se han transferido ${dmt}
└──────────────`);
};
handler.command = ['añadirdiamantes', 'addd', 'dard', 'dardiamantes'];
handler.rowner = true;
export default handler;
