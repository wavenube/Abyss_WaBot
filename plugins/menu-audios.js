import fetch from 'node-fetch';




const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`))
  const tradutor = _translate.plugins.menu_audios

  try {
    const pp = imagen4;
    // let vn = './media/menu.mp3'
    const img = './Menu2.jpg';
    const d = new Date(new Date + 3600000);
    const locale = 'es';
    const week = d.toLocaleDateString(locale, {weekday: 'long'});
    const date = d.toLocaleDateString(locale, {day: 'numeric', month: 'long', year: 'numeric'});
    const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);
    const user = global.db.data.users[m.sender];
    const {money, joincount} = global.db.data.users[m.sender];
    const {exp, limit, level, role} = global.db.data.users[m.sender];
    const rtotalreg = Object.values(global.db.data.users).filter((user) => user.registered == true).length;
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(850);
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
    const doc = ['pdf', 'zip', 'vnd.openxmlformats-officedocument.presentationml.presentation', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const document = doc[Math.floor(Math.random() * doc.length)];
    const str = `
*<𝐌𝐄𝐍𝐔 𝐀𝐔𝐃𝐈𝐎𝐒/>*

 *- ${_translate.plugins.menu_audios.texto1}*
-Fino
-Buenos dias
-Buenas tardes
-Buenas noches
-Sad
-Pela/melapela
-Awebo
-Chupa chupa hijo la gran puta
-hasta que me explote el huevo
-callate la boca
-no estoy hablando
-bañate
-silencio
-chupa
-vives/elmo sabe donde vives
-esnifar/snifar coca/droga/mariguana/drogarse
-cariñosas
-chingon/elmo es chingon
-dijiste/que dijiates
-te crees mejor/te crees mejor que elmo/chulo
-te revelas
-adios/A bueno adios master
-bienveni/bienvenido/🥳/🤗/👋
-Blackpin in your area
-buen dia grupo
-pene/🥒/🍆/te gusta el pepino
-tal vez/puede ser/🧘‍♀/🍦/🍡/🌮/🍕/🍔/🌭/🍖/😋/🎩
-pendejo/idiota/tonto/su nivel de pendejo/😐/🙄/😜/🤪
-se estan riendo de mi
-grupos/que tal grupo
-potaxio/🥑
-po qué ta tite/🥺/😕/😟/😞/😔
-no me rompas/💔/😖/😫/😣/😿
-Nico nico/🐄/🐖/🐬/🐼/🐰/🦦/🐋
-muchachos/⛈️/🌩️/🌦️/🌤️/🌪️
-motivacion/💫/✨/💥/🍀/⭐
-momento/momento equusde/🥴/😨/🤘/👄/🕺/💃/🕴️
-busca/me anda buscando anonymous
-lee/leiste/las reglas del grupo
-Zzz/😴/💩/👾/👽/🎃
-Eres fuerte/🙌/🤜/🤛/👊/🦾
-🕵️/👤fbi/cai/nasa/investigación/En caso de una investigacion
-donde vives/de donde eres/elmo sabe donde vives
-El toxco/malo/mala/estupido
-Corte/Golpear/pegar/Corte corte
-movistar/cambiate a movistar
-amo a bts/calla fan de bts
-basado/que basado
_baneado/🤫
-bot ctm/bot de mierda/bot pendejo/mierda de bot
-literal
-no importa/a nadi le importa
-tengo los calzones/🥶/😳/😱/😨/🙀
-adbuzcan
-antojaron/ya antojaron/goku pervertido/😈/👿/👉👌/👌👈
-y este quien es
-falda/traiganle una falda/traiganle una falda a la niña
-todo bien/😇/😃/😁/😄/🏂/⛷️/🏋️‍♂️/🏋️‍♀️/🤹‍♀️/🤹‍♂️/👌/👋/👍
-Bienpensado/Bien pensado woody
-🥳/🎉/🎊/felicitaciones/enhorabuena
-no lo puedo creer
-no mames/no puede ser wey
-Homero chino
-sexo
-jesucristo
-la voz de hombre
-la oracion
-cancion1
-masivo
-ho me vengo
-me pica los cocos 
-mmm
-moshi moshi
-murió el grupo
-nadie te pregunto
-feliz navidad
-niconico
-no chu
-no me hables
-me hagas usar esto
-no digas eso papu
-noche de paz
 -nyapasu
-otaku
-ohayo
-omaiga
-oni-chan/Onichan
-orale
-pasa pack
-contexto
-pero esto
-nive
-pika/pikachu/pokemon
-quién es tu senpai botsito
-rawr
-hablame
-sempai
-cagaste
-suspenso
-yoshi/yoshi
-cancion
-verdad que te engañe
-vivan
-yamete/Yamete-kudasai
-usted esta detenido/detenido
-una pregunta
-freefire
-aguanta
-es viernes
-que quede vos
-chabona
-feriado
-borracho
-delivery
-putos
-tarado
-bardo
-saliste del grupo
-no agregue
-internet gratis
-donde esta
-q onda
-la toxica
-bebesita
-takataka
-no la pienso
-loli conmigo venga/loli conmigo
-bruno
-soy guapo
-dj bot
-quevedo quedate/quedate
-chiste/dylan2
-ig de la minita
-frases/gaspi9
-se pudrió/se que re pudrió
-goo
-temazo/fua temon
-Vamos
 -viejo/v
-no me hables
-sus
-el amor/😍
-Escupido
-fui fui/mi bebito fui fui
-no soy pati
-oxxo
-Sexo/Hora de sexo 
-que linda noche
-sabosito
-te elimino
-te sabes
-temon
-trabajo
-mami yo que digo a ti
-mujer/dama
-te felicito
-siiuu
-ara ara
-Hey
-joder
-Among us
-te amo
-truste,triste,estoy triste/violin
-un pato/un pato que va caminando alegremente
-UwU`.trim();
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
handler.command = /^(menu2|audios|menú2|memu2|menuaudio|menuaudios|memuaudios|memuaudio|audios|keyaudio|keyaudios)$/i;
handler.exp = 50;
handler.fail = null;
export default handler;
function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}
