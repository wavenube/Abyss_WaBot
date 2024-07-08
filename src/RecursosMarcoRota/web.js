import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const savePath = path.join('../tmp');  // Ruta temporal agregado en alias savePath
const downloadingFiles = new Set();  // Conjunto para registrar nombres de archivos en proceso
let browserInstance = null;  // Variable para almacenar la instancia del navegador
let activeDownloads = 0;  // Contador para las descargas activas, todavia no limita.
const maxDownloads = 1; // Máximo de descargas simultáneas permitidas
const queue = [];

async function initializeBrowser() {
  if (!browserInstance) {
    browserInstance = await puppeteer.launch({
      headless: true,
      args: [
        "--disable-features=BlockInsecurePrivateNetworkRequests",
        "--disable-features=IsolateOrigins", 
        "--disable-site-isolation-trials", 
        '--disable-web-security', 
        "--proxy-server='direct://'", 
        '--proxy-bypass-list=*',
        '--headless',
        '--hide-scrollbars',
        '--mute-audio',
        '--disable-logging',
        '--disable-infobars',
        '--disable-breakpad',
        '--disable-gl-drawing-for-tests',
        '--disable-canvas-aa', // Disable antialiasing on 2d canvas
        '--disable-2d-canvas-clip-aa',
        //'--user-data-dir=/root/.config/chromium/', //para utilizar tu directorio de datos junto a executablePath:
        '--no-sandbox' // banderas para probar eficiencia, puedes borrarlas. no-sandbox es necesario para eecutar en usuario root 
      ],
      //executablePath: '/usr/bin/chromium'  // Ruta a Chromium en tu sistema, si no funciona este plugin debes descomentar y agregar la ubicacion de tu instalacion de chomium o firefox
    });
  }
  return browserInstance;
}

async function saveAsMHTML(url, conn, m) {
  try {
    const browser = await initializeBrowser();
    const page = await browser.newPage();

    await page.goto(url, { timeout: 90000, waitUntil: 'networkidle2' }); //Tiempo de espera antes de cancelar y enviar error, es 1,5Minutois,

    const cdp = await page.target().createCDPSession();
    const { data } = await cdp.send('Page.captureSnapshot', { format: 'mhtml' });

    await page.close();  // Cierra la página

    return data;
  } catch (error) {
    console.error('Error in saveAsMHTML:', error);
    await conn.reply(m.chat, `❌ Error: ${error.message}`, m);
    throw error;
  }
}

async function handleDownloadRequest(url, conn, m) {
  let fileName = '';
  try {
    const timestamp = Date.now();
    fileName = `page_${timestamp}.mhtml`;
    const filePath = path.join(savePath, fileName);  // Ruta del Archivo

    if (downloadingFiles.has(fileName)) {
      await conn.reply(m.chat, '❌ Error de Archivo.', m);
      return;
    }

    downloadingFiles.add(fileName);
    activeDownloads++;

    if (!fs.existsSync(savePath)) {
      fs.mkdirSync(savePath, { recursive: true });
    }

    await conn.reply(m.chat, '💾 Descargando...', m);

    const mhtmlContent = await saveAsMHTML(url, conn, m);
    fs.writeFileSync(filePath, mhtmlContent);

    await conn.sendFile(m.chat, filePath, fileName, 'Aquí tienes ❤️', m, false, {
      mimetype: 'multipart/related'
    });

    console.log(`MHTML ${fileName} enviado exitosamente.`);
    
    fs.unlinkSync(filePath);
    console.log(`Archivo ${fileName} eliminado.`);
  } catch (error) {
    console.error('Error al descargar la página:', error);
  } finally {
    // Elimina el archivo finalizado
    downloadingFiles.delete(fileName);
    activeDownloads--;

    // Procesa la siguiente petición en la cola
    processQueue();
  }
}

function processQueue() {
  if (queue.length === 0 && activeDownloads === 0 && browserInstance) {
    browserInstance.close().then(() => {
      browserInstance = null;
      console.log('Navegador cerrado.');
    }).catch(err => {
      console.error('Error al cerrar el navegador:', err);
    });
    return;
  }

  if (queue.length > 0 && activeDownloads < maxDownloads) {
    const { url, conn, m } = queue.shift();
    handleDownloadRequest(url, conn, m);
  }
}

const handler = async (m, { conn, text }) => {
  const quotedMessage = m.quoted && m.quoted.text ? m.quoted.text : '';
  const urlMatch = quotedMessage.match(/\bhttps?:\/\/\S+/gi);
  const url = urlMatch ? urlMatch[0] : (text ? text.trim() : '');

  if (!url.startsWith('http')) {
    await conn.reply(m.chat, '💢 Debe ser un Link.', m);
    return;
  }

  if (activeDownloads >= maxDownloads) {
    await conn.reply(m.chat, '💢 Un momentito Joven.', m);
  }

  queue.push({ url, conn, m });
  processQueue();
};

// Esto lo agrege pensando que puede aparecer en el menu, no estoy seguro si funcione, no lo probe.
handler.help = ['Offline Web Page'];
handler.tags = ['tools'];
handler.command = /^(web)$/i;
handler.owner = false; //Si esta funcion esta en .true solo solo los global.owner de /config.js pueden usarlo. 

export default handler;
