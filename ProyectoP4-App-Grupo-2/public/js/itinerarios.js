/*
==========================================
CRUD DE ITINERARIOS - PARTE 3 (semana 5)
==========================================
*/

const API = "/api/itinerarios";

/*=========================================
    Utilitarios
=========================================*/

function obtenerUsuario() {

    return localStorage.getItem("usuario") || "";

}

function obtenerId() {

    return document.getElementById("id").value.trim();

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
    Imagen en binario

    El archivo se manda tal cual con
    express.raw del otro lado. No se
    convierte a texto en ningun momento.
=========================================*/

function archivoEscogido() {

    const input = document.getElementById("afiche");

    if (!input.files || input.files.length === 0) {

        return null;

    }

    return input.files[0];

}

async function subirImagen(id) {

    const archivo = archivoEscogido();

    if (!archivo) {

        return;

    }

    const respuesta = await fetch(

        API + "/" + id + "/imagen?usuario=" + obtenerUsuario(),

        {

            method: "PUT",

            headers: {
                "Content-Type": archivo.type
            },

            body: archivo

        }

    );

    const datos = await respuesta.json();

    if (!respuesta.ok) {

        throw new Error(datos.mensaje);

    }

    return datos.bytes;

}

function verMiniatura(id) {

    const img = document.getElementById("afiche_vista");

    if (id) {

        img.src = API + "/" + id + "/imagen?t=" + Date.now();

    } else {

        img.removeAttribute("src");

    }

}

/*=========================================
    Formulario
=========================================*/

function obtenerDatos() {

    return {
        codigo: document.getElementById("codigo").value,
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        pais: document.getElementById("pais").value,
        region: document.getElementById("region").value,
        duracion_dias: Number(document.getElementById("duracion_dias").value),
        duracion_noches: Number(document.getElementById("duracion_noches").value),
        cupo_minimo: Number(document.getElementById("cupo_minimo").value),
        cupo_maximo: Number(document.getElementById("cupo_maximo").value),
        precio_adulto: Number(document.getElementById("precio_adulto").value),
        precio_nino: Number(document.getElementById("precio_nino").value),
        moneda: document.getElementById("moneda").value,
        incluye_transporte: document.getElementById("incluye_transporte").checked,
        incluye_alimentacion: document.getElementById("incluye_alimentacion").checked,
        incluye_hospedaje: document.getElementById("incluye_hospedaje").checked,
        nivel_dificultad: document.getElementById("nivel_dificultad").value,
        edad_minima: Number(document.getElementById("edad_minima").value),
        idioma_guia: document.getElementById("idioma_guia").value,
        punto_encuentro: document.getElementById("punto_encuentro").value,
        hora_salida: document.getElementById("hora_salida").value,
        hora_regreso: document.getElementById("hora_regreso").value,
        temporada: document.getElementById("temporada").value,
        politica_cancelacion: document.getElementById("politica_cancelacion").value,
        sitios_incluidos: document.getElementById("sitios_incluidos").value
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t !== ""),
        usuario: obtenerUsuario()
    };

}

function llenarFormulario(itinerario) {

    document.getElementById("codigo").value = valorTexto(itinerario.codigo);

    document.getElementById("nombre").value = valorTexto(itinerario.nombre);

    document.getElementById("descripcion").value = valorTexto(itinerario.descripcion);

    document.getElementById("pais").value = valorTexto(itinerario.pais);

    document.getElementById("region").value = valorTexto(itinerario.region);

    document.getElementById("duracion_dias").value = valorTexto(itinerario.duracion_dias);

    document.getElementById("duracion_noches").value = valorTexto(itinerario.duracion_noches);

    document.getElementById("cupo_minimo").value = valorTexto(itinerario.cupo_minimo);

    document.getElementById("cupo_maximo").value = valorTexto(itinerario.cupo_maximo);

    document.getElementById("precio_adulto").value = valorTexto(itinerario.precio_adulto);

    document.getElementById("precio_nino").value = valorTexto(itinerario.precio_nino);

    document.getElementById("moneda").value = valorTexto(itinerario.moneda);

    document.getElementById("incluye_transporte").checked = itinerario.incluye_transporte === true;

    document.getElementById("incluye_alimentacion").checked = itinerario.incluye_alimentacion === true;

    document.getElementById("incluye_hospedaje").checked = itinerario.incluye_hospedaje === true;

    document.getElementById("nivel_dificultad").value = valorTexto(itinerario.nivel_dificultad);

    document.getElementById("edad_minima").value = valorTexto(itinerario.edad_minima);

    document.getElementById("idioma_guia").value = valorTexto(itinerario.idioma_guia);

    document.getElementById("punto_encuentro").value = valorTexto(itinerario.punto_encuentro);

    document.getElementById("hora_salida").value = valorTexto(itinerario.hora_salida);

    document.getElementById("hora_regreso").value = valorTexto(itinerario.hora_regreso);

    document.getElementById("temporada").value = valorTexto(itinerario.temporada);

    document.getElementById("politica_cancelacion").value = valorTexto(itinerario.politica_cancelacion);

    document.getElementById("sitios_incluidos").value =
        Array.isArray(itinerario.sitios_incluidos) ? itinerario.sitios_incluidos.join(", ") : "";

    verMiniatura(obtenerId());

}

function limpiar() {

    document.getElementById("id").value = "";

    document.getElementById("codigo").value = "";

    document.getElementById("nombre").value = "";

    document.getElementById("descripcion").value = "";

    document.getElementById("pais").value = "";

    document.getElementById("region").value = "";

    document.getElementById("duracion_dias").value = "";

    document.getElementById("duracion_noches").value = "";

    document.getElementById("cupo_minimo").value = "";

    document.getElementById("cupo_maximo").value = "";

    document.getElementById("precio_adulto").value = "";

    document.getElementById("precio_nino").value = "";

    document.getElementById("moneda").value = "";

    document.getElementById("incluye_transporte").checked = false;

    document.getElementById("incluye_alimentacion").checked = false;

    document.getElementById("incluye_hospedaje").checked = false;

    document.getElementById("nivel_dificultad").value = "";

    document.getElementById("edad_minima").value = "";

    document.getElementById("idioma_guia").value = "";

    document.getElementById("punto_encuentro").value = "";

    document.getElementById("hora_salida").value = "";

    document.getElementById("hora_regreso").value = "";

    document.getElementById("temporada").value = "";

    document.getElementById("politica_cancelacion").value = "";

    document.getElementById("sitios_incluidos").value = "";

    document.getElementById("afiche").value = "";

    verMiniatura(null);

    mostrarMensaje("");

}

/*=========================================
    CREAR
=========================================*/

async function crear() {

    try {

        const itinerario = obtenerDatos();

        const respuesta = await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(itinerario)

        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {

            throw new Error(datos.mensaje);

        }

        const bytes = await subirImagen(datos.itinerario._id);

        mostrarMensaje(
            datos.mensaje +
            (bytes ? " - imagen de " + bytes + " bytes" : "")
        );

        await mostrarTodos();

    } catch (error) {

        console.error(error);

        mostrarMensaje(error.message);

    }

}

/*=========================================
    CONSULTAR UNO
=========================================*/

async function consultar(idExterno) {

    const id = idExterno || obtenerId();

    if (!id) {

        mostrarMensaje("Ingrese el ObjectId de MongoDB");

        return;

    }

    try {

        const respuesta = await fetch(
            API + "/" + id + "?usuario=" + obtenerUsuario()
        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {

            throw new Error(datos.mensaje);

        }

        document.getElementById("id").value = id;

        llenarFormulario(datos.itinerario);

        mostrarMensaje(datos.mensaje + " (documento completo, con imagen)");

    } catch (error) {

        console.error(error);

        mostrarMensaje(error.message);

    }

}

/*=========================================
    ACTUALIZAR
=========================================*/

async function actualizar() {

    const id = obtenerId();

    if (!id) {

        mostrarMensaje("Ingrese el ObjectId de MongoDB");

        return;

    }

    try {

        const itinerario = obtenerDatos();

        const respuesta = await fetch(API + "/" + id, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(itinerario)

        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {

            throw new Error(datos.mensaje);

        }

        await subirImagen(id);

        mostrarMensaje(datos.mensaje);

        await mostrarTodos();

    } catch (error) {

        console.error(error);

        mostrarMensaje(error.message);

    }

}

/*=========================================
    ELIMINAR
=========================================*/

async function eliminar(idExterno) {

    const id = idExterno || obtenerId();

    if (!id) {

        mostrarMensaje("Ingrese el ObjectId de MongoDB");

        return;

    }

    if (!confirm("¿Desea eliminar este documento?")) {

        return;

    }

    try {

        const respuesta = await fetch(
            API + "/" + id + "?usuario=" + obtenerUsuario(),
            {
                method: "DELETE"
            }
        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {

            throw new Error(datos.mensaje);

        }

        mostrarMensaje(datos.mensaje);

        limpiar();

        await mostrarTodos();

    } catch (error) {

        console.error(error);

        mostrarMensaje(error.message);

    }

}

/*=========================================
    MOSTRAR TODOS - CARGA LAZY
    La respuesta no trae el campo "afiche".
=========================================*/

async function mostrarTodos() {

    try {

        const respuesta = await fetch(
            API + "?usuario=" + obtenerUsuario()
        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {

            throw new Error(datos.mensaje);

        }

        const tabla =
            document.getElementById("tablaItinerarios");

        tabla.innerHTML = "";

        datos.itinerarios.forEach((itinerario) => {

            const fila = document.createElement("tr");

            fila.innerHTML =
                "<td>" + itinerario._id + "</td>" +
                "<td>" + valorTexto(itinerario.codigo) + "</td>" +
                "<td>" + valorTexto(itinerario.nombre) + "</td>" +
                "<td>" + valorTexto(itinerario.region) + "</td>" +
                "<td>" + valorTexto(itinerario.duracion_dias) + "</td>" +
                "<td>" + valorTexto(itinerario.precio_adulto) + "</td>";

            tabla.appendChild(fila);

        });

        mostrarMensaje(
            datos.mensaje + " - " + datos.itinerarios.length +
            " documentos (sin el campo afiche: carga Lazy)"
        );

    } catch (error) {

        console.error(error);

        mostrarMensaje(error.message);

    }

}

/*=========================================
    Botones
=========================================*/

document.getElementById("btnCrear")
    .addEventListener("click", crear);

document.getElementById("btnConsultar")
    .addEventListener("click", function () { consultar(); });

document.getElementById("btnActualizar")
    .addEventListener("click", actualizar);

document.getElementById("btnEliminar")
    .addEventListener("click", function () { eliminar(); });

document.getElementById("btnMostrar")
    .addEventListener("click", mostrarTodos);

document.getElementById("btnLimpiar")
    .addEventListener("click", limpiar);

mostrarTodos();
