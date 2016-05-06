// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
    
}());

(function($) {

    var fitVideo = function() {
        $(".video, .tm-vid, .jspdx-video").fitVids();
        $(".entry-content").fitVids();
    };

    var navToggleAnimate = function(){
        transformicons.add('.tcon');
    };

    // Place any jQuery/helper plugins in here.
    $(document).ready(function( $ ) {
        fitVideo();
        navToggleAnimate();
    });

    $(window).load(function( $ ) {
    });

    $(window).resize(function() {
    });

    $(window).scroll(function() {
    });

})(jQuery);
