# Cloud Terminal

 El objetivo de este proyecto es principlamente el de subir, descargar y eliminar archivos en una nube privada de Google Cloud Storage através de la comandos para el almacenamiento de archivos resultantes de proyecto de minado de datos, además, es posible examinar archivos con formato de texto plano y PDF, con la intencion de buscar una palabra clave dentro del archivo para buscar coincidencias, y saber cuantas veces fue encontrado dentro de este archivo.

## Prerequisitos

### Git Bash 
Necesitas tener instalado git en tu computadora junto con la `terminal de Git Bash` desde https://git-scm.com/downloads con las características predeterminadas. Para verificar que tienes la `terminal Git Bash` instalado buscala en pogramas y ejecuta la terminal, si la terminal no aparece es necesario desinstalar y volver instalar correctamente.

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
Tecle el siguiente comando en la terminal de Git Bash en el directorio donde quiera guardarlo, para obtener el proyecto:

```JavaScript
$ git clone "the_url_of_the_project"
```

### Paso 2: Entrar al proyecto desde la terminal de Git Bash
Después se debe mover a la carpeta del proyecto con el comando:
```JavaScript
$ ls  -l     // Verificar que el proyecto se a descargado de manera correcta en el directorio actual

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
> Este comando deberá funcionar en cualquier directorio en el que se encuentre en la terminal bash, además de que mostrara el menu de comandos de la aplicación. En caso de no ser asi, favor de empezar desde el paso uno, asegurandose que el paquete sea el indicado.

## Configuración de las Keys

Después de haber completado la instalación del proyecto de manera exitosa, es necesario configurar el archivo que contiene las `keys`, si ya existe una configuración de este archivo, solo copielo y pegelo en el directorio principal y saltese este apartado. Esta configuracion sirve para conectarse con `Google Storage` el archivo se encuentra en el directorio principal:

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



El archivo `google_cloud_storage_EXAMPLE.json` tiene que ser renombrado a `google_cloud_storage.json` para que la aplicación pueda leerlo de forma correcta. Después se tienen que establecer las `keys`, para ello se tiene que abrir el archivo el cual contiene lo siguiente:

```JavaScript
{
  "type": "service_account",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": ""
}
```
> Es posible que al momento de configurar Google Storage te genere un archivo igual este, para ese caso solo es necesario copiar y pegar.


## Autores

* **Gustavo Fernando Morentin Ballesteros** - *Developer* -
(https://github.com/gmorentin)
* **Francisco David Preciado Mendoza** - *Developer* - 
(https://github.com/PacoDw)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details