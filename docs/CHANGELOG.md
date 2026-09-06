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
- [⛔] `models/usuario.js` — archivo de clase vacío, lo da el profesor el 10-sep
- [⛔] `models/lugar.js` — depende del anterior
- [⛔] `models/tour.js` — depende del anterior

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
- [⛔] `views/login.html` — la da el profesor el 10-sep
- [⛔] `views/lugares.html` — depende del anterior
- [⛔] `views/tours.html` — depende del anterior

## ETAPA C — Parte 2 · semana 4 · PostgreSQL `proyecto1grupo2` (40 pts)

- [ ] `db/database.js` — `new Pool(...)` leyendo del `.env`
- [ ] `controllers/regionController.js` — CRUD con `pool.query` y `$1, $2`
- [ ] `controllers/destinoController.js` — CRUD + `// ===== CARGA EAGER =====` con `INNER JOIN regiones`
- [ ] `controllers/operadorController.js` — CRUD
- [ ] `controllers/excursionController.js` — CRUD + `// ===== CARGA EAGER =====` con `INNER JOIN operadores`
- [ ] Los 4 controladores: `resultado.rows.length === 0` → `404`
- [ ] Los 4 controladores: guardar/leer `BYTEA` con `Buffer.from(base64,"base64")` y `.toString("base64")`
- [ ] `routes/regionRoutes.js` · `destinoRoutes.js` · `operadorRoutes.js` · `excursionRoutes.js`
- [ ] `views/destinos.html` — 2 formularios, 2 tablas, `<input type="file">`, menú lateral
- [ ] `views/excursiones.html` — igual
- [ ] `public/js/destinos.js` — `fetch`, `FileReader.readAsDataURL`, pintado con `createElement("tr")`
- [ ] `public/js/excursiones.js` — igual

## ETAPA D — Scripts de PostgreSQL (entregable 2)

- [ ] `ProyectoP4-PostgreSQL-Grupo-2/ScriptCrearBaseDatos.sql` — `proyecto1grupo2` + 4 tablas + FKs + `BYTEA`
- [ ] `ProyectoP4-PostgreSQL-Grupo-2/ScriptPopularBaseDatos.sql` — datos coherentes del tema 7
- [ ] Correr los dos scripts en pgAdmin 4 y verificar los `JOIN`

## ETAPA E — Parte 3 · semana 5 · MongoDB `CollMongoDB` (40 pts)

- [ ] `config/mongodb.js` — `MongoClient` + `conectarMongoDB()` con caché
- [ ] `dao/SitioDAO.js` — clase; `obtenerTodos` con `// ===== CARGA LAZY =====` (projection `imagen:0`)
- [ ] `dao/ItinerarioDAO.js` — clase; `obtenerTodos` con `// ===== CARGA LAZY =====` (projection `afiche:0`)
- [ ] `services/SitioService.js` · `services/ItinerarioService.js` — clases
- [ ] `controllers/SitioController.js` · `controllers/ItinerarioController.js` — clases, `static async`
- [ ] `routes/sitioRoutes.js` · `routes/itinerarioRoutes.js` — rutas literales antes de `/:id`
- [ ] `views/sitios.html` — 15 campos, `<input type="file">`, tabla, menú lateral
- [ ] `views/itinerarios.html` — 25 campos, igual
- [ ] `public/js/sitios.js` · `public/js/itinerarios.js`

## ETAPA F — Scripts de MongoDB (entregable 3)

- [ ] `ProyectoP4-MongoDB-Grupo-2/Script-60-MONGO.JSON` — 60 documentos × 15 campos
- [ ] `ProyectoP4-MongoDB-Grupo-2/Script-120-MONGO.JSON` — 120 documentos × 25 campos
- [ ] Verificar que todo `sitios_incluidos` apunte a un `codigo` que exista entre los 60
- [ ] Importar los dos archivos en `CollMongoDB` desde Compass y verificar el conteo

## ETAPA G — Integración

- [ ] `public/js/menu.js` + `<nav>` en las 6 vistas CRUD — enlaces y botón de deslogueo
- [ ] Llamar a `logService.registrar()` desde **todos** los controladores de las 3 partes
- [ ] Verificar el formato exacto de `data/log.txt`: `Fecha – Hora / "Acción" / Usuario`
- [ ] Verificar que ninguna vista tenga JavaScript incrustado (requerimiento E del enunciado)

## ETAPA H — ⛔ Cierre de la Parte 1 *(después del 10 de septiembre)*

- [⛔] Recibir de Teams `models/estudiante.js`, `models/usuario.js`, `views/login.html`, `views/estudiantes.html`
- [⛔] Adaptar a `models/usuario.js`, `models/lugar.js`, `models/tour.js`
- [⛔] Adaptar a `views/login.html`, `views/lugares.html`, `views/tours.html`
- [⛔] Insertar el menú lateral en `lugares.html` y `tours.html`
- [⛔] Probar el flujo completo: login → menú → CRUD de lugares → CRUD de tours

## ETAPA I — ⛔ Ajuste de Eager / Lazy / serialización *(después del 10 de septiembre)*

- [⛔] Contrastar la implementación de Eager con la definición del profesor
- [⛔] Contrastar la implementación de Lazy con la definición del profesor
- [⛔] Contrastar la serialización de imágenes con lo que explique
- [⛔] Redactar los comentarios que "señalan puntualmente dónde y cómo se usó"

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
