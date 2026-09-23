/**
 * ==========================================
 * Servicio de la Bitacora
 * ==========================================
 */

const LogDAO = require("../dao/logDAO");

/*=========================================
  Armar la fecha y la hora
=========================================*/

function obtenerFechaHora() {

    const ahora = new Date();

    const dia =
        String(ahora.getDate()).padStart(2, "0");

    const mes =
        String(ahora.getMonth() + 1).padStart(2, "0");

    const anio =
        ahora.getFullYear();

    const hora =
        String(ahora.getHours()).padStart(2, "0");

    const minuto =
        String(ahora.getMinutes()).padStart(2, "0");

    const segundo =
        String(ahora.getSeconds()).padStart(2, "0");

    return dia + "/" + mes + "/" + anio +
        " – " +
        hora + ":" + minuto + ":" + segundo;

}

/*=========================================
  Registrar una accion
=========================================*/

function registrar(accion, usuario) {

    const linea =

        obtenerFechaHora() +

        " / \"" + accion + "\" / " +

        (usuario || "desconocido");

    LogDAO.escribirLinea(linea);

}

/*=========================================
  Listar la bitacora
=========================================*/

function listar() {

    return LogDAO.leerArchivo();

}

/*=========================================
  Exportar funciones
=========================================*/

module.exports = {

    registrar,

    listar

};
