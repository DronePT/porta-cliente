"use strict";

(function ($) {
  var debounce = function debounce(func, delay) {
    var inDebounce;
    return function () {
      var context = this;
      var args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(function () {
        return func.apply(context, args);
      }, delay);
    };
  };

  $(window).ready(function () {
    var mobile = 1024; // fix error page for mobile

    var fixErrorPage = debounce(function () {
      var $page = $(".backoffice-content.error-page");
      var $window = $(window);
      var $header = $('.backoffice-header');
      var $headerMobile = $('.backoffice-header-mobile');
      var isMobile = $window.width() <= mobile;

      if (isMobile) {
        $page.height($window.height() - $headerMobile.height());
      } else {
        $page.height("calc(100% - ".concat($header.height(), "px)"));
      }
    }, 150);
    fixErrorPage();
    $(window).on("resize", fixErrorPage);
  });
})($);