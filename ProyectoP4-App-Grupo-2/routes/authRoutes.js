/**
 * ==========================================
 * Rutas de Autenticacion
 * ==========================================
 *
 * Patron tomado de: ProyectoEstudiantes/routes/authRoutes.js
 */

const express = require("express");

const router = express.Router();

const AuthController =
    require("../controllers/authController");

/*=========================================
  GET
  Mostrar Login
=========================================*/

router.get(

    "/",

    AuthController.mostrarLogin

);

/*=========================================
  POST
  Iniciar Sesion
=========================================*/

router.post(

    "/login",

    AuthController.iniciarSesion

);

/*=========================================
  GET
  Cerrar Sesion
=========================================*/

router.get(

    "/logout",

    AuthController.cerrarSesion

);

/*=========================================
  Exportar Router
=========================================*/

module.exports = router;
