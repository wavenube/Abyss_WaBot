import fetch from 'node-fetch'
let handler = async (m, { conn, text, usedPrefix, command }) => {

 let lang = "es"
  if (!text) throw `✳️ Ingresa un mensaje para hablar con el bot, por ejemplo\n${usedPrefix + command} hola bot`
conn.sendMessage(m.chat, { react: { text: "🗣️", key: m.key }})
  try { 
  //let res = await fetch(`https://api.simsimi.vn/v2/?text=${text}&lc=${lang}`)
  let res = await fetch('https://api.simsimi.vn/v1/simtalk', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `text=${encodeURIComponent(text)}&lc=${lang}&key=`
  })
  let json = await res.json()
  m.reply(json.message.replace('simsimi', `${wm}`).replace('Simsimi', `${wm}`).replace('sim simi', `${wm}`))
} catch (e) {
throw e
  m.reply(`❎ Intenta de nuevo mas tarde La api de SimSimi se cayo`)
}

}
handler.help = ['bot']
handler.tags = ['fun']
handler.command = ['bot', 'simi'] 

export default handler
