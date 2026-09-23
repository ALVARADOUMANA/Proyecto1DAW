/**
 * ==========================================
 * DAO de Sitios
 * ==========================================
 */

const conectarMongoDB =
    require("../config/mongodb");

const { ObjectId } =
    require("mongodb");

// Los dos tipos de documento viven en la misma coleccion.
// Solo este tipo tiene el campo "latitud".

const COLECCION = "CollMongoDB";

const FILTRO = {

    latitud: { $exists: true }

};

const CAMPOS = [
    "codigo",
    "nombre",
    "pais",
    "provincia",
    "canton",
    "categoria",
    "descripcion",
    "latitud",
    "longitud",
    "altitud_msnm",
    "costo_entrada",
    "moneda",
    "horario",
    "calificacion",
    "imagen"
];


class SitioDAO {


    // ==========================
    // Armar el documento
    // ==========================

    construirDocumento(datos) {

        const documento = {};

        CAMPOS.forEach((campo) => {

            documento[campo] = datos[campo];

        });

        return documento;
    }


    // ==========================
    // CREAR
    // ==========================

    async crear(sitio) {

        const db =
            await conectarMongoDB();

        const documento =
            this.construirDocumento(sitio);

        const resultado =
            await db
                .collection(COLECCION)
                .insertOne(documento);

        return {

            _id: resultado.insertedId,

            ...documento

        };
    }


    // ==========================
    // CONSULTAR TODOS
    // ==========================

    async obtenerTodos() {

        const db =
            await conectarMongoDB();


        /*=========================================
          CARGA LAZY
          El listado NO trae el campo "imagen".
          Se carga solo en "obtenerPorId".
        =========================================*/


        return await db
            .collection(COLECCION)
            .find(
                FILTRO,
                {
                    projection: { imagen: 0 }
                }
            )
            .toArray();
    }


    // ==========================
    // CONSULTAR UNO
    // ==========================

    async obtenerPorId(id) {

        const db =
            await conectarMongoDB();


        return await db
            .collection(COLECCION)
            .findOne({
                _id: new ObjectId(id)
            });
    }


    // ==========================
    // ACTUALIZAR
    // ==========================

    async actualizar(id, sitio) {

        const db =
            await conectarMongoDB();

        const datos =
            this.construirDocumento(sitio);


        // Si no viene una imagen nueva se conserva la que ya tiene.

        if (datos.imagen === null ||
            datos.imagen === undefined) {

            delete datos.imagen;
        }

        const resultado =
            await db
                .collection(COLECCION)
                .updateOne(

                    {
                        _id:
                            new ObjectId(id)
                    },

                    {
                        $set: datos
                    }

                );


        if (resultado.matchedCount === 0) {

            return null;
        }


        return await this.obtenerPorId(id);
    }


    // ==========================
    // ELIMINAR
    // ==========================

    async eliminar(id) {

        const db =
            await conectarMongoDB();


        const sitio =
            await this.obtenerPorId(id);


        if (!sitio) {

            return null;
        }


        await db
            .collection(COLECCION)
            .deleteOne({

                _id:
                    new ObjectId(id)

            });


        return sitio;
    }

}


module.exports = SitioDAO;
