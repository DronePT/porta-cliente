"use strict";

var mobileBreakdown = 1024;

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
      var $window = $(window);
      var $body = $("body");
      var newHeight = $window.height() > $body.height() ? $window.height() : $body.height();

      if ($nav.height() < newHeight) {
        $nav.css("height", newHeight);
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
    }); // toggle user navigation menu

    $(".user-nav-toggle").on("click", function (event) {
      event.preventDefault();
      var $menuContainer = $(".mobile-user-menu--container");

      if ($menuContainer.hasClass("show")) {
        $menuContainer.removeClass("show");
        return;
      }

      $menuContainer.addClass("show");
    });
  });
})($);