import { personajes } from './personajes.js'; // Ajusta la ruta si es necesario

// Variables globales para controlar los personajes y tiempos de espera
global.restriccionesPersonajes = {};
global.personajesSeleccionados = [];
global.personajesUltimoReinicio = Date.now();
global.currentPersonaje = null; // Para almacenar el personaje actual
global.cooldownsRW = {}; // Para almacenar los cooldowns de cada usuario

const handlerRW = async (m, { conn, usedPrefix }) => {
    const ahora = Date.now();
    const tiempoEsperar = 15000; // 15 segundos para que el personaje se libere
    const tiempoReinicio = 3600000; // 1 hora para reiniciar los personajes disponibles
    const cooldownUsuario = 30000; // 30 segundos de cooldown para cada usuario

    // Verifica si el usuario está en cooldown
    if (global.cooldownsRW[m.sender] && (ahora - global.cooldownsRW[m.sender] < cooldownUsuario)) {
        const tiempoRestante = Math.ceil((cooldownUsuario - (ahora - global.cooldownsRW[m.sender])) / 1000);
        await conn.sendMessage(m.chat, { text: `⏳ Debes esperar ${tiempoRestante} segundos antes de usar el comando nuevamente.` }, { quoted: m });
        return;
    }

    // Si hace más de una hora desde el último reinicio, reinicia el conjunto de personajes disponibles
    if (ahora - global.personajesUltimoReinicio > tiempoReinicio) {
        global.personajesSeleccionados = [];
        global.personajesUltimoReinicio = ahora;
    }

    // Filtra los personajes que no están en uso y no han sido seleccionados recientemente
    let personajesDisponibles = personajes.filter(p => {
        const restriccion = global.restriccionesPersonajes[p.nombre];
        return !restriccion || (ahora - restriccion >= tiempoEsperar);
    });

    // Si todos los personajes están en uso, permitir la selección de cualquiera
    if (personajesDisponibles.length === 0) {
        personajesDisponibles = personajes;
    }

    // Asegúrate de que no seleccionemos los mismos personajes de la lista de seleccionados recientemente
    personajesDisponibles = personajesDisponibles.filter(p => !global.personajesSeleccionados.includes(p.nombre));

    // Si todos los personajes han sido seleccionados recientemente, reinicia la lista de seleccionados
    if (personajesDisponibles.length === 0) {
        global.personajesSeleccionados = [];
        personajesDisponibles = personajes;
    }

    // Selecciona un personaje aleatorio de los disponibles
    const personaje = personajesDisponibles[Math.floor(Math.random() * personajesDisponibles.length)];

    // Guarda el personaje actual en la variable global
    global.currentPersonaje = personaje;

    // Actualiza la restricción del personaje seleccionado
    global.restriccionesPersonajes[personaje.nombre] = ahora;
    global.personajesSeleccionados.push(personaje.nombre);

    // Establece el cooldown para el usuario actual
    global.cooldownsRW[m.sender] = ahora;

    // Obtener el nombre del usuario que tiene el personaje (si está ocupado)
    let estado;
    if (personaje.estado === 'libre') {
        estado = 'Libre';
    } else {
        const userId = Object.keys(global.db.data.users).find(userId => global.db.data.users[userId].personajes && global.db.data.users[userId].personajes.includes(personaje.nombre));
        if (userId) {
            const usuario = global.db.data.users[userId];
            estado = `Ocupado por @${userId.split('@')[0]}`; // Muestra el nombre de usuario
        } else {
            estado = 'Ocupado'; // Si por alguna razón no se encuentra el usuario
        }
    }

    // Muestra la información del personaje
    const str = `
🖼️ **Nombre**: ${personaje.nombre}
🎯 **Título**: ${personaje.titulo}
📝 **Descripción**: ${personaje.descripcion}
💰 **Valor**: ${personaje.valor} diamantes
📍 **Estado**: ${estado}

> 𝌡 *RECLAMAR*

\`Usa ${usedPrefix}claimch para reclamar\`
    `.trim();

    try {
        // Intenta enviar el mensaje con la imagen
        await conn.sendMessage(m.chat, { image: { url: personaje.imagen }, caption: str }, { quoted: m });
    } catch (error) {
        // En caso de error al cargar la imagen
        console.error("Error al cargar la imagen:", error.message);
        await conn.sendMessage(m.chat, { text: `📸 No se pudo cargar la imagen del personaje. Aquí está la información del personaje:\n\n${str}` }, { quoted: m });
    }

    // Añade el temporizador para la disponibilidad del personaje
    setTimeout(() => {
        delete global.restriccionesPersonajes[personaje.nombre];
    }, tiempoEsperar); // 15 segundos en milisegundos
};

handlerRW.command = /^rw$/i;
handlerRW.owner = false; // Puede ser usado por cualquier usuario
export default handlerRW;
