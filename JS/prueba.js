$(document).ready(function () {
	$.ajax({
		type: "POST",
		url: "https://localhost/proyecto/models/tarea_model.php",
		cache: false,
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




