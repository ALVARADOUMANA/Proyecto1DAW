/**
 * ==========================================
 * Rutas de Operadores
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
  obtenerOperadores,
  crearOperador,
  actualizarOperador,
  eliminarOperador
} = require("../controllers/operadorController");

// GET - Obtener todos
router.get("/", obtenerOperadores);

// POST - Crear
router.post("/", crearOperador);

// PUT - Actualizar
router.put("/:id", actualizarOperador);

// DELETE - Eliminar
router.delete("/:id", eliminarOperador);

module.exports = router;
