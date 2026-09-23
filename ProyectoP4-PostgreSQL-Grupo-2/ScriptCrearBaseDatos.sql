-- ============================================================
-- EIF509 - Desarrollo de Aplicaciones Basadas en Web
-- Proyecto 1 - Grupo 2
-- Tema 7: Turismo y lugares por visitar
--
-- PARTE 2 - Crear la base de datos y las 4 tablas
-- ============================================================
--
-- COMO SE CORRE EN pgAdmin 4:
--   1. Abrir el Query Tool conectado a la base "postgres".
--   2. Ejecutar unicamente la linea del CREATE DATABASE.
--   3. Volver a abrir el Query Tool, ahora conectado a
--      "BDPostgreSQL", y ejecutar el resto del script.
--
-- ============================================================


-- ============================================================
-- 1. BASE DE DATOS
-- ============================================================

CREATE DATABASE "BDPostgreSQL";


-- ============================================================
-- A partir de aqui hay que estar conectado a "BDPostgreSQL"
-- ============================================================

DROP TABLE IF EXISTS excursiones;
DROP TABLE IF EXISTS operadores;
DROP TABLE IF EXISTS destinos;
DROP TABLE IF EXISTS regiones;


-- ============================================================
-- 2. VISTA 3 - REGIONES (padre) y DESTINOS (hijo)
-- ============================================================

-- ------------------------------------------------------------
-- regiones: 8 campos sin contar la llave
--   nombre, pais, clima, idioma, moneda, huso_horario,
--   descripcion, imagen
--
-- "imagen" es BYTEA: el tipo binario de PostgreSQL, el
-- equivalente al BLOB de MySQL. La aplicacion la escribe con
-- decode($n,'base64') y la lee con encode(imagen,'base64'),
-- que es la serializacion desde y hacia la vista.
-- ------------------------------------------------------------

CREATE TABLE regiones (

    id_region     SERIAL PRIMARY KEY,

    nombre        VARCHAR(100) NOT NULL,
    pais          VARCHAR(60)  NOT NULL,
    clima         VARCHAR(50),
    idioma        VARCHAR(50),
    moneda        VARCHAR(30),
    huso_horario  VARCHAR(20),
    descripcion   TEXT,
    imagen        BYTEA

);


-- ------------------------------------------------------------
-- destinos: 8 campos sin contar la llave ni la relacion
--   nombre, categoria, altitud, temporada_alta,
--   costo_entrada, horario, requiere_guia, imagen
--
-- id_region es la LLAVE FORANEA hacia regiones. Es la que usa
-- el INNER JOIN de la carga Eager en destinoController.js
-- ------------------------------------------------------------

CREATE TABLE destinos (

    id_destino      SERIAL PRIMARY KEY,

    id_region       INTEGER NOT NULL
                    REFERENCES regiones(id_region),

    nombre          VARCHAR(100) NOT NULL,
    categoria       VARCHAR(50),
    altitud         INTEGER,
    temporada_alta  VARCHAR(50),
    costo_entrada   NUMERIC(10,2),
    horario         VARCHAR(50),
    requiere_guia   BOOLEAN,
    imagen          BYTEA

);


-- ============================================================
-- 3. VISTA 4 - OPERADORES (padre) y EXCURSIONES (hijo)
--
-- Los 8 campos de cada una son DIFERENTES a los de la vista
-- anterior, como exige el enunciado.
-- ============================================================

-- ------------------------------------------------------------
-- operadores: 8 campos sin contar la llave
--   razon_social, cedula_juridica, telefono, correo,
--   sitio_web, anios_experiencia, calificacion_promedio, logo
-- ------------------------------------------------------------

CREATE TABLE operadores (

    id_operador            SERIAL PRIMARY KEY,

    razon_social           VARCHAR(120) NOT NULL,
    cedula_juridica        VARCHAR(20),
    telefono               VARCHAR(20),
    correo                 VARCHAR(120),
    sitio_web              VARCHAR(150),
    anios_experiencia      INTEGER,
    calificacion_promedio  NUMERIC(3,1),
    logo                   BYTEA

);


-- ------------------------------------------------------------
-- excursiones: 8 campos sin contar la llave ni la relacion
--   titulo, duracion_horas, dificultad, cupo_maximo,
--   precio_persona, incluye_transporte, fecha_salida, afiche
--
-- id_operador es la LLAVE FORANEA hacia operadores. Es la que
-- usa el INNER JOIN de la carga Eager en excursionController.js
-- ------------------------------------------------------------

CREATE TABLE excursiones (

    id_excursion        SERIAL PRIMARY KEY,

    id_operador         INTEGER NOT NULL
                        REFERENCES operadores(id_operador),

    titulo              VARCHAR(120) NOT NULL,
    duracion_horas      INTEGER,
    dificultad          VARCHAR(30),
    cupo_maximo         INTEGER,
    precio_persona      NUMERIC(10,2),
    incluye_transporte  BOOLEAN,
    fecha_salida        DATE,
    afiche              BYTEA

);
