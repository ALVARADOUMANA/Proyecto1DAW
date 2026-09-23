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
  eliminarDestino
} = require("../controllers/destinoController");

// GET - Obtener todos
router.get("/", obtenerDestinos);

// POST - Crear
router.post("/", crearDestino);

// PUT - Actualizar
router.put("/:id", actualizarDestino);

// DELETE - Eliminar
router.delete("/:id", eliminarDestino);

module.exports = router;
