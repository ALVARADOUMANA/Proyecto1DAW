# Proyecto 1 — EIF509 — Grupo 2

Tema 7: Turismo y lugares por visitar

- Pablo Alvarado
- Siandi Araya
- Kristel Duarte
- Jordi Rivas

## Antes de arrancar

PostgreSQL y MongoDB tienen que estar corriendo.

**PostgreSQL** — desde `ProyectoP4-PostgreSQL-Grupo-2/`:

```
psql -U postgres -c "CREATE DATABASE proyecto1grupo2;"
psql -U postgres -d proyecto1grupo2 -f ScriptCrearBaseDatos.sql
psql -U postgres -d proyecto1grupo2 -f ScriptPopularBaseDatos.sql
```

En pgAdmin 4 es lo mismo: correr primero la línea del `CREATE DATABASE` conectado a
`postgres`, reconectar el Query Tool a `proyecto1grupo2` y correr el resto.

**MongoDB** — desde `ProyectoP4-MongoDB-Grupo-2/`:

```
mongoimport --db proyecto1grupo2 --collection CollMongoDB --jsonArray --file Script-60-MONGO.JSON
mongoimport --db proyecto1grupo2 --collection CollMongoDB --jsonArray --file Script-120-MONGO.JSON
```

Con Compass es **ADD DATA → Import JSON** con cada archivo.

## Comandos

```
npm install
npm start
```

Abrir **http://localhost:3000**

## Usuarios

| Usuario | Contraseña |
|---|---|
| admin | 12345 |
| guia | abc123 |
| recepcion | clave456 |

## Bases de datos

- PostgreSQL: `proyecto1grupo2`
- MongoDB: base `proyecto1grupo2`, colección `CollMongoDB`

Se configuran en el archivo `.env`.
