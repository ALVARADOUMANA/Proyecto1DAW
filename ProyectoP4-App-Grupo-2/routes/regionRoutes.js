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
  eliminarRegion,
  guardarImagenRegion,
  obtenerImagenRegion
} = require("../controllers/regionController");

// GET - Obtener todos
router.get("/", obtenerRegiones);

// POST - Crear
router.post("/", crearRegion);

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
  guardarImagenRegion
);

router.get("/:id/imagen", obtenerImagenRegion);

// PUT - Actualizar
router.put("/:id", actualizarRegion);

// DELETE - Eliminar
router.delete("/:id", eliminarRegion);

module.exports = router;
