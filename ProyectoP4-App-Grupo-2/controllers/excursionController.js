/**
 * ==========================================
 * Controlador de Excursiones
 * ==========================================
 */

const pool = require("../db/database");

const LogService = require("../services/logService");

// Obtener todos
const obtenerExcursiones = async (req, res) => {

    try {

        /*=========================================
          CARGA EAGER: INNER JOIN con operadores
          en una sola consulta.
        =========================================*/

        const resultado = await pool.query(
            "SELECT e.id_excursion, e.id_operador, e.titulo, e.duracion_horas, e.dificultad, e.cupo_maximo, e.precio_persona, e.incluye_transporte, e.fecha_salida, o.razon_social AS operador_razon_social, o.telefono AS operador_telefono FROM excursiones e INNER JOIN operadores o ON e.id_operador = o.id_operador ORDER BY e.id_excursion"
        );

        LogService.registrar(
            "Consultar excursiones",
            req.query.usuario
        );

        res.json(resultado.rows);

    } catch (error) {

        console.error(error);

        LogService.registrar(
            "Error consultando excursiones",
            req.query.usuario
        );

        res.status(500).json({
            mensaje: "Error al obtener excursiones"
        });

    }

};

// Crear
const crearExcursion = async (req, res) => {

    try {

        const resultado = await pool.query(
            "INSERT INTO excursiones (id_operador, titulo, duracion_horas, dificultad, cupo_maximo, precio_persona, incluye_transporte, fecha_salida) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_excursion, id_operador, titulo, duracion_horas, dificultad, cupo_maximo, precio_persona, incluye_transporte, fecha_salida",
            [
                req.body.id_operador,
                req.body.titulo,
                req.body.duracion_horas,
                req.body.dificultad,
                req.body.cupo_maximo,
                req.body.precio_persona,
                req.body.incluye_transporte,
                req.body.fecha_salida
            ]
        );

        LogService.registrar(
            "Crear excursion " + resultado.rows[0].id_excursion,
            req.body.usuario
        );

        res.status(201).json(resultado.rows[0]);

    } catch (error) {

        console.error(error);

        LogService.registrar(
            "Error al crear excursion: " + error.message,
            req.body.usuario
        );

        res.status(500).json({
            mensaje: "Error al crear la excursión"
        });

    }

};

// Actualizar
const actualizarExcursion = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            "UPDATE excursiones SET id_operador = $1, titulo = $2, duracion_horas = $3, dificultad = $4, cupo_maximo = $5, precio_persona = $6, incluye_transporte = $7, fecha_salida = $8 WHERE id_excursion = $9 RETURNING id_excursion, id_operador, titulo, duracion_horas, dificultad, cupo_maximo, precio_persona, incluye_transporte, fecha_salida",
            [
                req.body.id_operador,
                req.body.titulo,
                req.body.duracion_horas,
                req.body.dificultad,
                req.body.cupo_maximo,
                req.body.precio_persona,
                req.body.incluye_transporte,
                req.body.fecha_salida,
                id
            ]
        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Excursión no encontrada"
            });

        }

        LogService.registrar(
            "Actualizar excursion " + id,
            req.body.usuario
        );

        res.json(resultado.rows[0]);

    } catch (error) {

        console.error(error);

        LogService.registrar(
            "Error al actualizar excursion: " + error.message,
            req.body.usuario
        );

        res.status(500).json({
            mensaje: "Error al actualizar la excursión"
        });

    }

};

// Eliminar
const eliminarExcursion = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            "DELETE FROM excursiones WHERE id_excursion = $1 RETURNING id_excursion",
            [id]
        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Excursión no encontrada"
            });

        }

        LogService.registrar(
            "Eliminar excursion " + id,
            req.query.usuario
        );

        res.json({
            mensaje: "Excursión eliminada correctamente"
        });

    } catch (error) {

        console.error(error);

        LogService.registrar(
            "Error al eliminar excursion: " + error.message,
            req.query.usuario
        );

        res.status(500).json({
            mensaje: "Error al eliminar la excursión"
        });

    }

};

// ==========================================
// IMAGEN EN BINARIO
// ==========================================

// express.raw entrega el cuerpo tal cual: req.body es un Buffer
// y se escribe directo en la columna BYTEA.

const guardarImagenExcursion = async (req, res) => {

    try {

        const { id } = req.params;

        if (!req.body || req.body.length === 0) {

            return res.status(400).json({
                mensaje: "No se recibio ninguna imagen"
            });

        }

        const resultado = await pool.query(
            "UPDATE excursiones SET afiche = $1 WHERE id_excursion = $2 RETURNING id_excursion",
            [req.body, id]
        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });

        }

        LogService.registrar(
            "Guardar imagen en excursiones " + id,
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

const obtenerImagenExcursion = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            "SELECT afiche FROM excursiones WHERE id_excursion = $1",
            [id]
        );

        if (resultado.rows.length === 0 || !resultado.rows[0].afiche) {

            return res.status(404).json({
                mensaje: "No hay imagen"
            });

        }

        const bytes = resultado.rows[0].afiche;

        res.set("Content-Type", tipoDeImagenExcursion(bytes));

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

const tipoDeImagenExcursion = (bytes) => {

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

    obtenerExcursiones,

    crearExcursion,

    actualizarExcursion,

    eliminarExcursion,

    guardarImagenExcursion,

    obtenerImagenExcursion

};
