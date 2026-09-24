/**
 * ==========================================
 * DAO de Itinerarios
 * ==========================================
 */

const conectarMongoDB =
    require("../config/mongodb");

const { ObjectId } =
    require("mongodb");

// Ambos tipos comparten la coleccion. Solo este tiene "duracion_dias".

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


        // ==========================
        // base64 de la vista -> binario
        // ==========================

        if (typeof documento.afiche === "string" &&
            documento.afiche !== "") {

            documento.afiche = Buffer.from(
                documento.afiche,
                "base64"
            );

        }


        return documento;
    }


    // ==========================
    // SERIALIZAR
    // ==========================

    serializar(documento) {

        if (!documento || !documento.afiche) {

            return documento;

        }


        // ==========================
        // binario -> base64 para la vista
        // ==========================

        const binario = documento.afiche;

        documento.afiche = Buffer.isBuffer(binario)
            ? binario.toString("base64")
            : Buffer.from(binario.buffer).toString("base64");


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

        return this.serializar({

            _id: resultado.insertedId,

            ...documento

        });
    }


    // ==========================
    // CONSULTAR TODOS
    // ==========================

    async obtenerTodos() {

        const db =
            await conectarMongoDB();


        /*=========================================
          CARGA LAZY: el listado excluye "afiche".
          Se carga en "obtenerPorId".
        =========================================*/


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


        const documento = await db
            .collection(COLECCION)
            .findOne({
                _id: new ObjectId(id)
            });


        return this.serializar(documento);
    }


    // ==========================
    // ACTUALIZAR
    // ==========================

    async actualizar(id, itinerario) {

        const db =
            await conectarMongoDB();

        const datos =
            this.construirDocumento(itinerario);


        // sin imagen nueva se conserva la actual

        if (datos.afiche === null ||
            datos.afiche === undefined) {

            delete datos.afiche;
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
