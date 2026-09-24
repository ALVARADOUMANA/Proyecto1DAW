/**
 * ==========================================
 * Servicio de Itinerarios
 * ==========================================
 */

const ItinerarioDAO =
    require("../dao/ItinerarioDAO");


const dao =
    new ItinerarioDAO();


class ItinerarioService {


    async crear(itinerario) {

        if (!itinerario.codigo || !itinerario.nombre) {

            throw new Error(
                "El codigo y el nombre son obligatorios."
            );
        }

        return await dao.crear(itinerario);
    }


    async obtenerTodos() {

        return await dao.obtenerTodos();
    }


    async obtenerPorId(id) {

        return await dao.obtenerPorId(id);
    }


    async actualizar(id, itinerario) {

        return await dao.actualizar(id, itinerario);
    }


    async eliminar(id) {

        return await dao.eliminar(id);
    }


    async guardarImagen(id, bytes) {

        if (!bytes || bytes.length === 0) {

            throw new Error(
                "No se recibio ninguna imagen."
            );
        }

        return await dao.guardarImagen(id, bytes);
    }


    async obtenerImagen(id) {

        return await dao.obtenerImagen(id);
    }

}


module.exports = ItinerarioService;
