# 03 — Decisiones y supuestos

Dos categorías:

- **Decisión** — se resolvió con el material de clase. Cerrada.
- **Supuesto** — el enunciado admite más de una lectura; se escogió una y se documenta.

Lo que falta por hacer está en `PENDIENTE.md`.

---

## A. Decisiones tomadas

### A1. Carpeta `controllers` en plural
`ProyectoEstudiantes` tiene la carpeta como `controller/` pero sus routers hacen
`require("../controllers/...")`, así que la app no arranca. La pizarra
(`knowledge/08-PIZARRA-CLASE.md`) dice **`controllers`**. Se usa plural.

### A2. `authService.js` exporta solo `autenticar`
El original exporta además `buscarPorUsuario` y `listar`, que llaman a métodos que
`usuarioDAO.js` no tiene y que ninguna ruta usa. El profesor dejó activa la versión corta y
comentada la larga. Se copia la versión activa.

### A3. Sin sesión, igual que en clase *(confirmado con el grupo)*
El enunciado pide que el menú aparezca "una vez que la autenticación sea correcta, no
antes". El código de semana 2 no tiene sesiones: `iniciarSesion` responde `{ok:true}` y
`public/js/login.js` redirige con `window.location.href`.

Se replica ese comportamiento tal cual. Tras el login correcto se redirige a
`/lugares/pagina`, que ya trae el menú lateral. **No se instala `express-session`** porque
es un patrón que no está en el material y el punto 4 del enunciado castiga eso con nota cero.

> **Limitación conocida, hay que decirla en la presentación:** escribiendo la URL a mano se
> puede llegar a una vista sin pasar por el login. Es la misma limitación que tiene el
> código de clase. Toda entrada queda registrada en `data/log.txt`.

### A4. Parte 3 se implementa con MongoDB únicamente
El enunciado se contradice: el requerimiento **D** dice que la semana 5 usa repositorio
"basado en PostgreSQL" y "basado en MongoDB", pero la **distribución de puntos** (los 40 pts
de la Parte 3) habla solo de MongoDB, de la colección `CollMongoDB`, de 60 y 120 documentos
y de dos archivos `.JSON`.

Se sigue la distribución de puntos, que es la que asigna la nota. Ventaja adicional: la app
no termina con dos conexiones distintas a PostgreSQL (el `Pool` de `pg` de semana 4 y
Sequelize de semana 5) peleando por lo mismo. → **Pregunta P1** para el profesor.

### A5. Estilo de código separado por semana
Semana 2 y 4: funciones sueltas + `module.exports = { ... }`, nombres en `camelCase`.
Semana 5: clases, métodos `static async` en el controlador, nombres en `PascalCase`.
Se conserva cada estilo sin unificarlo, para que se vea de qué parte viene cada archivo.

### A6. La Parte 2 no lleva `service` ni `dao`
En `S4-SW` el controlador habla directo con el `pool`. `knowledge/sesion5.md` lo justifica:
`db/database.js` "REPRESENTA LA CAPA DE DATOS" y el controlador y las rutas "REPRESENTAN LA
CAPA DE PRESENTACIÓN". No se le agregan capas que el profesor no puso.

### A7. La bitácora usa `appendFileSync`
Semana 2 solo usa `readFileSync` y `writeFileSync`, pero `writeFileSync` sobrescribe y un
log tiene que acumular. `knowledge/sesion7.md` menciona explícitamente los modos
`"r"`, `"w"`, `"a"`, `"x"`, `"r+"` y la codificación UTF8 como materia de la clase. Se usa
`fs.appendFileSync(archivo, linea, "utf8")` — modo `"a"`, mismo módulo `fs`, misma capa DAO.

### A8. Una carpeta por entregable, dentro de `Proyecto1DAW/`
Tres carpetas, cada una con el nombre exacto de su `.zip`:

| Carpeta | Contenido |
|---|---|
| `ProyectoP4-App-Grupo-2/` | la aplicación completa |
| `ProyectoP4-PostgreSQL-Grupo-2/` | **solo** los 2 `.sql` |
| `ProyectoP4-MongoDB-Grupo-2/` | **solo** los 2 `.JSON` |

El enunciado dice *"**Únicamente** 2 conjuntos de scripts"* y *"**Únicamente** 2 archivos
en formato `.JSON`"*. Por eso esas dos carpetas no llevan `README.md` ni ningún otro
archivo: los comandos para cargarlas están en el `README.md` de la aplicación y en la
cabecera del propio `ScriptCrearBaseDatos.sql`.

Cada `.zip` sale de comprimir su carpeta y nada más, que es lo que pide el enunciado
("únicamente las carpetas y archivos respectivos"). Del zip de la app solo se excluye
`node_modules/`.

`docs/` queda fuera de las tres carpetas, así que no entra en ningún zip. El `README.md` del
proyecto vive dentro de `ProyectoP4-App-Grupo-2/` y sí forma parte de la aplicación.

El `#` del enunciado (`ProyectoP4-App-Grupo-#.zip`) es el marcador del número de grupo, no
parte del nombre: el ejemplo que da es `ProyectoP4-App-Grupo-1.zip`. Por eso van sin `#`.

**El armado de los `.zip` lo hace el grupo al final**, después de que los compañeros revisen.

### A9. `docs/` es documentación del grupo, no parte de la app
Vive en `Proyecto1DAW/docs/`, fuera de las tres carpetas de entregables, así que no entra
en ningún `.zip`. Su contenido alimenta el `Grupo-2-Explicacion.pdf`.

### A10. El usuario de la bitácora viaja desde el navegador
El enunciado pide que el log lleve el usuario en cada acción, pero sin sesión el servidor
no sabe quién está autenticado (ver A3). Solución: `public/js/login.js` guarda el usuario
en `localStorage` al autenticarse, y cada `fetch` lo envía — en el cuerpo JSON para POST y
PUT, en la cadena de consulta para GET y DELETE. Los controladores lo leen con
`req.body.usuario` o `req.query.usuario`. Es JavaScript de navegador del mismo nivel que el
`window.location.href` que ya usa el material.

### A11. Dos controles de salida, no uno
El enunciado pide dos cosas distintas: que las vistas de la Parte 1 conserven los botones
de la semana 2, entre ellos **Salir**, y que el menú tenga su propio **botón de deslogueo**.
Por eso las vistas de lugares y tours llevan `btnSalir` en la fila de botones y todas las
vistas llevan `btnSalirMenu` en el menú. Los dos van a `/logout`. Se llaman distinto
porque conviven en la misma página: `btnSalir` es el de la interfaz de la semana 2 y
`btnSalirMenu` el del menú que pide el enunciado.

---

## B. Supuestos (conviene confirmarlos, pero no bloquean)

### S1. El campo de imagen es uno de los 8 campos
El enunciado pide "8 campos (sin contar campos de llaves/relaciones)" y aparte exige un
campo de imagen binaria en cada tabla. Se interpretó **7 campos de datos + 1 campo binario = 8**.
La otra lectura sería 8 + imagen = 9 columnas. Se escogió la primera porque cumple el
número al pie de la letra. → **Pregunta P2.**

### S2. Cómo conviven las dos formas de documento en `CollMongoDB`
El enunciado manda los 60 y los 120 documentos a la **misma** colección, pero también exige
exactamente 15 y 25 campos. Un campo discriminador (`tipo: "sitio"`) rompería el conteo.
Se distinguen por un campo propio de cada forma: `{ latitud: { $exists: true } }` para los
sitios y `{ duracion_dias: { $exists: true } }` para los itinerarios. Cero campos extra.
→ **Pregunta P3.**

### S3. Los `.JSON` son arreglos para `insertMany`
El enunciado pide "2 archivos en formato `.JSON`, como fue visto en clase". En clase se vio
`insertOne` desde el DAO, no importación de archivos. Se entregarán como un arreglo JSON de
60 y de 120 documentos, que es lo que consume tanto `mongoimport` como el botón *Import* de
MongoDB Compass — la herramienta que sí se instaló en clase (`knowledge/sesion5.md`, paso 8).
→ **Pregunta P4.**

### S4. Nombres de las bases de datos — divergencia del enunciado
Las dos bases se llaman **`proyecto1grupo2`**, por decisión del grupo.

| | Enunciado | Se usa |
|---|---|---|
| Base PostgreSQL | `BDPostgreSQL` (línea 141) | `BDPostgreSQL` |
| Base MongoDB | no la nombra | `proyecto1grupo2` |
| Colección MongoDB | `CollMongoDB` (líneas 154, 197, 198) | `CollMongoDB` — **sin cambio** |

El nombre de la colección sí se respeta porque el enunciado lo repite tres veces, incluso al
describir los dos `.JSON` entregables. El de la base de PostgreSQL aparece una sola vez, en
el título de la Parte 2, y es un nombre local que el profesor cambia al restaurar el script.
Es una divergencia del enunciado, decidida y confirmada por el grupo. Las dos bases usan
el mismo nombre a propósito, para que la configuración sea una sola.

### S5. La Parte 1 no fija cantidad de campos
Para las Partes 2 y 3 el enunciado dice 8, 15 y 25 campos. Para la Parte 1 solo pide
"contenido y tipos de campos diferentes". Se usan **5 campos**, la misma cantidad y la misma
forma que `estudiantes.txt` (una llave, tres de texto, uno numérico validado por rango).

---

## C. Preguntas para el profesor

Conviene llevarlas a la hora de consulta (jueves, una hora antes de clase) y no dejarlas
para la semana de entrega — el enunciado lo pide explícitamente en la indicación 4.

| # | Pregunta | Depende de |
|---|---|---|
| **P1** | El requerimiento D dice que la semana 5 usa PostgreSQL **y** MongoDB, pero la distribución de puntos de la Parte 3 habla solo de MongoDB, `CollMongoDB` y los dos `.JSON`. ¿La Parte 3 es solo MongoDB? | A4 |
| **P2** | En la Parte 2, ¿el campo de imagen `BYTEA` cuenta dentro de los 8 campos de la tabla, o son 8 campos **más** el campo de imagen? | S1 |
| **P3** | Los 60 y los 120 documentos van a la misma colección `CollMongoDB`. ¿Se puede agregar un campo discriminador (`tipo`), aunque suba el conteo a 16 y 26 campos, o se distinguen por la forma del documento? | S2 |
| **P4** | Los dos archivos `.JSON`, ¿como arreglo para importar desde Compass / `mongoimport`, o como script de `insertMany` para `mongosh`? | S3 |
| **P5** | El menú lateral con botón de deslogueo no tiene código en el material. ¿Se acepta hacerlo con HTML + CSS + JS de `public/`, con las mismas técnicas de semana 2? | — |
| **P6** | Sin sesiones en el código de semana 2, ¿se acepta que el bloqueo de acceso sea la redirección del `login.js`, o hay que agregar un mecanismo de sesión? | A3 |

---
