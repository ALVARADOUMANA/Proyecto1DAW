/**
 * ==========================================
 * DAO de la Bitácora
 * ==========================================
 */

const fs = require("fs");
const path = require("path");

// Ruta del archivo de la bitácora
// Se abre en modo "a" para que acumule y no se sobreescriba.

const ARCHIVO = path.join(

    __dirname,

    "..",

    "data",

    "log.txt"

);

/*=========================================
  Crear archivo si no existe
=========================================*/

function inicializarArchivo() {

    if (!fs.existsSync(ARCHIVO)) {

        fs.writeFileSync(ARCHIVO, "");

    }

}

/*=========================================
  Agregar una línea a la bitácora
=========================================*/

function escribirLinea(linea) {

    inicializarArchivo();

    fs.appendFileSync(

        ARCHIVO,

        linea + "\n",

        "utf8"

    );

}

/*=========================================
  Leer la bitácora completa
=========================================*/

function leerArchivo() {

    inicializarArchivo();

    const contenido = fs.readFileSync(

        ARCHIVO,

        "utf8"

    );

    if (contenido.trim() === "") {

        return [];

    }

    return contenido
        .trim()
        .split("\n");

}

/*=========================================
  Exportar funciones
=========================================*/

module.exports = {

    escribirLinea,

    leerArchivo

};
