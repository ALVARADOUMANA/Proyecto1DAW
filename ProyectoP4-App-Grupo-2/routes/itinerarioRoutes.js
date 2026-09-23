/**
 * ==========================================
 * Rutas de Itinerarios
 * ==========================================
 *
 * Patron tomado de: Semana6/routes/productoRoutes.js
 *
 * ORDEN DE LAS RUTAS
 * Express recorre las rutas de arriba hacia abajo y usa la primera
 * que coincide. Por eso las rutas literales van ANTES que "/:id":
 * si "/:id" fuera primero, taparia a todas las que vienen despues.
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
