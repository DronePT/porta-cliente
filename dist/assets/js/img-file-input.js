"use strict";

(function ($) {
  $.fn.imageFileInput = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var settings = $.extend({}, options);
    /**
     * @param {JQuery<HTMLElement>} $el
     */

    var findOrCreateInput = function findOrCreateInput($el) {
      var $input = $el.find('input[type="file"]');

      if (!$input.length) {
        $input = $('<input type="file">').attr("name", $el.data("input-name") || "imageFile");
        $el.append($input);
      }

      $input.attr("accept", "image/*");
      $input.css({
        position: "absolute",
        width: "1px",
        height: "1px",
        top: "-1000px"
      });
      return $input;
    };
    /**
     * @param {Event} e
     */


    var stopPropagation = function stopPropagation(e) {
      e.stopPropagation();
    };
    /**
     * @param {JQuery<HTMLElement>} $preview
     */


    var setImagePreview = function setImagePreview($preview, src, name) {
      var img = new Image();
      img.src = src;
      $preview.find(".label").text("A carregar...");
      $preview.find(".size").text("");

      img.onload = function () {
        // update images size
        $preview.find(".size").text("(".concat(img.width, "x").concat(img.height, ")"));
        $preview.css({
          backgroundImage: "linear-gradient(to bottom, rgba(0, 40, 85, .65), rgba(0, 40, 85, .85)), url(".concat(src, ")"),
          backgroundSize: "cover, cover"
        }).addClass("has-file"); // update label with file name

        $preview.find(".label").text(name);
      };
    };
    /**
     * @param {JQuery<HTMLElement>} $input
     * @param {JQuery<HTMLElement>} $preview
     */


    var handleInputChange = function handleInputChange($input, $preview) {
      return function () {
        /** @type {FileList} */
        var files = $input[0].files;

        if (files && files[0] && files[0].type.indexOf("image") > -1) {
          var reader = new FileReader();

          reader.onload = function (e) {
            var img = new Image();
            img.src = e.target.result;

            img.onload = function () {
              setImagePreview($preview, e.target.result, files[0].name);
            };
          };

          reader.readAsDataURL(files[0]);
        }
      };
    };

    return this.each(function () {
      var $el = $(this);
      var $size = $el.find(".size");
      var $label = $el.find(".label");
      $label.data("label", $label.text());
      $size.data("label", $size.text()); // find or create input file

      var $input = findOrCreateInput($el); // fix max call size bug

      $input.on("click", stopPropagation).on("change", handleInputChange($input, $el)); // open file input on click

      $el.on("click", function () {
        // check if there is a selected file already
        // if so remove and reset everything
        if ($input[0].files.length) {
          $input[0].value = "";
          $el.css({
            backgroundImage: "none"
          }).removeClass("has-file"); // update size label

          $size.text($size.data("label") || ""); // update label with default one

          $label.text($label.data("label") || "Adicionar imagem");
          return;
        }

        $input.trigger("click");
      });

      if ($el.data("src")) {
        setImagePreview($el, $el.data("src"), $el.data("name") || "");
      }
    });
  };

  $(window).ready(function () {
    $(".img-file-input").imageFileInput();
  });
})(jQuery);