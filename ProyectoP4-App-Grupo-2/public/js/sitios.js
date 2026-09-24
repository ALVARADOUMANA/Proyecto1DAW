/*
==========================================
CRUD DE SITIOS - PARTE 3 (semana 5)
==========================================
*/

const API = "/api/sitios";

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

    const input = document.getElementById("imagen");

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

    const img = document.getElementById("imagen_vista");

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
        pais: document.getElementById("pais").value,
        provincia: document.getElementById("provincia").value,
        canton: document.getElementById("canton").value,
        categoria: document.getElementById("categoria").value,
        descripcion: document.getElementById("descripcion").value,
        latitud: Number(document.getElementById("latitud").value),
        longitud: Number(document.getElementById("longitud").value),
        altitud_msnm: Number(document.getElementById("altitud_msnm").value),
        costo_entrada: Number(document.getElementById("costo_entrada").value),
        moneda: document.getElementById("moneda").value,
        horario: document.getElementById("horario").value,
        calificacion: Number(document.getElementById("calificacion").value),
        usuario: obtenerUsuario()
    };

}

function llenarFormulario(sitio) {

    document.getElementById("codigo").value = valorTexto(sitio.codigo);

    document.getElementById("nombre").value = valorTexto(sitio.nombre);

    document.getElementById("pais").value = valorTexto(sitio.pais);

    document.getElementById("provincia").value = valorTexto(sitio.provincia);

    document.getElementById("canton").value = valorTexto(sitio.canton);

    document.getElementById("categoria").value = valorTexto(sitio.categoria);

    document.getElementById("descripcion").value = valorTexto(sitio.descripcion);

    document.getElementById("latitud").value = valorTexto(sitio.latitud);

    document.getElementById("longitud").value = valorTexto(sitio.longitud);

    document.getElementById("altitud_msnm").value = valorTexto(sitio.altitud_msnm);

    document.getElementById("costo_entrada").value = valorTexto(sitio.costo_entrada);

    document.getElementById("moneda").value = valorTexto(sitio.moneda);

    document.getElementById("horario").value = valorTexto(sitio.horario);

    document.getElementById("calificacion").value = valorTexto(sitio.calificacion);

    verMiniatura(obtenerId());

}

function limpiar() {

    document.getElementById("id").value = "";

    document.getElementById("codigo").value = "";

    document.getElementById("nombre").value = "";

    document.getElementById("pais").value = "";

    document.getElementById("provincia").value = "";

    document.getElementById("canton").value = "";

    document.getElementById("categoria").value = "";

    document.getElementById("descripcion").value = "";

    document.getElementById("latitud").value = "";

    document.getElementById("longitud").value = "";

    document.getElementById("altitud_msnm").value = "";

    document.getElementById("costo_entrada").value = "";

    document.getElementById("moneda").value = "";

    document.getElementById("horario").value = "";

    document.getElementById("calificacion").value = "";

    document.getElementById("imagen").value = "";

    verMiniatura(null);

    mostrarMensaje("");

}

/*=========================================
    CREAR
=========================================*/

async function crear() {

    try {

        const sitio = obtenerDatos();

        const respuesta = await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(sitio)

        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {

            throw new Error(datos.mensaje);

        }

        const bytes = await subirImagen(datos.sitio._id);

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

        llenarFormulario(datos.sitio);

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

        const sitio = obtenerDatos();

        const respuesta = await fetch(API + "/" + id, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(sitio)

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
    La respuesta no trae el campo "imagen".
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
            document.getElementById("tablaSitios");

        tabla.innerHTML = "";

        datos.sitios.forEach((sitio) => {

            const fila = document.createElement("tr");

            fila.innerHTML =
                "<td>" + sitio._id + "</td>" +
                "<td>" + valorTexto(sitio.codigo) + "</td>" +
                "<td>" + valorTexto(sitio.nombre) + "</td>" +
                "<td>" + valorTexto(sitio.provincia) + "</td>" +
                "<td>" + valorTexto(sitio.categoria) + "</td>" +
                "<td>" + valorTexto(sitio.calificacion) + "</td>";

            tabla.appendChild(fila);

        });

        mostrarMensaje(
            datos.mensaje + " - " + datos.sitios.length +
            " documentos (sin el campo imagen: carga Lazy)"
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
