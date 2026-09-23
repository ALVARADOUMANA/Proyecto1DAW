/**
 * ==========================================
 * Rutas de Lugares
 * ==========================================
 */

const express = require("express");

const router = express.Router();

const LugarController =
    require("../controllers/lugarController");

const path = require("path");

/*=========================================
  Mostrar pagina CRUD
=========================================*/

router.get(

    "/lugares/pagina",

    (req, res) => {

        res.sendFile(

            path.join(

                __dirname,

                "..",

                "views",

                "lugares.html"

            )

        );

    }

);

/*=========================================
  Consultar lugares
=========================================*/

router.get(

    "/lugares",

    LugarController.listar

);

/*=========================================
  Crear lugar
=========================================*/

router.post(

    "/lugares",

    LugarController.guardar

);

/*=========================================
  Modificar lugar
=========================================*/

router.put(

    "/lugares",

    LugarController.modificar

);

/*=========================================
  Consultar un lugar
=========================================*/

router.get(

    "/lugares/:codigo",

    LugarController.buscar

);

/*=========================================
  Eliminar lugar
=========================================*/

router.delete(

    "/lugares/:codigo",

    LugarController.eliminar

);

/*=========================================
  Exportar Router
=========================================*/

module.exports = router;
