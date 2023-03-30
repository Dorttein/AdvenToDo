$(document).ready(function () {
    $("body").addClass("home_is_visible");

    $(".button").on("click", function () {
    $("body").toggleClass("nav_is_visible");
    });

    function removeClasses() {
    $(".menu ul li").each(function () {
        var link = $(this).find("a").attr("href");
        $("body").removeClass(link);
    });
    }
    $(".menu a").on("click", function (e) {
    e.preventDefault();
    removeClasses();
    var link = $(this).attr("href");
    $("body").addClass(link);
    $("body").removeClass("nav_is_visible");
    });
});


