import {getCookie, equiparObjetos} from '/proyecto/JS/funciones.js';

$(document).ready(function () {
    
    /*SI EXISTE LA COOKIE COMPRUEBA LA VIDA. SI NO EXISTE PONE AMBAS A 10 POR DEFECTO */
    if (getCookie("user").length != 0 ) {
        $.ajax({
            type: "POST",
            url: "https://localhost/proyecto/PHP/selects/usuario_select_nopw.php",
            data: "user=" + encodeURIComponent(getCookie("user")[1]) + "&nocache=" + Math.random(),
            dataType: "json",
            success: function (response) {
                if (response.length != 0) {    
                    $("#id_juegoGrande").prepend(`<img src="photo/hpEne/${response[0]["HP_enemy"]}.png" id="id_hpEne" class="hp" alt="HP Enemy">`);
                    $("#id_juegoGrande").prepend(`<img src="photo/hpChar/${response[0]["HP_character"]}.png" id="id_hpChar" class="hp" alt="HP Character">`);
                    equiparObjetos();
                }else{
                    $("#id_juegoGrande").prepend(`<img src="photo/hpEne/10.png" id="id_hpEne" class="hp" alt="HP Enemy">`);
                    $("#id_juegoGrande").prepend('<img src="photo/hpChar/10.png" id="id_hpChar" class="hp" alt="HP Character">');
                }
            },
            error: function(xhr, status, error){
                console.log(xhr.responseText);
                window.alert("Error: " + error);
            }
        });
    }else{
        $("#id_juegoGrande").prepend(`<img src="photo/hpEne/10.png" id="id_hpEne" class="hp" alt="HP Enemy">`);
        $("#id_juegoGrande").prepend('<img src="photo/hpChar/10.png" id="id_hpChar" class="hp" alt="HP Character">');
    }

/* ANIMCIÓN AL GOLPEAR AL ENEMIGO */
    $("#id_juegoGrande").on("click", ".btn_action", function () {
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
        
    });

    $("#id_juegoGrande").on("click", ".btn_action", function () {
        if(!$("#id_ene").hasClass("shake")){
            $("#id_ene").addClass("shake");
            setTimeout(function(){
                $("#id_ene").removeClass("shake")
            }, 600);
        }
    });
});
