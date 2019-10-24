"use strict";

(function (window, document, $) {
  /**
   * Update single form input classes
   * @param {JQuery<HTMLElement>} $input
   */
  var setInputClasses = function setInputClasses($input, event) {
    var $parent = $input.parent();

    if ($input.val().trim().length < 1) {
      $parent.addClass("is-empty");
    } else {
      $parent.removeClass("is-empty");
    }

    if ($input.attr("disabled")) {
      $parent.addClass("is-disabled");
    } else {
      $parent.removeClass("is-disabled");
    }

    switch (event) {
      case "focus":
        $parent.addClass("is-focus");
        break;

      case "blur":
        $parent.removeClass("is-focus");
        break;
    }
  };

  $.fn.gascanForms = function () {
    this.each(function () {
      var $el = $(this);
      var $formInputs = $el.find(".form-group .form-control"); // iterate every gascan-forms inputs and assign required classes

      $.each($formInputs, function (index, element) {
        var $input = $(element);
        setInputClasses($input);
        $input.on("change", function () {
          setInputClasses($input, "input");
        });
        $input.on("input", function () {
          setInputClasses($input, "input");
        });
        $input.on("focus", function () {
          setInputClasses($input, "focus");
        });
        $input.on("blur", function () {
          setInputClasses($input, "blur");
        });
      });
    });
  };

  $(window).ready(function () {
    $(".gascan-forms").gascanForms();
  });
})(window, document, jQuery);