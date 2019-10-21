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

  const rangeScale = (value, [inputStart, inputEnd], [outputStart, outputEnd]) => {
    const factor = (outputEnd - outputStart) / (inputEnd - inputStart);
    return outputStart + factor * (value - inputStart);
  };

  $(window).ready(() => {
    $(".widget-news").each(function() {
      const $el = $(this);

      if (!$el.data("bg")) return;

      const bgImage = `linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, .7)), url(${$el.data("bg")})`;

      $el.css("background-image", bgImage);
    });

    /**
     * Build Charts
     */
    const $chart = $("#chart-consumos");

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

    // Chart Ultima Leitura
    const $chartLeitura = $("#chart-leitura");

    const leituraSeriesData = String($chartLeitura.data("values") || "")
      .split(",")
      .map(v => parseFloat(v));

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

    chartLeitura.render();

    // map 0-100 percentage to -86 to 260 degrees
    // and rotate the circle
    const $circle = $(".cl-circle");
    const circleDegree = rangeScale($circle.data("value"), [0, 100], [-86, 270]);
    const circleColor = $circle.data("color") || "white";

    $circle.css("transform", "rotateZ(" + circleDegree + "deg) translateX(50%)");
    $circle.find(".cl-circle-dot").css("background-color", circleColor);
  });
})($);
