/**
 * ==========================================
 * Controlador de Tours
 * ==========================================
 *
 * Patron tomado de: ProyectoEstudiantes/controller/estudianteController.js
 */

const Tour = require("../models/tour");

const TourService = require("../services/tourService");

const LogService = require("../services/logService");

/*=========================================
  Listar tours
=========================================*/

function listar(req, res) {

    try {

        const tours = TourService.listar();

        LogService.registrar(
            "Consultar tours",
            req.query.usuario
        );

        res.json(tours);

    }
    catch (error) {

        res.status(500).json({

            mensaje: error.message

        });

    }

}

/*=========================================
  Buscar tour
=========================================*/

function buscar(req, res) {

    try {

        const codigo = req.params.codigo;

        const tour =
            TourService.buscarPorCodigo(codigo);

        if (!tour) {

            LogService.registrar(
                "Consultar tour " + codigo + " - no encontrado",
                req.query.usuario
            );

            return res.status(404).json({

                mensaje: "Tour no encontrado."

            });

        }

        LogService.registrar(
            "Consultar tour " + codigo,
            req.query.usuario
        );

        res.json(tour);

    }
    catch (error) {

        res.status(500).json({

            mensaje: error.message

        });

    }

}

/*=========================================
  Guardar tour
=========================================*/

function guardar(req, res) {

    try {

        const tour = new Tour(

            req.body.codigo,

            req.body.nombre,

            req.body.lugar,

            req.body.duracion,

            Number(req.body.precio)

        );

        TourService.guardar(tour);

        LogService.registrar(
            "Guardar tour " + req.body.codigo,
            req.body.usuario
        );

        res.status(201).json({

            mensaje: "Tour guardado correctamente."

        });

    }
    catch (error) {

        LogService.registrar(
            "Error al guardar tour: " + error.message,
            req.body.usuario
        );

        res.status(400).json({

            mensaje: error.message

        });

    }

}

/*=========================================
  Modificar tour
=========================================*/

function modificar(req, res) {

    try {

        const tour = new Tour(

            req.body.codigo,

            req.body.nombre,

            req.body.lugar,

            req.body.duracion,

            Number(req.body.precio)

        );

        TourService.modificar(tour);

        LogService.registrar(
            "Modificar tour " + req.body.codigo,
            req.body.usuario
        );

        res.json({

            mensaje: "Tour modificado correctamente."

        });

    }
    catch (error) {

        LogService.registrar(
            "Error al modificar tour: " + error.message,
            req.body.usuario
        );

        res.status(400).json({

            mensaje: error.message

        });

    }

}

/*=========================================
  Eliminar tour
=========================================*/

function eliminar(req, res) {

    try {

        const codigo = req.params.codigo;

        TourService.eliminar(codigo);

        LogService.registrar(
            "Eliminar tour " + codigo,
            req.query.usuario
        );

        res.json({

            mensaje: "Tour eliminado correctamente."

        });

    }
    catch (error) {

        LogService.registrar(
            "Error al eliminar tour: " + error.message,
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
