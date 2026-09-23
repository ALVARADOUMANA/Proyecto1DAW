/**
 * ==========================================
 * Conexion a PostgreSQL
 * ==========================================
 *
 * Patron tomado de: S4-SW/db/database.js
 *
 * Sesion 5: este archivo es el responsable exclusivo de establecer
 * la conexion con PostgreSQL. REPRESENTA LA CAPA DE DATOS.
 */

const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool({

    user: process.env.PG_USER,

    host: process.env.PG_HOST,

    database: process.env.PG_DATABASE,

    password: process.env.PG_PASSWORD,

    port: process.env.PG_PORT

});

module.exports = pool;
