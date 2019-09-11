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
    $(".backoffice-header .user").on("dragstart", function (e) {
      e.preventDefault();
      return false;
    }); // fix navigation height

    var fixNavigationHeight = debounce(function () {
      var $nav = $(".backoffice-navigation-container");
      var $window = $("body");

      if ($nav.height() < $window.height()) {
        $nav.css("height", $window.height());
      }
    }, 150);
    fixNavigationHeight();
    $(window).on("resize", fixNavigationHeight); // toggle main navigation when in mobile view

    $(".main-nav-toggle").on("click", function (event) {
      event.preventDefault();
      var $navContainer = $(".backoffice-navigation-container");

      if ($navContainer.hasClass("show")) {
        $navContainer.removeClass("show");
        return;
      }

      $navContainer.addClass("show");
    });
  });
})($);