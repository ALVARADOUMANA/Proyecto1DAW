/**
 * ==========================================
 * Rutas de Tours
 * ==========================================
 */

const express = require("express");

const router = express.Router();

const TourController =
    require("../controllers/tourController");

const path = require("path");

/*=========================================
  Mostrar página CRUD
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
