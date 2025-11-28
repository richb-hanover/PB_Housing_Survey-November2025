/**
 * Utilities for making questions and charts
 */
import { tableize, summarizeResponseArray, type SortBy } from "./utils";
import { makeChart, type ChartDisplayType } from "./chartjs-utils";
import type { SurveyResponse, ResponseStringKey } from "./data/responseTypes";
import { questions } from "./data/questions";

type QuestionType = "chart" | "responses" | "checkboxes";

/**
 * makeAQuestion()
 * @param string - QuestionID
 * @param string - question type ("chart", "responses")
 * @param count - count of elements to display (# pie/bar charts)
 */
export function makeAQuestion(
  qNumber: number,
  qType: QuestionType,
  qCount: number,
) {
  const listOfResponses = `
    <h3 id="q${qNumber}"></h3>
    <p><small><i>(<span id="ct${qNumber}"></span> responses)</i></small></p>
    `;
  // <div class="col-10 table-wrapper-scroll-y my-custom-scrollbar">
  //       <table id="r${qNumber}" class="table table-bordered table-striped mb-0"></table>
  //     </div>

  const listOfCharts = `
    <h3 id="q${qNumber}"></h3>
    <p><small><i>(<span id="ct${qNumber}"></span> responses)</i></small></p>
    <div class="survey-block__charts"> </div>
    `;
  const surveyBlockChart = (subq: number) => `
    <div class="survey-block__chart">
      <div id="r${qNumber}-${subq}-title" class="survey-block__chart-title"></div>

      <div class="survey-block__chart-canvas">
        <canvas id="r${qNumber}-${subq}"></canvas>
      </div>
    </div>
`;
  const surveyTextAnswers = (qNumber: number, subq: number) =>
    `<div class="col-10 table-wrapper-scroll-y my-custom-scrollbar">
    <table id="r${qNumber}-${subq}" class="table table-bordered table-striped mb-0"></table>
  </div>`;

  // responses get the "listOfResponses", charts get "listOfCharts"
  const replacementHTML =
    qType === "responses" ? listOfResponses : listOfCharts;
  const home = document.getElementById("home");
  if (!home) {
    throw new Error("Home container not found");
  }
  const block = document.createElement("div");
  block.className = "survey-block";
  block.innerHTML = replacementHTML;
  home.appendChild(block);
  const chartContainer = block.querySelector(".survey-block__charts");
  if ((qType === "chart" || qType === "checkboxes") && qCount > 0) {
    if (chartContainer) {
      for (let idx = 1; idx <= qCount; idx += 1) {
        chartContainer.insertAdjacentHTML("beforeend", surveyBlockChart(idx));
      }
    }
  }
  // append free-text responses to the question
  if (qType === "checkboxes" || qType == "responses") {
    const rBlock = document.createElement("div");
    rBlock.innerHTML = surveyTextAnswers(qNumber, 2);
    block.appendChild(rBlock);
  }
  const qID = `q${qNumber}`;
  const questionHeading = document.getElementById(qID);
  if (questionHeading) {
    questionHeading.innerHTML = questions[qNumber - 1] ?? "";
  } else {
    console.warn(`Question heading ${qID} not found`);
  }
}

/**
 * makeAChart() summarize the responses into the indicated <div> as a pie chart
 * @param {*} responses
 * @param {*} heading of the column to extract from the CSV
 * @param {*} div to hold the data
 * @param {*} type of chart ("pie", "bar")
 * @param {*} title shown above the chart
 */

export function makeAChart(
  responseSet: SurveyResponse[],
  heading: ResponseStringKey,
  div: string,
  type: ChartDisplayType,
  title: string,
  toStrip = "",
  minCount = 0,
  sortBy: SortBy = "label",
) {
  const [labels, counts] = summarizeResponseArray(
    responseSet,
    heading,
    type,
    toStrip,
    minCount,
    sortBy,
  );
  makeChart(div, type, labels, counts, title);
  const otherResponses = filterResponsesByExclusions(
    responseSet,
    heading,
    labels,
  );
  if (type == "checkboxes") {
    const otherResponses = filterResponsesByExclusions(
      responseSet,
      heading,
      labels,
    );
    tableize(otherResponses, heading, `r${div}-2`);
  }
}

/**
 * Return responses whose string "prop" is not in the exclusion list.
 */
export function filterResponsesByExclusions(
  responses: SurveyResponse[],
  prop: ResponseStringKey,
  exclusions: string[],
): SurveyResponse[] {
  if (!exclusions.length) {
    return responses.slice();
  }

  const exclusionSet = new Set(exclusions);
  return responses.filter((response) => {
    const value = response[prop] ?? "";
    return !exclusionSet.has(value);
  });
}
