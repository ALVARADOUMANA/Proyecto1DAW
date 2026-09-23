/*
==========================================
CRUD DE TOURS
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

        lugar:
            document.getElementById("lugar").value.trim(),

        duracion:
            document.getElementById("duracion").value.trim(),

        precio:
            Number(
                document.getElementById("precio").value
            ),

        usuario: obtenerUsuario()

    };

}

/*=========================================
    Guardar
=========================================*/

async function guardar() {

    const tour = obtenerFormulario();

    const respuesta = await fetch("/tours", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(tour)

    });

    const datos = await respuesta.json();

    mostrarMensaje(datos.mensaje);

    listar();

}

/*=========================================
    Modificar
=========================================*/

async function modificar() {

    const tour = obtenerFormulario();

    const respuesta = await fetch("/tours", {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(tour)

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
            "/tours/" + codigo +
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
            "/tours?usuario=" + obtenerUsuario()
        );

    const tours =
        await respuesta.json();

    const tbody =
        document.querySelector("#tablaTours tbody");

    tbody.innerHTML = "";

    tours.forEach(tur => {

        const fila =

            "<tr>" +

            "<td>" + tur.codigo + "</td>" +

            "<td>" + tur.nombre + "</td>" +

            "<td>" + tur.lugar + "</td>" +

            "<td>" + tur.duracion + "</td>" +

            "<td>" + tur.precio + "</td>" +

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

    document.getElementById("lugar").value = "";

    document.getElementById("duracion").value = "";

    document.getElementById("precio").value = "";

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
