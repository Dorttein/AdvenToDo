import {Tarea} from '../models/objetos.js';

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


    // este codigo es de prueba

    // let subtarea=[
    //     "Ir al baño",
    //     "Echar pasta",
    //     "Cepillar 2 minutos"
    // ];

    // let ahora = new Date();
    // let luego = ahora+365;

    // let tarea= new Tarea(
    //     1,"Dientes","Lavarse los dientes",false,
    //     subtarea,ahora,luego,0,true,1,0);
    // console.log(tarea.get_ID);
    // console.log(tarea.get_nombre);
    // console.log(tarea.get_detail);
    // console.log(tarea.get_important);



});

