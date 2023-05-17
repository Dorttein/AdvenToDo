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