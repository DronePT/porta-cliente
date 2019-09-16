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
    if ($(window).width() <= mobileBreakdown) {
      $("#collapseHistorico").collapse("hide");
    }
    /**
     * Build Charts
     */


    var buildCharts = function buildCharts() {
      var $chart = $("#chart-consumos");
      if (!$chart.length) return;
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
      chart.render();
    };

    buildCharts();
  });
})($);