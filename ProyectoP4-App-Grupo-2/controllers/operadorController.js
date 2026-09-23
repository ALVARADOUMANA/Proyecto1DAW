/**
 * ==========================================
 * Controlador de Operadores
 * ==========================================
 *
 * Patron tomado de: S4-SW/controllers/productoController.js
 *
 * PARTE 2 - semana 4 - PostgreSQL con el driver "pg".
 * Segun la sesion 5, el controlador y las rutas representan la capa
 * de presentacion y "db/database.js" representa la capa de datos.
 *
 * IMAGEN SERIALIZADA
 * La columna "logo" es BYTEA (binario) en PostgreSQL. Para que
 * viaje hacia y desde la vista se serializa a texto base64:
 *   - al leer:     encode(logo, 'base64')
 *     encode() corta el texto en lineas de 76 caracteres
 *     (RFC 2045), asi que se le quitan los saltos con
 *     replace(..., chr(10), '') para que el data: URI de la
 *     vista quede en una sola linea.
 *   - al escribir: decode($n, 'base64')
 */

const pool = require("../db/database");

const LogService = require("../services/logService");

// Obtener todos
const obtenerOperadores = async (req, res) => {

    try {

        const resultado = await pool.query(
            "SELECT id_operador, razon_social, cedula_juridica, telefono, correo, sitio_web, anios_experiencia, calificacion_promedio, replace(encode(logo, 'base64'), chr(10), '') AS logo FROM operadores ORDER BY id_operador"
        );

        LogService.registrar(
            "Consultar operadores",
            req.query.usuario
        );

        res.json(resultado.rows);

    } catch (error) {

        console.error(error);

        LogService.registrar(
            "Error consultando operadores",
            req.query.usuario
        );

        res.status(500).json({
            mensaje: "Error al obtener operadores"
        });

    }

};

// Crear
const crearOperador = async (req, res) => {

    try {

        const resultado = await pool.query(
            "INSERT INTO operadores (razon_social, cedula_juridica, telefono, correo, sitio_web, anios_experiencia, calificacion_promedio, logo) VALUES ($1, $2, $3, $4, $5, $6, $7, decode($8, 'base64')) RETURNING id_operador, razon_social, cedula_juridica, telefono, correo, sitio_web, anios_experiencia, calificacion_promedio, replace(encode(logo, 'base64'), chr(10), '') AS logo",
            [
                req.body.razon_social,
                req.body.cedula_juridica,
                req.body.telefono,
                req.body.correo,
                req.body.sitio_web,
                req.body.anios_experiencia,
                req.body.calificacion_promedio,
                req.body.logo
            ]
        );

        LogService.registrar(
            "Crear operador " + resultado.rows[0].id_operador,
            req.body.usuario
        );

        res.status(201).json(resultado.rows[0]);

    } catch (error) {

        console.error(error);

        LogService.registrar(
            "Error al crear operador: " + error.message,
            req.body.usuario
        );

        res.status(500).json({
            mensaje: "Error al crear el operador"
        });

    }

};

// Actualizar
const actualizarOperador = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            "UPDATE operadores SET razon_social = $1, cedula_juridica = $2, telefono = $3, correo = $4, sitio_web = $5, anios_experiencia = $6, calificacion_promedio = $7, logo = decode($8, 'base64') WHERE id_operador = $9 RETURNING id_operador, razon_social, cedula_juridica, telefono, correo, sitio_web, anios_experiencia, calificacion_promedio, replace(encode(logo, 'base64'), chr(10), '') AS logo",
            [
                req.body.razon_social,
                req.body.cedula_juridica,
                req.body.telefono,
                req.body.correo,
                req.body.sitio_web,
                req.body.anios_experiencia,
                req.body.calificacion_promedio,
                req.body.logo,
                id
            ]
        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Operador no encontrado"
            });

        }

        LogService.registrar(
            "Actualizar operador " + id,
            req.body.usuario
        );

        res.json(resultado.rows[0]);

    } catch (error) {

        console.error(error);

        LogService.registrar(
            "Error al actualizar operador: " + error.message,
            req.body.usuario
        );

        res.status(500).json({
            mensaje: "Error al actualizar el operador"
        });

    }

};

// Eliminar
const eliminarOperador = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            "DELETE FROM operadores WHERE id_operador = $1 RETURNING id_operador",
            [id]
        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Operador no encontrado"
            });

        }

        LogService.registrar(
            "Eliminar operador " + id,
            req.query.usuario
        );

        res.json({
            mensaje: "Operador eliminado correctamente"
        });

    } catch (error) {

        console.error(error);

        LogService.registrar(
            "Error al eliminar operador: " + error.message,
            req.query.usuario
        );

        res.status(500).json({
            mensaje: "Error al eliminar el operador"
        });

    }

};

module.exports = {

    obtenerOperadores,

    crearOperador,

    actualizarOperador,

    eliminarOperador

};
