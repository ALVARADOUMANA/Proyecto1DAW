/**
 * ==========================================
 * Rutas de Excursiones
 * ==========================================
 *
 * Patron tomado de: S4-SW/routes/productoRoutes.js
 *
 * ORDEN DE LAS RUTAS: Express usa la primera que coincide, por eso
 * las rutas literales van antes que las que llevan ":id".
 */

const express = require("express");

const router = express.Router();

const {
  obtenerExcursiones,
  crearExcursion,
  actualizarExcursion,
  eliminarExcursion
} = require("../controllers/excursionController");

// GET - Obtener todos
router.get("/", obtenerExcursiones);

// POST - Crear
router.post("/", crearExcursion);

// PUT - Actualizar
router.put("/:id", actualizarExcursion);

// DELETE - Eliminar
router.delete("/:id", eliminarExcursion);

module.exports = router;
