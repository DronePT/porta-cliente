(function(window, document, $) {
  function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : Date.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = Date.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  }

  $(window).ready(function() {
    var $window = $(window);
    var $widget = $(".side-widgets");

    var windowWidth;
    var widgetHeight;
    var lastScrollTop = 0;

    var diffRatio = 4;

    var isMobile = function() {
      return windowWidth <= 768;
    };

    var setScrollTop = function() {
      lastScrollTop = $window.scrollTop();
    };

    var setWindowWidth = throttle(function() {
      windowWidth = $window.outerWidth();
      widgetHeight = $widget.outerHeight();
    }, 150);

    setWindowWidth();

    var handleOnScroll = throttle(function() {
      if (!isMobile() || $(".side-widgets .is-open").length > 0) return;

      var currentScrollTop = $window.scrollTop();
      var currentBottom = parseInt($widget.css("bottom"));

      $widget.stop(true, true);

      var diff = 0 - (currentScrollTop - lastScrollTop || 1) * diffRatio;

      var newBottom = currentBottom + diff;

      $widget.animate(
        {
          bottom: newBottom > 0 ? 0 : newBottom < 0 - widgetHeight ? 0 - widgetHeight : newBottom
        },
        50
      );

      setScrollTop();
      // lastScrollTop = currentScrollTop;
    }, 50);

    $window.on("resize", setWindowWidth);
    $window.on("scroll", handleOnScroll);
    $window.on("mousedown pointerdown", setScrollTop);

    // remove all is-open classes
    function closeAllWidgets() {
      $(".sw-widget").removeClass("is-open");
      $("body").css("overflow", "auto");
    }

    $(".sw-close").on("click", function() {
      setTimeout(closeAllWidgets, 0);
    });

    $(".sw-widget").on("click", function() {
      closeAllWidgets();

      $widget.animate({ bottom: 0 }, 250);

      // open the clicked widget
      $(this).addClass("is-open");

      if (isMobile()) {
        $("body").css("overflow", "hidden");
      }
    });
  });
})(window, document, jQuery);
