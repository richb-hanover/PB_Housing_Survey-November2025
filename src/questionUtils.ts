/**
 * Utilities for making questions and charts
 */
import { tableize, summarizeResponseArray, type SortBy } from "./utils";
import { makeChart, type ChartDisplayType } from "./chartjs-utils";
import type { SurveyResponse, ResponseStringKey } from "./data/responseTypes";
import { questions } from "./data/questions";

type QuestionType = "chart" | "responses" | "checkboxes";

/**
 * Utility functions for making questions and charts
 */

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
  console.log(`makeAQuestion: ${qNumber} ${qType} count: ${qCount}`);
  const listOfResponses = `
    <h3 id="q${qNumber}"></h3>
    <p><small><i>(<span id="r${qNumber}ct"></span> responses)</i></small></p>
    <div class="col-10 table-wrapper-scroll-y my-custom-scrollbar">
      <table id="r${qNumber}t" class="table table-bordered table-striped mb-0"></table>
    </div>
    `;

  const listOfCharts = `
    <h3 id="q${qNumber}"></h3>
    <p><small><i>(<span id="r${qNumber}ct"></span> responses)</i></small></p>
    <div class="survey-block__charts"></div>
    `;

  const surveyBlockChart = (chartID: string) => `
    <div class="survey-block__chart">
      <div id="r${chartID}-title" class="survey-block__chart-title"></div>

      <div class="survey-block__chart-canvas">
        <canvas id="r${chartID}"></canvas>
      </div>
    </div>
    `;

  const home = document.getElementById("home");
  if (!home) {
    throw new Error("Home container not found");
  }
  // responses get the "listOfResponses", charts get "listOfCharts"
  const replacementHTML =
    qType === "responses" ? listOfResponses : listOfCharts;

  // create a <div> for the question body and add it to the page
  const block = document.createElement("div");
  block.className = "survey-block";
  block.id = `r${qNumber}`;
  block.innerHTML = replacementHTML;
  home.appendChild(block);

  // create all the charts needed
  const chartContainer = block.querySelector(".survey-block__charts");
  if ((qType === "chart" || qType === "checkboxes") && qCount > 0) {
    if (chartContainer) {
      for (let idx = 1; idx <= qCount; idx += 1) {
        const chartID = `${qNumber}-${idx}`;
        chartContainer.insertAdjacentHTML(
          "beforeend",
          surveyBlockChart(chartID),
        );
      }
    }
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
 * @param {*} responseSet - the full set (array) of responses
 * @param {*} heading of the column to extract from the set
 * @param {*} div to hold the data
 * @param {*} type of chart ("pie", "bar")
 * @param {*} title shown above the chart
 */

export function makeAChart(
  responseSet: SurveyResponse[],
  rNumber: number,
  rSub: number,
  heading: ResponseStringKey,
  type: ChartDisplayType,
  title: string,
  toStrip = "",
  minCount = 0,
  sortBy: SortBy = "label",
) {
  const surveyTextAnswers = (rID: string) => {
    return `<h5>Other responses to this question:</h5> <br /> 
      <p><small><i>(<span id=${rID}ct></span> responses)</i></small></p>

    <div class="col-10 table-wrapper-scroll-y my-custom-scrollbar">
      <table id=${rID}t class="table table-bordered table-striped mb-0"></table>
    </div>`;
  };

  const [labels, counts] = summarizeResponseArray(
    responseSet,
    heading,
    type,
    toStrip,
    minCount,
    sortBy,
  );
  const div = `r${rNumber}-${rSub}`;
  makeChart(div, type, labels, counts, title);

  const labelCounts = counts.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  const responses = responseSet.filter((item) =>
    Object.prototype.hasOwnProperty.call(item, heading),
  );
  const responseCount = responses.length;

  let totalCounts = labelCounts;
  if (type === "checkboxes") {
    totalCounts = responseCount;
  }

  const ctDiv = `r${rNumber}ct`;
  // if this is the first question, fill in the count
  if (rSub === 1) {
    const countEl = document.getElementById(ctDiv);

    if (countEl) {
      countEl.innerHTML = String(totalCounts);
    }
  }
  if (div === "r8-1") {
    console.log(`working on q8`);
    console.log(`labels: ${labels.length}`);
  }
  const otherResponses = filterResponsesByExclusions(
    responseSet,
    heading,
    labels,
    toStrip,
  );
  if (otherResponses.length > 0) {
    console.log(`otherResponses > 0: ${div} ${otherResponses.length} `);
    console.log(`labels: ${labels}`);
    // append free-text responses to the question
    const textDiv = `r${rNumber}-${rSub}`;
    if (type === "checkboxes") {
      const tBlock = document.createElement("div");
      tBlock.innerHTML = surveyTextAnswers(textDiv); // creates "r#t"
      const existing = document.getElementById(div);
      const parent =
        existing?.parentElement?.parentElement?.parentElement?.parentElement;
      try {
        parent!.appendChild(tBlock);
      } catch {
        alert(`No parent for ${div}`);
      }
    }
    console.log(`calling tableize: ${textDiv}`);
    tableize(otherResponses, heading, textDiv);
  }
}

/**
 * Return responses whose string "prop" is not in the exclusion list, after
 * removing any optional substring provided via toStrip.
 */
export function filterResponsesByExclusions(
  responses: SurveyResponse[],
  prop: ResponseStringKey,
  exclusions: string[],
  toStrip = "",
): SurveyResponse[] {
  if (!responses.length) {
    return [];
  }

  const exclusionSet = new Set(
    exclusions.map((entry) => entry.trim()).filter((entry) => entry.length > 0),
  );

  return responses
    .map((response) => {
      const value = response[prop] ?? "";
      if (!value) {
        return null;
      }

      const filteredValues = value
        .split(",")
        .map((item) => item.trim())
        .map((item) => item.replace(toStrip, "").trim())
        .map((item) => item.replace(/\s*District$/i, "").trim())
        .filter((item) => item.length > 0 && !exclusionSet.has(item));

      if (!filteredValues.length) {
        return null;
      }

      return {
        ...response,
        [prop]: filteredValues.join(", "),
      };
    })
    .filter((response): response is SurveyResponse => response !== null);
}
