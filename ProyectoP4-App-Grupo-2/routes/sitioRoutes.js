/**
 * ==========================================
 * Rutas de Sitios
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
