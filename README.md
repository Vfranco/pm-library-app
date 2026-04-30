# Biblioteca PM

Sistema de gestión de biblioteca virtual desarrollado con fines de aprendizaje.

## Instrucciones para instalar

Clonar el Repositorio

```bash
git clone https://github.com/Vfranco/pm-library-app.git
```

Instalar Dependencias

```bash
npm install
```

## Arquitectura
El sistema se comporta de forma agnóstica a la vista y a la persistencia, lo que les permite comportarse como plugins.

## Últimos cambios realizados
Se creó la vista web usando sass, html y typescript vanilla. La instancia de la vista se cambió por una WebView pero en caso de querer volver a la vista de consola, descomentar las lineas comentadas en el entry point y comentar la instancia del WebView. El comportamiento de la vista web se maneja por un controlador llamado WebHandler. Los estilos de la vista web se inyectan con HTMLWebPlugin de webpack al compilarse.

## Ejecución
Para correr el programa con vista Web, tener descomentadas las lineas de instancia de WebView en el entry point y utilizar el siguiente comando:
```bash
npm run dev
```

Esto levanta un servidor de desarrollo local. (Para cerrarlo usar control + c en la terminal)
Si no se desea ejecutar servidor de desarrollo local sino solo compilar, ejecutar el siguiente comando:
```bash
npm run build
```

## Credenciales:
Las credenciales del fake login son: 

usuario: admin

contraseña: admin123

En caso de querer correr el programa con vista de consola, tener descomentadas las lineas de consola en el entry point, comentar las de la vista web y utilizar el siguiente comando:
```bash
npm run build:console
```

Esto compilará el programa y podrá ejecutarse con el siguiente comando:
```bash
node ./dist/console.js
```