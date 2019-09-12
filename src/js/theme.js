(function($) {
  const debounce = (func, delay) => {
    let inDebounce;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  };

  $(window).ready(() => {
    $(".backoffice-header .user").on("dragstart", function(e) {
      e.preventDefault();

      return false;
    });

    // fix navigation height
    const fixNavigationHeight = debounce(function() {
      const $nav = $(".backoffice-navigation-container");
      const $window = $(window);
      const $body = $("body");

      const newHeight = $window.height() > $body.height() ? $window.height() : $body.height();

      if ($nav.height() < newHeight) {
        $nav.css("height", newHeight);
      }
    }, 150);

    fixNavigationHeight();

    $(window).on("resize", fixNavigationHeight);

    // toggle main navigation when in mobile view
    $(".main-nav-toggle").on("click", function(event) {
      event.preventDefault();

      const $navContainer = $(".backoffice-navigation-container");

      if ($navContainer.hasClass("show")) {
        $navContainer.removeClass("show");
        return;
      }

      $navContainer.addClass("show");
    });
  });
})($);
