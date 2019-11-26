"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

  var rangeScale = function rangeScale(value, _ref, _ref2) {
    var _ref3 = _slicedToArray(_ref, 2),
        inputStart = _ref3[0],
        inputEnd = _ref3[1];

    var _ref4 = _slicedToArray(_ref2, 2),
        outputStart = _ref4[0],
        outputEnd = _ref4[1];

    var factor = (outputEnd - outputStart) / (inputEnd - inputStart);
    return outputStart + factor * (value - inputStart);
  };

  $(window).ready(function () {
    $(".widget-news").each(function () {
      var $el = $(this);
      if (!$el.data("bg")) return;
      var bgImage = "linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, .7)), url(".concat($el.data("bg"), ")");
      $el.css("background-image", bgImage);
    });
    /**
     * Build Charts
     */

    var $chart = $("#chart-consumos");
    var seriesData = String($chart.data("values") || "").split(",").map(function (v) {
      return parseFloat(v);
    });
    var xAxisCategories = $chart.data("labels").split(",");
    var optionsConsumos = {
      chart: {
        height: 250,
        type: "line",
        fontFamily: "Roboto",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: 3,
        colors: ["#0075c9"]
      },
      series: [{
        name: "Consumos",
        data: seriesData
      }],
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      xaxis: {
        categories: xAxisCategories
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      markers: {
        size: 5,
        hover: {
          size: 7,
          sizeOffset: 3
        }
      }
    };
    var chart = new ApexCharts($chart[0], optionsConsumos);
    chart.render(); // Chart Ultima Leitura

    var $chartLeitura = $("#chart-leitura");
    var leituraSeriesData = String($chartLeitura.data("values") || "").split(",").map(function (v) {
      return parseFloat(v);
    });
    var optionsLeitura = {
      chart: {
        height: 230,
        parentHeightOffset: 0,
        type: "radialBar"
      },
      colors: ["#0075c9"],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "58%"
          },
          dataLabels: {
            show: false,
            name: {
              fontSize: "28px",
              fontFamily: "Roboto",
              color: "#252d34"
            },
            value: {
              show: false
            },
            total: {
              show: false
            }
          },
          track: {
            background: "#e9ebea"
          }
        }
      },
      series: leituraSeriesData
    };
    var chartLeitura = new ApexCharts($chartLeitura[0], optionsLeitura);
    chartLeitura.render(); // map 0-100 percentage to -86 to 260 degrees
    // and rotate the circle

    var $circle = $(".cl-circle");
    var circleDegree = rangeScale($circle.data("value"), [0, 100], [-86, 270]);
    var circleColor = $circle.data("color") || "white";
    $circle.css("transform", "rotateZ(" + circleDegree + "deg) translateX(50%)");
    $circle.find(".cl-circle-dot").css("background-color", circleColor);
  });
})($);