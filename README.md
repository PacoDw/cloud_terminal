# Cloud Terminal

 El objetivo de este proyecto es principlamente el de subir, descargar y eliminar archivos en una nube privada de Google Cloud Storage através de la comandos para el almacenamiento de archivos resultantes de proyecto de minado de datos, además, es posible examinar archivos con formato de texto plano y PDF, con la intención de buscar una palabra clave dentro del archivo para buscar coincidencias, y saber cuántas veces fue encontrado dentro de este archivo.

## Prerequisitos

### Git Bash 
Necesitas tener instalado git en tu computadora junto con la `terminal de Git Bash` desde https://git-scm.com/downloads con las características predeterminadas. Para verificar que tienes la `terminal Git Bash` instalado buscala en pogramas y ejecuta la terminal, si la terminal no aparece es necesario desinstalar y volver instalar Git correctamente.

### pdfToText 
El siguiente paso a verificar dentro de la `terminal Git Bash`, es tener instalado el comando "pdfToText" para ello ejecutar el siguiente comando:

```JavaScript
$ pdfToText -v

//pdftotext version 4.00
//Copyright 1996-2017 Glyph & Cog, LLC1
```
Si estas usando Windows y no se tiene instalado el comando seguir el tutorial de la página https://poppler.freedesktop.org/.

Si estas usando macOs verificar que se tiene instalado Homebrew en  https://brew.sh/index_es y ejecutar el comando:

```JavaScript
$ brew install pkg-config poppler
```
Si estas usando Debian, Ubuntu o algún derivado de linux se instala de la siguiente manera, ejecutando los comandos:

```JavaScript
$ sudo apt-get update
$ sudo apt-get install build-essential libpoppler-cpp-dev pkg-config python-dev
```

### Node & npm
Necesitas tener la última versión de Node.js instalada desde https://nodejs.org/es/. Para verificar que tienes Node.js en tu `terminal Git Bash` ejecuta:

```JavaScript
$ node --version

// Expected output:
// $ v10.13.0
```
```JavaScript
$ npm --version

// Expected output:
// $ 6.4.1
```

## Intalación
Para empezar con la instalación es necesario haber completado los prerequisitos de manera satisfactoria, el primer paso es clonar el proyecto desde el repositorio principal. Sin embargo, si el proyecto ya lo tiene a través de una memoria USB saltarse al paso 2.

### Paso 1: Obtener proyecto mediante el repositorio principal
Teclee el siguiente comando en la terminal de Git Bash en el directorio donde quiera guardarlo, para obtener el proyecto:

```JavaScript
$ git clone "the_url_of_the_project"
```

### Paso 2: Entrar al proyecto desde la terminal de Git Bash
```JavaScript
$ ls  -l     // Verificar que el proyecto se ha descargado de manera correcta en el directorio actual

$ cd  /name_of_the_project
```

### Paso 3: Instalar todas las dependencias del proyecto
Una vez dentro del proyecto, es requisito instalar todas las dependencias del proyecto para su funcionamiento, con el siguiente comando:
```JavaScript
$ npm install
```
> Verificar que se tenga conexión a internet para este paso.

### Paso 4: Instalar el proyecto como una aplicación global
Para finaliza la instalación del proyecto y poder ejecutarlo desde cualquier directorio, se necesita instalarlo de manera global en su computadora con el siguiente comando:
```JavaScript
$ npm install -g ./
```

### Paso 5: Verificación de la instalación 
Para verificar que la instalación haya sido un exito, tecle el siguiente comando: 
```JavaScript
$ ct
```
> Este comando deberá funcionar en cualquier directorio en el que se encuentre dentro de la terminal, además de que mostrará el menú de comandos de la aplicación. En caso de no ser así, favor de empezar desde el paso uno, asegurándose que el paquete sea el indicado.

## Configuración de las Keys

Después de haber completado la instalación del proyecto de manera exitosa, es necesario comunicarse con el administrador para solicitar el archivo de `keys` que tendrá el nombre de `google_cloud_storage.json` el cual se debe colocar en base al diagrama de abajo:

### Directorio principal

    .
    ├── /commands
    ├── /core                
    ├── /services
    ├── .gitignore
    ├── ct.js
    ├── google_cloud_storage_EXAMPLE.json   -------->  Este archivo es el que se tiene que editar.
    ├── package.json
    └── README.md


El archivo `google_cloud_storage_EXAMPLE.json` tiene que ser cambiado por `google_cloud_storage.json` para que la aplicación pueda leerlo de forma correcta.


Después ejecuta cualquiera de los comandos que vienen en "ct" para verificar el funcionamiento de cada uno de ellos.

Para ejecutar el comando "ct val" se tiene que introducir los archivos pdf dentro de la carpeta "PDFs" que se encuentra dentro de "Inegi_Downloads" la cual se crea automáticamente al ejecutar cualquier comando dentro de "ct".

## Autores

* **Gustavo Fernando Morentin Ballesteros** - *Developer* -
(https://github.com/gmorentin)
* **Francisco David Preciado Mendoza** - *Developer* - 
(https://github.com/PacoDw)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details