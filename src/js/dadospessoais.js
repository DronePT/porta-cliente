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
    if ($(window).width() <= mobileBreakdown) {
      $("#collapseManutencao").collapse("hide");
    }
  });
})($);
