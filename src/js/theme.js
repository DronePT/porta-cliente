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
      const $nav = $(".backoffice-navigation");
      const $window = $(window);

      if ($nav.height() < $window.height()) {
        $nav.css("height", $window.height());
      }
    }, 50);

    fixNavigationHeight();

    $(window).on("resize", fixNavigationHeight);
  });
})($);
