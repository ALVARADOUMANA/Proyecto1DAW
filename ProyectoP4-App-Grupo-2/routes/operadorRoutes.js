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
  eliminarOperador,
  guardarImagenOperador,
  obtenerImagenOperador
} = require("../controllers/operadorController");

// GET - Obtener todos
router.get("/", obtenerOperadores);

// POST - Crear
router.post("/", crearOperador);

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
  guardarImagenOperador
);

router.get("/:id/imagen", obtenerImagenOperador);

// PUT - Actualizar
router.put("/:id", actualizarOperador);

// DELETE - Eliminar
router.delete("/:id", eliminarOperador);

module.exports = router;
