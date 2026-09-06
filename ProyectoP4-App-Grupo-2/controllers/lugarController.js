/**
 * ==========================================
 * Controlador de Lugares
 * ==========================================
 *
 * Patron tomado de: ProyectoEstudiantes/controller/estudianteController.js
 */

const Lugar = require("../models/lugar");

const LugarService = require("../services/lugarService");

const LogService = require("../services/logService");

/*=========================================
  Listar lugares
=========================================*/

function listar(req, res) {

    try {

        const lugares = LugarService.listar();

        LogService.registrar(
            "Consultar lugares",
            req.query.usuario
        );

        res.json(lugares);

    }
    catch (error) {

        res.status(500).json({

            mensaje: error.message

        });

    }

}

/*=========================================
  Buscar lugar
=========================================*/

function buscar(req, res) {

    try {

        const codigo = req.params.codigo;

        const lugar =
            LugarService.buscarPorCodigo(codigo);

        if (!lugar) {

            LogService.registrar(
                "Consultar lugar " + codigo + " - no encontrado",
                req.query.usuario
            );

            return res.status(404).json({

                mensaje: "Lugar no encontrado."

            });

        }

        LogService.registrar(
            "Consultar lugar " + codigo,
            req.query.usuario
        );

        res.json(lugar);

    }
    catch (error) {

        res.status(500).json({

            mensaje: error.message

        });

    }

}

/*=========================================
  Guardar lugar
=========================================*/

function guardar(req, res) {

    try {

        const lugar = new Lugar(

            req.body.codigo,

            req.body.nombre,

            req.body.provincia,

            req.body.categoria,

            Number(req.body.calificacion)

        );

        LugarService.guardar(lugar);

        LogService.registrar(
            "Guardar lugar " + req.body.codigo,
            req.body.usuario
        );

        res.status(201).json({

            mensaje: "Lugar guardado correctamente."

        });

    }
    catch (error) {

        LogService.registrar(
            "Error al guardar lugar: " + error.message,
            req.body.usuario
        );

        res.status(400).json({

            mensaje: error.message

        });

    }

}

/*=========================================
  Modificar lugar
=========================================*/

function modificar(req, res) {

    try {

        const lugar = new Lugar(

            req.body.codigo,

            req.body.nombre,

            req.body.provincia,

            req.body.categoria,

            Number(req.body.calificacion)

        );

        LugarService.modificar(lugar);

        LogService.registrar(
            "Modificar lugar " + req.body.codigo,
            req.body.usuario
        );

        res.json({

            mensaje: "Lugar modificado correctamente."

        });

    }
    catch (error) {

        LogService.registrar(
            "Error al modificar lugar: " + error.message,
            req.body.usuario
        );

        res.status(400).json({

            mensaje: error.message

        });

    }

}

/*=========================================
  Eliminar lugar
=========================================*/

function eliminar(req, res) {

    try {

        const codigo = req.params.codigo;

        LugarService.eliminar(codigo);

        LogService.registrar(
            "Eliminar lugar " + codigo,
            req.query.usuario
        );

        res.json({

            mensaje: "Lugar eliminado correctamente."

        });

    }
    catch (error) {

        LogService.registrar(
            "Error al eliminar lugar: " + error.message,
            req.query.usuario
        );

        res.status(400).json({

            mensaje: error.message

        });

    }

}

/*=========================================
  Exportar funciones
=========================================*/

module.exports = {

    listar,

    buscar,

    guardar,

    modificar,

    eliminar

};
