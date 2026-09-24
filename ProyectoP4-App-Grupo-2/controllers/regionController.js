/**
 * ==========================================
 * Controlador de Regiones
 * ==========================================
 */

const pool = require("../db/database");

const LogService = require("../services/logService");

// Obtener todos
const obtenerRegiones = async (req, res) => {

    try {

        const resultado = await pool.query(
            "SELECT id_region, nombre, pais, clima, idioma, moneda, huso_horario, descripcion FROM regiones ORDER BY id_region"
        );

        LogService.registrar(
            "Consultar regiones",
            req.query.usuario
        );

        res.json(resultado.rows);

    } catch (error) {

        console.error(error);

        LogService.registrar(
            "Error consultando regiones",
            req.query.usuario
        );

        res.status(500).json({
            mensaje: "Error al obtener regiones"
        });

    }

};

// Crear
const crearRegion = async (req, res) => {

    try {

        const resultado = await pool.query(
            "INSERT INTO regiones (nombre, pais, clima, idioma, moneda, huso_horario, descripcion) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_region, nombre, pais, clima, idioma, moneda, huso_horario, descripcion",
            [
                req.body.nombre,
                req.body.pais,
                req.body.clima,
                req.body.idioma,
                req.body.moneda,
                req.body.huso_horario,
                req.body.descripcion
            ]
        );

        LogService.registrar(
            "Crear region " + resultado.rows[0].id_region,
            req.body.usuario
        );

        res.status(201).json(resultado.rows[0]);

    } catch (error) {

        console.error(error);

        LogService.registrar(
            "Error al crear region: " + error.message,
            req.body.usuario
        );

        res.status(500).json({
            mensaje: "Error al crear la región"
        });

    }

};

// Actualizar
const actualizarRegion = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            "UPDATE regiones SET nombre = $1, pais = $2, clima = $3, idioma = $4, moneda = $5, huso_horario = $6, descripcion = $7 WHERE id_region = $8 RETURNING id_region, nombre, pais, clima, idioma, moneda, huso_horario, descripcion",
            [
                req.body.nombre,
                req.body.pais,
                req.body.clima,
                req.body.idioma,
                req.body.moneda,
                req.body.huso_horario,
                req.body.descripcion,
                id
            ]
        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Región no encontrada"
            });

        }

        LogService.registrar(
            "Actualizar region " + id,
            req.body.usuario
        );

        res.json(resultado.rows[0]);

    } catch (error) {

        console.error(error);

        LogService.registrar(
            "Error al actualizar region: " + error.message,
            req.body.usuario
        );

        res.status(500).json({
            mensaje: "Error al actualizar la región"
        });

    }

};

// Eliminar
const eliminarRegion = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            "DELETE FROM regiones WHERE id_region = $1 RETURNING id_region",
            [id]
        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Región no encontrada"
            });

        }

        LogService.registrar(
            "Eliminar region " + id,
            req.query.usuario
        );

        res.json({
            mensaje: "Región eliminada correctamente"
        });

    } catch (error) {

        console.error(error);

        LogService.registrar(
            "Error al eliminar region: " + error.message,
            req.query.usuario
        );

        res.status(500).json({
            mensaje: "Error al eliminar la región"
        });

    }

};

// ==========================================
// IMAGEN EN BINARIO
// ==========================================

// express.raw entrega el cuerpo tal cual: req.body es un Buffer
// y se escribe directo en la columna BYTEA.

const guardarImagenRegion = async (req, res) => {

    try {

        const { id } = req.params;

        if (!req.body || req.body.length === 0) {

            return res.status(400).json({
                mensaje: "No se recibio ninguna imagen"
            });

        }

        const resultado = await pool.query(
            "UPDATE regiones SET imagen = $1 WHERE id_region = $2 RETURNING id_region",
            [req.body, id]
        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });

        }

        LogService.registrar(
            "Guardar imagen en regiones " + id,
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

const obtenerImagenRegion = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            "SELECT imagen FROM regiones WHERE id_region = $1",
            [id]
        );

        if (resultado.rows.length === 0 || !resultado.rows[0].imagen) {

            return res.status(404).json({
                mensaje: "No hay imagen"
            });

        }

        const bytes = resultado.rows[0].imagen;

        res.set("Content-Type", tipoDeImagenRegion(bytes));

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

const tipoDeImagenRegion = (bytes) => {

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

    obtenerRegiones,

    crearRegion,

    actualizarRegion,

    eliminarRegion,

    guardarImagenRegion,

    obtenerImagenRegion

};
