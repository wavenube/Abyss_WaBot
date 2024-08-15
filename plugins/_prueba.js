import fetch from 'node-fetch';


const handler = async (m, {conn, command, usedPrefix}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
  const tradutor = _translate.plugins.adult_pack_vid


  if (!db.data.chats[m.chat].modohorny && m.isGroup) throw `${tradutor.texto1}`;
  switch (command) {
    case 'pack':
      const url = await pack[Math.floor(Math.random() * pack.length)];
      conn.sendMessage(m.chat, {image: {url: url}, caption: `_🥵 Pack 🥵_`}, {quoted: m});
      break;
    case 'pack2':
      const url2 = await packgirl[Math.floor(Math.random() * packgirl.length)];
      conn.sendMessage(m.chat, {image: {url: url2}, caption: `_🥵 Pack 🥵_`}, {quoted: m});
      break;
    case 'pack3':
      const url3 = await packmen[Math.floor(Math.random() * packmen.length)];
      conn.sendMessage(m.chat, {image: {url: url3}, caption: `_🥵 Pack 3 🥵_`}, {quoted: m});
      break;
    case 'videoxxx': case 'vídeoxxx':
      const url4 = await videosxxxc[Math.floor(Math.random() * videosxxxc.length)];
      await conn.sendMessage(m.chat, {video: {url: url4}, caption: `${tradutor.texto2} 🥵*`}, {quoted: m});
      break;
    case 'videoxxxlesbi': case 'videolesbixxx': case 'pornolesbivid': case 'pornolesbianavid': case 'pornolesbiv': case 'pornolesbianav': case 'pornolesv':
      const url5 = await videosxxxc2[Math.floor(Math.random() * videosxxxc2.length)];
      await conn.sendMessage(m.chat, {video: {url: url5}, caption: `${tradutor.texto2} 🥵*`}, {quoted: m});
      break;
  }
};
handler.command = /^(prueba)$/i;
export default handler;

global.prueba = [
  'https://qu.ax/scZw.mp4'
];
