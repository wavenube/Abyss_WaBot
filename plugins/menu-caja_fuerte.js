
const handler = async (m, {conn, usedPrefix}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`))
  const tradutor = _translate.plugins.menu_caja_fuerte

  const pp = imagen4;
  try {
  } catch (e) {
  } finally {
    const name = await conn.getName(m.sender);
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
    const str = `
*ミ💖 ${tradutor.texto1[0]} ${taguser} 💖彡*

ㅤㅤ ${tradutor.texto1[1]}

${tradutor.texto1[2]}

${tradutor.texto1[3]}

° ඬ⃟🗳️ _${usedPrefix}agregarmsg ${tradutor.texto2[0]}
° ඬ⃟🗳️ _${usedPrefix}agregarvn ${tradutor.texto2[1]}
° ඬ⃟🗳️ _${usedPrefix}agregarvideo ${tradutor.texto2[2]}
° ඬ⃟🗳️ _${usedPrefix}agregaraudio ${tradutor.texto2[3]}
° ඬ⃟🗳️ _${usedPrefix}agregarimg ${tradutor.texto2[4]}
° ඬ⃟🗳️ _${usedPrefix}agregarsticker ${tradutor.texto2[5]}

${tradutor.texto1[4]}

° ඬ⃟🗳️ _${usedPrefix}listamsg_
° ඬ⃟🗳️ _${usedPrefix}listavn_
° ඬ⃟🗳️ _${usedPrefix}listavideo_
° ඬ⃟🗳️ _${usedPrefix}listaaudio_
° ඬ⃟🗳️ _${usedPrefix}listaimg_
° ඬ⃟🗳️ _${usedPrefix}listasticker_

${tradutor.texto1[5]}

° ඬ⃟🗳️ _${usedPrefix}vermsg ${tradutor.texto3[0]}
° ඬ⃟🗳️ _${usedPrefix}vervn ${tradutor.texto3[1]}
° ඬ⃟🗳️ _${usedPrefix}vervideo ${tradutor.texto3[2]}
° ඬ⃟🗳️ _${usedPrefix}veraudio ${tradutor.texto3[3]}
° ඬ⃟🗳️ _${usedPrefix}verimg ${tradutor.texto3[4]}
° ඬ⃟🗳️ _${usedPrefix}versticker ${tradutor.texto3[5]}

${tradutor.texto1[6]}

° ඬ⃟🗳️ _${usedPrefix}eliminarmsg ${tradutor.texto4[0]}
° ඬ⃟🗳️ _${usedPrefix}eliminarvn ${tradutor.texto4[1]}
° ඬ⃟🗳️ _${usedPrefix}eliminarvideo ${tradutor.texto4[2]}
° ඬ⃟🗳️ _${usedPrefix}eliminaraudio ${tradutor.texto4[3]}
° ඬ⃟🗳️ _${usedPrefix}eliminarimg ${tradutor.texto4[4]}
° ඬ⃟🗳️ _${usedPrefix}eliminarsticker ${tradutor.texto4[5]}`.trim();
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
    const _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`))
    const tradutor = _translate.plugins.menu_menu

    conn.reply(m.chat, tradutor.texto1[29], m);
  }
};
handler.help = ['cajafuerte'];
handler.tags = ['owner'];
handler.command = /^(cajafuerte)$/i;
handler.rowner = true;
handler.fail = null;
export default handler;
