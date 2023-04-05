$(document).ready(function () {

	$.ajax({
		type: "POST",
		url: "../models/tarea_model.php",
        data: "nocache=" + Math.random(),
		dataType: "json",
        success: function (response) {
			
            console.log(response);
            
            // for(let i=0;i<response.length;i++){


				// option=document.createElement("option");
				// $(option).attr('value', response[i].id);
				// $(option).append(response[i].comunidad);
				// $('#id_ccaa').append(option);
			// }
		},
        error: function(){
            window.alert();
        }
	});
});



function mostrar_ccaa(xhttp) {
	var datos = JSON.parse(xhttp.responseText);
	for (let i = 0; i < datos.length; i++) {
		console.log(datos);
	}
}
