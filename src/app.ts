/**
 * Javascript for the Lyme Housing Survey-November 2025
 */
import { tableize, formatIndividualResponse } from "./utils";
import { makeAQuestion, makeAChart } from "./questionUtils";
import { responses } from "./data/responses";
/**
 * THE GOOD STUFF...
 */

// Question 1
makeAQuestion(1, "chart", 1);
makeAChart(
  responses,
  "1. Rate of increase",
  "r1-1",
  "pie",
  "Rate of Growth",
  "",
);

// Question 2
makeAQuestion(2, "chart", 3);
makeAChart(responses, "2. Duplexes", "r2-1", "pie", "Duplexes", "");
makeAChart(responses, "2. 3-6 units", "r2-2", "pie", "3 to 6 Units", "");
makeAChart(responses, "2. 7 to 15 units", "r2-3", "pie", "7 to 15 Units", "");

// Question 3

makeAQuestion(3, "chart", 2);
makeAChart(responses, "3. Attainable", "r3-1", "pie", "Attainable", "");
makeAChart(responses, "3. Affordable", "r3-2", "pie", "Affordable", "");

// Question 4
makeAQuestion(4, "responses", 1);
tableize(responses, "4. Att-Aff Explanation", "4");

// Question 5
makeAQuestion(5, "chart", 9);
makeAChart(responses, "5. Lyme Common", "r5-1", "bar", "Lyme Common", "");
makeAChart(responses, "5. Lyme Center", "r5-2", "bar", "Lyme Center", "");
makeAChart(responses, "5. Commercial", "r5-3", "bar", "Commercial", "");
makeAChart(responses, "5. Rural", "r5-4", "bar", "Rural", "");
makeAChart(responses, "5. East Lyme", "r5-5", "bar", "East Lyme", "");
makeAChart(responses, "5. Holts Ledge", "r5-6", "bar", "Holts Ledge", "");
makeAChart(
  responses,
  "5. Mtn & Forest",
  "r5-7",
  "bar",
  "Mountain & Forest",
  "",
);
makeAChart(
  responses,
  "5. Wherever SF units",
  "r5-8",
  "bar",
  "Where single family allowed",
);
makeAChart(responses, "5. Nowhere", "r5-9", "bar", "Nowhere", "");

// Question 6
makeAQuestion(6, "responses", 1);
tableize(responses, "6. Other explanation", "6");

// Question 7
makeAQuestion(7, "checkboxes", 1);
makeAChart(
  responses,
  "7. Housing in Commercial",
  "r7-1",
  "checkboxes",
  "Commercial District housing types",
  "in a building",
  0,
  "value",
);

// Question 8
makeAQuestion(8, "checkboxes", 1);
makeAChart(
  responses,
  "8. Multi-unit districs",
  "r8-1",
  "checkboxes",
  "Districts for multi-unit",
  "District",
  2,
  "value",
);

// Question 9
makeAQuestion(9, "chart", 1);
makeAChart(
  responses,
  "9. Infill",
  "r9-1",
  "pie",
  "Should infill have as many as four units?",
  "",
  0,
  "label",
);

// Question 10
makeAQuestion(10, "chart", 1);
makeAChart(
  responses,
  "10. Lyme School",
  "r10-1",
  "pie",
  "School growth should limit housing choices",
  "",
  0,
  "label",
);

// Question 11
makeAQuestion(11, "responses", 1);
tableize(responses, "11. Lyme School Explanation", "11");

// Question 12
makeAQuestion(12, "checkboxes", 1);
makeAChart(
  responses,
  "12. Housing initiatives",
  "r12-1",
  "checkboxes",
  "Housing initiatives",
  "",
  1,
  "value",
);

// Question 13   "13. How long have you lived in Lyme?",
makeAQuestion(13, "chart", 1);
makeAChart(
  responses,
  "13. Years in Lyme",
  "r13-1",
  "pie",
  "Years in Lyme",
  "",
  0,
  "label",
);

// Question "14. Do you plan to move out of Lyme in the next 5 years?",

makeAQuestion(14, "chart", 1);
makeAChart(
  responses,
  "14. Plan to move",
  "r14-1",
  "pie",
  "Plan to move in 5 years",
  "",
  0,
  "label",
);

// Question 15. Please explain your answer above

makeAQuestion(15, "responses", 1);
tableize(responses, "15. Explanation of moving", "15");

// Question 16. How old are you?

makeAQuestion(16, "chart", 1);
makeAChart(
  responses,
  "16. Age range",
  "r16-1",
  "pie",
  "Current age",
  "",
  0,
  "label",
);

// Question 17. Do you hope to buy/rent a smaller house?

makeAQuestion(17, "chart", 1);
makeAChart(
  responses,
  "17. Smaller house",
  "r17-1",
  "pie",
  "Smaller house",
  "",
  0,
  "label",
);

// Question 18. Please explain your answer above

makeAQuestion(18, "responses", 1);
tableize(responses, "18. Smaller house explanation", "18");

// Question 19. Do you currently own/rent/live with friends or relatives?

makeAQuestion(19, "chart", 1);
makeAChart(
  responses,
  "19. Currently own",
  "r19-1",
  "pie",
  "Currently own a house",
  "",
  0,
  "label",
);

// Question 20. Please explain your answer above

makeAQuestion(20, "responses", 1);
tableize(responses, "20. Other thoughts", "20");

/**
 * Beginning of main routine for the individual responses
 */
const totalCountEl = document.getElementById("ct");
if (totalCountEl) {
  totalCountEl.textContent = responses.length.toString();
}

const tbody = responses
  .map((response) => formatIndividualResponse(response))
  .map((markup) => `<tr><td>${markup}</td></tr>`)
  .join("");

const responsesTable = document.getElementById("resps");
if (responsesTable) {
  responsesTable.innerHTML = `<tbody>${tbody}</tbody>`;
}
