export function crearCookie(datos) {
	let datosObj = {};
	// Convertir el array de datos en un objeto
	for (let i = 0; i < datos.length; i++) {
	  datosObj[`dato${i}`] = datos[i];
	}
	// Convertir el objeto a una cadena de texto
	let datosString = JSON.stringify(datosObj);
	// Guardar la cadena de texto en una cookie
	document.cookie = `user=${encodeURIComponent(datosString)}; Secure`;
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
										<input type="text" required="true" class="input_text input_name name_" maxlength="50">
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
										<input type="text" required="true" class="input_text input_name name_" maxlength="50">
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
											<input type="text" required="true" class="input_text input_name name_" maxlength="50">
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

            $(".id_contenido_principal").on("click",".delete_lista",function (e) { 
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
                                <input type="text" required="true" class="input_text input_name name_${response[i]["ID"]}" maxlength="50">
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
                            <div class="div_subtareas">
                                <h2>AQUI IRAN LAS SUBTAREAS</h2>
                            </div>
                            <div class="div_repetir">
                                <h2>AQUI IRÁ LA OPCION DE REPETIR</h2>
                            </div>
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
                                <input type="text" required="true" class="input_text input_name name_${response[i]["ID"]}" maxlength="50">
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
		$(e.target).parent("div").siblings("div").css("transform", "perspective( 2000px ) rotateY( 0deg )");
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


	let completedFront = $('.front-tarea .input_completed');
	let completedBack = $('.back-tarea .input_completed');
	completedFront.click(function() {
		if(completedBack.prop("checked")){
			completedFront.prop("checked", false);
			completedBack.prop("checked", false);
		}else{completedFront.prop("checked", true);completedBack.prop("checked", true)}
	});
	completedBack.click(function() {
		if(completedFront.prop("checked")){
			completedBack.prop("checked", false);
			completedFront.prop("checked", false);
		}else{completedBack.prop("checked", true);completedFront.prop("checked", true)}
	});

	let nameFront = $('.front-tarea .input_name');
	let nameBack = $('.back-tarea .input_name');
	nameFront.on('input', function() {
		nameBack.val(nameFront.val());
	});
	nameBack.on('input', function() {
		nameFront.val(nameBack.val());
	});

	let rewardFront = $('.front-tarea .input_reward');
	let rewardBack = $('.back-tarea .input_reward');
	rewardFront.on('input', function() {
		rewardBack.val(rewardFront.val());
	});
	rewardBack.on('input', function() {
		rewardFront.val(rewardBack.val());
	});

	let limiteFront = $('.front-tarea .input_limite');
	let limiteBack = $('.back-tarea .input_limite');
	limiteFront.on('input', function() {
		limiteBack.val(limiteFront.val());
	});
	limiteBack.on('input', function() {
		limiteFront.val(limiteBack.val());
	});

	let importanteFront = $('.front-tarea .input_importante');
	let importanteBack = $('.back-tarea .input_importante');
	importanteFront.click(function() {
		if(importanteBack.prop("checked")){
			importanteFront.prop("checked", false);
			importanteBack.prop("checked", false);
		}else{importanteFront.prop("checked", true);importanteBack.prop("checked", true)}
	});
	importanteBack.click(function() {
		if(importanteFront.prop("checked")){
			importanteBack.prop("checked", false);
			importanteFront.prop("checked", false);
		}else{importanteBack.prop("checked", true);importanteFront.prop("checked", true)}
	});

	//ACTUALIZAR LA TAREA CUANDO SE CAMBIE CUALQUIER INPUT (MENOS DETALLES)
	$("input").on("change", function() {
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
        // console.log(completedTarea); 
        // console.log(nombreTarea.val()); 
        // console.log(detailsTarea.val()); 
        // console.log(rewardTarea.val()); 
        // console.log(limiteTarea.val()); 
        // console.log(importanteTarea); 
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
	$("textarea").on("change", function() {
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
        // console.log(completedTarea); 
        // console.log(nombreTarea.val()); 
        // console.log(detailsTarea.val()); 
        // console.log(rewardTarea.val()); 
        // console.log(limiteTarea.val()); 
        // console.log(importanteTarea); 
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
		data: "user=" + encodeURIComponent(user) + "&passwd=" + encodeURIComponent(passwd)  + "&nocache=" + Math.random(),
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