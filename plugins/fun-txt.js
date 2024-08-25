
let handler = async (m, { conn, text, usedPrefix, command }) => {

    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
     if (!teks) throw `📝 Que escribo? Ejemplo : *${usedPrefix + command}* Hola puercos`
      conn.sendMessage(m.chat, { react: { text: "🗣️", key: m.key }})
      let img = global.API('fgmods', '/api/maker/txt', { text: teks }, 'APIKeys')
      conn.sendFile(m.chat, img, 'img.png', `✅ Es mejor de lo que escribes tú ✍🏻`, m)
      conn.sendMessage(m.chat, { react: { text: "🗣️", key: m.key }})

  }
  handler.help = ['txt']
  handler.tags = ['fun']
  handler.command = ['txt']
  
  export default handler
  
