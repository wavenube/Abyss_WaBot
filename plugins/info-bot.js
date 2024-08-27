import os from 'os';

const handlerInfoBot = async (m, { conn }) => {
    // Obtener la información del sistema
    const uptime = os.uptime(); // Tiempo activo en segundos
    const totalRAM = (os.totalmem() / (1024 ** 3)).toFixed(2) + ' GB'; // RAM Total en GB
    const freeRAM = (os.freemem() / (1024 ** 3)).toFixed(2) + ' GB'; // RAM Libre en GB
    const platform = os.platform(); // Plataforma del sistema operativo
    const cpuModel = os.cpus()[0].model; // Modelo del CPU

    // Intentar obtener el nombre del usuario, con manejo de errores
    let username;
    try {
        username = os.userInfo().username; // Nombre del usuario del sistema
    } catch (error) {
        username = 'No disponible'; // Valor por defecto en caso de error
    }

    // Calcular horas, minutos y segundos del tiempo activo
    const uptimeHours = Math.floor(uptime / 3600);
    const uptimeMinutes = Math.floor((uptime % 3600) / 60);
    const uptimeSeconds = Math.floor(uptime % 60);
    const uptimeFormatted = `${uptimeHours}h ${uptimeMinutes}m ${uptimeSeconds}s`;

    // Obtener la fecha y hora actuales
    const currentDate = new Date();
    const day = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();
    const country = "Argentina"; // Cambia esto al país que desees

    // Crear el mensaje a enviar
    const infoMessage = `
> 𝌡 *SISTEMA*
*Sistema Operativo:* ${platform}
*RAM Total:* ${totalRAM}
*RAM Libre:* ${freeRAM}
*Tiempo Activo:* ${uptimeFormatted}
*Plataforma:* ${platform}
*Usuario:* ${username}
*CPU:* ${cpuModel}

> 𝌡 *PROYECTO*
*Nombre:* ABYSS
*Versión:* 2.1.0
*Descripción:* Advanced ChatBot from WhatsApp
*Autor:* ZephyrByte

> 𝌡 *OWNER*
*ZephyrByte*

> 𝌡 *FECHA ACTUAL*
*Fecha:* ${day}
*Hora:* ${time}
*País:* ${country}
`.trim();

    // Enviar el mensaje
    conn.reply(m.chat, infoMessage, m);
};

// Configuración del comando
handlerInfoBot.command = /^infobot$/i;
handlerInfoBot.owner = false; // Cualquier usuario puede usar este comando
export default handlerInfoBot;
