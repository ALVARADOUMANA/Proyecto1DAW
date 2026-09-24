/**
 * ==========================================
 * Servicio de Autenticación
 * ==========================================
 */

const UsuarioDAO = require("../dao/usuarioDAO");

/*=========================================
  Autenticar usuario
=========================================*/

function autenticar(usuario, password) {

    const encontrado =
        UsuarioDAO.validarCredenciales(
            usuario,
            password
        );

    if (!encontrado) {

        throw new Error(
            "Usuario o contrasena incorrectos."
        );

    }

    return encontrado;

}

/*=========================================
  Exportar funciones
=========================================*/

module.exports = {

    autenticar

};
