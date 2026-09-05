# 01 — Inventario del material (fuente de la verdad)

> Este documento registra **exactamente qué código existe** en el material de clase y
> **qué falta**. Todo lo que se construya en `Proyecto1DAW` tiene que poder rastrearse
> hasta un archivo de esta lista. Si algo no está aquí, no se inventa: se deja pendiente.

> **Rutas del material.** Estos documentos viven en `Proyecto1DAW/docs/`. Las rutas
> `knowledge/`, `ProyectoEstudiantes/`, `S4-SW/` y `Semana6/` que se citan aquí son
> relativas a la carpeta que contiene a `Proyecto1DAW`, es decir dos niveles arriba.

Fecha de revisión: 5 de septiembre de 2026.

---

## 1. Semana 2 — `ProyectoEstudiantes` (archivos planos `.txt`)

Enunciado: **Parte 1**, 20 pts. Glosario del enunciado: *"código de la semana 2 es ProyectoEstudiantes"*.

### Lo que SÍ existe y sirve de base

| Archivo | Qué aporta |
|---|---|
| `app.js` | Express, `express.json()`, `express.urlencoded()`, `express.static("public")`, montaje de routers en `"/"`, `app.listen(2000)` |
| `controller/authController.js` | `mostrarLogin` (sendFile), `iniciarSesion` (try/catch → `res.json({ok:true})` / `res.status(401).json`), `cerrarSesion` (redirect a `/`) |
| `controller/estudianteController.js` | CRUD completo: `listar`, `buscar`, `guardar`, `modificar`, `eliminar`. Patrón try/catch + `res.status(...).json({mensaje})` |
| `services/authService.js` | `autenticar()` → `throw new Error("Usuario o contraseña incorrectos.")` |
| `services/estudianteService.js` | Validaciones: campos obligatorios, `isNaN`, rango 0–100, duplicado de llave, existencia previa |
| `dao/estudianteDAO.js` | `inicializarArchivo`, `leerArchivo` (split `\n` → split `;`), `escribirArchivo` (`writeFileSync`), CRUD sobre el arreglo |
| `dao/usuarioDAO.js` | `validarCredenciales()` leyendo `usuarios.txt` línea por línea |
| `routes/authRoutes.js` | `GET /`, `POST /login`, `GET /logout` |
| `routes/estudianteRoutes.js` | `GET /estudiantes/pagina` (sendFile), `GET/POST/PUT /estudiantes`, `DELETE /estudiantes/:carne` |
| `public/js/estudiantes.js` | `DOMContentLoaded`, `addEventListener` por botón, `fetch` con `JSON.stringify`, pintado de `tbody` con concatenación de strings |
| `public/js/login.js` | `evento.preventDefault()`, `fetch("/login")`, redirección con `window.location.href` |
| `public/css/estilos.css` | `.contenedor`, `.contenedor-login`, `h1`, `label`, `input`, `button`, `table`, `#mensaje` |
| `data/estudiantes.txt` | Formato de registro: `campo;campo;campo;campo;campo` (una línea por registro) |
| `data/usuarios.txt` | Formato: `usuario;password` |
| `package.json` | Dependencia única: `express ^5.2.1` |

### Lo que FALTA (bloqueante)

| Archivo | Estado | Consecuencia |
|---|---|---|
| `models/estudiante.js` | **0 bytes** | `estudianteController.js` y `estudianteDAO.js` hacen `require("../models/estudiante")` y `new Estudiante(...)`. Sin él, la app no corre. |
| `models/usuario.js` | **0 bytes** | Sin uso directo hoy, pero la pizarra lo lista como archivo obligatorio de la estructura. |
| `views/login.html` | **0 bytes** | `authController.mostrarLogin` lo sirve con `sendFile`. |
| `views/estudiantes.html` | **0 bytes** | `estudianteRoutes` lo sirve en `GET /estudiantes/pagina`. |

**Confirmación de la fuente** — `knowledge/sesion7.md`, cierre del punto 5:

> `-queda poco: pendiente modelos y vistas, para ser vistos el 10 de septiembre`

La entrega es el **17 de septiembre**. Quedan 7 días de margen entre que el profesor
entrega ese código y la fecha límite.

### Defectos detectados en el material de semana 2

1. **Carpeta mal nombrada.** En disco la carpeta es `controller/` (singular), pero
   `routes/authRoutes.js` y `routes/estudianteRoutes.js` hacen
   `require("../controllers/...")` (plural). Tal cual está, `app.js` revienta al arrancar.
   La pizarra (`knowledge/08-PIZARRA-CLASE.md`, "Objetos a crear (estructura exacta)")
   dice **`controllers`** en plural. → En `Proyecto1DAW` se usa **plural**.
2. **`authService.js` exporta funciones sin implementación en el DAO.**
   Exporta `buscarPorUsuario` y `listar`, que llaman a `UsuarioDAO.buscarPorUsuario()` y
   `UsuarioDAO.listar()`; `dao/usuarioDAO.js` solo exporta `validarCredenciales`.
   Ninguna ruta las usa. → En `Proyecto1DAW` se exporta **solo `autenticar`**, que es
   justamente la versión que el profesor dejó activa (la otra quedó comentada).
3. **No hay sesión.** `iniciarSesion` responde `{ok:true}` y es `public/js/login.js`
   quien redirige con `window.location.href`. No existe middleware que proteja rutas.

---

## 2. Semana 4 — `S4-SW/S4-SW` (PostgreSQL con driver `pg` crudo)

Enunciado: **Parte 2**, 40 pts. Glosario: *"código de la semana 4 es S4-SW"*.

**Está completo.** Corre tal cual.

| Archivo | Qué aporta |
|---|---|
| `db/database.js` | `new Pool({user, host, database, password, port})` y `module.exports = pool`. Sesión 5 lo define como *"el responsable exclusivo de establecer la conexión con PostgreSQL"* → **capa de datos**. |
| `controllers/productoController.js` | `async (req,res)` con `await pool.query("...", [params])`, try/catch, `console.error`, `res.status(500).json({mensaje})`, validación `resultado.rows.length === 0` → 404 |
| `routes/productoRoutes.js` | Router con `GET /`, `POST /`, `PUT /:id`, `DELETE /:id`, montado en `/api/productos` |
| `public/js/app.js` | `fetch` a `/api/productos`, `formulario.addEventListener("submit")`, `createElement("tr")` + template literals, `confirm()` antes de eliminar |
| `views/index.html` | Formulario con `input type="hidden" id="id"`, botones Guardar/Cancelar, tabla con `tbody id="tablaProductos"`, `script src="/js/app.js"` al final |
| `package.json` | `express`, `pg` |

**Técnicas de semana 4 confirmadas en `knowledge/sesion5.md`:**
- Parámetros SQL con `$1, $2` y arreglo `[...]` (*"la técnica para adjuntar datos a una instrucción SQL … es mediante la utilización de paréntesis cuadrados. R/sí"*).
- Al crear no se usan parámetros de ruta, solo `body`, y el `id` lo genera la base (*"R/no, son datos nuevos y se crea automáticamente el id"*).
- Validar `resultado.rows.length === 0` cuando la instrucción no da error pero tampoco hace el CRUD.

**Lo que NO trae semana 4:** joins, tablas relacionadas, ORM, imágenes, carga Eager.
El enunciado los exige de todas formas (ver `03-DECISIONES-Y-PENDIENTES.md`).

⚠️ `db/database.js` trae credenciales de un servidor remoto escritas en duro. En
`Proyecto1DAW` se usa una conexión local propia.

---

## 3. Semana 5 — `Semana6` (Sequelize + MongoDB)

Enunciado: **Parte 3**, 40 pts. Glosario: *"código de la semana 5 es Semana6"*.

**Está completo.** Corre tal cual.

| Archivo | Qué aporta |
|---|---|
| `.env` + `dotenv` | `PORT`, `PG_*`, `MONGO_URI`, `MONGO_DATABASE` |
| `config/postgres.js` | `new Sequelize(db, user, pass, {host, port, dialect:"postgres", logging})` |
| `config/mongodb.js` | `new MongoClient(MONGO_URI)`, función `conectarMongoDB()` con caché de `db` en variable de módulo |
| `models/Producto.js` | `sequelize.define` con `DataTypes.INTEGER/STRING/DECIMAL`, `tableName`, `timestamps:false` |
| `dao/ProductoDAO.js` | **Clase** con `crear`, `obtenerTodos`, `obtenerPorId`, `actualizar`, `eliminar` sobre `db.collection(...)` y `new ObjectId(id)` |
| `services/ProductoService.js` | **Clase** que expone Postgres vía Sequelize (`findAll`, `findByPk`, `create`, `update`, `destroy`) y Mongo vía el DAO (`crearMongo`, `obtenerTodosMongo`, …) |
| `controllers/ProductoController.js` | **Clase con métodos `static async`**, try/catch, mensajes que dicen la base usada |
| `routes/productoRoutes.js` | Rutas `/mongo*` **antes** de `/:id` |
| `public/js/app.js` | Un `fetch` por operación, `mostrarMensaje()`, `mostrarPostgres()` / `mostrarMongo()` |
| `views/index.html` | Un formulario compartido + dos secciones (Postgres / Mongo) con sus botones `onclick` y sus tablas |
| `app.js` | `sequelize.authenticate()` + `sequelize.sync()` dentro de `iniciarServidor()` con try/catch |

**Regla de orden de rutas** — `knowledge/question.md` la explica y el profesor la evaluó:
Express recorre las rutas de arriba abajo y usa la primera que coincide; si `/:id` va
antes que `/mongo`, la genérica tapa a la específica. → En `Proyecto1DAW` toda ruta
literal va **antes** que la paramétrica.

**Lo que NO trae semana 5:** carga Lazy explícita, carga Eager, serialización de imágenes.

---

## 4. Temas que el enunciado exige y que aún NO se han visto en clase

`knowledge/sesion7.md`, punto 7 (sesión del 3 de septiembre de 2026):

```
7.
	-Lazy / Eager
	-Serialización
```

y en el bloque tentativo para la semana siguiente:

```
	-Serialización de objetos
```

`knowledge/08-PIZARRA-CLASE.md` lo confirma:

> 📌 Términos del temario que aún no se han visto en clase pero podrían aparecer:
> **Lazy vs Eager loading**, **DTO**, **serialización de objetos**, **PaaS**.

Único apoyo disponible hoy — `knowledge/05-MYSQL-VS-POSTGRESQL.md`:

| | MySQL | PostgreSQL |
|---|---|---|
| Binario | `BLOB` | **`BYTEA`** |

Consecuencia: **Eager (Parte 2), Lazy (Parte 3) y serialización de imágenes (Partes 2 y 3)
no tienen código de clase todavía.** Ver `03-DECISIONES-Y-PENDIENTES.md`.
