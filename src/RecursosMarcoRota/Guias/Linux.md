### `▢ Linux` 
![image](https://github.com/weskerty/TheMysticMOD/assets/82781997/7160fd2b-1bdf-4e4a-b907-9b1868a0b440)

## Linux Debian y Derivados (APT)
Abre la Terminal y pega cada linea.

```sh
sudo apt install git wget ffmpeg imagemagick -y
```

```sh
curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh
sudo -E bash nodesource_setup.sh
sudo apt-get install -y nodejs
```

## Arch 

```sh
sudo pacman -Syu git wget ffmpeg imagemagick -y
```

## Instalar el Bot

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

## Mantener Abierto la Terminal.
El bot funcionara mientras este abierto el shell y con Conexion a Internet.
Puedes ajustar para que se inicie automaticamente al encender Linux (varia por distro)
KDE Plasma ir a AutoInicio y agregar el Script cd mystic && npm start 
LXDE ir a Menu > System > AutoRun y agregar el Script cd mystic && npm start 

## Volver a iniciar en caso de Cierre
	
    ```sh
    cd mystic
	npm start 
    ```
