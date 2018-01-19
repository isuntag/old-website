$(document).ready(function() {
    $('body').removeClass('fade-out');
    $(".project").click(function(){
        window.open($(this).find("a:first").attr("href"), '_blank');
        return false;
    });
    var isTouchDevice = 'ontouchstart' in document.documentElement;
    if (isTouchDevice == false) {
        $('.scroll_button')
        .mouseover(function() {
            $(this).fadeTo('fast', 1)
        }).mouseout(function() {
            $(this).fadeTo('fast', 0.5)
        })
    }
    if (isTouchDevice == true) {
        $('.scroll_button').on('touchstart', function() {
            $(this).fadeTo('fast', 1)
        }).on('touchend', function() {
            $(this).fadeTo('fast', 0.5)
        })
    }
    $('.scroll_button').on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });
});
