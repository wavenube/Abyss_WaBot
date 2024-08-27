const handlerGuessNumber = async (m, { conn }) => {
    // Generar un número aleatorio entre 1 y 100
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    // Mensaje inicial
    await conn.reply(m.chat, `🎮 *¡Bienvenido al juego de adivinanzas!*\n\nEstoy pensando en un número entre 1 y 100.\nIntenta adivinarlo respondiendo con un número. Tienes 5 intentos. ¡Buena suerte!`, m);

    let attempts = 5;

    // Función para manejar las respuestas del usuario
    const guessNumber = async (response) => {
        const userGuess = parseInt(response.body);

        if (isNaN(userGuess)) {
            await conn.reply(m.chat, 'Por favor, ingresa un número válido.', m);
            return;
        }

        if (userGuess === randomNumber) {
            await conn.reply(m.chat, `🎉 ¡Felicidades! Adivinaste el número correcto: ${randomNumber}`, m);
            return;
        }

        attempts--;

        if (attempts > 0) {
            let hint = userGuess > randomNumber ? 'El número es menor.' : 'El número es mayor.';
            await conn.reply(m.chat, `❌ Incorrecto. ${hint} Te quedan ${attempts} intentos.`, m);
        } else {
            await conn.reply(m.chat, `😢 Lo siento, te has quedado sin intentos. El número correcto era: ${randomNumber}`, m);
        }
    };

    // Esperar la respuesta del usuario y manejarla
    conn.ev.on('messages.upsert', async ({ messages }) => {
        const response = messages[0];
        if (response.key.remoteJid === m.chat) {
            await guessNumber(response);
        }
    });
};

// Configuración del comando
handlerGuessNumber.command = /^adivina$/i;
handlerGuessNumber.owner = false; // Cualquier usuario puede usar este comando
export default handlerGuessNumber;
