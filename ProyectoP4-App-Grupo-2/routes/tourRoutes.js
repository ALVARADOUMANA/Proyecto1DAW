/**
 * ==========================================
 * Rutas de Tours
 * ==========================================
 *
 * Patron tomado de: ProyectoEstudiantes/routes/estudianteRoutes.js
 *
 * ORDEN DE LAS RUTAS
 * Express recorre las rutas de arriba hacia abajo y usa la primera
 * que coincide con la URL. Por eso "/tours/pagina" va ANTES que
 * "/tours/:codigo": si fuera al reves, la ruta generica taparia
 * a la especifica y "pagina" entraria como si fuera un codigo.
 */

const express = require("express");

const router = express.Router();

const TourController =
    require("../controllers/tourController");

const path = require("path");

/*=========================================
  Mostrar pagina CRUD
=========================================*/

router.get(

    "/tours/pagina",

    (req, res) => {

        res.sendFile(

            path.join(

                __dirname,

                "..",

                "views",

                "tours.html"

            )

        );

    }

);

/*=========================================
  Consultar tours
=========================================*/

router.get(

    "/tours",

    TourController.listar

);

/*=========================================
  Crear tour
=========================================*/

router.post(

    "/tours",

    TourController.guardar

);

/*=========================================
  Modificar tour
=========================================*/

router.put(

    "/tours",

    TourController.modificar

);

/*=========================================
  Consultar un tour
=========================================*/

router.get(

    "/tours/:codigo",

    TourController.buscar

);

/*=========================================
  Eliminar tour
=========================================*/

router.delete(

    "/tours/:codigo",

    TourController.eliminar

);

/*=========================================
  Exportar Router
=========================================*/

module.exports = router;
