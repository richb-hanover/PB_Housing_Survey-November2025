/**
 * Switching to use chart.js directly instead of mdbootstrap
 */

// Chart is loaded globally from the CDN in index.html

// A stable 12-color palette (visually distinct, color-blind-friendly)
const CHART_COLORS = [
  "#3366CC",
  "#DC3912",
  "#FF9900",
  "#109618",
  "#990099",
  "#3B3EAC",
  "#0099C6",
  "#DD4477",
  "#66AA00",
  "#B82E2E",
  "#316395",
  "#994499",
];

// one-time initialization of the "%" labels (pie charts)
// Chart.register(ChartDataLabels);

export function makeChart(id, type, labels, data) {
  new Chart(document.getElementById(id), {
    type,
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: CHART_COLORS.slice(0, labels.length),
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "right", // key line
          align: "center", // optional: top|center|bottom
          labels: {
            boxWidth: 20,
          },
        },
        datalabels: {
          color: "#fff",
          font: { weight: "bold" },
          formatter: (value, ctx) => {
            const total = ctx.chart.data.datasets[0].data.reduce(
              (a, b) => a + b,
              0
            );
            const pct = ((value / total) * 100).toFixed(1);
            return pct + "%";
          },
        },
      },
      layout: {
        padding: 10, // optional to give breathing room
      },
    },
  });
}

function randomColor() {
  return `hsl(${Math.random() * 360}, 70%, 60%)`;
}

// makeChart("chart1", "pie", ["Yes", "No"], [20, 80]);
