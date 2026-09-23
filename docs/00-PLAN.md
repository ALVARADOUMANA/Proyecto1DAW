# 00 — Plan maestro del Proyecto 1 (EIF509)

**Grupo 2 · Tema 7: Turismo y lugares por visitar · Entrega: 17 de septiembre de 2026, antes de las 6 pm**

Documentos relacionados:
- `01-INVENTARIO-MATERIAL.md` — qué código de clase existe y qué falta.
- `02-MODELO-DE-DATOS.md` — entidades, campos y datos del tema 7.
- `03-DECISIONES.md` — decisiones tomadas, supuestos y preguntas al profesor.
- `PENDIENTE.md` — lo que falta por hacer antes de entregar.
- `CHANGELOG.md` — lista de control con `[ ]` de todo lo que hay que hacer.

---

## 1. Regla que gobierna todo el proyecto

El enunciado, punto 4 de "Aspectos obligatorios":

> El proyecto y código deben estar exclusivamente/únicamente fundamentados en los
> requerimientos y el código entregado y visto en clase. De no ser así, queda nulo con
> nota cero (0).

Por eso el plan se construye así:

1. Cada archivo de `Proyecto1DAW` **declara en su cabecera de qué semana viene su patrón**
   y de cuál archivo del material se copió la estructura.
2. Se conserva el **estilo de cada semana sin mezclarlo**: semana 2 y 4 con funciones
   sueltas y `module.exports = { ... }`; semana 5 con **clases** y métodos `static async`.
   Así el profesor puede ver de un vistazo a qué parte pertenece cada archivo.
3. Lo que el material no cubre **no se improvisa**: se marca con un comentario
   `// PENDIENTE:` y queda listado en `03-DECISIONES.md`.

---

## 2. Una sola aplicación, tres partes adentro

El enunciado exige *"unir y tratar las 3 partes como una sola aplicación"*. Se hace con
**un solo proyecto de Express** que respeta la estructura de carpetas que el profesor
dictó en pizarra (`knowledge/08-PIZARRA-CLASE.md` → "Objetos a crear (estructura exacta)"),
y cada parte aporta sus archivos dentro de esas mismas carpetas.

### Flujo de solicitud (el que dictó el profesor)

```
Botones
 └── html                          ← views/
      └── express route            ← routes/
           └── controller          ← controllers/
                └── service        ← services/
                     └── DAO       ← dao/
                          └── datos: .txt · PostgreSQL · MongoDB
```

La Parte 2 (semana 4) es la excepción y **así viene del material**: el controlador habla
directo con `db/database.js` (el `pool`), sin `service` ni `dao` intermedios. `sesion5.md`
lo explica: en Three-Tier *"la comunicación fluye entre capas"* y ahí `db/database.js`
"REPRESENTA LA CAPA DE DATOS" mientras el controlador y las rutas "REPRESENTAN LA CAPA DE
PRESENTACIÓN". No se le agregan capas que el profesor no puso.

### Estructura de carpetas

```
Proyecto1DAW/
├── docs/                           esta documentación
├── ProyectoP4-PostgreSQL-Grupo-2/  los 2 .sql (Etapa D)
├── ProyectoP4-MongoDB-Grupo-2/     los 2 .JSON (Etapa F)
└── ProyectoP4-App-Grupo-2/         LA APLICACIÓN
    │
    ├── README.md                  integrantes, arranque, bases de datos
    ├── app.js                     Express + montaje de los 9 routers
    ├── package.json               express, pg, mongodb, dotenv
    ├── .env                       puerto y credenciales
    ├── .gitignore
    │
    ├── db/                        ── PARTE 2 (semana 4)
    │   └── database.js              Pool de pg. Capa de datos.
    │
    ├── config/                    ── PARTE 3 (semana 5)
    │   └── mongodb.js               MongoClient + conectarMongoDB()
    │
    ├── data/                      ── PARTE 1 (semana 2)
    │   ├── usuarios.txt             usuario;password
    │   ├── lugares.txt              repositorio de la vista 1.1
    │   ├── tours.txt                repositorio de la vista 1.2
    │   └── log.txt                  bitácora exigida por el enunciado
    │
    ├── models/                    ── PARTE 1 (semana 2)   ⛔ PENDIENTE 10-sep
    │   ├── usuario.js
    │   ├── lugar.js
    │   └── tour.js
    │
    ├── dao/
    │   ├── usuarioDAO.js            s2
    │   ├── lugarDAO.js              s2
    │   ├── tourDAO.js               s2
    │   ├── logDAO.js                s2  (append al .txt)
    │   ├── SitioDAO.js              s5  (clase, MongoDB)
    │   └── ItinerarioDAO.js         s5  (clase, MongoDB)
    │
    ├── services/
    │   ├── authService.js           s2
    │   ├── lugarService.js          s2
    │   ├── tourService.js           s2
    │   ├── logService.js            s2
    │   ├── SitioService.js          s5  (clase)
    │   └── ItinerarioService.js     s5  (clase)
    │
    ├── controllers/
    │   ├── authController.js        s2
    │   ├── lugarController.js       s2
    │   ├── tourController.js        s2
    │   ├── regionController.js      s4  (pool.query)
    │   ├── destinoController.js     s4  (pool.query + JOIN eager)
    │   ├── operadorController.js    s4
    │   ├── excursionController.js   s4  (pool.query + JOIN eager)
    │   ├── SitioController.js       s5  (clase, static async)
    │   └── ItinerarioController.js  s5  (clase, static async)
    │
    ├── routes/
    │   ├── authRoutes.js            s2
    │   ├── lugarRoutes.js           s2
    │   ├── tourRoutes.js            s2
    │   ├── regionRoutes.js          s4
    │   ├── destinoRoutes.js         s4
    │   ├── operadorRoutes.js        s4
    │   ├── excursionRoutes.js       s4
    │   ├── sitioRoutes.js           s5
    │   └── itinerarioRoutes.js      s5
    │
    ├── views/
    │   ├── login.html               s2  ⛔ PENDIENTE 10-sep
    │   ├── lugares.html             s2  ⛔ PENDIENTE 10-sep
    │   ├── tours.html               s2  ⛔ PENDIENTE 10-sep
    │   ├── destinos.html            s4
    │   ├── excursiones.html         s4
    │   ├── sitios.html              s5
    │   └── itinerarios.html         s5
    │
    └── public/
        ├── css/estilos.css          base de s2 + estilos del menú lateral
        └── js/
            ├── login.js             s2
            ├── menu.js              menú lateral + botón de deslogueo
            ├── lugares.js           s2
            ├── tours.js             s2
            ├── destinos.js          s4
            ├── excursiones.js       s4
            ├── sitios.js            s5
            └── itinerarios.js       s5
```

**Convención de nombres.** Se respeta la que el profesor explicó en pizarra: archivos que
representan **una entidad del modelo** van en **singular** (`lugarController.js`), carpetas
de colecciones en **plural** (`controllers`, `services`, `routes`). Los archivos de la
Parte 3 van en `PascalCase` porque así vienen en `Semana6` (`ProductoController.js`).

**Cada entregable tiene su propia carpeta dentro de `Proyecto1DAW/`**, con el nombre exacto
de su `.zip`. La aplicación vive completa dentro de `ProyectoP4-App-Grupo-2/`, así que ese
zip sale de comprimir esa carpeta y nada más — cumpliendo el *"únicamente las carpetas y
archivos respectivos del proyecto de VS Code"* del enunciado. `README.md` y `docs/` quedan
afuera de las tres y no entran en ningún zip.

---

## 3. Las 7 vistas

| # | Vista | Parte | Repositorio | Archivo |
|---|---|---|---|---|
| 0 | Autenticación | 1 (s2) | `usuarios.txt` | `views/login.html` |
| 1 | CRUD de Lugares | 1 (s2) | `lugares.txt` | `views/lugares.html` |
| 2 | CRUD de Tours | 1 (s2) | `tours.txt` | `views/tours.html` |
| 3 | CRUD Regiones + Destinos | 2 (s4) | PostgreSQL `BDPostgreSQL` | `views/destinos.html` |
| 4 | CRUD Operadores + Excursiones | 2 (s4) | PostgreSQL `BDPostgreSQL` | `views/excursiones.html` |
| 5 | CRUD de Sitios (60 docs, 15 campos) | 3 (s5) | MongoDB `CollMongoDB` | `views/sitios.html` |
| 6 | CRUD de Itinerarios (120 docs, 25 campos) | 3 (s5) | MongoDB `CollMongoDB` | `views/itinerarios.html` |

Las vistas 1 a 6 llevan el **menú lateral izquierdo** con enlaces a las seis y el botón de
deslogueo. La vista 0 no lo lleva (el menú solo aparece después de autenticarse).

---

## 4. Mapa de rutas

Se respeta la regla de orden que el profesor evaluó (`knowledge/question.md`): **toda ruta
literal se declara antes que la paramétrica**, para que `/:id` no tape a las específicas.

### Parte 1 — semana 2 (montadas en `"/"`, igual que en `ProyectoEstudiantes`)

| Método | Ruta | Controlador |
|---|---|---|
| GET | `/` | `authController.mostrarLogin` |
| POST | `/login` | `authController.iniciarSesion` |
| GET | `/logout` | `authController.cerrarSesion` |
| GET | `/lugares/pagina` | `sendFile(views/lugares.html)` |
| GET · POST · PUT | `/lugares` | `lugarController.listar / guardar / modificar` |
| GET | `/lugares/:codigo` | `lugarController.buscar` |
| DELETE | `/lugares/:codigo` | `lugarController.eliminar` |
| GET | `/tours/pagina` | `sendFile(views/tours.html)` |
| GET · POST · PUT | `/tours` | `tourController.listar / guardar / modificar` |
| GET | `/tours/:codigo` | `tourController.buscar` |
| DELETE | `/tours/:codigo` | `tourController.eliminar` |

### Parte 2 — semana 4 (montadas en `/api/...`, igual que en `S4-SW`)

| Método | Ruta | Nota |
|---|---|---|
| GET | `/destinos/pagina` | `sendFile(views/destinos.html)` |
| GET · POST | `/api/regiones` · `/api/regiones` | |
| PUT · DELETE | `/api/regiones/:id` | |
| GET | `/api/destinos` | **CARGA EAGER** — `INNER JOIN` con `regiones` |
| POST | `/api/destinos` | |
| PUT · DELETE | `/api/destinos/:id` | |
| GET | `/excursiones/pagina` | `sendFile(views/excursiones.html)` |
| GET · POST | `/api/operadores` | |
| PUT · DELETE | `/api/operadores/:id` | |
| GET | `/api/excursiones` | **CARGA EAGER** — `INNER JOIN` con `operadores` |
| POST | `/api/excursiones` | |
| PUT · DELETE | `/api/excursiones/:id` | |

### Parte 3 — semana 5 (montadas en `/api/...`, igual que en `Semana6`)

| Método | Ruta | Nota |
|---|---|---|
| GET | `/sitios/pagina` | `sendFile(views/sitios.html)` |
| GET | `/api/sitios` | **CARGA LAZY** — proyección que excluye el binario |
| POST | `/api/sitios` | |
| GET | `/api/sitios/:id` | trae el documento completo, binario incluido |
| PUT · DELETE | `/api/sitios/:id` | |
| GET | `/itinerarios/pagina` | `sendFile(views/itinerarios.html)` |
| GET | `/api/itinerarios` | **CARGA LAZY** |
| POST | `/api/itinerarios` | |
| GET | `/api/itinerarios/:id` | trae el documento completo |
| PUT · DELETE | `/api/itinerarios/:id` | |

---

## 5. Parte 4 — Manejo de errores

Se replica exactamente lo que trae el material, sin agregar nada:

| Capa | Patrón | De dónde sale |
|---|---|---|
| Service (s2) | `throw new Error("mensaje")` ante campo vacío, `isNaN`, fuera de rango, llave duplicada, registro inexistente | `services/estudianteService.js` |
| Controller (s2) | `try/catch` → `res.status(400 / 401 / 404 / 500).json({ mensaje })` | `controller/estudianteController.js` |
| Controller (s4) | `try/catch` → `console.error(error)` + `res.status(500).json({mensaje})`; y `resultado.rows.length === 0` → `404` | `controllers/productoController.js` |
| Controller (s5) | `try/catch` con mensaje que nombra la base (`"MongoDB: …"`); `null` del service → `404` | `controllers/ProductoController.js` |
| Vista (s2) | `mensaje.style.color = "red"` + texto del servidor; `catch` de red → *"No fue posible conectar con el servidor."* | `public/js/login.js` |
| Vista (s4) | `if (!respuesta.ok) throw new Error(...)` + `alert(...)` | `S4-SW/public/js/app.js` |
| App (s5) | `iniciarServidor()` con try/catch alrededor de `authenticate()` | `Semana6/app.js` |

### La bitácora `.txt`

El enunciado la pide en la Parte 1 y aclara que **todas** las acciones deben registrarse:

> Implementar un log en un archivo `.txt` con el formato:
> `Fecha – Hora / "Acción Realizada" / Usuario`. Todas las acciones de la aplicación
> deben registrarse en dicho log (fallas, acciones, ejecuciones de las partes del CRUD).

Implementación: `dao/logDAO.js` + `services/logService.js`, siguiendo la misma capa de
acceso a `.txt` de semana 2, pero **abriendo en modo append**. El profesor dejó eso
apuntado en `knowledge/sesion7.md` como actividad de escucha activa:

> secuencia de manejo ".txt" → abrir → leer / escribir / modificar → cerrarlo …
> se complica cuando el programador usa "modos": "r", "w", "a", "x", "r+" … UTF8

Se usa `fs.appendFileSync(archivo, linea, "utf8")` — modo `"a"`, codificación `UTF8`,
los dos puntos que el profesor pidió tomar en nota. El `logService.registrar()` se llama
desde **los controladores de las tres partes**, no solo de la Parte 1.

---

## 6. Orden de trabajo

| Etapa | Qué se hace | Depende de |
|---|---|---|
| **A** | Esqueleto: `package.json`, `app.js`, `.env`, `.gitignore`, `public/css/estilos.css` | — |
| **B** | Parte 1 — todo **menos** `models/` y `views/` | — |
| **C** | Parte 2 — `db/database.js`, 4 controladores, 4 routers, 2 vistas, 2 JS | PostgreSQL instalado |
| **D** | Scripts SQL: `ScriptCrearBaseDatos.sql` + `ScriptPopularBaseDatos.sql` | modelo de datos |
| **E** | Parte 3 — `config/mongodb.js`, 2 DAO, 2 services, 2 controladores, 2 routers, 2 vistas, 2 JS | MongoDB instalado |
| **F** | Scripts Mongo: `Script-60-MONGO.JSON` (60 docs × 15 campos) + `Script-120-MONGO.JSON` (120 docs × 25 campos) | modelo de datos |
| **G** | Menú lateral + bitácora conectada a las tres partes | B, C, E |
| **H** | ⛔ **Parte 1: `models/` y `views/`** | **código del profesor del 10 de septiembre** |
| **I** | Repaso de Eager / Lazy / serialización contra lo que explique el profesor | clase del 10 de septiembre |
| **J** | Pruebas de las 7 vistas, `Grupo-2-Explicacion.pdf` con screenshots, armado de los 3 `.zip` | todo |

Las etapas **H** e **I** dependen de material que todavía no existe. Todo lo demás puede
avanzarse desde ya. El detalle está en `03-DECISIONES.md`.
