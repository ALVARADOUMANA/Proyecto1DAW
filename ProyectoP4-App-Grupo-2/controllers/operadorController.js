/**
 * ==========================================
 * Controlador de Operadores
 * ==========================================
 */

const pool = require("../db/database");

const LogService = require("../services/logService");

// Obtener todos
const obtenerOperadores = async (req, res) => {

    try {

        const resultado = await pool.query(
            "SELECT id_operador, razon_social, cedula_juridica, telefono, correo, sitio_web, anios_experiencia, calificacion_promedio FROM operadores ORDER BY id_operador"
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
            "INSERT INTO operadores (razon_social, cedula_juridica, telefono, correo, sitio_web, anios_experiencia, calificacion_promedio) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_operador, razon_social, cedula_juridica, telefono, correo, sitio_web, anios_experiencia, calificacion_promedio",
            [
                req.body.razon_social,
                req.body.cedula_juridica,
                req.body.telefono,
                req.body.correo,
                req.body.sitio_web,
                req.body.anios_experiencia,
                req.body.calificacion_promedio
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
            "UPDATE operadores SET razon_social = $1, cedula_juridica = $2, telefono = $3, correo = $4, sitio_web = $5, anios_experiencia = $6, calificacion_promedio = $7 WHERE id_operador = $8 RETURNING id_operador, razon_social, cedula_juridica, telefono, correo, sitio_web, anios_experiencia, calificacion_promedio",
            [
                req.body.razon_social,
                req.body.cedula_juridica,
                req.body.telefono,
                req.body.correo,
                req.body.sitio_web,
                req.body.anios_experiencia,
                req.body.calificacion_promedio,
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

// ==========================================
// IMAGEN EN BINARIO
// ==========================================

// express.raw entrega el cuerpo tal cual: req.body es un Buffer
// y se escribe directo en la columna BYTEA.

const guardarImagenOperador = async (req, res) => {

    try {

        const { id } = req.params;

        if (!req.body || req.body.length === 0) {

            return res.status(400).json({
                mensaje: "No se recibio ninguna imagen"
            });

        }

        const resultado = await pool.query(
            "UPDATE operadores SET logo = $1 WHERE id_operador = $2 RETURNING id_operador",
            [req.body, id]
        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });

        }

        LogService.registrar(
            "Guardar imagen en operadores " + id,
            req.query.usuario
        );

        res.json({
            mensaje: "Imagen guardada en binario",
            bytes: req.body.length
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al guardar la imagen"
        });

    }

};

const obtenerImagenOperador = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            "SELECT logo FROM operadores WHERE id_operador = $1",
            [id]
        );

        if (resultado.rows.length === 0 || !resultado.rows[0].logo) {

            return res.status(404).json({
                mensaje: "No hay imagen"
            });

        }

        const bytes = resultado.rows[0].logo;

        res.set("Content-Type", tipoDeImagenOperador(bytes));

        res.send(bytes);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al leer la imagen"
        });

    }

};

// El tipo se deduce de los primeros bytes del archivo,
// asi no hace falta guardarlo en un campo aparte.

const tipoDeImagenOperador = (bytes) => {

    if (bytes[0] === 0x89 && bytes[1] === 0x50) {
        return "image/png";
    }

    if (bytes[0] === 0xFF && bytes[1] === 0xD8) {
        return "image/jpeg";
    }

    if (bytes[0] === 0x47 && bytes[1] === 0x49) {
        return "image/gif";
    }

    return "application/octet-stream";

};

module.exports = {

    obtenerOperadores,

    crearOperador,

    actualizarOperador,

    eliminarOperador,

    guardarImagenOperador,

    obtenerImagenOperador

};
