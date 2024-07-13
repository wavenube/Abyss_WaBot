import fs from 'fs';
import { exec } from 'child_process';

// Directorio de los scripts
const scriptsDirectory = 'src/RecursosMarcoRota/Instaladores';

// Lista scripts
const handleListScripts = async (m) => {
  try {
    // Lee los archivos del directorio
    const files = fs.readdirSync(scriptsDirectory);

    // Pone nombres de archivo en una lista numerada
    const fileList = files.map((file, index) => `${index + 1}. ${file}`).join('\n');

    // Envía la lista
    await m.reply(`Ejecutor de Scripts. Lea como Usarlo Aqui:  \n\n${fileList}`);
  } catch (error) {
    console.error('Error al listar los scripts:', error);
    await m.reply('❌ Falla');
  }
};

const handleExecuteScript = async (m, scriptNumber) => {
  try {
    const files = fs.readdirSync(scriptsDirectory);

    // Verifica el número del script
    if (scriptNumber > 0 && scriptNumber <= files.length) {
      const scriptFile = files[scriptNumber - 1];
      const scriptPath = `${scriptsDirectory}/${scriptFile}`;

      // Dependiendo de la extensión abrirá PowerShell, Bash o en caso de que sea js lo hará en node.
      let command;
      if (scriptFile.endsWith('.js')) {
        command = `node "${scriptPath}"`;
      } else if (scriptFile.endsWith('.sh')) {
        command = `bash "${scriptPath}"`;
      } else if (scriptFile.endsWith('.ps1')) {
        command = `powershell -NoProfile -ExecutionPolicy Bypass -File "${scriptPath}"`;
      } else {
        m.reply('💢 El Script debe ser .sh, .ps1 o .js');
        return;
      }

      // Envía el mensaje de "Ejecutando, espere"
      await m.reply('⏳ Ejecutando...');

      // Ejecuta el script
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error Ejecutando: ${error}`);
          m.reply(`💢 ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Error en el script: ${stderr}`);
          m.reply(`❌ ${stderr}`);
          return;
        }
        m.reply(`✔️ ${stdout}`);
      });
    } else {
      m.reply('💢 Un numero de la Lista Amigo');
    }
  } catch (error) {
    console.error('Error al ejecutar', error);
    await m.reply('❌ Error Ejecutando');
  }
};

let handler = async (m) => {
  // Captura el mensaje sin el comando
  const commandArgument = m.text.trim().split(' ')[1];

  if (!commandArgument) {
    await handleListScripts(m);
  } else {
    const scriptNumber = parseInt(commandArgument, 10);
    if (!isNaN(scriptNumber)) {
      await handleExecuteScript(m, scriptNumber);
    } else {
      m.reply('💢 Debe ser Un *Numero* de la Lista.');
    }
  }
};

handler.help = ['Instalacion de Plugins'];
handler.tags = ['tools'];
handler.command = /^(install)$/i;
handler.owner = true;

export default handler;
