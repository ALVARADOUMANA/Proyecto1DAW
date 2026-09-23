/**
 * ==========================================
 * Modelo Lugar
 * ==========================================
 */

class Lugar {

    constructor(codigo, nombre, provincia, categoria, calificacion) {

        this.codigo = codigo;
        this.nombre = nombre;
        this.provincia = provincia;
        this.categoria = categoria;
        this.calificacion = calificacion;
    }

}

module.exports = Lugar;
