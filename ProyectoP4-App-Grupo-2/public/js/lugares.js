/*
==========================================
CRUD DE LUGARES
==========================================
*/

document.addEventListener("DOMContentLoaded", iniciar);

function iniciar() {

    document
        .getElementById("btnGuardar")
        .addEventListener("click", guardar);

    document
        .getElementById("btnModificar")
        .addEventListener("click", modificar);

    document
        .getElementById("btnEliminar")
        .addEventListener("click", eliminar);

    document
        .getElementById("btnConsultar")
        .addEventListener("click", listar);

    document
        .getElementById("btnLimpiar")
        .addEventListener("click", limpiar);

    document
        .getElementById("btnSalir")
        .addEventListener("click", salir);

    document
        .getElementById("btnSalirMenu")
        .addEventListener("click", salir);

    listar();
}

/*=========================================
    Usuario autenticado
=========================================*/

function obtenerUsuario() {

    return localStorage.getItem("usuario") || "";

}

/*=========================================
    Obtener datos del formulario
=========================================*/

function obtenerFormulario() {

    return {

        codigo:
            document.getElementById("codigo").value.trim(),

        nombre:
            document.getElementById("nombre").value.trim(),

        provincia:
            document.getElementById("provincia").value.trim(),

        categoria:
            document.getElementById("categoria").value.trim(),

        calificacion:
            Number(
                document.getElementById("calificacion").value
            ),

        usuario: obtenerUsuario()

    };

}

/*=========================================
    Guardar
=========================================*/

async function guardar() {

    const lugar = obtenerFormulario();

    const respuesta = await fetch("/lugares", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(lugar)

    });

    const datos = await respuesta.json();

    mostrarMensaje(datos.mensaje);

    listar();

}

/*=========================================
    Modificar
=========================================*/

async function modificar() {

    const lugar = obtenerFormulario();

    const respuesta = await fetch("/lugares", {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(lugar)

    });

    const datos = await respuesta.json();

    mostrarMensaje(datos.mensaje);

    listar();

}

/*=========================================
    Eliminar
=========================================*/

async function eliminar() {

    const codigo =
        document.getElementById("codigo").value.trim();

    if (codigo === "") {

        mostrarMensaje("Digite el codigo.");

        return;

    }

    const respuesta =
        await fetch(
            "/lugares/" + codigo +
            "?usuario=" + obtenerUsuario(),
            {

                method: "DELETE"

            }
        );

    const datos = await respuesta.json();

    mostrarMensaje(datos.mensaje);

    listar();

    limpiar();

}

/*=========================================
    Consultar todos
=========================================*/

async function listar() {

    const respuesta =
        await fetch(
            "/lugares?usuario=" + obtenerUsuario()
        );

    const lugares =
        await respuesta.json();

    const tbody =
        document.querySelector("#tablaLugares tbody");

    tbody.innerHTML = "";

    lugares.forEach(lug => {

        const fila =

            "<tr>" +

            "<td>" + lug.codigo + "</td>" +

            "<td>" + lug.nombre + "</td>" +

            "<td>" + lug.provincia + "</td>" +

            "<td>" + lug.categoria + "</td>" +

            "<td>" + lug.calificacion + "</td>" +

            "</tr>";

        tbody.innerHTML += fila;

    });

}

/*=========================================
    Limpiar
=========================================*/

function limpiar() {

    document.getElementById("codigo").value = "";

    document.getElementById("nombre").value = "";

    document.getElementById("provincia").value = "";

    document.getElementById("categoria").value = "";

    document.getElementById("calificacion").value = "";

}

/*=========================================
    Salir
=========================================*/

function salir() {

    window.location.href =
        "/logout?usuario=" + obtenerUsuario();

}

/*=========================================
    Mostrar mensaje
=========================================*/

function mostrarMensaje(texto) {

    document
        .getElementById("mensaje")
        .innerHTML = texto;

}
