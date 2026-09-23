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
