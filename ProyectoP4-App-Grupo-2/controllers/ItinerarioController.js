/**
 * ==========================================
 * Controlador de Itinerarios
 * ==========================================
 */

const ItinerarioService =
    require("../services/ItinerarioService");

const LogService =
    require("../services/logService");


const service =
    new ItinerarioService();


class ItinerarioController {


    static async crear(req, res) {

        try {

            const itinerario =
                await service.crear(
                    req.body
                );

            LogService.registrar(
                "MongoDB: crear itinerario " + req.body.codigo,
                req.body.usuario
            );

            res.json({

                mensaje:
                    "MongoDB: itinerario creado",

                itinerario

            });

        } catch (error) {

            console.error(error);

            LogService.registrar(
                "Error al crear itinerario en MongoDB: " + error.message,
                req.body.usuario
            );

            res.status(500).json({

                mensaje:
                    "Error al crear en MongoDB"
            });
        }
    }


    static async obtenerTodos(req, res) {

        try {

            const itinerarios =
                await service.obtenerTodos();

            LogService.registrar(
                "MongoDB: consultar itinerarios",
                req.query.usuario
            );

            res.json({

                mensaje:
                    "MongoDB: consulta realizada",

                itinerarios

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                mensaje:
                    "Error consultando MongoDB"
            });
        }
    }


    static async obtenerPorId(req, res) {

        try {

            const itinerario =
                await service.obtenerPorId(
                    req.params.id
                );

            if (!itinerario) {

                return res.status(404).json({

                    mensaje:
                        "Itinerario no encontrado en MongoDB"
                });
            }

            LogService.registrar(
                "MongoDB: consultar itinerario " + req.params.id,
                req.query.usuario
            );

            res.json({

                mensaje:
                    "MongoDB: itinerario encontrado",

                itinerario

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                mensaje:
                    "Error consultando MongoDB"
            });
        }
    }


    static async actualizar(req, res) {

        try {

            const itinerario =
                await service.actualizar(

                    req.params.id,

                    req.body

                );

            if (!itinerario) {

                return res.status(404).json({

                    mensaje:
                        "Itinerario no encontrado en MongoDB"

                });
            }

            LogService.registrar(
                "MongoDB: actualizar itinerario " + req.params.id,
                req.body.usuario
            );

            res.json({

                mensaje:
                    "MongoDB: itinerario actualizado",

                itinerario

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                mensaje:
                    "Error actualizando MongoDB"

            });
        }
    }


    static async eliminar(req, res) {

        try {

            const itinerario =
                await service.eliminar(
                    req.params.id
                );

            if (!itinerario) {

                return res.status(404).json({

                    mensaje:
                        "Itinerario no encontrado en MongoDB"

                });
            }

            LogService.registrar(
                "MongoDB: eliminar itinerario " + req.params.id,
                req.query.usuario
            );

            res.json({

                mensaje:
                    "MongoDB: itinerario eliminado",

                itinerario

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                mensaje:
                    "Error eliminando MongoDB"

            });
        }
    }

}


module.exports =
    ItinerarioController;
