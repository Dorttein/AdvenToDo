import {getCookie, crearCookie, escribirListas, escribirTareas, reescribir, funcionesTareas, funcionesListas} from '/proyecto/JS/funciones.js';

$(document).ready(function () {
    
    if (getCookie("user").length != 0 ) {
		escribirListas();
        funcionesListas();
        escribirTareas();
        funcionesTareas();
        //EJECUTA LA FUNCION CADA 10 MINUTOS PARA ASEGURARSE QUE TODO ESTÁ ACTUALIZADO.
        setInterval(reescribir, 10 * 60 * 1000);
	}

    

});

// ABRIR MENÚ PARA CREAR NUEVA LISTA
$(".btn-lista").click(function (e) { 
    // window.alert("Circulo pulsado");
    if($('#id_new_lista').css("display")=="none"){
        $('#id_new_lista').css("display", "flex");
    }else{
        $('#id_new_lista').css("display", "none");
    }
    $(".fondoNegroLista").toggle();
});

$("#id_btn_lista").click(function (e) { 
    // console.log("Boton de crear lista");
    let nombreLista = $('.input_name_lista').val();

    if (nombreLista === '') {
        window.alert('Por favor, rellene todos los campos.');
    } else {
        $.ajax({
            type: "POST",
            url: "https://localhost/Proyecto/PHP/inserts/lista_insert.php",
            data: "ID=" + encodeURIComponent(getCookie("user")[0]) + "&lista=" + encodeURIComponent(nombreLista)  + "&nocache=" + Math.random(),
            dataType: "",
            success: function (response) {
                if (response == 0) {
                    window.alert("No se ha insertado correctamente");
                }else{
                    $('#id_new_lista').css("display", "none");
                    $('.input_name_lista').val("");
                    window.alert("Lista Creada");
                    reescribir();
                }
            },
            error: function(xhr, status, error){
                console.log(xhr.responseText);
                window.alert("Error: " + error);
            }
        }); 
    }
});


// /* FECHA MINIMA DE LIMITE */
// var fecha = new Date(); //Fecha actual
// var mes = fecha.getMonth()+1; //obteniendo mes
// var dia = fecha.getDate(); //obteniendo dia
// var ano = fecha.getFullYear(); //obteniendo año
// if(dia<10)dia='0'+dia;
// if(mes<10)mes='0'+mes;

// /* TODO: HAY QUE PONER LA FECHA DE LA BASE DE DATOS */

// $(".input_creacion").val(ano+"-"+mes+"-"+dia);
// $(".input_limite").val(ano+"-"+mes+"-"+dia);

// $(".input_limite").change(function (e) { 
//     if($(".input_limite").val()<ano+"-"+mes+"-"+dia){
//         $(".input_limite").val(ano+"-"+mes+"-"+dia);
//     }
    
// });





