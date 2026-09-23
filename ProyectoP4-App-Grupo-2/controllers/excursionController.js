/**
 * ==========================================
 * Controlador de Excursiones
 * ==========================================
 *
 * Patron tomado de: S4-SW/controllers/productoController.js
 *
 * PARTE 2 - semana 4 - PostgreSQL con el driver "pg".
 * Segun la sesion 5, el controlador y las rutas representan la capa
 * de presentacion y "db/database.js" representa la capa de datos.
 *
 * IMAGEN SERIALIZADA
 * La columna "afiche" es BYTEA (binario) en PostgreSQL. Para que
 * viaje hacia y desde la vista se serializa a texto base64:
 *   - al leer:     encode(afiche, 'base64')
 *     encode() corta el texto en lineas de 76 caracteres
 *     (RFC 2045), asi que se le quitan los saltos con
 *     replace(..., chr(10), '') para que el data: URI de la
 *     vista quede en una sola linea.
 *   - al escribir: decode($n, 'base64')
 */

const pool = require("../db/database");

const LogService = require("../services/logService");

/*
 * ==========================================
 * CARGA EAGER
 * ==========================================
 *
 * Sesion 8: Lazy y Eager "aparecen o se implementan con ORM / ODM".
 * La semana 4 no usa ORM, asi que el equivalente directo en SQL es
 * resolver la relacion dentro de la MISMA consulta con un INNER JOIN.
 *
 * En "obtenerExcursiones" se traen, de una sola ida a la base, el
 * registro de "excursiones" y los datos de su padre "operadores".
 * La alternativa perezosa seria listar excursiones y despues hacer una
 * consulta por cada fila para traer su operadores (problema N+1).
 *
 * Como se comprueba: la tabla de la vista muestra la columna
 * "operador_razon_social" sin ningun fetch adicional.
 */

// Obtener todos
const obtenerExcursiones = async (req, res) => {

    try {

        // ===== CARGA EAGER: padre e hijo en una sola consulta =====

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
            "UPDATE excursiones SET id_operador = $1, titulo = $2, duracion_horas = $3, dificultad = $4, cupo_maximo = $5, precio_persona = $6, incluye_transporte = $7, fecha_salida = $8, afiche = decode($9, 'base64') WHERE id_excursion = $10 RETURNING id_excursion, id_operador, titulo, duracion_horas, dificultad, cupo_maximo, precio_persona, incluye_transporte, fecha_salida, replace(encode(afiche, 'base64'), chr(10), '') AS afiche",
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
