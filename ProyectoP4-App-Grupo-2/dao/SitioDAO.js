/**
 * ==========================================
 * DAO de Sitios
 * ==========================================
 *
 * Patron tomado de: Semana6/dao/ProductoDAO.js
 *
 * COLECCION
 * Los dos tipos de documento viven en la misma coleccion
 * "CollMongoDB", como pide el enunciado. Se distinguen sin
 * agregar ningun campo extra: solo los sitios tienen el campo
 * "latitud", asi que el filtro es
 * { latitud: { $exists: true } } y el conteo de campos
 * se mantiene exacto en 15.
 *
 * CARGA LAZY
 * Ver el comentario de "obtenerTodos".
 *
 * IMAGEN SERIALIZADA
 * El campo "imagen" guarda la imagen como texto base64, que es
 * como viaja serializada desde la vista.
 */

const conectarMongoDB =
    require("../config/mongodb");

const { ObjectId } =
    require("mongodb");

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


        // ===== CARGA LAZY =====
        //
        // El campo "imagen" es el mas pesado del documento y NO se
        // carga en el listado: la proyeccion lo excluye con 0.
        // Solo se trae cuando el usuario consulta un documento
        // concreto, en "obtenerPorId", que es el momento en que de
        // verdad se necesita. Con 60 documentos la diferencia
        // se nota en el tamano de la respuesta.

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


        // Aqui SI se trae el documento completo, con la imagen.
        // Es la otra mitad de la carga perezosa.

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
