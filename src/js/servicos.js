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
    $("[data-bg]").each(function() {
      const $el = $(this);

      if (!$el.data("bg")) return;

      const bgImage = `linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, .7)), url(${$el.data("bg")})`;

      $el.css("background-image", bgImage);
    });
  });
})($);
