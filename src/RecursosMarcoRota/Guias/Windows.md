### `▢ Windows` 

## Descargargas Necesarias
Se requiere estos programas para poder ejecutar.

[NodeJS](https://nodejs.org/en/)
Descargar e Iniciar. Marcar las casillas para instalar Complementos Adicionales como Choco y Agregar a PATH

[Python](https://www.python.org/downloads/)
Descargar e Iniciar. Marcar las casillas para Agregar a PATH
Luego de la Instalacion mover [este archivo](src/RecursosMarcoRota/Guias/RecursosWindows/python3.bat) a la Carpeta de Instalacion de Python "Disco local > Python3.xx"

[Git](https://git-scm.com/downloads)
Descargar e Iniciar. Marcar las casillas para Agregar a PATH

## Ahora puedes Instalar el Bot normalmente casi con los mismos pasos que Linux

Abrimos CMD o PowerShell y Pegamos

```sh
choco install ffmpeg-full
```
(si este comando falla es por que no instalaste los complementos adicionales al instalar nodejs o agregaste a path. Busca Install Choco en menu Inicio y ejecutalo.)

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

El bot Iniciara y te Pedira Login.
Windows tiene una limitacion en que detiene la ejecucion cuando se pierde el foco de la ventana, podemos resolverlo agregando una tarea de inicio automatico.

## Agregar a Tarea de inicio Automatico.

Descarga [este archivo](src/RecursosMarcoRota/Guias/RecursosWindows/mystic.xml)
Luego Busca Programador de Tareas en el Menu Inicio y Abrelo 
![ProgramadorTareasWindows](https://github.com/weskerty/TheMysticMOD/assets/82781997/bc4965e6-c35f-4fc9-982b-379ac7371cf5)

Seleccionas Importar Tarea y Aceptar. Puede que pregunte la contraseña del Administrador ya que se debe iniciar antes de que inicie un Usuario.
Ahora si reiniciar la PC el bot se ejecutara automaticamente al iniciar Windows. Para detener el comportamiento ir a Programador de Tareas, Buscar Mystic y Deshabilitarlo para que no vuelva a Iniciar o Finalizarlo para detener la ejecucion actual.
