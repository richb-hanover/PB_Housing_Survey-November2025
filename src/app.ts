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
makeAChart(responses, 1, 1, "1. Rate of increase", "pie", "Rate of Growth", "");

// Question 2
makeAQuestion(2, "chart", 3);
makeAChart(responses, 2, 1, "2. Duplexes", "pie", "Duplexes", "");
makeAChart(responses, 2, 2, "2. 3-6 units", "pie", "3 to 6 Units", "");
makeAChart(responses, 2, 3, "2. 7 to 15 units", "pie", "7 to 15 Units", "");

// Question 3

makeAQuestion(3, "chart", 2);
makeAChart(responses, 3, 1, "3. Attainable", "pie", "Attainable", "");
makeAChart(responses, 3, 2, "3. Affordable", "pie", "Affordable", "");

// Question 4
makeAQuestion(4, "responses", 1);
tableize(responses, "4. Att-Aff Explanation", "r4");

// Question 5
makeAQuestion(5, "chart", 9);
makeAChart(responses, 5, 1, "5. Lyme Common", "bar", "Lyme Common", "");
makeAChart(responses, 5, 2, "5. Lyme Center", "bar", "Lyme Center", "");
makeAChart(responses, 5, 3, "5. Commercial", "bar", "Commercial", "");
makeAChart(responses, 5, 4, "5. Rural", "bar", "Rural", "");
makeAChart(responses, 5, 5, "5. East Lyme", "bar", "East Lyme", "");
makeAChart(responses, 5, 6, "5. Holts Ledge", "bar", "Holts Ledge", "");
makeAChart(responses, 5, 7, "5. Mtn & Forest", "bar", "Mountain & Forest", "");
makeAChart(
  responses,
  5,
  8,
  "5. Wherever SF units",

  "bar",
  "Where single family allowed",
);
makeAChart(responses, 5, 9, "5. Nowhere", "bar", "Nowhere", "");

// Question 6
makeAQuestion(6, "responses", 1);
tableize(responses, "6. Other explanation", "r6");

// Question 7
makeAQuestion(7, "checkboxes", 1);
makeAChart(
  responses,
  7,
  1,
  "7. Housing in Commercial",
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
  8,
  1,
  "8. Multi-unit districts",
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
  9,
  1,
  "9. Infill",
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
  10,
  1,
  "10. Lyme School",
  "pie",
  "School growth should limit housing choices",
  "",
  0,
  "label",
);

// Question 11
makeAQuestion(11, "responses", 1);
tableize(responses, "11. Lyme School Explanation", "r11");

// Question 12
makeAQuestion(12, "checkboxes", 1);
makeAChart(
  responses,
  12,
  1,
  "12. Housing initiatives",
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
  13,
  1,
  "13. Years in Lyme",
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
  14,
  1,
  "14. Plan to move",
  "pie",
  "Plan to move in 5 years",
  "",
  0,
  "label",
);

// Question 15. Please explain your answer above

makeAQuestion(15, "responses", 1);
tableize(responses, "15. Explanation of moving", "r15");

// Question 16. How old are you?

makeAQuestion(16, "chart", 1);
makeAChart(
  responses,
  16,
  1,
  "16. Age range",
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
  17,
  1,
  "17. Smaller house",
  "pie",
  "Smaller house",
  "",
  0,
  "label",
);

// Question 18. Please explain your answer above

makeAQuestion(18, "responses", 1);
tableize(responses, "18. Smaller house explanation", "r18");

// Question 19. Do you currently own/rent/live with friends or relatives?

makeAQuestion(19, "chart", 1);
makeAChart(
  responses,
  19,
  1,
  "19. Currently own",
  "pie",
  "Currently own a house",
  "",
  0,
  "label",
);

// Question 20. Please explain your answer above

makeAQuestion(20, "responses", 1);
tableize(responses, "20. Other thoughts", "r20");

/**
 * Beginning of main routine for the individual responses
 */
// const totalCountEl = document.getElementById("ct");
// if (totalCountEl) {
//   totalCountEl.textContent = responses.length.toString();
// }

// const tbody = responses
//   .map((response) => formatIndividualResponse(response))
//   .map((markup) => `<tr><td>${markup}</td></tr>`)
//   .join("");

// const responsesTable = document.getElementById("resps");
// if (responsesTable) {
//   responsesTable.innerHTML = `<tbody>${tbody}</tbody>`;
// }
