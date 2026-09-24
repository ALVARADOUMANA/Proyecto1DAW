/*
==========================================
Menu lateral
==========================================
*/

const OPCIONES = [

    {
        parte: "Parte 1 - Archivos .txt",
        enlaces: [
            { ruta: "/lugares/pagina", texto: "Lugares" },
            { ruta: "/tours/pagina", texto: "Tours" }
        ]
    },

    {
        parte: "Parte 2 - PostgreSQL",
        enlaces: [
            { ruta: "/destinos/pagina", texto: "Destinos" },
            { ruta: "/excursiones/pagina", texto: "Excursiones" }
        ]
    },

    {
        parte: "Parte 3 - MongoDB",
        enlaces: [
            { ruta: "/sitios/pagina", texto: "Sitios" },
            { ruta: "/itinerarios/pagina", texto: "Itinerarios" }
        ]
    }

];

/*=========================================
    Dibujar el menu
=========================================*/

function dibujarMenu() {

    const actual = window.location.pathname;

    let contenido = "<h3>Grupo 2</h3>";

    OPCIONES.forEach(grupo => {

        contenido +=
            "<p class=\"menu-parte\">" + grupo.parte + "</p>";

        grupo.enlaces.forEach(enlace => {

            const activo =
                enlace.ruta === actual ? " class=\"activo\"" : "";

            contenido +=
                "<a href=\"" + enlace.ruta + "\"" + activo + ">" +
                enlace.texto +
                "</a>";

        });

    });

    contenido +=
        "<button id=\"btnSalirMenu\">Salir</button>";

    const menu = document.createElement("div");

    menu.className = "menu";

    menu.innerHTML = contenido;

    document.body.insertBefore(
        menu,
        document.body.firstChild
    );

}

/*=========================================
    Cerrar sesion
=========================================*/

function salirDelMenu() {

    const usuario =
        localStorage.getItem("usuario") || "";

    localStorage.removeItem("usuario");

    window.location.href =
        "/logout?usuario=" + usuario;

}

/*=========================================
    Sin autenticacion no se muestra el menu:
    se regresa a la pantalla de login
=========================================*/

if (!localStorage.getItem("usuario")) {

    window.location.href = "/";

}

dibujarMenu();

document.getElementById("btnSalirMenu")
    .addEventListener("click", salirDelMenu);
