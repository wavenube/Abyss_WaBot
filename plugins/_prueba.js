import { createHash } from 'crypto';

const handler = async function(m, { conn }) {
    const user = global.db.data.users[m.sender];
    const taguser = '@' + m.sender.split('@')[0];
    
    // Verificar si el usuario ya está registrado
    if (user.registered === true) {
        throw 'Ya estás registrado.';
    }

    // Asignar nombre, edad aleatoria, y registrar al usuario
    user.name = conn.getName(m.sender);
    user.age = Math.floor(Math.random() * 21) + 15; // Edad aleatoria entre 15 y 35
    user.regTime = +new Date();
    user.registered = true;

    // Crear número de serie
    const sn = createHash('md5').update(m.sender).digest('hex');

    // Obtener la fecha y hora actuales
    const date = new Date();
    const fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const hora = date.toTimeString().split(' ')[0];

    // Construir el mensaje de registro
    const mensaje = `
[ ✅ REGISTRO COMPLETADO ]

◉ Nombre: ${taguser}
◉ Edad: ${user.age}
◉ Hora: ${hora}
◉ Fecha: ${fecha}
◉ Número: wa.me/${m.sender.split('@')[0]}
◉ Número de serie: ${sn}

🎁 Recompensa:
⤷ 2 diamante 💎
⤷ 200 exp

◉ Para ver los comandos del bot usar:
/menu

◉ Total de usuarios registrados: ${Object.keys(global.db.data.users).filter(user => global.db.data.users[user].registered).length}
`;

    // Incrementar las recompensas del usuario
    user.money = (user.money || 0) + 200;
    user.exp = (user.exp || 0) + 200;

    // Enviar el mensaje de registro
    await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
};

handler.help = ['autoverificar'];
handler.tags = ['xp'];
handler.command = /^(autoverificar)$/i;

export default handler;
