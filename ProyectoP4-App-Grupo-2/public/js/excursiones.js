/*
==========================================
CRUD DE Excursiones - PARTE 2 (semana 4)
==========================================
*/

const API_PADRE = "/api/operadores";

const API_HIJO = "/api/excursiones";

let listaPadre = [];

let listaHijo = [];

/*=========================================
    CARGA EAGER
    El listado de excursiones lo resuelve el servidor
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
   Operadores
   ================================================== */

async function cargarOperadores() {

    try {

        const respuesta = await fetch(
            "/api/operadores?usuario=" + obtenerUsuario()
        );

        if (!respuesta.ok) {

            throw new Error("Error al consultar");

        }

        listaPadre = await respuesta.json();

        const tabla = document.getElementById("tabla_ope");

        tabla.innerHTML = "";

        listaPadre.forEach((fila) => {

            const tr = document.createElement("tr");

            tr.innerHTML =
                "<td>" + fila.id_operador + "</td>" +
                "<td>" + valorTexto(fila.razon_social) + "</td>" +
                "<td>" + valorTexto(fila.cedula_juridica) + "</td>" +
                "<td>" + valorTexto(fila.telefono) + "</td>" +
                "<td>" + valorTexto(fila.correo) + "</td>" +
                "<td>" + valorTexto(fila.sitio_web) + "</td>" +
                "<td>" + valorTexto(fila.anios_experiencia) + "</td>" +
                "<td>" + valorTexto(fila.calificacion_promedio) + "</td>" +
                celdaImagen(fila.logo) +
                "<td>" +
                "<button class=\"btn-editar\" onclick=\"editarOperador(" + fila.id_operador + ")\">Editar</button>" +
                "<button class=\"btn-eliminar\" onclick=\"eliminarOperador(" + fila.id_operador + ")\">Eliminar</button>" +
                "</td>";

            tabla.appendChild(tr);

        });

        const selector = document.getElementById("exc_id_operador");

        const seleccionado = selector.value;

        selector.innerHTML = "<option value=\"\">Seleccione</option>";

        listaPadre.forEach((fila) => {

            const opcion = document.createElement("option");

            opcion.value = fila.id_operador;

            opcion.textContent = fila.razon_social;

            selector.appendChild(opcion);

        });

        selector.value = seleccionado;

    } catch (error) {

        console.error(error);

        mostrarMensaje("No fue posible cargar operadores");

    }

}

document.getElementById("form_ope")
    .addEventListener("submit", async function (evento) {

        evento.preventDefault();

        const id = document.getElementById("ope_id").value;

        const datos = {
            razon_social: document.getElementById("ope_razon_social").value,
            cedula_juridica: document.getElementById("ope_cedula_juridica").value,
            telefono: document.getElementById("ope_telefono").value,
            correo: document.getElementById("ope_correo").value,
            sitio_web: document.getElementById("ope_sitio_web").value,
            anios_experiencia: document.getElementById("ope_anios_experiencia").value,
            calificacion_promedio: document.getElementById("ope_calificacion_promedio").value,
            logo: await leerImagen("ope_logo"),
            usuario: obtenerUsuario()
        };

        try {

            let respuesta;

            if (id === "") {

                respuesta = await fetch("/api/operadores", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(datos)

                });

            } else {

                respuesta = await fetch("/api/operadores/" + id, {

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

            mostrarMensaje("Operador guardado correctamente");

            limpiarOperador();

            await cargarOperadores();

            await cargarExcursiones();

        } catch (error) {

            console.error(error);

            mostrarMensaje(error.message);

        }

    });

function editarOperador(id) {

    const fila = listaPadre.find((f) => f.id_operador === id);

    if (!fila) {

        return;

    }

    document.getElementById("ope_id").value = fila.id_operador;

    document.getElementById("ope_razon_social").value = valorTexto(fila.razon_social);

    document.getElementById("ope_cedula_juridica").value = valorTexto(fila.cedula_juridica);

    document.getElementById("ope_telefono").value = valorTexto(fila.telefono);

    document.getElementById("ope_correo").value = valorTexto(fila.correo);

    document.getElementById("ope_sitio_web").value = valorTexto(fila.sitio_web);

    document.getElementById("ope_anios_experiencia").value = valorTexto(fila.anios_experiencia);

    document.getElementById("ope_calificacion_promedio").value = valorTexto(fila.calificacion_promedio);

    verMiniatura("ope_logo_vista", fila.logo);

    mostrarMensaje("Editando operador " + id);

}

async function eliminarOperador(id) {

    if (!confirm("Desea eliminar este registro?")) {

        return;

    }

    try {

        const respuesta = await fetch(
            "/api/operadores/" + id + "?usuario=" + obtenerUsuario(),
            {
                method: "DELETE"
            }
        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {

            throw new Error(datos.mensaje);

        }

        mostrarMensaje(datos.mensaje);

        await cargarOperadores();

            await cargarExcursiones();

    } catch (error) {

        console.error(error);

        mostrarMensaje(error.message);

    }

}

function limpiarOperador() {

    document.getElementById("ope_id").value = "";

    document.getElementById("ope_razon_social").value = "";

    document.getElementById("ope_cedula_juridica").value = "";

    document.getElementById("ope_telefono").value = "";

    document.getElementById("ope_correo").value = "";

    document.getElementById("ope_sitio_web").value = "";

    document.getElementById("ope_anios_experiencia").value = "";

    document.getElementById("ope_calificacion_promedio").value = "";

    document.getElementById("ope_logo").value = "";

    verMiniatura("ope_logo_vista", null);

}

document.getElementById("btnCancelar_ope")
    .addEventListener("click", limpiarOperador);


/* ==================================================
   Excursiones
   ================================================== */

async function cargarExcursiones() {

    try {

        const respuesta = await fetch(
            "/api/excursiones?usuario=" + obtenerUsuario()
        );

        if (!respuesta.ok) {

            throw new Error("Error al consultar");

        }

        listaHijo = await respuesta.json();

        const tabla = document.getElementById("tabla_exc");

        tabla.innerHTML = "";

        listaHijo.forEach((fila) => {

            const tr = document.createElement("tr");

            tr.innerHTML =
                "<td>" + fila.id_excursion + "</td>" +
                "<td>" + valorTexto(fila.operador_razon_social) + "</td>" +
                "<td>" + valorTexto(fila.operador_telefono) + "</td>" +
                "<td>" + valorTexto(fila.titulo) + "</td>" +
                "<td>" + valorTexto(fila.duracion_horas) + "</td>" +
                "<td>" + valorTexto(fila.dificultad) + "</td>" +
                "<td>" + valorTexto(fila.cupo_maximo) + "</td>" +
                "<td>" + valorTexto(fila.precio_persona) + "</td>" +
                "<td>" + (fila.incluye_transporte ? "Si" : "No") + "</td>" +
                "<td>" + (fila.fecha_salida ? String(fila.fecha_salida).substring(0, 10) : "-") + "</td>" +
                celdaImagen(fila.afiche) +
                "<td>" +
                "<button class=\"btn-editar\" onclick=\"editarExcursion(" + fila.id_excursion + ")\">Editar</button>" +
                "<button class=\"btn-eliminar\" onclick=\"eliminarExcursion(" + fila.id_excursion + ")\">Eliminar</button>" +
                "</td>";

            tabla.appendChild(tr);

        });

        mostrarMensaje(
            listaHijo.length +
            " excursiones - carga Eager: cada fila ya trae operador_razon_social y operador_telefono"
        );

    } catch (error) {

        console.error(error);

        mostrarMensaje("No fue posible cargar excursiones");

    }

}

document.getElementById("form_exc")
    .addEventListener("submit", async function (evento) {

        evento.preventDefault();

        const id = document.getElementById("exc_id").value;

        const datos = {
            id_operador: document.getElementById("exc_id_operador").value,
            titulo: document.getElementById("exc_titulo").value,
            duracion_horas: document.getElementById("exc_duracion_horas").value,
            dificultad: document.getElementById("exc_dificultad").value,
            cupo_maximo: document.getElementById("exc_cupo_maximo").value,
            precio_persona: document.getElementById("exc_precio_persona").value,
            incluye_transporte: document.getElementById("exc_incluye_transporte").checked,
            fecha_salida: document.getElementById("exc_fecha_salida").value,
            afiche: await leerImagen("exc_afiche"),
            usuario: obtenerUsuario()
        };

        try {

            let respuesta;

            if (id === "") {

                respuesta = await fetch("/api/excursiones", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(datos)

                });

            } else {

                respuesta = await fetch("/api/excursiones/" + id, {

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

            mostrarMensaje("Excursion guardado correctamente");

            limpiarExcursion();

            await cargarExcursiones();

        } catch (error) {

            console.error(error);

            mostrarMensaje(error.message);

        }

    });

function editarExcursion(id) {

    const fila = listaHijo.find((f) => f.id_excursion === id);

    if (!fila) {

        return;

    }

    document.getElementById("exc_id").value = fila.id_excursion;

    document.getElementById("exc_id_operador").value = valorTexto(fila.id_operador);

    document.getElementById("exc_titulo").value = valorTexto(fila.titulo);

    document.getElementById("exc_duracion_horas").value = valorTexto(fila.duracion_horas);

    document.getElementById("exc_dificultad").value = valorTexto(fila.dificultad);

    document.getElementById("exc_cupo_maximo").value = valorTexto(fila.cupo_maximo);

    document.getElementById("exc_precio_persona").value = valorTexto(fila.precio_persona);

    document.getElementById("exc_incluye_transporte").checked = fila.incluye_transporte;

    document.getElementById("exc_fecha_salida").value =
        fila.fecha_salida ? String(fila.fecha_salida).substring(0, 10) : "";

    verMiniatura("exc_afiche_vista", fila.afiche);

    mostrarMensaje("Editando excursion " + id);

}

async function eliminarExcursion(id) {

    if (!confirm("Desea eliminar este registro?")) {

        return;

    }

    try {

        const respuesta = await fetch(
            "/api/excursiones/" + id + "?usuario=" + obtenerUsuario(),
            {
                method: "DELETE"
            }
        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {

            throw new Error(datos.mensaje);

        }

        mostrarMensaje(datos.mensaje);

        await cargarExcursiones();

    } catch (error) {

        console.error(error);

        mostrarMensaje(error.message);

    }

}

function limpiarExcursion() {

    document.getElementById("exc_id").value = "";

    document.getElementById("exc_id_operador").value = "";

    document.getElementById("exc_titulo").value = "";

    document.getElementById("exc_duracion_horas").value = "";

    document.getElementById("exc_dificultad").value = "";

    document.getElementById("exc_cupo_maximo").value = "";

    document.getElementById("exc_precio_persona").value = "";

    document.getElementById("exc_incluye_transporte").checked = false;

    document.getElementById("exc_fecha_salida").value = "";

    document.getElementById("exc_afiche").value = "";

    verMiniatura("exc_afiche_vista", null);

}

document.getElementById("btnCancelar_exc")
    .addEventListener("click", limpiarExcursion);


/* ==================================================
   CARGA AL INICIAR
   ================================================== */

async function iniciar() {

    await cargarOperadores();

    await cargarExcursiones();

}

iniciar();
