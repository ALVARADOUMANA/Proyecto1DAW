/**
 * ==========================================
 * Proyecto 1 - EIF509 - Grupo 2
 * Turismo y lugares por visitar
 * ==========================================
 *
 * Patron tomado de: ProyectoEstudiantes/app.js
 */

const express = require("express");

const path = require("path");

require("dotenv").config();

const app = express();

/*
=================================
Middleware
=================================
*/

app.use(express.json({
    limit: "10mb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
}));

/*
=================================
Archivos publicos
=================================
*/

app.use(express.static(
    path.join(__dirname, "public")
));

/*
=================================
Rutas - PARTE 1 (semana 2)
=================================
*/

const authRoutes =
    require("./routes/authRoutes");

const lugarRoutes =
    require("./routes/lugarRoutes");

const tourRoutes =
    require("./routes/tourRoutes");

app.use("/", authRoutes);

app.use("/", lugarRoutes);

app.use("/", tourRoutes);

/*
=================================
Rutas - PARTE 2 (semana 4)
=================================

PENDIENTE: regiones, destinos, operadores y excursiones.
*/

/*
=================================
Rutas - PARTE 3 (semana 5)
=================================

PENDIENTE: sitios e itinerarios.
*/

/*
=================================
Pagina inexistente
=================================
*/

app.use((req, res) => {

    res.status(404).send("Error 404 - Pagina no encontrada");

});

/*
=================================
Servidor
=================================
*/

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("--------------------------------");

    console.log("Servidor iniciado correctamente");

    console.log("Puerto:", PORT);

    console.log("http://localhost:" + PORT);

    console.log("--------------------------------");

});
