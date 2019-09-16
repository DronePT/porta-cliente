(function($) {
  const debounce = (func, delay) => {
    let inDebounce;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  };

  $(window).ready(() => {
    if ($(window).width() <= mobileBreakdown) {
      $("#collapseHistorico").collapse("hide");
    }

    /**
     * Build Charts
     */
    const buildCharts = function() {
      const $chart = $("#chart-consumos");

      if (!$chart.length) return;

      const seriesData = String($chart.data("values") || "")
        .split(",")
        .map(v => parseFloat(v));

      const xAxisCategories = $chart.data("labels").split(",");

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
        series: [
          {
            name: "Consumos",
            data: seriesData
          }
        ],
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
