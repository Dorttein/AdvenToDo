import {getCookie, dibujarJuego, escribirRecuadros} from '/proyecto/JS/funciones.js';

$(document).ready(function () {
    dibujarJuego();
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

});

/* ANIMCIÓN AL GOLPEAR AL ENEMIGO */
function animacion(){
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
    if(!$("#id_ene").hasClass("shake")){
        $("#id_ene").addClass("shake");
        setTimeout(function(){
            $("#id_ene").removeClass("shake")
        }, 600);
    }
}

function atacar(){
	let damageRecibed=0;
	let damageDeal=0;
	/* RESTAR 1 A LAS ACCIONES */
	$.ajax({
		type: "POST",
		url: "https://localhost/Proyecto/PHP/alters/usuario_action_update.php",
		data: "&ID=" + encodeURIComponent(getCookie("user")[0]) + "&action=" + encodeURIComponent(-1) +
		"&nocache=" + Math.random(),
		dataType: "JSON",
		success: function (response) {
            if(response==0){
                $("#id_accionesRestantes").css("color", "red");
            }else{
                $("#id_accionesRestantes").css("color", "");
            }
			$("#id_accionesRestantes").html(response);
		},
		error: function(xhr, status, error){
			console.log(xhr.responseText);
			window.alert("Error: " + error);
		}
	}); 
	/* Calcular damage hecho y recibido y aplicarlo */
	$.ajax({
		type: "POST",
		url: "https://localhost/proyecto/PHP/selects/equiped_select.php",
		data: "user=" + encodeURIComponent(getCookie("user")[0]) + "&nocache=" + Math.random(),
		dataType: "JSON",
		success: function (response) {
			while (response.length < 3) {
				response.push(0);
			}
			$.ajax({
				type: "POST",
				url: "https://localhost/proyecto/PHP/selects/objeto_equipado_select.php",
				data: "ID1=" + encodeURIComponent(response[0]["ID_object"]) +
				"&ID2=" + encodeURIComponent(response[1]["ID_object"]) + 
				"&ID3=" + encodeURIComponent(response[2]["ID_object"]) +
				"&ID_user=" + encodeURIComponent(getCookie("user")[0]) +
				"&nocache=" + Math.random(),
				dataType: "JSON",
				success: function (response) {
					damageRecibed=response["damage"]+response["recoil"]-response["defensa"];
					if(damageRecibed<0){damageRecibed=0;}
					damageRecibed-=response["heal"];
					damageDeal=response["ataque"]+5;
					// console.log(damageDeal);
					// console.log(damageRecibed);
					$.ajax({
						type: "POST",
						url: "https://localhost/proyecto/PHP/alters/usuario_hp_update.php",
						data: "damageDeal=" + encodeURIComponent(damageDeal) +
						"&damageRecibed=" + encodeURIComponent(damageRecibed) + 
						"&ID_user=" + encodeURIComponent(getCookie("user")[0]) +
						"&nocache=" + Math.random(),
						dataType: "JSON",
						success: function (response) {
                            if(response["HP_enemy"]<=0){
                                $("#id_hpEne").attr("src", `photo/hpEne/0.png`);
                            }else{
                                $("#id_hpEne").attr("src", `photo/hpEne/${Math.ceil(response["HP_enemy"] / 10)}.png`);
                            }	
                            $("#id_accionesRestantes").html(`${response["action"]}`);
                            if(response["HP_character"]>100){
                                $("#id_hpChar").attr("src", `photo/hpChar/10.png`);
                            }else{
                                $("#id_hpChar").attr("src", `photo/hpChar/${Math.ceil(response["HP_character"] / 10)}.png`);
                            }
                            charMuerto(response["HP_character"]);
                            eneMuerto(response["HP_enemy"]);
						},
						error: function(xhr, status, error){
							console.log(xhr.responseText);
							window.alert("Error: " + error);
						}
					});
				},
				error: function(xhr, status, error){
					console.log(xhr.responseText);
					window.alert("Error: " + error);
				}
			});
		},
		error: function(xhr, status, error){
			console.log(xhr.responseText);
			window.alert("Error: " + error);
		}
	});
}
function defender(){
	let damageRecibed=0;
	let damageDeal=0;
	/* RESTAR 1 A LAS ACCIONES */
	$.ajax({
		type: "POST",
		url: "https://localhost/Proyecto/PHP/alters/usuario_action_update.php",
		data: "&ID=" + encodeURIComponent(getCookie("user")[0]) + "&action=" + encodeURIComponent(-1) +
		"&nocache=" + Math.random(),
		dataType: "JSON",
		success: function (response) {
			$("#id_accionesRestantes").html(response);
		},
		error: function(xhr, status, error){
			console.log(xhr.responseText);
			window.alert("Error: " + error);
		}
	}); 
	/* Calcular damage hecho y recibido y aplicarlo */
	$.ajax({
		type: "POST",
		url: "https://localhost/proyecto/PHP/selects/equiped_select.php",
		data: "user=" + encodeURIComponent(getCookie("user")[0]) + "&nocache=" + Math.random(),
		dataType: "JSON",
		success: function (response) {
			while (response.length < 3) {
				response.push(0);
			}
			$.ajax({
				type: "POST",
				url: "https://localhost/proyecto/PHP/selects/objeto_equipado_select.php",
				data: "ID1=" + encodeURIComponent(response[0]["ID_object"]) +
				"&ID2=" + encodeURIComponent(response[1]["ID_object"]) + 
				"&ID3=" + encodeURIComponent(response[2]["ID_object"]) +
				"&ID_user=" + encodeURIComponent(getCookie("user")[0]) +
				"&nocache=" + Math.random(),
				dataType: "JSON",
				success: function (response) {
					damageRecibed=response["damage"]+response["recoil"]-response["defensa"]-2;
					if(damageRecibed<0){damageRecibed=0;}
					damageRecibed-=response["heal"];
					damageDeal=response["ataque"]-5;
					console.log(damageDeal);
					console.log(damageRecibed);
					$.ajax({
						type: "POST",
						url: "https://localhost/proyecto/PHP/alters/usuario_hp_update.php",
						data: "damageDeal=" + encodeURIComponent(damageDeal) +
						"&damageRecibed=" + encodeURIComponent(damageRecibed) + 
						"&ID_user=" + encodeURIComponent(getCookie("user")[0]) +
						"&nocache=" + Math.random(),
						dataType: "JSON",
						success: function (response) {
                            if(response["HP_enemy"]<=0){
                                $("#id_hpEne").attr("src", `photo/hpEne/0.png`);
                            }else{
                                $("#id_hpEne").attr("src", `photo/hpEne/${Math.ceil(response["HP_enemy"] / 10)}.png`);
                            }	
                            $("#id_accionesRestantes").html(`${response["action"]}`);
                            if(response["HP_character"]>100){
                                $("#id_hpChar").attr("src", `photo/hpChar/10.png`);
                            }else{
                                $("#id_hpChar").attr("src", `photo/hpChar/${Math.ceil(response["HP_character"] / 10)}.png`);
                            }
                            charMuerto(response["HP_character"]);
                            eneMuerto(response["HP_enemy"]);
						},
						error: function(xhr, status, error){
							console.log(xhr.responseText);
							window.alert("Error: " + error);
						}
					});
				},
				error: function(xhr, status, error){
					console.log(xhr.responseText);
					window.alert("Error: " + error);
				}
			});
		},
		error: function(xhr, status, error){
			console.log(xhr.responseText);
			window.alert("Error: " + error);
		}
	});
}
function curar(){
	let damageRecibed=0;
	let damageDeal=0;
	/* RESTAR 1 A LAS ACCIONES */
	$.ajax({
		type: "POST",
		url: "https://localhost/Proyecto/PHP/alters/usuario_action_update.php",
		data: "&ID=" + encodeURIComponent(getCookie("user")[0]) + "&action=" + encodeURIComponent(-1) +
		"&nocache=" + Math.random(),
		dataType: "JSON",
		success: function (response) {
			$("#id_accionesRestantes").html(response);
		},
		error: function(xhr, status, error){
			console.log(xhr.responseText);
			window.alert("Error: " + error);
		}
	}); 
	/* Calcular damage hecho y recibido y aplicarlo */
	$.ajax({
		type: "POST",
		url: "https://localhost/proyecto/PHP/selects/equiped_select.php",
		data: "user=" + encodeURIComponent(getCookie("user")[0]) + "&nocache=" + Math.random(),
		dataType: "JSON",
		success: function (response) {
			while (response.length < 3) {
				response.push(0);
			}
			$.ajax({
				type: "POST",
				url: "https://localhost/proyecto/PHP/selects/objeto_equipado_select.php",
				data: "ID1=" + encodeURIComponent(response[0]["ID_object"]) +
				"&ID2=" + encodeURIComponent(response[1]["ID_object"]) + 
				"&ID3=" + encodeURIComponent(response[2]["ID_object"]) +
				"&ID_user=" + encodeURIComponent(getCookie("user")[0]) +
				"&nocache=" + Math.random(),
				dataType: "JSON",
				success: function (response) {
					damageRecibed=response["damage"]+response["recoil"]-response["defensa"];
					if(damageRecibed<0){damageRecibed=0;}
					damageRecibed-=response["heal"]+5;
					damageDeal=response["ataque"]-2;
					console.log(damageDeal);
					console.log(damageRecibed);
					$.ajax({
						type: "POST",
						url: "https://localhost/proyecto/PHP/alters/usuario_hp_update.php",
						data: "damageDeal=" + encodeURIComponent(damageDeal) +
						"&damageRecibed=" + encodeURIComponent(damageRecibed) + 
						"&ID_user=" + encodeURIComponent(getCookie("user")[0]) +
						"&nocache=" + Math.random(),
						dataType: "JSON",
						success: function (response) {
                            if(response["HP_enemy"]<=0){
                                $("#id_hpEne").attr("src", `photo/hpEne/0.png`);
                            }else{
                                $("#id_hpEne").attr("src", `photo/hpEne/${Math.ceil(response["HP_enemy"] / 10)}.png`);
                            }	
                            $("#id_accionesRestantes").html(`${response["action"]}`);
                            if(response["HP_character"]>100){
                                $("#id_hpChar").attr("src", `photo/hpChar/10.png`);
                            }else{
                                $("#id_hpChar").attr("src", `photo/hpChar/${Math.ceil(response["HP_character"] / 10)}.png`);
                            }
                            charMuerto(response["HP_character"]);
                            eneMuerto(response["HP_enemy"]);
						},
						error: function(xhr, status, error){
							console.log(xhr.responseText);
							window.alert("Error: " + error);
						}
					});
				},
				error: function(xhr, status, error){
					console.log(xhr.responseText);
					window.alert("Error: " + error);
				}
			});
		},
		error: function(xhr, status, error){
			console.log(xhr.responseText);
			window.alert("Error: " + error);
		}
	});
}

function charMuerto(HP_character){
    if(HP_character<=0){
        $("#id_char").css("filter", "opacity(0.5) drop-shadow(0 0 0 red)");
        $("#id_hpChar").css("filter", "opacity(0.5) drop-shadow(0 0 0 red)");
        $("#id_btn_attack").disabled = true;
        $("#id_btn_defend").disabled = true;
        $("#id_btn_heal").disabled = true; 
        setTimeout(function() {
            $("#id_hpChar").css("filter", "");
            $("#id_hpChar").attr("src", `photo/hpChar/10.png`);
            $("#id_char").css("filter", "");
            $("#id_btn_attack").disabled = false;
            $("#id_btn_defend").disabled = false;
            $("#id_btn_heal").disabled = false;
        }, 3000);
    }
}
function eneMuerto(HP_enemy){
    if(HP_enemy<=0){
        $("#id_ene").css("filter", "opacity(0.5) drop-shadow(0 0 0 red)");
        $("#id_hpEne").css("filter", "opacity(0.5) drop-shadow(0 0 0 red)");
        $("#id_hpEne").attr("src", `photo/hpEne/0.png`);
        $("#id_btn_attack").disabled = true;
        $("#id_btn_defend").disabled = true;
        $("#id_btn_heal").disabled = true;

        setTimeout(function() {
            $("#id_hpEne").css("filter", "");
            $("#id_hpEne").attr("src", `photo/hpEne/10.png`);
            $("#id_ene").css("filter", "");
            $("#id_btn_attack").disabled = false;
            $("#id_btn_defend").disabled = false;
            $("#id_btn_heal").disabled = false;

            /* PRIMERO CALCULAR SI DESBLOQUEAS ALGO */
            $.ajax({
                type: "POST",
                url: "https://localhost/proyecto/PHP/selects/enemy_select.php",
                data: "user=" + encodeURIComponent(getCookie("user")[0]) + "&nocache=" + Math.random(),
                dataType: "json",
                success: function (response) {
                    if(Math.floor(Math.random() * 100) + 1<=response){
                        $.ajax({
                            type: "POST",
                            url: "https://localhost/proyecto/PHP/selects/locked_select.php",
                            data: "ID_user=" + encodeURIComponent(getCookie("user")[0]) + "&nocache=" + Math.random(),
                            dataType: "json",
                            success: function (response) {
                                /* DESBLOQUEOS */
                                let desbloqueo=0;
                                if(response.length>2){
                                    switch(Math.floor(Math.random() * 3) + 1){
                                        case 1:     desbloqueo=response[1]+1;
                                            break;
                                        case 2:     desbloqueo=response[2]+1;
                                            break;
                                        case 3:     desbloqueo=response[3]+1;
                                            break;
                                    }
                                }else{
                                    switch(Math.floor(Math.random() * 3) + 1){
                                        case 1:
                                            if(response[1]>0){desbloqueo=response[1]+1;}else{desbloqueo=1;}
                                            break;
                                        case 2:
                                            if(response[2]>10){desbloqueo=response[2]+1;}else{desbloqueo=11;}
                                            break;
                                        case 3:
                                            if(response[3]>20){desbloqueo=response[3]+1;}else{desbloqueo=21;}
                                            break;
                                    }
                                }
                                if(desbloqueo==31){desbloqueo=1;}
                                $.ajax({
                                    type: "POST",
                                    url: "https://localhost/Proyecto/PHP/inserts/locked_insert.php",
                                    data: "ID_user=" + encodeURIComponent(getCookie("user")[0]) +
                                    "&ID_object=" + encodeURIComponent(desbloqueo) +
                                    "&nocache=" + Math.random(),
                                    dataType: "JSON",
                                    success: function (response) {
                                        if(response!=0){
                                            window.alert(`Se ha desbloqueado un nuevo objeto`);
                                            escribirRecuadros();
                                        }
                                    },
                                    error: function(xhr, status, error){
                                        console.log(xhr.responseText);
                                        window.alert("Error: " + error);
                                    }
                                });
                            },
                            error: function(xhr, status, error){
                                console.log(xhr.responseText);
                                window.alert("Error: " + error);
                            }
                        });
                    }
                },
                error: function(xhr, status, error){
                    console.log(xhr.responseText);
                    window.alert("Error: " + error);
                }
            });

            let enemigo=Math.round(Math.random() * 1);
            $.ajax({
                type: "POST",
                url: "https://localhost/Proyecto/PHP/alters/usuario_game_update.php",
                data: "ID=" + encodeURIComponent(getCookie("user")[0]) +
                "&ID_enemy=" + encodeURIComponent(enemigo) +
                "&nocache=" + Math.random(),
                dataType: "",
                success: function (response) {
                    if(enemigo==1){
                        $("#id_ene").attr("src", `photo/Enemigos/${enemigo}.png`);
                        $("#id_ene").css("max-width", "45%");
                        $("#id_ene").css("margin-right", "0%");
                    }else{
                        $("#id_ene").attr("src", `photo/Enemigos/${enemigo}.png`);
                        $("#id_ene").css("max-width", "20%");
                        $("#id_ene").css("margin-right", "5%");
					}
                },
                error: function(xhr, status, error){
                    console.log(xhr.responseText);
                    window.alert("Error: " + error);
                }
            });
        }, 1000);
    }
}