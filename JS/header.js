import {Tarea, Personaje} from '../models/objetos.js';

$(document).ready(function () {
    $("body").addClass("home_is_visible");

    $(".button").on("click", function () {
    $("body").toggleClass("nav_is_visible");
    });

    function removeClasses() {
    $(".menu ul li").each(function () {
        var link = $(this).find("a").attr("href");
        $("body").removeClass(link);
    });
    }
    $(".menu a").on("click", function (e) {
    e.preventDefault();
    removeClasses();
    var link = $(this).attr("href");
    $("body").addClass(link);
    $("body").removeClass("nav_is_visible");
    });

    let tarea= new Tarea(1,2,3,4,5,6,7,8,9,10,11);
    console.log(tarea.get_ID);

    let personaje = new Personaje("Nombre");

    console.log(personaje.nombre);


});

// este codigo es de prueba
