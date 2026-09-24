/**
 * ==========================================
 * Servicio de Sitios
 * ==========================================
 */

const SitioDAO =
    require("../dao/SitioDAO");


const dao =
    new SitioDAO();


class SitioService {


    async crear(sitio) {

        if (!sitio.codigo || !sitio.nombre) {

            throw new Error(
                "El codigo y el nombre son obligatorios."
            );
        }

        return await dao.crear(sitio);
    }


    async obtenerTodos() {

        return await dao.obtenerTodos();
    }


    async obtenerPorId(id) {

        return await dao.obtenerPorId(id);
    }


    async actualizar(id, sitio) {

        return await dao.actualizar(id, sitio);
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


module.exports = SitioService;
