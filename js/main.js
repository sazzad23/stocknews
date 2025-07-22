
(function($) {
    $(document).ready(function(){
        //dropdown-menu on hover
        if ($(window).width() > 767) {
            $('li.dropdown').hover(function() {
                $(this).find('.dropdown-menu').stop(true, true).fadeIn();
            }, function() {
                $(this).find('.dropdown-menu').stop(true, true).fadeOut();
            });
        }

        AOS.init();
    });
})( jQuery );