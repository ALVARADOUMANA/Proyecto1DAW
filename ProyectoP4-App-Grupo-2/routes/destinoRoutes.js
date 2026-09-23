/**
 * ==========================================
 * Rutas de Destinos
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
