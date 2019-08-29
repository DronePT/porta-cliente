"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(function ($) {
  $.fn.fillForm = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var settings = $.extend({
      propsFieldsMap: {},
      onClickHandler: function onClickHandler(_) {
        return console.warn(_);
      }
    }, options);
    return this.each(function () {
      var _this = this;

      var $el = $(this);
      $el.on("click", function (ev) {
        ev.preventDefault();
        Object.entries(settings.propsFieldsMap).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              prop = _ref2[0],
              formElement = _ref2[1];

          var val = $el.data(prop);

          if (val) {
            var $formElement = $(formElement);

            if (!$formElement.length) {
              console.warn("input \"".concat(formElement, "\" not found."));
              return;
            }

            $formElement.val(val).trigger("input");
          } else {
            console.warn("data-".concat(prop, "=\"\" not found."));
          }
        });
        settings.onClickHandler.call(_this, ev);
      });
    });
  };
})(jQuery);