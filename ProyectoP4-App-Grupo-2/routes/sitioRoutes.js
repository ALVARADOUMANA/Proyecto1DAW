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
