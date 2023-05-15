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
    if (getCookie("user").length != 0 ) {
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
    }else{window.alert("INICIA SESIÓN PARA CREAR LISTAS");}
});