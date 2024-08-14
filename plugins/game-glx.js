// GALAXIA GAME UNDER DEVELOPMENT -- Launching soon...
// By https://github.com/jeffersonalionco

import fs from 'fs-extra'
import simpleGit from 'simple-git'

const handler = async (m, { conn, args, usedPrefix, command }) => {
    createDataBase() // Criar arquivo DataBase se caso não existir
    atualizarRepositorio() // Verificar se precisa atualizar, consultando a api em https://github.com/jeffersonalionco/database-galaxia/blob/master/database.json

    let infoDataHora = new Date()
    let horasEminutosAtual = `${infoDataHora.getHours()}:${infoDataHora.getMinutes()}`
    let horaAtual = infoDataHora.getHours()
    let minutoAtual = infoDataHora.getMinutes()

    let id
    if (m.chat) { id = m.chat } else { id = m.sender } // Definindo o id do chat em que esta conversando

    let argumento = args[0]
    if (argumento != null && argumento != undefined) { argumento.toLowerCase() }
    let argumento1 = args[1]
    if (argumento1 != null && argumento1 != undefined) { argumento1.toLowerCase() }
    let argumento2 = args[2]
    if (argumento2 != null && argumento2 != undefined) { argumento2.toLowerCase() }

    try {

        // Lendo banco de dados do Bot e do GAME
        let data = global.db.data.users[m.sender].gameglx
        let db = JSON.parse(fs.readFileSync(`./src/glx/db/database.json`))

        setInterval(() => {
            verificacaoXp() // Fica verificando se o  xp do jogador

        }, 5000)



        if (args[0] === null || args[0] === undefined) {
            criarGrupo() // Verifica se os grupos para o jogo funcionar foi criado, se nao for ele cria automaticamente.



            const str = `*╔═ 🪐JUEGO DE LA GALAXIA🪐 ═╗*

 👨‍🚀 Hola *${m.pushName}*, ¡es hora de viajar por el espacio, minar asteroides, conversar con alienígenas y mucho más en el mundo galáctico!

  *💰 Moneda:* ${data.perfil.carteira.currency}


  *🌠 ${usedPrefix}glx _registrarse_*
  _Para registrarse en GLX_
  
  *🌠 ${usedPrefix}glx _perfil_*
  _Ve tus datos y tu evolución._
  


> 🧾 Ataques / Defensa / Viajar

  *🌠 ${usedPrefix}glx _atacar lista_*
  _Para listar todos los jugadores del juego!_

  *🌠 ${usedPrefix}glx _atacar <nombre_de_usuario>_*
  _Ataca a un usuario informando su nombre de usuario!_

  *🌠 ${usedPrefix}glx _planeta_*
  _Actualizar datos del Planeta y Colonia_

  *🌠 ${usedPrefix}glx _viajar_*
  _¿Quieres visitar otro Planeta? ¡Vamos!_

> 🧾 Opciones de Minería

*🌠 ${usedPrefix}glx _minar_*
_¿Quieres ganar dinero? Vamos a minar._



> 🧾 Tu información Personal

  *🌠 ${usedPrefix}glx _cartera_*
  _Accede a tu cartera financiera._

  *🌠 ${usedPrefix}glx _tienda_*
  _Conoce nuestra tienda de la galaxia_

  *🌠 ${usedPrefix}glx _baúl_*
  _Ve tus ítems guardados_

 


  *🌟 ${usedPrefix}glx _creador_*
  _Información del creador del juego.._

  *🌟 ${usedPrefix}glx _sobre_*
  _Sobre el juego Galaxia_

  _Novedades Actualización automática_
  _Dudas, ponte en contacto_

  
*╘═══════════════════╛*
  🌞🌕🌠🌟⭐🌎🪐
`
            let glx_menu = fs.readFileSync('./src/glx_menu.jpg')
            const selo1234 = { 'key': { 'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo' }, 'message': { 'contactMessage': { 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, 'participant': '0@s.whatsapp.net' };
            const idmessage = await conn.sendMessage(m.chat, { image: glx_menu, caption: str.trim() }, { quoted: selo1234 });
            const reactionMessage = { react: { text: "👨‍🚀", key: idmessage.key } }


            await conn.sendMessage(m.chat, reactionMessage)


        } else {

            criarGrupo() // verifica grupos do jogo

            if (data.status === false) {


                switch (argumento.toLowerCase()) {
                    case "cadastrar":
                        // Dados essenciais para o jogo rodar corretamente.
                        data.status = true; // Ativa o cadastro dos jogadores
                        data.perfil.nome = m.pushName // Salva o nome padrão do whatsapp no game
                        data.perfil.id = m.sender // salva o id do whatsapp do gamer

                        // Defindo a casa como padrão
                        data.perfil.casa.id = db.planetas.terra.id // Id Planeta Padrão para novos Jogadores
                        data.perfil.casa.planeta = db.planetas.terra.nomeplaneta // Nome Planeta Padrão para novos Jogadores
                        data.perfil.casa.colonia.nome = db.planetas.terra.colonias.colonia1.nome // Colonia Padrão para novos Jogadores
                        data.perfil.casa.colonia.id = db.planetas.terra.colonias.colonia1.id //  Definir o id do grupo padrão
                        data.perfil.casa.idpelonome = db.planetas.terra.idpelonome // Defini o id pelo nome padrao do sistema
                        db.planetas.terra.habitantes.push(m.sender) // Adiciona o usuario como habitante do planeta terra

                        // Alterando a Localização do usuario ndentro de Global
                        data.perfil.localizacao.status = true;
                        data.perfil.localizacao.nomeplaneta = db.planetas.terra.nomeplaneta;
                        data.perfil.localizacao.id = db.planetas.terra.id;
                        data.perfil.localizacao.idpelonome = db.planetas.terra.idpelonome;

                        // Cadastrar Username e salvar no db, e data
                        let numb = await fNumeroAleatorio(3000, 1)
                        data.perfil.username = `user${numb}`
                        if (!db.user_cadastrado.username.includes(data.perfil.username)) {
                            let dados = {
                                id: data.perfil.id,
                                username: data.perfil.username
                            }
                            db.user_cadastrado.username.push(dados)
                        }


                        // Adiciona o usuario na lista de cadastrado no jogo, e como habitante da colonia na terra
                        // Somente se o usuario não estiver na lista. ele retorna false
                        if (!db.user_cadastrado.lista.includes(m.sender)) {
                            db.planetas.terra.colonias.colonia1.habitantes.push(m.sender)
                            db.user_cadastrado.lista.push(m.sender)

                            fs.writeFileSync(`./src/glx/db/database.json`, JSON.stringify(db)) // Escreve os dados no arquivo
                        }

                        let status = data.status === true ? 'Ativo' : 'Desativado'
                        let nave = data.perfil.bolsa.naves.status === true ? 'Sim' : 'Não' // Se o usuario ja tem alguma nave ou não
                        let username = data.perfil.username === null ? 'Sem username' : `@${data.perfil.username}` // se o usuario ja tem username

                        let maxX = db.planetas.terra.colonias.colonia1.localizacao.x + 150 // Define a area da colonia
                        let minX = db.planetas.terra.colonias.colonia1.localizacao.x - 1   // Define a area da colonia
                        let maxY = db.planetas.terra.colonias.colonia1.localizacao.y + 150 // Define a area da colonia
                        let minY = db.planetas.terra.colonias.colonia1.localizacao.y - 1   // Define a area da colonia

                        cadastrarPosicaoNoMapa(maxX, minX, maxY, minY, 'terra', 'colonia1') // Sortea uma posição para o usuario no mapa e cadastra
                        conn.groupParticipantsUpdate(db.planetas.terra.id, [m.sender], "add") // Adiciona o usuario no grupo terra pela primeira vez


                        enviar(`*_⚔️ AHORA ERES UN MIEMBRO ESTELAR 🪐_*

Tu información en el Mundo de la Galaxia!

*🧑Nombre: _${m.pushName}_*
*🌐Nombre de usuario: _${username}_*
*⏹️Estado: _${status}_* 
*🚀¿Tienes Nave?: _${nave}_*

\`\`\`🏠 ¿Dónde vives?:\`\`\`
*🪐Tu Planeta: _${data.perfil.casa.planeta}_*
*🏠Colonia: _${data.perfil.casa.colonia.nome}_*

Comandos de Configuración:
*${usedPrefix}glx set name* - prueba
*${usedPrefix}glx set username* - prueba

Comandos GLX en los Grupos (planeta):
*${usedPrefix}glx planeta act* - Actualizar datos de la colonia.

╔════════════════════╗

 *_⚙️ TODOS LOS COMANDOS_*
Usa: ${usedPrefix}glx

╚════════════════════╝

*_🛸 JUEGO GALAXIA 🛸_*
`)
                        /**
                         * APENAS USO DESENVOLVERDOR
                         */
                        conn.sendMessage('554598306644@s.whatsapp.net', { text: `Nuevo usuario registrado: \n\nId: ${data.perfil.id} \n\nNombre: ${data.perfil.id}`})
break;
default:

enviar10s(`_😢Necesitas registrarte en el juego_ \n\n> Usa *${usedPrefix}glx registrar* \n_Para registrarte._\n\n😁 *Regístrate pronto, no pierdas tiempo.*`)
break;
}

} else if (data.status === true) {
    notificacao() // Notificaciones de cambios en el código.
    switch (argumento.toLowerCase()) {
        case 'registrar':
            enviar10s(`_😁 Hola *${m.pushName}*, ya estás registrado._`)
            break
        case "viajar":
            if (data.perfil.bolsa.naves.status === false) return enviar10s(`*( ❌ ) No tienes nave* \n\n Utiliza *${usedPrefix}glx comprar nave n1* - ¡Para comprar tu primera nave!\n\n_O para ver otros modelos en la 🏪tienda utiliza_ *${usedPrefix}glx tienda*`)
            switch (argumento1) {
                case "tierra":
                    if (data.perfil.casa.id === db.planetas[argumento1].id) return enviar10s(`*${data.perfil.casa.planeta}* _⚠️ Este planeta es tu casa, y ya estás en él_`)
                    entrarplaneta('tierra') // No cambies el nombre
                    break;
                case "megatron":
                    if (data.perfil.casa.id === db.planetas[argumento1].id) return enviar10s(`*${data.perfil.casa.planeta}* _⚠️ Este planeta es tu casa, y ya estás en él_`)
                    entrarplaneta(argumento1.toLowerCase())
                    break;
                case 'casa':
                    data.perfil.localizacao.viajando = false;
                    conn.groupParticipantsUpdate(data.perfil.casa.id, [m.sender], "add")
                    enviar(` 😉 *¡Hola!!!* de vuelta ${m.pushName}`, null, data.perfil.casa.id)
                    enviar(`${m.pushName} _¡Estás en la Tierra de nuevo 😉!_ `, null, id)
                    break;
                default: // Predeterminado al enviar entrar

                                let str = `
╔════════════════════╗

*LUGARES PARA TI VIAJAR*

> --- PLANETAS    
*✈️ ${usedPrefix}glx viajar tierra*
_Un planeta hermoso y bonito!_

*✈️ ${usedPrefix}glx viajar megatron*
_Un planeta hostil con características agresivas!_




> --- COMANDOS ÚTILES
*⚙️ ${usedPrefix}glx viajar casa*
_Si tu nave se descompone, usa este comando para regresar_




 *_⚙️ TODOS LOS COMANDOS_*
Usa: ${usedPrefix}glx

╚════════════════════╝

*_🛸 JUEGO GALAXIA 🛸_*

                            `
                                enviar(str)
                                break;

                        }
                        break;
                    case 'comprar':
                    case 'loja':
                        switch (argumento1) { /** Verifica qual item avi comprar */
                            case 'nave':
                                switch (argumento2) {/*Comprar Naves */
                                    case 'n1':
                                        // if (data.perfil.nave.status === true) return m.reply(`_{ ! } Você ja comprou esta nave!_`)
                                        comprarnave(argumento2)
                                        break;
                                    case "n2":
                                        // if (data.perfil.nave.status === true) return m.reply(`_{ ! } Você ja comprou esta nave!_`)
                                        comprarnave(argumento2)
                                        break;
                                    default:
                                       m.reply(`*--- 🏪 TIENDA - MODELOS DE NAVE ---*
\n_Modelos:_
 *➥ n1* - NAVE N1
 💨 Velocidad: *${db.naves.n1.velocidade}*
 ⚡ Poder de Combate: *${db.naves.n1.poder}*
 🎮(XP) de la Nave: *(${db.naves.n1.xp})*
 💸Valor de la nave: *${valorFormatado(db.naves.n1.valor)}*


 *➥ n2* - NAVE N2
 💨 Velocidad: *${db.naves.n2.velocidade}*
 ⚡ Poder de Combate: *${db.naves.n2.poder}*
 🎮(XP) de la Nave: *(${db.naves.n2.xp})*
 💸Valor de la nave: *${valorFormatado(db.naves.n2.valor)}*


 *➥ n3* - NAVE N3
 💨 Velocidad: *${db.naves.n3.velocidade}*
 ⚡ Poder de Combate: *${db.naves.n3.poder}*
 🎮(XP) de la Nave: *(${db.naves.n3.xp})*
 💸Valor de la nave: *${valorFormatado(db.naves.n3.valor)}*

 Ejemplo de uso: *${usedPrefix}glx comprar nave n1*


 *_⚙️ TODOS LOS COMANDOS_*
Usa: ${usedPrefix}glx

╚════════════════════╝

*_🛸 JUEGO GALAXIA 🛸_*

`)

break;
}
break;

default:
    m.reply(`*--- 🏪 TIENDA DE LA GALAXIA ---*
    
_Categorías:_
↳ nave


Ej: Para ver las naves:
*${usedPrefix}glx tienda nave*

Ej: Comprar una nave:
*${usedPrefix}glx comprar nave n1*


╔════════════════════╗

 *_⚙️ TODOS LOS COMANDOS_*
Usa: ${usedPrefix}glx

╚════════════════════╝

*_🛸 JUEGO GALAXIA 🛸_*

`)
    break;
}
break;
case "cartera":
    if (m.isGroup === true) return enviar10s(`Este comando solo puede usarse en Privado`)
    let img = './src/glx/cartera.jpeg'
    let str = `*-- 💴 CARTERA FINANCIERA --* 
   
_ℹ️ Tu Información:_
*🏧Saldo:* ${valorFormatado(data.perfil.carteira.saldo)}

_¿Quieres Ganar Dinero?_
Usa ${usedPrefix}glx vender


╔════════════════════╗

 *_⚙️ TODOS LOS COMANDOS_*
Usa: ${usedPrefix}glx

╚════════════════════╝

*_🛸 JUEGO GALAXIA 🛸_*`)

                        enviar(str, img)

                        break;
                    case 'planeta':
                        switch (argumento1) {
                            case 'act':
                                const colônias = db.planetas[data.perfil.casa.idpelonome].colonias
                                console.log(db.planetas[data.perfil.casa.idpelonome])
                                let dadoscolonias = ``
                                let Moradores1 = []
                                let Moradores2 = []




                                let str = `*Dados do planeta ${data.perfil.casa.planeta}*

*🏠Colonias em crescimento:*
${listarNomesColônias(data.perfil.casa.idpelonome)}

${dadoscolonias1()}


╔════════════════════╗

 *_⚙️ TODOS OS COMANDOS_*
Use: ${usedPrefix}glx

╚════════════════════╝

*_🛸  GAME GALAXIA 🛸_*

`

                                function dadoscolonias1() {
                                    for (let i = 0; i < Object.keys(colônias).length; i++) {
                                        const nomeColônia = colônias[Object.keys(colônias)[i]].nome;
                                        const habitantes = colônias[Object.keys(colônias)[i]].habitantes;

                                        let Moradores = '*- Moradores:*\n'
                                        Moradores += `Total: ${habitantes.length}\n`

                                        for (let j = 0; j < habitantes.length; j++) {
                                            let your = ' '

                                            let numberr
                                            numberr = habitantes[j].replace(/\D/g, '')
                                            Moradores1.push(numberr)
                                            Moradores2.push(habitantes[j])

                                            if (habitantes[j] === m.sender) {
                                                your = ` *Você* `
                                            }
                                            Moradores += `➣ ${your}@${numberr}\n`
                                            if (habitantes.length) {

                                            }
                                        }

                                        dadoscolonias += `*${nomeColônia}*
${Moradores}
    
`
                                    }
                                    return dadoscolonias
                                }
                                function listarNomesColônias(planeta) {

                                    const colônias = db.planetas[planeta].colonias;
                                    const nomesColônias = Object.keys(colônias).map(nome => colônias[nome].nome);
                                    return nomesColônias.join("\n");
                                }

                                conn.sendMessage(id, { text: str, mentions: Moradores2 })

                               break;
case 'salir':
    if (!m.isGroup) return m.reply(` Este comando solo puede usarse en grupos`)
    if (id != data.perfil.casa.id) {
        data.perfil.localizacao.viajando = false;
        conn.groupParticipantsUpdate(id, [m.sender], "remove")
        conn.groupParticipantsUpdate(data.perfil.casa.id, [m.sender], "add")
        conn.sendMessage(data.perfil.casa.id, { text: `_¡Bienvenido a tu casa!_` })
        conn.sendMessage(m.sender, { text: `_¡Bienvenido a tu casa!_` })
    }
    break;
default:
    let strr = `Opciones:\n\nACT\nSALIR `
    m.reply(`Esto no existe en la colonia`)
    break;
}
break;
case 'bolsa':
case 'baúl':
    let bolsa = data.perfil.bolsa
    let itens = Object.keys(bolsa.itens)
    let listaItens = ''
    let texto = ""

    for (let i = 0; i < itens.length; i++) {
        listaItens += `*• _${itens[i]}_*  ➡︎ [ ${data.perfil.bolsa.itens[itens[i]]} ] \n`
    }

    texto = `╔═════════👜═════════╗\n\n*_📝 - TODOS LOS ÍTEMS_*\n\n> ⛏️ MINERÍA:\n${listaItens}
 - ¿Quieres vender tus ítems?
 Usa *${usedPrefix}glx vender oro 10*                    



 *_⚙️ TODOS LOS COMANDOS_*
Usa: ${usedPrefix}glx


*_🛸 JUEGO GALAXIA 🛸_*

  ╚═════════👜═════════╝`

                        enviar(texto, "./src/glx/bau.jpg")


                        break;
                    case 'vender':
                        switch (argumento1) {
                            case 'madeira':
                                vender(argumento1, argumento2)
                                break
                            case 'ferro':
                                vender(argumento1, argumento2)
                                break
                            case 'diamante':
                                vender(argumento1, argumento2)
                                break
                            case 'esmeralda':
                                vender(argumento1, argumento2)
                                break
                            case 'carvao':
                                vender(argumento1, argumento2)
                                break
                            case 'ouro':
                                vender(argumento1, argumento2)
                                break
                            case 'quartzo':
                                vender(argumento1, argumento2)
                                break
                            default:
                                let str = `* 🏪 TIENDA DE EMBARGOS*

_Revisa los ítems que pueden ser vendidos_

▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅
> ÍTEMS DE MINERÍA ⤵

🛠️ *${usedPrefix}glx vender madera 1*
 - Valor Unitario: ${valorFormatado(db.itens.mineracao['madeira'].valorVenda)}
                                
 🛠️ *${usedPrefix}glx vender hierro 1*
- Valor Unitario: ${valorFormatado(db.itens.mineracao['ferro'].valorVenda)}
                                
🛠️ *${usedPrefix}glx vender diamante 1*
- Valor Unitario: ${valorFormatado(db.itens.mineracao['diamante'].valorVenda)}
                                
🛠️ *${usedPrefix}glx vender esmeralda 1*
- Valor Unitario: ${valorFormatado(db.itens.mineracao['esmeralda'].valorVenda)} 

🛠️ *${usedPrefix}glx vender carbón 1*
- Valor Unitario: ${valorFormatado(db.itens.mineracao['carvao'].valorVenda)}
                                
🛠️ *${usedPrefix}glx vender oro 1*
- Valor Unitario: ${valorFormatado(db.itens.mineracao['ouro'].valorVenda)}
                                
🛠️ *${usedPrefix}glx vender cuarzo 1*
- Valor Unitario: ${valorFormatado(db.itens.mineracao['quartzo'].valorVenda)}
 
▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅


╔════════════════════╗

 *_⚙️ TODOS LOS COMANDOS_*
Usa: ${usedPrefix}glx

╚════════════════════╝

*_🛸 JUEGO GALAXIA 🛸_*



                                `
                                enviar(str, './src/glx/transacao.jpg')
                                break;
                        }
                        break;
                    case 'miner':
                        if (argumento1 != null && argumento1 != undefined) { argumento1.toLowerCase() } else { argumento1 }
                        switch (argumento1) {
                            case 'parar':
                                data.perfil.minerando = false
                                m.reply(`*Mineração encerrada*`)
                                break
                            case 'madeira':
                                minerar(argumento1)
                                break
                            case 'ferro':
                                minerar(argumento1)
                                break
                            case 'diamante':
                                minerar(argumento1)
                                break
                            case 'esmeralda':
                                minerar(argumento1)
                                break
                            case 'carvao':
                                minerar(argumento1)
                                break
                            case 'ouro':
                                minerar(argumento1)
                                break
                            case 'quartzo':
                                minerar(argumento1)
                                break
                            default:
                                let funcoes = `
*🌳${usedPrefix}glx miner parar*
_Usa solo para detener una minería_
                                `
let itens = `
*🌳${usedPrefix}glx miner madera*
_Uno de los principales minerales, para vender o construir casas._ 

*🔩${usedPrefix}glx miner hierro*
_Minero usado para vender y comprar naves._

*💎${usedPrefix}glx miner diamante*
_Minero muy importante para ganar Dinero._

*🟢${usedPrefix}glx miner esmeralda*
_Minero muy importante para ganar Dinero._

*⚫${usedPrefix}glx miner carbón*
_Otimo para venta, combustible o Fuegos._

*🟡${usedPrefix}glx miner oro*
_Minero de alto valor para comercio_

 *⚪${usedPrefix}glx miner cuarzo*
 _Minero de alto valor para comercio_
                           `
enviar(`⛏️ *Opciones para Minería* ⚒️
                                
> ⚙️ *Configuraciones*
${funcoes}

> ⛏️ *Minerales*${itens}


╔════════════════════╗

 *_⚙️ TODOS LOS COMANDOS_*
Usa: ${usedPrefix}glx

╚════════════════════╝

*_🛸 JUEGO GALAXIA 🛸_*

`, "./src/glx/miner.jpg")
break;
}
break;
case 'mapa':
    enviar(`*Mapa* _ha sido desactivado en el juego, debido a un error en Debiam_`)
    break;
case 'perfil':
    let nave = data.perfil.nave.nome ? data.perfil.nave.nome : 'No tiene Nave'
    let strr = `*_🤖 ${data.perfil.nome} ¡Tu Perfil!_*

Estas son tus informaciones del juego \`\`\`GALAXIA\`\`\`.

_💡No olvides minar, *${usedPrefix}glx miner* esto aumenta tu XP y tu Fuerza._

*🆙 XP:* _${data.perfil.xp} XP_
    *Próximo Nivel:* _${db.api.niveis[`nivel${data.perfil.nivel.proximoNivel}`].totalXp} XP_

*📈 Nivel:* _${data.perfil.nivel.nome}_
*💪 Poder [Fuerza]:* _${data.perfil.poder}_ P
*⚔️ Poder Ataque:* _${data.perfil.ataque.forcaAtaque.ataque}_ P
*🛡️ Poder Defensa:* _${data.perfil.defesa.forca}_ P
*🌀 Username:* _${data.perfil.username}_

*🗣️ Idioma:* _${data.perfil.idioma}_
*💰 Moneda:* _${data.perfil.carteira.currency}_

*🌏 Planeta:* _${data.perfil.casa.planeta}_
*🏠 Colonia:* _${data.perfil.casa.colonia.nome}_

*🛸 Tu nave Actual:* _${nave}_



*_⚙️ TODOS LOS COMANDOS_*
Usa: ${usedPrefix}glx

`

// Función para generar la imagen del perfil después de 3s se borra automáticamente
setTimeout(() => {
    enviar(strr, `./src/glx/perfil.png`)
}, 1000)

break;
case 'criador':
    let msgcriador = `🛈 *INFORMACIONES SOBRE EL CREADOR:*\n\n👨 *_Creador del juego Galáxia:_*\nhttps://github.com/jeffersonalionco\n\n👨 *_Creador del BOT:_*\nhttps://github.com/BrunoSobrino`
    enviar(msgcriador)
    break;
case 'atacar':
    switch (argumento1) {
        case 'list':
            let strr = `*_📚--- LISTA DE USUARIOS ---📚_*\n\n*Utiliza:*\n${usedPrefix}glx atacar *<USERNAME>* - _Para atacar a un jugador!_\n\n`
            let mentionss = []
            for (let i = 0; i < db.user_cadastrado.username.length; i++) {
                let db1 = global.db.data.users[db.user_cadastrado.username[i].id].gameglx
                let number = db.user_cadastrado.username[i].id.replace(/\D/g, '')

                strr += `👨‍🚀 *Nombre:* ${db1.perfil.nome} \n*🔎 Username:* ${db.user_cadastrado.username[i].username}\n*✍ Usuario:* @${number}\n______________________\n\n`
                mentionss.push(db.user_cadastrado.username[i].id)
            }
            conn.sendMessage(data.perfil.id, { text: strr, mentions: mentionss })
            break;
        default:

            atacar(argumento1)

            break
    }


                        break
                   case 'sobre':
    let sobre = `
_Bienvenido a la opción de ayuda de_ *GALAXIA*

*Objetivo del Juego*
El objetivo del juego es crear un mundo abierto donde los jugadores puedan extraer ítems y luego venderlos para ganar dinero. Con el dinero ganado, los jugadores pueden comprar ítems dentro del juego para fortalecerse y, posteriormente, atacar a otros jugadores.

> *Pasos del Juego*
*Exploración:* Navega por el mundo abierto y encuentra lugares de minería.
*Minería:* Extrae diversos ítems valiosos del suelo.
*Venta de Ítems:* Vende los ítems extraídos para obtener dinero. 
*Compra de Ítems:* Usa el dinero para comprar equipos e ítems que aumenten tu poder.
*Combate:* Con ítems más fuertes, enfrenta y ataca a otros jugadores.

> *Consejos*
    - Explora diferentes áreas para encontrar los mejores lugares de minería.
    - Invierte en equipos que aumenten tu eficiencia de minería.
    - Equilibra tu dinero entre la compra de ítems de ataque y defensa.
    - Forma alianzas con otros jugadores para protección y mejores oportunidades de comercio.

¡Diviértete extrayendo, negociando y luchando para convertirte en el más fuerte en el mundo abierto!
    `
    enviar(sobre)
    break;

                        enviar(sobre)
                        break
                    default:
                        m.reply(`*[!]* Opção *${args[0]}* não existe!`)
                        break
                }

            }

        }

        //-----------------------------------------------------------------------------------------------------------------
        // --------------------------- FUNÇÕES PARA O GAME GALÁXIA --------------------------------------------------------
        //-----------------------------------------------------------------------------------------------------------------

        async function entrarplaneta(nomeplaneta) {
    if (data.perfil.localizacao.viajando === true) {
        return m.reply(`_Eh, ya estás viajando. Espera a que termine o envía_ *${usedPrefix}glx viajar casa*`);
    }

    // Estado para viajando
    data.perfil.localizacao.viajando = true;

    // Todos los Tiempos
    let tiempoenla ciudad = 30000;
    let tiempodeviaje = data.perfil.nave.velocidade * 1000;

    // Alterando la Localización del usuario
    data.perfil.localizacao.status = true;
    data.perfil.localizacao.nomeplaneta = db.planetas[nomeplaneta].nomeplaneta;
    data.perfil.localizacao.id = db.planetas[nomeplaneta].id;
    data.perfil.localizacao.idpelonome = db.planetas[nomeplaneta].idpelonome;

    // Informando si es un visitante o no
    if (data.perfil.casa.planeta === nomeplaneta) {
        m.reply(`*${nomeplaneta} ya es tu hogar!*`);
    } else {
        db.planetas[nomeplaneta].colonias.colonia1.visitantes.push(id);
        fs.writeFileSync(`./src/glx/db/database.json`, JSON.stringify(db));
    }

    const messageId1 = await conn.sendMessage(
        id, {
            video: fs.readFileSync("./src/glx/viajando.mp4"),
            caption: `¡Viajando al planeta ${nomeplaneta}!! Espera *${data.perfil.nave.velocidade}* segundos`,
            gifPlayback: true
        }
    );

    setTimeout(() => {
        let str = `*🌎 BIENVENIDO(A) A ${nomeplaneta.toUpperCase()} 🌎*
                
_¡Has sido añadido al grupo del planeta!_
                
\`\`\`Si estás en privado, sal y ve al planeta Tierra\`\`\`

╔════════════════════╗

 *_⚙️ TODOS LOS COMANDOS_*
Usa: ${usedPrefix}glx

╚════════════════════╝

*_🛸 JUEGO GALAXIA 🛸_*
`

                let img = "./src/glx/base_terra.webp"

               conn.sendMessage(db.planetas[nomeplaneta].id, { text: str });
conn.sendMessage(id, { text: `Ya has llegado al planeta ${nomeplaneta}, puedes empezar a aventurarte` });

conn.sendMessage(id, { delete: messageId1 });
conn.groupParticipantsUpdate(db.planetas[nomeplaneta].id, [m.sender], "add"); // Reemplaza este parámetro con "remove", "demote" o "promote"

setTimeout(() => {
    // Remover el estado de Viajando a Falso
    data.perfil.localizacao.viajando = false;

    // Eliminando de la lista de visitantes
    let index = db.planetas[nomeplaneta].colonias.colonia1.visitantes.indexOf(id);
    db.planetas[nomeplaneta].colonias.colonia1.visitantes.splice(index, 1);
    fs.writeFileSync(`./src/glx/db/database.json`, JSON.stringify(db));

    conn.reply(data.perfil.id, `*_El tiempo de tu nave en el planeta ${data.perfil.localizacao.nomeplaneta} ha terminado, ¡ahora tu nave ha vuelto al espacio!*`, m);

    data.perfil.localizacao.status = false;
    data.perfil.localizacao.nomeplaneta = data.perfil.casa.planeta;
    data.perfil.localizacao.id = data.perfil.casa.id;
    data.perfil.localizacao.idpelonome = data.perfil.casa.planeta;

    setTimeout(() => {
        conn.groupParticipantsUpdate(db.planetas[nomeplaneta].id, [m.sender], "remove");
    }, 3000);
}, tiempoenla ciudad); // Tiempo que la nave estará en la ciudad

}, tiempodeviaje); // Tiempo de viaje según la nave del jugador

async function comprarnave(modelo) {
    // Verificar si el saldo es suficiente para comprar la nave elegida
    if (data.perfil.bolsa.naves.compradas.includes(modelo)) {
        return m.reply(`_😊 ¡Wow, ya tienes esta nave! Usa *${usedPrefix}glx comprar nave* para ver otros modelos._`);
    }
    if ((data.perfil.carteira.saldo - db.naves[modelo.toLowerCase()].valor) <= 0) {
        return m.reply(`_😪 ${data.perfil.nome}! No tienes suficiente saldo._ \n\n*Tu Saldo:* ${valorFormatado(data.perfil.carteira.saldo)}\n*Valor de la nave ${modelo}:* ${valorFormatado(db.naves[modelo].valor)}\n\nVende tus minerales para ganar dinero. Usa Ej: *${usedPrefix}glx vender oro 2*`);
    }
}

            let poderantigo = db.naves[modelo.toLowerCase()].poder // Variavel pegando o poder antes de ser alterado para a soma com o poder da nave
            let saldo = data.perfil.carteira.saldo - db.naves[modelo.toLowerCase()].valor // Descontando o valor da nave
            data.perfil.carteira.saldo = saldo // Alternado o saldo na carteira

            data.perfil.bolsa.naves.status = true // Definindo se tem nave
            data.perfil.bolsa.naves.compradas.push(modelo) // Adicionando a nave como comprados.
            fs.writeFileSync('./database.json', JSON.stringify(data))

            data.perfil.nave.id = db.naves[modelo.toLowerCase()].id
            data.perfil.nave.nome = db.naves[modelo.toLowerCase()].nome
            data.perfil.nave.velocidade = db.naves[modelo.toLowerCase()].velocidade
            data.perfil.nave.poder = db.naves[modelo.toLowerCase()].poder
            data.perfil.nave.valor = db.naves[modelo.toLowerCase()].valor
            data.perfil.poder += db.naves[modelo.toLowerCase()].poder // Somando o poder da nave ao poder do usuario





            let img = "./src/glx/img_padrao.png"
let str = `
_¡Has comprado la nave_ *${data.perfil.nave.nome}*_

💨 Velocidad: *${db.naves[modelo.toLowerCase()].velocidade}*
⚡ Poder de Combate: *${db.naves[modelo.toLowerCase()].poder}*
💸 Valor de la nave: *${db.naves[modelo.toLowerCase()].valor}*

*⚡-👑 Tu Poder ha aumentado:*
_De_ *${poderantigo}* _A_ *${data.perfil.poder}*


╔════════════════════╗

 *_⚙️ TODOS LOS COMANDOS_*
Usa: ${usedPrefix}glx

╚════════════════════╝

*_🛸  JUEGO GALAXIA 🛸_*

_Borrado automático en 20s_

`
            const messageId = await enviar(str, img) // Enviando a mensagem se tudo estiver certo

            setTimeout(() => {

                conn.sendMessage(m.sender, { delete: messageId });
            }, 15000)
        }



      async function enviar10s(texto) {
    const messageId = await m.reply(texto + `\n\n_🔋 Eliminación automática en 10s_`);
    setTimeout(() => {
        conn.sendMessage(m.sender, { delete: messageId });
    }, 10000);
}

async function enviar(texto, img, aux_id) {
    if (aux_id === null || aux_id === undefined) { aux_id = id; } // Definir el ID por defecto si no se proporciona
    if (img === null || img === undefined) { img = './src/glx/img_padrao.png'; }

    let glx_menu = fs.readFileSync(img);
    const selo = {
        'key': { 'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo' },
        'message': { 'contactMessage': { 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } },
        'participant': '0@s.whatsapp.net'
    };
    const messageId = await conn.sendMessage(aux_id, { image: glx_menu, caption: texto.trim() }, { quoted: selo });
    return messageId;
}

async function minerar(item) {
    if (m.isGroup && id != data.perfil.casa.id) return m.reply(`\n> [ ! ] ERROR - AVISO \n\n_Solo puedes minar en el planeta_ *(${data.perfil.casa.planeta})*`);
    if (data.perfil.minerando === true) return m.reply(`_¡Ya estás minando! Si deseas detener, usa *${usedPrefix}glx miner parar*_`);

    let tiempoEdicion = db.itens.mineracao[item].tempoMineracao / 1000;
    let porcentaje = 0;
    let messageId = await m.reply(`*Minando... ⟲[0%]*`);
    data.perfil.minerando = true; // Cambia a estado minando

    function actualizar() {
        porcentaje += 10;
        if (porcentaje < 100) {
            conn.sendMessage(id, { text: `*Minando... [⟲ ${porcentaje}%]*`, edit: messageId.key });
        } else if (porcentaje === 100) {
            conn.sendMessage(id, { text: `*Procesando... [${porcentaje}%] ⟲ Espera*`, edit: messageId.key });
        }
    }
    let cargando = setInterval(actualizar, 1000);
    const poderGenerado = await fNumeroAleatorio(10, 5); // Generar un número entre 5 y 10

    setTimeout(() => {
        clearInterval(cargando);
        data.perfil.bolsa.itens[item] += db.itens.mineracao[item].quantidadeMinerado; // Añade los ítems minados
        data.perfil.minerando = false; // Desactiva el estado minando
        const numeroAleatorio = Math.floor(Math.random() * (40 - 10 + 1)) + 10; // Generar un número entre 10 y 50
        data.perfil.xp += numeroAleatorio; // Añadiendo un valor aleatorio de XP al nivel del usuario
        data.perfil.poder += poderGenerado; // Añadiendo un nuevo valor de poder generado para el usuario
        data.perfil.poder += db.itens.mineracao[item].poder; // Bono de poder por minería

        conn.sendMessage(id, {
            text: `*⚒️ Minería Concluida [${tiempoEdicion} _Segundos_]*
> Has minado ${db.itens.mineracao[item].quantidadeMinerado} ${item}

_🥳 Ganaste un Bono:_ *${numeroAleatorio} [XP]*
_👑 Tu Poder:_ ${data.perfil.poder}
_⚡ Ganaste:_ ${db.itens.mineracao[item].poder} Puntos (poder)

*Total de ${item}:* [ ${data.perfil.bolsa.itens[item]} ]

*_${usedPrefix}glx bau_* - Para ver tus ítems minados.`, edit: messageId.key
        });
    }, db.itens.mineracao[item].tempoMineracao);
}

function valorFormatado(valor) {
    const valorFormateado = valor.toLocaleString(data.perfil.idioma, { style: 'currency', currency: data.perfil.carteira.currency });
    return valorFormateado;
}

async function vender(argumento1, argumento2) {
    // Argumento 1 = Tipo de mineral que se está vendiendo / argumento 2 la cantidad.
    if (isNaN(argumento2)) return m.reply(`Necesito que indiques la cantidad de ${argumento1} que deseas vender en números`);
    if (argumento2 > data.perfil.bolsa.itens[argumento1]) return m.reply(`_No tienes almacenado_ *[ ${argumento2} ${argumento1} ]* \n\n_Tu Stock actual es:_ *[ ${data.perfil.bolsa.itens[argumento1]} ${argumento1} ]* \n\n Para minar más usa:\n> ${usedPrefix}glx miner`);

    let valorDeVenta = argumento2 * db.itens.mineracao[argumento1].valorVenda;

    let valorDescontado = data.perfil.bolsa.itens[argumento1] - argumento2; // Reducir la cantidad vendida de Minerales
    data.perfil.bolsa.itens[argumento1] = valorDescontado;
    data.perfil.carteira.saldo += valorDeVenta; // Añadiendo nuevo saldo a la cartera

    // Bono XP
    const numeroAleatorio = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
    const poderGenerado = await fNumeroAleatorio(10, 5);

    data.perfil.xp += numeroAleatorio;
    data.perfil.poder += poderGenerado * argumento2;

    enviar(`*_🤝 ¡Felicidades, venta realizada con éxito!_*\n\n*Has vendido: ${argumento2} ${argumento1}*\n*Valor por Unidad: ${valorFormatado(db.itens.mineracao[argumento1].valorVenda)}*\n*Recibiste: ${valorFormatado(valorDeVenta)}*\n\n*🎉 XP Bono: ${numeroAleatorio} XP*\n_👑 Tu Poder:_ ${data.perfil.poder} \n\nPara ver tu *Saldo* usa:\n> ${usedPrefix}glx carteira`, "./src/glx/transacao.jpg");
}

        async function verificacaoXp() {
            /** Esta Função quando chamada, altera o nivel do usuario
             *  1) Se o usuario atingir o XP de cada nivel
             * 
             * O que ele faz se atingir o xp do nivel?
             * 1) Ele defini a nova meta a ser alcançada ( EX:  data.perfil.nivel.proximoNivel += 1 )
             * 2) Altera o Nome do seu nivel anterior para o nivel atual ( EX: data.perfil.nivel.nome = db.api.niveis.nivel1.nome )
             * 3) Envia uma mensagem Personalizado, chamando a função msg() e passando os 3 parametros necessarios. Nome nivel atual, XP Atual, e Nome do proximo nivel
             */
            function msg(nomeNivel, xpAtual, proximoNivel) {
                let str = `
_🚀🎉 ¡Felicidades, Capitán ${data.perfil.nome}! 🎉🚀_

¡Has alcanzado el límite de XP y avanzaste al siguiente nivel en nuestra aventura intergaláctica!

*🌟 Nivel Actual:* ${nomeNivel}
*🎮 XP Actual:* ${xpAtual}
*🎖️ Próximo Nivel:* ${proximoNivel}

💥 Recompensas:
- Ganaste *${db.api.niveis[`nivel${data.perfil.nivel.id}`].defesa}* Puntos de *_Defensa_*.
- Ganaste *${db.api.niveis[`nivel${data.perfil.nivel.id}`].ataque}* Puntos de *_Ataque_*.
- Nuevas habilidades desbloqueadas
- Acceso a áreas secretas en el espacio
- Nuevos aliados intergalácticos

╔════════════════════╗

*_⚙️ TODOS LOS COMANDOS_*
Usa: ${usedPrefix}glx

╚════════════════════╝

*_🛸  JUEGO GALAXIA 🛸_*

`
                enviar(str, './src/glx/parabens.jpg', data.perfil.id) // Envia para o particular do jogador
                enviar(str, './src/glx/parabens.jpg', data.perfil.casa.id) // Envia para o planeta casa do jogador


            }
            if (data.perfil.xp >= db.api.niveis.nivel1.totalXp && data.perfil.nivel.proximoNivel === db.api.niveis.nivel1.id) {

                data.perfil.nivel.proximoNivel += 1 // definido id do proximo nivel
                data.perfil.nivel.id = db.api.niveis.nivel1.id // Defininfo o id atual do nivel
                data.perfil.nivel.nome = db.api.niveis.nivel1.nome
                data.perfil.defesa.forca += db.api.niveis.nivel1.defesa
                data.perfil.defesa.ataque += db.api.niveis.nivel1.ataque
                data.perfil.ataque.forcaAtaque.ataque += data.perfil.defesa.ataque
                msg(db.api.niveis.nivel1.nome, data.perfil.xp, db.api.niveis.nivel2.nome)

            } else if (data.perfil.xp >= db.api.niveis.nivel2.totalXp && data.perfil.nivel.proximoNivel === db.api.niveis.nivel2.id) {

                data.perfil.nivel.proximoNivel += 1 // definido id do proximo nivel
                data.perfil.nivel.id = db.api.niveis.nivel2.id
                data.perfil.nivel.nome = db.api.niveis.nivel2.nome
                data.perfil.defesa.forca += db.api.niveis.nivel2.defesa
                data.perfil.defesa.ataque += db.api.niveis.nivel2.ataque
                data.perfil.ataque.forcaAtaque.ataque += data.perfil.defesa.ataque
                msg(db.api.niveis.nivel2.nome, data.perfil.xp, db.api.niveis.nivel3.nome)

            } else if (data.perfil.xp >= db.api.niveis.nivel3.totalXp && data.perfil.nivel.proximoNivel === db.api.niveis.nivel3.id) {

                data.perfil.nivel.proximoNivel += 1 // definido id do proximo nivel
                data.perfil.nivel.id = db.api.niveis.nivel3.id
                data.perfil.nivel.nome = db.api.niveis.nivel3.nome
                data.perfil.defesa.forca += db.api.niveis.nivel3.defesa
                data.perfil.defesa.ataque += db.api.niveis.nivel3.ataque
                data.perfil.ataque.forcaAtaque.ataque += data.perfil.defesa.ataque
                msg(db.api.niveis.nivel3.nome, data.perfil.xp, db.api.niveis.nivel4.nome)

            } else if (data.perfil.xp >= db.api.niveis.nivel4.totalXp && data.perfil.nivel.proximoNivel === db.api.niveis.nivel4.id) {

                data.perfil.nivel.proximoNivel += 1 // definido id do proximo nivel
                data.perfil.nivel.id = db.api.niveis.nivel4.id
                data.perfil.defesa.forca += db.api.niveis.nivel4.defesa
                data.perfil.defesa.ataque += db.api.niveis.nivel4.ataque
                data.perfil.ataque.forcaAtaque.ataque += data.perfil.defesa.ataque
                data.perfil.nivel.nome = db.api.niveis.nivel4.nome

                msg(db.api.niveis.nivel4.nome, data.perfil.xp, db.api.niveis.nivel5.nome)

            } else if (data.perfil.xp >= db.api.niveis.nivel5.totalXp && data.perfil.nivel.proximoNivel === db.api.niveis.nivel5.id) {

                data.perfil.nivel.proximoNivel += 1 // definido id do proximo nivel
                data.perfil.nivel.id = db.api.niveis.nivel5.id
                data.perfil.defesa.forca += db.api.niveis.nivel5.defesa
                data.perfil.defesa.ataque += db.api.niveis.nivel5.ataque
                data.perfil.ataque.forcaAtaque.ataque += data.perfil.defesa.ataque
                data.perfil.nivel.nome = db.api.niveis.nivel5.nome

                msg(db.api.niveis.nivel5.nome, data.perfil.xp, db.api.niveis.nivel6.nome)

            } else if (data.perfil.xp >= db.api.niveis.nivel6.totalXp && data.perfil.nivel.proximoNivel === db.api.niveis.nivel6.id) {

                data.perfil.nivel.proximoNivel += 1 // definido id do proximo nivel
                data.perfil.nivel.id = db.api.niveis.nivel6.id
                data.perfil.nivel.nome = db.api.niveis.nivel6.nome
                data.perfil.defesa.forca += db.api.niveis.nivel6.defesa
                data.perfil.defesa.ataque += db.api.niveis.nivel6.ataque
                data.perfil.ataque.forcaAtaque.ataque += data.perfil.defesa.ataque
                msg(db.api.niveis.nivel6.nome, data.perfil.xp, db.api.niveis.nivel7.nome)

            } else if (data.perfil.xp >= db.api.niveis.nivel7.totalXp && data.perfil.nivel.proximoNivel === db.api.niveis.nivel7.id) {

                data.perfil.nivel.proximoNivel += 1 // definido id do proximo nivel
                data.perfil.nivel.id = db.api.niveis.nivel7.id
                data.perfil.defesa.forca += db.api.niveis.nivel7.defesa
                data.perfil.defesa.ataque += db.api.niveis.nivel7.ataque
                data.perfil.ataque.forcaAtaque.ataque += data.perfil.defesa.ataque
                data.perfil.nivel.nome = db.api.niveis.nivel7.nome
                msg(db.api.niveis.nivel7.nome, data.perfil.xp, db.api.niveis.nivel8.nome)


            } else if (data.perfil.xp >= db.api.niveis.nivel8.totalXp && data.perfil.nivel.proximoNivel === db.api.niveis.nivel8.id) {

                data.perfil.nivel.proximoNivel += 1 // definido id do proximo nivel
                data.perfil.nivel.id = db.api.niveis.nivel8.id
                data.perfil.nivel.nome = db.api.niveis.nivel8.nome
                data.perfil.defesa.forca += db.api.niveis.nivel8.defesa
                data.perfil.defesa.ataque += db.api.niveis.nivel8.ataque
                data.perfil.ataque.forcaAtaque.ataque += data.perfil.defesa.ataque
                msg(db.api.niveis.nivel8.nome, data.perfil.xp, db.api.niveis.nivel9.nome)

            } else if (data.perfil.xp >= db.api.niveis.nivel9.totalXp && data.perfil.nivel.proximoNivel === db.api.niveis.nivel9.id) {

                data.perfil.nivel.proximoNivel += 1 // definido id do proximo nivel
                data.perfil.nivel.id = db.api.niveis.nivel9.id
                data.perfil.nivel.nome = db.api.niveis.nivel9.nome
                data.perfil.defesa.forca += db.api.niveis.nivel9.defesa
                data.perfil.defesa.ataque += db.api.niveis.nivel9.ataque
                data.perfil.ataque.forcaAtaque.ataque += data.perfil.defesa.ataque
                msg(db.api.niveis.nivel9.nome, data.perfil.xp, db.api.niveis.nivel10.nome)

            } else if (data.perfil.xp >= db.api.niveis.nivel10.totalXp && data.perfil.nivel.proximoNivel === db.api.niveis.nivel10.id) {

                data.perfil.nivel.proximoNivel += 1 // definido id do proximo nivel
                data.perfil.nivel.id = db.api.niveis.nivel10.id
                data.perfil.defesa.forca += db.api.niveis.nivel10.defesa
                data.perfil.defesa.ataque += db.api.niveis.nivel10.ataque
                data.perfil.ataque.forcaAtaque.ataque += data.perfil.defesa.ataque
                data.perfil.nivel.nome = db.api.niveis.nivel10.nome
                msg(db.api.niveis.nivel10.nome, data.perfil.xp, "REI DOS NIVEL")


            }
        }

        async function criarGrupo() {
            /*Esta Função Cria um grupo para cada planeta cadastrado no database do glx. Para realizar esta opeção tem algumas condições para ser seguidas
            1) Só ira criar o grupo se a consulta ao id no database retornar null
            2) Caso o grupo que esteja cadastrado no database, não tenha permisão de adm para o bot, ele criara outro grupo, e adicionara os habitantes

            Depois de Criar um grupo, sera alterado:
            1) o id do planeta de NUll para o novo id do grupo criado no database
            2) Ira adicinar o id do novo grupo ao perfil de cada habitante SE a casa dele for o planeta(Grupo) novo criado.
            3) Ira setar que só adm pode editar conf do grupo
            4) Desativa o welcome dos grupos criados
            
            */
            let erroAdmin = false // So sera usado se o bot não for administrado do grupo planeta
            let idGrupoAntigo  // So sera usado se o bot não for administrado do grupo planeta

            let planetas = Object.keys(db.planetas)
            let nomePlaneta
            let idPlaneta
            let habitantesPlaneta

            for (let i = 0; i < planetas.length; i++) {
                let idd = db.planetas[planetas[i]].id
                if (idd === null) {

                } else {
                    if (await verificacaoAdmin(idd) === false) {
                        erroAdmin = true
                        idGrupoAntigo = db.planetas[planetas[i]].id

                        db.planetas[planetas[i]].id = null
                        fs.writeFileSync('./src/glx/db/database.json', JSON.stringify(db))
                    }

                }

                nomePlaneta = db.planetas[planetas[i]].nomeplaneta
                idPlaneta = db.planetas[planetas[i]].id
                habitantesPlaneta = db.planetas[planetas[i]].habitantes

                if (db.planetas[planetas[i]].id === null) {

                    const group = await conn.groupCreate(nomePlaneta, habitantesPlaneta)
                    await conn.groupUpdateSubject(group.id, `[GAME] Planeta ${nomePlaneta}`) // Alterar o nome 
                    await conn.groupSettingUpdate(group.id, 'locked') // Só administrador pode alterar os dados do grupos
                    await conn.updateProfilePicture(group.id, { url: `${db.planetas[planetas[i]].imgPerfil}` }) // Alterar a imagem do gruppoS

                    global.db.data.chats[group.id].welcome = false; // Desativando Welcome dos grupos
                    db.planetas[planetas[i]].id = group.id // Define o id do planeta como o id do grupo recem criado.
                    fs.writeFileSync('./src/glx/db/database.json', JSON.stringify(db)) // Grava os dados
                    conn.sendMessage(group.id, { text: `hello there ${group.id}` }) //  Envia uma mensagem ao grupoSS

                    if (erroAdmin === true) {
                        // Mensagem para o novo grupo, caso houver erro de admin nos grupos antigos
                        conn.sendMessage(group.id, { text: `_Devido o *[bot]* não ser mais Administrador no grupo antigo, nosso game será continuado aqui!_` })

                    }
                    for (let i = 0; i < habitantesPlaneta.length; i++) {

                        let dataUser = global.db.data.users[habitantesPlaneta[i]].gameglx
                        if (dataUser.perfil.casa.idpelonome === db.planetas[planetas[i]].idpelonome) {
                            //Altera o id do planeta de cada jogador cadastrado naquele Grupo(Planeta)
                            dataUser.perfil.casa.id = group.id
                        }
                    }

                }
            }

            async function verificacaoAdmin(idgrupo) {
                // Faz verificação em um grupo pelo ID se o bot é administrador
                let result = await checkAdmin(idgrupo)
                let resultado
                async function checkAdmin(idd) {
                    const groupMetadata = ((conn.chats[idd] || {}).metadata || await this.groupMetadata(idd).catch((_) => null))
                    for (let i = 0; i < groupMetadata.participants.length; i++) {
                        if (groupMetadata.participants[i].id === conn.user.jid) {
                            return groupMetadata.participants[i].admin
                        }
                    }
                }
                if (result === 'admin') {
                    resultado = true
                } else if (result === 'superadmin') {
                    resultado = true
                } else if (result === null) {
                    resultado = false
                }
                return resultado
            }
        }

        async function cadastrarPosicaoNoMapa(maxX, minX, maxY, minY, planeta, colonia) {
            /** Para usar essa função você precisa passar todos os dados corretos que pedem */

            // Corpo do Object que vai para a lista de posição no db da colonia
            let dados = {
                id: data.perfil.id,
                x: 0,
                y: 0
            }
            let ax = await fNumeroAleatorio(maxX, minX) // sorteando Numero x
            let ay = await fNumeroAleatorio(maxY, minY) // sorteando Numero y

            console.log(ax, ay)
            // Verficando se a posição sorteada esta disponivel ou ja tem alguem usando
            let verificaposicao = await verificarPosicaoDb(ax, ay, planeta, colonia)
            console.log(verificaposicao)
            if (verificaposicao[0] === false || verificaposicao[0] === undefined || verificaposicao[0] === null) {
                console.log('usuario cadastrado')
                // Colocando a posição do usuario como utilizadas
                dados.x = ax
                dados.y = ay
                db.planetas[planeta].colonias[colonia].posicaoOcupadas.push(dados) // Cadastra a posição do usuario, dentro da colonia

                fs.writeFileSync('./src/glx/db/database.json', JSON.stringify(db)) // Cdastrar a posicão do usuario, no planeta que esta.

                // Definindo a posição do usuario na colonia.
                data.perfil.localizacao.posicao.x = ax
                data.perfil.localizacao.posicao.y = ay
                data.perfil.casa.colonia.posicao.x = ax
                data.perfil.casa.colonia.posicao.y = ay


            }


        }



        async function fNumeroAleatorio(max, min) {
            const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
            return numeroAleatorio
        }

        async function verificarPosicaoDb(xx, yy, planeta, colonia) {
            let result
            let isCadastrado = false
            for (let i = 0; i < db.planetas[planeta].colonias[colonia].posicaoOcupadas.length; i++) {
                let x = false
                let y = false

                if (db.planetas[planeta].colonias[colonia].posicaoOcupadas[i].x === xx) {
                    x = true
                    if (db.planetas[planeta].colonias[colonia].posicaoOcupadas[i].y === yy) {
                        y = true
                    }
                }

                if (x === false && y === false) {
                    // Se x e y for diferente da posição sorteado, ele restorna que pode cadastrar
                    result = false
                }

                if (data.perfil.id === db.planetas[planeta].colonias[colonia].posicaoOcupadas[i].id) {
                    isCadastrado = true
                }
            }
            return [result, isCadastrado]
        }

        async function atacar(alvo) {
            let isNull
            let date = new Date()

            let isUsername = false  // Variavel usada para definir se o usuario esta cadastrado ou não

            for (let i = 0; i < db.user_cadastrado.username.length; i++) {
    if (alvo === data.perfil.username) return m.reply(`🤯 _¡No puedes atacar a ti mismo!_`);

    // Verifica si el usuario alcanzó el límite de ataques
    if (data.perfil.ataque.data.contagem === 4 && (data.perfil.ataque.data.hora === date.getHours() || data.perfil.ataque.data.hora === date.getHours() + 1)) {
        return m.reply(`_📛 ¡Has alcanzado el límite de ${data.perfil.ataque.data.contagem} ataques!_\n*Aguarda al menos 2 Horas para poder atacar nuevamente.*`);
    } else {
        if (data.perfil.ataque.data.hora != date.getHours()) {
            data.perfil.ataque.data.contagem = 0;
            data.perfil.ataque.data.hora = 0;
        }
    }

    // Cancelar ataque si el nombre de usuario es el mismo que el del atacante

    // Si el nombre de usuario está en la lista de jugadores registrados, procede con el ataque
    if (db.user_cadastrado.username[i].username === alvo) {
        // Agrega una cuenta de ataque al cronómetro de ataque del usuario

        let db1 = global.db.data.users[db.user_cadastrado.username[i].id].gameglx; // Datos del usuario siendo atacado
        let number = db.user_cadastrado.username[i].id.replace(/\D/g, ''); // Obtener el número del atacado
        let number2 = data.perfil.id.replace(/\D/g, '');
        isUsername = true; // Si el usuario tiene el nombre de usuario registrado, retorna true

        // DEFENSA: Antes de cualquier otra cosa, la defensa entra en acción
        if (db1.perfil.defesa.forca >= data.perfil.ataque.forcaAtaque.ataque) {
            data.perfil.ataque.data.contagem += 1;
            if (data.perfil.ataque.data.hora === 0) { data.perfil.ataque.data.hora = date.getHours(); }

            conn.sendMessage(db1.perfil.id, { text: `_Prepárate para defenderte 🛡️, en 10 segundos serás atacado(a) por *@${number2}!*_`, mentions: [data.perfil.id] });
            m.reply(`_⚔️ Tu ataque está en curso_\n\n*_🏰 ¡Cuidado! Tu enemigo está en guardia_*`);

            setTimeout(() => {
                // DAÑOS AL ATACADO
                // Define el daño que se infligirá al enemigo
                db1.perfil.defesa.forca -= data.perfil.ataque.forcaAtaque.ataque;

                // DAÑOS AL ATACANTE
                if (data.perfil.defesa.forca >= db1.perfil.ataque.forcaAtaque.ataque) {
                    // Cuando el atacante realiza su ataque, también recibe daño y aquí se descuenta el poder
                    data.perfil.defesa.forca -= db1.perfil.defesa.ataque;
                }
                let stra = `
*🛡️ Tu defensa perdió: ${db1.perfil.defesa.ataque} Puntos*\n\n *_¡Cuidado con tu casa!_*
`;

                // Mensaje cuando la defensa aún está bloqueando
                let str = `_*🛡️ La defensa de @${number} bloqueó tu ataque!*_

_¡La defensa de este astronauta es fuerte y hace lo imposible! ¡Cuidado!_

👥 Daños a *Ti*:
  Perdiste: ${db1.perfil.ataque.forcaAtaque.ataque} Puntos
_________________________
😈 Daños a *@${number}*:
Perdió: ${db1.perfil.defesa.ataque} Puntos

*💡 CONSEJO:* _Si tu defensa está perdiendo muchos puntos, compra más armas *(glx comprar)* o minera más minerales *(glx miner)* para aumentar tu fuerza._
`;

                conn.sendMessage(db1.perfil.id, { text: stra });
                conn.sendMessage(id, { text: str, mentions: [db.user_cadastrado.username[i].id, db.user_cadastrado.username[i].id] });
            }, 5000);
            break;
        }

        // Cuando la defensa no soporta el ataque, se define este mensaje.
        let str = `⚠️ *¡Atención @${number} !*\n\n_¡Estás siendo 🔫 atacado por:_ \n\n*Nombre:* ${data.perfil.nome}\n*Username:* *${data.perfil.username}*`;
        let xpAleatorio = await fNumeroAleatorio(40, 15); // Genera un número aleatorio para el XP de bono
        conn.sendMessage(db.user_cadastrado.username[i].id, { text: str, mentions: [db.user_cadastrado.username[i].id] });
    }
}


                    setTimeout(() => {
                        data.perfil.ataque.data.contagem += 1 // Adiciona uma contagem de ataque ao cronometro de ataque do usuario
                        if (data.perfil.ataque.data.hora === 0) { data.perfil.ataque.data.hora = date.getHours() }

                        // INIMIGO: Diminui o poder do inimigo coforme a força de ataque
                        db1.perfil.poder = db1.perfil.poder - data.perfil.ataque.forcaAtaque.ataque
                        let valorDeDesconto = ((2 * db1.perfil.carteira.saldo) / 100)
                        let subTotal = db1.perfil.carteira.saldo - valorDeDesconto
                        db1.perfil.carteira.saldo = subTotal

                        // ATACANTE
                        data.perfil.xp += xpAleatorio // Por atacar e vencer o atacante ganhar xp
                        data.perfil.carteira.saldo += valorDeDesconto

                        // Mensagem que sera enviada, para quem fez o ataque, informando o que aconteceu na batalha
                        conn.sendMessage(id, {
                            text: `> 🗡️ ¡Ataque concluido!

😈 *@${number}* perdió ${data.perfil.ataque.forcaAtaque.ataque} Puntos

Ganaste: 
*🆙XP:* ${xpAleatorio}xp | *Total XP:* ${data.perfil.xp}xp
*💸Dinero:* ${valorFormatado(valorDeDesconto)}

`, mentions: [db.user_cadastrado.username[i].id]
});

// Envía un mensaje avisando a quien sufrió el ataque sobre sus pérdidas
conn.sendMessage(db.user_cadastrado.username[i].id, { text: `@${number} ¡Qué triste! 😭\n\n*⚔️ ¡TU DEFENSA FALLÓ! ⚔️*\n\n> _Daños a tu instalación._`, mentions: [db.user_cadastrado.username[i].id] });

}, 10000);

// Envía un mensaje informando que el usuario será atacado pronto
m.reply(`> 🔫 Viajando hasta *${alvo}*`);

// Si el atacante envía un mensaje en un grupo, el bot también avisa a quien será atacado en el grupo
if (m.isGroup) {
    conn.sendMessage(id, { text: str, mentions: [db.user_cadastrado.username[i].id] });
}

}
if (isUsername === false || alvo === null || alvo === undefined) {
    if (alvo === undefined || alvo === null) {
        m.reply(`_💡 ¡Necesitas informar el *UserName* del jugador que deseas atacar!_\n*Ej: ${usedPrefix}glx atacar userExemplo*\n\n*Consejo:* Usa *${usedPrefix}glx atacar list* - _Para listar los usuarios_\n\n`);
    } else {
        // Envía un mensaje si el username no existe en la lista de registrados en el juego
        m.reply(`*${alvo}* _No está registrado con este username!_\n\n_💡 ¡Necesitas informar el *UserName* del jugador que deseas atacar!_\n*Ej: ${usedPrefix}glx atacar userExemplo*\n\n*Consejo:* Usa *${usedPrefix}glx atacar list* - _Para listar los usuarios_\n\n`);
    }
}


        // --------------------------- FIM DAS FUNÇÕES --------------------------------------------------------------------
        //-----------------------------------------------------------------------------------------------------------------




    } catch (err) {
        console.log(err)
    }
    async function createDataBase() {
        // Função para criar o arquivo database.json pela primeira vez

        const databasePath = `./src/glx/db/database.json`;

        try {
            // Tenta ler o arquivo, se o arquivo existir! não faz nada
            fs.readFileSync(databasePath, 'utf8');
            // Se a leitura foi bem-sucedida, o arquivo já existe

        } catch (error) {
            if (error.code === 'ENOENT') {
                // Se o arquivo não existe, cria-o com a estrutura predefinida
                const databaseStructure = JSON.parse(fs.readFileSync('./src/glx/db/template.json'))
                fs.writeFileSync(databasePath, JSON.stringify(databaseStructure, null, 2));
                console.log('Arquivo database.json criado com sucesso.');
            } else {
                // Se ocorrer outro erro, imprime-o
                console.error('Erro ao tentar acessar o arquivo database.json: do GAME GLX', error);
            }
        }



    }

    async function notificacao() {
        let db1 = JSON.parse(fs.readFileSync(`./src/glx/db/database.json`))
        let data1 = global.db.data.users[m.sender].gameglx
        let api = await database_galaxia()

        if (db1.notificacao.status === true) {
            // Notificando os Grupos 
            conn.sendMessage(db1.planetas.terra.id, { text: db1.notificacao.msg[0] })
            conn.sendMessage(db1.planetas.megatron.id, { text: db1.notificacao.msg[0] })
            db1.notificacao.status = false

            fs.writeFileSync(`./src/glx/db/database.json`, JSON.stringify(db1))
        }

        // Notificação automatica para cada usuario Jogador do Game GLX
        if (!data1.notificacao.recebidas.includes(api.notificacao.id)) {
            let number = data1.perfil.id.replace(/\D/g, '')
            let str = `*🔔 - Notificação Game Galáxia*\n\n*[BOT]* _The Mystic Bot MD_ \n*_Para:_ @${number}*\n\n`

            let msg = api.notificacao.msg // Mensagem de notificação na API 

            // Lendo as mensagens no repositorio API 
            for (let i = 0; i < msg.length; i++) {
                str += api.notificacao.msg[i]
            }
            str += `\n\n_Duvidas use o comando,_ *glx criador!*\n`

            // Enviar Notificação para o usuario
            conn.sendMessage(data1.perfil.id, { text: str, mentions: [data1.perfil.id] })

            // Configuração de mensagem ja vista para este usuario
            data1.notificacao.recebidas.push(api.notificacao.id)
            fs.writeFileSync(`./database.json`, JSON.stringify(data1))

        }
    }

    async function database_galaxia() {
        try {
            let url = "https://raw.githubusercontent.com/jeffersonalionco/database-galaxia/master/database.json"
            const response = await fetch(url); // Faz uma solicitação HTTP para a URL fornecida
            if (!response.ok) { // Verifica se a resposta da solicitação foi bem-sucedida
                throw new Error('Erro ao obter os dados: ' + response.statusText);
            }
            const data = await response.json(); // Converte a resposta em JSON

            return data; // Retorna os dados JSON
        } catch (error) {
            console.error('Ocorreu um erro ao obter os dados JSON:', error);
            return null; // Retorna null em caso de erro
        }
    }

    // Função para Atualizar O repositorio
    async function atualizarRepositorio() {
        let database = await database_galaxia()
        let db1 = JSON.parse(fs.readFileSync(`./src/glx/db/database.json`))


        if (!db1.repositorio.atualizado.includes(database.repositorio.atualizar)) {
            // Caminho para o diretório do seu repositório local
            fs.writeFileSync('./tmp/file', '')
            const repoPath = '.';

            // Instanciar o objeto simple-git com o caminho do seu repositório
            const git = simpleGit(repoPath);

            commitChanges() // Salvar os commits Locais
            async function commitChanges() {
                try {
                    await git.add('.');
                    await git.commit('Commit das alterações locais');
                    console.log('Alterações locais commitadas com sucesso.');
                } catch (err) {
                    console.error('Ocorreu um erro ao commitar as alterações locais:', err);
                }
            }

            // Atualizar o repositório
            setTimeout(() => {
                git.pull((err, update) => {
                    if (err) {
                        console.error('Ocorreu um erro ao atualizar o repositório:', err);
                    } else {
                        if (update && update.summary.changes) {
                            console.log('Repositório atualizado com sucesso!');
                            console.log('Resumo das alterações:', update.summary);
                        } else {
                            console.log('O repositório já está atualizado.');
                        }
                    }
                });
            }, 2000)

            // Salvando o id da atualização como ja executado.
            db1.repositorio.atualizado.push(database.repositorio.atualizar)
            fs.writeFileSync(`./src/glx/db/database.json`, JSON.stringify(db1))

        }
    }
};
handler.command = /^(gameglx|glx)$/i;
export default handler;
