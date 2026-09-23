/**
 * ==========================================
 * Modelo Tour
 * ==========================================
 */

class Tour {

    constructor(codigo, nombre, lugar, duracion, precio) {

        this.codigo = codigo;
        this.nombre = nombre;
        this.lugar = lugar;
        this.duracion = duracion;
        this.precio = precio;
    }

}

module.exports = Tour;
