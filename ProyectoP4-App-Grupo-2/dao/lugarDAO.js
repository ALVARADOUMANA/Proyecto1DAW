/**
 * ==========================================
 * DAO de Lugares
 * ==========================================
 *
 * Patron tomado de: ProyectoEstudiantes/dao/estudianteDAO.js
 */

const fs = require("fs");
const path = require("path");

const Lugar = require("../models/lugar");

// Ruta del archivo de datos

const ARCHIVO = path.join(

    __dirname,

    "..",

    "data",

    "lugares.txt"

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
  Leer archivo
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
        .split("\n")
        .map(linea => {

            const datos = linea.split(";");

            return new Lugar(

                datos[0],

                datos[1],

                datos[2],

                datos[3],

                Number(datos[4])

            );

        });

}

/*=========================================
  Escribir archivo
=========================================*/

function escribirArchivo(lugares) {

    const lineas = lugares.map(lugar => {

        return `${lugar.codigo};${lugar.nombre};${lugar.provincia};${lugar.categoria};${lugar.calificacion}`;

    });

    fs.writeFileSync(

        ARCHIVO,

        lineas.join("\n"),

        "utf8"

    );

}

/*=========================================
  Listar lugares
=========================================*/

function listar() {

    return leerArchivo();

}

/*=========================================
  Buscar por codigo
=========================================*/

function buscarPorCodigo(codigo) {

    const lugares = leerArchivo();

    return lugares.find(

        lugar => lugar.codigo === codigo

    ) || null;

}

/*=========================================
  Guardar lugar
=========================================*/

function guardar(lugar) {

    const lugares = leerArchivo();

    lugares.push(lugar);

    escribirArchivo(lugares);

}

/*=========================================
  Modificar lugar
=========================================*/

function modificar(lugarActualizado) {

    const lugares = leerArchivo();

    const nuevos = lugares.map(lugar => {

        if (lugar.codigo === lugarActualizado.codigo) {

            return lugarActualizado;

        }

        return lugar;

    });

    escribirArchivo(nuevos);

}

/*=========================================
  Eliminar lugar
=========================================*/

function eliminar(codigo) {

    const lugares = leerArchivo();

    const nuevos = lugares.filter(

        lugar => lugar.codigo !== codigo

    );

    escribirArchivo(nuevos);

}

/*=========================================
  Exportar funciones
=========================================*/

module.exports = {

    listar,

    buscarPorCodigo,

    guardar,

    modificar,

    eliminar

};
