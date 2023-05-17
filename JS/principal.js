import {getCookie, reescribir, dibujarJuego,
    escribirListas, funcionesListas, escribirTareas,
    funcionesTareas, escribirRecuadros, login,
    logout, equiparObjetos, atacar,
    defender, curar
} from '/proyecto/JS/funciones.js';

$(document).ready(function () {
/* ESTA PRIMERA PARTE DIBUJA TODAS LAS PARTES NECESARIAS PARA LA PÁGINA WEB */
    dibujarJuego();
    if (getCookie("user").length != 0 ) {
		escribirListas();
        funcionesListas();
        escribirTareas();
        funcionesTareas();
	}
    escribirRecuadros();

/* FUNCIONALIDAD HEADER Y MENÚ */
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (getCookie("user").length != 0 ) {
                reescribir();
            }
            dibujarJuego();
        }, 150);
    });
    
    $("body").addClass("home_is_visible");
    $(".button").on("click", function () {
        $("body").toggleClass("nav_is_visible");
        if($("#cbox").prop("checked")){
            $("#cbox").prop("checked", false);  
        }else{
            $("#cbox").prop("checked", true);  
        }
    });
    $("body").on("click", ".menu a", function (e) {
        e.preventDefault();
        removeClasses();
        var link = $(this).attr("href");
        $("body").addClass(link);
        $("body").removeClass("nav_is_visible");
        $("#cbox").prop("checked", false);        
    });
    $("#id_enlace_tareas").on("click", equiparObjetos);
    $("#id_enlace_objetos").on("click", equiparObjetos);

    /* FUNCIONALIDAD LOGIN Y LOGOUT */
    if (getCookie("user").length != 0 ) {
		// SI EXISTE LA COOKIE		
		$("#id_login").val(getCookie("user")[1]);
		$("#id_passwd").val("");
		$(".reg").remove();
		$("#id_btn_logout").removeAttr("hidden");
	}else{
		//SI NO EXISTE LA COOKIE
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
							dibujarJuego();
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
		$(".contactus_is_visible").addClass("home_is_visible");
		$(".contactus_is_visible").removeClass("contactus_is_visible");
		login();
		dibujarJuego();
	});
	//LOGOUT DE USUARIOS
	$("#id_btn_logout").click(function (e) { 
		logout();
	});

/* FUNCIONALIDAD COMBATE */
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

/* FUNCIONALIDAD EQUIPAR Y DESEQUIPAR OBJETOS */
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
/* FUNCION PARA EL MENÚ */
function removeClasses() {
    $(".menu ul li").each(function () {
        var link = $(this).find("a").attr("href");
        $("body").removeClass(link);
    });
}
/* ANIMCIÓN AL GOLPEAR AL ENEMIGO */
function animacion(){
    if(!$(".id_ene").hasClass("shake")){
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
    if(!$(".id_ene").hasClass("shake")){
        $(".id_ene").addClass("shake");
        setTimeout(function(){
            $(".id_ene").removeClass("shake")
        }, 600);
    }
}