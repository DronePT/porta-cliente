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
    $(".widget-news").each(function () {
      var $el = $(this);
      if (!$el.data("bg")) return; //

      var bgImage = "linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, .7)), url(".concat($el.data("bg"), ")");
      $el.css("background-image", bgImage);
    });
  });
})($);