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
            size: "68%"
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
    chartLeitura.render();
  });
})($);