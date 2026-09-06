/**
 * ==========================================
 * DAO de la Bitacora
 * ==========================================
 *
 * Patron tomado de: ProyectoEstudiantes/dao/estudianteDAO.js
 *
 * Diferencia con los demas DAO: la bitacora se abre en modo "a"
 * (agregar) y no en modo "w" (escribir), porque el log tiene que
 * acumular y no sobreescribirse.
 *
 * Sesion 7 - actividad de escucha activa:
 *   secuencia de manejo ".txt": abrir - leer / escribir / modificar
 *   - cerrarlo; modos "r", "w", "a", "x", "r+"; codificacion UTF8.
 */

const fs = require("fs");
const path = require("path");

// Ruta del archivo de la bitacora

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
  Agregar una linea a la bitacora
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
  Leer la bitacora completa
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
