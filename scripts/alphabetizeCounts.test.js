import { alphabetizeCounts } from "../src/utils.js";

const SAMPLE = ["a", "a", "a", "a", "b", "b", "b", "c", "d"];
const MIN_COUNT = 2;

const [labels, counts, other] = alphabetizeCounts(SAMPLE, "", MIN_COUNT);

console.log("Input:", SAMPLE);
console.log("Labels >", MIN_COUNT, ":", labels);
console.log("Counts >", MIN_COUNT, ":", counts);
console.log("Other <=", MIN_COUNT, ":", other);
