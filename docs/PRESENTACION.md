# Guía de presentación — Grupo 2

10 minutos y el tiempo cuenta. El profesor puede preguntar sobre el código, así que abajo
está cada pregunta probable con el archivo y la línea donde está la respuesta.

**Regla de oro:** si pregunta *"¿dónde está esto?"*, abrí el archivo y señalá la línea. No
expliques de memoria.

---

## 1. Recorrido sugerido (7 minutos de clics)

| Min | Qué hacer |
|---|---|
| 0-1 | Login con clave mala → error + se registra en `log.txt`. Login con `admin`/`12345` → entra |
| 1-2 | **Lugares**: Guardar, Modificar, Consultar, Eliminar. Provocar un error: calificación 150 |
| 2-3 | **Tours**: guardar uno con un lugar que no existe → error. Es la relación entre las 2 vistas |
| 3-5 | **Destinos**: crear una región **con imagen**, crear un destino, señalar la columna `region_nombre` que viene del JOIN → **Eager** |
| 5-6 | **Excursiones**: mismo recorrido, mencionar que son otras 2 tablas con 8 campos distintos |
| 6-7 | **Sitios**: MOSTRAR TODOS (60, sin imagen → **Lazy**), crear uno con imagen, consultarlo → aparece la miniatura |
| 7 | Abrir `data/log.txt` y mostrar que quedó todo registrado |

Dejá **Itinerarios** para si sobra tiempo: son los 120 documentos de 25 campos.

---

## 2. Preguntas sobre la Parte 1 (semana 2)

**¿Dónde se valida el usuario y la contraseña?**

| Capa | Archivo | Línea |
|---|---|---|
| Vista | `public/js/login.js` | 86 guarda el usuario, 95 redirige |
| Controlador | `controllers/authController.js` | 37 llama al servicio, 49 responde ok, 61 responde 401 |
| Servicio | `services/authService.js` | 23 lanza el error |
| DAO | `dao/usuarioDAO.js` | 30 la función, 32 lee `usuarios.txt` |

**¿Y el archivo de usuarios?** → `data/usuarios.txt`, formato `usuario;password`.

**¿Cómo se guarda un registro en el `.txt`?**
`dao/lugarDAO.js` — `leerArchivo()` hace `split("\n")` y luego `split(";")`;
`escribirArchivo()` arma la línea con `;` y usa `writeFileSync`.

**¿Dónde están las reglas de negocio?**
En los servicios, nunca en el controlador:

| Validación | Archivo y línea |
|---|---|
| Campos obligatorios | `services/lugarService.js:40` |
| `isNaN` | `services/lugarService.js:46` |
| Rango 0 a 100 | `services/lugarService.js:53` |
| Código duplicado | `services/lugarService.js:64` |
| El registro no existe | `services/lugarService.js:85` |
| **El lugar del tour debe existir** | `services/tourService.js:61` al guardar, `:121` al modificar |

Esa última es la que amarra las dos vistas de la Parte 1.

**¿Por qué `isNaN`?** Porque pregunta *"¿es un valor que NO es número?"*, no al revés.
Es la nota de la sesión 7.

**¿Dónde está la bitácora que pide el enunciado?**

| Qué | Archivo | Línea |
|---|---|---|
| Formato `Fecha – Hora / "Acción" / Usuario` | `services/logService.js` | 14 a 45 |
| Escritura en modo agregar | `dao/logDAO.js` | 47 — `fs.appendFileSync` |

**¿Por qué `appendFileSync` y no `writeFileSync`?** Porque `writeFileSync` sobreescribe y
la bitácora tiene que acumular. Es el modo `"a"` de la lista de la sesión 7:
`"r"`, `"w"`, `"a"`, `"x"`, `"r+"`. La codificación es UTF8.

**¿Se registran todas las acciones?** Sí, los controladores de las **tres** partes llaman a
`LogService.registrar()`: autenticación correcta y fallida, deslogueo, y cada operación del
CRUD.

---

## 3. Preguntas sobre la Parte 2 (semana 4, PostgreSQL)

**¿Dónde usaron la carga Eager y cómo?**

| Archivo | Línea |
|---|---|
| `controllers/destinoController.js` | **17** el comentario, **22** el `INNER JOIN` |
| `controllers/excursionController.js` | **17** el comentario, **22** el `INNER JOIN` |

Respuesta corta: *"El `INNER JOIN` trae el destino y su región en una sola consulta. La
alternativa perezosa sería listar los destinos y después una consulta por cada fila para
traer su región, el problema N+1. La prueba es que la tabla muestra `region_nombre` sin
ningún fetch adicional."*

Si pregunta por ORM: la sesión 8 dice que Lazy y Eager *"aparecen o se implementan con
ORM/ODM"*. La semana 4 no usa ORM, así que el equivalente en SQL es resolver la relación
dentro de la misma consulta.

**¿Cuántos campos tiene cada tabla?** 8 sin contar llaves ni relaciones. Se ve en
`ProyectoP4-PostgreSQL-Grupo-2/ScriptCrearBaseDatos.sql`:

| Tabla | Línea del `CREATE TABLE` |
|---|---|
| `regiones` | 50 |
| `destinos` | 75 |
| `operadores` | 107 |
| `excursiones` | 132 |

**¿Dónde se guarda la imagen en binario?**

Son dos cosas distintas y hay que separarlas al responder: **binaria** es cómo se almacena,
**serializada** es cómo viaja entre la vista y el servidor.

| Paso | Archivo | Línea |
|---|---|---|
| La vista serializa a base64 | `public/js/destinos.js` | 77 `readAsDataURL`, 73 toma el base64 |
| El servidor lo convierte a bytes | `controllers/regionController.js` | 50 — `decode($8, 'base64')` |
| Vuelve serializado a la vista | `controllers/regionController.js` | 17 — `replace(encode(imagen,'base64'), chr(10), '')` |
| El tipo de la columna | `ScriptCrearBaseDatos.sql` | 61 `imagen BYTEA`, 118 `logo BYTEA` |

En la base **nunca hay base64**: `decode()` escribe los bytes y `encode()` los serializa solo
al salir.

**¿Por qué `BYTEA`?** Es el tipo binario de PostgreSQL, el equivalente al `BLOB` de MySQL.

**¿Por qué el `replace(..., chr(10), '')`?** Porque `encode()` corta el base64 en líneas de
76 caracteres siguiendo el RFC 2045, y ese salto rompe el `data:image/...;base64,...` de la
vista.

**¿Dónde está la capa de datos?** `db/database.js` — el `Pool` de `pg`. Según la sesión 5 es
*"el responsable exclusivo de establecer la conexión"*. El controlador y las rutas
representan la capa de presentación.

**¿Cómo pasan los parámetros al SQL?** Con `$1, $2` y un arreglo, nunca concatenando texto.
Es la pregunta de la sesión 5: *"¿es mediante paréntesis cuadrados? R/ sí"*.

**¿Qué pasa si el `DELETE` no encuentra el registro?**
`controllers/destinoController.js:116` y `160` — `resultado.rows.length === 0` → 404. Es la
validación que el profesor recalcó: la instrucción no da error pero tampoco hace el CRUD.

---

## 4. Preguntas sobre la Parte 3 (semana 5, MongoDB)

**¿Dónde usaron la carga Lazy y cómo?**

| Archivo | Línea |
|---|---|
| `dao/SitioDAO.js` | **145** el comentario, **155** `projection: { imagen: 0 }` |
| `dao/SitioDAO.js` | **174** `findOne` — aquí sí trae la imagen |
| `dao/ItinerarioDAO.js` | igual, con `afiche` |

Respuesta corta: *"El listado de 60 documentos no carga el campo binario: la proyección lo
excluye. Solo se trae cuando se consulta un documento concreto, que es cuando de verdad se
necesita."*

**¿Cómo conviven los 60 y los 120 documentos en la misma colección?**
`dao/SitioDAO.js:15` la colección `CollMongoDB`, y `:17` el `FILTRO`.
Los sitios son los únicos que tienen `latitud`; los itinerarios, `duracion_dias`. Se
distinguen con `$exists`, **sin agregar un campo extra**, para que el conteo quede exacto en
15 y 25 campos.

**¿Cuántos campos tiene cada documento?**
`dao/SitioDAO.js:23` — el arreglo `CAMPOS` con los 15.
`dao/ItinerarioDAO.js:23` — el arreglo con los 25.

**¿Y la imagen? ¿No es un texto base64 dentro del documento?**
No. Se guarda en binario, igual que en PostgreSQL. El base64 solo existe entre la vista y el
servidor.

| Paso | Archivo | Línea |
|---|---|---|
| base64 → bytes, antes de insertar | `dao/SitioDAO.js` | **61** el banner, **67** `Buffer.from(..., "base64")` |
| bytes → base64, al devolver a la vista | `dao/SitioDAO.js` | **83** el método `serializar()`, **93** el banner |
| Se aplica al crear y al consultar uno | `dao/SitioDAO.js` | **124** y **179** |

El `Buffer` que recibe el driver se almacena como **`binData`**, el tipo binario de BSON,
subtipo 0. En Compass el campo aparece como `Binary`, no como una cadena de texto.

**¿Y si edito sin escoger una imagen nueva?** No se borra: si el campo no viene, se quita del
`$set` y el documento conserva la que tenía. La Parte 2 hace lo mismo con un `COALESCE`.

**¿Cómo se relacionan las dos vistas?**
Cada itinerario tiene `sitios_incluidos`, un arreglo con los `codigo` de los sitios que
recorre. Todos existen entre los 60 y son de la misma región que el itinerario.

**¿Por qué el DAO es una clase y el de la semana 2 son funciones?**
Porque así viene cada semana: la semana 2 usa funciones con `module.exports = { ... }` y la
semana 5 usa clases con métodos `static async` en el controlador. Se conservó el estilo de
cada semana.

---

## 5. Las imágenes: lo único que hubo que investigar

Esta es la pregunta más probable sobre una decisión propia, porque **no se copió de ningún
ejemplo de clase**. Conviene tener la respuesta ordenada.

**¿De dónde sacaron esto si no se vio en clase?**
El profesor lo mandó a investigar, dos veces:

> **Enunciado, línea 147:** *"En cada tabla **investigar** cómo implementar un campo en
> PostgreSQL para almacenar y actualizar imágenes de forma binaria, manejadas de forma
> serializada desde la vista."*

> **`sesion8.md`, punto 2:** *"Serializar imágenes - **investigar**"*

Ninguno de los cuatro proyectos del curso tiene un `<input type="file">`, ni `FileReader`,
ni `Buffer`, ni `BYTEA`. Es el único punto del proyecto donde el enunciado autoriza salirse
del material.

**¿Y en qué se apoyaron?**
En la tabla de tipos de campo de la materia, `MySQL vs PostgreSQL`, que da el equivalente del
binario: **`BLOB` en MySQL ↔ `BYTEA` en PostgreSQL**. De ahí salió el tipo de la columna.

**¿Cómo funciona, en una frase?**
La imagen se guarda **binaria** en la base y viaja **serializada** en base64 entre la vista y
el servidor. Son las dos palabras del enunciado, y son dos cosas distintas.

```
  navegador                    servidor                       base de datos
  ---------                    --------                       -------------
  FileReader                   decode($n,'base64')            BYTEA        (PostgreSQL)
  readAsDataURL   --base64-->  Buffer.from(...,'base64')      binData      (MongoDB)
                               ---------------------------------------------------
  <img src=                    encode(col,'base64')           bytes reales
  "data:...">     <--base64--  serializar()
```

**¿Por qué no guardar la ruta del archivo o una URL?**
Porque el enunciado pide *"serialización de imágenes **dentro de las bases de datos**"* y
*"de forma **binaria**"*. Una URL sería un `VARCHAR`: ni es binario, ni la imagen queda
dentro de la base.

**Si pregunta por un detalle fino:** `encode()` de PostgreSQL corta el base64 en líneas de 76
caracteres por el RFC 2045, y eso rompe el `data:` URI de la vista. Por eso va envuelto en un
`replace(..., chr(10), '')`. Fue el punto que costó encontrar.

---

## 6. Preguntas transversales

**¿Por qué el orden de las rutas importa?**
`routes/sitioRoutes.js` — las rutas literales van antes que `/:id` (líneas 36, 43, 50).
Express recorre de arriba abajo y usa la primera que coincide; si `/:id` va primero, tapa a
todas las que vienen después. En `routes/lugarRoutes.js`, `/lugares/pagina` (línea 22) va
antes de `/lugares/:codigo` (88) por lo mismo.

**¿Dónde está el JavaScript?**
En `public/js/`, 8 archivos. Ninguna vista tiene `<script>` con código adentro: todas lo
invocan con `<script src="...">`. Es el requerimiento E.

**¿Cómo manejan los errores?**

| Capa | Patrón |
|---|---|
| Servicio | `throw new Error("...")` |
| Controlador | `try/catch` → `res.status(400/401/404/500).json({mensaje})` |
| PostgreSQL | además `rows.length === 0` → 404 |
| Vista | muestra el mensaje del servidor y tiene `catch` de red |
| App | ruta final que responde 404 en `app.js` |

**¿Cómo protegen el acceso sin sesión?**
El código de la semana 2 no usa sesiones. `public/js/login.js:86` guarda el usuario en
`localStorage` y `public/js/menu.js:101` verifica que exista: si no hay usuario, redirige al
login. Al salir se borra con `localStorage.removeItem`.

**¿El menú está repetido en cada vista?**
No. `public/js/menu.js` lo dibuja una sola vez y marca la opción activa según la URL. Las
seis vistas solo lo invocan.

---

## 7. Diagrama de la base de datos PostgreSQL

```mermaid
erDiagram
    REGIONES ||--o{ DESTINOS : "tiene"
    OPERADORES ||--o{ EXCURSIONES : "ofrece"

    REGIONES {
        serial id_region PK
        varchar nombre
        varchar pais
        varchar clima
        varchar idioma
        varchar moneda
        varchar huso_horario
        text descripcion
        bytea imagen
    }

    DESTINOS {
        serial id_destino PK
        integer id_region FK
        varchar nombre
        varchar categoria
        integer altitud
        varchar temporada_alta
        numeric costo_entrada
        varchar horario
        boolean requiere_guia
        bytea imagen
    }

    OPERADORES {
        serial id_operador PK
        varchar razon_social
        varchar cedula_juridica
        varchar telefono
        varchar correo
        varchar sitio_web
        integer anios_experiencia
        numeric calificacion_promedio
        bytea logo
    }

    EXCURSIONES {
        serial id_excursion PK
        integer id_operador FK
        varchar titulo
        integer duracion_horas
        varchar dificultad
        integer cupo_maximo
        numeric precio_persona
        boolean incluye_transporte
        date fecha_salida
        bytea afiche
    }
```

Vista 3 son `regiones` → `destinos`. Vista 4 son `operadores` → `excursiones`. Ocho campos
por tabla sin contar `id_*`, y ninguno se repite entre las dos vistas.

---

## 8. Diagrama de MongoDB

MongoDB no tiene esquema ni llaves foráneas, así que no hay un diagrama entidad-relación
propiamente. Lo que sí se puede diagramar es **cómo conviven los dos tipos de documento en
una sola colección** y cómo se relacionan por código.

```mermaid
flowchart TB
    subgraph COLL["Coleccion CollMongoDB - 180 documentos"]
        direction LR
        S["SITIOS<br/>60 documentos x 15 campos<br/>-----<br/>codigo · nombre · pais<br/>provincia · canton · categoria<br/>descripcion · latitud · longitud<br/>altitud_msnm · costo_entrada<br/>moneda · horario · calificacion<br/>imagen (binaria)"]
        I["ITINERARIOS<br/>120 documentos x 25 campos<br/>-----<br/>codigo · nombre · descripcion<br/>pais · region · duracion_dias<br/>duracion_noches · cupos · precios<br/>moneda · 3 incluye_* · dificultad<br/>edad_minima · idioma_guia<br/>punto_encuentro · horas · temporada<br/>politica_cancelacion<br/>sitios_incluidos<br/>afiche (binaria)"]
    end

    I -- "sitios_incluidos referencia codigo" --> S

    FS["SitioDAO filtra por<br/>el campo latitud"] --> S
    FI["ItinerarioDAO filtra por<br/>el campo duracion_dias"] --> I
```

El punto a explicar: **una sola colección, dos formas de documento**, separadas por un campo
que solo existe en cada una. Así no hace falta un campo discriminador y el conteo se mantiene
exacto en 15 y 25.

---

## 9. Diagrama de la arquitectura

```mermaid
flowchart TD
    U["Usuario"] --> V

    subgraph P["CAPA DE PRESENTACION"]
        V["views/*.html<br/>public/css · public/js"]
        R["routes/*.js"]
    end

    subgraph N["CAPA DE NEGOCIO"]
        C["controllers/*.js"]
        S["services/*.js<br/>reglas de negocio"]
    end

    subgraph D["CAPA DE ACCESO A DATOS"]
        DAO["dao/*.js"]
        DB["db/database.js<br/>config/mongodb.js"]
    end

    TXT[("data/*.txt")]
    PG[("PostgreSQL<br/>BDPostgreSQL")]
    MG[("MongoDB<br/>CollMongoDB")]

    V --> R --> C
    C --> S --> DAO
    DAO --> TXT
    DAO --> MG
    C -.->|"Parte 2: sin service ni dao"| DB
    DB --> PG
    DAO --> DB
    C --> LOG["services/logService.js"] --> LOGDAO["dao/logDAO.js"] --> TXTLOG[("data/log.txt")]
```

**El flujo que dictó el profesor:**

```
Botones → html → express route → controller → service → DAO → datos
```

**La excepción de la Parte 2, y hay que saber explicarla:** ahí el controlador habla directo
con `db/database.js`, sin `service` ni `dao`. No es un descuido, es como viene el código de
la semana 4: `db/database.js` representa la capa de datos, y el controlador y las rutas la
capa de presentación. En Three-Tier la comunicación fluye entre capas.

---

## 10. Las tres partes en una sola aplicación

```mermaid
flowchart LR
    L["Login<br/>usuarios.txt"] --> M["Menu lateral<br/>public/js/menu.js"]

    M --> P1A["Lugares"]
    M --> P1B["Tours"]
    M --> P2A["Destinos"]
    M --> P2B["Excursiones"]
    M --> P3A["Sitios"]
    M --> P3B["Itinerarios"]

    P1A --> TXT[("archivos .txt<br/>PARTE 1 · semana 2")]
    P1B --> TXT
    P2A --> PG[("PostgreSQL<br/>PARTE 2 · semana 4<br/>Eager")]
    P2B --> PG
    P3A --> MG[("MongoDB<br/>PARTE 3 · semana 5<br/>Lazy")]
    P3B --> MG
```

---

## 11. Si pregunta algo que decidimos nosotros

Están todas en `03-DECISIONES.md`. Las que más probablemente salgan:

| Pregunta | Respuesta |
|---|---|
| ¿Por qué la base se llama `BDPostgreSQL`? | Es el nombre del enunciado. La de MongoDB no la nombra, así que se llama `proyecto1grupo2` |
| ¿El campo de imagen cuenta entre los 8? | Sí, se asumió que cuenta: 7 campos de datos + el binario |
| ¿Por qué no hay sesión de servidor? | El código de la semana 2 no la tiene. Se replicó su comportamiento y se protege con la verificación de `menu.js` |
| ¿Por qué la Parte 3 es solo MongoDB? | La distribución de puntos del enunciado habla solo de MongoDB, `CollMongoDB` y los dos `.JSON` |

**Si no sabés algo, decilo.** El enunciado advierte que responder mal cuesta puntos; admitir
una decisión y explicar en qué se basó vale más que inventar.
