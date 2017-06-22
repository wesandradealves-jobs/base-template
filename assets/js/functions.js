jQuery(document).ready(function () {
    $(window).scroll(function(event) {
        $("").each(function(i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("animate"); 
            }
            //  else {
            //     el.removeClass("animate"); 
            // }
        });
    });  
});

function mobileNavigation() {
    $("#mobileNavigation").toggleClass("toggle");
}

$(window).resize(function(){
    $(".toggle").removeClass("toggle");
    $(".tcon-transform").removeClass("tcon-transform");
});
