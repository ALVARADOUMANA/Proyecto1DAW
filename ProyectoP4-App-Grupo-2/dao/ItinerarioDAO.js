/**
 * ==========================================
 * DAO de Itinerarios
 * ==========================================
 *
 * Patron tomado de: Semana6/dao/ProductoDAO.js
 *
 * COLECCION
 * Los dos tipos de documento viven en la misma coleccion
 * "CollMongoDB", como pide el enunciado. Se distinguen sin
 * agregar ningun campo extra: solo los itinerarios tienen el campo
 * "duracion_dias", asi que el filtro es
 * { duracion_dias: { $exists: true } } y el conteo de campos
 * se mantiene exacto en 25.
 *
 * CARGA LAZY
 * Ver el comentario de "obtenerTodos".
 *
 * IMAGEN SERIALIZADA
 * El campo "afiche" guarda la imagen como texto base64, que es
 * como viaja serializada desde la vista.
 */

const conectarMongoDB =
    require("../config/mongodb");

const { ObjectId } =
    require("mongodb");

const COLECCION = "CollMongoDB";

const FILTRO = {

    duracion_dias: { $exists: true }

};

const CAMPOS = [
    "codigo",
    "nombre",
    "descripcion",
    "pais",
    "region",
    "duracion_dias",
    "duracion_noches",
    "cupo_minimo",
    "cupo_maximo",
    "precio_adulto",
    "precio_nino",
    "moneda",
    "incluye_transporte",
    "incluye_alimentacion",
    "incluye_hospedaje",
    "nivel_dificultad",
    "edad_minima",
    "idioma_guia",
    "punto_encuentro",
    "hora_salida",
    "hora_regreso",
    "temporada",
    "politica_cancelacion",
    "sitios_incluidos",
    "afiche"
];


class ItinerarioDAO {


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

    async crear(itinerario) {

        const db =
            await conectarMongoDB();

        const documento =
            this.construirDocumento(itinerario);

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
        // El campo "afiche" es el mas pesado del documento y NO se
        // carga en el listado: la proyeccion lo excluye con 0.
        // Solo se trae cuando el usuario consulta un documento
        // concreto, en "obtenerPorId", que es el momento en que de
        // verdad se necesita. Con 120 documentos la diferencia
        // se nota en el tamano de la respuesta.

        return await db
            .collection(COLECCION)
            .find(
                FILTRO,
                {
                    projection: { afiche: 0 }
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

    async actualizar(id, itinerario) {

        const db =
            await conectarMongoDB();

        const datos =
            this.construirDocumento(itinerario);

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


        const itinerario =
            await this.obtenerPorId(id);


        if (!itinerario) {

            return null;
        }


        await db
            .collection(COLECCION)
            .deleteOne({

                _id:
                    new ObjectId(id)

            });


        return itinerario;
    }

}


module.exports = ItinerarioDAO;
