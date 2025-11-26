/**
 * Javascript for the LCDC Questionnaire summary page
 * April 2019 - reb
 */
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
// let id = "";
// let i = 1;
// questions.forEach((q) => {
//   id = "q" + String(i);
//   document.getElementById(id).innerHTML = q;
//   i += 1;
// });

/**
 * makeAQuestion()
 * @param string - QuestionID
 * @param string - question type ("chart", "responses")
 * @param count - count of elements to display (# pie/bar charts)
 */
function makeAQuestion(qNumber, qType, qCount) {
  const listOfResponses = `
  <h3 id="q${qNumber}"></h3>
  <p><small><i>(<span id="ct9"></span> responses)</i></small></p>
  <div class="col-10 table-wrapper-scroll-y my-custom-scrollbar">
    <table id="r${qNumber}" class="table table-bordered table-striped mb-0"></table>
  </div>
`;
  const listOfCharts = `
  <h3 id="q${qNumber}"></h3>
  <p><small><i>(<span id="ct${qNumber}"></span> responses)</i></small></p>
  <div class="survey-block__charts">
    <div class="survey-block__chart">
      <div id="r5${qNumber}-title" class="survey-block__chart-title"></div>
      <div class="survey-block__chart-canvas">
        <canvas id="r${qNumber}"></canvas>
      </div>
    </div>
   </div>
   <div>
`;
  const replacementHTML = qType == "responses" ? listOfResponses : listOfCharts;
  const home = document.getElementById("home");
  const block = document.createElement("div");
  block.className = "survey-block";
  block.innerHTML = replacementHTML;
  home.appendChild(block);
  const qID = "q" + String(qNumber);
  console.log(`qID: ${qID}`);
  document.getElementById(qID).innerHTML = questions[qNumber - 1];
}

/**
 * makeAChart() summarize the responses into the indicated <div> as a pie chart
 * @param {*} responses
 * @param {*} heading of the column to extract from the CSV
 * @param {*} div to hold the data
 * @param {*} type of chart ("pie", "bar")
 * @param {*} title shown above the chart
 */

function makeAChart(
  responses,
  heading,
  div,
  type,
  title,
  toStrip,
  minCount,
  sortBy
) {
  let [labels, counts] = summarizeResponseArray(
    responses,
    heading,
    type,
    toStrip,
    minCount,
    sortBy
  );
  // console.log(`labels in makeAChart(): ${labels}, toStrip: ${toStrip}`);
  makeChart(div, type, labels, counts, title);
}

/**
 * THE GOOD STUFF...
 */
// Question 1
makeAChart(responses, "1. Rate of increase", "r1", "pie", "Rate of Growth", "");

// Question 2
makeAChart(responses, "2. Duplexes", "r2a", "pie", "Duplexes", "");
makeAChart(responses, "2. 3-6 units", "r2b", "pie", "3 to 6 Units", "");
makeAChart(responses, "2. 7 to 15 units", "r2c", "pie", "7 to 15 Units", "");

// Question 3

makeAChart(responses, "3. Attainable", "r3a", "pie", "Attainable", "");
makeAChart(responses, "3. Affordable", "r3b", "pie", "Affordable", "");

// Question 4
tableize(responses, "4. Att-Aff Explanation", "4");

// Question 5
makeAChart(responses, "5. Lyme Common", "r5a", "bar", "Lyme Common", "");
makeAChart(responses, "5. Lyme Center", "r5b", "bar", "Lyme Center", "");
makeAChart(responses, "5. Commercial", "r5c", "bar", "Commercial", "");
makeAChart(responses, "5. Rural", "r5d", "bar", "Rural", "");
makeAChart(responses, "5. East Lyme", "r5e", "bar", "East Lyme", "");
makeAChart(responses, "5. Holts Ledge", "r5f", "bar", "Holts Ledge", "");
makeAChart(responses, "5. Mtn & Forest", "r5g", "bar", "Mountain & Forest", "");
makeAChart(
  responses,
  "5. Wherever SF units",
  "r5h",
  "bar",
  "Where single family allowed"
);
makeAChart(responses, "5. Nowhere", "r5i", "bar", "Nowhere", "");

// Question 6
tableize(responses, "6. Other explanation", "6");

// Question 7
makeAQuestion(7, "chart", 2);
makeAChart(
  responses,
  "7. Housing in Commercial",
  "r7",
  "checkboxes",
  "Commercial housing types",
  "in a building"
);

// Question 8
makeAQuestion(8, "chart", 2);
makeAChart(
  responses,
  "8. Multi-unit districs",
  "r8",
  "checkboxes",
  "Districts for multi-unit",
  "District",
  2,
  "value"
);

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
