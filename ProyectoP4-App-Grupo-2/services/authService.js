/**
 * ==========================================
 * Servicio de Autenticacion
 * ==========================================
 *
 * Patron tomado de: ProyectoEstudiantes/services/authService.js
 *
 * Se exporta unicamente "autenticar", que es la version que el
 * profesor dejo activa en el material. Las funciones
 * "buscarPorUsuario" y "listar" del original llaman a metodos que
 * el DAO no tiene y ninguna ruta las usa, por eso no se copian.
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
