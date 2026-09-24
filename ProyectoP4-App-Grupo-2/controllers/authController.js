/**
 * ==========================================
 * Controlador de Autenticación
 * ==========================================
 */

const path = require("path");

const AuthService = require("../services/authService");

const LogService = require("../services/logService");

/*=========================================
  Mostrar pantalla de login
=========================================*/

function mostrarLogin(req, res) {

    res.sendFile(
        path.join(__dirname, "..", "views", "login.html")
    );

}

/*=========================================
  Procesar login
=========================================*/

function iniciarSesion(req, res) {

    const usuario = req.body.usuario;

    const password = req.body.password;

    try {

        AuthService.autenticar(
            usuario,
            password
        );

        LogService.registrar(
            "Autenticacion correcta",
            usuario
        );

        res.json({

            ok: true

        });

    }
    catch (error) {

        LogService.registrar(
            "Autenticacion fallida",
            usuario
        );

        res.status(401).json({

            ok: false,

            mensaje: error.message

        });

    }

}

/*=========================================
  Cerrar sesión
=========================================*/

function cerrarSesion(req, res) {

    LogService.registrar(
        "Cierre de sesion",
        req.query.usuario
    );

    res.redirect("/");

}

/*=========================================
  Exportar funciones
=========================================*/

module.exports = {

    mostrarLogin,

    iniciarSesion,

    cerrarSesion

};
