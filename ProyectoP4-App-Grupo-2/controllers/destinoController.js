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
          CARGA EAGER
          El INNER JOIN trae el destino junto con su
          regione en una sola consulta.
        =========================================*/

        const resultado = await pool.query(
            "SELECT d.id_destino, d.id_region, d.nombre, d.categoria, d.altitud, d.temporada_alta, d.costo_entrada, d.horario, d.requiere_guia, replace(encode(d.imagen, 'base64'), chr(10), '') AS imagen, r.nombre AS region_nombre, r.pais AS region_pais FROM destinos d INNER JOIN regiones r ON d.id_region = r.id_region ORDER BY d.id_destino"
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
            "INSERT INTO destinos (id_region, nombre, categoria, altitud, temporada_alta, costo_entrada, horario, requiere_guia, imagen) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, decode($9, 'base64')) RETURNING id_destino, id_region, nombre, categoria, altitud, temporada_alta, costo_entrada, horario, requiere_guia, replace(encode(imagen, 'base64'), chr(10), '') AS imagen",
            [
                req.body.id_region,
                req.body.nombre,
                req.body.categoria,
                req.body.altitud,
                req.body.temporada_alta,
                req.body.costo_entrada,
                req.body.horario,
                req.body.requiere_guia,
                req.body.imagen
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
            "UPDATE destinos SET id_region = $1, nombre = $2, categoria = $3, altitud = $4, temporada_alta = $5, costo_entrada = $6, horario = $7, requiere_guia = $8, imagen = COALESCE(decode($9, 'base64'), imagen) WHERE id_destino = $10 RETURNING id_destino, id_region, nombre, categoria, altitud, temporada_alta, costo_entrada, horario, requiere_guia, replace(encode(imagen, 'base64'), chr(10), '') AS imagen",
            [
                req.body.id_region,
                req.body.nombre,
                req.body.categoria,
                req.body.altitud,
                req.body.temporada_alta,
                req.body.costo_entrada,
                req.body.horario,
                req.body.requiere_guia,
                req.body.imagen,
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

module.exports = {

    obtenerDestinos,

    crearDestino,

    actualizarDestino,

    eliminarDestino

};
