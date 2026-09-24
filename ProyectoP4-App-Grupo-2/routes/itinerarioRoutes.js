/**
 * ==========================================
 * Rutas de Itinerarios
 * ==========================================
 */

const express = require("express");

const router = express.Router();

const ItinerarioController =
    require("../controllers/ItinerarioController");


// CREAR
router.post(
    "/",
    ItinerarioController.crear
);


// CONSULTAR TODOS
router.get(
    "/",
    ItinerarioController.obtenerTodos
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
    ItinerarioController.guardarImagen
);


router.get(
    "/:id/imagen",
    ItinerarioController.obtenerImagen
);


// ======================================================
// RUTAS QUE UTILIZAN :id - van de ultimas
// ======================================================


// CONSULTAR UNO
router.get(
    "/:id",
    ItinerarioController.obtenerPorId
);


// ACTUALIZAR
router.put(
    "/:id",
    ItinerarioController.actualizar
);


// ELIMINAR
router.delete(
    "/:id",
    ItinerarioController.eliminar
);


module.exports = router;
