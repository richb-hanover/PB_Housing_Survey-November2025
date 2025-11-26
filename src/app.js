/**
 * Javascript for the LCDC Questionnaire summary page
 * April 2019 - reb
 */
import Chart from "chart.js/auto";
import {
  tableize,
  barChart,
  formatIndividualResponse,
  summarizeResponseArray,
} from "./utils.js";
import { makeChart } from "./chartjs-utils.js";
import { responses } from "./data/responses.js";
import { questions } from "./data/questions.js";

/**
 * Beginning of main routine
 */
// console.log(`Chart version: ${Chart.version}`);

// copy the questions array to the respective <h3>'s
let id = "";
for (let i = 1; i <= 10; i++) {
  id = "q" + i;
  document.getElementById(id).innerHTML = questions[i];
}

let [labels, counts] = summarizeResponseArray(responses, "1. Rate of increase");
// console.log(
//   `Q1 responses: ${JSON.stringify(labels)} ${JSON.stringify(counts)}`
// );

makeChart("r1", "pie", labels, counts, "Rate of Growth");
// pieChart(responses, "View", ["2 new units/year", "No"], "2");
barChart(
  responses,
  "Muni",
  [
    "N/A",
    "Very unsatisfied",
    "Unsatisfied",
    "Neutral",
    "Satisfied",
    "Very Satisfied",
  ],
  "6"
);
barChart(
  responses,
  "School",
  [
    "N/A",
    "Very unsatisfied",
    "Unsatisfied",
    "Neutral",
    "Satisfied",
    "Very Satisfied",
  ],
  "7"
);
barChart(
  responses,
  "Taxes",
  ["N/A", "Too low", "About right", "Too high"],
  "8",
  "Taxes"
);

tableize(responses, "Takeaway", "3");
tableize(responses, "Like", "4");
tableize(responses, "Change", "5");
tableize(responses, "How-address", "9");
tableize(responses, "Other", "10");

/**
 * Beginning of main routine for the individual responses
 */
document.getElementById("ct").innerHTML = responses.length;

var tbody = responses
  .map(function (x) {
    return formatIndividualResponse(x);
  })
  .map(function (x) {
    return "<tr><td>" + x + "</td></tr>";
  });

document.getElementById("resps").innerHTML = "<tbody>" + tbody + "</tbody>";
