"use strict";

(function ($) {
  $.fn.pagination = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var settings = $.extend({
      form: null,
      page: 1,
      numberOfButtons: 10,
      inputName: "PageNumber"
    }, options);
    return this.each(function () {
      var $form = $(settings.form || this);
      var $container = $(this);
      var pageInputName = $container.data("input-name") || settings.inputName;

      var updateFormAndSubmit = function updateFormAndSubmit(page) {
        var $input = $form.find("input[name=\"".concat(pageInputName, "\"]"));

        if (!$input.length) {
          $input = $('<input type="hidden">').attr("name", pageInputName);
          $form.append($input);
        }

        $input.attr("value", page).val(page); // submit form on next dom tick

        setTimeout(function () {
          $form.submit();
        }, 0);
      };

      var numberOfButtons = parseInt($container.data("number-of-buttons") || settings.numberOfButtons);
      var page = parseInt($container.data("page") || settings.page);
      var hasPrevious = $container.data("has-previous") && String($container.data("has-previous")) === "true";
      var hasNext = $container.data("has-next") && String($container.data("has-next")) === "true";
      var totalPages = parseInt($container.data("total-pages"));
      if (page > totalPages) page = totalPages; // if (numberOfButtons % 2 === 0) numberOfButtons -= 1;

      var $prevButton = $('<a href="#" />').addClass("btn btn-sm btn-circle btn-outline-primary").attr("data-value", page - 1).html('<img src="assets/img/icon_chevron_left.svg" alt="Página Anterior">').on("mouseenter", function () {
        $prevButton.html('<img src="assets/img/icon_chevron_left_white.svg" alt="Página Anterior">');
      }).on("mouseleave", function () {
        $prevButton.html('<img src="assets/img/icon_chevron_left.svg" alt="Página Anterior">');
      });
      var $nextButton = $('<a href="#" />').addClass("btn btn-sm btn-circle btn-outline-primary").attr("data-value", page + 1).html('<img src="assets/img/icon_chevron_right.svg" alt="Página Seguinte">').on("mouseenter", function () {
        $nextButton.html('<img src="assets/img/icon_chevron_right_white.svg" alt="Página Seguinte">');
      }).on("mouseleave", function () {
        $nextButton.html('<img src="assets/img/icon_chevron_right.svg" alt="Página Seguinte">');
      });
      if (!hasPrevious || page === 1) $prevButton.attr("disabled", true).addClass("disabled");
      if (!hasNext || page === totalPages) $nextButton.attr("disabled", true).addClass("disabled");
      var pages = [];
      var delta = Math.floor(numberOfButtons / 2);
      var start = Math.max(page - delta, 1);
      var end = Math.min(start + numberOfButtons, totalPages + 1);

      for (var i = Math.max(1, end - numberOfButtons); i < end; i += 1) {
        var $pageButton = $('<a href="#" />').addClass("btn btn-sm btn-circle").addClass(i === page ? "btn-primary" : "btn-outline-primary").attr("data-value", i).text(i);
        pages.push($pageButton);
      } // render pagination


      [$prevButton].concat(pages, [$nextButton]).forEach(function ($btn) {
        $btn.on("click", function (evt) {
          evt.preventDefault();
          updateFormAndSubmit($btn.data("value"));
        });
        $container.append($btn);
      });
    });
  };

  $(window).ready(function () {
    $("form.gc-table-pagination").pagination();
  });
})(jQuery);