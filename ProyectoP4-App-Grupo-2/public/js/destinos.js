/*
==========================================
CRUD DE Destinos - PARTE 2 (semana 4)
==========================================
*/

const API_PADRE = "/api/regiones";

const API_HIJO = "/api/destinos";

let listaPadre = [];

let listaHijo = [];

/*=========================================
    CARGA EAGER
    El listado de destinos lo resuelve el servidor
    con un INNER JOIN, asi que cada fila ya
    trae las columnas del padre sin pedir nada
    mas.
=========================================*/

/*=========================================
    Utilitarios
=========================================*/

function obtenerUsuario() {

    return localStorage.getItem("usuario") || "";

}

function mostrarMensaje(texto) {

    document.getElementById("mensaje").textContent = texto;

}

function valorTexto(dato) {

    if (dato === null || dato === undefined) {

        return "";

    }

    return dato;

}

/*=========================================
    Imagen
=========================================*/

function leerImagen(idInput) {

    return new Promise((resolve) => {

        const input = document.getElementById(idInput);

        if (!input.files || input.files.length === 0) {

            resolve(null);

            return;

        }

        const lector = new FileReader();

        lector.onload = function () {

            resolve(lector.result.split(",")[1]);

        };

        lector.readAsDataURL(input.files[0]);

    });

}

function celdaImagen(base64) {

    if (!base64) {

        return "<td>-</td>";

    }

    return "<td><img class=\"miniatura\" src=\"data:image/*;base64," +
        base64 + "\"></td>";

}

function verMiniatura(idImg, base64) {

    const img = document.getElementById(idImg);

    if (base64) {

        img.src = "data:image/*;base64," + base64;

    } else {

        img.removeAttribute("src");

    }

}


/* ==================================================
   Regiones
   ================================================== */

async function cargarRegiones() {

    try {

        const respuesta = await fetch(
            "/api/regiones?usuario=" + obtenerUsuario()
        );

        if (!respuesta.ok) {

            throw new Error("Error al consultar");

        }

        listaPadre = await respuesta.json();

        const tabla = document.getElementById("tabla_reg");

        tabla.innerHTML = "";

        listaPadre.forEach((fila) => {

            const tr = document.createElement("tr");

            tr.innerHTML =
                "<td>" + fila.id_region + "</td>" +
                "<td>" + valorTexto(fila.nombre) + "</td>" +
                "<td>" + valorTexto(fila.pais) + "</td>" +
                "<td>" + valorTexto(fila.clima) + "</td>" +
                "<td>" + valorTexto(fila.idioma) + "</td>" +
                "<td>" + valorTexto(fila.moneda) + "</td>" +
                "<td>" + valorTexto(fila.huso_horario) + "</td>" +
                "<td>" + valorTexto(fila.descripcion) + "</td>" +
                celdaImagen(fila.imagen) +
                "<td>" +
                "<button class=\"btn-editar\" onclick=\"editarRegion(" + fila.id_region + ")\">Editar</button>" +
                "<button class=\"btn-eliminar\" onclick=\"eliminarRegion(" + fila.id_region + ")\">Eliminar</button>" +
                "</td>";

            tabla.appendChild(tr);

        });

        const selector = document.getElementById("des_id_region");

        const seleccionado = selector.value;

        selector.innerHTML = "<option value=\"\">Seleccione</option>";

        listaPadre.forEach((fila) => {

            const opcion = document.createElement("option");

            opcion.value = fila.id_region;

            opcion.textContent = fila.nombre;

            selector.appendChild(opcion);

        });

        selector.value = seleccionado;

    } catch (error) {

        console.error(error);

        mostrarMensaje("No fue posible cargar regiones");

    }

}

document.getElementById("form_reg")
    .addEventListener("submit", async function (evento) {

        evento.preventDefault();

        const id = document.getElementById("reg_id").value;

        const datos = {
            nombre: document.getElementById("reg_nombre").value,
            pais: document.getElementById("reg_pais").value,
            clima: document.getElementById("reg_clima").value,
            idioma: document.getElementById("reg_idioma").value,
            moneda: document.getElementById("reg_moneda").value,
            huso_horario: document.getElementById("reg_huso_horario").value,
            descripcion: document.getElementById("reg_descripcion").value,
            imagen: await leerImagen("reg_imagen"),
            usuario: obtenerUsuario()
        };

        try {

            let respuesta;

            if (id === "") {

                respuesta = await fetch("/api/regiones", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(datos)

                });

            } else {

                respuesta = await fetch("/api/regiones/" + id, {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(datos)

                });

            }

            if (!respuesta.ok) {

                const error = await respuesta.json();

                throw new Error(error.mensaje);

            }

            mostrarMensaje("Region guardado correctamente");

            limpiarRegion();

            await cargarRegiones();

            await cargarDestinos();

        } catch (error) {

            console.error(error);

            mostrarMensaje(error.message);

        }

    });

function editarRegion(id) {

    const fila = listaPadre.find((f) => f.id_region === id);

    if (!fila) {

        return;

    }

    document.getElementById("reg_id").value = fila.id_region;

    document.getElementById("reg_nombre").value = valorTexto(fila.nombre);

    document.getElementById("reg_pais").value = valorTexto(fila.pais);

    document.getElementById("reg_clima").value = valorTexto(fila.clima);

    document.getElementById("reg_idioma").value = valorTexto(fila.idioma);

    document.getElementById("reg_moneda").value = valorTexto(fila.moneda);

    document.getElementById("reg_huso_horario").value = valorTexto(fila.huso_horario);

    document.getElementById("reg_descripcion").value = valorTexto(fila.descripcion);

    verMiniatura("reg_imagen_vista", fila.imagen);

    mostrarMensaje("Editando region " + id);

}

async function eliminarRegion(id) {

    if (!confirm("Desea eliminar este registro?")) {

        return;

    }

    try {

        const respuesta = await fetch(
            "/api/regiones/" + id + "?usuario=" + obtenerUsuario(),
            {
                method: "DELETE"
            }
        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {

            throw new Error(datos.mensaje);

        }

        mostrarMensaje(datos.mensaje);

        await cargarRegiones();

            await cargarDestinos();

    } catch (error) {

        console.error(error);

        mostrarMensaje(error.message);

    }

}

function limpiarRegion() {

    document.getElementById("reg_id").value = "";

    document.getElementById("reg_nombre").value = "";

    document.getElementById("reg_pais").value = "";

    document.getElementById("reg_clima").value = "";

    document.getElementById("reg_idioma").value = "";

    document.getElementById("reg_moneda").value = "";

    document.getElementById("reg_huso_horario").value = "";

    document.getElementById("reg_descripcion").value = "";

    document.getElementById("reg_imagen").value = "";

    verMiniatura("reg_imagen_vista", null);

}

document.getElementById("btnCancelar_reg")
    .addEventListener("click", limpiarRegion);


/* ==================================================
   Destinos
   ================================================== */

async function cargarDestinos() {

    try {

        const respuesta = await fetch(
            "/api/destinos?usuario=" + obtenerUsuario()
        );

        if (!respuesta.ok) {

            throw new Error("Error al consultar");

        }

        listaHijo = await respuesta.json();

        const tabla = document.getElementById("tabla_des");

        tabla.innerHTML = "";

        listaHijo.forEach((fila) => {

            const tr = document.createElement("tr");

            tr.innerHTML =
                "<td>" + fila.id_destino + "</td>" +
                "<td>" + valorTexto(fila.region_nombre) + "</td>" +
                "<td>" + valorTexto(fila.region_pais) + "</td>" +
                "<td>" + valorTexto(fila.nombre) + "</td>" +
                "<td>" + valorTexto(fila.categoria) + "</td>" +
                "<td>" + valorTexto(fila.altitud) + "</td>" +
                "<td>" + valorTexto(fila.temporada_alta) + "</td>" +
                "<td>" + valorTexto(fila.costo_entrada) + "</td>" +
                "<td>" + valorTexto(fila.horario) + "</td>" +
                "<td>" + (fila.requiere_guia ? "Si" : "No") + "</td>" +
                celdaImagen(fila.imagen) +
                "<td>" +
                "<button class=\"btn-editar\" onclick=\"editarDestino(" + fila.id_destino + ")\">Editar</button>" +
                "<button class=\"btn-eliminar\" onclick=\"eliminarDestino(" + fila.id_destino + ")\">Eliminar</button>" +
                "</td>";

            tabla.appendChild(tr);

        });

        mostrarMensaje(
            listaHijo.length +
            " destinos - carga Eager: cada fila ya trae region_nombre y region_pais"
        );

    } catch (error) {

        console.error(error);

        mostrarMensaje("No fue posible cargar destinos");

    }

}

document.getElementById("form_des")
    .addEventListener("submit", async function (evento) {

        evento.preventDefault();

        const id = document.getElementById("des_id").value;

        const datos = {
            id_region: document.getElementById("des_id_region").value,
            nombre: document.getElementById("des_nombre").value,
            categoria: document.getElementById("des_categoria").value,
            altitud: document.getElementById("des_altitud").value,
            temporada_alta: document.getElementById("des_temporada_alta").value,
            costo_entrada: document.getElementById("des_costo_entrada").value,
            horario: document.getElementById("des_horario").value,
            requiere_guia: document.getElementById("des_requiere_guia").checked,
            imagen: await leerImagen("des_imagen"),
            usuario: obtenerUsuario()
        };

        try {

            let respuesta;

            if (id === "") {

                respuesta = await fetch("/api/destinos", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(datos)

                });

            } else {

                respuesta = await fetch("/api/destinos/" + id, {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(datos)

                });

            }

            if (!respuesta.ok) {

                const error = await respuesta.json();

                throw new Error(error.mensaje);

            }

            mostrarMensaje("Destino guardado correctamente");

            limpiarDestino();

            await cargarDestinos();

        } catch (error) {

            console.error(error);

            mostrarMensaje(error.message);

        }

    });

function editarDestino(id) {

    const fila = listaHijo.find((f) => f.id_destino === id);

    if (!fila) {

        return;

    }

    document.getElementById("des_id").value = fila.id_destino;

    document.getElementById("des_id_region").value = valorTexto(fila.id_region);

    document.getElementById("des_nombre").value = valorTexto(fila.nombre);

    document.getElementById("des_categoria").value = valorTexto(fila.categoria);

    document.getElementById("des_altitud").value = valorTexto(fila.altitud);

    document.getElementById("des_temporada_alta").value = valorTexto(fila.temporada_alta);

    document.getElementById("des_costo_entrada").value = valorTexto(fila.costo_entrada);

    document.getElementById("des_horario").value = valorTexto(fila.horario);

    document.getElementById("des_requiere_guia").checked = fila.requiere_guia;

    verMiniatura("des_imagen_vista", fila.imagen);

    mostrarMensaje("Editando destino " + id);

}

async function eliminarDestino(id) {

    if (!confirm("Desea eliminar este registro?")) {

        return;

    }

    try {

        const respuesta = await fetch(
            "/api/destinos/" + id + "?usuario=" + obtenerUsuario(),
            {
                method: "DELETE"
            }
        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {

            throw new Error(datos.mensaje);

        }

        mostrarMensaje(datos.mensaje);

        await cargarDestinos();

    } catch (error) {

        console.error(error);

        mostrarMensaje(error.message);

    }

}

function limpiarDestino() {

    document.getElementById("des_id").value = "";

    document.getElementById("des_id_region").value = "";

    document.getElementById("des_nombre").value = "";

    document.getElementById("des_categoria").value = "";

    document.getElementById("des_altitud").value = "";

    document.getElementById("des_temporada_alta").value = "";

    document.getElementById("des_costo_entrada").value = "";

    document.getElementById("des_horario").value = "";

    document.getElementById("des_requiere_guia").checked = false;

    document.getElementById("des_imagen").value = "";

    verMiniatura("des_imagen_vista", null);

}

document.getElementById("btnCancelar_des")
    .addEventListener("click", limpiarDestino);


/* ==================================================
   CARGA AL INICIAR
   ================================================== */

async function iniciar() {

    await cargarRegiones();

    await cargarDestinos();

}

iniciar();
