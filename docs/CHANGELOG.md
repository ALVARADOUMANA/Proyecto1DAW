# CHANGELOG — Proyecto 1 · EIF509 · Grupo 2

**Tema 7: Turismo y lugares por visitar** · Entrega: **17 de septiembre de 2026, antes de las 6 pm**

Documentación del plan, en esta misma carpeta:
`00-PLAN.md` · `01-INVENTARIO-MATERIAL.md` · `02-MODELO-DE-DATOS.md` · `03-DECISIONES-Y-PENDIENTES.md`

Leyenda: `[ ]` pendiente · `[x]` hecho · `[⛔]` bloqueado, esperando material o clase

---

## 2026-09-05 — Planeamiento

- [x] Leer el enunciado `Proyecto-DAW.md` completo
- [x] Inventariar `ProyectoEstudiantes` (semana 2) archivo por archivo
- [x] Inventariar `S4-SW/S4-SW` (semana 4) archivo por archivo
- [x] Inventariar `Semana6` (semana 5) archivo por archivo
- [x] Revisar `knowledge/` (sesiones 1-7, pizarra, question.md)
- [x] Detectar los 4 archivos vacíos de semana 2 y confirmar la fecha en que los da el profesor
- [x] Detectar que Eager, Lazy y serialización no se han visto en clase
- [x] Definir tema, modelo de datos y las 7 vistas
- [x] Escribir `00-PLAN.md`
- [x] Escribir `01-INVENTARIO-MATERIAL.md`
- [x] Escribir `02-MODELO-DE-DATOS.md`
- [x] Escribir `03-DECISIONES-Y-PENDIENTES.md`
- [x] Escribir este `CHANGELOG.md`
- [x] Mover la documentación y el enunciado a `Proyecto1DAW/docs/`
- [x] Crear dentro de `Proyecto1DAW/` una carpeta por entregable, con el nombre de su `.zip`

---

## 2026-09-05 — Decisión: construcción en espera

- [x] **No se inicia la construcción todavía.** Se espera el material del profesor del
      **10 de septiembre** (modelos y vistas de semana 2) y la explicación de
      **Eager / Lazy / serialización**, para no escribir nada sin referencia de clase.
      El plan y el modelo de datos quedan listos para ejecutarse ese día.
- [ ] Llevar las 6 preguntas de `03-DECISIONES-Y-PENDIENTES.md` a la hora de consulta
      (jueves, 1 hora antes de clase) — es lo único que se puede adelantar sin material

---

## 2026-09-05 — Construcción de las Etapas A y B

Se construyó todo lo que tiene referencia completa en el material. Quedan pendientes
únicamente los 3 modelos y las 3 vistas de la Parte 1, que dependen del código del
10 de septiembre.

**Probado:** `POST /login` autentica contra `usuarios.txt` y responde `{ok:true}`;
con credenciales malas responde 401 con el mensaje del servicio. La bitácora
`data/log.txt` se escribe con el formato exacto del enunciado. `GET /lugares` responde
500 con `"Lugar is not a constructor"`, que es el estado esperado mientras el modelo
esté vacío. Los 17 archivos `.js` pasan `node --check`.

---

## 2026-09-22 — Llegó el material de semanas 8 y 9

**Cambio de fecha de entrega.** `knowledge/sesion9.md`: *"se aclaran dudas del proyecto
sobre la fecha de entrega (**24 de septiembre 2026, antes de las 11am**)"*. Antes era el 17.
Además: *"quién sube todos los entregables: **el primer miembro** de los grupos establecidos"*.

**`knowledge/sesion8.md` confirma el tema:** *"Grupo 2 - Tema: 7. Turismo y lugares por
visitar"*. Y sobre los temas que faltaban:
- *"Serializar imágenes - **investigar**"* — queda confirmado que es investigación propia.
- Lazy y Eager: *"Aparecen o implementan con: **ORM / ODM** — Ejemplos: Sequelize, TypeORM,
  Mongoose"*. Ver cómo se mapea a nuestro código en `03-DECISIONES-Y-PENDIENTES.md`.
- Pasos 18 a 21: el profesor entregó `models/estudiante.js`, `models/usuario.js`,
  `views/estudiantes.html` y `views/login.html`, que era el bloqueo P-1.

**`ProyectoEstudiantes` quedó completo** y con la carpeta `controllers/` ya en plural.

**Semana 9 (`s9-sw`)** trae Mongoose + EJS + plantillas. **No aplica al proyecto**: el
enunciado limita cada parte a las semanas 2, 4 y 5. Queda como material de clase aparte.

---

## 2026-09-22 — Etapas H, C y D

**Etapa H — Parte 1 cerrada.** Modelos y vistas construidos a partir del código que entregó
el profesor. Probado: CRUD completo de lugares y tours, validaciones de campo obligatorio,
rango, código duplicado y lugar inexistente, y la bitácora registrando todo.

**Etapas C y D — Parte 2 cerrada.** 4 tablas, 4 controladores, 4 routers, 2 vistas, 2 JS y
los 2 scripts `.sql`. Probado contra PostgreSQL 18 real: base creada y poblada, los dos
`INNER JOIN` de la carga Eager devolviendo las columnas del padre, CRUD completo, 404 en
registro inexistente, y una imagen PNG guardada como `BYTEA` que vuelve en base64 idéntica
al original.

---

## 2026-09-22 — Etapas E, F y G: aplicación completa

**Parte 3 cerrada.** `config/mongodb.js`, 2 DAO, 2 services, 2 controladores, 2 routers,
2 vistas y 2 JS, todo con el patrón de clases de `Semana6`. Los 180 documentos generados
e importados en `CollMongoDB`.

**Probado contra MongoDB 8.3.8 real:**

```
CollMongoDB                                    180 documentos
  sitios      { latitud: {$exists:true} }       60
  itinerarios { duracion_dias:{$exists:true} } 120

GET /api/sitios        -> 60 docs, SIN el campo "imagen"   <- CARGA LAZY
GET /api/sitios/:id    -> 16 campos, CON "imagen"          <- la otra mitad
GET /api/itinerarios   -> 120 docs, SIN el campo "afiche"  <- CARGA LAZY
POST + imagen base64   -> vuelve idéntica al consultarla
PUT / DELETE           -> correctos
GET /api/sitios/0000…  -> HTTP 404
```

**Verificación final de la aplicación:** las 7 vistas responden 200 con su título, ninguna
lleva JavaScript incrustado (requerimiento E) y la bitácora registra las tres partes.

---

## ETAPA A — Esqueleto de la aplicación

- [x] `ProyectoP4-App-Grupo-2/package.json` — `express`, `pg`, `mongodb`, `dotenv`
- [x] `npm install` en `ProyectoP4-App-Grupo-2/`
- [x] `ProyectoP4-App-Grupo-2/.env` — `PORT`, `PG_*`, `MONGO_URI`, `MONGO_DATABASE`
- [x] `ProyectoP4-App-Grupo-2/.gitignore` — `node_modules`, `.env`
- [x] `ProyectoP4-App-Grupo-2/app.js` — middlewares, estáticos, routers de la Parte 1; secciones de las Partes 2 y 3 marcadas como pendientes
- [x] `ProyectoP4-App-Grupo-2/public/css/estilos.css` — copiado tal cual de semana 2 (los estilos del menú lateral entran en la Etapa G)

## ETAPA B — Parte 1 · semana 2 · archivos `.txt` (20 pts)

**Datos**
- [x] `data/usuarios.txt`
- [x] `data/lugares.txt` — 3 registros de arranque
- [x] `data/tours.txt` — 3 registros de arranque
- [x] `data/log.txt` — vacío, lo crea el DAO si no existe

**Modelos** *(patrón: `ProyectoEstudiantes/models/estudiante.js`)*
- [x] `models/usuario.js` — construido del código del profesor
- [x] `models/lugar.js` — construido del código del profesor
- [x] `models/tour.js` — construido del código del profesor

**DAO** *(patrón: `dao/estudianteDAO.js`, `dao/usuarioDAO.js`)*
- [x] `dao/usuarioDAO.js` — `validarCredenciales`
- [x] `dao/lugarDAO.js` — `inicializarArchivo`, `leerArchivo`, `escribirArchivo`, CRUD
- [x] `dao/tourDAO.js` — igual, sobre `tours.txt`
- [x] `dao/logDAO.js` — `registrar()` con `appendFileSync` modo `"a"` y UTF8

**Services** *(patrón: `services/estudianteService.js`, `services/authService.js`)*
- [x] `services/authService.js` — solo `autenticar` (ver decisión A2)
- [x] `services/lugarService.js` — obligatorios, `isNaN`, rango 0-100, código duplicado
- [x] `services/tourService.js` — igual + validar que el `lugar` exista en `lugarDAO`
- [x] `services/logService.js` — arma `Fecha – Hora / "Acción" / Usuario`

**Controllers** *(patrón: `controller/estudianteController.js`, `authController.js`)*
- [x] `controllers/authController.js` — `mostrarLogin`, `iniciarSesion`, `cerrarSesion`
- [x] `controllers/lugarController.js` — `listar`, `buscar`, `guardar`, `modificar`, `eliminar`
- [x] `controllers/tourController.js` — los mismos 5

**Routes** *(patrón: `routes/authRoutes.js`, `routes/estudianteRoutes.js`)*
- [x] `routes/authRoutes.js` — `GET /`, `POST /login`, `GET /logout`
- [x] `routes/lugarRoutes.js` — `/lugares/pagina` antes que `/lugares/:codigo`
- [x] `routes/tourRoutes.js` — mismo orden

**Vistas y JS** *(patrón: `public/js/estudiantes.js`, `login.js`)*
- [x] `public/js/login.js` — `preventDefault`, `fetch /login`, redirección
- [x] `public/js/lugares.js` — 6 botones, `fetch`, pintado de tabla
- [x] `public/js/tours.js` — igual
- [x] `views/login.html` — construido del código del profesor
- [x] `views/lugares.html` — construido del código del profesor
- [x] `views/tours.html` — construido del código del profesor

## ETAPA C — Parte 2 · semana 4 · PostgreSQL `proyecto1grupo2` (40 pts)

- [x] `db/database.js` — `new Pool(...)` leyendo del `.env`
- [x] `controllers/regionController.js` — CRUD con `pool.query` y `$1, $2`
- [x] `controllers/destinoController.js` — CRUD + `// ===== CARGA EAGER =====` con `INNER JOIN regiones`
- [x] `controllers/operadorController.js` — CRUD
- [x] `controllers/excursionController.js` — CRUD + `// ===== CARGA EAGER =====` con `INNER JOIN operadores`
- [x] Los 4 controladores: `resultado.rows.length === 0` → `404`
- [x] Los 4 controladores: guardar/leer `BYTEA` con `Buffer.from(base64,"base64")` y `.toString("base64")`
- [x] `routes/regionRoutes.js` · `destinoRoutes.js` · `operadorRoutes.js` · `excursionRoutes.js`
- [x] `views/destinos.html` — 2 formularios, 2 tablas, `<input type="file">`, menú lateral
- [x] `views/excursiones.html` — igual
- [x] `public/js/destinos.js` — `fetch`, `FileReader.readAsDataURL`, pintado con `createElement("tr")`
- [x] `public/js/excursiones.js` — igual

## ETAPA D — Scripts de PostgreSQL (entregable 2)

- [x] `ProyectoP4-PostgreSQL-Grupo-2/ScriptCrearBaseDatos.sql` — `proyecto1grupo2` + 4 tablas + FKs + `BYTEA`
- [x] `ProyectoP4-PostgreSQL-Grupo-2/ScriptPopularBaseDatos.sql` — datos coherentes del tema 7
- [x] Correr los dos scripts en pgAdmin 4 y verificar los `JOIN`

## ETAPA E — Parte 3 · semana 5 · MongoDB `CollMongoDB` (40 pts)

- [x] `config/mongodb.js` — `MongoClient` + `conectarMongoDB()` con caché
- [x] `dao/SitioDAO.js` — clase; `obtenerTodos` con `// ===== CARGA LAZY =====` (projection `imagen:0`)
- [x] `dao/ItinerarioDAO.js` — clase; `obtenerTodos` con `// ===== CARGA LAZY =====` (projection `afiche:0`)
- [x] `services/SitioService.js` · `services/ItinerarioService.js` — clases
- [x] `controllers/SitioController.js` · `controllers/ItinerarioController.js` — clases, `static async`
- [x] `routes/sitioRoutes.js` · `routes/itinerarioRoutes.js` — rutas literales antes de `/:id`
- [x] `views/sitios.html` — 15 campos, `<input type="file">`, tabla, menú lateral
- [x] `views/itinerarios.html` — 25 campos, igual
- [x] `public/js/sitios.js` · `public/js/itinerarios.js`

## ETAPA F — Scripts de MongoDB (entregable 3)

- [x] `ProyectoP4-MongoDB-Grupo-2/Script-60-MONGO.JSON` — 60 documentos × 15 campos
- [x] `ProyectoP4-MongoDB-Grupo-2/Script-120-MONGO.JSON` — 120 documentos × 25 campos
- [x] Verificar que todo `sitios_incluidos` apunte a un `codigo` que exista entre los 60
- [x] Importar los dos archivos en `CollMongoDB` desde Compass y verificar el conteo

## ETAPA G — Integración

- [x] Menú lateral en las 6 vistas CRUD — enlaces y botón de deslogueo (no hizo falta un `menu.js` aparte: el botón lo enlaza el JS de cada vista)
- [x] Llamar a `logService.registrar()` desde **todos** los controladores de las 3 partes
- [x] Verificar el formato exacto de `data/log.txt`: `Fecha – Hora / "Acción" / Usuario`
- [x] Verificar que ninguna vista tenga JavaScript incrustado (requerimiento E del enunciado)

## ETAPA H — ⛔ Cierre de la Parte 1 *(después del 10 de septiembre)*

- [x] Recibir de Teams `models/estudiante.js`, `models/usuario.js`, `views/login.html`, `views/estudiantes.html`
- [x] Adaptar a `models/usuario.js`, `models/lugar.js`, `models/tour.js`
- [x] Adaptar a `views/login.html`, `views/lugares.html`, `views/tours.html`
- [x] Insertar el menú lateral en `lugares.html` y `tours.html`
- [x] Probar el flujo completo: login → menú → CRUD de lugares → CRUD de tours

## ETAPA I — ⛔ Ajuste de Eager / Lazy / serialización *(después del 10 de septiembre)*

- [x] Contrastar la implementación de Eager con la definición del profesor
- [x] Contrastar la implementación de Lazy con la definición del profesor
- [x] Contrastar la serialización de imágenes con lo que explique
- [x] Redactar los comentarios que "señalan puntualmente dónde y cómo se usó"

## ETAPA J — Entrega

- [ ] Llevar las 6 preguntas de `03-DECISIONES-Y-PENDIENTES.md` a la hora de consulta
- [ ] Probar las 7 vistas de punta a punta, sin errores en consola
- [ ] Screenshots de cada opción de cada vista
- [ ] `Grupo-2-Explicacion.pdf` — nombres completos, cédulas, información, funcionamiento, screenshots
**Los arma el grupo al final, después de la revisión de los compañeros:**
- [ ] `ProyectoP4-App-Grupo-2.zip` — comprimir esa carpeta, **sin** `node_modules`
- [ ] `ProyectoP4-PostgreSQL-Grupo-2.zip` — solo los 2 `.sql`
- [ ] `ProyectoP4-MongoDB-Grupo-2.zip` — solo los 2 `.JSON`
- [ ] Ensayar la presentación de 10 minutos
