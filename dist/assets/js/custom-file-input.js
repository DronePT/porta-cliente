"use strict";

(function ($) {
  /**
   * File input jQuery object
   * @param {JQuery<HTMLElement>} $input
   */
  var hideFileInput = function hideFileInput($input) {
    $input.css({
      position: "absolute",
      top: "-100px",
      width: "1px",
      height: "1px"
    });
  };
  /**
   * File input jQuery object
   * @param {JQuery<HTMLElement>} $input
   */


  var selectFile = function selectFile($input) {
    $input.trigger("click");
  };
  /**
   * @param {Event} e
   */


  var stopPropagation = function stopPropagation(e) {
    e.stopPropagation();
  };

  $.fn.gascanFileUpload = function () {
    this.each(function (i, e) {
      var $element = $(e);
      var $fileInput = $element.find("input");
      var $labelTarget = $($element.attr("data-selected-target"));
      /** @type {String} */

      var label = $element.attr("data-selected-label");
      hideFileInput($fileInput);
      $fileInput.on("click", stopPropagation);
      $fileInput.on("change", function (e) {
        if (!label) return;
        /** @type {FileList} */

        var files = $fileInput[0].files;
        var file = files.item(0);
        $labelTarget.text(label.replace("{name}", file.name));
      });
      $element.on("click", function (e) {
        selectFile($fileInput);
        return false;
      });
    });
    return this;
  };
})($);