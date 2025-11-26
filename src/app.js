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
let i = 1;
questions.forEach((q) => {
  id = "q" + String(i);
  document.getElementById(id).innerHTML = q;
  i += 1;
});
// for (let i = 1; i <= 10; i++) {
//   id = "q" + i;
//   document.getElementById(id).innerHTML = questions[i];
// }
/**
 * makePieChart() summarize the responses into the indicated <div> as a pie chart
 * @param {*} responses
 * @param {*} heading
 * @param {*} div
 * @param {*} type
 * @param {*} title
 */
function makePieChart(responses, heading, div, type, title) {
  let [labels, counts] = summarizeResponseArray(responses, heading);
  makeChart(div, type, labels, counts, title);
}

// Question 1
makePieChart(responses, "1. Rate of increase", "r1", "pie", "Rate of Growth");

// Question 2
makePieChart(responses, "2. Duplexes", "r2a", "pie", "Duplexes");
makePieChart(responses, "2. 3-6 units", "r2b", "pie", "3 to 6 Units");
makePieChart(responses, "2. 7 to 15 units", "r2c", "pie", "7 to 15 Units");

// Question 3

makePieChart(responses, "3. Attainable", "r3a", "pie", "Attainable");
makePieChart(responses, "3. Affordable", "r3b", "pie", "Affordable");

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
