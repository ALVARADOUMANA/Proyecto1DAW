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
  eliminarExcursion,
  guardarImagenExcursion,
  obtenerImagenExcursion
} = require("../controllers/excursionController");

// GET - Obtener todos
router.get("/", obtenerExcursiones);

// POST - Crear
router.post("/", crearExcursion);

// ==========================================
// IMAGEN EN BINARIO
// Van ANTES de "/:id" para que no las tape
// ==========================================

router.put(
  "/:id/imagen",
  express.raw({
    type: "image/*",
    limit: "10mb"
  }),
  guardarImagenExcursion
);

router.get("/:id/imagen", obtenerImagenExcursion);

// PUT - Actualizar
router.put("/:id", actualizarExcursion);

// DELETE - Eliminar
router.delete("/:id", eliminarExcursion);

module.exports = router;
