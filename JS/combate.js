import {getCookie, dibujarJuego, atacar, defender, curar} from '/proyecto/JS/funciones.js';

$(document).ready(function () {
    dibujarJuego();
    var lastClick = Date.now();
    var delay = 1000; // límite de clicks por segundo

    $("#id_juego").on("click", "#id_btn_attack", function () {
        if($("#id_accionesRestantes").html()>0){
            var now = Date.now();
            if (now - lastClick < delay) {
                return;
            }
            lastClick = now;
            animacion();
            atacar();
            $(this).disabled = true;
            setTimeout(function() {
                $(this).disabled = false;
            }, delay);
        }
    });
    $("#id_juego").on("click", "#id_btn_defend", function () {
        if($("#id_accionesRestantes").html()>0){
            var now = Date.now();
            if (now - lastClick < delay) {
                return;
            }
            lastClick = now; 
            animacion();
            defender();
            $(this).disabled = true;
            setTimeout(function() {
                $(this).disabled = false;
            }, delay);
        }
    });
    $("#id_juego").on("click", "#id_btn_heal", function () {
        if($("#id_accionesRestantes").html()>0){
            var now = Date.now();
            if (now - lastClick < delay) {
                return;
            }
            lastClick = now;
            animacion();
            curar();
            $(this).disabled = true;
            setTimeout(function() {
                $(this).disabled = false;
            }, delay);
        }
    });

});
/* ANIMCIÓN AL GOLPEAR AL ENEMIGO */
function animacion(){
    if(!$("#id_ene").hasClass("shake")){
        $("#id_helm").addClass("attack");
        $("#id_shie").addClass("attack");
        $("#id_weap").addClass("attack");
        $("#id_char").addClass("attack");
        setTimeout(function(){
            $("#id_helm").removeClass("attack");
            $("#id_shie").removeClass("attack");
            $("#id_weap").removeClass("attack");
            $("#id_char").removeClass("attack");
        }, 500);
    }
    if(!$("#id_ene").hasClass("shake")){
        $("#id_ene").addClass("shake");
        setTimeout(function(){
            $("#id_ene").removeClass("shake")
        }, 600);
    }
}