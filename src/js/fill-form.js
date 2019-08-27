(function($) {
  $.fn.fillForm = function(options = {}) {
    const settings = $.extend(
      {
        propsFieldsMap: {},
        onClickHandler: _ => console.warn(_)
      },
      options
    );
    return this.each(function() {
      const $el = $(this);

      $el.on("click", ev => {
        ev.preventDefault();

        Object.entries(settings.propsFieldsMap).forEach(([prop, formElement]) => {
          const val = $el.data(prop);

          if (val) {
            const $formElement = $(formElement);

            if (!$formElement.length) {
              console.warn(`input "${formElement}" not found.`);
              return;
            }

            $formElement.val(val).trigger("input");
          } else {
            console.warn(`data-${prop}="" not found.`);
          }
        });

        settings.onClickHandler.call(this, ev);
      });
    });
  };
})(jQuery);
