/*! jspdx_theme 1.0.0 plugins.js 2016-04-21 11:56:06 PM */
(function($) {
    "use strict";
    $.fn.fitVids = function(options) {
        var settings = {
            customSelector: null,
            ignore: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var head = document.head || document.getElementsByTagName("head")[0];
            var css = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}";
            var div = document.createElement("div");
            div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + "</style>";
            head.appendChild(div.childNodes[1]);
        }
        if (options) {
            $.extend(settings, options);
        }
        return this.each(function() {
            var selectors = [ "iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed" ];
            if (settings.customSelector) {
                selectors.push(settings.customSelector);
            }
            var ignoreList = ".fitvidsignore";
            if (settings.ignore) {
                ignoreList = ignoreList + ", " + settings.ignore;
            }
            var $allVideos = $(this).find(selectors.join(","));
            $allVideos = $allVideos.not("object object");
            $allVideos = $allVideos.not(ignoreList);
            $allVideos.each(function() {
                var $this = $(this);
                if ($this.parents(ignoreList).length > 0) {
                    return;
                }
                if (this.tagName.toLowerCase() === "embed" && $this.parent("object").length || $this.parent(".fluid-width-video-wrapper").length) {
                    return;
                }
                if (!$this.css("height") && !$this.css("width") && (isNaN($this.attr("height")) || isNaN($this.attr("width")))) {
                    $this.attr("height", 9);
                    $this.attr("width", 16);
                }
                var height = this.tagName.toLowerCase() === "object" || $this.attr("height") && !isNaN(parseInt($this.attr("height"), 10)) ? parseInt($this.attr("height"), 10) : $this.height(), width = !isNaN(parseInt($this.attr("width"), 10)) ? parseInt($this.attr("width"), 10) : $this.width(), aspectRatio = height / width;
                if (!$this.attr("id")) {
                    var videoID = "fitvid" + Math.floor(Math.random() * 999999);
                    $this.attr("id", videoID);
                }
                $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", aspectRatio * 100 + "%");
                $this.removeAttr("height").removeAttr("width");
            });
        });
    };
})(window.jQuery || window.Zepto);

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.transformicons = factory();
    }
})(this || window, function() {
    "use strict";
    var tcon = {}, _transformClass = "tcon-transform", DEFAULT_EVENTS = {
        transform: [ "click" ],
        revert: [ "click" ]
    };
    var getElementList = function(elements) {
        if (typeof elements === "string") {
            return Array.prototype.slice.call(document.querySelectorAll(elements));
        } else if (typeof elements === "undefined" || elements instanceof Array) {
            return elements;
        } else {
            return [ elements ];
        }
    };
    var getEventList = function(events) {
        if (typeof events === "string") {
            return events.toLowerCase().split(" ");
        } else {
            return events;
        }
    };
    var setListeners = function(elements, events, remove) {
        var method = (remove ? "remove" : "add") + "EventListener", elementList = getElementList(elements), currentElement = elementList.length, eventLists = {};
        for (var prop in DEFAULT_EVENTS) {
            eventLists[prop] = events && events[prop] ? getEventList(events[prop]) : DEFAULT_EVENTS[prop];
        }
        while (currentElement--) {
            for (var occasion in eventLists) {
                var currentEvent = eventLists[occasion].length;
                while (currentEvent--) {
                    elementList[currentElement][method](eventLists[occasion][currentEvent], handleEvent);
                }
            }
        }
    };
    var handleEvent = function(event) {
        tcon.toggle(event.currentTarget);
    };
    tcon.add = function(elements, events) {
        setListeners(elements, events);
        return tcon;
    };
    tcon.remove = function(elements, events) {
        setListeners(elements, events, true);
        return tcon;
    };
    tcon.transform = function(elements) {
        getElementList(elements).forEach(function(element) {
            element.classList.add(_transformClass);
        });
        return tcon;
    };
    tcon.revert = function(elements) {
        getElementList(elements).forEach(function(element) {
            element.classList.remove(_transformClass);
        });
        return tcon;
    };
    tcon.toggle = function(elements) {
        getElementList(elements).forEach(function(element) {
            tcon[element.classList.contains(_transformClass) ? "revert" : "transform"](element);
        });
        return tcon;
    };
    return tcon;
});

(function() {
    var method;
    var noop = function noop() {};
    var methods = [ "assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn" ];
    var length = methods.length;
    var console = window.console = window.console || {};
    while (length--) {
        method = methods[length];
        if (!console[method]) {
            console[method] = noop;
        }
    }
})();

(function($) {
    var fitVideo = function() {
        $(".video, .tm-vid, .jspdx-video").fitVids();
        $(".entry-content").fitVids();
    };
    var navToggleAnimate = function() {
        transformicons.add(".tcon");
    };
    $(document).ready(function($) {
        fitVideo();
        navToggleAnimate();
    });
    $(window).load(function($) {});
    $(window).resize(function() {});
    $(window).scroll(function() {});
})(jQuery);