import { performance } from 'perf_hooks';
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix }) => {
    // Mensaje inicial para indicar que la prueba ha comenzado
    await conn.sendMessage(m.chat, { text: '🕒 Realizando prueba de velocidad, por favor espera...' }, { quoted: m });

    // Registrar el tiempo de inicio
    const start = performance.now();

    // Realizar una petición simple para medir la latencia del servidor
    let pingTime = 0;
    try {
        const response = await fetch('https://httpbin.org/get');
        pingTime = performance.now() - start;
        await response.text();
    } catch (error) {
        pingTime = 'Error en la medición';
    }

    // Registrar el tiempo de respuesta del bot
    const responseTime = performance.now() - start;

    // Construir el mensaje con los resultados
    const mensaje = `
🕒 **Prueba de Velocidad Completada**

◉ **Tiempo de Respuesta del Bot:** ${responseTime.toFixed(2)} ms
◉ **Latencia del Servidor:** ${typeof pingTime === 'number' ? pingTime.toFixed(2) : pingTime}

⚠️ Ten en cuenta que la latencia puede variar dependiendo de la carga del servidor y la calidad de tu conexión a Internet.
`;

    // Enviar el mensaje con los resultados
    await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
};

// Configuración del comando
handler.command = /^(speedtest|pruebavelocidad|ping)$/i;

export default handler;
