import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

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

// one-time initialization of the "%" labels (pie charts)
// Chart.register(ChartDataLabels);

export function makeChart(id, type, labels, data, title) {
  const canvas = document.getElementById(id);
  if (!canvas) {
    throw new Error(`Chart container "${id}" not found`);
  }
  const { labels: sortedLabels, data: sortedData } = sortLabelsAndData(
    labels,
    data
  );
  // const sortedLabels = labels;
  // const sortedData = data;

  new Chart(canvas, {
    type,
    data: {
      labels: sortedLabels,
      datasets: [
        {
          data: sortedData,
          backgroundColor: CHART_COLORS.slice(0, sortedLabels.length),
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "right",
          align: "center",
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
        padding: 0,
      },
    },
  });
}

function sortLabelsAndData(labels, data) {
  return labels
    .map((label, i) => ({ label, value: data[i] }))
    .sort((a, b) => a.label.localeCompare(b.label))
    .reduce(
      (acc, item) => {
        acc.labels.push(item.label);
        acc.data.push(item.value);
        return acc;
      },
      { labels: [], data: [] }
    );
}
