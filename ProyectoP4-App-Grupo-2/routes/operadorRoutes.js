/**
 * ==========================================
 * Rutas de Operadores
 * ==========================================
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
