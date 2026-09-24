/**
 * ==========================================
 * Rutas de Sitios
 * ==========================================
 */

const express = require("express");

const router = express.Router();

const SitioController =
    require("../controllers/SitioController");


// CREAR
router.post(
    "/",
    SitioController.crear
);


// CONSULTAR TODOS
router.get(
    "/",
    SitioController.obtenerTodos
);


// ======================================================
// IMAGEN EN BINARIO
//
// Van ANTES de "/:id" porque Express usa la primera ruta
// que coincide. express.raw entrega el cuerpo tal cual,
// sin convertirlo: req.body llega como Buffer.
// ======================================================


router.put(
    "/:id/imagen",
    express.raw({
        type: "image/*",
        limit: "10mb"
    }),
    SitioController.guardarImagen
);


router.get(
    "/:id/imagen",
    SitioController.obtenerImagen
);


// ======================================================
// RUTAS QUE UTILIZAN :id - van de ultimas
// ======================================================


// CONSULTAR UNO
router.get(
    "/:id",
    SitioController.obtenerPorId
);


// ACTUALIZAR
router.put(
    "/:id",
    SitioController.actualizar
);


// ELIMINAR
router.delete(
    "/:id",
    SitioController.eliminar
);


module.exports = router;
