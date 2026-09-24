/**
 * ==========================================
 * Servicio de Lugares
 * ==========================================
 */

const LugarDAO = require("../dao/lugarDAO");

/*=========================================
  Listar lugares
=========================================*/

function listar() {

    return LugarDAO.listar();

}

/*=========================================
  Buscar por código
=========================================*/

function buscarPorCodigo(codigo) {

    return LugarDAO.buscarPorCodigo(codigo);

}

/*=========================================
  Guardar lugar
=========================================*/

function guardar(lugar) {

    if (!lugar.codigo ||
        !lugar.nombre ||
        !lugar.provincia ||
        !lugar.categoria) {

        throw new Error("Todos los campos son obligatorios.");

    }

    if (isNaN(lugar.calificacion)) {

        throw new Error("La calificacion debe ser numerica.");

    }

    if (lugar.calificacion < 0 ||
        lugar.calificacion > 100) {

        throw new Error(
            "La calificacion debe estar entre 0 y 100."
        );

    }

    const existente =
        LugarDAO.buscarPorCodigo(lugar.codigo);

    if (existente) {

        throw new Error(
            "El codigo ya existe."
        );

    }

    LugarDAO.guardar(lugar);

}

/*=========================================
  Modificar lugar
=========================================*/

function modificar(lugar) {

    const existente =
        LugarDAO.buscarPorCodigo(lugar.codigo);

    if (!existente) {

        throw new Error(
            "El lugar no existe."
        );

    }

    if (isNaN(lugar.calificacion)) {

        throw new Error(
            "La calificacion debe ser numerica."
        );

    }

    if (lugar.calificacion < 0 ||
        lugar.calificacion > 100) {

        throw new Error(
            "La calificacion debe estar entre 0 y 100."
        );

    }

    LugarDAO.modificar(lugar);

}

/*=========================================
  Eliminar lugar
=========================================*/

function eliminar(codigo) {

    const existente =
        LugarDAO.buscarPorCodigo(codigo);

    if (!existente) {

        throw new Error(
            "El lugar no existe."
        );

    }

    LugarDAO.eliminar(codigo);

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
