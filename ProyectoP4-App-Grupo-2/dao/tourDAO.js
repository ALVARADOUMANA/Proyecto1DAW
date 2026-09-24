/**
 * ==========================================
 * DAO de Tours
 * ==========================================
 */

const fs = require("fs");
const path = require("path");

const Tour = require("../models/tour");

// Ruta del archivo de datos

const ARCHIVO = path.join(

    __dirname,

    "..",

    "data",

    "tours.txt"

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

            return new Tour(

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

function escribirArchivo(tours) {

    const lineas = tours.map(tour => {

        return `${tour.codigo};${tour.nombre};${tour.lugar};${tour.duracion};${tour.precio}`;

    });

    fs.writeFileSync(

        ARCHIVO,

        lineas.join("\n"),

        "utf8"

    );

}

/*=========================================
  Listar tours
=========================================*/

function listar() {

    return leerArchivo();

}

/*=========================================
  Buscar por código
=========================================*/

function buscarPorCodigo(codigo) {

    const tours = leerArchivo();

    return tours.find(

        tour => tour.codigo === codigo

    ) || null;

}

/*=========================================
  Guardar tour
=========================================*/

function guardar(tour) {

    const tours = leerArchivo();

    tours.push(tour);

    escribirArchivo(tours);

}

/*=========================================
  Modificar tour
=========================================*/

function modificar(tourActualizado) {

    const tours = leerArchivo();

    const nuevos = tours.map(tour => {

        if (tour.codigo === tourActualizado.codigo) {

            return tourActualizado;

        }

        return tour;

    });

    escribirArchivo(nuevos);

}

/*=========================================
  Eliminar tour
=========================================*/

function eliminar(codigo) {

    const tours = leerArchivo();

    const nuevos = tours.filter(

        tour => tour.codigo !== codigo

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
