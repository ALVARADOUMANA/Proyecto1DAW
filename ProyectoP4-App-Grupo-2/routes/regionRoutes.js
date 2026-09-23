/**
 * ==========================================
 * Rutas de Regiones
 * ==========================================
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
