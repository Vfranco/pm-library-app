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

Se creó otro tipo de persistencia (localStorage) usando Repository para firmar su interfaz y seleccionar la instancia de repositorio deseada en la fábrica. Además, se modificaron los estilos de sass para corregir un bug en la parte responsiva de la web.

## Persistencia

Actualmente, el sistema cuenta con dos opciones de persistencia: localStorage y memoria. Para seleccionar una de ellas, simplemente descomentar su instancia en la fábrica de repositorios y comentar la que no se usará, así como sus imports

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
