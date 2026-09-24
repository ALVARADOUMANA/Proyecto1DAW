/**
 * ==========================================
 * Controlador de Destinos
 * ==========================================
 */

const pool = require("../db/database");

const LogService = require("../services/logService");

// Obtener todos
const obtenerDestinos = async (req, res) => {

    try {

        /*=========================================
          CARGA EAGER: INNER JOIN con regiones
          en una sola consulta.
        =========================================*/

        const resultado = await pool.query(
            "SELECT d.id_destino, d.id_region, d.nombre, d.categoria, d.altitud, d.temporada_alta, d.costo_entrada, d.horario, d.requiere_guia, r.nombre AS region_nombre, r.pais AS region_pais FROM destinos d INNER JOIN regiones r ON d.id_region = r.id_region ORDER BY d.id_destino"
        );

        LogService.registrar(
            "Consultar destinos",
            req.query.usuario
        );

        res.json(resultado.rows);

    } catch (error) {

        console.error(error);

        LogService.registrar(
            "Error consultando destinos",
            req.query.usuario
        );

        res.status(500).json({
            mensaje: "Error al obtener destinos"
        });

    }

};

// Crear
const crearDestino = async (req, res) => {

    try {

        const resultado = await pool.query(
            "INSERT INTO destinos (id_region, nombre, categoria, altitud, temporada_alta, costo_entrada, horario, requiere_guia) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_destino, id_region, nombre, categoria, altitud, temporada_alta, costo_entrada, horario, requiere_guia",
            [
                req.body.id_region,
                req.body.nombre,
                req.body.categoria,
                req.body.altitud,
                req.body.temporada_alta,
                req.body.costo_entrada,
                req.body.horario,
                req.body.requiere_guia
            ]
        );

        LogService.registrar(
            "Crear destino " + resultado.rows[0].id_destino,
            req.body.usuario
        );

        res.status(201).json(resultado.rows[0]);

    } catch (error) {

        console.error(error);

        LogService.registrar(
            "Error al crear destino: " + error.message,
            req.body.usuario
        );

        res.status(500).json({
            mensaje: "Error al crear el destino"
        });

    }

};

// Actualizar
const actualizarDestino = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            "UPDATE destinos SET id_region = $1, nombre = $2, categoria = $3, altitud = $4, temporada_alta = $5, costo_entrada = $6, horario = $7, requiere_guia = $8 WHERE id_destino = $9 RETURNING id_destino, id_region, nombre, categoria, altitud, temporada_alta, costo_entrada, horario, requiere_guia",
            [
                req.body.id_region,
                req.body.nombre,
                req.body.categoria,
                req.body.altitud,
                req.body.temporada_alta,
                req.body.costo_entrada,
                req.body.horario,
                req.body.requiere_guia,
                id
            ]
        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Destino no encontrado"
            });

        }

        LogService.registrar(
            "Actualizar destino " + id,
            req.body.usuario
        );

        res.json(resultado.rows[0]);

    } catch (error) {

        console.error(error);

        LogService.registrar(
            "Error al actualizar destino: " + error.message,
            req.body.usuario
        );

        res.status(500).json({
            mensaje: "Error al actualizar el destino"
        });

    }

};

// Eliminar
const eliminarDestino = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            "DELETE FROM destinos WHERE id_destino = $1 RETURNING id_destino",
            [id]
        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Destino no encontrado"
            });

        }

        LogService.registrar(
            "Eliminar destino " + id,
            req.query.usuario
        );

        res.json({
            mensaje: "Destino eliminado correctamente"
        });

    } catch (error) {

        console.error(error);

        LogService.registrar(
            "Error al eliminar destino: " + error.message,
            req.query.usuario
        );

        res.status(500).json({
            mensaje: "Error al eliminar el destino"
        });

    }

};

// ==========================================
// IMAGEN EN BINARIO
// ==========================================

// express.raw entrega el cuerpo tal cual: req.body es un Buffer
// y se escribe directo en la columna BYTEA.

const guardarImagenDestinos = async (req, res) => {

    try {

        const { id } = req.params;

        if (!req.body || req.body.length === 0) {

            return res.status(400).json({
                mensaje: "No se recibio ninguna imagen"
            });

        }

        const resultado = await pool.query(
            "UPDATE destinos SET imagen = $1 WHERE id_destino = $2 RETURNING id_destino",
            [req.body, id]
        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });

        }

        LogService.registrar(
            "Guardar imagen en destinos " + id,
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

const obtenerImagenDestinos = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            "SELECT imagen FROM destinos WHERE id_destino = $1",
            [id]
        );

        if (resultado.rows.length === 0 || !resultado.rows[0].imagen) {

            return res.status(404).json({
                mensaje: "No hay imagen"
            });

        }

        const bytes = resultado.rows[0].imagen;

        res.set("Content-Type", tipoDeImagenDestinos(bytes));

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

const tipoDeImagenDestinos = (bytes) => {

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

    obtenerDestinos,

    crearDestino,

    actualizarDestino,

    eliminarDestino,

    guardarImagenDestinos,

    obtenerImagenDestinos

};
