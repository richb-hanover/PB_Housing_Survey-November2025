/**
 * Javascript for the LCDC Questionnaire summary page
 * Separating out utility functions
 */
import type { SurveyResponse, ResponseStringKey } from "./data/responseTypes";
import { makeChart, type ChartDisplayType } from "./chartjs-utils";

const satisfactionLabels = [
  "<i>No entry</i>",
  "Very unsatisfied",
  "Unsatisfied",
  "Neutral",
  "Satisfied",
  "Very satisfied",
] as const;

export type SortBy = "label" | "value";
type ResponseCount = Record<string, number>;

/**
 * tablerow(ary, prop)
 *
 * reduce function that creates text of a table ("<tbody> [<tr><td> stuff </td></tr> ]+ </tbody>")
 *  from the array.
 */
export function tablerow(accum: string, x: string): string {
  return `${accum}<tr><td>${x}</td></tr>\n`;
}

/**
 * tableize(array, propName, qID)
 * Create a table of the text responses for a question/propName
 * Add it to the page at qID
 * Also fill in the number of responses
 * @param ary - array of the objects that contain each response
 * @param prop - the particular prop to make into a table of text responses
 * @param qID - the question ID that receives the info
 * @returns void
 */
export function tableize(
  responses: SurveyResponse[],
  prop: ResponseStringKey,
  rID: string, // "r#" - id of element to receive the data
): void {
  if (!responses.length) {
    return;
  }

  console.log(
    `tabelize ${rID}: count: ${responses.length} prop: "${prop}" ${JSON.stringify(responses[0])}`,
  );
  let markup = "";

  if (responses[0][prop] === undefined) {
    markup = `Prop "${prop}" is missing in tablize`;
  } else {
    const formattedResponses = responses
      .map((entry) => ({ resp: entry[prop] ?? "", item: entry.Response }))
      .map((entry) => ({
        ...entry,
        resp: entry.resp.trim(),
      }))
      .filter((entry) => /\S/.test(entry.resp))
      .map((entry) => ({
        ...entry,
        resp: entry.resp.replace(/\n/g, "<br />"),
      }))
      .map(
        (entry) => `${entry.resp} <i>(Answer #${entry.item.toString()})</i>`,
      );

    const countEl = document.getElementById(`ct${rID}`);
    if (countEl) {
      countEl.textContent = formattedResponses.length.toString();
    }

    markup = formattedResponses.reduce(tablerow, "");
  }

  const tableEl = document.getElementById(`${rID}t`);
  if (tableEl) {
    tableEl.innerHTML = markup;
  }
}

/**
 * summarizeResponseArray()
 * - isolate the heading prop from each response
 * - split on "," if checkboxes
 * - replace ${toStrip} with ""
 * - Count the various occurrences
 * - Return two arrays, labels & counts, sorted by labels
 */
export function summarizeResponseArray(
  responses: SurveyResponse[],
  heading: ResponseStringKey,
  type: ChartDisplayType,
  toStrip = "",
  minCount = 0,
  sortBy: SortBy = "label",
): [string[], number[]] {
  const labels = cleanupLabels(responses, heading, type, toStrip);
  // console.log(`Count of cleaned-up labels: ${labels.length}`);
  return alphabetizeCounts(labels, minCount, sortBy);
}
/**
 * cleanupLabels() - given the array of response objects,
 *    summarize the particular field's results and return
 *    two arrays: the labels, and the corresponding counts
 * @param array of responses
 * @param heading - the property to examine
 * @param type - If "checkboxes", split on ","
 * @param toStrip - string to remove from labels
 * @returns array of labels
 */

export function cleanupLabels(
  responses: SurveyResponse[],
  heading: ResponseStringKey,
  type: ChartDisplayType,
  toStrip = "",
): string[] {
  const labels: string[] = [];
  const allResponses: string[] = [];

  responses.forEach((item) => {
    const value = item[heading] ?? "";
    if (type !== "checkboxes") {
      allResponses.push(value);
    } else {
      const pieces = value.split(",");
      allResponses.push(...pieces);
    }
  });

  allResponses.forEach((item) => {
    let val = item.replace(toStrip, "").trim();
    if (val) {
      labels.push(val);
    }
  });

  return labels;
}

/**
 * alphabetizeCounts(values, minCount)
 * @param values string[]
 * @param minCount minimum count threshold to keep in main arrays
 * @returns [labels string[], counts number[], other {label,count}[]]
 */
export function alphabetizeCounts(
  values: string[],
  minCount = 0,
  col: SortBy = "label",
): [string[], number[]] {
  const frequency = new Map<string, number>();
  values.forEach((value) => {
    frequency.set(value, (frequency.get(value) || 0) + 1);
  });

  const sorted = Array.from(frequency.entries());
  sorted.sort((a, b) => {
    if (col === "value") {
      return b[1] - a[1];
    }
    return b[0].localeCompare(a[0]);
  });

  const labels: string[] = [];
  const counts: number[] = [];

  sorted.forEach(([label, count]) => {
    if (count > minCount) {
      labels.push(label);
      counts.push(count);
    }
  });

  // console.log(
  //   `Return from alphabetize: Counts: ${labels.length} ${counts.length}\n
  //     labels=${JSON.stringify(labels)}\n
  //     counts=${JSON.stringify(counts)}`,
  // );
  return [labels, counts];
}

/**
 * countResponses
 * @param accum
 * @param x
 * Return an object whose props contain the number of times the prop occurs in the input array.
 */
export function countResponses(accum: ResponseCount, x: string): ResponseCount {
  if (accum[x] === undefined) {
    accum[x] = 0;
  }
  accum[x] += 1;
  return accum;
}
/**
 * summarizeResponses(ary, prop, init)
 * @ary array to summarize
 * @prop prop to summarize
 * @init starting value (sets all options to zero, to ensure they're shown)
 * Return an object with the total number of each kind of response
 */
export function summarizeResponses(
  ary: SurveyResponse[],
  prop: ResponseStringKey,
  labels: string[],
): ResponseCount {
  const zeroAry: ResponseCount = {};
  labels.forEach((label) => {
    zeroAry[label] = 0;
  });

  const retary = ary
    .map((entry) => entry[prop] ?? "")
    .map((value) => {
      if (value >= "1" && value <= "5") {
        const idx = Number(value);
        if (!Number.isNaN(idx) && labels[idx]) {
          return labels[idx];
        }
      }
      return value;
    })
    .map((value) => (value === "" ? "N/A" : value)) // Fix up empty string
    .map((value) => (value === null ? "N/A" : value)) // Fix up "null"
    .reduce<ResponseCount>(countResponses, zeroAry);

  return retary;
}

/**
 * pieChart - create a pie chart from the responses
 * @param ary
 * @param prop
 * @param textLabels
 * @param qID
 */
// export function pieChart(ary, prop, textLabels, qID) {
//   //pie
//   var ctxP = document.getElementById("r" + qID).getContext("2d");
//   var resps = summarizeResponses(ary, prop, textLabels);
//   var labels = Object.keys(resps);
//   var data = [];
//   var count = 0;
//   if (ary[0][prop] == undefined) {
//     count = `Prop "${prop}" is missing`;
//   } else {
//     labels.forEach(function (x) {
//       data.push(resps[x]);
//       count += resps[x];
//     });
//   }
//   document.getElementById("ct" + qID).innerHTML = count;

//   var myPieChart = new Chart(ctxP, {
//     type: "pie",
//     data: {
//       labels: labels,
//       datasets: [
//         {
//           data: data,
//           // backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
//           backgroundColor: [
//             "rgba(54, 162, 235, 0.2)", // blue
//             "rgba(75, 192, 192, 0.2)", // green
//             "rgba(255, 99, 132, 0.2)",
//             "rgba(255, 206, 86, 0.2)",
//             "rgba(153, 102, 255, 0.2)",
//           ],
//           hoverBackgroundColor: [
//             "rgba(54, 162, 235, 1)", // blue
//             "rgba(75, 192, 192, 1)", // green
//             "rgba(255,99,132,1)",
//             "rgba(255, 206, 86, 1)",
//             "rgba(153, 102, 255, 1)",
//             "rgba(255, 159, 64, 1)",
//           ],
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//     },
//   });
// }
/**
 * barChart - create a bar chart with responses
 * @param ary
 * @param prop
 * @param textLabels
 * @param qID
 * @param label
 */
export function barChart(
  ary: SurveyResponse[],
  prop: ResponseStringKey,
  textLabels: string[],
  qID: string,
  label: string,
): void {
  const resps = summarizeResponses(ary, prop, textLabels);
  const labels = Object.keys(resps);
  const data = labels.map((entry) => resps[entry]);
  const total = data.reduce((sum, value) => sum + value, 0);

  const countEl = document.getElementById(`ct${qID}`);
  if (countEl) {
    countEl.textContent = total.toString();
  }

  makeChart(`r${qID}`, "bar", labels, data, label);
}

/**
 * cleanText - given a text field, clean it up by"
 * - removing leading/trailing whitespace
 * - removing duplicate spaces
 * - changing "\n" to "<br />"
 * @param field
 *
 */
export function cleanText(field?: string | null): string {
  if (field == null) return `Field ${field} is missing`;
  let retstr = field.trim();
  retstr = retstr.replace(/ +/g, " ");
  retstr = retstr.replace(/\n/g, "<br />");
  return retstr;
}

/**
 * formatScale - take a numeric value, return its human-readable value
 * @param x
 */
export function formatScale(x: string): string {
  if (x >= "1" && x <= "5") {
    const idx = Number(x);
    return satisfactionLabels[idx] ?? x;
  }
  if (x === "") return satisfactionLabels[0];
  return x;
}
/**
 * formatResponse
 * Given an object containing a single response, return a <dl>
 *   with its properties "prettied up"
 * @param resp - the response to format
 * @return "<dl>" with the properties
 */
export function formatIndividualResponse(resp: SurveyResponse): string {
  const read = (respID: ResponseStringKey): string => {
    const value = resp[respID];
    if (value === undefined) {
      alert(`Bad ID in r(): ${respID}`);
      return "-";
    }
    return value || "-";
  };

  let retstr = ` <dl>`;
  retstr += `<b>Answer Number:</b> ${resp.Response} <br />`;
  retstr += `<b>Age:</b> ${read("16. Age range")} `;
  retstr += `<b>Years in Lyme:</b> ${read("13. Years in Lyme")} `;
  retstr += ` <b>${read("19. Currently own")}</b>`;
  retstr += `<br /><br />`;
  retstr += `<b>Rate of increase:</b> ${read("1. Rate of increase")} <br />`;
  retstr += `<b>Infill with 4-units?:</b> ${read("9. Infill")}`;
  retstr += `<br /> <br />`;
  retstr += `<dt>Kinds of new construction:</dt>  `;
  retstr += `<dd> Duplex: ${read("2. Duplexes")}; 3-6 units: ${read(
    "2. 3-6 units",
  )}; 7-15 units: ${read("2. 7 to 15 units")}</dd>`;
  retstr += `<b>Affordable</b> ${read("3. Affordable")} <b>Attainable:</b>  ${read(
    "3. Attainable",
  )}`;
  retstr += `<br /> `;
  retstr += `<b>Explanation:</b> ${read("4. Att-Aff Explanation")}	`;
  retstr += `<br /> <br />`;
  retstr += `<dt>Appropriate districts/locations for housing:</dt>  
    <dd> <ul>
      <li>Lyme Common: ${read("5. Lyme Common")}
      <li>Lyme Center: ${read("5. Lyme Center")}
      <li>Commercial: ${read("5. Commercial")}
      <li>Rural: ${read("5. Commercial")}
      <li>East Lyme: ${read("5. East Lyme")}
      <li>Holts Ledge: ${read("5. Holts Ledge")}
      <li>Mtn & Forest: ${read("5. Mtn & Forest")}
      <li>Wherever Single Family: ${read("5. Wherever SF units")}
      <li>Nowhere: ${read("5. Nowhere")}
      </ul>`;
  retstr += `<dt>Other locations:</dt> <dd>${read("6. Other explanation")}	</dd>`;
  retstr += `<dt>Housing in Commercial District:</dt>  <dd>${read(
    "7. Housing in Commercial",
  )}</dd>`;
  retstr += `<dt>Appropriate districts/locations for multi-unit housing:</dt>  
    <dd> ${read("8. Multi-unit districts")}</dd>`;
  retstr += `<b>Should school capacity in 2040 limit housing options?:</b> ${read(
    "10. Lyme School",
  )} <br />`;
  retstr += `<b>Explanation:</b> ${read("11. Lyme School Explanation")}	`;
  retstr += `<br /><br />`;
  retstr += `<dt>Important Housing Initiatives:</dt>  <dd>${read(
    "12. Housing initiatives",
  )}</dd>`;
  retstr += `<b>Plan to move in 5 years:</b> ${read("14. Plan to move")}	<br />`;
  retstr += `<b>Explanation:</b> ${read("15. Explanation of moving")}	`;
  retstr += `<br /><br />`;

  retstr += `<b>Buy/rent a smalller home?:</b> ${read("17. Smaller house")}	<br />`;
  retstr += `<b>Explanation:</b> ${read("18. Smaller house explanation")}	`;
  retstr += `<br /><br />`;
  retstr += `<b>Other thoughts:</b> ${read("20. Other thoughts")}`;
  retstr += "</dl>";

  return retstr;
}
