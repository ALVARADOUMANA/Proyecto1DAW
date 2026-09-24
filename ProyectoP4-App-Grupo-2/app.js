/**
 * ==========================================
 * Proyecto 1 - EIF509 - Grupo 2
 * Turismo y lugares por visitar
 * ==========================================
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
Archivos públicos
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
*/

const regionRoutes =
    require("./routes/regionRoutes");

const destinoRoutes =
    require("./routes/destinoRoutes");

const operadorRoutes =
    require("./routes/operadorRoutes");

const excursionRoutes =
    require("./routes/excursionRoutes");

app.use("/api/regiones", regionRoutes);

app.use("/api/destinos", destinoRoutes);

app.use("/api/operadores", operadorRoutes);

app.use("/api/excursiones", excursionRoutes);

// Paginas de la Parte 2

app.get("/destinos/pagina", (req, res) => {

    res.sendFile(
        path.join(__dirname, "views", "destinos.html")
    );

});

app.get("/excursiones/pagina", (req, res) => {

    res.sendFile(
        path.join(__dirname, "views", "excursiones.html")
    );

});

/*
=================================
Rutas - PARTE 3 (semana 5)
=================================
*/

const sitioRoutes =
    require("./routes/sitioRoutes");

const itinerarioRoutes =
    require("./routes/itinerarioRoutes");

app.use("/api/sitios", sitioRoutes);

app.use("/api/itinerarios", itinerarioRoutes);

// Paginas de la Parte 3

app.get("/sitios/pagina", (req, res) => {

    res.sendFile(
        path.join(__dirname, "views", "sitios.html")
    );

});

app.get("/itinerarios/pagina", (req, res) => {

    res.sendFile(
        path.join(__dirname, "views", "itinerarios.html")
    );

});

/*
=================================
Página inexistente
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
