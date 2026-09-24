/**
 * ==========================================
 * DAO de Sitios
 * ==========================================
 */

const conectarMongoDB =
    require("../config/mongodb");

const { ObjectId } =
    require("mongodb");

// Ambos tipos comparten la coleccion. Solo este tiene "latitud".

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


        // La imagen no viene en el JSON: se sube aparte
        // como bytes crudos.

        documento.imagen = null;


        return documento;
    }


    // ==========================
    // GUARDAR LA IMAGEN
    // ==========================

    async guardarImagen(id, bytes) {

        const db =
            await conectarMongoDB();


        const resultado =
            await db
                .collection(COLECCION)
                .updateOne(

                    {
                        _id:
                            new ObjectId(id)
                    },

                    {
                        $set: { imagen: bytes }
                    }

                );


        if (resultado.matchedCount === 0) {

            return null;
        }


        return { bytes: bytes.length };
    }


    // ==========================
    // OBTENER LA IMAGEN
    // ==========================

    async obtenerImagen(id) {

        const db =
            await conectarMongoDB();


        const documento =
            await db
                .collection(COLECCION)
                .findOne(

                    {
                        _id:
                            new ObjectId(id)
                    },

                    {
                        projection: { imagen: 1 }
                    }

                );


        if (!documento || !documento.imagen) {

            return null;
        }


        return documento.imagen.buffer
            ? Buffer.from(documento.imagen.buffer)
            : documento.imagen;
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
          CARGA LAZY: el listado excluye "imagen".
          Se carga en "obtenerPorId".
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


        const documento = await db
            .collection(COLECCION)
            .findOne({
                _id: new ObjectId(id)
            });


        return documento;
    }


    // ==========================
    // ACTUALIZAR
    // ==========================

    async actualizar(id, sitio) {

        const db =
            await conectarMongoDB();

        const datos =
            this.construirDocumento(sitio);


        // sin imagen nueva se conserva la actual

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
