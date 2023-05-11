import {getCookie, equiparObjetos} from '/proyecto/JS/funciones.js';

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
            }else{
                $(this).prev().addClass("equiped");
            }
        }else{
            console.log("Bloqueado");
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

function escribirRecuadros(){
    $.ajax({
		type: "POST",
		url: "https://localhost/proyecto/PHP/selects/object_select.php",
		data: "user=" + encodeURIComponent(getCookie("user")[0]) + "&nocache=" + Math.random(),
		dataType: "json",
		success: function (response) {
			
            for (let i = 0; i < response.length; i++) {
                if(i==0){$("#id_lista_objetos").append('<h1>Espadas</h1>');}
                if(i==10){$("#id_lista_objetos").append('<h1>Cascos</h1>');}
                if(i==20){$("#id_lista_objetos").append('<h1>Escudos</h1>');}

                if(response[i]["equiped"]==1){
                    $("#id_lista_objetos").append('<img src="/proyecto/photo/CopiaRecuadro.png" class="recuadro" alt="recuadro">');
                }else{
                    $("#id_lista_objetos").append('<img src="/proyecto/photo/CopiaRecuadro.png" class="recuadro equiped" alt="recuadro">');
                }

                switch(response[i]["type"]){
                    case 1:
                        if(response[i]["locked"]==0){
                            $("#id_lista_objetos").append(`<img src="/proyecto/photo/armas/${response[i]["ID"]}.png" class="objetos armas arma${response[i]["ID"]}" alt="Armas">`);
                        }else{
                            $("#id_lista_objetos").append(`<img src="/proyecto/photo/armas/${response[i]["ID"]}.png" class="objetos armas arma${response[i]["ID"]} locked" alt="Armas">`);
                        }
                        break;
                    case 2:
                        if(response[i]["locked"]==0){
                            $("#id_lista_objetos").append(`<img src="/proyecto/photo/cascos/${response[i]["ID"]}.png" class="objetos cascos casco${response[i]["ID"]}" alt="Cascos">`);
                        }else{
                            $("#id_lista_objetos").append(`<img src="/proyecto/photo/cascos/${response[i]["ID"]}.png" class="objetos cascos casco${response[i]["ID"]} locked" alt="Cascos">`);
                        }
                        break;
                    case 3:
                        if(response[i]["locked"]==0){
                            $("#id_lista_objetos").append(`<img src="/proyecto/photo/escudos/${response[i]["ID"]}.png" class="objetos escudos escudo${response[i]["ID"]}" alt="Escudos">`);
                        }else{
                            $("#id_lista_objetos").append(`<img src="/proyecto/photo/escudos/${response[i]["ID"]}.png" class="objetos escudos escudo${response[i]["ID"]} locked" alt="Escudos">`);
                        }
                        break;
                }
            }
		},
		error: function(xhr, status, error){
			console.log(xhr.responseText);
			window.alert("Error: " + error);
		}
	}); 
}