// import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);
Chart.register(ChartDataLabels);

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

export function makeChart(id, type, labels, data, title) {
  const canvas = document.getElementById(id);
  if (!canvas) {
    throw new Error(`Chart container "${id}" not found`);
  }

  // set the title above the chart
  const titleEl = document.getElementById(`${id}-title`);
  if (titleEl && title) {
    titleEl.textContent = title;
  }

  new Chart(canvas, {
    type,
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: CHART_COLORS.slice(0, labels.length),
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
          align: "center",
          labels: {
            boxWidth: 20,
          },
        },
        legendTitle: {
          text: title,
          font: "bold 18px sans-serif",
          color: "#111",
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
        padding: 0,
      },
    },
  });
}
