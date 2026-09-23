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
          CARGA EAGER
          El INNER JOIN trae el excursione junto con su
          operadore en una sola consulta.
        =========================================*/

        const resultado = await pool.query(
            "SELECT e.id_excursion, e.id_operador, e.titulo, e.duracion_horas, e.dificultad, e.cupo_maximo, e.precio_persona, e.incluye_transporte, e.fecha_salida, replace(encode(e.afiche, 'base64'), chr(10), '') AS afiche, o.razon_social AS operador_razon_social, o.telefono AS operador_telefono FROM excursiones e INNER JOIN operadores o ON e.id_operador = o.id_operador ORDER BY e.id_excursion"
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
            "INSERT INTO excursiones (id_operador, titulo, duracion_horas, dificultad, cupo_maximo, precio_persona, incluye_transporte, fecha_salida, afiche) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, decode($9, 'base64')) RETURNING id_excursion, id_operador, titulo, duracion_horas, dificultad, cupo_maximo, precio_persona, incluye_transporte, fecha_salida, replace(encode(afiche, 'base64'), chr(10), '') AS afiche",
            [
                req.body.id_operador,
                req.body.titulo,
                req.body.duracion_horas,
                req.body.dificultad,
                req.body.cupo_maximo,
                req.body.precio_persona,
                req.body.incluye_transporte,
                req.body.fecha_salida,
                req.body.afiche
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
            mensaje: "Error al crear el excursion"
        });

    }

};

// Actualizar
const actualizarExcursion = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            "UPDATE excursiones SET id_operador = $1, titulo = $2, duracion_horas = $3, dificultad = $4, cupo_maximo = $5, precio_persona = $6, incluye_transporte = $7, fecha_salida = $8, afiche = COALESCE(decode($9, 'base64'), afiche) WHERE id_excursion = $10 RETURNING id_excursion, id_operador, titulo, duracion_horas, dificultad, cupo_maximo, precio_persona, incluye_transporte, fecha_salida, replace(encode(afiche, 'base64'), chr(10), '') AS afiche",
            [
                req.body.id_operador,
                req.body.titulo,
                req.body.duracion_horas,
                req.body.dificultad,
                req.body.cupo_maximo,
                req.body.precio_persona,
                req.body.incluye_transporte,
                req.body.fecha_salida,
                req.body.afiche,
                id
            ]
        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Excursion no encontrado"
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
            mensaje: "Error al actualizar el excursion"
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
                mensaje: "Excursion no encontrado"
            });

        }

        LogService.registrar(
            "Eliminar excursion " + id,
            req.query.usuario
        );

        res.json({
            mensaje: "Excursion eliminado correctamente"
        });

    } catch (error) {

        console.error(error);

        LogService.registrar(
            "Error al eliminar excursion: " + error.message,
            req.query.usuario
        );

        res.status(500).json({
            mensaje: "Error al eliminar el excursion"
        });

    }

};

module.exports = {

    obtenerExcursiones,

    crearExcursion,

    actualizarExcursion,

    eliminarExcursion

};
