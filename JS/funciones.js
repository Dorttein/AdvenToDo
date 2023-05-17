export function crearCookie(datos) {
	let datosObj = {};
	// Convertir el array de datos en un objeto
	for (let i = 0; i < datos.length; i++) {
	  datosObj[`dato${i}`] = datos[i];
	}
	// Convertir el objeto a una cadena de texto
	let datosString = JSON.stringify(datosObj);
	// Guardar la cadena de texto en una cookie
	document.cookie = `user=${encodeURIComponent(datosString)};`;
}

export function getCookie(nombreCookie) {
	let regex = new RegExp(`(?:(?:^|.*;\\s*)${nombreCookie}\\s*\\=\\s*([^;]*).*$)|^.*$`);
	let cookieString = decodeURIComponent(document.cookie.replace(regex, "$1"));
  
	// Si la cookie no existe, devolver un array vacío
	if (!cookieString) {
	  return [];
	}
	let datosObj = JSON.parse(cookieString);
	let datosArray = [];
	// Convertir el objeto en un array
	for (let i = 0; i < Object.keys(datosObj).length; i++) {
	  datosArray.push(datosObj[`dato${i}`]);
	}
	return datosArray;
}

export function escribirListas(){
	$.ajax({
        type: "POST",
        url: "https://localhost/Proyecto/PHP/selects/lista_select.php",
        data: "ID_user=" + encodeURIComponent(getCookie("user")[0]) + "&nocache=" + Math.random(),
        dataType: "JSON",
        success: function (response) {
            const fechaActual = new Date();
            const dia = fechaActual.getDate().toString().padStart(2, '0');
            const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
            const anio = fechaActual.getFullYear().toString();
            const fechaFormateada = dia + '/' + mes + '/' + anio;
            const fechaHoy = anio + '-' + mes + '-' + dia;

            let today = `
                <div class='lista lista-${response[0]["ID"]}' id='id_today'>
                    <div class='back-lista'>
                        <div class="icon boton-back-lista"><img class="flecha flecha-back" src="https://localhost/proyecto/photo/flecha.png"></img></div>
                        <div id="id_lista_tareas">
                            <form action="POST" class="formulario_tarea formulario_tarea_${response[0]["ID"]}">
                                <div class="fondoNegroTarea"></div>
								<div class="new_tarea">
									<div id="id_div_nueva_tarea">
										<div class="btn btn-tarea" id="myBtn">
											<div class="btn__icon btn__icon_back">+</div>
										</div>
									</div>
									<label for="input_reward">Acciones</label>
									<label for="input_limite">Fecha Limite</label>
									<input type="number" name="reward" class="input_reward reward_" min="0" max="10" placeholder="0">
									<div class="group div_name">
										<input type="text" required="true" class="input_text input_name name_" maxlength="50" autocomplete="off">
										<span class="hightlight"></span>
										<span class="bar"></span>
										<label class="lab_input_text">Nombre</label>
									</div>  
									<input type="date" name="limite" class="input_limite limite_" value="${fechaHoy}">
									<label class="label_importante">
										<input type="checkbox" name="importante" class="input_importante importante_" />
										<div class="circle">
											<div class="circle--inner circle--inner__1" ></div>
											<div class="circle--inner circle--inner__2" ></div>
											<div class="circle--inner circle--inner__3" ></div>
											<div class="circle--inner circle--inner__4" ></div>
											<div class="circle--inner circle--inner__5" ></div>
											<div class="circle--outer" ></div>
										</div>
									</label>
									<input form="formulario_new_lista" type="button" value="CREAR" class="boton_new_tarea" id="id_btn_tarea-${response[0]["ID"]}">
								</div>
                                <div class="div_nueva_tarea nueva-${response[0]["ID"]}">
                                    <div class="btn btn-tarea" id="myBtn">
                                        <div class="btn__icon">+</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class='front-lista'>
                        <div class="icon boton-front-lista"><img class="flecha flecha-front" src="https://localhost/proyecto/photo/flecha.png"></img></div>
                        <div>${response[0]['nombre']}</div>
                        <div>${response[0]['count']}</div>
                        <div>${fechaFormateada}</div>
                    </div>
                </div>
            `;
            $(today).prependTo("#id_contenido_principal");

            let tareas = `
                <div class='lista lista-${response[1]["ID"]}' id='id_tareas'>
                    <div class='back-lista'>
                        <div class="icon boton-back-lista"><img class="flecha flecha-back" src="https://localhost/proyecto/photo/flecha.png"></img></div>
                        <div id="id_lista_tareas">
                            <form action="POST" class="formulario_tarea formulario_tarea_${response[1]["ID"]}">
                                <div class="fondoNegroTarea"></div>
								<div class="new_tarea">
									<div id="id_div_nueva_tarea">
										<div class="btn btn-tarea" id="myBtn">
											<div class="btn__icon btn__icon_back">+</div>
										</div>
									</div>
									<label for="input_reward">Acciones</label>
									<label for="input_limite">Fecha Limite</label>
									<input type="number" name="reward" class="input_reward reward_" min="0" max="10" placeholder="0">
									<div class="group div_name">
										<input type="text" required="true" class="input_text input_name name_" maxlength="50" autocomplete="off">
										<span class="hightlight"></span>
										<span class="bar"></span>
										<label class="lab_input_text">Nombre</label>
									</div>  
									<input type="date" name="limite" class="input_limite limite_" value="${fechaHoy}">
									<label class="label_importante">
										<input type="checkbox" name="importante" class="input_importante importante_" />
										<div class="circle">
											<div class="circle--inner circle--inner__1" ></div>
											<div class="circle--inner circle--inner__2" ></div>
											<div class="circle--inner circle--inner__3" ></div>
											<div class="circle--inner circle--inner__4" ></div>
											<div class="circle--inner circle--inner__5" ></div>
											<div class="circle--outer" ></div>
										</div>
									</label>
									<input form="formulario_new_lista" type="button" value="CREAR" class="boton_new_tarea" id="id_btn_tarea-${response[1]["ID"]}">
								</div>
                                <div class="div_nueva_tarea nueva-${response[1]["ID"]}">
                                    <div class="btn btn-tarea" id="myBtn">
                                        <div class="btn__icon">+</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class='front-lista'>
                        <div class="icon boton-front-lista"><img class="flecha flecha-front" src="https://localhost/proyecto/photo/flecha.png"></img></div>
                        <div>${response[1]['nombre']}</div>
                        <div>${response[1]['count']}</div>
                    </div>
                </div>
            `;
            $(tareas).insertAfter("#id_today");

            for(let i=2; i<response.length; i++){
                let tarea = `
                    <div class='lista lista-${response[i]["ID"]}'>
                        <div class='back-lista'>
                            <div class="icon boton-back-lista"><img class="flecha flecha-back" src="https://localhost/proyecto/photo/flecha.png"></img></div>
                            <div id="id_lista_tareas">
                                <form action="POST" class="formulario_tarea formulario_tarea_${response[i]["ID"]}">
                                    <div class="fondoNegroTarea"></div>
									<div class="new_tarea">
										<div id="id_div_nueva_tarea">
											<div class="btn btn-tarea" id="myBtn">
												<div class="btn__icon btn__icon_back">+</div>
											</div>
										</div>
										<label for="input_reward">Acciones</label>
										<label for="input_limite">Fecha Limite</label>
										<input type="number" name="reward" class="input_reward reward_" min="0" max="10" placeholder="0">
										<div class="group div_name">
											<input type="text" required="true" class="input_text input_name name_" maxlength="50" autocomplete="off">
											<span class="hightlight"></span>
											<span class="bar"></span>
											<label class="lab_input_text">Nombre</label>
										</div>  
										<input type="date" name="limite" class="input_limite limite_" value="${fechaHoy}">
										<label class="label_importante">
											<input type="checkbox" name="importante" class="input_importante importante_" />
											<div class="circle">
												<div class="circle--inner circle--inner__1" ></div>
												<div class="circle--inner circle--inner__2" ></div>
												<div class="circle--inner circle--inner__3" ></div>
												<div class="circle--inner circle--inner__4" ></div>
												<div class="circle--inner circle--inner__5" ></div>
												<div class="circle--outer" ></div>
											</div>
										</label>
										<input form="formulario_new_lista" type="button" value="CREAR" class="boton_new_tarea" id="id_btn_tarea-${response[i]["ID"]}">
									</div>
                                    <div class="div_nueva_tarea nueva-${response[i]["ID"]}">
                                    <div class="btn btn-tarea" id="myBtn">
                                        <div class="btn__icon">+</div>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                        <div class='front-lista'>
                            <div class="icon boton-front-lista"><img class="flecha flecha-front" src="https://localhost/proyecto/photo/flecha.png"></img></div>
                            <div>${response[i]['nombre']}</div>
                            <div>${response[i]['count']}</div>
                        </div>
                    </div>
                `;
                $(tarea).insertBefore("#id_new_lista");
            }

            for(let i=2; i<response.length; i++){
                if(response[i]['count']==0){
                    let botonLista = `
                    <div class="delete_lista delete_${response[i]["ID"]}">
                        <span class="confirm">¿Seguro?</span>
                        <span>
                            Eliminar
                        </span>
                    </div>
                    `;
                    $(botonLista).appendTo(`.lista-${response[i]["ID"]} .back-lista`);
                }
            }

            /* BOTON PARA ELIMINAR LISTAS */
            $(".delete_lista").click(function (e) { 
                // console.log($(this).attr("class").match(/\d+/)[0]);
                $.ajax({
					type: "POST",
					url: "https://localhost/Proyecto/PHP/deletes/lista_delete.php",
					data: "ID=" + encodeURIComponent($(this).attr("class").match(/\d+/)[0]) + "&nocache=" + Math.random(),
					dataType: "",
					success: function (response) {
						if (response == 0) {
							window.alert("No se ha podido eliminar");
						}else{
							reescribir();
						}
					},
					error: function(xhr, status, error){
						console.log(xhr.responseText);
						window.alert("Error: " + error);
					}
				}); 
            });
        },
        error: function(xhr, status, error){
            console.log(xhr.responseText);
            window.alert("Error: " + error);
        }
    }); 
}
export function funcionesListas(){
	// ABRIR MENÚ PARA CREAR NUEVA LISTA
	$(".btn-lista").click(function (e) { 
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
	/* ESTO ES PARA LAS LISTAS */
	$(".content").on("click",".boton-front-lista",function (e) { /* DA LA VUELTA AL PADRE Y AL HERMANO DEL PADRE AL PULSAR EL BOTON */
	/* DARLES LA VUELTA A LOS DOS DIV */
	$(e.target).parent("div").siblings("div").css("transform", "perspective( 2000px ) rotateY( 0deg )");
	$(e.target).parent("div").siblings("div").css("display", "flex");
	$(e.target).parent("div").css("transform", "perspective( 2000px ) rotateY( 180deg )");

	/* MOVERLO AL CENTRO DE LA PANTALLA Y OSCURECER EL RESTO */
	$(e.target).parent("div").parent("div").css("width", "90%"); // AFECTO AL BLOQUE GRIS. .lista
	$(e.target).parent("div").parent("div").css("position", "absolute");
	$(e.target).parent("div").parent("div").css("height", "fit-content");
	$(e.target).parent("div").parent("div").css("left", "5%");
	$(e.target).parent("div").parent("div").css("top", "0");
	$(e.target).parent("div").parent("div").css("z-index", "110");
	$(".fondoNegroLista").show();
	});

	$(".content").on("click",".boton-back-lista",function (e) {
		$(e.target).parent("div").css("transform", "perspective( 2000px ) rotateY( 180deg )");
		$(e.target).parent("div").css("display", "none");
		$(e.target).parent("div").siblings("div").css("transform", "perspective( 2000px ) rotateY( 0deg )");   

		$(e.target).parent("div").parent("div").css("position", "static");
		$(e.target).parent("div").parent("div").css("width", "");
		$(e.target).parent("div").parent("div").css("height", "");
		$(e.target).parent("div").parent("div").css("margin-left", "");
		$(e.target).parent("div").parent("div").css("z-index", "");
		$(".fondoNegroLista").hide();
	});

    /*DAR LA VUELTA AL PULSAR EL FONDO GRIS*/
	$(".content").on("click",".fondoNegroLista",function () {
    	$(".boton-back-lista").parent("div").css("transform", "perspective( 2000px ) rotateY( 180deg )");
		$(".boton-back-lista").parent("div").css("display", "none");
		$(".boton-back-lista").parent("div").siblings("div").css("transform", "perspective( 2000px ) rotateY( 0deg )");   

		$(".boton-back-lista").parent("div").parent("div").css("position", "static");
		$(".boton-back-lista").parent("div").parent("div").css("width", "");
		$(".boton-back-lista").parent("div").parent("div").css("height", "");
		$(".boton-back-lista").parent("div").parent("div").css("margin-left", "");
		$(".boton-back-lista").parent("div").parent("div").css("z-index", "");

		$("#id_new_lista").css("display", "none");

		$(".fondoNegroLista").hide();
    });

	// ABRIR MENÚ PARA CREAR NUEVA TAREA
	$(".content").on("click",".btn-tarea",function (e) {
		if($('.new_tarea').css("display")=="none"){
			$('.new_tarea').css("display", "grid");
		}else{
			$('.new_tarea').css("display", "none");
		}
		$(".fondoNegroTarea").toggle();
	});

	// PARTE DE CREAR TAREAS
	$(".content").on("click",".boton_new_tarea",function (e) {
		let numLista=$(this).attr("id").match(/\d+/)[0];
		let nombreTarea=$(`.formulario_tarea_${numLista} .input_name`);
		let rewardTarea=$(`.formulario_tarea_${numLista} .input_reward`);
		if(rewardTarea.val()==""){
			rewardTarea.val(0);
		}
		let limiteTarea=$(`.formulario_tarea_${numLista} .input_limite`);
		let importanteTarea=0;
		if($(`.formulario_tarea_${numLista} .input_importante`).prop("checked")){
			importanteTarea=1;
		}
		// console.log(nombreTarea.val());
		// console.log(rewardTarea.val());
		// console.log(limiteTarea.val());
		// console.log(importanteTarea);

		if (nombreTarea.val() === '') {
			window.alert('Por favor, rellene todos los campos.');
		} else {
			$.ajax({
				type: "POST",
				url: "https://localhost/Proyecto/PHP/inserts/tarea_insert.php",
				data: "nb=" + encodeURIComponent(nombreTarea.val()) + "&rw=" + encodeURIComponent(rewardTarea)
				+ "&lm=" + encodeURIComponent(limiteTarea.val()) + "&imp=" + encodeURIComponent(importanteTarea) 
				+ "&idl=" + encodeURIComponent(numLista) + "&nocache=" + Math.random(),
				dataType: "",
				success: function (response) {
					if (response == 0) {
						window.alert("No se ha creado correctamente");
					}else{
						nombreTarea.val("");
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
}

export function escribirTareas(callback){
	$.ajax({
        type: "POST",
        url: "https://localhost/Proyecto/PHP/selects/tarea_select.php",
        data: "ID_user=" + encodeURIComponent(getCookie("user")[0]) + "&nocache=" + Math.random(),
        dataType: "JSON",
        success: function (response) {
            for(let i=0; i<response.length; i++){
                let tarea = `
                    <div class="tarea tarea-${response[i]["ID"]}">	
                        <div class="back-tarea">
                            <div class="icon boton-back-tarea"><img class="flecha flecha-back" src="https://localhost/proyecto/photo/flecha.png"></img></div>
                            <div class="group div_name">
                                <input type="text" required="true" class="input_text input_name name_${response[i]["ID"]}" maxlength="50" autocomplete="off">
                                <span class="hightlight"></span>
                                <span class="bar"></span>
                                <label class="lab_input_text">Nombre</label>
                            </div>
                            <label class="label_comp">
                                <input type="checkbox" name="completed" class="input_completed completed_${response[i]["ID"]}">
                                <span id="id_span_comp"></span>
                            </label>
                            <div class="group div_details">
                                <textarea required="true" class="input_text input_details details_${response[i]["ID"]}" rows="1" maxlength="512"></textarea>
                                <span class="hightlight"></span>
                                <span class="bar"></span>
                                <label class="lab_input_text">Detalles</label>
                            </div>
                            <label class="label_importante">
                                <input type="checkbox" name="importante" class="input_importante importante_${response[i]["ID"]}" />
                                <div class="circle">
                                    <div class="circle--inner circle--inner__1" ></div>
                                    <div class="circle--inner circle--inner__2" ></div>
                                    <div class="circle--inner circle--inner__3" ></div>
                                    <div class="circle--inner circle--inner__4" ></div>
                                    <div class="circle--inner circle--inner__5" ></div>
                                    <div class="circle--outer" ></div>
                                </div>
                            </label>
                            <label for="input_reward">Acciones</label>
                            <input type="number" name="reward" class="input_reward reward_${response[i]["ID"]}" min="0" max="10" placeholder="0">
                            <label for="input_creacion">Fecha Creacion</label>
                            <input type="date" name="creacion" class="input_creacion creacion_${response[i]["ID"]}" readonly>
                            <label for="input_limite">Fecha Limite</label>
                            <input type="date" name="limite" class="input_limite limite_${response[i]["ID"]}">
                        </div>
                        <div class="front-tarea">
                            <div class="icon boton-front-tarea"><img class="flecha flecha-front" src="https://localhost/proyecto/photo/flecha.png"></img></div>
                            <label for="input_reward">Acciones</label>
                            <label for="input_limite">Fecha Limite</label>
                            <label class="label_comp">
                                <input type="checkbox" name="completed" class="input_completed completed_${response[i]["ID"]}">
                                <span id="id_span_comp"></span>
                            </label>
                            <input type="number" name="reward" class="input_reward reward_${response[i]["ID"]}" min="0" max="10" placeholder="0">
                            <div class="group div_name">
                                <input type="text" required="true" class="input_text input_name name_${response[i]["ID"]}" maxlength="50" autocomplete="off">
                                <span class="hightlight"></span>
                                <span class="bar"></span>
                                <label class="lab_input_text">Nombre</label>
                            </div>  
                            <input type="date" name="limite" class="input_limite limite_${response[i]["ID"]}">
                            <label class="label_importante">
                                <input type="checkbox" name="importante" class="input_importante importante_${response[i]["ID"]}" />
                                <div class="circle">
                                    <div class="circle--inner circle--inner__1" ></div>
                                    <div class="circle--inner circle--inner__2" ></div>
                                    <div class="circle--inner circle--inner__3" ></div>
                                    <div class="circle--inner circle--inner__4" ></div>
                                    <div class="circle--inner circle--inner__5" ></div>
                                    <div class="circle--outer" ></div>
                                </div>
                            </label>
                        </div>
                    </div>
                `;
                $(tarea).appendTo(`.formulario_tarea_${response[i]["ID_lista"]}`);  
                let boton = `
                    <div class="delete_tarea delete_${response[i]["ID"]}">
                        <span class="confirm">¿Seguro?</span>
                        <span>
                            Eliminar
                        </span>
                    </div>
                `;
                $(boton).insertAfter(`.tarea-${response[i]["ID"]}`);
                //AQUÍ SE DA EL VALOR A LAS TAREAS CREADAS ANTES
                $(`.formulario_tarea_${response[i]["ID_lista"]} .name_${response[i]["ID"]}`).val(response[i]["nombre"]);
                $(`.formulario_tarea_${response[i]["ID_lista"]} .details_${response[i]["ID"]}`).val(response[i]["detail"]);
                if(response[i]["completed"]==1){
                    $(`.formulario_tarea_${response[i]["ID_lista"]} .completed_${response[i]["ID"]}`).attr("checked", true);
                }
                if(response[i]["importante"]==1){
                    $(`.formulario_tarea_${response[i]["ID_lista"]} .importante_${response[i]["ID"]}`).attr("checked", true);
                }
                $(`.formulario_tarea_${response[i]["ID_lista"]} .reward_${response[i]["ID"]}`).val(response[i]["reward"]);
                $(`.formulario_tarea_${response[i]["ID_lista"]} .limite_${response[i]["ID"]}`).val(response[i]["limit_date"]);
                $(`.formulario_tarea_${response[i]["ID_lista"]} .creacion_${response[i]["ID"]}`).val(response[i]["initial_date"]);
				/* SE LLAMA A LA FUNCION DESDE AQUÍ PARA QUE FUNCIONE */
				// funcionesTareas();
				
            }
        },
        error: function(xhr, status, error){
            console.log(xhr.responseText);
            window.alert("Error: " + error);
        }
    });
}
export function funcionesTareas(){
	/* ESTO ES GIRAR LAS TAREAS */
    $(".content").on("click",".boton-front-tarea",function (e) { /* DA LA VUELTA AL PADRE Y AL HERMANO DEL PADRE AL PULSAR EL BOTON */
		/* DARLES LA VUELTA A LOS DOS DIV */
		$(e.target).parent("div").siblings("div").css("transform", "perspective( 2000px ) rotateY( 0deg ) translate(-4%, -4%)");
		$(e.target).parent("div").siblings("div").css("display", "grid");
		// $(e.target).parent("div").siblings("div").css("align-items", "start");
		$(e.target).parent("div").css("transform", "perspective( 2000px ) rotateY( 180deg )");

		/* MOVERLO AL CENTRO DE LA PANTALLA Y OSCURECER EL RESTO */
		$(e.target).parent("div").parent("div").css("width", "90%"); // AFECTO AL BLOQUE GRIS. .lista
		$(e.target).parent("div").parent("div").css("position", "absolute");
		$(e.target).parent("div").parent("div").css("height", "70vh");
		$(e.target).parent("div").parent("div").css("margin-left", "-7.5%");
		$(e.target).parent("div").parent("div").css("z-index", "120");
		$(".fondoNegroTarea").show();
    });

    $(".content").on("click",".boton-back-tarea",function (e) { 
		$(e.target).parent("div").css("transform", "perspective( 2000px ) rotateY( 180deg )");
		$(e.target).parent("div").css("display", "none");
		$(e.target).parent("div").siblings("div").css("transform", "perspective( 2000px ) rotateY( 0deg )");   

		$(e.target).parent("div").parent("div").css("position", "static");

		$(e.target).parent("div").parent("div").css("width", "");
		$(e.target).parent("div").parent("div").css("height", "");
		$(e.target).parent("div").parent("div").css("margin-left", "");
		$(e.target).parent("div").parent("div").css("z-index", "");
		$(".fondoNegroTarea").hide();
    });

	$(".content").on("click",".fondoNegroTarea",function (e) {
    	$(".boton-back-tarea").parent("div").css("transform", "perspective( 2000px ) rotateY( 180deg )");
		$(".boton-back-tarea").parent("div").css("display", "none");
		$(".boton-back-tarea").parent("div").siblings("div").css("transform", "perspective( 2000px ) rotateY( 0deg )");   
		$(".boton-back-tarea").parent("div").parent("div").css("position", "static");
		$(".boton-back-tarea").parent("div").parent("div").css("width", "");
		$(".boton-back-tarea").parent("div").parent("div").css("height", "");
		$(".boton-back-tarea").parent("div").parent("div").css("margin-left", "");
		$(".boton-back-tarea").parent("div").parent("div").css("z-index", "");

		$(".new_tarea").css("display", "none");

		$(".fondoNegroTarea").hide();
    });

    /* BOTON PARA ELIMINAR TAREAS */
    $(".content").on("click",".delete_tarea",function (e) {
        $.ajax({
            type: "POST",
            url: "https://localhost/Proyecto/PHP/deletes/tarea_delete.php",
            data: "ID=" + encodeURIComponent($(this).attr("class").match(/\d+/)[0]) + "&nocache=" + Math.random(),
            dataType: "",
            success: function (response) {
                if (response == 0) {
                    window.alert("No se ha podido eliminar");
                }else{
					reescribir();
                }
            },
            error: function(xhr, status, error){
                console.log(xhr.responseText);
                window.alert("Error: " + error);
            }
        }); 
    });


	$(".content").on("click", ".input_completed", function () {
		let inputClases = $(this).attr('class').split(' ');
		let isChecked = $(this).prop('checked');
		$(`.${inputClases[1]}`).prop('checked', isChecked);
		let numTarea = inputClases[1].match(/\d+/)[0];
		if(isChecked){
			let rewardTarea=$(`.reward_${numTarea}`).val();
			$.ajax({
				type: "POST",
				url: "https://localhost/Proyecto/PHP/alters/usuario_action_update.php",
				data: "&ID=" + encodeURIComponent(getCookie("user")[0]) + "&action=" + encodeURIComponent(rewardTarea) +
				"&nocache=" + Math.random(),
				dataType: "JSON",
				success: function (response) {
					$("#id_accionesRestantes").html(response);
					$("#id_accionesRestantes").css("color", "");
				},
				error: function(xhr, status, error){
					console.log(xhr.responseText);
					window.alert("Error: " + error);
				}
			}); 
		}
	});

	$(".content").on("input", ".input_name", function () {
		let inputClases = $(this).attr('class').split(' ');
		let value = $(this).val();
		$(`.${inputClases[2]}`).val(value);
	});

	$(".content").on("input", ".input_reward", function () {
		let inputClases = $(this).attr('class').split(' ');
		let value = $(this).val();
		$(`.${inputClases[1]}`).val(value);
	});

	$(".content").on("input", ".input_limite", function () {
		let inputClases = $(this).attr('class').split(' ');
		let value = $(this).val();
		$(`.${inputClases[1]}`).val(value);
	});

	$(".content").on("click", ".input_importante", function () {
		let inputClases = $(this).attr('class').split(' ');
		let isChecked = $(this).prop('checked');
		$(`.${inputClases[1]}`).prop('checked', isChecked);

	});

	//ACTUALIZAR LA TAREA CUANDO SE CAMBIE CUALQUIER INPUT (MENOS DETALLES)
	$(".content").on("change", "input", function () {
		var numTarea = $(this).attr("class").match(/\d+/)[0];
		let completedTarea=0;
		if($(`.completed_${numTarea}`).prop("checked")){
			completedTarea=1;
		}
		let nombreTarea=$(`.name_${numTarea}`);
		let detailsTarea=$(`.details_${numTarea}`);
		let rewardTarea=$(`.reward_${numTarea}`).val();
		let limiteTarea=$(`.limite_${numTarea}`);
		let importanteTarea=0;
		if($(`.importante_${numTarea}`).prop("checked")){
			importanteTarea=1;
		}
		if (nombreTarea.val() === '') {
			window.alert('Por favor, rellene todos los campos.');
		} else {
			$.ajax({
				type: "POST",
				url: "https://localhost/Proyecto/PHP/alters/tarea_update.php",
				data: "&ID=" + encodeURIComponent(numTarea) + "&cp=" + encodeURIComponent(completedTarea)
				+ "&nb=" + encodeURIComponent(nombreTarea.val()) + "&dt=" + encodeURIComponent(detailsTarea.val())
				+ "&rw=" + encodeURIComponent(rewardTarea) + "&lm=" + encodeURIComponent(limiteTarea.val())
				+ "&imp=" + encodeURIComponent(importanteTarea) + "&nocache=" + Math.random(),
				dataType: "",
				success: function (response) {
					if (response == 0) {
						window.alert("No se ha actualizado correctamente");
					}else{
						// window.alert("Tarea actualizada");
					}
				},
				error: function(xhr, status, error){
					console.log(xhr.responseText);
					window.alert("Error: " + error);
				}
			}); 
		}
	});
	//ACTUALIZAR LA TAREA SI SE CAMBIAN LOS DETALLES
	$(".content").on("change", "textarea", function () {
		var numTarea = $(this).attr("class").match(/\d+/)[0];
		let completedTarea=0;
		if($(`.completed_${numTarea}`).prop("checked")){
			completedTarea=1;
		}
		let nombreTarea=$(`.name_${numTarea}`);
		let detailsTarea=$(`.details_${numTarea}`);
		let rewardTarea=$(`.reward_${numTarea}`);
		if(rewardTarea.val()==""){
			rewardTarea.val(0);
		}
		let limiteTarea=$(`.limite_${numTarea}`);
		let importanteTarea=0;
		if($(`.importante_${numTarea}`).prop("checked")){
			importanteTarea=1;
		}
		if (nombreTarea.val() === '') {
			window.alert('Por favor, rellene todos los campos.');
		} else {
			$.ajax({
				type: "POST",
				url: "https://localhost/Proyecto/PHP/alters/tarea_update.php",
				data: "&ID=" + encodeURIComponent(numTarea) + "&cp=" + encodeURIComponent(completedTarea)
				+ "&nb=" + encodeURIComponent(nombreTarea.val()) + "&dt=" + encodeURIComponent(detailsTarea.val())
				+ "&rw=" + encodeURIComponent(rewardTarea) + "&lm=" + encodeURIComponent(limiteTarea.val())
				+ "&imp=" + encodeURIComponent(importanteTarea) + "&nocache=" + Math.random(),
				dataType: "",
				success: function (response) {
					if (response == 0) {
						window.alert("No se ha actualizado correctamente");
					}else{
						// window.alert("Tarea actualizada");
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

export function reescribir(){
	$(".fondoNegroLista").hide();
	$(".fondoNegroTarea").hide();
	$(".lista").remove();
	escribirListas();
	escribirTareas();
}

export function login(){
	let user= $("#id_login").val();
	let passwd= $("#id_passwd").val();
	if (user === '') {
		$("#id_login ~ .lab_input_text").css("color", "red");
	  }else{
		$("#id_login ~ .lab_input_text").css("color", "");
	}
	if(passwd === ''){
		$("#id_passwd ~ .lab_input_text").css("color", "red");
	}else{
		$("#id_passwd ~ .lab_input_text").css("color", "");
	}
	$.ajax({
		type: "POST",
		url: "https://localhost/proyecto/PHP/selects/usuario_select.php",
		data: "user=" + encodeURIComponent(user) + "&passwd=" + encodeURIComponent(passwd) + "&nocache=" + Math.random(),
		dataType: "json",
		success: function (response) {
			if (response.length != 0) {
				// console.log(response[0]["ID"]);
				// console.log(response[0]["login"]);
				// console.log(response[0]["passwd"]);
				let datos = [response[0]["ID"], response[0]["login"], response[0]["passwd"]];
				crearCookie(datos);
				$("#id_passwd").val("");
				$("#id_user_nf").html("");
				$("#id_btn_logout").removeAttr("hidden");
				$(".reg").remove();
				reescribir();
				funcionesListas();
				funcionesTareas();
				equiparObjetos();
				escribirRecuadros();
				$(".home_is_visible").removeClass("nav_is_visible");
			}else{
				$("#id_user_nf").html("Usuario erroneo");
			}
		},
		error: function(xhr, status, error){
			console.log(xhr.responseText);
			window.alert("Error: " + error);
		}
	});   
}
export function logout(){
	//BORRA LA COOKIE Y RECARGA LA PÁGINA PARA QUE TODOS LOS CAMBIOS SE LLEVEN A CABO
	document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
	location.reload();
}

export function equiparObjetos(){
	$.ajax({
		type: "POST",
		url: "https://localhost/proyecto/PHP/selects/equiped_select.php",
		data: "user=" + encodeURIComponent(getCookie("user")[0]) + "&nocache=" + Math.random(),
		dataType: "json",
		success: function (response) {
			$("#id_equip").empty();
			$("#id_equip").append('<img src="photo/Jose.png" id="id_char" alt="Character">');
			for(let i=0;i<response.length;i++){
				if(response[i]["ID_object"]<11){
					$(`<img src="photo/Armas/${response[i]["ID_object"]}.png" id="id_weap" class="obj weapon weapon${response[i]["ID_object"]}" alt="Weapon"></img>`).insertBefore("#id_char");
				}
				if(response[i]["ID_object"]>10 && response[i]["ID_object"]<21){
					$(`<img src="photo/Cascos/${response[i]["ID_object"]}.png" id="id_helm" class="obj helmet helmet${response[i]["ID_object"]}" alt="Helmet"></img>`).insertBefore("#id_char");
				}
				if(response[i]["ID_object"]>20){
					$(`<img src="photo/Escudos/${response[i]["ID_object"]}.png" id="id_shie" class="obj shield shield${response[i]["ID_object"]}" alt="Shield"></img>`).insertBefore("#id_char");
				}
			}
		},
		error: function(xhr, status, error){
			console.log(xhr.responseText);
			window.alert("Error: " + error);
		}
	});
}
export function escribirRecuadros(){
    $.ajax({
		type: "POST",
		url: "https://localhost/proyecto/PHP/selects/object_select.php",
		data: "user=" + encodeURIComponent(getCookie("user")[0]) + "&nocache=" + Math.random(),
		dataType: "json",
		success: function (response) {
			$("#id_lista_objetos").empty();
            for (let i = 0; i < response.length; i++) {
                if(i==0){$("#id_lista_objetos").append('<h1>Espadas</h1>');}
                if(i==10){$("#id_lista_objetos").append('<h1>Cascos</h1>');}
                if(i==20){$("#id_lista_objetos").append('<h1>Escudos</h1>');}

                if(response[i]["equiped"]==1){
                    $("#id_lista_objetos").append('<img src="/proyecto/photo/Recuadro.png" class="recuadro" alt="recuadro">');
                }else{
                    $("#id_lista_objetos").append('<img src="/proyecto/photo/Recuadro.png" class="recuadro equiped" alt="recuadro">');
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

export function dibujarJuego(){
	let juego=`
    <section id="id_juego">
        <div id="id_fight">
            <div id="id_equip">
                <img src="photo/Jose.png" id="id_char" alt="Character">
            </div>
            <img src="photo/Enemigos/0.png" class="id_ene" alt="Enemy">
        </div>
        <div id="id_game">
            <button id="id_btn_attack" class="btn_action">Attack</button>
            <button id="id_btn_defend" class="btn_action">Defend</button>
            <button id="id_btn_heal" class="btn_action">Heal</button>
        </div>
    </section>`;

	$("#id_juego").remove();

    if($(window).width()>750){
		$(".mobile").hide();
        $(juego).insertAfter(".fondoNegroLista");
    }else{
		$(".mobile").show();
		// $("<li><a class='mobile' href='aboutus_is_visible'>Juego</a></li>").insertBefore("#id_li_form");
        $(juego).appendTo(".aboutus");
    }

	/*SI EXISTE LA COOKIE COMPRUEBA LA VIDA. SI NO EXISTE PONE AMBAS A 10 POR DEFECTO */
    if (getCookie("user").length != 0 ) {
        $.ajax({
            type: "POST",
            url: "https://localhost/proyecto/PHP/selects/usuario_select_nopw.php",
            data: "user=" + encodeURIComponent(getCookie("user")[1]) + "&nocache=" + Math.random(),
            dataType: "json",
            success: function (response) {
                if (response.length != 0) {   
					if(response[0]["HP_enemy"]<0){response[0]["HP_enemy"]=100}
					if(response[0]["HP_character"]<0){response[0]["HP_character"]=100}
                    $("#id_juego").prepend(`
					<div id="id_vidas">
						<img src="photo/hpEne/${Math.ceil(response[0]["HP_enemy"] / 10)}.png" id="id_hpEne" class="hp" alt="HP Enemy">
						<span id="id_accionesRestantes">${response[0]["action"]}</span>
						<img src="photo/hpChar/${Math.ceil(response[0]["HP_character"] / 10)}.png" id="id_hpChar" class="hp" alt="HP Character">
					</div>
					`);
					$(".id_ene").attr("src", `photo/enemigos/${response[0]["ID_enemy"]}.png`);
					if(response[0]["ID_enemy"]==1){
						$(".id_ene").addClass("alien");
					}
                    equiparObjetos();
                }else{
                    $("#id_juego").prepend(`
					<div id="id_vidas">
						<img src="photo/hpEne/10.png" id="id_hpEne" class="hp" alt="HP Enemy">
						<span id="id_accionesRestantes">0</span>
						<img src="photo/hpChar/10.png" id="id_hpChar" class="hp" alt="HP Character">
					</div>`);
					$(".id_ene").attr("src", `photo/enemigos/0.png`);
                }
            },
            error: function(xhr, status, error){
                console.log(xhr.responseText);
                window.alert("Error: " + error);
            }
        });
    }else{
        $("#id_juego").prepend(`
			<div id="id_vidas">
				<img src="photo/hpEne/10.png" id="id_hpEne" class="hp" alt="HP Enemy">
				<span id="id_accionesRestantes">0</span>
				<img src="photo/hpChar/10.png" id="id_hpChar" class="hp" alt="HP Character">
			</div>
		`);
    }
}

export function atacar(){
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
                            }else if(response["HP_character"]<0){
								$("#id_hpChar").attr("src", `photo/hpChar/0.png`);
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
export function defender(){
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
                            }else if(response["HP_character"]<0){
								$("#id_hpChar").attr("src", `photo/hpChar/0.png`);
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
export function curar(){
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
                            }else if(response["HP_character"]<0){
								$("#id_hpChar").attr("src", `photo/hpChar/0.png`);
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

export function charMuerto(HP_character){
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
export function eneMuerto(HP_enemy){
    if(HP_enemy<=0){
        $(".id_ene").css("filter", "opacity(0.5) drop-shadow(0 0 0 red)");
        $("#id_hpEne").css("filter", "opacity(0.5) drop-shadow(0 0 0 red)");
        $("#id_hpEne").attr("src", `photo/hpEne/0.png`);
        $("#id_btn_attack").disabled = true;
        $("#id_btn_defend").disabled = true;
        $("#id_btn_heal").disabled = true;

        setTimeout(function() {
            $("#id_hpEne").css("filter", "");
            $("#id_hpEne").attr("src", `photo/hpEne/10.png`);
            $(".id_ene").css("filter", "");
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
                        $(".id_ene").attr("src", `photo/Enemigos/${enemigo}.png`);
						$(".id_ene").addClass("alien");
                    }else{
						$(".id_ene").removeClass("alien");
                        $(".id_ene").attr("src", `photo/Enemigos/${enemigo}.png`);
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