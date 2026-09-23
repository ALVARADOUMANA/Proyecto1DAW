/**
 * ==========================================
 * Servicio de Tours
 * ==========================================
 */

const TourDAO = require("../dao/tourDAO");

const LugarDAO = require("../dao/lugarDAO");

/*=========================================
  Listar tours
=========================================*/

function listar() {

    return TourDAO.listar();

}

/*=========================================
  Buscar por codigo
=========================================*/

function buscarPorCodigo(codigo) {

    return TourDAO.buscarPorCodigo(codigo);

}

/*=========================================
  Guardar tour
=========================================*/

function guardar(tour) {

    if (!tour.codigo ||
        !tour.nombre ||
        !tour.lugar ||
        !tour.duracion) {

        throw new Error("Todos los campos son obligatorios.");

    }

    if (isNaN(tour.precio)) {

        throw new Error("El precio debe ser numerico.");

    }

    if (tour.precio < 0 ||
        tour.precio > 5000) {

        throw new Error(
            "El precio debe estar entre 0 y 5000."
        );

    }

    const lugarRelacionado =
        LugarDAO.buscarPorCodigo(tour.lugar);

    if (!lugarRelacionado) {

        throw new Error(
            "El lugar indicado no existe."
        );

    }

    const existente =
        TourDAO.buscarPorCodigo(tour.codigo);

    if (existente) {

        throw new Error(
            "El codigo ya existe."
        );

    }

    TourDAO.guardar(tour);

}

/*=========================================
  Modificar tour
=========================================*/

function modificar(tour) {

    const existente =
        TourDAO.buscarPorCodigo(tour.codigo);

    if (!existente) {

        throw new Error(
            "El tour no existe."
        );

    }

    if (isNaN(tour.precio)) {

        throw new Error(
            "El precio debe ser numerico."
        );

    }

    if (tour.precio < 0 ||
        tour.precio > 5000) {

        throw new Error(
            "El precio debe estar entre 0 y 5000."
        );

    }

    const lugarRelacionado =
        LugarDAO.buscarPorCodigo(tour.lugar);

    if (!lugarRelacionado) {

        throw new Error(
            "El lugar indicado no existe."
        );

    }

    TourDAO.modificar(tour);

}

/*=========================================
  Eliminar tour
=========================================*/

function eliminar(codigo) {

    const existente =
        TourDAO.buscarPorCodigo(codigo);

    if (!existente) {

        throw new Error(
            "El tour no existe."
        );

    }

    TourDAO.eliminar(codigo);

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
