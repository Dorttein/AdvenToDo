import {getCookie, escribirRecuadros} from '/proyecto/JS/funciones.js';

$(document).ready(function () {
    escribirRecuadros();

    $("#id_lista_objetos").on("click", ".objetos", function () {
        let wpEquiped=0;
        let hlEquiped=0;
        let shEquiped=0;
        if(!$(this).hasClass("locked")){
            if($(this).prev().hasClass("equiped")){
                if($(this).hasClass("armas")){
                    for(let i=1;i<11;i++){
                        $(`.arma${i}`).prev().addClass("equiped");
                    }
                    $(this).prev().removeClass("equiped");
                }
                if($(this).hasClass("cascos")){
                    for(let i=11;i<21;i++){
                        $(`.casco${i}`).prev().addClass("equiped");
                    }
                    $(this).prev().removeClass("equiped");
                }
                if($(this).hasClass("escudos")){
                    for(let i=21;i<31;i++){
                        $(`.escudo${i}`).prev().addClass("equiped");
                    }
                    $(this).prev().removeClass("equiped");
                }
            }else{$(this).prev().addClass("equiped");}
        }
        for(let i=1;i<11;i++){
            if(i<11){
                if(!$(`.arma${i}`).prev().hasClass("equiped")){wpEquiped=i;}
            }
        }
        for(let i=11;i<21;i++){
            if(i<21){
                if(!$(`.casco${i}`).prev().hasClass("equiped")){hlEquiped=i;}
            }
        }
        for(let i=21;i<31;i++){
            if(i<31){
                if(!$(`.escudo${i}`).prev().hasClass("equiped")){shEquiped=i;}
            }
        }
        $.ajax({
            type: "POST",
            url: "https://localhost/proyecto/PHP/inserts/equiped_insert.php",
            data: 
            "user=" + encodeURIComponent(getCookie("user")[0]) +
            "&wpEquiped=" + encodeURIComponent(wpEquiped) +
            "&hlEquiped=" + encodeURIComponent(hlEquiped) +
            "&shEquiped=" + encodeURIComponent(shEquiped) +
            "&nocache=" + Math.random(),
            dataType: "",
            success: function (response) {
            },
            error: function(xhr, status, error){
                console.log(xhr.responseText);
                window.alert("Error: " + error);
            }
        });
    });
});