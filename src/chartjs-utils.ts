import {
  Chart as ChartJS,
  ArcElement,
  BarController,
  BarElement,
  PieController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartConfiguration,
  ChartType,
} from "chart.js";
import ChartDataLabels, {
  Context as DataLabelsContext,
} from "chartjs-plugin-datalabels";

export type ChartDisplayType = "pie" | "bar" | "checkboxes";

ChartJS.register(
  ArcElement,
  BarController,
  BarElement,
  PieController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels,
);

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

export function makeChart(
  id: string,
  type: ChartDisplayType,
  labels: string[],
  data: number[],
  title?: string,
): void {
  const canvas = document.getElementById(id);
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error(`Chart container "${id}" not found`);
  }
  const resolvedType: ChartType = type === "checkboxes" ? "bar" : type;

  const config: ChartConfiguration<ChartType, number[], string> = {
    type: resolvedType,
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
      maintainAspectRatio: false,
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
          formatter: (value: number, ctx: DataLabelsContext) => {
            const dataset = ctx.chart.data.datasets[0];
            const points = (dataset?.data as number[]) ?? [];
            const total = points.reduce((sum, current) => sum + current, 0);
            if (!total) {
              return "0%";
            }
            const pct = ((value / total) * 100).toFixed(1);
            return `${pct}%`;
          },
        },
        title: {
          display: false,
          text: title ?? "",
        },
      },
      layout: {
        padding: 0,
      },
    },
  };

  if (type === "checkboxes" && config.options) {
    config.options.indexAxis = "y";
  }

  const titleEl = document.getElementById(`${id}-title`);
  if (titleEl && title) {
    titleEl.textContent = title;
  }

  new ChartJS(canvas, config);
}
