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


    // ==========================================
    // IMAGEN EN BINARIO
    // ==========================================

    static async guardarImagen(req, res) {

        try {

            const resultado =
                await service.guardarImagen(
                    req.params.id,
                    req.body
                );

            if (!resultado) {

                return res.status(404).json({

                    mensaje:
                        "Sitio no encontrado en MongoDB"
                });
            }

            LogService.registrar(
                "MongoDB: guardar imagen del sitio " + req.params.id,
                req.query.usuario
            );

            res.json({

                mensaje:
                    "MongoDB: imagen guardada en binario",

                bytes: resultado.bytes

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                mensaje:
                    "Error al guardar la imagen en MongoDB"
            });
        }
    }


    static async obtenerImagen(req, res) {

        try {

            const bytes =
                await service.obtenerImagen(
                    req.params.id
                );

            if (!bytes) {

                return res.status(404).json({

                    mensaje:
                        "El sitio no tiene imagen"
                });
            }

            res.set(
                "Content-Type",
                SitioController.tipoDeImagen(bytes)
            );

            res.send(bytes);

        } catch (error) {

            console.error(error);

            res.status(500).json({

                mensaje:
                    "Error al leer la imagen de MongoDB"
            });
        }
    }


    // El tipo se deduce de los primeros bytes del archivo,
    // asi no hace falta guardarlo en un campo aparte.

    static tipoDeImagen(bytes) {

        if (bytes[0] === 0x89 && bytes[1] === 0x50) {

            return "image/png";
        }

        if (bytes[0] === 0xFF && bytes[1] === 0xD8) {

            return "image/jpeg";
        }

        if (bytes[0] === 0x47 && bytes[1] === 0x49) {

            return "image/gif";
        }

        return "application/octet-stream";
    }

}


module.exports =
    SitioController;
