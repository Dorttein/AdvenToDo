import {getCookie, crearCookie, login, logout} from '/proyecto/JS/funciones.js';

$(document).ready(function () {

	if (getCookie("user").length != 0 ) {
		// código a ejecutar si la cookie existe
		// console.log("Cookie existe");		
		$("#id_login").val(getCookie("user")[1]);
		$("#id_passwd").val("");
		$(".reg").remove();
		$("#id_btn_logout").removeAttr("hidden");
		
	}else{
		//SI EXISTE LA COOKIE NO APARECE EL BOTÓN DE REGISTRARSE
		$("<li class='reg'><a href='contactus_is_visible'>Registrarse</a></li>").insertBefore("#id_li_form");

		// REGISTRO DE USUARIOS NUEVOS
		$('#id_btn_registro').click(function() {
			let usuario = $('#usuario').val();
			let contrasenya = $('#password').val();
			let confirmPassword = $('#confirm-password').val();
			
			if (usuario === '' || contrasenya === '' || confirmPassword === '') {
				window.alert('Por favor, rellene todos los campos.');
			} else if (contrasenya !== confirmPassword) {
				window.alert('Las contraseñas no coinciden. Por favor, vuelva a intentarlo.');
			} else {
				$.ajax({
					type: "POST",
					url: "https://localhost/Proyecto/PHP/inserts/usuario_insert.php",
					data: "user=" + encodeURIComponent(usuario) + "&passwd=" + encodeURIComponent(contrasenya)  + "&nocache=" + Math.random(),
					dataType: "",
					success: function (response) {
						if (response == 0) {
							window.alert("ESE USUARIO YA EXISTE");
						}else{
							$('#usuario').val('');
							$('#password').val('');
							$('#confirm-password').val('');
							//TODO: HACER VOLVER A LA PÁGINA INICIAL SIN REFRESCAR LA PÁGINA.
							//! NO SE BORRA LA CLASE CONTACTUS
							$(".contactus_is_visible").addClass("home_is_visible");
							$(".contactus_is_visible").removeClass("contactus_is_visible");
						}
					},
					error: function(xhr, status, error){
						console.log(xhr.responseText);
						window.alert("Error: " + error);
					}
				}); 
			}
		});
	}

	// LOGIN DE USUARIOS
	$("#id_btn_login").click(function (e) { 
		login();
	});

	//LOGOUT DE USUARIOS
	$("#id_btn_logout").click(function (e) { 
		logout();
	});


});




