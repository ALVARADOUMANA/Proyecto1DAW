/**
 * ==========================================
 * Rutas de Destinos
 * ==========================================
 */

const express = require("express");

const router = express.Router();

const {
  obtenerDestinos,
  crearDestino,
  actualizarDestino,
  eliminarDestino,
  guardarImagenDestinos,
  obtenerImagenDestinos
} = require("../controllers/destinoController");

// GET - Obtener todos
router.get("/", obtenerDestinos);

// POST - Crear
router.post("/", crearDestino);

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
  guardarImagenDestinos
);

router.get("/:id/imagen", obtenerImagenDestinos);

// PUT - Actualizar
router.put("/:id", actualizarDestino);

// DELETE - Eliminar
router.delete("/:id", eliminarDestino);

module.exports = router;
