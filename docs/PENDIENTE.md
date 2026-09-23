# Lo que falta — Grupo 2

**Entrega: jueves 24 de septiembre de 2026, antes de las 11am.**
Sube todo **el primer miembro del grupo** (`knowledge/sesion9.md`).

El código está terminado y probado contra PostgreSQL y MongoDB. Lo que queda son 5 pasos,
en este orden.

---

## 1. Probar la aplicación en el navegador

Es lo primero, porque si algo falla hay que arreglarlo antes de empaquetar.

```
cd ProyectoP4-App-Grupo-2
npm install
npm start
```

Entrar a **http://localhost:3000** con `admin` / `12345`.

PostgreSQL y MongoDB tienen que estar corriendo. Si las bases no existen todavía, los
comandos para crearlas están en `ProyectoP4-App-Grupo-2/README.md`.

Recorrer las 6 vistas desde el menú y hacer clic en **todos** los botones de cada una.
Lo que más conviene revisar, porque es lo único que no se ha probado:

- que suba una imagen de verdad y se vea la miniatura
- que el `Región` / `Operador` del segundo formulario traiga opciones
- que los botones Editar y Eliminar de las tablas funcionen
- que Salir devuelva al login

## 2. Screenshots

El enunciado pide capturas de **cada opción**, no de cada pantalla. Es decir, una por cada
botón que se presiona y su resultado.

Conviene incluir también:

- `data/log.txt` con la bitácora llena
- pgAdmin mostrando la base con sus 4 tablas
- Compass mostrando `CollMongoDB` con los 180 documentos

## 3. `Grupo-2-Explicacion.pdf`

Lo que pide el enunciado:

- nombres completos y **cédula** de los 4 integrantes
- descripción de la información de la aplicación
- descripción del funcionamiento
- los screenshots del paso 2

Para escribirlo, el material está en `02-MODELO-DE-DATOS.md` (qué datos maneja) y en
`00-PLAN.md` (arquitectura, rutas, manejo de errores).

## 4. Los 3 `.zip`

| Archivo | Qué lleva |
|---|---|
| `ProyectoP4-App-Grupo-2.zip` | la carpeta `ProyectoP4-App-Grupo-2/` **sin `node_modules`** |
| `ProyectoP4-PostgreSQL-Grupo-2.zip` | **solo** los 2 `.sql` |
| `ProyectoP4-MongoDB-Grupo-2.zip` | **solo** los 2 `.JSON` |

El enunciado dice *"Únicamente"*: no meter ningún archivo extra en los dos últimos.

## 5. Ensayar la presentación

10 minutos, y el tiempo cuenta para la nota. El profesor puede preguntar sobre el código.

Los tres puntos que el enunciado exige *"señalar puntualmente"*:

| Qué | Dónde está en el código |
|---|---|
| Carga **Eager** | `controllers/destinoController.js` y `excursionController.js` — el `INNER JOIN` |
| Carga **Lazy** | `dao/SitioDAO.js` y `ItinerarioDAO.js` — la proyección que excluye el binario |
| **Serialización** de imágenes | `decode`/`encode` en los controladores de la Parte 2; `FileReader` en `public/js` |

**Orden para demostrar el Lazy en MongoDB.** Los 180 documentos sembrados vienen con la
imagen vacía, así que el contraste solo se ve si primero hay una imagen guardada:

1. En Sitios, llenar el formulario, escoger una imagen y darle CREAR.
2. MOSTRAR TODOS — el mensaje dice *"sin el campo imagen: carga Lazy"*.
3. Consultar ese documento — aparece la miniatura y el mensaje dice
   *"documento completo, con imagen"*.

Ese es el punto a señalar: el listado de 60 documentos no carga el binario; solo se trae
cuando se pide un documento concreto.

---

## Si hay chance de preguntarle al profesor

Seis dudas de interpretación del enunciado, ninguna bloquea. Están explicadas en
`03-DECISIONES.md`, sección C. Las dos que más pesan:

- **P2** — ¿el campo de imagen `BYTEA` cuenta dentro de los 8 campos de cada tabla, o son
  8 más la imagen? Se asumió que cuenta.
- **P3** — los 60 y los 120 documentos van a la misma colección `CollMongoDB`. Se
  distinguen por la forma del documento, sin campo discriminador, para no romper el
  conteo de 15 y 25 campos.
