/**
 * ==========================================
 * Controlador de Regiones
 * ==========================================
 *
 * Patron tomado de: S4-SW/controllers/productoController.js
 *
 * PARTE 2 - semana 4 - PostgreSQL con el driver "pg".
 * Segun la sesion 5, el controlador y las rutas representan la capa
 * de presentacion y "db/database.js" representa la capa de datos.
 *
 * IMAGEN SERIALIZADA
 * La columna "imagen" es BYTEA (binario) en PostgreSQL. Para que
 * viaje hacia y desde la vista se serializa a texto base64:
 *   - al leer:     encode(imagen, 'base64')
 *     encode() corta el texto en lineas de 76 caracteres
 *     (RFC 2045), asi que se le quitan los saltos con
 *     replace(..., chr(10), '') para que el data: URI de la
 *     vista quede en una sola linea.
 *   - al escribir: decode($n, 'base64')
 */

const pool = require("../db/database");

const LogService = require("../services/logService");

// Obtener todos
const obtenerRegiones = async (req, res) => {

    try {

        const resultado = await pool.query(
            "SELECT id_region, nombre, pais, clima, idioma, moneda, huso_horario, descripcion, replace(encode(imagen, 'base64'), chr(10), '') AS imagen FROM regiones ORDER BY id_region"
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
            "INSERT INTO regiones (nombre, pais, clima, idioma, moneda, huso_horario, descripcion, imagen) VALUES ($1, $2, $3, $4, $5, $6, $7, decode($8, 'base64')) RETURNING id_region, nombre, pais, clima, idioma, moneda, huso_horario, descripcion, replace(encode(imagen, 'base64'), chr(10), '') AS imagen",
            [
                req.body.nombre,
                req.body.pais,
                req.body.clima,
                req.body.idioma,
                req.body.moneda,
                req.body.huso_horario,
                req.body.descripcion,
                req.body.imagen
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
            mensaje: "Error al crear el region"
        });

    }

};

// Actualizar
const actualizarRegion = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            "UPDATE regiones SET nombre = $1, pais = $2, clima = $3, idioma = $4, moneda = $5, huso_horario = $6, descripcion = $7, imagen = decode($8, 'base64') WHERE id_region = $9 RETURNING id_region, nombre, pais, clima, idioma, moneda, huso_horario, descripcion, replace(encode(imagen, 'base64'), chr(10), '') AS imagen",
            [
                req.body.nombre,
                req.body.pais,
                req.body.clima,
                req.body.idioma,
                req.body.moneda,
                req.body.huso_horario,
                req.body.descripcion,
                req.body.imagen,
                id
            ]
        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Region no encontrado"
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
            mensaje: "Error al actualizar el region"
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
                mensaje: "Region no encontrado"
            });

        }

        LogService.registrar(
            "Eliminar region " + id,
            req.query.usuario
        );

        res.json({
            mensaje: "Region eliminado correctamente"
        });

    } catch (error) {

        console.error(error);

        LogService.registrar(
            "Error al eliminar region: " + error.message,
            req.query.usuario
        );

        res.status(500).json({
            mensaje: "Error al eliminar el region"
        });

    }

};

module.exports = {

    obtenerRegiones,

    crearRegion,

    actualizarRegion,

    eliminarRegion

};
