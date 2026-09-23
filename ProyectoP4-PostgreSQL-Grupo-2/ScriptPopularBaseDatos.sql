-- ============================================================
-- EIF509 - Desarrollo de Aplicaciones Basadas en Web
-- Proyecto 1 - Grupo 2
-- Tema 7: Turismo y lugares por visitar
--
-- PARTE 2 - Popular la base de datos
--
-- Correr con el Query Tool conectado a "proyecto1grupo2",
-- despues de ScriptCrearBaseDatos.sql
-- ============================================================
--
-- Los campos de imagen (regiones.imagen, destinos.imagen,
-- operadores.logo, excursiones.afiche) quedan en NULL. Son BYTEA
-- y se cargan desde la aplicacion, que es lo que pide el
-- enunciado: "manejadas de forma serializada desde la vista".
--
-- ============================================================


-- ============================================================
-- Limpiar antes de poblar
-- El orden importa por las llaves foraneas: primero los hijos.
-- ============================================================

DELETE FROM excursiones;
DELETE FROM operadores;
DELETE FROM destinos;
DELETE FROM regiones;

ALTER SEQUENCE regiones_id_region_seq     RESTART WITH 1;
ALTER SEQUENCE destinos_id_destino_seq    RESTART WITH 1;
ALTER SEQUENCE operadores_id_operador_seq RESTART WITH 1;
ALTER SEQUENCE excursiones_id_excursion_seq RESTART WITH 1;


-- ============================================================
-- REGIONES (segmento "lugares por visitar")
-- ============================================================

INSERT INTO regiones
    (nombre, pais, clima, idioma, moneda, huso_horario, descripcion)
VALUES
    ('Valle Central', 'Costa Rica', 'Templado', 'Espanol', 'Colon', 'UTC-6',
     'Region montanosa donde se concentran los volcanes activos y la capital.'),

    ('Pacifico Central', 'Costa Rica', 'Tropical seco', 'Espanol', 'Colon', 'UTC-6',
     'Franja costera de playas y parques nacionales con acceso desde San Jose.'),

    ('Guanacaste', 'Costa Rica', 'Tropical seco', 'Espanol', 'Colon', 'UTC-6',
     'Provincia del noroeste, playas extensas y sabana con estacion seca marcada.'),

    ('Zona Norte', 'Costa Rica', 'Tropical humedo', 'Espanol', 'Colon', 'UTC-6',
     'Llanuras y bosque lluvioso alrededor del volcan Arenal.'),

    ('Caribe Sur', 'Costa Rica', 'Tropical humedo', 'Espanol', 'Colon', 'UTC-6',
     'Costa atlantica con influencia afrocaribena y arrecifes de coral.');


-- ============================================================
-- DESTINOS (hijos de regiones)
-- ============================================================

INSERT INTO destinos
    (id_region, nombre, categoria, altitud, temporada_alta,
     costo_entrada, horario, requiere_guia)
VALUES
    (1, 'Volcan Poas',            'Parque Nacional', 2708, 'Diciembre a Abril',  15.00, '08:00 - 14:00', true),
    (1, 'Volcan Irazu',           'Parque Nacional', 3432, 'Diciembre a Abril',  15.00, '08:00 - 15:30', false),
    (1, 'Catarata La Paz',        'Catarata',        1500, 'Todo el ano',        48.00, '08:00 - 17:00', false),

    (2, 'Manuel Antonio',         'Parque Nacional',    5, 'Diciembre a Abril',  18.00, '07:00 - 16:00', true),
    (2, 'Playa Jaco',             'Playa',              2, 'Diciembre a Abril',   0.00, 'Todo el dia',   false),
    (2, 'Isla Tortuga',           'Isla',               1, 'Enero a Mayo',       35.00, '09:00 - 16:00', true),

    (3, 'Playa Conchal',          'Playa',              3, 'Diciembre a Abril',   0.00, 'Todo el dia',   false),
    (3, 'Parque Rincon de la Vieja', 'Parque Nacional', 1916, 'Enero a Abril',   17.00, '08:00 - 15:00', true),

    (4, 'Volcan Arenal',          'Parque Nacional',  1670, 'Todo el ano',       15.00, '08:00 - 16:00', false),
    (4, 'Rio Celeste',            'Catarata',          600, 'Enero a Abril',     14.00, '08:00 - 14:00', true),
    (4, 'Monteverde',             'Bosque Nuboso',    1440, 'Diciembre a Abril', 25.00, '07:00 - 16:00', true),

    (5, 'Cahuita',                'Parque Nacional',     3, 'Febrero a Abril',    5.00, '08:00 - 16:00', false),
    (5, 'Puerto Viejo',           'Playa',               2, 'Febrero a Abril',    0.00, 'Todo el dia',   false),
    (5, 'Tortuguero',             'Parque Nacional',     1, 'Julio a Octubre',   15.00, '06:00 - 16:00', true);


-- ============================================================
-- OPERADORES (segmento "turismo")
-- ============================================================

INSERT INTO operadores
    (razon_social, cedula_juridica, telefono, correo, sitio_web,
     anios_experiencia, calificacion_promedio)
VALUES
    ('Aventuras Tropicales S.A.',   '3-101-234567', '2222-1010', 'info@aventurastropicales.cr', 'www.aventurastropicales.cr', 18,  4.7),
    ('Costa Verde Tours Ltda.',     '3-102-345678', '2233-2020', 'ventas@costaverdetours.cr',   'www.costaverdetours.cr',     12,  4.5),
    ('Pura Vida Expediciones S.A.', '3-101-456789', '2244-3030', 'contacto@puravidaexp.cr',     'www.puravidaexp.cr',          9,  4.8),
    ('Caribe Azul Travel S.A.',     '3-101-567890', '2755-4040', 'reservas@caribeazul.cr',      'www.caribeazul.cr',           6,  4.3),
    ('Guanacaste Sun Tours Ltda.',  '3-102-678901', '2666-5050', 'info@guanacastesun.cr',       'www.guanacastesun.cr',       15,  4.6);


-- ============================================================
-- EXCURSIONES (hijas de operadores)
-- ============================================================

INSERT INTO excursiones
    (id_operador, titulo, duracion_horas, dificultad, cupo_maximo,
     precio_persona, incluye_transporte, fecha_salida)
VALUES
    (1, 'Ascenso al crater del Poas',        4, 'Baja',  25,  65.00, true,  '2026-10-05'),
    (1, 'Volcan Irazu y Cartago',            8, 'Baja',  30,  89.00, true,  '2026-10-12'),
    (1, 'Catarata La Paz y jardines',        6, 'Baja',  20,  95.00, true,  '2026-10-19'),

    (2, 'Senderismo en Manuel Antonio',      6, 'Media', 15,  78.00, true,  '2026-10-07'),
    (2, 'Dia completo en Isla Tortuga',     10, 'Baja',  40, 120.00, true,  '2026-10-14'),

    (3, 'Puentes colgantes de Monteverde',   3, 'Baja',  18,  55.00, false, '2026-10-09'),
    (3, 'Caminata al Rio Celeste',           7, 'Alta',  12,  98.00, true,  '2026-10-16'),
    (3, 'Arenal y aguas termales',           9, 'Media', 22, 135.00, true,  '2026-10-23'),

    (4, 'Snorkel en Cahuita',                5, 'Media', 16,  72.00, false, '2026-10-11'),
    (4, 'Tortuguero en lancha',             12, 'Baja',  25, 180.00, true,  '2026-10-18'),

    (5, 'Playa Conchal y catamaran',         8, 'Baja',  35, 145.00, true,  '2026-10-10'),
    (5, 'Rincon de la Vieja completo',       9, 'Alta',  14, 110.00, true,  '2026-10-17');


-- ============================================================
-- Verificacion de los JOIN
-- ============================================================

-- Carga Eager de la vista 3: destinos con su region
SELECT d.id_destino, d.nombre, r.nombre AS region_nombre, r.pais AS region_pais
FROM destinos d
INNER JOIN regiones r ON d.id_region = r.id_region
ORDER BY d.id_destino;

-- Carga Eager de la vista 4: excursiones con su operador
SELECT e.id_excursion, e.titulo, o.razon_social AS operador_razon_social
FROM excursiones e
INNER JOIN operadores o ON e.id_operador = o.id_operador
ORDER BY e.id_excursion;
