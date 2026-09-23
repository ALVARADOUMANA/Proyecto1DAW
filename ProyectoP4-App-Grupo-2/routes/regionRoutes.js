/**
 * ==========================================
 * Rutas de Regiones
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
  obtenerRegiones,
  crearRegion,
  actualizarRegion,
  eliminarRegion
} = require("../controllers/regionController");

// GET - Obtener todos
router.get("/", obtenerRegiones);

// POST - Crear
router.post("/", crearRegion);

// PUT - Actualizar
router.put("/:id", actualizarRegion);

// DELETE - Eliminar
router.delete("/:id", eliminarRegion);

module.exports = router;
