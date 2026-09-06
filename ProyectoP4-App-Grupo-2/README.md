# Proyecto 1 — EIF509 Desarrollo de Aplicaciones Basadas en Web

**Grupo 2 · Tema 7: Turismo y lugares por visitar**

- Pablo Alvarado
- Siandi Araya
- Kristel Duarte
- Jordi Rivas

---

## Cómo arrancarlo

Desde esta carpeta:

```bash
npm install
npm start
```

Queda en **http://localhost:3000** y abre en la pantalla de autenticación.

Usuarios de prueba (`data/usuarios.txt`):

| Usuario | Contraseña |
|---|---|
| admin | 12345 |
| guia | abc123 |
| recepcion | clave456 |

## Bases de datos

| | Nombre | Dónde se usa |
|---|---|---|
| PostgreSQL | **`proyecto1grupo2`** | Parte 2 — tablas `regiones`, `destinos`, `operadores`, `excursiones` |
| MongoDB | base `proyecto1grupo2`, colección **`CollMongoDB`** | Parte 3 — documentos de sitios e itinerarios |

Las dos bases se llaman `proyecto1grupo2`, por decisión del grupo. El enunciado las nombra
`BDPostgreSQL`; el nombre de la colección, `CollMongoDB`, sí se respeta tal cual.

Los scripts para crearlas y poblarlas van en las carpetas hermanas
`ProyectoP4-PostgreSQL-Grupo-2/` y `ProyectoP4-MongoDB-Grupo-2/`.

## Configuración

Las credenciales van en un archivo `.env` en esta carpeta (no se versiona):

```
PORT=3000

PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=proyecto1grupo2
PG_USER=postgres
PG_PASSWORD=Admin123

MONGO_URI=mongodb://localhost:27017
MONGO_DATABASE=proyecto1grupo2
```

---

## Estado actual

| Parte | Estado |
|---|---|
| 1 — archivos `.txt` (semana 2) | Construida, **menos** `models/` y `views/`: el profesor entrega ese código el **10 de septiembre**. Mientras tanto la autenticación y la bitácora funcionan; las vistas de CRUD no cargan. |
| 2 — PostgreSQL (semana 4) | Pendiente. Depende de que se vea **carga Eager** y **serialización de imágenes** en clase. |
| 3 — MongoDB (semana 5) | Pendiente. Depende de que se vea **carga Lazy** y **serialización de imágenes** en clase. |

El detalle está en `../docs/`: el plan, el modelo de datos, las decisiones y el
`CHANGELOG.md` con la lista de control.
