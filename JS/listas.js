$(".show-front").click(function (e) { /* DA LA VUELTA AL PADRE Y AL HERMANO DEL PADRE AL PULSAR EL BOTON */
    /* DARLES LA VUELTA A LOS DOS DIV */
    $(e.target).parent("div").siblings("div").css("transform", "perspective( 2000px ) rotateY( 0deg )");
    $(e.target).parent("div").siblings("div").css("display", "flex");
    // $(e.target).parent("div").siblings("div").css("align-items", "start");
    $(e.target).parent("div").css("transform", "perspective( 2000px ) rotateY( 180deg )");

    /* MOVERLO AL CENTRO DE LA PANTALLA Y OSCURECER EL RESTO */
    $(e.target).parent("div").parent("div").css("width", "90vw"); // AFECTO AL BLOQUE GRIS. .lista
    $(e.target).parent("div").parent("div").css("position", "absolute");
    $(e.target).parent("div").parent("div").css("height", "70vh");
    $(e.target).parent("div").parent("div").css("margin-left", "-50%");
    $(e.target).parent("div").parent("div").css("z-index", "110");
    $(".fondoNegro").show();
});

$(".show-back").click(function (e) { 
    $(e.target).parent("div").css("transform", "perspective( 2000px ) rotateY( 180deg )");
    $(e.target).parent("div").css("display", "none");
    $(e.target).parent("div").siblings("div").css("transform", "perspective( 2000px ) rotateY( 0deg )");   

    $(e.target).parent("div").parent("div").css("position", "static");

    $(e.target).parent("div").parent("div").css("width", "");
    $(e.target).parent("div").parent("div").css("height", "");
    $(e.target).parent("div").parent("div").css("margin-left", "");
    $(e.target).parent("div").parent("div").css("z-index", "");
    $(".fondoNegro").hide();

});

