# ECOM Y VOS

El proyecto se divide en backend y frontend

## Repositorios
Este repositorio contiene la carpeta backend y el subrepositorio con el frontend y su README correspondiente.

## Tecnologías del Proyecto
Node v10.19.0
Mysql v8.0.23-0
Angular: angular/core: "~10.2.0",

En backend:
Express v4.17.1
Sequelize v6.5.1


# Backend

## Dependencias
`npm install` para instalar dependencias

## Base de Datos
Mysql.

Se debe crear la base de datos y llamarla "ecomyvos"

## Sequelize
Correr las migraciones de Seguelize:
`npx sequelize-cli db:migrate`

** en caso de necesitar instalar el CLI de Sequelize:
`npm install --save-dev sequelize-cli`

## Variables de Entorno y Puerto
Se debe crear el archivo .env en /backend.
Este archivo tendrá las variables de entorno para la conexión a la base de datos y las claves de seguridad.

#### Estructura de .env:
//#Port
PORT=

//# db Config
DB_USERNAME=
DB_PASSWORD=
DB_HOST=
DB_DATABASE=
DB_DIALECT=

//# Auth Config
AUTH_SECRET=
AUTH_EXPIRES=
AUTH_ROUNDS=

## Ejecución

### Desarrollo:
Instalar nodemon:
`npm i nodemon`

Ejecutar:
`npm run dev` para ejecutar el proyecto.

### Server
`npm start` para ejecutar el proyecto.
