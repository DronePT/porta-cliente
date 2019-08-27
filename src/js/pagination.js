(function($) {
  $.fn.pagination = function(options = {}) {
    const settings = $.extend(
      {
        form: null,
        page: 1,
        numberOfButtons: 10,
        inputName: "PageNumber"
      },
      options
    );

    return this.each(function() {
      const $form = $(settings.form || this);
      const $container = $(this);

      const pageInputName = $container.data("input-name") || settings.inputName;

      const updateFormAndSubmit = function(page) {
        let $input = $form.find(`input[name="${pageInputName}"]`);

        if (!$input.length) {
          $input = $('<input type="hidden">').attr("name", pageInputName);

          $form.append($input);
        }

        $input.attr("value", page).val(page);

        // submit form on next dom tick
        setTimeout(function() {
          $form.submit();
        }, 0);
      };

      let numberOfButtons = parseInt($container.data("number-of-buttons") || settings.numberOfButtons);
      let page = parseInt($container.data("page") || settings.page);
      let hasPrevious = $container.data("has-previous") && String($container.data("has-previous")) === "true";
      let hasNext = $container.data("has-next") && String($container.data("has-next")) === "true";

      const totalPages = parseInt($container.data("total-pages"));

      if (page > totalPages) page = totalPages;

      // if (numberOfButtons % 2 === 0) numberOfButtons -= 1;

      const $prevButton = $('<a href="#" />')
        .addClass("btn btn-sm btn-circle btn-outline-primary")
        .attr("data-value", page - 1)
        .html('<img src="assets/img/icon_chevron_left.svg" alt="Página Anterior">')
        .on("mouseenter", function() {
          $prevButton.html('<img src="assets/img/icon_chevron_left_white.svg" alt="Página Anterior">');
        })
        .on("mouseleave", function() {
          $prevButton.html('<img src="assets/img/icon_chevron_left.svg" alt="Página Anterior">');
        });

      const $nextButton = $('<a href="#" />')
        .addClass("btn btn-sm btn-circle btn-outline-primary")
        .attr("data-value", page + 1)
        .html('<img src="assets/img/icon_chevron_right.svg" alt="Página Seguinte">')
        .on("mouseenter", function() {
          $nextButton.html('<img src="assets/img/icon_chevron_right_white.svg" alt="Página Seguinte">');
        })
        .on("mouseleave", function() {
          $nextButton.html('<img src="assets/img/icon_chevron_right.svg" alt="Página Seguinte">');
        });

      if (!hasPrevious || page === 1) $prevButton.attr("disabled", true).addClass("disabled");
      if (!hasNext || page === totalPages) $nextButton.attr("disabled", true).addClass("disabled");

      const pages = [];

      const delta = Math.floor(numberOfButtons / 2);
      const start = Math.max(page - delta, 1);
      const end = Math.min(start + numberOfButtons, totalPages + 1);

      for (let i = Math.max(1, end - numberOfButtons); i < end; i += 1) {
        const $pageButton = $('<a href="#" />')
          .addClass("btn btn-sm btn-circle")
          .addClass(i === page ? "btn-primary" : "btn-outline-primary")
          .attr("data-value", i)
          .text(i);

        pages.push($pageButton);
      }

      // render pagination
      [$prevButton].concat(pages, [$nextButton]).forEach($btn => {
        $btn.on("click", function(evt) {
          evt.preventDefault();

          updateFormAndSubmit($btn.data("value"));
        });

        $container.append($btn);
      });
    });
  };

  $(window).ready(function() {
    $("form.gc-table-pagination").pagination();
  });
})(jQuery);
