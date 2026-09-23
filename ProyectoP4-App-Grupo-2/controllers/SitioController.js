/**
 * ==========================================
 * Controlador de Sitios
 * ==========================================
 */

const SitioService =
    require("../services/SitioService");

const LogService =
    require("../services/logService");


const service =
    new SitioService();


class SitioController {


    static async crear(req, res) {

        try {

            const sitio =
                await service.crear(
                    req.body
                );

            LogService.registrar(
                "MongoDB: crear sitio " + req.body.codigo,
                req.body.usuario
            );

            res.json({

                mensaje:
                    "MongoDB: sitio creado",

                sitio

            });

        } catch (error) {

            console.error(error);

            LogService.registrar(
                "Error al crear sitio en MongoDB: " + error.message,
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

            const sitios =
                await service.obtenerTodos();

            LogService.registrar(
                "MongoDB: consultar sitios",
                req.query.usuario
            );

            res.json({

                mensaje:
                    "MongoDB: consulta realizada",

                sitios

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

            const sitio =
                await service.obtenerPorId(
                    req.params.id
                );

            if (!sitio) {

                return res.status(404).json({

                    mensaje:
                        "Sitio no encontrado en MongoDB"
                });
            }

            LogService.registrar(
                "MongoDB: consultar sitio " + req.params.id,
                req.query.usuario
            );

            res.json({

                mensaje:
                    "MongoDB: sitio encontrado",

                sitio

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

            const sitio =
                await service.actualizar(

                    req.params.id,

                    req.body

                );

            if (!sitio) {

                return res.status(404).json({

                    mensaje:
                        "Sitio no encontrado en MongoDB"

                });
            }

            LogService.registrar(
                "MongoDB: actualizar sitio " + req.params.id,
                req.body.usuario
            );

            res.json({

                mensaje:
                    "MongoDB: sitio actualizado",

                sitio

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

            const sitio =
                await service.eliminar(
                    req.params.id
                );

            if (!sitio) {

                return res.status(404).json({

                    mensaje:
                        "Sitio no encontrado en MongoDB"

                });
            }

            LogService.registrar(
                "MongoDB: eliminar sitio " + req.params.id,
                req.query.usuario
            );

            res.json({

                mensaje:
                    "MongoDB: sitio eliminado",

                sitio

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
    SitioController;
