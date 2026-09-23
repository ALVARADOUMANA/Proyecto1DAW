/**
 * ==========================================
 * Rutas de Excursiones
 * ==========================================
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
