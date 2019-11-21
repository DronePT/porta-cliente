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
    const mobile = 1024;

    // fix error page for mobile
    const fixErrorPage = debounce(function() {
      const $page = $(".backoffice-content.error-page");
      const $window = $(window);
      const $header = $('.backoffice-header');
      const $headerMobile = $('.backoffice-header-mobile');

      const isMobile = $window.width() <= mobile;

      if (isMobile) {
        $page.height($window.height() - $headerMobile.height());
      } else {
        $page.height(`calc(100% - ${$header.height()}px)`)
      }
    }, 150);

    fixErrorPage();

    $(window).on("resize", fixErrorPage);
  });
})($);
