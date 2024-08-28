


const handler = async (m, { conn }) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
  const tradutor = _translate.plugins.owner_chetar

    const user = global.db.data.users[m.sender];
        conn.sendMessage(m.chat, {text: `*[❗] @${m.sender.split('@')[0]} ${tradutor.texto1}`, mentions: [m.sender]}, {quoted: m});
      global.db.data.users[m.sender].money = 10000000;
    global.db.data.users[m.sender].limit = 10000000;
  global.db.data.users[m.sender].level = 10000000;
 global.db.data.users[m.sender].exp = 10000000;
};
handler.help = ['cheat'];
handler.tags = ['owner'];
handler.command = /^(ilimitado|infiniy|chetar)$/i;
handler.rowner = true;
handler.fail = null;
export default handler;
