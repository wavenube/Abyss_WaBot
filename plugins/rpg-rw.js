import { personajes } from './personajes.js'; // Ajusta la ruta si es necesario

// Variable global para almacenar los personajes y sus tiempos de restricción
global.restriccionesPersonajes = {};

const handlerRW = async (m, { conn, usedPrefix }) => {
    const ahora = Date.now();
    const tiempoEsperar = 15000; // 15 segundos en milisegundos

    // Filtra los personajes que no están en uso
    let personajesDisponibles = personajes.filter(p => {
        const restriccion = global.restriccionesPersonajes[p.nombre];
        return !restriccion || (ahora - restriccion >= tiempoEsperar);
    });

    // Si todos los personajes están en uso, permitir la selección de cualquiera
    if (personajesDisponibles.length === 0) {
        personajesDisponibles = personajes;
    }

    // Selecciona un personaje aleatorio de los disponibles
    const personaje = personajesDisponibles[Math.floor(Math.random() * personajesDisponibles.length)];

    // Actualiza la restricción del personaje seleccionado
    global.restriccionesPersonajes[personaje.nombre] = ahora;

    // Muestra la información del personaje
    const estado = personaje.estado === 'libre' ? 'Libre' : `Ocupado por ${Object.keys(global.db.data.users).find(userId => global.db.data.users[userId].personajes && global.db.data.users[userId].personajes.includes(personaje.nombre))}`;
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
