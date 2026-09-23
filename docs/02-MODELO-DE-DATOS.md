# 02 — Modelo de datos · Tema 7: Turismo y lugares por visitar

El enunciado exige que los **2 segmentos del tema** se ajusten "de forma lógica y coherente
entre sí". Los segmentos son:

- **Segmento A — Lugares por visitar:** los sitios físicos (regiones, destinos, sitios).
- **Segmento B — Turismo:** el producto comercial que se vende sobre esos sitios
  (tours, operadores, excursiones, itinerarios).

La coherencia se sostiene con una idea única en todo el proyecto: **B siempre apunta a A**.
Un tour se hace en un lugar; una excursión la vende un operador y ocurre en destinos; un
itinerario encadena varios sitios.

---

## PARTE 1 — Archivos planos `.txt` (semana 2)

Formato de registro: una línea por registro, campos separados por `;`, sin encabezados.
Es exactamente el formato de `ProyectoEstudiantes/data/estudiantes.txt`.

### `data/lugares.txt` — vista "CRUD DE LUGARES" *(segmento A)*

| # | Campo | Tipo | Validación (patrón de `estudianteService.js`) |
|---|---|---|---|
| 1 | `codigo` | texto | obligatorio · llave · no puede repetirse |
| 2 | `nombre` | texto | obligatorio |
| 3 | `provincia` | texto | obligatorio |
| 4 | `categoria` | texto | obligatorio |
| 5 | `calificacion` | numérico | `isNaN` → error · rango **0 a 100** |

```
LUG001;Volcán Poás;Alajuela;Parque Nacional;95
LUG002;Playa Manuel Antonio;Puntarenas;Playa;98
LUG003;Monteverde;Puntarenas;Bosque Nuboso;93
```

`calificacion` conserva el rango 0–100 de `promedio` para reutilizar la validación de
clase sin retocarla.

### `data/tours.txt` — vista "CRUD DE TOURS" *(segmento B)*

| # | Campo | Tipo | Validación |
|---|---|---|---|
| 1 | `codigo` | texto | obligatorio · llave · no puede repetirse |
| 2 | `nombre` | texto | obligatorio |
| 3 | `lugar` | texto | obligatorio · **es el `codigo` de un lugar** |
| 4 | `duracion` | texto | obligatorio |
| 5 | `precio` | numérico | `isNaN` → error · rango **0 a 5000** |

```
TUR001;Ascenso al cráter;LUG001;4 horas;45
TUR002;Senderismo y playa;LUG002;6 horas;60
TUR003;Puentes colgantes;LUG003;3 horas;38
```

**Relación entre las 2 vistas:** `tours.lugar` referencia `lugares.codigo`. Es la relación
más fuerte que permite un repositorio de archivos planos — los `.txt` de semana 2 no tienen
llaves foráneas — y se valida en `tourService.js` consultando `lugarDAO.buscarPorCodigo()`
antes de guardar.

### `data/usuarios.txt`

Formato `usuario;password`, igual que el material.

```
admin;12345
guia;abc123
recepcion;clave456
```

### `data/log.txt`

Formato exigido por el enunciado: `Fecha – Hora / "Acción Realizada" / Usuario`.

```
05/09/2026 – 14:32:10 / "Autenticación fallida" / admin
05/09/2026 – 14:32:41 / "Autenticación correcta" / admin
05/09/2026 – 14:33:02 / "Guardar lugar LUG004" / admin
```

---

## PARTE 2 — PostgreSQL `BDPostgreSQL` (semana 4)

Cuatro tablas, dos por vista, relacionadas con llave foránea y consultadas con `JOIN`.

**Conteo de campos.** El enunciado pide *"8 campos (sin contar campos de llaves/relaciones)"*
y además que **cada tabla** tenga un campo de imagen binaria. Se interpreta que el campo de
imagen es **uno de los 8**: 7 campos de datos + 1 campo binario. Las llaves (`id_*`) no se
cuentan. Ver el supuesto en `03-DECISIONES.md`.

Los 32 nombres de campo de la vista 3 y la vista 4 son **todos distintos entre sí**, como
exige el enunciado.

### Vista 3 — `destinos.html` · tablas `regiones` → `destinos`

#### `regiones` *(segmento A, padre)*

| # | Campo | Tipo PostgreSQL |
|---|---|---|
| — | `id_region` | `SERIAL PRIMARY KEY` *(llave, no cuenta)* |
| 1 | `nombre` | `VARCHAR(100) NOT NULL` |
| 2 | `pais` | `VARCHAR(60) NOT NULL` |
| 3 | `clima` | `VARCHAR(50)` |
| 4 | `idioma` | `VARCHAR(50)` |
| 5 | `moneda` | `VARCHAR(30)` |
| 6 | `huso_horario` | `VARCHAR(20)` |
| 7 | `descripcion` | `TEXT` |
| 8 | `imagen` | **`BYTEA`** |

#### `destinos` *(segmento A, hijo)*

| # | Campo | Tipo PostgreSQL |
|---|---|---|
| — | `id_destino` | `SERIAL PRIMARY KEY` *(llave)* |
| — | `id_region` | `INTEGER REFERENCES regiones(id_region)` *(relación)* |
| 1 | `nombre` | `VARCHAR(100) NOT NULL` |
| 2 | `categoria` | `VARCHAR(50)` |
| 3 | `altitud` | `INTEGER` |
| 4 | `temporada_alta` | `VARCHAR(50)` |
| 5 | `costo_entrada` | `NUMERIC(10,2)` |
| 6 | `horario` | `VARCHAR(50)` |
| 7 | `requiere_guia` | `BOOLEAN` |
| 8 | `imagen` | **`BYTEA`** |

### Vista 4 — `excursiones.html` · tablas `operadores` → `excursiones`

#### `operadores` *(segmento B, padre)*

| # | Campo | Tipo PostgreSQL |
|---|---|---|
| — | `id_operador` | `SERIAL PRIMARY KEY` *(llave)* |
| 1 | `razon_social` | `VARCHAR(120) NOT NULL` |
| 2 | `cedula_juridica` | `VARCHAR(20)` |
| 3 | `telefono` | `VARCHAR(20)` |
| 4 | `correo` | `VARCHAR(120)` |
| 5 | `sitio_web` | `VARCHAR(150)` |
| 6 | `anios_experiencia` | `INTEGER` |
| 7 | `calificacion_promedio` | `NUMERIC(3,1)` |
| 8 | `logo` | **`BYTEA`** |

#### `excursiones` *(segmento B, hijo)*

| # | Campo | Tipo PostgreSQL |
|---|---|---|
| — | `id_excursion` | `SERIAL PRIMARY KEY` *(llave)* |
| — | `id_operador` | `INTEGER REFERENCES operadores(id_operador)` *(relación)* |
| 1 | `titulo` | `VARCHAR(120) NOT NULL` |
| 2 | `duracion_horas` | `INTEGER` |
| 3 | `dificultad` | `VARCHAR(30)` |
| 4 | `cupo_maximo` | `INTEGER` |
| 5 | `precio_persona` | `NUMERIC(10,2)` |
| 6 | `incluye_transporte` | `BOOLEAN` |
| 7 | `fecha_salida` | `DATE` |
| 8 | `afiche` | **`BYTEA`** |

### Dónde y cómo se usa la Carga Eager

El enunciado obliga a *"señalar puntualmente dónde y cómo se usó"*. Queda en dos lugares,
marcados con un comentario `// ===== CARGA EAGER =====` en el código:

| Archivo | Función | Consulta |
|---|---|---|
| `controllers/destinoController.js` | `obtenerDestinos` | `SELECT d.…, r.nombre AS region_nombre, r.pais AS region_pais FROM destinos d INNER JOIN regiones r ON d.id_region = r.id_region ORDER BY d.id_destino` |
| `controllers/excursionController.js` | `obtenerExcursiones` | `SELECT e.…, o.razon_social AS operador_razon_social, o.telefono AS operador_telefono FROM excursiones e INNER JOIN operadores o ON e.id_operador = o.id_operador ORDER BY e.id_excursion` |

**Por qué es Eager:** en una **sola** consulta se traen el hijo y los datos del padre. La
alternativa perezosa sería consultar los destinos y después, por cada fila, una consulta
extra a `regiones` — el problema N+1. La tabla de la vista muestra la columna del padre sin
disparar ningún `fetch` adicional, que es la prueba visible de que la carga fue anticipada.

La definición del profesor está en `knowledge/sesion8.md`; cómo se mapea a este
código, en `03-DECISIONES.md`.

### Imágenes binarias serializadas

- **En la base:** columna `BYTEA`. Es el tipo binario de PostgreSQL según
  `knowledge/05-MYSQL-VS-POSTGRESQL.md` (*"Binario: MySQL `BLOB` ↔ PostgreSQL `BYTEA`"*).
- **Desde la vista:** el `<input type="file">` se lee con `FileReader.readAsDataURL()`, se
  toma la parte base64 y viaja dentro del mismo `JSON.stringify` del `fetch` que ya usa el
  material. Esa es la **serialización**.
- **En el controlador:** `Buffer.from(base64, "base64")` para guardar, y
  `fila.imagen.toString("base64")` para devolverla a la vista, que la pinta en un
  `<img src="data:image/...;base64,…">`.

---

## PARTE 3 — MongoDB, colección `CollMongoDB` (semana 5)

Las dos vistas escriben en la **misma colección** `CollMongoDB`, tal como lo pide el
enunciado (los dos scripts `.JSON` poblan esa colección).

Se distinguen **sin agregar campos extra**, por un campo que solo existe en cada forma de
documento: los sitios tienen `latitud`, los itinerarios tienen `duracion_dias`. El filtro es
`{ latitud: { $exists: true } }` y `{ duracion_dias: { $exists: true } }`. Así se respeta
el conteo exacto de 15 y 25 campos. Ver el supuesto en `03-DECISIONES.md`.

`_id` lo genera MongoDB y **no se cuenta** como campo, igual que en `Semana6/dao/ProductoDAO.js`.

### Vista 5 — `sitios.html` · **60 documentos × 15 campos** *(segmento A)*

| # | Campo | Tipo |
|---|---|---|
| 1 | `codigo` | string |
| 2 | `nombre` | string |
| 3 | `pais` | string |
| 4 | `provincia` | string |
| 5 | `canton` | string |
| 6 | `categoria` | string |
| 7 | `descripcion` | string |
| 8 | `latitud` | number |
| 9 | `longitud` | number |
| 10 | `altitud_msnm` | number |
| 11 | `costo_entrada` | number |
| 12 | `moneda` | string |
| 13 | `horario` | string |
| 14 | `calificacion` | number |
| 15 | `imagen` | **binario serializado (base64)** |

### Vista 6 — `itinerarios.html` · **120 documentos × 25 campos** *(segmento B)*

| # | Campo | Tipo | | # | Campo | Tipo |
|---|---|---|---|---|---|---|
| 1 | `codigo` | string | | 14 | `incluye_alimentacion` | boolean |
| 2 | `nombre` | string | | 15 | `incluye_hospedaje` | boolean |
| 3 | `descripcion` | string | | 16 | `nivel_dificultad` | string |
| 4 | `pais` | string | | 17 | `edad_minima` | number |
| 5 | `region` | string | | 18 | `idioma_guia` | string |
| 6 | `duracion_dias` | number | | 19 | `punto_encuentro` | string |
| 7 | `duracion_noches` | number | | 20 | `hora_salida` | string |
| 8 | `cupo_minimo` | number | | 21 | `hora_regreso` | string |
| 9 | `cupo_maximo` | number | | 22 | `temporada` | string |
| 10 | `precio_adulto` | number | | 23 | `politica_cancelacion` | string |
| 11 | `precio_nino` | number | | 24 | `sitios_incluidos` | **array de `codigo` de sitios** |
| 12 | `moneda` | string | | 25 | `afiche` | **binario serializado (base64)** |
| 13 | `incluye_transporte` | boolean | | | | |

Ningún nombre de campo se repite entre las dos formas de documento, salvo los que el
enunciado no prohíbe repetir y que sostienen la coherencia del tema (`codigo`, `nombre`,
`descripcion`, `pais`, `moneda`).

**Relación entre las 2 vistas:** `itinerario.sitios_incluidos` es un arreglo con los
`codigo` de los documentos de sitios. Cada código del arreglo debe existir entre los 60
sitios. Eso da la *"coherencia lógica de la información para almacenar y consultar"* que
pide el enunciado.

### Dónde y cómo se usa la Carga Lazy

Marcado con `// ===== CARGA LAZY =====` en el código:

| Archivo | Método | Cómo |
|---|---|---|
| `dao/SitioDAO.js` | `obtenerTodos()` | `.find(filtro, { projection: { imagen: 0 } })` |
| `dao/SitioDAO.js` | `obtenerPorId(id)` | `findOne({_id})` — sin proyección, trae el binario |
| `dao/ItinerarioDAO.js` | `obtenerTodos()` | `.find(filtro, { projection: { afiche: 0 } })` |
| `dao/ItinerarioDAO.js` | `obtenerPorId(id)` | `findOne({_id})` — trae el binario |

**Por qué es Lazy:** el campo pesado (la imagen) **no se carga** al listar. Solo se trae
cuando el usuario consulta un documento concreto, es decir, en el momento en que de verdad
se necesita. Con 120 documentos la diferencia es visible en el tamaño de la respuesta, y esa
es la demostración que se enseña en la presentación.

La definición del profesor está en `knowledge/sesion8.md`; cómo se mapea a este
código, en `03-DECISIONES.md`.
