### `▢ TERMUX` 

## Descargar Termux
Descaga la version compatible con tu Telefono de Aqui:

[Termux Github](https://github.com/termux/termux-app/releases)
Suele decir ""termux-app_vxxx-+apt-android-7-github-debug_universal.apk"" 
Android 7 se refiere a que funciona con Android 7 y Superior, hay otra version para Android 5. Tambien puedes usar Termux Monect *PERO JAMAS TERMUX DE GOOGLE PLAY*

## Instalar Requerimientos
Lamentablemente Termux no es compatible con algunos modulos de nodejs que requiere el bot, asi que Instalaremos una Instancia Linux Debian con Estos comandos:
Deberas entrar en Termux y Pegar cada Linea.

```sh
pkg install proot-distro -y
```
Luego:

```sh
proot-distro install debian -y
```
Esperas un Rato dependiendo de la velocidad de tu internet...

## Iniciar Debian

```sh
proot-distro login debian
```

## Ahora puedes Instalar el Bot normalmente con los mismos pasos que Linux Debian y Derivados.


```sh
apt install git wget ffmpeg imagemagick -y
```

```sh
curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh
sudo -E bash nodesource_setup.sh
sudo apt-get install -y nodejs
```

```sh
git clone https://github.com/BrunoSobrino/TheMystic-Bot-MD.git mystic
cd mystic
npm install
```

## Preferencias del Bot
Debes ajustar el `config.js` para agregar el numero del bot, tus administradores del bot, el pais de la fecha y clima y el nombre del paquete de stickers etc.

## Iniciar Bot
Una vez que hayas ajustado todo, inicia el bot con:
```sh
npm start .
```

## Mantener Abierto Termux
El bot funcionara mientras Termux este abierto y con Conexion a Internet.
Permite a Termux ejecutarse sin Restricciones ni Optimizaciones de bateria. 
Activa el WakeLock desde la Notificacion de Termux.


Android 12 y Superior tienen limitaciones de ejecucion, unicamente se puede Resolver con ADB, Root o Custom ROM.

## Volver a iniciar en caso de Cierre


    ```sh
    proot-distro login debian
    ```
	
    ```sh
    cd mystic
	npm start 
    ```
## Servidor Eco-Friend
Puedes utilizar un telefono antiguo y Automatizarlo con Tasker.