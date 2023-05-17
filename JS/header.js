import {equiparObjetos, reescribir, dibujarJuego} from "/proyecto/JS/funciones.js";

$(document).ready(function () {
    // window.alert('ESTA PÁGINA ESTÁ EN DESARROLLO. SI SE ENCUENTRA ALGUN ERROR AVISAR AL SER SUPERIOR.DE MOMENTO LA PÁGINA SOLO SE VE BIEN EN ORDENADOR. NO ME HAGO RESPONSABLE DE CÓMO SE VE EN MOVIL (AUN)NO PONGAIS CONTRASEÑAS SENSIBLES. NO ME HAGO RESPONSABLE DE POSIBLES PROBLEMAS.PARA ELIMINAR UNA CUENTA CONTACTAD CON EL SER SUPERIOR');
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            reescribir();
            dibujarJuego();
        }, 150);
    });
    $("body").addClass("home_is_visible");
    $(".button").on("click", function () {
        $("body").toggleClass("nav_is_visible");
        if($("#cbox").prop("checked")){
            $("#cbox").prop("checked", false);  
        }else{
            $("#cbox").prop("checked", true);  
        }
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
        $("#cbox").prop("checked", false);        
    });
    $("#id_enlace_tareas").on("click", equiparObjetos);
    $("#id_enlace_objetos").on("click", equiparObjetos);

    
});